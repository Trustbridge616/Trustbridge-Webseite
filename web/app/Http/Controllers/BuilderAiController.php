<?php

namespace App\Http\Controllers;

use Anthropic\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BuilderAiController extends Controller
{
    private const MODEL = 'claude-opus-4-8';

    private const IMPROVE_MODES = [
        'verbessern'  => 'Verbessere den Text sprachlich: präziser, klarer, kraftvoller. Behalte Kernaussage und Ton bei.',
        'emotionaler' => 'Mache den Text emotionaler und berührender, ohne kitschig zu werden. Die Aussage soll direkt ins Herz treffen.',
        'kuerzer'     => 'Kürze den Text auf das Wesentliche. Jedes Wort muss verdient sein. Maximal so viele Zeilen wie das Original.',
        'spiritueller'=> 'Gib dem Text eine ruhige, spirituelle Tiefe: Vertrauen, inneres Wachstum, Loslassen. Keine religiösen Begriffe, keine Esoterik-Floskeln.',
        'trustbridge' => 'Bringe den Text in den Trustbridge-Stil: ruhig, würdevoll, vertrauensbildend. Bildsprache aus Nacht, Wald, Weg und Schwelle ist willkommen, aber sparsam. Keine Ausrufezeichen, keine Imperative in Großbuchstaben.',
    ];

    public function generate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'action' => 'required|in:caption,improve',
            'text'   => 'required|string|max:2000',
            'mode'   => 'nullable|string|in:' . implode(',', array_keys(self::IMPROVE_MODES)),
        ]);

        $apiKey = config('services.anthropic.key');
        if (!$apiKey) {
            return response()->json([
                'error' => 'Kein API-Key konfiguriert. Bitte ANTHROPIC_API_KEY in web/.env eintragen.',
            ], 503);
        }

        $client = new Client(apiKey: $apiKey);

        try {
            if ($validated['action'] === 'caption') {
                return $this->caption($client, $validated['text']);
            }

            return $this->improve($client, $validated['text'], $validated['mode'] ?? 'verbessern');
        } catch (\Anthropic\Core\Exceptions\APIStatusException $e) {
            return response()->json(['error' => 'KI-Anfrage fehlgeschlagen: ' . $e->getMessage()], 502);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Unerwarteter Fehler: ' . $e->getMessage()], 500);
        }
    }

    private function caption(Client $client, string $text): JsonResponse
    {
        $message = $client->messages->create(
            model: self::MODEL,
            maxTokens: 1024,
            system: 'Du bist Social-Media-Redakteur der Marke Trustbridge. '
                . 'Trustbridge steht für Vertrauen, inneres Wachstum und ruhige Stärke — Bildwelt: nächtlicher Wald, Weg, Schwelle. '
                . 'Ton: ruhig, würdevoll, nie marktschreierisch. Immer Deutsch, Du-Ansprache. '
                . 'Du schreibst Instagram-Captions zu Zitat-Karten.',
            messages: [[
                'role' => 'user',
                'content' => "Schreibe eine Instagram-Caption zu dieser Text-Karte:\n\n{$text}\n\n"
                    . 'Struktur: hook = eine aufmerksamkeitsstarke erste Zeile (kein reines Zitat der Karte); '
                    . 'zeilen = 3-4 kurze Zeilen, die den Gedanken vertiefen; '
                    . 'cta = ein ruhiger Call-to-Action mit Verweis auf @ben.trustbridge; '
                    . 'hashtags = 6-8 deutsche Hashtags zu Mindset/Vertrauen/Wachstum, immer inklusive #trustbridge.',
            ]],
            outputConfig: [
                'format' => [
                    'type' => 'json_schema',
                    'schema' => [
                        'type' => 'object',
                        'properties' => [
                            'hook'     => ['type' => 'string'],
                            'zeilen'   => ['type' => 'array', 'items' => ['type' => 'string']],
                            'cta'      => ['type' => 'string'],
                            'hashtags' => ['type' => 'array', 'items' => ['type' => 'string']],
                        ],
                        'required' => ['hook', 'zeilen', 'cta', 'hashtags'],
                        'additionalProperties' => false,
                    ],
                ],
            ],
        );

        if ($message->stopReason === 'refusal') {
            return response()->json(['error' => 'Die KI hat die Anfrage abgelehnt.'], 422);
        }

        $data = null;
        foreach ($message->content as $block) {
            if ($block->type === 'text') {
                $data = json_decode($block->text, true);
                break;
            }
        }

        if (!is_array($data)) {
            return response()->json(['error' => 'Antwort konnte nicht gelesen werden.'], 502);
        }

        return response()->json(['caption' => $data]);
    }

    private function improve(Client $client, string $text, string $mode): JsonResponse
    {
        $message = $client->messages->create(
            model: self::MODEL,
            maxTokens: 1024,
            system: 'Du überarbeitest kurze Zitat-Texte für Instagram-Karten der Marke Trustbridge (Vertrauen, inneres Wachstum, ruhige Stärke). '
                . 'Antworte ausschließlich mit dem überarbeiteten Text — keine Anführungszeichen, keine Erklärung, kein Kommentar. '
                . 'Behalte die Zeilenstruktur bei: jede Sinnzeile auf einer eigenen Zeile, Leerzeile = Absatz.',
            messages: [[
                'role' => 'user',
                'content' => self::IMPROVE_MODES[$mode] . "\n\nText:\n{$text}",
            ]],
        );

        if ($message->stopReason === 'refusal') {
            return response()->json(['error' => 'Die KI hat die Anfrage abgelehnt.'], 422);
        }

        $improved = '';
        foreach ($message->content as $block) {
            if ($block->type === 'text') {
                $improved = trim($block->text);
                break;
            }
        }

        if ($improved === '') {
            return response()->json(['error' => 'Leere Antwort erhalten.'], 502);
        }

        return response()->json(['text' => $improved]);
    }
}
