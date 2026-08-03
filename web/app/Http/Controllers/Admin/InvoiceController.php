<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CancelInvoiceRequest;
use App\Http\Requests\Admin\MarkInvoicePaidRequest;
use App\Http\Requests\Admin\StoreInvoiceRequest;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceEvent;
use App\Services\Invoicing\InvoicePdfRenderer;
use App\Services\Invoicing\InvoiceService;
use App\Services\Invoicing\SnapshotBuilder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function __construct(
        private InvoiceService $service,
        private InvoicePdfRenderer $pdfRenderer,
    ) {}

    public function index(Request $request)
    {
        $query = Invoice::query()->with('customer:id,legal_name,customer_number');

        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', fn ($c) => $c->where('legal_name', 'like', "%{$search}%"));
            });
        }

        if ($status = $request->input('status')) {
            if ($status === 'overdue') {
                $query->overdue();
            } elseif ($status === 'open') {
                $query->open();
            } else {
                $query->where('status', $status);
            }
        }

        if ($from = $request->input('from')) {
            $query->whereDate('created_at', '>=', $from);
        }
        if ($to = $request->input('to')) {
            $query->whereDate('created_at', '<=', $to);
        }

        $invoices = $query->orderByDesc('id')->paginate(25)->withQueryString();

        $invoices->getCollection()->transform(fn (Invoice $invoice) => [
            'id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'status' => $invoice->status,
            'display_status' => $invoice->display_status,
            'customer' => $invoice->customer?->only(['id', 'legal_name', 'customer_number']),
            'issue_date' => $invoice->issue_date?->toDateString(),
            'due_date' => $invoice->due_date?->toDateString(),
            'total_cents' => $invoice->total_cents,
            'currency' => $invoice->currency,
            'created_at' => $invoice->created_at->toDateString(),
        ]);

        return Inertia::render('Admin/Invoices/Index', [
            'invoices' => $invoices,
            'stats' => [
                'draft' => Invoice::where('status', Invoice::STATUS_DRAFT)->count(),
                'open' => Invoice::open()->count(),
                'paid' => Invoice::where('status', Invoice::STATUS_PAID)->count(),
                'overdue' => Invoice::overdue()->count(),
                'cancelled' => Invoice::where('status', Invoice::STATUS_CANCELLED)->count(),
                'open_total_cents' => (int) Invoice::open()->sum('total_cents'),
            ],
            'filters' => $request->only(['search', 'status', 'from', 'to']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Invoices/Form', [
            'invoice' => null,
            'customers' => Customer::orderBy('legal_name')->get(),
            'defaults' => $this->formDefaults(),
        ]);
    }

    public function store(StoreInvoiceRequest $request)
    {
        $invoice = $this->service->createDraft($request->validated());

        return redirect()
            ->route('admin.invoices.show', $invoice)
            ->with('success', 'Entwurf gespeichert.');
    }

    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'items', 'snapshot', 'payments', 'events.user:id,name']);

        return Inertia::render('Admin/Invoices/Show', [
            'invoice' => [
                ...$invoice->toArray(),
                'display_status' => $invoice->display_status,
                'is_editable' => $invoice->isEditable(),
            ],
            'snapshot' => $invoice->snapshot?->data,
            'taxProfiles' => $this->taxProfiles(),
        ]);
    }

    public function edit(Invoice $invoice)
    {
        $this->service->assertEditable($invoice);

        $invoice->load(['customer', 'items']);

        return Inertia::render('Admin/Invoices/Form', [
            'invoice' => $invoice,
            'customers' => Customer::orderBy('legal_name')->get(),
            'defaults' => $this->formDefaults(),
        ]);
    }

    public function update(StoreInvoiceRequest $request, Invoice $invoice)
    {
        $invoice = $this->service->updateDraft($invoice, $request->validated());

        return redirect()
            ->route('admin.invoices.show', $invoice)
            ->with('success', 'Entwurf aktualisiert.');
    }

    public function destroy(Invoice $invoice)
    {
        $this->service->deleteDraft($invoice);

        return redirect()
            ->route('admin.invoices.index')
            ->with('success', 'Entwurf gelöscht.');
    }

    public function issue(Request $request, Invoice $invoice)
    {
        $confirmation = $request->validate([
            'business_use_confirmed' => ['nullable', 'boolean'],
            'evidence_reference' => ['nullable', 'string', 'max:255'],
        ]);

        $invoice = $this->service->issue($invoice, $confirmation);

        return back()->with('success', "Rechnung {$invoice->invoice_number} ausgestellt.");
    }

    /**
     * Entwurfs-PDF mit diagonalem ENTWURF-Wasserzeichen — wird live aus den
     * aktuellen Daten gerendert und nicht archiviert.
     */
    public function draftPdf(Invoice $invoice)
    {
        abort_unless($invoice->isDraft(), 404, 'Nur für Entwürfe. Ausgestellte Rechnungen haben ein finales PDF.');

        $snapshot = app(SnapshotBuilder::class)->build($invoice);

        InvoiceEvent::create([
            'invoice_id' => $invoice->id,
            'type' => 'pdf_downloaded',
            'payload' => ['draft' => true],
            'user_id' => auth()->id(),
        ]);

        return response($this->pdfRenderer->renderBinary($snapshot, 'ENTWURF'), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="Entwurf-'.$invoice->id.'.pdf"',
        ]);
    }

    public function markSent(Invoice $invoice)
    {
        $this->service->markSent($invoice);

        return back()->with('success', 'Als versendet markiert.');
    }

    public function markPaid(MarkInvoicePaidRequest $request, Invoice $invoice)
    {
        $this->service->markPaid($invoice, $request->validated());

        return back()->with('success', 'Als bezahlt markiert.');
    }

    public function cancel(CancelInvoiceRequest $request, Invoice $invoice)
    {
        $this->service->cancel($invoice, $request->validated()['cancellation_reason']);

        return back()->with('success', 'Rechnung storniert.');
    }

    public function duplicate(Invoice $invoice)
    {
        $copy = $this->service->duplicate($invoice);

        return redirect()
            ->route('admin.invoices.edit', $copy)
            ->with('success', 'Rechnung dupliziert — neuer Entwurf.');
    }

    public function pdf(Invoice $invoice)
    {
        abort_if($invoice->isDraft() || ! $invoice->snapshot, 404, 'Für Entwürfe existiert noch kein finales PDF.');

        // Snapshot ist die Wahrheit: fehlt die Datei (z.B. nach Umzug),
        // wird sie deterministisch neu gerendert.
        if (! $invoice->pdf_path || ! Storage::disk('local')->exists($invoice->pdf_path)) {
            $path = $this->pdfRenderer->renderAndStore($invoice->snapshot->data);
            $invoice->forceFill(['pdf_path' => $path])->save();
        }

        InvoiceEvent::create([
            'invoice_id' => $invoice->id,
            'type' => 'pdf_downloaded',
            'user_id' => auth()->id(),
        ]);

        return Storage::disk('local')->download(
            $invoice->pdf_path,
            "{$invoice->invoice_number}.pdf"
        );
    }

    private function formDefaults(): array
    {
        return [
            'currency' => config('invoicing.default_currency'),
            'language' => config('invoicing.default_language'),
            'payment_terms_days' => config('invoicing.default_payment_terms_days'),
            'tax_profile' => 'reverse_charge_german_b2b',
            'item' => config('invoicing.default_item'),
        ];
    }

    private function taxProfiles(): array
    {
        return collect(config('invoicing.tax_profiles'))
            ->map(fn ($profile, $key) => ['key' => $key, 'label' => $profile['label'], 'note' => $profile['note']])
            ->values()
            ->all();
    }
}
