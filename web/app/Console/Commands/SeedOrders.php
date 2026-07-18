<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:seed-orders')]
#[Description('Command description')]
class SeedOrders extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = \App\Models\User::where('email', 'logistik@trustboxroyale.de')->first() ?? \App\Models\User::first();
        if (!$user) {
            $user = \App\Models\User::factory()->create();
        }
        
        \App\Models\Order::create(['user_id' => $user->id, 'amount' => 55.99, 'status' => 'paid', 'category_id' => 1, 'is_free' => false]);
        \App\Models\Order::create(['user_id' => $user->id, 'amount' => 0, 'status' => 'paid', 'category_id' => 2, 'is_free' => true]);
        \App\Models\Order::create(['user_id' => $user->id, 'amount' => 99.99, 'status' => 'pending', 'category_id' => 3, 'is_free' => false]);
        
        $this->info('Orders seeded successfully!');
    }
}
