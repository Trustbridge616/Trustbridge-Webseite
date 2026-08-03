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

