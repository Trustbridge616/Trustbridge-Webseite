@extends('emails.layout')

@section('content')
    <h1>Willkommen bei der <span class="gold">Royale-Familie</span>!</h1>
    <p>Hallo {{ $user->name }},</p>
    <p>vielen Dank für dein Vertrauen! Dein Abonnement bei <strong>TrustBox Royale</strong> wurde erfolgreich aktiviert.</p>
    <p>Wir bereiten dein erstes Überraschungspaket bereits vor. Sobald es unser Lager verlässt, erhältst du eine E-Mail mit der Sendungsnummer.</p>
    <p><strong>Dein Paket-Typ:</strong> {{ $subscription->name }}<br>
    <strong>Gewählte Kategorie:</strong> {{ $category->name ?? 'Gemischt' }}</p>
    
    <p>Du kannst deine Kategorie und dein Abo jederzeit in deinem Dashboard verwalten:</p>
    <a href="{{ route('dashboard') }}" class="button">Zum Dashboard</a>
    
    <p>Viel Spaß beim Auspacken!<br>Dein TrustBox Royale Team</p>
@endsection
