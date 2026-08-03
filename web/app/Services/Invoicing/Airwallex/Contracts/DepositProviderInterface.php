<?php

namespace App\Services\Invoicing\Airwallex\Contracts;

/**
 * V2-Vorbereitung: eingehende Deposits (Gutschriften) abrufen.
 */
interface DepositProviderInterface
{
    /**
     * @return iterable<array{id: string, amount_cents: int, currency: string, reference: ?string, received_at: string}>
     */
    public function listDeposits(\DateTimeInterface $since): iterable;
}
