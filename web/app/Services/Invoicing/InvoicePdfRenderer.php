<?php

namespace App\Services\Invoicing;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class InvoicePdfRenderer
{
    /**
     * Rendert das finale A4-PDF ausschließlich aus dem Snapshot-Array und
     * legt es auf der privaten local-Disk ab. Gibt den Storage-Pfad zurück.
     */
    public function renderAndStore(array $snapshot): string
    {
        $number = $snapshot['invoice']['number'];
        $year = substr((string) ($snapshot['invoice']['issue_date'] ?? now()->toDateString()), 0, 4);

        $dir = config('invoicing.pdf.storage_dir').'/'.$year;
        $path = "{$dir}/{$number}.pdf";

        Storage::disk('local')->put($path, $this->renderBinary($snapshot));

        return $path;
    }

    public function renderBinary(array $snapshot, ?string $watermark = null): string
    {
        return Pdf::loadView('pdf.invoice', ['snap' => $snapshot, 'watermark' => $watermark])
            ->setPaper('a4')
            ->output();
    }
}
