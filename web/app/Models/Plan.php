<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = ['name', 'tier', 'duration_months', 'price', 'description', 'stripe_price_id'];

    protected static function booted()
    {
        static::created(function ($plan) {
            // Automatically create product and price in Stripe if no price id is set
            if (!$plan->stripe_price_id) {
                \Stripe\Stripe::setApiKey(env('STRIPE_PRIVATE_KEY', env('STRIPE_SECRET')));
                $product = \Stripe\Product::create([
                    'name' => $plan->name,
                ]);

                $price = \Stripe\Price::create([
                    'product' => $product->id,
                    'unit_amount' => $plan->price * 100,
                    'currency' => 'eur',
                    'recurring' => ['interval' => 'month', 'interval_count' => $plan->duration_months],
                ]);

                $plan->updateQuietly(['stripe_price_id' => $price->id]);
            }
        });
    }
}
