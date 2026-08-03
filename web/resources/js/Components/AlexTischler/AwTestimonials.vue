<template>
  <section class="aw-testi">
    <!-- Dezenter Trust-Streifen -->
    <div class="aw-trust-strip" v-reveal>
      <a
        class="aw-trust-chip"
        href="https://de.trustpilot.com/review/alextischler.de"
        target="_blank"
        rel="noopener"
      >
        <span class="aw-testi-tp-stars" aria-hidden="true">
          <svg v-for="n in 5" :key="n" width="14" height="14" viewBox="0 0 24 24" fill="#F4D068"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>
        </span>
        <strong>4,8</strong> auf Trustpilot · 65 Bewertungen
      </a>
      <span class="aw-trust-sep" aria-hidden="true"></span>
      <a
        class="aw-trust-chip"
        href="https://www.instagram.com/alex.tischler_/"
        target="_blank"
        rel="noopener"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/>
        </svg>
        <strong>73.300 Follower</strong> auf Instagram · verifiziert
        <svg class="aw-trust-verified" width="14" height="14" viewBox="0 0 24 24" fill="#4F9CF9" aria-hidden="true">
          <path d="M12 1.5 14.8 4l3.7-.4 1 3.6 3.2 1.9-1.6 3.4 1.6 3.4-3.2 1.9-1 3.6-3.7-.4L12 22.5 9.2 20l-3.7.4-1-3.6-3.2-1.9 1.6-3.4-1.6-3.4 3.2-1.9 1-3.6 3.7.4L12 1.5Z"/>
          <path d="m8.5 12 2.3 2.3 4.7-4.6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </a>
    </div>

    <div class="aw-testi-head" v-reveal>
      <span class="aw-sec-tag">KUNDENSTIMMEN & ZAHLEN</span>
      <h2>Messbare Ergebnisse statt leerer Worte</h2>
    </div>

    <div class="aw-testi-stats">
      <div v-for="(s, i) in stats" :key="i" class="aw-testi-stat" :ref="el => statEls[i] = el" v-reveal="{ delay: i * 120 }">
        <span class="aw-testi-stat-num">{{ displays[i].value }}</span>
        <span class="aw-testi-stat-label">{{ s.label }}</span>
      </div>
    </div>

    <div class="aw-testi-grid">
      <blockquote class="aw-quote main" v-reveal>
        <span class="aw-quote-badge">Ergebnis nach den ersten Wochen · Einzelfall</span>
        <p>
          „Schon nach einer Woche war mein Mittagstief verschwunden. Nach kurzer Zeit:
          3 kg Fettabbau und 2 % weniger Körperfett. Sein Coaching war ein echter Gewinn!"
        </p>
        <footer>
          <span class="aw-quote-avatar has-initials" aria-hidden="true">MR</span>
          <div class="aw-quote-person">
            <strong>Melissa Roth</strong>
            <span>Mindset-Coach für Unternehmer</span>
          </div>
        </footer>
      </blockquote>

      <!-- PLATZHALTER: Vorname + Initial und Foto erst nach schriftlicher Kunden-Freigabe eintragen -->
      <blockquote class="aw-quote" v-reveal="{ delay: 120 }">
        <p>
          „Nicht durch Verzicht, sondern weil ich gelernt habe, richtig mit meinem
          Körper zu arbeiten — statt gegen ihn."
        </p>
        <footer>
          <span class="aw-quote-avatar" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-3.9 3.6-7 8-7s8 3.1 8 7"/></svg>
          </span>
          <div class="aw-quote-person">
            <strong>Kundin aus dem Coaching</strong>
            <span>Alleinerziehend, Vollzeitjob · 12 kg in 4 Monaten</span>
          </div>
        </footer>
      </blockquote>

      <blockquote class="aw-quote" v-reveal="{ delay: 240 }">
        <p>
          „Wieder stark, klar im Kopf und voller Energie — für mich, meine Frau
          und meine Kids."
        </p>
        <footer>
          <span class="aw-quote-avatar" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-3.9 3.6-7 8-7s8 3.1 8 7"/></svg>
          </span>
          <div class="aw-quote-person">
            <strong>Kunde aus dem Coaching</strong>
            <span>Vater von 2 Kindern · 10 kg Fett abgebaut</span>
          </div>
        </footer>
      </blockquote>
    </div>

    <p class="aw-testi-note" v-reveal>
      Einzelergebnisse betreuter Kunden. Namen anonymer Kunden werden zum Schutz ihrer
      Privatsphäre nicht genannt; die Ergebnisse liegen dem Coach dokumentiert vor.
      Dein Verlauf hängt von Ausgangslage, Gesundheit und Mitarbeit ab — Ergebnisse
      lassen sich nicht garantieren.
    </p>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { vReveal } from './useReveal';
import { useCountUp } from './useCountUp';

const stats = [
  { target: 415, suffix: ' kg', label: 'Gemeinsam verlorene Kilos aller Kunden' },
  { target: 102, suffix: '', label: 'Zufriedene Kunden betreut' },
  { target: 24, suffix: ' h', label: 'Maximale Antwortzeit auf deine Fragen' },
];

const statEls = ref([]);
const displays = stats.map((s, i) =>
  useCountUp({ get value() { return statEls.value[i]; } }, s.target, { suffix: s.suffix })
);
</script>

<style scoped>
.aw-testi {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-testi-head { text-align: center; margin-bottom: 2.8rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-testi-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0; line-height: 1.2; }

.aw-testi-stats {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.3rem;
  margin-bottom: 2.5rem;
}
.aw-testi-stat {
  text-align: center;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(142,245,210,0.35);
  border-radius: 22px;
  padding: 2rem 1.4rem;
  box-shadow: inset 0 0 40px rgba(142,245,210,0.05);
  transition: all 0.4s ease;
}
.aw-testi-stat:hover {
  transform: translateY(-5px);
  border-color: rgba(142,245,210,0.6);
  box-shadow: 0 22px 50px rgba(0,0,0,0.5), 0 0 40px rgba(142,245,210,0.15), inset 0 0 40px rgba(142,245,210,0.07);
}
.aw-testi-stat-num {
  display: block;
  font-size: 3rem; font-weight: 800; color: #8EF5D2;
  text-shadow: 0 0 28px rgba(142,245,210,0.5);
  line-height: 1.1;
}
.aw-testi-stat-label {
  display: block; margin-top: 0.6rem;
  color: #D9CFE8; font-size: 0.86rem; font-weight: 600; line-height: 1.4;
}

.aw-testi-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 1.3rem;
}
.aw-quote {
  margin: 0;
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 22px;
  padding: 1.9rem;
  display: flex; flex-direction: column; gap: 1rem;
  transition: all 0.4s ease;
}
.aw-quote:hover {
  transform: translateY(-5px);
  border-color: rgba(124,58,237,0.5);
  box-shadow: 0 22px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.14);
}
.aw-quote.main {
  background: rgba(30, 20, 50, 0.75);
  border-color: rgba(244,208,104,0.4);
  box-shadow: inset 0 0 45px rgba(212,175,55,0.05);
}
.aw-quote-badge {
  align-self: flex-start;
  padding: 4px 12px; border-radius: 16px;
  background: rgba(244,208,104,0.1);
  border: 1px solid rgba(244,208,104,0.35);
  color: #F4D068; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.5px;
}
.aw-testi-tp {
  display: inline-flex; align-items: center; gap: 0.55rem; flex-wrap: wrap; justify-content: center;
  margin-top: 1.1rem;
  color: #D9CFE8; font-size: 0.92rem; text-decoration: none;
  padding: 0.45rem 0.9rem; border-radius: 12px;
  transition: all 0.3s ease;
}
.aw-testi-tp strong { color: #F8FAFC; }
.aw-testi-tp:hover { background: rgba(244,208,104,0.08); }
.aw-testi-tp:hover strong { color: #F4D068; }
.aw-testi-tp-stars { display: inline-flex; gap: 2px; filter: drop-shadow(0 0 10px rgba(244,208,104,0.5)); }
.aw-quote p { color: #F8FAFC; font-size: 1.02rem; line-height: 1.65; margin: 0; flex: 1; }
.aw-quote footer { display: flex; align-items: center; gap: 0.8rem; }
.aw-quote-person { display: flex; flex-direction: column; gap: 0.15rem; }
.aw-quote-person strong { color: #8EF5D2; font-size: 0.95rem; }
.aw-quote-person span { color: rgba(217,207,232,0.7); font-size: 0.8rem; }
.aw-quote-avatar {
  width: 42px; height: 42px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(142,245,210,0.2));
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(248,250,252,0.85);
  font-size: 0.85rem; font-weight: 800; letter-spacing: 0.5px;
}
.aw-quote-avatar.has-initials {
  background: linear-gradient(135deg, rgba(244,208,104,0.3), rgba(124,58,237,0.25));
  color: #F8FAFC;
}

.aw-trust-strip {
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
  gap: 0.8rem 1.2rem;
  margin-bottom: 2.2rem;
  padding: 0.9rem 1.4rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
}
.aw-trust-chip {
  display: inline-flex; align-items: center; gap: 0.5rem;
  color: #D9CFE8; font-size: 0.9rem; text-decoration: none;
  padding: 0.3rem 0.6rem; border-radius: 10px;
  transition: all 0.3s ease;
}
.aw-trust-chip strong { color: #F8FAFC; }
.aw-trust-chip:hover { background: rgba(142,245,210,0.07); }
.aw-trust-chip:hover strong { color: #8EF5D2; }
.aw-trust-sep { width: 5px; height: 5px; border-radius: 50%; background: rgba(217,207,232,0.4); }

.aw-testi-note {
  text-align: center;
  color: rgba(217,207,232,0.6);
  font-size: 0.85rem;
  margin: 2.2rem auto 0;
  max-width: 620px;
}

@media (max-width: 980px) {
  .aw-testi-grid { grid-template-columns: 1fr; }
  .aw-testi-stats { grid-template-columns: 1fr; }
  .aw-testi-head h2 { font-size: 1.9rem; }
}
</style>
