# Trustbridge Finder — Fortschritts- und Quellenprotokoll (Master-UX-Research)

**Stand:** 12.10.2026
**Auftrag:** `TRUSTBRIDGE_FINDER_MASTER_UX_RESEARCH_PROMPT.md` (Desktop, 31.195 Bytes, 82 Zeilen,
vollständig gelesen inkl. Anlage A — Originalrede des Gründers, unverändert).
**Ergebnisdokument:** `TRUSTBRIDGE_FINDER_MASTER_UX_BLUEPRINT.md` (Projekt-Root).

**Grenzen während des Auftrags:** keine Produktcode-Änderungen, keine Migrationen, keine
Dependencies, keine Datenbankänderungen, keine kostenpflichtigen API-Aufrufe, keine Git-Commits
oder Pushes, keine eigenmächtigen Gründerentscheidungen. `core-system.md` bleibt **Entwurf**.
Design und Finder V0.1 bleiben unangetastet.

## Checkpoints

- [x] C0 Projektstand gelesen (Architektur, Decision Log, Brief, `web/resources/finder/`, V0.1-Konfiguration) — 12.10.2026
- [x] C0b Blueprint-Gerüst mit Kap. 3.1 (Gründerrede zerlegt), Kap. 4 (drei Reisen), Kap. 5 (Weiche/Kreislauf/Karte), Kap. 7 (Delta-Check) — 12.10.2026
- [ ] C7 Prototyp „Finder Lab“ (Ergänzungsauftrag 12.10.2026: reversibel, nur lokal, Mock-Daten, keine API-Kosten, V0.1 unangetastet)
- [x] C1 Recherche abgeschlossen 12.10.2026 — sechs Berichte (R1–R6, zusammen ≈ 300 Quellen, fehlgeschlagene Abrufe je Bericht dokumentiert) im Scratchpad; Quellenlisten unverändert in Blueprint Anhang A
- [x] C2–C4 Blueprint Kap. 2, 3, 4, 5, 6, 7 (ohne 7.5), 8, 9, 10 geschrieben — 12.10.2026
- [x] C7 Prototyp „Finder Lab" gebaut (`/finder-lab`, nur lokal), nach Reviews korrigiert, Abschluss-Testlauf grün — 12.10.2026
- [x] C5 Adversariales Review (3 gebündelte Fachperspektiven) + Einarbeitung mit dokumentiertem Dissens (Anhang B) — 12.10.2026
- [x] C6 Blueprint Kap. 1, 7.5, Anhang A/B, Chat-Zusammenfassung — 12.10.2026
- [ ] C1 (Detail) Recherche (6 parallele Research-Agenten, nur Web/Lesen):
  - R1 Duolingo (Lernpfad, Mikroschritte, Streaks, Gamification, Kritik, KI-Einbindung)
  - R2 TurboTax, Typeform, Formular-/Fragefluss-Evidenz, anonymer Start vs. Registrierung
  - R3 Noom, Headspace, Fabulous und erweiterte Vergleichsgruppe
  - R4 AI-Journal/-Coaching (Rosebud, Mindsera, Liven) + Sicherheitslage KI in sensiblen Kontexten
  - R5 Wissenschaftliche Fundamente (SDT, CLT, Fogg, COM-B, Flow, MI, ACT, GROW, Choice Architecture, Insight-Forschung, Gamification-Metaanalysen, Barnum-Effekt)
  - R6 Recht, Datenschutz, Krisennummern, Jobverlust-Fakten (DE), Barrierefreiheit
- [ ] C2 Blueprint Kap. 1–3 (Entscheidungsvorlage, Benchmark-Matrix, Methodikprinzipien)
- [ ] C3 Blueprint Kap. 4–5 (drei Journeys, Mechanik-Screens, Wireframes)
- [ ] C4 Blueprint Kap. 6–8 (Produktsystem, Delta-Check, Lean-MVP vs. Vision)
- [ ] C5 Adversariales Review durch Fachagenten (UX, Compliance, CRO, Marke, Technik, Psychologie/Game Design) + Einarbeitung mit dokumentiertem Dissens
- [ ] C6 Blueprint Kap. 9–10, Chat-Zusammenfassung

## Protokoll

- 12.10.2026 — Auftrag gelesen. Research-Agenten R1–R6 gestartet (Hintergrund). Projektdateien werden parallel gelesen.
- 12.10.2026 — Ergänzungsauftrag: Prototyp erlaubt (reversibel, lokal, Mock-KI). Finder Lab gebaut: `web/resources/js/Components/FinderLab/*`, `Pages/FinderLab.vue`, Route `/finder-lab` (nur `local`), Test `tests/js/shot-finder-lab.mjs`.
- 12.10.2026 — R1–R6 zurück (≈ 300 Quellen). Blueprint Kap. 2–10 geschrieben. Erster Klick-Test: Cookie-Banner und fixer Seitenkopf fangen Headless-Klicks ab (Testskript angepasst: `cookie_consent=declined`, Elemente zentrieren). Reise A komplett durchlaufen (Screenshots im Scratchpad).
- 12.10.2026 — Sitzungslimit erreicht; sechs Review-Agenten abgebrochen. Fortsetzung: Umgebung neu gestartet, Anhang A per Skript eingefügt (60.463 Zeichen aus sechs Berichten), drei gezielte Reviews gestartet (Compliance · UX/Psychologie/Game Design/Marke · Technik/Messung), Test erneut gestartet.
- 12.10.2026 — Reviews zurück. In den Prototyp übernommen (Anhang B.1): verifizierte Krisennummern DE/AT/CH als `tel:`-Links, Alters-Selbstauskunft 18+, KI-Einwilligung vor Freitext-Auswertung, Krisentext wird verworfen, Freitexte nie in localStorage, Validierungssätze variieren im Muster, Abweichung über Seiten + „nicht gestellt“, „Schon gestellt“-Kachel → Gleislage, Gleislage-Pfad ohne Mechanik-Urteil, neutrale Zählung statt Abstands-Score, verbundene Spiegelzeile, neutrale Toasts, A1 nur bei eigener Szene, a11y-Semantik Stellwerk, Cleanup. In den Blueprint übernommen (B.2): DSFA fest, Art. 27 (HK-Entität), Fristen-Text reduziert, Regeln als Daten, Card-KI nur auf Wunsch, clientseitige Signalprüfung, Schema-Lücken, Aufwand 7–8 Wochen, verschärfte Metriken, Tagesweiche ohne Zwang, Reise-B-Gefühlskacheln. Dissens (B.3): Eisenbahn-Vokabular, Card-Optik, Pflicht-Ausnahme, Produkt-Einstieg, Sprecherstimme, Shards → Gründerentscheidungen.
- 12.10.2026 — Abschluss-Testlauf grün: Standardpfad 12 Screens, Kompromiss, Gleislage (A6 und A3), Krisen-Demo (5 Kontaktblöcke), Mobil 390 px ohne Überlauf, Tastatur, Reduced Motion, keine JS-Fehler. Kap. 1, 7.5, Anhang B geschrieben. **Auftrag abgeschlossen; offen sind Gründerentscheidungen (Kap. 10), Fachprüfung Recht/Datenschutz und Nutzertests.**

## Quellen (konsolidiert)

Wird nach Abschluss von C1 gefüllt; vollständige Nachweise mit URL, Abrufdatum und Evidenzstufe stehen im Blueprint, Kapitel 2 und Anhang.
