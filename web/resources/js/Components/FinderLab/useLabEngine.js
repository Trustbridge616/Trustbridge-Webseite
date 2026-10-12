/*
  Finder Lab — Mock-Engine (experimenteller Prototyp)
  ---------------------------------------------------
  Deterministische Schrittlogik nach Blueprint Kap. 4.1 + simulierte KI
  (keine API, keine Kosten). Zustand liegt nur in diesem Browser
  (localStorage, eigener Schlüssel) und ist jederzeit löschbar.
  Die „Technik"-Spalte zeigt, was im Produkt der Studio-Testmodus
  getrennt zeigen würde: angewendete Regeln vs. KI-Ausgabe.
*/
import { ref, computed, watch } from 'vue';
import * as J from './labJourneyA';

const STORAGE_KEY = 'tb-finder-lab-a-v1';
const MIN_TEXT = 3;
const YARD_MAX = 5;
const YARD_MIN = 3;

/* Geschätzte Kosten eines echten Aufrufs (Opus 5.5: 4 $/20 $ je Mio. Tokens) —
   nur zur Anzeige. Das Lab verursacht 0 $. */
const PRICE_IN = 4.0, PRICE_OUT = 20.0;
const AI_SHAPES = {
  classify: { tokensIn: 1900, tokensOut: 160, ms: 700 },
  bridge:   { tokensIn: 2100, tokensOut: 140, ms: 650 },
  card:     { tokensIn: 2600, tokensOut: 420, ms: 950 },
};

function fresh() {
  return {
    version: J.LAB_VERSION,
    screen: 'A0',
    history: [],
    facts: {},
    texts: {},
    derived: {},
    flags: {},
    visual: { yard: { switches: [], altShown: false } },
    validation: { choice: null, statement: null, exception: '' },
    bridgePlan: { wenn: '', dann: '' },
    adult: false,                              // Selbstauskunft „mindestens 18" (Art. 8 DSGVO / Produktentscheidung 18+)
    consents: { ai_text: false },              // Freitext darf (simuliert) KI-ausgewertet werden — Art. 9 DSGVO, Kopplungsverbot
    log: [],
    ai: { calls: 0, tokensIn: 0, tokensOut: 0, estCost: 0, last: null },
    startedAt: Date.now(),
    enteredAt: Date.now(),
    screenTimes: {},
    pausedAt: null,
  };
}

/* Speichern nur mit ausdrücklichem Nutzerwunsch („Fortschritt auf diesem Gerät
   merken", Standard aus) — § 25 TDDDG, Blueprint Kap. 6 (R6). */
const REMEMBER_KEY = STORAGE_KEY + ':remember';
function readRemember() {
  try { return window.localStorage.getItem(REMEMBER_KEY) === '1'; } catch { return false; }
}
function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && s.version === J.LAB_VERSION ? s : null;
  } catch { return null; }
}
function persist(s) {
  // Freitexte (potenziell Gesundheitsdaten) werden nie auf das Gerät geschrieben — nur Kachelwahlen und Ableitungen.
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...s, texts: {} })); } catch { /* privat/blockiert: Lab läuft trotzdem */ }
}
function forget() {
  try { window.localStorage.removeItem(STORAGE_KEY); window.localStorage.removeItem(REMEMBER_KEY); } catch { /* ignore */ }
}

export function useLabEngine() {
  const remember = ref(readRemember());
  const s = ref((remember.value && load()) || fresh());
  const aiBusy = ref(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  watch(s, (v) => { if (remember.value) persist(v); }, { deep: true });
  watch(remember, (on) => {
    if (on) { try { window.localStorage.setItem(REMEMBER_KEY, '1'); } catch { /* ignore */ } persist(s.value); }
    else forget();
  });

  /* ── Ableitungen ── */
  const screen = computed(() => s.value.screen);
  const facts = computed(() => s.value.facts);
  const texts = computed(() => s.value.texts);
  const scene = computed(() => J.sceneOf(s.value.facts));
  const direction = computed(() => J.directionOf(s.value.facts));
  const labels = computed(() => J.labelsOf(s.value.facts));
  const phase = computed(() => J.SCREEN_PHASE[s.value.screen]);
  const aiPolicy = computed(() => J.AI_POLICY[s.value.screen] || 'never');
  const domainForPool = computed(() => (direction.value === 'nein-statt-ja' ? 'reversed' : (s.value.facts.domain || 'selbst')));
  const yardScenes = computed(() => J.SCENE_POOLS[domainForPool.value] || J.SCENE_POOLS.selbst);
  const yard = computed(() => s.value.visual.yard);
  const yardDone = computed(() => yard.value.switches.length >= YARD_MAX);
  const yardCanAsk = computed(() => yard.value.switches.length >= YARD_MIN);
  const yardExplain = computed(() => J.yardExplanation(yard.value.switches));

  const options = computed(() => {
    const f = s.value.facts;
    switch (s.value.screen) {
      case 'A0': return J.SCENES;
      case 'A1': return J.DOMAINS;
      case 'A2': return J.WANTED[direction.value];
      case 'A3': return J.SAID;
      case 'A4': return J.DID[direction.value];
      case 'A5': return J.CONFIRM;
      case 'A5b': return J.INHARMONY;
      case 'A6': return [...J.WHY, J.WHY_UNKNOWN];
      case 'A7': return J.REPETITION;
      case 'A7b': return J.MECHANIC;
      case 'A7x': return J.LEEWAY;
      case 'A8': return J.PERSPECTIVE;
      case 'A9': return f.mechanic === 'kompromiss' ? [J.BRIDGE[3], ...J.BRIDGE.filter((b) => b.id !== 'dabei')] : J.BRIDGE.filter((b) => b.id !== 'dabei' || f.mechanic === 'kompromiss');
      default: return [];
    }
  });

  const FACT_KEY = { A0: 'scene', A1: 'domain', A2: 'wanted', A3: 'said', A4: 'did', A5: 'confirm', A5b: 'inharmony', A6: 'why', A7: 'repetition', A7b: 'mechanic', A7x: 'leeway', A8: 'perspective', A9: 'bridge' };
  const selected = computed(() => s.value.facts[FACT_KEY[s.value.screen]] || null);
  const text = computed(() => s.value.texts[s.value.screen] || '');
  const hasText = computed(() => text.value.trim().length >= MIN_TEXT);
  const allowsText = computed(() => ['A0', 'A1', 'A2', 'A4', 'A6', 'A8', 'A9'].includes(s.value.screen));

  const mirror = computed(() => {
    const prev = s.value.history[s.value.history.length - 1];
    return prev ? J.mirrorFor(prev, s.value.facts, s.value.texts) : '';
  });

  const validationStatements = computed(() => J.validationStatements(s.value.facts, s.value.flags));
  const card = computed(() => (s.value.screen === 'A10b' ? J.buildLabCard(s.value) : null));
  const deviation = computed(() => s.value.derived.deviation || null);

  const canContinue = computed(() => {
    const sc = s.value.screen;
    if (aiBusy.value) return false;
    switch (sc) {
      case 'A0': return !!selected.value && !!s.value.adult;
      case 'A3': return !!selected.value;
      case 'A5': return selected.value === 'stimmt' || selected.value === 'unsicher';
      case 'A5b': return !!selected.value;
      case 'A7': return yardCanAsk.value && !!selected.value;
      case 'A8': return true;                       // optional, überspringbar
      case 'A10a': return !!s.value.validation.choice && s.value.validation.choice !== 'none';
      case 'A10b': return false;
      case 'SAFETY': return false;
      default: return !!selected.value || hasText.value;
    }
  });

  const nextLabel = computed(() => {
    const sc = s.value.screen;
    if (sc === 'A8' && !selected.value && !hasText.value) return 'Überspringen';
    if (sc === 'A10a') return 'Finder Card erstellen';
    if (sc === 'A9') return 'Weiter zur Prüfung';
    return 'Weiter';
  });

  const stepNumber = computed(() => {
    return s.value.history.length + 1;   // tatsächliche Schrittzahl des gegangenen Pfads
  });

  /* ── Protokoll (Technik-Spalte) ── */
  function log(rule, detail) {
    s.value.log.push({ t: Date.now(), screen: s.value.screen, rule, detail: detail || '' });
    if (s.value.log.length > 40) s.value.log.shift();
  }

  /* ── Aktionen ── */
  function choose(optionId) {
    const key = FACT_KEY[s.value.screen];
    if (!key) return false;
    if (s.value.facts[key] === optionId) return false;
    s.value.facts[key] = optionId;
    if (s.value.screen === 'A0') {
      // Szene bestimmt Richtung und Begriffe — spätere Antworten wären nicht mehr zuordenbar.
      for (const k of Object.keys(s.value.facts)) if (k !== 'scene') delete s.value.facts[k];
      for (const k of Object.keys(s.value.texts)) if (k !== 'A0') delete s.value.texts[k];
      const crisisSeen = s.value.flags.crisis_seen;
      s.value.derived = {}; s.value.flags = crisisSeen ? { crisis_seen: true } : {};
      s.value.visual.yard = { switches: [], altShown: false };
      s.value.validation = { choice: null, statement: null, exception: '' };
      s.value.bridgePlan = { wenn: '', dann: '' };
      const sc = J.sceneOf(s.value.facts);
      if (sc.domain) { s.value.facts.domain = sc.domain; log('R-A0-PRESELECT', `Bereich aus Szene vorausgewählt: ${sc.domain}`); }
      if (sc.direction) log('R-A0-DIRECTION', `Abweichungsrichtung: ${sc.direction}`);
    }
    if (s.value.screen === 'A3') {
      s.value.flags.external = optionId === 'vorgegeben';
      if (s.value.flags.external) log('R-A3-FIXED', 'Weiche war schon gestellt → Gleislage-Pfad, keine Abweichungs-/Mechanik-Screens');
    }
    if (s.value.screen === 'A6') {
      s.value.flags.compromise_candidate = optionId === 'abgewogen';
      s.value.flags.external = optionId === 'kein-spielraum';
      if (s.value.flags.external) log('R-A6-EXTERNAL', 'Kein Spielraum → Gleislage-Pfad, kein Stellwerk');
    }
    if (s.value.screen === 'A7b') {
      s.value.flags.compromise = optionId === 'kompromiss';
      if (s.value.flags.compromise) log('R-A7B-COMPROMISE', 'Bewusster Kompromiss → Vogelperspektive übersprungen, keine Reparaturaufgabe');
    }
    return true;
  }

  function setText(value) {
    s.value.texts[s.value.screen] = value;
  }

  function enter(next) {
    const now = Date.now();
    const cur = s.value.screen;
    s.value.screenTimes[cur] = (s.value.screenTimes[cur] || 0) + (now - (s.value.enteredAt || now));
    s.value.history.push(cur);
    s.value.screen = next;
    s.value.enteredAt = now;
  }

  function nextScreenFor(cur) {
    const f = s.value.facts;
    switch (cur) {
      case 'A0': {
        // Bereich kommt aus der Szene → A1 nur bei eigener oder gespiegelter Szene (kürzerer Weg)
        if (f.domain) { log('R-A0-SKIP-A1', `Bereich „${f.domain}" aus Szene → A1 übersprungen`); return 'A2'; }
        return 'A1';
      }
      case 'A1': return 'A2';
      case 'A2': return 'A3';
      case 'A3': {
        if (f.said === 'vorgegeben') {
          s.value.derived.deviation = 'vorgegeben';
          log('R-DEV', 'Abweichung: vorgegeben (keine eigene Weiche)');
          return 'A7x';
        }
        return 'A4';
      }
      case 'A4': {
        const dev = J.deriveDeviation(f);
        s.value.derived.deviation = dev;
        s.value.derived.second_gap = J.deriveSecondGap(f);
        log('R-DEV', `Abweichung berechnet: ${dev}${s.value.derived.second_gap ? ' + zweite Lücke ' + s.value.derived.second_gap : ''} (Tabelle Blueprint A5)`);
        return dev === 'keine' ? 'A5b' : 'A5';
      }
      case 'A5': return 'A6';
      case 'A5b': return f.inharmony === 'fertig' ? 'A10b' : 'A6';
      case 'A6': return s.value.flags.external ? 'A7x' : 'A7';
      case 'A7': return 'A7b';
      case 'A7b': return s.value.flags.compromise ? 'A9' : 'A8';
      case 'A7x': return f.leeway === 'keiner' ? 'A10b' : 'A9';
      case 'A8': return 'A9';
      case 'A9': return 'A10a';
      case 'A10a': return 'A10b';
      default: return 'A10b';
    }
  }

  /* Simulierte KI: liefert deterministischen Text nach kurzer Wartezeit und zählt
     geschätzte Tokens/Kosten eines echten Aufrufs. */
  function simulateAi(kind, payload) {
    const shape = AI_SHAPES[kind] || AI_SHAPES.classify;
    aiBusy.value = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        const out = mockOutput(kind, payload);
        s.value.ai.calls += 1;
        s.value.ai.tokensIn += shape.tokensIn;
        s.value.ai.tokensOut += shape.tokensOut;
        s.value.ai.estCost = (s.value.ai.tokensIn / 1e6) * PRICE_IN + (s.value.ai.tokensOut / 1e6) * PRICE_OUT;
        s.value.ai.last = { kind, out, at: Date.now() };
        log('AI-SIM', `${kind}: simuliert (kein API-Aufruf)`);
        aiBusy.value = false;
        resolve(out);
      }, reduced ? 200 : shape.ms);
    });
  }

  function mockOutput(kind, payload) {
    if (kind === 'classify') {
      const t = (payload.text || '').trim();
      return { mirror: `Du schreibst: „${t.length > 90 ? t.slice(0, 87) + '…' : t}"`, facts_touched: [FACT_KEY[payload.screen] || 'text'], rationale: 'Freitext liegt vor → Spiegelzeile in Nutzerworten; keine Hypothese, da Fakt-Schlüssel bereits durch Kachel gesetzt.' };
    }
    if (kind === 'bridge') {
      const b = J.findOpt(J.BRIDGE, payload.bridge);
      return { wenn: b ? b.wenn : 'ich das nächste Mal Ja sagen will', dann: b ? b.dann : 'halte ich kurz inne', rationale: 'Wenn-Dann-Vorlage aus der gewählten Brücke, an Szene angepasst.' };
    }
    return { rationale: 'Finder Card aus Fakten formuliert; Deutungen nur in der Mechanik-Zeile, als Beobachtung markiert.' };
  }

  async function next() {
    if (!canContinue.value) return;
    const cur = s.value.screen;
    const t = (s.value.texts[cur] || '').trim();

    if (t && J.hasCrisisSignal(t)) {
      s.value.flags.crisis = true;
      s.value.flags.crisis_seen = true;      // bleibt für die Session: Ausschluss aus jeder Auswertung (Blueprint 9.6)
      s.value.consents.ai_text = false;      // Freitext-KI für diese Session gesperrt
      delete s.value.texts[cur];             // auslösenden Text nicht behalten (Gesundheitsdatum)
      log('R-SAFETY', 'Krisensignal im Freitext (Demo-Prüfung) → Sicherheits-Screen, Methodik gestoppt, Text verworfen');
      enter('SAFETY');
      return;
    }
    if (t.length >= MIN_TEXT && J.AI_POLICY[cur] === 'on_free_text') {
      if (s.value.consents.ai_text) await simulateAi('classify', { screen: cur, text: t });
      else log('R-CONSENT', 'Freitext ohne KI-Einwilligung → keine Auswertung; Worte bleiben nur auf diesem Gerät');
    }
    if (cur === 'A10a') {
      await simulateAi('card', {});
    }
    const nx = nextScreenFor(cur);
    enter(nx);
  }

  function back() {
    if (!s.value.history.length) return;
    const prev = s.value.history.pop();
    s.value.screen = prev;
    s.value.enteredAt = Date.now();
    if (prev === 'A7' && !s.value.flags.external) { /* Stellwerk bleibt, Antwort darf geändert werden */ }
  }

  /* Gezielter Rücksprung aus A5 „Nicht ganz – ändern": Antworten bleiben erhalten. */
  function jumpTo(target) {
    const idx = s.value.history.indexOf(target);
    if (idx >= 0) s.value.history = s.value.history.slice(0, idx);
    delete s.value.facts.confirm;
    s.value.screen = target;
    s.value.enteredAt = Date.now();
    log('R-A5-CORRECT', `Rücksprung zu ${target}, Antworten bleiben erhalten`);
  }

  /* Stellwerk */
  function yardSet(value) {
    if (yardDone.value) return;
    s.value.visual.yard.switches.push(value);
    log('R-A7-SWITCH', `Situation ${s.value.visual.yard.switches.length}: ${value}`);
  }
  function yardToggleAlt() {
    s.value.visual.yard.altShown = !s.value.visual.yard.altShown;
  }

  /* Validierung („Trifft es?") */
  function chooseStatement(id) {
    const st = validationStatements.value.find((x) => x.id === id);
    s.value.validation.choice = id;
    s.value.validation.statement = st ? st.text : null;
    log('R-A10A-VALIDATION', id === 'own' ? 'eigener Satz gewählt' : id === 'none' ? 'keiner → zurück zu A7b' : 'Nachbarsatz gewählt → Nutzer ist Autor, Satz übernommen');
  }
  function setException(v) { s.value.validation.exception = v; }
  function setBridgePlan(part, v) { s.value.bridgePlan[part] = v; }
  function applyBridgeTemplate() {
    const b = J.findOpt(J.BRIDGE, s.value.facts.bridge);
    if (!b) return;
    if (!s.value.bridgePlan.wenn) s.value.bridgePlan.wenn = b.wenn;
    if (!s.value.bridgePlan.dann) s.value.bridgePlan.dann = b.dann;
  }

  function pause() { s.value.pausedAt = Date.now(); }
  function resumeFromSafety() {
    const prev = s.value.history.pop();
    s.value.screen = prev || 'A0';
    s.value.flags.crisis = false;
  }
  function restart() {
    const keep = { ai: s.value.ai, adult: s.value.adult, consents: s.value.consents };
    s.value = fresh();
    s.value.ai = { ...keep.ai, last: null }; s.value.adult = keep.adult; s.value.consents = keep.consents;
  }
  function setAdult(v) { s.value.adult = !!v; log('R-AGE', v ? 'Selbstauskunft: mindestens 18' : 'Selbstauskunft zurückgenommen'); }
  function setAiConsent(v) { s.value.consents.ai_text = !!v; log('R-CONSENT', v ? 'KI-Auswertung von Freitext erlaubt (simuliert)' : 'KI-Auswertung von Freitext widerrufen'); }
  function wipe() {
    forget();
    remember.value = false;
    s.value = fresh();
  }

  const elapsedSeconds = computed(() => Math.round((Date.now() - (s.value.startedAt || Date.now())) / 1000));

  return {
    state: s, aiBusy, reduced, remember,
    screen, phase, facts, texts, scene, direction, labels, options, selected, text, hasText, allowsText,
    mirror, deviation, validationStatements, card, canContinue, nextLabel, stepNumber, aiPolicy,
    yard, yardScenes, yardDone, yardCanAsk, yardExplain, elapsedSeconds,
    choose, setText, next, back, jumpTo, yardSet, yardToggleAlt, chooseStatement, setException,
    setBridgePlan, applyBridgeTemplate, pause, resumeFromSafety, restart, wipe, setAdult, setAiConsent,
    YARD_MAX, YARD_MIN,
  };
}
