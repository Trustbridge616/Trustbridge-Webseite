# Tasks

Neue Aufgaben hier eintragen. Sie werden automatisch nacheinander abgearbeitet.

Format pro Task:

```
## [ ] Kurzer Titel
Beschreibung der Aufgabe.
Screenshots/Anhänge: Pfad zur Datei (z.B. temp/screenshot-2026-07-08.png)
```

Status: `[ ]` = offen, `[~]` = in Arbeit, `[x]` = erledigt

---

<!-- Offene Tasks unterhalb dieser Linie -->

## [x] Hero-Sektion: Panther-Portal-Szene per Higgsfield generiert (Logo + Header/Footer-Schärfe zuvor erledigt)
Beschreibung:
1. Header-/Footer-Logo (`AppLayout.vue`, `SiteFooter.vue`): Sättigungs-/
   Kontrast-Filter (`saturate(1.4) contrast(1.15) brightness(1.05)`)
   ergänzt, plus 1x/2x/3x-`srcset`-Varianten aus `trustbridge-portal-nobg.png`
   via `sharp` erzeugt (`trustbridge-logo-header@1x/2x/3x.png`,
   `trustbridge-logo-footer@1x/2x/3x.png`). Kein Vektor-Original vorhanden.
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
   (`isHowItWorksOpen`). **Bitte bestätigen, ob das als "verschiedene
   Stationen" reicht oder echte Unterseiten-Links gewünscht sind.**
4. Bestehende CSS-Ringe/Glows (`blurry-ring-wrapper`, `ambient-glow`)
   unverändert gelassen — rahmen die neuen Bilder weiterhin ein.

WICHTIGER FUND: `web/public/` enthält mehrere alte **TrustBox-Royale**-
Maskottchen-PNGs (`MainLogo Panther.png`, `panther-zwinkernMainLinks.png`,
`Panther-SiegRechts.png`, `Panther-MainRechts.png`, u.a.) — mit Krone,
Umhang, Box-Medaillon und dem Schriftzug "TrustBox Royale" im Bild.
Diese Dateien wurden NICHT als Referenz verwendet, da sie aus dem
gemeinsamen Backup vom 08.07.2026 stammen (siehe CLAUDE.md). Referenz war
ausschließlich `trustbridge-logo-main.png` (das echte neue Trustbridge-
Logo). Diese alten Panther-*.png-Dateien sollten perspektivisch aus
`web/public/` entfernt werden, sobald geklärt ist, welche Seiten sie noch
einbinden (siehe Referenzen in `AboutHero.vue`, `WelcomeTrustboxSlider.vue`,
`Faq.vue`, `Prizes.vue` — dort NICHT ungefragt angefasst).

Weiterer Fund: Der Vite-Dev-Server ist einmal mit `EBUSY: resource busy or
locked` abgestürzt, weil eine gerade per `Invoke-WebRequest` heruntergeladene
PNG-Datei in `web/public/` vom Dateisystem-Watcher erfasst wurde, während sie
noch geschrieben wurde (Windows/OneDrive-Dateisperre). Dadurch fiel Laravel
auf den alten, eingebauten `public/build`-Bundle zurück (zeigte kurzzeitig
noch TrustBox-Inhalte!). Fix: `npm run dev` neu starten, `public/hot` muss
existieren und auf die laufende Vite-URL zeigen. Für künftige Downloads
großer Assets in `public/`: idealerweise kurz warten oder Vite-Watcher-
Neustart einplanen.

Status: erledigt, im Browser visuell verifiziert (Screenshot). Punkt 3
(Ziel-Links der Portale) noch mit Nutzer abzustimmen.

