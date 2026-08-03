<template>
  <Head>
    <title>Kunden-Login – Alexander Tischler Coaching</title>
    <meta name="robots" content="noindex, nofollow" />
  </Head>

  <div class="at-login-page">
    <div class="at-login-bg" aria-hidden="true">
      <div class="at-login-glow g1"></div>
      <div class="at-login-glow g2"></div>
    </div>

    <div class="at-login-card">
      <Link href="/alextischler.de" class="at-login-back">← Zurück zur Webseite</Link>

      <div class="at-login-head">
        <span class="at-login-mark">AT</span>
        <h1>Kundenbereich</h1>
        <p>Dein persönlicher Coaching-Bereich bei Alexander Tischler</p>
      </div>

      <form @submit.prevent="login">
        <label>
          E-Mail
          <input v-model="email" type="email" placeholder="dein.name@mail.de" autocomplete="email" required />
        </label>
        <label>
          Passwort
          <input v-model="password" type="password" placeholder="••••••••" autocomplete="current-password" required />
        </label>

        <p v-if="error" class="at-login-error">{{ error }}</p>

        <button type="submit" class="at-login-btn">
          <span class="at-login-glare" aria-hidden="true"></span>
          Einloggen
        </button>
      </form>

      <div class="at-login-demo">
        <strong>🔑 Demo-Zugang (Testdaten)</strong>
        <span>E-Mail: <code>demo@alextischler.de</code></span>
        <span>Passwort: <code>coach2026</code></span>
      </div>

      <p class="at-login-note">
        Noch kein Zugang? Deinen persönlichen Login erhältst du mit deinem Coaching-Start —
        <Link href="/alextischler.de">starte mit der kostenlosen Analyse</Link>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';

const email = ref('');
const password = ref('');
const error = ref('');

const login = () => {
  if (email.value.trim().toLowerCase() === 'demo@alextischler.de' && password.value === 'coach2026') {
    sessionStorage.setItem('at-demo-auth', '1');
    router.visit('/alextischler.de/dashboard');
  } else {
    error.value = 'E-Mail oder Passwort stimmen nicht. Tipp: Nutze den Demo-Zugang unten.';
  }
};
</script>

<style scoped>
.at-login-page {
  position: relative;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #1E0B3B 0%, #0F172A 45%, #0B1115 100%);
  font-family: 'Century Gothic', system-ui, sans-serif;
  padding: 2rem 1.2rem;
  overflow: hidden;
}
.at-login-bg { position: absolute; inset: 0; pointer-events: none; }
.at-login-glow { position: absolute; border-radius: 50%; filter: blur(140px); }
.g1 { top: -15%; left: -10%; width: 50vw; height: 50vw; background: rgba(79,70,229,0.18); }
.g2 { bottom: -20%; right: -10%; width: 40vw; height: 40vw; background: rgba(142,245,210,0.08); }

.at-login-card {
  position: relative; z-index: 2;
  width: 100%; max-width: 440px;
  background: rgba(30, 20, 50, 0.75);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(244,208,104,0.35);
  border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 26px;
  padding: 2.6rem;
  box-shadow: 0 40px 90px rgba(0,0,0,0.7), inset 0 0 60px rgba(212,175,55,0.05);
}
.at-login-back {
  display: inline-block;
  color: rgba(217,207,232,0.7); font-size: 0.85rem; text-decoration: none;
  margin-bottom: 1.6rem; transition: color 0.3s ease;
}
.at-login-back:hover { color: #8EF5D2; }

.at-login-head { text-align: center; margin-bottom: 1.8rem; }
.at-login-mark {
  display: inline-flex; align-items: center; justify-content: center;
  width: 58px; height: 58px; border-radius: 16px;
  font-weight: 800; font-size: 1.3rem; color: #1a1205;
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  box-shadow: 0 0 30px rgba(212,175,55,0.4), inset 0 2px 0 rgba(255,255,255,0.5);
  margin-bottom: 1rem;
}
.at-login-head h1 { color: #F8FAFC; font-size: 1.7rem; font-weight: 800; margin: 0 0 0.4rem; }
.at-login-head p { color: #D9CFE8; font-size: 0.92rem; margin: 0; }

form { display: flex; flex-direction: column; gap: 1rem; }
label {
  display: flex; flex-direction: column; gap: 0.4rem;
  color: #D9CFE8; font-size: 0.78rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
}
input {
  padding: 0.95rem 1.1rem; border-radius: 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255,255,255,0.15);
  color: #F8FAFC; font-size: 1rem; font-family: inherit;
  transition: all 0.3s ease; outline: none;
}
input:focus { border-color: rgba(244,208,104,0.7); box-shadow: 0 0 0 3px rgba(244,208,104,0.15); }
input::placeholder { color: rgba(217,207,232,0.4); }

.at-login-error {
  margin: 0; padding: 0.8rem 1rem; border-radius: 10px;
  background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.4);
  color: #fca5a5; font-size: 0.85rem; line-height: 1.5;
}

.at-login-btn {
  position: relative; overflow: hidden;
  margin-top: 0.4rem; padding: 1.05rem; border-radius: 14px; border: none;
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  color: #1a1205; font-weight: 800; font-size: 1.08rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.55);
  transition: all 0.3s ease;
}
.at-login-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.55); }
.at-login-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
  transform: skewX(-20deg); animation: atLoginGlare 4.5s infinite;
}
@keyframes atLoginGlare { 0%, 55% { left: -100%; } 100% { left: 200%; } }

.at-login-demo {
  margin-top: 1.5rem;
  padding: 1rem 1.2rem; border-radius: 14px;
  background: rgba(142,245,210,0.06);
  border: 1px dashed rgba(142,245,210,0.4);
  display: flex; flex-direction: column; gap: 0.3rem;
  color: #D9CFE8; font-size: 0.85rem;
}
.at-login-demo strong { color: #8EF5D2; font-size: 0.88rem; }
.at-login-demo code {
  background: rgba(15,23,42,0.7); padding: 2px 8px; border-radius: 6px;
  color: #F8FAFC; font-size: 0.82rem;
}

.at-login-note {
  margin: 1.4rem 0 0; text-align: center;
  color: rgba(217,207,232,0.65); font-size: 0.8rem; line-height: 1.6;
}
.at-login-note a { color: #8EF5D2; text-decoration: none; }
.at-login-note a:hover { text-decoration: underline; }
</style>
