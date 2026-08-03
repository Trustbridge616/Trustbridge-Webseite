# Agent Behavior Rules

- **Automatic Environment Startup**: When the user asks to start the development environment (e.g. by saying "npm run dev", "php artisan serve", and "starte docker"), you must AUTOMATICALLY start the following in the background:
  1. Docker containers by running `docker compose -p trustbridge up -d` in the project root. (Der Projektname `-p trustbridge` ist Pflicht — er sichert die Trennung vom parallel laufenden TrustBox-Royale-Projekt.)
  2. The web server by running `npm run dev` in the `web` directory (which handles both Vite and Laravel).
- **PHP Path Warning**: Remember that `php` is not in the system PATH. Always use the absolute path `C:\php\php.exe` for any manual artisan commands. This is already handled in `package.json` for `npm run dev`. Do not complain about PHP errors; just start the commands!
