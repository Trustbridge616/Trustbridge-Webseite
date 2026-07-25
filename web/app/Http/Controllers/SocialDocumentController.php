<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Trustbridge Social — Dokument-Speicher + Publishing-Vorbereitung.
 *
 * Dokumente liegen als JSON unter storage/app/social-documents/.
 * Publishing ist bewusst als ehrlicher Stub implementiert: solange keine
 * Plattform-Zugangsdaten konfiguriert sind, wird der Status
 * "not_connected" gemeldet und NIE eine Veröffentlichung vorgetäuscht.
 * OAuth-Tokens gehören ausschließlich serverseitig (nie ins Frontend).
 */
class SocialDocumentController extends Controller
{
    private const DIR = 'social-documents';

    private function path(string $id): string
    {
        return self::DIR . '/' . basename($id) . '.json';
    }

    public function store(Request $request)
    {
        $id = 'doc-' . Str::lower(Str::random(10));
        $payload = [
            'id' => $id,
            'created_at' => now()->toIso8601String(),
            'updated_at' => now()->toIso8601String(),
            'data' => $request->all(),
            'render' => ['status' => 'draft'],
            'publish' => ['status' => 'draft', 'jobs' => []],
        ];
        Storage::put($this->path($id), json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return response()->json(['id' => $id], 201);
    }

    public function show(string $id)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        return response()->json(json_decode(Storage::get($this->path($id)), true));
    }

    public function update(Request $request, string $id)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        $doc = json_decode(Storage::get($this->path($id)), true);
        $doc['data'] = array_replace($doc['data'] ?? [], $request->all());
        $doc['updated_at'] = now()->toIso8601String();
        Storage::put($this->path($id), json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return response()->json(['id' => $id]);
    }

    /**
     * Rendering findet clientseitig im Builder statt (Canvas). Dieser
     * Endpoint markiert nur den Status für spätere Server-Renderings.
     */
    public function render(string $id)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        $doc = json_decode(Storage::get($this->path($id)), true);
        $doc['render'] = ['status' => 'ready', 'renderedAt' => now()->toIso8601String(), 'note' => 'Rendering erfolgt clientseitig im Builder.'];
        Storage::put($this->path($id), json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return response()->json($doc['render']);
    }

    public function renderStatus(string $id)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        return response()->json(json_decode(Storage::get($this->path($id)), true)['render'] ?? ['status' => 'draft']);
    }

    /** Verbindungsstatus je Plattform — ehrlich: ohne Credentials nicht verbunden. */
    public function connections()
    {
        return response()->json([
            'instagram' => $this->connectionFor('META_APP_ID', 'Meta Graph API (Instagram)'),
            'facebook' => $this->connectionFor('META_APP_ID', 'Meta Graph API (Facebook Pages)'),
            'tiktok' => $this->connectionFor('TIKTOK_CLIENT_KEY', 'TikTok Content Posting API'),
        ]);
    }

    private function connectionFor(string $envKey, string $label): array
    {
        $configured = (bool) env($envKey);
        return [
            'label' => $label,
            'status' => $configured ? 'credentials_configured_no_oauth' : 'not_connected',
            'note' => $configured
                ? 'Zugangsdaten vorhanden — OAuth-Verbindung noch nicht hergestellt.'
                : "Umgebungsvariable {$envKey} fehlt (siehe .env.example).",
        ];
    }

    /**
     * Publish/Schedule: idempotenter Job wird angelegt, aber niemals
     * ausgeführt, solange keine Plattform verbunden ist. Keine Simulation
     * einer erfolgreichen Veröffentlichung.
     */
    public function publish(Request $request, string $id)
    {
        return $this->createJob($request, $id, null);
    }

    public function schedule(Request $request, string $id)
    {
        $request->validate(['scheduledFor' => 'required|date']);
        return $this->createJob($request, $id, $request->input('scheduledFor'));
    }

    private function createJob(Request $request, string $id, ?string $scheduledFor)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        $doc = json_decode(Storage::get($this->path($id)), true);

        $idempotencyKey = $request->header('Idempotency-Key') ?: hash('sha256', $id . '|' . json_encode($request->input('targetPlatforms', [])) . '|' . ($scheduledFor ?? 'now'));
        foreach ($doc['publish']['jobs'] as $existing) {
            if (($existing['idempotencyKey'] ?? null) === $idempotencyKey) {
                return response()->json($existing, 200); // Doppelte Posts verhindern
            }
        }

        $job = [
            'id' => 'job-' . Str::lower(Str::random(10)),
            'documentId' => $id,
            'targetPlatforms' => $request->input('targetPlatforms', []),
            'scheduledFor' => $scheduledFor,
            'status' => 'awaiting_confirmation',
            'idempotencyKey' => $idempotencyKey,
            'attempts' => 0,
            'results' => [],
            'blockedReason' => 'Keine Plattform verbunden — Veröffentlichung nicht möglich. Verbindungen unter /api/social/connections prüfen.',
            'createdAt' => now()->toIso8601String(),
        ];
        $doc['publish']['jobs'][] = $job;
        $doc['publish']['status'] = 'awaiting_confirmation';
        Storage::put($this->path($id), json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        return response()->json($job, 202);
    }

    public function publishStatus(string $id)
    {
        if (!Storage::exists($this->path($id))) {
            return response()->json(['message' => 'Dokument nicht gefunden.'], 404);
        }
        return response()->json(json_decode(Storage::get($this->path($id)), true)['publish'] ?? ['status' => 'draft', 'jobs' => []]);
    }
}
