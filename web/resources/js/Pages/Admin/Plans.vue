<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>🎁 Pläne & Pakete</h1>
        <p>Abonnements und deren Stripe-Verknüpfung verwalten</p>
      </div>
      <button class="btn-add" @click="openCreate">+ Neuer Plan</button>
    </div>

    <div class="admin-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Name</th>
            <th>Laufzeit</th>
            <th>Preis</th>
            <th>Stripe Price ID</th>
            <th style="text-align: right;">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plan in plans" :key="plan.id">
            <td><span class="badge gold">{{ plan.tier }} Box(en)</span></td>
            <td><strong>{{ plan.name }}</strong></td>
            <td>{{ plan.duration_months }} Monate</td>
            <td><strong>{{ parseFloat(plan.price).toFixed(2) }} €</strong></td>
            <td>
              <code class="stripe-id">{{ plan.stripe_price_id || 'Nicht verknüpft' }}</code>
            </td>
            <td style="text-align: right;">
              <div class="action-buttons">
                <button @click="editPlan(plan)" class="action-btn edit" title="Bearbeiten">✏️ Bearbeiten</button>
                <button @click="confirmDelete(plan)" class="action-btn delete" title="Löschen">🗑️</button>
              </div>
            </td>
          </tr>
          <tr v-if="!plans?.length"><td colspan="6" class="empty">Keine Pläne vorhanden.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Modal für Erstellen/Bearbeiten -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-head">
          <h2>{{ form.id ? 'Plan bearbeiten' : 'Neuen Plan erstellen' }}</h2>
          <button class="modal-close" @click="showModal = false">✕</button>
        </div>
        <form @submit.prevent="submit">
          <div class="form-grid">
            <div class="form-group">
              <label>Tier (Paket-Anzahl) *</label>
              <select v-model="form.tier" required>
                <option :value="1">1 Paket</option>
                <option :value="2">2 Pakete</option>
                <option :value="3">3 Pakete</option>
              </select>
            </div>
            <div class="form-group">
              <label>Name *</label>
              <input v-model="form.name" type="text" placeholder="z.B. 1 Paket / Monat" required />
            </div>
            <div class="form-group">
              <label>Laufzeit (Monate) *</label>
              <input v-model="form.duration_months" type="number" required />
            </div>
            <div class="form-group">
              <label>Preis (€) *</label>
              <input v-model="form.price" type="number" step="0.01" required />
            </div>
            <div class="form-group full">
              <label>Beschreibung</label>
              <textarea v-model="form.description" rows="3" placeholder="Kurze Beschreibung..."></textarea>
            </div>
            <div class="form-group full">
              <label>Stripe Price ID (Optional)</label>
              <input v-model="form.stripe_price_id" type="text" placeholder="price_..." />
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showModal = false">Abbrechen</button>
            <button type="submit" class="btn-save" :disabled="form.processing">
              {{ form.processing ? 'Speichert...' : '✓ Speichern' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({
  plans: Array
});

const showModal = ref(false);
const form = useForm({
  id: null,
  tier: 1,
  name: '',
  duration_months: 1,
  price: 0,
  description: '',
  stripe_price_id: ''
});

const openCreate = () => {
  form.reset();
  form.id = null;
  showModal.value = true;
};

const editPlan = (plan) => {
  form.id = plan.id;
  form.tier = plan.tier;
  form.name = plan.name;
  form.duration_months = plan.duration_months;
  form.price = plan.price;
  form.description = plan.description;
  form.stripe_price_id = plan.stripe_price_id;
  showModal.value = true;
};

const submit = () => {
  form.post(route('admin.plans.store'), {
    onSuccess: () => {
      showModal.value = false;
    }
  });
};

const confirmDelete = (plan) => {
  if (confirm('Plan wirklich löschen?')) {
    form.delete(route('admin.plans.delete', plan.id));
  }
};
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }

.btn-add { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 10px; padding: 0.75rem 1.5rem; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.9rem; transition: all 0.2s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }

.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; overflow-x: auto; }

.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.data-table th { text-align: left; padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }

.badge { padding: 0.3rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.badge.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }

.stripe-id { background: #f0ecfa; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.8rem; color: #6b5b95; font-family: monospace; border: 1px solid rgba(45,27,84,0.1); }

.action-buttons { display: flex; gap: 0.5rem; justify-content: flex-end; }
.action-btn { padding: 0.4rem 0.8rem; border-radius: 8px; font-size: 0.8rem; font-weight: bold; font-family: inherit; cursor: pointer; border: none; transition: all 0.2s; }
.action-btn.edit { background: rgba(212,175,55,0.12); color: #D4AF37; }
.action-btn.edit:hover { background: rgba(212,175,55,0.25); }
.action-btn.delete { background: rgba(239,68,68,0.08); color: #EF4444; padding: 0.4rem 0.6rem; }
.action-btn.delete:hover { background: rgba(239,68,68,0.15); }
.empty { text-align: center; color: #6b5b95; padding: 2rem; font-style: italic; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
.modal { background: white; border-radius: 24px; padding: 2rem; width: 560px; max-width: 95vw; box-shadow: 0 25px 60px rgba(0,0,0,0.15); }
.modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.modal-head h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.2rem; margin: 0; background: none; -webkit-text-fill-color: #2D1B54; }
.modal-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #6b5b95; padding: 0.25rem; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-group.full { grid-column: 1 / -1; }
.form-group label { font-size: 0.78rem; font-weight: 700; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; }
.form-group input, .form-group textarea, .form-group select { padding: 0.75rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.9rem; font-family: inherit; color: #2D1B54; background: #f8f6ff; resize: vertical; }
.form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #D4AF37; }

.modal-actions { display: flex; gap: 1rem; justify-content: flex-end; }
.btn-cancel { padding: 0.75rem 1.5rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.btn-cancel:hover { background: #f8f6ff; }
.btn-save { padding: 0.75rem 1.5rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.btn-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(212,175,55,0.3); }
.btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
</style>
