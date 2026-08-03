<template>
  <section id="instagram" class="aw-ig">
    <div class="aw-ig-stage" v-reveal>
      <div class="aw-ig-glow" aria-hidden="true"></div>

      <div class="aw-ig-profile">
        <span class="aw-sec-tag">FOLGE DEM COACH</span>
        <h2>Täglich echte Impulse — kostenlos auf Instagram</h2>

        <div class="aw-ig-card">
          <div class="aw-ig-avatar">
            <AwImg src="/assets/alextischler/coach-geist.webp" alt="Alexander Tischler Profilbild" label="Profil" ratio="1 / 1" />
            <span class="aw-ig-avatar-ring" aria-hidden="true"></span>
          </div>
          <div class="aw-ig-meta">
            <strong>
              @alex.tischler_
              <svg class="aw-ig-verified" width="16" height="16" viewBox="0 0 24 24" fill="#4F9CF9" aria-label="Verifiziertes Profil">
                <path d="M12 1.5 14.8 4l3.7-.4 1 3.6 3.2 1.9-1.6 3.4 1.6 3.4-3.2 1.9-1 3.6-3.7-.4L12 22.5 9.2 20l-3.7.4-1-3.6-3.2-1.9 1.6-3.4-1.6-3.4 3.2-1.9 1-3.6 3.7.4L12 1.5Z"/>
                <path d="m8.5 12 2.3 2.3 4.7-4.6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              </svg>
            </strong>
            <span class="aw-ig-followers"><em>73.300</em> Follower</span>
            <span>Fitness Coach ✨ Körper &amp; Seele</span>
          </div>
        </div>

        <div class="aw-ig-bio-chips">
          <span>👑 Mr. Nürnberg 24/25</span>
          <span>🧬 Hormonbasiertes Coaching f. Frauen 35+</span>
          <span>🔥 Zeiteffizienter Fettabbau &amp; Muskelaufbau</span>
        </div>

        <p class="aw-ig-text">
          Hormonfreundlich abnehmen, mehr Energie im Alltag, Mindset ohne Floskeln:
          Auf Instagram teilt Alex mit über 73.000 Menschen das, was im Coaching
          wirklich funktioniert — zum direkten Umsetzen, noch bevor ihr euch kennt.
        </p>

        <a
          class="aw-ig-cta"
          href="https://www.instagram.com/alex.tischler_/"
          target="_blank"
          rel="noopener"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/>
            <circle cx="12" cy="12" r="4.2"/>
            <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/>
          </svg>
          Auf Instagram folgen
        </a>
        <p class="aw-ig-micro">Kostenlos · Kein Abo-Zwang · Entfolgen jederzeit</p>
      </div>

      <a
        class="aw-ig-grid"
        href="https://www.instagram.com/alex.tischler_/"
        target="_blank"
        rel="noopener"
        aria-label="Instagram-Profil von Alexander Tischler öffnen"
      >
        <div v-for="(t, i) in tiles" :key="i" class="aw-ig-tile" v-reveal="{ delay: i * 80 }">
          <AwImg :src="t.img" :alt="t.label" ratio="1 / 1" />
          <div class="aw-ig-tile-overlay">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/>
              <circle cx="12" cy="12" r="4.2"/>
              <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/>
            </svg>
            <span>{{ t.label }}</span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
import AwImg from './AwImg.vue';
import { vReveal } from './useReveal';

const tiles = [
  { img: '/assets/alextischler/coach-koerper.webp', label: 'Training im Alltag' },
  { img: '/assets/alextischler/erfolg-2.webp', label: 'Echte Transformationen' },
  { img: '/assets/alextischler/coach-boxen.webp', label: 'Kraftsport & Boxen' },
  { img: '/assets/alextischler/erfolg-4.webp', label: 'Hormonfreundlich abnehmen' },
  { img: '/assets/alextischler/coach-seele.webp', label: 'Körper & Seele' },
  { img: '/assets/alextischler/erfolg-6.webp', label: 'Energie & Mindset' },
];
</script>

<style scoped>
.aw-ig {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-ig-stage {
  position: relative; overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 36px;
  padding: 3.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 0 80px rgba(124,58,237,0.08);
}
.aw-ig-glow {
  position: absolute; top: -50%; left: -15%; width: 55%; height: 200%;
  background: radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%);
  pointer-events: none;
}
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-ig-profile { position: relative; }
.aw-ig-profile h2 { color: #F8FAFC; font-size: 2.2rem; font-weight: 800; margin: 0 0 1.5rem; line-height: 1.22; }

.aw-ig-card {
  display: inline-flex; align-items: center; gap: 1rem;
  padding: 0.9rem 1.5rem 0.9rem 0.9rem;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  margin-bottom: 1.3rem;
}
.aw-ig-avatar { position: relative; width: 62px; height: 62px; flex-shrink: 0; }
.aw-ig-avatar :deep(.aw-img) { border-radius: 50%; }
.aw-ig-avatar-ring {
  position: absolute; inset: -4px; border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #7C3AED, #8EF5D2) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  pointer-events: none;
}
.aw-ig-meta { display: flex; flex-direction: column; gap: 0.15rem; }
.aw-ig-meta strong { color: #F8FAFC; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 0.4rem; }
.aw-ig-meta span { color: #D9CFE8; font-size: 0.85rem; }
.aw-ig-verified { filter: drop-shadow(0 0 8px rgba(79,156,249,0.5)); }
.aw-ig-followers { color: #F8FAFC !important; font-size: 0.95rem !important; }
.aw-ig-followers em {
  font-style: normal; font-weight: 800; color: #8EF5D2;
  text-shadow: 0 0 14px rgba(142,245,210,0.45);
}
.aw-ig-bio-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.2rem; }
.aw-ig-bio-chips span {
  padding: 6px 14px; border-radius: 18px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.15);
  color: #D9CFE8; font-size: 0.8rem; font-weight: 600;
}

.aw-ig-text { color: #D9CFE8; font-size: 1.02rem; line-height: 1.65; margin: 0 0 1.7rem; }

.aw-ig-cta {
  display: inline-flex; align-items: center; gap: 0.7rem;
  padding: 1rem 2rem; border-radius: 15px;
  background: linear-gradient(135deg, #7C3AED, #4F46E5);
  color: #F8FAFC; font-weight: 800; font-size: 1.02rem; text-decoration: none;
  box-shadow: 0 14px 34px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
.aw-ig-cta:hover { transform: translateY(-3px); box-shadow: 0 20px 45px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.25); }
.aw-ig-micro { color: rgba(217,207,232,0.7); font-size: 0.82rem; margin: 0.8rem 0 0; }

.aw-ig-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  text-decoration: none;
}
.aw-ig-tile {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-ig-tile :deep(.aw-img) { border-radius: 16px; }
.aw-ig-tile-overlay {
  position: absolute; inset: 0; z-index: 2;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  background: rgba(15, 10, 30, 0.72);
  color: #F8FAFC;
  opacity: 0;
  transition: opacity 0.35s ease;
  padding: 0.6rem;
  text-align: center;
}
.aw-ig-tile-overlay span { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.5px; }
.aw-ig-tile-overlay svg { filter: drop-shadow(0 0 10px rgba(142,245,210,0.6)); color: #8EF5D2; }
.aw-ig-tile:hover { transform: scale(1.04); z-index: 3; }
.aw-ig-tile:hover .aw-ig-tile-overlay { opacity: 1; }

@media (max-width: 1024px) {
  .aw-ig-stage { grid-template-columns: 1fr; padding: 2.5rem 1.8rem; gap: 2.2rem; }
  .aw-ig-profile h2 { font-size: 1.8rem; }
}
</style>
