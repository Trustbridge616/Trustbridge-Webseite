# Trustbridge Finder — Methodik-Artefakte (Phase 0)

Verbindliche Datenstrukturen des KI-geführten Finders. Grundlage: `TRUSTBRIDGE_FINDER_ARCHITEKTUR.md` (Freigabe 12.10.2026).

| Pfad | Inhalt |
|---|---|
| `components.json` | Komponenten-Registry — einzige Quelle der Darstellungsbausteine (Vue rendert, PHP erzeugt daraus den Enum im FinderTurn-Schema). |
| `core-system.md` | Sicherheitskern — erster System-Block jedes KI-Aufrufs, im Studio nicht änderbar. **Entwurf zur Gegenlesung durch Ben.** |
| `schemas/finder-turn.schema.json` | Strukturierte KI-Antwort pro Gesprächsschritt (Structured Output). Fakten und Hypothesen getrennt. |
| `schemas/turn-record.schema.json` | Gespeicherter Schritt: `user` · `ai` (KI) · `engine` (technische Regeln, von PHP) · `usage` (Modell, Tokens, Kosten, Zeit). |
| `schemas/session-record.schema.json` | Session mit Einwilligungen, Modulversionen, Häusersystem, Löschfrist. |
| `schemas/module-journey.schema.json` | Nutzerreise: Phasen, Fragen-Pools mit Zweck, Vertiefungsregeln, Gates, Verzweigungen, Fakten, Finder Card. |
| `schemas/module-persona.schema.json` | KI-Persönlichkeit mit mehreren Stilen und Gesprächsregeln. |
| `schemas/module-astro-rules.schema.json` | Astrologische Interpretationsregeln (Bens Methodik), Orben, Häusersystem-Default. |
| `schemas/astro-facts.schema.json` | Berechnete Astro-Fakten (Ausgabe von `web/astro/chart.mjs`): Radix, beide Häusersysteme, Aspekte, Transite, Zyklen. |
| `modules/*.json` | Seeds für das Studio: Modul A `authentizitaet` (V0.1-Import), Modul B `jobverlust`, Persona `trustbridge-standard`, Astro-Platzhalterregeln. |

Prüfen: `npm run test:finder` (Schemas, Querbezüge, Registry-Konsistenz, Astro-Ausgabe) und `npm run astro:verify` (Ephemeriden gegen unabhängige Referenzwerte).

In Phase 1 werden die Seeds in `finder_modules`/`finder_module_versions` importiert; danach ist das Studio die führende Quelle, diese Dateien bleiben als Export-Format und Testdaten.
