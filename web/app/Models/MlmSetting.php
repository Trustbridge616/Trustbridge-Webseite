<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MlmSetting extends Model
{
    protected $table = 'mlm_settings';

    protected $fillable = ['key', 'value', 'label', 'type'];

    /**
     * Get a setting value by key with optional default.
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();
        if (!$setting) return $default;

        return match($setting->type) {
            'integer' => (int) $setting->value,
            'decimal' => (float) $setting->value,
            'boolean' => (bool) $setting->value,
            default   => $setting->value,
        };
    }

    /**
     * Set (upsert) a setting value.
     */
    public static function set(string $key, $value): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
