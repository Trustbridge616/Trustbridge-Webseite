// Trustbridge Finder — Schema- und Konsistenzprüfung der Phase-0-Artefakte.
// Aufruf: npm run test:finder
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeAstroFacts } from '../../astro/chart.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const finderDir = path.resolve(here, '../../resources/finder');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
addFormats(ajv);

const schemaDir = path.join(finderDir, 'schemas');
const schemas = {};
for (const file of fs.readdirSync(schemaDir).filter((f) => f.endsWith('.schema.json'))) {
  const s = readJson(path.join(schemaDir, file));
  schemas[file] = s;
  ajv.addSchema(s);
}

let failures = 0;
const report = (ok, name, errors) => {
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name}`);
  if (!ok) { failures++; if (errors) console.log('     ' + ajv.errorsText(errors, { separator: '\n     ' })); }
};
const validate = (schemaFile, data, name) => {
  const v = ajv.getSchema(schemas[schemaFile].$id);
  const ok = v(data);
  report(ok, name, v.errors);
  return ok;
};

/* 1. Module gegen ihr Schema (nach kind) */
const kindToSchema = { journey: 'module-journey.schema.json', persona: 'module-persona.schema.json', astro_rules: 'module-astro-rules.schema.json' };
const moduleDir = path.join(finderDir, 'modules');
const modules = fs.readdirSync(moduleDir).filter((f) => f.endsWith('.json')).map((f) => ({ file: f, data: readJson(path.join(moduleDir, f)) }));
for (const m of modules) validate(kindToSchema[m.data.kind], m.data, `Modul ${m.file} (${m.data.kind})`);

/* 2. Querbezüge innerhalb der Journeys */
const personaSlugs = new Set(modules.filter((m) => m.data.kind === 'persona').map((m) => m.data.slug));
const astroSlugs = new Set(modules.filter((m) => m.data.kind === 'astro_rules').map((m) => m.data.slug));
for (const m of modules.filter((x) => x.data.kind === 'journey')) {
  const j = m.data;
  const factKeys = new Set(j.facts.map((f) => f.key));
  const phaseIds = new Set(j.phases.map((p) => p.id));
  const problems = [];
  if (!personaSlugs.has(j.persona_ref)) problems.push(`persona_ref ${j.persona_ref} unbekannt`);
  if (j.astro.rules_ref && !astroSlugs.has(j.astro.rules_ref)) problems.push(`astro.rules_ref ${j.astro.rules_ref} unbekannt`);
  if (j.astro.earliest_phase && !phaseIds.has(j.astro.earliest_phase)) problems.push(`astro.earliest_phase ${j.astro.earliest_phase} unbekannt`);
  for (const p of j.phases) {
    for (const q of p.questions) {
      if (!factKeys.has(q.fact_key)) problems.push(`Frage ${q.id}: fact_key ${q.fact_key} nicht definiert`);
      if (q.card_pool && (q.card_pool.length < 2 || q.card_pool.length > 6)) problems.push(`Frage ${q.id}: card_pool muss 2–6 Kacheln haben`);
      if (q.variants && !factKeys.has(q.variants.when_fact)) problems.push(`Frage ${q.id}: variants.when_fact unbekannt`);
    }
    for (const k of p.gate.requires_facts) if (!factKeys.has(k)) problems.push(`Phase ${p.id}: gate.requires_facts ${k} nicht definiert`);
  }
  for (const b of j.branches ?? []) {
    if (!factKeys.has(b.when.fact)) problems.push(`Branch ${b.id}: Fakt ${b.when.fact} unbekannt`);
    if (b.then.goto_phase && !phaseIds.has(b.then.goto_phase)) problems.push(`Branch ${b.id}: goto_phase unbekannt`);
  }
  for (const row of j.finder_card.rows) for (const k of row.from_facts) if (!factKeys.has(k)) problems.push(`Finder Card: Fakt ${k} unbekannt`);
  report(problems.length === 0, `Querbezüge ${m.file}`);
  for (const p of problems) console.log('     ' + p);
}

/* 3. Komponenten-Registry ↔ Schemas */
const registry = readJson(path.join(finderDir, 'components.json'));
const registryTypes = registry.components.map((c) => c.type);
const journeyTypes = schemas['module-journey.schema.json'].$defs.component_type.enum;
const turnTypes = schemas['finder-turn.schema.json'].properties.components.items.anyOf.map((r) => r.$ref.split('/').pop());
const aiUsableNow = registry.components.filter((c) => c.ai_may_use && ['available', 'phase_1'].includes(c.status)).map((c) => c.type);
report(registryTypes.every((t) => journeyTypes.includes(t)) && journeyTypes.every((t) => registryTypes.includes(t)), 'components.json ↔ Journey-Schema component_type identisch');
report(aiUsableNow.every((t) => turnTypes.includes(t)) && turnTypes.every((t) => aiUsableNow.includes(t)), `FinderTurn.components deckt genau die KI-nutzbaren Bausteine ab (${aiUsableNow.join(', ')})`);
const iconEnum = schemas['finder-turn.schema.json'].$defs.card_option.properties.icon.enum;
report(JSON.stringify(iconEnum) === JSON.stringify(registry.icons) && JSON.stringify(schemas['module-journey.schema.json'].$defs.icon.enum) === JSON.stringify(registry.icons), 'Icon-Listen identisch (Registry, FinderTurn, Journey)');

/* 4. Beispiel-FinderTurn */
const exampleTurn = {
  phase: 'verstehen', intent: 'question', style_used: 'warm',
  message: 'Du sagst, die Kündigung kam ohne Vorwarnung. Was davon wiegt gerade am schwersten?',
  components: [
    { type: 'choice_cards', label: 'Belastung', options: [
      { id: 'finanzen', label: 'Geld', title: 'Ich weiß nicht, wie es finanziell weitergeht.', icon: 'shield' },
      { id: 'ploetzlichkeit', label: 'Plötzlich', title: 'Es kam ohne Vorwarnung.', icon: 'zap' },
    ] },
    { type: 'free_text', label: 'Oder in deinen Worten', placeholder: 'Was wiegt am schwersten?' },
  ],
  facts: [{ key: 'belastung', value: 'Es kam ohne Vorwarnung.', source: 'user_text' }],
  hypotheses: [{ text: 'Die Plötzlichkeit wiegt schwerer als das Finanzielle.', confidence: 'low', basis: 'Fakt belastung; Frage belastung noch nicht vertieft' }],
  question_ref: 'belastung', rule_refs: ['belastung', 'persona.warm'],
  rationale: 'Phase Verstehen, Fakt belastung noch unscharf → Vertiefung nach deepen_how; Stil warm laut Phase.',
  safety: { crisis_signal: false, boundary: 'none' },
};
validate('finder-turn.schema.json', exampleTurn, 'Beispiel-FinderTurn');

/* 5. Beispiel-Turn-Record und Session */
const now = new Date().toISOString();
validate('turn-record.schema.json', {
  id: '3f1c2e2a-5a1b-4c0d-9e8f-123456789abc', session_id: '7a2b3c4d-1e2f-4a5b-8c9d-abcdefabcdef', seq: 2, role: 'assistant', created_at: now,
  ai: exampleTurn,
  engine: { module_version_id: 1, persona_version_id: 1, astro_rules_version_id: null, phase_before: 'verstehen', phase_after: 'verstehen',
    gates: [{ id: 'phase.verstehen.requires_facts', result: 'block', detail: 'belastung fehlt' }], applied_rules: ['phase.verstehen.style=warm'], branch_taken: null,
    style_requested: 'warm', safety_override: 'none', astro: { consent: false, house_system: 'placidus', facts_available: false, facts_hash: null, rules_selected: [] },
    prompt: { core_hash: 'sha256:…', module_hash: 'sha256:…', input_token_estimate: 6100, debug_prompt_ref: null } },
  usage: { model: 'claude-opus-5-5', request_id: null, input_tokens: 6100, cache_read_input_tokens: 5400, cache_creation_input_tokens: 0, output_tokens: 420, cost_usd: 0.0128, latency_ms: 4200, stop_reason: 'end_turn', effort: 'medium' },
  error: null,
}, 'Beispiel-TurnRecord');
validate('session-record.schema.json', {
  id: '7a2b3c4d-1e2f-4a5b-8c9d-abcdefabcdef', user_id: null, anon_token_hash: 'sha256:…', tester_label: 'Tester 1', status: 'active',
  consents: { test_storage: { given: true, at: now, text_version: 'testphase-2026-v1' }, astro: { given: false, at: null } },
  module: { journey_version_id: 1, persona_version_id: 1, astro_rules_version_id: null, reflection_version_ids: [] },
  state: { phase: 'verstehen', turns: 2, facts: [], finder_card: null, next_step: null },
  astro: { house_system: 'placidus', profile_id: null, chart_id: null },
  totals: { input_tokens: 6100, output_tokens: 420, cost_usd: 0.0128, api_calls: 1, errors: 0 },
  retention: { expires_at: now, policy: 'testphase-2026-v1', deleted_at: null },
  client: { locale: 'de', viewport: '1440x900', app_version: 'dev' },
  created_at: now, updated_at: now,
}, 'Beispiel-SessionRecord');

/* 6. Astro-Fakten aus der Berechnungsschicht */
const facts = computeAstroFacts({ birth_date: '1990-06-15', birth_time: '08:30', place: { name: 'Berlin', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin' }, house_system: 'whole_sign' });
validate('astro-facts.schema.json', facts, 'AstroFacts (Berlin 1990, Europe/Berlin, Sommerzeit)');
const noTime = computeAstroFacts({ birth_date: '1990-06-15', birth_time: null, place: { name: 'Berlin', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin' } });
validate('astro-facts.schema.json', noTime, 'AstroFacts ohne Geburtszeit (Häuser null)');
report(facts.input.place.utc_offset_minutes === 120 && noTime.chart.angles === null && noTime.notes.length > 0, 'Sommerzeit-Versatz 120 min, ohne Zeit keine Winkel');

console.log(failures ? `\n${failures} Prüfung(en) fehlgeschlagen` : '\nAlle Prüfungen bestanden');
process.exit(failures ? 1 : 0);
