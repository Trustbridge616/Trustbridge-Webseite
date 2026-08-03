<?php

namespace Tests\Unit;

use App\Support\Money;
use PHPUnit\Framework\TestCase;

class MoneyTest extends TestCase
{
    public function test_line_total_simple(): void
    {
        // 6.000,00 € × 1
        $this->assertSame(600000, Money::lineTotal(600000, 1000));
    }

    public function test_line_total_half_quantity(): void
    {
        // 6.000,00 € × 0,5
        $this->assertSame(300000, Money::lineTotal(600000, 500));
    }

    public function test_line_total_rounds_half_up(): void
    {
        // 0,01 € × 0,5 = 0,005 € → rundet auf 0,01 €
        $this->assertSame(1, Money::lineTotal(1, 500));
        // 0,01 € × 0,4 = 0,004 € → rundet ab auf 0,00 €
        $this->assertSame(0, Money::lineTotal(1, 400));
        // 3,33 € × 1,333 = 4,438… → 4,44 €
        $this->assertSame(444, Money::lineTotal(333, 1333));
    }

    public function test_format_eur(): void
    {
        $this->assertSame('6.000,00 €', Money::formatEur(600000));
        $this->assertSame('0,00 €', Money::formatEur(0));
        $this->assertSame('0,05 €', Money::formatEur(5));
        $this->assertSame('1.234.567,89 €', Money::formatEur(123456789));
        $this->assertSame('-99,99 €', Money::formatEur(-9999));
    }

    public function test_parse_to_cents_german_format(): void
    {
        $this->assertSame(600000, Money::parseToCents('6.000,00'));
        $this->assertSame(600000, Money::parseToCents('6000,00 €'));
        $this->assertSame(600050, Money::parseToCents('6000,5'));
    }

    public function test_parse_to_cents_english_format(): void
    {
        $this->assertSame(600000, Money::parseToCents('6000.00'));
        $this->assertSame(600000, Money::parseToCents('6000'));
    }

    public function test_parse_to_cents_rejects_garbage(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        Money::parseToCents('abc');
    }

    public function test_quantity_parsing_and_formatting(): void
    {
        $this->assertSame(1000, Money::parseQuantityToMilli('1'));
        $this->assertSame(500, Money::parseQuantityToMilli('0,5'));
        $this->assertSame(1250, Money::parseQuantityToMilli('1.25'));
        $this->assertSame('1', Money::formatQuantity(1000));
        $this->assertSame('0,5', Money::formatQuantity(500));
        $this->assertSame('1,25', Money::formatQuantity(1250));
    }
}
