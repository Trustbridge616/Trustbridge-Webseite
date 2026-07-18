<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Packliste - Bestellung #{{ $order->id }}</title>
    <style>
        body { font-family: 'Arial', sans-serif; padding: 40px; color: #000; line-height: 1.5; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: bold; }
        .order-info { text-align: right; }
        h1 { font-size: 20px; margin-bottom: 5px; text-transform: uppercase; }
        .address-box { border: 1px solid #ccc; padding: 20px; width: 300px; margin-bottom: 40px; }
        .item-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .item-table th, .item-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        .item-table th { background-color: #f5f5f5; font-weight: bold; }
        .footer { text-align: center; font-size: 12px; color: #777; margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; }
        @media print {
            body { padding: 0; }
            .btn-print { display: none; }
        }
        .btn-print { background: #000; color: #fff; padding: 10px 20px; border: none; cursor: pointer; font-size: 14px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <button class="btn-print" onclick="window.print()">Packliste Drucken</button>

    <div class="header">
        <div class="logo">TrustBox Royale</div>
        <div class="order-info">
            <h1>Packliste & Lieferschein</h1>
            <p>Bestellung: <strong>#{{ $order->id }}</strong><br>Datum: {{ $order->created_at->format('d.m.Y H:i') }}</p>
        </div>
    </div>

    <div style="display: flex; gap: 50px;">
        <div>
            <strong>Versand an:</strong>
            <div class="address-box">
                {{ $order->user->name }}<br>
                {{ $order->user->street ?? 'Keine Straße' }} {{ $order->user->house_number ?? '' }}<br>
                {{ $order->user->zip ?? '00000' }} {{ $order->user->city ?? 'Unbekannt' }}<br>
                {{ $order->user->country ?? 'Deutschland' }}
            </div>
        </div>
        <div>
            <strong>Kundeninfo:</strong><br>
            Email: {{ $order->user->email }}<br>
            ID: {{ $order->user->id }}<br>
            Typ: {{ $order->is_free ? 'Gratis-Paket' : 'Standard Abo' }}
        </div>
    </div>

    <table class="item-table">
        <thead>
            <tr>
                <th>Menge</th>
                <th>Kategorie</th>
                <th>Beschreibung</th>
                <th>Bemerkung / Hinweis</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>1x</strong></td>
                <td>{{ $order->category ? $order->category->name : 'Gemischt' }}</td>
                <td>TrustBox Royale - Überraschungspaket</td>
                <td>
                    @if($order->is_free)
                    [GRATIS-PAKET] 
                    @endif
                    Bitte auf korrekte Gewichts- und Warenwertkriterien achten.
                </td>
            </tr>
        </tbody>
    </table>

    <div style="border: 1px dashed #ccc; padding: 20px;">
        <strong>Logistik-Notizen (Intern):</strong>
        <p style="margin-top: 10px;">Tracking-Nummer hier eintragen oder einscannen:</p>
        <div style="border-bottom: 1px solid #000; width: 300px; height: 20px; margin-top: 20px;"></div>
    </div>

    <div class="footer">
        Dies ist eine System-generierte Packliste für den Logistik-Partner (Vonexio).
    </div>
</body>
</html>
