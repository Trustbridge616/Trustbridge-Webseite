<template>
  <section class="aw-pain">
    <div class="aw-pain-head" v-reveal>
      <span class="aw-sec-tag">GANZ EHRLICH</span>
      <h2>Kommen dir diese Anzeichen bekannt vor?</h2>
      <p>Wenn du bei zwei oder mehr Punkten nickst, ist das kein Charakterfehler — es fehlt nur ein System, das zu deinem Körper passt.</p>
    </div>

    <div class="aw-pain-grid">
      <div v-for="(p, i) in pains" :key="i" class="aw-pain-card" v-reveal="{ delay: i * 90 }">
        <span class="aw-pain-icon" aria-hidden="true">{{ p.icon }}</span>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
        <span class="aw-pain-edge" aria-hidden="true"></span>
      </div>
    </div>

    <div class="aw-pain-bridge" v-reveal>
      <p>
        Wenn du dich hier wiedererkennst: Das liegt nicht an dir. Diäten scheitern, weil sie
        deinen Alltag, deine Hormone und deinen Kopf ignorieren.
        <strong>Genau da drehen wir es um — bei den Ursachen, nicht bei den Symptomen.</strong>
      </p>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2.2">
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { vReveal } from './useReveal';

const pains = [
  { icon: '🪞', title: 'Du fühlst dich unwohl', text: 'Du weichst Spiegeln und Fotos aus und ziehst dich an, um zu verstecken statt zu zeigen.' },
  { icon: '🏃‍♀️', title: 'Du machst schon viel Sport', text: 'Trotz Training tut sich auf der Waage und im Spiegel kaum etwas — die Richtung stimmt nicht.' },
  { icon: '🔋', title: 'Du bist müde und ausgelaugt', text: 'Der Tag kostet mehr Energie, als er gibt. Abends bleibt nichts mehr für dich übrig.' },
  { icon: '🍽️', title: 'Deine Gedanken kreisen ums Essen', text: 'Diäten, Verbote, schlechtes Gewissen — Essen fühlt sich nach Kampf an statt nach Genuss.' },
  { icon: '🌪️', title: 'Deine Hormone spielen verrückt', text: 'Stimmung, Schlaf, Zyklus, Gewicht: Alles schwankt — und niemand schaut auf das Gesamtbild.' },
];
</script>

<style scoped>
.aw-pain {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-pain-head { text-align: center; max-width: 720px; margin: 0 auto 3.2rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #7C3AED; text-shadow: 0 0 20px rgba(124,58,237,0.7);
  margin-bottom: 1rem;
}
.aw-pain-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.aw-pain-head p { color: #D9CFE8; font-size: 1.1rem; line-height: 1.6; margin: 0; }

.aw-pain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1.3rem;
}
.aw-pain-card {
  position: relative; overflow: hidden;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 20px;
  padding: 1.8rem 1.5rem;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-pain-card:hover {
  transform: translateY(-6px);
  border-color: rgba(124,58,237,0.5);
  box-shadow: 0 22px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,58,237,0.15);
}
.aw-pain-icon { font-size: 2rem; display: block; margin-bottom: 0.9rem; filter: drop-shadow(0 0 14px rgba(124,58,237,0.4)); }
.aw-pain-card h3 { color: #F8FAFC; font-size: 1.12rem; font-weight: 800; margin: 0 0 0.6rem; }
.aw-pain-card p { color: #D9CFE8; font-size: 0.92rem; line-height: 1.55; margin: 0; }
.aw-pain-edge {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, rgba(124,58,237,0.7), transparent);
  opacity: 0; transition: opacity 0.4s ease;
}
.aw-pain-card:hover .aw-pain-edge { opacity: 1; }

.aw-pain-bridge {
  margin: 3rem auto 0; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 0.8rem;
}
.aw-pain-bridge p { color: #D9CFE8; font-size: 1.15rem; margin: 0; }
.aw-pain-bridge strong { color: #8EF5D2; text-shadow: 0 0 15px rgba(142,245,210,0.4); }
.aw-pain-bridge svg { animation: awBounce 2s ease-in-out infinite; filter: drop-shadow(0 0 10px rgba(142,245,210,0.5)); }
@keyframes awBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(7px); } }

@media (max-width: 560px) {
  .aw-pain-head h2 { font-size: 1.9rem; }
}
</style>
