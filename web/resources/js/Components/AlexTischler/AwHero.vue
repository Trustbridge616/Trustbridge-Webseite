<template>
  <section class="aw-hero" id="top">
    <div class="aw-hero-glow g1" aria-hidden="true"></div>
    <div class="aw-hero-glow g2" aria-hidden="true"></div>

    <div class="aw-hero-inner">
      <div class="aw-hero-copy" v-reveal>
        <span class="aw-hero-tag">1:1 FITNESS &amp; PERFORMANCE COACHING</span>
        <h1>Du hast kein Disziplin-Problem. Dir fehlt ein Plan, der deinen <em>Körper versteht</em>.</h1>
        <p class="aw-hero-sub">
          1:1-Coaching für Frauen und Paare mit vollem Alltag: Training, Ernährung und
          Blutwert-Check zeigen, was dich wirklich bremst — Hormone, Schlaf, Stress —
          statt dir die nächste Diät zu verordnen.
        </p>

        <div class="aw-hero-ctas">
          <button class="aw-hero-cta" @click="scrollTo('analyse')">
            <span class="aw-hero-glare" aria-hidden="true"></span>
            Meine kostenlose Analyse starten
          </button>
          <button class="aw-hero-cta-ghost" @click="scrollTo('ablauf')">Zeig mir den Ablauf</button>
        </div>
        <p class="aw-hero-micro">2 Minuten · 5 Fragen · Keine E-Mail nötig, kein Abo</p>

        <div class="aw-hero-trust">
          <a
            class="aw-hero-tp"
            href="https://de.trustpilot.com/review/alextischler.de"
            target="_blank"
            rel="noopener"
          >
            <span class="aw-hero-stars" aria-hidden="true">
              <svg v-for="n in 5" :key="n" width="17" height="17" viewBox="0 0 24 24" fill="#F4D068">
                <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z"/>
              </svg>
            </span>
            <strong>4,8 auf Trustpilot</strong> · 65 Bewertungen
          </a>
          <span class="aw-hero-trust-text"><strong>102 betreute Kunden</strong> · 10 Jahre Coaching-Erfahrung</span>
        </div>
      </div>

      <div class="aw-hero-visual" v-reveal="{ delay: 150 }">
        <div class="aw-hero-frame">
          <AwImg src="/assets/alextischler/coach-hero.webp" alt="Coach Alexander Tischler" label="Coach-Foto" ratio="4 / 5" eager />
          <div class="aw-hero-frame-ring" aria-hidden="true"></div>
          <div class="aw-hero-card float-1">
            <span class="aw-hero-card-icon" aria-hidden="true">💪</span>
            <div>
              <strong>2 Std. / Woche</strong>
              <span>reichen für den Einstieg</span>
            </div>
          </div>
          <div class="aw-hero-card float-2">
            <span class="aw-hero-card-icon" aria-hidden="true">🧬</span>
            <div>
              <strong>Hormon-Analyse</strong>
              <span>inklusive Blutwert-Check</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AwImg from './AwImg.vue';
import { vReveal } from './useReveal';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
.aw-hero {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 9.5rem 1.5rem 5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-hero-glow {
  position: absolute; border-radius: 50%; filter: blur(140px); pointer-events: none;
  animation: awHeroFloat 9s ease-in-out infinite;
}
.g1 { top: -15%; left: -8%; width: 560px; height: 560px; background: rgba(79,70,229,0.22); }
.g2 { bottom: -20%; right: -5%; width: 480px; height: 480px; background: rgba(142,245,210,0.1); animation-delay: -4.5s; }
@keyframes awHeroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.05); }
}

.aw-hero-inner {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  align-items: center;
}

.aw-hero-tag {
  display: inline-block;
  font-size: 0.78rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 22px rgba(142,245,210,0.6);
  margin-bottom: 1.4rem;
}
.aw-hero h1 {
  color: #F8FAFC;
  font-size: 3.3rem; font-weight: 800; line-height: 1.12;
  margin: 0 0 1.4rem;
  text-shadow: 0 0 50px rgba(124,58,237,0.3);
}
.aw-hero h1 em {
  font-style: normal;
  background: linear-gradient(120deg, #8EF5D2, #5CE1C6);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  text-shadow: none;
  filter: drop-shadow(0 0 25px rgba(142,245,210,0.35));
}
.aw-hero-sub {
  color: #D9CFE8; font-size: 1.18rem; line-height: 1.65;
  margin: 0 0 2.2rem; max-width: 560px;
}

.aw-hero-ctas { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.aw-hero-cta {
  position: relative; overflow: hidden;
  padding: 1.15rem 2.4rem; border-radius: 16px; border: none;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 1.12rem; font-family: inherit;
  cursor: pointer; letter-spacing: 0.5px;
  box-shadow: 0 16px 38px rgba(142,245,210,0.35), inset 0 2px 0 rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.aw-hero-cta:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 22px 48px rgba(142,245,210,0.5), inset 0 2px 0 rgba(255,255,255,0.5); }
.aw-hero-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  transform: skewX(-20deg); animation: awHeroGlare 4s infinite;
}
@keyframes awHeroGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }

.aw-hero-cta-ghost {
  padding: 1.15rem 2rem; border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  color: #F8FAFC; font-weight: 700; font-size: 1.05rem; font-family: inherit;
  cursor: pointer; transition: all 0.3s ease;
}
.aw-hero-cta-ghost:hover { border-color: rgba(142,245,210,0.5); color: #8EF5D2; background: rgba(142,245,210,0.06); }

.aw-hero-micro { color: rgba(217,207,232,0.65); font-size: 0.85rem; margin: 0.9rem 0 0; }

.aw-hero-trust {
  display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;
  margin-top: 2rem; padding-top: 1.6rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.aw-hero-stars { display: flex; gap: 2px; filter: drop-shadow(0 0 10px rgba(244,208,104,0.5)); }
.aw-hero-tp {
  display: inline-flex; align-items: center; gap: 0.55rem;
  color: #D9CFE8; font-size: 0.9rem; text-decoration: none;
  padding: 0.35rem 0.7rem; margin-left: -0.7rem; border-radius: 10px;
  transition: all 0.3s ease;
}
.aw-hero-tp strong { color: #F8FAFC; }
.aw-hero-tp:hover { background: rgba(244,208,104,0.08); }
.aw-hero-tp:hover strong { color: #F4D068; }
.aw-hero-trust-text { color: #D9CFE8; font-size: 0.9rem; }
.aw-hero-trust-text strong { color: #F8FAFC; }

/* Visual */
.aw-hero-frame {
  position: relative;
  border-radius: 28px;
  max-width: 430px;
  margin-left: auto;
}
.aw-hero-frame :deep(.aw-img) { border-radius: 28px; box-shadow: 0 40px 90px rgba(0,0,0,0.65); }
.aw-hero-frame-ring {
  position: absolute; inset: -10px; border-radius: 36px;
  border: 1px solid rgba(142,245,210,0.3);
  box-shadow: 0 0 45px rgba(142,245,210,0.15), inset 0 0 45px rgba(142,245,210,0.05);
  pointer-events: none;
  animation: awRingPulse 5s ease-in-out infinite;
}
@keyframes awRingPulse {
  0%, 100% { box-shadow: 0 0 45px rgba(142,245,210,0.15), inset 0 0 45px rgba(142,245,210,0.05); }
  50% { box-shadow: 0 0 70px rgba(142,245,210,0.3), inset 0 0 45px rgba(142,245,210,0.08); }
}

.aw-hero-card {
  position: absolute;
  display: flex; align-items: center; gap: 0.8rem;
  padding: 0.9rem 1.2rem; border-radius: 16px;
  background: rgba(30, 20, 50, 0.85);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 20px 45px rgba(0,0,0,0.55);
  animation: awCardFloat 6s ease-in-out infinite;
}
.aw-hero-card strong { display: block; color: #F8FAFC; font-size: 0.95rem; }
.aw-hero-card span:not(.aw-hero-card-icon) { color: #D9CFE8; font-size: 0.78rem; }
.aw-hero-card-icon { font-size: 1.5rem; filter: drop-shadow(0 0 12px rgba(142,245,210,0.5)); }
.float-1 { top: 8%; left: -18%; animation-delay: -1s; }
.float-2 { bottom: 10%; right: -8%; animation-delay: -3.5s; }
@keyframes awCardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

@media (max-width: 1080px) {
  .aw-hero-inner { grid-template-columns: 1fr; gap: 3rem; }
  .aw-hero h1 { font-size: 2.6rem; }
  .aw-hero-frame { margin: 0 auto; }
  .float-1 { left: -4%; }
  .float-2 { right: -4%; }
}
@media (max-width: 560px) {
  .aw-hero { padding-top: 7.5rem; }
  .aw-hero h1 { font-size: 2.05rem; }
  .aw-hero-sub { font-size: 1.05rem; }
  .aw-hero-cta, .aw-hero-cta-ghost { width: 100%; text-align: center; }
  .aw-hero-card { padding: 0.7rem 0.9rem; }
  .float-1 { top: 4%; left: 2%; }
  .float-2 { bottom: 4%; right: 2%; }
}
</style>
