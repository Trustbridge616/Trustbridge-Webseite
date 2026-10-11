/*
  Trustbridge Finder V0.1 — Authentizität
  ----------------------------------------
  Fragen, Kacheln, Hinweise und die Ableitung der Finder Card.
  Reine Daten und pure Funktionen ohne Vue-Abhängigkeit: Die Darstellung
  (Pages/TrustbridgeFinder.vue) liest nur von hier. Spätere Erweiterungen
  (KI-Auswertung, Persistenz, Sprachen) setzen an dieser Datei an, ohne
  die Oberfläche anzufassen.

  Methode: FAKT → ABWEICHUNG → WARUM → MECHANIK → BRÜCKE
  Haltung: keine Diagnosen. Ein bewusster Kompromiss ist kein Bruch
  mit sich selbst.
*/

export const METHOD_LINE = 'Fakt → Abweichung → Warum → Mechanik → Brücke';

export const PHASES = [
  { id: 'fakt',       label: 'Fakt' },
  { id: 'abweichung', label: 'Abweichung' },
  { id: 'warum',      label: 'Warum' },
  { id: 'mechanik',   label: 'Mechanik' },
  { id: 'bruecke',    label: 'Brücke' },
];

/* Jede Kachel: label = kurze Versalzeile, title = ein Satz. Mehr nicht —
   die Karten sollen Kacheln bleiben, keine Textwände. */
const STEPS = [
  {
    id: 'situation', phase: 'fakt', short: 'Situation',
    question: 'Was beschäftigt dich gerade?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Beschreibe kurz, was dich gerade beschäftigt …',
    options: [
      { id: 'ja-statt-nein',    icon: 'message-circle', label: 'Ja statt Nein',    title: 'Ich habe Ja gesagt, obwohl ich Nein wollte.' },
      { id: 'anders-gehandelt', icon: 'shuffle',        label: 'Anders gehandelt', title: 'Ich habe anders gehandelt, als ich eigentlich wollte.' },
      { id: 'unklar',           icon: 'compass',        label: 'Noch unklar',      title: 'Ich weiß gerade nicht, was ich wirklich möchte.' },
    ],
  },
  {
    id: 'passiert', phase: 'fakt', short: 'Passiert',
    question: 'Was ist passiert?',
    textLabel: 'Was genau ist passiert?',
    placeholder: 'Zwei, drei Sätze – nur das, was beobachtbar war.',
    options: [
      { id: 'job',           icon: 'briefcase', label: 'Arbeit',        title: 'Im Job, im Studium oder im Geschäft.' },
      { id: 'familie',       icon: 'home',      label: 'Familie',       title: 'In der Familie oder zu Hause.' },
      { id: 'partnerschaft', icon: 'heart',     label: 'Partnerschaft', title: 'In meiner Beziehung.' },
      { id: 'freunde',       icon: 'users',     label: 'Freunde',       title: 'Im Freundeskreis oder im Umfeld.' },
      { id: 'selbst',        icon: 'user',      label: 'Mit mir selbst', title: 'Es betrifft vor allem mich.' },
    ],
  },
  {
    id: 'gewollt', phase: 'fakt', short: 'Gewollt',
    question: 'Was wolltest du eigentlich?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Was wolltest du wirklich?',
    options: [
      { id: 'nein',        icon: 'x-circle',        label: 'Nein sagen',    title: 'Ich wollte ablehnen.' },
      { id: 'zeit',        icon: 'clock',           label: 'Mehr Zeit',     title: 'Ich wollte erst nachdenken.' },
      { id: 'grenze',      icon: 'flag',            label: 'Eine Grenze',   title: 'Ich wollte sagen, was für mich nicht geht.' },
      { id: 'anderes',     icon: 'corner-up-right', label: 'Etwas anderes', title: 'Ich wollte einen anderen Weg vorschlagen.' },
      { id: 'weiss-nicht', icon: 'help-circle',     label: 'Nicht sicher',  title: 'Ich weiß es nicht genau.' },
    ],
    variants: {
      unklar: {
        question: 'Was wünschst du dir eigentlich?',
        options: [
          { id: 'klarheit',     icon: 'feather',     label: 'Klarheit',          title: 'Ich wünsche mir Ruhe und einen klaren Kopf.' },
          { id: 'zeit',         icon: 'clock',       label: 'Mehr Zeit',         title: 'Ich will nichts überstürzen.' },
          { id: 'entscheidung', icon: 'target',      label: 'Eine Entscheidung', title: 'Ich will endlich wissen, wohin.' },
          { id: 'abnahme',      icon: 'users',       label: 'Entlastung',        title: 'Ich wünsche mir, dass mir jemand die Wahl abnimmt.' },
          { id: 'weiss-nicht',  icon: 'help-circle', label: 'Nicht sicher',      title: 'Genau das ist die Frage.' },
        ],
      },
    },
  },
  {
    id: 'gesagt', phase: 'fakt', short: 'Gesagt',
    question: 'Was hast du tatsächlich gesagt?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Deine Worte, so genau du dich erinnerst.',
    options: [
      { id: 'ja',         icon: 'check',           label: 'Ja',         title: 'Ich habe zugesagt.' },
      { id: 'nein',       icon: 'x',               label: 'Nein',       title: 'Ich habe abgelehnt.' },
      { id: 'vielleicht', icon: 'more-horizontal', label: 'Vielleicht', title: 'Ich bin ausgewichen.' },
      { id: 'nichts',     icon: 'volume-x',        label: 'Nichts',     title: 'Ich habe geschwiegen.' },
    ],
    variants: {
      unklar: {
        question: 'Was sagst du anderen dazu?',
        options: [
          { id: 'alles-gut',  icon: 'smile',           label: 'Alles gut',   title: 'Ich sage, es sei alles in Ordnung.' },
          { id: 'offen',      icon: 'message-circle',  label: 'Offen',       title: 'Ich sage, dass ich es noch nicht weiß.' },
          { id: 'vielleicht', icon: 'more-horizontal', label: 'Ausweichend', title: 'Ich rede drumherum.' },
          { id: 'nichts',     icon: 'volume-x',        label: 'Nichts',      title: 'Ich spreche nicht darüber.' },
        ],
      },
    },
  },
  {
    id: 'getan', phase: 'fakt', short: 'Getan',
    question: 'Was hast du tatsächlich getan?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Beschreibe dein Verhalten – ohne Bewertung.',
    options: [
      { id: 'mitgemacht',   icon: 'check-circle', label: 'Mitgemacht',  title: 'Ich habe es durchgezogen.' },
      { id: 'gelassen',     icon: 'x-circle',     label: 'Gelassen',    title: 'Ich habe es nicht gemacht.' },
      { id: 'aufgeschoben', icon: 'pause-circle', label: 'Aufgeschoben', title: 'Ich habe es vor mir hergeschoben.' },
      { id: 'halb',         icon: 'shuffle',      label: 'Halbherzig',  title: 'Ich habe es gemacht, aber ohne Überzeugung.' },
    ],
    variants: {
      unklar: {
        question: 'Was tust du gerade tatsächlich?',
        options: [
          { id: 'aufschieben',  icon: 'pause-circle', label: 'Aufschieben',       title: 'Ich schiebe die Entscheidung vor mir her.' },
          { id: 'erwartung',    icon: 'users',        label: 'Was erwartet wird', title: 'Ich mache, was andere erwarten.' },
          { id: 'ausprobieren', icon: 'compass',      label: 'Ausprobieren',      title: 'Ich teste Dinge aus.' },
          { id: 'weiter',       icon: 'repeat',       label: 'Weiter wie bisher', title: 'Ich mache weiter, ohne Überzeugung.' },
        ],
      },
    },
  },
  {
    id: 'abweichung', phase: 'abweichung', short: 'Abweichung',
    question: 'Wo liegt möglicherweise eine Abweichung?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Wo genau laufen Wunsch, Aussage und Verhalten auseinander?',
    options: [
      { id: 'wollen-sagen', icon: 'message-circle', label: 'Wollen ↔ Sagen', title: 'Ich wollte etwas anderes, als ich gesagt habe.' },
      { id: 'sagen-tun',    icon: 'activity',       label: 'Sagen ↔ Tun',    title: 'Ich habe etwas anderes getan, als ich gesagt habe.' },
      { id: 'wollen-tun',   icon: 'target',         label: 'Wollen ↔ Tun',   title: 'Ich habe anders gehandelt, als ich wollte.' },
      { id: 'keine',        icon: 'check-circle',   label: 'Keine',          title: 'Wollen, Sagen und Tun passen zusammen.' },
      { id: 'unsicher',     icon: 'help-circle',    label: 'Unsicher',       title: 'Ich kann es noch nicht einordnen.' },
    ],
  },
  {
    id: 'warum', phase: 'warum', short: 'Warum',
    question: 'Warum hast du so entschieden?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Welcher Grund fühlt sich am ehrlichsten an?',
    options: [
      { id: 'enttaeuschen', icon: 'heart',       label: 'Niemanden enttäuschen', title: 'Ich wollte niemanden verletzen.' },
      { id: 'konflikt',     icon: 'shield',      label: 'Konflikt vermeiden',    title: 'Ich wollte keinen Streit.' },
      { id: 'dazugehoeren', icon: 'users',       label: 'Dazugehören',           title: 'Ich wollte nicht außen vor sein.' },
      { id: 'schnell',      icon: 'zap',         label: 'Keine Zeit',            title: 'Es ging schnell – ich habe nicht nachgedacht.' },
      { id: 'abgewogen',    icon: 'sliders',     label: 'Abgewogen',             title: 'Ich habe die Folgen bewusst bedacht.' },
      { id: 'weiss-nicht',  icon: 'help-circle', label: 'Weiß ich nicht',        title: 'Ich kann es noch nicht sagen.' },
    ],
  },
  {
    id: 'mechanik', phase: 'mechanik', short: 'Mechanik',
    question: 'War es ein bewusster Kompromiss oder hast du dich zurückgehalten?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Wie würdest du es selbst beschreiben?',
    options: [
      { id: 'kompromiss',      icon: 'sliders',     label: 'Bewusster Kompromiss', title: 'Ich habe mich mit offenen Augen entschieden.' },
      { id: 'zurueckgehalten', icon: 'lock',        label: 'Zurückgehalten',       title: 'Ich habe mich kleiner gemacht, als ich bin.' },
      { id: 'unsicher',        icon: 'help-circle', label: 'Nicht sicher',         title: 'Ich kann es noch nicht sagen.' },
    ],
  },
  {
    id: 'bruecke', phase: 'bruecke', short: 'Brücke',
    question: 'Was könnte deine nächste authentischere Entscheidung sein?',
    textLabel: 'Oder in deinen Worten',
    placeholder: 'Klein, konkret, in den nächsten 48 Stunden: Was tust du?',
    options: [
      { id: 'gespraech',    icon: 'message-circle', label: 'Gespräch nachholen', title: 'Ich sage, was ich eigentlich meinte.' },
      { id: 'bedenkzeit',   icon: 'clock',          label: 'Bedenkzeit',         title: 'Beim nächsten Mal: „Ich melde mich morgen.“' },
      { id: 'grenze',       icon: 'flag',           label: 'Grenze benennen',    title: 'Ich sage klar, was für mich nicht geht.' },
      { id: 'dabei-bleiben', icon: 'check-circle',  label: 'Dabei bleiben',      title: 'Ich stehe bewusst zu meinem Kompromiss.' },
      { id: 'beobachten',   icon: 'eye',            label: 'Beobachten',         title: 'Ich schaue beim nächsten Mal genauer hin.' },
    ],
  },
];

/* Hinweisblock unter dem aktuellen Schritt — pro Phase ein Gedanke. */
export const PHASE_TIPS = {
  fakt: {
    text: 'Bleib bei dem, was beobachtbar ist: Was wurde gesagt, was wurde getan. Bewertungen kommen später – oder gar nicht.',
    strong: 'Fakt vor Urteil.',
    sub: 'Der Finder stellt keine Diagnosen. Er macht sichtbar.',
  },
  abweichung: {
    text: 'Eine Abweichung ist kein Fehler. Sie ist der Ort, an dem Wunsch, Aussage und Verhalten auseinanderlaufen – und damit der Ort, an dem du etwas erkennen kannst.',
    strong: 'Abweichung ist kein Fehler.',
    sub: 'Sie ist nur eine Stelle, an der es sich lohnt, genauer hinzusehen.',
  },
  warum: {
    text: 'Es gibt gute Gründe für fast jede Entscheidung. Wir suchen nicht den Schuldigen, sondern den Mechanismus dahinter.',
    strong: 'Gründe verstehen, nicht verurteilen.',
    sub: 'Was dich geschützt hat, muss dich nicht für immer begrenzen.',
  },
  mechanik: {
    text: 'Ein bewusster Kompromiss ist authentisch, wenn du ihn kennst und trägst. Zurückhalten heißt: Etwas anderes hat für dich entschieden.',
    strong: 'Kompromiss ist keine Schwäche.',
    sub: 'Der Unterschied liegt nicht im Ergebnis, sondern darin, wer entschieden hat.',
  },
  bruecke: {
    text: 'Eine Brücke ist klein, konkret und in deiner Hand. Nicht das ganze Leben ändern – nur die nächste Entscheidung.',
    strong: 'Klein. Konkret. Deins.',
    sub: 'Eine Brücke, die du heute gehen kannst, ist mehr wert als zehn, die du dir vornimmst.',
  },
  finale: {
    text: 'Die Finder Card ist ein Spiegel, kein Urteil. Lies sie in Ruhe – und prüfe, ob sie sich stimmig anfühlt. Wenn nicht, geh einen Schritt zurück.',
    strong: 'Du entscheidest, was stimmt.',
    sub: 'Nichts davon wird gespeichert. Kopiere dir die Card, wenn du sie behalten willst.',
  },
};

/* Panther-Feedback beim Wählen einer Kachel — neutral, nie wertend. */
export const TOASTS = {
  fakt:       ['Notiert. Fakten zuerst.', 'Gut. Beobachtet, nicht bewertet.', 'Das ist ein Fakt – kein Urteil.'],
  abweichung: ['Gut beobachtet.', 'Da liegt etwas. Schauen wir hin.'],
  warum:      ['Danke für deine Ehrlichkeit.', 'Ein Grund ist kein Vorwurf.'],
  mechanik:   ['Kein Urteil – nur ein Befund.', 'Das darfst du so stehen lassen.'],
  bruecke:    ['Das ist eine Brücke.', 'Klein genug, um sie zu gehen.'],
};

export function resolveStep(step, situationId) {
  const variant = step.variants?.[situationId];
  if (!variant) return step;
  const { variants, ...base } = step;
  return { ...base, ...variant };
}

export function resolveSteps(situationId) {
  return STEPS.map((s) => resolveStep(s, situationId));
}

export function optionOf(step, answer) {
  if (!step || !answer?.optionId) return null;
  return step.options.find((o) => o.id === answer.optionId) || null;
}

/* short: für das Protokoll (Versalzeile), long: für die Finder Card (Satz).
   Eigene Worte werden immer mitgenommen. */
export function answerSummary(step, answer, mode = 'short') {
  const opt = optionOf(step, answer);
  const text = (answer?.text || '').trim();
  const base = opt ? (mode === 'short' ? opt.label : opt.title) : '';
  if (base && text) return mode === 'short' ? `${base} – ${text}` : `${base} „${text}“`;
  return base || text;
}

function mechanikText(answers) {
  const abw = answers.abweichung?.optionId;
  const mech = answers.mechanik?.optionId;
  const own = (answers.mechanik?.text || '').trim();
  let text;
  if (abw === 'keine') {
    text = 'Wollen, Sagen und Tun fallen hier zusammen. Es gibt nichts zu reparieren – prüfe nur, ob das Wollen wirklich deins ist.';
  } else if (mech === 'kompromiss') {
    text = 'Du hast dich bewusst entschieden. Ein Kompromiss, den du kennst und trägst, ist kein Bruch mit dir – solange du den Preis kennst.';
  } else if (mech === 'zurueckgehalten') {
    text = 'Zwischen deinem Wollen und deinem Handeln liegt eine Lücke. Das ist keine Diagnose, sondern eine Beobachtung: Hier hat etwas anderes entschieden als du.';
  } else if (mech === 'unsicher') {
    text = 'Du kannst es noch nicht einordnen – ein ehrlicher Befund. Beobachte, ob sich das Muster wiederholt, bevor du es bewertest.';
  } else {
    text = 'Du hast es mit eigenen Worten beschrieben – das zählt mehr als jede Kachel.';
  }
  return own ? `${text} In deinen Worten: „${own}“` : text;
}

function headlineFor(answers) {
  if (answers.abweichung?.optionId === 'keine') return 'Im Einklang';
  switch (answers.mechanik?.optionId) {
    case 'kompromiss':      return 'Bewusster Kompromiss';
    case 'zurueckgehalten': return 'Eine Lücke erkannt';
    case 'unsicher':        return 'Noch offen';
    default:                return 'Deine Einschätzung';
  }
}

export function buildFinderCard(steps, answers) {
  const byId = Object.fromEntries(steps.map((s) => [s.id, s]));
  const long = (id) => answerSummary(byId[id], answers[id], 'long') || '—';

  const situationOpt = optionOf(byId.situation, answers.situation);
  const situationLabel = situationOpt ? situationOpt.label : 'Eigene Situation';
  const situationLine = long('situation');

  const rows = [
    { phase: 'fakt', label: 'Fakt', lines: [
      `Was passiert ist: ${long('passiert')}`,
      `Gewollt: ${long('gewollt')}`,
      `Gesagt: ${long('gesagt')}`,
      `Getan: ${long('getan')}`,
    ] },
    { phase: 'abweichung', label: 'Abweichung', lines: [long('abweichung')] },
    { phase: 'warum',      label: 'Warum',      lines: [long('warum')] },
    { phase: 'mechanik',   label: 'Mechanik',   lines: [mechanikText(answers)] },
    { phase: 'bruecke',    label: 'Brücke',     lines: [
      `Nächster Schritt: ${long('bruecke')}`,
      'Klein, konkret, in den nächsten 48 Stunden.',
    ] },
  ];

  const plainText = [
    'TRUSTBRIDGE FINDER CARD',
    `Situation: ${situationLine}`,
    '',
    ...rows.flatMap((r) => [r.label.toUpperCase(), ...r.lines.map((l) => `  ${l}`), '']),
    METHOD_LINE,
  ].join('\n');

  return { situationLabel, situationLine, headline: headlineFor(answers), rows, plainText };
}
