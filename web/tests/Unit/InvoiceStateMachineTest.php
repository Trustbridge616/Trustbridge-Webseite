<?php

namespace Tests\Unit;

use App\Services\Invoicing\InvoiceStateMachine;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class InvoiceStateMachineTest extends TestCase
{
    public static function transitionProvider(): array
    {
        return [
            // from, to, allowed
            ['draft', 'issued', true],
            ['draft', 'sent', false],
            ['draft', 'paid', false],
            ['draft', 'cancelled', false],
            ['issued', 'sent', true],
            ['issued', 'paid', true],
            ['issued', 'cancelled', true],
            ['issued', 'draft', false],
            ['sent', 'paid', true],
            ['sent', 'cancelled', true],
            ['sent', 'issued', false],
            ['paid', 'cancelled', false], // Gutschrift statt Storno (V2)
            ['paid', 'draft', false],
            ['cancelled', 'issued', false],
            ['cancelled', 'draft', false],
        ];
    }

    #[DataProvider('transitionProvider')]
    public function test_transitions(string $from, string $to, bool $allowed): void
    {
        $machine = new InvoiceStateMachine;

        $this->assertSame($allowed, $machine->canTransition($from, $to));

        if (! $allowed) {
            $this->expectException(ValidationException::class);
        }

        $machine->assertTransition($from, $to);

        if ($allowed) {
            $this->addToAssertionCount(1);
        }
    }
}
