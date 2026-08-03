<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_number', 'legal_name', 'contact_name', 'email',
        'address_line1', 'address_line2', 'zip', 'city', 'country',
        'vat_id', 'is_business', 'default_payment_terms_days', 'notes',
    ];

    protected $casts = [
        'is_business' => 'boolean',
        'default_payment_terms_days' => 'integer',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public static function nextCustomerNumber(): string
    {
        $last = static::query()
            ->where('customer_number', 'like', 'TBC-%')
            ->orderByDesc('id')
            ->value('customer_number');

        $next = $last ? ((int) substr($last, 4)) + 1 : 1;

        return sprintf('TBC-%04d', $next);
    }
}
