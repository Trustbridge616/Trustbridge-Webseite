# Trustbridge Hero

Der Hero der Startseite. Das Portal ist eine echte Videoschleife, kein
animiertes Standbild.

## Aufbau

| Ebene | Datei | Inhalt |
|---|---|---|
| 1 Atmosphäre | `PortalBackground.vue` | Violett/Anthrazit-Verlauf, Vignette, angedeuteter Wald, drei driftende Nebelschleier, Lesbarkeitsverlauf |
| 4 Merkaba | `Merkaba3D.vue` (bestehend) | Geometrische Tiefenebene hinter dem Portal, ohne Begriffe, opacity 0.09 |
| 5 Portal | `PortalStage.vue` | Videoschleife + scharfe Emblem-Ebene darüber |
| 7 Sterne | `PortalStars.vue` | Sparsame Lichtpunkte im Raum um das Portal |
| 8 Wächter | `PortalPanther.vue` | Optional, standardmäßig **aus** |
| Inhalt | `HeroContent.vue` | Alle Texte und Aktionen als echtes HTML |
| Klammer | `TrustbridgeHero.vue` | Rahmen, Bühne, Bewegungsschalter, Parallaxe |

Die Ebenen 2, 3 und 6 (goldener Ring, violetter Innenring, Treppenlicht) sind
**im Video enthalten** und werden nicht per CSS nachgebaut.

## Warum zwei Lagen im Portal

`PortalStage.vue` legt zwei Ebenen exakt deckungsgleich übereinander:

1. **Videoschleife** – Ringlicht, Nebel, Funken, Treppenimpuls, Wurzelwerk.
2. **Emblem-Ausschnitt** – der unveränderte Innenkreis aus
   `public/branding/Trustbridge Portal.png`, kreisrund freigestellt entlang
   des violetten Innenrings.

Dadurch können Panther, Elster, Mond und die Schriftzüge TRUST/BRIDGE
niemals verzerren, verrutschen oder falsch geschrieben werden, egal was in
der Videoebene passiert. Die Marke hängt nicht am Generierungsmodell.

Beide Ebenen liegen in einem Rechteck mit dem Originalseitenverhältnis
1024 : 1536, deshalb ist die Registrierung exakt.

## Steuerung

`heroConfig.js`:

```js
enablePortalVideo: true    // false => scharfes Standbild statt Video
showPortalPanther: false   // Portalwächter ein-/ausschalten
enableMerkaba: true
particleDensity: 24        // Sterne auf Desktop, mobil automatisch 45 %
portalMotionIntensity: 1
```

Punktuell überschreibbar: `<TrustbridgeHero :config="{ showPortalPanther: true }" />`

## Bewegung

Ein einziger Schalter in `TrustbridgeHero.vue`:

```js
animate = !reducedMotion && inViewport && pageVisible
```

Er steuert Video, alle CSS-Animationen (`data-paused`) und die Merkaba-Schleife.
Nichts läuft im Hintergrundtab oder außerhalb des Viewports.

## Assets

Alle unter `public/assets/trustbridge/hero/`. Originale in `public/branding/`
werden ausschließlich gelesen, nie überschrieben.

| Datei | Größe |
|---|---|
| `portal/portal-loop-desktop.webm` / `.mp4` | 0,69 / 0,68 MB |
| `portal/portal-loop-mobile.webm` / `.mp4` | 0,31 / 0,26 MB |
| `portal/portal-master-{512,768,1024}.{avif,webp,png}` | 49–620 KB |
| `portal/portal-emblem-crop.{avif,webp,png}` | 30 / 58 / 572 KB |
| `posters/portal-poster.webp` | 70 KB |
| `panther/panther-guardian-{600,900}.{avif,webp,png}` | 27–807 KB |
| `fallbacks/portal-static-1024.webp` | 186 KB |

Neu erzeugen:

```bash
node scripts/build-hero-assets.mjs     # Bildderivate
bash scripts/build-hero-video.sh A     # Videofassungen aus archive/portal-var-A.mp4
```

### Herkunft des Videos

- Modell: **kling3_0** (Kling v3.0), `mode: pro`, 10 s, `sound: off`, 9:16
- Referenz: `Trustbridge Portal.png`, auf 1024×1820 mit Bildschwarz gepolstert
  (`archive/portal-ref-9x16.png`), als **Start- und Endbild zugleich** übergeben
  → erster und letzter Frame identisch, die Schleife schließt nahtlos
- Drei Varianten generiert (A/B/C), je 17,5 Credits, **52,5 Credits gesamt**
- Gewählt: **Variante A** (deutlichstes Ringlicht, stärkster Treppenimpuls)
- Rohdateien liegen in `archive/portal-var-{A,B,C}.mp4`

Prompt Variante A: siehe `archive/PROMPTS.md`.

Aufbereitung: Zuschnitt `crop=1080:1620:0:150` (schwarze Balken weg, zurück auf
2:3), Tonspur entfernt (`-an`), VP9 + H.264 in zwei Auflösungen.

## Responsive

Die Bühne ist ein **quadratisches Fenster**, das um den Goldring beschnitten
ist. Ringmittelpunkt liegt bei 45,12 % der Motivhöhe, Motivhöhe = 1,5 × Breite,
daraus folgt der Versatz 0,1768 × Rahmenbreite.

Die Rahmenbreite wird von Viewportbreite **und** -höhe gedeckelt
(`--tb-frame-w`), zusätzlich greifen Regeln bei `max-height: 920px` und
`800px`. Gemessen (Unterkante der ersten Aktion vs. Viewporthöhe):

| Viewport | Hero-Höhe | 1. Aktion |
|---|---|---|
| 1920 × 1080 | 1137 | über der Falte |
| 1440 × 900 | 1023 | über der Falte |
| 1024 × 768 | 880 | über der Falte |
| 390 × 844 | 1114 | über der Falte |
| 360 × 740 | 1066 | über der Falte |

Kein horizontaler Überlauf bei 360, 390, 430, 768, 1024, 1440, 1920.

## Reduced Motion

Bei `prefers-reduced-motion: reduce` (verifiziert):

- **kein** `<video>` im DOM, es wird nichts geladen
- Merkaba wird nicht gerendert
- alle CSS-Animationen `none`
- scharfes Standbild `portal-master-*.avif`
- sämtliche Texte, Links und Buttons unverändert vorhanden

## Bekannte Einschränkungen

- **Viewport-Pause nicht automatisiert verifiziert.** Chrome liefert in dieser
  Headless-Umgebung überhaupt keine IntersectionObserver-Callbacks – auch ein
  unabhängiger Referenz-Observer auf einer trivialen Testseite feuert nie. Die
  Pause bei Tabwechsel läuft über denselben Schalter und **ist** verifiziert.
  Im echten Browser bitte einmal gegenprüfen.
- `archive/` enthält rund 28 MB Rohvideos und Referenzbilder und liegt unter
  `public/`, wird also mit ausgeliefert. Wenn das nicht gewünscht ist:
  Ordner löschen oder vom Deployment ausschließen. Für den Betrieb wird er
  nicht gebraucht.
- Der Panther ist nur eine Standbildebene mit Auftritt und Idle-Atmen. Für den
  im Auftrag beschriebenen Ablauf (Blinzeln, Umhangbewegung) braucht es eine
  eigene Videogenerierung; die Komponente ist dafür vorbereitet.
- `Partner_original.vue` (UTF-16-kodierte Altkopie) liess `vite build`
  scheitern; am 19.07.2026 mit Freigabe geloescht. Seitdem baut das
  Projekt in Produktion.

## Mögliche Erweiterungen

- Panther-Video über den Higgsfield-Panther-Prompt erzeugen und in
  `PortalPanther.vue` gegen die Standbildebene tauschen
- Längere Portalschleife (15 s) für weniger erkennbare Wiederholung
- AV1-Fassung zusätzlich zu VP9, sobald die Zielbrowser es tragen
