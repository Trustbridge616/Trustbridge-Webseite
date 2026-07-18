<template>
  <AdminLayout>
    <div class="container page-wrapper">
      <Link href="/admin" style="color: var(--text-secondary); text-decoration: none; margin-bottom: 2rem; display: inline-block;">&larr; Zurück zum Admin Dashboard</Link>

      <div class="grid grid-cols-2">
        <div class="glass-panel">
          <h2>PayPal Accounts</h2>
          <p>Übersicht der Accounts für Rotation</p>
          
          <div v-for="acc in accounts" :key="acc.id" style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--surface-border);">
            <div style="font-weight: bold; font-size: 1.1rem;">{{ acc.name }}</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Client ID: {{ acc.client_id.substring(0, 10) }}...</div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--secondary-color);">Verarbeitet: {{ acc.total_processed }} €</span>
              <span :style="{ color: acc.is_active ? '#10B981' : '#EF4444' }">{{ acc.is_active ? 'Aktiv' : 'Inaktiv' }}</span>
            </div>
          </div>
        </div>

        <div class="glass-panel">
          <h2>Neuen Account hinzufügen</h2>
          <form @submit.prevent="submit" style="margin-top: 1.5rem;">
            <div class="form-group">
              <label class="form-label">Name (intern)</label>
              <input type="text" v-model="form.name" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Client ID</label>
              <input type="text" v-model="form.client_id" class="form-input" required />
            </div>
            <div class="form-group">
              <label class="form-label">Client Secret</label>
              <input type="password" v-model="form.client_secret" class="form-input" required />
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Account speichern</button>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineProps({
  accounts: Array
});

const form = useForm({
  name: '',
  client_id: '',
  client_secret: ''
});

const submit = () => {
  form.post('/admin/paypal', {
    onSuccess: () => form.reset()
  });
};
</script>
