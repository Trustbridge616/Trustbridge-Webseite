<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscription_id',
        'paypal_account_id',
        'transaction_id',
        'amount',
        'status',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function paypalAccount()
    {
        return $this->belongsTo(PaypalAccount::class);
    }
}
