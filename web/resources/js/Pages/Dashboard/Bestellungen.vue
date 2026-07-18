<template>
  <DashboardLayout>
    <div class="page-head"><h1>Bestellungen</h1><p>Alle deine Pakete und Sendungen</p></div>

    <div class="admin-card">
      <div v-if="orders?.length > 0">
        <div class="order-row header"><span>Datum</span><span>Typ</span><span>Betrag</span><span>Status</span><span>Tracking</span></div>
        <div class="order-row" v-for="o in orders" :key="o.id">
          <span>{{ new Date(o.created_at).toLocaleDateString('de') }}</span>
          <span>
            <span class="free-tag" v-if="o.is_free">🎁 Gratis</span>
            <span v-else>📦 Abo-Paket</span>
          </span>
          <span>{{ o.is_free ? 'Kostenlos' : o.amount + ' €' }}</span>
          <span class="status-badge" :class="o.status">{{ statusLabel(o.status) }}</span>
          <span>
            <a v-if="o.tracking_id" :href="'https://track.dhl.com/' + o.tracking_id" target="_blank" class="tracking-link">{{ o.tracking_id }}</a>
            <span v-else class="muted">—</span>
          </span>
        </div>
      </div>
      <div v-else class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
        <p>Noch keine Bestellungen vorhanden.</p>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from '../../Layouts/DashboardLayout.vue';
defineProps({ orders: Array, user: Object });
const statusLabel = (s) => ({ pending: 'In Bearbeitung', shipped: 'Versendet', delivered: 'Geliefert', cancelled: 'Storniert' }[s] ?? s);
</script>
<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); overflow-x: auto; }
.order-row { display: grid; grid-template-columns: 1.2fr 1.2fr 1fr 1.2fr 1.5fr; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(45,27,84,0.06); font-size: 0.9rem; color: #4a3870; align-items: center; }
.order-row.header { font-weight: 700; color: #2D1B54; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; padding: 0.6rem 1rem; border-radius: 8px; border-bottom: none; margin-bottom: 0.25rem; }
.order-row:last-child { border-bottom: none; }
.status-badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.78rem; font-weight: bold; display: inline-block; }
.status-badge.pending { background: rgba(245,158,11,0.12); color: #F59E0B; }
.status-badge.shipped { background: rgba(59,130,246,0.12); color: #3B82F6; }
.status-badge.delivered { background: rgba(76,175,80,0.12); color: #4CAF50; }
.status-badge.cancelled { background: rgba(239,68,68,0.12); color: #EF4444; }
.free-tag { background: rgba(212,175,55,0.15); color: #D4AF37; font-size: 0.82rem; padding: 0.15rem 0.5rem; border-radius: 6px; }
.tracking-link { color: #D4AF37; text-decoration: none; font-size: 0.85rem; font-family: monospace; }
.muted { color: #9b8abe; }
.empty-state { text-align: center; padding: 3rem; color: #6b5b95; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
</style>
