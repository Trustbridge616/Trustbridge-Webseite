<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use App\Services\Invoicing\InvoiceService;
use App\Services\Invoicing\SnapshotBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class InvoiceIssueTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    private function service(): InvoiceService
    {
        return app(InvoiceService::class);
    }

    public function test_issue_requires_at_least_one_item(): void
    {
        $invoice = Invoice::factory()->create();

        $this->expectException(ValidationException::class);
        $this->service()->issue($invoice);
    }

    public function test_reverse_charge_blocks_missing_vat_id_without_confirmation(): void
    {
        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->withoutVatId())
            ->create();

        try {
            $this->service()->issue($invoice);
            $this->fail('Ausstellen ohne USt-IdNr. und ohne Bestätigung hätte fehlschlagen müssen.');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('customer.vat_id', $e->errors());
        }

        $this->assertSame(Invoice::STATUS_DRAFT, $invoice->fresh()->status);
        $this->assertNull($invoice->fresh()->invoice_number);
    }

    public function test_reverse_charge_allows_missing_vat_id_with_explicit_confirmation(): void
    {
        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->withoutVatId())
            ->create();

        $invoice = $this->service()->issue($invoice, [
            'business_use_confirmed' => true,
            'evidence_reference' => 'E-Mail vom 28.07.2026',
        ]);

        $this->assertSame(Invoice::STATUS_ISSUED, $invoice->status);
        $this->assertNotNull($invoice->invoice_number);

        // Der Vermerk wandert in den Snapshot (interne Anzeige, nie aufs PDF)
        $this->assertTrue($invoice->snapshot->data['buyer']['business_confirmed_without_vat_id']);
        $this->assertNull($invoice->snapshot->data['buyer']['vat_id']);
    }

    public function test_confirmation_requires_evidence_reference(): void
    {
        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->withoutVatId())
            ->create();

        try {
            $this->service()->issue($invoice, ['business_use_confirmed' => true]);
            $this->fail('Bestätigung ohne Nachweisreferenz hätte fehlschlagen müssen.');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('evidence_reference', $e->errors());
        }

        $this->assertSame(Invoice::STATUS_DRAFT, $invoice->fresh()->status);
    }

    public function test_confirmation_writes_full_audit_log_entry(): void
    {
        $admin = User::factory()->create(['is_admin' => true, 'name' => 'Ben Admin']);
        $this->actingAs($admin);

        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->withoutVatId())
            ->create();

        $invoice = $this->service()->issue($invoice, [
            'business_use_confirmed' => true,
            'evidence_reference' => 'Vertrag §3, Mail 28.07.2026',
        ]);

        $log = AuditLog::where('action', 'invoice.business_use_confirmed')->first();
        $this->assertNotNull($log);
        $this->assertSame($admin->id, $log->user_id);
        $this->assertSame(InvoiceService::BUSINESS_USE_STATEMENT, $log->new_values['statement']);
        $this->assertSame('Vertrag §3, Mail 28.07.2026', $log->new_values['evidence_reference']);
        $this->assertSame($invoice->customer_id, $log->new_values['customer_id']);
        $this->assertSame($invoice->invoice_number, $log->new_values['invoice_number']);
        $this->assertSame('Ben Admin', $log->new_values['confirmed_by']);
        $this->assertNotNull($log->new_values['confirmed_at']);

        // Bei vorhandener USt-IdNr. wird KEIN Bestätigungs-Eintrag geschrieben
        $normal = $this->service()->issue(Invoice::factory()->withDefaultItem()->create());
        $this->assertSame(1, AuditLog::where('action', 'invoice.business_use_confirmed')->count());
    }

    public function test_vat_id_still_appears_on_invoice_when_present(): void
    {
        $invoice = $this->service()->issue(Invoice::factory()->withDefaultItem()->create());

        $this->assertNotNull($invoice->snapshot->data['buyer']['vat_id']);
        $this->assertFalse($invoice->snapshot->data['buyer']['business_confirmed_without_vat_id']);

        $html = view('pdf.invoice', ['snap' => $invoice->snapshot->data])->render();
        $this->assertStringContainsString($invoice->snapshot->data['buyer']['vat_id'], $html);
    }

    public function test_confirmation_and_evidence_never_print_on_pdf(): void
    {
        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->withoutVatId())
            ->create();

        $invoice = $this->service()->issue($invoice, [
            'business_use_confirmed' => true,
            'evidence_reference' => 'GEHEIME-NACHWEIS-REF-123',
        ]);

        $html = view('pdf.invoice', ['snap' => $invoice->snapshot->data])->render();
        // Bestätigungstext und Nachweisreferenz dürfen NIE auf die Rechnung
        $this->assertStringNotContainsString('schriftlich bestätigt', $html);
        $this->assertStringNotContainsString('GEHEIME-NACHWEIS-REF-123', $html);
        $this->assertStringNotContainsString('business_confirmed', $html);
        // Der normale Reverse-Charge-Hinweis steht weiterhin drauf
        $this->assertStringContainsString('Steuerschuldnerschaft des Leistungsempfängers', $html);
    }

    public function test_reverse_charge_requires_business_customer(): void
    {
        $invoice = Invoice::factory()
            ->withDefaultItem()
            ->for(Customer::factory()->privatePerson())
            ->create();

        $this->expectException(ValidationException::class);
        $this->service()->issue($invoice);
    }

    public function test_issue_creates_snapshot_with_valid_hash_and_pdf(): void
    {
        $invoice = $this->service()->issue(Invoice::factory()->withDefaultItem()->create());

        $this->assertSame(Invoice::STATUS_ISSUED, $invoice->status);
        $this->assertNotNull($invoice->invoice_number);
        $this->assertNotNull($invoice->issue_date);
        $this->assertSame(
            $invoice->issue_date->copy()->addDays($invoice->payment_terms_days)->toDateString(),
            $invoice->due_date->toDateString()
        );

        $snapshot = $invoice->snapshot;
        $this->assertNotNull($snapshot);
        $this->assertSame(SnapshotBuilder::hash($snapshot->data), $snapshot->hash);
        $this->assertSame($invoice->invoice_number, $snapshot->data['invoice']['number']);
        $this->assertSame(600000, $snapshot->data['invoice']['total_cents']);

        Storage::disk('local')->assertExists($invoice->pdf_path);
    }

    public function test_issued_invoice_cannot_be_edited(): void
    {
        $invoice = $this->service()->issue(Invoice::factory()->withDefaultItem()->create());

        $this->expectException(ValidationException::class);
        $this->service()->updateDraft($invoice, []);
    }

    public function test_snapshot_is_immutable_when_customer_changes_later(): void
    {
        $invoice = $this->service()->issue(Invoice::factory()->withDefaultItem()->create());

        $originalBuyer = $invoice->snapshot->data['buyer']['legal_name'];
        $originalHash = $invoice->snapshot->hash;

        $invoice->customer->update(['legal_name' => 'Umbenannt GmbH', 'city' => 'Anderswo']);

        $snapshot = $invoice->fresh()->snapshot;
        $this->assertSame($originalBuyer, $snapshot->data['buyer']['legal_name']);
        $this->assertSame($originalHash, $snapshot->hash);
    }

    public function test_internal_company_data_never_reaches_snapshot(): void
    {
        $invoice = Invoice::factory()->withDefaultItem()->create();
        $invoice->companyProfile->update([
            'internal_meta' => [
                'ird_profits_tax_file' => '23/76661325 (TF3)',
                'rin' => 'Y870XB4953',
                'director' => 'Ben Tischler',
            ],
        ]);

        $invoice = $this->service()->issue($invoice);

        $json = json_encode($invoice->snapshot->data);
        $this->assertStringNotContainsString('76661325 (TF3)', $json);
        $this->assertStringNotContainsString('Y870XB4953', $json);
        $this->assertStringNotContainsString('internal_meta', $json);
    }

    public function test_totals_are_computed_server_side(): void
    {
        $invoice = Invoice::factory()->create();
        $invoice->items()->create([
            'position' => 1,
            'title_en' => 'Retainer',
            'quantity_milli' => 500,       // 0,5
            'unit' => 'month',
            'unit_price_cents' => 600000,  // 6.000 €
            'line_total_cents' => 999999,  // absichtlich falsch — muss überschrieben werden
        ]);

        $invoice = $this->service()->updateDraft($invoice, [
            'items' => [[
                'title_en' => 'Retainer',
                'quantity_milli' => 500,
                'unit' => 'month',
                'unit_price_cents' => 600000,
            ]],
        ]);

        $this->assertSame(300000, $invoice->items->first()->line_total_cents);
        $this->assertSame(300000, $invoice->total_cents);
    }
}
