# 🏆 TrustBox Royale — Roadmap

> Wir verkaufen Retouren-Pakete von Großunternehmen. Kunden wählen eine Kategorie & Paketgröße — was drin ist, bleibt eine Überraschung. Je höher das Paket, desto höher der Warenwert. Jeder macht Gewinn.

---

## 🎨 Phase 1 — Frontend & Seiten ✅ NAHEZU ABGESCHLOSSEN

- [x] Hero-Section mit 3D-Panther-Animationen, Spotlight, Partikel
- [x] Animierter Hintergrund-Gradient
- [x] Header mit Gold-Buttons (Login / Registrieren) + Shine-Effekt
- [x] Scroll-linked 3D-Rotation der Mittelfigur
- [x] Navbar: aktiver Link dynamisch je nach Route
- [x] Navbar: weiße Links auf dunklen Unterseiten (`.navbar-dark`)
- [x] **Alle Unterseiten der Navbar ausgebaut** (vollständig auf Deutsch)
  - [x] `/about` — Über uns (Statistiken, Geschichte)
  - [x] `/how-it-works` — Wie es funktioniert (5 Schritte, Monatsrhythmus, Laufzeiten)
  - [x] `/prizes` — Pakete (Kategorien, 1/2/3 Pakete/Monat, Laufzeit-Tabs 6M default, animierte Featured-Card)
  - [x] `/faq` — Häufige Fragen (Akkordeon, ehrliche Rückgabe-Policy)
  - [x] `/partner` — Partnerprogramm (Werben & Gratis-Paket erhalten)
  - [x] `/kontakt` — Kontaktseite mit Funnel (Thema → Schnellantwort / Formular)
- [x] **Register-Seite** — Premium-Design, mittig, korrekt über Header
- [x] **SiteFooter** — alle Seiten verknüpft, Legal-Links vorbereitet
- [x] **Home** — massiv erweitert mit Sektionen (Wie es funktioniert, Pakete, Partner, Vertrauen, CTA)
- [x] **Legal-Seiten** (Pflicht vor Go-Live)
  - [x] `/impressum`
  - [x] `/datenschutz`
  - [x] `/agb`
  - [x] `/widerruf`

---

## 🛒 Phase 2 — Produkte & Pakete

> Das Kernprodukt: Überraschungspakete aus Retouren-Waren

- [ ] **Paketkategorien** als Datenbank-Modell (Elektronik, Mode, Haushalt, Sport, Spielzeug, Gemischt)
- [ ] **Paketstufen** mit Preis & Mindestwert-Garantie
  - 1 Paket/Monat: 69,99 €, 2 Pakete: 124,99 €, 3 Pakete: 179,99 €
  - Laufzeit-Rabatte: 3M = -10%, 6M = -20%
- [ ] **Subscription-Modell** im Backend (Laravel + Stripe)
  - Mindestlaufzeit: 1 / 3 / 6 Monate
  - Danach monatlich kündbar, kein Auto-Ende
- [ ] Stripe Checkout-Session erstellen
- [ ] Webhooks: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`
- [ ] **Automatische monatliche Paketzuweisung** nach Abo-Plan

---

## 💳 Phase 3 — Abonnements & Zahlungen

- [ ] **Stripe-Integration** (Checkout, Webhooks, Abo-Verwaltung)
- [ ] **Onboarding-Flow** nach Registrierung (Plan wählen → Zahlung → Willkommens-Mail)
- [ ] **Invoicing**: Automatische Rechnungserstellung (PDF) per Mail
- [ ] Abo-Status im Backend verwalten (aktiv / pausiert / gekündigt)

---

## 👤 Phase 4 — Kunden-Dashboard

- [x] **Mein Bereich** — Übersicht für eingeloggte Nutzer
  - [x] Meine Bestellungen (Status: offen, versendet, geliefert, Tracking)
  - [x] Mein Abo (anzeigen, kündigen nach Mindestlaufzeit)
  - [x] Meine Rechnungen (PDF-Download via Stripe)
  - [x] Profil & Adressverwaltung
- [x] Referral-Link anzeigen & teilen (Partner-Seite im Dashboard)
- [x] Gratis-Paket-Status (verdient / eingelöst) + direkte Bestellung
- [ ] Neue ABos bestellen (mit Plänen wie im Frontend), Stripe vollständig anbinden

---

## 👑 Phase 5 — Admin-Dashboard

- [x] Nutzerverwaltung (anzeigen, bearbeiten, löschen)
- [x] Bestellverwaltung (alle Bestellungen, Status setzen, Tracking-ID)
- [ ] Paketverwaltung (Pakete anlegen, Kategorien, Preise)
- [x] Abonnement-Verwaltung (aktive Abos, Kündigen, Reaktivieren)
- [ ] Zahlungsübersicht (Stripe-Daten, nach Phase 3)
- [ ] Statistiken & Umsatz-Dashboard
- [x] MLM Verwaltung: Testprovisionen via Button einbuchbar

---

## 🔗 Phase 6 — MLM / Referral-System

- [x] `/partner` Seite mit Erklärung des Referral-Systems
- [x] **Referral-Link** im Kunden-Dashboard sichtbar & kopierbar
- [x] Sponsor-Tracking bei Registrierung (sponsor_id gespeichert)
- [x] Gratis-Paket-Gutschrift: Admin kann Provisionen buchen
- [x] Referral-Übersicht im Kunden-Dashboard (Partner-Seite)
- [x] Auszahlungslogik (Gratis-Paket) — über Kunden-Dashboard bestellbar

---

## 🚀 Phase 7 — Go-Live & Marketing

- [x] SEO-Optimierung: SeoHead-Komponente, Meta-Tags, ld+json auf Home, Prizes, FAQ
- [x] sitemap.xml erstellt (alle öffentlichen Seiten)
- [ ] Cookie-Banner (DSGVO-konform)
- [ ] Performance-Optimierung (Bilder, Fonts, Caching)
- [ ] E-Mail-Templates (Willkommen, Bestellbestätigung, Rechnung, Abo-Kündigung)
- [ ] Open Graph / Social Media Tags (alle Seiten)

---

## 📝 Notizen
- Maximale Werbe- und Kaufwirkung erzielen. Texte auch nochmal eingehend dahingend überarbeiten
- Pakete sind **zufällig** — Kategoriewahl schränkt ein, kein Anspruch auf spezifische Produkte
- **Keine Garantie / Gewährleistung** — B-Ware und Defekte sind explizit Teil des Konzepts
- Abos laufen **nicht automatisch aus**, müssen aktiv gekündigt werden (nach Mindestlaufzeit)
- Sprache der gesamten App: **Deutsch**
- Design-Sprache: **TrustBox Royale** — Gold, Lila, Schwarz, 3D-Animationen, Premium-Feel
- Grundpreis: **69,99 €** für 1 Paket/Monat bei 1 Monat Laufzeit
