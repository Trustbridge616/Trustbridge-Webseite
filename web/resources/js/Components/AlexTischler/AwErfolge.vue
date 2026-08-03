<template>
  <section id="erfolge" class="aw-erfolge">
    <div class="aw-erfolge-head" v-reveal>
      <span class="aw-sec-tag">KUNDENERFOLGE</span>
      <h2>Echte Menschen. Echte Veränderung.</h2>
      <p>
        Das klingt gut auf dem Papier — aber funktioniert es im echten Leben, mit Kindern,
        Schichtdienst und Schilddrüse? <strong>Schau selbst: Diese Menschen hatten die
        gleichen Zweifel wie du gerade.</strong>
      </p>
    </div>

    <div class="aw-erfolge-grid">
      <article
        v-for="(s, i) in stories"
        :key="i"
        class="aw-story-card"
        v-reveal="{ delay: (i % 3) * 100 }"
      >
        <div class="aw-story-img">
          <AwImg
            :src="s.img"
            :alt="s.cta ? 'Kundentransformation' : 'Vorher-Nachher: ' + s.title"
            label="Vorher / Nachher"
            ratio="1 / 1"
          />
          <span class="aw-story-pill" :class="{ gold: s.cta }">{{ s.cta ? 'Dein Start' : 'Vorher / Nachher' }}</span>
        </div>
        <div class="aw-story-body">
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <div class="aw-story-tags">
            <span v-for="t in s.tags" :key="t">{{ t }}</span>
          </div>
          <button v-if="s.cta" class="aw-story-cta" @click="scrollTo('analyse')">
            Meinen Startpunkt herausfinden
          </button>
        </div>
      </article>
    </div>

    <p class="aw-erfolge-note" v-reveal>
      Individuelle Ergebnisse: Jeder Verlauf hängt von Ausgangslage, Gesundheit und
      eigener Mitarbeit ab — Ergebnisse lassen sich nicht garantieren.
    </p>

    <div class="aw-erfolge-bridge" v-reveal>
      <p>
        Hinter jeder dieser Geschichten steht kein Programm von der Stange, sondern
        ein Mensch, der zugehört hat. <strong>Zeit, dass du ihn kennenlernst.</strong>
      </p>
    </div>
  </section>
</template>

<script setup>
import AwImg from './AwImg.vue';
import { vReveal } from './useReveal';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const stories = [
  {
    img: '/assets/alextischler/erfolg-1.webp',
    title: '3 Monate. 58 Jahre jung. Und sowas von wow!',
    text: 'Straffer, definierter und voller Selbstvertrauen — obwohl ihr alle sagten: „In deinem Alter ist das halt normal."',
    tags: ['58 Jahre', '3 Monate'],
  },
  {
    img: '/assets/alextischler/erfolg-2.webp',
    title: '12 Kilo Fett verloren in 4 Monaten',
    text: 'Alleinerziehend mit Vollzeitjob. Nicht durch Verzicht, sondern weil sie gelernt hat, mit ihrem Körper zu arbeiten statt gegen ihn.',
    tags: ['Alleinerziehend', 'Vollzeitjob'],
  },
  {
    img: '/assets/alextischler/erfolg-3.webp',
    title: '3 kleine Kinder. 0 Ausreden. 10 Kilo weniger.',
    text: 'Mehr Energie, mehr Selbstvertrauen, mehr Lebensfreude — mitten im Familienalltag.',
    tags: ['3 Kinder', 'Familienalltag'],
  },
  {
    img: '/assets/alextischler/erfolg-4.webp',
    title: '12 kg Fettabbau trotz Hashimoto',
    text: 'Unternehmerin im Event-Catering, Start bei 88 kg. Mit angepasster Strategie statt Standard-Diät zum Ziel.',
    tags: ['Hashimoto', 'Unternehmerin', '4 Monate'],
  },
  {
    img: '/assets/alextischler/erfolg-5.webp',
    title: '10 Kilo Fett weg. Muskeln drauf.',
    text: 'Papa von zwei Kindern — wieder stark, klar im Kopf und voller Energie. Für sich, seine Frau und seine Kids.',
    tags: ['Papa', '2 Kinder'],
  },
  {
    img: '/assets/alextischler/erfolg-6.webp',
    title: '8 kg in 8 Wochen: von 83 auf 75 kg',
    text: 'Vollzeit berufstätig und trotzdem zum athletischen Körperbau — mit einem Plan, der in den Arbeitstag passt.',
    tags: ['Berufstätig', '8 Wochen'],
  },
  {
    img: '/assets/alextischler/erfolg-7.webp',
    title: '6 kg Fettabbau trotz Lipödem',
    text: 'Managerin mit Lipödem Stadium 2 — in 3 Monaten zu spürbar mehr Leichtigkeit und Kontrolle über den eigenen Körper.',
    tags: ['Lipödem', 'Managerin', '3 Monate'],
  },
  {
    img: '/assets/alextischler/erfolg-8.webp',
    title: 'Dein Platz in dieser Galerie?',
    text: 'Jede dieser Transformationen hat mit einem kostenlosen Analyse-Gespräch begonnen. Deine kann die nächste sein.',
    tags: ['Kostenlose Analyse'],
    cta: true,
  },
];
</script>

<style scoped>
.aw-erfolge {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-erfolge-head { text-align: center; max-width: 720px; margin: 0 auto 3rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-erfolge-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.aw-erfolge-head p { color: #D9CFE8; font-size: 1.08rem; line-height: 1.6; margin: 0; }

.aw-erfolge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.aw-story-card {
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 22px;
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-story-card:hover {
  transform: translateY(-8px);
  border-color: rgba(142,245,210,0.55);
  box-shadow: 0 30px 65px rgba(0,0,0,0.6), 0 0 40px rgba(142,245,210,0.16);
}
.aw-story-img { position: relative; }
.aw-story-pill {
  position: absolute; top: 0.9rem; left: 0.9rem; z-index: 2;
  padding: 5px 14px; border-radius: 20px;
  background: #7C3AED; color: #fff;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase;
  box-shadow: 0 0 16px rgba(124,58,237,0.6);
}
.aw-story-body { padding: 1.5rem 1.5rem 1.6rem; }
.aw-story-body h3 { color: #F8FAFC; font-size: 1.15rem; font-weight: 800; margin: 0 0 0.6rem; line-height: 1.35; }
.aw-story-body p { color: #D9CFE8; font-size: 0.92rem; line-height: 1.55; margin: 0 0 1rem; }
.aw-story-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.aw-story-tags span {
  padding: 4px 12px; border-radius: 16px;
  background: rgba(142,245,210,0.1);
  border: 1px solid rgba(142,245,210,0.35);
  color: #8EF5D2; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.5px;
}

.aw-story-pill.gold {
  background: linear-gradient(135deg, #F4D068, #D4AF37);
  color: #1a1205;
  box-shadow: 0 0 16px rgba(212,175,55,0.55);
}
.aw-story-cta {
  margin-top: 1rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 13px;
  border: none;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 0.95rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(142,245,210,0.3), inset 0 1px 0 rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.aw-story-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(142,245,210,0.45), inset 0 1px 0 rgba(255,255,255,0.5); }

.aw-erfolge-note {
  text-align: center;
  color: rgba(217,207,232,0.7);
  font-size: 0.85rem;
  max-width: 640px;
  margin: 2.4rem auto 0;
  line-height: 1.6;
}
.aw-erfolge-bridge {
  text-align: center;
  margin-top: 2.6rem;
}
.aw-erfolge-bridge p { color: #D9CFE8; font-size: 1.15rem; margin: 0; }
.aw-erfolge-bridge strong { color: #8EF5D2; text-shadow: 0 0 15px rgba(142,245,210,0.4); }

@media (max-width: 560px) {
  .aw-erfolge-head h2 { font-size: 1.9rem; }
}
</style>
