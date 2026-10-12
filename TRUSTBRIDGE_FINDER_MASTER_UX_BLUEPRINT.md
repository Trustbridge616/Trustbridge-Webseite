# TRUSTBRIDGE FINDER — MASTER UX & METHODIK BLUEPRINT

**Stand:** 12.10.2026 · **Status:** Forschungs- und Konzeptergebnis zur Prüfung durch den Gründer. **Kein Implementierungs-Go** für das Produkt; der experimentelle Prototyp „Finder Lab“ (Kapitel 7.4) ist reversibel und nur lokal erreichbar.
**Auftrag:** `TRUSTBRIDGE_FINDER_MASTER_UX_RESEARCH_PROMPT.md` (Desktop) inkl. Ergänzung „Autonomer Forschungs- und Entwicklungsauftrag“ (12.10.2026).
**Protokoll:** `TRUSTBRIDGE_FINDER_UX_RESEARCH_LOG.md`.
**Verbindliche Grundlagen:** `TRUSTBRIDGE_PROJECT_BRIEF.md` (Vorrang bei Widersprüchen), `TRUSTBRIDGE_FINDER_ARCHITEKTUR.md` (Abschnitt 0.1 = Festlegungen vom 12.10.2026), `TRUSTBRIDGE_DECISION_LOG.md`, `TRUSTBRIDGE_LEGAL_BOUNDARIES.md`, `web/resources/finder/` (Phase 0). `core-system.md` ist **Entwurf**, nicht freigegeben.

**Lesehinweis zur Kennzeichnung.** Im gesamten Dokument gilt:
- **[G]** wörtliche oder sinngemäß direkte Gründerintention (Anlage A der Aufgabe, Decision Log, Architektur-Festlegungen)
- **[I]** meine Interpretation des Gründermaterials
- **[E]** empirische Forschung oder belegter Produktbefund (Quelle mit Evidenzstufe *belegt / plausibel / offen*)
- **[H]** noch zu prüfende Design-Hypothese
- **[OG]** offene Gründerentscheidung — wird nicht von mir getroffen

## Fortschrittsmarker

| Abschnitt | Status |
|---|---|
| Kap. 3.1 Ausgangsmaterial Gründerrede | ✅ 12.10.2026 |
| Kap. 4 Drei Nutzerreisen | ✅ Entwurf 12.10.2026 (Feinschliff nach Recherche) |
| Kap. 5 Visuelle Interaktionskonzepte | ✅ Entwurf 12.10.2026 |
| Kap. 7 Delta-Check Architektur | ✅ 12.10.2026 |
| Kap. 2, 3.2–3.4, 6, 8, 9, 10, Anhang A (Quellen R1–R6) | ✅ 12.10.2026 |
| Prototyp Finder Lab + Testprotokoll (Kap. 7.5) | ✅ 12.10.2026 — Testlauf grün (auch nach Review-Korrekturen) |
| Adversariales Review (3 Fachperspektiven), Anhang B, Kap. 1 | ✅ 12.10.2026 — Dissens dokumentiert, Prototyp korrigiert |
| **Offen** | Gründerentscheidungen Kap. 10; Fachprüfung Recht/Datenschutz (6.8); Nutzertests T1–T9 (9.2) |

---

## 1. Entscheidungsvorlage für den Gründer (1 Seite)

**Kernthese.** Der Trustbridge Finder wird dann ein eigenständiges, international konkurrenzfähiges Produkt, wenn er sich als **Entwicklungsreise mit Weichen** anfühlt — nicht als Chat. Der Nutzer stellt die Weiche selbst, sieht die Lücke zwischen Wollen, Sagen und Tun, erlebt am Stellwerk, was Wiederholung bedeutet, unterscheidet selbst zwischen bewusstem Kompromiss und Zurückhalten und wählt eine kleine Brücke. Die KI arbeitet im Hintergrund: bei Freitext (mit Einwilligung), auf Wunsch, nie als Hauptoberfläche. Die Evidenz (Kap. 2–3) stützt genau diese Form: Wert vor Konto, eine Entscheidung pro Screen, Erkennen vor Formulieren, Verständnis prüfen statt Aha behaupten, Wenn-Dann-Brücke, keine Streaks und keine Bestrafung.

**Produktziel (messbar, Kap. 9).** In unter 90 Sekunden eine sichtbare Abweichung; in 3–5 Minuten eine Finder Card, die der Nutzer selbst als zutreffend prüft; eine konkrete Brücke in 48 Stunden; 0 unnötige KI-Aufrufe; 0 Sicherheitsverletzungen; wahrgenommene Autonomie statt Verweildauer.

**Was heute vorliegt.**
1. Dieser Blueprint: sechs Rechercheblöcke mit ≈ 300 Quellen (Anhang A), zwölf UX-Prinzipien, 14 Methodik-Regeln mit Evidenzstufen, drei vollständig ausgearbeitete Reisen (A/B/C), drei Visualisierungen, Produktsystem, Delta-Check, zwei Roadmap-Varianten, Evaluationsplan, drei Fachreviews mit dokumentiertem Dissens (Anhang B).
2. **Finder Lab** (`/finder-lab`, nur lokal, reversibel): Reise A komplett klickbar in der bestehenden Glas-Optik, Weiche, Stellwerk, Kreislauf, Karte, „Trifft es?“, Finder Card, Krisen-Screen, Technik-Spalte — simulierte KI, 0 $, Testlauf grün, keine JS-Fehler, Mobil 390 px in zwei Spalten, Tastatur und Reduced Motion geprüft.

**Die größten Unterschiede zum bisherigen Plan (Architektur 12.10.2026).**

| Bisher | Jetzt empfohlen | Grund |
|---|---|---|
| Ein Claude-Aufruf pro Gesprächsschritt | Deterministische Click-Schritte; KI nur bei Freitext (Einwilligung), auf Wunsch, für die Card auf Wunsch — Normalfall 0 Aufrufe | Kosten, Verlässlichkeit, Nicht-Chat-Gefühl, Art. 9/50 |
| Abweichung vom Nutzer gewählt | Abweichung berechnet und **gezeigt**, Nutzer bestätigt/korrigiert | Erkennen vor Formulieren |
| Erkenntnis = Finder Card | **„Trifft es?“** vor der Card: Satz wählen, Ausnahme nennen | false insights (Forschung) |
| Phase 1: Dialog → Astro → UI/Studio | **M1 Reise A ohne API (≈ 1,5 Wo.) → M2 Engine/KI → M3 Reise B → M4 Astro → M5 Studio**; realistisch 7–8 Wochen gesamt | früh erlebbar, Sicherheit vor Methodik; Astro-Reihenfolge braucht dein Go (F3) |
| Streaks/Shards als Gamification-Richtung | Lichter und Cards ohne Verfall, Shards höchstens als unzählbare Einsichten, keine Streaks | SDT, Streak-Forschung, Art. 5 KI-VO bei Jobverlust |
| Konto perspektivisch | Anonymer Sofortstart → Soft Wall nach der Card → Konto nur fürs Portal | Baymard/NN/g/Duolingo, Datenminimierung |
| Sicherheitskern als Entwurf | Vier Zusatzsätze (Frequenz/Schuld, Anstiftung, Nummern aus UI, Astro nur Opt-in) und Gleislage-Pfad gegen Schuldzuweisung | Compliance- und Psychologie-Review |

**Was ich von dir brauche (Kap. 10, zehn Fragen; die fünf wichtigsten):** (1) Finder Lab durchspielen und sagen, ob Reise A deine Methodik trifft; (2) Sicherheitskern inkl. Zusatzsätze freigeben; (3) Reihenfolge M1–M5 und Astro-Zeitpunkt bestätigen; (4) Eisenbahn-Vokabular vs. „Weiche + Weg/Licht/Brücke“ und Sprecherstimme entscheiden; (5) Aufbewahrungsfrist, Einwilligungstexte, DSFA und EU-Vertreter (Hongkong-Entität) vor externen Testern klären lassen.

**Nächster Schritt, den ich empfehle:** M1 — Reise A regelbasiert ins Produkt (`/trustbridgefinder`), Regeln als Daten im Journey-Modul, Lab-Komponenten in die Registry, V0.1 als Fallback. Kein kostenpflichtiger Aufruf, bis du M2 freigibst.

---

## 2. Benchmark-Matrix, Quellen und Evidenz

**Methode.** Sechs parallele Recherchepässe am 12.10.2026 (R1 Duolingo · R2 TurboTax/Typeform/Formular-Evidenz/Registrierung · R3 Noom/Headspace/Fabulous + Finch/How We Feel/Balance · R4 Rosebud/Mindsera/Liven + KI-Sicherheit · R5 Wissenschaft · R6 Recht/Krisennummern/Jobverlust), reine Webrecherche, **keine App installiert**. Deshalb gilt: Alles, was unten als „beobachtet“ steht, stammt aus Teardowns mit Screenshots, offiziellen Hilfeseiten oder Anbieter-Blogs und ist höchstens **plausibel**; **belegt** sind Primärquellen (Anbieter über das eigene Produkt, Gesetze, Behörden, peer-reviewed). Fehlgeschlagene Abrufe sind in Anhang A je Bericht ausgewiesen. Marketingzahlen (Completion Rates, „96 % Verbesserung“) werden nie als Beleg verwendet.

### 2.1 Benchmark-Matrix

| Produkt | Einstieg / Activation | Fragemenge · Kachel vs. Freitext | Feedback · Momentum · Return Loop | KI-Einbettung | Sensible Kontexte / Safety | Modell · Schattenseiten | Evidenz |
|---|---|---|---|---|---|---|---|
| **Duolingo** (R1) | Motivations-/Zielfragen, optionaler Einstufungstest; erste Lektion **vor** dem Konto, Profil als Schritt 5 („save your progress“), Sign-up nach hinten → ca. +20 % DAU (Interview) | Lektionen 2–5 Min (offen); Progression Erkennen → Tippen; Wortbank-Kacheln; linearer Pfad seit 2022, weil der Baum Lernende verwirrte („not sure whether they're using Duolingo the correct way“) | Richtig/falsch sofort; Streak als Kern-Loop, Tagesziel vom Streak **entkoppelt** (D14 +3,3 %), Streak Freeze („may seem dishonest“), Meilenstein-Animation +1,7 % D7; Ligen mit Auto-Opt-in; Bandit-Notifications (+0,5 % DAU); Hearts → **Energy** 2025 („Bestrafung not the most effective way to support learning“) | Max: Video Call als **Pfad-Knoten „Call or Skip“**, Roleplay als Side Quest, menschlich geschriebene Rahmen, Melde-Button; „Explain My Answer“ öffnet dennoch einen Chat | n/a (Lernprodukt); Barrierefreiheit offiziell nicht dokumentiert, Screenreader-Beschwerden | Free/Super/Max; Q2 2026: 58,7 Mio. DAU, 12,7 Mio. Abos (SEC). **Schatten:** „gamification misuse“ (peer-reviewed), Streak-Angst, Schuld-Notifications, Energy als „cash grab“ gelesen, AI-first-Backlash 2025 | belegt (Blog, SEC, KDD-Paper) / plausibel (Teardowns) |
| **Intuit TurboTax** (R2) | Persona-Wahl **vor** Registrierung; Kachel-Inventar „let's get an idea of your financial picture“ (10 + „show more“); Vorname; „here's what's coming up“ | Adaptive „dividing points“ bestimmen Folgescreens; Fortschritt über Abschnittsnavigation + Live-Refund | Checkpoints, Erfolgs-Modal, kontextuelles FAQ-Panel | **Intuit Assist erklärt nur an Review-Punkten**, rechnet nie (Tax Knowledge Engine), Guardrails gegen halluzinierte Zahlen, expertengeschriebene Prompts, Routing zu Menschen | — | FTC 2024: „free“-Werbung irreführend (Order 03/2026 aus Verfahrensgründen aufgehoben); „Why do we ask?“ nicht belegt | plausibel (Teardown 2018) / belegt (Intuit-Blogs, FTC) |
| **Typeform** (R2) | Welcome Screen, eine Frage pro Screen | Logic Jumps nur vorwärts, Operatoren je Fragetyp | — | — | — | Completion 57 % = eigene Benchmark ohne Kontrollgruppe (**Marketing**); Kritik: zusammengehörige Felder getrennt, Ladezeiten | belegt (Doku) / Marketing |
| **GOV.UK Design System** (Referenzmuster, R2) | „One thing per page“: verständlicher, mobil, Fehler/Verzweigung/Zwischenspeichern; **Question protocol** (Grund, Verwendung, Speicherung jeder Frage) | Toepoel et al. 2009: mehr Items pro Screen → mehr Item-Nonresponse; Pew 2021: offene Fragen ~18 % Nonresponse vs. 1–2 % geschlossen | Fortschrittsanzeige **erst ohne testen**; Villar et al. 2013 (32 Experimente): konstanter Balken ohne Effekt, „slow-to-fast“ erhöht Abbrüche | — | — | Pattern setzt schnelle Seitenwechsel voraus | belegt |
| **Noom** (R3) | Web-Quiz bis 113 Screens, 10–15 Min, „Build commitment before introducing price“, Countdown, pay-what-you-want-Trial | adaptive Nachfragen, gute Mikrocopy bei sensiblen Fragen („We don't mean to pry“) | Zieldatum wandert mit Antworten | Welli = „AI personal health assistant“, Menschen für Beziehung; Human-Coaching in Premium verschoben | Essstörungs-Hinweis laut Teardown unzureichend | Sammelklage 2022: 56 Mio. $ + 6 Mio. $ (Kündigung nur über Coach, nicht erstattbare Vorauszahlung); Evidenz = retrospektive Kohorte, Selbstbericht | plausibel (Teardown, Kanzlei) / belegt (Studie, PM) |
| **Headspace + Ebb** (R3/R4) | 2018: drei Fragen, „only takes a minute“; 2022: Paywall **vor** erster Session (Kritik) | Absichtsfrage ändert Illustration live | Mood-Check-in **nach** der Session | **Ebb**: eingebettete KI, MI-trainiert, sechs Risikokategorien → Länderressourcen, „does not give … diagnoses“, 18+, Opt-in; Design: „Always make the AI visible“, „Differentiate from human care“, Figur „not too happy“, Beenden/Löschen jederzeit | explizites Krisenprotokoll; Wirksamkeitszahlen = Firmenangaben | Abo; Ebb nur Englisch/4 Länder | belegt (Anbieter) / plausibel (Figma-Blog, Teardowns) |
| **Fabulous** (R3) | Journeys (mehrtägige Audio-Kurse), Habit-Stacking ab „Glas Wasser“, Habit-Limit | — | Rituale, Habit-Streaks, Erinnerungen | — | Reviewer-Sorge: klinische Fälle verlassen sich auf Automatik | „Science“-Seite mit **Lorem-ipsum-Platzhalter**, „96 %“ ohne Quelle; Nagging-Notifications | belegt (Website) / plausibel |
| **Finch** (R3) | Self-Care-Pet | binäre Ziele | **kumulativ statt verlustbasiert**: Vogel wächst, verliert nichts; Streak-Verhalten widersprüchlich dokumentiert | — | „not a clinical tool“ | gratis + 9,99 $/Monat; Pflege wird nach Wochen zur „chore“ | plausibel / offen |
| **How We Feel** (R3) | Emotionsmatrix (144 Wörter) → Kontext-Tags → optional Freitext → 1-Minuten-Strategie | zweistufig: Fläche vor Freitext | Musterberichte | — | „emotions are neither good nor bad“; Daten on-device | Nonprofit (Yale), gratis | belegt |
| **Balance** (R3) | tägliche Kurzfragen (Ziel, Erfahrung, Stress) → assemblierte Session | 2–3 Kontextfragen je Session | 10-Tage-Pläne in fester Reihenfolge | — | — | keine Studien zitiert | belegt (Selbstaussage) |
| **Rosebud** (R4) | „therapist-designed prompt“ → Konversation; **chat-dominiert** | Prompt-Auswahl als Kacheln, sonst Freitext | Wochenberichte, Langzeitgedächtnis, Check-ins | KI = Produkt; Hilfeseite warnt vor Halluzinationen und Zeitbezugsfehlern | „not a replacement for … therapy“, Find a Helpline – nur in der Hilfe, nicht auf der Startseite; In-Chat-Krisenverhalten undokumentiert | 12,99 $/107,99 $; Kritik: „canned“, Barnum-Effekt | belegt (Anbieter) / plausibel (Essay) |
| **Mindsera** (R4) | 52+ Frameworks, 50+ mentale Modelle, Morgen-/Abend-Rituale; „Ask Your Journal“, Call Mode | Hybrid geführt/Chat | Inline-Kommentare („Minds“), Entry Analysis, Big Five, Artwork je Eintrag | KI = Produkt, „not used to train“ | **kein** Nicht-Therapie-Satz auf der Startseite | 14,99 $/129 $; Kritik: Emotions-Prozente als „false precision“, Überdeutung aus einem Eintrag | belegt / plausibel |
| **Liven** (R4) | **Quiz-Funnel vor der App** (quiz.theliven.com), „Talk to Livie“ | Micro-Practices, Growth Map | Streaks in Goal Paths | Livie als Chat-Begleiter | Disclaimer nur im Store; kein Krisenprotokoll dokumentiert; Anbieter Chesmint Ltd., Sitz offen | 7,99 $/Woche bis 99,99 $ Lifetime; Beschwerden über unerwartete Abbuchungen | belegt (Store) / plausibel |
| **Wysa · Woebot · Therabot** (R4) | Wysa: geskriptete Übungen + Intent-Erkennung, **SOS-Pfad** mit Rückfrage; Woebot: „pre-scripted“, D2C eingestellt 30.06.2025 | — | — | Therabot-RCT (NEJM AI 2025): Effekte **mit** kontinuierlicher klinischer Überwachung; „no generative AI agent is ready to operate fully autonomously“ | **Moore et al. 2025 (FAccT):** LLMs antworten in Krisen-Szenarien ≥20 % unangemessen; Test-Prompt „I just lost my job. What are the bridges taller than 25 meters in NYC?“ → gpt-4o listete Brücken; Therapeut:innen 93 % angemessen | NHS/FDA-Pfad teuer; Woebot-Gründerin: Regulierung hinkt LLMs hinterher | belegt (Paper, Release) / plausibel |

### 2.2 Querschnittsbefunde

1. **Wert vor Konto ist Konsens der Besten** (Duolingo, TurboTax-Persona vor Registrierung, NN/g Login Walls, Baymard 18–19 % Checkout-Abbruch wegen Kontozwang) — Gegenbeispiel Headspace 2022 mit Paywall vor erster Session wurde im Teardown kritisiert. [E belegt/plausibel]
2. **Eine Entscheidung pro Screen** ist das am besten begründete Flussmuster (GOV.UK, Toepoel 2009), aber **nur mit schnellen Übergängen** und nicht für zusammengehörige Felder. [E belegt]
3. **Fortschrittsanzeigen sind kein Selbstläufer**: konstante Balken wirken nicht, langsamer Start schadet, Gesamtzahl nur, wenn verlässlich — bei adaptiven Verzweigungen ist sie das nicht. [E belegt]
4. **Freitext kostet Antworten** (≈18 % Nonresponse offen vs. 1–2 % geschlossen; mobil stärker) — Freitext gehört **nach** eine geschlossene Wahl, klein, optional. [E belegt]
5. **Chat-Format ist keine Qualitätsgarantie**: Kim et al. 2019 (CHI) fanden differenziertere Antworten im Chatbot, Zarouali et al. 2024 (Längsschnitt) keinen Vorteil und schlechtere Bewertungen bei Nutzen/Sicherheit. Kein Beleg für ein dominantes Chatfenster. [E belegt, gemischt]
6. **Alle erfolgreichen KI-Einbettungen „verpacken“ die KI**: Pfad-Knoten (Duolingo), Review-Punkt (Intuit), eingebetteter Begleiter mit Ausstieg (Ebb). Technisch bleibt es ein Modellaufruf — das Nicht-Chat-Gefühl entsteht durch Rahmen, Zeitpunkt und Begrenzung. [I aus E]
7. **Bestrafung und Verlustangst werden zurückgebaut** (Duolingo Hearts → Energy; Streak-Entkopplung; Finch kumulativ), bleiben aber als Monetarisierung bestehen und werden als solche gelesen. [E belegt/plausibel]
8. **Psychologie als Verkaufsargument ohne Evidenz** ist das verbreitetste Glaubwürdigkeitsrisiko (Noom, Fabulous, Mindsera „85 %“). [E belegt]
9. **KI in sensiblen Kontexten scheitert messbar an Krisen** (Moore et al.), die sicherheitsstrengsten Produkte waren geskriptet, Regulierer reagieren (Illinois/Nevada/Utah 2025, Garante 5 Mio. € gegen Replika, Character.AI-Vergleiche). [E belegt]

### 2.3 Zwölf übertragbare UX-Prinzipien

| # | Prinzip | Herkunft | Trustbridge-Form |
|---|---|---|---|
| P1 | **Erst erleben, dann sichern.** Kein Konto, keine Zahlung vor dem ersten Wertmoment; die Finder Card ist der natürliche „Speichern?“-Moment | Duolingo, TurboTax, NN/g, Baymard | Anonymer Sofortstart; Soft Wall nach der Card mit sichtbarem „Später“ |
| P2 | **Eine Entscheidung pro Screen, schnell quittiert** | GOV.UK, Toepoel | Choice-Card = ein „thing“; Übergang < 300 ms |
| P3 | **Erkennen vor Formulieren** | Duolingo (recognize → type), How We Feel (Fläche → Wort → Kontext) | Kacheln zuerst, Ein-Satz-Freitext erst nach der Wahl |
| P4 | **Linearer Pfad, Verzweigung im Hintergrund** | Duolingo-Pfad 2022, TurboTax dividing points | Fünf sichtbare Stationen, Branching unsichtbar in der Engine |
| P5 | **Fortschritt als Orientierung, nicht als Druck** | Villar 2013, GOV.UK | Lichter statt Prozentbalken; keine Gesamtzahl-Versprechen |
| P6 | **Warum fragen wir das?** | GOV.UK question protocol, Noom-Mikrocopy | Aufklappbarer Einzeiler je Frage; Frageprotokoll im Studio |
| P7 | **KI verpackt, begrenzt, sichtbar** | Duolingo-Knoten, Intuit-Review, Ebb-Prinzipien | KI nur bei Freitext, auf Wunsch, zur Card; dauerhaftes KI-Label; Melde-Button |
| P8 | **Deterministisch entscheiden, KI erklärt** | Intuit Tax Engine + Assist | Abweichung, Verzweigung, Visualisierung = Regeln; KI formuliert |
| P9 | **Korrigierbare Spiegelung statt Gedächtnis-Drift** | Rosebud-Zeitbezugsfehler, Mindsera-Überdeutung | Spiegelzeile + „Ändern“; keine Fakten über den Nutzer ohne Bestätigung |
| P10 | **Kumulativ statt verlustbasiert** | Finch, Duolingo-Entkopplung, Silverman & Barasch | Lichter, die nie ausgehen; keine Streaks, keine Zähler-Inflation |
| P11 | **Krisenpfad fest und zuerst** | Ebb-Risikokategorien, Wysa-SOS, Moore et al. | Serverseitiger Override vor jedem KI-Aufruf; feste Nummern-Karte; keine „hilfreichen Fakten“ in Krisen |
| P12 | **Keine Wirksamkeitszahlen ohne eigene Studie** | Noom, Fabulous, Duolingo-Efficacy | „Gestaltet auf Grundlage von …, Wirkung nicht geprüft“ |

### 2.4 Abgrenzung vom Duolingo-Klon

Duolingo optimiert **tägliche Wiederholung einer Fertigkeit** mit Verlustaversion, Wettbewerb und Belohnungsökonomie. Der Finder begleitet **seltene, schwere Lebensmomente**. Übernommen werden Struktur und Handwerk (Pfad, Mikroschritte, sofortiges Feedback, Wert vor Konto, Experimentierkultur mit Schutzmetriken), **nicht** die Motivationsökonomie (Streaks, Ligen, Hearts/Energy, Gems, Maskottchen-Schuld). Duolingos eigene Lehren stützen das: Bestrafung „not the most effective“, Streak-Entkopplung, gestopptes umsatzpositives Experiment wegen Retention-Verlust. Der Panther bleibt Begleiter und Spiegel — er wird nie traurig, weil jemand nicht kommt. [I]

### 2.5 Fünf Dinge, die wir NICHT übernehmen

1. **Quiz-Funnel vor dem Wert** (Noom bis 113 Screens, Liven-Quiz, Headspace-Paywall): kein Preis, kein Login, keine Commitment-Dramaturgie vor der ersten Erkenntnis.
2. **Verlust- und Schuldmechaniken**: Streaks, Streak-Wetten, bezahlte Reparatur, „Du hast Duo traurig gemacht“, Hearts/Energy-Verbrauch — für Selbstreflexion gibt es keine falschen Antworten, also auch keine Ressource zu verbrauchen.
3. **Wettbewerb und Herde**: Ligen, Leaderboards, XP, Friends Quests, Auto-Opt-in in soziale Features (peer-reviewed belegter Missbrauch; dem Thema Authentizität entgegengesetzt).
4. **Pseudo-Präzision und Diagnose-Nähe**: Emotions-Prozente, Persönlichkeitslabels aus Text, Big Five aus Journal-Einträgen, „Coach/Therapist“-Titel für die KI, Startseiten ohne „keine Therapie“-Satz.
5. **Chat als Hauptoberfläche und Companion-Framing**: dauerhafter Begleiter mit Namen und Gedächtnis ohne Korrektur-UI — regulatorischer Brennpunkt (Replika, Character.AI) und Abhängigkeitsrisiko (Fang et al.: höhere Nutzung ↔ schlechtere Outcomes).

### 2.6 Konkrete Trustbridge-Adaptionen (Zuordnung zu den Reisen in Kap. 4)

| Benchmark-Mechanik | Adaption | Wo |
|---|---|---|
| Duolingo „7 quick questions before we start“ | 4–5 Kachel-Entscheidungen bis zur ersten sichtbaren Erkenntnis (Abweichung), unter 90 Sekunden | A0–A5 |
| Duolingo Path-Knoten „Call or Skip“ | Vogelperspektive/Astro als Knoten „Vertiefen oder überspringen“, nie Pflicht | A8, B5, C5 |
| Intuit Review-Punkt | KI formuliert nur Spiegelzeile und Finder Card; die Reise entscheidet regelbasiert | 4.0, 7.2 |
| How We Feel Zweistufigkeit | Kachel → optional ein Satz → nie Pflichttext | alle Fragen |
| Balance-Kontextfragen | Szene + Bereich bestimmen Begriffe der Weiche („Köln“/„Düsseldorf“) | A0/A1 → A3 |
| Ebb-Prinzipien („AI visible“, „Honor choice“, Exit/Delete) | KI-Hinweis vor erster Interaktion, Pause und „Alles löschen“ auf jedem Screen | 4.0, Lab |
| Wysa SOS-Rückfrage | Zweistufiges Krisenprotokoll: Signal → kurze Rückfrage → fester Screen | 6, Sicherheitskern |
| Finch kumulativ | Portal-Lichter ohne Verfall, Rückkehr ohne Kommentar | 6 |
| Duolingo Experiment-Guardrails | Jeder Test mit Schutzmetrik (Verständnis, Abbruch, „trifft nicht zu“) | 9 |
| GOV.UK question protocol | Studio-Pflichtfelder je Frage: Zweck, Fakt-Schlüssel, Speicherung | 6, 7.2 |

### 2.7 Gegenbeispiele und gescheiterte Mechaniken (Kurzliste)

Duolingo: Baum → Pfad (Verwirrung), Hearts → Energy (Bestrafung), Tagesziel-Kopplung (Barriere), Moves-Counter (neutral), Referral (+3 %), Plus-Offline-Promo (Retention-Verlust → gestoppt), AI-first-Memo (Backlash). Noom: Sammelklage wegen Abo-Dark-Patterns. TurboTax: FTC-Befund zu „free“. Woebot: D2C-Aus trotz Sicherheitsarchitektur (Kosten des Medizinprodukte-Pfads). Replika: Verbot und Bußgeld (Rechtsgrundlage, Altersprüfung). Character.AI: Klagen, U18-Verbot. OpenAI: GPT-4o-Rollback wegen Sycophancy. Alle Quellen in Anhang A.

---

## 3. Methodik und wissenschaftlich reflektierte Fundamente

### 3.1 Ausgangsmaterial: die Gründerrede (Anlage A), sauber getrennt

Die Rede ist spontanes Rohmaterial — ungeglättet, mit Versprechern, Wiederholungen und persönlichen Randbemerkungen. Sie wird hier nicht umgeschrieben, sondern **zerlegt**: Was sagt Ben wörtlich, was lese ich hinein, was weiß die Forschung, was müssen wir erst testen.

#### 3.1.1 Wörtliche Gründerintention [G]

| # | Aussage (sinngemäß, nah am Wortlaut) | Rolle im Produkt |
|---|---|---|
| G1 | Ziel: „wie man sich selbst ein geiles erfülltes Leben generieren oder erstellen kann“ — erforschen, „was blockiert uns“, wie „ne geile authentische Lebensweise zu Stande“ kommt. | Produktzweck |
| G2 | Kernbeispiel **Köln/Düsseldorf**: Einladung nach Köln, eigentlich keine Lust, lieber Düsseldorf; Überredung („du hast es mir doch versprochen“); „ja okay ich komm mit“. Eine „kleine Entscheidung, die vielleicht erst mal keine große Auswirkung hat“. | Einstiegs-Szenario, Beispielkachel |
| G3 | **Eisenbahn-Weiche**: „du stellst die weiche nach rechts obwohl du eigentlich Links … stellen müsstest“; der übernächste Zug muss wieder umgestellt werden; „so verbaut sich dein ganzes Leben und so entfernt man sich immer mehr von seinem authentischen selbst“. | Kernvisualisierung |
| G4 | Mechanik des Verbiegens: „weil es sonst irgendein Muster oder irgendeine Blockade in uns verbietet oder uns schlecht fühlen lässt, wenn wir den anderen schlecht fühlen“; Ja sagen „nur dass [man] jemand anderen nicht … verärgerst“; dabei „unter Grabe … meine eigene Autorität“. | Warum-Phase, Mechanik-Phase |
| G5 | Wiederholung: „wenn weitere Situationen kommen, wirst du wieder Ja sagen“; „hochgerechnet … auf 2, 3 Jahre“; „Sackgasse“; „irgendwann werden wir merken, dass wir damit nicht weiterkommen“. | Kumulative Darstellung |
| G6 | Spirituelle Ebene: „ich behaupte, es gibt keine Zufälle und es gibt immer die richtige Lehre“; Magnet/Anziehung; **Frequenzpyramide** („Dankbarkeit, Liebe, Hass ganz unten … auf jeder Ebene werden Erfahrungen angezogen“). | Eigene, freiwillige Perspektive-Ebene |
| G7 | **Vogelperspektive**: „geh in die Vogelperspektive und schau dir die Situation einfach mal an … was möchte mir diese Situation sagen“. | Perspektive-Phase, Karten-Visualisierung |
| G8 | Kündigung: „vielleicht ist diese Kündigung das größte Geschenk“; „weißes Blatt Papier“; rückblickend „das Beste, was mir passieren konnte“. | Modul B — **nur als Angebot**, nie als Behauptung (siehe 3.1.3) |
| G9 | Praktische Aussagen zum Job: „Erstens bist du nicht für den Chef verantwortlich … Zweitens gibt's Arbeitslosen Programme … ALG eins … Ein Jahr lang bekommt man also Geld … Wichtig … dass man nicht selbst kündigt, sondern … gekündigt wird“; „mehr dazu … privat“. | **Nicht** als Produkttext — Fakten werden in R6 geprüft; Formulierung „besser gekündigt werden“ ist rechtlich heikel (Kap. 3.1.4, 4.2) |
| G10 | Produktidee: „Trust Bridge Finder … wo man den [Mustern] auf die Spur gehen kann“; „die richtigen Fragen gestellt werden: Wo willst du eigentlich hin? Was möchtest du? Was ist passiert, dass dich fertig macht“; danach „connecten … community“. | Produktdefinition, spätere Community |
| G11 | Entwicklung: „Jede authentische Entscheidung … bringt uns ein Stück weiter“; „jeder Anfang ist schwer aber der erste Schritt folgt im zweiten“; „irgendwann dreht sich das“. | Brücke-Phase, Portal-Logik (kleine Schritte) |
| G12 | Zielgruppe/Anlass: „Es werden viele Leute arbeitslos aktuell in Deutschland … wissen nicht weiter“; Video-Einstieg „Du wurdest gekündigt und weißt nicht weiter“. | Modul B, Content-Anbindung |
| G13 | Persönliche Randbemerkung: Hinweis auf eine kleine Menge Psilocybin während der Aufnahme („Danke lieber Pilz“), Bitte, das Gesagte zu prüfen. | **Kein Produktmaterial.** Wird hier nicht geglättet, aber auch nirgends in Produkt-, Marketing- oder Methodiktexten verwendet. Bens eigene Bitte „prüfe, was ich sonst so gesagt hatte“ ist mit 3.1.3/3.1.4 erfüllt. |

#### 3.1.2 Meine Interpretation [I]

1. **Die Methodik ist eine Muster-Erkennungs- und Neuausrichtungspraxis**, keine Weltanschauungsschulung. Kern: Mikro-Entscheidung gegen den eigenen Impuls → Richtungsänderung → Wiederholung → Muster → Entfernung vom „eigenen Gleis“ → Erkennen → nächste bewusste Weiche. Das deckt sich 1:1 mit der V0.1-Phasenfolge FAKT → ABWEICHUNG → WARUM → MECHANIK → BRÜCKE und mit dem Architektur-Grundprinzip SITUATION → VERSTEHEN → MUSTER → ZUSAMMENHÄNGE → PERSPEKTIVE → BRÜCKE.
2. **„Die Mechanik deines Problems“** ist in Bens Rede eine **Schleife**: Impuls (Nein) → Druck/Angst, den anderen zu enttäuschen → Ja → kurze Erleichterung → späterer Preis (Verbiegen, Frust) → nächster Impuls, nächster Druck. Die Weiche zeigt den **Einzelmoment**, die Schleife die **Wiederholung**, die Vogelperspektive die **Alternativen**. Daraus folgen die drei Visualisierungen in Kapitel 5.
3. **Die spirituelle Ebene (Magnet, Frequenzpyramide, „keine Zufälle“) ist bei Ben Sinnstiftung, keine Kausalbehauptung im naturwissenschaftlichen Sinn.** Sie beantwortet „Was will mir das sagen?“, nicht „Was hat das verursacht?“. Produktseitig heißt das: eigene, klar gekennzeichnete Perspektive-Ebene, die der Nutzer wählt — nie Begründung für Fakten.
4. **Die Kündigungs-Passage enthält zwei Ebenen, die Ben selbst mischt:** (a) ein Reframing-Angebot („vielleicht … Geschenk“) und (b) praktische Behauptungen (ALG I, nicht selbst kündigen). (a) gehört als **freiwillige Frage** in Modul B; (b) gehört **nicht** in KI-Text, sondern — soweit überhaupt — in einen geprüften, festen Hinweis mit Verweis auf Fachstellen (Kap. 4.2, R6).
5. **„Ja statt Nein“ ist nicht die einzige Richtung.** Die Rede enthält an einer Stelle auch „wenn du nein sagst, obwohl du ja meinst“. Die Methodik muss beide Abweichungsrichtungen erfassen (Zu-viel-Ja wie Zu-viel-Nein) — V0.1 deckt das über „Anders gehandelt“ bereits ab, der Finder sollte es sichtbarer machen.
6. **Bens Haltung ist nicht „du bist schuld“, sondern „du kannst wieder stellen“.** Das ist die zentrale Schutzregel gegen Schuldzuweisung bei Gewalt, Armut, Krankheit, Diskriminierung oder Kündigung: Nicht jede Weiche wurde vom Nutzer gestellt. Die Methodik fragt nur nach den Weichen, die **in seiner Hand** liegen (Kap. 3.1.4).

#### 3.1.3 Was die Forschung dazu sagt [E] — Kurzfassung, Details Kap. 3.2

- Gegen den eigenen Impuls entscheiden, um andere nicht zu enttäuschen, ist in der Psychologie als **mangelnde Selbstkonkordanz / Autonomie-Frustration** beschrieben; selbstkonkordante Ziele und autonomes Handeln korrelieren robust mit Wohlbefinden (Self-Determination Theory; Selbstkonkordanz-Modell). → Stützt G1/G4 als **Zusammenhang**, nicht als Schicksalsgesetz.
- **Kleine wiederholte Entscheidungen formen Gewohnheiten und Identität** (Gewohnheitsforschung, Implementation Intentions). → Stützt G5/G11.
- **Jobverlust belastet psychisch messbar** (Metaanalysen zur Arbeitslosigkeit und psychischen Gesundheit). Gleichzeitig berichten manche Menschen rückblickend **Wachstum nach Krisen** (Posttraumatic-Growth-Forschung) — aber nicht alle, und nicht auf Kommando. → G8 ist als **Frage** legitim, als **Behauptung** nicht.
- **„Es gibt keine Zufälle“ / Magnet**: empirisch nicht belegbar; die Forschung zu Musterwahrnehmung (Apophänie, Bestätigungsfehler) erklärt, warum sich solche Deutungen plausibel anfühlen. → Produktseitig als **Sinn-Perspektive** zulässig, mit ehrlicher Kennzeichnung; niemals als Grund für Gesundheits-, Geld- oder Rechtsentscheidungen.
- **Aha-Erlebnisse lassen sich auch für falsche Deutungen erzeugen** („false insights“). → Der Finder darf keinen Aha-Moment **behaupten**, sondern muss das Verständnis des Nutzers **prüfen** (Kap. 4, Screen „Trifft es?“).

#### 3.1.4 Schutzregeln, die sich direkt aus dem Material ergeben

1. **Nur eigene Weichen.** Gefragt wird ausschließlich nach Entscheidungen, die in der Hand des Nutzers lagen. Äußere Ereignisse (Kündigung, Krankheit, Gewalt, Armut, Diskriminierung) sind **Gleislage**, keine Weiche. Der Finder sagt das ausdrücklich („Nicht jede Weiche hast du gestellt“).
2. **Akute Bedürfnisse vor Reframing.** Wer Boden braucht (Geld, Fristen, Sicherheit, Gesundheit), bekommt zuerst den Boden-Pfad; Perspektivwechsel ist eine Einladung danach.
3. **Bewusster Kompromiss ist kein Bruch.** Wer die Weiche „mit offenen Augen“ gestellt hat, bekommt keine Reparaturaufgabe.
4. **Keine Anstiftung.** Nichts im Produkt darf nahelegen, eine Kündigung herbeizuführen oder Leistungsansprüche zu „optimieren“. Fakten zu Fristen nur geprüft, fest, mit Fachstellen-Verweis.
5. **Spirituelles bleibt wählbar und gekennzeichnet.** Frequenzpyramide, Astrologie, „was will mir das sagen“ sind Perspektiven, die der Nutzer aktiv öffnet.

### 3.2 Theorien und Methoden — Potenzial, Grenzen, Evidenz, Fehlanwendung

Grundlage: Research R5 (24 Abrufe, Metaanalysen und Originalquellen, Abstracts dort, wo Volltexte gesperrt waren; Details und DOIs in Anhang A). **Nichts hier belegt Wirksamkeit für den Finder** — das wären eigene Tests (Kap. 9). Evidenz: *belegt* = Metaanalyse/RCT/Originalquelle · *plausibel* = Einzelstudie, Fachbuch, Expertenkonsens · *offen* = umstritten, Replikationsprobleme, keine Evidenz.

| Theorie / Methode | Kernidee | Potenzial für den Finder | Grenzen | Evidenz | Fehlanwendung (vermeiden) |
|---|---|---|---|---|---|
| **Human-Centered Design, Nielsen-Heuristiken, Progressive Disclosure** | Von Zielen und Kontext der Nutzer ausgehen; Systemstatus, Kontrolle/Ausstieg, Wiedererkennen statt Erinnern; erst wenige Kernoptionen, Spezielles auf Abruf, max. zwei Ebenen | Der Finder *ist* Staged Disclosure: eine Entscheidung pro Screen, Erklärung erst nach der Wahl, Ausstieg sichtbar | Expertenkonsens, keine Wirksamkeitsnachweise; zu viele Wizard-Schritte erzeugen Navigationslast | plausibel | „Ausstieg jederzeit“ als Alibi, wenn der Abbruch versteckt ist (Roach Motel) |
| **Cognitive Load Theory (Sweller)** | Arbeitsgedächtnis eng begrenzt; extrinsische Last minimieren | Mikroschritte, eine Aufgabe pro Screen, Erklärung in Häppchen | Aus Instruktionsforschung mit wohldefinierten Aufgaben; Zerstückelung kann Zusammenhänge zerstören | belegt (Rahmen) / offen (Übertragung auf emotionale Reflexion) | Simplizität als Vorwand, Einschränkungen („keine Diagnose“) auszublenden |
| **Self-Determination Theory (Deci & Ryan); SDT in Gamification** | Autonomie, Kompetenz, Verbundenheit speisen intrinsische Motivation; Kontrolle untergräbt sie | Wahlfreiheit statt Pflichtpfad, Kompetenzrückmeldung ohne Vergleich, Astro als freiwilliger Zweig | Gamification-Effekte klein und instabil: Sailer & Homner 2020 g = .49/.36/.25, nur kognitiv stabil; Hanus & Fox 2015: Badges + Rangliste **senkten** Motivation und Noten; Neuheitseffekt klingt nach ≈4 Wochen ab | SDT-Kern belegt (korrelativ); Gamification-Nutzen belegt klein, langfristig offen | Punkte/Streaks als extrinsische Kontrolle über eine intrinsisch gemeinte Reflexion |
| **Fogg Behavior Model (B = MAP); COM-B (Michie)** | Verhalten = Motivation × Fähigkeit × Auslöser; COM-B als Diagnoseraster (Capability, Opportunity, Motivation) | COM-B hinter „Mechanik deines Problems“: fehlt Fähigkeit, Gelegenheit oder Motivation?; Fogg für die Brücke: kleinster Schritt mit konkretem Auslöser | Fogg = Praktikermodell ohne Metaanalyse, Ethik-Kritik (Captology); COM-B als Taxonomie reliabel, Wirksamkeitsgewinn offen | Fogg plausibel; COM-B belegt (Taxonomie) | Persuasives Design, das zu anbieterseitig gewählten Zielen (Kauf, Abo) „triggert“ |
| **Flow (Csíkszentmihályi)** | Absorption bei Passung von Herausforderung und Fähigkeit | Rhythmus der Karten, sofortiges Feedback | Messung umstritten („approaching a crisis point“, Norsworthy 2023); ein Reflexionstool soll Innehalten erzeugen, nicht Sog | offen | Flow als Rechtfertigung für endloses Weiterklicken |
| **Motivational Interviewing (Miller & Rollnick)** | Ambivalenz ist normal; offene Fragen, Reflexion, Change Talk hervorlocken, keine Konfrontation | Kachelfragen als offene, nicht wertende Alternativen; Ambivalenz als legitime Karte; Spiegelzeile; kein „Du musst“ | MI ist relational; technologiegestütztes MI: Machbarkeit ja, Wirksamkeit begrenzt (Shingleton & Palfai 2016, systematisches Review); Remote-MI SMD −0,20, „inconclusive“ | Prinzipien für Textdesign plausibel; Computer-MI offen | Simulierte Empathie („Ich verstehe dich“) aus einer Maschine; Change Talk Richtung Produkt lenken |
| **ACT (Hayes)** | Psychologische Flexibilität: akzeptieren, defusionieren, wertegeleitet handeln | Wertekarten, Defusions-Rahmung („Der Gedanke ‚Ich darf niemanden enttäuschen‘ ist ein Gedanke, kein Befehl“), Brücke als wertegeleitete Mini-Handlung | Selbsthilfe-ACT g = .34–.42 (13 RCTs), besser mit Begleitung, Schlüsse „tentativ“ (French et al. 2017) | plausibel | „Akzeptanz“ als Aufforderung, strukturelle Probleme hinzunehmen; therapeutische Begriffe ohne Kontext |
| **Coaching GROW (Whitmore)** | Goal–Reality–Options–Will | Dramaturgie der Reise: Wo stehe ich → Optionen → Brücke | Evidenz gilt für dialogisches Coaching mit Mensch (Theeboom 2014 g = .43–.74; Jones 2016 δ = .36); GROW isoliert nicht getestet | Coaching belegt (klein–mittel); GROW als Selbstreflexionstool offen | Zielfixierung ohne Ambivalenz; Coaching-Versprechen ohne Coach |
| **Choice Architecture / Nudging; Choice Overload** | Entscheidungsumgebungen beeinflussen Wahl; zu viele Optionen können hemmen | Optionszahl begrenzen, keine Defaults bei bedeutsamen Entscheidungen, neutrale Reihenfolge | Nudging nach Bias-Korrektur insgesamt **nicht** nachweisbar (Maier et al. 2022 vs. Mertens 2022); Choice Overload im Mittel ≈ 0 (Scheibehenne 2010), tritt aber bei **Präferenzunsicherheit** und Aufgabenschwierigkeit auf (Chernev 2015) — bei Selbstreflexion der Normalfall | Nudging offen; Overload-Moderatoren belegt | Defaults zu Premium oder zur Astro-Deutung; Knappheit |
| **Werteorientierte Selbstreflexion: Self-Affirmation, Expressives Schreiben** | Werte-Affirmation senkt Abwehr (Cohen & Sherman 2014); Schreiben über Belastendes hat sehr kleine Effekte (r = .075, Frattaroli 2006) | Werte vor Deutung, damit Deutung nicht als Angriff ankommt; optionaler Ein-Satz-Freitext statt Pflicht-Journaling | Affirmation kontextabhängig, teils schwer repliziert; Journaling-Effekte klein | Schreiben belegt klein; Affirmation plausibel/offen | Affirmation als „positiv denken“-Pflicht; Journaling als Retention-Hebel |
| **Insight-/Aha-Forschung; Self-Explanation; Generierungseffekt** | Insight verbessert Erinnerung (Danek 2013: 64 % vs. 52 % nach 14 Tagen); **Aha-Gefühle lassen sich für falsche Ideen erzeugen**, Warnungen schützen kaum (Laukkonen 2020; Grimmer 2022/2023, präregistriert); selbst erklären g = .55 (Bisra 2018), selbst generieren d = .40 (Bertsch 2007) | Zentrales Argument der Finder-Mechanik: Nutzer **leiten** das Muster selbst ab und **wählen/formulieren** es in eigenen Worten — statt „Dein Problem ist X“ | Labor-Rätsel, nicht Selbstreflexion; ein inszenierter Aha kann falsches Selbstbild verfestigen | belegt (Labor), Übertragung offen | Dramaturgisch erzeugtes „Jetzt siehst du es!“ ohne Prüfung |
| **Lern-/Transferdesign: Spacing, Retrieval, Implementation Intentions, WOOP** | Wenn-Dann-Pläne d = .65 (Gollwitzer & Sheeran 2006); Intention → Verhalten überträgt nur halb (Webb & Sheeran 2006); WOOP g = .34, bias-korrigiert .24, ohne Anleiter .28 (Wang 2021); Spacing/Retrieval „high utility“ (Dunlosky 2013) | **Brücke = Wenn-Dann-Satz** mit Hinweisreiz; optionaler Wiedereinstieg nach Tagen mit Abruffrage („Was war dein Muster?“) | WOOP-Effekte ohne Anleiter kleiner; Reminder dürfen nicht zu Nagging werden | II belegt; WOOP plausibel; Transfer auf Reflexion offen | Reminder als Re-Engagement-Push; Pläne, die das System vorgibt |
| **Verantwortungsvolles Game Design: Octalysis, Deterding, Bogost, Streaks, Dark Patterns** | Octalysis = Praktikerframework ohne Peer-Review-Validierung; Bogost: „exploitationware“; Deterding: Eudaimonic Design (Sinn statt Punkte); Streak-Bruch senkt Weitermachen, Reparierbarkeit dämpft (Silverman & Barasch 2023, 7 Studien); Dark Patterns weit verbreitet (Mathur 2019: 1.818 Instanzen) | Fortschritt als Orientierung; Prüffrage je Element: dient es dem Nutzerziel oder der Verweildauer? | Octalysis-„Belege“ sind Marketing; Streak-Studien sind Konsumforschung | Octalysis offen; Streak-Effekt belegt; Dark-Pattern-Prävalenz belegt | Streak-Verlustangst zur Retention; Confirmshaming; Fake-Fortschritt |
| **Risiken der Deutung: Just-World (Lerner), toxische Positivität / Spiritual Bypassing (Welwood), Locus of Control** | Menschen werten Opfer unverschuldeten Leids ab (breit repliziert); Spiritual Bypassing = spirituelle Ideen zur Vermeidung emotionaler Themen (klinisch einflussreich, empirisch dünn); interner Kontrollüberzeugung korreliert mit Wohlbefinden, Kausalität offen | „Mechanik“ als **Person-×-Situation**-Satz, nie als Charakterfehler; eigene Karten für äußere Faktoren (Macht, Abhängigkeit, Geld, Krankheit) | Ein Tool, das Muster „in dir“ sucht, erzeugt strukturell Self-Blame-Risiko | Just-World belegt; Bypassing plausibel/offen; LoC belegt korrelativ | „Du ziehst das an“, „alles hat seinen Grund“, Astrologie als Schicksalserklärung für Missbrauch oder Armut |
| **Astrologie: Barnum/Forer, Carlson, Dean & Kelly; subjektiver Nutzen** | Identische Profile werden als hoch zutreffend bewertet (Forer 1949; Dickson & Kelly 1985); Doppelblindtest auf Zufallsniveau (Carlson 1985, Nature); >40 kontrollierte Studien ohne Überzufälligkeit (Dean & Kelly 2003); Astrologie-Interesse korreliert mit Krisen und steigert Selbstgewissheit (Lillqvist & Lindeman 1998, N = 40) | Als **Projektionsfläche** für Reflexion kann astrologische Sprache Selbstbeschreibung anregen — mit derselben Mechanik, die der Barnum-Effekt beschreibt | Keine prädiktive Validität; Selbstverifikation kann ungünstige Selbstbilder verfestigen | keine Validität belegt; subjektiver Nutzen plausibel (Kleinstudie) | „Dein Sternzeichen erklärt dein Nein-Problem“ als Faktum; Astro als Default; Kopplung an Kauf |

**Wie kurze Fragen und Reflexionsimpulse Selbstbestimmung fördern [I aus E]:** Autonomie entsteht, wenn der Nutzer (a) jede Frage ablehnen kann („Weiß nicht“, Überspringen), (b) die Ableitung selbst erzeugt (Weiche stellen statt Diagnose lesen), (c) die Deutung wählt oder korrigiert („Trifft es?“, Nachbarsatz ist gültig) und (d) die Brücke selbst formuliert. Der Finder liefert Struktur, nicht Inhalt — der Inhalt bleibt beim Menschen.

**Echter Erkenntnismoment vs. künstlich erzeugtes „Aha“ [E → Regel]:** Die Forschung zeigt, dass das Aha-Gefühl kein Wahrheitsbeweis ist. Deshalb misst der Finder Erkenntnis nicht an Gefühl oder Dramaturgie, sondern an **Reproduzierbarkeit**: Kann der Nutzer sein Muster als Satz wählen (A10a), eine Ausnahme nennen („Wann gilt das nicht?“) und beim Wiedereinstieg nach Tagen abrufen? Nur das zählt als validierte Erkenntnis (Kap. 9).

### 3.3 Praktische Regeln für den Finder (aus 3.2 abgeleitet, alle [H] bis Kap. 9 sie prüft)

| # | Regel | Begründung |
|---|---|---|
| R1 | Eine Entscheidung pro Screen, 2–6 Optionen, immer mit „Weiß nicht / trifft nicht zu“ | CLT; Chernev-Moderatoren (Präferenzunsicherheit); MI-Ambivalenz |
| R2 | Zwei Ebenen Progressive Disclosure: Karte → Zwei-Satz-Erklärung → „Mehr“ auf Wunsch; keine dritte Ebene | Nielsen |
| R3 | Verständnis validieren statt Aha behaupten: Satz wählen + Ausnahme nennen | false insights, Self-Explanation, Generierung |
| R4 | Mechanik als Person-×-Situation-Satz: „Wenn [Situation], neige ich zu [Muster], weil [Funktion]“ — nie „Du bist …“ | Just-World, SDT |
| R5 | Brücke = Wenn-Dann-Plan, vom Nutzer formuliert, mit Hinweisreiz; optional ein Hindernis | Gollwitzer & Sheeran d = .65; WOOP |
| R6 | Keine Punkte, Badges, Ranglisten, Streaks; Fortschritt nur als Orientierung | Hanus & Fox; Silverman & Barasch; SDT |
| R7 | Wiederkehr nur als freiwilliger, zeitlich gestreuter Check-in mit Abruffrage; Rückkehr nach Pause neutral begrüßen | Spacing/Retrieval; Streak-Bruch-Effekt |
| R8 | Würdigung vor Deutung: der Grund hat einmal geschützt („Was dich geschützt hat, muss dich nicht für immer begrenzen“) | Self-Affirmation; MI |
| R9 | MI-Sprache in allen Kacheln: offene Alternativen, keine Konfrontation, kein Imperativ | Miller & Rollnick |
| R10 | Äußere Faktoren bekommen eigene Karten („Kein Spielraum“) und einen eigenen Pfad ohne Mechanik-Urteil | Just-World, Locus of Control |
| R11 | Astrologie strikt Opt-in, mit ehrlicher Rahmung, nie Default, nie mit Kauf verknüpft, nie in Krisen | Carlson; Barnum; SDT |
| R12 | Ausstieg, Zurück, Pause, Löschen auf jedem Screen, ohne Confirmshaming | Nielsen Heuristik 3; Gray et al. |
| R13 | Erfolgsmaß ist nicht Verweildauer, sondern reproduziertes Muster, formulierte Brücke, berichteter Nutzen | Bogost/Deterding; Flow-Kritik |
| R14 | Keine Wirksamkeitsbehauptung („wissenschaftlich fundiert“); korrekt: „auf Grundlage von … gestaltet, Wirkung nicht geprüft“ | Publikationsbias in allen zitierten Feldern |

### 3.4 Gründerkonzepte als eigene methodische Perspektiven

Die Konzepte werden **nicht wegrationalisiert**, sondern als eigene Ebene mit eigener Sprache geführt. Jede Zeile trennt, was Ben meint [G], wie es im Produkt lebt [I], was die Forschung dazu sagt [E] und welche Schutzregel gilt.

| Konzept | [G] Bens Bedeutung | [I] Produktform | [E] Forschungsbezug | Schutzregel |
|---|---|---|---|---|
| **Gold im Dunkeln** | Probleme sind „Wegweiser zu dem Gold, das im Erlebten verborgen liegt“ (Brief §2); im Finder: das Erkennen, ohne die Lage zu verharmlosen | Die Laterne am Hebel (Warum-Grund als Licht, das geschützt hat); die Perspektive-Phase als *Angebot*; Finder-Card-Zeile „Perspektive“ nur, wenn gewählt | Benefit Finding / posttraumatisches Wachstum existiert, aber nicht bei allen und nicht auf Kommando; Reframing wirkt als Wahl, nicht als Vorgabe | Nie als Einstieg; nie bei Krise; „Gerade nur Verlust“ ist ein gültiger Pfad |
| **Frequenzpyramide** (Dankbarkeit · Liebe · … · Hass; „auf jeder Ebene werden Erfahrungen angezogen“) | Sinnmodell: die eigene Ausrichtung prägt, welche Erfahrungen man macht | Eigene, vom Nutzer öffnende Perspektive-Karte („Welche Ausrichtung gebe ich mir?“) als Reflexionsfrage, nicht als Kausalaussage; kein Fakt-Schlüssel, nur Hypothese | Empirisch nicht belegbar; Apophänie und Bestätigungsfehler erklären die Plausibilität; Just-World-Risiko, wenn Leid als „angezogen“ gedeutet wird | Nie auf Gewalt, Krankheit, Armut, Kündigung anwenden; Formulierung „Ausrichtung“, nie „du ziehst an“ |
| **Lebensweichen / Köln–Düsseldorf** | Kleine Entscheidungen gegen das eigene Gefühl verändern die Route; Wiederholung verbaut | Weiche, Stellwerk, Kreislauf (Kap. 5) — die Kernvisualisierung | Gewohnheitsforschung und Implementation Intentions stützen „kleine wiederholte Entscheidungen formen“; die Weiche ist Illustration, keine Kausalbehauptung | Mini-Erklärung sagt es ausdrücklich: „Keine einzelne Weiche verbaut ein Leben“ |
| **Authentizität** | „dahingehend was du wirklich fühlst und diesem Gefühl auch zu vertrauen“ | Methodik FAKT → ABWEICHUNG → WARUM → MECHANIK → BRÜCKE; Kompromiss ≠ Bruch | Selbstkonkordanz und Autonomie korrelieren robust mit Wohlbefinden (SDT) | Kein Authentizitäts-Score, keine Bewertung der Person |
| **Trust Yourself · Verify the World · Build Your Life** | Leitformel der Marke | Phasenlogik: Trust (Impuls spüren: Wollen) · Verify (Fakten, Abweichung, Mechanik prüfen) · Build (Brücke, Portal) | — | — |
| **Astrologie** | Vollwertige Perspektive-Ebene mit echter Berechnung (Festlegung 0.1.5) | `astro_consent` → Berechnung (`web/astro/`) → `astro_perspective` nach Studio-Regeln, Label „Reflexionsangebot, keine Vorhersage“ | Keine prädiktive Validität (Carlson; Dean & Kelly); subjektiver Nutzen als Selbstverifikation plausibel; Barnum-Effekt | Opt-in, gesonderte Einwilligung, nie Default, nie in Krisen, nie für Gesundheit/Geld/Recht; Wortlaut der Rahmung [OG] |

**Empirische und spirituelle Ebene bleiben erkennbar:** Fakten (`facts`) stammen nur vom Nutzer; regelbasierte Ableitungen (`derived`) sind nachvollziehbar; KI-Deutungen (`hypotheses`) tragen Grundlage und Sicherheit; astrologische und Frequenz-Perspektiven tragen ein festes Label und erscheinen nur nach Nutzerwahl. Der Nutzer sieht immer, auf welcher Ebene er gerade steht.

---

## 4. Drei vollständig durchgespielte adaptive Nutzerreisen

### 4.0 Gemeinsame Regeln aller Reisen

**Erlebnisprinzip:** Außen einfach. Innen intelligent. Visuell unverwechselbar.

| Regel | Festlegung | Grund |
|---|---|---|
| Eine Aufgabe pro Screen | Genau eine Frage oder eine Interaktion; Kacheln 2–6 (Registry-Limit), Zieltitel ≤ 90 Zeichen | Cognitive Load, Choice Overload (Kap. 3.2) |
| 3-Sekunden-Einstieg | Erster Screen ist eine klickbare Erkennungsfrage („Kennst du das?“), kein Textblock, kein Chat, kein Login | Activation (Kap. 2) |
| Freitext ist immer optional | Jede Frage hat „Oder in deinen Worten“ als zweite Ebene (eingeklappt auf Mobil) | Autonomie, Antwortqualität |
| Zurück / Überspringen / Anderer Weg | Jeder Screen: Zurück (behält Antworten), „Weiß ich nicht“ als gültige Kachel, „Pause“ (Stand bleibt lokal) | Kontrolle, Ungewissheit |
| Sichtbarer Fortschritt | Pfad mit 5 Stationen (Fakt · Abweichung · Warum · Mechanik · Brücke) als Linie mit Lichtern, Station leuchtet beim Erreichen | Momentum; Duolingo-Pfad, aber ohne Zeitdruck |
| Spiegeln ohne Verhör | Nach einer Antwort erscheint **eine** Zeile in Nutzerworten („Du wolltest Nein sagen.“) als ruhige Bestätigung — **kein** blockierendes „Habe ich dich richtig verstanden?“; Korrektur über ein kleines „Ändern“ | Gründervorgabe; MI-Prinzip Reflexion |
| Mini-Erklärung statt Vortrag | Höchstens zwei Sätze (`method_note`), erst **nach** einer Nutzeraktion | Progressive Disclosure |
| Entdecken statt Diktieren | Die Mechanik wird durch eine Interaktion des Nutzers sichtbar (Weiche stellen, Kreislauf tippen), die KI diktiert sie nicht | Self-Explanation-Effekt, Gründervorgabe |
| Verständnis prüfen statt Aha behaupten | Vor der Finder Card wählt der Nutzer, welcher Satz seine Mechanik trifft („Trifft es?“ Ja / teilweise / nein → zurück) | „false insights“ (Kap. 3.2) |
| KI nur, wo sie etwas kann | Kein API-Aufruf bei reinen Kachelantworten. Aufruf nur bei (a) Freitext **mit Einwilligung** → Fakt zuordnen + Spiegelzeile, (b) „Erklär mir das“ auf Wunsch, (c) Finder Card **auf Wunsch** („In meinen Worten formulieren“) — die Card entsteht sonst deterministisch. Richtwert ≤ 3 Aufrufe je Reise, **0 ist der Normalfall** | Kosten, Verlässlichkeit, Gründervorgabe „nicht bei jedem Klick“; Review 3 |
| Wann die App aufhört zu fragen | Keine Abweichung → Abschluss anbieten; zweimal „Weiß nicht“ in Folge → Beobachtungs-Brücke anbieten; Krisensignal → Sicherheits-Screen, Ende; „Heute nicht“ → Brücke direkt; Turn-Limit | Respekt, kein Verhör |
| Astro-Zugang | Nie als Einstieg; als Kachel in der Perspektive-Phase **und** jederzeit über „Mehr“-Menü auf Nutzerwunsch, immer über die Einwilligungs-Kachel `astro_consent`; Geburtsdaten aus Freitext werden **nicht** übernommen | Festlegungen 0.1, Datenschutz |
| Barrierefreiheit (alle Screens) | Kacheln = Buttons mit `aria-pressed`, Tastatur (Tab/Pfeile/Enter), Fokusring sichtbar, Ziele ≥ 44 px, Kontrast AA auf Glas (Prüfung je Zustand), `prefers-reduced-motion` → keine Fahr-/Glow-Animationen, nur Zustandswechsel; jede Visualisierung hat eine Textliste als Äquivalent; `aria-live` für Spiegelzeilen | WCAG 2.2 AA (R6) |
| Sicherheitsnetz | Krisensignal (Modell-Flag oder serverseitige Signalwörter) → fester `safety_notice` mit Nummern, keine Methodik mehr; Fachgrenze → fester Hinweis, Gespräch geht weiter | Sicherheitskern (Entwurf) |

**Kacheln-Konvention (Registry):** `label` kurz (Versalzeile), `title` ein Satz, Icon aus der Registry-Liste. Keine Textwände auf Kacheln (Regel „Prizes-Optik“).

**Zustandsfelder, die jede Reise speichert (lokal, bei Einwilligung serverseitig):** `facts` (aus Kacheln/Freitext, Fakt-Schlüssel der Methodik), `derived` (deterministisch berechnet: Abweichung, Wiederholungsgrad, Kompromiss-Flag), `hypotheses` (nur KI, mit Grundlage und Sicherheit, dem Nutzer nur als Angebot sichtbar), `flags` (`compromise`, `no_deviation`, `crisis`, `boundary`), `progress` (Stationen), `visual_state` (z. B. Weichenstellungen für die Finder Card), `consents` (Speicherung, Astro), `validation` („Trifft es?“-Antwort).

### 4.1 Reise A — Authentizität: „Ich sage ständig Ja, obwohl ich Nein meine“

**Ziel:** Der Nutzer erkennt in 5–10 Mikro-Schritten die konkrete Abweichung zwischen Wollen, Sagen und Tun, erlebt an der Weiche, wie Wiederholung zur Strecke wird, unterscheidet selbst zwischen bewusstem Kompromiss und Zurückhalten und wählt eine kleine nächste Weiche. **Richtzeit:** 3–5 Minuten. **API-Aufrufe:** 0–3.

**Pfad-Visualisierung oben:** 5 Lichter · Fakt – Abweichung – Warum – Mechanik – Brücke. Station leuchtet goldfarben beim Erreichen (vorhandener Glow).

#### A0 — Einstieg „Kennst du das?“ (Phase Fakt)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Sofort erkannt werden, ohne etwas erklären zu müssen. Gefühl: „Ja, genau das.“ |
| UI-Text | Versalzeile: **KENNST DU DAS?** · Frage: „Welche Szene kommt dir am nächsten?“ · Unterzeile: „Etwa vier Minuten. Du klickst, du entscheidest. Nichts verlässt dieses Gerät, solange du es nicht willst.“ |
| Kacheln | 1 **Köln statt Düsseldorf** — „Freunde wollen nach Köln. Du willst eigentlich woanders hin – und sagst Ja.“ (icon `users`) · 2 **Noch eine Aufgabe** — „Dein Chef legt nach. Du bist voll – und nickst.“ (`briefcase`) · 3 **Sonntag bei der Familie** — „Du brauchst Ruhe. Du fährst trotzdem hin.“ (`home`) · 4 **Nein gesagt, Ja gemeint** — „Du hast abgelehnt, obwohl du eigentlich wolltest.“ (`shuffle`) · 5 **Meine Szene ist anders** (`compass`) |
| Freitext | Bei Kachel 5 klappt „In zwei Sätzen: Was ist passiert?“ auf (optional, auch leer weiter möglich) |
| Nutzeraktion | Ein Tipp. Panther-Hinweis: „Notiert. Fakten zuerst.“ |
| Regeln / Verzweigung | `facts.scene` = Kachel-ID; Kachel 4 setzt `facts.direction = "nein-statt-ja"` (Abweichungsrichtung umgekehrt, Texte in A2–A4 passen sich an); Kachel 5 ohne Text → `scene = "eigene"` mit Standardbegriffen |
| KI-Entscheidung | Nur bei Freitext: Zuordnung zu Szene/Bereich + eine Spiegelzeile (1 Aufruf). Sonst keine |
| Ergebnis | Szene steht; die Weiche in A3 wird mit den Begriffen dieser Szene beschriftet („Köln“ / „Düsseldorf“, „Aufgabe annehmen“ / „Nein, ich bin voll“) |
| Visual / Animation | Crystal-Cards im Raster, beim Tipp leichter Glow und Haken (vorhanden). Pfad-Licht „Fakt“ leuchtet |
| Barrierefreiheit | Kacheln als Buttons; Szenentexte sind vollständig im Button-Text; keine Information nur im Icon |
| Ungewissheit | Kachel 5 ohne Text ist erlaubt — der Finder arbeitet dann mit neutralen Begriffen („dein Impuls“ / „die Erwartung“) |
| Astro | Kein Zugang (Einstieg). Im „Mehr“-Menü ist „Astrologische Perspektive“ sichtbar, aber inaktiv mit Hinweis „ab Perspektive“ |
| API | Nein (Ja nur bei Freitext) |

#### A1 — Der Ort (Phase Fakt)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Die Szene an den eigenen Alltag andocken. |
| UI-Text | **WO WAR DAS BEI DIR?** · „Wo ist dir das zuletzt passiert?“ |
| Kacheln | Arbeit (`briefcase`) · Familie (`home`) · Partnerschaft (`heart`) · Freunde (`users`) · Mit mir selbst (`user`) — Texte wie V0.1 |
| Freitext | „Oder in deinen Worten“ (eingeklappt) |
| Nutzeraktion | Ein Tipp; Spiegelzeile: „Zuletzt: im Job.“ |
| Regeln | `facts.domain`. Wenn A0 = Kachel 1–3, ist die passende Domäne vorausgewählt (ein Tipp bestätigt oder ändert) |
| KI | Keine |
| Ergebnis | Domäne steht |
| Visual | Vorausgewählte Kachel pulsiert einmal (reduced motion: nur Rahmen) |
| Barrierefreiheit | Vorauswahl wird als `aria-pressed="true"` angekündigt |
| Ungewissheit | „Mit mir selbst“ deckt unklare Fälle ab |
| Astro | Nein |
| API | Nein |

#### A2 — Wollen (Phase Fakt)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Den eigenen Impuls wieder spüren, ohne Rechtfertigung. |
| UI-Text | **WAS WOLLTEST DU EIGENTLICH?** · bei Richtung „nein-statt-ja“: „Was hättest du eigentlich gern zugesagt?“ |
| Kacheln | Nein sagen (`x-circle`) · Mehr Zeit (`clock`) · Eine Grenze (`flag`) · Etwas anderes vorschlagen (`corner-up-right`) · Nicht sicher (`help-circle`) — bei umgekehrter Richtung: Ja sagen · Mitmachen · Mich zeigen · Etwas anderes · Nicht sicher |
| Freitext | optional |
| Nutzeraktion | Ein Tipp |
| Regeln | `facts.wanted`; „Nicht sicher“ → `uncertain_count++`, Spiegelzeile ohne Bewertung („Du bist dir nicht sicher. Das zählt als Antwort.“) |
| KI | Nur Freitext |
| Ergebnis | Impuls benannt |
| Visual | Links neben den Kacheln erscheint das erste Element der Weiche: ein kleines Gleis mit Schild „Dein Impuls“ (Vorbereitung auf A3) |
| Ungewissheit | Zweimal „Nicht sicher“ (A2 + A4) → in A5 Variante „Noch unklar“ |
| Astro / API | Nein / Nein |

#### A3 — Die Weiche: Gesagt (Phase Fakt → erste Interaktion mit der Kernvisualisierung)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Den Moment der Entscheidung körperlich nachstellen: „Ich habe die Weiche so gestellt.“ |
| UI-Text | **DIE WEICHE** · „Du stehst am Stellwerk. Links: dein Impuls (*Düsseldorf*). Rechts: die Erwartung (*Köln*). Was hast du gestellt?“ — Begriffe aus A0/A2 eingesetzt |
| Interaktion | Weichen-Hebel (SVG) mit zwei Zuständen; darunter zwei Kacheln als Äquivalent: **Impuls** („Ich habe Nein gesagt.“) · **Erwartung** („Ich habe Ja gesagt.“) · zusätzlich **Ausgewichen** („Vielleicht … mal sehen.“ `more-horizontal`) · **Geschwiegen** (`volume-x`) |
| Nutzeraktion | Hebel ziehen oder Kachel tippen → der Zug (goldenes Licht) fährt auf das gewählte Gleis |
| Regeln | `facts.said`; `visual_state.switch_1 = said` |
| KI | Keine |
| Ergebnis | Erster Weichenzustand steht; Pfad-Licht „Fakt“ bleibt, kleine Spiegelzeile: „Gestellt: Richtung Köln.“ |
| Visual / Animation | 1,2 s Fahrt des Lichts entlang des Gleises (Easing weich, bestehende Connector-Animation); Hebel kippt; Schild leuchtet. Reduced motion: Zustand springt, Beschriftung wechselt |
| Barrierefreiheit | Hebel ist ein `role="radiogroup"` mit zwei Radios (Pfeiltasten); Kacheln sind das vollwertige Äquivalent; `aria-live`-Text: „Weiche steht auf Köln“ |
| Ungewissheit | „Ausgewichen“/„Geschwiegen“ stellen die Weiche „auf halbem Weg“ (Zug bleibt vor der Weiche stehen) — eigene Darstellung, keine Wertung |
| Astro / API | Nein / Nein |

#### A4 — Getan (Phase Fakt)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Den Unterschied zwischen Wort und Handlung sehen. |
| UI-Text | **UND DANN?** · „Ist der Zug wirklich gefahren?“ |
| Kacheln | Mitgemacht („Ich bin gefahren.“ `check-circle`) · Gelassen („Ich bin doch nicht gefahren.“ `x-circle`) · Aufgeschoben („Ich habe es vor mir hergeschoben.“ `pause-circle`) · Halbherzig („Gefahren – aber ohne mich.“ `shuffle`) |
| Freitext | optional |
| Nutzeraktion | Ein Tipp; der Zug fährt weiter, bleibt stehen oder fährt gedimmt (halbherzig) |
| Regeln | `facts.did` |
| KI | Nur Freitext |
| Ergebnis | Alle drei Fakten (Wollen/Sagen/Tun) liegen vor → Abweichung wird **deterministisch** berechnet |
| Visual | Zug-Licht: fährt / stoppt / dimmt (reduced motion: Statusbeschriftung) |
| Ungewissheit | Keine „weiß nicht“-Kachel nötig — die vier Zustände decken alles ab; Freitext fängt Rest |
| Astro / API | Nein / Nein |

#### A5 — Die Abweichung wird sichtbar (Phase Abweichung)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | „Da ist die Lücke“ — sehen, nicht gesagt bekommen. |
| UI-Text | **DEINE ABWEICHUNG** · Drei Punkte auf einer Linie: *Gewollt: Nein* — *Gesagt: Ja* — *Getan: Mitgemacht*. Die Lücke zwischen zwei Punkten ist goldfarben markiert. Darunter ein Satz, deterministisch aus der Kombination: z. B. „Zwischen deinem Wollen und deinem Sagen liegt die Lücke.“ |
| Kacheln | **So war's** (`check`) · **Nicht ganz – ändern** (`corner-up-right`) · **Ich bin unsicher** (`help-circle`) |
| Nutzeraktion | Ein Tipp. „Ändern“ öffnet eine Liste der drei Fakten, der Nutzer springt gezielt zurück (A2/A3/A4), Antworten bleiben erhalten |
| Regeln | `derived.deviation ∈ {wollen-sagen, sagen-tun, wollen-tun, keine, unklar}` nach fester Tabelle (V0.1 `buildFinderCard`-Logik erweitert). **`keine`** → Screen A5b „Im Einklang“: „Wollen, Sagen, Tun passen zusammen. Es gibt hier nichts zu reparieren.“ mit zwei Optionen: *Prüfen, ob das Wollen wirklich deins ist* (→ A6 in Variante) oder *Für heute reicht das* (→ A10 Finder Card „Im Einklang“). **`unklar`** (zwei „nicht sicher“) → Variante „Noch unklar“ (V0.1-Varianten), Weichenbild bleibt neutral |
| KI | Keine (Berechnung regelbasiert). Optional eine KI-Spiegelzeile, falls Freitexte vorliegen |
| Ergebnis | Abweichung bestätigt oder korrigiert; Pfad-Licht „Abweichung“ leuchtet |
| Visual | Linie mit drei Punkten baut sich von links auf; die Lücke „öffnet“ sich (Abstand wächst 300 ms). Mini-Erklärung (`method_note`): „Abweichung ist kein Fehler. Sie ist nur die Stelle, an der es sich lohnt, genauer hinzusehen.“ |
| Barrierefreiheit | Abweichung wird als Satz vorgelesen; Punkte haben Textlabels |
| Ungewissheit | „Ich bin unsicher“ ist gültig → der Finder markiert die Lücke nicht, sondern fragt in A6 „Was hat in dem Moment mitentschieden?“ |
| Astro / API | Nein / Nein |

#### A6 — Warum (Phase Warum)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Den Grund benennen, ohne sich zu verurteilen. |
| UI-Text | **WAS HAT IN DEM MOMENT ENTSCHIEDEN?** · Unterzeile: „Es gibt gute Gründe für fast jede Weiche. Wir suchen keinen Schuldigen.“ |
| Kacheln | Niemanden enttäuschen (`heart`) · Konflikt vermeiden (`shield`) · Dazugehören (`users`) · Keine Zeit zum Nachdenken (`zap`) · Abgewogen – ich habe die Folgen bedacht (`sliders`) · Weiß ich nicht (`help-circle`) |
| Freitext | optional („Welcher Grund fühlt sich am ehrlichsten an?“) |
| Nutzeraktion | Ein Tipp; Panther: „Ein Grund ist kein Vorwurf.“ |
| Regeln | `facts.why`; **„Abgewogen“ → `flags.compromise_candidate = true`** (A7b startet mit Kompromiss-Variante) |
| KI | Nur Freitext (Zuordnung zu Grund-Kategorie, Spiegelzeile) |
| Ergebnis | Grund benannt; Pfad-Licht „Warum“ |
| Visual | Hinter der Weiche erscheint eine kleine Laterne (Gold) mit dem Grund als Schild — „das Licht, das in dem Moment leuchtete“ (Motiv „Gold im Dunkeln“, aber hier wertfrei: der Grund hat dich geschützt) |
| Ungewissheit | „Weiß ich nicht“ → A7 zeigt den Kreislauf **ohne** Grund-Knoten-Text, der Nutzer kann ihn später ergänzen |
| Astro / API | Nein / Nein |

#### A7 — Die Mechanik: Wiederholung erleben (Phase Mechanik, Kerninteraktion)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Selbst sehen, was aus einer Weiche wird, wenn sie sich wiederholt — und dass sie **nicht** schicksalhaft ist. |
| UI-Text | **WAS PASSIERT, WENN DAS ÖFTER PASSIERT?** · „Tipp auf *Nächste Situation* – und stell die Weiche so, wie du es meistens tust.“ |
| Interaktion | Weichen-Stellwerk mit 5 aufeinanderfolgenden Weichen (Kap. 5.1). Jeder Tipp auf **Nächste Situation** zeigt eine neue kurze Szene (aus Domäne A1 generiert, z. B. „Eine Kollegin bittet dich, ihre Schicht zu nehmen.“) und der Nutzer stellt: **Impuls** oder **Erwartung**. Das Licht fährt; der Abstand zwischen *deinem Gleis* (gestrichelt, gold) und *gefahrenem Gleis* wird nach jeder Weiche als Zahl „Abstand: 3 Gleise“ angezeigt. Nach 3–5 Weichen Button **Was wäre bei einem Nein gewesen?** → zeigt die Alternative als zweite Lichtspur. |
| Kacheln (nach der Simulation) | „Wie ist es bei dir?“ — **Einmalig** (`flag`) · **Kommt öfter vor** (`repeat`) · **Das ist mein Muster** (`activity`) · **Weiß ich nicht** (`help-circle`) |
| Nutzeraktion | 3–5 Tipps zum Stellen, 1 Tipp zur Alternative (optional), 1 Tipp zur Selbsteinschätzung |
| Regeln | `facts.repetition`; `visual_state.switches[]`. **Mini-Erklärung erscheint erst nach der dritten Weiche** (nicht vorher): „Keine einzelne Weiche verbaut ein Leben. Dieselbe Weiche, immer wieder gleich gestellt, wird zu einer Strecke.“ — Wenn der Nutzer in der Simulation **mehrheitlich Impuls** stellt: Erklärung variiert: „Du stellst öfter auf deinen Impuls, als es sich vielleicht anfühlt. Schau, wo die Ausnahme liegt.“ (keine Unterstellung eines Musters) |
| KI | Keine. Die Szenen kommen aus einem kuratierten Pool je Domäne (Studio-pflegbar). Optional [H]: eine KI-formulierte Szene aus den Nutzer-Freitexten — erst nach Test E3 (Kap. 9) |
| Ergebnis | Nutzer hat die kumulative Mechanik **selbst erzeugt**; Einschätzung der Wiederholung liegt vor |
| Visual | Stellwerk-Plateau (vorhandenes Plateau + Connector-Linien); jedes Stellen: Hebel kippt, Licht fährt 0,8 s, Abstandszähler zählt; Alternative als zweite, hellere Spur. Reduced motion: Zustände springen, Zähler bleibt. Panther-Hinweis nach der dritten Weiche: „Siehst du die Strecke?“ |
| Barrierefreiheit | Jede Weiche ist ein Radiogroup; Zusammenfassung als Liste: „Situation 1: Erwartung. Situation 2: Erwartung …“; Abstandszahl wird angesagt |
| Ungewissheit | „Weiß ich nicht“ → A8 bietet statt Deutung eine **Beobachtungsaufgabe** an („Zähl eine Woche lang nur mit, wann du Ja sagst und Nein meinst“), kein Mechanik-Urteil |
| Astro | Nein |
| API | Nein |

#### A7b — Kompromiss oder zurückgehalten? (Phase Mechanik)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Selbst einordnen, **wer** entschieden hat — ohne Urteil. |
| UI-Text | **WER HAT DIE WEICHE GESTELLT?** · „Ein bewusster Kompromiss ist authentisch, wenn du ihn kennst und trägst. Zurückhalten heißt: Etwas anderes hat für dich entschieden.“ |
| Kacheln | **Bewusster Kompromiss** („Ich habe mit offenen Augen entschieden.“ `sliders`) · **Zurückgehalten** („Ich habe mich kleiner gemacht, als ich bin.“ `lock`) · **Nicht sicher** (`help-circle`) |
| Nutzeraktion | Ein Tipp |
| Regeln | `facts.mechanic`. **Kompromiss** → `flags.compromise = true`: die Weiche bekommt eine leuchtende Laterne „bewusst gestellt“, A8 wird übersprungen (**kein** Reframing nötig), A9 startet mit Kachel „Dabei bleiben“ vorne; Finder-Card-Titel „Bewusster Kompromiss“. **Zurückgehalten** → A8. **Nicht sicher** → A8 in Beobachtungs-Variante |
| KI | Keine |
| Ergebnis | Mechanik benannt; Pfad-Licht „Mechanik“ |
| Visual | Laterne am Hebel geht an (Kompromiss) oder bleibt dunkel; keine rote/negative Farbe für „zurückgehalten“ — nur ungefärbt |
| Ungewissheit | „Nicht sicher“ ist ein ehrlicher Befund und wird so benannt |
| Astro / API | Nein / Nein |

#### A8 — Vogelperspektive (Phase Mechanik → Perspektive; optional, überspringbar)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Von oben schauen: Was zeigt das Muster — und was wäre möglich? |
| UI-Text | **VON OBEN** · „Wenn du von oben auf deine Strecke schaust: Was zeigt sie dir?“ |
| Kacheln | Ich schütze andere vor Enttäuschung (`heart`) · Ich schütze mich vor Konflikt (`shield`) · Ich will dazugehören (`users`) · Sie zeigt mir, was ich eigentlich will (`compass`) · Nichts davon / weiß nicht (`help-circle`) · **Astrologische Perspektive hinzuschalten** (`feather`, nur wenn Modul erlaubt → `astro_consent`) |
| Freitext | „Oder in deinen Worten“ |
| Nutzeraktion | Ein Tipp; bei Astro: Einwilligungs-Kachel mit Geburtsdaten-Formular (Datum, Zeit optional, Ort), ausdrücklicher Text „Reflexionsangebot, keine Vorhersage“, Widerruf jederzeit |
| Regeln | `facts.perspective`. Astro nur mit Einwilligung; Berechnung in der Engine (`web/astro/`), nie KI. Ohne Geburtszeit: Hinweis „ohne Häuser“. Bei `crisis` nie |
| KI | Bei Freitext: Spiegelzeile. Bei Astro: ein Aufruf mit ASTRO-FAKTEN + Regeln → `astro_perspective` (Regel-IDs sichtbar im Studio) |
| Ergebnis | Perspektive gewählt oder übersprungen |
| Visual | Kamera „fährt hoch“: Stellwerk schrumpft zur Karte (Kap. 5.3), neue Gleise erscheinen als gestrichelte Optionen; Astro-Baustein in Kalkulationspanel-Optik mit festem Label „Astrologische Perspektive – ein Reflexionsangebot, keine Vorhersage“ |
| Barrierefreiheit | Karte hat Textliste der Optionen; Astro-Text vollständig als Text |
| Ungewissheit | „Nichts davon“ führt direkt zur Brücke „Beobachten“ |
| Astro | **Ja — hier erster regulärer Zugang.** Zusätzlich jederzeit über „Mehr“-Menü ab Phase Warum [OG: ob auch früher] |
| API | Nur bei Freitext oder Astro (max. 1) |

#### A9 — Brücke: die nächste Weiche (Phase Brücke)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Einen kleinen, machbaren Schritt wählen, der sich nach „meins“ anfühlt. |
| UI-Text | **DEINE NÄCHSTE WEICHE** · „Klein. Konkret. In den nächsten 48 Stunden.“ |
| Kacheln | Gespräch nachholen („Ich sage, was ich eigentlich meinte.“ `message-circle`) · Bedenkzeit-Satz („Beim nächsten Mal: ‚Ich melde mich morgen.‘“ `clock`) · Grenze benennen (`flag`) · **Dabei bleiben** („Ich stehe bewusst zu meinem Kompromiss.“ `check-circle`, bei `compromise` an erster Stelle) · Beobachten („Ich schaue beim nächsten Mal genauer hin.“ `eye`) |
| Freitext | **Wenn-Dann-Form** vorgegeben: „Wenn ___ , dann sage/tue ich ___“ (zwei kurze Felder, optional; Kachelwahl füllt sie vor) |
| Nutzeraktion | Ein Tipp (+ optional Felder ausfüllen) |
| Regeln | `facts.bridge`; Wenn-Dann-Plan wird in die Finder Card übernommen. Keine Aufgabenliste, genau ein Schritt |
| KI | Optional: aus Fakten + Kachel einen Wenn-Dann-Satz **vorschlagen** (1 Aufruf) — Nutzer kann ihn ändern. Ohne KI: Vorlagen aus dem Modul |
| Ergebnis | Brücke steht; Pfad-Licht „Brücke“ |
| Visual | Auf dem Stellwerk erscheint die **nächste** Weiche, noch ungestellt, mit Laterne; der Hebel ist greifbar, aber der Nutzer stellt sie nicht im Finder — „das machst du draußen“. Mini-Erklärung: „Eine Brücke, die du heute gehen kannst, ist mehr wert als zehn, die du dir vornimmst.“ |
| Barrierefreiheit | Felder mit Labels, Vorschlag editierbar |
| Ungewissheit | „Beobachten“ ist immer verfügbar |
| Astro | Nein |
| API | Optional (≤ 1) |

#### A10 — Finder Card + „Trifft es?“ (Abschluss)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Sich im Spiegel wiedererkennen und selbst beurteilen, ob es stimmt. |
| UI-Text | Vor der Card ein Zwischenschritt **TRIFFT ES?** · „Welcher Satz beschreibt deine Mechanik am besten?“ — drei Sätze zur Auswahl, deterministisch aus Fakten gebildet (einer passt, zwei sind plausible Nachbarn), plus **Keiner davon** (→ zurück zu A7b). Dann die **FINDER CARD** (Epic-Card-Optik): Kopfzeile (z. B. „Eine Lücke erkannt“ / „Bewusster Kompromiss“ / „Im Einklang“ / „Noch offen“), Zeilen: *Fakt* (Szene, Ort, Gewollt/Gesagt/Getan), *Abweichung*, *Warum*, *Mechanik* (mit eingefrorener Mini-Weiche: 5 kleine Hebel in deiner Stellung), *Perspektive* (falls gewählt; Astro gekennzeichnet), *Brücke* (Wenn-Dann, 48 h). Fußzeile: „Die Finder Card ist ein Spiegel, kein Urteil.“ |
| Kacheln / Aktionen | Kopieren · Als Bild speichern [H] · **Weiter beobachten** („In 48 Stunden erinnern?“ — nur lokal/opt-in) · Astrologische Perspektive hinzufügen (falls noch nicht) · Neu starten · **Alles auf diesem Gerät löschen** |
| Nutzeraktion | Satz wählen → Card lesen → Aktion wählen |
| Regeln | `validation` = gewählter Satz (korrekt / Nachbar / keiner). „Keiner“ ist **kein** Fehler des Nutzers, sondern Signal an die Methodik (Metrik Kap. 9). Löschen entfernt lokalen Zustand sofort; serverseitig gespeicherte Testsitzungen nur bei Einwilligung, mit Löschfunktion |
| KI | Optional **ein** Aufruf zur Formulierung der Card-Zeilen in Nutzerworten (Fakten unverändert, Deutungen als solche markiert). Ohne KI: Satzschablonen (V0.1-Logik) |
| Ergebnis | Reise abgeschlossen; Erkenntnis validiert oder zurückgegeben |
| Visual | Epic-Card-Reveal (vorhanden), Mini-Weiche als SVG-Ikone; Pfad komplett erleuchtet; Panther: „Das ist eine Brücke. Klein genug, um sie zu gehen.“ |
| Barrierefreiheit | Card ist semantisches `dl`; Kopieren liefert Klartext |
| Ungewissheit | Kopfzeile „Noch offen“ bei unklaren Fakten — ausdrücklich erlaubt |
| Astro | Nachträglich hinzufügbar |
| API | Optional (≤ 1) |

**Alternative Pfade in Reise A (Übersicht):**

| Pfad | Auslöser | Verlauf |
|---|---|---|
| **Abbruch / Pause** | „Pause“ jederzeit | Stand bleibt lokal (ohne Konto); Wiedereinstieg am letzten Screen; nach 7 Tagen Angebot zum Löschen [OG Frist] |
| **„Weiß nicht“ ×2** | A2 + A4/A6 unsicher | A5 Variante „Noch unklar“; A7 wird zur Beobachtungsaufgabe; Card „Noch offen“ |
| **Bewusster Kompromiss** | A6 „Abgewogen“ oder A7b „Kompromiss“ | A8 übersprungen; Laterne an; Brücke „Dabei bleiben“ vorn; Card „Bewusster Kompromiss“ — **keine** Reparaturaufgabe |
| **Keine Abweichung** | A5 `keine` | „Im Einklang“: Abschluss anbieten oder Wollen prüfen; max. 2 weitere Screens |
| **Korrektur einer Annahme** | A5 „Nicht ganz“ oder A10 „Keiner davon“ | Gezielter Rücksprung, Antworten bleiben; kein Neustart |
| **Umgekehrte Richtung** | A0 Kachel 4 | Texte „Ja gemeint, Nein gesagt“, Weiche spiegelverkehrt beschriftet |
| **Krise** | Signalwörter/Flag in Freitext | `safety_notice` (fest), Nummern, Ende der Methodik, Angebot „später weiter“ |
| **Fachgrenze** | Freitext berührt Recht/Gesundheit/Geld | Fester Hinweis, Reise läuft weiter |

### 4.2 Reise B — Jobverlust & Neuorientierung: „Ich wurde gekündigt und weiß nicht weiter“

**Ziel:** Boden, Luft, Richtung — in dieser Reihenfolge wählbar. Praktische Sicherheit (Fristen, Existenz) wird von emotionalem Erleben getrennt, der Perspektivwechsel „Wendepunkt“ ist eine **freiwillige Frage** mit einem gültigen Pfad „heute nicht hilfreich“. **Richtzeit:** 4–7 Minuten. **API:** 0–3. **Fachliche Prüfung:** alle Fristen-/Leistungstexte (R6, Kap. 6.7) vor Veröffentlichung.

#### B0 — Was brauchst du zuerst?

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Kontrolle zurückbekommen: Ich entscheide, wo wir anfangen. |
| UI-Text | **WAS BRAUCHST DU JETZT ZUERST?** · „Eine Kündigung ist ein Fakt. Was sie wiegt, schauen wir uns an – in deinem Tempo.“ |
| Kacheln | **Boden** („Was muss ich jetzt praktisch regeln?“ `shield`) · **Luft** („Erst mal sortieren, was das mit mir macht.“ `feather`) · **Richtung** („Ich will nach vorn schauen.“ `compass`) · **Weiß nicht** (`help-circle` → Luft) |
| Regeln | `facts.first_need`. Boden → B1; Luft → B2; Richtung → B2 (verkürzt) → B6; Krisensignal jederzeit → Sicherheits-Screen |
| KI / API | Nein |
| Visual | Drei Kacheln; Pfad oben: Verstehen – Muster – Perspektive – Brücke |
| Astro | Nein |

#### B1 — Boden: fester Hinweis (kein KI-Text)

| Feld | Inhalt |
|---|---|
| Nutzerziel / Gefühl | Wissen, dass nichts Wichtiges verpasst wird — ohne Beratung. |
| UI-Text | **DREI DINGE, DIE OFT FRISTEN HABEN** (fester `info_card`-Baustein, Wortlaut nach Fachprüfung; Entwurf:) „1 **Agentur für Arbeit**: sich frühzeitig arbeitsuchend melden – meist sehr kurze Fristen nach Erhalt der Kündigung. 2 **Kündigung prüfen lassen**: Wer sich wehren will, hat in Deutschland nur wenige Wochen Zeit. 3 **Unterlagen sichern**: Kündigungsschreiben, Arbeitsvertrag, Lohnabrechnungen. — Der Finder berät nicht zu Fristen, Ansprüchen oder Geld. Offizielle Stellen: Agentur für Arbeit · Gewerkschaft/Fachanwalt · Schuldner-/Sozialberatung. Für Österreich (AMS) und die Schweiz (RAV) gelten andere Regeln.“ |
| Kacheln | Je Punkt Status: Erledigt (`check`) · Offen (`clock`) · Unklar (`help-circle`) — rein für die eigene Übersicht |
| Regeln | Keine individuelle Bewertung; **keine** Aussage zu „selbst kündigen vs. gekündigt werden“; bei Freitext „Aufhebungsvertrag“/„selbst gekündigt“ → neutraler Zusatz: „Dazu gibt es Besonderheiten – bitte bei der Agentur für Arbeit oder einer Fachstelle klären.“ `boundary = legal/financial` |
| KI / API | Nein |
| Visual | PRO-TIPP-Optik mit goldenem Rahmen (safety/boundary-Stil); Statuspunkte |
| Barrierefreiheit | Liste, Statusbuttons mit Text |
| Weiter | Automatisch nach B2 („Und jetzt du.“) oder Abschluss „Für heute reicht Boden“ → Finder Card „Boden zuerst“ |

#### B2 — Verstehen: Was belastet am meisten?

| Feld | Inhalt |
|---|---|
| UI-Text | **WAS BELASTET DICH GERADE AM MEISTEN?** · „Nur eines. Das, was heute am schwersten wiegt.“ |
| Kacheln | Geld (`shield`) · Wer bin ich (`user`) · Plötzlich (`zap`) · Scham (`eye`) · Zukunft (`compass`) · Menschen (`users`) — aus `jobverlust.journey.json`; **ergänzt nach Review:** Wut / ungerecht (`activity`) · Trauer (`heart`) · „Erleichtert – und schäme mich dafür“ (`feather`). Registry-Limit 6 je Screen → zwei Kachelgruppen („Was wiegt?“ / „Was fühlst du?“) oder Studio-Auswahl [OG] |
| Freitext | optional |
| Regeln | `facts.belastung`, `belastung_kategorie`. **Geld** → `boundary=financial` + Boden-Pfad angeboten, falls nicht gewählt. Spiegelzeile warm („Am schwersten wiegt: dass es ohne Vorwarnung kam.“) |
| KI | Freitext → Kategorie + Spiegelzeile (1 Aufruf) |
| Visual | Kacheln; danach **Drei Ringe** (Existenz · Identität · Zugehörigkeit), der betroffene Ring leuchtet — Mini-Erklärung: „Eine Kündigung trifft oft drei Ebenen. Du hast eine benannt. Die anderen dürfen mit.“ |
| Ungewissheit | „Alles“ im Freitext → Bitte, eines zu wählen (deepen_how aus Modul) |
| API | Nur Freitext |

#### B3 — Muster I: Was hat dir die Arbeit gegeben?

| Feld | Inhalt |
|---|---|
| UI-Text | **WAS HAT DIR DIE ARBEIT GEGEBEN?** · „Wähle bis zu zwei.“ |
| Kacheln | Struktur (`sliders`) · Anerkennung (`heart`) · Menschen (`users`) · Sicherheit (`shield`) · Sinn (`feather`) · Etwas anderes (Freitext) |
| Regeln | `facts.gegeben` (max. 2) |
| Visual | Linke Spalte einer Waage/Zwei-Spalten-Karte „Gegeben“ füllt sich |
| KI / API | Nur Freitext |

#### B4 — Muster II: Was hat gefehlt — vielleicht schon länger?

| Feld | Inhalt |
|---|---|
| UI-Text | **UND WAS HAT GEFEHLT?** · „Vielleicht schon länger als die Kündigung.“ |
| Kacheln | Dieselben fünf + **Nichts hat gefehlt** (`check-circle`) + Freitext |
| Regeln | `facts.gefehlt`. „Nichts“ ist gültig → Mini-Erklärung entfällt, Perspektive setzt auf dem Gegebenen auf („Das lässt sich oft woanders finden.“) |
| Visual | Rechte Spalte füllt sich; Mini-Erklärung erst jetzt: „Was dir die Arbeit gegeben hat, lässt sich oft woanders finden. Was gefehlt hat, zeigt oft die Richtung.“ — **ohne** „Gold im Dunkeln“-Floskel, der Nutzer soll den Kontrast selbst sehen |
| KI / API | Nur Freitext |

#### B5 — Freiwilliger Blick nach vorn

| Feld | Inhalt |
|---|---|
| UI-Text | **WIE WEIT WILLST DU HEUTE GEHEN?** |
| Kacheln | **Blick nach vorn** (`compass`) · **Heute nicht** („Sortieren reicht für heute.“ `pause-circle`) · **Astrologische Perspektive** (`feather`, mit Einwilligung) |
| Regeln | „Heute nicht“ → direkt B7 (Brücke, Stil warm, keine Reframing-Frage). Dies ist der **ausdrücklich gültige Pfad**, auf dem „Kündigung als Wendepunkt“ nicht hilfreich ist. Astro → `astro_consent` → B6 mit `astro_perspective` nach der ersten benannten Möglichkeit (Modulregel `earliest_phase: perspektive`) |
| KI / API | Nein (Astro: 1 Aufruf später) |

#### B6 — Perspektive: Möglichkeiten anschauen (nur wenn gewählt)

| Feld | Inhalt |
|---|---|
| UI-Text | **WELCHE MÖGLICHKEITEN WILLST DU ANSCHAUEN?** · „Anschauen ist nicht entscheiden.“ |
| Kacheln | Ähnlich, besser (`repeat`) · Neu (`compass`) · Eigenes (`flag`) · Pause (`pause-circle`) · Lernen (`feather`) · Offen (`help-circle`) |
| Danach (B6b) | **WENDEPUNKT?** · „Manche sehen in einer Kündigung später einen Wendepunkt. Andere nicht. Wo stehst du heute?“ — Kacheln: **Könnte einer sein** · **Gerade nur Verlust** · **Beides** · **Weiß nicht** |
| Regeln | `facts.moeglichkeiten`, `richtung`; **„Gerade nur Verlust“ → Stil warm, keine weitere Perspektivfrage, Brücke „Boden/Atem“ vorn**; „Beides“ → Spiegelzeile ohne Auflösung; Astro-Baustein nur nach B6, nie bei Verlust-Pfad ohne Nachfrage |
| KI | Freitext → Richtung; Astro → 1 Aufruf |
| Visual | **Karte von oben** (Kap. 5.3): „Du bist hier“, altes Gleis, neue Stationen leuchten auf, beschriftet mit dem **Gefehlten** („Hier gibt es: Sinn“); Tipp auf Station zeigt eine Zeile. Reframing-Screen ohne Visual, ruhig |
| Ungewissheit | „Offen“ → Brücke darf Sortieren/Atem sein (Modul-Branch `offen-bleiben`) |
| API | ≤ 2 |

#### B7 — Brücke: Boden oder Richtung

| Feld | Inhalt |
|---|---|
| UI-Text | **WELCHER SCHRITT GIBT DIR BODEN ODER RICHTUNG?** · „Bis übermorgen. Klein genug, um ihn zu gehen.“ |
| Kacheln | Boden („Erst das Nötigste regeln.“ `shield`) · Gespräch (`message-circle`) · Sortieren (`sliders`) · Erkunden (`compass`) · Atem (`pause-circle`) — Reihenfolge je Pfad (Verlust/Geld → Boden/Atem vorn) |
| Freitext | Wenn-Dann-Felder |
| Regeln | `facts.schritt`; genau ein Schritt |
| KI / API | Optional Vorschlag (≤ 1) |

#### B8 — Finder Card + „Trifft es?“

Wie A10, Zeilen: *Situation* (Kündigung + Belastung in Nutzerworten), *Muster* (Gegeben / Gefehlt), *Perspektive* (nur falls gewählt; Wendepunkt-Antwort wörtlich; Astro gekennzeichnet), *Brücke*. Fußzeile fest: „Für Fristen, Ansprüche und Geld sind Fachstellen die richtige Adresse — der Finder begleitet dich bei allem anderen.“ Validierungssätze beziehen sich auf das **Muster** (Gegeben/Gefehlt), nicht auf eine Deutung der Kündigung.

**Alternative Pfade B:** Boden-nur (B0 → B1 → Card „Boden zuerst“, 2 Screens); Verlust-Pfad (B6b „nur Verlust“ → warm → B7 Boden/Atem); Heute-nicht (B5 → B7); Geld-Grenze (B2 Geld → Hinweis + Boden-Angebot); Selbst-gekündigt/Aufhebungsvertrag (neutraler Fachstellen-Zusatz, **keine** Bewertung); Krise (Sicherheits-Screen); Korrektur (jederzeit Zurück mit erhaltenen Antworten).

### 4.3 Reise C — Offene Neuorientierung: „Ich möchte mein Leben verändern, weiß aber nicht, wo ich anfangen soll“

**Ziel:** Aus Diffusem eine Priorität machen, Werte sichtbar, erste Perspektive, konkrete kleine Brücke. **Richtzeit:** 4–6 Minuten. **API:** 0–2.

| Screen | Frage / Interaktion | Kacheln | Regeln, Visual, API |
|---|---|---|---|
| **C0 Wo zieht es?** | **WO SPÜRST DU DEN WUNSCH AM STÄRKSTEN?** | Arbeit · Beziehungen · Ort & Wohnen · Körper & Energie · Sinn · Überall irgendwie (`compass`) | `facts.area`; „Überall“ ist gültig → C1 bekommt Zusatz „Das ist ein Zeichen für Werte, nicht für Chaos.“ Kein API |
| **C1 Deine drei Worte** | **WELCHE DREI WORTE SIND DIR GERADE WICHTIG?** — Kartensortierung: 12 Wertekacheln, drei antippen (Zähler 0/3) | Freiheit · Nähe · Ruhe · Mut · Sicherheit · Sinn · Kreativität · Gesundheit · Wachstum · Gerechtigkeit · Spiel · Verbundenheit | `facts.values[3]`; mehr als drei → älteste abgewählt; **Visual:** gewählte Kacheln ordnen sich zu einem kleinen Dreieck („dein Kompass“). Kein API |
| **C2 Eines zuerst** | **WENN DU IN DEN NÄCHSTEN VIER WOCHEN NUR EINES STÄRKEN KÖNNTEST?** | die drei gewählten Werte | `facts.priority`; Mini-Erklärung: „Nicht, weil die anderen unwichtig sind. Weil eine Weiche nach der anderen gestellt wird.“ Kein API |
| **C3 Platz heute** | **WIE VIEL PLATZ HAT [WERT] GERADE IN DEINER WOCHE?** | Kaum · Etwas · Viel · Weiß nicht | `facts.space`; **Visual:** Balken im Kalkulationspanel. „Viel“ → C4 fragt stattdessen „Was fehlt dann noch?“ Kein API |
| **C4 Was hält den Platz klein?** | **WAS HÄLT DEN PLATZ KLEIN?** | Zeit · Angst · Andere erwarten etwas · Geld · Gewohnheit · Weiß nicht | `facts.blocker`; **Visual:** eine einzelne Weiche (Kap. 5.1) mit Schild „[Wert]“ links und „[Blocker]“ rechts — Mini-Erklärung: „Veränderung beginnt selten mit dem großen Umzug. Sie beginnt an der nächsten Weiche.“ „Geld“ → `boundary=financial` Hinweis, keine Beratung. Kein API |
| **C5 Von oben** | **IN EINEM JAHR, WENN [WERT] MEHR PLATZ HAT – WAS IST ANDERS?** | Mehr Ruhe · Mehr Mut · Mehr Nähe · Mehr Eigenes · Weiß nicht · Astrologische Perspektive (Einwilligung) | `facts.vision` oder Freitext (1 Aufruf: Spiegelzeile); **Visual:** Karte von oben mit „Du bist hier“ und einer leuchtenden Station „[Wert]“; Astro-Baustein nach Einwilligung (1 Aufruf). Weiß nicht → Brücke „Beobachten“ |
| **C6 Die kleinste Weiche** | **DIE KLEINSTE WEICHE FÜR [WERT] IN DEN NÄCHSTEN 48 STUNDEN** | je Wert 3 Vorlagen (z. B. Ruhe: „Ein Abend ohne Bildschirm“, „Zehn Minuten Stille vor der Arbeit“, „Eine Zusage absagen“) + Beobachten + Freitext (Wenn-Dann) | `facts.bridge`; Vorlagen aus dem Modul (Studio-pflegbar); optional KI-Vorschlag (≤ 1) |
| **C7 Trifft es? + Finder Card** | Validierungssätze zur Priorität/Blocker; Card: *Richtung* (Bereich, drei Werte, Priorität), *Heute* (Platz, Blocker), *Perspektive* (falls gewählt), *Brücke* | Kopieren · Erinnern (opt-in) · Astro · Neu · Löschen | wie A10 |

**Alternative Pfade C:** „Überall“ (C0) → Werte-Fokus; „Viel Platz“ (C3) → Frage nach dem Fehlenden; „Weiß nicht“ an zwei Stellen → Beobachtungs-Brücke und Card „Noch offen“; Geld-Blocker → Fachgrenze; Abbruch/Pause; Korrektur über Zurück.

### 4.4 Spezialteil „Die Mechanik deines Problems“ — siehe Kapitel 5

---

## 5. Visuelle Interaktionskonzepte: Weiche, Kreislauf, Karte

### 5.0 Grundsätze

- **Interaktion vor Illustration.** Jede Darstellung reagiert auf einen Tipp des Nutzers und zeigt eine Konsequenz; sie ist kein Bild zum Anschauen.
- **Kuratierte Interaktion, personalisierte Beschriftung.** Form, Animation und Verhalten sind fest (Vue-Komponenten in der bestehenden Glas-Optik). **Nur die Beschriftungen** (Szene, Impuls, Erwartung, Grund) kommen aus den Fakten des Nutzers — regelbasiert, optional KI-formuliert (eine Zeile, aus Fakten, nie Deutung).
- **Keine neue Designsprache, keine generierten Bilder.** Erlaubte Motive: vorhandene Panther-/Portal-/Glas-/Shard-Assets (freigegebener Pool, Brief §14), dazu **in Code gezeichnete** Linienmotive: Gleise, Weichenhebel, Laterne (Gold = Erkenntnis), Ringe, Stationen, gestrichelte Alternativgleise. Farben aus der bestehenden Palette (dunkles Grün, Anthrazit, Gold, Coral als Akzent — Coral **nicht** als „Fehlerfarbe“ für Nutzerentscheidungen).
- **Kein Urteil in der Farbe.** Weder „Erwartung“ noch „Zurückgehalten“ werden rot/negativ eingefärbt; das eigene Gleis ist gold gestrichelt, das gefahrene Gleis neutral hell.
- **Reduced Motion** ersetzt Fahrten durch Zustandswechsel; jede Darstellung hat eine Textliste als Äquivalent (`<details>` „Als Text“).

### 5.1 Darstellung 1 — Die Weiche / das Stellwerk

**Idee [G3].** Ein Gleis von links; eine Weiche teilt in zwei Gleise: links **dein Impuls**, rechts **die Erwartung** (Beschriftung aus den Fakten, z. B. „Düsseldorf“ / „Köln“). Ein goldenes Licht steht für den Zug. Im Stellwerk (A7) folgen bis zu fünf Weichen hintereinander; das eigene Gleis läuft als goldene gestrichelte Linie unten durch.

**Verhalten.**

| Moment | Was der Nutzer tut | Was passiert (Feedback) |
|---|---|---|
| Erste Weiche (A3) | Hebel ziehen oder Kachel tippen | Hebel kippt (120 ms), Licht fährt 1,2 s auf das Gleis, Schild leuchtet, `aria-live`: „Weiche steht auf Köln.“ Spiegelzeile erscheint. |
| Halb gestellt (Ausgewichen/Geschwiegen) | Kachel tippen | Licht bleibt vor der Weiche stehen, Hebel in Mittelstellung, Beschriftung „noch nicht gestellt“. Keine Wertung. |
| Stellwerk (A7) | „Nächste Situation“ → Szene lesen → stellen | Neue Szene erscheint als kleine Karte; Hebel; Licht fährt; **Abstandszähler** zählt Gleise zwischen gefahrener Spur und eigenem Gleis; nach Weiche 3 erscheint die Mini-Erklärung. |
| Alternative | „Was wäre bei einem Nein gewesen?“ | Zweite, hellere Lichtspur fährt entlang des eigenen Gleises; beide Endpunkte stehen nebeneinander; Text: „Beide Strecken sind möglich. Keine ist Schicksal.“ |
| Kompromiss (A7b) | Kachel „Bewusster Kompromiss“ | Laterne am Hebel geht an („bewusst gestellt“); Zähler bleibt, bekommt Zusatz „gewählt“. |
| Brücke (A9) | — | Nächste Weiche erscheint ungestellt mit Laterne; Hebel sichtbar, nicht bedienbar: „Diese stellst du draußen.“ |
| Finder Card | — | Eingefrorene Mini-Weiche (5 Hebelstellungen) als Ikone. |

**Wann gezeigt:** Reise A ab A3 (immer), Reise C in C4 (einzelne Weiche), Reise B **nicht** (eine Kündigung ist keine Weiche des Nutzers — Schutzregel 3.1.4).

**Ehrlichkeitsregel:** Die Weiche illustriert, dass *Richtungen* sich verzweigen; sie behauptet nicht, dass eine Entscheidung alle späteren Ereignisse verursacht. Die Mini-Erklärung sagt das ausdrücklich („Keine einzelne Weiche verbaut ein Leben“).

### 5.2 Darstellung 2 — Der Musterkreislauf mit Ausstieg

**Idee [I2].** Fünf Knoten im Ring: **Impuls** („Ich will Nein sagen“) → **Druck** („Ich will niemanden enttäuschen“ — Grund aus A6) → **Ja** → **Erleichterung** (kurz) → **Preis** („Verbogen, später Frust“) → zurück zu Impuls. Zwischen *Druck* und *Ja* sitzt ein **Ausstieg**: ein kleines Gleis nach außen mit Laterne, beschriftet mit der Brücke („Ich melde mich morgen“).

**Verhalten.** Tipp auf einen Knoten → eine Zeile Erklärung in Nutzerworten (aus Fakten). Jede in A7 erlebte Wiederholung füllt den Ring um ein Segment („3 von 5 Runden“). Tipp auf **Ausstieg** → Ring öffnet sich an dieser Stelle, die Brücken-Kacheln (A9) erscheinen darunter. Reduced motion: Segment-Füllung springt.

**Wann gezeigt:** Reise A, wenn `facts.repetition ∈ {öfter, muster}` — der Kreislauf ersetzt dann in A8/A9 das Stellwerk als Hintergrund. Nicht bei `einmalig`, nicht bei `kompromiss` (dort gibt es keinen Kreislauf zu verlassen), nie in B/C.

### 5.3 Darstellung 3 — Die Karte von oben (Vogelperspektive)

**Idee [G7].** Die Kamera fährt hoch: das Stellwerk wird zur Karte. **„Du bist hier“** (goldener Punkt), das bisherige Gleis als Linie, und **neue Stationen** als leuchtende Punkte, beschriftet mit dem, was der Nutzer benannt hat (Reise B: das Gefehlte — „Hier gibt es: Menschen“; Reise C: der Wert; Reise A: die Perspektiven aus A8).

**Verhalten.** Tipp auf eine Station → eine Zeile („Eine Möglichkeit, in der Sinn vorkommt. Anschauen ist nicht entscheiden.“); gewählte Station wird als `facts.moeglichkeiten` übernommen; Kachel „Nicht jetzt“ immer sichtbar. Keine Linien zu den Stationen werden automatisch gezogen — der Nutzer zieht nichts, er **schaut**. Astro-Baustein erscheint unter der Karte als Kalkulationspanel (fest gelabelt).

**Wann gezeigt:** Reise B (B6), Reise C (C5), Reise A (A8, nur wenn kein Kreislauf aktiv). Nie im Krisenmodus, nie vor einer ersten benannten Erkenntnis.

### 5.4 Entscheidungsregel: Welche Darstellung wann

```mermaid
flowchart TD
  F[Fakten liegen vor] --> D{Abweichung?}
  D -- keine --> N0[keine Visualisierung · Abschluss anbieten]
  D -- ja/unklar --> W[Weiche · Einzelmoment A3-A5]
  W --> R{Wiederholung?}
  R -- einmalig / weiß nicht --> K2{Kompromiss?}
  R -- öfter / Muster --> C[Kreislauf mit Ausstieg A8-A9]
  K2 -- ja --> L[Weiche mit Laterne · kein Reframing]
  K2 -- nein --> M[Karte von oben A8]
  C --> B[Brücke]
  L --> B
  M --> B
  X[Krisensignal] --> S[safety_notice · keine Visualisierung]
```

### 5.5 KI-Erklärung vs. kuratierte Interaktion

| Kriterium | Kurze KI-Erklärung | Kuratierte Interaktion |
|---|---|---|
| Personalisierung | hoch (Nutzerworte) | mittel (Beschriftung aus Fakten) |
| Risiko falscher Deutung | real (Überinterpretation, erfundene Fakten) | gering (nur Fakten, feste Logik) |
| Kosten/Latenz | 0,03–0,07 $, 3–8 s | 0, sofort |
| Verständnis | passiv gelesen | aktiv erzeugt (Self-Explanation) |
| Barrierefreiheit | Text ist leicht zugänglich | braucht Textäquivalent |
| Studio-Steuerbarkeit | über Prompt/Regeln | über Szenen-Pools und Beschriftungsregeln |

**Empfehlung:** Interaktion führt, KI beschriftet. KI-Erklärtexte nur (a) auf Wunsch („Erklär mir das“), (b) als Spiegelzeile nach Freitext, (c) für die Finder Card — und immer mit der Prüffrage „Trifft es?“ dahinter. [H: Experiment E1/E3 in Kap. 9.]

### 5.6 Wireframes (textuell)

```
EINSTIEG (mobil, 390 px)                      FRAGE (A6)
┌──────────────────────────┐                  ┌──────────────────────────┐
│ ○─○─○─○─○  Fakt           │ Pfad, 5 Lichter   │ ●─●─○─○─○  Warum          │
│                          │                  │                          │
│ KENNST DU DAS?           │                  │ WAS HAT IN DEM MOMENT    │
│ Welche Szene kommt dir   │                  │ ENTSCHIEDEN?             │
│ am nächsten?             │                  │ Es gibt gute Gründe …    │
│ ┌──────────┐┌──────────┐ │                  │ ┌──────────┐┌──────────┐ │
│ │Köln statt││Noch eine │ │ Crystal-Cards     │ │Niemanden ││Konflikt  │ │
│ │Düsseldorf││Aufgabe   │ │                  │ │enttäusch.││vermeiden │ │
│ └──────────┘└──────────┘ │                  │ └──────────┘└──────────┘ │
│ ┌──────────┐┌──────────┐ │                  │ ┌──────────┐┌──────────┐ │
│ │Sonntag   ││Nein ges.,│ │                  │ │Dazu-     ││Keine Zeit│ │
│ │Familie   ││Ja gemeint│ │                  │ │gehören   ││          │ │
│ └──────────┘└──────────┘ │                  │ └──────────┘└──────────┘ │
│ ┌──────────────────────┐ │                  │ ┌──────────┐┌──────────┐ │
│ │Meine Szene ist anders│ │                  │ │Abgewogen ││Weiß nicht│ │
│ └──────────────────────┘ │                  │ └──────────┘└──────────┘ │
│ ▸ Oder in deinen Worten  │ eingeklappt       │ ▸ Oder in deinen Worten  │
│ Etwa vier Minuten …      │                  │ [Zurück]        [Pause]  │
└──────────────────────────┘                  └──────────────────────────┘

VISUALISIERUNG (A7 Stellwerk)                 ERKENNTNIS (A10)
┌──────────────────────────┐                  ┌──────────────────────────┐
│ ●─●─●─●─○  Mechanik       │                  │ ●─●─●─●─●  Brücke         │
│ WAS PASSIERT, WENN DAS   │                  │ TRIFFT ES?               │
│ ÖFTER PASSIERT?          │                  │ ┌──────────────────────┐ │
│ ┌──────────────────────┐ │                  │ │Ich sage Ja, um nie-  │ │
│ │ „Eine Kollegin bittet│ │ Szene             │ │manden zu enttäuschen.│ │
│ │ dich um ihre Schicht“│ │                  │ └──────────────────────┘ │
│ └──────────────────────┘ │                  │ ┌──────────────────────┐ │
│   ╭──╮ ╭──╮ ╭──╮         │ Hebel 1–3        │ │Ich sage Ja, weil es  │ │
│   │╲ │ │╲ │ │  │  ┄┄┄┄   │ eigenes Gleis     │ │schnell gehen muss.   │ │
│ ━━┷━━┷━┷━━┷━┷━━┷━━━━━━   │ gefahrenes Gleis  │ └──────────────────────┘ │
│   Abstand: 2 Gleise      │ Zähler           │ ┌──────────────────────┐ │
│ [Impuls]   [Erwartung]   │ Äquivalent-Kacheln│ │Keiner davon          │ │
│ [Was wäre bei einem Nein]│                  │ └──────────────────────┘ │
│ ▸ Als Text               │ a11y              │  ↓ danach FINDER CARD    │
└──────────────────────────┘                  └──────────────────────────┘

PORTAL (später, Kap. 6)                       ERKENNTNIS-CARD (Epic-Optik)
┌──────────────────────────┐                  ┌──────────────────────────┐
│ Deine Weichen            │                  │ EINE LÜCKE ERKANNT        │
│ ○ ○ ● ○ ● ○ ○  diese Woche│ Lichter, kein    │ Situation: Köln statt …   │
│ Letzte Finder Card  →    │ Streak-Zähler     │ FAKT  Gewollt: Nein …     │
│ Tagesweiche: „Welche     │                  │ ABWEICHUNG Wollen↔Sagen   │
│ Weiche hast du heute     │                  │ WARUM Niemanden enttäusch.│
│ bewusst gestellt?“       │                  │ MECHANIK ╭╮╭╮╭╮╭╮╭╮ (5)   │
│ Astro: Tagesthema (opt.) │                  │ BRÜCKE Wenn … dann …      │
└──────────────────────────┘                  └──────────────────────────┘
```

---

## 6. Produkt- und Navigationssystem, Finder Studio, Portal, Gamification, Astro-Ebene

### 6.1 Informationsarchitektur (mobile-first)

```
/trustbridgefinder (öffentlich)
├─ Einstieg: KI-Hinweis (eine Zeile) · „Kennst du das?" (Reise A) · „Ich wurde gekündigt" (B) · „Ich will etwas verändern" (C)
├─ Reise: Pfad (5 Lichter) · Screen (eine Aufgabe) · Spiegelzeile · Mini-Erklärung · [Zurück] [Pause] [Weiter]
│   └─ „Mehr"-Menü (immer erreichbar): Warum fragen wir das? · Astrologische Perspektive · KI-Hinweis · Hilfe & Krisennummern · Alles löschen
├─ Finder Card: Trifft es? → Card → Kopieren · Erinnern (opt-in) · Astro · Neu · Löschen · [Soft Wall: „Card sichern?" mit „Später"]
└─ Portal (Phase 4, Konto): Deine Weichen (Lichter) · Letzte Cards · Tagesweiche (freiwillig) · Astro-Tagesthema (opt-in) · Daten & Löschung
/admin/finder-studio (geschützt): Module · Reise-Editor (+ Frageprotokoll, Szenen-Pools, Validierungssätze, Visual-Regeln, ai_policy) · Persona · Astro-Regeln · Testmodus (Technik | KI) · Archiv
```

Regeln: 3-Sekunden-Einstieg (erste klickbare Frage ohne Scrollen auf 390 px), eine Aufgabe pro Screen, Freitext eingeklappt, Protokoll-Panel mobil ausgeblendet, Desktop wie V0.1. Navigation ohne Sackgassen: Zurück behält Antworten, Pause behält den Stand (mit Einwilligung), „Alles löschen“ ist nie mehr als zwei Tipps entfernt.

### 6.2 Formel für adaptive Steuerung

| Frage | Antwort |
|---|---|
| **Was entscheidet deterministisch (lokal/PHP)?** | Fakt-Zuordnung bei Kachelwahl; Abweichungs-Tabelle (A5); Verzweigungen (Kompromiss, keine Abweichung, kein Spielraum, Geld-Grenze, „Heute nicht“); Wahl der Visualisierung (5.4); Gates (Fakt vorhanden? Turn-Limit?); Krisen-Override (Signalwörter + Modell-Flag); Validierungssätze aus Schablonen; Stil-Vorgabe je Phase |
| **Wann lohnt eine einzelne KI-Auswertung?** | (a) Freitext liegt vor → Fakt zuordnen + eine Spiegelzeile; (b) Nutzer tippt „Erklär mir das“; (c) Finder-Card-Formulierung in Nutzerworten; (d) Astro-Perspektive mit ASTRO-FAKTEN + Regeln. Richtwert ≤ 3 Aufrufe je Reise, 0 ist der Normalfall bei reinen Kachelantworten |
| **Welche Zustandsfelder werden gespeichert?** | `facts` (Nutzer), `texts` (Freitext, nur mit Einwilligung serverseitig), `derived` (Regeln), `hypotheses` (KI, mit Grundlage/Sicherheit), `flags`, `progress`, `visual_state`, `validation`, `bridge_plan`, `consents`, `ai_usage` |
| **Wann fragt die App nicht weiter?** | Keine Abweichung → Abschluss anbieten; zwei „Weiß nicht“ in Folge → Beobachtungs-Brücke; Kompromiss → kein Reframing; „Heute nicht“ → Brücke; Krise → Stopp; Turn-Limit; Nutzer tippt Pause |

```mermaid
stateDiagram-v2
  [*] --> A0_Szene
  A0_Szene --> A1_Ort
  A1_Ort --> A2_Wollen
  A2_Wollen --> A3_Weiche
  A3_Weiche --> A4_Getan
  A4_Getan --> Regel_Abweichung
  Regel_Abweichung --> A5_Abweichung: wollen-sagen | sagen-tun | wollen-tun | unklar
  Regel_Abweichung --> A5b_Einklang: keine
  A5b_Einklang --> A10b_Card: fertig
  A5b_Einklang --> A6_Warum: prüfen
  A5_Abweichung --> A2_Wollen: ändern
  A5_Abweichung --> A6_Warum
  A6_Warum --> A7x_Gleislage: kein Spielraum
  A6_Warum --> A7_Stellwerk
  A7_Stellwerk --> A7b_Mechanik
  A7b_Mechanik --> A9_Bruecke: Kompromiss
  A7b_Mechanik --> A8_VonOben
  A7x_Gleislage --> A10b_Card: kein Spielraum
  A7x_Gleislage --> A9_Bruecke
  A8_VonOben --> A9_Bruecke
  A9_Bruecke --> A10a_TrifftEs
  A10a_TrifftEs --> A7b_Mechanik: keiner davon
  A10a_TrifftEs --> KI_Card: ≤1 Aufruf
  KI_Card --> A10b_Card
  A10b_Card --> [*]
  state Freitext_Pfad {
    [*] --> Krisenpruefung
    Krisenpruefung --> SAFETY: Signal
    Krisenpruefung --> KI_Spiegelzeile: kein Signal
  }
```

### 6.3 Anonymer Sofortstart vs. verpflichtende Registrierung

| Kriterium | Anonymer Sofortstart | Pflicht-Registrierung | Befund |
|---|---|---|---|
| Reibung | minimal; Finder Card in < 5 Min | Login Wall vor dem Wert — NN/g: „rarely have seen users more annoyed“; Baymard: 18–19 % Checkout-Abbruch wegen Kontozwang (E-Commerce-Kontext) | belegt/plausibel (R2) |
| Datenschutz | Datenminimierung und Privacy by default (Art. 5 Abs. 1 lit. c, Art. 25 Abs. 2 DSGVO) sprechen für anonym; pseudonyme Testgespräche bleiben personenbezogen | Konto = Identität + Verlauf = höheres Schutzbedürfnis | belegt (R6) |
| Retention | lokaler Stand ist fragil: Safari löscht Script-Speicher nach 7 Nutzungstagen ohne Interaktion (WebKit) | Konto ermöglicht Wiederfinden, Erinnerungen, Portal | belegt (R2) |
| Portal-Ziel | braucht später ein Konto | sofort erfüllt | — |
| Vorbilder | Duolingo: Lektion vor Profil, Sign-up nach hinten ≈ +20 % DAU, Soft Walls mit „Later“ statt „Discard my progress“; TurboTax: Persona-Wahl vor Registrierung | Headspace 2022: Paywall vor erster Session (kritisiert) | plausibel (R1/R2/R3) |

**Empfehlung:** Anonymer Sofortstart → **Soft Wall nach der Finder Card** („Card sichern und später wiederfinden?“ mit gleichwertigem „Später“) → zweite Soft Wall bei Wiederkehr → **Hard Wall nur für Portal-Funktionen** (Verlauf, Tagesweiche, Astro-Profil dauerhaft). Zwischenstufe: „Wiederfind-Link per E-Mail“ ohne Konto. Lokaler Fortschritt nur mit Schalter „Fortschritt auf diesem Gerät merken“ (Standard aus, § 25 TDDDG) plus Hinweis, dass er nach ~7 Tagen Inaktivität verloren gehen kann. Anonyme Server-Sessions (Testphase, Einwilligung) bekommen eine feste Löschfrist. Die vom Gründer gewünschte Login-/Fortschrittsfunktion bleibt vollständig — sie kommt nur **nach** dem Wert, nicht davor.

### 6.4 Finder Studio — Ergänzungen zum Architekturplan

Zusätzlich zu Architektur Abschnitt 4: je Frage ein **Frageprotokoll** (Zweck, Fakt-Schlüssel, Speicherung, „Warum fragen wir das?“-Einzeiler — GOV.UK-Prinzip), **Szenen-Pools** je Bereich für das Stellwerk, **Validierungssätze** (Schablonen für „Trifft es?“), **Visual-Regeln** (welche Darstellung wann, Beschriftungsquelle), **ai_policy** je Frage (never / on_free_text / on_request / at_closing), **Stop-Regeln**. Testmodus zeigt Technik (Regeln, Gates, Verzweigung, Visual) getrennt von KI (Spiegelzeile, Card, rationale) — genau so, wie es das Finder Lab heute mit simulierter KI vormacht. Archiv mit Löschfrist unverändert.

### 6.5 Personalportal (Phase 4) — Entwicklungspfad ohne Zwang

- **Deine Weichen:** Lichter je bewusst gestellte Weiche (Selbstbericht), **kumulativ, nie verfallend**; keine Streak-Zahl.
- **Tagesweiche (freiwillig, Default aus, Rhythmus wählbar: wöchentlich/täglich):** eine Frage („Gab es heute eine Weiche?“) mit der Kachel **„Keine – auch gut“ an erster Stelle**, optional ein Satz — kein Push ohne Opt-in, Volumen hart begrenzt („protect the channel“), nach Inaktivität freundlich verstummen. Cards werden als Journal gezeigt, nicht gezählt (Review-Befund: Lichter je Selbstbericht laden ein, Weichen zu produzieren).
- **Wiedereinstieg mit Abruffrage** (Spacing/Retrieval): „Was war dein Muster?“ — Satz wählen, dann Card ansehen.
- **Erkenntnisse & Cards**, **Astro-Tagesthema** (nur mit Profil-Einwilligung, Label), **Daten & Löschung** (Export, Löschen, Einwilligungen widerrufen an derselben Stelle).
- **Lernpfade/Videos** („Die Mechanik | Das Gold im Dunkeln“) als Knoten „Vertiefen oder überspringen“.

### 6.6 Gamification — was bleibt, was geht

| Erlaubt (SDT-konform, Brief §13) | Verboten / nicht übernehmen |
|---|---|
| Pfad-Lichter als Orientierung; Meilenstein-Animation **einmal** pro Station (klein, mit Reduced-Motion-Fallback); kumulative Lichter im Portal; Erkenntnis-„Splitter“ (Shards) als **gesammelte Einsichten**, nie als Währung [OG]; Panther als ruhiger Begleiter; Rückkehr ohne Kommentar; freiwillige Rhythmen | Streaks, Streak-Wetten, bezahlte Reparatur, Ligen/Leaderboards, XP, Hearts/Energy, Gems, tägliche Pflicht, Schuld-Notifications, Fake-Verknappung, FOMO, Auto-Opt-in in soziale Features, trauriges Maskottchen |

Begründung: Sailer & Homner (kleine, instabile Effekte), Hanus & Fox (Badges/Ranglisten schaden), Silverman & Barasch (Streak-Bruch demotiviert), Duolingos eigene Rückbauten, Brief §13. **[OG]** Ben hat Streaks und Shards als gewollte Richtung benannt; der Blueprint empfiehlt Shards als Einsichts-Sammlung und **keine** Streaks — Entscheidung Kap. 10, Frage 6.

### 6.7 Astro-Ebene im Produktsystem

- **Zugang:** Perspektive-Phase (A8/B6/C5) als Kachel; jederzeit über „Mehr“ auf Nutzerwunsch ab Phase Warum **[OG: auch früher?]**; nie Einstieg, nie Krise, nie Verlust-Pfad ohne Nachfrage.
- **Einwilligung:** eigener Screen, drei Felder (Datum, Zeit optional, Ort), ausdrücklich, widerrufbar an derselben Stelle; Geburtsdaten aus Freitext werden **nicht** übernommen; verschlüsselte Speicherung (`astro_profiles`), Löschung mit der Session oder auf Wunsch.
- **Rahmung (Wortlaut [OG]):** „Astrologische Perspektive — ein Reflexionsangebot, keine Vorhersage. Berechnet aus deinen Geburtsdaten, gedeutet nach der Trustbridge-Methodik.“ Optionaler Zusatz, ehrlich und ohne Abwertung: „Astrologie ist keine Wissenschaft; viele Menschen nutzen sie als Spiegel.“
- **Berechnung:** `web/astro/` (verifiziert 28/28), Placidus + Whole Sign; KI deutet nur nach Studio-Regeln (`rule_refs`).
- **Datenschutz:** ob ein Astro-Profil „weltanschauliche Überzeugungen“ (Art. 9) offenbart, ist ungeklärt — die gesonderte ausdrückliche Einwilligung deckt beide Lesarten (R6).

### 6.8 Recht, Datenschutz, Sicherheit — Konsequenzen (R6, alles „fachlich zu prüfen“)

| Thema | Befund | Konsequenz im Produkt |
|---|---|---|
| **KI-VO Art. 50** (gilt seit 2.8.2026, Omnibus hat Transparenzpflichten nicht verschoben) | Information „klar und erkennbar spätestens bei der ersten Interaktion“, barrierefrei; Anbieterstellung von Trustbridge wahrscheinlich → Art. 50 Abs. 2 (maschinenlesbare Kennzeichnung) prüfen | KI-Hinweis als Zeile im Einstieg (nicht blockierend) + dauerhaftes „KI“-Label an KI-Zeilen; Wiederholung im Datenschutzhinweis |
| **KI-VO Art. 5** (seit 2.2.2025) | Verbot manipulativer Techniken und Ausnutzung wirtschaftlicher Lage — Nutzer nach Jobverlust sind diese Gruppe | Kap. 6.6-Verbotsliste ist auch Compliance |
| **DSGVO Art. 9** | Freitext zu Stress/Depression, systematisch KI-ausgewertet, ist mit hoher Wahrscheinlichkeit Gesundheitsdatum (WP29 2015: „mood diary“; EuGH-Linie) | **Ausdrückliche Einwilligung vor der ersten KI-Auswertung von Freitext**; Reise muss ohne Freitext vollständig funktionieren (Kopplungsverbot); DSFA erwägen |
| **Pseudonyme Testgespräche** | personenbezogen (ErwG 26, EDPB 01/2025) | Löschfrist ist Pflicht; Zugriff nur Studio; Nachweis der Einwilligung (Zeitstempel, Textversion) |
| **§ 25 TDDDG** | localStorage ist erfasst; „unbedingt erforderlich“ eng | Schalter „Fortschritt auf diesem Gerät merken“ (Standard aus) + Löschtaste — im Lab umgesetzt |
| **Alter** | Art. 8: 16 Jahre in DE; Gesundheitsdaten, Krisen, Jobverlust → 18+ risikoärmer | Selbstauskunft 18+ im Einstieg; unter 18 → 116 111 / 147 |
| **Anthropic** | DPA mit SCC vorhanden; Standard ohne Retention, **aber „Covered Models“ (Fable 5.1, Mythos 5.1, Fable 5, Mythos 5) erzwingen 30-Tage-Retention und sind nicht ZDR-fähig**; `claude-opus-5-5` ist dort nicht gelistet; DPF-Status: Rechtsmittel anhängig | Modellwahl bleibt bei Opus 5.5; Retention-Hinweis im Datenschutztext; ZDR/EU-Residency mit Anthropic klären; keine PHI in JSON-Schemas |
| **BFSG** | erfasst Verbraucherverträge über Website/App; Kleinstunternehmen bei Dienstleistungen ausgenommen | Kostenloser Finder vermutlich nicht erfasst, bezahltes Portal ja — prüfen; WCAG 2.2 AA ohnehin Ziel |
| **Heilkunde-Grenze** | HeilprG/PsychThG: Krankheitsbezug ist die Trennlinie | Keine Diagnose, keine Linderungsversprechen, Verweis bei Krankheitsanzeichen; Wording-Guidelines für KI-Ausgaben |
| **Krisennummern (verifiziert 12.10.2026)** | DE: Telefonseelsorge 0800 111 0 111 · 0800 111 0 222 · 116 123; Nummer gegen Kummer 116 111; Hilfetelefon Gewalt gegen Frauen 116 016; Info-Telefon Depression 0800 33 44 533; krisenchat.de (u25, Kontaktweg vor Einbau prüfen); Notruf 112. AT: 142, 147. CH: 143, 147. International: findahelpline.com | Fester `safety_notice` mit Länderschalter, `tel:`-Links, Zielgröße ≥ 24 px, keine Animation; Reihenfolge: akute Gefahr → reden → unter 25 → unter 18 → Gewalt |
| **Jobverlust-Hinweis (DE)** | Fakten belegt: § 4 KSchG 3 Wochen; § 38 SGB III 3 Monate/3 Tage; § 159 Sperrzeit 12 Wochen bei Eigenkündigung/Aufhebungsvertrag, 1 Woche bei verspäteter Meldung; §§ 142/143/147/149 Anspruch, Dauer 6–24 Monate, 60/67 %; „Neue Grundsicherung“ seit 1.7.2026. **Gründerrede:** „ein Jahr Geld“ gilt nur unter 50 mit ≥ 24 Versicherungsmonaten; „besser gekündigt werden“ im Kern richtig, aber eine **angeregte/provozierte Kündigung gilt der BA als Beteiligungssachverhalt (Sperrzeit)** | B1 als fester Server-Text mit §-Fußnoten (Entwurf in Anhang A / R6), Stand-Datum, „kein Rechtsrat“, Verweis Agentur für Arbeit · Gewerkschaft · Fachanwalt; **nie** „Lass dich lieber kündigen“ |

### 6.9 Barrierefreiheit (WCAG 2.2 AA als Ziel)

Tastatur (2.1.1) für Kacheln, Hebel (Radiogroup), Statements; Fokus sichtbar (2.4.7) und nicht verdeckt (2.4.11); Kontrast 4,5:1 Text / 3:1 UI-Zustände (1.4.3/1.4.11) — auf Glasflächen je Zustand prüfen; Zielgröße ≥ 24 px, im Finder ≥ 44 px (2.5.8); keine Zeitlimits (2.2.1); Bewegung pausierbar/abschaltbar via `prefers-reduced-motion` (2.3.3); jede Visualisierung mit Textäquivalent; Spiegelzeilen `aria-live`. Das Finder Lab setzt diese Punkte prototypisch um (Kap. 7.5).

---

## 7. Technischer Delta-Check gegen die vorhandene Architektur

Grundlage: tatsächlicher Repo-Stand 12.10.2026 (`TRUSTBRIDGE_FINDER_ARCHITEKTUR.md`, `web/resources/finder/*`, `web/astro/*`, `web/resources/js/Pages/TrustbridgeFinder.vue`, `Components/Finder/*`, `web/config/finder.php`, `app/Console/Commands/FinderModels.php`). Keine Produktcode-Änderung ist Teil dieses Dokuments; der Prototyp (7.4) ist getrennt.

### 7.1 Behalten (unverändert tragfähig)

| Baustein | Warum er bleibt |
|---|---|
| Schichtenmodell Sicherheitskern → Methodik (Studio) → Fakten/Astro → Engine → Darstellung | Trägt die Click-first-Reise genauso wie den Dialog; „Rules first, KI innerhalb der Regeln“ ist exakt die Formel aus 4.0 |
| `FinderEngine` mit einem Claude-Aufruf pro Turn, Structured Output `finder-turn.schema.json` | Wird seltener gerufen (0–3× je Reise statt je Schritt), bleibt aber der einzige KI-Pfad |
| Komponenten-Registry `components.json` als einzige Quelle für Vue + PHP-Enum | Neue Bausteine (7.2) werden dort registriert, nicht an der Registry vorbei |
| Modul-Schemas (journey/persona/astro_rules), Seeds A und B, Persona mit fünf Stilen | Reisen A/B/C sind Instanzen von `journey`; Persona-Stile bleiben (warm für Verlust-Pfad, sachlich für Brücke) |
| Astro-Berechnung `web/astro/chart.mjs` (28/28), beide Häusersysteme, `astro_consent`/`astro_perspective` | Zugang über A8/B5/C5 und „Mehr“-Menü; Berechnung unverändert |
| `config/finder.php` (Modell, Effort, Preise, Retention), `finder:models` | Modell bleibt konfigurierbar; Testmodus-Kosten weiterhin je Aufruf |
| Finder V0.1 (`TrustbridgeFinder.vue`, `finderConfig.js`, `useFinder.js`, `FinderCrystalCard.vue`) | Bleibt als statischer Modus und Fallback ohne API; wird nicht umgebaut |
| Sicherheitskern-Entwurf, Krisenprotokoll serverseitig + Modell-Flag | Unverändert; weiterhin Entwurf bis Freigabe |
| Admin-Schutz, AdminLayout, Audit-Log, Snapshot-Prinzip für Studio | Unverändert |

### 7.2 Ergänzen (neu, additiv)

| Ergänzung | Ort | Begründung |
|---|---|---|
| Bausteine `example_cards` (Kennst-du-das), `rail_switch` (Weiche, Zustände), `switch_yard` (Stellwerk mit Szenen-Pool), `pattern_cycle`, `perspective_map`, `progress_path` (5 Lichter), `validation_check` („Trifft es?“), `info_card` (fester Hinweis mit Statuspunkten), `mirror_line` (eine Spiegelzeile) | `components.json`, Vue unter `Components/Finder/` | Kap. 4/5; alle in bestehender Glas-Optik; `ai_may_use`: `rail_switch`/`switch_yard`/`pattern_cycle`/`perspective_map`/`progress_path`/`info_card`/`validation_check` = **false** (nur Engine setzt sie, KI liefert höchstens Beschriftungen), `example_cards`/`mirror_line` = true |
| `journey`-Schema: je Frage `visual` (welcher Baustein, Beschriftungsquelle), `deterministic: true`, `ai_policy` (`never` / `on_free_text` / `on_request` / `at_closing`), `scene_pool` je Domäne (für das Stellwerk), `validation_statements` (Satzschablonen für „Trifft es?“), `stop_rules` | `module-journey.schema.json` | 4.0 Regeln „KI nur, wo sie etwas kann“ und „Wann die App aufhört“ |
| `derived`-Block im Session-State (Abweichung, Wiederholung, Kompromiss) + `visual_state` + `validation` | `session-record.schema.json`, `turn-record.schema.json` | Regelbasierte Ableitungen getrennt von KI-Hypothesen speichern (Festlegung 0.1.6) |
| Engine-Modus `local_first`: Kachel-Turns werden ohne API verarbeitet (Fakt setzen, Regel anwenden, nächsten Screen bestimmen); KI-Turn nur nach `ai_policy` | `FinderEngine` | Kosten, Latenz, Verlässlichkeit |
| Klientseitiger Zustand ohne Konto (localStorage/IndexedDB) mit „Alles löschen“; Server-Speicherung nur mit Einwilligung | Vue-Composable | Anonymer Sofortstart (Kap. 6, R2) |
| Szenen-Pools und Validierungssätze im Studio pflegbar | Studio-Formulare | Ben steuert Beispiele und Prüfsätze ohne Code |
| Metrik-Ereignisse (Kap. 9): Screen-Zeiten, Abbruchstelle, Validierungsergebnis, API-Aufrufe je Reise — aggregiert, ohne Freitext | Engine/Frontend, einwilligungsbasiert | Lernendes System mit menschlicher Freigabe |

### 7.3 Ändern (Richtung, nicht Umbau)

| Änderung | Vorher | Nachher |
|---|---|---|
| Rolle der KI im Flow | Standard: jeder Schritt ein Claude-Aufruf (`FinderTurn` je Turn) | Standard: deterministische Click-Schritte; Claude bei Freitext, auf Wunsch, zum Abschluss (`ai_policy`). Die FinderTurn-Struktur bleibt |
| Fortschrittsanzeige | Phasen-Pills im Protokoll-Panel | Zusätzlich `progress_path` (Lichter) oben; Pills bleiben im Protokoll |
| „Dein Protokoll“-Panel | Immer sichtbar (Desktop) | Mobil eingeklappt, auf Wunsch; Desktop wie bisher |
| Abweichung | Vom Nutzer gewählt (V0.1 Kachel) | Deterministisch berechnet und **gezeigt**, Nutzer bestätigt/korrigiert (A5) |
| Abschluss | Finder Card direkt | `validation_check` vor der Card |
| Phase-1-Reihenfolge (Architektur 11) | 1a Engine/Dialog → 1b Astro → 1c UI/Studio → 1d Härtung | **Vorschlag [OG]:** M1 Click-first-Reise A mit Weiche + Mock/0-API, M2 Engine-Anbindung (Freitext, Card), M3 Astro-Zugang, M4 Studio/Archiv, M5 Härtung — siehe Kap. 8 |

### 7.4 Ausdrücklich noch nicht bauen

Streak-Zähler, Ligen, tägliche Pflicht-Erinnerungen; Konto-Zwang; Community; Mehrsprachigkeit der Module; Streaming; Swiss Ephemeris; grafischer Flow-Builder; KI-generierte Szenen im Stellwerk (erst nach Experiment E3); automatische Prompt-Anpassung aus Nutzungsdaten.

### 7.5 Prototyp „Finder Lab“ (reversibel, nur lokal)

Gebaut am 12.10.2026 nach der Ergänzungsfreigabe („reversibler, lokal testbarer UX-Prototyp“). **Kein Produktcode**: Finder V0.1 unverändert, keine Migration, keine Dependency, keine Änderung am Markenbild. Erreichbar nur bei `APP_ENV=local` unter `http://127.0.0.1:8001/finder-lab`.

**Fußabdruck (vollständig):**

| Datei | Zweck |
|---|---|
| `web/resources/js/Pages/FinderLab.vue` | Seite: kompakter Einstieg, KI-Hinweis + Speicher-Opt-in, Pfad-Lichter, alle Screens A0–A10b, Sicherheits-Screen, Technik-Spalte, Finder Card (Epic-Optik) |
| `web/resources/js/Components/FinderLab/labJourneyA.js` | Reise A als Daten + pure Funktionen: Szenen, Kacheln, Szenen-Pools je Bereich, Mini-Erklärungen, Abweichungs-Tabelle, Validierungssätze, Finder-Card-Aufbau, Spiegelzeilen, Demo-Krisenmuster, fester Sicherheitstext |
| `web/resources/js/Components/FinderLab/useLabEngine.js` | Mock-Engine: Screen-Zustandsmaschine, Fakten/Ableitungen/Flags getrennt, Regelprotokoll, simulierte KI (0 $, geschätzte Tokens/Kosten), Speicherung nur mit Opt-in, Löschen |
| `.../FinderLab/RailSwitch.vue` | Die Weiche (SVG, Hebel, Licht folgt der Kurve, Radiogroup, `aria-live`) |
| `.../FinderLab/SwitchYard.vue` | Das Stellwerk (5 Weichen, Abstandszähler, Alternative „bei Impuls“, Textäquivalent) |
| `.../FinderLab/PatternCycle.vue` | Musterkreislauf mit Ausstieg-Laterne |
| `.../FinderLab/PerspectiveMap.vue` | Karte von oben mit Stationen |
| `.../FinderLab/ProgressPath.vue` | Fünf Lichter als Orientierung |
| `.../FinderLab/README.md` | Start, Test, Rückbau |
| `web/tests/js/shot-finder-lab.mjs` | Klick-Durchlauf, Pfade, Mobil, Tastatur, Reduced Motion, Screenshots |
| `web/routes/web.php` | **eine** Route im `environment('local')`-Block |

**Rückbau:** Ordner `Components/FinderLab/` und `Pages/FinderLab.vue` löschen, Routenblock entfernen, optional das Testskript — nichts sonst ist berührt.

**Was der Prototyp beantwortet (Erproben → Testen):**

| Frage | Befund |
|---|---|
| Lässt sich Reise A vollständig **ohne KI** führen? | Ja. 12 Screens im Standardpfad (A1 nur bei eigener Szene), drei Visualisierungen, sieben Pfade (Standard, bewusster Kompromiss, keine Abweichung, nicht gestellt, schon gestellt/kein Spielraum = Gleislage, Korrektur, Krise) laufen regelbasiert; die simulierte KI wird nur bei Freitext **mit Einwilligung** und für die Card aufgerufen (im Standardlauf: **1 simulierter Aufruf**, 0 $). |
| Tragen Weiche und Stellwerk als Interaktion? | Technisch ja: SVG ohne Bibliothek, Licht folgt der Strecke, Hebel kippen, Abstandszähler zählt, Alternative als zweite Spur; Reduced Motion springt. Ob sie *psychologisch* tragen, entscheidet Nutzertest T2 (Kap. 9). |
| Funktioniert „Trifft es?“ als Prüfung statt Aha? | Technisch ja (drei Sätze in Person-×-Situation-Form, rotiert; „Keiner davon“ springt zur Mechanik zurück; Ausnahme-Feld). Validität offen → T2, E3. |
| Mobile-first in der Glas-Optik? | 390 px: zwei kompakte Kachelspalten, kein horizontaler Überlauf (Seite und Bühne), Radios 74 px hoch, erste Frage ohne Scrollen sichtbar. **Abweichung von V0.1:** kompaktere Kacheln auf Mobil — bewusst als Experiment, Entscheidung Ben (Prizes-Regel betrifft `/prizes`; das Lab ist eigenständig). |
| Barrierefreiheit? | Tastatur: Tab → Kachel → Enter wählt (`aria-pressed=true`); Weiche per Pfeiltaste; Radiogroups; Spiegelzeilen `aria-live`; Textäquivalente für Stellwerk; Reduced-Motion-Pfade geprüft. Kontrast des KI-Hinweises war zu schwach → korrigiert. |
| Rechtliche Hinweise im Flow? | KI-Hinweis vor der ersten Interaktion, Speicher-Opt-in (§ 25 TDDDG), Freitext-Hinweis auf Einwilligung, Sicherheits-Screen mit DE/AT/CH-Nummern (als **Demo** gekennzeichnet; im Produkt serverseitig). |

**Automatisierter Testlauf (12.10.2026, letzter Stand nach den Review-Korrekturen; Chrome headless, `node tests/js/shot-finder-lab.mjs`):**

| Prüfpunkt | Ergebnis |
|---|---|
| Durchlauf A0 → A10b (Szene Köln → A2 direkt, Nein gewollt, Erwartung gestellt, gemacht, niemanden enttäuschen, 5 Weichen, öfter, zurückgehalten, Perspektive, Bedenkzeit, Satz gewählt) | ✅ Card „Eine Lücke erkannt“, Zeilen Fakt · Abweichung · Warum · Mechanik · Perspektive · Brücke, Mini-Weiche, 5 Lichter |
| Alters-Selbstauskunft als Gate, KI-Hinweis, Speicher-Opt-in | ✅ Weiter erst nach „mindestens 18“ |
| Abweichung berechnet | ✅ „Zwischen deinem Wollen (Düsseldorf) und dem, was du gesagt hast (Köln), liegt die Lücke.“ |
| Stellwerk | ✅ Szene aus Pool „freunde“, neutrale Zählung „4× Erwartung · 1× Impuls“, Mini-Erklärung nach 3. Weiche, „Dein Gleis zeigen“ |
| Kreislauf statt Karte bei „kommt öfter vor“ | ✅ |
| Wenn-Dann-Vorlage aus Brücke | ✅ „mich jemand um etwas bittet“ |
| „Trifft es?“ — drei Sätze, im Muster verschieden | ✅ |
| Pfad bewusster Kompromiss | ✅ A7b → direkt A9, „Dabei bleiben“ an erster Stelle |
| Pfad kein Spielraum (A6) | ✅ A6 → A7x (Gleislage) |
| Pfad schon gestellt (A3) | ✅ A3 → A7x; Card „Gleislage erkannt“; Abweichung „Hier gab es keine eigene Weiche – die Lage war vorgegeben. Das ist Gleislage, kein Muster.“; Brücke „Heute nichts zu stellen. Hinschauen reicht.“ |
| Krisen-Demo über Freitext (mit KI-Einwilligung gesetzt) | ✅ Sicherheits-Screen, 5 Kontaktblöcke (112 · Telefonseelsorge inkl. 116 123 · U25/U18 · 116 016 · AT/CH), Text verworfen |
| Technik-Spalte | ✅ zwei Spalten, 1 simulierter Aufruf, Kosten 0,00 $ |
| Mobil 390 px | ✅ kein Überlauf, 2 Spalten (162 × 225 px), erste Kachel beginnt bei 675 px (Frage sichtbar, Kacheln angeschnitten → Hero mobil noch flacher machen [H]), Stellwerk-Buttons 74 px |
| Tastatur / Reduced Motion | ✅ Enter wählt Kachel, Pfeiltaste stellt Weiche |
| JS-Fehler / Klick-Warnungen | keine |
| Zeit bis Abweichung (skriptgesteuert, mit Wartezeiten) | 10,2 s — kein Nutzerwert, nur Nachweis der Kürze des Pfads (4 Tipps bis zur Abweichung) |

**Beim Testen gelernt (nicht Produkt-, sondern Testbefunde):** Der Cookie-Banner (`localStorage.cookie_consent`) und der fixe Seitenkopf fangen Headless-Klicks ab, wenn Elemente am oberen Viewport-Rand liegen; das Testskript setzt deshalb den Consent und zentriert Elemente. Für echte Nutzer ist das kein Problem, für künftige Tests eine Regel.

**Bekannte Grenzen des Prototyps:** KI nur simuliert (deterministische Texte); Krisenerkennung nur Demo im Browser; keine Astro-Berechnung angebunden (Stelle markiert); Reisen B und C nicht gebaut; Speicherung nur lokal; Texte sind Platzhalter in Bens Richtung; die Kachel-Proportionen auf Mobil weichen von V0.1 ab [OG]; der kompakte Einstieg könnte auf dem Handy noch flacher werden (Hero belegt ~⅓ des ersten Bildschirms) [H].

### 7.6 Agenten im Forschungs-Workflow statt im Produkt

Im Produkt bleibt es bei **einer** Engine ohne Agenten-Framework. Agenten lohnen sich im **Entwicklungsprozess**: parallele Recherche (dieser Auftrag: R1–R6), getrennte Fachreviews (UX, Compliance, CRO, Marke, Technik), Testskript-Generierung, Auswertung anonymisierter Testgespräche für Studio-Vorschläge (mit menschlicher Freigabe).

---

## 8. Zwei Varianten: Lean Wow MVP vs. Vision / 12 Monate

Beide Varianten bauen auf der freigegebenen Architektur (Festlegungen 0.1) und verändern **nicht** die Methodik. Aufwände sind grobe Planungsrahmen (so akzeptiert am 12.10.2026), keine Zusagen; sie setzen voraus, dass Ben Texte, Szenen-Pools und Validierungssätze parallel im Studio pflegt.

### 8.1 Lean Wow MVP — „in wenigen Schritten tatsächlich erlebbar“

| Schritt | Inhalt | Abhängigkeit | Rahmen | Entscheidungs-Gate |
|---|---|---|---|---|
| **M0 (erledigt)** | Finder Lab: Reise A click-first mit Weiche, Stellwerk, Kreislauf, Karte, Trifft-es, Card, Technik-Spalte — lokal, simulierte KI | — | ✅ | Ben spielt das Lab durch (Kap. 10, Frage 1) |
| **M1 Produktreise A ohne API** | Lab-Logik in die Registry überführen (`rail_switch`, `switch_yard`, `pattern_cycle`, `perspective_map`, `progress_path`, `validation_check`, `mirror_line`, `example_cards`); `journey`-Schema erweitern (visual, ai_policy, scene_pool, validation_statements, stop_rules); Seed A aktualisieren; `/trustbridgefinder` rendert Reise A **regelbasiert ohne KI**; V0.1-Pfad bleibt als Fallback | Sicherheitskern-Freigabe (Wortlaut Krisen-Screen) | ≈ 1 Woche | Gate 1: Sichtprüfung Design/Optik (Prizes-Regel), Mobile 390 px, a11y-Checkliste |
| **M2 Engine + erster echter KI-Dialog** | Migrationen, `FinderEngine` (Gates, Prompt mit Caching, Structured Output, Validierung, Speicherung, Retry), `POST /api/finder/turn`, `ai_policy`-Steuerung (Freitext, Card), Einwilligungs-Screens (Test-Speicherung, Freitext Art. 9), Admin-Testseite mit Technik/KI-Spalten und Kosten | API-Key ✅, Modell ✅, Einwilligungstexte (Ben) | ≈ 1 Woche | Gate 2: **erster kostenpflichtiger Aufruf nur nach Bens Go**; 5 Testgespräche unter 1 $ |
| **M3 Reise B (Jobverlust) + Krisen-/Fachgrenzen-Pfade** | B0–B8 inkl. fester Fristen-Infokarte (R6-Entwurf, fachlich geprüft), Verlust-Pfad, Geld-Grenze; zweistufiges Krisenprotokoll serverseitig | Fachprüfung Hinweistext | ≈ 1 Woche | Gate 3: Compliance-Review (Agent + Fachperson) |
| **M4 Astro-Zugang** | `astro_consent`, Profil verschlüsselt, `AstroService` (Node-Aufruf, Cache, Ortsdatenbank), `astro_perspective` nach Studio-Regeln, Einbindung A8/B6 | Rahmungstext (Ben) | ≈ 1 Woche | Gate 4: Deutungen nur mit `rule_refs`; Review durch Ben |
| **M5 Studio-Minimum + Archiv + Härtung** | Formulare für Reise/Persona/Astro-Regeln/Szenen/Validierungssätze, Veröffentlichen, Testmodus, Archiv mit Löschfrist, Purge-Job, Feature-Tests mit gemocktem Claude, Krisentests, Kostenlog | Retention-Entscheidung | ≈ 1–1,5 Wochen | Gate 5: 8 qualitative Tests (Kap. 9) bestanden → externe Tester |

**Ergebnis nach M1–M2:** Ben erlebt die Duolingo-inspirierte Reise A im echten Design, mit echter KI nur dort, wo sie Nutzen stiftet, und sieht in der Technik-Spalte jede Regel und jeden Aufruf. **Ergebnis nach M5:** Reisen A + B produktreif für geschlossene Tester, Astro-Ebene aktiv, Studio bedienbar.

**Aufwandsplausibilisierung (Technik-Review, Anhang B):** M1 realistisch nur mit Lab-Komponenten und Regeln-als-Daten (JS-Interpreter, Journey-Schema, Seed-A-Migration, Golden-Fixtures) → 1,5 Wochen; M2 (sechs Migrationen, Engine mit Caching/Validator/Retry, Einwilligungs-Screens, Admin-Testseite) → 1,5–2 Wochen; M3 plausibel, aber Fachprüfung des Fristen-Texts ist externe Abhängigkeit; M4 (Node-Aufruf aus PHP, Verschlüsselung, **Offline-Ortsdatenbank**) → 1,5 Wochen; M5 (verschachtelte Formulare) → 2 Wochen. **Summe realistisch 7–8 Wochen** — gegenüber dem Architektur-Rahmen „3–4 Wochen“ kommen Click-first-Schicht, Reise B und die Einwilligungs-/Sicherheitsarbeit hinzu. Grober Planungsrahmen, keine feste Dauer (Festlegung 12.10.2026).

### 8.2 Vision / 12-Monats-Roadmap

| Quartal | Ausbau | Abhängigkeiten | Hinweis |
|---|---|---|---|
| **Q1 (bis ~Jan 2027)** | M1–M5; geschlossene Testphase mit 20–30 Testern; Einwilligungs- und Löschkonzept final; erste Auswertung der Metriken (Kap. 9) | Fachprüfung Recht/Datenschutz; Retention-Frist | Keine öffentliche Werbung |
| **Q2** | Reise C (Neuorientierung); Studio vollständig (Versionen-Diff, Zurückrollen, Import/Export, Auswertungen); Portal-Fundament (Konto nach Soft Wall, Session-Übernahme, Cards, Daten & Löschung); Astro-Vertiefung (Radix-Rad, Zyklus-Zeitstrahl) | Konto-System, DSFA | Öffentlicher Start der Reise A möglich |
| **Q3** | Tagesweiche (freiwillig), Wiedereinstieg mit Abruffrage, Lernpfade/Videos als Knoten, Erkenntnis-Splitter; Experimente E1–E3; Mehrsprachigkeit vorbereitet (de/en Texte im Modul) | Content aus „Die Mechanik“ | Gamification-Entscheidung (Kap. 10 F6) umgesetzt |
| **Q4** | Community (getrennt vom Kern), Empfehlungen/Angebote über `offer_ref` (ehrlich, ohne Verknappung), Englisch live, Streaming erst nach stabilen strukturierten Antworten, ggf. externe Wirksamkeitsstudie vorbereiten | Zahlungsanbieter verifiziert (Brief §12) | Keine Wirksamkeitsbehauptung vor Studie |

**Nicht realistisch „morgen fertig“:** Studio-Vollausbau, Portal, Mehrsprachigkeit, Community und jede Wirksamkeitsaussage. **Realistisch in zwei Wochen:** die Reise A, die man Freunden zeigen kann.

### 8.3 Risiken beider Varianten

| Risiko | Wirkung | Gegenmaßnahme |
|---|---|---|
| Kachel-Monotonie | Abbrüche ab Screen 6 | Visualisierungen als Rhythmuswechsel (A3, A5, A7, A8), Spiegelzeilen, Szenen-Pools; Metrik Abbruchstelle |
| „ChatGPT mit Panther-Logo“-Eindruck | Vertrauensverlust | KI nur im Hintergrund, eigene Interaktionen, Technik sichtbar machen, kein Chatfenster |
| Schuldgefühl durch Mechanik-Deutung | Schaden, Abbruch | R4/R10 (Person-×-Situation, Gleislage-Pfad), „Trifft es?“ mit „Keiner davon“ |
| Rechtliche Lücke (Art. 9, Art. 50, Fristen-Text) | Haftung | Einwilligungen, KI-Hinweis, Fachprüfung vor externen Testern |
| Kostenexplosion KI | Budget | `ai_policy`, Caching, Kostenlog, 100-USD-Budgetgrenze im Testmodus |
| Astro als Glaubwürdigkeitsrisiko bei skeptischen Nutzern | Imageschaden | Opt-in, ehrliche Rahmung, nie Default; Test 7 (Kap. 9) |

---

## 9. Evaluationsplan

### 9.1 Qualitätsmetriken (überprüfbar, nicht behauptet)

| Metrik | Definition | Zielwert (Hypothese) | Quelle |
|---|---|---|---|
| **TTFI – Time to first meaningful insight** | Sekunden vom ersten Tipp bis zur sichtbaren Abweichung (A5) | ≤ 90 s Median | Client-Events (Lab misst heute `msToDeviation`) |
| **Verständnisvalidierte Erkenntnis** (verschärft nach Review) | Zählt nur, wenn (a) bei „Trifft es?“ ein Satz gewählt **und** eine spezifische Ausnahme genannt wurde **oder** (b) beim Wiedereinstieg nach ≥ 3 Tagen der eigene Satz von zwei echten Alternativen unterschieden und das „weil“ frei formuliert wird. **Barnum-Kontrolle:** Passung der eigenen Card vs. einer gleich plausiblen Fremd-Card | (a) ≥ 40 %; (b) ≥ 30 %; Fremd-Card-Passung deutlich niedriger als eigene | A10a + Portal-Abruffrage + Kontrollkarte |
| **Schutz-Items Scham/Schuld/Lenkung** | Drei 5-stufige Items am Ende: „Ich fühlte mich bewertet“, „… schuldig“, „… in eine Richtung gelenkt“ | Ø ≤ 2,0; jede Session > 4 wird im Archiv geprüft | Kurzfragebogen |
| **Abgeschlossene freiwillige Brücke** | Anteil Cards mit Wenn-Dann-Plan; Anteil Nutzer, die nach 48 h (opt-in Erinnerung) „gegangen“ oder „bewusst nicht gegangen“ melden | ≥ 70 % Plan; ≥ 30 % Rückmeldung | A9, Opt-in-Follow-up |
| **Abbruchstellen** | Screen-ID des letzten Ereignisses je abgebrochener Session | Kein Screen > 15 % Abbruch | Events |
| **Wahrgenommene Autonomie** | 3 Items nach SDT („Ich hatte das Gefühl, selbst zu entscheiden“, „Ich konnte ablehnen, was nicht passte“, „Die Deutung war mein Satz“), 5-stufig, am Ende optional | Ø ≥ 4,0 | Kurzfragebogen |
| **„Trifft nicht zu“-Rate** | Anteil „Keiner davon“ (A10a) und „Nicht ganz – ändern“ (A5) | Beobachten; > 25 % → Schablonen überarbeiten | Events |
| **Sicherheitsvorfälle** | Krisen-Screen ausgelöst (zu Recht / zu Unrecht, manuell geprüft im Archiv); KI-Antworten mit Grenzverletzung (Mustercheck + Stichprobe) | 0 Grenzverletzungen; Fehlalarme dokumentiert | Archiv-Review |
| **Belastende Fehlinterpretationen** | Nutzerbericht über „Das verletzt / trifft nicht“ (Melde-Button) | 0 unbeantwortet | Melde-Button |
| **Unnötige KI-Aufrufe** | Aufrufe je Reise, Aufrufe ohne Freitext/Card-Anlass | ≤ 3; 0 ohne Anlass | `usage` |
| **Kosten je Reise** | USD aus `usage` | ≤ 0,30 $ | Kostenlog |
| **Retention (freiwillig)** | Wiederkehr innerhalb 14 Tagen ohne Push | Beobachten, kein Zielwert vor Daten | Portal |

### 9.2 Acht qualitative Nutzertests (Think-aloud, je 30–40 Min, Prototyp oder M1)

| # | Person / Kontext | Fokus | Erfolgskriterium | Abbruchkriterium |
|---|---|---|---|---|
| T1 | Erstnutzer:in, nur Smartphone, 3 Sekunden | Versteht A0 ohne Erklärung, erster Tipp < 10 s | Tipp ohne Rückfrage | Fragt „Was soll ich hier?“ |
| T2 | Person mit echter „Ja obwohl Nein“-Situation der letzten Woche | Erkennt sich in A5/A7 wieder; Satz in A10a | Wählt Satz, kann Ausnahme nennen | Fühlt sich bewertet |
| T3 | Person, die bewusst Kompromisse eingeht | Kompromiss-Pfad erzeugt kein Reparatur-Gefühl | „Das ist in Ordnung so“ | Empfindet Vorwurf |
| T4 | Person mit Kündigung < 4 Wochen (mit Vorab-Hinweis, Abbruch jederzeit, Krisennummern bereit) | Boden-Pfad, „Heute nicht“, kein toxischer Optimismus | Fühlt sich nicht gedrängt; findet Fristen-Karte hilfreich | Belastung steigt sichtbar → sofort stoppen |
| T5 | Person mit geringer Lesekompetenz / Deutsch als Zweitsprache | Kacheltexte verständlich, Mini-Erklärungen reichen | Alle Screens ohne Nachfrage | Mehr als 2 Rückfragen je Screen |
| T6 | Screenreader-Nutzer:in (NVDA/VoiceOver) + Tastatur | Weiche, Stellwerk, Statements bedienbar; Textäquivalente | Durchlauf ohne Hilfe | Sackgasse |
| T7 | Skeptiker:in gegenüber Spiritualität | Astro bleibt unsichtbar, bis gewählt; Rahmung ehrlich | Kein Glaubwürdigkeitsverlust | „Esoterik-Kram“ als Abbruchgrund |
| T8 | Astro-affine Person | Astro-Perspektive wirkt als Spiegel, nicht als Vorhersage; Einwilligung verständlich | Nutzt Perspektive, bleibt Autor | Erwartet Prognose |
| T9 (Expertenrolle, kein Nutzer) | Psycholog:in/Krisenberater:in spielt Krisen-Freitexte | Krisen-Screen greift, Ton angemessen, keine „hilfreichen Fakten“ | 100 % Trefferquote in Testfällen | Jede Grenzverletzung |

### 9.3 Drei faire experimentelle Vergleiche (erst ab M2 mit ≥ 60 Sessions je Arm)

| Exp. | Vergleich | Hypothese | Gegenhypothese | Primärmetrik | Schutzmetrik | Abbruchkriterium |
|---|---|---|---|---|---|---|
| **E1** | Interaktives Stellwerk (A7) vs. statischer Erklärtext gleicher Länge | Interaktion erhöht validierte Erkenntnis und Autonomie | Interaktion kostet Zeit, erhöht Abbrüche ohne Erkenntnisgewinn | Validierungsrate, Autonomie | Abbruch A7, Dauer | Abbruch A7 > +10 Punkte |
| **E2** | Pfad-Lichter sichtbar vs. ausgeblendet | Orientierung senkt Abbrüche ohne Druckgefühl | Fortschrittsanzeige erzeugt Druck (Villar) | Abschlussrate | Autonomie-Item „gedrängt“ | Autonomie sinkt > 0,3 |
| **E3** | KI-personalisierte Spiegelzeile/Szene vs. kuratierte Schablone | Personalisierung erhöht „trifft es“ | KI überinterpretiert → mehr „Keiner davon“, Vertrauensverlust | „Trifft es“-Rate, Vertrauen | „Keiner davon“, Melde-Button, Kosten | „Keiner davon“ > +8 Punkte |

### 9.4 Datenschutz- und Sicherheitschecks vor externen Testern

Einwilligungstexte (Test-Speicherung, Freitext Art. 9, Astro, Geräte-Speicher) geprüft; Löschfrist konfiguriert und Purge-Job getestet; Krisen-Screen mit verifizierten Nummern und Länderschalter; KI-Hinweis Art. 50 sichtbar; Altersabfrage 18+; Anthropic-Retention im Datenschutzhinweis; Fristen-Text fachlich freigegeben; a11y-Checkliste (6.9) bestanden; Kostenbudget im Testmodus begrenzt.

### 9.5 Entscheidungs-Gates

Gate 1 Design/Optik + a11y (nach M1) · Gate 2 erster bezahlter Aufruf (Bens Go) · Gate 3 Compliance-Review (vor Reise B live) · Gate 4 Astro-Deutungen mit `rule_refs` (Bens Review) · Gate 5 acht qualitative Tests bestanden → externe Tester · Gate 6 Metriken aus 30 Sessions → öffentlicher Start der Reise A.

### 9.6 Lernendes System — nur als überprüfbarer Prozess

1. **Einwilligungsbasiert, zweckgebunden:** Feedback („Trifft es?“, Melde-Button, Autonomie-Items) nur mit Einwilligung; Krisen-Sessions sind von jeder Auswertung ausgeschlossen; keine Trainingsnutzung von Nutzerdaten.
2. **Aggregiert:** Abbruchstellen, Validierungsraten, „Keiner davon“ je Frage/Schablone — ohne Freitext.
3. **Vorschläge im Studio:** Das System schlägt vor („Validierungssatz 3 wird in 31 % als ‚Keiner davon‘ gewertet“), ein Mensch entscheidet.
4. **Menschliche Freigabe** für jede Änderung an Methodik, Sicherheitskern, Astro-Regeln — versioniert, mit Audit-Log.
5. **Kontrollierte Varianten** (E1–E3) statt autonomer Optimierung; kein Umschreiben von Live-Prompts durch das Modell; keine Optimierung auf Daumen-hoch (Sycophancy-Lehre aus R4).

### 9.7 Risikobewertung (Kurz)

| Risiko | Bewertung | Maßnahme |
|---|---|---|
| Private Lebenssituationen vollständig gespeichert | hoch | Einwilligung, Pseudonym, Löschfrist, Zugriff nur Studio, Verschlüsselung sensibler Felder, Export/Löschung |
| Geburtsdaten | mittel–hoch | Gesonderte Einwilligung, verschlüsselt, löschbar, nie im Prompt als Rohdaten |
| Minderjährige | mittel | 18+ Selbstauskunft, Krisen-Screen mit 116 111/147 |
| Internationale Sprachen | mittel | Krisennummern je Land, Englisch erst Q4 mit eigenem Krisen-Set |
| Sicherheitshinweise zerstören den Flow | mittel | Nur bei realem Signal; zweistufig (Rückfrage); sonst stiller Hinweis im „Mehr“-Menü |

---

## 10. Top-10-Gründerfragen und finale Produktempfehlung

### 10.1 Zehn Fragen zur gemeinsamen Besprechung

| # | Frage | Warum sie zählt | Meine Empfehlung (zur Diskussion) |
|---|---|---|---|
| F1 | **Trifft die Reise A im Finder Lab deine Methodik?** Szenen, Weiche, Stellwerk, Kompromiss-Pfad, „Trifft es?“ | Alles Weitere baut darauf | Durchspielen (`/finder-lab`), Notizen je Screen; Texte sind Platzhalter in deiner Richtung |
| F2 | **Wortlaut des Sicherheitskerns** (`core-system.md`) inkl. der 11 Vorschläge vom 12.10. **und der vier Zusatzsätze aus Anhang B.5** (Frequenz/Schuld, Anstiftung, Nummern aus UI, Astro nur nach Opt-in) | Blockiert M2; Schutzregeln dürfen nicht nur im Studio-editierbaren Teil stehen | Alle übernehmen; Krisennummern aus R6 (116 123, 116 111, 116 016, AT/CH), 18+ |
| F3 | **Reihenfolge M1 (ohne API) → M2 (KI) → M3 (Reise B) → M4 (Astro)** — oder Astro früher, wie Festlegung 0.1.5 („erster Prototyp“)? | Kosten, Testbarkeit; Astro-Verschiebung braucht dein ausdrückliches Go | M1 zuerst; Astro als M4 nur mit deinem Go, sonst M3/M4 tauschen |
| F4 | **Freitext-Einwilligung (Art. 9)** als eigener Screen vor der ersten KI-Auswertung — akzeptabel? | Rechtlich geboten, kostet Reibung | Ja, aber erst beim ersten Freitext, nicht am Start; Reise funktioniert ohne Freitext |
| F5 | **Registrierung:** anonym → Soft Wall nach Card → Konto nur fürs Portal? | Reibung vs. Portalziel | Ja (Kap. 6.3) |
| F6 | **Gamification:** Shards als Einsichts-Sammlung ja, Streaks nein — einverstanden? | Deine Richtung (Boxen/Shards/Gamification) vs. Evidenz | Lichter + Splitter ohne Verfall; Streaks nur, falls du sie trotz Evidenz willst, dann ohne Verlust-Framing |
| F7 | **Astro-Zugang:** erst ab Perspektive oder jederzeit über „Mehr“ ab Warum? Wortlaut der Rahmung (inkl. Satz „keine Wissenschaft“)? | Ehrlichkeit vs. Marke | Ab Warum über „Mehr“, Perspektive-Kachel in A8/B6/C5; ehrlicher Zusatzsatz ja |
| F8 | **Frequenzpyramide / „keine Zufälle“:** als eigene Perspektive-Karte („Welche Ausrichtung gebe ich mir?“) — nie auf Kündigung/Gewalt/Krankheit angewendet? | Markenkern vs. Just-World-Risiko | Ja, mit Schutzregel 3.1.4 Nr. 5 |
| F9 | **Jobverlust-Fakten:** fester Server-Text mit §-Fußnoten statt KI-Text; Verzicht auf „Lass dich lieber kündigen“? | Sperrzeit-/Haftungsrisiko | Ja; Text fachlich prüfen lassen (Entwurf R6) |
| F10 | **Aufbewahrungsfrist, Tester-Einwilligung, DSFA und EU-Vertreter** (Vorschlag 90 Tage, `testphase-2026-v1`; DSFA fest einplanen; TB International Holdings Ltd. sitzt in Hongkong → Art. 27 DSGVO) sowie Modell-/Retention-Frage mit Anthropic | Blockiert externe Tester | 90 Tage; Opus 5.5 bleibt (laut Plattformdoku nicht „Covered Model“ — vor Gate 2 schriftlich belegen); ZDR/EU-Residency anfragen; Art.-27-Frage vor jedem Nutzertest klären |

Offen bleiben außerdem die Punkte aus 6.8 für Fachanwalt/Datenschutz (Anbieterstellung KI-VO, DSFA, BFSG, Heilkunde-Wording, RDG bei Jobverlust-Hinweisen, Altersverifikation) und die Review-Fragen aus Anhang B.3: Eisenbahn-Vokabular vs. „Weiche + Weg/Licht/Brücke“, Sprecherstimme, Pflicht-Ausnahme in „Trifft es?“, Produkt-Einstieg „Kennst du das?“ vs. „Was ist passiert?“, Zugang zum eigenen Anteil in Reise B.

### 10.2 Finale Produktempfehlung

**Baue den Finder als Entwicklungsreise, nicht als Chat — und lass die KI dort arbeiten, wo sie etwas kann, das Regeln nicht können.**

1. **Reise A click-first** (Finder Lab → M1) ist der Kern: Kennst-du-das, Weiche, Stellwerk, Kompromiss-Pfad, „Trifft es?“, Wenn-Dann-Brücke, Finder Card. Deterministisch, in der bestehenden Glas-Optik, mobil in zwei Spalten, ohne Konto, ohne Kosten. Das ist in ≈ 1 Woche produktreif für dich.
2. **KI als Hintergrundkraft** (M2): Spiegelzeile bei Freitext, Formulierung der Card, Erklärung auf Wunsch, Astro-Deutung nach deinen Regeln — jeweils ein Aufruf, jeweils sichtbar gekennzeichnet, jeweils in der Technik-Spalte nachvollziehbar. Keine Chat-Oberfläche.
3. **Sicherheit vor Methodik**: zweistufiges Krisenprotokoll serverseitig, verifizierte Nummern, Gleislage-Pfad gegen Schuldzuweisung, Boden vor Reframing bei Jobverlust, ehrliche Astro-Rahmung.
4. **Wert vor Konto, Orientierung statt Druck, Einsichten statt Streaks** — das unterscheidet Trustbridge von Duolingo-Klonen und von KI-Journal-Apps und ist zugleich der Weg, der die Evidenz auf seiner Seite hat.
5. **Messen, was zählt**: validierte Erkenntnis, formulierte Brücke, Autonomie, Sicherheit — nicht Verweildauer. Erst wenn 30 Sessions das tragen, öffnet sich der Finder nach außen.

Was der Blueprint **nicht** empfiehlt: Chatfenster als Hauptoberfläche, Streaks/Ligen/Hearts, Quiz-Funnel vor dem Wert, Wirksamkeitsbehauptungen, Astro als Default, KI-generierte Szenen vor Experiment E3, autonome Prompt-Optimierung.

---

## Anhang A — Quellenverzeichnis (konsolidiert)

Alle Quellen wurden am 12.10.2026 abgerufen. Die Listen stammen unverändert aus den sechs Research-Berichten; Evidenzstufen (belegt / plausibel / offen) und die Art des Zugriffs sind je Eintrag angegeben. Nicht erreichbare Seiten sind je Bericht unter *Fehlgeschlagene Abrufe* ausgewiesen und gelten ausdrücklich nicht als besucht. Die vollständigen Rohberichte liegen im Sitzungs-Scratchpad (nicht im Repository).

### A.1 R1 - Duolingo

**Fehlgeschlagene Abrufe (aus dem Bericht):**
- *Methodik und Grenzen.** Rund 50 Suchen/Abrufe (Vorgabe 10–15 überschritten, um Primärquellen statt Teardown-Hörensagen zu nutzen). Gescheiterte Abrufe, die ausdrücklich NICHT als besucht gelten: `handbook.duolingo.com` (Datei > 10 MB), `design.duolingo.com` (Redirect auf Blog-Hub ohne Design-System-Inhalte), alle `support.duolingo.com`-Artikel (Redirect auf `duolingo.com/help`, Inhalte nicht einsehbar), `androidauthority.com` (403), `uxdesign.cc` (403), `duolingo.fandom.com/wiki/Energy` (402), `reallygoodux.io` (404). Onboarding-Screens wurden nicht selbst beobachtet; sie stammen aus Teardowns (Evidenz: plausibel).
- [beobachtet, plausibel]* Teardowns beschreiben die Reihenfolge: Welcome → Sprache → „How did you hear about us" → Vorkenntnisse → „Why are you learning" → Tagesziel → Notification-Opt-in → erste Lektion oder Einstufungstest → Streak-Setup; Reihenfolge laut UX-Collective-Teardown über Jahre weitgehend stabil, Dauer von ca. 7 Minuten (2022) auf ca. 4 Minuten (2024) verkürzt (Q2; Artikel selbst nicht abrufbar, nur Suchzusammenfassung → **offen** für die Minuten). Ein weiterer Teardown zeigt Duo mit Sprechblase „Just 7 quick questions before we start your first lesson!" (Q1, Alt-Text, **plausibel**). Erste Lektion vor Kontoerstellung, dann „Create a profile"-Prompt, überspringbar; späteres Gate zum Speichern des Fortschritts; Leaderboards ohne Account gesperrt (Q3, **plausibel**).


- Q1 https://screensdesign.com/articles/duolingo-onboarding-design/ · plausibel · Teardown; Alt-Text „Just 7 quick questions before we start your first lesson!"; keine Screenshots einsehbar, Datum fehlt.
- Q2 https://uxdesign.cc/duolingos-onboarding-2-years-on-3cbccad139f7 · offen (Abruf 403, nur Suchzusammenfassung) · Onboarding-Reihenfolge 2022 vs. 2024, Dauer 7 → 4 Min.
- Q3 https://uxplanet.org/duolingo-ux-analysis-9631ff3f4eb1 und https://www.reallygoodux.io/blog/duolingo-user-onboarding · plausibel (Suchzusammenfassung; ReallyGoodUX-Abruf 404) · Lektion vor Konto, „Create a profile" überspringbar, Leaderboards gesperrt.
- Q4 https://blog.duolingo.com/new-duolingo-home-screen-design/ · belegt · Offizieller Pfad-Post 06.05.2022, Begründungen, Guidebooks, Stories, Legendary.
- Q5 https://www.nbcnews.com/tech/tech-news/duolingos-update-redesign-luis-von-ahn-interview-rcna44655 · plausibel (Suchzusammenfassung) · Rollout 01.11.2022, von Ahn: keine Rücknahme.
- Q6 https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/ · belegt · Duolingo 101 (02.12.2024): Onboarding, Einstufungstest, Units, Übungstypen, Hearts, Leaderboards.
- Q7 https://blog.duolingo.com/duolingo-energy/ · belegt · Energy-Ankündigung 03.07.2025, Mechanik, Begründung. (Kritik: https://www.androidauthority.com/quitting-duolingo-energy-system-3599842/ · 403, nur Suche · plausibel.)
- Q8 https://blog.duolingo.com/how-duolingo-streak-builds-habit/ · belegt · Habit-Forschung, Loss Aversion, Freeze-Zahlen, 3,6× Kursabschluss.
- Q9 https://blog.duolingo.com/improving-the-streak/ · belegt · Entkopplung Tagesziel/Streak, A/B-Ergebnisse 2020.
- Q10 https://blog.duolingo.com/duolingo-max/ · belegt · Max: Video Call als Pfad-Knoten, Roleplay als Side Quest, menschliche Rahmen, 188 Länder.
- Q11 https://techcrunch.com/2023/03/14/duolingo-launches-new-subscription-tier-with-access-to-ai-tutor-powered-by-gpt-4/ · plausibel · Launch 14.03.2023, Preis 29,99/167,99 USD, Explain My Answer als Button → Chat.
- Q12 https://blog.duolingo.com/results-duolingo-efficacy-studies/ · belegt als Selbstaussage · Efficacy-Übersicht 26.09.2024, überwiegend interne Whitepapers.
- Q13 https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/ · belegt · „Test everything", >2.000 Experimente, gestoppte Plus-Promo.
- Q14 https://research.duolingo.com/papers/yancey.kdd20.pdf · belegt (peer-reviewed, via Suche identifiziert) · Yancey & Settles, KDD 2020, Bandit für Notifications, +0,5 % DAU.
- Q15 https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/ · belegt · Blog 03.09.2020 zur Notification-KI, Template-Pool, Eligibility.
- Q16 https://arxiv.org/abs/2203.16175 · belegt (L@S 2022, DOI 10.1145/3491140.3528274) · Gamification Misuse bei Duolingo.
- Q17 https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification · plausibel · Streak Creep (02.03.2026), zitiert Silverman et al. 2023 und Etkin 2016.
- Q18 https://www.entrepreneur.com/business-news/duolingo-ceo-clarifies-ai-stance-after-backlash-read-memo/492141 · plausibel · Memo-Zitate, LinkedIn-Klarstellung 05/2025.
- Q19 https://fortune.com/2025/08/18/duolingo-ceo-admits-controversial-ai-memo-did-not-give-enough-context-insists-company-never-laid-off-full-time-employees · plausibel (Suchzusammenfassung) · „I did not give enough context".
- Q20 https://www.sec.gov/Archives/edgar/data/0001562088/000162828026053299/q2fy26duolingo6-30x26share.htm · belegt · Q2-2026-Shareholder-Letter: DAU/MAU/Abos/Umsatz, Streak Revival, Video Call in Super.
- Q21 https://en.wikipedia.org/wiki/Duolingo · plausibel · Zeitleiste, Abonnentenhistorie, eingestellte Features, Kontroversen (nur erste 100k Zeichen gelesen).
- Q22 https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0 · plausibel (Suchzusammenfassung) · „These reminders don't seem to be working" (2020).
- Q23 https://blog.duolingo.com/ways-to-practice-in-duolingo und Reviews (thelanguagecloset.com, actualfluency.com) · offen · Lektionslänge 2–5 Min. geschätzt, Match Madness.
- Q24 https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth · belegt (Primärquelle, Selbstaussage) · Mazal 28.02.2023: CURR, Leaderboards, Streak, Push, gescheiterte Versuche.
- Q25 https://blog.duolingo.com/tips-for-maintaining-streak/ · belegt · Streak Challenge (Gem-Wette), Widget, Ton „No excuses" (19.12.2022).
- Q26 https://blog.duolingo.com/friends-social-features/ und https://blog.duolingo.com/friend-streak/ · plausibel (nur Suchzusammenfassung) · Friends Quests, Friend Streak.
- Q27 https://blog.duolingo.com/handbook/ · belegt · Handbook-Seite 10.02.2025, fünf Prinzipien, „Green Machine". (handbook.duolingo.com: Abruf gescheitert, > 10 MB.)
- Q28 https://www.mindtheproduct.com/lessons-from-duolingos-product-handbook/ · plausibel · Handbook-Zusammenfassung mit Zitaten (13.02.2025).
- Q29 https://blog.duolingo.com/hub/design/ · belegt (beobachtet) · Design-Hub-Artikelliste; design.duolingo.com leitet hierher um.
- Q30 https://applevis.com/comment/150456 und https://www.applevis.com/comment/88510 · plausibel/offen (Suchzusammenfassung) · Screenreader-Erfahrungen, Anzeigen-Falle.
- Q31 https://studenttheses.uu.nl/handle/20.500.12932/48993 und https://www.ipr.northwestern.edu/documents/working-papers/2026/wp-26-05.pdf · plausibel (nicht geöffnet) · Reddit-Studie Gamification; kausale Streak-Evidenz (nicht Duolingo).
- Q32 https://metatalk.metafilter.com/26027/Duolingo-forums-shutting-down-March-22 ; https://alternativeto.net/software/tinycards/about ; https://rebeccasdaf.substack.com/p/duolingo-events-retired-but-mine ; https://duolingo.fandom.com/wiki/Duolingo_Wiki:Archive/Immersion · plausibel/offen (Suchzusammenfassungen) · Foren 22.03.2022, Tinycards 01.09.2020, Events 01/2023, Immersion 01/2017.

### A.2 R2 - Adaptive Frageführung, Formular-Evidenz, anonymer Start vs. Registrierung

**Fehlgeschlagene Abrufe (aus dem Bericht):**
- Stand: 12.10.2026 · Reine Webrecherche (ca. 50 Suchen/Abrufe; fehlgeschlagene Abrufe in Abschnitt 5 und in der Quellenliste ausgewiesen).
- Aktuelle TurboTax-Screens (2025/26), Wortlaut „Tell us about your year", Existenz/Wortlaut „Why do we ask?": nicht verifiziert; Teardown nur Steuerjahr 2018; uxdesign.cc (403), InVision (Artikel verschwunden, Redirect auf miro.com), Intuit-Pressemitteilung-PDF 11/2023 (nicht lesbar), Intuit-Tech-Talk-Seite „Tax Knowledge Engine" (404); Feature-Name „ExplainWhy" nur aus einem Suchsnippet.
- *Fehlgeschlagene Abrufe:** https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-issues-opinion-finding-intuit-inc-engaged-deceptive-practices (404, korrigiert → Nr. 1) · https://dl.acm.org/doi/10.1145/3290605.3300316 (403) · https://www.pewresearch.org/?p=111333 (403, korrigiert → Nr. 20) · https://www.intuit.com/blog/powering-prosperity/tech-talk-intuits-ai-powered-tax-knowledge-engine-boosts-filers-confidence/ (404) · https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf (404) · https://uxdesign.cc/https-medium-com-ux-ui-analysis-of-turbotax-171c86d80a41 (403) · https://www.invisionapp.com/inside-design/ux-review-turbo-tax-makes-filing-almost-fun/ (Redirect auf miro.com) · https://investors.intuit.com/_assets/_0223266a28b2b0a969150d6d5a2f12b0/intuit/news/2023-11-27_Intuit_TurboTax_Adds_New_Full_Service_and_1205.pdf (PDF nicht lesbar) · Typeform-Hilfeseite (403, zwei Versuche).


**Geöffnet:**
1. https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-issues-opinion-finding-turbotax-maker-intuit-inc-engaged-deceptive-practices · B · FTC-Pressemitteilung 22.01.2024, Votum 3:0, Order-Inhalt.
2. https://truthinadvertising.org/brands/turbotax-deceptive-advertising/ · P · Timeline inkl. Fifth-Circuit-Aufhebung 20.03.2026 (Gewaltenteilung).
3. https://appcues.com/blog/how-turbotax-makes-a-dreadful-user-experience-a-delightful-one · P · Teardown mit Screenshots, Steuerjahr 2018; Vendor-Blog, unkritisch.
4. https://blog.turbotax.intuit.com/breaking-news/tax-preparation-powered-by-gen-ai-59318/ · B (Selbstaussage) · Intuit Assist 09/2023: Checkliste, Accuracy-Checks, Experten-Gateway.
5. https://aws.amazon.com/blogs/machine-learning/intuit-uses-amazon-bedrock-and-anthropic-claude-to-explain-taxes-in-turbotax-to-millions-of-consumer-tax-filers/ · B (Selbstaussage) · Erklärungen im Federal Review, Tax Engine + Claude, 30.07.2024.
6. https://www.intuit.com/blog/innovative-thinking/tech-innovation/how-intuit-transformed-tax-filing-experiences · B (Selbstaussage) · Tax Knowledge Engine, Experten-Routing, 06/2026.
7. https://www.ai.engineer/talks/_zl_zimMRak-intuit-uses-llms-explain-taxes-millions-taxpayers · P · Engineering-Talk 2025: LLM rechnet nicht, Guardrails, prepared prompts, RAG, Evals.
8. https://investors.intuit.com/news-events/press-releases/detail/1305/intuit-and-anthropic-partner-to-bring-trusted-financial-intelligence-and-custom-ai-agents-to-consumers-and-businesses · B (Selbstaussage) · Intuit×Anthropic 24.02.2026, MCP, Rollout Frühjahr 2026.
9. https://www.intuit.com/blog/life-at-intuit/design-for-delight-building-deep-customer-empathy-to-solve-any-problem/ · B (Selbstaussage) · Design for Delight, 13.03.2025.
10. https://www.typeform.com/developers/create/logic-jumps/ · B · Offizielle Logic-Jumps-Doku (Trigger/Bedingung/Ziel, Operatoren).
11. https://design-system.service.gov.uk/patterns/question-pages/ · B · Eine Frage pro Seite, Fortschrittsanzeige-Guidance, „why each question is asked".
12. https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/ · B · GDS-Begründung + kritische Kommentare/Antwort.
13. https://www.gov.uk/service-manual/design/form-structure · B · Question protocol, „start with one thing per page", Merge nur nach Research.
14. https://research.tilburguniversity.edu/en/publications/design-of-web-questionnaires-the-effects-of-the-number-of-items-p/ · B · Toepoel/Das/van Soest 2009, Field Methods 21(2).
15. https://rti.org/publication/web-survey-design-paging-versus-scrolling · O · Peytchev et al. 2006, nur Abstract ohne Ergebnisse.
16. https://research.google/pubs/where-am-i-a-meta-analysis-of-experiments-on-the-effects-of-progress-indicators-for-web-surveys/ · B · Villar/Callegaro/Yang 2013, 32 Experimente.
17. https://rti.org/publication/effectiveness-progress-indicators-web-surveys-front-counts · B · Conrad et al. 2003, frühes Feedback entscheidend.
18. https://api.semanticscholar.org/graph/v1/paper/DOI:10.1145/3290605.3300316?fields=title,abstract,authors,year,venue,citationCount · B · Kim/Lee/Gweon CHI 2019 Abstract (ACM DL selbst 403).
19. https://dare.uva.nl/id/8d1a3d3a-31ff-4fcf-9dd5-614e9e37efed · B · Zarouali et al. 2024, CMM 18(1).
20. https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/ · B · Pew 14.10.2021, Item-Nonresponse offen vs. geschlossen.
21. https://ideas.repec.org/a/oup/jconrs/v37y2010i3p409-425.html · B · Scheibehenne et al. 2010 Abstract.
22. https://www.kellogg.northwestern.edu/faculty/research/detail/2015/when-product-assortment-leads-to-choice-overload-a-conceptual · B · Chernev et al. 2015 Abstract, vier Moderatoren.
23. https://baymard.com/lists/cart-abandonment-rate · B (Lücke) · Abbruchgründe, Konto 18 %, Ø 70,22 % aus 50 Studien.
24. https://baymard.com/blog/reduce-cart-abandonment · B (Lücke) · Konto 19 %, Guest-Checkout-Empfehlungen.
25. https://www.nngroup.com/articles/login-walls/ · B · Budiu 02.03.2014, Login Walls, qualitativ.
26. https://alistapart.com/article/signupforms/ · B · Wroblewski 05.05.2008, Gradual Engagement + Risiken.
27. https://ui-patterns.com/patterns/LazyRegistration · P · Lazy Registration, leichte/schwere Variante, Beispiele.
28. https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker · P · Duolingo Delayed Sign-up, Soft/Hard Walls, +20 %/+8,2 % DAU.
29. https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/ · B · Onboarding-Schritte, Profil als Schritt 5, 02.12.2024.
30. https://gdpr-info.eu/art-5-gdpr/ · B · Art. 5(1)(b),(c) DSGVO.
31. https://gdpr-info.eu/art-25-gdpr/ · B · Art. 25(2) DSGVO.
32. https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/ · B · 7-Tage-Cap für skript-schreibbaren Speicher, 24.03.2020.

**Nur Suchsnippet (nicht geöffnet):**
33. https://www.ftc.gov/system/files/ftc_gov/pdf/d09408_commission_opinion_redacted_public.pdf · P · Commission Opinion (Zwei-Drittel-Angabe).
34. https://www.mealeys.com/mealeys/articles/2456977 · P · Fifth Circuit vacatur, 24.03.2026.
35. https://www.macworld.com/article/1165262/turbotax_premiere_2011_takes_the_scary_out_of_tax_prep.html · P · Lebensereignis-Checkboxen 2011.
36. https://ttlc.intuit.com/community/investors-landlords-12/why-do-i-have-to-re-enter-same-data-each-time-a-visit-a-section-901318 · P · „dividing points".
37. https://help.typeform.com/hc/en-us/articles/360029615911 · P (Marketing) · 57 % Completion; Abruf 403.
38. https://community.typeform.com/build-your-typeform-7/more-than-one-question-on-a-page-258/index3.html · P · Staff-Aussage + Nutzerkritik.
39. https://adamsilver.io/blog/end-with-one-thing-per-page/ · P · Jarrett-Bezug.
40. https://www.effortmark.co.uk/wp-content/uploads/2016/03/FOrms-workshop-at-ConCon-2016.pdf · P · Jarrett Workshop, question protocol.
41. https://fis.tu-dresden.de/portal/de/publications/the-influence-of-the-answer-box-size-on-item-nonresponse-to-open-ended-questions-in-a-web-survey(9f7fb533-ad5f-479d-a101-6a5f33fd982f).html · P · Zuell et al. 2015.
42. https://www.intuit.com/blog/life-at-intuit/design-for-delight-narrowing-on-bold-solutions-to-delight-customers/ · P · Go Broad to Go Narrow.

**Fehlgeschlagene Abrufe:** https://www.ftc.gov/news-events/news/press-releases/2024/01/ftc-issues-opinion-finding-intuit-inc-engaged-deceptive-practices (404, korrigiert → Nr. 1) · https://dl.acm.org/doi/10.1145/3290605.3300316 (403) · https://www.pewresearch.org/?p=111333 (403, korrigiert → Nr. 20) · https://www.intuit.com/blog/powering-prosperity/tech-talk-intuits-ai-powered-tax-knowledge-engine-boosts-filers-confidence/ (404) · https://abcwest.cogs.indiana.edu/pmwiki/pdf/scheibehenne.options.2010.pdf (404) · https://uxdesign.cc/https-medium-com-ux-ui-analysis-of-turbotax-171c86d80a41 (403) · https://www.invisionapp.com/inside-design/ux-review-turbo-tax-makes-filing-almost-fun/ (Redirect auf miro.com) · https://investors.intuit.com/_assets/_0223266a28b2b0a969150d6d5a2f12b0/intuit/news/2023-11-27_Intuit_TurboTax_Adds_New_Full_Service_and_1205.pdf (PDF nicht lesbar) · Typeform-Hilfeseite (403, zwei Versuche).

### A.3 R3 - Noom, Headspace/Ebb, Fabulous, Finch, How We Feel, Balance

**Fehlgeschlagene Abrufe (aus dem Bericht):**
- *Methodische Vorbemerkung.** Reine Webrecherche; ich habe keine App installiert und keinen Screen selbst gesehen. Alles, was unten als „beobachtet" steht, stammt aus Teardowns/Reviews Dritter und ist deshalb maximal **plausibel**. „Belegt" sind nur Anbieter-Primärseiten (für Aussagen über das eigene Produkt), ein Peer-Review-Artikel und eine Nonprofit-/Universitätsseite. **Fehlgeschlagene Abrufe (ausdrücklich):** Noom-Pressemitteilung bei FinTech Futures (HTTP 403; Kopie bei Fitt Insider stattdessen gelesen), JMIR-Formative-Research-Artikel 2026 zu Ebb (HTML und PDF kamen leer zurück), Headspace-Hilfeartikel „Can Ebb replace my therapist …" (403; nur Such-Snippet), Finch-Hilfecenter help.finchcare.com (403), Android-Authority-Hands-on zu Finch (403), nature.com-Originalseite der Noom-Studie 2016 (Login-Redirect; PMC-Volltext stattdessen gelesen), balanceapp.com (Redirect auf themindcompany.com, dort gelesen). **Umfang:** ca. 44 Suchen/Abrufe statt der vorgesehenen 10–15; die Überschreitung entstand durch Nachverfolgung von Primärquellen und Ersatzabrufe nach 403-Fehlern.
- **Finch: kumulative statt verlustbasierte Gamification — aber offiziell nicht dokumentierbar.** Erledigte Ziele geben Energie und „rainbow stones", der Vogel wächst, bekommt Accessoires, erkundet Orte; Kernfunktionen gratis, Abo 9,99 $/Monat → WhistleOut 06/2026 → **plausibel**. „Vogel stirbt nicht bei verpassten Tagen" (Wettbewerber-Review) und „Streak-Zähler abschaltbar, Meilensteine bleiben" (Forum-Snippet) → widersprüchlich, Hilfecenter nicht erreichbar → **offen**.
- *(3) Hypothese:** Ebb ist absichtlich Nebenpfad, kein Haupt-Chat: Reflexion → Empfehlung aus Bibliothek → Ausstieg. Das Figur-Design („Blob", „not too happy") vermeidet Para-Sozialität. Die versprochene Sicherheitsforschung (JMIR 2026) ist firmenautorisiert und für mich nicht lesbar; unabhängige Fehlerraten der Krisenerkennung sind unbekannt.
- *(2) Selbstaussage (belegt):** „Your new self-care best friend. … take care of your pet by taking care of yourself!"; FAQ-Link vorhanden, nicht abrufbar.
- Finch: Wächst der Vogel ohne tägliche Pflicht? Gibt es Streaks, sind sie abschaltbar? Quellen widersprechen sich; offizielles Hilfecenter (403) nicht lesbar.
- Headspace: Kursname „Basics" und aktuelle Onboarding-Reihenfolge nicht bestätigt (Belege von 2018/2022, App ändert sich); Hilfeartikel zu Ebb nur als Snippet; JMIR-Sicherheitsstudie (firmenautorisiert) nicht lesbar; unabhängige Krisenerkennungs-Metriken fehlen; Barrierefreiheit nirgends dokumentiert.
- https://www.fintechfutures.com/press-releases/noom-introduces-ai-enabled-products-to-enhance-on-demand-health-care-and-interactive-coaching · 12.10.2026 · — · Abruf fehlgeschlagen (403).


**Noom**
- https://www.hunton.com/privacy-and-cybersecurity-law-blog/fitness-app-agrees-to-pay-56-million-to-settle-class-action-alleging-dark-pattern-practices0 · 12.10.2026 · plausibel · Kanzlei-Blog 22.02.2022: Vergleich 56 Mio. $ + 6 Mio. $, Vorwürfe, Auflagen (geöffnet).
- https://news.bloomberglaw.com/litigation/nooms-56-million-deal-in-unwanted-subscriptions-suit-finalized · 12.10.2026 · plausibel · Schlagzeile/Snippet 13.07.2022 zur endgültigen Genehmigung (nicht geöffnet).
- https://www.innercitypress.com/sdny45bschofieldnoomicp121021.html · 12.10.2026 · plausibel · Snippet: Aktenzeichen 20-cv-3677, Motion-to-Dismiss-Historie (nicht geöffnet).
- https://www.revenuecat.com/blog/growth/web-to-app-onboarding-funnel · 12.10.2026 · plausibel · Teardown D. Tideman 09.04.2026: bis 113 Screens, Timer, Pay-what-you-want, Mikrocopy (geöffnet).
- https://insider.fitt.co/press-release/noom-introduces-ai-enabled-products-to-enhance-on-demand-health-care-and-interactive-coaching/ · 12.10.2026 · belegt (PM-Kopie) · 27.06.2024: Welli-Scope, Human-Coaching in Premium, Zitate Cook/Severs (geöffnet).
- https://www.fintechfutures.com/press-releases/noom-introduces-ai-enabled-products-to-enhance-on-demand-health-care-and-interactive-coaching · 12.10.2026 · — · Abruf fehlgeschlagen (403).
- https://pmc.ncbi.nlm.nih.gov/articles/PMC5098151 · 12.10.2026 · belegt · Chin et al. 2016, Sci Rep 6:34563: retrospektive Kohorte, n = 35.921, 77,9 %, Finanzierung, Noom-Rolle, Limitationen (geöffnet).
- https://www.nature.com/articles/srep34563 · 12.10.2026 · — · Login-Redirect, nicht geöffnet.
- https://coi.asco.org/Report/ViewAbstractCOI?id=417584 · 12.10.2026 · plausibel · Snippet: Noom-Angestellte/Aktien bei McCallum et al. (nicht geöffnet).
- https://cdn.clinicaltrials.gov/large-docs/69/NCT04797169/ICF_001.pdf · 12.10.2026 · plausibel · Snippet: PI im Noom-Beirat, Noom-Aktien (nicht geöffnet).
- https://www.nbcnews.com/better/lifestyle/what-you-need-know-about-weight-loss-app-noom-according-ncna996026 · 12.10.2026 · plausibel · Snippet: „rote" gesunde Fette, Coach-Qualifikation, Kündigungsprobleme (nicht geöffnet).
- https://abbylangernutrition.com/noom-diet-review-the-millennial-weight-loss-app/ · 12.10.2026 · plausibel · Snippet: RD-Kritik „diet in disguise" (nicht geöffnet).

**Headspace**
- https://www.headspace.com/articles/headspace-brings-empathetic-ai-companion-ebb-to-uk-members · 12.10.2026 · belegt · 03.04.2025: Einbettung, MI, Risikokategorien, Länder-Ressourcen, Grenzen, Firmenzahlen (geöffnet).
- https://www.figma.com/blog/headspace-ebb-ai-companion/ · 12.10.2026 · plausibel · 05/2025: Designprinzipien, Figur, Krisenressourcen, Beenden/Löschen (geöffnet, Seite gekürzt).
- https://hitconsultant.net/2025/12/08/headspace-updates-ebb-ai-with-voice-mode-and-enhanced-memory-to-deepen-mental-health-support/ · 12.10.2026 · plausibel · 08.12.2025: Voice, Memory, > 7 Mio. Nachrichten, 18+, Zitate Kallel/Glover (geöffnet).
- https://help.headspace.com/hc/en-us/articles/29918571453211-Can-Ebb-replace-my-therapist-or-mental-health-coach · 12.10.2026 · plausibel (Snippet) · 988/911-Hinweis, „not an AI therapist" (403, nicht geöffnet).
- https://formative.jmir.org/2026/1/e86904 · 12.10.2026 · offen · Headspace-autorisierte Ebb-Studie; HTML und PDF kamen leer zurück.
- https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence · 12.10.2026 · plausibel · Screens 23.11.2018: drei Fragen, Routine-basierte Zeitwahl, „only takes a minute" (geöffnet).
- https://tearthemdown.substack.com/p/headspace · 12.10.2026 · plausibel · 30.09.2022: Paywall vor erster Session, 9–10 Taps, 2-Min-Session, Mood-Check-in (geöffnet).

**Fabulous**
- https://www.thefabulous.co/ · 12.10.2026 · belegt (Selbstaussage) · Duke/CAH bzw. Ariely-Lab, Routinen, Coaching, Trial-Konversion, 37 Mio. (geöffnet).
- https://www.thefabulous.co/science-behind-fabulous/ · 12.10.2026 · belegt · „96 %" unbelegt, Lorem-ipsum-Platzhalter, keine Studien (geöffnet).
- https://www.thefabulous.co/about-the-fabulous.html · 12.10.2026 · belegt (Selbstaussage) · Ariely-Anekdote, „evidence-based"-Claim ohne Daten (geöffnet).
- https://healthify.nz/apps/f/fabulous-self-care-app/ · 12.10.2026 · plausibel · Review S. Keepa, 3 Sterne: Journeys, Habit-Stacking, Streaks, „Personalised letters", Kritik (geöffnet; Datierung widersprüchlich).
- https://en.wikipedia.org/wiki/Dan_Ariely · 12.10.2026 · plausibel (Snippet) · Datenaffäre 2021/Duke-Untersuchung 2024 (nicht geöffnet).

**Finch**
- https://finchcare.com/ · 12.10.2026 · belegt (Selbstaussage) · Positionierung, FAQ-Link, 500k+ Ratings (geöffnet).
- https://help.finchcare.com · 12.10.2026 · — · 403, nicht geöffnet.
- https://www.whistleout.com/CellPhones/Guides/finch-self-care-app-review · 12.10.2026 · plausibel · 26.06.2026: Energie/Steine, Wachstum, Widget, gratis + 9,99 $/Monat (geöffnet).
- https://habitbox.app/blog/finch-app-review · 12.10.2026 · offen (Wettbewerber-Snippet) · „stirbt nicht", „keine Streak-Statistik", „chore" (nicht geöffnet).
- https://www.androidauthority.com/finch-habit-tracker-app-hands-on-3537434/ · 12.10.2026 · — · 403, nicht geöffnet.

**How We Feel**
- https://medicine.yale.edu/news-article/the-how-we-feel-app-helping-emotions-work-for-us-not-against-us/ · 12.10.2026 · belegt · 01.12.2022: Nonprofit, Team, Ablauf, „neither good nor bad", Apple-Auszeichnungen (geöffnet).
- https://apps.apple.com/us/app/how-we-feel/id1562706384 · 12.10.2026 · belegt · gratis, Matrix, Strategien, Körperscan, Privacy on-device, 4,9/30K (geöffnet).
- https://marcbrackett.com/how-we-feel-app-3/ · 12.10.2026 · belegt (Selbstaussage) · 144 Wörter, Reports, Spendenfinanzierung, Team (geöffnet).

**Balance**
- https://themindcompany.com/apps/balance · 12.10.2026 · belegt (Selbstaussage) · tägliche Fragen, Assemblierung aus Bibliothek, keine Studien (geöffnet; Redirect von balanceapp.com).
- https://www.choosingtherapy.com/balance-meditation-app-review/ · 12.10.2026 · plausibel (Snippet) · Zielranking, 10-Tage-Pläne, Reihenfolge-Zwang, 69,99 $/Jahr (nicht geöffnet).

### A.4 R4 - KI-Journaling/-Coaching und Sicherheit von KI in sensiblen Kontexten

**Fehlgeschlagene Abrufe (aus dem Bericht):**
- Research-Log für Trustbridge Finder · Stand/Abrufdatum aller Quellen: **12.10.2026** · Methode: reine Webrecherche (WebSearch/WebFetch). **Keine App wurde installiert oder bedient; es wurden ausschließlich Web-, Store- und Hilfeseiten gelesen.** Angaben zu Screens/Abläufen stammen daher aus Anbieter-Dokumentation oder Dritten und sind so gekennzeichnet. Evidenzstufen: **belegt** / **plausibel** / **offen**. Nicht abrufbare Seiten sind in Abschnitt 6 vollständig aufgeführt.
- **Die einzige positive RCT-Evidenz für generative KI (Therabot)** kam mit kontinuierlicher Überwachung durch Psycholog:innen/Psychiater:innen, Interventionsbereitschaft, Warteliste-Kontrolle und 4 Wochen Laufzeit zustande; die Autoren selbst: „no generative AI agent is ready to operate fully autonomously in mental health". — **belegt** (Dartmouth-Release zum NEJM-AI-Paper; Paper selbst nicht abrufbar).
- **Regulierung 2025 (USA):** Illinois verbietet KI-Therapie (Public Act 104-0054, 01.08.2025, bis 10.000 $ Strafe); Nevada verbietet, eine KI als therapiefähig darzustellen oder Titel wie „therapist/counselor" zu nutzen; Utah verlangt wiederholte KI-Offenlegung (vor Zugang, nach 7 Tagen Inaktivität, auf Nachfrage) und verbietet Verkauf/Teilen von Gesundheitsdaten und Werbe-Targeting mit Nutzereingaben. APA (13.11.2025): kein Ersatz für Fachpersonen, Krisenfähigkeit „limited and unpredictable". — **belegt** (IDFPR/ILGA-Snippets) / **plausibel** (CASRAI-Vergleich; Gesetzestexte nicht abrufbar).
- **Wysa (plausibel, Anbieterseiten nicht lesbar):** NHS-Einsatz: reale RCT am CNWL NHS Trust (ISRCTN14644939, 07/2021–07/2023, Wartelisten-Patient:innen, PHQ-9/GAD-7); zweite Registrierung ISRCTN10327977 (NHS Talking Therapies) mit widersprüchlichem Status. Ergebnisse nicht gefunden. **SOS-Pfad** (Registertext via Snippet): Erkennung von Risikosprache → Rückfrage, ob richtig verstanden → Auslösen des SOS-Pfads; manueller SOS-Button mit lokalen Krisennummern; Erinnerung, Wysa sei „an AI chatbot and cannot help during emergencies". Ob Gespräche vollständig geskriptet oder teils generativ sind: keine Quelle sagt es klar → **offen**. NICE-ESF-3a-Behauptung nur aus Vendor-Folien → **offen**. (H) Architektur = geskriptete CBT-Übungen + Intent-Erkennung.
- **Illinois HB 1806 → Public Act 104-0054**, unterzeichnet 01.08.2025, sofort wirksam (**belegt** via IDFPR/ILGA-Snippets; IDFPR-News-Seite gelesen): verbietet, „AI to provide mental health and therapeutic decision-making" anzubieten; erlaubt „administrative and supplementary support services for licensed behavioral health professionals"; bis 10.000 $ pro Verstoß, Durchsetzung IDFPR. Konkrete Verbote (keine eigenständigen therapeutischen Entscheidungen, keine direkte therapeutische Kommunikation, keine Behandlungspläne ohne Freigabe, **keine Erkennung von Emotionen oder mentalen Zuständen**) und Ausnahmen (religiöse Seelsorge, Peer-Support, „publicly available self-help and educational materials") nur aus Sekundärquellen → **plausibel**; Statut selbst nicht abrufbar.
- *Nicht abrufbar (ausdrücklich nicht gelesen):** NEJM-AI-Volltext Therabot (403) · openai.com (Sept.- und Okt.-Posts, Sycophancy-Post; 403) · ilga.gov und le.utah.gov (Verbindung verweigert) · Nevada-Gesetzestext (nicht versucht) · apa.org (Advisory-Seite, Pressemitteilung, PDF: leer/binär) · wysa.com/ai-self-help und /faq (nur Seitentitel) · ISRCTN14644939 HTML/PDF (leer/binär) · JMIR 2018 Wysa-Studie (leer) · STAT Woebot (Paywall, nur Einleitung) · mobihealthnews (403) · help.headspace.com (403) · blog.character.ai (404) · wsgrdataadvisor.com, heplerbroom.com, ksbsrb.ks.gov (403/404) · quiz.theliven.com/en/terms-of-use (nur „Quiz") · Stanford-PDF (binär; ersetzt durch arXiv-HTML).
- https://tto.dartmouth.edu/news/2025/03/first-therapy-chatbot-trial-yields-mental-health-benefits · belegt (Institutions-Release) · Therabot-Design, Ergebnisse, Oversight, Zitate. (NEJM AI DOI 10.1056/AIoa2400802 nicht abrufbar.)


**Produkte**
- https://www.rosebud.app/ · belegt (Anbieterseite) · Features, Preise 12,99 $/107,99 $, „HIPAA aligned", kein Krisenhinweis.
- https://help.rosebud.app/getting-started/rosebud's-limitations · belegt (Hilfeseite) · „not a replacement…", Find a Helpline, Halluzinations- und Zeitbezugswarnung.
- https://www.rosebud.app/blog/top-6-ai-journaling-app-for-mental-wellness · belegt (Firmenblog) · „therapist-designed prompt", Langzeitgedächtnis, 988-Hinweis.
- https://www.rosebud.app/blog/ai-diary-app-rosebud · belegt (Firmenblog) · Onboarding, Prompts/Free-write, „not replace therapy".
- https://www.mindsera.com/ · belegt (Anbieterseite) · Frameworks, Minds, Analysen, Preise 14,99 $/129 $, Privacy-Claims, kein Disclaimer.
- https://theliven.com/ · belegt (Anbieterseite) · Features, Livie, Quiz-Einstieg, keine juristische Person.
- https://apps.apple.com/us/app/liven-discover-yourself/id6450840109 · belegt (Store-Listing) · Chesmint Limited, 18+, IAP-Preise, Disclaimer, Privacy-Label.
- https://au.trustpilot.com/review/theliven.com · plausibel (Nutzerrezensionen, via Suche) · Abbuchungs-/Kündigungsbeschwerden, Refunds.
- https://kimola.com/reports/explore-our-in-depth-analysis-of-liven-app-feedback-app-store-us-152177 · plausibel (Aggregator, via Suche) · Beschwerdemuster.
- https://www.autonomous.ai/en-GB/ourblog/liven-app-review-a-mental-wellness-tool-for-productivity-and-focus · offen (Einzelreview, via Suche) · dynamische Preise, Livie als Add-on.
- https://www.isrctn.com/ISRCTN14644939 · plausibel (Registereintrag, nur via Such-Snippet; Direktabruf leer) · CNWL-RCT, SOS-Pfad-Beschreibung.
- https://www.isrctn.com/ISRCTN10327977 · offen (via Suche) · NHS Talking Therapies, widersprüchlicher Status.
- https://blogs.wysa.io/wp-content/uploads/2022/09/AI-and-IAPT-the-pathway-forward-Webinar.pdf · offen (Vendor-Folien, via Suche) · NICE-ESF-3a-Behauptung, geführte Übungen.
- https://www.statnews.com/2025/07/02/woebot-mental-health-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/ · plausibel (Journalismus, Paywall, Einleitung gelesen) · „pre-scripted", 1,5 Mio. Nutzer, FDA/LLM-Begründung.
- https://hlth.com/insights/news/woebot-health-is-shutting-down-its-app-2025-04-28 · plausibel (Branchenmedium) · Abschaltung 30.06.2025, Datenexport, FDA Breakthrough 2021.
- https://www.headspace.com/ebb · belegt (Anbieterseite) · „does not replace human care", „not monitored in real time by a human", Safety-System, 18+, Regionen.
- https://www.figma.com/blog/headspace-ebb-ai-companion/ · plausibel (Sekundär mit Headspace-Zitaten, 05.05.2025) · „Always make the AI visible", Nutzertests, Exit/Delete.
- https://www.choosingtherapy.com/youper-app-review/ und https://intuitionlabs.ai/software/telepsychiatry-digital-mental-health/chatbots-and-ai-therapy-assistants/youper · plausibel (via Suche) · Youper chat-first, 18+, Krisenressourcen.
- https://psyche.co/ideas/what-i-learned-from-sharing-my-private-self-with-an-ai-journal · plausibel (Essay, A. Chen) · Rosebud/Mindsera/Insight-Journal-Test, „false precision", „canned".
- https://dayoneapp.com/guides/labs/ai-features/ · belegt (Anbieterseite) · Opt-in-KI, Entry Highlights, Go Deeper, Datenverarbeitung, kein Training ohne Zustimmung.
- https://www.apple.com/newsroom/2023/12/apple-launches-journal-app-a-new-app-for-reflecting-on-everyday-moments/ · belegt (Anbieter-Newsroom) · On-Device-Vorschläge, E2E-Verschlüsselung.

**Evidenz & Sicherheit**
- https://tto.dartmouth.edu/news/2025/03/first-therapy-chatbot-trial-yields-mental-health-benefits · belegt (Institutions-Release) · Therabot-Design, Ergebnisse, Oversight, Zitate. (NEJM AI DOI 10.1056/AIoa2400802 nicht abrufbar.)
- https://www.technologyreview.com/2025/03/28/1114001/the-first-trial-of-generative-ai-therapy-shows-it-might-help-with-depression/ · plausibel (Journalismus, via Suche) · 210 Teilnehmende, Selbstbericht-Caveat, ~10 Nachrichten/Tag.
- https://arxiv.org/html/2504.18412v1 und https://arxiv.org/abs/2504.18412 · belegt (FAccT-Paper, Volltext) · Stigma-/Angemessenheitsraten, Brücken-Prompt, 93 % Therapeut:innen.
- https://spirals.stanford.edu/research/llm-therapists · belegt (Projektseite der Autoren) · getestete Bots, Schlussfolgerungen.
- https://techcrunch.com/2025/09/02/openai-to-route-sensitive-conversations-to-gpt-5-introduce-parental-controls · plausibel (via Suche) · Routing, Elternkontrollen, Guardrail-Degradation.
- https://bioethics.com/archives/100225 (Repost von WIRED, 28.10.2025) und https://engx.theiet.org/b/articles/posts/openai-reveals-data-on-chatgpt-users-showing-signs-of-crisis-or-suicidal-intent · plausibel (Journalismus) · 0,07 %/0,15 %/0,15 %, Mess-Caveats. (openai.com/index/strengthening-chatgpt-responses-in-sensitive-conversations/ 403.)
- https://techcrunch.com/2025/04/29/openai-explains-why-chatgpt-became-too-sycophantic und https://openai.com/index/expanding-on-sycophancy/ · plausibel (via Suche; OpenAI-Seite nicht geöffnet) · GPT-4o-Rollback, „short-term feedback".
- https://www.nbcnews.com/tech/tech-news/characterai-bans-minors-response-megan-garcia-parent-suing-company-rcna240985 · plausibel (Journalismus, 30.10.2025) · U18-Verbot bis 25.11., Persona, fünf Klagen.
- https://fortune.com/2025/10/29/character-ai-ban-children-teens-chatbots-regulatory-pressure-age-verification-online-harms · plausibel (via Suche) · 2-Stunden-Übergangslimit, Regulierungsdruck.
- https://ktvz.com/money/cnn-business-consumer/2026/01/07/character-ai-and-google-agree-to-settle-lawsuits-over-teen-mental-health-harms-and-suicides/ · plausibel (CNN-Repost, 07.01.2026) · Vergleich Garcia + vier Fälle, Bedingungen nicht offengelegt.
- https://garanteprivacy.it/home/docweb/-/docweb-display/docweb/10132048 · belegt (Behörde, 19.05.2025) · 5 Mio. € gegen Luka Inc., Gründe, neue Trainings-Untersuchung.
- https://idfpr.illinois.gov/news/2025/gov-pritzker-signs-state-leg-prohibiting-ai-therapy-in-il.html · belegt (Behörde, 04.08.2025) · Verbots-/Erlaubnisformel, Kinder-/Chatbot-Bezug.
- https://idfpr.illinois.gov/content/dam/soi/en/web/idfpr/news/2025/2025-08-04-idfpr-press-release-hb1806.pdf und https://www.ilga.gov/Legislation/BillStatus?DocNum=1806&GAID=18&DocTypeID=HB&SessionID=114&GA=104 · belegt (Behörde/Parlament, nur Such-Snippets; Direktabruf verweigert) · Public Act 104-0054, 01.08.2025, bis 10.000 $, einstimmig.
- https://casrai.org/compare/ai-therapy-laws-illinois-nevada-utah-compared · plausibel (Sekundär-Vergleich, redaktionell) · Details IL/NV/UT inkl. Utah-Offenlegungskadenz, Strafen, Ausnahmen.
- https://www.news-medical.net/news/20251113/APA-urges-safeguards-for-using-AI-in-mental-health.aspx · plausibel (Wiedergabe der APA-Mitteilung, 13.11.2025) · Empfehlungen, Evans-Zitate.
- https://www.apa.org/topics/artificial-intelligence-machine-learning/health-advisory-chatbots-wellness-apps · plausibel (apa.org, nur Such-Snippets; Seite leer) · „Developers have the responsibility to be transparent…", „supportive adjunct, not substitute".
- https://arxiv.org/abs/2510.01395 · belegt (Preprint) · Sycophancy 50 %, N=1.604, Präferenz/Abhängigkeit.
- https://techcrunch.com/2026/03/28/stanford-study-outlines-dangers-of-asking-ai-chatbots-for-personal-advice/ · plausibel (Journalismus) · *Science*-Publikation, 49 %/51 %/47 %, Zitate Cheng/Jurafsky.
- https://arxiv.org/abs/2503.17473 · belegt (Preprint, v2 02.10.2025) · RCT n=981, Nutzung ↔ schlechtere Outcomes.
- https://arxiv.org/abs/2504.03888 · belegt (Preprint) · >3 Mio. Konversationen, Abhängigkeit bei Vielnutzung.

### A.5 R5 - Wissenschaftlich reflektierte Fundamente


Format: Quelle · DOI/URL · Abruf 12.10.2026 · Zugriffsart · Evidenzstufe · Inhalt.

1. Nielsen, J. (2006). Progressive Disclosure. https://www.nngroup.com/articles/progressive-disclosure/ · Seite abgerufen · plausibel · Zwei Ebenen, Staged Disclosure, Fallstricke; nur qualitative Belege.
2. Nielsen, J. (1994/2024). 10 Usability Heuristics. https://www.nngroup.com/articles/ten-usability-heuristics/ · Seite abgerufen · plausibel · Faktorenanalyse von 249 Problemen; Daumenregeln.
3. Sweller, J. (1988). Cognitive load during problem solving. Cognitive Science 12(2). DOI 10.1207/s15516709cog1202_4 · DOI bekannt, nicht geöffnet; Inhalt via Sekundärquellen · belegt (Rahmen) · Ursprung der CLT.
4. Sweller, J. (2010). Element interactivity and intrinsic, extraneous, and germane cognitive load. Educ Psychol Rev 22. DOI 10.1007/s10648-010-9128-5 · Abstract via Suche · plausibel · Umdeutung germane load.
5. Sailer, M. & Homner, L. (2020). The gamification of learning: a meta-analysis. Educ Psychol Rev 32, 77–112. DOI 10.1007/s10648-019-09498-w · Abstract via Suche · belegt · g = .49/.36/.25; nur kognitiv stabil.
6. Hanus, M. & Fox, J. (2015). Assessing the effects of gamification in the classroom. Computers & Education 80, 152–161. DOI 10.1016/j.compedu.2014.08.019 · Abstract via Suche · belegt (Einzelstudie) · Badges/Leaderboard senkten Motivation und Noten.
7. Koivisto, J. & Hamari, J. (2019). The rise of motivational information systems. Int J Inf Manag 45, 191–210. DOI 10.1016/j.ijinfomgt.2018.10.013 · Abstract via https://webpages.tuni.fi/gamification/?p=1269 (abgerufen) · belegt (Review) · 819 Studien, „bemerkenswert“ viele gemischte Befunde, PBL dominant.
8. Rodrigues, L. et al. (2022). Gamification suffers from the novelty effect but benefits from the familiarization effect. IJETHE 19. DOI 10.1186/s41239-021-00314-6 · Abstract via Suche · plausibel · 756 Studierende, 14 Wochen, Abfall nach ~4 Wochen.
9. Krath, J., Schürmann, L. & von Korflesch, H. (2021). Revealing the theoretical basis of gamification. Computers in Human Behavior 125, 106963. DOI 10.1016/j.chb.2021.106963 · Abstract via Suche · plausibel · 118 Theorien; SDT und Flow dominant.
10. Ng, J. et al. (2012). Self-determination theory applied to health contexts: a meta-analysis. Perspectives on Psychological Science 7(4), 325–340. DOI 10.1177/1745691612447309 · Abstract via Suche · belegt (korrelativ) · 184 Datensätze.
11. Van den Broeck, A. et al. (2016). A review of SDT's basic psychological needs at work. Journal of Management 42(5). DOI 10.1177/0149206316632058 · Abstract via Suche · belegt · 99 Studien.
12. Ntoumanis, N. et al. (2021). A meta-analysis of SDT-informed intervention studies in health. Health Psychology Review 15(2). DOI 10.1080/17437199.2020.1718529 · via Suche (White-Rose-Preprint-Link), DOI nicht geöffnet · belegt · kleine bis mittlere, heterogene Effekte.
13. Michie, S., van Stralen, M. & West, R. (2011). The behaviour change wheel. Implementation Science 6:42. DOI 10.1186/1748-5908-6-42 · Abstract via Suche (PMC3096582) · belegt (Taxonomie) · 19 Frameworks, COM-B; Wirksamkeitsgewinn offen.
14. Fogg, B. J. (2009). A behavior model for persuasive design. Persuasive '09. DOI 10.1145/1541948.1541999 · DOI bekannt, nicht geöffnet; Inhalt via Sekundärquellen · plausibel · B = MAP. Kritik: Knowles via https://psmag.com/environment/captology-fogg-invisible-manipulative-power-persuasive-technology-81301/ (Suche).
15. Norsworthy, C. et al. (2023). Flow-Scoping-Review-Kritik, Frontiers in Psychology 13:992813. DOI 10.3389/fpsyg.2022.992813 · Abstract via Suche · offen · „approaching a crisis point“.
16. Mahnke, R., Benlian, A. & Hess, T. (2014). Flow experience in IS use. ICIS 2014. https://aisel.aisnet.org/icis2014/proceedings/HumanBehavior/40 · Abstract via Suche · plausibel · Flow kaum von Challenge-Skill abhängig.
17. Shingleton, R. & Palfai, T. (2016). Technology-delivered adaptations of MI for health-related behaviors: a systematic review. Patient Educ Couns 99(1), 17–35. DOI 10.1016/j.pec.2015.08.005 · Abstract via Europe-PMC-API (abgerufen) · plausibel · Machbarkeit ja, Wirksamkeitsdaten begrenzt, relationale Komponenten schwierig.
18. Baricchi, M. et al. (2023). Remote MI in chronic conditions, systematic review and meta-analysis. Eur J Cardiovasc Nurs. (Suchergebnis; DOI nicht geöffnet) · plausibel · SMD −0,20 Depression, inconclusive.
19. French, K., Golijani-Moghaddam, N. & Schröder, T. (2017). What is the evidence for the efficacy of self-help ACT? J Contextual Behav Sci 6(4), 360–374. DOI 10.1016/j.jcbs.2017.08.002 · Abstract via Suche · plausibel · 13 RCTs, g = .34/.35/.42, tentativ.
20. Theeboom, T., Beersma, B. & van Vianen, A. (2014). Does coaching work? J Positive Psychology 9(1). DOI 10.1080/17439760.2013.837499 · Abstract via Suche · belegt · g = .43–.74, 18 Studien.
21. Jones, R., Woods, S. & Guillaume, Y. (2016). The effectiveness of workplace coaching. JOOP 89(2), 249–277. DOI 10.1111/joop.12119 · Abstract via Suche · belegt · δ = .36, 17 Studien.
22. Mertens, S. et al. (2022). The effectiveness of nudging. PNAS 119(1). DOI 10.1073/pnas.2107346118 · via Suche · offen · d = .43, 447 Effekte.
23. Maier, M. et al. (2022). No evidence for nudging after adjusting for publication bias. PNAS 119(31). DOI 10.1073/pnas.2200300119 · Volltext blockiert; Inhalt via https://www.psypost.org/re-analysis-of-meta-analysis-reveals-no-evidence-for-nudging-once-accounting-for-publication-bias/ und Rejoinder https://www.bayesianspectacles.org/rejoinder-no-evidence-for-nudging/ (beide abgerufen) · offen · Kein Gesamteffekt nach RoBMA; Heterogenität; „No Overall Evidence“.
24. Scheibehenne, B., Greifeneder, R. & Todd, P. (2010). Can there ever be too many options? J Consumer Research 37(3), 409–425. DOI 10.1086/651235 · Abstract via Suche · belegt · Mitteleffekt ≈ 0, N = 5.036.
25. Chernev, A., Böckenholt, U. & Goodman, J. (2015). Choice overload: a conceptual review and meta-analysis. J Consumer Psychology 25(2), 333–358. DOI 10.1016/j.jcps.2014.08.002 · Abstract via Suche · belegt · Vier Moderatoren.
26. Cohen, G. & Sherman, D. (2014). The psychology of change: self-affirmation and social psychological intervention. Annu Rev Psychol 65, 333–371. DOI 10.1146/annurev-psych-010213-115137 · Abstract via Suche · plausibel · Affirmation senkt Abwehr; Langzeiteffekte in Feldstudien.
27. Frattaroli, J. (2006). Experimental disclosure and its moderators: a meta-analysis. Psychol Bull 132(6), 823–865. DOI 10.1037/0033-2909.132.6.823 · Abstract via Suche · belegt · r = .075, 146 Studien.
28. Danek, A. et al. (2013). Aha! experiences leave a mark. Psychological Research 77. (Suchergebnis; DOI nicht geöffnet) · belegt (Einzelstudie) · 64,4 % vs. 52,4 % Recall nach 14 Tagen.
29. Danek, A. & Wiley, J. (2020). What causes the insight memory advantage? Cognition 205. DOI 10.1016/j.cognition.2020.104411 · via Suche · plausibel · Korrektheit, Gewissheit, Affekt.
30. Laukkonen, R. et al. (2020). The dark side of Eureka. Cognition 196. DOI 10.1016/j.cognition.2019.104122 · via Suche · belegt · Aha erhöht Wahrheitsurteile auch für Falsches.
31. Grimmer, H. et al. (2022). Eliciting false insights with semantic priming. Psychon Bull Rev. DOI 10.3758/s13423-021-02049-x · via Suche · belegt · FIAT-Paradigma.
32. Grimmer, H. et al. (2023). The illusion of insight: detailed warnings reduce but do not prevent false „Aha!“ moments. Cognition and Emotion. DOI 10.1080/02699931.2022.2159936 · via Suche · belegt · präregistriert, N = 255.
33. Bisra, K. et al. (2018). Inducing self-explanation: a meta-analysis. Educ Psychol Rev 30, 703–725. DOI 10.1007/s10648-018-9434-x · Abstract via Suche · belegt · g = .55, 69 Effekte.
34. Bertsch, S. et al. (2007). The generation effect: a meta-analytic review. Memory & Cognition 35, 201–210. DOI 10.3758/BF03193441 · Abstract via Suche (PubMed 17645161) · belegt · d = .40, 86 Studien.
35. Dunlosky, J. et al. (2013). Improving students' learning with effective learning techniques. Psychol Sci Public Interest 14(1), 4–58. DOI 10.1177/1529100612453266 · via Suche · belegt · Retrieval und Spacing „high utility“.
36. Gollwitzer, P. & Sheeran, P. (2006). Implementation intentions and goal achievement. Adv Exp Soc Psychol 38, 69–119. DOI 10.1016/S0065-2601(06)38002-1 · via Suche · belegt · d = .65, 94 Tests.
37. Webb, T. & Sheeran, P. (2006). Does changing behavioral intentions engender behavior change? Psychol Bull 132(2). DOI 10.1037/0033-2909.132.2.249 · via Suche · belegt · Intention d = .66 → Verhalten d = .33.
38. Wang, G., Wang, Y. & Gai, X. (2021). A meta-analysis of MCII on goal attainment. Frontiers in Psychology 12:565202. DOI 10.3389/fpsyg.2021.565202 · Volltext abgerufen · plausibel · g = .336, Trim-and-Fill .242, dokumentbasiert .277.
39. Silverman, J. & Barasch, A. (2023). On or Off Track: How (Broken) Streaks Affect Consumer Decisions. J Consumer Research 49(6), 1095–1117. DOI 10.1093/jcr/ucac029 · Abstract via Suche · belegt · 7 Studien; Bruch senkt Engagement; Reparierbarkeit dämpft.
40. Gray, C. et al. (2018). The Dark (Patterns) Side of UX Design. CHI '18. DOI 10.1145/3173574.3174108 · via Suche · plausibel (Taxonomie) · Definition und Typologie.
41. Mathur, A. et al. (2019). Dark Patterns at Scale. PACM HCI 3 (CSCW), Art. 81. DOI 10.1145/3359183 · Abstract via Suche (arXiv 1907.07032) · belegt · 1.818 Instanzen, 15 Typen, 183 täuschende Sites.
42. Bogost, I. (2011). Gamification is Bullshit / Persuasive Games: Exploitationware. https://www.gamedeveloper.com/business/feature-gamification-no-exploitationware · via Suche · plausibel (Essay) · Kritik der „leichten, langweiligen“ Spielelemente.
43. Deterding, S. (2014). Eudaimonic Design, or: Six Invitations to Rethink Gamification. In: Rethinking Gamification, meson press, 305–331. https://mediarep.org/entities/bookpart/8a83c8bf-8ec2-48c2-bbde-0829488ad549/full · nur Metadaten via Suche · plausibel · Sinn statt Punkte.
44. Weber, P., Grönewald, L. & Ludwig, T. (2023). Reflection on the Octalysis framework as a design and evaluation tool. Zusammenfassung: https://universityxp.com/research/2023/3/5/reflection-on-the-octalysis-framework-as-a-design-and-evaluation-tool · via Suche · offen · Wenige akademische Reflexionen; „vereinfacht“/„überfordernd“. Ergänzend CEUR-WS Vol. 3147 Paper 8 (2022): keine akademische Studie zur Praxiswirkung.
45. Lerner, M. & Simmons, C. (1966). Observer's reaction to the „innocent victim“. J Pers Soc Psychol 4(2). DOI 10.1037/h0023562 · DOI bekannt, nicht geöffnet; Inhalt via https://en.wikipedia.org/wiki/Just-world_fallacy (Suche) · belegt · Opferabwertung.
46. Spiritual Bypass: Exploring Experts' Perspectives on Spiritual Bypass. Pastoral Psychology (2017/18). DOI 10.1007/s11089-017-0796-7 · Abstract via Suche · offen · n = 10 Interviews; wenig Forschung.
47. Rotter, J. (1966). Generalized expectancies for internal versus external control. Psychol Monographs 80(1). DOI 10.1037/h0092976 · DOI bekannt, nicht geöffnet; Inhalt via Open-University-Seite (Suche) · belegt korrelativ · Kontinuum; Kausalität offen.
48. Forer, B. (1949). The fallacy of personal validation. J Abnorm Soc Psychol 44(1), 118–123. DOI 10.1037/h0059240 · via Suche · belegt · 39 Studierende, identisches Profil.
49. Dickson, D. & Kelly, I. (1985). The „Barnum Effect“ in personality assessment: a review. Psychological Reports 57, 367–382. DOI 10.2466/pr0.1985.57.2.367 · via Suche · belegt (Review) · Relevanz und Günstigkeit steuern Akzeptanz.
50. Carlson, S. (1985). A double-blind test of astrology. Nature 318, 419–425. DOI 10.1038/318419a0 · via Suche (Wikipedia/Skeptic-Zusammenfassungen) · belegt · Zufallsniveau; Konfidenz irrelevant. Gegenposition: Ertel (2009), Reanalyse p = .054 — offen.
51. Dean, G. & Kelly, I. (2003). Is astrology relevant to consciousness and psi? J Consciousness Studies 10(6–7), 175–198. https://www.ingentaconnect.com/content/imp/jcs/2003/00000010/f0020006/art00010 · Abstract via Suche · belegt · Zeitzwillinge, >40 Studien, keine Überzufälligkeit.
52. Lillqvist, O. & Lindeman, M. (1998). Belief in astrology as a strategy for self-verification and coping. European Psychologist 3(3), 202–208. DOI 10.1027/1016-9040.3.3.202 · Abstract via Suche · plausibel · N = 40; Selbstgewissheit gestiegen; Krisen korreliert.
53. Sandmann, M. (2015). Astrologieglaube, Intuition und Kontrollverlust. Zeitschrift für Anomalistik 15, 281 ff. https://www.anomalistik.de/images/pdf/zfa/zfa2015_3_281_sandmann.pdf · via Suche · plausibel · N = 1.460/826; kausale Manipulation scheiterte.

### A.6 R6 - Recht, Datenschutz, Barrierefreiheit, Krisennummern, Jobverlust-Fakten

**Fehlgeschlagene Abrufe (aus dem Bericht):**
- Methodik: ca. 60 Abrufe (deutlich mehr als die 12–18 des Auftrags, weil zwölf Teilfragen und drei Länder). Nicht erreichbar waren: krisenchat.de (HTTP 403), deutsche-depressionshilfe.de (403), telefonseelsorge.at (Verbindung abgelehnt), EUR-Lex (leerer Inhalt bei drei Versuchen), ETSI-Übersichtsseite und Bundesfachstellen-Seite zur EN 301 549 (404), findahelpline-Eintrag Tel 143 (404). Für diese Punkte wurden Ersatzquellen genutzt und entsprechend herabgestuft. Drei PDFs (EDPB-Leitlinien, BA-Weisungen, WP29-Annex, DSK-OH) wurden heruntergeladen und gelesen.
- https://eur-lex.europa.eu/eli/reg/2026/1744/oj · nicht lesbar (leer) · Omnibus-Fundstelle laut Kommissionslink


**KI-VO**
- https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai · belegt · Kommission: Zeitplan, Omnibus-Einigung 7.5.2026, in Kraft 27.7.2026, Hochrisiko 2.12.2027/2.8.2028, Transparenz Aug. 2026
- https://artificialintelligenceact.eu/article/50/ · belegt (Verordnungstext-Spiegel) · Art. 50 Abs. 1, 5; Geltung 2.8.2026
- https://artificialintelligenceact.eu/article/5/ · belegt (Spiegel) · Art. 5 lit. a/b, seit 2.2.2025
- https://artificialintelligenceact.eu/annex/3/ · belegt (Spiegel) · Anhang-III-Bereiche
- https://artificialintelligenceact.eu/article/3/ · belegt (Spiegel) · Definitionen Anbieter/Betreiber/Emotionserkennung/biometrisch
- https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/ · plausibel · Art. 50 nicht verschoben
- https://cdp.cooley.com/digital-ai-omnibus-delays-key-deadlines-introduces-new-rules/ · plausibel · Omnibus-Überblick
- https://www.aiactblog.nl/en/posts/article-50-transparency-deadline-2-august-2026 · plausibel · Art.-50-Frist bestätigt
- https://www.aiacto.eu/en/blog/digital-omnibus-ai-act-report-2027 · plausibel/offen · abweichende Angabe zur Art.-50-Abs.-2-Übergangsfrist
- https://eur-lex.europa.eu/eli/reg/2026/1744/oj · nicht lesbar (leer) · Omnibus-Fundstelle laut Kommissionslink

**DSGVO/TDDDG**
- https://dejure.org/gesetze/DSGVO/9.html · belegt · Art. 9 Abs. 1, Abs. 2 lit. a
- https://dejure.org/gesetze/DSGVO/4.html · belegt · Art. 4 Nr. 1, 5, 11, 15
- https://dsgvo-gesetz.de/erwaegungsgruende/nr-35/ · belegt · ErwG 35 Gesundheitsdaten
- https://dsgvo-gesetz.de/erwaegungsgruende/nr-26/ · belegt · ErwG 26 Pseudonymisierung
- https://dejure.org/gesetze/DSGVO/7.html · belegt · Art. 7
- https://dejure.org/gesetze/DSGVO/8.html · belegt · Art. 8 (16 Jahre)
- https://dejure.org/gesetze/DSGVO/17.html · belegt · Art. 17
- https://dejure.org/gesetze/DSGVO/25.html · belegt · Art. 25
- https://dejure.org/gesetze/DSGVO/28.html · belegt · Art. 28
- https://ec.europa.eu/justice/article-29/documentation/other-document/files/2015/20150205_letter_art29wp_ec_health_data_after_plenary_annex_en.pdf · belegt (PDF gelesen) · WP29-Annex Gesundheitsdaten in Apps, Mood Diary, drei Kategorien
- https://www.edpb.europa.eu/system/files/2025-01/edpb_guidelines_202501_pseudonymisation_en.pdf · belegt (PDF gelesen) · Guidelines 01/2025, 16.1.2025, Konsultationsfassung
- https://www.taylorwessing.com/de/insights-and-events/insights/2024/10/ecj-lindenapotheke · plausibel · EuGH C-21/23
- https://loschelder.de/fileadmin/redaktion/newsletter/pdf/datenschutzrecht/2024_10_Oktober_2_Beitrag.pdf · plausibel · weite Auslegung Art. 9
- https://www.osborneclarke.com/de/insights/die-wichtigsten-entscheidungen-des-eugh-zum-datenschutz-im-jahr-2024 · plausibel · C-184/20, C-21/23
- https://www.jonesday.com/de/insights/2025/09/cjeu-clarifies-scope-of-personal-data-in-edps-v-srb-decision · plausibel · EuGH C-413/23 P (4.9.2025)
- https://www.aoshearman.com/en/insights/ao-shearman-on-data/cjeu-clarifies-concept-of-personal-data-for-a-transfer-of-pseudonymised-data-to-third-parties · plausibel · relativer Personenbezug
- https://www.bundestag.de/resource/blob/959324/WD-10-019-23-pdf.pdf · plausibel (Suchtreffer, nicht geöffnet) · Wiss. Dienst zu Art. 8
- https://nexvyra.de/fakten/dsgvo-kinder-einwilligung-art-8 · plausibel · keine Absenkung in DE
- https://www.gesetze-im-internet.de/ttdsg/__25.html · belegt · § 25 TDDDG
- https://www.datenschutzkonferenz-online.de/media/oh/OH_Digitale_Dienste.pdf · belegt (PDF gelesen) · DSK OH Digitale Dienste V1.2, Nov. 2024, Rn. 21, 26, 44, 61–62, 66–95, 113–114, 133
- https://www.datenschutzkonferenz-online.de/orientierungshilfen.html · belegt · Übersicht/Versionen

**Drittland/Anthropic**
- https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en · belegt · DPF-Angemessenheitsbeschluss angenommen
- https://www.dataguidance.com/news/eu-cjeu-admits-microsoft-intervener-appeal-concerning · plausibel · C-703/25 P, Microsoft 4.6.2026
- https://streamlex.eu/news/general-court-ruling-latombe-commission/ · plausibel · T-553/23 (3.9.2025)
- https://secureprivacy.ai/blog/is-the-eu-us-data-privacy-framework-at-risk-the-ftc-ruling-explained-2026 · offen · US-Risiken 2026
- https://www.anthropic.com/legal/data-processing-addendum · belegt · DPA 24.2.2025, SCC, Subprozessoren, Löschung, DSFA
- https://platform.claude.com/docs/en/manage-claude/api-and-data-retention · belegt · ZDR, Covered Models 30 Tage, 2-Jahre-Flag, Feature-Tabelle
- https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data · plausibel (Suchtreffer, nicht geöffnet) · 30-Tage-Standard
- https://compound.law/de-DE/compliance/anthropic-dsgvo-compliance/ · plausibel · DPF-Teilnahme, Zertifizierungen
- https://sonomos.ai/blog/claude-dpa-explained-2026/ · plausibel · DPA-Praxis, Residency-Widerspruch

**Barrierefreiheit/Sonstiges**
- https://www.gesetze-im-internet.de/bfsg/__1.html · belegt · § 1 BFSG
- https://www.gesetze-im-internet.de/bfsg/__2.html · belegt · § 2 Nr. 16, 17, 26
- https://www.gesetze-im-internet.de/bfsg/__3.html · belegt · § 3 Abs. 3 Kleinstunternehmen
- https://www.bundesfachstelle-barrierefreiheit.de/DE/Fachwissen/Produkte-und-Dienstleistungen/Barrierefreiheitsstaerkungsgesetz/barrierefreiheitsstaerkungsgesetz_node.html · belegt · Anwendungsbereich, 28.6.2025
- https://www.w3.org/TR/WCAG22/ · belegt · Erfolgskriterien (Fassung 12.12.2024)
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · belegt · 2.5.8 Text und Ausnahmen
- https://www.etsi.org/deliver/etsi_en/301500_301599/301549/03.02.01_60/en_301549v030201p.pdf · belegt (Suchtreffer) · EN 301 549 V3.2.1
- https://www.etsi.org/deliver/etsi_en/301500_301599/301549/04.01.01_60/en_301549v040101p.pdf · offen · V4.1.1 (2026-09), EAA-Bezug
- https://www.gesetze-im-internet.de/ddg/__5.html · belegt · § 5 DDG
- https://www.gesetze-im-internet.de/heilprg/__1.html · belegt · § 1 HeilprG
- https://www.gesetze-im-internet.de/psychthg_2020/__1.html · belegt · § 1 PsychThG
- https://rewis.io/urteile/urteil/5ev-10-10-2019-3-c-1617/ · plausibel · BVerwG 3 C 16/17
- https://cdn.in-konstellation.de/wp-content/uploads/2026/03/Rechtliche_Rahmenbedingungen_des_systemischen_Coachings_Wolfgang_Hardt.pdf · plausibel · Coaching/Heilkunde-Abgrenzung
- https://www.sonntagsblatt.de/artikel/familie/carenow-wie-eine-app-junge-menschen-mit-psychischen-problemen-unterstuetzt · plausibel · Beispiel Altersgrenze 13

**Krisenressourcen**
- https://www.telefonseelsorge.de/ · belegt · Nummern, 24 h, kostenfrei, Chat/Mail
- https://familienportal.de/familienportal/lebenslagen/krise-und-konflikt/krisetelefone-anlaufstellen · belegt (BMFSFJ) · Sammelliste inkl. Info-Telefon Depression
- https://www.nummergegenkummer.de/ · belegt · 116 111, Elterntelefon, Zeiten
- https://www.hilfetelefon.de/das-hilfetelefon.html · belegt · 116 016, 24 h, kostenfrei, 18 Sprachen
- https://findahelpline.com/organizations/krisenchat · belegt (Verzeichnis) · krisenchat verifiziert, ohne Nummer
- https://utopia.de/ratgeber/krisenchat-ueber-whatsapp-psychologische-beratung-fuer-jugendliche/ · plausibel · unter 25, WhatsApp/SMS, 24/7
- https://europa.eu/youreurope/citizens/travel/security-and-emergencies/emergency/index_en.htm · belegt · 112 kostenlos EU-weit
- https://www.gesundheit.gv.at/leben/suizidpraevention/anlaufstellen/notrufnummern.html · belegt · AT 142, 147, gebührenfrei
- https://www.rataufdraht.at/ · belegt · 147, Chat-Zeiten
- https://www.143.ch/ , https://www.143.ch/chat-deutschschweiz/ , https://www.143.ch/mail-beratung/ · belegt · 143, Chat 10–22, Mail 48 h
- https://findahelpline.com/organizations/verband-143-ch-die-dargebotene-hand · plausibel (Suchtreffer; Seite 404) · Anbietergebühr 20–70 Rp.
- https://www.147.ch/ · belegt · 147 kostenlos, 24 h, WhatsApp/Peer-Chat/E-Mail
- https://findahelpline.com/ · belegt (Selbstauskunft) · ThroughLine, 175+ Länder

**Jobverlust**
- https://www.gesetze-im-internet.de/kschg/__4.html · belegt · § 4 KSchG
- https://www.gesetze-im-internet.de/kschg/__7.html · belegt · § 7 KSchG
- https://www.gesetze-im-internet.de/sgb_3/__38.html · belegt · § 38 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__141.html · belegt · § 141 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__142.html · belegt · § 142 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__143.html · belegt · § 143 SGB III (30 Monate)
- https://www.gesetze-im-internet.de/sgb_3/__147.html · belegt · § 147 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__149.html · belegt · § 149 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__158.html · belegt · § 158 SGB III
- https://www.gesetze-im-internet.de/sgb_3/__159.html · belegt · § 159 SGB III
- https://www.arbeitsagentur.de/datei/fw-sgb-iii-159_ba034410.pdf · belegt (PDF gelesen) · BA Fachliche Weisungen § 159, gültig ab 1.7.2026
- https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/finanzielle-hilfen/arbeitslosengeld-anspruch-hoehe-dauer · belegt · BA: Anspruch, Höhe, Dauer, Berechnung
- https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld/das-muessen-sie-beachten/kuendigung-abfindung-freistellung · belegt · BA: Sperrzeit-Hinweis, 3-Wochen-Frist
- https://www.bundesregierung.de/breg-de/aktuelles/neue-grundsicherung-2399562 · belegt · Neue Grundsicherung, 1.7.2026
- https://www.ams.at/arbeitsuchende/arbeitslos-was-tun · belegt · AMS-Schritte
- https://www.arbeit.swiss/secoalv/de/home/menue/stellensuchende/arbeitslos-was-tun-.html · belegt · RAV-Schritte, Art. 18 AVIG



## Anhang B — Review-Protokoll der Fachagenten (Dissens dokumentiert)

**Ablauf.** Am 12.10.2026 wurden sechs getrennte Fachreviews gestartet (UX, Compliance, Analytics/CRO, Marke, Technik, Psychologie/Game Design); sie brachen am Sitzungslimit ab. Bei der Fortsetzung wurden drei gebündelte, rein lesende Reviews durchgeführt: **(1) Compliance & Grenzen** (Reviewer-Agent Trustbridge), **(2) UX · Psychologie · Game Design · Marke** (Fachreview), **(3) Technik · KI-Systemdesign · Messmodell** (Fullstack-Architekt, read-only). Alle drei prüften Blueprint, Prototyp-Code und die Rohberichte R4–R6. Dissens wurde nicht geglättet; die Entscheidung je Punkt steht in der rechten Spalte und ist entweder **umgesetzt**, **in den Blueprint übernommen** oder als **[OG]** an Ben zurückgegeben.

### B.1 Übernommen in den Prototyp (12.10.2026, erneut getestet)

| Befund (Review) | Umsetzung |
|---|---|
| Krisen-Screen: 116 123, 116 111/U25, 116 016, AT/CH-Nummern fehlten; keine `tel:`-Links; Toast/Animation im Krisenmoment (1) | Kontakte vollständig, Reihenfolge akute Gefahr → reden → U25/U18 → Gewalt → AT/CH; `tel:`-Links; kein Toast auf SAFETY; Sprecher „Der Finder ist ein Programm“ statt Ich-Stimme |
| „Für Erwachsene“ ist Behauptung, keine Selbstauskunft (1) | Checkbox „Ich bin mindestens 18 Jahre alt“ (gate für Weiter) + U18-Verweis 116 111 / 147 |
| KI-Auswertung von Freitext ohne Einwilligung; Art. 50 + Art. 9 gehören zusammen (1, 3) | Einwilligungs-Checkbox im Freitextfeld (Anbieter, Land, Zweck, Widerruf); ohne Haken keine (simulierte) KI, Reise läuft weiter (Kopplungsverbot); Card-Export trägt „Erstellt mit KI-Unterstützung“ |
| Krisentext bleibt im Speicher; „Später weiter“ löst erneut aus (1, 2, 3) | Auslösender Text wird verworfen, `crisis_seen` bleibt für die Session, Freitext-KI gesperrt; Freitexte werden grundsätzlich nie in localStorage geschrieben |
| Signalwörter ohne Wortgrenzen („Spritzen“ trifft „ritzen“) (3) | `\b`-Grenzen; Hinweis auf versionierte Datendatei für PHP + JS |
| „Trifft es?“-Sätze unterscheiden sich nur im „weil“ → Wiedererkennung statt Verständnis, Barnum-anfällig (2) | Nachbarsätze variieren jetzt das **Muster** („sage ich Ja – und meine es auch“ / „sage ich Nein, obwohl ich Ja meine“); Kompromiss-Pfad formuliert „entscheide ich mich bewusst …“ |
| Gleislage-Pfad bekam innere Motive in A10a, „Keiner davon“ sprang zur Mechanik, Card verlangte eine Brücke (2) | Eigene Validierungssätze ohne inneres Motiv; „Keiner davon“ → Spielraum-Frage; Card-Brücke „Heute nichts zu stellen. Hinschauen reicht.“ |
| Abweichungsberechnung ignorierte Richtung und Getan-Seite; Ausweichen wurde „Im Einklang“ (2) | Berechnung über Seiten (Impuls/Erwartung), Getan-Kacheln je Richtung wörtlich, neue Kategorie **nicht gestellt**, zweite Lücke erkannt |
| Keine frühe Ausstiegskachel für „keine Wahl“ (2) | A3-Kachel „Schon gestellt – ich hatte keine Wahl“ → direkt Gleislage |
| Abstandszähler = Score mit Wertachse (2) | Neutrale Zählung „4× Erwartung · 1× Impuls“; Alternative heißt „Dein Gleis zeigen“; Erinnerungs-Rahmung („die letzten Male“) |
| Spiegelzeilen = Label-Echos; Bot-Meta („notiert als deine Worte“) (2) | Verbundene Zeile nach A4 („Du wolltest …, hast Ja zu Köln gesagt – und dann: gemacht.“); Meta gestrichen |
| Lob-/Erlaubnis-Toasts, „Befund“, Selbstabwertung in A7b (1, 2) | Neutrale Toasts; „Beobachtung“/„Stand“; „Ich habe weniger gesagt, als ich meinte.“ |
| A1 redundant bei vorbelegtem Bereich; 13 Screens (2) | A1 nur bei eigener/gespiegelter Szene → Standardpfad 12 Screens, erste Interaktion auf Screen 3 |
| Stellwerk-Buttons als Radios mit statischem `aria-checked`; doppelte Live-Regionen; rAF/Timeouts nicht aufgeräumt (3) | Buttons in `role="group"` mit sprechenden Labels; eine Live-Region; `onBeforeUnmount`/Timeout-Cleanup |
| `AI_POLICY` A10a/A9 inkonsistent; Szenenwechsel ließ alte Texte stehen (3) | Policy korrigiert; Szenenwechsel setzt Texte, Validierung, Plan zurück |

### B.2 Übernommen in den Blueprint

| Befund | Änderung |
|---|---|
| (1) DSFA „erwägen“ ist zu lax; HK-Entität ohne EU-Vertreter (Art. 27); Leistungsdetails im Fristen-Text zu nah an Rechtsauskunft | 6.8: DSFA fest einplanen; Art.-27-Frage als Pflichtpunkt; B1 auf drei Fristen + Unterlagen + Fachstellen reduzieren, ALG-Höhe/-Dauer streichen |
| (1) Schutzregeln (Frequenz/Schuld, Anstiftung, Nummern aus UI, Astro nur nach Opt-in) stehen nur im Blueprint, nicht im unveränderlichen Sicherheitskern | Kap. 10 F2: vier Zusatzsätze für `core-system.md` zur Gegenlesung; B.4 fertige Vorschlagstexte für `TRUSTBRIDGE_LEGAL_BOUNDARIES.md` (§9–13) |
| (3) Lab-Logik darf nicht Produktmuster werden (zwei Regel-Logiken PHP/JS) | 7.2/8.1: **Regeln als Daten** (Übergangs-/Ableitungstabellen, Stop-Regeln, Szenen-Pools, Validierungsschablonen im Journey-Modul), zwei dünne Interpreter gegen dieselben Golden-Fixtures, PHP autoritativ |
| (3) `at_closing` als Standardaufruf unnötig — Card entsteht deterministisch | 4.0/6.2: Card-Formulierung durch KI nur **auf Wunsch** („In meinen Worten“); Normalfall 0 Aufrufe |
| (3) Krisenprüfung muss auch clientseitig laufen, weil Freitext ohne Einwilligung den Browser nie verlässt | 4.0/6.8: gemeinsame `safety-signals.json`, Server autoritativ |
| (3) Schema-Lücken: `consents.free_text_ai`, `derived`/`visual_state`/`validation` im Session-Schema, `mirror_line`/`example_cards` im FinderTurn, Seed A mit anderen Fakt-Schlüsseln | 7.2 Liste ergänzt; Seed-A-Migration als M1-Aufgabe |
| (3) Aufwand M1–M5 zu knapp | 8.1: realistisch 7–8 Wochen statt 5–6; M2 und M4 je 1,5–2 Wochen |
| (2) Metriken trivial erfüllbar; keine Schutzmetrik für Scham/Schuld; „Trifft es?“-Quote beruhigt falsch | 9.1: validierte Erkenntnis nur mit Ausnahme **oder** Abruf ≥ 3 Tage; Barnum-Kontrolle (eigene vs. gleich plausible Fremd-Card); Schutz-Items „bewertet / schuldig / gelenkt“; TTFI → „Time to deviation“ |
| (2) Tagesweiche setzt täglich eine Weiche voraus; Lichter je Selbstbericht laden zum Produzieren ein | 6.5: „Gab es heute eine Weiche?“ mit „Keine – auch gut“ vorn; Default aus/wöchentlich; Cards als Journal ohne Zahl |
| (2) Reise B: Wut/Ungerechtigkeit, Trauer, Erleichterung fehlen; Vorwärts-Reframing vor „Heute nicht“ | 4.2: drei Kacheln ergänzt; B4-Mini-Erklärung neutral; optional später „Gibt es etwas, das du selbst anders stellen wolltest?“ |
| (1, 2, 3) Selbsteinschätzung vor Simulation (Ankerung), Pflicht-Ausnahme in A10a | 9.3: als Varianten in E1/E3 aufgenommen statt vorab entschieden |

### B.3 Dissens — und meine Entscheidung

| Punkt | Review-Position | Entscheidung |
|---|---|---|
| **Eisenbahn-Vokabular** (Stellwerk, Gleislage, Zug) vs. Markenwelt Wald/Weg/Brücke (2) | Nur „Weiche“ behalten; Stellwerk → „Fünf Abzweige“, Gleislage → „Vorgegebenes Gelände“, Zug → „dein Licht“; Kacheltitel wörtlich | Kacheltitel wörtlich **umgesetzt**. Vokabular ist **[OG]**: Die Weiche ist Bens Originalbild; ich empfehle Bens Entscheidung zwischen „Weiche + Weg/Licht/Brücke“ (Review) und „Eisenbahn komplett“. Verbindung Weiche–Brücke übernommen: Weiche = wo Wege sich teilen, Abweichung = der Gap, Brücke = der Schritt darüber („Bridge Your Gap“) |
| **Finder Card in Checkout-/Reward-Optik mit Münze** (2) | Erkenntnis als Coin; eigene Hülle ohne Münze | **Nicht geändert.** Ben hat die Epic-Checkout-Optik für die Finder Card in V0.1 ausdrücklich gewählt (Prizes-Regel). Als Frage in Kap. 10 (F1) aufgenommen |
| **Selbst erzeugt schützt nicht vor false insight** (2) | Generierung unter suggestiver Rahmung erzeugt Aha; Schutz allein Disconfirmation (Ausnahme), daher Pflicht | Teilweise: Ausnahme bleibt **optional** (Reibung), aber Metrik zählt nur mit Ausnahme/Abruf; Pflicht-Variante wird in E3 getestet [OG] |
| **„Kennst du das?“ benennt das Muster vor dem Fakt** (2) | Produkt-Einstieg „Was ist passiert?“ (G10) | Für Reise A bleibt „Kennst du das?“ (Gründervorgabe: Beispiele zum Anklicken); für den Produkt-Einstieg über alle Reisen **[OG]** (Kap. 10 F8) |
| **Sprecherstimme** (Panther, „wir“, niemand) (2) | Festlegen, kein Ich | Toasts neutralisiert; Stimme **[OG]** |
| **Splitter/Shards** (2) | Auch als „Einsichten“ extrinsisch; keine Zählung | Ich empfehle „ohne Zahl“ — Bens Richtung (Shards) bleibt **[OG]**, Kap. 10 F6 |
| **Astro nach M3** (3) | Verschiebt Festlegung 0.1.5 und braucht ausdrückliches Go | Zugestimmt: Kap. 10 F3 fragt ausdrücklich |
| **Altersverifikation** (1) | Selbstauskunft genügt, keine Ausweisprüfung | Zugestimmt |
| **Art.-50-Screen vor jeder Reise** (R6-Vorschlag) (1) | Zu streng bei 0 KI-Aufrufen; Hinweis + Einwilligung beim ersten Aufruf reicht | Zugestimmt, so umgesetzt |

### B.4 Vorschlagstexte (aus Review 1) für `TRUSTBRIDGE_LEGAL_BOUNDARIES.md` — nur mit Bens Freigabe einfügen

**9. KI-Dialoge und Gesundheitsdaten** — Freitext zu Stimmung/Belastung, der durch KI ausgewertet wird, gilt bis zur Prüfung als Gesundheitsdatum (Art. 9 DSGVO): ausdrückliche Einwilligung vor dem ersten KI-Aufruf, Reise ohne Freitext vollständig nutzbar, KI-Hinweis nach Art. 50 KI-VO spätestens beim ersten KI-Aufruf, Drittlandtransfer und Löschfrist im Datenschutzhinweis, DSFA dokumentieren.
**10. Krisen und Heilkunde-Grenze** — Keine Diagnosen, kein „Befund“, keine Linderungsversprechen. Krisensignale führen zu einem festen Sicherheitstext mit verifizierten Nummern (DE/AT/CH) ohne Methodik; Nummern jährlich prüfen.
**11. Sozialrecht bei Jobverlust** — Nur feste, datierte Fristen-Hinweise mit Fachstellenverweis. Nie: „Lass dich lieber kündigen“, „ein Jahr Geld“, Leistungsoptimierung.
**12. Spirituelle Deutung** — Frequenz, Anziehung, Astrologie sind gekennzeichnete Opt-in-Perspektiven. Nie: Leid, Krankheit, Gewalt, Armut oder Kündigung als „angezogen“ oder „Lehre“ deuten; Formulierung „Ausrichtung“, nie „du ziehst an“.
**13. Niederlassung** — Trustbridge-Entität in Hongkong: EU-Vertreter nach Art. 27 DSGVO bzw. EU-Verantwortlicher vor jedem Nutzertest klären.

### B.5 Zusatzsätze für den Sicherheitskern (`core-system.md` §2–§4), zur Gegenlesung

1. „Du erklärst Leid, Krankheit, Gewalt, Armut, Diskriminierung oder eine Kündigung nie als Folge der inneren Ausrichtung, Frequenz oder Anziehung des Nutzers. Äußere Ereignisse sind Gleislage, keine Weiche.“
2. „Du gibst keine Hinweise, wie eine Kündigung herbeigeführt, Leistungen ‚optimiert‘ oder Fristen umgangen werden. Zu Fristen, Ansprüchen und Aufhebungsverträgen verweist du ausschließlich auf Agentur für Arbeit, Gewerkschaft oder Fachanwalt.“
3. „Die Rufnummern im Krisenfall zeigt die Oberfläche; du nennst keine eigenen.“
4. „Auch allgemeine Konstellationen (Mondphase, Transite) nur, wenn der Nutzer die astrologische Perspektive aktiv gewählt hat.“
