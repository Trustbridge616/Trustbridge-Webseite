<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaypalAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'client_id',
        'client_secret',
        'is_active',
        'total_processed',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
