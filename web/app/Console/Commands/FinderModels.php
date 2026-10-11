<?php

namespace App\Console\Commands;

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIStatusException;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

/**
 * Kostenfreier Account-Check vor dem ersten kostenpflichtigen Finder-Aufruf:
 * listet die für diesen API-Key verfügbaren Modelle (Models-API, keine
 * Nachrichten-Aufrufe) und prüft das in config/finder.php vorgesehene Modell.
 * Der Schlüssel wird nie ausgegeben oder protokolliert.
 */
#[Signature('finder:models {--model= : Zu prüfendes Modell (Standard: config finder.model)} {--json : Rohdaten als JSON ausgeben}')]
#[Description('Listet die verfügbaren Claude-Modelle und prüft das Finder-Modell (kostenfrei, keine Nachrichten-Aufrufe).')]
class FinderModels extends Command
{
    public function handle(): int
    {
        $apiKey = (string) config('services.anthropic.key');
        if ($apiKey === '') {
            $this->error('Kein API-Key: ANTHROPIC_API_KEY in web/.env ist leer.');

            return self::FAILURE;
        }

        $target = (string) ($this->option('model') ?: config('finder.model'));
        $client = new Client(apiKey: $apiKey);

        try {
            $page = $client->models->list(limit: 100);
            $models = $page->getItems();
        } catch (APIStatusException $e) {
            $this->error(sprintf('Models-API abgelehnt (HTTP-Status %s, Typ %s): %s', $e->status ?? '?', $e->type?->value ?? '?', $e->getMessage()));

            return self::FAILURE;
        } catch (APIConnectionException $e) {
            $this->error('Keine Verbindung zur API: '.$e->getMessage());

            return self::FAILURE;
        }

        if ($this->option('json')) {
            $this->line(json_encode(array_map(fn ($m) => $this->row($m), $models), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        } else {
            $this->info(sprintf('%d Modelle für diesen Account verfügbar%s:', count($models), ($page->hasMore ?? false) ? ' (weitere Seiten vorhanden)' : ''));
            $this->table(
                ['Modell-ID', 'Name', 'Veröffentlicht', 'Kontext (Tokens)', 'Max. Ausgabe'],
                array_map(fn ($m) => [
                    $m->id,
                    $m->displayName,
                    $m->createdAt->format('Y-m-d'),
                    $m->maxInputTokens !== null ? number_format($m->maxInputTokens, 0, ',', '.') : '–',
                    $m->maxTokens !== null ? number_format($m->maxTokens, 0, ',', '.') : '–',
                ], $models),
            );
        }

        // Zielmodell direkt auflösen (prüft auch Aliasse)
        try {
            $info = $client->models->retrieve($target);
        } catch (APIStatusException $e) {
            $this->error(sprintf('Finder-Modell "%s" ist für diesen Account NICHT verfügbar (HTTP-Status %s): %s', $target, $e->status ?? '?', $e->getMessage()));

            return 2;
        }

        $this->newLine();
        $this->info(sprintf('Finder-Modell "%s" ist verfügbar: %s (ID %s, Kontext %s, max. Ausgabe %s Tokens).',
            $target,
            $info->displayName,
            $info->id,
            $info->maxInputTokens !== null ? number_format($info->maxInputTokens, 0, ',', '.') : '–',
            $info->maxTokens !== null ? number_format($info->maxTokens, 0, ',', '.') : '–',
        ));

        $capabilities = $this->serialize($info->capabilities);
        if ($capabilities !== null) {
            $this->line('Fähigkeiten: '.json_encode($capabilities, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        }

        $pricing = config('finder.pricing.'.$info->id);
        if ($pricing) {
            $this->line(sprintf('Preistabelle (config/finder.php): %s $ Eingabe · %s $ Ausgabe · %s $ Cache-Lesen je Mio. Tokens', $pricing['input'], $pricing['output'], $pricing['cache_read']));
        } else {
            $this->warn('Für dieses Modell ist keine Preistabelle in config/finder.php hinterlegt — Kostenberechnung im Testmodus wäre leer.');
        }

        $this->line('Keine Nachrichten-Aufrufe ausgeführt — dieser Check ist kostenfrei.');

        return self::SUCCESS;
    }

    /** @return array<string, mixed> */
    private function row(object $m): array
    {
        return [
            'id' => $m->id,
            'display_name' => $m->displayName,
            'created_at' => $m->createdAt->format(DATE_ATOM),
            'max_input_tokens' => $m->maxInputTokens,
            'max_tokens' => $m->maxTokens,
            'capabilities' => $this->serialize($m->capabilities),
        ];
    }

    private function serialize(mixed $value): mixed
    {
        if ($value === null) {
            return null;
        }
        if ($value instanceof \JsonSerializable) {
            return $value->jsonSerialize();
        }
        if (is_object($value)) {
            return get_object_vars($value);
        }

        return $value;
    }
}
