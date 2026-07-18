<template>
  <div class="logistics-layout">
    <aside class="sidebar">
      <div class="brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
        <span>Fulfillment Center</span>
      </div>
      <nav>
        <a href="#" class="active">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          Bestellungen
        </a>
      </nav>
      <div class="sidebar-bottom">
        <form @submit.prevent="router.post('/logout')">
          <button type="submit" class="logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Abmelden
          </button>
        </form>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <h1>Logistics Dashboard</h1>
        <div class="stats">
          <div class="stat"><span class="label">Offen</span><span class="value">{{ orders.length }}</span></div>
          <div class="stat"><span class="label">Heute versendet</span><span class="value">{{ recentShipped.length }}</span></div>
        </div>
      </header>

      <div class="main-grid">
        <!-- Offene Bestellungen -->
        <div class="card">
          <div class="card-header">
            <h2>Zu packende Bestellungen</h2>
          </div>
          <div class="table-responsive" v-if="orders.length > 0">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kunde</th>
                  <th>Adresse</th>
                  <th>Kategorie</th>
                  <th>Aktion</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="o in orders" :key="o.id">
                  <td>#{{ o.id }}</td>
                  <td>
                    <strong>{{ o.user?.name }}</strong><br>
                    <small>{{ o.user?.email }}</small>
                  </td>
                  <td>
                    {{ o.user?.street }} {{ o.user?.house_number }}<br>
                    <small>{{ o.user?.zip }} {{ o.user?.city }}</small>
                  </td>
                  <td>
                    <span class="badge" :class="o.is_free ? 'free' : 'standard'">
                      {{ o.is_free ? 'Gratis' : (o.category?.name || 'Gemischt') }}
                    </span>
                  </td>
                  <td>
                    <div class="actions">
                      <a :href="`/logistics/orders/${o.id}/packlist`" target="_blank" class="btn btn-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        Packliste
                      </a>
                      <button @click="openShipModal(o)" class="btn btn-primary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                        Versenden
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-state">
            <p>Alle Bestellungen sind abgearbeitet! 🎉</p>
          </div>
        </div>

        <!-- Letzte versendete -->
        <div class="card">
          <div class="card-header">
            <h2>Kürzlich versendet</h2>
          </div>
          <div class="table-responsive" v-if="recentShipped.length > 0">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kunde</th>
                  <th>Tracking</th>
                  <th>Datum</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="o in recentShipped" :key="o.id">
                  <td>#{{ o.id }}</td>
                  <td>{{ o.user?.name }}</td>
                  <td><code>{{ o.tracking_id }}</code></td>
                  <td>{{ new Date(o.updated_at).toLocaleDateString('de') }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Versenden Modal -->
    <div class="modal-backdrop" v-if="selectedOrder" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>Bestellung #{{ selectedOrder.id }} versenden</h3>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="submitShipment">
          <div class="modal-body">
            <p class="modal-desc">Kunde: <strong>{{ selectedOrder.user?.name }}</strong></p>
            <div class="form-group">
              <label>Tracking-Nummer (DHL)</label>
              <input type="text" v-model="form.tracking_id" required placeholder="JJD000..." />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal" class="btn btn-secondary">Abbrechen</button>
            <button type="submit" class="btn btn-primary" :disabled="form.processing">
              {{ form.processing ? 'Speichern...' : 'Als versendet markieren' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';

const props = defineProps({
  orders: Array,
  recentShipped: Array
});

const selectedOrder = ref(null);
const form = useForm({
  tracking_id: ''
});

const openShipModal = (order) => {
  selectedOrder.value = order;
  form.tracking_id = '';
};

const closeModal = () => {
  selectedOrder.value = null;
  form.reset();
};

const submitShipment = () => {
  form.patch(route('logistics.orders.status', selectedOrder.value.id), {
    onSuccess: () => closeModal()
  });
};
</script>

<style scoped>
.logistics-layout { display: flex; min-height: 100vh; background: #f4f5f7; font-family: system-ui, -apple-system, sans-serif; }

.sidebar { width: 260px; background: #1a1c23; color: white; display: flex; flex-direction: column; }
.brand { padding: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-weight: bold; font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.brand svg { color: #D4AF37; }
nav { padding: 1rem 0; flex: 1; }
nav a { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1.5rem; color: #9ca3af; text-decoration: none; font-size: 0.95rem; transition: all 0.2s; }
nav a:hover, nav a.active { color: white; background: rgba(255,255,255,0.05); border-left: 3px solid #D4AF37; }
.sidebar-bottom { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
.logout-btn { display: flex; align-items: center; gap: 0.75rem; width: 100%; padding: 0.75rem; background: none; border: none; color: #ef4444; cursor: pointer; text-align: left; font-size: 0.95rem; transition: background 0.2s; border-radius: 6px; }
.logout-btn:hover { background: rgba(239, 68, 68, 0.1); }

.content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar { background: white; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e5e7eb; }
.topbar h1 { margin: 0; font-size: 1.25rem; color: #111827; }
.stats { display: flex; gap: 2rem; }
.stat { display: flex; flex-direction: column; align-items: flex-end; }
.stat .label { font-size: 0.75rem; color: #6b7280; text-transform: uppercase; font-weight: 600; }
.stat .value { font-size: 1.25rem; font-weight: bold; color: #111827; }

.main-grid { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; overflow-y: auto; }
.card { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; }
.card-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
.card-header h2 { margin: 0; font-size: 1rem; color: #374151; }

.table-responsive { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 1rem 1.5rem; text-align: left; border-bottom: 1px solid #e5e7eb; font-size: 0.88rem; }
.data-table th { background: white; color: #6b7280; font-weight: 600; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.05em; }
.data-table td { color: #374151; vertical-align: top; }
.data-table small { color: #6b7280; }

.badge { padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
.badge.free { background: #fef3c7; color: #92400e; }
.badge.standard { background: #e0e7ff; color: #3730a3; }

.actions { display: flex; gap: 0.5rem; }
.btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; font-weight: 500; cursor: pointer; text-decoration: none; border: 1px solid transparent; transition: all 0.2s; }
.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-secondary { background: white; border-color: #d1d5db; color: #374151; }
.btn-secondary:hover { background: #f3f4f6; }

.empty-state { padding: 3rem; text-align: center; color: #6b7280; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 1rem; }
.modal { background: white; border-radius: 8px; width: 100%; max-width: 450px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
.modal-header { padding: 1.25rem 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; font-size: 1.1rem; color: #111827; }
.close-btn { background: none; border: none; font-size: 1.5rem; color: #6b7280; cursor: pointer; line-height: 1; }
.modal-body { padding: 1.5rem; }
.modal-desc { margin-bottom: 1rem; font-size: 0.95rem; color: #374151; }
.form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.88rem; font-weight: 500; color: #374151; }
.form-group input { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.95rem; }
.form-group input:focus { outline: none; border-color: #2563eb; ring: 2px solid #bfdbfe; }
.modal-footer { padding: 1.25rem 1.5rem; background: #f9fafb; border-top: 1px solid #e5e7eb; display: flex; justify-content: flex-end; gap: 0.75rem; border-radius: 0 0 8px 8px; }
</style>
