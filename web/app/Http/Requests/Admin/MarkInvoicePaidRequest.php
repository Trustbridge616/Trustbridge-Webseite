<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MarkInvoicePaidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'paid_on' => ['required', 'date'],
            'external_reference' => ['required', 'string', 'max:255'],
            'amount_cents' => ['nullable', 'integer', 'min:1'],
            'method' => ['nullable', 'string', 'max:64'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
