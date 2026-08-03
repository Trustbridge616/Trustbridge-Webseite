<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id', 'position',
        'title_en', 'title_de', 'description_en', 'description_de',
        'quantity_milli', 'unit', 'unit_price_cents', 'line_total_cents',
    ];

    protected $casts = [
        'position' => 'integer',
        'quantity_milli' => 'integer',
        'unit_price_cents' => 'integer',
        'line_total_cents' => 'integer',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
