<template>
  <AppLayout>
    <div class="container page-wrapper">
      <h1 style="text-align: center; margin-bottom: 3rem;">Wähle deine Retouren-Kategorie</h1>
      
      <div class="grid grid-cols-3">
        <div v-for="category in categories" :key="category.id" class="glass-panel animate-fade-in" style="display:flex; flex-direction: column;">
          <h3>{{ category.name }}</h3>
          <p style="flex-grow: 1;">{{ category.description }}</p>
          <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--secondary-color);">
            ab {{ category.base_price }} € / Monat
          </div>
          <Link :href="`/categories/${category.id}`" class="btn btn-primary" style="width: 100%;">Paket konfigurieren</Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import AppLayout from '../../Layouts/AppLayout.vue';

defineProps({
  categories: Array
});
</script>
