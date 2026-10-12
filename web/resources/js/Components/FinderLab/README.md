# Finder Lab — experimenteller Prototyp (12.10.2026)

Reversibler, **nur lokal erreichbarer** UX-Prototyp der Reise A „Authentizität“
nach `TRUSTBRIDGE_FINDER_MASTER_UX_BLUEPRINT.md` (Kap. 4.1, 5, 7.5).
Kein Produktcode. Finder V0.1 (`/trustbridgefinder`) ist unverändert.

## Was er zeigt

- Click-first-Reise: Kennst-du-das → Ort → Wollen → **Weiche** (Gesagt) → Getan →
  Abweichung (berechnet, bestätigen/korrigieren) → Warum → **Stellwerk** (5 Weichen,
  Abstandszähler, Alternative) → Kompromiss/Zurückgehalten → Von oben
  (**Kreislauf** bei Wiederholung, sonst **Karte**) → Brücke (Wenn-Dann) →
  **Trifft es?** (Verständnis prüfen) → Finder Card.
- Pfade: bewusster Kompromiss (keine Reparaturaufgabe), keine Abweichung („Im Einklang“),
  „nicht gestellt“ (Ausweichen/Schweigen), „schon gestellt“/„kein Spielraum“ (Gleislage, ohne
  Mechanik-Urteil), Korrektur eines Fakts, „Weiß nicht“, Demo-Krisen-Screen. Der Bereich (A1)
  wird nur gefragt, wenn die Szene ihn nicht vorgibt.
- Simulierte KI: kein API-Aufruf, keine Kosten; Technik-Spalte zeigt Regeln vs. KI getrennt
  (wie der geplante Studio-Testmodus) samt geschätzten Tokens/Kosten eines echten Aufrufs.
  Freitext wird nur (simuliert) ausgewertet, wenn die Einwilligung im Textfeld gesetzt ist.
- Einstieg: KI-Hinweis, Selbstauskunft „mindestens 18“ (Pflicht für Weiter), U18-Verweis.
- Fortschritt wird nur gespeichert, wenn „Fortschritt auf diesem Gerät merken“ aktiv ist
  (§ 25 TDDDG); Freitexte werden nie gespeichert; „Alles auf diesem Gerät löschen“ entfernt alles.
- Nach den Reviews vom 12.10.2026 (Anhang B des Blueprints): Validierungssätze variieren im
  Muster, Abweichung wird über Seiten (Impuls/Erwartung) berechnet, neutrale Zählung statt
  Abstands-Score, neutrale Toasts, verifizierte Krisennummern DE/AT/CH als `tel:`-Links.

## Starten und testen

```
cd web && npm run dev          # falls nicht schon läuft
http://127.0.0.1:8001/finder-lab
node tests/js/shot-finder-lab.mjs <ausgabeordner>   # Klick-Durchlauf, Screenshots, a11y-Checks
```

Die Route existiert nur in `APP_ENV=local` (`routes/web.php`).

## Rückbau (vollständig)

1. Ordner `web/resources/js/Components/FinderLab/` löschen.
2. Datei `web/resources/js/Pages/FinderLab.vue` löschen.
3. In `web/routes/web.php` den Block `// Finder Lab …` (eine Route im `environment('local')`-Block) entfernen.
4. Optional: `web/tests/js/shot-finder-lab.mjs` löschen.

Keine Migrationen, keine Dependencies, keine Änderungen an bestehenden Dateien außer der Routenzeile.
