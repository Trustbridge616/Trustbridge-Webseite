# Trustbridge Social Media Studio

Interner Bereich unter **`/social`** (noindex): Ein Master-Inhalt erzeugt automatisch
perfektionierte Varianten für Instagram, TikTok und Facebook — mit Safe-Areas,
Auto-Layout, Plattform-UI-Vorschau, Validierung, Bild-/Video-Export und
Publishing-Vorbereitung.

> Stack-Hinweis: Das Projekt ist Laravel + Inertia + **Vue 3 (JavaScript)** mit
> Canvas-Rendering — kein Next.js/TypeScript. Das Konzept wurde 1:1 inhaltlich
> umgesetzt, Typisierung erfolgt über Struktur + Tests statt TS.

## Routen

| Route | Zweck |
|---|---|
| `/social` | Studio, Tab „Master" |
| `/social/{master\|instagram\|tiktok\|facebook\|alle\|publishing}` | Studio, direkter Tab |
| `/instagram` | → Redirect auf `/social/instagram` |
| `/social/export` | → Redirect auf `/social/alle` |
| `/builder/instagram` | **unverändert** — der bestehende Grundfoto-Builder |

### API (Web-Session + CSRF)

```
POST  /api/social/documents                  Dokument speichern
GET   /api/social/documents/{id}
PATCH /api/social/documents/{id}
POST  /api/social/documents/{id}/render      Status-Stub (Rendering ist clientseitig)
GET   /api/social/documents/{id}/render-status
POST  /api/social/documents/{id}/publish     legt idempotenten Job an, führt NIE aus
POST  /api/social/documents/{id}/schedule
GET   /api/social/documents/{id}/publish-status
GET   /api/social/connections                ehrlicher Verbindungsstatus je Plattform
```

Dokumente liegen als JSON unter `storage/app/social-documents/`.
Publishing ist ein **ehrlicher Stub**: ohne verbundene Konten wird nichts
veröffentlicht und nichts vorgetäuscht (`status: not_connected`,
`blockedReason` am Job). OAuth-Tokens gehören ausschließlich serverseitig.

## Dateien

| Datei | Inhalt |
|---|---|
| `resources/js/Pages/Builder/socialPresets.js` | **Einzige Quelle** für Presets, Safe-Areas, Sanitization, Content-Modell, Geometrie, Validierung (Node-testbar, kein DOM) |
| `resources/js/Pages/Builder/socialEngine.js` | Auto-Layout + Rendering (feed/reel/tiktok), Editor-Overlays, UI-Simulation |
| `resources/js/Pages/Builder/socialVideo.js` | Bild-zu-Video (Ken-Burns) über MediaRecorder |
| `resources/js/Pages/Builder/Social.vue` | Studio-Seite (Master, Plattform-Editoren, Alle Plattformen, Publishing) |
| `app/Http/Controllers/SocialDocumentController.php` | Dokument-Speicher + Publishing-Stubs |
| `tests/js/social.test.mjs` | 27 Unit-Tests (`npm run test:social`) |
| `tests/js/shot-social.mjs` | Screenshot-Utility (puppeteer-core + lokales Chrome/Edge) |

## Presets & Safe-Areas

10 Presets: `instagram-feed-portrait`, `instagram-reel`, `instagram-story`,
`instagram-cover`, `tiktok-video`, `tiktok-photo`, `tiktok-cover`,
`facebook-feed-portrait`, `facebook-reel`, `facebook-story`.
Facebook hat eigene Preset-Objekte (nichts ist mit Instagram „zusammengeklebt"),
teilt aber aktuell Geometrie-Konstanten.

Jedes Preset dokumentiert seine Quelle (`safeArea.source`):

- **Meta 9:16** (`official-percentage-guidance`): oben 14 % (269 px), unten 35 %
  (672 px), seitlich 6 % (65 px); Kernzone noch konservativer (108/340/760).
- **TikTok 9:16** (`conservative-builder-default`): empfohlene Zone
  x 90 / y 220 / 730×1050; Ausschlüsse: oben 180 px, rechte Leiste 820+/430+
  (260×1050), Caption-Zone ab 1420 (500 px), Navigation ab 1800.
- **Feed 4:5** (`conservative-builder-default`): Kernzone 72 px seitlich,
  135 px oben/unten (deckt 1:1-Anzeigen-Crop ab und übererfüllt die geforderten
  96 px); 3:4-Grid-Crop als Ausschlusszone seitlich 34 px + Crop-Vorschau.

Offizielle Overlay-Dateien können später als Assets hinterlegt und Presets auf
`source: 'official-overlay'` umgestellt werden.

## Auto-Layout

Zonen statt Whitespace: Hook → Hauptaussage → Vertiefung → Frage → CTA werden
als Rollen mit eigener Typografie gerendert (Hook: Gold/Caps, Statement: große
Serif, Frage: Mint kursiv). Footer: Bridge-Statement (türkis) + Markenreihe
**Logo links · „Trust Yourself & Bridge your Gap" mittig · Portrait rechts** —
alles innerhalb der empfohlenen Zone, zentriert auf die Zone (nicht den Canvas).

Text-Fitting: messen mit echten Fontmetriken → wrappen → Skalierung in
5-%-Schritten bis minimal 55 % der Idealgröße. Darunter: sichtbarer Überlauf +
Fehler in der Validierung („niemals unsichtbar abschneiden").
`sanitizeSocialText` entfernt führende Leerzeilen/Spaces und reduziert 3+
Leerzeilen auf 2 — Leerzeilen-Tricks sind wirkungslos und werden gewarnt.

TikTok ist eine eigenständige Komposition: linksbündig, Textzone links der
Interaktionsleiste, Marken ~28 % kleiner (brandScale 0.72), nichts unten.

## Typografie-System (Stand 25.07.2026)

Getrennte Felder **Hook / Hauptaussage / Reflexionsfrage / CTA** („Vertiefung"
ist in die mehrzeilige Hauptaussage aufgegangen; alte Speicherstände werden
beim Laden migriert). Jedes Feld hat:

- **Größenregler** in Prozent der Preset-Basisgröße (Hauptaussage = 100 %-Referenz).
  Bereiche: Hook 60–110, Hauptaussage 80–120, Frage 60–105, CTA 40–80.
  Plattform-Standards: Feed 85/100/85/55 · Reel 90/100/80/55 ·
  TikTok 95/100/80/55 · Story 90/100/80/60. Reset per ↺ oder Doppelklick.
- **Farbe**: Markenmodus (nur Tokens Weiß / Gedämpftes Weiß / Türkis / Gold)
  oder freier Modus (Color-Picker, Off-Palette wird markiert).
- **Abstände**: Abstand danach (Standardansicht); unter „Erweitert" zusätzlich
  Abstand davor, Zeilenhöhe, maximale Textbreite.

**Hierarchie-Wächter**: warnt (nicht blockierend), wenn Hook/Frage/CTA die
Hauptaussage dominieren — „Hierarchie optimieren" setzt verletzende Felder auf
Plattform-Standard zurück. **Farbharmonie**: Status Markenkonform /
Kontrastwarnung / Zu viele dominante Farben / Akzent zu häufig; Button
„Trustbridge-Farben automatisch anwenden" (Hook/Hauptaussage/Frage weiß,
CTA türkis). **Kontrastautomatik**: die Engine misst die Bildhelligkeit hinter
jedem Textblock und legt bei hellem/unruhigem Grund eine weiche lokale
Verdunklung + stärkeren Schatten darunter (kein Kasten) — identisch in
Vorschau und Export. **Typo-Presets**: Klar, Emotional, Poetisch, Direkt,
Minimal, Trustbridge Signature. Alle Regeln leben in `socialPresets.js`
(`TYPO_FIELDS`, `BRAND_COLORS`, `TYPO_PRESETS`, `checkHierarchy`, …).

## Validierung

`validateForPreset()` prüft Safe-Area-Einhaltung aller kritischen Elemente,
UI-Überlappungen, Überlauf, Mindestschrift, Caption/Alt-Text, Whitespace-Tricks,
Markenbausteine. Score = 100 − 25/Fehler − 8/Warnung − 2/Info.
90+ „Veröffentlichungsbereit" · 75+ „Gut" · 50+ „Überarbeitung empfohlen" ·
darunter „Nicht sicher veröffentlichbar".

## Export

- Einzelbild je Preset (PNG/JPEG/WebP laut Preset).
- Video für 9:16 (statisch, Zoom-in/out, Drift, Parallax, Text-Fade; 5/7/10/15 s)
  über `canvas.captureStream` + MediaRecorder. MP4 (H.264) wenn der Browser es
  unterstützt (Safari, neuere Chrome), sonst WebM — die UI meldet den echten
  Container. Kein serverseitiges ffmpeg nötig.
- **Post-Paket (ZIP)** mit der Struktur
  `master/ · instagram/ · tiktok/ · facebook/ · metadata/`
  (content.json, caption.txt, hashtags.txt, alle Bilder, in der Sitzung
  gerenderte Videos, post.json, validation.json, manifest.json).
- Overlays (Safe-Areas, UI-Simulation, Labels) existieren **nur** im
  Editor-Rendering — Export und ZIP rendern immer ohne.

## Publishing — nächste Schritte

**Meta (Instagram + Facebook):** App auf developers.facebook.com, Business-
Verifizierung, Berechtigungen `instagram_content_publish` +
`pages_manage_posts`, OAuth-Redirect serverseitig, Tokens verschlüsselt
speichern. Env: `META_APP_ID`, `META_APP_SECRET`, `META_REDIRECT_URI`.

**TikTok:** App auf developers.tiktok.com, Content Posting API, Scope
`video.publish`, App-Audit erforderlich. Env: `TIKTOK_CLIENT_KEY`,
`TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`.

Alle Variablen sind in `.env.example` dokumentiert. Der Job-Store ist
idempotent (Idempotency-Key verhindert Doppel-Posts); Veröffentlichung nur
nach expliziter Bestätigung.

## Bekannte Einschränkungen

- MP4 hängt von der Browser-Unterstützung ab (sonst WebM, ehrlich ausgewiesen).
- Reel-Videos im ZIP nur, wenn sie in der Sitzung gerendert wurden.
- Publishing-Provider sind Stubs — kein OAuth-Flow implementiert.
- Undo/Redo: aktuell nur Autosave (localStorage) + serverseitige Dokumente;
  Versionshistorie ist über die Dokument-API vorbereitet.
- Der bestehende `/builder/instagram` bleibt unverändert parallel bestehen.
