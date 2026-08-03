<?php

namespace App\Services\Invoicing;

use App\Models\Invoice;
use App\Models\InvoiceSnapshot;

class SnapshotBuilder
{
    /**
     * Baut einen vollständig selbstständigen Snapshot. PDF und Anzeige
     * ausgestellter Rechnungen speisen sich ausschließlich hieraus —
     * spätere Änderungen an Kunde/Firmenprofil beeinflussen die Rechnung
     * nicht mehr.
     *
     * internal_meta des Firmenprofils wird bewusst nie übernommen.
     */
    public function build(Invoice $invoice): array
    {
        $invoice->loadMissing(['customer', 'companyProfile', 'paymentProfile', 'items']);

        $company = $invoice->companyProfile;
        $customer = $invoice->customer;
        $payment = $invoice->paymentProfile;

        return [
            'schema_version' => 1,
            'generated_at' => now()->toIso8601String(),
            'invoice' => [
                'number' => $invoice->invoice_number,
                'issue_date' => $invoice->issue_date?->toDateString(),
                'due_date' => $invoice->due_date?->toDateString(),
                'payment_terms_days' => $invoice->payment_terms_days,
                'service_period' => [
                    'start' => $invoice->service_period_start?->toDateString(),
                    'end' => $invoice->service_period_end?->toDateString(),
                    'label_de' => $invoice->service_period_start?->locale('de')->translatedFormat('F Y'),
                    'label_en' => $invoice->service_period_start?->locale('en')->translatedFormat('F Y'),
                ],
                'currency' => $invoice->currency,
                'language' => $invoice->language,
                'subtotal_cents' => $invoice->subtotal_cents,
                'total_cents' => $invoice->total_cents,
            ],
            'seller' => [
                'name' => $company->name,
                'legal_name' => $company->legal_name,
                'sender_line' => $company->sender_line,
                'address_line1' => $company->address_line1,
                'address_line2' => $company->address_line2,
                'city' => $company->city,
                'region' => $company->region,
                'country' => $company->country,
                'brn_line' => $company->brn ? "Hong Kong BRN / Company No.: {$company->brn}" : null,
                'website' => $company->website,
                'email' => $company->email,
            ],
            'buyer' => [
                'customer_number' => $customer->customer_number,
                'legal_name' => $customer->legal_name,
                'contact_name' => $customer->contact_name,
                'address_line1' => $customer->address_line1,
                'address_line2' => $customer->address_line2,
                'zip' => $customer->zip,
                'city' => $customer->city,
                'country' => $customer->country,
                'vat_id' => $customer->vat_id,
                'email' => $customer->email,
                // Interner Vermerk (erscheint nie auf dem PDF): Ausstellen ohne
                // USt-IdNr. ist nur mit ausdrücklicher Bestätigung der
                // unternehmerischen Nutzung möglich — Details im Audit-Log.
                'business_confirmed_without_vat_id' => ! $customer->vat_id,
            ],
            'items' => $invoice->items->map(fn ($item) => [
                'position' => $item->position,
                'title_en' => $item->title_en,
                'title_de' => $item->title_de,
                'description_en' => $item->description_en,
                'description_de' => $item->description_de,
                'quantity_milli' => $item->quantity_milli,
                'unit' => $item->unit,
                'unit_price_cents' => $item->unit_price_cents,
                'line_total_cents' => $item->line_total_cents,
            ])->values()->all(),
            'tax' => [
                'profile' => $invoice->tax_profile,
                'notice' => config("invoicing.tax_profiles.{$invoice->tax_profile}.note"),
                'notice_de' => config("invoicing.tax_profiles.{$invoice->tax_profile}.note_de"),
                'notice_en' => config("invoicing.tax_profiles.{$invoice->tax_profile}.note_en"),
            ],
            'payment' => [
                'provider' => $payment->provider,
                'beneficiary' => $payment->beneficiary,
                'iban' => $payment->iban,
                'bic' => $payment->bic,
                'bank_name' => $payment->bank_name,
                'bank_country' => $payment->bank_country,
                'currency' => $payment->currency,
                'reference' => $invoice->invoice_number,
            ],
            'branding' => [
                'claim_footer' => config('invoicing.pdf.claim_footer'),
            ],
        ];
    }

    public function store(Invoice $invoice): InvoiceSnapshot
    {
        $data = $this->build($invoice);

        return InvoiceSnapshot::create([
            'invoice_id' => $invoice->id,
            'data' => $data,
            'hash' => self::hash($data),
        ]);
    }

    public static function hash(array $data): string
    {
        return hash('sha256', json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }
}
