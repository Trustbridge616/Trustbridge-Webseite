<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>📦 Kategorien</h1>
        <p>Paketkategorien verwalten, anlegen und mit dem Frontend verknüpfen</p>
      </div>
      <button class="btn-add" @click="openNew">+ Neue Kategorie</button>
    </div>

    <!-- Flash -->
    <div class="flash success" v-if="$page.props.flash?.success">✅ {{ $page.props.flash.success }}</div>

    <!-- Grid -->
    <div class="cat-grid">
      <div class="cat-card" v-for="cat in categories" :key="cat.id" :class="{ inactive: !cat.is_active }">
        <div class="cat-header">
          <div class="cat-icon" v-html="getCatIcon(cat.name)"></div>
          <div class="cat-meta">
            <h3>{{ cat.name }}</h3>
            <span class="slug">{{ cat.slug }}</span>
          </div>
          <span class="badge" :class="cat.is_active ? 'active' : 'inactive'">
            {{ cat.is_active ? 'Aktiv' : 'Inaktiv' }}
          </span>
        </div>
        <p class="cat-desc">{{ cat.description }}</p>
        <div class="cat-stats">
          <div class="stat-item">
            <strong>{{ cat.subscriptions_count }}</strong>
            <span>Abos</span>
          </div>
          <div class="stat-item">
            <strong>{{ cat.orders_count }}</strong>
            <span>Bestellungen</span>
          </div>
          <div class="stat-item">
            <strong>{{ parseFloat(cat.base_price).toFixed(2) }} €</strong>
            <span>Grundpreis</span>
          </div>
          <div class="stat-item">
            <strong>#{{ cat.sort_order }}</strong>
            <span>Reihenfolge</span>
          </div>
        </div>
        <div class="cat-actions">
          <button class="btn-edit" @click="edit(cat)">✏️ Bearbeiten</button>
          <button class="btn-delete" @click="del(cat)">🗑️ Löschen</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="showModal = false">
      <div class="modal">
        <div class="modal-head">
          <h2>{{ form.id ? 'Kategorie bearbeiten' : 'Neue Kategorie' }}</h2>
          <button class="modal-close" @click="showModal = false">✕</button>
        </div>
        <form @submit.prevent="save">
          <div class="form-grid">
            <div class="form-group full">
              <label>Name *</label>
              <input v-model="form.name" required placeholder="z. B. Elektronik" />
            </div>
            <div class="form-group full">
              <label>Beschreibung</label>
              <textarea v-model="form.description" rows="3" placeholder="Kurze Beschreibung der Kategorie..."></textarea>
            </div>
            <div class="form-group">
              <label>Grundpreis (€) *</label>
              <input type="number" step="0.01" min="0" v-model="form.base_price" required />
            </div>
            <div class="form-group">
              <label>Reihenfolge (Sort)</label>
              <input type="number" min="0" v-model="form.sort_order" />
            </div>
            <div class="form-group full">
              <label>Bild-URL (optional)</label>
              <input v-model="form.image_url" placeholder="https://..." />
            </div>
            <div class="form-group full toggle-row">
              <label>Aktiv (im Frontend anzeigen)</label>
              <button type="button" class="toggle" :class="{ on: form.is_active }" @click="form.is_active = !form.is_active">
                {{ form.is_active ? 'JA' : 'NEIN' }}
              </button>
            </div>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="showModal = false">Abbrechen</button>
            <button type="submit" class="btn-save" :disabled="saving">
              {{ saving ? 'Speichert...' : '✓ Speichern' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ categories: Array });

const showModal = ref(false);
const saving = ref(false);
const form = reactive({ id: null, name: '', description: '', base_price: 39.99, sort_order: 0, is_active: true, image_url: '' });

const openNew = () => {
  Object.assign(form, { id: null, name: '', description: '', base_price: 39.99, sort_order: props.categories?.length ?? 0, is_active: true, image_url: '' });
  showModal.value = true;
};

const edit = (cat) => {
  Object.assign(form, { ...cat });
  showModal.value = true;
};

const save = () => {
  saving.value = true;
  useForm({ ...form }).post('/admin/categories', {
    onSuccess: () => { saving.value = false; showModal.value = false; },
    onError: () => { saving.value = false; },
  });
};

const del = (cat) => {
  if (!confirm(`Kategorie "${cat.name}" wirklich löschen?`)) return;
  router.delete(`/admin/categories/${cat.id}`);
};

const getCatIcon = (name) => {
  const icons = {
    'Elektronik': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3"/></svg>',
    'Mode & Kleidung': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>',
    'Haushalt': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    'Sport & Outdoor': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93 19.07 19.07"/></svg>',
    'Spielzeug': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>',
    'Gemischt': '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D1B54" stroke-width="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>',
  };
  return icons[name] ?? icons['Gemischt'];
};
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.btn-add { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 10px; padding: 0.75rem 1.5rem; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.9rem; transition: all 0.2s; }
.btn-add:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }
.flash { padding: 0.9rem 1.25rem; border-radius: 10px; margin-bottom: 1.5rem; font-weight: 600; font-size: 0.9rem; }
.flash.success { background: rgba(76,175,80,0.1); color: #4CAF50; border: 1px solid rgba(76,175,80,0.3); }
.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.cat-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 2px solid rgba(212,175,55,0.12); transition: transform 0.2s; }
.cat-card:hover { transform: translateY(-3px); }
.cat-card.inactive { opacity: 0.6; border-color: rgba(200,200,200,0.5); }
.cat-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.cat-icon { width: 48px; height: 48px; border-radius: 12px; background: #f0ecfa; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cat-meta h3 { color: #2D1B54; font-size: 1rem; font-weight: bold; margin: 0 0 0.2rem; }
.slug { font-size: 0.78rem; color: #9b8abe; font-family: monospace; }
.badge { padding: 0.2rem 0.7rem; border-radius: 50px; font-size: 0.73rem; font-weight: bold; margin-left: auto; flex-shrink: 0; }
.badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.badge.inactive { background: rgba(200,200,200,0.2); color: #999; }
.cat-desc { color: #6b5b95; font-size: 0.85rem; line-height: 1.6; margin: 0 0 1.25rem; }
.cat-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1.25rem; padding: 1rem; background: #f8f6ff; border-radius: 12px; }
.stat-item { text-align: center; display: flex; flex-direction: column; gap: 0.15rem; }
.stat-item strong { color: #2D1B54; font-size: 0.9rem; font-weight: 900; }
.stat-item span { color: #9b8abe; font-size: 0.72rem; }
.cat-actions { display: flex; gap: 0.75rem; }
.btn-edit { flex: 1; padding: 0.5rem; border-radius: 8px; border: none; background: rgba(212,175,55,0.12); color: #D4AF37; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.82rem; transition: all 0.2s; }
.btn-edit:hover { background: rgba(212,175,55,0.25); }
.btn-delete { flex: 1; padding: 0.5rem; border-radius: 8px; border: none; background: rgba(239,68,68,0.08); color: #EF4444; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.82rem; transition: all 0.2s; }
.btn-delete:hover { background: rgba(239,68,68,0.15); }
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
.form-group input, .form-group textarea { padding: 0.75rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.9rem; font-family: inherit; color: #2D1B54; background: #f8f6ff; resize: vertical; }
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: #D4AF37; }
.toggle-row { flex-direction: row; align-items: center; justify-content: space-between; }
.toggle { padding: 0.4rem 1.2rem; border-radius: 50px; border: 2px solid rgba(45,27,84,0.15); background: #f0ecfa; color: #9b8abe; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.85rem; transition: all 0.2s; }
.toggle.on { background: #4CAF50; border-color: #4CAF50; color: white; }
.modal-actions { display: flex; gap: 1rem; justify-content: flex-end; }
.btn-cancel { padding: 0.75rem 1.5rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-save { padding: 0.75rem 1.5rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
@media (max-width: 900px) { .cat-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .cat-grid { grid-template-columns: 1fr; } }
</style>
