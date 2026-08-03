<?php

namespace Database\Factories;

use App\Models\CompanyProfile;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\PaymentProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'invoice_number' => null,
            'status' => Invoice::STATUS_DRAFT,
            'customer_id' => Customer::factory(),
            'company_profile_id' => CompanyProfile::factory(),
            'payment_profile_id' => PaymentProfile::factory(),
            'tax_profile' => 'reverse_charge_german_b2b',
            'currency' => 'EUR',
            'language' => 'both',
            'payment_terms_days' => 7,
            'service_period_start' => now()->startOfMonth()->toDateString(),
            'service_period_end' => now()->endOfMonth()->toDateString(),
            'subtotal_cents' => 0,
            'total_cents' => 0,
        ];
    }

    public function withDefaultItem(): static
    {
        return $this->afterCreating(function (Invoice $invoice) {
            $invoice->items()->create([
                'position' => 1,
                'title_en' => 'Monthly Digital Development & Strategic Advisory Retainer',
                'title_de' => 'Monatliche digitale Weiterentwicklung und strategische Begleitung',
                'description_en' => 'Ongoing development pursuant to the Service Agreement.',
                'description_de' => 'Laufende Weiterentwicklung gemäß Service Agreement.',
                'quantity_milli' => 1000,
                'unit' => 'month',
                'unit_price_cents' => 600000,
                'line_total_cents' => 600000,
            ]);
            $invoice->forceFill(['subtotal_cents' => 600000, 'total_cents' => 600000])->save();
        });
    }
}
