@extends('emails.layout')

@section('content')
    <h1>Dein <span class="gold">Royale-Paket</span> ist in Arbeit!</h1>
    <p>Hallo {{ $user->name }},</p>
    <p>wir haben eine neue Zahlung für dein Abonnement erhalten. Dein nächstes Überraschungspaket wird jetzt zusammengestellt!</p>
    
    <p><strong>Bestell-Details:</strong><br>
    Betrag: {{ number_format($order->amount, 2) }} €<br>
    Kategorie: {{ $order->category ? $order->category->name : 'Gemischt' }}</p>
    
    <p>Sobald dein Paket versendet wurde, informieren wir dich erneut mit deiner Tracking-Nummer.</p>
    
    <a href="{{ route('dashboard.bestellungen') }}" class="button">Bestellung ansehen</a>
    
    <p>Vielen Dank für deine Treue!<br>Dein TrustBox Royale Team</p>
@endsection
