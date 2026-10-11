<?php

/*
 * Trustbridge Finder — Konfiguration der KI-Engine.
 * Modellwahl, Effort, Aufbewahrung und Preistabelle (USD je Mio. Tokens) für
 * die Kostenberechnung im Studio-Testmodus. Preise laut offizieller
 * Preisseite, Stand 12.10.2026 — bei Änderungen hier nachziehen.
 */
return [
    // Modellkennung für den Finder (Qualität zuerst, Gründerentscheidung 12.10.2026)
    'model' => env('FINDER_MODEL', 'claude-opus-5-5'),

    // Denktiefe bei adaptivem Thinking: low | medium | high | xhigh | max
    'effort' => env('FINDER_EFFORT', 'medium'),

    'max_output_tokens' => (int) env('FINDER_MAX_OUTPUT_TOKENS', 4000),

    // Aufbewahrung gespeicherter Testgespräche in Tagen (Policy-Name wird je Session gespeichert)
    'retention_days' => (int) env('FINDER_RETENTION_DAYS', 90),
    'retention_policy' => env('FINDER_RETENTION_POLICY', 'testphase-2026-v1'),

    // USD je 1 Mio. Tokens: input, output, cache_read, cache_write_5m, cache_write_1h
    'pricing' => [
        'claude-opus-5-5' => ['input' => 4.00, 'output' => 20.00, 'cache_read' => 0.20, 'cache_write_5m' => 5.00, 'cache_write_1h' => 8.00],
        'claude-sonnet-5-5' => ['input' => 2.00, 'output' => 10.00, 'cache_read' => 0.20, 'cache_write_5m' => 2.50, 'cache_write_1h' => 4.00],
        'claude-haiku-5-5' => ['input' => 0.10, 'output' => 0.50, 'cache_read' => 0.01, 'cache_write_5m' => 0.125, 'cache_write_1h' => 0.20],
        'claude-fable-5-1' => ['input' => 10.00, 'output' => 50.00, 'cache_read' => 0.25, 'cache_write_5m' => 12.50, 'cache_write_1h' => 20.00],
    ],
];
