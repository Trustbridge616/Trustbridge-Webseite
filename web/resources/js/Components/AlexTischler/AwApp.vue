<template>
  <section class="aw-app">
    <div class="aw-app-stage" v-reveal>
      <div class="aw-app-glow" aria-hidden="true"></div>

      <div class="aw-app-copy">
        <span class="aw-sec-tag">DEINE COACHING-APP</span>
        <h2>Dein Coaching. Immer in der Hosentasche.</h2>
        <p>
          Trainingspläne, Ernährungs-Tracking, Check-ins und der direkte Draht zu
          deinem Coach — alles in einer App. Du siehst jeden Fortschritt schwarz
          auf weiß und weißt jeden Tag, was zu tun ist.
        </p>
        <ul class="aw-app-features">
          <li><span aria-hidden="true">📋</span> Workouts mit Videos & klaren Vorgaben</li>
          <li><span aria-hidden="true">📈</span> Fortschritts-Graphen & wöchentliche Check-ins</li>
          <li><span aria-hidden="true">💬</span> Direkter Chat mit deinem Coach</li>
          <li><span aria-hidden="true">🥗</span> Ernährungs-Feedback zu deinen Check-ins — ohne Kalorien-Stress</li>
        </ul>

        <div class="aw-app-tool-tip">
          <strong>Tracking-Tipp:</strong> Fürs Ernährungs-Tracking empfehle ich das
          kostenlose Tool MyFitnessPal — deine Einträge besprechen wir dann gemeinsam im Check-in.
          <span class="aw-app-tool-links">
            <a href="https://apps.apple.com/de/app/myfitnesspal-calorie-counter/id341232718" target="_blank" rel="noopener">MyFitnessPal für iOS</a>
            <a href="https://play.google.com/store/apps/details?id=com.myfitnesspal.android" target="_blank" rel="noopener">MyFitnessPal für Android</a>
          </span>
        </div>
        <div class="aw-app-badges">
          <div class="aw-store-badge" aria-label="Verfügbar für iPhone — Zugang mit Coaching-Start">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z"/></svg>
            <span><em>Verfügbar für</em><strong>iPhone</strong></span>
          </div>
          <div class="aw-store-badge" aria-label="Verfügbar für Android — Zugang mit Coaching-Start">
            <svg width="20" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.2 13.7 12 3.6 21.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Zm11.5 8.4L5.9 1.4l10.6 6.1-1.4 3.1Zm1.9 4.3-2-1.9 2-1.9 3.2 1.8c.7.4.7 1.4 0 1.8l-3.2 1.8v-.1l.1-1.5h-.1Zm-11.1 6.7 9.2-9.2 1.4 3.1L5.9 21.6Z"/></svg>
            <span><em>Verfügbar für</em><strong>Android</strong></span>
          </div>
        </div>
        <p class="aw-app-note">Deinen persönlichen App-Zugang erhältst du mit dem Coaching-Start.</p>
      </div>

      <div class="aw-app-visual">
        <!-- QR-Code bewusst ausgeblendet: erst wieder einbauen, wenn ein echter
             Deep-Link/QR für Kunden existiert — Platzhalter-QRs wirken unseriös. -->

        <!-- Phone-Mockup -->
        <div class="aw-phone">
          <div class="aw-phone-notch" aria-hidden="true"></div>
          <div class="aw-phone-screen">
            <div class="aw-phone-header">
              <span class="aw-phone-hello">Hey Max 👋</span>
              <span class="aw-phone-day">Tag 47 deines Plans</span>
            </div>
            <div class="aw-phone-card">
              <span class="aw-phone-card-label">HEUTE</span>
              <strong>Oberkörper — Push</strong>
              <span class="aw-phone-card-sub">6 Übungen · ca. 45 Min</span>
              <div class="aw-phone-progress"><span style="width: 66%"></span></div>
            </div>
            <div class="aw-phone-row">
              <div class="aw-phone-tile"><strong>2.140</strong><span>kcal heute</span></div>
              <div class="aw-phone-tile"><strong>148 g</strong><span>Protein</span></div>
            </div>
            <div class="aw-phone-chat">
              <span class="aw-phone-chat-dot"></span>
              Neues Feedback von Alex zu deinem Check-in
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { vReveal } from './useReveal';
</script>

<style scoped>
.aw-app {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-app-stage {
  position: relative; overflow: hidden;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 3rem;
  align-items: center;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 36px;
  padding: 3.5rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.7), inset 0 0 80px rgba(79,70,229,0.08);
}
.aw-app-glow {
  position: absolute; top: -40%; right: -10%; width: 55%; height: 180%;
  background: radial-gradient(ellipse, rgba(79,70,229,0.18) 0%, transparent 70%);
  pointer-events: none;
}
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-app-copy { position: relative; }
.aw-app-copy h2 { color: #F8FAFC; font-size: 2.3rem; font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.aw-app-copy > p { color: #D9CFE8; font-size: 1.05rem; line-height: 1.65; margin: 0 0 1.5rem; }

.aw-app-features { list-style: none; padding: 0; margin: 0 0 1.8rem; display: flex; flex-direction: column; gap: 0.7rem; }
.aw-app-features li { display: flex; align-items: center; gap: 0.8rem; color: #F8FAFC; font-size: 0.98rem; font-weight: 600; }
.aw-app-features li span { font-size: 1.25rem; filter: drop-shadow(0 0 12px rgba(142,245,210,0.4)); }

.aw-app-badges { display: flex; gap: 0.9rem; flex-wrap: wrap; }
.aw-store-badge {
  display: inline-flex; align-items: center; gap: 0.7rem;
  padding: 0.7rem 1.3rem; border-radius: 14px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255,255,255,0.22);
  color: #F8FAFC;
}
.aw-store-badge span { display: flex; flex-direction: column; line-height: 1.15; }
.aw-store-badge em { font-style: normal; font-size: 0.62rem; color: #D9CFE8; letter-spacing: 0.5px; }
.aw-store-badge strong { font-size: 0.98rem; font-weight: 800; }
.aw-app-note { color: rgba(217,207,232,0.6); font-size: 0.8rem; margin: 1rem 0 0; }

/* Visual: Phone */
.aw-app-visual {
  position: relative;
  display: flex; align-items: center; justify-content: center; gap: 1.8rem;
}

.aw-app-tool-tip {
  margin: 1.5rem 0 0;
  padding: 1.1rem 1.3rem;
  border-radius: 15px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255,255,255,0.13);
  color: #D9CFE8;
  font-size: 0.9rem;
  line-height: 1.6;
}
.aw-app-tool-tip strong { color: #8EF5D2; }
.aw-app-tool-links { display: flex; gap: 1.2rem; margin-top: 0.5rem; flex-wrap: wrap; }
.aw-app-tool-links a {
  color: #F8FAFC; font-weight: 700; font-size: 0.85rem;
  text-decoration: underline; text-underline-offset: 3px;
  transition: color 0.3s ease;
}
.aw-app-tool-links a:hover { color: #8EF5D2; }

.aw-phone {
  position: relative;
  width: 230px; flex-shrink: 0;
  background: #0B1115;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 30px;
  padding: 10px;
  box-shadow: 0 35px 75px rgba(0,0,0,0.65), 0 0 45px rgba(79,70,229,0.18);
  transform: rotate(4deg);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-phone:hover { transform: rotate(0deg) scale(1.02); }
.aw-phone-notch {
  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  width: 78px; height: 18px; border-radius: 0 0 12px 12px;
  background: #0B1115; z-index: 3;
}
.aw-phone-screen {
  border-radius: 22px; overflow: hidden;
  background: linear-gradient(170deg, #1E0B3B, #0F172A 65%);
  padding: 2rem 0.9rem 1rem;
  display: flex; flex-direction: column; gap: 0.7rem;
}
.aw-phone-header { display: flex; flex-direction: column; gap: 0.1rem; }
.aw-phone-hello { color: #F8FAFC; font-weight: 800; font-size: 0.95rem; }
.aw-phone-day { color: #D9CFE8; font-size: 0.68rem; }
.aw-phone-card {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(142,245,210,0.35);
  border-radius: 14px; padding: 0.8rem;
  display: flex; flex-direction: column; gap: 0.25rem;
  box-shadow: 0 0 22px rgba(142,245,210,0.1);
}
.aw-phone-card-label { color: #8EF5D2; font-size: 0.58rem; font-weight: 800; letter-spacing: 2px; }
.aw-phone-card strong { color: #F8FAFC; font-size: 0.85rem; }
.aw-phone-card-sub { color: #D9CFE8; font-size: 0.65rem; }
.aw-phone-progress {
  height: 5px; border-radius: 4px; background: rgba(255,255,255,0.1); margin-top: 0.35rem; overflow: hidden;
}
.aw-phone-progress span {
  display: block; height: 100%; border-radius: 4px;
  background: linear-gradient(90deg, #4F46E5, #8EF5D2);
  box-shadow: 0 0 10px rgba(142,245,210,0.6);
}
.aw-phone-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.aw-phone-tile {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px; padding: 0.6rem;
  display: flex; flex-direction: column; gap: 0.1rem;
}
.aw-phone-tile strong { color: #F8FAFC; font-size: 0.85rem; }
.aw-phone-tile span { color: #D9CFE8; font-size: 0.6rem; }
.aw-phone-chat {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(124,58,237,0.16);
  border: 1px solid rgba(124,58,237,0.45);
  border-radius: 12px; padding: 0.6rem 0.7rem;
  color: #F8FAFC; font-size: 0.62rem; line-height: 1.35;
}
.aw-phone-chat-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  background: #8EF5D2; box-shadow: 0 0 8px #8EF5D2;
  animation: awChatPulse 2s infinite;
}
@keyframes awChatPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.5); } }

@media (max-width: 1024px) {
  .aw-app-stage { grid-template-columns: 1fr; padding: 2.5rem 1.8rem; }
  .aw-app-visual { flex-wrap: wrap; }
}
@media (max-width: 560px) {
  .aw-app-copy h2 { font-size: 1.8rem; }
  .aw-store-badge { flex: 1; justify-content: center; }
}
</style>
