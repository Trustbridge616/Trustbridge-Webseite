<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'subscription_id',
        'category_id',
        'amount',
        'status',
        'tracking_id',
        'invoice_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

