# 🔐 TrustBox Royale — Test-Zugangsdaten

> **ACHTUNG:** Diese Datei nicht in öffentliche Repositories pushen! Nur für lokale Entwicklung.

---

## 👑 Admin-Account

| Feld | Wert |
|------|------|
| **URL** | http://localhost:8000/login |
| **E-Mail** | admin@trustboxroyale.de |
| **Passwort** | Admin@TBR2024! |
| **Rechte** | Administrator (Zugang zu /admin) |

---

## 👤 Kunden-Accounts

### Kunde 1 (mit Guthaben)

| Feld | Wert |
|------|------|
| **E-Mail** | kunde@trustboxroyale.de |
| **Passwort** | Kunde@TBR2024! |
| **Guthaben** | 5,00 € |
| **Rolle** | Normaler Kunde |

### Kunde 2 (geworbener Freund)

| Feld | Wert |
|------|------|
| **E-Mail** | test2@trustboxroyale.de |
| **Passwort** | Test@TBR2024! |
| **Sponsor** | kunde@trustboxroyale.de |
| **Rolle** | Normaler Kunde |

---

## 🚀 Seeder ausführen

```powershell
cd d:\dev\fee\web
php artisan db:seed --class=TestUsersSeeder
```

Oder alle Seeders:

```powershell
php artisan db:seed
```

---

## 🔗 Wichtige URLs

| Seite | URL |
|-------|-----|
| Frontend | http://localhost:8000/ |
| Login | http://localhost:8000/login |
| Registrieren | http://localhost:8000/register |
| Kunden-Dashboard | http://localhost:8000/dashboard |
| Admin-Dashboard | http://localhost:8000/admin |
| Admin Nutzer | http://localhost:8000/admin/users |

---

> Erstellt: 2026-05-05 | TrustBox Royale Dev Setup
