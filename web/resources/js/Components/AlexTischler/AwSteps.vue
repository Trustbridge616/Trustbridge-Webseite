<template>
  <section id="ablauf" class="aw-steps">
    <div class="aw-steps-head" v-reveal>
      <span class="aw-sec-tag">DER ABLAUF</span>
      <h2>Zum Wohlfühlkörper in 3 Schritten</h2>
      <p>Kein Kleingedrucktes, keine Verpflichtung — du entscheidest nach dem Gespräch in Ruhe, ob es passt.</p>
    </div>

    <div class="aw-steps-track">
      <div class="aw-steps-line" aria-hidden="true"></div>
      <div v-for="(s, i) in steps" :key="i" class="aw-step" v-reveal="{ delay: i * 150 }">
        <div class="aw-step-circle">
          <span>{{ i + 1 }}</span>
          <span class="aw-step-circle-ring" aria-hidden="true"></span>
        </div>
        <div class="aw-step-card">
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </div>
      </div>
    </div>

    <div class="aw-steps-cta" v-reveal>
      <p class="aw-steps-bridge">
        Mehr ist es nicht: kein Vertrag, kein Kleingedrucktes, keine Verpflichtung.
        <strong>Schritt 1 dauert 2 Minuten — und du kannst ihn jetzt sofort gehen.</strong>
      </p>
      <button @click="scrollTo('analyse')">Schritt 1 jetzt gehen — dauert 2 Minuten</button>
      <p class="aw-steps-micro">Kostenlos · Du entscheidest erst nach dem Gespräch</p>
    </div>
  </section>
</template>

<script setup>
import { vReveal } from './useReveal';

const steps = [
  {
    title: 'Deine kostenlose Buchung',
    text: 'Wähle online einen Termin, der dir passt. Dauert 2 Minuten, kostet nichts und verpflichtet dich zu nichts.',
  },
  {
    title: 'Das Gespräch — tief, ehrlich & individuell',
    text: 'Wir schauen gemeinsam auf deine Situation: Hormone, Energie, Essverhalten, Alltag. Du bekommst Klarheit, wo du stehst und was realistisch ist.',
  },
  {
    title: 'Deine Entscheidung — next Level oder nicht',
    text: 'Passt die Energie zwischen uns? Fühlst du dich gesehen? Dann starten wir. Wenn nicht, nimmst du die Erkenntnisse trotzdem mit.',
  },
];

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
.aw-steps {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-steps-head { text-align: center; max-width: 700px; margin: 0 auto 3.5rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-steps-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.aw-steps-head p { color: #D9CFE8; font-size: 1.08rem; margin: 0; }

.aw-steps-track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.aw-steps-line {
  position: absolute; top: 36px; left: 15%; right: 15%; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(142,245,210,0.5), rgba(142,245,210,0.5), transparent);
  box-shadow: 0 0 15px rgba(142,245,210,0.3);
}
.aw-step { position: relative; text-align: center; }
.aw-step-circle {
  position: relative;
  width: 72px; height: 72px; margin: 0 auto 1.4rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(142,245,210,0.22), rgba(15,23,42,0.6));
  border: 1px solid rgba(142,245,210,0.6);
  box-shadow: 0 0 32px rgba(142,245,210,0.3), inset 0 0 22px rgba(142,245,210,0.12);
}
.aw-step-circle > span:first-child {
  font-size: 1.7rem; font-weight: 800; color: #8EF5D2;
  text-shadow: 0 0 18px rgba(142,245,210,0.7);
}
.aw-step-circle-ring {
  position: absolute; inset: -8px; border-radius: 50%;
  border: 1px solid rgba(142,245,210,0.25);
  animation: awStepRing 3.5s ease-in-out infinite;
}
@keyframes awStepRing {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.12); opacity: 0.35; }
}
.aw-step-card {
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 20px;
  padding: 1.8rem 1.6rem;
  min-height: 190px;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-step-card:hover {
  transform: translateY(-6px);
  border-color: rgba(142,245,210,0.5);
  box-shadow: 0 24px 55px rgba(0,0,0,0.55), 0 0 35px rgba(142,245,210,0.14);
}
.aw-step-card h3 { color: #F8FAFC; font-size: 1.18rem; font-weight: 800; margin: 0 0 0.7rem; }
.aw-step-card p { color: #D9CFE8; font-size: 0.95rem; line-height: 1.6; margin: 0; }

.aw-steps-cta { text-align: center; margin-top: 2.8rem; }
.aw-steps-cta button {
  padding: 1.1rem 2.6rem; border-radius: 16px; border: none;
  background: linear-gradient(135deg, #7C3AED, #4F46E5);
  color: #F8FAFC; font-weight: 800; font-size: 1.08rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 16px 38px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
.aw-steps-cta button:hover { transform: translateY(-3px); box-shadow: 0 22px 48px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.25); }
.aw-steps-bridge { color: #D9CFE8; font-size: 1.12rem; margin: 0 auto 1.6rem; max-width: 620px; line-height: 1.6; }
.aw-steps-bridge strong { color: #8EF5D2; text-shadow: 0 0 15px rgba(142,245,210,0.4); }
.aw-steps-micro { color: rgba(217,207,232,0.7); font-size: 0.85rem; margin: 0.8rem 0 0; }

@media (max-width: 900px) {
  .aw-steps-track { grid-template-columns: 1fr; gap: 1.6rem; }
  .aw-steps-line { display: none; }
  .aw-step-card { min-height: 0; }
  .aw-steps-head h2 { font-size: 1.9rem; }
}
</style>
