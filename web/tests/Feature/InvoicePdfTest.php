<?php

namespace Tests\Feature;

use App\Models\Invoice;
use App\Models\User;
use App\Services\Invoicing\InvoiceService;
use App\Services\Invoicing\SnapshotBuilder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InvoicePdfTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    public function test_issue_stores_a_real_pdf(): void
    {
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        Storage::disk('local')->assertExists($invoice->pdf_path);

        $binary = Storage::disk('local')->get($invoice->pdf_path);
        $this->assertStringStartsWith('%PDF', $binary);
        $this->assertStringContainsString("/{$invoice->issue_date->year}/", '/'.$invoice->pdf_path);
    }

    public function test_rendered_html_shows_reverse_charge_note_but_no_zero_percent_tax_line(): void
    {
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        $html = view('pdf.invoice', ['snap' => $invoice->snapshot->data])->render();

        // Reverse-Charge-Hinweis immer zweisprachig (DE + EN)
        $this->assertStringContainsString('Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.', $html);
        $this->assertStringContainsString('Reverse charge – VAT payable by the recipient in accordance with Article 196 of Council Directive 2006/112/EC.', $html);
        // Kein 0%-Steuersatz — Regex mit (?<!\d), damit CSS-Breiten wie "50%" nicht matchen
        $this->assertDoesNotMatchRegularExpression('/(?<!\d)0\s?(?:,00\s?)?%/', $html);
        $this->assertStringNotContainsString('VAT 0', $html);

        // Absender- und Zahlungsblock
        $this->assertStringContainsString('a brand/project of', $html);
        $this->assertStringContainsString('T_B International Holdings Limited', $html);
        $this->assertStringContainsString('Hong Kong BRN / Company No.: 76661325', $html);
        $this->assertStringContainsString('DE52202208000058523311', $html);
        $this->assertStringContainsString('SXPYDEHH', $html);
        // Marken-Claim zweizeilig in Originalfarben (Türkis/Gold)
        $this->assertStringContainsString('TRUST', $html);
        $this->assertStringContainsString('YOURSELF &amp;', $html);
        $this->assertStringContainsString('YOUR GAP', $html);
        $this->assertStringContainsString('#8EF5D2', $html);
        $this->assertStringContainsString('#F0CF5A', $html);
        $this->assertStringContainsString('6.000,00', $html);
    }

    public function test_download_route_streams_pdf_for_admin(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        $response = $this->actingAs($admin)->get("/admin/rechnungen/{$invoice->id}/pdf");

        $response->assertOk();
        $response->assertDownload("{$invoice->invoice_number}.pdf");
    }

    public function test_download_rerenders_missing_pdf_from_snapshot(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        Storage::disk('local')->delete($invoice->pdf_path);

        $this->actingAs($admin)->get("/admin/rechnungen/{$invoice->id}/pdf")->assertOk();
        Storage::disk('local')->assertExists($invoice->fresh()->pdf_path);
    }

    public function test_draft_has_no_pdf(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $invoice = Invoice::factory()->withDefaultItem()->create();

        $this->actingAs($admin)->get("/admin/rechnungen/{$invoice->id}/pdf")->assertNotFound();
    }

    public function test_draft_pdf_downloads_with_watermark(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $invoice = Invoice::factory()->withDefaultItem()->create();

        $response = $this->actingAs($admin)->get("/admin/rechnungen/{$invoice->id}/entwurf-pdf");

        $response->assertOk();
        $response->assertHeader('Content-Type', 'application/pdf');
        $this->assertStringStartsWith('%PDF', $response->getContent());

        // Wasserzeichen steckt im gerenderten Layout
        $snapshot = app(SnapshotBuilder::class)->build($invoice);
        $html = view('pdf.invoice', ['snap' => $snapshot, 'watermark' => 'ENTWURF'])->render();
        $this->assertStringContainsString('ENTWURF', $html);
        $this->assertStringContainsString('watermark', $html);
    }

    public function test_draft_pdf_not_available_for_issued_invoices(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $invoice = app(InvoiceService::class)->issue(Invoice::factory()->withDefaultItem()->create());

        $this->actingAs($admin)->get("/admin/rechnungen/{$invoice->id}/entwurf-pdf")->assertNotFound();

        // Finales PDF trägt KEIN Wasserzeichen
        $html = view('pdf.invoice', ['snap' => $invoice->snapshot->data, 'watermark' => null])->render();
        $this->assertStringNotContainsString('>ENTWURF<', $html);
    }

    public function test_non_admin_cannot_download(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $invoice = app(InvoiceService::class)->issue(
            Invoice::factory()->withDefaultItem()->create()
        );

        $this->actingAs($user)->get("/admin/rechnungen/{$invoice->id}/pdf")->assertForbidden();
    }
}
