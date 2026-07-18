<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-glow bg-glow-1"></div>
      <div class="bg-glow bg-glow-2"></div>
    </div>

    <div class="login-card animate-fade-in">
      <div class="login-header">
        <Link href="/">
          <div class="crown-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#D4AF37"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
          </div>
        </Link>
        <h1>Willkommen zurück</h1>
        <p>Melde dich in deinem Trustbridge-Konto an</p>
      </div>

      <div v-if="flash?.error" class="error-banner">
        {{ flash.error }}
      </div>

      <form @submit.prevent="submit" class="login-form">
        <div class="form-group">
          <label class="form-label">E-Mail-Adresse</label>
          <input type="email" v-model="form.email" class="form-input" placeholder="max@beispiel.de" required autofocus />
          <div v-if="form.errors.email" class="form-error">{{ form.errors.email }}</div>
        </div>
        <div class="form-group">
          <label class="form-label">Passwort</label>
          <div class="input-wrapper">
            <input :type="showPw ? 'text' : 'password'" v-model="form.password" class="form-input" placeholder="Dein Passwort" required />
            <button type="button" class="pw-toggle" @click="showPw = !showPw">
              <svg v-if="!showPw" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            </button>
          </div>
          <div v-if="form.errors.password" class="form-error">{{ form.errors.password }}</div>
        </div>

        <label class="remember-label">
          <input type="checkbox" v-model="form.remember" />
          <span>Angemeldet bleiben</span>
        </label>

        <button type="submit" class="btn-submit" :disabled="form.processing">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
          {{ form.processing ? 'Wird angemeldet...' : 'Jetzt anmelden' }}
        </button>
      </form>

      <div class="login-footer">
        <Link href="/register" class="register-link">Noch kein Konto? Jetzt registrieren</Link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';

const showPw = ref(false);
const page = usePage();
const flash = page.props.flash;

const form = useForm({
  email: '',
  password: '',
  remember: false,
});

const submit = () => {
  form.post('/login');
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(-45deg, #4a2685, #29155c, #1a0b36, #37176b);
  background-size: 400% 400%;
  animation: bg-shift 20s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes bg-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.login-bg { position: absolute; inset: 0; pointer-events: none; }
.bg-glow { position: absolute; border-radius: 50%; filter: blur(80px); }
.bg-glow-1 { width: 500px; height: 500px; background: rgba(142,245,210,0.15); top: -100px; right: -100px; }
.bg-glow-2 { width: 400px; height: 400px; background: rgba(212,175,55,0.1); bottom: -100px; left: -100px; }

.login-card {
  width: 100%; max-width: 440px;
  background: linear-gradient(135deg, rgba(45, 20, 80, 0.65) 0%, rgba(20, 10, 40, 0.85) 100%);
  backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.3);
  border-left: 1px solid rgba(255,255,255,0.25);
  border-radius: 28px;
  padding: 3rem 2.5rem;
  box-shadow: 0 40px 80px rgba(0,0,0,0.7), inset 0 0 40px rgba(255,255,255,0.05);
  position: relative; z-index: 1;
}

.login-header { text-align: center; margin-bottom: 2rem; }
.crown-icon {
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
  border: 1px solid rgba(212,175,55,0.3);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 15px rgba(212,175,55,0.2);
}
.login-header h1 { 
  font-family: 'Century Gothic', system-ui, sans-serif; 
  color: #FFFFFF; 
  font-size: 2rem; 
  font-weight: 800;
  margin-bottom: 0.5rem; 
  text-shadow: 0 2px 10px rgba(0,0,0,0.5); 
}
.login-header p { color: #C4B8D8; font-size: 1rem; margin: 0; }

.error-banner { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); border-radius: 12px; padding: 0.85rem 1rem; color: #fca5a5; font-size: 0.95rem; margin-bottom: 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(239,68,68,0.2); }

.login-form { display: flex; flex-direction: column; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-size: 0.88rem; font-weight: 700; color: #D9CFE8; text-transform: uppercase; letter-spacing: 0.5px; }

.input-wrapper { position: relative; }
.form-input { 
  width: 100%; padding: 0.9rem 1.2rem; 
  background: rgba(10, 5, 20, 0.5); 
  border: 1px solid rgba(255,255,255,0.1); 
  border-radius: 12px; font-size: 1rem; 
  font-family: 'Century Gothic', system-ui, sans-serif; 
  color: #FFFFFF; 
  transition: all 0.3s ease; box-sizing: border-box; 
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
}
.input-wrapper .form-input { padding-right: 3rem; }
.form-input:focus { outline: none; border-color: #8EF5D2; box-shadow: 0 0 0 3px rgba(142,245,210,0.15), inset 0 2px 5px rgba(0,0,0,0.5); background: rgba(10, 5, 20, 0.8); }
.form-input::placeholder { color: #7a6a9e; }

.pw-toggle { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: #7a6a9e; cursor: pointer; padding: 0; display: flex; transition: color 0.3s; }
.pw-toggle:hover { color: #FFFFFF; }
.form-error { color: #fca5a5; font-size: 0.85rem; margin-top: 0.2rem; }

.remember-label { display: flex; align-items: center; gap: 0.6rem; font-size: 0.95rem; color: #C4B8D8; cursor: pointer; margin-top: -0.25rem; transition: color 0.3s; }
.remember-label:hover { color: #FFFFFF; }
.remember-label input { accent-color: #8EF5D2; width: 16px; height: 16px; cursor: pointer; }

.btn-submit { 
  display: flex; align-items: center; justify-content: center; gap: 0.6rem; 
  width: 100%; padding: 1.1rem; 
  background: linear-gradient(135deg, #8EF5D2 0%, #5CE1C6 100%); 
  color: #1a0b36; 
  border: 2px solid rgba(212,175,55,0.3); 
  border-radius: 50px; font-weight: 800; font-size: 1.1rem; 
  font-family: 'Century Gothic', system-ui, sans-serif; 
  text-transform: uppercase; letter-spacing: 1px;
  cursor: pointer; transition: all 0.3s ease; 
  box-shadow: 0 10px 30px rgba(142,245,210,0.3), inset 0 2px 5px rgba(255,255,255,0.5); 
  margin-top: 0.5rem; 
}
.btn-submit:hover:not(:disabled) { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 40px rgba(142,245,210,0.5), 0 0 20px rgba(212,175,55,0.3), inset 0 2px 10px rgba(255,255,255,0.8); }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.login-footer { text-align: center; margin-top: 2rem; }
.register-link { color: #8EF5D2; font-size: 0.95rem; text-decoration: none; font-weight: 600; transition: all 0.3s; }
.register-link:hover { color: #FFFFFF; text-shadow: 0 0 15px rgba(142,245,210,0.6); }
</style>
