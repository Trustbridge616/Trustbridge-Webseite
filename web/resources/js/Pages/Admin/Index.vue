<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>Dashboard</h1><p>Übersicht aller wichtigen Kennzahlen</p></div>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="s in statCards" :key="s.label">
        <div class="stat-top">
          <span class="stat-label">{{ s.label }}</span>
          <div class="stat-icon" :class="s.color" v-html="s.icon"></div>
        </div>
        <div class="stat-value">{{ s.value }}</div>
        <div class="stat-sub">{{ s.sub }}</div>
      </div>
    </div>

    <div class="admin-card chart-container">
      <div class="chart-header">
        <h2>Umsatzverlauf (Letzte 30 Tage)</h2>
        <div class="chart-legend">
          <span class="legend-item"><span class="dot gold"></span> Tagesumsatz in €</span>
        </div>
      </div>
      <div class="chart-wrapper">
        <div class="chart-bars">
          <div v-for="(day, i) in chart_data" :key="i" class="bar-group" :title="`${day.date}: ${day.revenue} €`">
            <div class="bar-wrap">
              <div class="bar" :style="{ height: (day.revenue / maxRevenue * 100 || 2) + '%' }"></div>
            </div>
            <span class="bar-label" v-if="i % 5 === 0">{{ day.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-grid">
      <div class="admin-card">
        <h2>Neueste Abonnements</h2>
        <table class="data-table">
          <thead><tr><th>Nutzer</th><th>Kategorie</th><th>Status</th><th>Datum</th></tr></thead>
          <tbody>
            <tr v-for="sub in recent_subscriptions" :key="sub.id">
              <td>{{ sub.user?.name ?? '—' }}</td>
              <td>{{ sub.category?.name ?? 'Gemischt' }}</td>
              <td><span class="badge" :class="sub.status">{{ sub.status }}</span></td>
              <td>{{ new Date(sub.created_at).toLocaleDateString('de') }}</td>
            </tr>
            <tr v-if="!recent_subscriptions?.length"><td colspan="4" class="empty">Keine Abonnements</td></tr>
          </tbody>
        </table>
      </div>

      <div class="admin-card">
        <h2>Neueste Bestellungen</h2>
        <table class="data-table">
          <thead><tr><th>Nutzer</th><th>Betrag</th><th>Status</th><th>Datum</th></tr></thead>
          <tbody>
            <tr v-for="order in recent_orders" :key="order.id">
              <td>{{ order.user?.name ?? '—' }}</td>
              <td>{{ order.amount }} €</td>
              <td><span class="badge" :class="order.status">{{ order.status }}</span></td>
              <td>{{ new Date(order.created_at).toLocaleDateString('de') }}</td>
            </tr>
            <tr v-if="!recent_orders?.length"><td colspan="4" class="empty">Keine Bestellungen</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed } from 'vue';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ 
  stats: Object, 
  recent_subscriptions: Array, 
  recent_orders: Array,
  chart_data: Array 
});

const maxRevenue = computed(() => {
  const values = props.chart_data?.map(d => d.revenue) || [0];
  return Math.max(...values, 100); // Mindestens 100 für Skalierung
});

const statCards = computed(() => [
  { label: 'Nutzer gesamt', value: props.stats?.total_users ?? 0, sub: 'Registrierte Accounts', color: 'blue', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>' },
  { label: 'Abonnements gesamt', value: props.stats?.total_subscriptions ?? 0, sub: `${props.stats?.active_subscriptions ?? 0} aktiv`, color: 'green', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
  { label: 'Umsatz gesamt', value: (props.stats?.total_revenue ?? 0).toLocaleString('de') + ' €', sub: 'Bestätigte Zahlungen', color: 'gold', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
  { label: 'Aktive Abos', value: props.stats?.active_subscriptions ?? 0, sub: 'laufende Abonnements', color: 'purple', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
]);
</script>

<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; font-size: 0.92rem; margin: 0; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 2rem; }
.stat-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.stat-label { font-size: 0.8rem; color: #6b5b95; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.stat-icon.blue { background: rgba(59,130,246,0.12); color: #3B82F6; }
.stat-icon.green { background: rgba(76,175,80,0.12); color: #4CAF50; }
.stat-icon.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }
.stat-icon.purple { background: rgba(45,27,84,0.1); color: #2D1B54; }
.stat-value { font-size: 2rem; font-weight: 900; color: #2D1B54; font-family: 'Century Gothic', system-ui, sans-serif; margin-bottom: 0.25rem; }
.stat-sub { font-size: 0.78rem; color: #6b5b95; }
.admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.admin-card h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1rem; margin-bottom: 1.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.data-table th { text-align: left; padding: 0.6rem 0.75rem; font-size: 0.75rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; border-radius: 6px; }
.data-table td { padding: 0.75rem 0.75rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; }
.data-table tr:last-child td { border-bottom: none; }
.badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.badge.pending { background: rgba(245,158,11,0.12); color: #F59E0B; }
.badge.cancelled { background: rgba(239,68,68,0.12); color: #EF4444; }
.empty { color: #6b5b95; text-align: center; padding: 1.5rem; font-style: italic; }

/* Chart Styles */
.chart-container { margin-bottom: 2rem; padding: 2rem !important; }
.chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.chart-legend { font-size: 0.8rem; color: #6b5b95; font-weight: 600; }
.dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
.dot.gold { background: #D4AF37; box-shadow: 0 0 10px rgba(212,175,55,0.4); }
.chart-wrapper { height: 200px; display: flex; align-items: flex-end; padding-top: 1rem; }
.chart-bars { display: flex; align-items: flex-end; gap: 4px; width: 100%; height: 100%; }
.bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; cursor: pointer; }
.bar-wrap { width: 100%; height: 100%; display: flex; align-items: flex-end; }
.bar { width: 100%; background: linear-gradient(to top, #2D1B54, #6b5b95); border-radius: 4px 4px 0 0; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0.8; }
.bar-group:hover .bar { background: #D4AF37; opacity: 1; transform: scaleX(1.1); }
.bar-label { font-size: 0.65rem; color: #9b8abe; font-weight: 600; transform: rotate(-45deg); margin-top: 5px; white-space: nowrap; }
@media (max-width: 1100px) { .stats-grid { grid-template-columns: 1fr 1fr; } .admin-grid { grid-template-columns: 1fr; } }
</style>
