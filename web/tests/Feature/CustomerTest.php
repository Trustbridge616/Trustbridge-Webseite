<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['is_admin' => true]);
    }

    private function validPayload(array $overrides = []): array
    {
        return array_merge([
            'legal_name' => 'Muster GmbH',
            'contact_name' => 'Max Muster',
            'email' => 'buchhaltung@muster.de',
            'address_line1' => 'Musterstraße 1',
            'address_line2' => null,
            'zip' => '10115',
            'city' => 'Berlin',
            'country' => 'de',
            'vat_id' => 'DE123456789',
            'is_business' => true,
            'default_payment_terms_days' => 7,
            'notes' => null,
        ], $overrides);
    }

    public function test_create_customer_assigns_customer_number_and_uppercases_country(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/rechnungen/kunden', $this->validPayload())
            ->assertSessionHasNoErrors();

        $customer = Customer::first();
        $this->assertSame('TBC-0001', $customer->customer_number);
        $this->assertSame('DE', $customer->country);

        $this->actingAs($this->admin)
            ->post('/admin/rechnungen/kunden', $this->validPayload(['email' => 'zwei@muster.de']));

        $this->assertSame('TBC-0002', Customer::orderByDesc('id')->first()->customer_number);
    }

    public function test_required_fields(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/rechnungen/kunden', [])
            ->assertSessionHasErrors(['legal_name', 'email', 'address_line1', 'city', 'country']);
    }

    public function test_update_customer(): void
    {
        $customer = Customer::factory()->create();

        $this->actingAs($this->admin)
            ->put("/admin/rechnungen/kunden/{$customer->id}", $this->validPayload([
                'legal_name' => 'Neue Firma AG',
            ]))
            ->assertSessionHasNoErrors();

        $this->assertSame('Neue Firma AG', $customer->fresh()->legal_name);
    }

    public function test_customer_with_invoices_cannot_be_deleted(): void
    {
        $invoice = Invoice::factory()->create();
        $customer = $invoice->customer;

        $this->actingAs($this->admin)
            ->delete("/admin/rechnungen/kunden/{$customer->id}");

        $this->assertNotNull(Customer::find($customer->id));
    }

    public function test_customer_can_be_created_without_vat_id(): void
    {
        $this->actingAs($this->admin)
            ->post('/admin/rechnungen/kunden', $this->validPayload(['vat_id' => null]))
            ->assertSessionHasNoErrors();

        $this->assertNull(Customer::first()->vat_id);
    }

    public function test_customer_without_invoices_can_be_deleted(): void
    {
        $customer = Customer::factory()->create();

        $this->actingAs($this->admin)
            ->delete("/admin/rechnungen/kunden/{$customer->id}");

        $this->assertNull(Customer::find($customer->id));
    }
}
