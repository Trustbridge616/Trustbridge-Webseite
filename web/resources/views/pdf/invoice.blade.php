@php
    use App\Support\Money;

    /** @var array $snap  Vollständiger Invoice-Snapshot — einzige Datenquelle dieses Templates. */
    $inv = $snap['invoice'];
    $seller = $snap['seller'];
    $buyer = $snap['buyer'];
    $lang = $inv['language'] ?? 'both';
    $de = in_array($lang, ['de', 'both'], true);
    $en = in_array($lang, ['en', 'both'], true);

    // Feste Markenfarben (Vollton, keine Transparenzen — dompdf-sicher)
    $turquoise = '#8EF5D2';
    $gold = '#F0CF5A';
    $dark = '#1a1a2e';
    $violetDeep = '#1a0a36';
    $greyText = '#3d3d55';
    $greyMuted = '#8a8aa0';
    $greyLabel = '#55556d';
    $lineSoft = '#e4e4ee';

    $logoPath = public_path(config('invoicing.pdf.logo'));
    $signatureFile = storage_path('app/private/'.config('invoicing.pdf.signature_path'));

    $label = function (string $enText, string $deText) use ($en, $de) {
        if ($en && $de) return $enText.' / '.$deText;
        return $en ? $enText : $deText;
    };

    $fmtDate = function (?string $date) use ($en) {
        if (! $date) return '—';
        $c = \Carbon\Carbon::parse($date);
        return $en ? $c->format('d M Y') : $c->format('d.m.Y');
    };
@endphp
<!DOCTYPE html>
<html lang="{{ $en ? 'en' : 'de' }}">
<head>
<meta charset="utf-8">
<style>
    @font-face {
        font-family: 'Century Gothic';
        font-weight: normal;
        src: url('{{ public_path('fonts/centurygothic.ttf') }}') format('truetype');
    }
    @font-face {
        font-family: 'Century Gothic';
        font-weight: bold;
        src: url('{{ public_path('fonts/centurygothic_bold.ttf') }}') format('truetype');
    }

    /* A4 einseitig: unterer Rand reserviert Platz für den fixen Footer (~20mm).
       Papierformat kommt aus setPaper('a4'); Ränder als Einzel-Properties —
       dompdf übernimmt die Kurzschreibweise in @page nicht zuverlässig. */
    @page {
        margin-top: 9mm;
        margin-right: 12mm;
        margin-bottom: 26mm;
        margin-left: 12mm;
    }

    /* WICHTIG: Reset nur auf body und dessen Kinder — NIEMALS auf html.
       `html { margin: 0 }` hebelt in dompdf den unteren @page-Rand aus
       (verifiziert per Minimaltest: Inhalt liefe bis an die Seitenkante). */
    body, body * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
        font-family: 'Century Gothic', sans-serif;
        font-size: 8.5pt;
        color: {{ $dark }};
        line-height: 1.3;
    }

    /* Ohne collapse addiert dompdf pro Zeile border-spacing — kostet
       über die Seite verteilt >10mm. */
    table { border-collapse: collapse; border-spacing: 0; }

    /* ---------- Kopf: Logo + Absender links, Titel rechts ---------- */
    .header { width: 100%; margin-bottom: 3mm; }
    .header td { vertical-align: top; }
    /* Quelle 360×360px, Anzeige 80px → >4-fache Auflösung, keine Hochskalierung */
    .logo { width: 80px; height: 80px; }

    .sender-block { margin-top: 2mm; font-size: 8.5pt; color: {{ $greyText }}; line-height: 1.3; }
    .sender-block .sender-name { font-size: 11.5pt; font-weight: bold; color: {{ $dark }}; }
    .sender-block .sender-legal { font-weight: bold; margin-bottom: 0.8mm; }
    .sender-block .sender-meta { margin-top: 1.2mm; }

    .doc-title {
        text-align: right;
        font-size: 16.5pt;
        font-weight: bold;
        letter-spacing: 2.5px;
        color: {{ $dark }};
        white-space: nowrap;
    }
    .doc-title .accent {
        display: block;
        margin-top: 2mm;
        margin-left: auto;
        width: 42mm;
        border-bottom: 1.6pt solid {{ $turquoise }};
    }
    .doc-number { text-align: right; font-size: 9.5pt; margin-top: 2.5mm; color: {{ $greyLabel }}; }

    /* ---------- Empfänger + Metadaten ---------- */
    .parties { width: 100%; margin-bottom: 3mm; }
    .parties td { vertical-align: top; }
    .block-label {
        font-size: 6.8pt;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        color: {{ $greyMuted }};
        margin-bottom: 1.2mm;
    }
    .buyer-name { font-weight: bold; font-size: 10pt; }
    .buyer-block { font-size: 8.5pt; line-height: 1.3; color: {{ $greyText }}; }
    .buyer-block .vat-line { margin-top: 1.2mm; }
    .meta-table td { padding: 0.3mm 0; font-size: 8.5pt; line-height: 1.25; }
    .meta-table .k { color: {{ $greyMuted }}; padding-right: 3mm; white-space: nowrap; }

    /* ---------- Positionstabelle ---------- */
    .items { width: 100%; border-collapse: collapse; }
    .items thead th {
        font-size: 7pt;
        letter-spacing: 1.1px;
        text-transform: uppercase;
        text-align: left;
        color: {{ $greyLabel }};
        padding: 0 2mm 1.6mm 0;
        border-bottom: 1.6pt solid {{ $turquoise }};
    }
    .items thead th.num, .items tbody td.num { text-align: right; }
    .items tbody td {
        padding: 2mm 2mm 2mm 0;
        border-bottom: 0.6pt solid {{ $lineSoft }};
        vertical-align: top;
    }
    .item-title { font-weight: bold; font-size: 8.8pt; line-height: 1.3; }
    .item-title-de { font-weight: bold; font-size: 8.8pt; color: {{ $greyLabel }}; line-height: 1.3; }
    .item-desc { font-size: 7.5pt; color: #6b6b82; margin-top: 0.8mm; line-height: 1.3; }

    /* ---------- Summen ---------- */
    .totals-wrap { width: 100%; margin-top: 1mm; page-break-inside: avoid; }
    .totals-inner { width: 46%; margin-left: auto; }
    .totals-inner td { padding: 0.8mm 0; font-size: 8.8pt; }
    .totals-inner .amount { text-align: right; }
    .totals-inner .grand td {
        padding-top: 1.4mm;
        border-top: 1.2pt solid {{ $dark }};
        font-size: 11.5pt;
        font-weight: bold;
    }
    .gold-tick { border-bottom: 1.4pt solid {{ $gold }}; width: 11mm; margin: 1.2mm 0 0 auto; }

    /* ---------- Reverse-Charge-Hinweis (Textblock, keine Steuerzeile) ---------- */
    .tax-note {
        margin-top: 3mm;
        padding: 2mm 3.5mm;
        background: #F0FBF6;
        border-left: 2pt solid {{ $turquoise }};
        font-size: 7.8pt;
        color: {{ $greyText }};
        line-height: 1.35;
    }

    /* ---------- Zahlungsdaten (kompakt, direkt unter dem Hinweis) ----------
       Bewusst OHNE page-break-inside: avoid — dompdf schiebt den Block sonst
       trotz freiem Platz fälschlich auf Seite 2. */
    .payment { margin-top: 3.5mm; }
    .payment-title {
        font-size: 7pt;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        color: {{ $greyLabel }};
        border-bottom: 1.2pt solid {{ $turquoise }};
        padding-bottom: 1mm;
        margin-bottom: 1.4mm;
        width: 62mm;
    }
    .payment table td { padding: 0.4mm 0; font-size: 8.5pt; line-height: 1.25; }
    .payment table .k { color: {{ $greyMuted }}; padding-right: 5mm; white-space: nowrap; }
    .payment .ref { font-weight: bold; }

    /* ---------- Optionale Unterschrift ---------- */
    .signature { margin-top: 6mm; page-break-inside: avoid; }
    .signature img { height: 14mm; }
    .signature .sig-line { border-top: 0.6pt solid #b8b8c8; width: 50mm; padding-top: 1mm; font-size: 7.5pt; color: {{ $greyMuted }}; }

    /* ---------- Wasserzeichen (Entwurf) — Vollton, keine Transparenz ---------- */
    .watermark {
        position: fixed;
        top: 40%;
        left: 4%;
        width: 92%;
        text-align: center;
        font-size: 88pt;
        font-weight: bold;
        letter-spacing: 12px;
        color: #ECE9F4;
        transform: rotate(-30deg);
        z-index: 0;
    }

    /* ---------- Footer: fest im unteren Seitenrand, exakt zentriert ----------
       dompdf setzt bei negativem bottom die OBERKANTE um diesen Betrag unter
       das Inhaltsende — daher kleiner Wert + kompakter Footer (~20mm),
       passt vollständig in den 30mm-Seitenrand. */
    /* dompdf verankert die UNTERKANTE bei content_bottom + |bottom| —
       -24mm platziert den ~22mm hohen Footer vollständig im 26mm-Rand. */
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: -24mm;
        text-align: center;
        font-size: 6.8pt;
        color: {{ $greyMuted }};
        line-height: 1.35;
    }
    .claim-band {
        display: inline-block;
        background: {{ $violetDeep }};
        border-radius: 2mm;
        padding: 1.2mm 4mm 1.4mm;
        margin-bottom: 1.2mm;
        text-align: center;
        line-height: 1.4;
    }
    .claim-band .row {
        font-size: 7pt;
        font-weight: bold;
        letter-spacing: 2.2px;
    }
    .claim-band .mint { color: {{ $turquoise }}; }
    .claim-band .gold { color: {{ $gold }}; }
    .footer .brandline { color: {{ $greyLabel }}; }
</style>
</head>
<body>

    @if (! empty($watermark))
        <div class="watermark">{{ $watermark }}</div>
    @endif

    {{-- Kopf: Logo + Absender links, Titel rechts --}}
    <table class="header">
        <tr>
            <td style="width: 52%;">
                @if (is_file($logoPath))
                    <img src="{{ $logoPath }}" class="logo" alt="Trustbridge">
                @endif
                <div class="sender-block">
                    <div class="sender-name">{{ $seller['name'] }}</div>
                    <div class="sender-legal">{{ $seller['legal_name'] }}</div>
                    <div>{{ $seller['address_line1'] }}</div>
                    @if ($seller['address_line2'])<div>{{ $seller['address_line2'] }}</div>@endif
                    <div>{{ $seller['city'] }}@if ($seller['region']), {{ $seller['region'] }}@endif</div>
                    <div>{{ $seller['country'] }}</div>
                    <div class="sender-meta">
                        @if ($seller['brn_line'])<div>{{ $seller['brn_line'] }}</div>@endif
                        <div>{{ $seller['email'] }} · {{ str_replace('https://', '', $seller['website'] ?? '') }}</div>
                    </div>
                </div>
            </td>
            <td style="width: 48%;">
                <div class="doc-title">
                    {{ $label('INVOICE', 'RECHNUNG') }}
                    <span class="accent"></span>
                </div>
                @if ($inv['number'])
                    <div class="doc-number">{{ $inv['number'] }}</div>
                @endif
            </td>
        </tr>
    </table>

    {{-- Empfänger + Metadaten --}}
    <table class="parties">
        <tr>
            <td style="width: 52%;" class="buyer-block">
                <div class="block-label">{{ $label('Billed to', 'Rechnungsempfänger') }}</div>
                <div class="buyer-name">{{ $buyer['legal_name'] }}</div>
                @if ($buyer['contact_name'])<div>{{ $buyer['contact_name'] }}</div>@endif
                <div>{{ $buyer['address_line1'] }}</div>
                @if ($buyer['address_line2'])<div>{{ $buyer['address_line2'] }}</div>@endif
                <div>{{ trim(($buyer['zip'] ? $buyer['zip'].' ' : '').$buyer['city']) }}</div>
                <div>{{ $buyer['country'] }}</div>
                @if ($buyer['vat_id'])
                    <div class="vat-line">{{ $label('VAT ID', 'USt-IdNr.') }}: {{ $buyer['vat_id'] }}</div>
                @endif
            </td>
            <td style="width: 48%;">
                <div class="block-label">{{ $label('Invoice details', 'Rechnungsdaten') }}</div>
                <table class="meta-table">
                    <tr><td class="k">{{ $label('Invoice no.', 'Rechnungsnr.') }}</td><td><strong>{{ $inv['number'] ?? '—' }}</strong></td></tr>
                    <tr><td class="k">{{ $label('Invoice date', 'Rechnungsdatum') }}</td><td>{{ $fmtDate($inv['issue_date']) }}</td></tr>
                    <tr><td class="k">{{ $label('Due date', 'Fällig am') }}</td><td>{{ $fmtDate($inv['due_date']) }}</td></tr>
                    @if ($inv['service_period']['start'])
                        <tr>
                            <td class="k">{{ $label('Service period', 'Leistungszeitraum') }}</td>
                            <td>{{ $fmtDate($inv['service_period']['start']) }}&ndash;{{ $fmtDate($inv['service_period']['end']) }}</td>
                        </tr>
                    @endif
                    <tr><td class="k">{{ $label('Customer no.', 'Kundennr.') }}</td><td>{{ $buyer['customer_number'] }}</td></tr>
                    <tr><td class="k">{{ $label('Currency', 'Währung') }}</td><td>{{ $inv['currency'] }}</td></tr>
                </table>
            </td>
        </tr>
    </table>

    {{-- Positionen --}}
    <table class="items">
        <thead>
            <tr>
                <th style="width: 6%;">Pos.</th>
                <th style="width: 54%;">{{ $label('Description', 'Leistung') }}</th>
                <th class="num" style="width: 12%;">{{ $label('Qty', 'Menge') }}</th>
                <th class="num" style="width: 14%;">{{ $label('Unit price', 'Einzelpreis') }}</th>
                <th class="num" style="width: 14%;">{{ $label('Amount', 'Betrag') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($snap['items'] as $item)
                <tr>
                    <td>{{ $item['position'] }}</td>
                    <td>
                        @if ($en)<div class="item-title">{{ $item['title_en'] }}</div>@endif
                        @if ($de && $item['title_de'])<div class="{{ $en ? 'item-title-de' : 'item-title' }}">{{ $item['title_de'] }}</div>@endif
                        @if ($en && $item['description_en'])<div class="item-desc">{{ $item['description_en'] }}</div>@endif
                        @if ($de && $item['description_de'])<div class="item-desc">{{ $item['description_de'] }}</div>@endif
                    </td>
                    <td class="num">
                        {{ Money::formatQuantity($item['quantity_milli']) }}
                        {{ $item['unit'] === 'month' ? ($en ? 'month' : 'Monat') : $item['unit'] }}
                    </td>
                    <td class="num">{{ Money::formatEur($item['unit_price_cents']) }}</td>
                    <td class="num">{{ Money::formatEur($item['line_total_cents']) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- Summen --}}
    <table class="totals-wrap">
        <tr>
            <td>
                <table class="totals-inner">
                    <tr class="sub">
                        <td>{{ $label('Subtotal', 'Zwischensumme') }}</td>
                        <td class="amount">{{ Money::formatEur($inv['subtotal_cents']) }}</td>
                    </tr>
                    <tr class="grand">
                        <td>{{ $label('Total due', 'Gesamtbetrag') }}</td>
                        <td class="amount">{{ Money::formatEur($inv['total_cents']) }}</td>
                    </tr>
                </table>
                <div class="gold-tick"></div>
            </td>
        </tr>
    </table>

    {{-- Reverse-Charge-Hinweis: bewusst Textblock, keine 0%-Steuerzeile.
         Immer zweisprachig, unabhängig von der Rechnungssprache. --}}
    @if (! empty($snap['tax']['notice_de']) || ! empty($snap['tax']['notice_en']) || ! empty($snap['tax']['notice']))
        <div class="tax-note">
            @if (! empty($snap['tax']['notice_de']) || ! empty($snap['tax']['notice_en']))
                @if (! empty($snap['tax']['notice_de']))<div><strong>{{ $snap['tax']['notice_de'] }}</strong></div>@endif
                @if (! empty($snap['tax']['notice_en']))<div>{{ $snap['tax']['notice_en'] }}</div>@endif
            @else
                {{-- Fallback für ältere Snapshots ohne getrennte Sprachfassungen --}}
                {{ $snap['tax']['notice'] }}
            @endif
        </div>
    @endif

    {{-- Zahlungsdaten --}}
    <div class="payment">
        <div class="payment-title">{{ $label('Payment details', 'Zahlungsdaten') }}</div>
        <table>
            <tr><td class="k">Beneficiary</td><td>{{ $snap['payment']['beneficiary'] }}</td></tr>
            <tr><td class="k">IBAN</td><td>{{ $snap['payment']['iban'] }}</td></tr>
            <tr><td class="k">SWIFT/BIC</td><td>{{ $snap['payment']['bic'] }}</td></tr>
            <tr><td class="k">Bank</td><td>{{ $snap['payment']['bank_name'] }}, {{ $snap['payment']['bank_country'] }}</td></tr>
            <tr><td class="k">Currency</td><td>{{ $snap['payment']['currency'] }}</td></tr>
            <tr><td class="k">{{ $label('Payment reference', 'Verwendungszweck') }}</td><td class="ref">{{ $snap['payment']['reference'] }}</td></tr>
        </table>
    </div>

    {{-- Optionale Unterschrift: nur wenn die geschützte Datei existiert --}}
    @if (is_file($signatureFile))
        <div class="signature">
            <img src="{{ $signatureFile }}" alt="">
            <div class="sig-line">{{ $seller['legal_name'] }}</div>
        </div>
    @endif

    {{-- Fußzeile: fest im unteren Seitenrand --}}
    <div class="footer">
        <div class="claim-band">
            <div class="row"><span class="mint">TRUST </span><span class="gold">YOURSELF &amp;</span></div>
            <div class="row"><span class="gold">BRIDGE </span><span class="mint">YOUR GAP</span></div>
        </div>
        {{-- Vollständige Anschrift steht oben im Absenderblock — hier bewusst kompakt --}}
        <div class="brandline"><strong>{{ $seller['name'] }}</strong> — a brand/project of {{ $seller['legal_name'] }}</div>
        @if ($seller['brn_line'])<div>{{ $seller['brn_line'] }}</div>@endif
        <div>{{ str_replace('https://', '', $seller['website'] ?? '') }} · {{ $seller['email'] }}</div>
    </div>

</body>
</html>
