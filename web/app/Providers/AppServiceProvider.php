<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        \Laravel\Cashier\Cashier::useSubscriptionModel(\App\Models\Subscription::class);

        // Fix für lokale Entwicklung auf Windows ohne SSL-Bundle
        \Stripe\Stripe::setVerifySslCerts(false);
        
        // Telemetry deaktivieren (verhindert Rückrufe an Stripe bei jedem Request)
        \Stripe\Stripe::setEnableTelemetry(false);
    }
}
