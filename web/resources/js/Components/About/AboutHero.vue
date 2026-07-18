<template>
  <div class="about-hero">
    <div class="particles">
      <span class="particle" style="--x:10%;--y:20%;--d:3s;--s:0.5"></span>
      <span class="particle" style="--x:25%;--y:60%;--d:4s;--s:0.8"></span>
      <span class="particle" style="--x:55%;--y:75%;--d:5s;--s:0.6"></span>
      <span class="particle" style="--x:70%;--y:30%;--d:3.5s;--s:0.9"></span>
      <span class="particle" style="--x:85%;--y:55%;--d:2s;--s:0.5"></span>
      <span class="particle" style="--x:90%;--y:15%;--d:4.5s;--s:0.3"></span>
    </div>
    <div class="spotlight spotlight-left"></div>
    <div class="spotlight spotlight-right"></div>
    <div class="panthers-container">
      <div class="ambient-glow glow-left"></div>
      <div class="ambient-glow glow-right"></div>
      <img src="/panther-links-nobg.png" class="panther panther-left" alt="Trustbridge Maskottchen Links" />
      <img src="/panther-rechts-nobg.png" class="panther panther-right" alt="Trustbridge Maskottchen Rechts" />
    </div>
    <div class="hero-content">
      <span class="hero-tag">Über uns</span>
      <h1>Über Trustbridge</h1>
      <p class="hero-sub">Deine monatliche Warenbox zum Entdecken, Nutzen und Weiterverkaufen</p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-hero {
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(-45deg, #d8b4fe, #c4b5fd, #93c5fd, #a78bfa, #a5b4fc);
  background-size: 400% 400%;
  animation: bg-shift 20s ease infinite;
  padding: 8rem 2rem 5rem;
}
@keyframes bg-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.particle {
  position: absolute; left: var(--x); top: var(--y);
  width: calc(4px * var(--s)); height: calc(4px * var(--s));
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.9), rgba(255,255,255,0.4));
  animation: float-p var(--d) ease-in-out infinite alternate;
  box-shadow: 0 0 6px rgba(212,175,55,0.6);
}
@keyframes float-p {
  from { transform: translateY(0) scale(1); opacity: 0.6; }
  to { transform: translateY(-25px) scale(1.4); opacity: 1; }
}
.spotlight {
  position: absolute; top: 0; width: 350px; height: 100%;
  pointer-events: none; opacity: 0.35; mix-blend-mode: screen;
  animation: sp-pulse 8s ease-in-out infinite;
}
.spotlight-left {
  left: 10%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(212,175,55,0.7) 0%, transparent 30%);
}
.spotlight-right {
  right: 10%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(139,92,246,0.7) 0%, transparent 30%);
  animation-delay: -4s;
}
@keyframes sp-pulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.5; } }
.panthers-container {
  position: absolute; bottom: 0; left: 0; right: 0; height: 100%;
  max-width: 1600px; margin: 0 auto;
  display: flex; justify-content: center; align-items: flex-end;
  z-index: 1; pointer-events: none;
}
.ambient-glow {
  position: absolute; border-radius: 50%; filter: blur(80px); z-index: 0; opacity: 0.6;
  width: 40vh; height: 40vh;
  background: radial-gradient(circle, rgba(230,210,255,0.6), transparent 70%);
}
.glow-left { left: 5%; bottom: 0; animation: pg 10s infinite alternate-reverse; }
.glow-right { right: 5%; bottom: 0; animation: pg 14s infinite alternate; }
@keyframes pg { 0% { transform: scale(0.9); opacity: 0.4; } 100% { transform: scale(1.05); opacity: 0.7; } }
.panther {
  position: absolute; bottom: 0; object-fit: contain;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}
.panther-left { height: 55%; left: 3%; animation: fl 9s ease-in-out infinite; }
.panther-right { height: 55%; right: 3%; animation: fr 10s ease-in-out infinite; }
@keyframes fl {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0); }
  50% { transform: perspective(1200px) rotateY(-5deg) translateY(-12px); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0); }
}
@keyframes fr {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0); }
  50% { transform: perspective(1200px) rotateY(5deg) translateY(-12px); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0); }
}
.hero-content {
  position: relative; z-index: 5; text-align: center;
  max-width: 800px; display: flex; flex-direction: column; align-items: center;
}
.hero-tag {
  display: inline-block;
  background: rgba(212,175,55,0.15); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.4);
  padding: 0.3rem 1.2rem; border-radius: 50px;
  font-size: 0.85rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px;
  margin-bottom: 1.5rem;
}
.about-hero h1 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 3.5rem; font-weight: bold; margin-bottom: 1rem;
  background: linear-gradient(to right, #1e0b3b, #4a238a, #d4af37, #4a238a, #1e0b3b);
  background-size: 300% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: shine 8s linear infinite;
}
@keyframes shine { to { background-position: 200% center; } }
.hero-sub {
  color: #2D1B54; font-size: 1.2rem; font-family: 'Century Gothic', system-ui, sans-serif;
  font-weight: 600; margin: 0;
}
@media (max-width: 768px) {
  .about-hero { min-height: 45vh; padding: 7rem 1.5rem 3rem; }
  .about-hero h1 { font-size: 2.2rem; }
  .hero-sub { font-size: 1rem; }
  .panther-left, .panther-right { height: 40%; }
}
</style>
