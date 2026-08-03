<template>
  <section id="coach" class="aw-coach">
    <div class="aw-coach-inner">
      <div class="aw-coach-visual" v-reveal>
        <div class="aw-coach-frame">
          <AwImg src="/assets/alextischler/coach-about.webp" alt="Alexander Tischler beim Training" label="Coach-Portrait" ratio="4 / 5" />
          <div class="aw-coach-frame-glow" aria-hidden="true"></div>
        </div>
        <div class="aw-coach-mini-grid">
          <div class="aw-coach-mini"><AwImg src="/assets/alextischler/coach-boxen.webp" alt="Alexander Tischler beim Boxtraining" label="Boxen" ratio="1 / 1" /></div>
          <div class="aw-coach-mini"><AwImg src="/assets/alextischler/coach-geist.webp" alt="Alexander Tischler Portrait" label="Portrait" ratio="1 / 1" /></div>
        </div>
      </div>

      <div class="aw-coach-copy" v-reveal="{ delay: 120 }">
        <span class="aw-sec-tag">DEIN FITNESS &amp; PERFORMANCE COACH</span>
        <h2>Ich bin Alexander Tischler</h2>
        <p>
          Ich weiß, wie es sich anfühlt, im eigenen Körper nicht zu Hause zu sein:
          Früher war ich selbst übergewichtig, oft krank und ständig müde. Der Weg
          heraus führte über Kraftsport und Boxen — und über das Verständnis, wie
          Training, Ernährung, Hormone und Schlaf wirklich zusammenspielen.
        </p>
        <p>
          Heute begleite ich Frauen und Paare auf genau diesem Weg: ehrlich,
          individuell und ohne leere Versprechen. Nicht ich mache die Arbeit für
          dich — aber ich sorge dafür, dass jede Stunde, die du investierst, zählt.
        </p>

        <div class="aw-coach-stats">
          <div v-for="(s, i) in stats" :key="i" class="aw-coach-stat" :ref="el => statEls[i] = el">
            <span class="aw-coach-stat-num">{{ displays[i].value }}</span>
            <span class="aw-coach-stat-label">{{ s.label }}</span>
          </div>
        </div>

        <div class="aw-coach-basis">
          <h3>Meine Grundlage</h3>
          <ul>
            <li>
              <strong>Eigene Transformation:</strong> Ich empfehle nichts, was ich nicht
              selbst durchlebt habe — vom kranken, übergewichtigen Alltag zu Kraftsport und Boxen.
            </li>
            <li>
              <strong>Erfahrung statt Lehrbuch:</strong> 14 Jahre Training, 10 Jahre Coaching,
              102 betreute Menschen mit vollem Alltag.
            </li>
            <li>
              <strong>Blutwert-basiertes Arbeiten:</strong> Blutabnahme und Laboranalyse laufen
              über Arzt bzw. Fachlabor — ich übersetze die Werte ausschließlich aus
              Coaching-Sicht in Training, Ernährung und Regeneration.
            </li>
            <!-- PLATZHALTER: Zertifikate/Lizenzen erst nach Beleg durch den Coach ergänzen
                 (exakte Bezeichnung, Institution, Jahr). Nicht pauschal "zertifiziert" schreiben. -->
          </ul>
          <p class="aw-coach-basis-note">
            Das Coaching ist keine medizinische Beratung: Diagnosen und Behandlung
            gehören in ärztliche Hände.
          </p>
        </div>

        <button class="aw-coach-cta" @click="scrollTo('analyse')">Erzähl mir von deiner Situation</button>
        <p class="aw-coach-micro">30 Minuten ehrliches Gespräch — kein Verkaufsskript</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import AwImg from './AwImg.vue';
import { vReveal } from './useReveal';
import { useCountUp } from './useCountUp';

const stats = [
  { target: 10, suffix: '', label: 'Jahre Coaching-Erfahrung' },
  { target: 14, suffix: '', label: 'Jahre Trainings-Erfahrung' },
  { target: 102, suffix: '', label: 'Betreute Kunden' },
];

const statEls = ref([]);
const displays = stats.map((s, i) =>
  useCountUp({ get value() { return statEls.value[i]; } }, s.target, { suffix: s.suffix })
);

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
.aw-coach {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-coach-inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 4rem;
  align-items: center;
}

.aw-coach-frame { position: relative; border-radius: 26px; }
.aw-coach-frame :deep(.aw-img) { border-radius: 26px; box-shadow: 0 35px 80px rgba(0,0,0,0.6); }
.aw-coach-frame-glow {
  position: absolute; inset: -14px; border-radius: 34px; z-index: -1;
  background: linear-gradient(140deg, rgba(124,58,237,0.4), transparent 40%, rgba(142,245,210,0.3));
  filter: blur(22px); opacity: 0.6;
}
.aw-coach-mini-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  margin-top: 1rem;
}
.aw-coach-mini { border-radius: 18px; }
.aw-coach-mini :deep(.aw-img) { border-radius: 18px; box-shadow: 0 18px 40px rgba(0,0,0,0.5); }

.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-coach-copy h2 { color: #F8FAFC; font-size: 2.6rem; font-weight: 800; margin: 0 0 1.3rem; line-height: 1.15; }
.aw-coach-copy p { color: #D9CFE8; font-size: 1.06rem; line-height: 1.7; margin: 0 0 1.2rem; }

.aw-coach-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem;
  margin: 2rem 0 2.2rem;
}
.aw-coach-stat {
  text-align: center;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 18px;
  padding: 1.4rem 1rem;
  transition: all 0.35s ease;
}
.aw-coach-stat:hover {
  border-color: rgba(142,245,210,0.5);
  box-shadow: 0 0 30px rgba(142,245,210,0.12);
  transform: translateY(-4px);
}
.aw-coach-stat-num {
  display: block;
  font-size: 2.4rem; font-weight: 800; color: #8EF5D2;
  text-shadow: 0 0 22px rgba(142,245,210,0.45);
  line-height: 1.1;
}
.aw-coach-stat-label {
  display: block; margin-top: 0.4rem;
  color: #D9CFE8; font-size: 0.8rem; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
}

.aw-coach-basis {
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(142,245,210,0.3);
  border-radius: 18px;
  padding: 1.6rem 1.8rem;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 40px rgba(142,245,210,0.04);
}
.aw-coach-basis h3 {
  color: #8EF5D2; font-size: 0.85rem; font-weight: 800;
  letter-spacing: 3px; text-transform: uppercase;
  margin: 0 0 1rem;
  text-shadow: 0 0 15px rgba(142,245,210,0.4);
}
.aw-coach-basis ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem; }
.aw-coach-basis li { color: #D9CFE8; font-size: 0.94rem; line-height: 1.6; padding-left: 1.3rem; position: relative; }
.aw-coach-basis li::before {
  content: ''; position: absolute; left: 0; top: 0.55em;
  width: 6px; height: 6px; border-radius: 50%;
  background: #8EF5D2; box-shadow: 0 0 8px rgba(142,245,210,0.7);
}
.aw-coach-basis li strong { color: #F8FAFC; }
.aw-coach-basis-note {
  margin: 1.1rem 0 0 !important;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  color: rgba(217,207,232,0.75) !important;
  font-size: 0.8rem !important;
  line-height: 1.55;
}

.aw-coach-cta {
  padding: 1.05rem 2.2rem; border-radius: 15px;
  border: 1px solid rgba(124,58,237,0.6);
  background: linear-gradient(135deg, #7C3AED, #4F46E5);
  color: #F8FAFC; font-weight: 800; font-size: 1.02rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 14px 34px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
.aw-coach-cta:hover { transform: translateY(-3px); box-shadow: 0 20px 45px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.25); }
.aw-coach-micro { color: rgba(217,207,232,0.7); font-size: 0.85rem; margin: 0.7rem 0 0 !important; }

@media (max-width: 1024px) {
  .aw-coach-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .aw-coach-copy h2 { font-size: 2.1rem; }
}
@media (max-width: 560px) {
  .aw-coach-stats { grid-template-columns: 1fr; }
  .aw-coach-cta { width: 100%; }
}
</style>
