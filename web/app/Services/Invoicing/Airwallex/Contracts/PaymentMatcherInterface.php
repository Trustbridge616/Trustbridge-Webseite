<?php

namespace App\Services\Invoicing\Airwallex\Contracts;

use App\Models\Invoice;

/**
 * V2-Vorbereitung: Deposit einer Rechnung zuordnen.
 *
 * Matching-Regeln: Rechnungsnummer im Verwendungszweck + Betrag + Währung.
 * Muss idempotent sein — derselbe Deposit (airwallex_deposit_id) darf eine
 * Rechnung nie doppelt als bezahlt markieren.
 */
interface PaymentMatcherInterface
{
    /**
     * @param  array{id: string, amount_cents: int, currency: string, reference: ?string, received_at: string}  $deposit
     */
    public function match(array $deposit): ?Invoice;
}
