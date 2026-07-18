# Retouren-Abo Plattform: Projektplan & Architektur

## 1. Übersicht
Plattform zum Vertrieb von unkategorisierten Retourenartikeln (Elektronik, Haushalt, Textil) im Abo-Modell. Nutzer bestellen Überraschungskisten einer bestimmten Kategorie für eine festgelegte Laufzeit (z.B. 6 Monate).

## 2. Kernfunktionen
- **Abo-System:** 
  - Kategorien (Elektronik, Haushalt, Textil, etc.).
  - Laufzeiten (z.B. 1, 3, 6, 12 Monate) mit monatlicher oder Einmal-Zahlung.
- **Payment-Gateway:** 
  - PayPal-Integration für Abos/Zahlungen.
  - Webhook-Anbindung für asynchrone Statusupdates (Zahlungseingänge, Kündigungen etc.).
- **Multi-PayPal-Rotation:** 
  - System zur Verwaltung mehrerer PayPal-Accounts (Client IDs / Secrets).
  - Zufällige (oder lastenbasierte) Zuweisung eines PayPal-Kontos bei Checkout-Beginn.
- **MLM / Affiliate System:** 
  - Nutzer erhalten einen Empfehlungslink.
  - Geworbene Nutzer generieren Provisionen für den Werber.
  - Provisionen werden **nicht** ausgezahlt, sondern als internes Guthaben verbucht.
  - Guthaben wird automatisch bei der nächsten Abo-Verlängerung/Zahlung verrechnet.
- **Frontend & SEO:** 
  - Umfangreicher Content, optimiert für Suchmaschinen.
  - Visuell ansprechendes Design, umgesetzt mit Vanilla CSS (kein Tailwind).
- **Nutzer-Portal:** 
  - Übersicht der eigenen Abos.
  - Verwaltung der Zahlungsmittel.
  - Übersicht des eigenen Affiliate-Netzwerks und des aktuellen Guthabens.
- **Admin-Dashboard:** 
  - Verwaltung aller Entitäten (Nutzer, Abos, Kategorien, PayPal-Accounts).
  - Übersicht der Bestellungen/Batches zur Versandvorbereitung.

## 3. Technologie-Stack
- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** Inertia.js mit Vue 3, Vanilla CSS
- **Datenbank:** MySQL (lokal via Docker auf Port 33061)

## 4. Datenbank-Schema (Entwurf)
- `users`: id, name, email, password, sponsor_id (für MLM), credit_balance
- `categories`: id, name, slug, description, image_url, base_price
- `subscriptions`: id, user_id, category_id, duration_months, status, next_billing_date
- `paypal_accounts`: id, name, client_id, client_secret, is_active, total_processed
- `payments`: id, subscription_id, paypal_account_id, transaction_id, amount, status
- `commissions`: id, user_id, referred_user_id, subscription_id, amount, status (credited)

## 5. Implementierungsphasen
1. **Infrastruktur & Setup:** Laravel installieren, Inertia/Vue einrichten, Docker-DB aufsetzen.
2. **Datenbank & Modelle:** Migrations für Users, Categories, Subscriptions, Payments und PayPalAccounts.
3. **Multi-PayPal & Checkout:** Service für dynamische PayPal-API-Konfiguration, Checkout-Prozess, Webhooks.
4. **MLM System:** Ref-Link Generierung, Zuordnung bei Registrierung, Provisionsberechnung bei Zahlungseingang.
5. **Frontend (Nutzer):** Landingpage, Kategorien, Checkout, User-Dashboard (Abos, Affiliate).
6. **Admin-Backend:** Verwaltungsoberfläche für uns.
