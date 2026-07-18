<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>Abonnement-Verwaltung</h1><p>Alle aktiven und gekündigten Abonnements</p></div>
      <div class="head-actions">
        <select v-model="filterStatus" class="filter-select">
          <option value="">Alle Status</option>
          <option value="active">Aktiv</option>
          <option value="cancelled">Gekündigt</option>
          <option value="pending">Ausstehend</option>
        </select>
        <input v-model="search" class="search-input" placeholder="Nutzer suchen..." />
      </div>
    </div>

    <div class="stats-row">
      <div class="mini-stat green"><strong>{{ activeCount }}</strong><span>Aktiv</span></div>
      <div class="mini-stat red"><strong>{{ cancelledCount }}</strong><span>Gekündigt</span></div>
      <div class="mini-stat gold"><strong>{{ totalRevenue }} €</strong><span>Monatl. Umsatz (est.)</span></div>
    </div>

    <div class="admin-card">
      <table class="data-table">
        <thead>
          <tr><th>#</th><th>Nutzer</th><th>Kategorie</th><th>Laufzeit</th><th>Betrag/M</th><th>Status</th><th>Nächste Zahlung</th><th>Aktionen</th></tr>
        </thead>
        <tbody>
          <tr v-for="sub in filteredSubs" :key="sub.id">
            <td class="muted">{{ sub.id }}</td>
            <td><strong>{{ sub.user?.name ?? '—' }}</strong><br/><small class="muted">{{ sub.user?.email }}</small></td>
            <td>{{ sub.category?.name ?? 'Gemischt' }}</td>
            <td>{{ sub.duration_months }} Mo.</td>
            <td>{{ sub.amount ?? '—' }} €</td>
            <td><span class="badge" :class="sub.status">{{ statusLabel(sub.status) }}</span></td>
            <td class="muted">{{ sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString('de') : '—' }}</td>
            <td>
              <div class="action-row">
                <button class="action-btn warn" @click="cancelSub(sub)" v-if="sub.status === 'active'">Kündigen</button>
                <button class="action-btn edit" @click="reactivate(sub)" v-if="sub.status === 'cancelled'">Reaktivieren</button>
              </div>
            </td>
          </tr>
          <tr v-if="!filteredSubs.length"><td colspan="8" class="empty">Keine Abonnements gefunden.</td></tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ subscriptions: Object });
const search = ref('');
const filterStatus = ref('');

const allSubs = computed(() => props.subscriptions?.data ?? []);
const filteredSubs = computed(() =>
  allSubs.value.filter(s => {
    const matchSearch = !search.value || s.user?.name?.toLowerCase().includes(search.value.toLowerCase()) || s.user?.email?.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus = !filterStatus.value || s.status === filterStatus.value;
    return matchSearch && matchStatus;
  })
);

const activeCount = computed(() => allSubs.value.filter(s => s.status === 'active').length);
const cancelledCount = computed(() => allSubs.value.filter(s => s.status === 'cancelled').length);
const totalRevenue = computed(() => allSubs.value.filter(s => s.status === 'active').reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0).toFixed(2));

const statusLabel = (s) => ({ active: '✓ Aktiv', cancelled: '✗ Gekündigt', pending: '⏳ Ausstehend' }[s] ?? s);

const cancelSub = (sub) => {
  if (confirm(`Abo von ${sub.user?.name} wirklich kündigen?`)) {
    useForm({ status: 'cancelled' }).patch(`/admin/subscriptions/${sub.id}/status`);
  }
};

const reactivate = (sub) => {
  useForm({ status: 'active' }).patch(`/admin/subscriptions/${sub.id}/status`);
};
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.head-actions { display: flex; gap: 0.75rem; }
.filter-select, .search-input { padding: 0.65rem 1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-size: 0.88rem; background: white; color: #2D1B54; font-family: inherit; }
.filter-select:focus, .search-input:focus { outline: none; border-color: #D4AF37; }
.search-input { min-width: 200px; }
.stats-row { display: flex; gap: 1.25rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
.mini-stat { background: white; border-radius: 14px; padding: 1.25rem 1.75rem; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 4px 15px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); min-width: 140px; }
.mini-stat strong { font-size: 1.6rem; font-weight: 900; font-family: 'Century Gothic', system-ui, sans-serif; }
.mini-stat span { font-size: 0.78rem; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; }
.mini-stat.green strong { color: #4CAF50; }
.mini-stat.red strong { color: #EF4444; }
.mini-stat.gold strong { color: #D4AF37; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; min-width: 850px; }
.data-table th { text-align: left; padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; white-space: nowrap; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.muted { color: #9b8abe !important; font-size: 0.82rem; }
.badge { padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.78rem; font-weight: bold; display: inline-block; }
.badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.badge.cancelled { background: rgba(239,68,68,0.12); color: #EF4444; }
.badge.pending { background: rgba(245,158,11,0.12); color: #F59E0B; }
.action-row { display: flex; gap: 0.5rem; }
.action-btn { padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.78rem; font-weight: bold; font-family: inherit; cursor: pointer; border: none; transition: all 0.2s; }
.action-btn.warn { background: rgba(239,68,68,0.1); color: #EF4444; }
.action-btn.warn:hover { background: rgba(239,68,68,0.2); }
.action-btn.edit { background: rgba(76,175,80,0.1); color: #4CAF50; }
.action-btn.edit:hover { background: rgba(76,175,80,0.2); }
.empty { text-align: center; color: #6b5b95; padding: 2rem; font-style: italic; }
</style>
