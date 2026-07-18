<?php

namespace App\Services;

use App\Models\PaypalAccount;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaypalService
{
    /**
     * Wählt einen aktiven PayPal-Account für die Transaktion aus.
     * Nutzt Lastenverteilung (Account mit dem geringsten Umsatz).
     */
    public function getActiveAccount(): ?PaypalAccount
    {
        return PaypalAccount::where('is_active', true)
            ->orderBy('total_processed', 'asc')
            ->first();
    }

    /**
     * Holt den Access Token für einen spezifischen Account.
     */
    public function getAccessToken(PaypalAccount $account): ?string
    {
        $response = Http::asForm()
            ->withBasicAuth($account->client_id, $account->client_secret)
            ->post($this->getBaseUrl() . '/v1/oauth2/token', [
                'grant_type' => 'client_credentials'
            ]);

        if ($response->successful()) {
            return $response->json('access_token');
        }

        Log::error('PayPal Auth Failed for Account ID ' . $account->id, $response->json());
        return null;
    }

    /**
     * Erstellt eine Subscription/Order bei PayPal.
     */
    public function createOrder(PaypalAccount $account, $amount, $returnUrl, $cancelUrl)
    {
        $token = $this->getAccessToken($account);
        
        if (!$token) return null;

        $response = Http::withToken($token)->post($this->getBaseUrl() . '/v2/checkout/orders', [
            'intent' => 'CAPTURE',
            'purchase_units' => [
                [
                    'amount' => [
                        'currency_code' => 'EUR',
                        'value' => number_format($amount, 2, '.', '')
                    ]
                ]
            ],
            'application_context' => [
                'return_url' => $returnUrl,
                'cancel_url' => $cancelUrl
            ]
        ]);

        if ($response->successful()) {
            return $response->json();
        }

        Log::error('PayPal Create Order Failed', $response->json());
        return null;
    }

    private function getBaseUrl()
    {
        // Für Produktion zu 'https://api-m.paypal.com' ändern
        return 'https://api-m.sandbox.paypal.com';
    }
}
