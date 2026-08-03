<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceEvent;
use App\Models\User;
use App\Services\Invoicing\InvoiceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuditLogTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->admin = User::factory()->create(['is_admin' => true]);
        $this->actingAs($this->admin);
    }

    public function test_issue_writes_audit_log_and_event(): void
    {
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        $log = AuditLog::where('action', 'invoice.issued')->first();
        $this->assertNotNull($log);
        $this->assertSame($this->admin->id, $log->user_id);
        $this->assertSame($invoice->id, (int) $log->auditable_id);
        $this->assertSame($invoice->invoice_number, $log->new_values['invoice_number']);

        $this->assertTrue(
            InvoiceEvent::where('invoice_id', $invoice->id)->where('type', 'issued')->exists()
        );
    }

    public function test_cancel_and_payment_write_audit_logs(): void
    {
        $service = app(InvoiceService::class);
        $invoice = $service->issue(Invoice::factory()->withDefaultItem()->create());

        $service->markPaid($invoice, [
            'paid_on' => '2026-08-01',
            'external_reference' => 'REF-XYZ',
        ]);

        $this->assertTrue(AuditLog::where('action', 'invoice.paid')->exists());

        $second = $service->issue(Invoice::factory()->withDefaultItem()->create());
        $service->cancel($second, 'Testgrund');

        $log = AuditLog::where('action', 'invoice.cancelled')->first();
        $this->assertSame('Testgrund', $log->new_values['reason']);
    }

    public function test_customer_changes_are_audited(): void
    {
        $this->post('/admin/rechnungen/kunden', [
            'legal_name' => 'Audit GmbH',
            'email' => 'audit@example.de',
            'address_line1' => 'Weg 1',
            'city' => 'Berlin',
            'country' => 'DE',
            'is_business' => true,
            'default_payment_terms_days' => 7,
        ]);

        $this->assertTrue(AuditLog::where('action', 'customer.created')->exists());

        $customer = Customer::first();
        $this->put("/admin/rechnungen/kunden/{$customer->id}", [
            'legal_name' => 'Audit Zwei GmbH',
            'email' => 'audit@example.de',
            'address_line1' => 'Weg 1',
            'city' => 'Berlin',
            'country' => 'DE',
            'is_business' => true,
            'default_payment_terms_days' => 7,
        ]);

        $log = AuditLog::where('action', 'customer.updated')->first();
        $this->assertSame('Audit GmbH', $log->old_values['legal_name']);
        $this->assertSame('Audit Zwei GmbH', $log->new_values['legal_name']);
    }

    public function test_audit_logs_are_append_only_records(): void
    {
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        $count = AuditLog::count();
        $this->assertGreaterThan(0, $count);

        // Kein Update-Pfad: Model hat UPDATED_AT = null und wird nur per create() genutzt
        $this->assertNull(AuditLog::first()->updated_at ?? null);
    }
}
