<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\InvoicePayment;
use App\Models\User;
use App\Services\Invoicing\InvoiceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvoicePaymentTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->admin = User::factory()->create(['is_admin' => true]);
    }

    private function issuedInvoice(): Invoice
    {
        return app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );
    }

    public function test_mark_paid_records_payment_and_updates_status(): void
    {
        $invoice = $this->issuedInvoice();

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/bezahlt", [
                'paid_on' => '2026-08-01',
                'external_reference' => 'AWX-TRX-12345',
                'note' => 'Eingang Airwallex',
            ])
            ->assertSessionHasNoErrors();

        $invoice->refresh();
        $this->assertSame(Invoice::STATUS_PAID, $invoice->status);
        $this->assertNotNull($invoice->paid_at);
        $this->assertSame('manual', $invoice->payment_match_status);

        $payment = InvoicePayment::first();
        $this->assertSame($invoice->id, $payment->invoice_id);
        $this->assertSame($invoice->total_cents, $payment->amount_cents);
        $this->assertSame('AWX-TRX-12345', $payment->external_reference);
        $this->assertSame('2026-08-01', $payment->paid_on->toDateString());
        $this->assertSame($this->admin->id, $payment->recorded_by_user_id);
    }

    public function test_external_reference_and_date_are_required(): void
    {
        $invoice = $this->issuedInvoice();

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/bezahlt", [])
            ->assertSessionHasErrors(['paid_on', 'external_reference']);

        $this->assertSame(Invoice::STATUS_ISSUED, $invoice->fresh()->status);
        $this->assertSame(0, InvoicePayment::count());
    }

    public function test_marking_paid_twice_fails(): void
    {
        $invoice = $this->issuedInvoice();

        $payload = ['paid_on' => '2026-08-01', 'external_reference' => 'REF-1'];

        $this->actingAs($this->admin)->post("/admin/rechnungen/{$invoice->id}/bezahlt", $payload);
        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/bezahlt", $payload)
            ->assertSessionHasErrors();

        $this->assertSame(1, InvoicePayment::count());
    }

    public function test_draft_cannot_be_marked_paid(): void
    {
        $invoice = Invoice::factory()->withDefaultItem()->create();

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/bezahlt", [
                'paid_on' => '2026-08-01',
                'external_reference' => 'REF-1',
            ])
            ->assertSessionHasErrors();

        $this->assertSame(Invoice::STATUS_DRAFT, $invoice->fresh()->status);
    }

    public function test_mark_sent_then_paid(): void
    {
        $invoice = $this->issuedInvoice();

        $this->actingAs($this->admin)->post("/admin/rechnungen/{$invoice->id}/versendet");
        $this->assertSame(Invoice::STATUS_SENT, $invoice->fresh()->status);

        $this->actingAs($this->admin)->post("/admin/rechnungen/{$invoice->id}/bezahlt", [
            'paid_on' => '2026-08-02',
            'external_reference' => 'REF-2',
        ]);
        $this->assertSame(Invoice::STATUS_PAID, $invoice->fresh()->status);
    }

    public function test_cancel_requires_reason(): void
    {
        $invoice = $this->issuedInvoice();

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/stornieren", [])
            ->assertSessionHasErrors('cancellation_reason');

        $this->actingAs($this->admin)
            ->post("/admin/rechnungen/{$invoice->id}/stornieren", ['cancellation_reason' => 'Fehlbuchung'])
            ->assertSessionHasNoErrors();

        $invoice->refresh();
        $this->assertSame(Invoice::STATUS_CANCELLED, $invoice->status);
        $this->assertSame('Fehlbuchung', $invoice->cancellation_reason);
    }
}
