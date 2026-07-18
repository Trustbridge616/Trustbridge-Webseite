<?php

namespace Database\Seeders;

use App\Models\MlmSetting;
use Illuminate\Database\Seeder;

class MlmSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key'   => 'commission_level_1_percent',
                'value' => '10',
                'label' => 'Level 1 Provision (%)',
                'type'  => 'decimal',
            ],
            [
                'key'   => 'commission_level_2_percent',
                'value' => '5',
                'label' => 'Level 2 Provision (%)',
                'type'  => 'decimal',
            ],
            [
                'key'   => 'commission_level_3_percent',
                'value' => '2',
                'label' => 'Level 3 Provision (%)',
                'type'  => 'decimal',
            ],
            [
                'key'   => 'mlm_levels',
                'value' => '3',
                'label' => 'Anzahl MLM-Ebenen',
                'type'  => 'integer',
            ],
            [
                'key'   => 'referral_free_package_threshold',
                'value' => '1',
                'label' => 'Empfehlungen für 1 Gratis-Paket',
                'type'  => 'integer',
            ],
            [
                'key'   => 'mlm_active',
                'value' => '1',
                'label' => 'MLM-System aktiv',
                'type'  => 'boolean',
            ],
            [
                'key'   => 'commission_payout_type',
                'value' => 'free_package',
                'label' => 'Provisionstyp (free_package / credit)',
                'type'  => 'string',
            ],
        ];

        foreach ($settings as $setting) {
            MlmSetting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
