# Wiederherstellungspunkt vor dem Hero-Umbau

Stand: 18.07.2026, vor Beginn des neuen Trustbridge-Hero.
Enthaelt die beiden einzigen bestehenden Dateien, die der Umbau anfasst.

## Vollstaendig zuruecksetzen

Aus dem Projektwurzelverzeichnis:

    cp .backup-vor-hero/Welcome.vue   web/resources/js/Pages/Welcome.vue
    cp .backup-vor-hero/Merkaba3D.vue web/resources/js/Components/Merkaba3D.vue
    rm -rf web/resources/js/Components/Hero
    rm -rf web/public/assets/trustbridge
    rm -f  web/scripts/build-hero-assets.mjs

Danach `cd web && npm run dev` – der alte Hero ist wieder da.

WICHTIG: kein `git checkout` auf Welcome.vue verwenden. Die Datei enthaelt
uncommittete Aenderungen, die dabei verloren gehen.

## Was der Umbau sonst anlegt (alles neu, nichts ueberschrieben)

- web/resources/js/Components/Hero/      (neue Komponenten)
- web/public/assets/trustbridge/hero/    (neue Bild-/Videoderivate)
- web/scripts/build-hero-assets.mjs      (Asset-Skript)

Originale unter web/public/branding/ werden ausschliesslich gelesen.
