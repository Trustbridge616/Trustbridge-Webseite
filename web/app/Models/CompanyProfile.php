<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'legal_name', 'sender_line',
        'address_line1', 'address_line2', 'city', 'region', 'country',
        'brn', 'company_no', 'website', 'email',
        'internal_meta', 'is_default',
    ];

    protected $casts = [
        'internal_meta' => 'array',
        'is_default' => 'boolean',
    ];

    // internal_meta darf niemals an das Frontend oder in Snapshots gelangen
    protected $hidden = ['internal_meta'];

    public function paymentProfiles()
    {
        return $this->hasMany(PaymentProfile::class);
    }
}
