<template>
  <AppLayout>
    <SeoHead
      title="Trustbridge Finder – Entdecke, was dich wirklich bewegt"
      description="Der Trustbridge Finder zeigt dir Schritt für Schritt, wo deine Wünsche, deine Aussagen und dein Verhalten auseinanderliegen. Fakt → Abweichung → Warum → Mechanik → Brücke."
      keywords="Trustbridge Finder, Authentizität, Selbstreflexion, Entscheidung"
      canonical="https://trustbridge.de/trustbridgefinder"
    />

    <!-- GLOBAL BG -->
    <div class="page-base-bg"></div>

    <!-- ═══════ FLOWING WATER BG ═══════ -->
    <div class="water-bg" aria-hidden="true">
      <div class="water-layer water-img"></div>
      <div class="water-overlay"></div>
    </div>

    <!-- HERO -->
    <div class="page-hero">
      <div class="hero-glow g1"></div>
      <div class="hero-glow g2"></div>
      <div class="hero-inner">
        <span class="hero-tag">TRUSTBRIDGE</span>
        <h1>Trustbridge Finder</h1>
        <p class="hero-sub">Entdecke, was dich wirklich bewegt.</p>
        <p class="hero-intro">
          Der Finder macht sichtbar, wo deine inneren Wünsche, deine Aussagen und dein tatsächliches Verhalten auseinanderliegen.
        </p>
        <p class="hero-close">{{ METHOD_LINE }}</p>
      </div>
    </div>

    <div class="flow-wrap">
      <!-- Panther Guide -->
      <img src="/panther-mitte-nobg.png" class="guide-panther" alt="" aria-hidden="true" />

      <!-- THE PREMIUM STAGE (Permanently Abo-Mode for colors) -->
      <div class="premium-order-stage stage-abo-mode">
        <div class="stage-ambient-glow abo"></div>

        <div class="system-intro-panel">
          <div class="intro-text-side">
            <h3>So funktioniert der Finder</h3>
            <p>Eine Frage pro Schritt. Antworte mit einer Kachel oder in deinen eigenen Worten. Deine Antworten bleiben in diesem Browserfenster und werden nicht gespeichert.</p>
          </div>
          <div class="intro-img-side">
            <img src="/panther-muenze-legacy-nobg.png" class="panther-coin-img" alt="Legacy Panther Münze">
          </div>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <!-- AKTUELLER SCHRITT -->
          <div v-if="!isFinale" :key="currentStep.id" class="stage-section" ref="stepSection">
            <div class="step-head">
              <span class="step-badge badge-abo">{{ stepIndex + 1 }}</span>
              <h2>{{ currentStep.question }}</h2>
            </div>

            <div class="plateau-container" :class="{ 'with-protocol': stepIndex > 0 }">
              <div class="plateau-base">
                <div class="plateau-grid-lines grid-abo"></div>
                <div class="plateau-core-glow core-abo"></div>
              </div>

              <!-- Schritt 1: volle Breite (wie Zahlungsart) · ab Schritt 2:
                   Kacheln + Protokoll nebeneinander (wie Boxen + Kalkulation) -->
              <div class="finder-layout" :class="stepIndex > 0 ? 'side-by-side' : 'full'">
                <div class="level-grid" :class="'cols-' + gridCols">
                  <FinderCrystalCard
                    v-for="opt in currentStep.options" :key="opt.id"
                    :label="opt.label" :title="opt.title" :icon="opt.icon"
                    :active="currentAnswer.optionId === opt.id"
                    @select="pick(currentStep.id, opt.id)"
                  />
                </div>

                <!-- Protokoll (Kalkulationspanel-Optik) -->
                <div class="calc-panel finder-protocol" v-if="stepIndex > 0">
                  <h3>Dein Protokoll</h3>

                  <div class="multiplier-badges">
                    <span
                      v-for="ph in PHASES" :key="ph.id"
                      class="mb-item" :class="phaseState(ph.id)"
                    >{{ ph.label }}</span>
                  </div>

                  <div class="calc-divider"></div>

                  <div class="calc-block" v-for="entry in protocol" :key="entry.id">
                    <h4>{{ entry.label }}</h4>
                    <div class="protocol-value">{{ entry.value }}</div>
                  </div>

                  <div class="calc-divider"></div>

                  <div class="calc-gold-box">
                    <h4>Aktuelle Phase</h4>
                    <div class="calc-gold-value">{{ currentPhase.label }}</div>
                    <div class="calc-gold-sub">Schritt {{ stepIndex + 1 }} von {{ totalSteps }}</div>
                  </div>
                </div>
              </div>

              <!-- Eigene Worte + Navigation (Preview-Panel-Optik) -->
              <div class="dynamic-preview-panel activation-pulse finder-text-panel">
                <div class="preview-info">
                  <span class="preview-badge">{{ currentStep.textLabel.toUpperCase() }}</span>
                  <textarea
                    class="finder-textarea"
                    rows="3"
                    maxlength="600"
                    :placeholder="currentStep.placeholder"
                    :value="currentAnswer.text"
                    @input="setText(currentStep.id, $event.target.value)"
                  ></textarea>
                  <p class="preview-disclaimer">{{ hint }}</p>
                </div>
                <div class="finder-nav">
                  <button type="button" class="btn-outline" v-if="stepIndex > 0" @click="back">Zurück</button>
                  <button type="button" class="btn-primary" :disabled="!canContinue" @click="goNext">
                    {{ isLastStep ? 'Finder Card erstellen' : 'Weiter' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- FINALE: FINDER CARD (Epic-Checkout-Optik) -->
          <div v-else key="finale" class="stage-section step-finale" ref="stepSection">
            <div class="step-head">
              <span class="step-badge badge-abo">{{ totalSteps + 1 }}</span>
              <h2>Deine Finder Card</h2>
            </div>

            <div class="epic-ck-wrapper checkout-pulse-active-abo">

              <div class="panther-reward abo">
                <img src="/panther-muenze-legacy-nobg.png" class="pr-img pr-abo" alt="Panther Legacy" />
                <div class="pr-message">
                  <span>Deine Finder Card ist bereit.</span>
                </div>
              </div>

              <div class="epic-ck-glow"></div>
              <div class="epic-ck-card">
                <div class="epic-ck-top">
                  <div class="epic-ck-selection">
                    <span class="epic-ck-box-label">Finder Card · {{ finderCard.situationLabel }}</span>
                    <span class="epic-ck-price epic-ck-headline">{{ finderCard.headline }}</span>
                  </div>
                  <div class="epic-ck-type-pill abo">
                    Authentizität
                  </div>
                </div>

                <div class="finder-card-rows">
                  <div class="fc-row" :class="row.phase" v-for="row in finderCard.rows" :key="row.phase">
                    <span class="fc-label">{{ row.label }}</span>
                    <p class="fc-text" v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
                  </div>
                </div>

                <div class="epic-ck-info ck-info-abo">
                  Kein Urteil · Keine Diagnose · Dein nächster Schritt
                </div>

                <button class="epic-cta-btn abo" @click="copyCard">
                  <span class="cta-glare"></span>
                  <span class="cta-text">FINDER CARD KOPIEREN</span>
                </button>

                <div class="finder-nav finale-nav">
                  <button type="button" class="btn-outline" @click="back">Zurück</button>
                  <button type="button" class="btn-outline" @click="restart">Neu starten</button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Connection Line -->
        <div class="flow-connector">
          <div class="connector-line line-abo"></div>
          <div class="connector-dot dot-abo"></div>
        </div>

        <!-- ZUR METHODE (PRO-TIPP-Block) -->
        <div class="pro-tip">
          <div class="pro-tip-glow"></div>
          <div class="pro-tip-icon">💡</div>
          <div class="pro-tip-body">
            <h3>ZUR METHODE</h3>
            <p class="pro-tip-text">{{ tip.text }}</p>
            <div class="pro-tip-divider"></div>
            <p class="pro-tip-sub">
              <strong>{{ tip.strong }}</strong><br>
              {{ tip.sub }}
            </p>
          </div>
        </div>

      </div> <!-- /premium-order-stage -->
    </div>

  </AppLayout>

  <!-- Panther Feedback Toast -->
  <transition name="toast-slide">
    <div class="panther-toast stage-abo-mode" v-if="pantherVisible">
      <div class="panther-speech-bubble">
        {{ pantherMessage }}
      </div>
      <img src="/panther-mitte-nobg.png" class="toast-panther-img" alt="Panther Guide" />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import FinderCrystalCard from '../Components/Finder/FinderCrystalCard.vue';
import { useFinder } from '../Components/Finder/useFinder';
import { PHASES, METHOD_LINE, PHASE_TIPS, TOASTS } from '../Components/Finder/finderConfig';

const finder = useFinder();
const {
  stepIndex, totalSteps, isFinale, currentStep, isLastStep, currentAnswer,
  currentPhase, canContinue, protocol, phaseState, finderCard,
  setText, back, restart,
} = finder;

/* Kachel-Raster: bis 3 Optionen so viele Spalten, 4 → 2×2, 5–6 → 3 Spalten */
const gridCols = computed(() => {
  const n = currentStep.value?.options.length || 3;
  return n <= 3 ? n : n === 4 ? 2 : 3;
});

const tip = computed(() => PHASE_TIPS[isFinale.value ? 'finale' : currentStep.value.phase]);

const hint = computed(() => {
  const a = currentAnswer.value;
  const hasText = a.text.trim().length >= 3;
  if (a.optionId && !hasText) return 'Ergänze optional ein paar Worte – oder geh direkt weiter.';
  if (hasText) return 'Deine Worte zählen als Antwort.';
  return 'Wähle eine Kachel oder schreibe mindestens ein paar Worte.';
});

/* Panther-Feedback (wie auf /prizes) */
const pantherMessage = ref('');
const pantherVisible = ref(false);
let pantherTimeout = null;

const triggerFeedback = (message) => {
  pantherMessage.value = message;
  pantherVisible.value = true;
  if (pantherTimeout) clearTimeout(pantherTimeout);
  pantherTimeout = setTimeout(() => {
    pantherVisible.value = false;
  }, 4000);
};

let toastCursor = 0;
const pick = (stepId, optionId) => {
  if (!finder.selectOption(stepId, optionId)) return;
  const list = TOASTS[currentStep.value.phase] || TOASTS.fakt;
  triggerFeedback(list[toastCursor++ % list.length]);
};

const goNext = () => {
  if (!canContinue.value) return;
  finder.next();
  if (isFinale.value) triggerFeedback('Deine Finder Card ist bereit.');
};

const copyCard = async () => {
  try {
    await navigator.clipboard.writeText(finderCard.value.plainText);
    triggerFeedback('Finder Card kopiert.');
  } catch {
    triggerFeedback('Kopieren nicht möglich – bitte Text manuell markieren.');
  }
};

/* Nach dem Schrittwechsel (fade-slide out-in, 0.5s) zur neuen Frage scrollen */
const stepSection = ref(null);
const scrollToStep = () => {
  const el = stepSection.value;
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};
watch(stepIndex, () => { setTimeout(scrollToStep, 520); });

onMounted(() => {
  document.body.classList.add('legacy-mode-active');
});

onUnmounted(() => {
  document.body.classList.remove('legacy-mode-active');
  if (pantherTimeout) clearTimeout(pantherTimeout);
});
</script>

<style scoped>
/* Bühne, Hero, Plateau, Panels, Finale und Toast sind unverändert aus
   Pages/Prizes.vue übernommen (Design-Spender). Die Crystal-Card lebt in
   Components/Finder/FinderCrystalCard.vue. Inline-Styles des Spenders
   (Kalkulationspanel, PRO TIPP) stehen hier als Klassen mit denselben Werten. */
* { box-sizing: border-box; }

/* ══════════════════════════════════════
   HERO
   ══════════════════════════════════════ */
.page-hero {
  position: relative;
  background: transparent;
  padding: 10rem 2rem 3rem;
  text-align: center;
  overflow: hidden;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.hero-glow {
  position: absolute; border-radius: 50%; filter: blur(140px); pointer-events: none;
  animation: heroFloat 8s ease-in-out infinite;
}
.g1 { top: -30%; left: 10%; width: 600px; height: 600px; background: rgba(124,58,237,0.3); opacity: 0.5; }
.g2 { bottom: -25%; right: 5%; width: 500px; height: 500px; background: rgba(240,207,90,0.15); opacity: 0.4; animation-delay: -4s; }
@keyframes heroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.06); }
}
.hero-inner { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
.hero-tag {
  display: inline-block; font-size: 0.8rem; font-weight: 700;
  letter-spacing: 4px; color: #F0CF5A; margin-bottom: 1.25rem;
  text-shadow: 0 0 25px rgba(240,207,90,0.6);
}
.page-hero h1 {
  color: #F7F1FF; font-size: 3.8rem; font-weight: 800;
  margin: 0 0 1rem; font-family: 'Century Gothic', system-ui, sans-serif;
  line-height: 1.1;
  text-shadow: 0 0 50px rgba(124,58,237,0.25);
}
.hero-sub {
  color: #8EF5D2; font-size: 1.25rem; font-weight: 700; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
  letter-spacing: 0.5px;
  text-shadow: 0 0 20px rgba(142,245,210,0.35);
}
.hero-intro {
  color: #C4B8D8; font-size: 1.02rem; line-height: 1.8;
  margin: 1.5rem auto 0; max-width: 680px;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.hero-close {
  color: #F7F1FF; font-size: 1.18rem; font-weight: 700; line-height: 1.6;
  margin: 1.6rem auto 0; max-width: 620px;
  font-family: 'Century Gothic', system-ui, sans-serif;
  text-shadow: 0 0 30px rgba(124,58,237,0.35);
}

/* ══════════════════════════════════════
   FLOW WRAPPER & BACKGROUNDS
   ══════════════════════════════════════ */
.flow-wrap {
  background: transparent;
  font-family: 'Century Gothic', system-ui, sans-serif;
  position: relative;
  padding: 2rem 2rem 6rem;
}

.page-base-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: #160a2c; z-index: -1;
}

.water-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.water-layer.water-img {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('/flowing_water_bg.png');
  background-size: 1500px; background-repeat: repeat;
  opacity: 0.05; mix-blend-mode: screen;
  animation: waterFlowReal 80s linear infinite; filter: contrast(1) brightness(0.8);
}
.water-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at top center, rgba(124,58,237,0.05) 0%, rgba(12,3,26,0.9) 100%);
}
@keyframes waterFlowReal {
  0% { background-position: 0 0; }
  100% { background-position: 1500px 1500px; }
}

.guide-panther {
  position: absolute; left: -10%; top: 10%; height: 900px;
  opacity: 0.05; pointer-events: none; z-index: 0;
  mix-blend-mode: screen; filter: drop-shadow(0 0 40px rgba(124,58,237,0.5));
  animation: pantherBreathLeft 10s ease-in-out infinite;
}
@keyframes pantherBreathLeft {
  0%, 100% { transform: scaleX(-1) translateY(0); opacity: 0.05; }
  50% { transform: scaleX(-1) translateY(-20px); opacity: 0.05; }
}

/* ══════════════════════════════════════
   THE PREMIUM STAGE (UNIFIED CONTAINER)
   ══════════════════════════════════════ */
.premium-order-stage {
  position: relative; z-index: 5;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 40px; max-width: 1400px; margin: 0 auto;
  padding: 4rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(124,58,237,0.1);
  display: flex; flex-direction: column; gap: 1.5rem;
  transition: all 0.6s ease;
}
.premium-order-stage.stage-abo-mode {
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 100px rgba(142,245,210,0.08);
  border-top: 1px solid rgba(142,245,210,0.2);
}
.stage-ambient-glow {
  position: absolute; inset: 0; border-radius: 40px; pointer-events: none;
  background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05), transparent 60%);
  opacity: 0; transition: opacity 0.6s ease;
}
.stage-ambient-glow.abo { opacity: 1; }

.stage-section { scroll-margin-top: 110px; }

/* ══════════════════════════════════════
   FEEDBACK TOAST & INTRO PANEL
   ══════════════════════════════════════ */
.system-intro-panel {
  text-align: left;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 1.5rem 2.5rem;
  max-width: 800px;
  margin: 0 auto 1rem;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.intro-text-side { flex: 1; }
.intro-img-side {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panther-coin-img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(240,207,90,0.3));
  transition: all 0.4s ease;
}
.stage-abo-mode .panther-coin-img {
  filter: drop-shadow(0 0 20px rgba(142,245,210,0.3));
}
.system-intro-panel h3 { color: #F0CF5A; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 0.5rem; transition: color 0.5s ease; }
.stage-abo-mode .system-intro-panel h3 { color: #8EF5D2; }
.system-intro-panel p { color: #F7F1FF; margin: 0; font-size: 1.05rem; line-height: 1.5; }

@media (max-width: 768px) {
  .system-intro-panel {
    flex-direction: column-reverse;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }
  .intro-img-side {
    width: 100px;
    height: 100px;
  }
}

.panther-toast {
  position: fixed; bottom: 30px; right: 30px; z-index: 100;
  display: flex; align-items: flex-end; gap: 1rem; pointer-events: none;
}
.panther-speech-bubble {
  background: rgba(20, 10, 40, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(240,207,90,0.4);
  padding: 1rem 1.5rem; border-radius: 20px; border-bottom-right-radius: 4px;
  color: #F7F1FF; font-size: 1.1rem; font-weight: 700;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4);
  margin-bottom: 20px; transition: all 0.4s ease;
}
.stage-abo-mode .panther-speech-bubble {
  border-color: rgba(142,245,210,0.5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(142,245,210,0.3);
}
.toast-panther-img {
  width: 140px; filter: drop-shadow(0 0 20px rgba(124,58,237,0.5)); transition: all 0.4s ease;
}
.stage-abo-mode .toast-panther-img {
  filter: drop-shadow(0 0 20px rgba(142,245,210,0.4));
}
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(50px) translateX(20px); }

/* Step Headers inside Stage */
.step-head {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin-bottom: 2rem; position: relative; z-index: 2;
}
.step-badge {
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; font-size: 1.4rem; font-weight: 800; transition: all 0.4s ease;
  flex-shrink: 0;
}
.badge-abo {
  background: linear-gradient(135deg, rgba(142,245,210,0.2), transparent);
  border: 1px solid rgba(142,245,210,0.5); color: #8EF5D2;
  box-shadow: 0 0 25px rgba(142,245,210,0.3); text-shadow: 0 0 15px rgba(142,245,210,0.6);
}
.step-head h2 { color: #F7F1FF; font-size: 2.4rem; font-weight: 700; margin: 0; letter-spacing: 1px; }

/* Flow Connector Lines */
.flow-connector {
  display: flex; flex-direction: column; align-items: center; margin: -1rem 0; opacity: 0.7;
}
.connector-line { width: 2px; height: 40px; transition: all 0.4s ease; }
.line-abo { background: linear-gradient(to bottom, rgba(142,245,210,0.8), transparent); }
.connector-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.4s ease; }
.dot-abo { background: #8EF5D2; box-shadow: 0 0 15px #8EF5D2; }

/* ══════════════════════════════════════
   3D PLATEAU & CARD GRID
   ══════════════════════════════════════ */
.plateau-container { position: relative; padding: 100px 0 60px; perspective: 1500px; }
.plateau-container.with-protocol { padding-top: 50px; }
.plateau-base {
  position: absolute; bottom: 5%; left: 2%; right: 2%; height: 250px;
  transform: rotateX(65deg) translateZ(-80px); transform-style: preserve-3d;
  pointer-events: none; z-index: 0;
}
.plateau-grid-lines {
  position: absolute; inset: -20%; opacity: 0.5; transition: all 0.6s ease;
  background-image:
    linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 70% 70% at center, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at center, black 10%, transparent 70%);
}
.plateau-grid-lines.grid-abo {
  background-image:
    linear-gradient(rgba(142,245,210,0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(142,245,210,0.2) 1px, transparent 1px);
}
.plateau-core-glow {
  position: absolute; inset: 0; border-radius: 50%; transition: all 0.6s ease;
  background: radial-gradient(ellipse at center, rgba(99,102,241,0.5) 0%, rgba(124,58,237,0.2) 40%, transparent 70%);
  box-shadow: 0 0 150px rgba(124,58,237,0.8);
  animation: plateauPulse 6s ease-in-out infinite;
}
.plateau-core-glow.core-abo {
  background: radial-gradient(ellipse at center, rgba(142,245,210,0.3) 0%, rgba(99,102,241,0.2) 40%, transparent 70%);
  box-shadow: 0 0 150px rgba(142,245,210,0.4);
}
@keyframes plateauPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* Crystal Grid */
.level-grid {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; align-items: end;
}
.level-grid.cols-1 { grid-template-columns: 1fr; }
.level-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.level-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
/* Schritt 1 wie die Zahlungsart-Auswahl: volle Breite, 2rem Abstand */
.finder-layout.full .level-grid { gap: 2rem; justify-content: center; }
/* Ab Schritt 2 wie Boxen + Kalkulation: nebeneinander */
.finder-layout.side-by-side { display: flex; gap: 3rem; align-items: center; justify-content: space-between; flex-wrap: wrap; }
.finder-layout.side-by-side .level-grid { flex: 2; min-width: 350px; }

/* ══════════════════════════════════════
   PROTOKOLL (Kalkulationspanel-Optik)
   ══════════════════════════════════════ */
.calc-panel {
  flex: 1; min-width: 300px; position: relative; z-index: 1;
  background: rgba(20, 10, 40, 0.8); border: 1px solid rgba(142,245,210,0.5);
  border-radius: 20px; padding: 2.5rem;
  display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; align-items: center;
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
}
.calc-panel h3 { color: #F7F1FF; margin-top: 0; font-size: 1.4rem; text-align: center; text-transform: uppercase; }
.calc-block { text-align: center; width: 100%; }
.calc-block h4 { color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase; }
.protocol-value { font-size: 1.05rem; color: #F7F1FF; font-weight: 700; line-height: 1.4; overflow-wrap: anywhere; }
.calc-divider { height: 1px; width: 100%; background: rgba(142,245,210,0.2); }
.calc-gold-box {
  text-align: center; padding: 1.5rem 1rem; background: rgba(240,207,90,0.1);
  border-radius: 15px; border: 1px dashed rgba(240,207,90,0.4); width: 100%;
}
.calc-gold-box h4 { color: #F0CF5A; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase; font-weight: 900; }
.calc-gold-value { font-size: 2rem; color: #F0CF5A; font-weight: 900; text-shadow: 0 0 20px rgba(240,207,90,0.6); }
.calc-gold-sub { color: #D9CFE8; font-size: 0.9rem; margin-top: 0.4rem; }

.multiplier-badges {
  display: flex; justify-content: center; gap: 10px; margin-top: 2rem; flex-wrap: wrap;
}
.finder-protocol .multiplier-badges { margin-top: 0; }
.mb-item {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); font-size: 0.85rem; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; transition: all 0.3s ease;
}
.mb-item.done { color: rgba(142,245,210,0.75); border-color: rgba(142,245,210,0.3); }
.mb-item.active {
  background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.6);
  color: #8EF5D2; box-shadow: 0 0 15px rgba(142,245,210,0.3); text-shadow: 0 0 8px rgba(142,245,210,0.5);
  transform: scale(1.05);
}

/* ══════════════════════════════════════
   EIGENE WORTE (Preview-Panel-Optik)
   ══════════════════════════════════════ */
.dynamic-preview-panel {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(30,20,50,0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240,207,90,0.3);
  border-radius: 24px;
  padding: 1.5rem 2.5rem;
  max-width: 850px;
  margin: 3rem auto 0;
  position: relative;
  z-index: 5;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(240,207,90,0.05);
}
body.legacy-mode-active .dynamic-preview-panel {
  background: rgba(10,30,35,0.6);
  border-color: rgba(142,245,210,0.3);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(142,245,210,0.05);
}
.activation-pulse {
  animation: panelActivateSingle 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
body.legacy-mode-active .activation-pulse {
  animation: panelActivateAbo 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes panelActivateSingle {
  0% { transform: translateY(10px); box-shadow: 0 0 0 rgba(240,207,90,0); }
  30% { transform: translateY(-5px); box-shadow: 0 0 60px rgba(240,207,90,0.4); border-color: rgba(240,207,90,0.8); }
  100% { transform: translateY(0); box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(240,207,90,0.05); border-color: rgba(240,207,90,0.3); }
}
@keyframes panelActivateAbo {
  0% { transform: translateY(10px); box-shadow: 0 0 0 rgba(142,245,210,0); }
  30% { transform: translateY(-5px); box-shadow: 0 0 60px rgba(142,245,210,0.4); border-color: rgba(142,245,210,0.8); }
  100% { transform: translateY(0); box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(142,245,210,0.05); border-color: rgba(142,245,210,0.3); }
}
.preview-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
.preview-badge {
  font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #F0CF5A; margin-bottom: 0.4rem;
}
body.legacy-mode-active .preview-badge { color: #8EF5D2; }
.preview-disclaimer {
  font-size: 0.85rem; color: rgba(255,255,255,0.5); margin: 0; line-height: 1.4;
}

.finder-text-panel { flex-direction: column; align-items: stretch; gap: 1.25rem; padding: 2rem 2.5rem; }
.finder-text-panel .preview-info { width: 100%; gap: 0.6rem; }
.finder-textarea {
  width: 100%; min-height: 110px; resize: vertical;
  background: rgba(0,0,0,0.25); border: 1px solid rgba(142,245,210,0.25); border-radius: 14px;
  padding: 1rem 1.2rem; color: #F7F1FF;
  font-family: 'Century Gothic', system-ui, sans-serif; font-size: 1.05rem; line-height: 1.6;
  outline: none; transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.finder-textarea::placeholder { color: rgba(255,255,255,0.4); }
.finder-textarea:focus {
  border-color: rgba(142,245,210,0.7);
  box-shadow: 0 0 20px rgba(142,245,210,0.2), inset 0 0 20px rgba(142,245,210,0.04);
}

.finder-nav { display: flex; justify-content: flex-end; align-items: center; gap: 1rem; flex-wrap: wrap; }
.finder-nav button { font-family: 'Century Gothic', system-ui, sans-serif; cursor: pointer; }
.finale-nav { justify-content: center; margin-top: 1.5rem; }

.btn-outline {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(240,207,90,0.4);
  border-radius: 8px;
  color: #F0CF5A;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
}
.btn-outline:hover {
  background: rgba(240,207,90,0.1);
  box-shadow: 0 0 20px rgba(240,207,90,0.2);
}
.btn-primary {
  display: inline-block; padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 10px 20px rgba(240,207,90,0.3); transition: all 0.3s ease; border: none; cursor: pointer; text-align: center; animation: epicSinglePulse 8s ease-in-out infinite 2s;
}
.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; animation: none; box-shadow: none; }

/* ══════════════════════════════════════
   ZUR METHODE (PRO-TIPP-Block)
   ══════════════════════════════════════ */
.pro-tip {
  position: relative; background: linear-gradient(135deg, rgba(142,245,210,0.1), rgba(30,20,50,0.8));
  border: 1px solid rgba(142,245,210,0.3); border-radius: 20px; padding: 2.5rem;
  display: flex; gap: 2rem; align-items: flex-start; overflow: hidden;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}
.pro-tip-glow {
  position: absolute; top: -50%; left: -10%; width: 50%; height: 200%;
  background: radial-gradient(ellipse, rgba(142,245,210,0.15) 0%, transparent 70%);
  pointer-events: none; transform: rotate(30deg);
}
.pro-tip-icon { font-size: 3.5rem; line-height: 1; filter: drop-shadow(0 0 15px rgba(240,207,90,0.5)); }
.pro-tip-body { position: relative; z-index: 2; font-family: 'Century Gothic', system-ui, sans-serif; }
.pro-tip-body h3 { color: #F0CF5A; font-size: 1.5rem; font-weight: 800; margin: 0 0 1rem; letter-spacing: 2px; }
.pro-tip-text { color: #F7F1FF; font-size: 1.15rem; line-height: 1.6; margin: 0 0 1.5rem; }
.pro-tip-divider { height: 1px; background: linear-gradient(90deg, rgba(142,245,210,0.4), transparent); margin-bottom: 1.5rem; }
.pro-tip-sub { color: #D9CFE8; font-size: 1.1rem; line-height: 1.6; margin: 0; }
.pro-tip-sub strong { color: #8EF5D2; font-size: 1.25rem; }

/* ══════════════════════════════════════
   FINALE: FINDER CARD (Epic Checkout)
   ══════════════════════════════════════ */
.epic-ck-wrapper { max-width: 700px; margin: 0 auto; position: relative; }
.epic-ck-glow {
  position: absolute; inset: -20px; border-radius: 40px;
  background: radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%);
  filter: blur(30px); opacity: 0.5; transition: all 0.6s ease;
}
.epic-ck-card {
  position: relative; background: rgba(40, 25, 60, 0.8);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 30px; padding: 4rem;
  border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.3);
  text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.6); transition: all 0.5s ease;
}
.epic-ck-wrapper.checkout-pulse-active-abo .epic-ck-card {
  animation: finalPulseAbo 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes finalPulseAbo {
  0% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(142,245,210,0.3); }
  30% { transform: scale(1.02); box-shadow: 0 0 60px rgba(142,245,210,0.5), inset 0 0 40px rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.8); }
  100% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(142,245,210,0.3); }
}
.epic-ck-top {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem; margin-bottom: 1.5rem;
}
.epic-ck-selection { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; text-align: left; }
.epic-ck-box-label { color: #C4B8D8; font-size: 1.2rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.epic-ck-price { color: #F7F1FF; font-size: 3.2rem; font-weight: 800; transition: color 0.4s ease; }
.epic-ck-headline { font-size: 2.2rem; line-height: 1.15; }
.epic-ck-type-pill { padding: 10px 28px; border-radius: 30px; font-weight: 700; font-size: 1.2rem; transition: all 0.4s ease; white-space: nowrap; }
.epic-ck-type-pill.abo { background: rgba(142,245,210,0.2); color: #8EF5D2; border: 1px solid rgba(142,245,210,0.5); box-shadow: 0 0 20px rgba(142,245,210,0.3); }
.epic-ck-info { color: #D9CFE8; font-size: 1.2rem; margin-bottom: 2.5rem; transition: color 0.4s ease; }
.ck-info-abo { color: #8EF5D2; opacity: 0.9; }

/* Die fünf Zeilen der Finder Card — Brücke im goldenen Dashed-Kasten der Kalkulation */
.finder-card-rows { display: flex; flex-direction: column; gap: 1.25rem; text-align: left; margin-bottom: 2rem; }
.fc-row { padding-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.fc-label {
  display: block; color: #8EF5D2; font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 0.4rem; text-shadow: 0 0 10px rgba(142,245,210,0.4);
}
.fc-text { color: #F7F1FF; font-size: 1.1rem; line-height: 1.6; margin: 0; overflow-wrap: anywhere; }
.fc-text + .fc-text { margin-top: 0.3rem; }
.fc-row.bruecke {
  background: rgba(240,207,90,0.1); border: 1px dashed rgba(240,207,90,0.4); border-radius: 15px; padding: 1.5rem;
}
.fc-row.bruecke .fc-label { color: #F0CF5A; text-shadow: 0 0 10px rgba(240,207,90,0.5); }

.epic-cta-btn {
  position: relative; width: 100%; padding: 1.8rem; border-radius: 20px; border: none;
  font-family: 'Century Gothic', system-ui, sans-serif; font-size: 1.5rem; font-weight: 800; letter-spacing: 1px;
  cursor: pointer; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.epic-cta-btn:hover { transform: translateY(-3px) scale(1.02); }
.epic-cta-btn:active { transform: translateY(1px); }
.cta-text { position: relative; z-index: 2; }
.cta-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg); animation: btnGlare 4s infinite; z-index: 1;
}
@keyframes btnGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }
.epic-cta-btn.abo { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); animation: epicAboPulse 8s ease-in-out infinite 1.5s; }
.epic-cta-btn.abo:hover { box-shadow: 0 20px 40px rgba(142,245,210,0.6), inset 0 2px 0 rgba(255,255,255,0.5); }
.epic-ck-wrapper.checkout-pulse-active-abo .epic-cta-btn {
  animation: btnPulseAbo 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes btnPulseAbo {
  0% { transform: scale(1); filter: brightness(1); }
  30% { transform: scale(1.05); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
}

/* ══════════════════════════════════════
   PANTHER REWARD COMPANION
   ══════════════════════════════════════ */
.panther-reward {
  position: absolute;
  top: 50%;
  left: -220px;
  transform: translateY(-50%);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}
.pr-img {
  width: 260px;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8));
  transition: all 0.5s ease;
}
.panther-reward.abo .pr-img { filter: drop-shadow(0 0 30px rgba(142,245,210,0.15)); }
.pr-message {
  margin-top: -30px;
  background: rgba(20, 15, 35, 0.85);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px 18px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
  position: relative;
  z-index: 2;
}
.panther-reward.abo .pr-message {
  border-color: rgba(142,245,210,0.4);
  color: #8EF5D2;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 20px rgba(142,245,210,0.15);
}
@media (max-width: 1200px) {
  .panther-reward { left: -160px; opacity: 0.6; }
  .pr-img { width: 220px; }
}
@media (max-width: 992px) {
  .panther-reward {
    top: -120px; left: 50%; transform: translateX(-50%);
    opacity: 0.4;
  }
  .pr-img { width: 180px; }
  .pr-message { margin-top: -15px; font-size: 0.75rem; }
}
@media (max-width: 768px) {
  .panther-reward { top: -140px; opacity: 0.3; }
}

/* Schrittwechsel */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.fade-slide-enter-from { opacity: 0; transform: translateY(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* ══════════════════════════════════════
   SUBTLE ATTENTION ANIMATIONS (8s cycle)
   ══════════════════════════════════════ */
@media (prefers-reduced-motion: no-preference) {
  @keyframes epicSinglePulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(240,207,90,0.7), inset 0 2px 0 rgba(255,255,255,0.6); transform: scale(1.015); }
  }
  @keyframes epicAboPulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(142,245,210,0.7), inset 0 2px 0 rgba(255,255,255,0.7); transform: scale(1.015); }
  }
}

/* ══════════════════════════════════════
   MOBILE RESPONSIVENESS
   ══════════════════════════════════════ */
@media (max-width: 1024px) {
  .premium-order-stage { padding: 3rem 2rem; border-radius: 30px; }
  .level-grid, .level-grid.cols-3 { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .plateau-container { padding: 90px 0 20px; perspective: none; }
  .plateau-base { display: none; }
  .finder-layout.side-by-side { gap: 2rem; }
}
@media (max-width: 768px) {
  .panther-toast { right: 10px; bottom: 10px; }
  .toast-panther-img { width: 100px; }
  .panther-speech-bubble { font-size: 1rem; padding: 0.8rem 1.2rem; }
  .page-hero { padding: 8rem 1rem 3rem; }
  .page-hero h1 { font-size: 2.5rem; }
  .step-head h2 { font-size: 1.7rem; }
  .premium-order-stage { padding: 2rem 1rem; border-radius: 20px; gap: 2rem; }
  .guide-panther { opacity: 0.04; right: -20%; height: 600px; }
  .level-grid, .level-grid.cols-2, .level-grid.cols-3 { grid-template-columns: 1fr; gap: 1.5rem; }
  .finder-layout.side-by-side .level-grid, .calc-panel { min-width: 0; width: 100%; }
  .calc-panel { padding: 1.5rem; }
  .dynamic-preview-panel { padding: 1.5rem; }
  .finder-nav { flex-direction: column-reverse; align-items: stretch; }
  .finder-nav button { width: 100%; }
  .pro-tip { flex-direction: column; padding: 1.5rem; gap: 1rem; }
  .epic-ck-card { padding: 2rem 1.5rem; }
  .epic-ck-price { font-size: 2.2rem; }
  .epic-ck-headline { font-size: 1.7rem; }
  .epic-ck-top { flex-direction: column; gap: 1rem; }
  .epic-cta-btn { font-size: 1.15rem; padding: 1.3rem; }
}
</style>

<style>
/* ══════════════════════════════════════
   GLOBAL LEGACY MODE OVERRIDES (Footer, Hero, Buttons)
   — identisch mit Pages/Prizes.vue
   ══════════════════════════════════════ */
body.legacy-mode-active .site-footer {
  border-top-color: rgba(142,245,210,0.2) !important;
  background: #0a1115 !important;
  transition: all 0.6s ease;
}
body.legacy-mode-active .footer-crown svg {
  fill: #8EF5D2 !important;
  filter: drop-shadow(0 0 60px rgba(142,245,210,0.25)) !important;
  transition: all 0.6s ease;
}
body.legacy-mode-active .footer-nav h4,
body.legacy-mode-active .footer-tagline {
  color: #8EF5D2 !important;
  transition: color 0.6s ease;
}
body.legacy-mode-active .footer-nav ul a:hover {
  color: #8EF5D2 !important;
}
body.legacy-mode-active .footer-nav ul a::after {
  background: linear-gradient(90deg, #8EF5D2, #5CE1C6, #8EF5D2) !important;
}
body.legacy-mode-active .social-icon:hover {
  background: rgba(142,245,210,0.15) !important;
  color: #8EF5D2 !important;
  border-color: #8EF5D2 !important;
}

/* Page Background Overrides */
body.legacy-mode-active .page-base-bg {
  background: #0b1115 !important;
  transition: background 0.6s ease;
}
body.legacy-mode-active .water-overlay {
  background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05) 0%, rgba(5,15,20,0.9) 100%) !important;
  transition: all 0.6s ease;
}

/* Hero Overrides — TRUSTBRIDGE-Eyebrow bleibt gold (Gründervorgabe 15.08.2026) */
body.legacy-mode-active .g2 { background: rgba(142,245,210,0.15) !important; }

/* Button Overrides */
body.legacy-mode-active .btn-outline { border-color: rgba(142,245,210,0.4) !important; color: #8EF5D2 !important; }
body.legacy-mode-active .btn-outline:hover { background: rgba(142,245,210,0.1) !important; box-shadow: 0 0 20px rgba(142,245,210,0.2) !important; }
body.legacy-mode-active .btn-primary { background: linear-gradient(135deg, #8EF5D2, #5CE1C6) !important; color: #000 !important; box-shadow: 0 10px 20px rgba(142,245,210,0.3) !important; }
body.legacy-mode-active .btn-primary:hover { box-shadow: 0 15px 30px rgba(142,245,210,0.5) !important; }
body.legacy-mode-active .btn-primary:disabled { box-shadow: none !important; }
</style>
