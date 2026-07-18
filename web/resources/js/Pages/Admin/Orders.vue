<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>Bestellverwaltung</h1><p>Alle Bestellungen verwalten und Status setzen</p></div>
      <div class="head-actions">
        <select v-model="filterStatus" class="filter-select">
          <option value="">Alle Status</option>
          <option value="pending">In Bearbeitung</option>
          <option value="shipped">Versendet</option>
          <option value="delivered">Geliefert</option>
          <option value="cancelled">Storniert</option>
        </select>
        <input v-model="search" class="search-input" placeholder="Nutzer / Tracking suchen..." />
        <a href="/admin/orders/export" class="btn-export">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          DHL Export
        </a>
      </div>
    </div>

    <div class="admin-card">
      <table class="data-table">
        <thead>
          <tr><th>#</th><th>Nutzer</th><th>Kategorie</th><th>Typ</th><th>Betrag</th><th>Status</th><th>Tracking-ID</th><th>Datum</th><th>Aktionen</th></tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td class="muted">{{ order.id }}</td>
            <td>
              <div class="user-cell">
                <strong>{{ order.user?.name ?? '—' }}</strong>
                <span v-if="!order.user?.street || !order.user?.zip" class="addr-warning" title="Adresse unvollständig!">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </span>
                <br/><small class="muted">{{ order.user?.email }}</small>
              </div>
            </td>
            <td><span class="badge gold" v-if="order.is_free">🎁 Gratis</span><span v-else>📦 Abo</span></td>
            <td><span class="cat-tag">{{ order.category?.name ?? 'Keine' }}</span></td>
            <td>{{ order.is_free ? '—' : order.amount + ' €' }}</td>
            <td>
              <select class="status-select" :class="order.status" :value="order.status" @change="updateStatus(order, $event.target.value)">
                <option value="pending">In Bearbeitung</option>
                <option value="shipped">Versendet</option>
                <option value="delivered">Geliefert</option>
                <option value="cancelled">Storniert</option>
              </select>
            </td>
            <td>
              <input type="text" class="tracking-input" :value="order.tracking_id ?? ''" placeholder="Tracking-ID..." @blur="updateTracking(order, $event.target.value)" />
            </td>
            <td class="muted">{{ new Date(order.created_at).toLocaleDateString('de') }}</td>
            <td>
              <button class="action-btn danger" @click="cancelOrder(order)" v-if="order.status !== 'cancelled'">Stornieren</button>
            </td>
          </tr>
          <tr v-if="!filteredOrders.length"><td colspan="8" class="empty">Keine Bestellungen gefunden.</td></tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ orders: Array });
const search = ref('');
const filterStatus = ref('');

const filteredOrders = computed(() =>
  (props.orders || []).filter(o => {
    const matchSearch = !search.value ||
      o.user?.name?.toLowerCase().includes(search.value.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.value.toLowerCase()) ||
      (o.tracking_id ?? '').toLowerCase().includes(search.value.toLowerCase());
    const matchStatus = !filterStatus.value || o.status === filterStatus.value;
    return matchSearch && matchStatus;
  })
);

const updateStatus = (order, status) => {
  useForm({ status }).patch(`/admin/orders/${order.id}/status`);
};

const updateTracking = (order, tracking_id) => {
  if (tracking_id !== (order.tracking_id ?? '')) {
    useForm({ tracking_id }).patch(`/admin/orders/${order.id}/tracking`);
  }
};

const cancelOrder = (order) => {
  if (confirm('Bestellung wirklich stornieren?')) {
    useForm({ status: 'cancelled' }).patch(`/admin/orders/${order.id}/status`);
  }
};
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.head-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.filter-select, .search-input { padding: 0.65rem 1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-size: 0.88rem; background: white; color: #2D1B54; font-family: inherit; }
.filter-select:focus, .search-input:focus { outline: none; border-color: #D4AF37; }
.search-input { min-width: 220px; }
.btn-export { display: inline-flex; align-items: center; gap: 0.5rem; background: #2D1B54; color: white; padding: 0.65rem 1.25rem; border-radius: 10px; font-weight: bold; text-decoration: none; font-size: 0.88rem; transition: all 0.2s; border: 1px solid #2D1B54; }
.btn-export:hover { background: #4a238a; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; min-width: 900px; }
.data-table th { text-align: left; padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; white-space: nowrap; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.muted { color: #9b8abe !important; font-size: 0.82rem; }
.badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.addr-warning { cursor: help; margin-left: 6px; display: inline-flex; align-items: center; justify-content: center; color: #EF4444; background: rgba(239,68,68,0.1); border-radius: 50%; padding: 3px; animation: pulse-danger 2s infinite; vertical-align: middle; }
@keyframes pulse-danger { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 70% { box-shadow: 0 0 0 6px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
.badge.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }
.cat-tag { background: #f0ecfa; color: #4a238a; padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(74,35,138,0.1); }
.status-select { padding: 0.3rem 0.65rem; border-radius: 8px; font-size: 0.8rem; font-weight: bold; border: 1.5px solid rgba(45,27,84,0.12); font-family: inherit; cursor: pointer; }
.status-select.pending { background: rgba(245,158,11,0.1); color: #F59E0B; border-color: rgba(245,158,11,0.3); }
.status-select.shipped { background: rgba(59,130,246,0.1); color: #3B82F6; border-color: rgba(59,130,246,0.3); }
.status-select.delivered { background: rgba(76,175,80,0.1); color: #4CAF50; border-color: rgba(76,175,80,0.3); }
.status-select.cancelled { background: rgba(239,68,68,0.1); color: #EF4444; border-color: rgba(239,68,68,0.3); }
.tracking-input { padding: 0.3rem 0.65rem; border: 1.5px solid rgba(45,27,84,0.12); border-radius: 8px; font-size: 0.82rem; font-family: monospace; width: 140px; background: #f8f6ff; color: #4a3870; }
.tracking-input:focus { outline: none; border-color: #D4AF37; }
.action-btn { padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.78rem; font-weight: bold; font-family: inherit; cursor: pointer; border: none; transition: all 0.2s; }
.action-btn.danger { background: rgba(239,68,68,0.1); color: #EF4444; }
.action-btn.danger:hover { background: rgba(239,68,68,0.2); }
.empty { text-align: center; color: #6b5b95; padding: 2rem; font-style: italic; }
</style>
