<template>
  <section id="kundenbereich" class="aw-kb">
    <div class="aw-kb-band" v-reveal>
      <span class="aw-kb-band-glow" aria-hidden="true"></span>
      <div class="aw-kb-band-text">
        <span class="aw-kb-kicker">TRITT EIN — KUNDENBEREICH</span>
        <h2>Sieh hier deine Ergebnisse</h2>
        <p>Dein persönlicher Bereich: Fortschritt, Check-ins und Pläne an einem Ort.</p>
      </div>
      <button class="aw-kb-band-btn" @click="open = !open" :aria-expanded="open" aria-controls="aw-kb-panel">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
        </svg>
        {{ open ? 'Bereich schließen' : 'Zum Login' }}
      </button>
    </div>

    <transition name="aw-kb-expand">
      <div v-if="open" id="aw-kb-panel" class="aw-kb-panel">
        <!-- Login-Karte (Platzhalter, noch nicht funktional) -->
        <div class="aw-kb-login">
          <div class="aw-kb-login-head">
            <span class="aw-kb-lock">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
              </svg>
            </span>
            <h3>Kunden-Login</h3>
            <p>Zugang für aktive Coaching-Kunden</p>
          </div>
          <form @submit.prevent="tryLogin">
            <label>
              E-Mail
              <input v-model="email" type="email" placeholder="dein.name@mail.de" autocomplete="email" />
            </label>
            <label>
              Passwort
              <input v-model="password" type="password" placeholder="••••••••" autocomplete="current-password" />
            </label>
            <button type="submit" class="aw-kb-login-btn">
              <span class="aw-kb-glare" aria-hidden="true"></span>
              Einloggen
            </button>
            <p v-if="hint" class="aw-kb-hint">{{ hint }}</p>
            <p class="aw-kb-note">Demo zum Ausprobieren: demo@alextischler.de · coach2026 — dein echter Zugang kommt mit dem Coaching-Start.</p>
          </form>
        </div>

        <!-- Dashboard-Vorschau (Beispieldaten) -->
        <div class="aw-kb-dash">
          <div class="aw-kb-dash-top">
            <div>
              <span class="aw-kb-dash-hello">Willkommen zurück, Max</span>
              <h3>Dein Fortschritt</h3>
            </div>
            <span class="aw-kb-demo-pill">Beispiel-Ansicht</span>
          </div>

          <div class="aw-kb-kpis">
            <div class="aw-kb-kpi">
              <span class="aw-kb-kpi-label">Gewicht</span>
              <span class="aw-kb-kpi-value">86,4 <em>kg</em></span>
              <span class="aw-kb-kpi-trend down">▼ 7,8 kg seit Start</span>
            </div>
            <div class="aw-kb-kpi">
              <span class="aw-kb-kpi-label">Trainings-Treue</span>
              <span class="aw-kb-kpi-value">92 <em>%</em></span>
              <span class="aw-kb-kpi-trend up">▲ letzte 4 Wochen</span>
            </div>
            <div class="aw-kb-kpi">
              <span class="aw-kb-kpi-label">Check-ins</span>
              <span class="aw-kb-kpi-value">14 <em>/ 14</em></span>
              <span class="aw-kb-kpi-trend up">Alle abgegeben</span>
            </div>
          </div>

          <div class="aw-kb-chart-card">
            <div class="aw-kb-chart-head">
              <span>Gewichtsverlauf · 14 Wochen</span>
              <span class="aw-kb-chart-dot"></span>
            </div>
            <svg class="aw-kb-chart" viewBox="0 0 320 110" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="awKbFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(142,245,210,0.35)"/>
                  <stop offset="100%" stop-color="rgba(142,245,210,0)"/>
                </linearGradient>
              </defs>
              <path :d="areaPath" fill="url(#awKbFill)"/>
              <path :d="linePath" fill="none" stroke="#8EF5D2" stroke-width="2.5" stroke-linecap="round" class="aw-kb-line"/>
              <circle :cx="lastPoint.x" :cy="lastPoint.y" r="4" fill="#8EF5D2" class="aw-kb-line-end"/>
            </svg>
            <div class="aw-kb-chart-axis"><span>Woche 1</span><span>Woche 7</span><span>Woche 14</span></div>
          </div>

          <div class="aw-kb-bars-card">
            <div class="aw-kb-chart-head"><span>Trainingseinheiten pro Woche</span></div>
            <div class="aw-kb-bars">
              <div v-for="(b, i) in bars" :key="i" class="aw-kb-bar-col">
                <span class="aw-kb-bar" :style="{ height: b * 100 / 5 + '%' }"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router } from '@inertiajs/vue3';
import { vReveal } from './useReveal';

const open = ref(false);
const email = ref('');
const password = ref('');
const hint = ref('');

const tryLogin = () => {
  if (email.value.trim().toLowerCase() === 'demo@alextischler.de' && password.value === 'coach2026') {
    sessionStorage.setItem('at-demo-auth', '1');
    router.visit('/alextischler.de/dashboard');
  } else {
    hint.value = 'Zugangsdaten unbekannt. Demo-Zugang zum Testen: demo@alextischler.de / coach2026 — deinen echten Zugang erhältst du mit dem Coaching-Start.';
  }
};

// Beispieldaten für die Dashboard-Vorschau
const weights = [94.2, 93.6, 93.1, 92.2, 91.8, 91.0, 90.4, 89.9, 89.1, 88.6, 87.9, 87.2, 86.8, 86.4];
const bars = [3, 4, 4, 5, 4, 5, 5];

const points = computed(() => {
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const span = max - min || 1;
  // Startgewicht oben, aktuelles Gewicht unten — die Kurve fällt sichtbar ab
  return weights.map((w, i) => ({
    x: 8 + (i / (weights.length - 1)) * 304,
    y: 12 + ((max - w) / span) * 86,
  }));
});
const linePath = computed(() =>
  points.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
);
const areaPath = computed(() => `${linePath.value} L312,108 L8,108 Z`);
const lastPoint = computed(() => points.value[points.value.length - 1]);
</script>

<style scoped>
.aw-kb {
  position: relative;
  z-index: 5;
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}

/* ── Teaser-Band ── */
.aw-kb-band {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.6rem 2.2rem;
  border-radius: 22px;
  overflow: hidden;
  background: linear-gradient(120deg, rgba(60,42,10,0.55), rgba(30,20,50,0.7) 60%);
  border: 1px solid rgba(244,208,104,0.4);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 20px 55px rgba(0,0,0,0.5), inset 0 0 50px rgba(212,175,55,0.08);
}
.aw-kb-band-glow {
  position: absolute; top: -80%; right: -5%; width: 45%; height: 260%;
  background: radial-gradient(ellipse, rgba(244,208,104,0.18) 0%, transparent 70%);
  transform: rotate(25deg); pointer-events: none;
}
.aw-kb-kicker {
  display: inline-block;
  font-size: 0.72rem; font-weight: 800; letter-spacing: 3.5px;
  color: #F4D068; text-shadow: 0 0 18px rgba(244,208,104,0.6);
  margin-bottom: 0.4rem;
}
.aw-kb-band-text h2 { color: #F8FAFC; font-size: 1.7rem; font-weight: 800; margin: 0 0 0.3rem; }
.aw-kb-band-text p { color: #D9CFE8; margin: 0; font-size: 0.98rem; }
.aw-kb-band-btn {
  flex-shrink: 0;
  display: inline-flex; align-items: center; gap: 0.6rem;
  padding: 1rem 1.8rem; border-radius: 14px;
  border: 1px solid rgba(244,208,104,0.6);
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  color: #1a1205; font-weight: 800; font-size: 1rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.55);
  transition: all 0.3s ease;
}
.aw-kb-band-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 40px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.55); }

/* ── Ausklappbares Panel ── */
.aw-kb-panel {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.aw-kb-expand-enter-active, .aw-kb-expand-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-kb-expand-enter-from, .aw-kb-expand-leave-to { opacity: 0; transform: translateY(-18px); }

/* Login-Karte */
.aw-kb-login {
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(244,208,104,0.35);
  border-top: 1px solid rgba(255,255,255,0.22);
  border-radius: 24px;
  padding: 2.2rem;
  box-shadow: 0 30px 70px rgba(0,0,0,0.55), inset 0 0 60px rgba(212,175,55,0.06);
}
.aw-kb-login-head { text-align: center; margin-bottom: 1.6rem; }
.aw-kb-lock {
  width: 52px; height: 52px; margin: 0 auto 0.9rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; color: #F4D068;
  background: linear-gradient(135deg, rgba(244,208,104,0.2), transparent);
  border: 1px solid rgba(244,208,104,0.45);
  box-shadow: 0 0 25px rgba(244,208,104,0.25);
}
.aw-kb-login-head h3 { color: #F8FAFC; font-size: 1.35rem; font-weight: 800; margin: 0 0 0.3rem; }
.aw-kb-login-head p { color: #D9CFE8; font-size: 0.88rem; margin: 0; }
.aw-kb-login form { display: flex; flex-direction: column; gap: 1rem; }
.aw-kb-login label {
  display: flex; flex-direction: column; gap: 0.4rem;
  color: #D9CFE8; font-size: 0.8rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
}
.aw-kb-login input {
  padding: 0.9rem 1.1rem; border-radius: 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255,255,255,0.15);
  color: #F8FAFC; font-size: 1rem; font-family: inherit;
  transition: all 0.3s ease; outline: none;
}
.aw-kb-login input:focus { border-color: rgba(244,208,104,0.7); box-shadow: 0 0 0 3px rgba(244,208,104,0.15); }
.aw-kb-login input::placeholder { color: rgba(217,207,232,0.4); }
.aw-kb-login-btn {
  position: relative; overflow: hidden;
  margin-top: 0.4rem; padding: 1rem; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  color: #1a1205; font-weight: 800; font-size: 1.05rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.55);
  transition: all 0.3s ease;
}
.aw-kb-login-btn:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.55); }
.aw-kb-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
  transform: skewX(-20deg); animation: awKbGlare 4.5s infinite;
}
@keyframes awKbGlare { 0%, 55% { left: -100%; } 100% { left: 200%; } }
.aw-kb-hint {
  margin: 0; padding: 0.8rem 1rem; border-radius: 10px;
  background: rgba(142,245,210,0.08); border: 1px solid rgba(142,245,210,0.3);
  color: #8EF5D2; font-size: 0.85rem; line-height: 1.5;
}
.aw-kb-note { color: rgba(217,207,232,0.6); font-size: 0.78rem; line-height: 1.5; margin: 0; text-align: center; }

/* Dashboard-Vorschau */
.aw-kb-dash {
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 30px 70px rgba(0,0,0,0.55), inset 0 0 70px rgba(79,70,229,0.08);
  display: flex; flex-direction: column; gap: 1.2rem;
}
.aw-kb-dash-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.aw-kb-dash-hello { color: #D9CFE8; font-size: 0.85rem; }
.aw-kb-dash-top h3 { color: #F8FAFC; font-size: 1.5rem; font-weight: 800; margin: 0.2rem 0 0; }
.aw-kb-demo-pill {
  padding: 5px 14px; border-radius: 20px; flex-shrink: 0;
  background: #7C3AED; color: #fff; font-size: 0.72rem; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  box-shadow: 0 0 16px rgba(124,58,237,0.5);
}

.aw-kb-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
.aw-kb-kpi {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.13);
  border-radius: 16px; padding: 1.1rem 1.2rem;
  display: flex; flex-direction: column; gap: 0.3rem;
  transition: all 0.3s ease;
}
.aw-kb-kpi:hover { border-color: rgba(142,245,210,0.4); background: rgba(142,245,210,0.05); transform: translateY(-2px); }
.aw-kb-kpi-label { color: #D9CFE8; font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
.aw-kb-kpi-value { color: #F8FAFC; font-size: 1.7rem; font-weight: 800; }
.aw-kb-kpi-value em { font-style: normal; font-size: 0.9rem; color: #D9CFE8; }
.aw-kb-kpi-trend { font-size: 0.75rem; font-weight: 700; }
.aw-kb-kpi-trend.down { color: #8EF5D2; text-shadow: 0 0 12px rgba(142,245,210,0.5); }
.aw-kb-kpi-trend.up { color: #8EF5D2; text-shadow: 0 0 12px rgba(142,245,210,0.5); }

.aw-kb-chart-card, .aw-kb-bars-card {
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; padding: 1.2rem 1.4rem;
}
.aw-kb-chart-head {
  display: flex; align-items: center; justify-content: space-between;
  color: #D9CFE8; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 0.9rem;
}
.aw-kb-chart-dot { width: 8px; height: 8px; border-radius: 50%; background: #8EF5D2; box-shadow: 0 0 10px #8EF5D2; animation: awKbPulse 2.2s infinite; }
@keyframes awKbPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }
.aw-kb-chart { width: 100%; height: 110px; display: block; }
.aw-kb-line { filter: drop-shadow(0 0 6px rgba(142,245,210,0.6)); }
.aw-kb-line-end { filter: drop-shadow(0 0 8px rgba(142,245,210,0.9)); }
.aw-kb-chart-axis {
  display: flex; justify-content: space-between; margin-top: 0.5rem;
  color: rgba(217,207,232,0.5); font-size: 0.7rem; letter-spacing: 1px;
}

.aw-kb-bars { display: flex; align-items: flex-end; gap: 0.7rem; height: 80px; }
.aw-kb-bar-col { flex: 1; height: 100%; display: flex; align-items: flex-end; }
.aw-kb-bar {
  width: 100%; border-radius: 6px 6px 3px 3px;
  background: linear-gradient(180deg, #7C3AED, #4F46E5);
  box-shadow: 0 0 14px rgba(124,58,237,0.35);
  min-height: 12%;
  animation: awKbBarIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
}
.aw-kb-bar-col:nth-child(2n) .aw-kb-bar { animation-delay: 0.1s; }
.aw-kb-bar-col:nth-child(3n) .aw-kb-bar { animation-delay: 0.2s; }
@keyframes awKbBarIn { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); transform-origin: bottom; } }

@media (max-width: 980px) {
  .aw-kb-band { flex-direction: column; align-items: flex-start; padding: 1.6rem; }
  .aw-kb-band-btn { width: 100%; justify-content: center; }
  .aw-kb-panel { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .aw-kb-kpis { grid-template-columns: 1fr; }
  .aw-kb-band-text h2 { font-size: 1.35rem; }
}
</style>
