<template>
  <section id="coaching" class="aw-benefits">
    <div class="aw-benefits-stage">
      <div class="aw-benefits-ambient" aria-hidden="true"></div>

      <div class="aw-benefits-head" v-reveal>
        <span class="aw-sec-tag">WIE DAS COACHING HILFT</span>
        <h2>Wie das Coaching dein Leben verändert</h2>
        <p>
          Kein Diät-Sprint, sondern ein System aus Training, Ernährung und Regeneration,
          das sich deinem Alltag anpasst — und deshalb bleibt.
        </p>
      </div>

      <div class="aw-benefits-grid" v-reveal>
        <div
          v-for="(b, i) in benefits"
          :key="i"
          class="aw-benefit-card"
          :class="{ featured: b.featured }"
          v-reveal="{ delay: (i % 3) * 100 }"
        >
          <span class="aw-benefit-glow" aria-hidden="true"></span>
          <span class="aw-benefit-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span v-if="b.featured" class="aw-benefit-pill">Herzstück</span>
          <h3>{{ b.title }}</h3>
          <p>{{ b.text }}</p>
        </div>
      </div>

      <div class="aw-benefits-value" v-reveal>
        <h3>Keine Ausgabe. Eine Investition — mit Rendite, die du jeden Morgen spürst.</h3>
        <p>
          Ein Coaching kauft man nicht wie ein Abo, das man vergisst. Du investierst in
          etwas, das dir jeden Tag zurückzahlt: mehr Energie, besserer Schlaf, Werte, die
          verstanden statt ignoriert werden. Deshalb gibt es keinen Einheitspreis — dein
          Angebot richtet sich nach deinem Ziel und dem Betreuungsumfang, den du wirklich
          brauchst. Empfohlen sind mindestens 3 Monate, weil nachhaltige Veränderung Zeit
          braucht. Das sagen wir dir lieber vorher als hinterher.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vReveal } from './useReveal';

const benefits = [
  { title: 'Dein Alltag, dein Programm', text: 'Job, Familie, Schichtdienst — der Plan richtet sich nach deinem Leben, nicht umgekehrt. Schon 2 Stunden pro Woche reichen für den Einstieg.' },
  { title: 'Ohne Verzicht', text: 'Keine verbotenen Lebensmittel, keine Crash-Diäten. Du lernst, mit deinem Körper zu arbeiten statt gegen ihn — Genuss bleibt Teil des Plans.' },
  { title: 'Hormon- & Nährstoffoptimierung', text: 'Gezielte Blutwert-Analysen zeigen, wo dein Stoffwechsel wirklich steht. Daraus entsteht ein Vorgehen, das an den Ursachen ansetzt.', featured: true },
  { title: '1:1-Betreuung', text: 'Du bekommst keinen anonymen Kurs, sondern persönliche Betreuung: regelmäßige Check-ins, Feedback und Antworten innerhalb von 24 Stunden.' },
  { title: 'Ganzheitlich & nachhaltig', text: 'Körper, Geist und Seele gehören zusammen. Stressabbau und Mindset sind fester Bestandteil — damit Ergebnisse nicht nur kommen, sondern bleiben.' },
  { title: 'Schlaf optimieren', text: 'Regeneration ist der unterschätzte Hebel: Besserer Schlaf bedeutet mehr Energie, stabilere Hormone und leichteres Abnehmen.' },
];
</script>

<style scoped>
.aw-benefits {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-benefits-stage {
  position: relative;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(142,245,210,0.25);
  border-radius: 36px;
  padding: 3.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 0 90px rgba(142,245,210,0.06);
  overflow: hidden;
}
.aw-benefits-ambient {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at top center, rgba(142,245,210,0.07), transparent 55%);
}
.aw-benefits-head { position: relative; text-align: center; max-width: 700px; margin: 0 auto 3rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-benefits-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.aw-benefits-head p { color: #D9CFE8; font-size: 1.08rem; line-height: 1.6; margin: 0; }

.aw-benefits-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.4rem;
}
.aw-benefit-card {
  position: relative; overflow: hidden;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.14);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 22px;
  padding: 2rem 1.7rem 1.9rem;
  transition: all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-benefit-card:hover {
  transform: translateY(-8px);
  border-color: rgba(142,245,210,0.55);
  background: rgba(142,245,210,0.05);
  box-shadow: 0 28px 60px rgba(0,0,0,0.55), 0 0 40px rgba(142,245,210,0.18), inset 0 0 40px rgba(142,245,210,0.06);
}
.aw-benefit-glow {
  position: absolute; top: -60%; right: -20%; width: 70%; height: 130%;
  background: radial-gradient(ellipse, rgba(142,245,210,0.12) 0%, transparent 70%);
  opacity: 0; transition: opacity 0.45s ease; pointer-events: none;
}
.aw-benefit-card:hover .aw-benefit-glow { opacity: 1; }

.aw-benefit-num {
  display: inline-flex; align-items: center; justify-content: center;
  width: 46px; height: 46px; border-radius: 50%;
  font-size: 1.05rem; font-weight: 800; color: #8EF5D2;
  background: linear-gradient(135deg, rgba(142,245,210,0.18), transparent);
  border: 1px solid rgba(142,245,210,0.5);
  box-shadow: 0 0 22px rgba(142,245,210,0.25);
  text-shadow: 0 0 12px rgba(142,245,210,0.6);
  margin-bottom: 1.1rem;
}
.aw-benefit-pill {
  position: absolute; top: 1.4rem; right: 1.4rem;
  padding: 4px 13px; border-radius: 20px;
  background: #7C3AED; color: #fff;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  box-shadow: 0 0 16px rgba(124,58,237,0.55);
}
.aw-benefit-card h3 { color: #F8FAFC; font-size: 1.22rem; font-weight: 800; margin: 0 0 0.7rem; }
.aw-benefit-card p { color: #D9CFE8; font-size: 0.94rem; line-height: 1.6; margin: 0; }

.aw-benefit-card.featured {
  border-color: rgba(142,245,210,0.5);
  background: rgba(142,245,210,0.06);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 35px rgba(142,245,210,0.15), inset 0 0 50px rgba(142,245,210,0.05);
}
.aw-benefit-card.featured .aw-benefit-glow { opacity: 0.8; }

.aw-benefits-value {
  position: relative;
  margin-top: 1.8rem;
  padding: 1.8rem 2rem;
  border-radius: 20px;
  background: linear-gradient(120deg, rgba(124,58,237,0.12), rgba(15,23,42,0.5) 60%);
  border: 1px solid rgba(124,58,237,0.35);
  text-align: center;
}
.aw-benefits-value h3 {
  color: #F8FAFC; font-size: 1.25rem; font-weight: 800;
  margin: 0 0 0.7rem; line-height: 1.35;
}
.aw-benefits-value p {
  color: #D9CFE8; font-size: 0.98rem; line-height: 1.65;
  max-width: 780px; margin: 0 auto;
}

@media (max-width: 1024px) {
  .aw-benefits-stage { padding: 2.5rem 1.8rem; border-radius: 28px; }
  .aw-benefits-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .aw-benefits-grid { grid-template-columns: 1fr; }
  .aw-benefits-head h2 { font-size: 1.9rem; }
}
</style>
