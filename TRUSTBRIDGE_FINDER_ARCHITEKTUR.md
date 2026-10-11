# TRUSTBRIDGE FINDER – ARCHITEKTUR-EMPFEHLUNG

> Stand 12.10.2026. Antwort auf das verbindliche Architektur-Update des Gründers
> (KI-geführter Finder, Finder Studio, Astrologie als Kernbestandteil, späteres
> Portal). Status: **freigegeben am 12.10.2026** (Decision Log), ergänzt um die
> verbindlichen Festlegungen in Abschnitt 0.1. **Phase 0 ist umgesetzt** (siehe
> `web/resources/finder/`, `web/astro/`); Phase 1 beginnt nach Bens Gegenlesung
> des Sicherheitskerns (Aufwandsschätzung in Abschnitt 11 ist als grober Rahmen
> akzeptiert).
>
> Leitsatz: Der Mensch bringt seine Lebenssituation. Ben entwickelt die
> Methodik. Die KI verbindet Fragetechnik, psychologische Reflexion und
> astrologisch-spirituelle Perspektiven mit der individuellen Situation.
> Trustbridge macht Zusammenhänge sichtbar und begleitet zum eigenen Weg.

---

## 0. Kurzfassung

1. **Eine Engine, ein Aufruf pro Gesprächsschritt.** Der Finder ist kein
   Agenten-Framework, sondern ein `FinderEngine`-Service in Laravel, der pro
   Schritt genau einen Claude-Aufruf macht und eine **strukturierte Antwort**
   (JSON nach festem Schema, „FinderTurn“) zurückbekommt. Die KI wählt
   Frage, Spiegelung, Erklärung, Perspektive oder Darstellungsbaustein –
   immer aus dem, was Bens Methodik erlaubt.
2. **Vier Schichten, klar getrennt:**
   `Sicherheitskern (Code)` → `Methodik (Studio, versioniert)` →
   `Fakten (Gesprächsprotokoll + berechnete Astro-Daten)` → `Darstellung
   (registrierte Glas-Komponenten)`. Das Studio ändert nur die zweite Schicht.
3. **Astrologie ist von Anfang an im Datenmodell und im Antwortschema**
   (Einwilligung, Geburtsdaten-Profil, Astro-Fakten-Block, Baustein
   `astro_perspective`). Die Positionen kommen aus einer eigenen
   **Berechnungsschicht** (echte Ephemeriden, Node-Paket `astronomy-engine`),
   nie aus dem Sprachmodell. Die KI deutet nur innerhalb der im Studio
   hinterlegten Regeln und kennzeichnet jede Deutung als Reflexionsangebot.
4. **Finder Studio = geschützter Admin-Bereich** (bestehendes `admin`-
   Middleware + `AdminLayout`), in dem Module als versionierte Konfiguration
   bearbeitet, getestet (Vorschau-Session mit Begründungen der KI) und
   veröffentlicht werden. Laufende Sessions sind an eine Version gepinnt.
5. **Kleinster Prototyp (Phase 1):** Modul A „Authentizität“ (V0.1-Import)
   und Modul B „Jobverlust & Neuorientierung“ im Studio bearbeitbar, von der
   KI geführt, in der bestehenden `/trustbridgefinder`-Optik dargestellt –
   **mit echter astrologischer Berechnung** (Placidus und Whole Sign), einem
   ersten `astro_perspective`-Baustein, vollständiger Speicherung der
   Testgespräche und einem Testmodus, der technische Regeln getrennt von
   KI-Begründungen zeigt. Realistisch 3–4 Wochen (Abschnitt 11).

---

## 0.1 Verbindliche Festlegungen (Freigabe 12.10.2026)

Diese Festlegungen des Gründers haben bei Widersprüchen Vorrang vor allen
früheren Planungen in diesem Dokument.

1. **Personas statt Einheitsstil.** Der Gesprächsstil wird im Studio
   definiert: ein Persona-Modul enthält mehrere Stile (warm, klar,
   philosophisch, spirituell, sachlich …) mit Regeln, wann sie gelten; die
   Reise bestimmt je Phase/Frage den Stil, die KI wählt innerhalb dieser
   Vorgabe nach Nutzersignalen. Schema: `module-persona.schema.json`, Seed:
   `trustbridge-standard.persona.json`. Der Sicherheitskern bleibt davon
   unberührt (keine Diagnosen, keine vorgetäuschte Gewissheit, keine
   erzwungene positive Erkenntnis, keine Verharmlosung).
2. **Beide Häusersysteme im Kern.** Placidus und Whole Sign werden immer
   beide berechnet (`astro-facts.schema.json`: `houses.placidus`,
   `houses.whole_sign`, Planeten tragen beide Hauszuordnungen). Welches
   System gedeutet wird, ist Studio-Einstellung der Reise
   (`astro.house_system`) und wird pro Session fixiert.
3. **Erste Module.** Modul A „Authentizität“ (Grundlage Finder V0.1) und
   Modul B „Jobverlust & Neuorientierung“ (vier Leitfragen) starten parallel;
   beide liegen als Seeds in `web/resources/finder/modules/`.
4. **KI-Modell.** Qualität vor Kosten: `claude-opus-5-5` als erster
   Kandidat (laut offizieller Modellübersicht vom 12.10.2026 aktueller Opus,
   4 $/20 $ je Mio. Tokens, Cache-Lesen 0,20 $). Modell ist Konfiguration
   (`config/finder.php`). **Account-Check am 12.10.2026 bestanden:**
   `php artisan finder:models` (kostenfrei, Models-API) listet 13 Modelle,
   `claude-opus-5-5` ist verfügbar (1 Mio. Kontext, 128k Ausgabe,
   structured_outputs, adaptives Thinking, Effort low–max). Testmodus zeigt
   Tokens, Kosten je Schritt und je Gespräch, Antwortzeit und Modellkennung.
5. **Echte Astrologie im ersten Prototyp.** Berechnung (Geburtsdatum/-zeit/
   -ort, Zeitzonen, Planeten, Radix, Aspekte, Transite, beide Häusersysteme,
   strukturierte Astro-Daten, erste konfigurierbare Regeln, einfacher
   Astro-Baustein) gehört in Phase 1 – nicht Phase 3. Die Berechnungsschicht
   ist in Phase 0 gebaut und verifiziert (Abschnitt 5.6).
6. **Vollständige Speicherung der Testgespräche** mit ausdrücklicher
   Einwilligung, pseudonym ohne Registrierung: Eingaben, KI-Antworten,
   Kachelwahlen, Modulversionen, Frage-IDs, Phasen, angewendete Regeln,
   Fakten und Hypothesen getrennt, Astro-Analysen und Deutungsregeln, Finder
   Cards, Fehler/Abbrüche, Tokens/Modell/Kosten. Aufbewahrung mit
   konfigurierbarer Löschfrist (`config/finder.php: retention_days`),
   Löschfunktion, Zugriffsschutz (Studio). Keine Geheimnisse. Schemas:
   `session-record.schema.json`, `turn-record.schema.json`.
7. **Studio als Methodik-Werkzeug** mit Testmodus, der angewendete
   technische Regeln (`engine.gates`, `engine.applied_rules`) **getrennt** von
   KI-generierten Begründungen (`ai.rationale`) darstellt.
8. **Grundmodell bleibt:** Sicherheitskern → Methodik → Fakten/Astrologie →
   zentrale KI-Engine → strukturierte UI-Bausteine. Bestehendes Design und
   Finder V0.1 bleiben funktionsfähig. Bei API-Ausfällen bleiben laufende
   Gespräche erhalten und können wiederholt werden.
9. **Portal-Erweiterbarkeit** wie in Abschnitt 8.

---

## 1. Was heute im Repo schon da ist (und weiterverwendet wird)

| Baustein | Fundstelle | Verwendung im Finder-System |
|---|---|---|
| Anthropic-PHP-SDK, Structured Outputs (`outputConfig` json_schema), Fehlerbehandlung | `web/app/Http/Controllers/BuilderAiController.php`, `composer.json` (`anthropic-ai/sdk ^0.39`) | Vorlage für die Engine; derselbe Client, dasselbe Antwortformat-Prinzip. Modell für den Finder: `claude-opus-5-5` (Builder bleibt unberührt). |
| Admin-Schutz | `users.is_admin`, `EnsureUserIsAdmin`, Route-Gruppe `/admin`, `AdminLayout.vue` | Finder Studio hängt sich als neue Sidebar-Gruppe „Finder Studio“ ein. |
| Versionierung + Snapshots | Invoice Center (`invoice_snapshots`, `InvoiceStateMachine`) | Gleiches Prinzip für Modul-Versionen: Entwurf → veröffentlicht → archiviert, veröffentlichte Versionen sind unveränderlich. |
| Audit-Log | `AuditLogger`, `audit_logs` | Jede Studio-Änderung und jede Veröffentlichung wird protokolliert. |
| Feature-Tests | `tests/Feature/Invoice*Test.php`, `AdminAuthorizationTest.php` | Muster für Engine-, Schema- und Studio-Tests (KI-Aufruf wird gemockt). |
| Queue (database) | `.env.example`, `jobs`-Migration | Optional für Astro-Berechnung und spätere Auswertungen. |
| Finder V0.1 | `Pages/TrustbridgeFinder.vue`, `Components/Finder/*` | Wird zur **Darstellungsschicht**: Crystal-Cards, Protokoll-Panel, Textpanel, Methodik-Block, Finder Card sind die ersten registrierten Bausteine. `finderConfig.js` wird das erste Modul (Seed) im Studio. |
| Dashboard / Kundenbereich | `DashboardLayout.vue`, `Pages/Dashboard/*`, `DashboardController` | Fundament für das persönliche Portal (Gesprächsarchiv, Erkenntnisse, Astro-Profil). |
| Node-Werkzeuge im Projekt | `tests/js/*.mjs`, Puppeteer, Vite | Node ist bereits Teil der Toolchain → Astro-Berechnung als Node-CLI ist kein Fremdkörper. |
| Rechtsgrenzen & Ethikstandard | `TRUSTBRIDGE_LEGAL_BOUNDARIES.md`, Brief §13 | Werden 1:1 zum **Sicherheitskern** (Code, nicht im Studio änderbar). |

Nicht verwendet: TrustBox-Reste (Boxen, Kalkulation, Checkout). `/prizes` bleibt
bis zur Sichtprüfung Design-Spender.

---

## 2. Grundprinzip in der Architektur

```
SITUATION → VERSTEHEN → MUSTER ERKENNEN → ZUSAMMENHÄNGE ERKENNEN → PERSPEKTIVE ÖFFNEN → BRÜCKE BAUEN
```

Jedes Modul im Studio beschreibt diese Phasen. Der Finder V0.1
(FAKT → ABWEICHUNG → WARUM → MECHANIK → BRÜCKE) ist ein Spezialfall davon und
wird als Modul „Authentizität“ importiert. Phasen sind im Studio frei
benennbar; die Engine kennt nur: *Phase mit Zielen, Fragen-Pool, Gates,
erlaubten Bausteinen*.

**Rules first, KI innerhalb der Regeln.** Deterministische Dinge (Phase darf
erst wechseln, wenn Fakt X erfasst ist; bei Krisensignal Protokoll Z;
Verzweigung „wenn Abweichung = keine → Brücke“) entscheidet PHP **vor** dem
KI-Aufruf. Die KI entscheidet das, was Bens Methodik ihr überlässt: welche
Frage aus dem Pool jetzt sinnvoll ist, ob vertieft wird, ob gespiegelt oder
erklärt wird, welcher Baustein passt. So bleibt der Prozess steuerbar, ohne
dass Ben jede Verzweigung vorab festlegen muss.

---

## 3. Schichtenmodell

```
┌────────────────────────────────────────────────────────────────────┐
│ 4  DARSTELLUNG   Vue: Komponenten-Registry (Glaskacheln, Protokoll, │
│                  Finder Card, Astro-Perspektive, Video, Übung …)    │
├────────────────────────────────────────────────────────────────────┤
│ 3  ENGINE        PHP FinderEngine: Gates → Prompt-Komposition →     │
│                  Claude (Structured Output) → Validierung → Turn    │
├──────────────────────┬─────────────────────┬───────────────────────┤
│ 2a METHODIK (Studio) │ 2b FAKTEN           │ 2c ASTRO-BERECHNUNG   │
│ Module, Persona,     │ Session-Protokoll,  │ Node: Radix, Transite │
│ Reflexionsmodelle,   │ erfasste Fakten,    │ aus Ephemeriden,      │
│ Astro-Regeln,        │ Nutzerprofil        │ gecacht, nie KI       │
│ Komponenten-Regeln   │                     │                       │
├──────────────────────┴─────────────────────┴───────────────────────┤
│ 1  SICHERHEITSKERN (Code, Git-versioniert, im Studio NICHT änderbar)│
│    Rolle, Haltung, Krisenprotokoll, Rechtsgrenzen, Kennzeichnung    │
│    astrologischer Deutungen, Datenminimierung, Ausgabeschema        │
└────────────────────────────────────────────────────────────────────┘
```

### 3.1 Sicherheitskern (unveränderlich)

Liegt als PHP-Konstante/Datei im Repo (`resources/finder/core-system.md`),
wird als **erster** System-Block gesendet und per Test abgesichert. Inhalt:

- Rolle: Begleiter nach der Trustbridge-Methodik, keine Therapie, keine
  Diagnose, keine Heil-, Rechts-, Steuer-, Anlageberatung (Verweis auf
  Fachpartner), keine Erfolgsgarantien (siehe `TRUSTBRIDGE_LEGAL_BOUNDARIES.md`).
- Krisenprotokoll: Bei Hinweisen auf akute Selbst-/Fremdgefährdung wechselt
  die Engine in einen festen Modus (Hilfsangebote, Telefonseelsorge
  0800 111 0 111 / 0800 111 0 222, Notruf 112), kein Coaching mehr. Das
  Modell liefert dafür ein Flag (`safety.crisis_signal`), zusätzlich prüft PHP
  einfache Signalwörter – doppelt abgesichert.
- Astrologie: immer als „astrologische Perspektive / Reflexionsangebot“
  gekennzeichnet, nie als Vorhersage oder Entscheidungsgrund für Gesundheit,
  Geld, Recht. Ohne Geburtsdaten keine individuellen Deutungen.
- Haltung aus Brief §13: keine Angstmanipulation, keine falsche Autorität,
  Freiwilligkeit; „bewusster Kompromiss ist kein Bruch mit sich selbst“.
- Technik: Nutzertexte sind Daten, keine Anweisungen (Prompt-Injection);
  Ausgabe ausschließlich im FinderTurn-Schema; nur registrierte Bausteine.

Durchsetzung nicht nur per Prompt: Schema-Zwang (Structured Output),
Komponenten-Whitelist, serverseitiger Krisen-Override, Rate-Limits,
Längenbegrenzung.

### 3.2 Methodik-Schicht (Finder Studio)

Alles, was Ben bestimmen will, ist **Konfiguration**, nicht Code. Ein Modul
ist eine versionierte JSON-Struktur, die das Studio über Formulare bearbeitet
(kein JSON-Editor nötig, aber export-/importierbar):

```jsonc
{
  "kind": "journey",                       // journey | persona | reflection | astro_rules | components
  "slug": "gekuendigt",
  "title": "Ich wurde gekündigt und weiß nicht weiter",
  "entry": { "situations": ["Ich wurde gekündigt.", "Mein Job ist weg."], "match_hints": ["Kündigung", "Job verloren"] },
  "goal": "Die Person erkennt, was die Arbeit gegeben hat, was gefehlt hat, und findet einen tragfähigen nächsten Schritt.",
  "phases": [
    {
      "id": "verstehen", "label": "Verstehen",
      "goal": "Belastung und Fakten sichtbar machen, ohne zu bewerten.",
      "questions": [
        {
          "id": "belastung",
          "text": "Was belastet dich an dieser Situation gerade am meisten?",
          "purpose": "Trennt Faktum (Kündigung) von Bedeutung (Sicherheit, Identität, Scham).",
          "deepen_if": ["Antwort bleibt abstrakt", "mehrere Belastungen gleichzeitig"],
          "deepen_how": "Eine Belastung auswählen lassen, dann konkretisieren.",
          "components": ["free_text", "choice_cards"],
          "card_pool": [{ "label": "Sicherheit", "title": "Ich weiß nicht, wie es finanziell weitergeht." }, "..."]
        }
      ],
      "gate": { "requires_facts": ["belastung"], "max_turns": 4 }
    },
    { "id": "muster", "...": "…was gegeben, was gefehlt…" },
    { "id": "perspektive", "...": "…neue Möglichkeiten…", "astro": { "allowed": true, "when": "nach erster Erkenntnis, nie als Einstieg" } },
    { "id": "bruecke", "...": "…nächster Schritt…", "closing": "finder_card" }
  ],
  "branches": [
    { "when": { "fact": "belastung.kategorie", "equals": "finanzen" }, "then": { "insert_note": "Keine Finanzberatung – Fachpartner-Hinweis." } }
  ],
  "persona_ref": "trustbridge-standard",      // Ton & Gesprächsregeln (eigenes Modul)
  "reflection_models": ["gold-im-dunkeln", "fakt-vor-urteil"],
  "next_steps_templates": ["Gespräch nachholen", "Bedenkzeit", "…"]
}
```

Modul-Arten:

| kind | Inhalt | Beispiele |
|---|---|---|
| `journey` | Nutzerreise: Einstiegssituationen, Phasen, Fragen-Pools mit Zweck, Vertiefungsregeln, Gates, Verzweigungen, Erkenntnisziele, Brücken-Vorlagen, erlaubte Bausteine je Phase | Authentizität (V0.1-Import), Gekündigt, Beziehung, Neuorientierung |
| `persona` | Gesprächston, Du-Ansprache, Regeln für Spiegeln / Erklären / Nachfragen / Ermutigen, Beispielsätze, Wann-Wechsel von Fragen zu Erklärung/Visualisierung | „Trustbridge Standard“ |
| `reflection` | Perspektivwechsel- und Reflexionsmodelle als Bausteine mit Anwendungsregel | „Gold im Dunkeln“, „Fakt → Abweichung → Warum“, Lebenszyklen |
| `astro_rules` | Interpretationsregeln (Abschnitt 5) | Planet-in-Zeichen, Planet-in-Haus, Aspekte, Transite |
| `components` | Regeln, wann welcher Darstellungsbaustein angeboten wird (Video, Übung, Landkarte …) | „Video X nach Phase Perspektive, wenn Thema Y“ |

Jede Version bekommt ein Änderungsprotokoll; Sessions laufen auf der Version,
mit der sie begonnen haben (kein Bruch bei Veröffentlichung).

**Verbindliche Strukturen (Phase 0, 12.10.2026):** `web/resources/finder/schemas/`
(`module-journey`, `module-persona`, `module-astro-rules`, `finder-turn`,
`turn-record`, `session-record`, `astro-facts`) und `components.json`. Die
Persona enthält mehrere Stile mit `applies_when` (Phasen, Reisen, Themen,
Nutzersignale); Reisen setzen je Phase/Frage `style`; Verzweigungen können
den Stil umschalten. Prüfung: `npm run test:finder`.

### 3.3 Fakten-Schicht

- **Session-Protokoll**: strukturierte Fakten, die die Engine aus den
  Antworten extrahiert (`facts: { belastung: "...", gegeben: "...", … }`) –
  das heutige „Dein Protokoll“-Panel, nur KI-gestützt.
- **Astro-Fakten**: berechnete Positionen (Abschnitt 5), gecacht.
- **Profil** (später): Konto, Sprache, bisherige Erkenntnisse.

Die KI bekommt Fakten immer als klar abgegrenzten Datenblock, nicht als
Fließtext – das hält Deutungen nachvollziehbar.

### 3.4 Engine (PHP)

`app/Services/Finder/FinderEngine.php`, ein Ablauf pro Nutzer-Eingabe:

1. **Session laden** (Modulversion, Phase, Fakten, Verlauf, Astro-Einwilligung).
2. **Gates prüfen** (Phase erfüllt? Krisensignal? Turn-Limit?) – deterministisch.
3. **Prompt bauen** in dieser festen Reihenfolge (wichtig für Caching):
   `[Core-System (cacheControl)]` `[Modulversion + Persona + relevante Astro-Regeln, deterministisch gerendert (cacheControl, ttl 1h)]` `[Session-Kontext: Phase, Fakten, Astro-Fakten, Datum]` `[Verlauf]` `[Nutzer-Eingabe]`.
4. **Claude aufrufen**: `messages->create(model: 'claude-opus-5-5', maxTokens: 4000, system: [...], messages: [...], outputConfig: ['format' => ['type' => 'json_schema', 'schema' => FinderTurn::schema()]])`. Thinking ist bei Opus 5.5 immer aktiv (adaptiv); Tiefe über `outputConfig.effort` (`medium` als Start, `low` für reine Nachfragen) – kein `thinking`-Parameter, keine `tool_choice`-Erzwingung (beides führt bei 5.5 zu 400).
5. **Antwort validieren**: Schema (SDK), Bausteintypen gegen Registry, Krisen-Override, Längen, verbotene Zusagen (einfacher Mustercheck, z. B. „garantiert“, „heilt“).
6. **Fakten übernehmen, Phase ggf. wechseln, Turn speichern, zurückgeben.**
7. **Fehlerpfad**: `stopReason === 'refusal'` oder API-Fehler → ehrliche
   Meldung im Panther-Ton, der Fehler wird als Turn mit `error` gespeichert,
   die Session bleibt vollständig erhalten und der Nutzer kann denselben
   Schritt **wiederholen** (Retry-Button, idempotent über `seq`). Zusätzlich
   statischer Fallback (Modul-Fragen ohne KI, wie V0.1 heute). Der Finder
   bleibt ohne API-Key benutzbar.

### 3.5 Antwortschema „FinderTurn“ (strukturierte KI-Antwort)

```jsonc
{
  "phase": "verstehen",
  "intent": "question",            // question | mirror | explain | perspective | astro_perspective | exercise | next_step | closing | safety
  "message": "Du sagst, die Kündigung kam ohne Vorwarnung. Was davon wiegt gerade am schwersten – das Finanzielle, das Plötzliche oder etwas anderes?",
  "components": [
    { "type": "choice_cards", "label": "Belastung", "options": [ { "id": "finanzen", "label": "Finanzen", "title": "Ich weiß nicht, wie es weitergeht." }, "..." ] },
    { "type": "free_text", "placeholder": "Oder in deinen Worten …" }
  ],
  "facts": { "belastung": null },                     // was die KI aus der letzten Antwort extrahiert hat
  "question_ref": "belastung",                        // welche Studio-Frage gewählt wurde
  "rationale": "Phase Verstehen, Fakt 'belastung' fehlt; Antwort war abstrakt → Vertiefung nach deepen_how.",   // nur Studio-Testmodus
  "safety": { "crisis_signal": false, "boundary_hit": null }
}
```

Das Schema wird aus der Komponenten-Registry erzeugt (`type` ist ein Enum
der registrierten Bausteine). Die KI kann keinen Baustein erfinden und keinen
Frontend-Code liefern. `rationale` ist Bens Prüfwerkzeug im Testmodus und wird
Nutzern nie angezeigt.

### 3.6 Darstellungsschicht (Vue)

`resources/js/Components/Finder/registry.js` ordnet `type` → Komponente +
Props-Schema. Start-Registry (alles bereits in der V0.1-Optik vorhanden):

| type | Komponente (vorhanden) | Herkunft |
|---|---|---|
| `choice_cards` | Grid aus `FinderCrystalCard` | Zahlungsart-/Boxen-Kacheln |
| `free_text` | Textpanel (Preview-Panel-Optik) | V0.1 |
| `protocol` | Protokoll-Panel | Kalkulationspanel |
| `method_note` | „Zur Methode“-Block | PRO-TIPP-Block |
| `finder_card` | Finale-Karte | Epic-Checkout |
| `panther_note` | Panther-Toast / Panther-Reward | V0.1 |

Später (Abschnitt 7): `astro_perspective`, `decision_fork`, `development_map`,
`cycle_view`, `video`, `exercise`, `learning_card`, `insight_card`.
Die Registry-Datei (`resources/finder/components.json`) ist die **eine**
Quelle für Vue (Rendering) und PHP (Schema-Enum, Validierung).

---

## 4. Finder Studio

Route-Gruppe `/admin/finder-studio` (bestehendes `admin`-Middleware), Seiten in
`Pages/Admin/FinderStudio/*`, Sidebar-Gruppe „Finder Studio“ im `AdminLayout`.

| Seite | Funktion |
|---|---|
| Module | Liste aller Module (Art, Status, aktive Version, letzte Änderung), neues Modul, duplizieren, importieren/exportieren (JSON). |
| Reise-Editor | Phasen anlegen/ordnen; je Phase Ziel, Fragen-Pool (Text, Zweck, Vertiefungsregeln, erlaubte Bausteine, Kachel-Pool), Gate, Verzweigungen (Bedingung → Aktion), Brücken-Vorlagen. Formulare, keine Programmierung. |
| Persona & Gesprächsregeln | Ton, Regeln für Spiegeln/Erklären/Nachfragen/Ermutigen mit Beispielen, Wechselregeln (wann Erklärung/Visualisierung statt Frage). |
| Reflexionsmodelle | Perspektivwechsel-Bausteine mit Anwendungsregel. |
| Astro-Regeln | Tabellen-Editor für Konstellation → Bedeutung, Lebensbereich, Reflexionsfragen, Brückenansatz (Abschnitt 5.3). |
| Bausteine | Welche Bausteine wann angeboten werden; Videos/Übungen registrieren (URL, Titel, Thema). |
| **Testmodus** | Entwurfsversion in einer Sandbox-Session durchspielen; pro Schritt sichtbar, **in zwei getrennten Spalten**: (a) *Technik* – Phase, geprüfte Gates, angewendete Modulregeln, Verzweigung, vorgegebener Stil, Astro-Freigabe und übergebene Regeln (`engine.*`); (b) *KI* – gewählte Frage, `rationale`, Fakten und Hypothesen getrennt, Bausteine (`ai.*`). Dazu gesendeter Prompt (einklappbar), Modellkennung, Tokens, Kosten je Schritt und Gesamtkosten des Gesprächs, Antwortzeit. Optional Astro-Testprofil eingeben (beide Häusersysteme sichtbar). |
| **Gesprächsarchiv** | Alle gespeicherten Testgespräche (pseudonym): Filter nach Modul/Version/Phase/Datum, Nachlesen Schritt für Schritt in derselben Zwei-Spalten-Ansicht, Finder Cards, Fehler/Abbrüche, Kosten. Löschfrist sichtbar, Einzel- und Sammellöschung, Export als JSON. Nur für Admins. |
| Veröffentlichen | Entwurf → Version n (unveränderlich), Änderungsnotiz, Diff zur Vorversion, Audit-Log. Zurückrollen = ältere Version wieder aktiv setzen. |

Validierung: ein JSON-Schema je Modul-Art (`resources/finder/schemas/*.json`),
serverseitig geprüft (`opis/json-schema`), dieselben Schemas liefern dem
Formular die Feldbeschreibungen. Tests: Modul-Schema-Tests, Gate-Tests,
Engine-Tests mit gemocktem Claude-Client.

---

## 5. Astrologische Schicht

### 5.1 Grundsatz

**Berechnung und Deutung sind getrennt.** Positionen werden berechnet
(Abschnitt 5.2), Bedeutung kommt aus Bens Regeln (5.3), die Formulierung
macht die KI innerhalb dieser Regeln (5.4). Das Modell bekommt nie die
Aufgabe, Planetenstände zu „wissen“.

### 5.2 Berechnung (`web/astro/`, Node)

- Bibliothek: **`astronomy-engine`** (MIT, reine JS-Implementierung der
  JPL-/VSOP-basierten Modelle, Genauigkeit ≈ 1 Bogenminute für Planeten –
  für astrologische Zwecke mehr als ausreichend). Keine nativen Add-ons, kein
  Kompilieren unter Windows, keine AGPL-/Lizenzfrage wie bei Swiss Ephemeris.
  (Swiss Ephemeris bleibt als spätere Option, falls Asteroiden/Chiron oder
  Sub-Bogensekunden gebraucht werden – dann Lizenz prüfen.)
- Eigene, kleine Module: Aszendent/MC und Häuser (Whole Sign + Placidus),
  Aspekte mit Orben, Rückläufigkeit, Mondphase, mittlerer Mondknoten,
  Transite (aktuelle Positionen gegen Radix-Punkte/Häuser).
- Zeitzone & Ort: Offline-Ortsdatenbank (GeoNames `cities15000`, CC-BY) +
  `tz-lookup` → Geburtsort bleibt im Haus, kein externer Geocoder nötig.
  Ohne Geburtszeit: Sonnenstand-Horoskop ohne Häuser/Aszendent, als solches
  gekennzeichnet.
- Schnittstelle: CLI `node astro/chart.mjs '{"date":…,"time":…,"lat":…,"lon":…,"tz":…}'`
  → JSON; `node astro/transits.mjs` für ein Datum. PHP `AstroService` ruft es
  per Symfony Process auf und cacht: Radix einmal pro Profil
  (`astro_charts`), Transite pro Tag (`astro_transit_cache`).
- Tests: Vergleich einiger bekannter Daten gegen Referenzwerte (z. B.
  Positionen zum J2000-Epochendatum) – damit die Ephemeriden-Treue belegt ist.

### 5.3 Interpretationsregeln (Studio, Modul-Art `astro_rules`)

Regel-Schlüssel: `planet_in_sign`, `planet_in_house`, `aspect(p1,p2,type)`,
`transit(planet → natal_point | house)`, `cycle` (z. B. Saturn-Return,
Jupiter-Zyklus). Jede Regel: Bedeutung (Bens Worte), Lebensbereich(e),
Reflexionsfragen, Brückenansatz, Gewicht. Die Engine wählt pro Gespräch nur
die Regeln aus, die zu den aktuellen Astro-Fakten und zum Thema passen
(Lebensbereich-Match), und gibt nur diese an die KI – das hält den Prompt
klein und die Deutung an Bens Regeln gebunden.

### 5.4 Nutzung im Gespräch

- Einwilligung im UI (eigene Glaskachel „Astrologische Perspektive
  freischalten“), Geburtsdaten optional, jederzeit löschbar.
- Baustein `astro_perspective`: Überschrift „Astrologische Perspektive –
  ein Reflexionsangebot“, Konstellation in Klartext, Bens Deutung, 1–2
  Reflexionsfragen; später grafisch (Radix-Rad, Zyklus-Zeitstrahl).
- Modul-Regel bestimmt, **wann** Astro angeboten wird (z. B. erst nach einer
  ersten Erkenntnis, nie als Einstieg, nie bei Krisensignal).
- Ohne Geburtsdaten: nur allgemeine aktuelle Konstellationen (Mondphase,
  große Transite) als Reflexion, ausdrücklich ohne individuelle Aussage.

### 5.5 Daten & Recht

Geburtsdaten sind sensibel: eigene Tabelle `astro_profiles`, verschlüsselte
Spalten (Laravel `encrypted`-Cast), Zweckbindung, Löschfunktion, keine
Weitergabe an Dritte (der Claude-Aufruf enthält nur berechnete Fakten, keine
Rohdaten wie Geburtsort). Formulierungsgrenzen aus 3.1 gelten.

### 5.6 Stand 12.10.2026 – Berechnungsschicht gebaut und verifiziert

`web/astro/chart.mjs` (astronomy-engine 2.1.19) liefert Radix-Planeten,
Aszendent/MC, **Placidus und Whole Sign** (immer beide), Aspekte, mittleren
Mondknoten, Mondphase, Transite zu Radix-Punkten und Zyklen (Saturn-,
Jupiter-, Knoten-Wiederkehr, Uranus-Opposition); Zeitzonen über die
IANA-Datenbank (iterativ, Sommerzeit/historische Versätze) oder LMT.
Ausgabe nach `astro-facts.schema.json`.

`npm run astro:verify` prüft gegen unabhängige Referenzen – **28/28 bestanden**:
Albert Einstein (14.03.1879 11:30 LMT Ulm, Referenz astrotheme.com):
alle zehn Planeten auf ≤ 0,01°, alle Placidus-Häuser identisch, Aszendent
Δ 0,013°, MC Δ 0,007°; scheinbare Sonnenlänge J2000 (Meeus) Δ 0,009°;
Sonnenfinsternis 08.04.2024 (Sonne 19°24' Widder, Konjunktion Δ 0,04°);
Frühlingsäquinoktium 2026 auf 24 Sekunden genau. Grenzen: Placidus jenseits
der Polarkreise nicht definiert (dann nur Whole Sign, mit Hinweis); keine
Asteroiden/Chiron; ohne Geburtszeit keine Häuser und Mond ±7° (Hinweis in
`notes`). Noch offen für Phase 1: Offline-Ortsdatenbank für die
Geburtsort-Eingabe und der PHP-`AstroService` mit Cache.

---

## 6. Datenmodell (MySQL, neue Tabellen)

| Tabelle | Zweck |
|---|---|
| `finder_modules` | id, kind, slug, title, status, current_version_id, created_by |
| `finder_module_versions` | module_id, version_no, config (JSON), changelog, published_at, created_by – veröffentlicht = unveränderlich |
| `finder_sessions` | nach `session-record.schema.json`: id (uuid), user_id (nullable), anon_token_hash, tester_label, status, consents (Test-Speicherung + Astro, mit Zeitpunkt und Textversion), Modulversionen, state (Phase, Fakten, Finder Card), astro (house_system, profile_id), totals (Tokens, Kosten, Aufrufe, Fehler), retention (expires_at, policy, deleted_at) |
| `finder_turns` | nach `turn-record.schema.json`: session_id, seq, role, user (Text, Kachelwahl), ai (FinderTurn), engine (Gates, angewendete Regeln, Verzweigung, Stilvorgabe, Safety-Override, Astro-Regeln, Prompt-Hashes), usage (Modell, Tokens, Kosten, Latenz, stop_reason), error |
| `astro_profiles` | user_id oder session_id, birth_date, birth_time (nullable), place, lat, lon, tz (verschlüsselt), consent_at |
| `astro_charts` | profile_id, chart (JSON), engine_version, computed_at |
| `astro_transit_cache` | date, lat/lon-Raster, positions (JSON) |
| `finder_insights` (später) | user_id, session_id, finder_card (JSON), next_step, created_at – Basis für Portal |
| `audit_logs` (vorhanden) | Studio-Änderungen, Veröffentlichungen |

Testphase: Sessions werden mit ausdrücklicher Einwilligung **vollständig**
gespeichert; die Aufbewahrung ist konfigurierbar (`config/finder.php:
retention_days`, Policy-Name in `retention.policy`), ein täglicher
Scheduler-Job löscht abgelaufene Sessions samt Turns und Astro-Daten
(`finder:purge`). Vor der Freischaltung externer Tester wird die konkrete
Frist festgelegt. Bei Registrierung werden Sessions über `anon_token_hash`
dem Konto zugeordnet. Mehrsprachigkeit
(Gründerentscheidung 04.08.2026): Modul-Texte als `texts.de / texts.en`
innerhalb der Version, Deutsch führend.

---

## 7. Visuelles Erlebnis & Lerninhalte

Alle neuen Bausteine entstehen in der bestehenden Glas-Optik (Crystal-Card,
Plateau, Kalkulationspanel, PRO-TIPP, Epic-Card) – keine neue Designsprache.

| Baustein | Idee | Grundlage |
|---|---|---|
| `decision_fork` | Zwei bis drei Wege als Crystal-Cards mit Konsequenz-Zeile | Boxen-Auswahl |
| `development_map` | Phasen als Flow-Connector-Linie mit Stationen | Verbindungslinien |
| `cycle_view` | Lebens-/Astro-Zyklus als Zeitstrahl mit Marker „heute“ | Plateau |
| `astro_perspective` | Konstellation + Deutung + Fragen; später Radix-Rad (SVG) | Kalkulationspanel |
| `video` | Kurzes Erklärvideo (bestehender Video-Stage-Rahmen aus `/prizes`) | Vision-Video |
| `exercise` | Geführte Übung mit Schritten und Timer | PRO-TIPP + Finder-Nav |
| `learning_card` / `insight_card` | Lernkarte / persönliche Erkenntniskarte, speicherbar | Finder Card |

Die KI wählt nur `type` + Inhalte; Layout und Animation sind fest. Außen
einfach, innen intelligent, visuell unverwechselbar.

---

## 8. Späteres Portal – was jetzt schon vorbereitet wird

- `finder_sessions.user_id` + `finder_insights` → Gesprächsarchiv und
  Erkenntnisse ohne Umbau.
- `astro_profiles` am Konto → astrologisches Profil + „aktuelle Themen“
  (Transite des Tages).
- Dashboard-Seiten `Dashboard/Finder.vue`, `Dashboard/Astro.vue` im
  bestehenden `DashboardLayout`.
- Empfehlungen/Angebote: Modul-Konfiguration kann pro Phase ein
  `offer_ref` tragen (Kurs, Workshop) – Anzeige über Registry-Baustein,
  Logik später.
- Community und Wissensinhalte: eigene Bereiche, keine Abhängigkeit im Kern.

---

## 9. Kosten, Latenz, Betrieb

- Modell `claude-opus-5-5` (4 $/20 $ pro Mio. Tokens, Cache-Lesen 0,20 $ –
  offizielle Modellübersicht und Preisseite, Abruf 12.10.2026; Alternativen
  `claude-sonnet-5-5` 2 $/10 $, `claude-haiku-5-5` ab 0,10 $/0,50 $,
  `claude-fable-5-1` 10 $/50 $). Pro Schritt grob: Kern + Modul ≈ 6–8k Tokens
  (gecacht), Verlauf 2–6k, Antwort ≈ 0,5–1k, adaptives Denken 0,5–2k →
  **≈ 0,03–0,07 $ je Schritt**, ein Gespräch mit 12 Schritten ≈ 0,40–0,80 $.
  Modell ist Konfiguration (`config/finder.php`), ein Wechsel ist eine Zeile.
  Opus 5.5: Denken immer aktiv (adaptiv), Tiefe über `effort` (Default
  `medium`), keine erzwungene `tool_choice` – passt zum Structured-Output-Ansatz.
- **Verfügbarkeit für unseren Account geprüft (12.10.2026):**
  `php artisan finder:models` (`app/Console/Commands/FinderModels.php`,
  kostenfreier Abruf der Models-API) bestätigt `claude-opus-5-5` mit
  structured_outputs, adaptivem Thinking (`enabled`/`disabled` nicht
  unterstützt – wie geplant kein `thinking`-Parameter) und Effort
  low–max; ebenfalls verfügbar: Sonnet 5.5, Haiku 5.5, Fable 5.1, Opus 4.8.
  Monatliches Guthaben: 100 USD. Erster kostenpflichtiger Aufruf erst im
  Studio-Testmodus nach Bens Freigabe. Preistabelle und Modellwahl liegen
  in `config/finder.php`.
- Latenz 3–8 s pro Schritt; UI zeigt den Panther „denkt“ (vorhandener
  Toast-Stil). Streaming ist mit dem PHP-SDK möglich, bei strukturierten
  Antworten aber zweiter Schritt.
- Caching greift nur, wenn Kern und Modul byte-identisch gerendert werden:
  sortierte Schlüssel, keine Zeitstempel vor dem Cache-Breakpoint. Prüfung
  über `usage->cacheReadInputTokens` im Testmodus.
- Rate-Limit pro Session/IP, Turn-Obergrenze pro Gespräch, Kosten-Log je
  Turn (`finder_turns.usage`).
- Ohne API-Key: statischer Modus (heutiges V0.1-Verhalten) – nie ein
  kaputter Finder.

---

## 10. Antworten auf die sechs Fragen

1. **Zentrale KI mit konfigurierbarer Methodik** – ein `FinderEngine`-Service,
   ein Claude-Aufruf pro Schritt, Prompt = Sicherheitskern (Code) + Modulversion
   (Studio) + Fakten; Antwort als FinderTurn-JSON; Regeln vor KI, KI innerhalb
   der Regeln.
2. **Studio** – Admin-Bereich mit versionierten Modulen (Reise, Persona,
   Reflexion, Astro-Regeln, Bausteine), Formular-Editoren auf JSON-Schemas,
   Testmodus mit Begründungen, Veröffentlichen/Zurückrollen, Audit-Log.
3. **Astrologie von Anfang an** – eigene Berechnungsschicht (Node,
   `astronomy-engine`, verifiziert 28/28), beide Häusersysteme, Einwilligung/
   Profil/Astro-Fakten/`astro_perspective` **und die echte Berechnung** sind
   Teil des ersten KI-Prototyps; Deutung nur über Studio-Regeln.
4. **Unverändert weiterverwendbar** – Anthropic-SDK-Anbindung, Admin-Schutz,
   AdminLayout, Audit-Log, Snapshot-Prinzip, Dashboard-Layout, alle
   Finder-V0.1-Komponenten und die Glas-Optik, Node-Toolchain.
5. **Kleinster Prototyp** – Abschnitt 11, Phase 1: Module A und B im Studio
   bearbeitbar, KI-geführt in der bestehenden Optik, echte Astro-Berechnung
   mit erstem Baustein, vollständig gespeicherte Testgespräche, Testmodus
   mit getrennter Technik-/KI-Ansicht und Kosten.
6. **Portal-Fundament** – Sessions/Turns/Insights/Astro-Profile am
   Nutzerkonto, anonyme Sessions werden bei Registrierung übernommen,
   Dashboard-Seiten im bestehenden Layout.

---

## 11. Priorisierte Entwicklungsreihenfolge

Aktualisiert am 12.10.2026: echte Astrologie und vollständige Speicherung
gehören in den ersten Prototyp.

| Phase | Inhalt | Ergebnis / Prüfbarkeit | Aufwand |
|---|---|---|---|
| **0 – Fixieren** ✅ 12.10.2026 | Komponenten-Registry (`components.json`), FinderTurn-, Turn-Record-, Session-, Modul- (Reise/Persona/Astro-Regeln) und Astro-Fakten-Schemas, Sicherheitskern-Entwurf (`core-system.md`, Gegenlesung offen), Seeds für Modul A, Modul B, Persona, Astro-Platzhalterregeln, Berechnungsschicht `web/astro/` mit Referenzprüfung (28/28), Schema-Tests (`npm run test:finder`), Decision-Log-Eintrag | Verbindliche Strukturen liegen vor und sind geprüft | erledigt |
| **1 – Prototyp Ende-zu-Ende** | **1a Grundlage (Woche 1):** Migrationen `finder_modules/-versions/-sessions/-turns/astro_profiles/astro_charts`, `config/finder.php` (Modell, Preise, retention_days), `php artisan finder:models` (Account-Check), Seed-Import, `FinderEngine` (Gates, Prompt-Komposition mit Caching, Structured Output, Validierung, Speicherung, Retry), Endpoint `POST /api/finder/turn`, Einwilligungs-Kachel. **1b Astro (Woche 2):** `AstroService` (Node-Aufruf, Cache), Ortsdatenbank offline, Profil-Eingabe verschlüsselt, Regelauswahl aus `astro_rules`, Baustein `astro_perspective` + `astro_consent` in der Glas-Optik, Einbindung nach Modul-Regel. **1c Oberfläche + Studio-Minimum (Woche 3):** `/trustbridgefinder` rendert Turns über die Registry (statischer Modus bleibt, Retry bei API-Fehler), Studio: Modul-Formulare für Reise/Persona/Astro-Regeln (Entwurf speichern, veröffentlichen), Testmodus (Technik/KI getrennt, Kosten, Modell), Gesprächsarchiv mit Löschfrist/Löschen. **1d Härtung (Woche 4):** Feature-Tests mit gemocktem Claude-Client, Krisenprotokoll-Tests, Purge-Job, Kostenlog, Review-Runde mit Ben | Ben ändert im Studio eine Methodik → Nutzer schildert eine Situation → KI nutzt seine Regeln und echte Astro-Daten → interaktive Anzeige → Gespräch vollständig im Studio auswertbar | 3–4 Wochen |
| **2 – Studio vollständig** | Reflexionsmodell- und Bausteine-Editoren, Versionen-Diff, Zurückrollen, Import/Export, Audit-Ansicht, Auswertungen (welche Fragen vertieft werden, Abbrüche je Phase) | Ben arbeitet ohne Code, sieht Wirkung | 1–2 Wochen |
| **3 – Astro-Vertiefung** | Radix-Rad (SVG) und Zyklus-Zeitstrahl in der Glas-Optik, allgemeine Tageskonstellationen ohne Profil, erweiterte Regelarten (Häuserherrscher, Mondknoten-Themen), Regel-Vorschau mit Testprofilen, optional Swiss Ephemeris für Asteroiden (Lizenz prüfen) | Astrologie sichtbar und methodisch vollständig | 2 Wochen |
| **4 – Konto & Portal** | Session-Übernahme bei Registrierung, persönliches Gesprächsarchiv, Erkenntnisse, Astro-Profil & Tagesthemen im Dashboard, Löschung durch den Nutzer | Persönlicher Bereich | 2 Wochen |
| **5 – Visuelle Bausteine & Inhalte** | `decision_fork`, `development_map`, `cycle_view`, Video, Übung, Lernkarten, Erkenntniskarten | KI wählt sichtbare Zusammenhänge | fortlaufend |
| **6 – Erweiterung** | Mehrsprachigkeit der Module, Streaming, Empfehlungen/Angebote, Community | Wachstum | fortlaufend |

**Start Phase 1 – Voraussetzungen:** (1) Bens Gegenlesung von
`core-system.md`; (2) ✅ `ANTHROPIC_API_KEY` eingetragen und
`finder:models`-Check bestanden (12.10.2026); (3) ✅ Aufwandsschätzung als
grober Planungsrahmen akzeptiert, keine feste Dauer (12.10.2026).
Kostenpflichtige Aufrufe erst ab Schritt 1a und nur aus dem Testmodus.
Bens Wunsch: frühestmöglich ein vollständiger KI-geführter Testdialog.

Was ich bewusst **nicht** empfehle: Agenten-Frameworks, einen grafischen
Flow-Builder vor den Formularen, Swiss Ephemeris als Erstlösung, freie
Regel-Engine statt deklarativer Bedingungen, Streaming vor stabilen
strukturierten Antworten, Anzeige der KI-Begründungen gegenüber Nutzern.

---

## 12. Entscheidungen – Stand 12.10.2026

Entschieden (Freigabe 12.10.2026): beide Häusersysteme, im Studio wählbar
(Default der Seeds: Placidus); anonyme/pseudonyme Testnutzung mit vollständiger
Speicherung und konfigurierbarer Löschfrist; Module A und B parallel; Start
mit `claude-opus-5-5`, Messung im Testmodus.

Noch offen für Ben:

1. **Gegenlesung des Sicherheitskerns** (`web/resources/finder/core-system.md`):
   Ton der Krisen- und Grenzhinweise, Formulierung der Haltung.
2. **Aufbewahrungsfrist** der Testgespräche (Vorschlag: 90 Tage, Policy
   `testphase-2026-v1`) und Wortlaut des Einwilligungstexts für Tester.
3. **Persona- und Modultexte**: die Seeds sind Platzhalter in seiner Richtung
   und werden im Studio von ihm überarbeitet; die Astro-Regeln sind bewusst
   neutrale Strukturbeispiele.
4. ✅ **API-Key** eingetragen, Account-Check bestanden; Aufwandsschätzung als
   grober Rahmen akzeptiert (beides 12.10.2026).
