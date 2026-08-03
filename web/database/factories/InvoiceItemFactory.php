<?php

namespace Database\Factories;

use App\Models\Invoice;
use App\Support\Money;
use Illuminate\Database\Eloquent\Factories\Factory;

class InvoiceItemFactory extends Factory
{
    public function definition(): array
    {
        $unitPrice = $this->faker->numberBetween(10000, 1000000);
        $quantity = 1000;

        return [
            'invoice_id' => Invoice::factory(),
            'position' => 1,
            'title_en' => $this->faker->sentence(4),
            'title_de' => $this->faker->sentence(4),
            'description_en' => null,
            'description_de' => null,
            'quantity_milli' => $quantity,
            'unit' => 'month',
            'unit_price_cents' => $unitPrice,
            'line_total_cents' => Money::lineTotal($unitPrice, $quantity),
        ];
    }
}
