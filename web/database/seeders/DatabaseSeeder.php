<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\PaypalAccount;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin (Sponsor)
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'credit_balance' => 0.00,
        ]);

        // Ein geworbener User für MLM Tests
        User::create([
            'name' => 'Test Käufer',
            'email' => 'buyer@example.com',
            'password' => Hash::make('password'),
            'sponsor_id' => $admin->id,
            'credit_balance' => 0.00,
        ]);

        // PayPal Account
        PaypalAccount::create([
            'name' => 'Haupt Account',
            'client_id' => 'MOCK_CLIENT_ID',
            'client_secret' => 'MOCK_CLIENT_SECRET',
            'is_active' => true,
            'total_processed' => 0.00,
        ]);

        // Categories
        Category::create([
            'name' => 'Elektronik',
            'slug' => 'elektronik',
            'description' => 'Ungeprüfte Elektronik-Retouren. Von Kabeln bis zu Smart-Home Geräten ist alles dabei.',
            'base_price' => 49.99,
        ]);

        Category::create([
            'name' => 'Haushalt',
            'slug' => 'haushalt',
            'description' => 'Haushaltsgeräte und Deko-Artikel aus Retouren. Perfekt für den täglichen Bedarf.',
            'base_price' => 39.99,
        ]);

        Category::create([
            'name' => 'Textil & Kleidung',
            'slug' => 'textil',
            'description' => 'Kleidungspakete in verschiedenen Größen und Stilen. Markenware inklusive.',
            'base_price' => 29.99,
        ]);

        $this->call(InvoicingSeeder::class);
    }
}
