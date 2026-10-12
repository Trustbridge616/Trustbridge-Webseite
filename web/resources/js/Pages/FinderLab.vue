<template>
  <AppLayout>
    <SeoHead
      title="Finder Lab – lokaler Prototyp | Trustbridge"
      description="Experimenteller, nur lokal erreichbarer Prototyp des Trustbridge Finders (Reise A, simulierte KI)."
      keywords="Finder Lab, Prototyp"
    />

    <div class="page-base-bg"></div>
    <div class="water-bg" aria-hidden="true">
      <div class="water-layer water-img"></div>
      <div class="water-overlay"></div>
    </div>

    <!-- Kompakter Einstieg: die erste Frage soll in drei Sekunden sichtbar sein -->
    <header class="lab-hero">
      <span class="hero-tag">TRUSTBRIDGE FINDER · LAB</span>
      <h1>Finder Lab</h1>
      <p class="lab-hero-sub">Prototyp 0.1 · Reise A „Authentizität" · klickbar · lokal · KI nur simuliert</p>
    </header>

    <div class="lab-wrap">
      <div class="premium-order-stage stage-abo-mode lab-stage">
        <div class="stage-ambient-glow abo"></div>

        <!-- KI-Hinweis vor der ersten Interaktion (Art. 50 KI-VO) + Speicher-Opt-in (§ 25 TDDDG) -->
        <div class="lab-notice" v-if="screen === 'A0'">
          <p>
            Der Finder wird im Produkt von einer <strong>KI</strong> ausgewertet – hier im Lab nur <strong>simuliert</strong>.
            Er ist keine Therapie, keine Diagnose und keine Rechtsberatung.
            <span class="lab-notice-u18">Unter 18? Nummer gegen Kummer 116 111 · AT/CH 147.</span>
          </p>
          <div class="lab-notice-checks">
            <label class="lab-remember lab-age">
              <input type="checkbox" :checked="state.adult" @change="lab.setAdult($event.target.checked)" />
              <span>Ich bin mindestens 18 Jahre alt</span>
            </label>
            <label class="lab-remember">
              <input type="checkbox" v-model="remember" />
              <span>Fortschritt auf diesem Gerät merken</span>
            </label>
          </div>
        </div>

        <ProgressPath :phases="PHASES" :current="phase" :complete="screen === 'A10b'" />

        <Transition name="fade-slide" mode="out-in">
          <section :key="screen" class="stage-section lab-screen" ref="sectionEl" :data-lab-screen="screen">
            <div class="step-head">
              <span class="step-badge badge-abo" v-if="screen !== 'SAFETY'">{{ stepNumber }}</span>
              <h2>{{ view.title }}</h2>
            </div>
            <p class="lab-sub" v-if="view.sub">{{ view.sub }}</p>
            <p class="lab-mirror" aria-live="polite" v-if="mirror && screen !== 'SAFETY' && screen !== 'A10b'">{{ mirror }}</p>

            <!-- ── Kachel-Screens ── -->
            <div v-if="isChoice" class="lab-grid" :class="['cols-' + gridCols, { odd: options.length % 2 === 1 }]">
              <FinderCrystalCard
                v-for="opt in options" :key="opt.id"
                :label="opt.label" :title="opt.title" :icon="opt.icon"
                :active="selected === opt.id" :data-opt="opt.id"
                @select="pick(opt.id)"
              />
            </div>

            <!-- ── A3: Die Weiche ── -->
            <div v-else-if="screen === 'A3'" class="lab-visual">
              <RailSwitch
                :model-value="switchModel"
                :impulse-label="labels.impulse" :expectation-label="labels.expectation"
                @update:model-value="pick"
              />
              <p class="lab-visual-note">Oder: Du hast die Weiche nicht gestellt – oder sie war schon gestellt.</p>
              <div class="lab-grid cols-3 odd">
                <FinderCrystalCard
                  v-for="opt in saidHalf" :key="opt.id"
                  :label="opt.label" :title="opt.title" :icon="opt.icon"
                  :active="selected === opt.id" :data-opt="opt.id"
                  @select="pick(opt.id)"
                />
              </div>
            </div>

            <!-- ── A5: Abweichung sichtbar ── -->
            <div v-else-if="screen === 'A5'" class="lab-visual">
              <svg class="lab-dev-svg" viewBox="0 0 600 130" aria-hidden="true">
                <line x1="100" y1="60" x2="500" y2="60" class="dv-line" />
                <path v-if="devGap && devGap[1] - devGap[0] === 1" :d="`M${100 + devGap[0] * 200} 60 H${100 + devGap[1] * 200}`" class="dv-gap" />
                <path v-else-if="devGap" d="M100 60 Q300 -6 500 60" class="dv-gap" />
                <g v-for="(p, i) in devPoints" :key="p.k">
                  <circle :cx="100 + i * 200" cy="60" r="11" class="dv-dot" :class="{ hot: devGap && devGap.includes(i) }" />
                  <text :x="100 + i * 200" y="28" text-anchor="middle" class="dv-k">{{ p.k }}</text>
                  <text :x="100 + i * 200" y="100" text-anchor="middle" class="dv-v">{{ p.v }}</text>
                </g>
              </svg>
              <ul class="sr-only">
                <li v-for="p in devPoints" :key="'t' + p.k">{{ p.k }}: {{ p.v }}</li>
              </ul>
              <div class="lab-grid cols-3">
                <FinderCrystalCard
                  v-for="opt in options" :key="opt.id"
                  :label="opt.label" :title="opt.title" :icon="opt.icon"
                  :active="selected === opt.id" :data-opt="opt.id"
                  @select="pick(opt.id)"
                />
              </div>
              <div class="lab-jump" v-if="selected === 'aendern'">
                <span>Was möchtest du korrigieren?</span>
                <button type="button" class="btn-outline" @click="lab.jumpTo('A2')">Gewollt</button>
                <button type="button" class="btn-outline" @click="lab.jumpTo('A3')">Gesagt</button>
                <button type="button" class="btn-outline" @click="lab.jumpTo('A4')">Getan</button>
              </div>
            </div>

            <!-- ── A7: Stellwerk ── -->
            <div v-else-if="screen === 'A7'" class="lab-visual">
              <SwitchYard
                :scenes="yardScenes" :switches="yard.switches"
                :impulse-label="labels.impulse" :expectation-label="labels.expectation"
                :alt-shown="yard.altShown" :lantern="false"
                :max="lab.YARD_MAX" :min="lab.YARD_MIN"
                @set="yardSet" @alt="lab.yardToggleAlt"
              />
              <div class="lab-ask" v-if="yardCanAsk">
                <h3 class="lab-ask-title">Wie ist es bei dir?</h3>
                <div class="lab-grid cols-2">
                  <FinderCrystalCard
                    v-for="opt in options" :key="opt.id"
                    :label="opt.label" :title="opt.title" :icon="opt.icon"
                    :active="selected === opt.id" :data-opt="opt.id"
                    @select="pick(opt.id)"
                  />
                </div>
              </div>
              <p class="lab-visual-note" v-else>Noch {{ lab.YARD_MIN - yard.switches.length }} Weiche{{ lab.YARD_MIN - yard.switches.length === 1 ? '' : 'n' }}, dann kommt die Frage.</p>
            </div>

            <!-- ── A8: Von oben (Kreislauf bei Wiederholung, sonst Karte) ── -->
            <div v-else-if="screen === 'A8'" class="lab-visual">
              <PatternCycle
                v-if="showCycle"
                :nodes="cycleNodes" :filled="cycleFilled" exit-label="Bedenkzeit"
                :active-node="cycleActive" :caption="cycleCaption"
                @node="onCycleNode" @exit="onCycleExit"
              />
              <PerspectiveMap
                v-else
                :stations="mapStations" :picked="selected" :caption="mapCaption"
                @pick="pick"
              />
              <div class="lab-grid cols-3 odd">
                <FinderCrystalCard
                  v-for="opt in options" :key="opt.id"
                  :label="opt.label" :title="opt.title" :icon="opt.icon"
                  :active="selected === opt.id" :data-opt="opt.id"
                  @select="pick(opt.id)"
                />
              </div>
              <p class="lab-astro-note">
                <span class="lab-pill">Im Produkt an dieser Stelle</span>
                Kachel „Astrologische Perspektive freischalten" – Einwilligung, Geburtsdaten, echte Berechnung. Im Lab nicht aktiv.
              </p>
            </div>

            <!-- ── A10a: Trifft es? ── -->
            <div v-else-if="screen === 'A10a'" class="lab-visual lab-validate">
              <div class="lab-statements" role="radiogroup" aria-label="Welcher Satz trifft es?">
                <button
                  v-for="st in validationStatements" :key="st.id" type="button" role="radio"
                  class="lab-statement" :class="{ on: state.validation.choice === st.id }"
                  :aria-checked="state.validation.choice === st.id" :data-stmt="st.id"
                  @click="lab.chooseStatement(st.id)"
                >{{ st.text }}</button>
                <button type="button" class="lab-statement lab-statement-none" @click="noneFits">Keiner davon – zurück zur Mechanik</button>
              </div>
              <label class="lab-field">
                <span>Wann gilt das <em>nicht</em>? (optional)</span>
                <input type="text" maxlength="160" :value="state.validation.exception" @input="lab.setException($event.target.value)" placeholder="Eine Ausnahme, die dir einfällt …" />
              </label>
            </div>

            <!-- ── A10b: Finder Card ── -->
            <div v-else-if="screen === 'A10b'" class="epic-ck-wrapper checkout-pulse-active-abo">
              <div class="panther-reward abo">
                <img src="/panther-muenze-legacy-nobg.png" class="pr-img pr-abo" alt="" />
                <div class="pr-message"><span>Deine Finder Card ist bereit.</span></div>
              </div>
              <div class="epic-ck-glow"></div>
              <div class="epic-ck-card" v-if="card">
                <div class="epic-ck-top">
                  <div class="epic-ck-selection">
                    <span class="epic-ck-box-label">Finder Card · {{ card.situationLabel }}</span>
                    <span class="epic-ck-price epic-ck-headline">{{ card.headline }}</span>
                  </div>
                  <div class="epic-ck-type-pill abo">Authentizität</div>
                </div>
                <dl class="finder-card-rows">
                  <div class="fc-row" :class="row.phase" v-for="row in card.rows" :key="row.phase">
                    <dt class="fc-label">{{ row.label }}</dt>
                    <dd class="fc-text" v-for="(line, i) in row.lines" :key="i">{{ line }}</dd>
                    <svg v-if="row.phase === 'mechanik' && yard.switches.length" class="fc-glyph" viewBox="0 0 160 34" aria-hidden="true">
                      <line x1="0" y1="30" x2="160" y2="30" class="fcg-rail" />
                      <g v-for="(sw, i) in yard.switches" :key="i" :transform="`translate(${16 + i * 32} 0) rotate(${sw === 'impulse' ? -30 : 30} 0 30)`">
                        <line x1="0" y1="30" x2="0" y2="10" class="fcg-lever" />
                        <circle cx="0" cy="9" r="4" class="fcg-knob" :class="sw" />
                      </g>
                    </svg>
                  </div>
                </dl>
                <div class="epic-ck-info ck-info-abo">Kein Urteil · Keine Diagnose · Dein nächster Schritt</div>
                <button class="epic-cta-btn abo" @click="copyCard">
                  <span class="cta-glare"></span><span class="cta-text">FINDER CARD KOPIEREN</span>
                </button>
                <div class="finder-nav finale-nav">
                  <button type="button" class="btn-outline" @click="lab.back">Zurück</button>
                  <button type="button" class="btn-outline" @click="lab.restart">Neu starten</button>
                  <button type="button" class="btn-outline lab-danger" @click="wipeAll">Alles auf diesem Gerät löschen</button>
                </div>
              </div>
            </div>

            <!-- ── Sicherheits-Screen (fest, keine Methodik) ── -->
            <div v-else-if="screen === 'SAFETY'" class="lab-safety" role="alert">
              <p class="lab-safety-text">{{ J.SAFETY.text }}</p>
              <ul class="lab-safety-contacts">
                <li v-for="c in J.SAFETY.contacts" :key="c.label">
                  <span>{{ c.label }}</span>
                  <a v-if="c.tel" :href="'tel:' + c.tel"><strong>{{ c.value }}</strong></a>
                  <strong v-else>{{ c.value }}</strong>
                </li>
              </ul>
              <p class="lab-safety-foot">{{ J.SAFETY.footer }}</p>
              <div class="finder-nav finale-nav">
                <button type="button" class="btn-outline" @click="lab.resumeFromSafety">Später weiter</button>
                <button type="button" class="btn-outline lab-danger" @click="wipeAll">Alles auf diesem Gerät löschen</button>
              </div>
              <p class="lab-demo-note">Lab-Hinweis: Die Erkennung ist hier eine einfache Demo-Prüfung im Browser. Im Produkt läuft sie serverseitig plus Modell-Flag (Sicherheitskern).</p>
            </div>

            <!-- ── A9: Wenn-Dann-Plan unter den Kacheln ── -->
            <div v-if="screen === 'A9' && selected" class="lab-ifthen">
              <span class="preview-badge">DEIN WENN-DANN-PLAN</span>
              <div class="lab-ifthen-row">
                <label><span>Wenn</span><input type="text" maxlength="120" :value="state.bridgePlan.wenn" @input="lab.setBridgePlan('wenn', $event.target.value)" /></label>
                <label><span>dann</span><input type="text" maxlength="120" :value="state.bridgePlan.dann" @input="lab.setBridgePlan('dann', $event.target.value)" /></label>
              </div>
            </div>

            <!-- ── Eigene Worte (optional, eingeklappt) ── -->
            <details class="lab-freetext" v-if="allowsText && (isChoice || screen === 'A8')" :open="hasText || undefined">
              <summary>Oder in deinen Worten</summary>
              <textarea
                class="finder-textarea" rows="3" maxlength="600"
                :value="text" @input="lab.setText($event.target.value)"
                placeholder="Zwei, drei Sätze reichen."
              ></textarea>
              <label class="lab-consent">
                <input type="checkbox" :checked="state.consents.ai_text" @change="lab.setAiConsent($event.target.checked)" />
                <span>Meine Worte – auch Angaben zu Stimmung oder Belastung – dürfen von einer KI ausgewertet werden (hier: simuliert; im Produkt: Claude, Anthropic, USA). Ohne Haken bleiben sie nur auf diesem Gerät und die Reise läuft trotzdem weiter.</span>
              </label>
              <p class="preview-disclaimer">Keine Therapie, keine Diagnose, kein Rechtsrat. Widerruf: Haken entfernen.</p>
            </details>

            <!-- ── Navigation ── -->
            <div class="finder-nav lab-nav" v-if="screen !== 'SAFETY' && screen !== 'A10b'">
              <button type="button" class="btn-outline" v-if="state.history.length" @click="lab.back">Zurück</button>
              <button type="button" class="btn-outline lab-pause" @click="pause">Pause</button>
              <button type="button" class="btn-primary" :disabled="!canContinue" @click="goNext" data-lab-next>
                {{ aiBusy ? 'Einen Moment …' : nextLabel }}
              </button>
            </div>
          </section>
        </Transition>

        <div class="flow-connector" v-if="explain">
          <div class="connector-line line-abo"></div>
          <div class="connector-dot dot-abo"></div>
        </div>

        <!-- Mini-Erklärung (method_note) -->
        <div class="pro-tip lab-explain" v-if="explain">
          <div class="pro-tip-glow"></div>
          <div class="pro-tip-icon">💡</div>
          <div class="pro-tip-body">
            <h3>ZUR METHODE</h3>
            <p class="pro-tip-text">{{ explain.text }}</p>
            <div class="pro-tip-divider"></div>
            <p class="pro-tip-sub"><strong>{{ explain.strong }}</strong></p>
          </div>
        </div>

        <!-- Technik-Spalte (im Produkt: Studio-Testmodus) -->
        <div class="lab-devbar">
          <button type="button" class="lab-dev-toggle" :aria-expanded="dev" @click="dev = !dev">{{ dev ? 'Technik ausblenden' : 'Technik anzeigen' }}</button>
          <span class="lab-devbar-note">Simulierte KI · echte Kosten 0,00 $ · {{ state.ai.calls }} Aufruf{{ state.ai.calls === 1 ? '' : 'e' }} simuliert</span>
        </div>
        <div class="lab-dev" v-if="dev">
          <div class="lab-dev-col">
            <h4>Technik (Regeln)</h4>
            <p><span>Screen</span><strong>{{ screen }}</strong> · <span>Phase</span><strong>{{ phase || '—' }}</strong> · <span>KI-Policy</span><strong>{{ aiPolicy }}</strong></p>
            <p><span>Fakten</span></p>
            <ul><li v-for="(v, k) in facts" :key="k"><code>{{ k }}</code> = {{ v }}</li><li v-if="!Object.keys(facts).length">—</li></ul>
            <p><span>Abgeleitet</span> {{ state.derived.deviation ? 'deviation=' + state.derived.deviation : '—' }} · <span>Flags</span> {{ activeFlags.join(', ') || '—' }}</p>
            <p><span>Regelprotokoll</span></p>
            <ol class="lab-log"><li v-for="(e, i) in recentLog" :key="i"><code>{{ e.rule }}</code> {{ e.detail }}</li><li v-if="!recentLog.length">—</li></ol>
          </div>
          <div class="lab-dev-col">
            <h4>KI (simuliert)</h4>
            <p><span>Aufrufe</span><strong>{{ state.ai.calls }}</strong> · <span>Tokens</span><strong>{{ state.ai.tokensIn }} / {{ state.ai.tokensOut }}</strong> · <span>Geschätzt (Opus 5.5)</span><strong>{{ costText }}</strong></p>
            <p><span>Letzte Ausgabe</span></p>
            <pre class="lab-pre">{{ state.ai.last ? JSON.stringify(state.ai.last.out, null, 1) : '—' }}</pre>
            <div class="lab-dev-actions">
              <button type="button" class="btn-outline" @click="lab.restart">Neu starten</button>
              <button type="button" class="btn-outline lab-danger" @click="wipeAll">Alles auf diesem Gerät löschen</button>
            </div>
          </div>
        </div>
      </div>

      <p class="lab-footnote">
        Experiment nach <code>TRUSTBRIDGE_FINDER_MASTER_UX_BLUEPRINT.md</code> (Kap. 4.1, 5, 7.5). Nicht Teil des Produkts.
        Rückbau: Ordner <code>Components/FinderLab</code>, Seite <code>FinderLab.vue</code>, eine Routenzeile – siehe README im Ordner.
      </p>
    </div>
  </AppLayout>

  <transition name="toast-slide">
    <div class="panther-toast stage-abo-mode" v-if="pantherVisible">
      <div class="panther-speech-bubble">{{ pantherMessage }}</div>
      <img src="/panther-mitte-nobg.png" class="toast-panther-img" alt="" />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import FinderCrystalCard from '../Components/Finder/FinderCrystalCard.vue';
import ProgressPath from '../Components/FinderLab/ProgressPath.vue';
import RailSwitch from '../Components/FinderLab/RailSwitch.vue';
import SwitchYard from '../Components/FinderLab/SwitchYard.vue';
import PatternCycle from '../Components/FinderLab/PatternCycle.vue';
import PerspectiveMap from '../Components/FinderLab/PerspectiveMap.vue';
import { useLabEngine } from '../Components/FinderLab/useLabEngine';
import * as J from '../Components/FinderLab/labJourneyA';

const PHASES = J.PHASES;
const lab = useLabEngine();
const {
  state, screen, phase, facts, labels, options, selected, text, hasText, allowsText,
  mirror, deviation, validationStatements, card, canContinue, nextLabel, stepNumber, aiPolicy,
  yard, yardScenes, yardCanAsk, yardExplain, aiBusy, remember,
} = lab;

/* ── Screen-Metadaten ── */
const VIEW = {
  A0:   { title: 'Kennst du das?', sub: 'Welche Szene kommt dir am nächsten?' },
  A1:   { title: 'Wo war das bei dir?', sub: 'Wo ist dir das zuletzt passiert?' },
  A2:   { title: 'Was wolltest du eigentlich?', sub: '' },
  A3:   { title: 'Die Weiche', sub: 'Du stehst am Stellwerk. Was hast du gestellt?' },
  A4:   { title: 'Und dann?', sub: 'Was hast du dann tatsächlich getan?' },
  A5:   { title: 'Deine Abweichung', sub: '' },
  A5b:  { title: 'Im Einklang', sub: 'Wollen, Sagen und Tun passen zusammen. Es gibt hier nichts zu reparieren.' },
  A6:   { title: 'Was hat in dem Moment entschieden?', sub: 'Es gibt gute Gründe für fast jede Weiche. Wir suchen keinen Schuldigen.' },
  A7:   { title: 'Was passiert, wenn das öfter passiert?', sub: 'Erinnere dich an die letzten Male in ähnlichen Situationen: Wie hast du gestellt?' },
  A7b:  { title: 'Wer hat die Weiche gestellt?', sub: 'Ein bewusster Kompromiss ist authentisch, wenn du ihn kennst und trägst. Zurückhalten heißt: Etwas anderes hat für dich entschieden.' },
  A7x:  { title: 'Gleislage', sub: 'Nicht jede Weiche hast du gestellt. Gibt es trotzdem einen kleinen Spielraum, den du dir wünschst?' },
  A8:   { title: 'Von oben', sub: 'Wenn du von oben auf deine Strecke schaust: Was zeigt sie dir?' },
  A9:   { title: 'Deine nächste Weiche', sub: 'Klein. Konkret. In den nächsten 48 Stunden.' },
  A10a: { title: 'Trifft es?', sub: 'Welcher Satz beschreibt deine Mechanik am besten?' },
  A10b: { title: 'Deine Finder Card', sub: '' },
  SAFETY: { title: J.SAFETY.title, sub: '' },
};
const view = computed(() => {
  const v = VIEW[screen.value] || VIEW.A0;
  if (screen.value === 'A2' && lab.direction.value === 'nein-statt-ja') return { ...v, title: 'Was hättest du eigentlich gern zugesagt?' };
  if (screen.value === 'A5') return { ...v, sub: J.deviationSentence(deviation.value, facts.value) };
  return v;
});

const CHOICE_SCREENS = ['A0', 'A1', 'A2', 'A4', 'A5b', 'A6', 'A7b', 'A7x', 'A9'];
const isChoice = computed(() => CHOICE_SCREENS.includes(screen.value));
const gridCols = computed(() => { const n = options.value.length || 3; return n <= 3 ? n : n === 4 ? 2 : 3; });

/* A3 */
const switchModel = computed(() => {
  const said = facts.value.said;
  if (said === 'impulse' || said === 'expectation') return said;
  if (said === 'vielleicht' || said === 'nichts') return 'mid';
  return null;
});
const saidHalf = J.SAID.filter((o) => o.saidSide === null || o.saidSide === 'fixed');

/* A5 */
const devPoints = computed(() => {
  const dir = lab.direction.value;
  const w = J.findOpt(J.WANTED[dir], facts.value.wanted);
  const s = J.findOpt(J.SAID, facts.value.said);
  const d = J.findOpt(J.DID[dir], facts.value.did);
  const L = labels.value;
  const saidLabel = s ? (s.saidSide === 'impulse' ? L.impulse : s.saidSide === 'expectation' ? L.expectation : s.label) : '—';
  return [{ k: 'Gewollt', v: w ? w.label : '—' }, { k: 'Gesagt', v: saidLabel }, { k: 'Getan', v: d ? d.label : '—' }];
});
const devGap = computed(() => J.deviationGap(deviation.value));

/* A8 */
const showCycle = computed(() => ['oefter', 'muster'].includes(facts.value.repetition));
const cycleNodes = computed(() => {
  const dir = lab.direction.value;
  const w = J.findOpt(J.WANTED[dir], facts.value.wanted);
  const why = J.findOpt([...J.WHY, J.WHY_UNKNOWN], facts.value.why);
  return [
    { id: 'impuls', label: 'Impuls', short: 'Impuls', text: w ? `Dein Impuls: ${w.title}` : 'Dein Impuls meldet sich.' },
    { id: 'druck', label: 'Druck', short: 'Druck', text: why && why.fn ? `Der Druck: ${why.title}` : 'Ein Druck, dessen Grund du noch nicht kennst.' },
    { id: 'ja', label: dir === 'nein-statt-ja' ? 'Absage' : 'Ja', short: dir === 'nein-statt-ja' ? 'Absage' : 'Ja', text: dir === 'nein-statt-ja' ? 'Du sagst ab – obwohl du willst.' : 'Du sagst Ja – obwohl du Nein meinst.' },
    { id: 'erleichterung', label: 'Erleichterung', short: 'Kurz leichter', text: 'Kurz ist es leichter. Der andere ist zufrieden, der Druck ist weg.' },
    { id: 'preis', label: 'Preis', short: 'Preis', text: 'Später merkst du: Das war nicht dein Gleis. Und der nächste Impuls kommt.' },
  ];
});
const cycleFilled = computed(() => yard.value.switches.filter((s) => s === 'expectation').length);
const cycleActive = ref(null);
const cycleCaption = ref('Tipp auf einen Punkt des Kreislaufs – oder auf den Ausstieg.');
const onCycleNode = (id) => { cycleActive.value = id; const n = cycleNodes.value.find((x) => x.id === id); cycleCaption.value = n ? n.text : ''; };
const onCycleExit = () => { cycleActive.value = null; cycleCaption.value = 'Zwischen Druck und Ja liegt ein Moment. Genau dort setzt deine Brücke an – ein Satz reicht: „Ich melde mich morgen."'; };
const mapStations = computed(() => J.PERSPECTIVE.filter((p) => p.id !== 'nichts').map((p) => ({ id: p.id, label: p.label })));
const mapCaption = computed(() => {
  const p = J.findOpt(J.PERSPECTIVE, selected.value);
  return p ? p.title : 'Tipp auf eine Station – oder wähle unten.';
});

/* Mini-Erklärung */
const explain = computed(() => {
  const sc = screen.value;
  if (['A0', 'A1', 'A2', 'A3', 'A4'].includes(sc)) return J.EXPLAIN.fakt;
  if (sc === 'A5' || sc === 'A5b') return J.EXPLAIN.abweichung;
  if (sc === 'A6') return J.EXPLAIN.warum;
  if (sc === 'A7') return yardExplain.value;
  if (sc === 'A7b') return J.EXPLAIN.mechanik;
  if (sc === 'A7x') return J.EXPLAIN.gleislage;
  if (sc === 'A8') return J.EXPLAIN.perspektive;
  if (sc === 'A9') return J.EXPLAIN.bruecke;
  if (sc === 'A10a') return J.EXPLAIN.validation;
  if (sc === 'A10b') return J.EXPLAIN.finale;
  return null;
});

/* Technik-Spalte */
const dev = ref(false);
const activeFlags = computed(() => Object.entries(state.value.flags).filter(([, v]) => v).map(([k]) => k));
const recentLog = computed(() => state.value.log.slice(-8).reverse());
const costText = computed(() => (state.value.ai.estCost || 0).toFixed(3).replace('.', ',') + ' $');

/* Panther-Feedback */
const pantherMessage = ref('');
const pantherVisible = ref(false);
let pantherTimeout = null;
const toast = (m) => {
  pantherMessage.value = m; pantherVisible.value = true;
  if (pantherTimeout) clearTimeout(pantherTimeout);
  pantherTimeout = setTimeout(() => { pantherVisible.value = false; }, 3600);
};
let toastCursor = 0;

function pick(optionId) {
  if (!lab.choose(optionId)) return;
  if (screen.value === 'A9') lab.applyBridgeTemplate();
  const list = J.TOASTS[phase.value] || J.TOASTS.fakt;
  toast(list[toastCursor++ % list.length]);
}
function yardSet(v) { lab.yardSet(v); if (yard.value.switches.length === lab.YARD_MIN) toast('Siehst du die Strecke?'); }
async function goNext() {
  if (!canContinue.value) return;
  const willSimulate = (hasText.value && aiPolicy.value === 'on_free_text') || screen.value === 'A10a';
  if (willSimulate) toast('Einen Moment – ich ordne deine Worte ein. (simuliert)');
  await lab.next();
  if (screen.value === 'A10b') toast('Deine Finder Card ist bereit.');
  if (screen.value === 'SAFETY') { pantherVisible.value = false; if (pantherTimeout) clearTimeout(pantherTimeout); }   // kein Toast, keine Ablenkung im Krisen-Screen
}
function noneFits() {
  lab.chooseStatement('none');
  const target = state.value.flags.external ? 'A7x' : 'A7b';   // Gleislage-Pfad kehrt zur Spielraum-Frage zurück, nicht zur Mechanik
  lab.jumpTo(target);
  toast(target === 'A7x' ? 'Dann schauen wir noch einmal auf den Spielraum.' : 'Dann schauen wir noch einmal auf die Mechanik.');
}
function pause() { lab.pause(); toast(remember.value ? 'Dein Stand bleibt auf diesem Gerät.' : 'Ohne „merken" geht der Stand beim Verlassen verloren.'); }
function wipeAll() { lab.wipe(); toast('Alles gelöscht. Nichts hat dieses Gerät verlassen.'); }
async function copyCard() {
  try { await navigator.clipboard.writeText(card.value.plainText); toast('Finder Card kopiert.'); }
  catch { toast('Kopieren nicht möglich – bitte Text manuell markieren.'); }
}

/* Nach dem Screenwechsel zur Frage scrollen (wie V0.1) */
const sectionEl = ref(null);
let scrollTimeout = null;
watch(screen, () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const el = sectionEl.value; if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, 520);
});

onMounted(() => { document.body.classList.add('legacy-mode-active'); });
onUnmounted(() => {
  document.body.classList.remove('legacy-mode-active');
  if (pantherTimeout) clearTimeout(pantherTimeout);
  if (scrollTimeout) clearTimeout(scrollTimeout);
});
</script>

<style scoped>
/* Bühne, Panels, Finale und Toast stammen aus Pages/TrustbridgeFinder.vue
   (Design-Spender /prizes). Neu sind nur die lab-*-Klassen und die
   kompakten Kachel-Varianten für Mobil. */
* { box-sizing: border-box; }

/* ── Kompakter Einstieg ── */
.lab-hero { position: relative; padding: 7.5rem 1.5rem 1.25rem; text-align: center; font-family: 'Century Gothic', system-ui, sans-serif; z-index: 2; }
.hero-tag { display: inline-block; font-size: 0.75rem; font-weight: 700; letter-spacing: 4px; color: #F0CF5A; margin-bottom: 0.8rem; text-shadow: 0 0 25px rgba(240,207,90,0.6); }
.lab-hero h1 { color: #F7F1FF; font-size: 2.3rem; font-weight: 800; margin: 0 0 0.5rem; line-height: 1.1; text-shadow: 0 0 50px rgba(124,58,237,0.25); }
.lab-hero-sub { color: #8EF5D2; font-size: 0.95rem; font-weight: 700; margin: 0; letter-spacing: 0.3px; }

.lab-wrap { position: relative; padding: 1rem 2rem 6rem; font-family: 'Century Gothic', system-ui, sans-serif; z-index: 2; }
.page-base-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #160a2c; z-index: -1; }
.water-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 0; overflow: hidden; }
.water-layer.water-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('/flowing_water_bg.png'); background-size: 1500px; background-repeat: repeat; opacity: 0.05; mix-blend-mode: screen; animation: waterFlowReal 80s linear infinite; filter: contrast(1) brightness(0.8); }
.water-overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at top center, rgba(124,58,237,0.05) 0%, rgba(12,3,26,0.9) 100%); }
@keyframes waterFlowReal { 0% { background-position: 0 0; } 100% { background-position: 1500px 1500px; } }

/* ── Bühne ── */
.premium-order-stage {
  position: relative; z-index: 5; background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 40px; max-width: 1200px; margin: 0 auto; padding: 3rem 3.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(124,58,237,0.1);
  display: flex; flex-direction: column; gap: 1.25rem; transition: all 0.6s ease;
}
.premium-order-stage.stage-abo-mode { box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 100px rgba(142,245,210,0.08); border-top: 1px solid rgba(142,245,210,0.2); }
.stage-ambient-glow { position: absolute; inset: 0; border-radius: 40px; pointer-events: none; background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05), transparent 60%); opacity: 0; transition: opacity 0.6s ease; }
.stage-ambient-glow.abo { opacity: 1; }
.stage-section { scroll-margin-top: 110px; position: relative; z-index: 2; }

.lab-notice {
  display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; padding: 0.9rem 1.4rem;
  color: #D9CFE8; font-size: 0.92rem; line-height: 1.5; position: relative; z-index: 2;
}
.lab-notice p { margin: 0; flex: 1 1 320px; color: #E2D9EE; }
.lab-notice strong { color: #F7F1FF; }
.lab-notice-u18 { display: block; margin-top: 0.3rem; color: rgba(255,255,255,0.6); font-size: 0.85rem; }
.lab-notice-checks { display: flex; flex-direction: column; gap: 0.5rem; }
.lab-remember { display: inline-flex; align-items: center; gap: 0.6rem; color: #8EF5D2; font-weight: 700; cursor: pointer; white-space: nowrap; }
.lab-remember input { width: 20px; height: 20px; accent-color: #8EF5D2; cursor: pointer; }
.lab-age { color: #F0CF5A; }
.lab-age input { accent-color: #F0CF5A; }
.lab-consent { display: flex; align-items: flex-start; gap: 0.7rem; margin-top: 0.8rem; color: #D9CFE8; font-size: 0.88rem; line-height: 1.5; cursor: pointer; }
.lab-consent input { width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px; accent-color: #8EF5D2; cursor: pointer; }

/* ── Schrittkopf ── */
.step-head { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.75rem; position: relative; z-index: 2; }
.step-badge { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.25rem; font-weight: 800; flex-shrink: 0; }
.badge-abo { background: linear-gradient(135deg, rgba(142,245,210,0.2), transparent); border: 1px solid rgba(142,245,210,0.5); color: #8EF5D2; box-shadow: 0 0 25px rgba(142,245,210,0.3); text-shadow: 0 0 15px rgba(142,245,210,0.6); }
.step-head h2 { color: #F7F1FF; font-size: 2rem; font-weight: 700; margin: 0; letter-spacing: 0.5px; text-align: center; line-height: 1.2; }
.lab-sub { text-align: center; color: #C4B8D8; font-size: 1.05rem; line-height: 1.6; max-width: 720px; margin: 0 auto 1.25rem; }
.lab-mirror { text-align: center; color: #8EF5D2; font-weight: 700; font-size: 1rem; margin: -0.5rem auto 1.25rem; max-width: 720px; }

/* ── Kacheln ── */
.lab-grid { position: relative; z-index: 1; display: grid; gap: 1.25rem; align-items: stretch; margin-top: 2.2rem; }
.lab-grid.cols-1 { grid-template-columns: 1fr; max-width: 420px; margin-left: auto; margin-right: auto; }
.lab-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.lab-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.lab-grid-small { max-width: 640px; margin-left: auto; margin-right: auto; }
.lab-grid :deep(.crystal-card) { min-height: 290px; padding: 4rem 1.2rem 2rem; }
.lab-grid :deep(.crystal-card:hover) { transform: translateY(-8px) scale(1.03); }
.lab-grid :deep(.crystal-card.active) { transform: translateY(-14px) scale(1.06); }
.lab-grid :deep(.cc-title) { font-size: 1.08rem; }

/* ── Visualisierungen ── */
.lab-visual { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1.25rem; align-items: stretch; margin-top: 0.5rem; }
.lab-visual-note { text-align: center; color: #C4B8D8; margin: 0.25rem 0 -0.75rem; font-size: 0.95rem; }
.lab-ask { margin-top: 0.5rem; }
.lab-ask-title { text-align: center; color: #F7F1FF; font-size: 1.4rem; margin: 0 0 -1rem; }
.lab-dev-svg { width: 100%; max-width: 720px; margin: 0 auto; display: block; height: auto; overflow: visible; }
.dv-line { stroke: rgba(255,255,255,0.3); stroke-width: 3; }
.dv-gap { fill: none; stroke: #F0CF5A; stroke-width: 6; stroke-linecap: round; filter: drop-shadow(0 0 10px rgba(240,207,90,0.7)); }
.dv-dot { fill: rgba(30,20,50,0.95); stroke: rgba(255,255,255,0.6); stroke-width: 2; }
.dv-dot.hot { stroke: #F0CF5A; fill: #F0CF5A; }
.dv-k { fill: rgba(255,255,255,0.6); font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
.dv-v { fill: #F7F1FF; font-size: 16px; font-weight: 700; }
.lab-jump { display: flex; align-items: center; justify-content: center; gap: 0.75rem; flex-wrap: wrap; color: #D9CFE8; }
.lab-jump .btn-outline { padding: 0.6rem 1.2rem; font-size: 0.95rem; }
.lab-astro-note { text-align: center; color: rgba(255,255,255,0.55); font-size: 0.88rem; margin: 0.5rem auto 0; max-width: 680px; line-height: 1.5; }
.lab-pill { display: inline-block; border: 1px solid rgba(240,207,90,0.4); color: #F0CF5A; border-radius: 20px; padding: 2px 10px; font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; margin-right: 0.5rem; }

/* ── Trifft es? ── */
.lab-validate { max-width: 760px; margin: 0 auto; }
.lab-statements { display: flex; flex-direction: column; gap: 0.75rem; }
.lab-statement {
  text-align: left; padding: 1.1rem 1.4rem; border-radius: 16px; cursor: pointer; font-family: inherit;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #F7F1FF; font-size: 1.05rem; line-height: 1.5; transition: all 0.3s ease;
}
.lab-statement:hover { background: rgba(255,255,255,0.09); border-color: rgba(142,245,210,0.5); }
.lab-statement:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 3px; }
.lab-statement.on { border-color: rgba(142,245,210,0.9); background: rgba(20,35,45,0.85); box-shadow: 0 0 25px rgba(142,245,210,0.25); }
.lab-statement-none { color: #C4B8D8; font-size: 0.95rem; border-style: dashed; }
.lab-field { display: flex; flex-direction: column; gap: 0.4rem; color: #C4B8D8; font-size: 0.92rem; }
.lab-field em { color: #F0CF5A; font-style: normal; }
.lab-field input, .lab-ifthen input {
  width: 100%; background: rgba(0,0,0,0.25); border: 1px solid rgba(142,245,210,0.25); border-radius: 12px; padding: 0.8rem 1rem; color: #F7F1FF;
  font-family: inherit; font-size: 1rem; outline: none; transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.lab-field input:focus, .lab-ifthen input:focus { border-color: rgba(142,245,210,0.7); box-shadow: 0 0 20px rgba(142,245,210,0.2); }

/* ── Wenn-Dann ── */
.lab-ifthen { max-width: 760px; margin: 1.5rem auto 0; display: flex; flex-direction: column; gap: 0.6rem; position: relative; z-index: 2; }
.lab-ifthen-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.lab-ifthen label { display: flex; flex-direction: column; gap: 0.3rem; color: #C4B8D8; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }
.preview-badge { font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #8EF5D2; }

/* ── Eigene Worte ── */
.lab-freetext { max-width: 760px; margin: 1.5rem auto 0; position: relative; z-index: 2; background: rgba(10,30,35,0.6); border: 1px solid rgba(142,245,210,0.3); border-radius: 20px; padding: 0.9rem 1.4rem; }
.lab-freetext summary { cursor: pointer; color: #8EF5D2; font-weight: 800; letter-spacing: 2px; font-size: 0.78rem; text-transform: uppercase; list-style: none; }
.lab-freetext summary::-webkit-details-marker { display: none; }
.lab-freetext summary::before { content: '▸ '; }
.lab-freetext[open] summary::before { content: '▾ '; }
.finder-textarea { width: 100%; min-height: 96px; resize: vertical; margin-top: 0.8rem; background: rgba(0,0,0,0.25); border: 1px solid rgba(142,245,210,0.25); border-radius: 14px; padding: 0.9rem 1.1rem; color: #F7F1FF; font-family: inherit; font-size: 1rem; line-height: 1.6; outline: none; }
.finder-textarea:focus { border-color: rgba(142,245,210,0.7); box-shadow: 0 0 20px rgba(142,245,210,0.2); }
.preview-disclaimer { font-size: 0.82rem; color: rgba(255,255,255,0.5); margin: 0.5rem 0 0; line-height: 1.4; }

/* ── Navigation ── */
.finder-nav { display: flex; justify-content: flex-end; align-items: center; gap: 0.9rem; flex-wrap: wrap; margin-top: 1.6rem; position: relative; z-index: 2; }
.finder-nav button { font-family: inherit; cursor: pointer; }
.finale-nav { justify-content: center; margin-top: 1.5rem; }
.lab-pause { margin-right: auto; }
.btn-outline { display: inline-block; padding: 0.9rem 2rem; border: 1px solid rgba(142,245,210,0.4); border-radius: 8px; color: #8EF5D2; font-size: 1.02rem; font-weight: 600; background: transparent; transition: all 0.3s ease; }
.btn-outline:hover { background: rgba(142,245,210,0.1); box-shadow: 0 0 20px rgba(142,245,210,0.2); }
.btn-outline:focus-visible, .btn-primary:focus-visible { outline: 2px solid #F0CF5A; outline-offset: 3px; }
.lab-danger { border-color: rgba(255,120,120,0.4); color: #ffb3b3; }
.lab-danger:hover { background: rgba(255,120,120,0.08); box-shadow: none; }
.btn-primary { display: inline-block; padding: 0.95rem 2.3rem; border-radius: 8px; font-weight: 700; font-size: 1.05rem; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 10px 20px rgba(142,245,210,0.3); transition: all 0.3s ease; border: none; text-align: center; }
.btn-primary:hover { box-shadow: 0 15px 30px rgba(142,245,210,0.5); transform: translateY(-3px); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }

/* ── Connector + Mini-Erklärung ── */
.flow-connector { display: flex; flex-direction: column; align-items: center; margin: -0.5rem 0; opacity: 0.7; }
.connector-line { width: 2px; height: 32px; }
.line-abo { background: linear-gradient(to bottom, rgba(142,245,210,0.8), transparent); }
.connector-dot { width: 8px; height: 8px; border-radius: 50%; }
.dot-abo { background: #8EF5D2; box-shadow: 0 0 15px #8EF5D2; }
.pro-tip { position: relative; background: linear-gradient(135deg, rgba(142,245,210,0.1), rgba(30,20,50,0.8)); border: 1px solid rgba(142,245,210,0.3); border-radius: 20px; padding: 1.6rem 2rem; display: flex; gap: 1.5rem; align-items: flex-start; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
.pro-tip-glow { position: absolute; top: -50%; left: -10%; width: 50%; height: 200%; background: radial-gradient(ellipse, rgba(142,245,210,0.15) 0%, transparent 70%); pointer-events: none; transform: rotate(30deg); }
.pro-tip-icon { font-size: 2.4rem; line-height: 1; filter: drop-shadow(0 0 15px rgba(240,207,90,0.5)); }
.pro-tip-body { position: relative; z-index: 2; }
.pro-tip-body h3 { color: #F0CF5A; font-size: 1.05rem; font-weight: 800; margin: 0 0 0.6rem; letter-spacing: 2px; }
.pro-tip-text { color: #F7F1FF; font-size: 1.05rem; line-height: 1.6; margin: 0 0 0.9rem; }
.pro-tip-divider { height: 1px; background: linear-gradient(90deg, rgba(142,245,210,0.4), transparent); margin-bottom: 0.9rem; }
.pro-tip-sub { color: #D9CFE8; margin: 0; }
.pro-tip-sub strong { color: #8EF5D2; font-size: 1.1rem; }

/* ── Finder Card (Epic-Optik) ── */
.epic-ck-wrapper { max-width: 760px; margin: 0.5rem auto 0; position: relative; }
.epic-ck-glow { position: absolute; inset: -20px; border-radius: 40px; background: radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%); filter: blur(30px); opacity: 0.5; }
.epic-ck-card { position: relative; background: rgba(40, 25, 60, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 30px; padding: 3rem; border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.3); text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.6); }
.epic-ck-wrapper.checkout-pulse-active-abo .epic-ck-card { animation: finalPulseAbo 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
@keyframes finalPulseAbo { 0% { transform: scale(1); border-color: rgba(142,245,210,0.3); } 30% { transform: scale(1.02); box-shadow: 0 0 60px rgba(142,245,210,0.5), inset 0 0 40px rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.8); } 100% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(142,245,210,0.3); } }
.epic-ck-top { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.25rem; margin-bottom: 1.25rem; gap: 1rem; }
.epic-ck-selection { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; text-align: left; }
.epic-ck-box-label { color: #C4B8D8; font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.epic-ck-price { color: #F7F1FF; font-weight: 800; }
.epic-ck-headline { font-size: 2rem; line-height: 1.15; }
.epic-ck-type-pill { padding: 8px 22px; border-radius: 30px; font-weight: 700; font-size: 1.05rem; white-space: nowrap; }
.epic-ck-type-pill.abo { background: rgba(142,245,210,0.2); color: #8EF5D2; border: 1px solid rgba(142,245,210,0.5); box-shadow: 0 0 20px rgba(142,245,210,0.3); }
.epic-ck-info { color: #8EF5D2; opacity: 0.9; font-size: 1.05rem; margin-bottom: 1.75rem; }
.finder-card-rows { display: flex; flex-direction: column; gap: 1.1rem; text-align: left; margin: 0 0 1.75rem; }
.fc-row { padding-bottom: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.fc-label { display: block; color: #8EF5D2; font-size: 0.78rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.4rem; text-shadow: 0 0 10px rgba(142,245,210,0.4); }
.fc-text { color: #F7F1FF; font-size: 1.05rem; line-height: 1.6; margin: 0; overflow-wrap: anywhere; }
.fc-text + .fc-text { margin-top: 0.3rem; }
.fc-row.bruecke { background: rgba(240,207,90,0.1); border: 1px dashed rgba(240,207,90,0.4); border-radius: 15px; padding: 1.25rem; }
.fc-row.bruecke .fc-label { color: #F0CF5A; text-shadow: 0 0 10px rgba(240,207,90,0.5); }
.fc-glyph { display: block; width: 160px; height: 34px; margin-top: 0.6rem; }
.fcg-rail { stroke: rgba(255,255,255,0.25); stroke-width: 2; }
.fcg-lever { stroke: #D9CFE8; stroke-width: 3; stroke-linecap: round; }
.fcg-knob { fill: #F7F1FF; }
.fcg-knob.impulse { fill: #F0CF5A; }
.epic-cta-btn { position: relative; width: 100%; padding: 1.4rem; border-radius: 20px; border: none; font-family: inherit; font-size: 1.25rem; font-weight: 800; letter-spacing: 1px; cursor: pointer; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.epic-cta-btn:hover { transform: translateY(-3px) scale(1.02); }
.cta-text { position: relative; z-index: 2; }
.cta-glare { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-20deg); animation: btnGlare 4s infinite; z-index: 1; }
@keyframes btnGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }
.epic-cta-btn.abo { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); }
.panther-reward { position: absolute; top: 50%; left: -220px; transform: translateY(-50%); z-index: -1; display: flex; flex-direction: column; align-items: center; opacity: 0.8; pointer-events: none; }
.pr-img { width: 240px; filter: drop-shadow(0 0 30px rgba(142,245,210,0.15)); }
.pr-message { margin-top: -30px; background: rgba(20, 15, 35, 0.85); border: 1px solid rgba(142,245,210,0.4); color: #8EF5D2; padding: 8px 18px; border-radius: 12px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; box-shadow: 0 15px 30px rgba(0,0,0,0.6); }
@media (max-width: 1200px) { .panther-reward { left: -160px; opacity: 0.6; } .pr-img { width: 200px; } }
@media (max-width: 992px) { .panther-reward { top: -120px; left: 50%; transform: translateX(-50%); opacity: 0.4; } .pr-img { width: 160px; } }

/* ── Sicherheits-Screen ── */
.lab-safety { max-width: 760px; margin: 0 auto; background: rgba(20,10,40,0.85); border: 1px solid rgba(240,207,90,0.6); border-radius: 20px; padding: 2rem 2.2rem; text-align: left; box-shadow: 0 15px 40px rgba(0,0,0,0.5), 0 0 40px rgba(240,207,90,0.12); position: relative; z-index: 2; }
.lab-safety-text { color: #F7F1FF; font-size: 1.1rem; line-height: 1.7; margin: 0 0 1.25rem; }
.lab-safety-contacts { list-style: none; margin: 0 0 1.25rem; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.lab-safety-contacts li { display: flex; flex-direction: column; gap: 0.15rem; padding: 0.9rem 1.1rem; background: rgba(240,207,90,0.08); border: 1px dashed rgba(240,207,90,0.4); border-radius: 14px; }
.lab-safety-contacts span { color: #D9CFE8; font-size: 0.9rem; }
.lab-safety-contacts strong { color: #F0CF5A; font-size: 1.25rem; letter-spacing: 0.5px; }
.lab-safety-contacts a { text-decoration: none; display: inline-block; min-height: 24px; }
.lab-safety-contacts a:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 3px; border-radius: 6px; }
.lab-safety-foot { color: #C4B8D8; margin: 0; line-height: 1.6; }
.lab-demo-note { color: rgba(255,255,255,0.7); font-size: 0.86rem; margin: 1.25rem 0 0; line-height: 1.5; }

/* ── Technik-Spalte ── */
.lab-devbar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; position: relative; z-index: 2; }
.lab-dev-toggle { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #D9CFE8; border-radius: 8px; padding: 0.5rem 1rem; font-family: inherit; font-size: 0.85rem; cursor: pointer; }
.lab-dev-toggle:hover { border-color: rgba(142,245,210,0.5); color: #8EF5D2; }
.lab-devbar-note { color: rgba(255,255,255,0.45); font-size: 0.82rem; }
.lab-dev { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; background: rgba(20,10,40,0.8); border: 1px solid rgba(142,245,210,0.3); border-radius: 20px; padding: 1.5rem; text-align: left; position: relative; z-index: 2; }
.lab-dev-col h4 { color: #8EF5D2; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 0.8rem; }
.lab-dev-col p { color: #F7F1FF; font-size: 0.9rem; margin: 0 0 0.6rem; line-height: 1.5; }
.lab-dev-col p span { color: rgba(255,255,255,0.5); margin-right: 0.3rem; }
.lab-dev-col p strong { color: #F0CF5A; margin-right: 0.3rem; }
.lab-dev-col ul, .lab-log { margin: 0 0 0.8rem; padding-left: 1.1rem; color: #D9CFE8; font-size: 0.85rem; line-height: 1.5; }
.lab-dev-col code { color: #8EF5D2; font-size: 0.82rem; }
.lab-pre { background: rgba(0,0,0,0.3); border-radius: 10px; padding: 0.8rem; color: #D9CFE8; font-size: 0.78rem; line-height: 1.4; white-space: pre-wrap; overflow-wrap: anywhere; max-height: 220px; overflow: auto; margin: 0 0 0.8rem; }
.lab-dev-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.lab-dev-actions .btn-outline { padding: 0.55rem 1rem; font-size: 0.85rem; }
.lab-footnote { text-align: center; color: rgba(255,255,255,0.4); font-size: 0.8rem; max-width: 820px; margin: 1.5rem auto 0; line-height: 1.6; }
.lab-footnote code { color: rgba(142,245,210,0.7); }

/* ── Toast ── */
.panther-toast { position: fixed; bottom: 30px; right: 30px; z-index: 100; display: flex; align-items: flex-end; gap: 1rem; pointer-events: none; }
.panther-speech-bubble { background: rgba(20, 10, 40, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(142,245,210,0.5); padding: 1rem 1.5rem; border-radius: 20px; border-bottom-right-radius: 4px; color: #F7F1FF; font-size: 1.05rem; font-weight: 700; box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(142,245,210,0.3); margin-bottom: 20px; max-width: 320px; }
.toast-panther-img { width: 120px; filter: drop-shadow(0 0 20px rgba(142,245,210,0.4)); }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(50px) translateX(20px); }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.fade-slide-enter-from { opacity: 0; transform: translateY(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (prefers-reduced-motion: reduce) {
  .fade-slide-enter-active, .fade-slide-leave-active, .toast-slide-enter-active, .toast-slide-leave-active { transition: none; }
  .water-layer.water-img, .cta-glare { animation: none; }
  .epic-ck-wrapper.checkout-pulse-active-abo .epic-ck-card { animation: none; }
  .btn-primary:hover, .epic-cta-btn:hover { transform: none; }
}

/* ── Mobil: kompakte Kacheln, zwei Spalten ── */
@media (max-width: 1024px) {
  .premium-order-stage { padding: 2.25rem 1.75rem; border-radius: 30px; }
  .lab-grid.cols-3 { grid-template-columns: repeat(2, 1fr); }
  .lab-grid :deep(.crystal-card) { min-height: 230px; padding: 3.4rem 1rem 1.4rem; }
  .lab-dev { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .lab-hero { padding: 6.5rem 1rem 0.75rem; }
  .lab-hero h1 { font-size: 1.9rem; }
  .lab-wrap { padding: 0.75rem 0.75rem 4rem; }
  .premium-order-stage { padding: 1.5rem 0.9rem; border-radius: 22px; gap: 1rem; }
  .step-head h2 { font-size: 1.45rem; }
  .step-badge { width: 36px; height: 36px; font-size: 1rem; }
  .lab-sub { font-size: 0.98rem; }
  .lab-grid, .lab-grid.cols-2, .lab-grid.cols-3 { grid-template-columns: repeat(2, 1fr); gap: 0.7rem; margin-top: 1.8rem; }
  .lab-grid.odd > :last-child { grid-column: span 2; }
  .lab-grid :deep(.crystal-card) { min-height: 172px; padding: 2.8rem 0.65rem 1rem; border-radius: 16px; }
  .lab-grid :deep(.cc-glass) { border-radius: 16px; }
  .lab-grid :deep(.cc-title) { font-size: 0.9rem; line-height: 1.35; }
  .lab-grid :deep(.cc-name) { font-size: 0.68rem; letter-spacing: 1px; }
  .lab-grid :deep(.cc-box-stage) { width: 64px; height: 64px; top: -16px; }
  .lab-grid :deep(.cc-box-icon svg) { width: 26px; height: 26px; }
  .lab-grid :deep(.cc-stage-ring) { width: 54px; height: 14px; bottom: 10px; }
  .lab-grid :deep(.crystal-card.active) { transform: scale(1.02) !important; }
  .lab-ifthen-row { grid-template-columns: 1fr; }
  .finder-nav { flex-direction: column-reverse; align-items: stretch; }
  .finder-nav button { width: 100%; }
  .lab-pause { margin-right: 0; }
  .pro-tip { flex-direction: column; padding: 1.25rem; gap: 0.75rem; }
  .epic-ck-card { padding: 1.75rem 1.25rem; }
  .epic-ck-headline { font-size: 1.6rem; }
  .epic-ck-top { flex-direction: column; align-items: flex-start; }
  .epic-cta-btn { font-size: 1.05rem; padding: 1.1rem; }
  .panther-toast { right: 10px; bottom: 10px; }
  .toast-panther-img { width: 90px; }
  .panther-speech-bubble { font-size: 0.95rem; padding: 0.8rem 1.1rem; }
  .lab-notice { padding: 0.8rem 1rem; font-size: 0.86rem; }
}
</style>

<style>
/* Globale Legacy-Mode-Overrides (Footer/Buttons) — identisch mit Pages/TrustbridgeFinder.vue,
   damit die Seite auch ohne vorher geladene V0.1 konsistent aussieht. */
body.legacy-mode-active .site-footer { border-top-color: rgba(142,245,210,0.2) !important; background: #0a1115 !important; }
body.legacy-mode-active .footer-crown svg { fill: #8EF5D2 !important; filter: drop-shadow(0 0 60px rgba(142,245,210,0.25)) !important; }
body.legacy-mode-active .footer-nav h4, body.legacy-mode-active .footer-tagline { color: #8EF5D2 !important; }
body.legacy-mode-active .footer-nav ul a:hover { color: #8EF5D2 !important; }
body.legacy-mode-active .footer-nav ul a::after { background: linear-gradient(90deg, #8EF5D2, #5CE1C6, #8EF5D2) !important; }
body.legacy-mode-active .page-base-bg { background: #0b1115 !important; }
body.legacy-mode-active .water-overlay { background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05) 0%, rgba(5,15,20,0.9) 100%) !important; }
</style>
