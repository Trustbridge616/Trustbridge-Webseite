<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            1 => [
                'name' => '1 Paket',
                'prices' => [1 => 69.99, 3 => 62.99, 6 => 55.99],
                'desc' => 'Perfekt für Einsteiger. 1 Überraschungspaket pro Monat.'
            ],
            2 => [
                'name' => '2 Pakete',
                'prices' => [1 => 124.99, 3 => 112.49, 6 => 99.99],
                'desc' => 'Der Bestseller. 2 Überraschungspakete pro Monat.'
            ],
            3 => [
                'name' => '3 Pakete',
                'prices' => [1 => 179.99, 3 => 161.99, 6 => 143.99],
                'desc' => 'Das VIP-Paket. 3 Überraschungspakete pro Monat + Priority Support.'
            ],
        ];

        foreach ($tiers as $tierId => $data) {
            foreach ($data['prices'] as $months => $price) {
                Plan::updateOrCreate(
                    ['tier' => $tierId, 'duration_months' => $months],
                    [
                        'name' => $data['name'] . " ({$months} Mon.)",
                        'price' => $price,
                        'description' => $data['desc']
                    ]
                );
            }
        }
    }
}
