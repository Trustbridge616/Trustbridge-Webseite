# Auftrag: Scroll-Performance der Trustbridge-Startseite auf 60 fps ohne Design-Verlust

> **Anleitung für Ben:** Diese Datei ins Projekt-Root legen (z. B. `docs/scroll-performance-patch.md`) und in VS Code an Claude Code geben mit:
> `Lies docs/scroll-performance-patch.md und setze den Auftrag vollständig um. Halte dich strikt an die "Harten Regeln" und arbeite die Blöcke A–J der Reihe nach ab. Committe nach jedem Block einzeln.`

---

## 0. Kontext

- **Stack:** Laravel + Vite (Dev-Server auf Port 5174) + Vue 3, Seite unter `resources/js/Pages/Welcome.vue`, App-Shell in `resources/js/app.js` + Blade-Layout.
- **Animation:** GSAP **3.15.0** mit **ScrollTrigger**. Kein Lenis, kein Locomotive.
- **Betroffene Seite:** Startseite `/` („Trustbridge – Die Brücke zu dir selbst").
- **Symptom laut Nutzer:** Die Seite „hakt" beim Durchscrollen.

### Was bereits gemessen wurde (im echten Browser, nicht geraten)

| Messung | Ergebnis |
|---|---|
| Frame-Zeiten Main-Thread beim Scrollen (2174×1241 CSS px, DPR 1.5) | ø **16,67 ms**, p95 16,8 ms, 0 Drops → **stabile 60 fps** |
| A/B-Test: Animationen aus / Blur aus / bg-shift aus | **kein messbarer Unterschied** auf dem Main-Thread |
| Dauerhaft laufende CSS-Animationen | **77** gleichzeitig, davon **19** auf nicht-kompositierbaren Properties |
| Inline-Style-Writes durch GSAP pro Scroll-Durchlauf | **~450** `transform: translate3d(...)`-Writes auf ~15 Elemente |
| Elemente mit `backdrop-filter` | 5 |
| Elemente mit `filter` | 29 |

**Diagnose:** Das Ruckeln kommt **nicht** von langsamem JavaScript. Der Main-Thread ist frei.
Die Ursachen sind (1) **Parallax-Desync** — GSAP schreibt Transforms auf dem Main-Thread, während die Seite auf dem Compositor-Thread scrollt, wodurch die Parallax-Ebenen 1–2 Frames hinterherhinken („schwimmen") — und (2) **GPU-Raster-Last** durch Blur-Flächen, `backdrop-filter` und Dauer-Animationen auf Paint-/Layout-Properties. Beides ist in rAF-Messungen unsichtbar, aber deutlich spürbar.

---

## 1. Harte Regeln (nicht verhandelbar)

1. **Das Design darf sich nicht sichtbar verändern.** Keine Farbe, keine Position, kein Abstand, keine Animationskurve, keine Timing-Änderung, kein Text. Der Nutzer muss vorher/nachher visuell dasselbe sehen. Wo unten „Blur reduzieren" steht, ist die Kompensation (höhere Hintergrund-Deckkraft) Pflicht — mit Screenshot-Vergleich abgesichert.
2. **Keine neuen Abhängigkeiten.** Kein Lenis, kein Locomotive, kein Smooth-Scroll-Wrapper. GSAP 3.15 bleibt.
3. **Kein Umbau der Komponentenstruktur.** Nur die im Auftrag benannten Stellen anfassen. Keine „Aufräumaktionen" nebenbei, kein Refactoring von Logik, keine Umbenennung von Klassen, die im Template referenziert werden.
4. **Block für Block arbeiten**, nach jedem Block ein eigener Commit mit Präfix `perf(scroll):`.
5. **Nichts löschen, was optisch wirkt.** Wenn ein Effekt nicht performant umsetzbar ist, wird er *umgebaut*, nicht entfernt. Ausnahme: explizit als „entfernen" markierte Punkte.
6. **Vorher/Nachher belegen.** Vor dem ersten Commit Referenz-Screenshots aller Sektionen bei 1920×1080 und 390×844 erzeugen, nach jedem Block gegenprüfen (siehe Block J).
7. **Kein `will-change` global.** Bei 2174×1241 CSS px und DPR 1.5 (≈ 3261×1862 Device-Pixel) sprengt ein zu großes Layer-Budget den GPU-Speicher und macht es *langsamer*. Nur die unten namentlich genannten Elemente promoten.
8. Wenn eine Datei/Klasse aus diesem Dokument im Projekt anders heißt: **Erst suchen, dann anpassen** — Klassennamen unten stammen aus dem gerenderten DOM, die Quelle kann sie über `<style scoped>`-Hashes anders ablegen. Niemals raten.

---

## Block A — Parallax auf den Compositor bringen (wichtigster Punkt)

**Befund:** ScrollTrigger schreibt pro Scroll-Durchlauf ~450 Inline-Transforms auf diese Elemente:

| Element | Writes / Durchlauf |
|---|---|
| `svg` (mehrere, u. a. `svg.tb-threads`) | 198 |
| `li` in `.climb-words--left` / `--right` | 94 |
| `.blurry-ring-wrapper.wrapper-center` / `-left` / `-right` | 43 / 13 / 11 |
| `.portal-circle-left` / `.portal-circle-right` | 13 / 11 |
| `.tb-caption--left` / `--right` | je 9 |
| `.climb-words--left` / `--right` | je 8 |
| `.ambient-glow.glow-left` | 6 |
| `.footer-transition` | 6 |

Geschriebener Wert (Beispiel): `translate: none; rotate: none; scale: none; transform: translate3d(0px, -1.5365px, 0px);`

### A1 — Primärpfad: CSS Scroll-Driven Animations

Rein scrollpositions-abhängige Parallax-Effekte (also alle, die nur `translateY` aus dem Scrollfortschritt ableiten) auf **CSS Scroll-Driven Animations** umstellen. Diese laufen im Compositor und sind damit per Definition frame-genau synchron zum Scroll — der Desync verschwindet vollständig.

```css
@supports (animation-timeline: view()) {
  .parallax-layer {
    animation: parallax-shift linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }
  @keyframes parallax-shift {
    from { transform: translate3d(0, var(--parallax-from, 40px), 0); }
    to   { transform: translate3d(0, var(--parallax-to, -40px), 0); }
  }
}
```

**Vorgehen:**
1. Für jedes der oben gelisteten Elemente die aktuelle GSAP-Tween-Definition auslesen und die Start-/End-Translation exakt in `--parallax-from` / `--parallax-to` übernehmen. **Die Werte müssen numerisch identisch sein** — vorher per `getBoundingClientRect()` an mehreren Scrollpositionen verifizieren.
2. Die entsprechenden ScrollTrigger-Instanzen nur dann erzeugen, wenn `CSS.supports('animation-timeline', 'view()')` **false** ist (Fallback für ältere Browser). Der GSAP-Code bleibt also erhalten, wird aber auf modernen Chromium/Safari-Versionen nicht mehr ausgeführt.
3. Achtung Konflikt: GSAP setzt `translate/rotate/scale: none` als Inline-Style. Im CSS-Pfad darf GSAP das Element gar nicht mehr anfassen, sonst überschreibt Inline die Animation.

### A2 — Für alles, was bei GSAP bleiben muss

```js
gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({
  limitCallbacks: true,     // Callbacks nur bei echtem Fortschritt
  ignoreMobileResize: true, // kein Refresh bei Adressleisten-Toggle
})

// Ein einziger, gebatchter Ticker statt vieler Einzel-Updates:
gsap.ticker.lagSmoothing(0)
```

Und pro Tween:
- `scrub: 0.25` statt `scrub: true` — die minimale Glättung kaschiert den verbleibenden Frame-Versatz und fühlt sich messbar ruhiger an. **Optisch nicht wahrnehmbar** als Positionsänderung.
- `fastScrollEnd: true` an den ScrollTriggern, die längere Reveal-Tweens fahren.
- Setzt der Tween Werte auf viele Kinder (die 94 `li`-Writes!), stattdessen **eine CSS-Variable auf dem Container** animieren und die Kinder per `transform: translate3d(0, calc(var(--p) * <faktor>), 0)` ableiten. Das ersetzt 94 Style-Writes durch 2.

### A3 — Verbot

**Niemals** `left`, `top`, `width`, `height`, `margin` oder `background-position` per Scroll animieren. Ausschließlich `transform` und `opacity`.

---

## Block B — Blur-Elemente korrekt promoten und nie skalieren

**Befund:** Diese Elemente tragen einen Blur **und** werden gleichzeitig per Scroll oder Keyframe transformiert. Jede Skalierung eines geblurrten Elements erzwingt eine komplette Neu-Rasterung des Blurs — der teuerste Einzelposten der Seite.

| Element | Größe (px) | Filter | Animiert mit |
|---|---|---|---|
| `.ambient-glow.glow-center` | 789 × 789 | `blur(80px)` | `pulse-glow` (transform + opacity, 12 s ∞) + Scroll |
| `.ambient-glow.glow-left` | 570 × 570 | `blur(80px)` | `pulse-glow-side` (10 s ∞) + Scroll |
| `.ambient-glow.glow-right` | 614 × 614 | `blur(80px)` | `pulse-glow-side` (14 s ∞) |
| `.blurry-ring.ring-center.outer` | **1208 × 1208** | `blur(12px)` | `spin-ring-outer` (transform + opacity) |
| `.blurry-ring.ring-center.inner` | 1010 × 1010 | `blur(6px)` | `spin-ring-inner` |
| `.blurry-ring.ring-left/right` (outer/inner) | 419–640 | `blur(5–10px)` | `spin-ring-*` |
| `.climb-portal-haze` | 821 × 808 | (Blur/Gradient) | `haze-drift` (**`scale`**, ∞) |

### B1 — Layer-Promotion

Für **genau diese** Elemente:

```css
.ambient-glow,
.blurry-ring,
.climb-portal-haze {
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

Damit rastert Chrome den Blur **einmal** in eine eigene Layer-Textur und bewegt danach nur noch die Textur — statt den 80-px-Blur pro Frame neu zu berechnen.

### B2 — Skalierung aus dem Scroll-Pfad entfernen

`.blurry-ring-wrapper.wrapper-center` bekommt aktuell per Scroll
`transform: translate(-50%,-50%) translate3d(...) scale(1.02…)`.

**Der `scale()`-Anteil muss aus dem scroll-getriebenen Transform raus.** Aufteilen in zwei verschachtelte Elemente:
- **Äußeres** Element: nur `translate3d()` aus dem Scroll.
- **Inneres** Element: statischer `scale()`-Wert bzw. der Keyframe-Scale, mit eigener Layer-Promotion.

Dasselbe Muster für `haze-drift` (`scale` auf `.climb-portal-haze`): Der Scale bleibt, aber nur auf einem promoteten Layer — dann skaliert die GPU die fertige Textur statt neu zu rastern.

### B3 — Blur-Radien prüfen (nur wo unsichtbar)

`blur(80px)` auf drei Flächen von 570–789 px ist am Limit. Falls nach B1 noch Raster-Last messbar ist: Radius auf `56px` senken **und** die Deckkraft/Ausdehnung des zugrundeliegenden Radial-Gradients so nachziehen, dass der Pixelvergleich (Block J) unter 2 % Abweichung bleibt. **Nur mit belegtem Screenshot-Diff durchführen, sonst unverändert lassen.**

---

## Block C — `backdrop-filter` entschärfen

**Befund:** 5 Elemente. Ein `backdrop-filter` unter einem `position: fixed`-Element zwingt den Compositor, den Hintergrund bei **jedem** Scroll-Frame neu zu rendern.

| Element | Größe | Wert | Position |
|---|---|---|---|
| `nav.navbar.navbar-scrolled` | **2159 × 90** | `blur(12px)` | **`fixed`** ← kritisch |
| `.shard-glass` ×3 | ~380–403 × 282–299 | **`blur(35px)`** | `absolute` |
| `.hero-guarantee-bar` | 1111 × 79 | `blur(15px)` | `static` |

### C1 — Navbar

Die Navbar ist der einzige `backdrop-filter` über der ganzen Viewport-Breite auf einem `fixed`-Element und damit der teuerste. Umsetzung in dieser Reihenfolge:

1. `will-change: backdrop-filter` **nicht** setzen (bringt hier nichts und kostet Speicher).
2. Blur auf `blur(8px)` senken und den Verlust an Trübung über die Hintergrundfarbe ausgleichen (Alpha um ca. +0,06 erhöhen). Ziel: optisch identisch im Screenshot-Diff.
3. Sicherstellen, dass die Navbar **keine** Kinder mit eigenem `filter`/`backdrop-filter` hat (verschachtelte Backdrop-Filter kosten doppelt).
4. `contain: paint` auf die Navbar setzen, damit ihr Repaint-Rechteck begrenzt bleibt.

### C2 — `.shard-glass`

`blur(35px)` dreimal ist unnötig teuer; der optische Unterschied zu `blur(16px)` ist bei diesen Elementgrößen minimal. Auf `blur(16px)` senken, Hintergrund-Alpha entsprechend anheben, Screenshot-Diff belegen.

### C3 — Fallback-Pfad

```css
@supports not (backdrop-filter: blur(1px)) {
  /* bestehende Fallback-Hintergründe unverändert lassen */
}
```
Prüfen, dass ein solcher Fallback existiert; falls nicht, ergänzen (rein additiv, ändert für Chrome nichts).

---

## Block D — Dauer-Animationen auf kompositierbare Properties umschreiben

**Befund:** 77 Animationen laufen permanent, 19 davon animieren Properties, die Layout oder Paint auslösen. Diese Liste ist vollständig und stammt aus `document.getAnimations()`:

| Keyframe | Ziel | Größe (px) | Animierte Property | Kostenart |
|---|---|---|---|---|
| **`bg-shift`** | **`div.welcome-page`** | **2159 × 3771** | `background-position` | **Full-Page-Repaint, dauerhaft** |
| `glassy-sweep` | `.panthers-container` | 1800 × 993 | `left` | Layout + Paint |
| `shard-sheen` ×3 | `.shard-refraction` | ~380–403 × 282–299 | `left` | Layout + Paint |
| `shine` ×2 | `.btn-login`, `.btn-register` | 123×44, 172×46 | `left` | Layout |
| `shard-rim-shimmer` ×3 | `.hero-shard` | ~380–403 × 282–299 | `background-position` | Paint |
| `auraSpin` ×3 | `.shard-aura` | ~388–411 × 290–308 | `background-position` | Paint |
| `gradientShift` ×2 | `.btn-login`, `.btn-register` | klein | `background-position` | Paint |
| `shimmer` | `a.active-link` | 58 × 33 | `background-position` | Paint |
| **`tb-glint-travel`** ×2 | `path.tb-glint--a/--b` | 323 × 111 | `stroke-dashoffset` | **SVG-Filter-Repaint** |
| `haze-drift` | `.climb-portal-haze` | 821 × 808 | `scale` | Re-Raster (→ Block B) |

### D1 — `bg-shift` (höchste Priorität nach Block A)

`.welcome-page` ist **2159 × 3771 px**. Eine unendliche `background-position`-Animation darauf bedeutet, dass der komplette Dokument-Hintergrund permanent neu gemalt wird — auch im Ruhezustand. Umbau:

```css
.welcome-page { position: relative; background: <statischer Basis-Ton>; }

.welcome-page::before {
  content: '';
  position: fixed;          /* viewport-groß statt 3771 px hoch */
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: <bisheriger Gradient, ca. 200% Größe>;
  will-change: transform;
  animation: bg-shift-transform 20s linear infinite;  /* Dauer exakt beibehalten */
}

@keyframes bg-shift-transform {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }  /* Weg = bisheriger background-position-Weg */
}
```

Der Verlauf muss so dimensioniert werden, dass die **wahrgenommene Bewegungsgeschwindigkeit und -richtung identisch** bleibt. Prüfen: Video-Aufnahme von 20 s vorher/nachher vergleichen.
Wichtig: `position: fixed` ändert das Verhalten beim Scrollen — falls der Verlauf bisher mitgescrollt ist, stattdessen `position: absolute; inset: 0;` verwenden und den Elternknoten auf `contain: paint` setzen.

### D2 — `left` → `transform: translateX()`

Für `glassy-sweep`, `shard-sheen` (×3), `shine` (×2): Keyframes von
`left: -100% → left: 200%` (o. ä.) umschreiben auf
`transform: translate3d(-100%, 0, 0) → translate3d(200%, 0, 0)`,
das Element auf `left: 0` fixieren und `will-change: transform` setzen.
**Dauer, Easing und Delay exakt übernehmen.** Bei `%`-Werten beachten: `left: 100%` bezieht sich auf die Elternbreite, `translateX(100%)` auf die Eigenbreite — Faktor entsprechend umrechnen, nicht 1:1 kopieren.

### D3 — `background-position` → Overlay mit `transform`

Für `shard-rim-shimmer` (×3), `auraSpin` (×3), `gradientShift` (×2), `shimmer`:
Den Verlauf in ein absolut positioniertes Pseudo-Element (`::after`) auslagern, das doppelt so groß ist wie das Elternelement, und dieses per `transform` bewegen. Elternteil bekommt `overflow: hidden` (falls nicht vorhanden) und `contain: paint`.
Bei den kleinen Buttons (58×33, 123×44, 172×46) ist der Gewinn gering — dort ist der Umbau **optional**, wenn er Risiko für die Optik birgt. Bei `.hero-shard` und `.shard-aura` (je ~390×300, dreifach) ist er **Pflicht**.

### D4 — `tb-glint-travel` aus dem SVG-Filter befreien

`path.tb-glint--a` und `--b` liegen in einer `<g>` mit `filter: url(#merkaba-glow)`. `stroke-dashoffset` zu animieren zwingt Chromium, den **SVG-Filter pro Frame komplett neu zu rendern** — teilweise auf der CPU.

Umbau:
1. Die beiden `.tb-glint`-Pfade **aus der gefilterten `<g>` herausnehmen** und als eigenständige Geschwister-Pfade darüberlegen.
2. Den Glow dieser Pfade über `filter: drop-shadow(...)` (CSS, GPU-beschleunigt) statt über den SVG-Filter erzeugen — die Werte an den bestehenden `merkaba-glow` angleichen.
3. Der `merkaba-glow` bleibt für die **statischen** Teile der Grafik erhalten. Statische SVG-Filter sind unkritisch, weil sie einmal gerastert werden.
4. Zusätzlich auf dem SVG-Root: `will-change: contents` **nicht** setzen; stattdessen den animierten Teil in ein eigenes, promotetes `<svg>`-Overlay legen.

---

## Block E — `scroll-behavior: smooth` differenzieren

**Befund:** `html { scroll-behavior: smooth }` ist global gesetzt.

Das betrifft Tastatur-Scrolling (Leertaste, Bild ab, Pfeiltasten), Scrollbar-Klicks und alle Anker-Sprünge — und lässt genau die träge wirken. Mausrad ist nicht betroffen.

```css
html { scroll-behavior: auto; }

@media (prefers-reduced-motion: no-preference) {
  :is(html):has(:target) { scroll-behavior: smooth; }
}
```

Alternativ (robuster): global auf `auto` setzen und für die tatsächlichen Anker-Links im JS explizit `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` aufrufen. Alle internen Sprungziele im Template prüfen, damit kein Anker seine Animation verliert.

---

## Block F — Video entlasten

**Befund:** `portal-loop-desktop.webm`, nativ 720 × 1080, dargestellt 662 px breit, `loop`, mit Fallback `portal-loop-desktop.mp4`.
Der Container `.tb-loop.panther.panther-center` trägt:

```css
filter: drop-shadow(rgba(0,0,0,.5) 0 30px 50px)
        drop-shadow(rgba(212,175,55,.25) 0 0 60px);
```

Zwei `drop-shadow`-Filter auf einem **laufenden Video** bedeuten, dass die GPU beide Schatten für **jeden Videoframe** neu berechnet — dauerhaft, auch wenn nicht gescrollt wird.

1. Beide `drop-shadow` vom Video-Container entfernen.
2. Ersetzen durch ein statisches Geschwister-Element **hinter** dem Video: ein `radial-gradient`-Div bzw. ein vorgerendertes PNG mit exakt demselben Glow. Der Schatten ist statisch — er muss nicht pro Videoframe neu entstehen.
   - Der schwarze Schatten (`0 30px 50px`) lässt sich alternativ als `box-shadow` auf einem Wrapper mit derselben Silhouette umsetzen, sofern das Video rechteckig dargestellt wird.
3. Video-Attribute absichern: `muted`, `playsinline`, `loop`, `preload="metadata"`, `disablepictureinpicture`, `poster` mit dem ersten Frame.
4. **IntersectionObserver**: Video pausieren, sobald es den Viewport verlässt, und wieder starten, wenn es hineinkommt (Schwelle 0.1). Das spart Decode-Last auf dem restlichen Scrollweg.
5. `content-visibility` **nicht** auf den Video-Container setzen (führt zu Flackern beim Wiedereintritt).

---

## Block G — Bilder

**Befund:**

| Datei | Nativ | Dargestellt | Problem |
|---|---|---|---|
| `trustbridge-hero-portal-left-1024.avif` | 1024 × 1024 | 387 × 387 | 2,6× zu groß geladen |
| `trustbridge-hero-portal-right-1024.avif` | 1024 × 1024 | 387 × 387 | 2,6× zu groß geladen |
| **`portal-master-1024.avif`** | **700 × 1050** | **1024 × 1536** | **hochskaliert → unscharf** |
| `portal-emblem-crop.webp` | 548 × 548 | 354 × 354 | leicht zu groß |
| `trustbridge-logo-header@2x.png` | 134 × 200 | 134 × 200 | ok |
| Alle 6 Bilder | — | — | **kein `loading`-Attribut gesetzt** |

1. Auf **alle** Bilder unterhalb des ersten Viewports: `loading="lazy" decoding="async"`.
2. Auf das LCP-Bild im Hero: `fetchpriority="high"`, **kein** `lazy`.
3. Auf **alle** `<img>`: explizite `width`/`height` bzw. `aspect-ratio` im CSS — verhindert Layout-Shifts beim Nachladen, die beim Scrollen als Ruckler wahrgenommen werden.
4. `portal-master-1024.avif`: Asset in **1400 × 2100** (2× der Darstellungsgröße bei DPR ≥ 1.5) neu exportieren, oder per `srcset`/`sizes` eine passende Variante ausliefern. Aktuell wird ein 700-px-Bild auf 1024 px gestreckt.
5. Für die beiden 1024er Portal-Bilder: `srcset` mit 400 w / 800 w ergänzen und `sizes` korrekt setzen.

---

## Block H — Raster-Fläche begrenzen

Die Seite ist 4257 px hoch bei 1241 px Viewport. Ohne Eingrenzung rastert Chrome deutlich mehr Fläche als nötig.

1. Auf jede Hauptsektion **unterhalb des Heros**:
   ```css
   .section-xy {
     content-visibility: auto;
     contain-intrinsic-size: auto 900px; /* echte Höhe pro Sektion eintragen */
   }
   ```
   **Wichtig:** `contain-intrinsic-size` muss der tatsächlichen Höhe nahekommen, sonst springt die Scrollbar. Höhen vorher per `getBoundingClientRect()` ermitteln und eintragen. Sektionen, die ScrollTrigger-Pins oder scroll-getriebene Animationen enthalten, **ausnehmen** — `content-visibility` kann dort Messungen von ScrollTrigger verfälschen.
2. `contain: paint` auf die großen `.climb-layer`-Container (`climb-cool`, `climb-warmth`, `climb-sky` 2159×720, `climb-leaves` 2258×1286, `climb-fog`) — sie sind alle viewport-groß und überlagern sich fünffach.
3. Prüfen, ob alle fünf `.climb-layer` gleichzeitig sichtbar sein müssen. Nicht sichtbare Layer per `visibility: hidden` **statt** `opacity: 0` ausblenden — `opacity: 0` wird weiterhin gerastert, `visibility: hidden` nicht. (Aktuell stehen `climb-warmth`, `climb-sky`, `climb-leaves` auf `opacity: 0` mit `transition: all 0s`.)
4. `transition: all` überall ersetzen durch die konkret benötigten Properties. `all` zwingt den Browser, jede Property auf Änderung zu prüfen.

---

## Block I — Adaptive Abstufung

Rein additiv, ändert auf starker Hardware nichts.

1. **Reduced Motion** — Pflicht, auch aus Barrierefreiheitsgründen:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: .01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: .01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   Im JS zusätzlich: ScrollTrigger-Parallax gar nicht erst initialisieren, wenn `matchMedia('(prefers-reduced-motion: reduce)').matches`.

2. **`perf-lite`-Modus** für schwache Geräte. Beim Mount auf `<html>` setzen:
   ```js
   const lite =
     (navigator.hardwareConcurrency ?? 8) <= 4 ||
     (navigator.deviceMemory ?? 8) <= 4 ||
     window.matchMedia('(max-width: 900px)').matches
   document.documentElement.classList.toggle('perf-lite', lite)
   ```
   ```css
   .perf-lite .ambient-glow { filter: blur(40px); }
   .perf-lite .shard-glass,
   .perf-lite .navbar { backdrop-filter: none; }
   .perf-lite .starfield-layer--b,
   .perf-lite .starfield-layer--gold { display: none; }
   .perf-lite .particle,
   .perf-lite .starfield-drifter { display: none; }
   ```
   (Aktuell: 3 `.spotlight` à 350×1241, 3 `.starfield-layer` à 2319×1401, 8 `.starfield-drifter`, 10 `.particle` — auf Desktop unkritisch, auf Mobile spürbar.)

3. **Nicht** `perf-lite` auf dem Rechner des Nutzers aktivieren (32 Kerne, 32 GB) — dort muss die volle Optik greifen.

---

## Block J — Verifikation (verpflichtend, vor dem letzten Commit)

### J1 — Optische Regression

1. Vor der ersten Änderung mit Playwright Screenshots erzeugen: volle Seite bei **1920×1080** und **390×844**, jeweils DPR 1 und 2, Animationen per `page.emulateMedia({ reducedMotion: 'reduce' })` eingefroren.
2. Nach jedem Block dieselben Screenshots erzeugen und pixelweise diffen.
3. **Akzeptanz: < 1 % abweichende Pixel pro Screenshot.** Bei den Blöcken mit bewusst reduzierten Blur-Radien (B3, C1, C2): < 2 %, und der Diff muss visuell als „nicht wahrnehmbar" beurteilt und im Commit dokumentiert werden.
4. Zusätzlich eine 20-Sekunden-Videoaufnahme des Heros vorher/nachher — für `bg-shift`, `glassy-sweep`, `auraSpin` und `tb-glint-travel` ist nur so prüfbar, ob Geschwindigkeit und Richtung stimmen.

### J2 — Performance-Messung

**Immer gegen den Production-Build messen, nie gegen den Vite-Dev-Server:**
```bash
npm run build && php artisan serve
```

Zielwerte, gemessen in DevTools → Performance, Scroll über die gesamte Seite:

| Metrik | Ziel |
|---|---|
| Dropped Frames bei **6× CPU-Throttling** | ≤ 2 % |
| Anzahl gleichzeitig laufender Animationen im Ruhezustand (`document.getAnimations().filter(a => a.playState === 'running').length`) | **von 77 auf ≤ 45** |
| Animationen auf nicht-kompositierbaren Properties | **von 19 auf 0** |
| GPU-Raster-Zeit pro Scroll-Frame (Performance → GPU-Track) | ≤ 8 ms |
| Composited Layers (DevTools → Layers) | ≤ 25 |
| Paint-Flashing beim Scrollen (Rendering → Paint flashing) | **keine grünen Flächen mehr außerhalb der Navbar** |

**Prüfskript für die Konsole (nach dem Umbau ausführen):**
```js
const bad = document.getAnimations()
  .filter(a => a.playState === 'running')
  .map(a => {
    const props = [...new Set(a.effect.getKeyframes()
      .flatMap(k => Object.keys(k)))]
      .filter(k => !['offset','computedOffset','easing','composite'].includes(k))
    return { name: a.animationName, props, el: a.effect.target }
  })
  .filter(x => x.props.some(p => !['transform','opacity'].includes(p)))
console.table(bad)   // Muss leer sein.
```

### J3 — Funktionale Prüfung

- Alle Anker-Links springen weiterhin (und weiterhin weich, wo gewünscht) — Block E.
- ScrollTrigger-Positionen stimmen nach `ScrollTrigger.refresh()` und nach Fenster-Resize.
- Kein Layout-Shift beim Nachladen der Bilder (CLS = 0).
- Video startet, loopt, pausiert außerhalb des Viewports und startet beim Wiedereintritt.
- Seite funktioniert in Chrome, Firefox und Safari — insbesondere die `@supports`-Fallbacks aus A1 und C3.

---

## Reihenfolge und erwarteter Effekt

| # | Block | Aufwand | Erwarteter Effekt |
|---|---|---|---|
| 1 | **A** — Parallax auf Compositor | hoch | **Beseitigt das „Schwimmen" — die eigentliche Ursache** |
| 2 | **D1** — `bg-shift` | mittel | Beendet den permanenten Full-Page-Repaint (2159×3771) |
| 3 | **B** — Blur promoten, Scale trennen | mittel | Größter GPU-Gewinn |
| 4 | **D4** — SVG-Glint aus dem Filter | mittel | Entfernt CPU-Repaint des SVG-Filters |
| 5 | **C** — `backdrop-filter` | niedrig | Entlastet jeden Scroll-Frame |
| 6 | **D2/D3** — `left`/`background-position` | mittel | Entfernt Layout-Thrashing |
| 7 | **F** — Video-Filter | niedrig | Entlastet die GPU dauerhaft |
| 8 | **E, G, H, I** | niedrig | Feinschliff, Mobile, Ladezeit |
| 9 | **J** | — | Beweis, dass Blöcke 1–8 gewirkt haben und die Optik steht |

---

## Wenn etwas unklar ist

Nicht raten. Stattdessen:
- Den betroffenen Code zitieren und die zwei bis drei möglichen Umsetzungen mit ihren optischen Konsequenzen benennen — dann nachfragen.
- Lieber einen Block auslassen und dokumentieren, als das Design zu beschädigen.
