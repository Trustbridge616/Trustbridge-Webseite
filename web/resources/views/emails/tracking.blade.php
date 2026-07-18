@extends('emails.layout')

@section('content')
    <h1>Dein Paket ist <span class="gold">unterwegs</span>! 📦</h1>
    <p>Hallo {{ $user->name }},</p>
    <p>gute Neuigkeiten! Dein Überraschungspaket von <strong>TrustBox Royale</strong> wurde gerade versendet.</p>
    
    <div style="background: #f8f6ff; padding: 20px; border-radius: 15px; margin: 20px 0; border: 1px solid rgba(45,27,84,0.1);">
        <p style="margin: 0;"><strong>Sendungsnummer:</strong></p>
        <p style="font-size: 1.5rem; font-family: monospace; color: #2D1B54; margin: 10px 0;">{{ $order->tracking_id }}</p>
    </div>
    
    <p>Du kannst den Status deiner Sendung jederzeit beim Versanddienstleister verfolgen.</p>
    
    <a href="{{ route('dashboard.bestellungen') }}" class="button">Bestellung ansehen</a>
    
    <p>Wir wünschen dir viel Freude beim Auspacken!<br>Dein TrustBox Royale Team</p>
@endsection
