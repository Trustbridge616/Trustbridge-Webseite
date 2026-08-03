<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\InvoiceSequence;
use App\Services\Invoicing\InvoiceNumberGenerator;
use App\Services\Invoicing\InvoiceService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvoiceNumberingTest extends TestCase
{
    use RefreshDatabase;

    private function generator(): InvoiceNumberGenerator
    {
        return app(InvoiceNumberGenerator::class);
    }

    public function test_numbers_are_sequential_and_gapless(): void
    {
        $year = (int) date('Y');
        $numbers = [];

        for ($i = 0; $i < 50; $i++) {
            $numbers[] = $this->generator()->next($year);
        }

        $expected = array_map(
            fn ($n) => sprintf('TBI-%d-%04d', $year, $n),
            range(1, 50)
        );

        $this->assertSame($expected, $numbers);
        $this->assertSame(50, count(array_unique($numbers)));
    }

    public function test_years_have_separate_counters(): void
    {
        $this->assertSame('TBI-2026-0001', $this->generator()->next(2026));
        $this->assertSame('TBI-2027-0001', $this->generator()->next(2027));
        $this->assertSame('TBI-2026-0002', $this->generator()->next(2026));
    }

    public function test_draft_does_not_consume_a_number(): void
    {
        Invoice::factory()->withDefaultItem()->create();
        Invoice::factory()->withDefaultItem()->create();

        $this->assertSame(0, InvoiceSequence::query()->sum('last_number'));
        $this->assertNull(Invoice::first()->invoice_number);
    }

    public function test_cancellation_keeps_the_number(): void
    {
        Storage::fake('local');
        $service = app(InvoiceService::class);

        $invoice = Invoice::factory()->withDefaultItem()->create();
        $invoice = $service->issue($invoice);
        $number = $invoice->invoice_number;

        $service->cancel($invoice, 'Testtorno');

        $this->assertSame($number, $invoice->fresh()->invoice_number);

        // Nächste Rechnung bekommt die nächste, nie die stornierte Nummer
        $next = $service->issue(Invoice::factory()->withDefaultItem()->create());
        $this->assertNotSame($number, $next->invoice_number);
        $this->assertGreaterThan(
            (int) substr($number, -4),
            (int) substr($next->invoice_number, -4)
        );
    }

    public function test_issue_survives_number_collision_via_retry(): void
    {
        Storage::fake('local');
        $service = app(InvoiceService::class);
        $year = (int) date('Y');

        // Kollision provozieren: Nummer 0001 existiert bereits,
        // aber die Sequenz steht noch auf 0 (simulierter Race).
        Invoice::factory()->withDefaultItem()->create([
            'invoice_number' => sprintf('TBI-%d-0001', $year),
            'status' => Invoice::STATUS_ISSUED,
        ]);
        InvoiceSequence::query()->delete();

        $invoice = $service->issue(Invoice::factory()->withDefaultItem()->create());

        $this->assertSame(sprintf('TBI-%d-0002', $year), $invoice->invoice_number);
    }
}
