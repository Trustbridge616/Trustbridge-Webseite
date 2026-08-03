<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_ISSUED = 'issued';

    public const STATUS_SENT = 'sent';

    public const STATUS_PAID = 'paid';

    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'invoice_number', 'status', 'customer_id', 'company_profile_id', 'payment_profile_id',
        'tax_profile', 'currency', 'language',
        'issue_date', 'due_date', 'payment_terms_days',
        'service_period_start', 'service_period_end',
        'subtotal_cents', 'total_cents', 'notes', 'pdf_path', 'duplicated_from_id',
        'issued_at', 'sent_at', 'paid_at', 'cancelled_at', 'cancellation_reason',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'service_period_start' => 'date',
        'service_period_end' => 'date',
        'payment_terms_days' => 'integer',
        'subtotal_cents' => 'integer',
        'total_cents' => 'integer',
        'issued_at' => 'datetime',
        'sent_at' => 'datetime',
        'paid_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'payment_matched_at' => 'datetime',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function companyProfile()
    {
        return $this->belongsTo(CompanyProfile::class);
    }

    public function paymentProfile()
    {
        return $this->belongsTo(PaymentProfile::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class)->orderBy('position');
    }

    public function snapshot()
    {
        return $this->hasOne(InvoiceSnapshot::class);
    }

    public function payments()
    {
        return $this->hasMany(InvoicePayment::class);
    }

    public function events()
    {
        return $this->hasMany(InvoiceEvent::class)->orderByDesc('created_at');
    }

    public function isDraft(): bool
    {
        return $this->status === self::STATUS_DRAFT;
    }

    public function isEditable(): bool
    {
        return $this->isDraft();
    }

    /**
     * overdue wird nie persistiert, sondern immer berechnet — so ist es
     * ohne Scheduler jederzeit korrekt.
     */
    public function getIsOverdueAttribute(): bool
    {
        return in_array($this->status, [self::STATUS_ISSUED, self::STATUS_SENT], true)
            && $this->due_date !== null
            && $this->due_date->isBefore(today());
    }

    public function getDisplayStatusAttribute(): string
    {
        return $this->is_overdue ? 'overdue' : $this->status;
    }

    public function scopeOverdue(Builder $query): Builder
    {
        return $query->whereIn('status', [self::STATUS_ISSUED, self::STATUS_SENT])
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<', today());
    }

    public function scopeOpen(Builder $query): Builder
    {
        return $query->whereIn('status', [self::STATUS_ISSUED, self::STATUS_SENT]);
    }
}
