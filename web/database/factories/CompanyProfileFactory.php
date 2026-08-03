<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyProfileFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => 'Trustbridge',
            'legal_name' => 'T_B International Holdings Limited',
            'sender_line' => 'Trustbridge — a brand/project of T_B International Holdings Limited',
            'address_line1' => 'UNIT 915, 9/F., CONCORDIA PLAZA',
            'address_line2' => '1 SCIENCE MUSEUM ROAD',
            'city' => 'TSIM SHA TSUI',
            'region' => 'KOWLOON',
            'country' => 'HONG KONG SAR',
            'brn' => '76661325',
            'company_no' => '76661325',
            'website' => 'https://www.trustbridge.de',
            'email' => 'info@trustbridge.de',
            'internal_meta' => null,
            'is_default' => true,
        ];
    }
}
