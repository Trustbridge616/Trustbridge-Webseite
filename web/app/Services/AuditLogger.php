<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AuditLogger
{
    /**
     * Schreibt einen Audit-Eintrag. Bank- und personenbezogene Daten werden
     * nur als Feldnamen protokolliert, sensible Werte maskiert.
     */
    public function log(string $action, Model $auditable, array $old = [], array $new = []): AuditLog
    {
        return AuditLog::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'auditable_type' => $auditable->getMorphClass(),
            'auditable_id' => $auditable->getKey(),
            'old_values' => $this->mask($old) ?: null,
            'new_values' => $this->mask($new) ?: null,
            'ip_address' => request()?->ip(),
        ]);
    }

    private function mask(array $values): array
    {
        $sensitive = ['iban', 'bic', 'password', 'internal_meta'];

        foreach ($values as $key => $value) {
            if (in_array(strtolower((string) $key), $sensitive, true)) {
                $values[$key] = '***';
            }
        }

        return $values;
    }
}
