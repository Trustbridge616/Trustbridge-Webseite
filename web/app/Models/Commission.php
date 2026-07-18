<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'referral_id',
        'referred_user_id',
        'subscription_id',
        'amount',
        'status',
        'type',
        'note',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function referral()
    {
        return $this->belongsTo(User::class, 'referral_id');
    }

    public function referredUser()
    {
        return $this->belongsTo(User::class, 'referred_user_id');
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }
}
