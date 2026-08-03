<template>
  <section id="analyse" class="aw-funnel">
    <div class="aw-funnel-stage" v-reveal>
      <div class="aw-funnel-ambient" aria-hidden="true"></div>

      <div class="aw-funnel-head">
        <span class="aw-sec-tag">KOSTENLOSE ANALYSE</span>
        <h2>Finde in 2 Minuten heraus, wie dein Weg aussehen kann</h2>
        <p>Beantworte {{ questions.length }} kurze Fragen — am Ende weißt du, wo du stehst und wie es weitergeht.</p>
        <div class="aw-funnel-reassure">
          <strong>Du erfährst den Preis, bevor du irgendetwas entscheidest.</strong>
          Erst das kostenlose Gespräch über deine Situation, dann ein transparentes Angebot
          ohne Kleingedrucktes — und dann entscheidest du in Ruhe, gern mit Bedenkzeit.
          Mehr als 30 Minuten deiner Zeit riskierst du nicht.
        </div>
      </div>

      <div class="aw-funnel-box" aria-live="polite">
        <!-- Fortschritt -->
        <div v-if="phase === 'quiz'" class="aw-funnel-progress">
          <div class="aw-funnel-progress-meta">
            <span>Frage {{ step + 1 }} von {{ questions.length }}</span>
            <span>{{ Math.round(((step) / questions.length) * 100) }} %</span>
          </div>
          <div
            class="aw-funnel-bar"
            role="progressbar"
            :aria-valuenow="step"
            :aria-valuemin="0"
            :aria-valuemax="questions.length"
            :aria-label="'Frage ' + (step + 1) + ' von ' + questions.length"
          >
            <div class="aw-funnel-bar-fill" :style="{ width: (step / questions.length) * 100 + '%' }"></div>
          </div>
        </div>

        <!-- Fragen -->
        <transition name="aw-step" mode="out-in">
          <div v-if="phase === 'quiz'" :key="step" class="aw-funnel-question">
            <h3>{{ questions[step].q }}</h3>
            <p v-if="questions[step].hint" class="aw-funnel-hint">{{ questions[step].hint }}</p>
            <div class="aw-funnel-options">
              <button
                v-for="(o, oi) in questions[step].options"
                :key="oi"
                class="aw-funnel-option"
                :class="{ selected: answers[step] === oi }"
                @click="choose(oi)"
              >
                <span class="aw-funnel-option-icon" aria-hidden="true">{{ o.icon }}</span>
                <span class="aw-funnel-option-text">{{ o.label }}</span>
                <span class="aw-funnel-option-check" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>
                </span>
              </button>
            </div>
            <button v-if="step > 0" class="aw-funnel-back" @click="back">← Zurück</button>
          </div>

          <!-- Auswertung läuft -->
          <div v-else-if="phase === 'loading'" key="loading" class="aw-funnel-loading">
            <div class="aw-funnel-spinner" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
            <h3>Deine Angaben werden ausgewertet …</h3>
            <p>{{ loadingText }}</p>
          </div>

          <!-- Ergebnis -->
          <div v-else key="result" class="aw-funnel-result">
            <span class="aw-funnel-result-badge">✓ Analyse vorbereitet</span>
            <h3>{{ resultHeadline }}</h3>
            <p class="aw-funnel-result-text">{{ resultText }}</p>

            <div class="aw-funnel-summary">
              <div v-for="(q, i) in questions" :key="i" class="aw-funnel-summary-row">
                <span class="aw-funnel-summary-label">{{ q.short }}</span>
                <span class="aw-funnel-summary-value">{{ q.options[answers[i]]?.label ?? '—' }}</span>
              </div>
            </div>

            <a
              class="aw-funnel-cta"
              href="https://calendly.com/nadjabutka/analyse"
              target="_blank"
              rel="noopener"
            >
              <span class="aw-funnel-glare" aria-hidden="true"></span>
              Meinen Wunschtermin auswählen — kostenlos
            </a>
            <p class="aw-funnel-micro">Ca. 30 Minuten · Kein Verkaufsdruck · Absagen jederzeit möglich</p>
            <button class="aw-funnel-restart" @click="restart">Antworten ändern</button>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import { vReveal } from './useReveal';

const questions = [
  {
    q: 'Was ist dein wichtigstes Ziel?',
    short: 'Ziel',
    options: [
      { icon: '⚖️', label: 'Abnehmen & mich wieder wohlfühlen' },
      { icon: '💪', label: 'Muskeln aufbauen & definieren' },
      { icon: '⚡', label: 'Mehr Energie & Hormone in Balance' },
      { icon: '🎯', label: 'Alles zusammen — der ganze Weg' },
    ],
  },
  {
    q: 'Wie sieht dein Training heute aus?',
    short: 'Ausgangslage',
    options: [
      { icon: '🌱', label: 'Aktuell kaum bis gar kein Sport' },
      { icon: '🚶', label: 'Ab und zu, ohne festen Plan' },
      { icon: '🔁', label: 'Regelmäßig — aber ohne sichtbare Ergebnisse' },
      { icon: '🏋️', label: 'Sehr aktiv, ich will das Maximum herausholen' },
    ],
  },
  {
    q: 'Was hält dich bisher am meisten auf?',
    short: 'Größte Hürde',
    hint: 'Ehrliche Antwort — genau hier setzt das Coaching an.',
    options: [
      { icon: '⏰', label: 'Zu wenig Zeit im Alltag' },
      { icon: '🔥', label: 'Motivation & Dranbleiben' },
      { icon: '🍫', label: 'Ernährung & Heißhunger' },
      { icon: '🧬', label: 'Gesundheit & Hormone (z. B. Schilddrüse, Zyklus)' },
    ],
  },
  {
    q: 'Wie viel Zeit kannst du pro Woche investieren?',
    short: 'Zeitbudget',
    options: [
      { icon: '🕐', label: 'Weniger als 2 Stunden' },
      { icon: '🕑', label: '2 bis 3 Stunden' },
      { icon: '🕓', label: '4 bis 5 Stunden' },
      { icon: '🕗', label: 'Mehr als 5 Stunden' },
    ],
  },
  {
    q: 'Wann möchtest du starten?',
    short: 'Startzeitpunkt',
    options: [
      { icon: '🚀', label: 'So schnell wie möglich' },
      { icon: '📅', label: 'In den nächsten Wochen' },
      { icon: '🤔', label: 'Ich möchte mich erst in Ruhe informieren' },
    ],
  },
];

const phase = ref('quiz'); // quiz | loading | result
const step = ref(0);
const answers = ref(Array(questions.length).fill(null));
const loadingText = ref('Ziel, Ausgangslage und Zeitbudget werden abgeglichen …');
let timers = [];

const choose = (oi) => {
  answers.value[step.value] = oi;
  timers.push(setTimeout(() => {
    if (step.value < questions.length - 1) {
      step.value++;
    } else {
      startLoading();
    }
  }, 350));
};

const back = () => { if (step.value > 0) step.value--; };

const startLoading = () => {
  phase.value = 'loading';
  timers.push(setTimeout(() => { loadingText.value = 'Passende Coaching-Schwerpunkte werden zusammengestellt …'; }, 900));
  timers.push(setTimeout(() => { phase.value = 'result'; }, 1900));
};

const restart = () => {
  phase.value = 'quiz';
  step.value = 0;
  loadingText.value = 'Ziel, Ausgangslage und Zeitbudget werden abgeglichen …';
};

const resultHeadline = computed(() => {
  switch (answers.value[0]) {
    case 0: return 'Dein Fokus: nachhaltig abnehmen — ohne Verzicht.';
    case 1: return 'Dein Fokus: Muskelaufbau mit klarem Plan.';
    case 2: return 'Dein Fokus: Energie zurückholen, Hormone verstehen.';
    default: return 'Dein Fokus: die komplette Transformation.';
  }
});

const resultText = computed(() => {
  const hurdle = answers.value[2];
  const hurdleText = [
    'Mit einem Programm, das mit wenig Zeit auskommt und trotzdem wirkt.',
    'Mit persönlicher 1:1-Betreuung, die dich dranbleiben lässt.',
    'Mit einer Ernährungsstrategie ohne Verbote — Genuss bleibt erlaubt.',
    'Mit Blick auf Blutwerte und Hormone, statt nur auf die Waage.',
  ][hurdle] ?? 'Mit einem Plan, der zu deinem Alltag passt.';
  return `Deine Antworten zeigen klar, wo wir ansetzen: ${hurdleText} Im kostenlosen Analyse-Gespräch schauen wir gemeinsam auf deine Situation — ehrlich und ohne Versprechen, die niemand halten kann.`;
});

onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<style scoped>
.aw-funnel {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-funnel-stage {
  position: relative; overflow: hidden;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(142,245,210,0.28);
  border-radius: 36px;
  padding: 3.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 0 90px rgba(142,245,210,0.06);
}
.aw-funnel-ambient {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 15% 0%, rgba(79,70,229,0.15), transparent 50%),
    radial-gradient(ellipse at 85% 100%, rgba(142,245,210,0.08), transparent 50%);
}
.aw-funnel-head { position: relative; text-align: center; max-width: 720px; margin: 0 auto 2.6rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-funnel-head h2 { color: #F8FAFC; font-size: 2.3rem; font-weight: 800; margin: 0 0 0.9rem; line-height: 1.25; }
.aw-funnel-head p { color: #D9CFE8; font-size: 1.05rem; margin: 0; }
.aw-funnel-reassure {
  margin-top: 1.6rem;
  padding: 1.2rem 1.5rem;
  border-radius: 16px;
  background: rgba(142,245,210,0.06);
  border: 1px solid rgba(142,245,210,0.3);
  color: #D9CFE8;
  font-size: 0.95rem;
  line-height: 1.65;
  text-align: left;
}
.aw-funnel-reassure strong { display: block; color: #8EF5D2; margin-bottom: 0.3rem; }

.aw-funnel-box { position: relative; max-width: 680px; margin: 0 auto; }

.aw-funnel-progress { margin-bottom: 1.8rem; }
.aw-funnel-progress-meta {
  display: flex; justify-content: space-between;
  color: #D9CFE8; font-size: 0.8rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  margin-bottom: 0.6rem;
}
.aw-funnel-bar {
  height: 8px; border-radius: 6px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
}
.aw-funnel-bar-fill {
  height: 100%; border-radius: 6px;
  background: linear-gradient(90deg, #4F46E5, #8EF5D2);
  box-shadow: 0 0 18px rgba(142,245,210,0.6);
  transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.aw-funnel-question h3 { color: #F8FAFC; font-size: 1.55rem; font-weight: 800; margin: 0 0 0.5rem; text-align: center; }
.aw-funnel-hint { color: rgba(217,207,232,0.7); text-align: center; font-size: 0.9rem; margin: 0 0 1rem; }
.aw-funnel-options { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 1.4rem; }
.aw-funnel-option {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.05rem 1.3rem; border-radius: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  color: #F8FAFC; font-family: inherit; font-size: 1.02rem; font-weight: 600;
  cursor: pointer; text-align: left;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-funnel-option:hover {
  border-color: rgba(142,245,210,0.5);
  background: rgba(142,245,210,0.06);
  transform: translateX(6px);
}
.aw-funnel-option.selected {
  border-color: rgba(142,245,210,0.9);
  background: rgba(142,245,210,0.1);
  box-shadow: 0 0 28px rgba(142,245,210,0.25), inset 0 0 25px rgba(142,245,210,0.08);
}
.aw-funnel-option-icon { font-size: 1.4rem; flex-shrink: 0; }
.aw-funnel-option-text { flex: 1; }
.aw-funnel-option-check {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid rgba(255,255,255,0.25); color: transparent;
  transition: all 0.3s ease;
}
.aw-funnel-option.selected .aw-funnel-option-check {
  background: #8EF5D2; border-color: #8EF5D2; color: #052018;
  box-shadow: 0 0 15px rgba(142,245,210,0.7);
}
.aw-funnel-back {
  margin-top: 1.4rem;
  background: none; border: none; color: rgba(217,207,232,0.7);
  font-family: inherit; font-size: 0.92rem; font-weight: 600; cursor: pointer;
  transition: color 0.3s ease;
}
.aw-funnel-back:hover { color: #8EF5D2; }

/* Loading */
.aw-funnel-loading { text-align: center; padding: 2.5rem 0; }
.aw-funnel-spinner { display: flex; justify-content: center; gap: 0.6rem; margin-bottom: 1.6rem; }
.aw-funnel-spinner span {
  width: 14px; height: 14px; border-radius: 50%;
  background: #8EF5D2; box-shadow: 0 0 16px rgba(142,245,210,0.7);
  animation: awDots 1.2s ease-in-out infinite;
}
.aw-funnel-spinner span:nth-child(2) { animation-delay: 0.15s; }
.aw-funnel-spinner span:nth-child(3) { animation-delay: 0.3s; }
@keyframes awDots { 0%, 100% { transform: translateY(0); opacity: 0.5; } 50% { transform: translateY(-12px); opacity: 1; } }
.aw-funnel-loading h3 { color: #F8FAFC; font-size: 1.4rem; font-weight: 800; margin: 0 0 0.5rem; }
.aw-funnel-loading p { color: #D9CFE8; margin: 0; }

/* Result */
.aw-funnel-result { text-align: center; }
.aw-funnel-result-badge {
  display: inline-block;
  padding: 7px 18px; border-radius: 20px;
  background: rgba(142,245,210,0.12); border: 1px solid rgba(142,245,210,0.5);
  color: #8EF5D2; font-size: 0.8rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
  text-shadow: 0 0 12px rgba(142,245,210,0.5);
  margin-bottom: 1.2rem;
}
.aw-funnel-result h3 { color: #F8FAFC; font-size: 1.7rem; font-weight: 800; margin: 0 0 0.9rem; line-height: 1.3; }
.aw-funnel-result-text { color: #D9CFE8; font-size: 1.02rem; line-height: 1.65; margin: 0 0 1.8rem; }

.aw-funnel-summary {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 1.3rem 1.5rem;
  margin-bottom: 1.8rem;
  text-align: left;
}
.aw-funnel-summary-row {
  display: flex; justify-content: space-between; align-items: baseline; gap: 1rem;
  padding: 0.55rem 0;
}
.aw-funnel-summary-row + .aw-funnel-summary-row { border-top: 1px solid rgba(255,255,255,0.07); }
.aw-funnel-summary-label {
  color: rgba(217,207,232,0.7); font-size: 0.75rem; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase; flex-shrink: 0;
}
.aw-funnel-summary-value { color: #8EF5D2; font-size: 0.92rem; font-weight: 700; text-align: right; }

.aw-funnel-cta {
  position: relative; overflow: hidden;
  display: block; width: 100%;
  padding: 1.25rem; border-radius: 18px;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 1.18rem; text-decoration: none;
  box-shadow: 0 18px 40px rgba(142,245,210,0.35), inset 0 2px 0 rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.aw-funnel-cta:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 24px 52px rgba(142,245,210,0.5), inset 0 2px 0 rgba(255,255,255,0.5); }
.aw-funnel-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  transform: skewX(-20deg); animation: awFunnelGlare 4s infinite;
}
@keyframes awFunnelGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }
.aw-funnel-micro { color: rgba(217,207,232,0.65); font-size: 0.85rem; margin: 0.9rem 0 0; }
.aw-funnel-restart {
  margin-top: 1.1rem;
  background: none; border: none; color: rgba(217,207,232,0.6);
  font-family: inherit; font-size: 0.88rem; cursor: pointer;
  text-decoration: underline; text-underline-offset: 3px;
  transition: color 0.3s ease;
}
.aw-funnel-restart:hover { color: #8EF5D2; }

/* Step-Übergänge */
.aw-step-enter-active, .aw-step-leave-active { transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-step-enter-from { opacity: 0; transform: translateX(40px); }
.aw-step-leave-to { opacity: 0; transform: translateX(-40px); }

@media (max-width: 640px) {
  .aw-funnel-stage { padding: 2.2rem 1.4rem; border-radius: 26px; }
  .aw-funnel-head h2 { font-size: 1.7rem; }
  .aw-funnel-question h3 { font-size: 1.25rem; }
}
</style>
