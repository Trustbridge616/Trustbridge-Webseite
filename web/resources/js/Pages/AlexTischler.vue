<template>
  <Head>
    <title>Alexander Tischler – 1:1 Fitness & Performance Coaching</title>
    <meta name="description" content="Individuelles 1:1-Coaching für Frauen und Paare: Training, Ernährung und Hormon-Optimierung, abgestimmt auf deinen Alltag. Starte mit der kostenlosen Analyse." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preload" as="image" href="/assets/alextischler/coach-hero.webp" fetchpriority="high" />
  </Head>

  <div class="aw-page">
    <!-- Globaler Hintergrund: Navy mit tiefen Verläufen + radialen Glows -->
    <div class="aw-bg" aria-hidden="true">
      <div class="aw-bg-glow aw-bg-indigo"></div>
      <div class="aw-bg-glow aw-bg-mint"></div>
      <div class="aw-bg-glow aw-bg-violet"></div>
    </div>

    <AwNav />
    <main>
      <AwHero />
      <AwPain />
      <AwBenefits />
      <AwErfolge />
      <AwCoach />
      <AwSteps />
      <AwFunnel />
      <AwApp />
      <AwTestimonials />
      <AwInstagram />
      <AwKundenbereich />
      <AwCtaFaqFooter />
    </main>
    <AwExitHint />
  </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import AwNav from '../Components/AlexTischler/AwNav.vue';
import AwKundenbereich from '../Components/AlexTischler/AwKundenbereich.vue';
import AwHero from '../Components/AlexTischler/AwHero.vue';
import AwPain from '../Components/AlexTischler/AwPain.vue';
import AwBenefits from '../Components/AlexTischler/AwBenefits.vue';
import AwCoach from '../Components/AlexTischler/AwCoach.vue';
import AwErfolge from '../Components/AlexTischler/AwErfolge.vue';
import AwFunnel from '../Components/AlexTischler/AwFunnel.vue';
import AwSteps from '../Components/AlexTischler/AwSteps.vue';
import AwApp from '../Components/AlexTischler/AwApp.vue';
import AwTestimonials from '../Components/AlexTischler/AwTestimonials.vue';
import AwInstagram from '../Components/AlexTischler/AwInstagram.vue';
import AwCtaFaqFooter from '../Components/AlexTischler/AwCtaFaqFooter.vue';
import AwExitHint from '../Components/AlexTischler/AwExitHint.vue';
</script>

<style>
/* Global (unscoped): Scroll-Reveal-Zustände für alle AlexTischler-Komponenten */
.aw-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: opacity, transform;
}
.aw-reveal.aw-revealed {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .aw-reveal { opacity: 1; transform: none; transition: none; }
}

/* Anker-Sprünge landen unterhalb der fixen Navigation */
.aw-page section {
  scroll-margin-top: 96px;
}

/* Sichtbarer Tastatur-Fokus auf dem dunklen Glas-Design */
.aw-page :is(a, button):focus-visible {
  outline: 2px solid #8EF5D2;
  outline-offset: 3px;
  border-radius: 6px;
}
</style>

<style scoped>
.aw-page {
  position: relative;
  min-height: 100vh;
  background: #0F172A;
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #F8FAFC;
  overflow-x: hidden;
}
.aw-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(160deg, #1E0B3B 0%, #0F172A 45%, #0B1115 100%);
}
.aw-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  animation: awBgDrift 14s ease-in-out infinite;
}
.aw-bg-indigo {
  top: -12%; left: -8%;
  width: 55vw; height: 55vw;
  background: rgba(79, 70, 229, 0.15);
}
.aw-bg-mint {
  bottom: -18%; right: -10%;
  width: 45vw; height: 45vw;
  background: rgba(142, 245, 210, 0.07);
  animation-delay: -5s;
}
.aw-bg-violet {
  top: 35%; right: 20%;
  width: 30vw; height: 30vw;
  background: rgba(124, 58, 237, 0.09);
  animation-delay: -9s;
}
@keyframes awBgDrift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(2vw, -2vh) scale(1.07); }
}
.aw-page main {
  position: relative;
  z-index: 1;
}
</style>
