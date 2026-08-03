<?php

namespace App\Services\Invoicing\Airwallex\Contracts;

use Illuminate\Http\Request;

/**
 * V2-Vorbereitung: Signaturprüfung eingehender Airwallex-Webhooks
 * (HMAC über Timestamp + Payload mit dem Webhook-Secret).
 */
interface WebhookVerifierInterface
{
    public function verify(Request $request): bool;
}
