/*
  Finder Lab — Reise A „Authentizität" (experimenteller Prototyp, 12.10.2026)
  ---------------------------------------------------------------------------
  Umsetzung von TRUSTBRIDGE_FINDER_MASTER_UX_BLUEPRINT.md, Kap. 4.1 und 5.
  Reine Daten und pure Funktionen. Keine API, keine Server-Speicherung.
  Nicht Teil des Produkts: Der Ordner Components/FinderLab, die Seite
  Pages/FinderLab.vue und eine Routenzeile (nur lokal) sind der gesamte
  Fußabdruck — siehe README.md in diesem Ordner.

  Methode: FAKT → ABWEICHUNG → WARUM → MECHANIK → BRÜCKE
  Haltung: keine Diagnosen; ein bewusster Kompromiss ist kein Bruch mit
  sich selbst; nicht jede Weiche hat der Nutzer gestellt (Gleislage).
*/

export const LAB_VERSION = 'lab-0.1';

export const PHASES = [
  { id: 'fakt',       label: 'Fakt' },
  { id: 'abweichung', label: 'Abweichung' },
  { id: 'warum',      label: 'Warum' },
  { id: 'mechanik',   label: 'Mechanik' },
  { id: 'bruecke',    label: 'Brücke' },
];

/* Screen-IDs wie im Blueprint. SAFETY liegt außerhalb der Methodik. */
export const SCREEN_PHASE = {
  A0: 'fakt', A1: 'fakt', A2: 'fakt', A3: 'fakt', A4: 'fakt',
  A5: 'abweichung', A5b: 'abweichung',
  A6: 'warum',
  A7: 'mechanik', A7b: 'mechanik', A7x: 'mechanik', A8: 'mechanik',
  A9: 'bruecke', A10a: 'bruecke', A10b: 'bruecke',
  SAFETY: null,
};

/* Wann die (simulierte) KI gerufen würde — Blueprint 4.0 „KI nur, wo sie etwas kann". */
export const AI_POLICY = {
  A0: 'on_free_text', A1: 'on_free_text', A2: 'on_free_text', A3: 'never', A4: 'on_free_text',
  A5: 'never', A5b: 'never', A6: 'on_free_text', A7: 'never', A7b: 'never', A7x: 'never',
  A8: 'on_free_text', A9: 'never', A10a: 'at_closing', A10b: 'never', SAFETY: 'never',
};

/* ── A0: „Kennst du das?" — Szenen zum Anklicken (G2 Köln/Düsseldorf) ── */
export const SCENES = [
  { id: 'koeln',   icon: 'users',     label: 'Köln statt Düsseldorf', title: 'Freunde wollen nach Köln. Du willst eigentlich woanders hin – und sagst Ja.', domain: 'freunde', impulse: 'Düsseldorf', expectation: 'Köln' },
  { id: 'aufgabe', icon: 'briefcase', label: 'Noch eine Aufgabe',     title: 'Dein Chef legt nach. Du bist voll – und nickst.', domain: 'job', impulse: 'Nein, ich bin voll', expectation: 'Aufgabe annehmen' },
  { id: 'sonntag', icon: 'home',      label: 'Sonntag bei der Familie', title: 'Du brauchst Ruhe. Du fährst trotzdem hin.', domain: 'familie', impulse: 'Ruhe zu Hause', expectation: 'Hinfahren' },
  { id: 'nein-statt-ja', icon: 'shuffle', label: 'Nein gesagt, Ja gemeint', title: 'Du hast abgelehnt, obwohl du eigentlich wolltest.', domain: null, direction: 'nein-statt-ja', impulse: 'Mitmachen', expectation: 'Absagen' },
  { id: 'eigene',  icon: 'compass',   label: 'Meine Szene ist anders', title: 'Ich beschreibe sie kurz – oder gehe einfach weiter.', domain: null, impulse: 'Dein Impuls', expectation: 'Die Erwartung', freeText: true },
];

export const DOMAINS = [
  { id: 'job',           icon: 'briefcase', label: 'Arbeit',         title: 'Im Job, im Studium oder im Geschäft.' },
  { id: 'familie',       icon: 'home',      label: 'Familie',        title: 'In der Familie oder zu Hause.' },
  { id: 'partnerschaft', icon: 'heart',     label: 'Partnerschaft',  title: 'In meiner Beziehung.' },
  { id: 'freunde',       icon: 'users',     label: 'Freunde',        title: 'Im Freundeskreis oder im Umfeld.' },
  { id: 'selbst',        icon: 'user',      label: 'Mit mir selbst', title: 'Es betrifft vor allem mich.' },
];

export const WANTED = {
  'ja-statt-nein': [
    { id: 'nein',        icon: 'x-circle',        label: 'Nein sagen',      title: 'Ich wollte ablehnen.', wantedYes: false },
    { id: 'zeit',        icon: 'clock',           label: 'Mehr Zeit',       title: 'Ich wollte erst nachdenken.', wantedYes: false },
    { id: 'grenze',      icon: 'flag',            label: 'Eine Grenze',     title: 'Ich wollte sagen, was für mich nicht geht.', wantedYes: false },
    { id: 'anderes',     icon: 'corner-up-right', label: 'Etwas anderes',   title: 'Ich wollte einen anderen Weg vorschlagen.', wantedYes: false },
    { id: 'weiss-nicht', icon: 'help-circle',     label: 'Nicht sicher',    title: 'Ich weiß es nicht genau.', wantedYes: null },
  ],
  'nein-statt-ja': [
    { id: 'ja',          icon: 'check-circle',    label: 'Ja sagen',        title: 'Ich wollte eigentlich zusagen.', wantedYes: true },
    { id: 'mitmachen',   icon: 'users',           label: 'Mitmachen',       title: 'Ich wollte dabei sein.', wantedYes: true },
    { id: 'zeigen',      icon: 'feather',         label: 'Mich zeigen',     title: 'Ich wollte sagen, was ich wirklich will.', wantedYes: true },
    { id: 'anderes',     icon: 'corner-up-right', label: 'Etwas anderes',   title: 'Ich wollte einen anderen Weg vorschlagen.', wantedYes: true },
    { id: 'weiss-nicht', icon: 'help-circle',     label: 'Nicht sicher',    title: 'Ich weiß es nicht genau.', wantedYes: null },
  ],
};

/* A3: die Weiche. Die zwei Hauptkacheln sind das Äquivalent zum Hebel; die drei weiteren
   decken „nicht gestellt" (Ausweichen, Schweigen) und „schon gestellt" (keine Wahl) ab. */
export const SAID = [
  { id: 'impulse',     icon: 'flag',            label: 'Impuls',        title: 'Ich habe gesagt, was ich wollte.', saidSide: 'impulse' },
  { id: 'expectation', icon: 'users',           label: 'Erwartung',     title: 'Ich habe gesagt, was erwartet wurde.', saidSide: 'expectation' },
  { id: 'vielleicht',  icon: 'more-horizontal', label: 'Ausgewichen',   title: '„Vielleicht … mal sehen."', saidSide: null },
  { id: 'nichts',      icon: 'volume-x',        label: 'Geschwiegen',   title: 'Ich habe nichts gesagt.', saidSide: null },
  { id: 'vorgegeben',  icon: 'lock',            label: 'Schon gestellt', title: 'Die Weiche war schon gestellt – ich hatte keine Wahl.', saidSide: 'fixed' },
];

/* A4: Was dann tatsächlich geschah — Kacheln wörtlich, je Richtung; didSide = welche Seite gelebt wurde. */
export const DID = {
  'ja-statt-nein': [
    { id: 'mitgemacht',   icon: 'check-circle', label: 'Gemacht',       title: 'Ich habe es gemacht.', didSide: 'expectation' },
    { id: 'gelassen',     icon: 'x-circle',     label: 'Doch nicht',    title: 'Ich habe es doch nicht gemacht.', didSide: 'impulse' },
    { id: 'aufgeschoben', icon: 'pause-circle', label: 'Aufgeschoben',  title: 'Ich habe es vor mir hergeschoben.', didSide: null },
    { id: 'halb',         icon: 'shuffle',      label: 'Halbherzig',    title: 'Gemacht – aber ohne mich.', didSide: 'expectation', half: true },
  ],
  'nein-statt-ja': [
    { id: 'mitgemacht',   icon: 'x-circle',     label: 'Weggeblieben',  title: 'Ich bin weggeblieben, wie gesagt.', didSide: 'expectation' },
    { id: 'gelassen',     icon: 'check-circle', label: 'Doch hin',      title: 'Ich bin doch hingegangen.', didSide: 'impulse' },
    { id: 'aufgeschoben', icon: 'pause-circle', label: 'Aufgeschoben',  title: 'Ich habe es offen gelassen.', didSide: null },
    { id: 'halb',         icon: 'shuffle',      label: 'Halbherzig',    title: 'Hingegangen – aber nicht wirklich dabei.', didSide: 'impulse', half: true },
  ],
};

export const WHY = [
  { id: 'enttaeuschen',  icon: 'heart',       label: 'Niemanden enttäuschen', title: 'Ich wollte niemanden verletzen.', fn: 'weil ich niemanden enttäuschen will' },
  { id: 'konflikt',      icon: 'shield',      label: 'Konflikt vermeiden',    title: 'Ich wollte keinen Streit.', fn: 'weil ich Streit vermeiden will' },
  { id: 'dazugehoeren',  icon: 'users',       label: 'Dazugehören',           title: 'Ich wollte nicht außen vor sein.', fn: 'weil ich dazugehören will' },
  { id: 'schnell',       icon: 'zap',         label: 'Keine Zeit',            title: 'Es ging schnell – ich habe nicht nachgedacht.', fn: 'weil es schnell gehen muss und ich nicht nachdenke' },
  { id: 'abgewogen',     icon: 'sliders',     label: 'Abgewogen',             title: 'Ich habe die Folgen bewusst bedacht.', fn: 'weil ich die Folgen abgewogen habe' },
  { id: 'kein-spielraum', icon: 'lock',       label: 'Kein Spielraum',        title: 'Ich hatte keine echte Wahl – die Lage war vorgegeben.', fn: null },
];
export const WHY_UNKNOWN = { id: 'weiss-nicht', icon: 'help-circle', label: 'Weiß ich nicht', title: 'Ich kann es noch nicht sagen.', fn: 'aus einem Grund, den ich noch nicht kenne' };

export const REPETITION = [
  { id: 'einmalig', icon: 'flag',        label: 'Einmalig',          title: 'So etwas passiert mir selten.' },
  { id: 'oefter',   icon: 'repeat',      label: 'Kommt öfter vor',   title: 'Das kenne ich aus mehreren Situationen.' },
  { id: 'muster',   icon: 'activity',    label: 'Das ist mein Muster', title: 'So läuft es bei mir fast immer.' },
  { id: 'unklar',   icon: 'help-circle', label: 'Weiß ich nicht',    title: 'Ich müsste erst eine Weile hinschauen.' },
];

export const MECHANIC = [
  { id: 'kompromiss',      icon: 'sliders',     label: 'Bewusster Kompromiss', title: 'Ich habe mit offenen Augen entschieden.' },
  { id: 'zurueckgehalten', icon: 'lock',        label: 'Zurückgehalten',       title: 'Ich habe weniger gesagt, als ich meinte.' },
  { id: 'unsicher',        icon: 'help-circle', label: 'Nicht sicher',         title: 'Ich kann es noch nicht sagen.' },
];

export const LEEWAY = [
  { id: 'klein',  icon: 'feather',     label: 'Ein kleiner',      title: 'Es gibt einen kleinen Spielraum, den ich mir wünsche.' },
  { id: 'keiner', icon: 'shield',      label: 'Gerade keiner',    title: 'Im Moment ist die Lage, wie sie ist.' },
  { id: 'unklar', icon: 'help-circle', label: 'Weiß ich nicht',   title: 'Das müsste ich erst herausfinden.' },
];

export const PERSPECTIVE = [
  { id: 'andere',   icon: 'heart',       label: 'Schutz für andere',  title: 'Ich schütze andere vor Enttäuschung.' },
  { id: 'konflikt', icon: 'shield',      label: 'Schutz vor Konflikt', title: 'Ich schütze mich vor Streit.' },
  { id: 'zugehoer', icon: 'users',       label: 'Dazugehören',        title: 'Ich will dazugehören.' },
  { id: 'wollen',   icon: 'compass',     label: 'Mein Wollen',        title: 'Sie zeigt mir, was ich eigentlich will.' },
  { id: 'nichts',   icon: 'help-circle', label: 'Nichts davon',       title: 'Ich sehe gerade nichts – auch das ist in Ordnung.' },
];

/* Brücken mit Wenn-Dann-Vorlagen (Implementation Intentions). */
export const BRIDGE = [
  { id: 'gespraech',   icon: 'message-circle', label: 'Gespräch nachholen', title: 'Ich sage, was ich eigentlich meinte.', wenn: 'ich die Person das nächste Mal sehe', dann: 'sage ich, was ich eigentlich gemeint habe' },
  { id: 'bedenkzeit',  icon: 'clock',          label: 'Bedenkzeit-Satz',    title: 'Beim nächsten Mal: „Ich melde mich morgen."', wenn: 'mich jemand um etwas bittet', dann: 'sage ich: „Ich melde mich morgen."' },
  { id: 'grenze',      icon: 'flag',           label: 'Grenze benennen',    title: 'Ich sage klar, was für mich nicht geht.', wenn: 'etwas über meine Grenze geht', dann: 'sage ich einen Satz: „Das geht für mich nicht."' },
  { id: 'dabei',       icon: 'check-circle',   label: 'Dabei bleiben',      title: 'Ich stehe bewusst zu meinem Kompromiss.', wenn: 'der Gedanke „Ich hätte Nein sagen sollen" kommt', dann: 'erinnere ich mich: Ich habe es mit offenen Augen entschieden' },
  { id: 'beobachten',  icon: 'eye',            label: 'Beobachten',         title: 'Ich schaue beim nächsten Mal genauer hin.', wenn: 'ich das nächste Mal Ja sagen will', dann: 'halte ich drei Sekunden inne und frage mich: Will ich das?' },
];

/* A5: Kacheln zur Bestätigung der berechneten Abweichung */
export const CONFIRM = [
  { id: 'stimmt',   icon: 'check',           label: 'So war’s',           title: 'Das trifft es.' },
  { id: 'aendern',  icon: 'corner-up-right', label: 'Nicht ganz – ändern',  title: 'Ich möchte einen Fakt korrigieren.' },
  { id: 'unsicher', icon: 'help-circle',     label: 'Ich bin unsicher',     title: 'Ich kann es noch nicht einordnen.' },
];
export const INHARMONY = [
  { id: 'pruefen', icon: 'eye',          label: 'Wollen prüfen',       title: 'Ist das Wollen wirklich meins? Kurz hinschauen.' },
  { id: 'fertig',  icon: 'check-circle', label: 'Für heute reicht das', title: 'Es gibt hier nichts zu reparieren.' },
];

/* Szenen-Pools für das Stellwerk (A7), je Bereich. Studio-pflegbar gedacht. */
export const SCENE_POOLS = {
  job: [
    'Eine Kollegin fragt, ob du ihre Schicht übernimmst.',
    'Um 18 Uhr kommt noch eine Aufgabe „bis morgen früh".',
    'Im Meeting wird dir das Projekt zugeschoben, das keiner will.',
    'Ein Kunde ruft am Freitagabend an.',
    'Du sollst für das Team-Event am Samstag zusagen.',
  ],
  familie: [
    'Sonntagsessen – „du kommst doch, oder?"',
    'Dein Bruder braucht wieder Hilfe beim Umzug.',
    'Die Familie plant den Urlaub, ohne dich zu fragen.',
    'Ein Verwandter will „nur kurz" vorbeikommen.',
    'Die Feiertage sollen laufen wie immer.',
  ],
  partnerschaft: [
    'Dein Partner will zu Freunden – du wolltest einen ruhigen Abend.',
    'Die Serie läuft weiter, obwohl du schlafen wolltest.',
    'Urlaubsziel: wieder das, was der andere mag.',
    'Ein Thema, das dich stört, bleibt wieder unausgesprochen.',
    'Besuch bei den Schwiegereltern – „ist doch nur ein Nachmittag".',
  ],
  freunde: [
    'Freunde wollen nach Köln. Du wolltest nach Düsseldorf.',
    'Eine Party, auf die du keine Lust hast.',
    'Jemand leiht sich zum dritten Mal Geld.',
    'Ein Freund braucht „nur fünf Minuten" am Telefon.',
    'Alle gehen noch in die nächste Bar.',
  ],
  selbst: [
    'Du nimmst dir eine Pause vor – und arbeitest doch weiter.',
    'Du willst früh schlafen – und scrollst weiter.',
    'Du willst etwas ansprechen – und schweigst.',
    'Du planst einen freien Sonntag – und füllst ihn.',
    'Du willst Nein zu einer Aufgabe sagen – und sagst es nicht.',
  ],
  reversed: [
    'Jemand lädt dich ein. Du willst – und sagst ab.',
    'Eine Chance, dich zu zeigen. Du hältst dich zurück.',
    'Ein Kompliment. Du spielst es herunter.',
    'Jemand fragt nach deiner Meinung. Du sagst „egal".',
    'Ein Treffen, auf das du dich freust. Du findest einen Grund, nicht zu gehen.',
  ],
};

/* Mini-Erklärungen (method_note) — höchstens zwei Sätze, erst nach einer Aktion. */
export const EXPLAIN = {
  fakt:        { strong: 'Fakt vor Urteil.', text: 'Bleib bei dem, was beobachtbar ist: Was wurde gesagt, was wurde getan. Bewertungen kommen später – oder gar nicht.' },
  abweichung:  { strong: 'Abweichung ist kein Fehler.', text: 'Sie ist nur die Stelle, an der Wunsch, Aussage und Verhalten auseinanderlaufen – und damit der Ort, an dem du etwas erkennen kannst.' },
  warum:       { strong: 'Gründe verstehen, nicht verurteilen.', text: 'Es gibt gute Gründe für fast jede Weiche. Was dich geschützt hat, muss dich nicht für immer begrenzen.' },
  yard:        { strong: 'Siehst du die Strecke?', text: 'Keine einzelne Weiche verbaut ein Leben. Dieselbe Weiche, immer wieder gleich gestellt, wird zu einer Strecke.' },
  yardImpulse: { strong: 'Mehr Impuls, als es sich anfühlt.', text: 'Du stellst öfter auf deinen Impuls, als du vielleicht denkst. Schau, wo die Ausnahme liegt – dort ist die Weiche interessant.' },
  mechanik:    { strong: 'Kompromiss ist keine Schwäche.', text: 'Ein bewusster Kompromiss ist authentisch, wenn du ihn kennst und trägst. Zurückhalten heißt: Etwas anderes hat für dich entschieden.' },
  gleislage:   { strong: 'Nicht jede Weiche hast du gestellt.', text: 'Manche Gleise sind vorgegeben – durch Abhängigkeit, Macht, Geld oder Krankheit. Dafür gibt es keine Schuld, nur die Frage nach dem kleinen Spielraum.' },
  perspektive: { strong: 'Von oben sieht man Gleise, die man unten nicht sieht.', text: 'Eine Perspektive ist ein Angebot, kein Urteil. Du entscheidest, was stimmt.' },
  bruecke:     { strong: 'Klein. Konkret. Deins.', text: 'Eine Brücke, die du heute gehen kannst, ist mehr wert als zehn, die du dir vornimmst.' },
  validation:  { strong: 'Du entscheidest, was stimmt.', text: 'Ein Satz, der sich richtig anfühlt, muss nicht stimmen. Deshalb fragen wir – statt zu behaupten.' },
  finale:      { strong: 'Ein Spiegel, kein Urteil.', text: 'Lies die Finder Card in Ruhe. Wenn etwas nicht passt, geh einen Schritt zurück – alles bleibt erhalten.' },
};

/* Neutral: keine Lob-, Erlaubnis- oder Ich-Formeln (kontrollierendes Feedback, Companion-Framing). */
export const TOASTS = {
  fakt:       ['Notiert.', 'Beobachtet, nicht bewertet.', 'Ein Fakt – kein Urteil.'],
  abweichung: ['Da liegt etwas. Schauen wir hin.', 'Notiert.'],
  warum:      ['Ein Grund, kein Vorwurf.', 'Notiert.'],
  mechanik:   ['Eine Beobachtung, kein Urteil.', 'Das bleibt so stehen.'],
  bruecke:    ['Das ist eine Brücke.', 'Klein genug, um sie zu gehen.'],
};

/* Demo-Krisenerkennung: im Produkt serverseitig + Modell-Flag (Sicherheitskern).
   Hier nur, um den Sicherheits-Screen zeigen zu können. Bewusst eng gefasst. */
export const CRISIS_PATTERNS = [
  /\bnicht mehr leben\b/i, /\bumbringen\b/i, /\bsuizid/i, /\bselbstmord\b/i, /\bmir das leben nehmen\b/i,
  /\bwill sterben\b/i, /\bkeinen ausweg mehr\b/i, /\bmich (selbst )?verletzen\b/i, /\britzen\b/i,
];
/* Im Produkt: eine versionierte Datendatei (safety-signals.json), die PHP und JS gleich laden;
   Server autoritativ, Client-Prüfung nötig, weil Freitext ohne Einwilligung den Browser nie verlässt. */
export function hasCrisisSignal(text) {
  const t = (text || '').trim();
  return t.length > 0 && CRISIS_PATTERNS.some((re) => re.test(t));
}

/* Fester Sicherheitstext. Nummern am 12.10.2026 gegen offizielle Seiten verifiziert (R6),
   jährlich prüfen. Reihenfolge: akute Gefahr → reden → unter 25/18 → Gewalt → AT/CH. */
export const SAFETY = {
  title: 'Einen Moment – hier ist etwas Wichtigeres als die Methode.',
  text: 'Was du schreibst, klingt nach echter Not. Der Finder ist ein Programm und kann dir jetzt nicht das geben, was ein Mensch kann. Bitte sprich mit jemandem – jetzt, nicht später.',
  contacts: [
    { label: 'Bei akuter Gefahr', value: 'Notruf 112', tel: '112' },
    { label: 'Telefonseelsorge Deutschland – kostenlos, anonym, rund um die Uhr', value: '0800 111 0 111 · 0800 111 0 222 · 116 123', tel: '08001110111' },
    { label: 'Unter 25: krisenchat.de (Chat) · Unter 18: Nummer gegen Kummer', value: '116 111', tel: '116111' },
    { label: 'Hilfetelefon Gewalt gegen Frauen – rund um die Uhr', value: '116 016', tel: '116016' },
    { label: 'Österreich · Schweiz', value: 'Telefonseelsorge 142 · Rat auf Draht 147 · Dargebotene Hand 143 · Pro Juventute 147', tel: null },
  ],
  footer: 'Der Finder ist keine Krisenhilfe und keine Therapie. Er macht hier Pause – du kannst später weitermachen oder alles auf diesem Gerät löschen.',
};

/* ── Hilfsfunktionen ─────────────────────────────────────────────────── */

export function sceneOf(facts) {
  return SCENES.find((s) => s.id === facts.scene) || SCENES[4];
}
export function directionOf(facts) {
  return sceneOf(facts).direction || 'ja-statt-nein';
}
export function labelsOf(facts) {
  const s = sceneOf(facts);
  return { impulse: s.impulse, expectation: s.expectation };
}
export function findOpt(list, id) {
  return list.find((o) => o.id === id) || null;
}

/* Abweichung deterministisch (Blueprint A5) über „Seiten": Wollen ist immer die Impuls-Seite
   (die Wollen-Kacheln beschreiben den Impuls), Gesagt und Getan tragen ihre Seite selbst.
   Rückgabe: wollen-sagen | sagen-tun | wollen-tun | nicht-gestellt | vorgegeben | keine | unklar
   Zweite Lücke (z. B. Erwartung gesagt, dann doch Impuls gelebt) → deriveSecondGap(). */
export function deriveDeviation(facts) {
  const direction = directionOf(facts);
  const wanted = findOpt(WANTED[direction], facts.wanted);
  const said = findOpt(SAID, facts.said);
  if (said && said.saidSide === 'fixed') return 'vorgegeben';
  const did = findOpt(DID[direction], facts.did);
  if (!wanted || !said || !did) return 'unklar';
  if (wanted.wantedYes === null) return 'unklar';

  const saidSide = said.saidSide;          // 'impulse' | 'expectation' | null (ausgewichen/geschwiegen)
  const didSide = did.didSide;             // 'impulse' | 'expectation' | null (aufgeschoben)

  if (saidSide === 'expectation') return 'wollen-sagen';
  if (saidSide === null) return didSide === 'expectation' ? 'wollen-tun' : 'nicht-gestellt';
  // Gesagt wie gewollt (Impuls):
  if (didSide === null) return 'unklar';
  if (didSide === 'expectation') return 'sagen-tun';
  return 'keine';
}

/* Zweite Lücke: Erwartung gesagt, aber Impuls gelebt („und dann doch nicht gemacht"). */
export function deriveSecondGap(facts) {
  const direction = directionOf(facts);
  const said = findOpt(SAID, facts.said);
  const did = findOpt(DID[direction], facts.did);
  return said && did && said.saidSide === 'expectation' && did.didSide === 'impulse' ? 'sagen-tun' : null;
}

export function deviationSentence(dev, facts) {
  const L = labelsOf(facts);
  const second = deriveSecondGap(facts);
  switch (dev) {
    case 'wollen-sagen': return `Zwischen deinem Wollen (${L.impulse}) und dem, was du gesagt hast (${L.expectation}), liegt die Lücke.${second ? ' Und dann hast du doch anders gehandelt, als du gesagt hast – eine zweite Lücke.' : ''}`;
    case 'sagen-tun':    return 'Du hast gesagt, was du wolltest – gehandelt hast du anders. Die Lücke liegt zwischen Sagen und Tun.';
    case 'wollen-tun':   return 'Im Wort bist du ausgewichen, gehandelt hast du gegen deinen Impuls. Die Lücke liegt zwischen Wollen und Tun.';
    case 'nicht-gestellt': return 'Du hast die Weiche nicht gestellt – weder Ja noch Nein. Ausweichen ist auch eine Richtung: Die Lücke liegt zwischen Wollen und Sagen.';
    case 'vorgegeben':   return 'Hier gab es keine eigene Weiche – die Lage war vorgegeben. Das ist Gleislage, kein Muster.';
    case 'keine':        return 'Wollen, Sagen und Tun passen hier zusammen. Es gibt nichts zu reparieren.';
    default:             return 'Die Fakten lassen sich noch nicht eindeutig einordnen – ein ehrlicher Stand.';
  }
}

/* Welche zwei Punkte die Lücke markieren (für die Drei-Punkte-Grafik). */
export function deviationGap(dev) {
  return { 'wollen-sagen': [0, 1], 'sagen-tun': [1, 2], 'wollen-tun': [0, 2], 'nicht-gestellt': [0, 1] }[dev] || null;
}

export function situationPhrase(domain) {
  return {
    job: 'wenn im Job etwas von mir erwartet wird',
    familie: 'wenn die Familie etwas von mir erwartet',
    partnerschaft: 'wenn mein Gegenüber in der Beziehung etwas möchte',
    freunde: 'wenn Freunde etwas von mir wollen',
    selbst: 'wenn ich mir selbst etwas vorgenommen habe',
  }[domain] || 'wenn etwas von mir erwartet wird';
}

/* Musterphrasen je Lage. Der bewusste Kompromiss ist eine Entscheidung, keine Inauthentizität. */
export function patternPhrase(facts, variant = 'own') {
  const direction = directionOf(facts);
  const said = findOpt(SAID, facts.said);
  const compromise = facts.mechanic === 'kompromiss' || (facts.why === 'abgewogen' && facts.mechanic !== 'zurueckgehalten');
  const reversed = direction === 'nein-statt-ja';
  const P = reversed
    ? { yes: 'neige ich dazu, abzusagen, obwohl ich eigentlich will', avoid: 'lasse ich es offen, statt zuzusagen', comp: 'entscheide ich mich bewusst gegen das, was ich eigentlich will', alt1: 'sage ich zu – und meine es auch', alt2: 'sage ich zu, obwohl ich eigentlich nicht will' }
    : { yes: 'neige ich dazu, Ja zu sagen, obwohl ich Nein meine', avoid: 'weiche ich aus, statt Nein zu sagen', comp: 'entscheide ich mich bewusst für das, was erwartet wird', alt1: 'sage ich Ja – und meine es auch', alt2: 'sage ich Nein, obwohl ich eigentlich Ja meine' };
  if (variant === 'alt1') return P.alt1;
  if (variant === 'alt2') return P.alt2;
  if (compromise) return P.comp;
  if (said && said.saidSide === null) return P.avoid;
  return P.yes;
}

/* Drei Sätze für „Trifft es?": einer aus den Fakten, zwei echte Alternativen, die sich im
   MUSTER unterscheiden (nicht nur im „weil") — sonst wäre es ein Wiedererkennungstest.
   Gleislage-Pfad bekommt eigene Sätze ohne inneres Motiv. */
export function validationStatements(facts, flags = {}) {
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const sit = situationPhrase(facts.domain);
  let all;
  if (flags.external) {
    const lee = findOpt(LEEWAY, facts.leeway);
    const ownLee = lee && lee.id === 'klein' ? 'mein Spielraum liegt bei einem kleinen Schritt' : lee && lee.id === 'unklar' ? 'ob es einen Spielraum gibt, weiß ich noch nicht' : 'einen anderen Spielraum wünsche ich mir gerade nicht';
    all = [
      { id: 'own', text: `${cap(sit)}, war die Lage vorgegeben – ${ownLee}.` },
      { id: 'n1', text: `${cap(sit)}, war die Lage vorgegeben – aber an einer Stelle hätte ich etwas sagen können.` },
      { id: 'n2', text: `${cap(sit)}, war die Lage nur scheinbar vorgegeben – ich habe sie so gelassen, weil es ruhiger war.` },
    ];
  } else {
    const why = findOpt([...WHY, WHY_UNKNOWN], facts.why) || WHY_UNKNOWN;
    const fn = why.fn || 'aus einem Grund, den ich noch nicht kenne';
    const other = WHY.filter((w) => w.fn && w.id !== why.id && w.id !== 'abgewogen');
    const alt = other[(why.id.length + (facts.domain || '').length) % other.length];
    all = [
      { id: 'own', text: `${cap(sit)}, ${patternPhrase(facts)}, ${fn}.` },
      { id: 'n1', text: `${cap(sit)}, ${patternPhrase(facts, 'alt1')} – ${fn.replace(/^weil /, 'auch wenn ')} .`.replace(' .', '.') },
      { id: 'n2', text: `${cap(sit)}, ${patternPhrase(facts, 'alt2')}, ${alt.fn}.` },
    ];
  }
  const rot = ((facts.why || '').length + (facts.domain || '').length) % 3;
  for (let i = 0; i < rot; i++) all.push(all.shift());
  return all;
}

export function yardExplanation(switches) {
  if (switches.length < 3) return null;
  const imp = switches.filter((s) => s === 'impulse').length;
  return imp > switches.length / 2 ? EXPLAIN.yardImpulse : EXPLAIN.yard;
}

export function headlineFor(ctx) {
  if (ctx.flags.external) return 'Gleislage erkannt';
  if (ctx.derived.deviation === 'keine') return 'Im Einklang';
  if (ctx.flags.compromise) return 'Bewusster Kompromiss';
  if (ctx.derived.deviation === 'unklar' || ctx.facts.mechanic === 'unsicher') return 'Noch offen';
  return 'Eine Lücke erkannt';
}

/* Finder Card aus Fakten + Ableitungen. Nutzerworte haben Vorrang. */
export function buildLabCard(ctx) {
  const { facts, texts, derived, flags, validation, bridgePlan } = ctx;
  const scene = sceneOf(facts);
  const direction = directionOf(facts);
  const L = labelsOf(facts);
  const t = (k) => (texts[k] || '').trim();
  const q = (s) => (s ? ` „${s}"` : '');
  const opt = (list, id) => findOpt(list, id);

  const dom = opt(DOMAINS, facts.domain);
  const wanted = opt(WANTED[direction], facts.wanted);
  const said = opt(SAID, facts.said);
  const did = opt(DID[direction], facts.did);
  const why = opt([...WHY, WHY_UNKNOWN], facts.why);
  const rep = opt(REPETITION, facts.repetition);
  const mech = opt(MECHANIC, facts.mechanic);
  const persp = opt(PERSPECTIVE, facts.perspective);
  const bridge = opt(BRIDGE, facts.bridge);

  const saidLine = said
    ? (said.saidSide === 'impulse' ? `Gesagt: ${L.impulse}` : said.saidSide === 'expectation' ? `Gesagt: ${L.expectation}` : `Gesagt: ${said.title}`)
    : 'Gesagt: —';

  const factLines = [
    `Szene: ${scene.id === 'eigene' && t('A0') ? t('A0') : scene.title}`,
    `Wo: ${dom ? dom.label : '—'}${q(t('A1'))}`,
    `Gewollt: ${wanted ? wanted.title : '—'}${q(t('A2'))}`,
    saidLine,
  ];
  if (did) factLines.push(`Getan: ${did.title}${q(t('A4'))}`);
  const rows = [
    { phase: 'fakt', label: 'Fakt', lines: factLines },
    { phase: 'abweichung', label: 'Abweichung', lines: [deviationSentence(derived.deviation, facts)] },
  ];

  const lee = opt(LEEWAY, facts.leeway);
  if (flags.external) {
    rows.push({ phase: 'warum', label: 'Warum', lines: ['Kein echter Spielraum – die Lage war vorgegeben. Das ist Gleislage, keine Weiche. Dafür gibt es keine Schuld.'] });
    const mechLines = [];
    if (validation?.statement) mechLines.push(validation.statement);
    mechLines.push(lee ? `Spielraum: ${lee.title}` : 'Spielraum: noch offen.');
    if (validation?.exception) mechLines.push(`Ausnahme: ${validation.exception}`);
    rows.push({ phase: 'mechanik', label: 'Mechanik', lines: mechLines });
  } else {
    rows.push({ phase: 'warum', label: 'Warum', lines: [why ? `${why.title}${q(t('A6'))}` : '—'] });
    const mechLines = [];
    if (validation?.statement) mechLines.push(validation.statement);
    if (rep) mechLines.push(`Wiederholung: ${rep.label.toLowerCase()}.`);
    if (mech) mechLines.push(mech.id === 'kompromiss'
      ? 'Du hast mit offenen Augen entschieden. Ein Kompromiss, den du kennst und trägst, ist kein Bruch mit dir.'
      : mech.id === 'zurueckgehalten'
        ? `In dem Moment hat ${why && why.fn ? why.label.toLowerCase() : 'etwas anderes'} mehr gewogen als dein Impuls. Eine Beobachtung, kein Urteil.`
        : 'Noch nicht einzuordnen – beobachte, ob sich das Muster wiederholt, bevor du es bewertest.');
    if (validation?.exception) mechLines.push(`Ausnahme: ${validation.exception}`);
    rows.push({ phase: 'mechanik', label: 'Mechanik', lines: mechLines.length ? mechLines : ['—'] });
  }

  if (persp && persp.id !== 'nichts') rows.push({ phase: 'perspektive', label: 'Perspektive', lines: [`${persp.title}${q(t('A8'))}`] });
  else if (t('A8')) rows.push({ phase: 'perspektive', label: 'Perspektive', lines: [t('A8')] });

  const plan = bridgePlan && (bridgePlan.wenn || bridgePlan.dann)
    ? `Wenn ${bridgePlan.wenn || '…'}, dann ${bridgePlan.dann || '…'}.`
    : bridge ? `Wenn ${bridge.wenn}, dann ${bridge.dann}.` : null;
  if (flags.external && !bridge && !t('A9')) {
    rows.push({ phase: 'bruecke', label: 'Brücke', lines: ['Heute nichts zu stellen. Hinschauen reicht.'] });
  } else {
    rows.push({ phase: 'bruecke', label: 'Brücke', lines: [
      bridge ? `${bridge.label}: ${bridge.title}` : (t('A9') || 'Noch keine Brücke gewählt.'),
      ...(plan ? [plan] : []),
      'Klein, konkret, in den nächsten 48 Stunden.',
    ] });
  }

  const headline = headlineFor(ctx);
  const plainText = [
    'TRUSTBRIDGE FINDER CARD (Lab-Prototyp)',
    `${headline}`,
    '',
    ...rows.flatMap((r) => [r.label.toUpperCase(), ...r.lines.map((l) => `  ${l}`), '']),
    'Fakt → Abweichung → Warum → Mechanik → Brücke',
    'Erstellt mit KI-Unterstützung (im Lab simuliert). Kein Urteil, keine Diagnose.',
  ].join('\n');

  return { headline, situationLabel: scene.label, rows, plainText };
}

/* Spiegelzeile nach einer Antwort — ein Satz in Nutzerworten, keine Deutung. */
export function mirrorFor(screen, facts, texts) {
  const L = labelsOf(facts);
  const direction = directionOf(facts);
  const t = (texts[screen] || '').trim();
  const o = (list, id) => findOpt(list, id);
  switch (screen) {
    case 'A0': { const s = sceneOf(facts); return s.id === 'eigene' ? (t ? `Deine Szene: „${t}"` : 'Deine eigene Szene.') : `Szene: ${s.label}.`; }
    case 'A1': { const d = o(DOMAINS, facts.domain); return d ? `Zuletzt: ${d.label.toLowerCase() === 'mit mir selbst' ? 'bei dir selbst' : d.label}.` : ''; }
    case 'A2': { const w = o(WANTED[direction], facts.wanted); return w ? (w.wantedYes === null ? 'Du bist dir nicht sicher. Das zählt als Antwort.' : `Du wolltest: ${w.label.toLowerCase()}.`) : ''; }
    case 'A3': { const s = o(SAID, facts.said); return s ? (s.saidSide === 'impulse' ? `Gestellt: Richtung ${L.impulse}.` : s.saidSide === 'expectation' ? `Gestellt: Richtung ${L.expectation}.` : s.saidSide === 'fixed' ? 'Die Weiche war schon gestellt.' : 'Die Weiche blieb auf halbem Weg – nicht gestellt.') : ''; }
    case 'A4': {
      // Verbundene Spiegelzeile: Wollen – Sagen – Tun in einem Satz (Reflexion statt Quittung)
      const w = o(WANTED[direction], facts.wanted); const s = o(SAID, facts.said); const d = o(DID[direction], facts.did);
      if (!w || !s || !d) return '';
      const saidPart = s.saidSide === 'impulse' ? `hast ${L.impulse} gesagt` : s.saidSide === 'expectation' ? `hast Ja zu ${L.expectation} gesagt` : 'hast dich nicht festgelegt';
      return `Du wolltest ${w.label.toLowerCase()}, ${saidPart} – und dann: ${d.title.replace(/\.$/, '').toLowerCase()}.`;
    }
    case 'A6': { const w = o([...WHY, WHY_UNKNOWN], facts.why); return w ? (w.id === 'kein-spielraum' ? 'Du sagst: Es gab keine echte Wahl.' : `In dem Moment hat entschieden: ${w.label.toLowerCase()}.`) : ''; }
    case 'A7b': { const m = o(MECHANIC, facts.mechanic); return m ? `${m.label}.` : ''; }
    case 'A8': { const p = o(PERSPECTIVE, facts.perspective); return p ? `Von oben: ${p.title}` : ''; }
    case 'A9': { const b = o(BRIDGE, facts.bridge); return b ? `Deine nächste Weiche: ${b.label.toLowerCase()}.` : ''; }
    default: return '';
  }
}
