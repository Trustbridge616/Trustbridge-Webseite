<?php

namespace App\Services\Invoicing\Airwallex;

use App\Services\Invoicing\Airwallex\Contracts\AirwallexClientInterface;

/**
 * V1-Binding: Airwallex ist bewusst nicht angebunden. Zahlungseingänge
 * werden manuell erfasst; dieses Objekt verhindert versehentliche
 * API-Aufrufe mit einer klaren Fehlermeldung.
 */
class NullAirwallexClient implements AirwallexClientInterface
{
    public function authenticate(): string
    {
        throw new \RuntimeException(
            'Airwallex-API ist in Version 1 nicht angebunden. '
            .'Zahlungen werden manuell als bezahlt markiert.'
        );
    }

    public function isConfigured(): bool
    {
        return false;
    }
}
