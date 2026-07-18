# TRUSTBRIDGE

Dies ist das **Trustbridge**-Projekt — eine eigenständige Webseite mit eigener Marke.

## Nicht mit TrustBox Royale verwechseln

Auf demselben Rechner liegt ein zweites, **vollkommen getrenntes** Projekt:
`C:\Users\tisch\OneDrive\Desktop\TrustboxRoyale` (Marke: TrustBox Royale, Ports 8000/5173).

Beide Projekte haben nahezu identische Dateibäume und gleich benannte Dateien
(`Prizes.vue`, `Welcome.vue`, `AppLayout.vue` …), weil Trustbridge aus einem
TrustBox-Backup vom 08.07.2026 aufgebaut wurde. **Niemals Dateien im jeweils
anderen Projektordner bearbeiten.** Im Zweifel den absoluten Pfad prüfen.

## Herkunft

Am 16.07.2026 wurden in TrustBox Royale mit Commit `1b0ea39` zahlreiche Unterseiten
entfernt. Diese Seiten leben hier weiter und bilden die Grundlage von Trustbridge:
UnsereWare (Seite + 11 Komponenten), Admin-Bereich (8 Seiten), Categories,
FAQ, HowItWorks, Prizes, WriterSection.

Trustbridge hat 32 Seiten, TrustBox nur 20.

## Lokale Umgebung

| | |
|---|---|
| Webseite | http://127.0.0.1:8001 |
| Vite | Port 5174 (`strictPort: true`) |
| MySQL | Container `trustbridge_db`, Host-Port **33062** |
| Compose-Projekt | `trustbridge` |
| PHP | `C:\php\php.exe` |
| App-Code | im Unterordner `web/` |

Starten:
```
docker compose -p trustbridge up -d          # aus dem Projektwurzelverzeichnis
cd web && npm run dev                        # startet artisan (8001) + vite (5174)
```

`npm run dev` startet über `concurrently` **beides**. Kein separates
`php artisan serve` aufrufen — das kollidiert.

TrustBox Royale läuft parallel auf 8000/5173/33061. Die beiden stören sich nicht,
solange die Ports und Containernamen unverändert bleiben.

## Stand der Arbeit

Bisher ist nur die **technische** Trennung erledigt: Ordner, Ports, Container,
Datenbank und `APP_NAME`. Inhaltlich tragen die Seiten noch TrustBox-Texte,
-Logos und -Preise. Die Umstellung auf die Marke Trustbridge steht aus.

## Hinweise

- Die Datenbank enthält den TrustBox-Datenstand vom 08.07.2026.
- Der Ordnername ist bewusst ohne Umlaute und Leerzeichen — Docker-Bindmounts
  (`./mysql_data`) brechen sonst auf Windows.
- Weitere Projektregeln in `.agents/rules/`.
