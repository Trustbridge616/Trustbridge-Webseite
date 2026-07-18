<template>
  <AppLayout>
    <div class="page-hero">
      <div class="page-hero-inner">
        <span class="page-label">Kontakt</span>
        <h1>Wie können wir dir helfen?</h1>
        <p>Sag uns kurz, worum es geht — wir leiten dich direkt zum richtigen Ansprechpartner.</p>
      </div>
    </div>

    <div class="page-content">
      <div class="container">

        <!-- Funnel: Thema wählen -->
        <section v-if="step === 0" class="funnel-section">
          <h2 class="funnel-title">Was ist dein Anliegen?</h2>
          <div class="topic-grid">
            <button class="topic-card" v-for="t in topics" :key="t.id" @click="selectTopic(t)">
              <div class="topic-icon" v-html="t.icon"></div>
              <strong>{{ t.label }}</strong>
              <span>{{ t.sub }}</span>
            </button>
          </div>
        </section>

        <!-- Funnel: Info oder Formular -->
        <section v-if="step === 1" class="funnel-section">
          <button class="back-btn" @click="step = 0">← Zurück</button>

          <!-- Schnell-Antwort für FAQ-Themen -->
          <div v-if="selectedTopic.quickAnswer" class="quick-answer">
            <div class="qa-icon" v-html="selectedTopic.icon"></div>
            <h2>{{ selectedTopic.label }}</h2>
            <p>{{ selectedTopic.quickAnswer }}</p>
            <div class="qa-actions">
              <Link href="/faq" class="btn-secondary">Alle FAQs ansehen</Link>
              <button class="btn-gold-sm" @click="selectedTopic = { ...selectedTopic, quickAnswer: null }">Trotzdem schreiben</button>
            </div>
          </div>

          <!-- Kontaktformular -->
          <div v-else class="contact-form-wrap">
            <div class="form-header">
              <div class="form-topic-badge">
                <span v-html="selectedTopic.icon"></span>
                {{ selectedTopic.label }}
              </div>
              <h2>Deine Nachricht</h2>
            </div>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-row">
                <div class="form-group">
                  <label>Dein Name</label>
                  <input type="text" v-model="contactForm.name" placeholder="Max Mustermann" required />
                </div>
                <div class="form-group">
                  <label>E-Mail</label>
                  <input type="email" v-model="contactForm.email" placeholder="max@beispiel.de" required />
                </div>
              </div>
              <div class="form-group" v-if="selectedTopic.id === 'order'">
                <label>Bestellnummer (optional)</label>
                <input type="text" v-model="contactForm.orderId" placeholder="z. B. TBR-2024-0001" />
              </div>
              <div class="form-group">
                <label>Deine Nachricht</label>
                <textarea v-model="contactForm.message" rows="5" placeholder="Beschreibe dein Anliegen..." required></textarea>
              </div>
              <button type="submit" class="btn-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Nachricht senden
              </button>
            </form>
          </div>
        </section>

        <!-- Erfolg -->
        <section v-if="step === 2" class="funnel-section success-section">
          <div class="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2>Nachricht gesendet!</h2>
          <p>Wir melden uns innerhalb von 24–48 Stunden bei dir. Danke für deine Geduld!</p>
          <Link href="/" class="btn-gold-outline">Zurück zur Startseite</Link>
        </section>

      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';

const step = ref(0);
const selectedTopic = ref(null);

const contactForm = reactive({ name: '', email: '', orderId: '', message: '' });

const topics = [
  {
    id: 'order',
    label: 'Bestellung / Versand',
    sub: 'Status, Lieferung, Tracking',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    quickAnswer: null,
  },
  {
    id: 'abo',
    label: 'Abo / Kündigung',
    sub: 'Laufzeit, kündigen, ändern',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    quickAnswer: 'Abonnements können nach der Mindestlaufzeit (1, 3 oder 6 Monate) jederzeit über das Dashboard gekündigt werden. Das Abo läuft bis zum Ende des Abrechnungszeitraums.',
  },
  {
    id: 'rueckgabe',
    label: 'Rückgabe / Garantie',
    sub: 'Defekte Ware, Reklamation',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    quickAnswer: 'Wir übernehmen keine Gewährleistung oder Garantie auf Pakete. Retouren-Ware kann B-Ware, gebrauchte oder defekte Artikel enthalten — das ist ausdrücklich Teil des Konzepts. Eine Rückgabe ist ausgeschlossen. Bei schwerwiegenden Einzelfällen kannst du uns dennoch kontaktieren.',
  },
  {
    id: 'partner',
    label: 'Partnerprogramm',
    sub: 'Empfehlungslink, Prämien',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="#D4AF37"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>',
    quickAnswer: 'Dein persönlicher Empfehlungslink findest du nach der Anmeldung in deinem Dashboard. Für jede erfolgreiche Anmeldung erhältst du ein Gratis-Paket — automatisch und ohne Limit.',
  },
  {
    id: 'zahlung',
    label: 'Zahlung / Rechnung',
    sub: 'Bezahlen, Rechnungen, Stripe',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    quickAnswer: null,
  },
  {
    id: 'sonstiges',
    label: 'Sonstiges',
    sub: 'Anderes Anliegen',
    icon: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    quickAnswer: null,
  },
];

const selectTopic = (t) => {
  selectedTopic.value = { ...t };
  step.value = 1;
};

const submitForm = () => {
  // TODO: Backend-Anfrage
  step.value = 2;
};
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #1a0a36, #2D1B54, #4a238a); padding: 10rem 2rem 5rem; text-align: center; }
.page-hero-inner { max-width: 700px; margin: 0 auto; }
.page-label { display: inline-block; background: rgba(212,175,55,0.15); color: #D4AF37; border: 1px solid rgba(212,175,55,0.4); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem; }
.page-hero h1 { font-family: 'Century Gothic', system-ui, sans-serif; font-size: 3rem; color: white; margin-bottom: 1rem; background: none; -webkit-text-fill-color: white; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.2rem; margin: 0; }
.page-content { background: #f8f6ff; padding: 5rem 2rem 6rem; min-height: 60vh; }
.funnel-section { max-width: 900px; margin: 0 auto; }
.funnel-title { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.8rem; text-align: center; margin-bottom: 2.5rem; background: none; -webkit-text-fill-color: #2D1B54; }
.topic-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.topic-card { background: white; border: 2px solid rgba(212,175,55,0.15); border-radius: 20px; padding: 2rem 1.5rem; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.topic-card:hover { border-color: #D4AF37; transform: translateY(-4px); box-shadow: 0 12px 35px rgba(45,27,84,0.12); }
.topic-icon { width: 56px; height: 56px; border-radius: 50%; background: #f0ecfa; border: 2px solid rgba(212,175,55,0.2); display: flex; align-items: center; justify-content: center; }
.topic-card strong { color: #2D1B54; font-size: 1rem; }
.topic-card span { color: #6b5b95; font-size: 0.85rem; }
.back-btn { background: none; border: none; color: #6b5b95; cursor: pointer; font-size: 0.95rem; margin-bottom: 2rem; padding: 0; font-family: inherit; display: flex; align-items: center; gap: 0.3rem; transition: color 0.2s; }
.back-btn:hover { color: #2D1B54; }
.quick-answer { background: white; border-radius: 20px; padding: 3rem; text-align: center; box-shadow: 0 8px 30px rgba(45,27,84,0.08); border: 1px solid rgba(212,175,55,0.2); max-width: 700px; margin: 0 auto; }
.qa-icon { margin-bottom: 1.5rem; display: flex; justify-content: center; }
.quick-answer h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.5rem; margin-bottom: 1rem; background: none; -webkit-text-fill-color: #2D1B54; }
.quick-answer p { color: #6b5b95; line-height: 1.8; font-size: 1rem; margin-bottom: 2rem; }
.qa-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-secondary { display: inline-block; background: #f0ecfa; color: #2D1B54; padding: 0.8rem 2rem; border-radius: 50px; font-weight: bold; text-decoration: none; transition: all 0.3s ease; font-size: 0.95rem; }
.btn-secondary:hover { background: #e0d8f5; }
.btn-gold-sm { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 0.8rem 2rem; border-radius: 50px; font-weight: bold; border: none; cursor: pointer; font-size: 0.95rem; font-family: inherit; transition: all 0.3s ease; }
.btn-gold-sm:hover { transform: translateY(-1px); }
.contact-form-wrap { max-width: 700px; margin: 0 auto; }
.form-header { margin-bottom: 2rem; }
.form-topic-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(212,175,55,0.12); color: #D4AF37; border: 1px solid rgba(212,175,55,0.3); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: bold; margin-bottom: 1rem; }
.form-header h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.8rem; background: none; -webkit-text-fill-color: #2D1B54; }
.contact-form { background: white; border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 30px rgba(45,27,84,0.08); border: 1px solid rgba(212,175,55,0.15); display: flex; flex-direction: column; gap: 1.25rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label { font-size: 0.85rem; font-weight: 700; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; }
.form-group input, .form-group textarea { padding: 0.85rem 1.1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 12px; font-size: 0.95rem; font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; background: #f8f6ff; transition: border-color 0.2s; resize: vertical; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #D4AF37; background: white; }
.btn-submit { display: flex; align-items: center; justify-content: center; gap: 0.6rem; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 50px; padding: 1rem; font-weight: bold; font-size: 1rem; font-family: inherit; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(212,175,55,0.3); }
.btn-submit:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(212,175,55,0.4); }
.success-section { text-align: center; padding: 4rem 0; }
.success-icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(76,175,80,0.1); border: 2px solid rgba(76,175,80,0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
.success-section h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 2rem; margin-bottom: 1rem; background: none; -webkit-text-fill-color: #2D1B54; }
.success-section p { color: #6b5b95; font-size: 1.05rem; margin-bottom: 2rem; }
.btn-gold-outline { display: inline-block; border: 2px solid #D4AF37; color: #D4AF37; padding: 0.9rem 2.5rem; border-radius: 50px; font-weight: bold; text-decoration: none; transition: all 0.3s ease; }
.btn-gold-outline:hover { background: rgba(212,175,55,0.1); }
@media (max-width: 900px) { .topic-grid { grid-template-columns: 1fr 1fr; } .form-row { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .topic-grid { grid-template-columns: 1fr; } .page-hero h1 { font-size: 2rem; } }
</style>
