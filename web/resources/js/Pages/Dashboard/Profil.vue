<template>
  <DashboardLayout>
    <div class="page-head"><h1>Mein Profil</h1><p>Persönliche Daten verwalten</p></div>
    <div class="dash-card">
      <h2>Profilangaben</h2>
      <div v-if="success" class="success-msg">✅ {{ success }}</div>
      <form @submit.prevent="save">
        <div class="form-grid">
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="form.name" required />
            <span v-if="form.errors.name" class="err">{{ form.errors.name }}</span>
          </div>
          <div class="form-group">
            <label>E-Mail</label>
            <input type="email" v-model="form.email" required />
            <span v-if="form.errors.email" class="err">{{ form.errors.email }}</span>
          </div>
        </div>

        <div class="address-section">
          <div class="address-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="gold-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <h3 class="form-subhead">Versandadresse</h3>
          </div>
          <p class="address-desc">An diese Adresse werden deine Trustbridge Sendungen zugestellt.</p>
          
          <div class="form-grid">
            <div class="form-group span-2">
              <label>Straße</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.street" placeholder="Musterstraße" />
              </div>
            </div>
            <div class="form-group">
              <label>Hausnummer</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.house_number" placeholder="12a" />
              </div>
            </div>
            <div class="form-group">
              <label>Postleitzahl</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.zip" placeholder="12345" />
              </div>
            </div>
            <div class="form-group">
              <label>Stadt</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.city" placeholder="Musterstadt" />
              </div>
            </div>
            <div class="form-group span-2">
              <label>Land</label>
              <div class="input-wrapper">
                <input type="text" v-model="form.country" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn-save" :disabled="form.processing">
          {{ form.processing ? 'Wird gespeichert...' : 'Änderungen speichern' }}
        </button>
      </form>
    </div>
    <div class="dash-card">
      <h2>Konto-Informationen</h2>
      <div class="info-grid">
        <div class="info-item"><label>Kunden-ID</label><strong>#{{ user.id }}</strong></div>
        <div class="info-item"><label>Mitglied seit</label><strong>{{ new Date(user.created_at).toLocaleDateString('de') }}</strong></div>
        <div class="info-item"><label>Guthaben</label><strong class="gold">{{ user.credit_balance ?? 0 }} €</strong></div>
        <div class="info-item"><label>Empfehlungslink</label><a :href="`${origin}/register?ref=${user.id}`" class="ref-link">Mein Ref-Link</a></div>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import { computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import DashboardLayout from '../../Layouts/DashboardLayout.vue';
const props = defineProps({ user: Object });
const page = usePage();
const success = computed(() => page.props.flash?.success);
const origin = window.location.origin;
const form = useForm({ 
  name: props.user.name, 
  email: props.user.email,
  street: props.user.street || '',
  house_number: props.user.house_number || '',
  zip: props.user.zip || '',
  city: props.user.city || '',
  country: props.user.country || 'Deutschland'
});
const save = () => form.post('/dashboard/profil');
</script>
<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.dash-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; }
.dash-card h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.1rem; margin-bottom: 1.5rem; background: none; -webkit-text-fill-color: #2D1B54; }
.success-msg { background: rgba(76,175,80,0.1); border: 1px solid rgba(76,175,80,0.3); border-radius: 10px; padding: 0.75rem 1rem; color: #4CAF50; font-size: 0.9rem; margin-bottom: 1.25rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem; }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-group label { font-size: 0.78rem; font-weight: 700; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; }
.form-group input { width: 100%; padding: 0.85rem 1rem; border: 2px solid rgba(45,27,84,0.08); border-radius: 12px; font-size: 0.95rem; font-family: inherit; color: #2D1B54; background: #f8f6ff; transition: all 0.3s ease; box-sizing: border-box; }
.form-group input:hover { border-color: rgba(212,175,55,0.4); background: white; }
.form-group input:focus { outline: none; border-color: #D4AF37; background: white; box-shadow: 0 0 0 4px rgba(212,175,55,0.1); }
.err { color: #EF4444; font-size: 0.8rem; margin-top: 4px; }

/* Address Section styling */
.address-section { background: linear-gradient(145deg, #ffffff, #faf9ff); border: 1px solid rgba(212,175,55,0.15); border-radius: 16px; padding: 2rem; margin: 2.5rem 0 2rem 0; box-shadow: 0 10px 30px rgba(45,27,84,0.03); position: relative; overflow: hidden; }
.address-section::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(to bottom, #D4AF37, #AA8222); }
.address-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.gold-icon { color: #D4AF37; }
.form-subhead { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.25rem; margin: 0; }
.address-desc { color: #6b5b95; font-size: 0.9rem; margin: 0 0 1.5rem 0; }
.input-wrapper { position: relative; width: 100%; }

.form-group.span-2 { grid-column: span 2; }
.btn-save { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 50px; padding: 0.9rem 2.5rem; font-weight: 800; cursor: pointer; font-family: inherit; font-size: 0.95rem; transition: all 0.3s; box-shadow: 0 4px 15px rgba(212,175,55,0.2); letter-spacing: 0.5px; }
.btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(212,175,55,0.3); }
.btn-save:disabled { opacity: 0.7; }
.info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.info-item { display: flex; flex-direction: column; gap: 0.3rem; }
.info-item label { font-size: 0.78rem; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.info-item strong { color: #2D1B54; font-size: 1.05rem; }
.info-item strong.gold { color: #D4AF37; }
.ref-link { color: #D4AF37; font-size: 0.9rem; text-decoration: none; font-weight: bold; }
@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .info-grid { grid-template-columns: 1fr 1fr; } }
</style>
