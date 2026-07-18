<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        // Admin-Account
        User::updateOrCreate(
            ['email' => 'admin@trustboxroyale.de'],
            [
                'name' => 'Admin TBR',
                'email' => 'admin@trustboxroyale.de',
                'password' => Hash::make('Admin@TBR2024!'),
                'is_admin' => true,
                'credit_balance' => 0,
            ]
        );

        // Kunde 1
        User::updateOrCreate(
            ['email' => 'kunde@trustboxroyale.de'],
            [
                'name' => 'Max Musterkunde',
                'email' => 'kunde@trustboxroyale.de',
                'password' => Hash::make('Kunde@TBR2024!'),
                'is_admin' => false,
                'credit_balance' => 5.00,
            ]
        );

        // Kunde 2 (mit Empfehlung)
        $referrer = User::where('email', 'kunde@trustboxroyale.de')->first();
        User::updateOrCreate(
            ['email' => 'test2@trustboxroyale.de'],
            [
                'name' => 'Anna Testerin',
                'email' => 'test2@trustboxroyale.de',
                'password' => Hash::make('Test@TBR2024!'),
                'is_admin' => false,
                'credit_balance' => 0,
                'sponsor_id' => $referrer?->id,
            ]
        );

        $this->command->info('✅ Test-Nutzer erstellt! Credentials in TEST_LOGINS.md');
    }
}
