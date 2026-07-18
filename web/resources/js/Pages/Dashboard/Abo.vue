<template>
  <DashboardLayout>
    <div class="page-head"><h1>Mein Abo</h1><p>Verwalte deine aktiven Abonnements</p></div>

    <div v-if="user.subscriptions?.length > 0">
      <div class="sub-card" v-for="sub in user.subscriptions" :key="sub.id">
        <div class="sub-header">
          <div class="sub-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
          </div>
          <div class="sub-title">
            <h2>{{ sub.category?.name ?? 'Gemischt' }} Box</h2>
            <span class="status-badge" :class="sub.status">{{ sub.status === 'active' ? '✓ Aktiv' : sub.status }}</span>
          </div>
        </div>
        <div class="sub-details">
          <div class="detail-item">
            <label>Mindestlaufzeit</label>
            <strong>{{ sub.duration_months }} Monate</strong>
          </div>
          <div class="detail-item">
            <label>Beginn</label>
            <strong>{{ sub.created_at ? new Date(sub.created_at).toLocaleDateString('de') : '—' }}</strong>
          </div>
          <div class="detail-item">
            <label>Nächste Zahlung</label>
            <strong>{{ sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString('de') : '—' }}</strong>
          </div>
          <div class="detail-item">
            <label>Monatlicher Betrag</label>
            <strong>{{ sub.amount ?? '—' }} €</strong>
          </div>
        </div>
        <div class="sub-footer" v-if="sub.status === 'active'">
          <button class="btn-cancel" @click="confirmCancel(sub)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Abo kündigen
          </button>
          <p class="cancel-note">Kündigung wird zum Ende der Mindestlaufzeit wirksam.</p>
        </div>
        <div class="sub-footer cancelled-note" v-else-if="sub.status === 'cancelled'">
          ✗ Dieses Abo wurde gekündigt und läuft zum Ende der Laufzeit aus.
        </div>
      </div>
    </div>

    <div v-else class="empty-card">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
      <h3>Noch kein aktives Abo</h3>
      <p>Wähle ein Paket und starte noch heute mit Trustbridge.</p>
      <Link href="/prizes" class="btn-primary">Paket wählen →</Link>
    </div>
  </DashboardLayout>
</template>
<script setup>
import { Link, useForm } from '@inertiajs/vue3';
import DashboardLayout from '../../Layouts/DashboardLayout.vue';
const props = defineProps({ user: Object });
const confirmCancel = (sub) => {
  if (confirm(`Abo wirklich kündigen? Es läuft bis Ende der Mindestlaufzeit weiter.`)) {
    useForm({}).post(`/dashboard/partner/cancel-abo/${sub.id}`);
  }
};
</script>
<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.sub-card { background: white; border-radius: 20px; padding: 2rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.12); }
.sub-header { display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.75rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(45,27,84,0.07); }
.sub-icon { width: 56px; height: 56px; border-radius: 14px; background: rgba(212,175,55,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sub-title h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.2rem; margin-bottom: 0.4rem; background: none; -webkit-text-fill-color: #2D1B54; }
.status-badge { padding: 0.25rem 0.85rem; border-radius: 50px; font-size: 0.8rem; font-weight: bold; }
.status-badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.status-badge.cancelled { background: rgba(239,68,68,0.1); color: #EF4444; }
.sub-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 1.5rem; }
.detail-item { display: flex; flex-direction: column; gap: 0.3rem; }
.detail-item label { font-size: 0.78rem; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.detail-item strong { color: #2D1B54; font-size: 1.05rem; }
.sub-footer { display: flex; align-items: center; gap: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(45,27,84,0.07); }
.btn-cancel { display: flex; align-items: center; gap: 0.5rem; background: rgba(239,68,68,0.08); color: #EF4444; border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: bold; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.btn-cancel:hover { background: rgba(239,68,68,0.15); }
.cancel-note { color: #6b5b95; font-size: 0.82rem; margin: 0; }
.cancelled-note { color: #EF4444; font-size: 0.88rem; }
.empty-card { background: white; border-radius: 20px; padding: 4rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); }
.empty-card h3 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.3rem; background: none; -webkit-text-fill-color: #2D1B54; }
.empty-card p { color: #6b5b95; font-size: 0.95rem; }
.btn-primary { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 0.85rem 2rem; border-radius: 50px; font-weight: bold; text-decoration: none; }
@media (max-width: 768px) { .sub-details { grid-template-columns: 1fr 1fr; } }
</style>
