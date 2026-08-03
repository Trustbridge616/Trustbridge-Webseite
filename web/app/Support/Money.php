<?php

namespace App\Support;

/**
 * Geldbeträge ausschließlich als Integer-Cents. Mengen als Integer-Milli
 * (1000 = Menge "1"). Keine Float-Arithmetik.
 */
final class Money
{
    /**
     * Positionssumme: Einzelpreis (Cents) × Menge (Milli), kaufmännisch
     * gerundet (half-up) auf ganze Cents.
     */
    public static function lineTotal(int $unitPriceCents, int $quantityMilli): int
    {
        return intdiv($unitPriceCents * $quantityMilli + 500, 1000);
    }

    /**
     * Formatierung de-DE ohne Floats: 600000 => "6.000,00 €".
     */
    public static function formatEur(int $cents): string
    {
        $sign = $cents < 0 ? '-' : '';
        $cents = abs($cents);

        return $sign
            .number_format(intdiv($cents, 100), 0, ',', '.')
            .','.str_pad((string) ($cents % 100), 2, '0', STR_PAD_LEFT)
            .' €';
    }

    /**
     * "6000.00" oder "6.000,00" => 600000 Cents. Wirft bei unlesbarer Eingabe.
     */
    public static function parseToCents(string $value): int
    {
        $value = trim(str_replace(['€', ' ', "\u{a0}"], '', $value));

        if ($value === '') {
            throw new \InvalidArgumentException('Leerer Geldbetrag.');
        }

        // Deutsches Format: 1.234,56 — Punkt ist Tausendertrenner
        if (str_contains($value, ',')) {
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
        }

        if (! preg_match('/^-?\d+(\.\d{1,2})?$/', $value)) {
            throw new \InvalidArgumentException("Ungültiger Geldbetrag: {$value}");
        }

        $negative = str_starts_with($value, '-');
        $value = ltrim($value, '-');

        [$whole, $fraction] = array_pad(explode('.', $value, 2), 2, '');
        $fraction = str_pad(substr($fraction, 0, 2), 2, '0');

        $cents = ((int) $whole) * 100 + (int) $fraction;

        return $negative ? -$cents : $cents;
    }

    /**
     * Menge "1", "0,5", "1.5" => Milli-Integer (1000, 500, 1500).
     */
    public static function parseQuantityToMilli(string $value): int
    {
        $value = trim(str_replace(',', '.', $value));

        if (! preg_match('/^\d+(\.\d{1,3})?$/', $value)) {
            throw new \InvalidArgumentException("Ungültige Menge: {$value}");
        }

        [$whole, $fraction] = array_pad(explode('.', $value, 2), 2, '');
        $fraction = str_pad(substr($fraction, 0, 3), 3, '0');

        return ((int) $whole) * 1000 + (int) $fraction;
    }

    /**
     * Milli-Menge zur Anzeige: 1000 => "1", 500 => "0,5".
     */
    public static function formatQuantity(int $quantityMilli): string
    {
        $whole = intdiv($quantityMilli, 1000);
        $fraction = $quantityMilli % 1000;

        if ($fraction === 0) {
            return (string) $whole;
        }

        return $whole.','.rtrim(str_pad((string) $fraction, 3, '0', STR_PAD_LEFT), '0');
    }
}
