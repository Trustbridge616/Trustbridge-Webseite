<template>
  <Transition name="slide-up">
    <div v-if="!accepted" class="cookie-banner">
      <div class="cookie-content">
        <div class="cookie-icon">🍪</div>
        <div class="cookie-text">
          <h3>Wir nutzen Cookies</h3>
          <p>Um dein Erlebnis auf Trustbridge zu verbessern, nutzen wir Cookies für Analysen und Marketing. Bist du einverstanden?</p>
        </div>
        <div class="cookie-actions">
          <button class="btn-text" @click="decline">Ablehnen</button>
          <button class="btn-accept" @click="accept">Akzeptieren</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const accepted = ref(true); // Start hidden to avoid flicker

onMounted(() => {
  const status = localStorage.getItem('cookie_consent');
  if (!status) {
    accepted.value = false;
  }
});

const accept = () => {
  localStorage.setItem('cookie_consent', 'accepted');
  accepted.value = true;
};

const decline = () => {
  localStorage.setItem('cookie_consent', 'declined');
  accepted.value = true;
};
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
}

/* Das Banner erscheint im ersten Moment des Besuchs, mitten in der
   dunklen Portalszene. Eine weisse Karte stand dort wie ein
   Fremdkoerper und beanspruchte den staerksten Kontrast der ganzen
   Seite fuer eine Formalie. Jetzt spricht es die Sprache der Szene:
   dunkler Grund, Goldkante, helle Schrift - und deutlich kompakter. */
.cookie-content {
  background: rgba(16, 8, 34, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 1.1rem 1.6rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(212, 175, 55, 0.35);
  display: flex;
  align-items: center;
  gap: 1.4rem;
  max-width: 720px;
  width: 100%;
}

.cookie-icon { font-size: 1.5rem; }

.cookie-text h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1rem;
  color: #F8FAFC;
  margin: 0 0 0.25rem 0;
}

.cookie-text p {
  font-size: 0.85rem;
  color: #94A3B8;
  margin: 0;
  line-height: 1.45;
}

.cookie-actions {
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
}

.btn-accept {
  background: linear-gradient(135deg, #D4AF37, #AA8222);
  color: #1a0a36;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-accept:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(212,175,55,0.3);
}

.btn-text {
  background: transparent;
  border: none;
  color: #94A3B8;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-text:hover { color: #F4D068; }

/* Animation */
.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

@media (max-width: 768px) {
  .cookie-banner { bottom: 1rem; left: 1rem; right: 1rem; }
  .cookie-content { flex-direction: column; text-align: center; gap: 1rem; padding: 1.5rem; }
  .cookie-actions { width: 100%; flex-direction: column-reverse; }
  .btn-accept { width: 100%; }
}
</style>
