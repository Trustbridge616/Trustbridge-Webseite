# Tasks

Neue Aufgaben hier eintragen. Sie werden **nur** innerhalb eines
ausdrücklich von Ben freigegebenen Arbeits-, Umsetzungs- oder
Automatikmodus abgearbeitet (siehe AGENTS.md und
TRUSTBRIDGE_DECISION_LOG.md, „Regeln für Claude-Automatisierung“,
03.08.2026). Ein bloßer Dev-/Server-/Containerstart löst keine
Bearbeitung aus.

Format pro Task:

```
## [ ] Kurzer Titel
Beschreibung der Aufgabe.
Screenshots/Anhänge: Pfad zur Datei (z.B. temp/screenshot-2026-07-08.png)
```

Status: `[ ]` = offen, `[~]` = in Arbeit, `[x]` = erledigt

---

<!-- Offene Tasks unterhalb dieser Linie -->

## [x] Mobile Responsive-Prüfung und -Reparatur der Startseite (04.08.2026)
Befund: Die gemeldete 414px-Katastrophe (Titel/Grid ~1000px breit) war mit
dem aktuellen Code **nicht reproduzierbar** — Dev-Modus und Build wurden
bei 360/390/414/768/1024/1440 vermessen: `scrollWidth == innerWidth`
überall, Portal zentriert, Titel und Kacheln im Viewport. Wahrscheinlichste
Erklärung für das Fehlerbild: veralteter/gecachter `public/build`-Bundle
(wird immer ausgeliefert, wenn Vite nicht läuft bzw. `public/hot` fehlt)
oder Browser-Modus „Desktop-Website anfordern" (~980px Layout-Viewport).

Tatsächlich gefundene und behobene Probleme:
1. **Shard-Zeile lief bei 901–1024px aus dem Viewport** (3 × min-width
   300px + Gaps = 1008px Bedarf; bei 910px begann Kachel 1 bei x=−17,
   `overflow:clip` schnitt sie unsichtbar ab). Fix: beide
   `@media (max-width: 900px)`-Blöcke der Shards auf **1024px** angehoben —
   die Grenze, ab der der Hero ohnehin mobil komponiert (Seitenportale
   aus, mobile Kacheln an, `isWideView` = min-width 1025px). Desktop ab
   1025px pixelidentisch (1440: Grid x=120/w=1200, Shards 361px — wie
   zuvor).
2. **Produktions-Build war vom 01.08.** (ohne Finder-Nav, Portal-Links
   und diesen Fix). Neu gebaut via `npm run build` — ohne Vite-Dev-Server
   wird jetzt der aktuelle Stand ausgeliefert.

Getestet (headless Chrome): 6 Viewports Layout-Messung + Screenshots,
Interaktionssuite 18/18 (Finder-Nav, drei Portalziele, Tastatur,
Zurücknavigation, keine Modal-Doppelauslösung), Hamburger-Menü inkl.
Finder-Klick, Build-Modus separat bei 414/910/1440 verifiziert.

Bekannte Einschränkungen: 3 vorbestehende 404-Legacy-Assets auf den
Zielseiten (nicht Startseite); die große Hero-Gesamthöhe auf Mobil ist
gewollte Scroll-Choreografie (Aufstieg), kein Leerraum-Bug. Hero-Optik,
Panther, Motiv und Choreografie unverändert.

NACHTRAG (04.08.2026, zweiter Durchgang nach erneutem Fehlerbericht):
Bei echtem 414-Viewport mit frischen Dev-Assets und deaktiviertem Cache
war der Zustand erneut gesund (scrollWidth=414, Titel x=24/w=366,
scoped CSS nachweislich geladen). Die gemeldeten ~1047px-Boxen bei
x=-316 entsprechen exakt „überbreites Kind, zentriert in 414px" — dieses
strukturelle Loch wurde geschlossen, unabhängig vom Auslöser:

1. `.hero-title-wrapper`/`.hero-shards-grid` erhalten ≤1024px harte
   `width/max-width: 100%`-Clamps (vorher fit-content durch
   Flex-Zentrierung → von jedem überbreiten Kind aufspannbar).
2. `.hero-shard` ≤1024px: `min-width: 0; width: 100%; max-width: 400px`
   (vorher `min-width: 100%`, wodurch `max-width: 400px` nie greifen
   konnte und Überbreite des Elternraums vererbt wurde).
3. `.shard-center` ≤1024px: `transform: none` (Desktop-scale(1.06)
   mobil neutralisiert; GSAP-Inline-Transforms unberührt).
4. `.merkaba-3d-container` ≤1024px: `max-width: 100%` (statt 1400px-Kappe).
5. Aufstiegsbahn ≤768px gestrafft: `.climb-track` 160vh → **130vh**
   (bei 896px Höhe: 1434px → 1165px Strecke; Dokumenthöhe bei 414px:
   5551 → 5283px). Scrub-Choreografie bleibt vollständig, nur kürzer.

Neu gemessen (Dev UND Produktions-Build): 360/390/414/768/910/1024/
1025/1440 — überall scrollWidth == innerWidth, Shards ≤400px zentriert,
Desktop ab 1025px pixelidentisch. Interaktionssuite 18/18, Hamburger ok.
Build neu erzeugt; Dev-Umgebung (1× artisan, 1× Vite, hot auf
[::1]:5174) wiederhergestellt.

## [x] Mobile Feinschliff: Portal-Karten unter das Hauptportal (04.08.2026)
Gründerentscheidung zur Hierarchie umgesetzt: Auf Telefonen (≤768px)
erscheint zuerst das große Hauptportal als Haupteingang, **direkt
darunter** die beiden kompakten Karten als ergänzende Wege (links
„Unsere Ware" → /unsere-ware, rechts „Wie es funktioniert" →
/how-it-works), danach Wortmarke und Shards.

Technik: `.mobile-portal-row` steht im normalen Fluss nach der
Aufstiegsbahn und wird per `margin-top: calc(-20vh + 30px)` unter die
sichtbare Portalkante gezogen (Portal-Container endet bei 6% + 74vh =
80vh der Bühne; darunter liegen exakt 20vh — reine vh-Rechnung, keine
displayhöhen-fragile Absolutposition). Gemessene Abstände: 414px → 26px,
390px → 26px, 768px → 19px; Abstand zur Wortmarke ≥34px.

Karten: clamp(120px, 39vw, 152px) breit, 114px hoch (exakt gleich hoch,
auch bei 2-zeiligem Label), Bild 54px rund mit engem, leisem Goldglow,
Glas dunkler/violetter (rgba(14,8,32,.42)), Goldrand feiner (0.2),
Label clamp(0.68–0.78rem) in Warmcreme #e9dcb8. Fokus: 1px Goldoutline
(offset 3px); Active: translateY(1px) + leichte Aufhellung, keine
Skalierung; prefers-reduced-motion respektiert.

Wortlisten/Overlay-Texte bleiben ≤768px aus. Tablet (900: alte Kacheln,
keine Zeile) und Desktop (1440: Grid x=120/w=1200, Zeile nicht im DOM)
verifiziert unverändert. Prod-Build erneuert und gegengeprüft (gap 23px,
2 Karten, kein Overflow); Dev-Umgebung wiederhergestellt (1×/1×).

## [x] Mobile Hero-Komposition: kompakte Portal-Karten oben (04.08.2026, ersetzt durch Feinschliff oben)
Auf Telefonen (≤768px) wirken die Seitenportale nicht mehr tief unten im
Hero, sondern als zwei kompakte Portal-Karten (`.mobile-portal-topbar`,
`.mp-top-card`) direkt unter dem Header — nebeneinander, zentriert,
62px-Portalmotive mit Label, Glas-/Gold-Optik der bestehenden Portalwelt.
Ziele unverändert: links → /unsere-ware, rechts → /how-it-works.

- Keine Doppel-Darstellung: die alten gestapelten `.mobile-portals`-
  Kacheln sind ≤768px ausgeblendet; Tablets (769–1024px) behalten sie
  unverändert, Desktop (≥1025px) komplett unangetastet (Grid 1440:
  x=120/w=1200 verifiziert).
- Seitliche Overlay-Texte des Aufstiegs („Das, was dich festhält." /
  „Das, was in dir frei wird." samt Wortlisten, `.climb-words`) sind
  ≤768px komplett ausgeblendet — Desktop-Choreografie verifiziert intakt
  (erscheinen dort weiter beim Scrollen).
- Hauptportal bleibt alleiniger Fokus: Topbar endet bei y≈226, Portal
  beginnt bei y≈445, exakt zentriert (Mitte 206/207), keine Überlappung.
- Hero-Höhe mobil dadurch 3937 → 3373px (alte Kacheln ~660px entfallen).
- Getestet: 360/414/768 (Topbar, Klicks auf beide Karten, kein
  Overflow), 900 (Tablet unverändert), 1440 (Desktop unverändert);
  Produktions-Build neu erzeugt und gegengeprüft, Dev-Umgebung
  wiederhergestellt. Nur `Welcome.vue` geändert.

## [x] Hero-Portale und Navigation umsetzen (Gründerentscheidung vom 04.08.2026)
Umgesetzt am 04.08.2026 im freigegebenen UI-Arbeitsblock:

1. Mittleres Portal (PortalLoop) → **Finder** (`/prizes`): klickbar per
   Attribut-Durchreichung auf die Komponentenwurzel (`role="link"`,
   `tabindex="0"`, `aria-label="Finder öffnen"`, Klick + Enter →
   `router.visit('/prizes')`). Kein Link-Wrapper, damit der Selektor
   `.tb-loop.panther-center` und die gesamte Inszenierung (Maske,
   float-3d-Animation) unangetastet bleiben. Nur `cursor: pointer`
   ergänzt.
2. Linkes Portal → `<Link href="/unsere-ware">` (vorher Erklärvideo-
   Modal), rechtes Portal → `<Link href="/how-it-works">` (vorher
   So-funktioniert's-Modal). Button→Link-Tausch ohne Optikänderung
   (`.portal-circle` ist tag-agnostisch gestylt; `text-decoration:none`
   und `color:inherit` gegen Anker-Artefakte ergänzt).
3. Mobile Portal-Kacheln analog: Links auf `/unsere-ware` bzw.
   `/how-it-works`, Labels aktualisiert auf „Unsere Ware" / „Wie es
   funktioniert" (vorher „Begleite mich — das Erklärvideo" / „So
   funktioniert's").
4. Hauptnavigation Position 2: Label „Boxen & Abo" → **„Finder"**
   (Route bleibt `/prizes`; `AppLayout.vue`).

Modals: Erklärvideo- und So-funktiontiert's-Modal samt Inhalten
unverändert erhalten; sie bleiben über die Hero-Shards (Shard links =
Erklärvideo, Shard rechts = So funktioniert's) auf Desktop und Mobil
erreichbar — kein Trigger verloren, keine Doppelauslösung mehr an den
Portalen.

Browsergeprüft (headless Chrome, Desktop 1440px + Mobil 390px): Nav
Position 2 = Finder, alle drei Portal-Klicks navigieren korrekt,
Tastatur (Fokus + Enter) auf dem mittleren Portal funktioniert,
Zurücknavigation ok, Hero-Optik unverändert, keine neuen Konsolenfehler
auf der Startseite (drei vorbestehende 404s stammen von Legacy-Assets
der Zielseiten).

Hinweis Dev-Umgebung: Die Seitenportale erscheinen choreografiegemäß
erst beim Scrollen (GSAP autoAlpha) — für Klicktests erst scrollen.

## [x] Hero-Sektion: Panther-Portal-Szene per Higgsfield generiert (Logo + Header/Footer-Schärfe zuvor erledigt)
Beschreibung:
1. Header-/Footer-Logo (`AppLayout.vue`, `SiteFooter.vue`): damals
   Sättigungs-/Kontrast-Filter ergänzt, plus 1x/2x/3x-`srcset`-Varianten
   aus `trustbridge-portal-nobg.png` via `sharp` erzeugt
   (`trustbridge-logo-header@1x/2x/3x.png`,
   `trustbridge-logo-footer@1x/2x/3x.png`). Kein Vektor-Original vorhanden.
   **AKTUALISIERT 03.08.2026:** Die Farbfilter (`saturate/contrast/
   brightness`) wurden gemäß der Hauptlogo-Regel (Gründerentscheidung,
   siehe TRUSTBRIDGE_DECISION_LOG.md) wieder **entfernt** — die Bildmarke
   bleibt ungefiltert; nur der Footer-`drop-shadow`-Glow und die
   Hover-Skalierung bestehen fort. Die `srcset`-Varianten bleiben in
   Verwendung.
2. Hero-Mitte (`panther-center`): per Higgsfield (`gpt_image_2`, Referenz
   `trustbridge-logo-main.png`) eine Szene generiert, in der der Panther
   durch einen goldenen Portalring springt, Treppen im Hintergrund wie im
   Logo. Datei: `web/public/trustbridge-hero-portal-center.png`. CSS-Mask
   (`radial-gradient`) ergänzt, damit die rechteckige Bildkante weicher in
   den Hintergrund übergeht.
3. Hero links/rechts: zwei quadratische Portal-Kreise generiert (links:
   Panther hält einen goldenen Lichtring nach oben; rechts: Panther
   zwinkert). Dateien: `trustbridge-hero-portal-left.png`,
   `trustbridge-hero-portal-right.png`. Als klickbare `<button>` umgesetzt
   (`.portal-circle`), rund zugeschnitten (`border-radius:50%`), Hover-Glow.
   Aktuell verlinkt auf die bereits vorhandenen Modals: links →
   Erklärvideo (`isVideoOpen`), rechts → "So funktioniert's"
   (`isHowItWorksOpen`). Die Entscheidung über die endgültigen
   Portalziele wird als **eigener offener Task** oben in dieser Datei
   geführt.
4. Bestehende CSS-Ringe/Glows (`blurry-ring-wrapper`, `ambient-glow`)
   unverändert gelassen — rahmen die neuen Bilder weiterhin ein.

WICHTIGER FUND: `web/public/` enthält mehrere alte **TrustBox-Royale**-
Maskottchen-PNGs (`MainLogo Panther.png`, `panther-zwinkernMainLinks.png`,
`Panther-SiegRechts.png`, `Panther-MainRechts.png`, u.a.) — mit Krone,
Umhang, Box-Medaillon und dem Schriftzug "TrustBox Royale" im Bild.
Diese Dateien wurden NICHT als Referenz verwendet, da sie aus dem
gemeinsamen Backup vom 08.07.2026 stammen (siehe CLAUDE.md). Referenz war
ausschließlich `trustbridge-logo-main.png` (das echte neue Trustbridge-
Logo).

KORRIGIERT durch Gründerentscheidung vom 03.08.2026 (siehe
TRUSTBRIDGE_DECISION_LOG.md): Alle aktuell im Projekt vorhandenen
Panther-Assets sind von Ben als verfügbarer visueller Trustbridge-Bestand
freigegeben. Sie dürfen nicht allein aufgrund ihrer früheren
TrustBox-Nähe als Legacy aussortiert oder entfernt werden. Ben entscheidet
selbst und löscht unerwünschte Bilder später manuell. Die frühere
Empfehlung, diese Panther-*.png-Dateien perspektivisch zu entfernen, ist
aufgehoben. (Referenzen weiterhin dokumentiert in `AboutHero.vue`,
`WelcomeTrustboxSlider.vue`, `Faq.vue`, `Prizes.vue`, `HowItWorks.vue` —
dort NICHT ungefragt anfassen.)

Weiterer Fund: Der Vite-Dev-Server ist einmal mit `EBUSY: resource busy or
locked` abgestürzt, weil eine gerade per `Invoke-WebRequest` heruntergeladene
PNG-Datei in `web/public/` vom Dateisystem-Watcher erfasst wurde, während sie
noch geschrieben wurde (Windows/OneDrive-Dateisperre). Dadurch fiel Laravel
auf den alten, eingebauten `public/build`-Bundle zurück (zeigte kurzzeitig
noch TrustBox-Inhalte!). Fix: `npm run dev` neu starten, `public/hot` muss
existieren und auf die laufende Vite-URL zeigen. Für künftige Downloads
großer Assets in `public/`: idealerweise kurz warten oder Vite-Watcher-
Neustart einplanen.

Status: erledigt, im Browser visuell verifiziert (Screenshot). Die noch
offene Entscheidung zu den Ziel-Links der Portale ist als eigener offener
Task „Portalziele im Hero festlegen" am Anfang dieser Datei erfasst.

