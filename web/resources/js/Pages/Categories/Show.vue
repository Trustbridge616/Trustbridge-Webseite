<template>
  <AppLayout>
    <div class="container page-wrapper">
      <Link href="/categories" style="color: var(--text-secondary); text-decoration: none; margin-bottom: 2rem; display: inline-block;">&larr; Zurück zur Übersicht</Link>
      
      <div class="grid grid-cols-2">
        <div class="glass-panel animate-fade-in">
          <h1>{{ category.name }} Box</h1>
          <p style="font-size: 1.2rem;">{{ category.description }}</p>
          <div style="margin-top: 2rem;">
            <p><strong>Enthält:</strong> Ungeprüfte Retourenware, B-Ware, leichte Defekte oder neuwertig.</p>
            <p><strong>Ideal für:</strong> Reseller, Bastler, Schnäppchenjäger.</p>
          </div>
        </div>

        <div class="glass-panel animate-fade-in delay-100">
          <h2>Abo Konfigurieren</h2>
          <form @submit.prevent="checkout" class="checkout-form">
            <div class="form-group">
              <label class="form-label">Laufzeit wählen</label>
              <select v-model="form.duration" class="form-input">
                <option value="1">1 Monat ({{ category.base_price }} € / Monat)</option>
                <option value="3">3 Monate ({{ Math.round(category.base_price * 0.9) }} € / Monat)</option>
                <option value="6">6 Monate ({{ Math.round(category.base_price * 0.8) }} € / Monat)</option>
                <option value="12">12 Monate ({{ Math.round(category.base_price * 0.7) }} € / Monat)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Zahlungsmethode</label>
              <div class="paypal-mock">
                PayPal
              </div>
            </div>

            <div style="margin-top: 2rem;">
              <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 1rem;">
                Jetzt kostenpflichtig bestellen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import AppLayout from '../../Layouts/AppLayout.vue';

const props = defineProps({
  category: Object
});

const form = useForm({
  duration: '1'
});

const checkout = () => {
  form.post(`/checkout/${props.category.id}`);
};
</script>

<style scoped>
.paypal-mock {
  background: #003087;
  color: white;
  padding: 1rem;
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  border: 1px solid #005ea6;
}
</style>
