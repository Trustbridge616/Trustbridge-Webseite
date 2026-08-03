<?php

namespace App\Services\Invoicing\Airwallex\Contracts;

/**
 * V2-Vorbereitung: serverseitige Airwallex-Authentifizierung.
 * Credentials kommen ausschließlich aus config/services.php (ENV),
 * niemals in den Browser.
 */
interface AirwallexClientInterface
{
    /**
     * Authentifiziert gegen die Airwallex-API und gibt ein Access-Token zurück.
     */
    public function authenticate(): string;

    public function isConfigured(): bool;
}
