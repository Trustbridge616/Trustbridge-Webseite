<template>
  <AppLayout>
    <SeoHead
      title="Trustbridge – Dein Portal"
      description="Trustbridge – Dein Zugang zu Coaching und weiteren Bereichen."
      keywords="Trustbridge, Portal, Coaching"
      canonical="https://trustbridge.de/"
      :jsonLd="homeLd"
    />
    <div class="welcome-page">
      <!-- Preview Merkaba entfernt, jetzt im Hero-Hintergrund -->

    <div class="hero-section animate-fade-in" id="hero">
      <!-- ===== 3D STAGE SCENE ===== -->
      
      <!-- Echte 3D SVG Merkaba (Dezent im Hintergrund) -->
      <div class="merkaba-3d-container">
        <Merkaba3D :speed="0.003" :lineWidth="1.2" tetraAColor="#ffffff" tetraBColor="#D4AF37" />
      </div>
      <!-- Floating particle stars -->
      <div class="particles">
        <span class="particle" style="--x:10%;--y:20%;--d:3s;--s:0.5"></span>
        <span class="particle" style="--x:25%;--y:60%;--d:4s;--s:0.8"></span>
        <span class="particle" style="--x:40%;--y:10%;--d:2.5s;--s:0.4"></span>
        <span class="particle" style="--x:55%;--y:75%;--d:5s;--s:0.6"></span>
        <span class="particle" style="--x:70%;--y:30%;--d:3.5s;--s:0.9"></span>
        <span class="particle" style="--x:85%;--y:55%;--d:2s;--s:0.5"></span>
        <span class="particle" style="--x:15%;--y:80%;--d:6s;--s:0.7"></span>
        <span class="particle" style="--x:90%;--y:15%;--d:4.5s;--s:0.3"></span>
        <span class="particle" style="--x:60%;--y:40%;--d:3s;--s:0.6"></span>
        <span class="particle" style="--x:33%;--y:90%;--d:5.5s;--s:0.8"></span>
      </div>

      <!-- Spotlight beams from top -->
      <div class="spotlight spotlight-left"></div>
      <div class="spotlight spotlight-center"></div>
      <div class="spotlight spotlight-right"></div>

      <!-- 3D Stage floor reflection -->
      <div class="stage-floor"></div>

      <!-- Panthers Layer (Absolute Positioning) -->
      <div class="panthers-container">
        <!-- Ambient Glowing Blurs -->
        <div class="ambient-glow glow-center"></div>
        <div class="ambient-glow glow-left"></div>
        <div class="ambient-glow glow-right"></div>

        <!-- Dynamische, weichgezeichnete Ringe (Verschwommen) im Hintergrund -->
        <div class="blurry-ring-wrapper wrapper-center">
          <div class="blurry-ring ring-center outer"></div>
          <div class="blurry-ring ring-center inner"></div>
        </div>
        <div class="blurry-ring-wrapper wrapper-left">
          <div class="blurry-ring ring-left outer"></div>
          <div class="blurry-ring ring-left inner"></div>
        </div>
        <div class="blurry-ring-wrapper wrapper-right">
          <div class="blurry-ring ring-right outer"></div>
          <div class="blurry-ring ring-right inner"></div>
        </div>

        <button type="button" @click="isVideoOpen = true" class="portal-circle portal-circle-left" aria-label="Portal: Begleite mich beim Erklärvideo">
          <img src="/trustbridge-hero-portal-left.png" alt="Portal: Begleite mich" />
        </button>
        <PortalLoop class="panther panther-center" />
        <button type="button" @click="isHowItWorksOpen = true" class="portal-circle portal-circle-right" aria-label="Portal: Informationen – So funktioniert's">
          <img src="/trustbridge-hero-portal-right.png" alt="Portal: Informationen" />
        </button>

        <!-- Shadow/reflection below each panther -->
        <div class="panther-shadow shadow-left"></div>
        <div class="panther-shadow shadow-center"></div>
        <div class="panther-shadow shadow-right"></div>
      </div>

            <div class="container hero-content">
        <!-- Trustbridge Logo / Title -->
        <div class="hero-title-wrapper" style="position: relative; z-index: 10;">
          <div class="crown-wrapper">
            <svg class="title-crown" viewBox="0 6 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="#D4AF37"/>
            </svg>
          </div>
          <!-- Die Wortmarke steht bereits als goldener Schriftzug im Portal.
               Hier bleibt sie nur noch fuer Screenreader und Suchmaschinen
               im Dokument, ist aber nicht mehr sichtbar. -->
          <div class="brand-name brand-name--sr">Trustbridge</div>
          <h1 class="tresor-text">
            <span class="tresor-mint">Trust</span> <span class="tresor-gold">Yourself &</span><br/>
            <span class="tresor-gold">Bridge</span> <span class="tresor-mint">your Gap</span>
          </h1>
          <div class="poetic-quote-wrapper">
            <p class="hero-poetic-quote">
              Probleme sind Boten neuer Wege.<br/>
              Sie lehren uns den Weg zum Wandel.<br/>
              Die Natur erinnert uns: Was nicht wächst, verwelkt.
            </p>
          </div>
             <!-- 3 Premium Hero Shards -->
          <div class="hero-shards-grid">
            <!-- Shard 1 (LEFT): Erklärvideo -->
            <button @click="isVideoOpen = true" class="hero-shard shard-left shard-purple">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div class="shard-content">
                <h3>Erklärvideo ansehen</h3>
                <p>Sieh in wenigen Minuten, wie das System funktioniert.</p>
              </div>
            </button>
  
            <!-- Shard 2 (CENTER MAIN): Box auswählen -->
            <Link href="/prizes" class="hero-shard shard-center shard-mint-main">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="shard-content">
                <h3>Box auswählen</h3>
                <p>Wähle dein Level und starte direkt.</p>
              </div>
            </Link>
  
            <!-- Shard 3 (RIGHT): So funktioniert's -->
            <button @click="isHowItWorksOpen = true" class="hero-shard shard-right shard-gold-purple">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="shard-content">
                <h3>So funktioniert's</h3>
                <p>Gebündelter Einkauf. Faire Boxen. Echter Spielraum.</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Compact Guarantee -->
        <div class="hero-guarantee-bar">
          <div class="guarantee-glow"></div>
          <svg class="guarantee-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span class="guarantee-text">Wenn du nicht weißt, wohin — genau dort stand ich auch, als dieser Weg begann.</span>
          <Link href="/how-it-works" class="guarantee-link">Mehr erfahren &rarr;</Link>
        </div>
      </div>
    </div>

    <!-- ===== Modals ===== -->
    <!-- Video Modal -->
      <transition name="fade">
        <div v-if="isVideoOpen" class="hero-modal-overlay premium-overlay" @click="isVideoOpen = false">
          <div class="hero-modal-content video-modal royal-screen-frame" @click.stop>
            <button class="modal-close-btn royal-close" @click="isVideoOpen = false">×</button>
            
            <div class="royal-screen-header">
              <h2 class="royal-screen-title">Die Vision hinter Trustbridge</h2>
              <p class="royal-screen-subtitle">In wenigen Minuten erklärt</p>
            </div>
            
            <div class="royal-screen-display">
              <div class="royal-screen-glow"></div>
              <div class="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/tDx1DHk0QD8" 
                  title="Trustbridge Vision" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
            
            <div class="royal-screen-footer">
              <Link href="/prizes" class="btn-primary royal-cta">Box auswählen</Link>
            </div>
          </div>
        </div>
      </transition>

    <!-- How It Works Modal -->
    <transition name="fade">
      <div v-if="isHowItWorksOpen" class="hero-modal-overlay" @click="isHowItWorksOpen = false">
        <div class="hero-modal-content info-modal" @click.stop>
          <button class="modal-close-btn" @click="isHowItWorksOpen = false">×</button>
          <h2 class="modal-title">So funktioniert's</h2>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-num">1</div>
              <h4>Wir kaufen gebündelt ein</h4>
            </div>
            <div class="step-card">
              <div class="step-num">2</div>
              <h4>Wir stellen faire TrustBoxen zusammen</h4>
            </div>
            <div class="step-card">
              <div class="step-num">3</div>
              <h4>Du bekommst Ware mit Einkaufsvorteil</h4>
            </div>
          </div>
          <div class="modal-actions-center">
            <Link href="/prizes" class="btn-primary modal-cta">Box auswählen</Link>
          </div>
        </div>
      </div>
    </transition>

  </div>
  </AppLayout>
</template>

<script setup>
import { router, Link } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import Merkaba3D from '../Components/Merkaba3D.vue';
import PortalLoop from '../Components/Hero/PortalLoop.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const isVideoOpen = ref(false);
const isHowItWorksOpen = ref(false);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

/* ===== PAGE WRAPPER WITH CONTINUOUS GRADIENT ===== */
.welcome-page {
  background: linear-gradient(-45deg, #4a2685, #29155c, #1a0b36, #37176b); /* Brighter Royal Purple */
  background-size: 400% 400%;
  animation: bg-shift 20s ease infinite;
  overflow-x: hidden;
  max-width: 100vw;
  color: #1e0b3b;
}

.merkaba-3d-container {
  position: absolute;
  top: 35%; /* Mittig auf den Panther zentriert */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  max-width: 1400px;
  max-height: 1400px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.18; /* Sehr dezent und edel leuchtend */
  display: flex;
  justify-content: center;
  align-items: center;
  /* Maskierung: In der Mitte beim Panther leicht schwächer, nach außen hin sehr soft auslaufend */
  mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
}

.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 60px;
  overflow: hidden;
  background: transparent;
  /* 3D Bühne: Perspektive für alle Kinder */
  perspective: 1200px;
  perspective-origin: 50% 40%;
}

/* ===== SPOTLIGHT BEAMS ===== */
.spotlight {
  position: absolute;
  top: 0;
  width: 350px;
  height: 100%;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: screen;
  animation: spotlight-pulse 8s ease-in-out infinite;
}
.spotlight-left {
  left: 15%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(212,175,55,0.7) 0%, transparent 30%);
  animation-delay: 0s;
}
.spotlight-center {
  left: 50%; transform: translateX(-50%);
  background: conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 30%);
  animation-delay: -3s;
}
.spotlight-right {
  right: 15%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(139,92,246,0.7) 0%, transparent 30%);
  animation-delay: -5s;
}
@keyframes spotlight-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.5; }
}

/* ===== 3D STAGE FLOOR ===== */
.stage-floor {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 30%;
  background: linear-gradient(to top,
    rgba(20,0,60,0.6) 0%,
    rgba(60,30,120,0.2) 50%,
    transparent 100%
  );
  transform: perspective(600px) rotateX(10deg);
  transform-origin: bottom center;
  pointer-events: none;
  z-index: 0;
}

/* ===== FLOATING PARTICLES ===== */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: calc(4px * var(--s));
  height: calc(4px * var(--s));
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.9), rgba(255,255,255,0.4));
  animation: float-particle var(--d) ease-in-out infinite alternate;
  box-shadow: 0 0 6px rgba(212,175,55,0.6);
}
@keyframes float-particle {
  from { transform: translateY(0px) scale(1); opacity: 0.6; }
  to   { transform: translateY(-25px) scale(1.4); opacity: 1; }
}


@keyframes bg-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.panthers-container {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  height: 80vh;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: visible; /* Wichtig für die 3D Effekte */
}

/* Glassy Licht-Reflexion (Sweeping Sheen), der über die Panther gleitet */
.panthers-container::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  animation: glassy-sweep 10s infinite;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: overlay;
}

@keyframes glassy-sweep {
  0% { left: -150%; }
  15% { left: 200%; }
  100% { left: 200%; }
}

/* Magische Nebel-Hintergründe (Blur) */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.8;
}

.glow-center {
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70vh; height: 70vh;
  background: radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%);
  animation: pulse-glow 12s infinite alternate;
}

.glow-left {
  left: 5%; bottom: -10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(230,210,255,0.6), transparent 70%);
  animation: pulse-glow 10s infinite alternate-reverse;
}

.glow-right {
  right: 5%; bottom: -10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(230,210,255,0.6), transparent 70%);
  animation: pulse-glow 14s infinite alternate;
}

@keyframes pulse-glow {
  0% { transform: scale(0.9) translate(-50%, -50%); opacity: 0.5; }
  100% { transform: scale(1.05) translate(-50%, -50%); opacity: 0.8; }
}

.glow-left, .glow-right {
  transform: translate(0, 0); /* override center translation */
}

@keyframes pulse-glow-side {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.05); opacity: 0.8; }
}
.glow-left { animation-name: pulse-glow-side; }
.glow-right { animation-name: pulse-glow-side; }

/* Weichgezeichnete, verschwommene Ringe (mehrere pro Figur) */
.blurry-ring-wrapper {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper-center {
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 95vh; height: 95vh; /* Mitgewachsen mit dem Panther */
}

.wrapper-left {
  left: 0%; bottom: 5%;
  width: 40vh; height: 40vh; /* Verkleinert */
}

.wrapper-right {
  right: 0%; bottom: 5%;
  width: 40vh; height: 40vh; /* Verkleinert */
}

.blurry-ring {
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}

/* Keyframes für fließende Rotation und sanftes Pulsieren */
@keyframes spin-ring-outer {
  0% { transform: rotate(0deg) scale(0.95); opacity: 0.6; }
  50% { transform: rotate(180deg) scale(1.05); opacity: 0.9; }
  100% { transform: rotate(360deg) scale(0.95); opacity: 0.6; }
}

@keyframes spin-ring-inner {
  0% { transform: rotate(360deg) scale(1); opacity: 0.8; }
  50% { transform: rotate(180deg) scale(0.9); opacity: 0.5; }
  100% { transform: rotate(0deg) scale(1); opacity: 0.8; }
}

/* Center Panther Ringe */
.ring-center.outer {
  width: 100%; height: 100%;
  border: 15px dashed rgba(212, 175, 55, 0.4); /* Gold */
  filter: blur(12px);
  animation: spin-ring-outer 15s linear infinite;
}
.ring-center.inner {
  width: 75%; height: 75%;
  border: 8px solid rgba(45, 27, 84, 0.5); /* Lila */
  filter: blur(6px);
  animation: spin-ring-inner 10s linear infinite;
}

/* Linker Panther Ringe */
.ring-left.outer {
  width: 100%; height: 100%;
  border: 10px dashed rgba(45, 27, 84, 0.4);
  filter: blur(10px);
  animation: spin-ring-outer 12s linear infinite reverse;
}
.ring-left.inner {
  width: 80%; height: 80%;
  border: 6px dotted rgba(212, 175, 55, 0.4);
  filter: blur(5px);
  animation: spin-ring-inner 9s linear infinite;
}

/* Rechter Panther Ringe */
.ring-right.outer {
  width: 100%; height: 100%;
  border: 10px solid rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  animation: spin-ring-outer 14s linear infinite;
}
.ring-right.inner {
  width: 70%; height: 70%;
  border: 6px dashed rgba(45, 27, 84, 0.3);
  filter: blur(5px);
  animation: spin-ring-inner 11s linear infinite reverse;
}

.panther {
  position: absolute;
  bottom: 0;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.panther-center {
  height: 100%;
  z-index: 3;
  animation: float-3d-center 8s ease-in-out infinite;
  filter: drop-shadow(0 30px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(212,175,55,0.25));
  /* Freistellung in zwei Lagen, damit kein Rechteckrand stehen bleibt.
     Der Container ist 2:3, deshalb ergibt eine Ellipse mit rx = 1,5 x ry
     einen exakten Kreis.

     Lage 1: Kreis um den Portalring (Mittelpunkt 50,7 % / 45,1 %,
             Ringradius 35 % der Breite) - deckend bis 41 %, ausgeblendet
             zum Containerrand hin.
     Lage 2: die Steintreppe darunter, weich nach aussen auslaufend.
     Mehrere Maskenlagen werden per Vorgabe vereinigt. */
  mask-image:
    radial-gradient(ellipse 50% 33.33% at 50.7% 45.1%, #000 0%, #000 82%, transparent 100%),
    radial-gradient(ellipse 26% 17% at 50% 81%, #000 0%, rgba(0,0,0,0.92) 34%, transparent 100%);
  -webkit-mask-image:
    radial-gradient(ellipse 50% 33.33% at 50.7% 45.1%, #000 0%, #000 82%, transparent 100%),
    radial-gradient(ellipse 26% 17% at 50% 81%, #000 0%, rgba(0,0,0,0.92) 34%, transparent 100%);
}

@keyframes float-3d-center {
  0%   { transform: perspective(1200px) rotateY(0deg) rotateX(2deg) translateY(0px) scale(1); }
  /* Schneller, snappiger Punch bei 25% */
  22%  { transform: perspective(1200px) rotateY(2deg) rotateX(0deg) translateY(-5px) scale(1); }
  25%  { transform: perspective(1200px) rotateY(4deg) rotateX(-4deg) translateY(-20px) scale(1.15); }
  30%  { transform: perspective(1200px) rotateY(3deg) rotateX(-2deg) translateY(-14px) scale(1.06); }
  35%  { transform: perspective(1200px) rotateY(4deg) rotateX(-2deg) translateY(-16px) scale(1.1); }
  60%  { transform: perspective(1200px) rotateY(2deg) rotateX(0deg) translateY(-4px) scale(1); }
  100% { transform: perspective(1200px) rotateY(0deg) rotateX(2deg) translateY(0px) scale(1); }
}

.panther-left {
  height: 42%;
  left: 4%;
  z-index: 2;
  animation: float-3d-left 9s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}

@keyframes float-3d-left {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(-5deg) translateY(-12px) scale(1.03); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}

.panther-right {
  height: 42%;
  right: 4%;
  z-index: 2;
  animation: float-3d-right 10s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}

@keyframes float-3d-right {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(5deg) translateY(-12px) scale(1.03); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}

@media (max-width: 1024px) {
  .panther-left, .panther-right, .ambient-glow, .portal-circle-left, .portal-circle-right {
    display: none;
  }
}

/* Portal-Kreise links/rechts: klickbare Navigations-Portale mit generierten Portal-Motiven */
.portal-circle {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 8px;
}

.portal-circle img {
  width: 78%;
  height: 78%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.35), 0 15px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease;
}

.portal-circle:hover img,
.portal-circle:focus-visible img {
  transform: scale(1.06);
  box-shadow: 0 0 60px rgba(212, 175, 55, 0.6), 0 20px 40px rgba(0, 0, 0, 0.45);
  filter: brightness(1.08);
}

.portal-circle-left {
  left: 0%; bottom: 5%;
  width: 40vh; height: 40vh;
}

.portal-circle-right {
  right: 0%; bottom: 5%;
  width: 40vh; height: 40vh;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
  width: 100%;
  max-width: 1340px;
  margin-top: 80vh; /* Erhöhter Abstand zum Panther */
}

.hero-title-wrapper {
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.title-crown {
  width: 50px;
  height: 40px;
}

.crown-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 10px; /* Deutlich mehr Abstand zur Schrift unten */
}

.crown-wrapper::before,
.crown-wrapper::after {
  content: "";
  display: block;
  width: 150px;
  height: 2px;
}

.crown-wrapper::before {
  background: linear-gradient(90deg, transparent, #cda434);
}

.crown-wrapper::after {
  background: linear-gradient(90deg, #cda434, transparent);
}

.hero-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 4.5rem;
  margin: 0 auto 0.5rem;
  max-width: 900px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  
  /* Animierter Gradient */
  background: linear-gradient(to right, #ffffff, #e3cbf7, #f7d25e, #e3cbf7, #ffffff);
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
  background-size: 300% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* 3D Float & Shine Animation */
  animation: title-shine 8s linear infinite, title-float 6s ease-in-out infinite;
}

@keyframes title-shine {
  to { background-position: 200% center; }
}

@keyframes title-float {
  0% { transform: perspective(1000px) rotateX(5deg) translateY(0px); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
  50% { transform: perspective(1000px) rotateX(-5deg) translateY(-8px); filter: drop-shadow(0 20px 15px rgba(0,0,0,0.3)); }
  100% { transform: perspective(1000px) rotateX(5deg) translateY(0px); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
}

  .brand-name {
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: 6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 15px;
    color: #8EF5D2; /* Glowing Mint / Legacy Mint */
    margin-top: 2.2rem;
    margin-bottom: 0rem;
    text-shadow: 0 0 45px rgba(142,245,210,1), 0 0 80px rgba(142,245,210,0.6), 0 0 150px rgba(142,245,210,0.4);
    position: relative;
    display: inline-block;
  }
  
  /* Optisch ausgeblendet, im Dokument erhalten: die sichtbare Wortmarke
     ist der goldene Schriftzug im Portal darueber. */
  .brand-name--sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .brand-name::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 160%; height: 200%;
    background: radial-gradient(ellipse, rgba(142,245,210,0.15) 0%, transparent 60%);
    z-index: -1;
    pointer-events: none;
    filter: blur(25px);
  }

  .tresor-text {
    font-family: 'Great Vibes', cursive;
    font-size: 4rem;
    line-height: 1.1;
    text-align: center;
    margin-top: 3.2rem; /* ersetzt den Abstand der ausgeblendeten Wortmarke */
    margin-bottom: 30px;
    text-shadow: 0 5px 20px rgba(0,0,0,0.8);
    font-weight: 400;
  }
  
  /* Ebene 1 – Legacy Mint, Glow-Aufbau wie bei .brand-name */
  /* Lokale Abdunklung hinter der Tagline.
     Ohne sie liegt an einer Stelle ein Lichtkegel direkt hinter der Zeile;
     Gold erreicht dort nur 2,64:1 und verfehlt die 3:1 fuer Grosstext.
     Weicher Radialverlauf, kein sichtbarer Kasten. */
  .tresor-text {
    position: relative;
    isolation: isolate;
    /* Hebt den globalen h1-Verlauf aus app.css auf. */
    background: none;
    -webkit-background-clip: border-box;
    background-clip: border-box;
  }

  .tresor-text::before {
    content: '';
    position: absolute;
    /* Sehr weit ueber den Text hinaus und flach auslaufend: wirkt als
       Tiefe im Raum, nicht als Kasten. Der frueher sichtbare Balken kam
       von einem zu engen Radius mit zu hoher Deckkraft. */
    inset: -120% -45%;
    background: radial-gradient(
      ellipse at center,
      rgba(6, 3, 14, 0.5) 0%,
      rgba(6, 3, 14, 0.34) 30%,
      rgba(6, 3, 14, 0.16) 52%,
      transparent 72%
    );
    z-index: -1;
    pointer-events: none;
  }

  .tresor-mint {
    color: #8EF5D2;
    -webkit-text-fill-color: #8EF5D2;
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.9),
      0 3px 10px rgba(4, 2, 10, 0.95),
      0 0 45px rgba(142, 245, 210, 0.85),
      0 0 80px rgba(142, 245, 210, 0.5),
      0 0 150px rgba(142, 245, 210, 0.3);
  }

  .tresor-gold {
    /* Buchstaben im hellen Gold aus der Palette (.guarantee-link).
       #C9A227 erreichte gefuellt nur 2,54:1 auf 390 px und verfehlte die
       3:1 fuer Grosstext; #F0CF5A liegt bei 4,02:1. Der tiefere Ton
       bleibt als Glow dahinter erhalten. */
    color: #F0CF5A;
    -webkit-text-fill-color: #F0CF5A;
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.9),
      0 3px 10px rgba(4, 2, 10, 0.95),
      0 0 35px rgba(201, 162, 39, 1),
      0 0 60px rgba(201, 162, 39, 0.6),
      0 0 120px rgba(201, 162, 39, 0.4);
  }
  
  .tresor-silver {
    color: #E2E8F0;
  }
  
  .poetic-quote-wrapper {
    position: relative;
    display: inline-block;
    padding: 25px 50px;
    margin-top: 10px;
    margin-bottom: 50px;
    /* Kein Rahmen und keine Flaeche: der Spruch soll frei im Raum stehen.
       Die beiden feinen Goldstriche darueber und darunter bleiben als
       Ornament erhalten. */
    z-index: 10;
  }
  
  .poetic-quote-wrapper::before, .poetic-quote-wrapper::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: #C9A227;
    box-shadow: 0 0 15px rgba(201, 162, 39, 0.9);
  }
  
  .poetic-quote-wrapper::before { top: -1px; }
  .poetic-quote-wrapper::after { bottom: -1px; }

  .hero-poetic-quote {
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: 1.3rem;
    font-style: italic;
    color: #FFFFFF;
    font-weight: 600;
    line-height: 1.9;
    text-align: center;
    margin: 0;
    letter-spacing: 0.6px;
    /* Freistehend mit Tiefe: erst zwei enge dunkle Lagen fuer die
       plastische Kante, darueber ein weiches weisses Leuchten und
       aussen ein Hauch Mint aus der Markenpalette. */
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.95),
      0 2px 3px rgba(4, 2, 10, 0.9),
      0 4px 16px rgba(4, 2, 10, 0.95),
      0 0 18px rgba(255, 255, 255, 0.45),
      0 0 38px rgba(255, 255, 255, 0.22),
      0 0 70px rgba(142, 245, 210, 0.28);
  }
  
  .hero-subtitle {
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 55px;
    text-align: center;
    text-shadow: 0 4px 15px rgba(0,0,0,0.8);
  }

  .hero-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
    z-index: 10;
  }
  
  /* --- 3 Premium Shards --- */
  .hero-shards-grid {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    max-width: 1200px;
    width: 100%;
    align-items: stretch;
  }
  @media (max-width: 900px) {
    .hero-shards-grid { 
      flex-direction: column; 
      align-items: center; 
      gap: 25px; 
    }
  }
  
  .hero-shard {
    flex: 1;
    position: relative; border-radius: 24px; padding: 2.5rem 1.8rem;
    text-align: center; cursor: pointer; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform-style: preserve-3d; min-width: 300px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-decoration: none; color: #fff;
    /* Reset button styles */
    background: transparent; border: none; outline: none; appearance: none;
  }
  
  @media (max-width: 900px) {
    .hero-shard { min-width: 100%; max-width: 400px; padding: 2.5rem 2rem; }
    .shard-center { order: -1; } /* On mobile, Center (Box auswählen) goes first! */
  }
  
  .hero-shard:hover { transform: translateY(-12px) scale(1.03); z-index: 10; }
  .hero-shard:active { transform: translateY(-4px) scale(0.98); transition: all 0.1s ease; }
  
  /* Shard Center (Box auswählen) is slightly larger and more prominent */
  .shard-center {
    transform: scale(1.06);
    z-index: 5;
  }
  .shard-center:hover {
    transform: translateY(-15px) scale(1.09);
  }
  .shard-center:active {
    transform: translateY(-5px) scale(1.03);
  }
  
  /* Base Glass */
  .shard-glass {
    position: absolute; inset: 0; 
    backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
    border-radius: 24px; border: 1px solid rgba(255,255,255,0.15);
    border-top: 1px solid rgba(255,255,255,0.3); border-left: 1px solid rgba(255,255,255,0.25);
    box-shadow:
      0 30px 60px rgba(0,0,0,0.6),
      inset 0 0 45px rgba(255,255,255,0.1),
      inset 0 1px 0 rgba(255,255,255,0.45);
    transition: all 0.5s ease; overflow: hidden;
  }
  
  /* Glass Colors */
  .shard-left .shard-glass {
    /* Royal Violet & Gold Note */
    background: linear-gradient(135deg, rgba(60, 30, 90, 0.48) 0%, rgba(212, 175, 55, 0.12) 100%);
    border-top-color: rgba(212, 175, 55, 0.6);
    border-left-color: rgba(139, 92, 246, 0.45);
  }
  .shard-center .shard-glass {
    /* Rich Legacy Mint & Strong Gold Edge */
    background: linear-gradient(135deg, rgba(142, 245, 210, 0.45) 0%, rgba(212, 175, 55, 0.25) 100%);
    box-shadow: 0 40px 80px rgba(0,0,0,0.85), inset 0 0 50px rgba(142,245,210,0.25), inset 0 2px 15px rgba(212,175,55,0.5);
    border-top-color: rgba(212, 175, 55, 0.8);
    border-left-color: rgba(142, 245, 210, 0.7);
  }
  .shard-right .shard-glass {
    /* Royal Violet & Gold Note */
    background: linear-gradient(135deg, rgba(60, 30, 90, 0.48) 0%, rgba(212, 175, 55, 0.12) 100%);
    border-top-color: rgba(212, 175, 55, 0.6);
    border-left-color: rgba(139, 92, 246, 0.45);
  }
  
  /* Hover Glass Colors */
  .shard-left:hover .shard-glass { background: linear-gradient(135deg, rgba(60, 30, 90, 0.5) 0%, rgba(212, 175, 55, 0.15) 100%); }
  .shard-center:hover .shard-glass { background: linear-gradient(135deg, rgba(142, 245, 210, 0.55) 0%, rgba(212, 175, 55, 0.35) 100%); }
  .shard-right:hover .shard-glass { background: linear-gradient(135deg, rgba(60, 30, 90, 0.5) 0%, rgba(212, 175, 55, 0.15) 100%); }
  
  .shard-refraction {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 40%, rgba(255,255,255,0.12) 60%, transparent 100%);
    border-radius: 24px; pointer-events: none; opacity: 0.9; transition: opacity 0.4s ease;
    overflow: hidden;
  }

  /* Wandernder Lichtschein ueber dem Glas – nimmt den Sweep der Portale auf */
  .shard-refraction::after {
    content: '';
    position: absolute;
    top: 0; left: -60%;
    width: 45%; height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-22deg);
    animation: shard-sheen 7s ease-in-out infinite;
    pointer-events: none;
  }
  .shard-left  .shard-refraction::after { animation-delay: 0s; }
  .shard-center .shard-refraction::after { animation-delay: -2.3s; }
  .shard-right .shard-refraction::after { animation-delay: -4.6s; }

  @keyframes shard-sheen {
    0%        { left: -60%; }
    35%, 100% { left: 160%; }
  }
  
  .shard-aura {
    position: absolute; inset: -4px; border-radius: 28px;
    background-size: 300% 300%;
    /* Im Ruhezustand bereits sichtbar, damit das Glas auch ohne Hover lebt */
    opacity: 0.42; filter: blur(18px);
    animation: auraSpin 9s linear infinite;
    transition: opacity 0.4s ease, filter 0.4s ease; z-index: -1;
  }

  @keyframes auraSpin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Auras */
  .shard-left .shard-aura { background: linear-gradient(45deg, #3c1e5a, #D4AF37, #5c3b8a, #3c1e5a); }
  .shard-center .shard-aura { background: linear-gradient(45deg, #8EF5D2, #D4AF37, #5CE1C6, #8EF5D2); }
  .shard-right .shard-aura { background: linear-gradient(45deg, #D4AF37, #3c1e5a, #8b5cf6, #D4AF37); }
  
  .hero-shard:hover .shard-aura { opacity: 0.95; filter: blur(22px); animation-duration: 3s; }
  .shard-center .shard-aura { opacity: 0.6; }
  .shard-center:hover .shard-aura { opacity: 1; }
  
  .shard-icon {
    margin-bottom: 25px;
    position: relative;
    z-index: 2;
    transition: transform 0.4s ease;
    color: rgba(255,255,255,0.9); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.6));
  }
  .shard-icon svg { width: 42px; height: 42px; }
  .shard-center .shard-icon svg { 
    width: 54px; height: 54px; 
    color: #8EF5D2; 
    filter: drop-shadow(0 0 15px rgba(212,175,55,0.6)); /* Subtle Gold Note */
  }
  
  .hero-shard:hover .shard-icon {
    transform: scale(1.15) translateY(-5px);
    color: #FFFFFF;
  }
  .shard-center:hover .shard-icon {
    color: #FFF;
    filter: drop-shadow(0 10px 20px rgba(142,245,210,0.8));
  }
  
  .shard-content {
    position: relative;
    z-index: 2;
  }
  
  .shard-content h3 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 12px;
    font-family: "Century Gothic", system-ui, sans-serif;
    text-shadow: 0 4px 15px rgba(0,0,0,0.6);
    color: #FFFFFF;
    transition: color 0.4s ease, text-shadow 0.4s ease;
    letter-spacing: 0.5px;
  }
  .shard-center .shard-content h3 {
    font-size: 2rem;
    font-weight: 900;
    color: #8EF5D2;
    text-shadow: 0 0 25px rgba(142,245,210,0.6), 0 2px 10px rgba(0,0,0,0.8);
  }
  
  .hero-shard:hover .shard-content h3 {
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
  }
  .shard-center:hover .shard-content h3 {
    color: #FFFFFF;
    text-shadow: 0 0 35px rgba(142,245,210,0.9);
  }
  
  .shard-content p {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.85);
    margin: 0;
    line-height: 1.5;
    transition: color 0.4s ease;
    font-weight: 500;
  }
  .shard-center .shard-content p {
    font-size: 1.15rem;
    color: rgba(255,255,255,0.95);
  }
  .hero-shard:hover .shard-content p {
    color: #FFFFFF;
  }

/* --- Compact Guarantee Bar --- */
.hero-guarantee-bar {
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.08); /* Brighter */
  backdrop-filter: blur(15px);
  border: 1px solid rgba(212,175,55,0.4);
  border-radius: 50px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(212,175,55,0.15);
}
.guarantee-icon {
  flex-shrink: 0;
  width: 24px; height: 24px;
}
.guarantee-text {
  color: #FFFFFF;
  font-size: 1.05rem;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.guarantee-link {
  color: #F0CF5A;
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
  margin-left: 15px;
  transition: all 0.3s;
}
.guarantee-link:hover { color: #FFF; text-shadow: 0 0 10px rgba(240,207,90,0.8); }

@media (max-width: 768px) {
  .hero-guarantee-bar { flex-direction: column; text-align: center; border-radius: 20px; padding: 20px; }
  .guarantee-link { margin-left: 0; margin-top: 8px; }
}

/* --- Modals --- */
.hero-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(5, 2, 10, 0.85);
  backdrop-filter: blur(25px);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.hero-modal-overlay.premium-overlay {
  background: rgba(5, 2, 10, 0.92);
  backdrop-filter: blur(35px);
}

.hero-modal-content {
  background: rgba(45, 20, 80, 0.85); /* Brighter purple glass */
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.2);
  border-top: 1px solid rgba(255,255,255,0.4);
  border-radius: 30px;
  position: relative;
  max-width: 800px; width: 100%;
  padding: 50px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(255,255,255,0.1);
}

/* --- Premium Video Modal (Royal Screen Frame) --- */
.video-modal.royal-screen-frame {
  background: linear-gradient(135deg, rgba(45, 20, 80, 0.9) 0%, rgba(20, 10, 40, 0.95) 100%);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(142, 245, 210, 0.15);
  border-top: 1px solid rgba(142, 245, 210, 0.35);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 36px;
  padding: 40px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 50px 120px rgba(0,0,0,0.95), 0 0 80px rgba(142,245,210,0.08), inset 0 0 60px rgba(212,175,55,0.05);
}

.royal-close {
  top: 25px; right: 25px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #C4B8D8;
  z-index: 20;
}
.royal-close:hover {
  background: rgba(142,245,210,0.15);
  color: #8EF5D2;
  border-color: rgba(142,245,210,0.4);
}

.royal-screen-header {
  text-align: center;
  margin-bottom: 25px;
  width: 100%;
}
.royal-screen-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  text-shadow: 0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(142,245,210,0.2);
}
.royal-screen-subtitle {
  font-size: 1.1rem;
  color: #D4AF37; /* Gold */
  margin: 0;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.royal-screen-display {
  position: relative;
  width: 100%;
  border-radius: 20px;
  padding: 10px; /* Inner bezel */
  background: linear-gradient(180deg, rgba(20, 10, 35, 0.8) 0%, rgba(5, 2, 10, 0.9) 100%);
  box-shadow: inset 0 0 30px rgba(0,0,0,0.9), 0 15px 40px rgba(0,0,0,0.7);
  border: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.royal-screen-glow {
  position: absolute;
  inset: -3px;
  border-radius: 22px;
  background: linear-gradient(45deg, rgba(142,245,210,0.3), transparent 40%, transparent 60%, rgba(212,175,55,0.25));
  z-index: 0;
  pointer-events: none;
  filter: blur(10px);
}

.video-container {
  position: relative; 
  width: 100%; 
  padding-bottom: 56.25%; 
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 0 40px rgba(0,0,0,0.9);
}
.video-container iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}

.royal-screen-footer {
  margin-top: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.royal-cta {
  background: linear-gradient(135deg, #8EF5D2 0%, #5CE1C6 100%);
  color: #1a0b36 !important;
  font-size: 1.3rem;
  font-weight: 800;
  padding: 18px 50px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(142,245,210,0.4), inset 0 2px 5px rgba(255,255,255,0.6);
  transition: all 0.3s ease;
  border: 2px solid rgba(212,175,55,0.5); /* Gold touch */
  text-decoration: none;
}
.royal-cta:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 40px rgba(142,245,210,0.6), 0 0 30px rgba(212,175,55,0.4), inset 0 2px 10px rgba(255,255,255,0.8);
}

@media (max-width: 768px) {
  .video-modal.royal-screen-frame {
    padding: 25px 15px;
    border-radius: 24px;
  }
  .royal-screen-title { font-size: 1.6rem; }
  .royal-screen-subtitle { font-size: 0.9rem; }
  .royal-screen-display { padding: 6px; border-radius: 16px; }
  .video-container { border-radius: 10px; }
  .royal-cta { font-size: 1.1rem; padding: 15px 30px; }
  .royal-close { top: 15px; right: 15px; width: 36px; height: 36px; font-size: 1.5rem; }
}

.modal-close-btn {
  position: absolute; top: 20px; right: 20px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
  color: white; font-size: 1.8rem; cursor: pointer; width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: all 0.3s;
  z-index: 20;
}
.modal-close-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }

.info-modal { text-align: center; color: white; }
.modal-title { font-family: "Century Gothic", sans-serif; font-size: 2.6rem; color: #FFF; margin-bottom: 40px; text-shadow: 0 0 20px rgba(255,255,255,0.3); }
.steps-grid { display: flex; flex-direction: column; gap: 25px; margin-bottom: 50px; }
.step-card { 
  background: rgba(255,255,255,0.08); 
  padding: 25px; 
  border-radius: 20px; 
  display: flex; align-items: center; gap: 25px; 
  border: 1px solid rgba(142,245,210,0.3); 
  box-shadow: inset 0 0 20px rgba(142,245,210,0.05);
}
.step-num { 
  width: 50px; height: 50px; 
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6); 
  color: #000; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; 
  font-weight: 900; font-size: 1.5rem; flex-shrink: 0; 
  box-shadow: 0 0 20px rgba(142,245,210,0.4);
}
.step-card h4 { margin: 0; font-size: 1.4rem; text-align: left; font-weight: 700; color: #FFF; }

.modal-actions-center {
  padding: 20px; text-align: center;
}
.modal-cta { 
  padding: 18px 50px; 
  font-size: 1.3rem; 
  font-weight: 800;
  border-radius: 40px; 
  box-shadow: 0 10px 30px rgba(212,175,55,0.4);
}
.modal-cta:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(212,175,55,0.6);
}

/* ===================================================================
   MOBILE: Portal und Text entzerren
   -------------------------------------------------------------------
   Auf Desktop liegt .panthers-container absolut hinter dem Text und ist
   ueber height: 80vh dimensioniert. Auf schmalen Geraeten fuehrt das zu
   zwei Problemen: die Grafik wird 124vw breit (gemessen bei 390 px) und
   der Text liegt mit -213 px Abstand direkt auf Ring und Treppe.

   Unterhalb 1024 px wird daraus ein einfacher vertikaler Stapel:
   Portal oben, Text darunter, mit echtem Abstand.
   =================================================================== */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: clamp(96px, 18vw, 140px);
  }

  /* Aus dem absoluten Layout in den Fluss holen, damit der Text darunter
     echten Platz bekommt statt auf der Grafik zu liegen. */
  .panthers-container {
    position: relative;
    top: auto;
    height: auto;
    width: 100%;
  }

  /* Groesse ueber die Breite steuern statt ueber 80vh. */
  .tb-loop.panther-center {
    position: relative;
    height: auto;
    width: min(74vw, 44vh);
  }

  /* Die Ringe haengen an 95vh und blieben sonst unveraendert gross. */
  .wrapper-center { width: 96vw; height: 96vw; }

  .hero-content { margin-top: 0; }

  /* Die Seitenportale bleiben ausgeblendet - bewusste Entscheidung,
     siehe Components/Hero/README.md.
     Die Regel weiter oben in diesem Stylesheet greift nicht, weil
     .portal-circle danach display: flex setzt und bei gleicher
     Spezifitaet gewinnt. Deshalb hier erneut, an wirksamer Stelle. */
  .portal-circle-left,
  .portal-circle-right { display: none; }
}

@media (max-width: 768px) {
  .hero-title-wrapper { margin-top: 0; }

  /* Die Begriffe der Merkaba landen im gestapelten Mobil-Layout direkt
     hinter der Tagline und stoeren die Lesbarkeit. Deutlich zuruecknehmen. */
  .merkaba-3d-container { opacity: 0.07; }

  /* Mindestens 40 px Luft zur Portalgrafik darueber. */
  .tresor-text {
    margin-top: 2.6rem;
    margin-bottom: 0;
    font-size: clamp(2rem, 8.2vw, 3rem);
  }

  /* Klare Trennung der drei Bloecke: Tagline - Trennlinie - Zitat. */
  .poetic-quote-wrapper {
    margin-top: 2.25rem;
    margin-bottom: 2.5rem;
    padding: 20px 16px;
  }

  .hero-poetic-quote { font-size: 1.02rem; letter-spacing: 0.3px; }

  /* Die Zierlinien neben der Krone sind fest 150 px breit. */
  .crown-wrapper::before,
  .crown-wrapper::after { width: 22vw; }
}

@media (max-width: 600px) {
  .tresor-text {
    margin-top: 2.1rem;
    font-size: clamp(1.7rem, 8.4vw, 2.3rem);
  }

  .poetic-quote-wrapper {
    margin-top: 1.8rem;
    margin-bottom: 2rem;
    padding: 18px 8px;
  }

  .hero-poetic-quote { font-size: 0.95rem; line-height: 1.72; }
}
</style>