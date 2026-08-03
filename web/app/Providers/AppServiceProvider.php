<?php

namespace App\Providers;

use App\Models\Subscription;
use App\Services\Invoicing\Airwallex\Contracts\AirwallexClientInterface;
use App\Services\Invoicing\Airwallex\NullAirwallexClient;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Stripe\Stripe;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // V1: Airwallex bewusst nicht angebunden — Zahlungen werden manuell erfasst
        $this->app->bind(
            AirwallexClientInterface::class,
            NullAirwallexClient::class
        );
    }

    public function boot(): void
    {
        Cashier::useSubscriptionModel(Subscription::class);

        // Fix für lokale Entwicklung auf Windows ohne SSL-Bundle
        Stripe::setVerifySslCerts(false);

        // Telemetry deaktivieren (verhindert Rückrufe an Stripe bei jedem Request)
        Stripe::setEnableTelemetry(false);
    }
}
