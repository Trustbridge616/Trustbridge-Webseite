<?php

namespace Tests\Feature;

use App\Models\CompanyProfile;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\PaymentProfile;
use App\Models\User;
use App\Services\Invoicing\InvoiceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvoiceCrudTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->admin = User::factory()->create(['is_admin' => true]);
        CompanyProfile::factory()->create();
        PaymentProfile::factory()->for(CompanyProfile::first())->create();
    }

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'customer_id' => Customer::factory()->create()->id,
            'tax_profile' => 'reverse_charge_german_b2b',
            'currency' => 'EUR',
            'language' => 'both',
            'payment_terms_days' => 7,
            'service_period_start' => '2026-07-01',
            'service_period_end' => '2026-07-31',
            'notes' => null,
            'items' => [[
                'title_en' => 'Monthly Digital Development & Strategic Advisory Retainer',
                'title_de' => 'Monatliche digitale Weiterentwicklung und strategische Begleitung',
                'description_en' => null,
                'description_de' => null,
                'quantity_milli' => 1000,
                'unit' => 'month',
                'unit_price_cents' => 600000,
            ]],
        ], $overrides);
    }

    public function test_store_creates_draft_with_server_computed_totals(): void
    {
        $response = $this->actingAs($this->admin)
            ->post('/admin/rechnungen', $this->validPayload());

        $invoice = Invoice::first();
        $response->assertRedirect("/admin/rechnungen/{$invoice->id}");

        $this->assertSame(Invoice::STATUS_DRAFT, $invoice->status);
        $this->assertNull($invoice->invoice_number);
        $this->assertSame(600000, $invoice->total_cents);
        $this->assertSame(600000, $invoice->items->first()->line_total_cents);
    }

    public function test_store_requires_items(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/rechnungen', $this->validPayload(['items' => []]))
            ->assertSessionHasErrors('items');
    }

    public function test_store_requires_valid_customer(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/rechnungen', $this->validPayload(['customer_id' => 999]))
            ->assertSessionHasErrors('customer_id');
    }

    public function test_update_draft(): void
    {
        $invoice = Invoice::factory()->withDefaultItem()->create();

        $payload = $this->validPayload([
            'customer_id' => $invoice->customer_id,
            'payment_terms_days' => 14,
        ]);
        $payload['items'][0]['unit_price_cents'] = 500000;

        $this->actingAs($this->admin)
            ->put("/admin/rechnungen/{$invoice->id}", $payload)
            ->assertRedirect("/admin/rechnungen/{$invoice->id}");

        $invoice->refresh();
        $this->assertSame(14, $invoice->payment_terms_days);
        $this->assertSame(500000, $invoice->total_cents);
    }

    public function test_duplicate_creates_new_draft_without_number(): void
    {
        $issued = app(InvoiceService::class)->issue(Invoice::factory()->withDefaultItem()->create());

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$issued->id}/duplizieren");

        $copy = Invoice::where('duplicated_from_id', $issued->id)->first();

        $this->assertNotNull($copy);
        $this->assertSame(Invoice::STATUS_DRAFT, $copy->status);
        $this->assertNull($copy->invoice_number);
        $this->assertSame($issued->total_cents, $copy->total_cents);
        $this->assertSame($issued->items->count(), $copy->items->count());
    }

    public function test_issue_without_vat_id_via_http_requires_confirmation_dialog_data(): void
    {
        $customer = Customer::factory()->create(['vat_id' => null]);
        $invoice = Invoice::factory()->withDefaultItem()->for($customer)->create();

        // Ohne Bestätigung → blockiert
        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/ausstellen", [])
            ->assertSessionHasErrors('customer.vat_id');
        $this->assertSame(Invoice::STATUS_DRAFT, $invoice->fresh()->status);

        // Mit Bestätigung + Nachweisreferenz → ausgestellt
        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/ausstellen", [
                'business_use_confirmed' => true,
                'evidence_reference' => 'E-Mail vom 28.07.2026',
            ])
            ->assertSessionHasNoErrors();

        $invoice->refresh();
        $this->assertSame(Invoice::STATUS_ISSUED, $invoice->status);
        $this->assertNotNull($invoice->invoice_number);
    }

    public function test_draft_can_be_deleted_but_issued_cannot(): void
    {
        $draft = Invoice::factory()->withDefaultItem()->create();
        $issued = app(InvoiceService::class)->issue(Invoice::factory()->withDefaultItem()->create());

        $this->actingAs($this->admin)
            ->delete("/admin/rechnungen/{$draft->id}")
            ->assertRedirect('/admin/rechnungen');
        $this->assertNull(Invoice::find($draft->id));

        $this->actingAs($this->admin)
            ->delete("/admin/rechnungen/{$issued->id}")
            ->assertSessionHasErrors();
        $this->assertNotNull(Invoice::find($issued->id));
    }
}
