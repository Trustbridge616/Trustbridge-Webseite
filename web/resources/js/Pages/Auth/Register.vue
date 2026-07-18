<template>
  <AppLayout>
    <div class="register-page">
      <!-- Hintergrund -->
      <div class="register-bg">
        <div class="bg-glow bg-glow-1"></div>
        <div class="bg-glow bg-glow-2"></div>
      </div>

      <div class="register-card animate-fade-in">
        <!-- Header -->
        <div class="register-header">
          <div class="crown-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#D4AF37"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
          </div>
          <h1>Konto erstellen</h1>
          <p>Tritt der Trustbridge Community bei</p>
        </div>

        <!-- Einladungs-Banner -->
        <div v-if="form.sponsor_id" class="invite-banner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Du wurdest von einem Freund eingeladen!
        </div>

        <!-- Formular -->
        <form @submit.prevent="submit" class="register-form">
          <div class="form-group">
            <label class="form-label">Vollständiger Name</label>
            <input type="text" v-model="form.name" class="form-input" placeholder="Max Mustermann" required />
            <div v-if="form.errors.name" class="form-error">{{ form.errors.name }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">E-Mail-Adresse</label>
            <input type="email" v-model="form.email" class="form-input" placeholder="max@beispiel.de" required />
            <div v-if="form.errors.email" class="form-error">{{ form.errors.email }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">Passwort</label>
            <input type="password" v-model="form.password" class="form-input" placeholder="Mindestens 8 Zeichen" required />
          </div>
          <div class="form-group">
            <label class="form-label">Passwort bestätigen</label>
            <input type="password" v-model="form.password_confirmation" class="form-input" placeholder="Passwort wiederholen" required />
            <div v-if="form.errors.password" class="form-error">{{ form.errors.password }}</div>
          </div>
          <button type="submit" class="btn-submit" :disabled="form.processing">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
            {{ form.processing ? 'Wird erstellt...' : 'Kostenlos registrieren' }}
          </button>
        </form>

        <div class="register-footer">
          <Link href="/login" class="login-link">Bereits einen Account? Zum Login</Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AppLayout from '../../Layouts/AppLayout.vue';

const props = defineProps({ sponsor_id: String });

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  sponsor_id: props.sponsor_id
});

const submit = () => { form.post('/register'); };
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 1.5rem 4rem;
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

.register-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.bg-glow-1 {
  width: 500px; height: 500px;
  background: rgba(142, 245, 210, 0.15);
  top: -100px; right: -100px;
}

.bg-glow-2 {
  width: 400px; height: 400px;
  background: rgba(212, 175, 55, 0.1);
  bottom: -100px; left: -100px;
}

.register-card {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(135deg, rgba(45, 20, 80, 0.65) 0%, rgba(20, 10, 40, 0.85) 100%);
  backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.3);
  border-left: 1px solid rgba(255,255,255,0.25);
  border-radius: 28px;
  padding: 3rem 2.5rem;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.crown-icon {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
  border: 1px solid rgba(212,175,55,0.3);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 15px rgba(212,175,55,0.2);
}

.register-header h1 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.register-header p {
  color: #C4B8D8;
  font-size: 1rem;
  margin: 0;
}

.invite-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(142, 245, 210, 0.1);
  border: 1px solid rgba(142, 245, 210, 0.4);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 1.5rem;
  color: #8EF5D2;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(142,245,210,0.15);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: #D9CFE8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  background: rgba(10, 5, 20, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #FFFFFF;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
}

.form-input:focus {
  outline: none;
  border-color: #8EF5D2;
  box-shadow: 0 0 0 3px rgba(142, 245, 210, 0.15), inset 0 2px 5px rgba(0,0,0,0.5);
  background: rgba(10, 5, 20, 0.8);
}

.form-input::placeholder {
  color: #7a6a9e;
}

.form-error {
  color: #fca5a5;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}

.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, #8EF5D2 0%, #5CE1C6 100%);
  color: #1a0b36;
  border: 2px solid rgba(212,175,55,0.3);
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(142, 245, 210, 0.3), inset 0 2px 5px rgba(255,255,255,0.5);
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(142, 245, 210, 0.5), 0 0 20px rgba(212,175,55,0.3), inset 0 2px 10px rgba(255,255,255,0.8);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-footer {
  text-align: center;
  margin-top: 2rem;
}

.login-link {
  color: #8EF5D2;
  font-size: 0.95rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-link:hover {
  color: #FFFFFF;
  text-shadow: 0 0 15px rgba(142,245,210,0.6);
}
</style>
