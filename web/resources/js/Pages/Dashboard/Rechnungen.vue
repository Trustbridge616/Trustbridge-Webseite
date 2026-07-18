<template>
  <DashboardLayout>
    <div class="page-head"><h1>Rechnungen</h1><p>Alle Zahlungsbelege und Downloadlinks</p></div>
    <div class="dash-card">
      <div v-if="invoices?.length > 0">
        <div class="inv-row header"><span>Rechnungsnummer</span><span>Datum</span><span>Betrag</span><span>Dokument</span></div>
        <div class="inv-row" v-for="inv in invoices" :key="inv.id">
          <span class="mono">{{ inv.id }}</span>
          <span>{{ inv.date }}</span>
          <span class="gold">{{ inv.total }}</span>
          <span><a :href="inv.url" target="_blank" class="dl-link">PDF herunterladen →</a></span>
        </div>
      </div>
      <div v-else class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p>Noch keine Rechnungen vorhanden.</p>
        <p class="sub">Rechnungen werden nach der Stripe-Integration automatisch generiert.</p>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import DashboardLayout from '../../Layouts/DashboardLayout.vue';
defineProps({ invoices: Array, user: Object });
</script>
<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.dash-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.inv-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(45,27,84,0.06); font-size: 0.9rem; color: #4a3870; align-items: center; }
.inv-row.header { font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #6b5b95; background: #f8f6ff; padding: 0.6rem 1rem; border-radius: 8px; border-bottom: none; margin-bottom: 0.25rem; }
.inv-row:last-child { border-bottom: none; }
.mono { font-family: monospace; font-size: 0.82rem; color: #6b5b95; }
.gold { color: #D4AF37; font-weight: bold; }
.dl-link { color: #D4AF37; text-decoration: none; font-size: 0.88rem; font-weight: bold; }
.dl-link:hover { text-decoration: underline; }
.empty-state { text-align: center; padding: 3rem; color: #6b5b95; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.empty-state p { margin: 0; }
.sub { font-size: 0.82rem; color: #b0a0c8 !important; }
</style>
