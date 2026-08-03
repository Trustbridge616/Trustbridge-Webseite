<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvoiceSnapshot extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['invoice_id', 'data', 'hash'];

    protected $casts = [
        'data' => 'array',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
