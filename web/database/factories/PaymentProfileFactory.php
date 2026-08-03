<?php

namespace Database\Factories;

use App\Models\CompanyProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'company_profile_id' => CompanyProfile::factory(),
            'label' => 'Airwallex EUR',
            'provider' => 'airwallex',
            'beneficiary' => 'T_B International Holdings Limited',
            'iban' => 'DE52202208000058523311',
            'bic' => 'SXPYDEHH',
            'bank_name' => 'Banking Circle S.A.',
            'bank_country' => 'Germany',
            'currency' => 'EUR',
            'reference_hint' => 'Invoice number',
            'is_default' => true,
            'is_active' => true,
        ];
    }
}
