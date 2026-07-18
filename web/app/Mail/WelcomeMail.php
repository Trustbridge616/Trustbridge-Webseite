<?php

namespace App\Mail;

use App\Models\User;
use App\Models\Subscription;
use App\Models\Category;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Subscription $subscription,
        public ?Category $category = null
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Willkommen bei TrustBox Royale 👑',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome',
        );
    }
}
