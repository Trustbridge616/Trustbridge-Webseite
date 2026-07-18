<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TrackingMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Order $order
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '📦 Versandbestätigung: Dein TrustBox Royale Paket ist unterwegs!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.tracking',
        );
    }
}
