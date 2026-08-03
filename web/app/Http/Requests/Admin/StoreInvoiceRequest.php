<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'customer_id' => ['required', 'integer', 'exists:customers,id'],
            'tax_profile' => ['required', Rule::in(array_keys(config('invoicing.tax_profiles')))],
            'currency' => ['required', Rule::in(['EUR'])],
            'language' => ['required', Rule::in(['de', 'en', 'both'])],
            'payment_terms_days' => ['required', 'integer', 'min:0', 'max:365'],
            'service_period_start' => ['nullable', 'date'],
            'service_period_end' => ['nullable', 'date', 'after_or_equal:service_period_start'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.title_en' => ['required', 'string', 'max:255'],
            'items.*.title_de' => ['nullable', 'string', 'max:255'],
            'items.*.description_en' => ['nullable', 'string', 'max:2000'],
            'items.*.description_de' => ['nullable', 'string', 'max:2000'],
            'items.*.quantity_milli' => ['required', 'integer', 'min:1', 'max:1000000000'],
            'items.*.unit' => ['required', 'string', 'max:32'],
            'items.*.unit_price_cents' => ['required', 'integer', 'min:0', 'max:100000000000'],
        ];
    }
}
