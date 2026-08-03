<?php

namespace App\Services\Invoicing;

use App\Models\Invoice;
use Illuminate\Validation\ValidationException;

class InvoiceStateMachine
{
    /**
     * paid → cancelled ist bewusst verboten: Korrektur bezahlter Rechnungen
     * läuft über eine spätere Gutschrift (V2), nie über Storno.
     */
    private const TRANSITIONS = [
        Invoice::STATUS_DRAFT => [Invoice::STATUS_ISSUED],
        Invoice::STATUS_ISSUED => [Invoice::STATUS_SENT, Invoice::STATUS_PAID, Invoice::STATUS_CANCELLED],
        Invoice::STATUS_SENT => [Invoice::STATUS_PAID, Invoice::STATUS_CANCELLED],
        Invoice::STATUS_PAID => [],
        Invoice::STATUS_CANCELLED => [],
    ];

    public function canTransition(string $from, string $to): bool
    {
        return in_array($to, self::TRANSITIONS[$from] ?? [], true);
    }

    public function assertTransition(string $from, string $to): void
    {
        if (! $this->canTransition($from, $to)) {
            throw ValidationException::withMessages([
                'status' => "Statuswechsel von „{$from}“ nach „{$to}“ ist nicht erlaubt.",
            ]);
        }
    }
}
