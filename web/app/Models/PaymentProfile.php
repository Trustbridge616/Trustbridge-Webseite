<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_profile_id', 'label', 'provider', 'beneficiary',
        'iban', 'bic', 'bank_name', 'bank_country', 'currency',
        'reference_hint', 'is_default', 'is_active',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function companyProfile()
    {
        return $this->belongsTo(CompanyProfile::class);
    }
}
