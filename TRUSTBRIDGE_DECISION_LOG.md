# TRUSTBRIDGE – DECISION LOG

> Chronologisches Protokoll wichtiger Projektentscheidungen. Neue Einträge
> oben anfügen. Format: Datum — Entscheidung — Begründung — betroffene
> Agenten/Dateien.

## 04.08.2026 — Acht verbindliche Gründerentscheidungen (Logo-Master, Portalziele, Autonomie, Boxen-System, Sprachen, Leserechte, Tailwind-Prüfung, Audits)

**Entscheidung (Ben, Gründer):**

1. **Hauptlogo (ersetzt die offene Master-Asset-Entscheidung vom
   03.08.2026):** Das offizielle Trustbridge-Hauptlogo ist das
   **vollständige Motiv des „Trustbridge Portal“-Assets**: komplettes
   Portal-/Kreis-Motiv mit Panther, Elster, Mond und
   TRUST/BRIDGE-Schriftzug. Dieses vollständige Motiv ist die maßgebliche
   Bildmarke. Animationen, Glow, Nebel, Reveal und kreisende Hero-Effekte
   sind erlaubt, solange das Motiv nicht inhaltlich verfälscht wird. Die
   frühere Beschreibung „Zeichen mit Brücke und Elster“ und der Status
   „Master-Asset offen“ sind damit ersetzt.

2. **Hero-Portale und Navigation:** Mittleres großes Portal → **Finder**
   (aktuelles Ziel: `/prizes`); linkes Portal → **Unsere Ware**
   (`/unsere-ware`); rechtes Portal → **Wie es funktioniert**
   (`/how-it-works`). Zusätzlich kommt **„Finder“ in der Hauptnavigation
   an die 2. Stelle** — an die heutige Position von „Boxen & Abo“.
   (Umsetzung: eigener UI-Task in `TASKS.md`.)

3. **Arbeitsmodus/Autonomie (verfeinert die Regeln vom 03.08.2026):**
   Bei einem Umsetzungs- oder Gestaltungsauftrag von Ben darf Claude
   innerhalb des Auftrags autonom arbeiten, mitdenken und nötige
   Folgeanpassungen selbst ausführen — keine Rückfragen wegen
   Kleinigkeiten. **Harte Stopp-Punkte (nur diese erfordern Rückfrage):**
   irreversible Löschungen großer Bestände, Datenbank-Schreibzugriffe/
   -Resets, Git-History-Rewrites, externe Uploads/Pushes/
   Veröffentlichungen, Umgang mit Live-Secrets.

4. **Shards / Gamification / Boxen-&-Abo-System (ersetzt die
   Freigabepflicht-Klausel vom 03.08.2026):** Diese Richtung ist
   **ausdrücklich gewollt**. Optik, Interaktionslogik, Gamification und
   visuelle Systematik von „Boxen & Abo“ werden als **Trustbridge-System
   erhalten und transformiert**. TrustBox-Inhalte und altes Wording dürfen
   entfernt oder umgebaut werden; die gute Optik und Funktion bleiben
   gewollt.

5. **Sprachen:** Trustbridge wird technisch auf **Deutsch, Englisch und
   Spanisch** vorbereitet; die i18n-Struktur soll früh sauber aufgebaut
   werden. Inhaltlich bleibt Deutsch zunächst führend; Englisch und
   Spanisch folgen gestuft.

6. **Prüf- und Leserechte:** Rein lesende Inventuren der lokalen
   Projektstruktur und der lokalen Datenbank sind ausdrücklich
   freigegeben. Nichts löschen, nichts resetten, nichts schreiben ohne
   ausdrücklichen Auftrag.

7. **Tailwind:** Technische Prüfung, ob Tailwind gebraucht wird, ist
   beauftragt; danach begründete Empfehlung (einbinden oder entfernen).
   Keine Änderung ohne ausdrücklichen Auftrag.

8. **Audits:** Wissensaudit und Sicherheits-/Harness-Berichte bleiben
   **interne lokale Dokumente** und werden nicht für GitHub vorbereitet
   (`docs/knowledge/audits/` wird gitignoriert).

**Betroffene Dateien:** `TRUSTBRIDGE_PROJECT_BRIEF.md`,
`.agents/rules/style_and_notes.md`, `AGENTS.md`, `TASKS.md`,
`.gitignore`, `.claude/agents/trustbridge-fullstack-architect.md`,
`docs/knowledge/audits/CLAUDE_HARNESS_AND_SAFETY_PASS_2026-08-03.md`
(Nachtrag).

## 03.08.2026 — Panther-Assets und Public-Bestand als Trustbridge-Asset-Pool freigegeben (Gründerkorrektur)

**Entscheidung (Ben, Gründer; neuer als alle gegenteiligen Formulierungen
in Codex-Berichten oder früheren Einstufungen — diese hat Vorrang):**

1. **Panther-Assets:** Alle Panther-Figuren und Panther-Bilder, die Ben
   jemals in dieses Projekt eingefügt hat und die aktuell noch im
   Repository vorhanden sind, sind für Trustbridge ausdrücklich
   freigegeben. Das gilt nicht nur für den Hero links/rechts, sondern auch
   für die Panther auf `/prizes`, weitere Panther-Darstellungen im
   Projekt, alle vorhandenen Panther-Bilder unter `web/public/` sowie
   Panther-Renderings, Varianten und visuelle Experimente. Keines dieser
   Assets darf allein wegen einer früheren Verbindung zu TrustBox als
   unerwünschtes Legacy, als zu löschende Altlast oder als nicht
   verwendbar eingestuft werden. Alle Panther bleiben als verfügbarer
   visueller Trustbridge-Asset-Pool erhalten.

2. **Public-Ordner:** Alle aktuell unter `web/public/` vorhandenen
   Bilder, Videos, Renderings und sonstigen **visuellen Medien** sind
   grundsätzlich für eine mögliche Verwendung in Trustbridge freigegeben.
   Sie sind nicht automatisch TrustBox-Legacy und dürfen nicht aufgrund
   ihrer Herkunft pauschal entfernt oder archiviert werden.
   **Präzisierung:** Die Freigabe umfasst nicht automatisch jede
   technische Datei, jeden Build-Output oder sonstige Nicht-Mediendateien
   unter `web/public/`. Freigabe bedeutet **Nutzbarkeit**, nicht
   verpflichtenden Einsatz. Agenten dürfen diese visuellen Medien nicht
   eigenständig löschen, aussortieren oder als unerwünschte
   TrustBox-Altlast einstufen. Ben entscheidet selbst und löscht
   unerwünschte Bilder später manuell. Solange Ben ein Asset nicht
   ausdrücklich entfernt oder sperrt, gilt es als verfügbarer visueller
   Bestand.

3. **Trennung Optik/Inhalt:** TrustBox verschwindet langfristig als
   Thema, Geschäftsmodell und inhaltliche Struktur. Zu entfernen oder
   vollständig umzubauen: TrustBox-Markenbezeichnungen, Boxen-Angebote,
   Waren- und Retoureninhalte, Reseller-Angebote, alte TrustBox-Preise,
   TrustBox-spezifische Texte, Nutzerwege und Geschäftslogik.
   Ausdrücklich übernommen werden dürfen: Panther und andere vorhandene
   Visuals, hochwertige Renderings, Portalwelten, Shards, Gamification,
   Animationen, visuelle Komponenten, Dashboard-Optik, vorhandene
   technische Komponenten und Mechaniken. **Shards und Gamification dürfen
   technisch übernommen werden; ihr produktiver Einsatz benötigt eine
   spätere ausdrückliche Freigabe durch Ben.**
   **Kurzformel: TrustBox-Inhalte und -Geschäftsmodell werden entfernt;
   geeignete Optik, Assets, Systeme und Technik werden zu Trustbridge
   transformiert.**

4. **Ersetzte Formulierung:** Der Satz „Alte, separat vorhandene
   TrustBox-Panther-Assets bleiben Legacy" ist aufgehoben. Er wird ersetzt
   durch: „Alle aktuell im Projekt vorhandenen Panther-Assets sind von Ben
   als verfügbarer visueller Trustbridge-Bestand freigegeben. Sie dürfen
   nicht allein aufgrund ihrer früheren TrustBox-Nähe als Legacy
   aussortiert oder entfernt werden."

**Verbindliche Unterscheidung für alle Agenten:**
(A) freigegebene visuelle und technische Ausgangsbestandteile —
(B) zu entfernende TrustBox-Inhalte und Geschäftslogiken.

**Betroffene Dateien:** `TRUSTBRIDGE_PROJECT_BRIEF.md`, `TASKS.md`,
`.agents/rules/style_and_notes.md`, `.claude/agents/*` (Panther-/
Ästhetik-Verbotslisten), Audit-Bericht
`docs/knowledge/audits/CLAUDE_HARNESS_AND_SAFETY_PASS_2026-08-03.md`
(dessen Panther-„Legacy"-Einstufungen sind durch diesen Eintrag überholt).

## 03.08.2026 — Zentrales Hauptlogo und Hero-Inszenierung verbindlich bestätigt

**Entscheidung (Ben, Gründer):** Das mittige Trustbridge-Zeichen mit
Brücke und Elster ist das zentrale Hauptlogo der gesamten Marke.

Form, Farben, Bestandteile und Proportionen der eigentlichen Bildmarke
müssen erhalten bleiben. Das Logo darf nicht dauerhaft umgefärbt,
verzerrt, beschnitten oder in seinen Bestandteilen verändert werden.

Der bestehende Hero-Effekt ist ausdrücklich bestätigt und bleibt
unverändert bestehen:

- Licht und Glow
- Nebel und Schleier
- Transparenz und Reveal
- scrollabhängige Sichtbarkeit
- bewegliche Portalringe und Ebenen

Diese Effekte inszenieren das Logo und verändern nicht seine Identität.
Beim Scrollen wird das Logo aus dem Licht- und Nebelschleier heraus
sichtbar; beim Zurückscrollen verschwindet es wieder teilweise in dieser
Inszenierung.

**OFFENE ENTSCHEIDUNG:** Die technisch kanonische Master-Asset-Datei des
Hauptlogos ist noch nicht endgültig bestimmt. Keine Datei darf
eigenständig zum Master erklärt werden.

**Ersetzte historische Regel (24.07.2026, ehemals in
`.agents/rules/style_and_notes.md`, dort am 03.08.2026 entfernt):**
„Das Trustbridge-Logo muss IMMER original aussehen — Quelle ist
`web/public/Trustbridge Portal.png`. Niemals rund maskieren, beschneiden,
umfärben oder mit Ringen/Effekten versehen. Nur skalieren
(Seitenverhältnis beibehalten) und positionieren ist erlaubt." Diese
Regel ist vollständig durch die obige Entscheidung ersetzt; insbesondere
sind Ringe/Effekte **um** die Bildmarke jetzt ausdrücklich erlaubt, und
die dort genannte Quelldatei gilt nur als einer von mehreren
Master-Kandidaten.

**Betroffene Dateien:** `web/resources/js/Pages/Welcome.vue`,
`web/resources/js/Components/Hero/PortalLoop.vue` (Hero unantastbar),
`web/resources/js/Layouts/AppLayout.vue`,
`web/resources/js/Components/SiteFooter.vue` (permanente Farbfilter auf
der Bildmarke entfernt, siehe Quick-Wins vom 03.08.2026),
`.agents/rules/style_and_notes.md`.

## 03.08.2026 — Panther-Hero als Trustbridge-Markenelement bestätigt

**Entscheidung (Ben, Gründer):** Der Panther-Hero ist eine verbindliche
Trustbridge-Markenentscheidung.

Die Panther links und rechts bleiben Teil der Trustbridge-Markenwelt.
Ihre aktuelle Grundwirkung und Stilrichtung sind bestätigt. Sie dürfen
später qualitativ verbessert, neu gerendert oder fein angepasst werden,
müssen aber derselben hochwertigen, mystischen Trustbridge-Portalwelt
angehören.

**Der Panther ist keine unerwünschte TrustBox-Altlast**, sondern ein
bewusst übernommenes und bestätigtes Trustbridge-Markenelement. Das
pauschale Panther-Verbot in älteren Fassungen von
[TRUSTBRIDGE_PROJECT_BRIEF.md](TRUSTBRIDGE_PROJECT_BRIEF.md) §14 ist
insoweit aufgehoben.

**Betroffene Dateien:** `TRUSTBRIDGE_PROJECT_BRIEF.md`, `TASKS.md`,
Agentenprofile mit Panther-Verbotslisten (Anpassung noch offen).

## 03.08.2026 — Regeln für Claude-Automatisierung festgelegt

**Entscheidung (Ben, Gründer):** Claude Code darf Aufgaben automatisiert
analysieren, klären und umsetzen, sobald Ben ausdrücklich einen Arbeits-,
Umsetzungs- oder Automatikmodus freigibt.

Das bloße Starten von Entwicklungsumgebung, Server oder Container darf
niemals automatisch `TASKS.md` abarbeiten oder Dateien verändern.

In einem ausdrücklich freigegebenen Arbeitsmodus darf Claude normale
technische Detailentscheidungen treffen, Fehler korrigieren, bestätigte
Aufgaben umsetzen und zulässige Tests durchführen.

Claude muss vor folgenden Dingen anhalten und Ben fragen:

- neue strategische Markenentscheidungen
- neue Angebote oder Preise
- rechtlich, steuerlich oder finanziell relevante Entscheidungen
- Veränderungen an Zahlungs- oder realen Kundendaten
- Datenbank- oder Dateilöschungen
- grundlegende Architekturwechsel
- externe Veröffentlichungen
- Commits und Pushes, sofern nicht ausdrücklich freigegeben
- widersprüchliche verbindliche Anweisungen

**Betroffene Dateien:** `AGENTS.md` (Root, Task-Schleife entkoppelt),
`.agents/AGENTS.md`.

## 03.08.2026 — Verhältnis TrustBox zu Trustbridge geklärt

**Entscheidung (Ben, Gründer):** TrustBox ist kein zukünftiger
inhaltlicher Geschäftsbereich von Trustbridge. Das vorhandene
TrustBox-Projekt ist jedoch eine technische und teilweise visuelle
Ausgangsbasis für Trustbridge.

Bewusst übernommen und für Trustbridge weiterentwickelt werden dürfen:

- hochwertige Renderings
- Portaldesigns
- Animationen
- Shards-Logik
- Gamification
- vorhandene Komponenten
- Dashboard-Strukturen
- technisch brauchbare Funktionen und Codegrundlagen

Alle Inhalte, Texte, Markenbezeichnungen, Angebote, Preise, Nutzerwege,
Produkte und zukünftigen Funktionen werden vollständig Trustbridge.

Alte TrustBox-spezifische Boxen-, Waren-, Retouren-, Reseller- und
Preislogiken sollen langfristig verschwinden, jedoch ausschließlich nach
technischer Abhängigkeitsprüfung und kontrollierter Migration.

**Hinweis:** Die Übernahme als technische Basis ist freigegeben; der
produktliche Einsatz übernommener Mechaniken (z. B. Shards, Gamification)
bleibt eine spätere Angebotsentscheidung, die Bens Freigabe benötigt.

**Betroffene Dateien:** `TRUSTBRIDGE_PROJECT_BRIEF.md` §14, `CLAUDE.md`.

## 18.07.2026 — Trennung von TrustBox Royale hergestellt

**Entscheidung:** Die am 18.07.2026 aus dem TrustBox-Royale-Projekt
kopierten Agenten (`experience-director`, `motion-engineer`,
`higgsfield-art-director`) wurden als fehlerhaft erkannt, da sie
TrustBox-spezifische Geschäftsinhalte (Preisstufen 111/333/999 €,
Warenboxen, Panther-Maskottchen, Reseller-Funnel) unreflektiert für
Trustbridge übernahmen.

**Maßnahme:**
- `experience-director` und `motion-engineer` wurden vom Nutzer gelöscht.
- `higgsfield-art-director` wurde zu `trustbridge-higgsfield-art-director`
  umbenannt und inhaltlich vollständig auf die Trustbridge-Bildwelt
  (Wald, Brücke, Licht/Gold, echte Menschen) umgestellt.
- Zentrale Wahrheitsquelle [TRUSTBRIDGE_PROJECT_BRIEF.md](TRUSTBRIDGE_PROJECT_BRIEF.md)
  angelegt; jeder Agent liest sie zuerst.
- Vollständiges Agenten-Set für Trustbridge angelegt (Orchestrator,
  Brand Strategy, Service Architect, Experience Director, Content
  Director, Compliance Reviewer, Fullstack Architect, Payments Engineer,
  Motion Engineer, Higgsfield Art Director, Analytics/CRO Researcher).

**Begründung:** Trustbridge ist eine strategische Transformations-,
Führungs- und Strukturierungsberatung (TB International Holdings Limited,
Hong Kong) — inhaltlich vollkommen unabhängig von TrustBox Royale
(deutsche Warenpaket-Website). Beide Projekte teilen sich denselben
Rechner und ähnliche Dateibäume, dürfen aber inhaltlich nie vermischt
werden (siehe [CLAUDE.md](CLAUDE.md)).

## 18.07.2026 — Geschäftsmodell erstmals vollständig dokumentiert

Nutzer hat Kernidentität, Leitgedanken, Werte, Vier-Ebenen-Modell
(Trust Yourself / Lead with Clarity / Bridge Your Structure / Learn,
Transform and Grow), Zielgruppen, Unternehmensdaten (TB International
Holdings Limited, Hong Kong) und geplante Zahlungsanbieter (Stripe,
PayPal Business, Airwallex) bereitgestellt. Festgehalten in
[TRUSTBRIDGE_PROJECT_BRIEF.md](TRUSTBRIDGE_PROJECT_BRIEF.md).

Offen: konkrete Preise, exakte Leistungsbeschreibungen und finale
rechtliche Formulierungen sind noch nicht bestätigt (siehe
[TRUSTBRIDGE_SERVICE_CATALOG.md](TRUSTBRIDGE_SERVICE_CATALOG.md) und
[TRUSTBRIDGE_LEGAL_BOUNDARIES.md](TRUSTBRIDGE_LEGAL_BOUNDARIES.md)).
