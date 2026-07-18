# Portalvideo – Generierung

Modell: **kling3_0** (Kling v3.0) über Higgsfield
Parameter: `mode: pro`, `duration: 10`, `sound: off`, `aspect_ratio: 9:16`
Referenz: `portal-ref-9x16.png` als **start_image UND end_image**
(erster = letzter Frame, dadurch schließt die Schleife nahtlos)

Kosten: 3 Varianten × 17,5 Credits = **52,5 Credits**

Gewählt: **Variante A** – deutlichstes Ringlicht, stärkster Treppenimpuls.

---

## Variante A (verwendet)

> Locked camera, premium mystical portal animation based precisely on the
> supplied Trustbridge portal artwork. Preserve the central emblem, black
> panther, magpie, moon symbol, stairs and all typography perfectly unchanged
> and readable. Animate only the environment and separated portal layers. The
> outer organic golden ring rotates very slowly clockwise while subtle golden
> light travels through its roots and branches. The inner violet ring rotates
> gently counterclockwise. Small gold and teal sparks orbit at different
> depths. Soft forest mist drifts behind the portal. A warm pulse of light
> moves upward along the stone steps toward the center. Surrounding plants
> move almost imperceptibly as if breathing. Deep luxurious forest atmosphere,
> elegant spiritual technology, cinematic dimensional lighting, controlled
> premium motion, seamless loop, matching first and final frames, locked
> frontal camera. Do not redraw, morph, distort or reinterpret the Trustbridge
> emblem. Do not change the panther, bird, moon, stairs or typography. No new
> symbols. No new text. No misspelled text. No camera shake. No rapid zoom. No
> fast particles. No aggressive flare. No childish fantasy style. No NFT
> aesthetic. No casino aesthetic.

Job-ID: `9fe20032-9722-47bd-b968-5d4838a9e00c`

## Variante B

Betonung auf „pixel-identical", Energie wie Saft im Holz, Glühwürmchen,
Nebel über den Stufen. Ergebnis gleichwertig, Ringlicht etwas flacher.
Job-ID: `a79ce48b-bb44-4440-8ff7-cb51d015400b`

## Variante C

Betonung auf „extremely subtle", minimale Bewegung. Ergebnis fast identisch
zu B. Higgsfield schlug hier das Preset „IN THE DARK" vor – abgelehnt, damit
die kontrollierte Fassung erhalten bleibt.
Job-ID: `d79317dc-c9e3-49e6-af9b-2d16fe7acbf6`

---

## Aufbereitung

```bash
bash scripts/build-hero-video.sh A
```

- `crop=1080:1620:0:150` – die für 9:16 ergänzten Bildschwarz-Balken
  (142 px bei 1024 Breite → 150 px bei 1080) wieder entfernen, zurück auf
  das Originalseitenverhältnis 2:3
- `-an` – Tonspur vollständig entfernen
- VP9 (`crf 34` / `38`) und H.264 (`crf 26` / `29`) in 720×1080 und 480×720

## Panther-Prompt (noch nicht generiert)

Für eine spätere Videofassung des Portalwächters, Referenz
`public/branding/panther-mitte-nobg.png`:

> A polished premium 3D black panther guardian emerges calmly from a living
> gold and violet forest portal. Preserve the supplied character identity,
> dark fur, golden eyes, gold crown, purple cape and medallion. The movement
> feels confident, warm and welcoming rather than childish or aggressive. The
> panther makes one controlled forward movement through the portal, settles
> softly at the threshold, looks toward the viewer, blinks once and
> transitions into a calm breathing idle pose. The cape and fur react
> naturally with restrained physical motion. Golden portal light creates
> realistic rim lighting. Locked frontal camera, cinematic premium 3D
> animation, luxurious mystical atmosphere, four to six seconds.
>
> No exaggerated cartoon bounce. No roar. No attack. No fast jump toward
> camera. No spinning. No extra limbs. No altered crown. No altered face. No
> new logo. No text. No childish comedy. No plastic toy appearance.
