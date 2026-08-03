<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    private static int $sequence = 0;

    public function definition(): array
    {
        self::$sequence++;

        return [
            'customer_number' => sprintf('TBC-%04d', self::$sequence + 1000),
            'legal_name' => $this->faker->company(),
            'contact_name' => $this->faker->name(),
            'email' => $this->faker->companyEmail(),
            'address_line1' => $this->faker->streetAddress(),
            'address_line2' => null,
            'zip' => $this->faker->postcode(),
            'city' => $this->faker->city(),
            'country' => 'DE',
            'vat_id' => 'DE'.$this->faker->numerify('#########'),
            'is_business' => true,
            'default_payment_terms_days' => 7,
            'notes' => null,
        ];
    }

    public function withoutVatId(): static
    {
        return $this->state(['vat_id' => null]);
    }

    public function privatePerson(): static
    {
        return $this->state(['is_business' => false, 'vat_id' => null]);
    }
}
