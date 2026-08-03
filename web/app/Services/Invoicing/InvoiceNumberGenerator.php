<?php

namespace App\Services\Invoicing;

use App\Models\Invoice;
use App\Models\InvoiceSequence;
use Illuminate\Support\Facades\DB;

class InvoiceNumberGenerator
{
    /**
     * Atomar nächste Rechnungsnummer für ein Jahr ziehen.
     *
     * Es gibt bewusst keinen Dekrement-Pfad: Einmal gezogene Nummern werden
     * nie wiederverwendet, auch nicht nach Storno. Der Zähler heilt sich
     * zusätzlich an bereits vergebenen Nummern (Selbstschutz, falls die
     * Sequenz hinter dem Rechnungsbestand zurückliegt — z.B. nach einem
     * Rollback oder Datenimport).
     */
    public function next(int $year): string
    {
        $number = DB::transaction(function () use ($year) {
            $sequence = InvoiceSequence::query()
                ->where('year', $year)
                ->lockForUpdate()
                ->first();

            if (! $sequence) {
                $sequence = InvoiceSequence::create(['year' => $year, 'last_number' => 0]);
                // Erneut mit Lock laden, falls parallel angelegt (unique auf year)
                $sequence = InvoiceSequence::query()
                    ->where('year', $year)
                    ->lockForUpdate()
                    ->first();
            }

            $sequence->last_number = max($sequence->last_number, $this->maxUsedNumber($year)) + 1;
            $sequence->save();

            return $sequence->last_number;
        });

        return self::format($year, $number);
    }

    /**
     * Höchste bereits vergebene laufende Nummer eines Jahres
     * (numerisch, nicht lexikografisch — sicher auch jenseits von 9999).
     */
    private function maxUsedNumber(int $year): int
    {
        return Invoice::query()
            ->where('invoice_number', 'like', "TBI-{$year}-%")
            ->pluck('invoice_number')
            ->map(fn ($number) => (int) substr($number, strrpos($number, '-') + 1))
            ->max() ?? 0;
    }

    public static function format(int $year, int $number): string
    {
        return sprintf('TBI-%d-%04d', $year, $number);
    }
}
