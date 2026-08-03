<?php

namespace App\Services\Invoicing;

use App\Models\CompanyProfile;
use App\Models\Invoice;
use App\Models\InvoiceEvent;
use App\Models\InvoicePayment;
use App\Models\PaymentProfile;
use App\Services\AuditLogger;
use App\Support\Money;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InvoiceService
{
    /**
     * Fester Wortlaut der Bestätigung beim Ausstellen ohne USt-IdNr.
     * Wird nur im Audit-Log gespeichert — niemals auf die Rechnung gedruckt.
     */
    public const BUSINESS_USE_STATEMENT = 'Der Kunde hat schriftlich bestätigt, dass er die Leistung ausschließlich für seine selbstständige unternehmerische Tätigkeit und nicht für private Zwecke bezieht.';

    public function __construct(
        private InvoiceStateMachine $stateMachine,
        private InvoiceNumberGenerator $numberGenerator,
        private SnapshotBuilder $snapshotBuilder,
        private InvoicePdfRenderer $pdfRenderer,
        private AuditLogger $audit,
    ) {}

    /**
     * @param  array  $data  validierte Daten inkl. items[]
     */
    public function createDraft(array $data): Invoice
    {
        return DB::transaction(function () use ($data) {
            $invoice = Invoice::create([
                ...$this->invoiceAttributes($data),
                'status' => Invoice::STATUS_DRAFT,
                'company_profile_id' => $data['company_profile_id'] ?? CompanyProfile::where('is_default', true)->firstOrFail()->id,
                'payment_profile_id' => $data['payment_profile_id'] ?? PaymentProfile::where('is_default', true)->firstOrFail()->id,
            ]);

            $this->syncItems($invoice, $data['items']);
            $this->recalculateTotals($invoice);

            $this->event($invoice, 'created');
            $this->audit->log('invoice.created', $invoice, [], ['customer_id' => $invoice->customer_id]);

            return $invoice->fresh(['items', 'customer']);
        });
    }

    public function updateDraft(Invoice $invoice, array $data): Invoice
    {
        $this->assertEditable($invoice);

        return DB::transaction(function () use ($invoice, $data) {
            $invoice->update($this->invoiceAttributes($data));

            $this->syncItems($invoice, $data['items']);
            $this->recalculateTotals($invoice);

            $this->event($invoice, 'updated');
            $this->audit->log('invoice.updated', $invoice);

            return $invoice->fresh(['items', 'customer']);
        });
    }

    public function deleteDraft(Invoice $invoice): void
    {
        $this->assertEditable($invoice);

        DB::transaction(function () use ($invoice) {
            $this->audit->log('invoice.deleted', $invoice, ['status' => $invoice->status], []);
            $invoice->items()->delete();
            $invoice->events()->delete();
            $invoice->delete();
        });
    }

    public function duplicate(Invoice $invoice): Invoice
    {
        return DB::transaction(function () use ($invoice) {
            $copy = Invoice::create([
                'status' => Invoice::STATUS_DRAFT,
                'customer_id' => $invoice->customer_id,
                'company_profile_id' => $invoice->company_profile_id,
                'payment_profile_id' => $invoice->payment_profile_id,
                'tax_profile' => $invoice->tax_profile,
                'currency' => $invoice->currency,
                'language' => $invoice->language,
                'payment_terms_days' => $invoice->payment_terms_days,
                'service_period_start' => $invoice->service_period_start,
                'service_period_end' => $invoice->service_period_end,
                'notes' => $invoice->notes,
                'duplicated_from_id' => $invoice->id,
            ]);

            foreach ($invoice->items as $item) {
                $copy->items()->create($item->only([
                    'position', 'title_en', 'title_de', 'description_en', 'description_de',
                    'quantity_milli', 'unit', 'unit_price_cents', 'line_total_cents',
                ]));
            }

            $this->recalculateTotals($copy);

            $this->event($copy, 'created', ['duplicated_from' => $invoice->invoice_number ?? $invoice->id]);
            $this->event($invoice, 'duplicated', ['copy_id' => $copy->id]);
            $this->audit->log('invoice.duplicated', $invoice, [], ['copy_id' => $copy->id]);

            return $copy->fresh(['items', 'customer']);
        });
    }

    /**
     * Ausstellen: validieren → Nummer → einfrieren (Snapshot) → PDF → Audit.
     * Danach ist die Rechnung nicht mehr bearbeitbar.
     *
     * Zwei Wege: mit USt-IdNr. normal; ohne USt-IdNr. nur mit ausdrücklicher
     * Bestätigung der unternehmerischen Nutzung ($confirmation:
     * business_use_confirmed + evidence_reference).
     */
    public function issue(Invoice $invoice, array $confirmation = []): Invoice
    {
        $this->stateMachine->assertTransition($invoice->status, Invoice::STATUS_ISSUED);
        $this->validateForIssue($invoice, $confirmation);

        $attempts = 0;

        do {
            try {
                return DB::transaction(function () use ($invoice, $confirmation) {
                    $this->recalculateTotals($invoice);

                    $issueDate = today();
                    $invoice->forceFill([
                        'status' => Invoice::STATUS_ISSUED,
                        'invoice_number' => $this->numberGenerator->next($issueDate->year),
                        'issue_date' => $issueDate,
                        'due_date' => $issueDate->copy()->addDays($invoice->payment_terms_days),
                        'issued_at' => now(),
                    ])->save();

                    $snapshot = $this->snapshotBuilder->store($invoice);

                    $pdfPath = $this->pdfRenderer->renderAndStore($snapshot->data);
                    $invoice->forceFill(['pdf_path' => $pdfPath])->save();

                    $this->event($invoice, 'issued', ['invoice_number' => $invoice->invoice_number]);
                    $this->audit->log('invoice.issued', $invoice, [], [
                        'invoice_number' => $invoice->invoice_number,
                        'total_cents' => $invoice->total_cents,
                    ]);

                    $this->recordBusinessUseConfirmation($invoice, $confirmation);

                    return $invoice->fresh(['items', 'customer', 'snapshot']);
                });
            } catch (UniqueConstraintViolationException $e) {
                // Theoretischer Race auf invoice_number: neue Nummer ziehen
                $attempts++;
                if ($attempts >= 3) {
                    throw $e;
                }
            }
        } while (true);
    }

    public function markSent(Invoice $invoice): Invoice
    {
        $this->stateMachine->assertTransition($invoice->status, Invoice::STATUS_SENT);

        $invoice->forceFill(['status' => Invoice::STATUS_SENT, 'sent_at' => now()])->save();

        $this->event($invoice, 'sent');
        $this->audit->log('invoice.sent', $invoice);

        return $invoice;
    }

    public function markPaid(Invoice $invoice, array $data): Invoice
    {
        $this->stateMachine->assertTransition($invoice->status, Invoice::STATUS_PAID);

        return DB::transaction(function () use ($invoice, $data) {
            InvoicePayment::create([
                'invoice_id' => $invoice->id,
                'amount_cents' => $data['amount_cents'] ?? $invoice->total_cents,
                'currency' => $invoice->currency,
                'paid_on' => $data['paid_on'],
                'method' => $data['method'] ?? 'bank_transfer',
                'external_reference' => $data['external_reference'],
                'note' => $data['note'] ?? null,
                'recorded_by_user_id' => Auth::id(),
            ]);

            $invoice->forceFill([
                'status' => Invoice::STATUS_PAID,
                'paid_at' => now(),
                'payment_match_status' => 'manual',
                'payment_matched_at' => now(),
            ])->save();

            $this->event($invoice, 'payment_recorded', [
                'paid_on' => $data['paid_on'],
                'external_reference' => $data['external_reference'],
            ]);
            $this->event($invoice, 'paid');
            $this->audit->log('invoice.paid', $invoice, [], [
                'paid_on' => $data['paid_on'],
                'external_reference' => $data['external_reference'],
            ]);

            return $invoice;
        });
    }

    public function cancel(Invoice $invoice, string $reason): Invoice
    {
        $this->stateMachine->assertTransition($invoice->status, Invoice::STATUS_CANCELLED);

        $invoice->forceFill([
            'status' => Invoice::STATUS_CANCELLED,
            'cancelled_at' => now(),
            'cancellation_reason' => $reason,
        ])->save();

        $this->event($invoice, 'cancelled', ['reason' => $reason]);
        $this->audit->log('invoice.cancelled', $invoice, [], ['reason' => $reason]);

        return $invoice;
    }

    public function assertEditable(Invoice $invoice): void
    {
        if (! $invoice->isEditable()) {
            throw ValidationException::withMessages([
                'invoice' => 'Ausgestellte Rechnungen können nicht bearbeitet werden. Bitte stornieren und duplizieren.',
            ]);
        }
    }

    private function invoiceAttributes(array $data): array
    {
        return collect($data)->only([
            'customer_id', 'tax_profile', 'currency', 'language',
            'payment_terms_days', 'service_period_start', 'service_period_end', 'notes',
        ])->all();
    }

    /**
     * Positionen ersetzen; line_total wird immer serverseitig berechnet —
     * vom Client gelieferte Summen werden ignoriert.
     */
    private function syncItems(Invoice $invoice, array $items): void
    {
        $invoice->items()->delete();

        foreach (array_values($items) as $index => $item) {
            $quantityMilli = (int) $item['quantity_milli'];
            $unitPriceCents = (int) $item['unit_price_cents'];

            $invoice->items()->create([
                'position' => $index + 1,
                'title_en' => $item['title_en'],
                'title_de' => $item['title_de'] ?? null,
                'description_en' => $item['description_en'] ?? null,
                'description_de' => $item['description_de'] ?? null,
                'quantity_milli' => $quantityMilli,
                'unit' => $item['unit'] ?? 'month',
                'unit_price_cents' => $unitPriceCents,
                'line_total_cents' => Money::lineTotal($unitPriceCents, $quantityMilli),
            ]);
        }
    }

    private function recalculateTotals(Invoice $invoice): void
    {
        $subtotal = (int) $invoice->items()->sum('line_total_cents');

        // Reverse Charge: keine Steuer wird aufgeschlagen — total == subtotal.
        $invoice->forceFill([
            'subtotal_cents' => $subtotal,
            'total_cents' => $subtotal,
        ])->save();
    }

    /**
     * Fachliche Pflichtprüfung vor dem Ausstellen (Reverse-Charge-Gate).
     */
    private function validateForIssue(Invoice $invoice, array $confirmation = []): void
    {
        $errors = [];

        if ($invoice->items()->count() === 0) {
            $errors['items'] = 'Die Rechnung braucht mindestens eine Position.';
        }

        $requires = config("invoicing.tax_profiles.{$invoice->tax_profile}.requires", []);
        $customer = $invoice->customer;

        foreach ($requires as $field) {
            $value = $customer->{$field};
            if ($value === null || $value === '' || $value === false) {
                $errors["customer.{$field}"] = "Kundenfeld „{$field}“ ist für das Steuerprofil „{$invoice->tax_profile}“ erforderlich.";
            }
        }

        // USt-IdNr.: Pflicht, außer die unternehmerische Nutzung wird beim
        // Ausstellen ausdrücklich bestätigt (inkl. Nachweisreferenz).
        if (config("invoicing.tax_profiles.{$invoice->tax_profile}.requires_vat_id_unless_confirmed", false)
            && ! $customer->vat_id) {
            $confirmed = (bool) ($confirmation['business_use_confirmed'] ?? false);
            $evidence = trim((string) ($confirmation['evidence_reference'] ?? ''));

            if (! $confirmed) {
                $errors['customer.vat_id'] = 'USt-IdNr. fehlt. Ausstellen ist nur mit ausdrücklicher Bestätigung der unternehmerischen Nutzung möglich.';
            } elseif ($evidence === '') {
                $errors['evidence_reference'] = 'Bitte eine Nachweisreferenz angeben (z.B. E-Mail vom …, Vertrag §, Dateiname).';
            }
        }

        if ($errors !== []) {
            throw ValidationException::withMessages($errors);
        }
    }

    /**
     * Bestätigung „unternehmerische Nutzung ohne USt-IdNr.“ protokollieren:
     * Datum, Admin, Kunde, Rechnung und Nachweisreferenz landen im Audit-Log.
     * Auf der Rechnung erscheint davon nichts — dort steht nur der normale
     * Reverse-Charge-Hinweis.
     */
    private function recordBusinessUseConfirmation(Invoice $invoice, array $confirmation): void
    {
        if ($invoice->customer->vat_id || ! ($confirmation['business_use_confirmed'] ?? false)) {
            return;
        }

        $evidence = trim((string) ($confirmation['evidence_reference'] ?? ''));

        $this->event($invoice, 'business_use_confirmed', [
            'evidence_reference' => $evidence,
        ]);

        $this->audit->log('invoice.business_use_confirmed', $invoice, [], [
            'statement' => self::BUSINESS_USE_STATEMENT,
            'evidence_reference' => $evidence,
            'customer_id' => $invoice->customer->id,
            'customer' => $invoice->customer->legal_name,
            'invoice_number' => $invoice->invoice_number,
            'confirmed_by' => Auth::user()?->name,
            'confirmed_at' => now()->toIso8601String(),
        ]);
    }

    private function event(Invoice $invoice, string $type, array $payload = []): void
    {
        InvoiceEvent::create([
            'invoice_id' => $invoice->id,
            'type' => $type,
            'payload' => $payload ?: null,
            'user_id' => Auth::id(),
        ]);
    }
}
