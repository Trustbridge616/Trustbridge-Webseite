<template>
  <DashboardLayout>
    <div class="page-head"><h1>Partnerprogramm</h1><p>Dein Empfehlungsstatus und Gratis-Pakete</p></div>

    <!-- Gratis-Paket Banner -->
    <div class="free-pkg-banner" v-if="availablePackages > 0">
      <div class="banner-left">
        <div class="banner-icon">🎁</div>
        <div>
          <strong>{{ availablePackages }} Gratis-Paket{{ availablePackages > 1 ? 'e' : '' }} verfügbar!</strong>
          <p>Deine geworbenen Freunde haben sich erfolgreich angemeldet. Bestell jetzt!</p>
        </div>
      </div>
      <button class="btn-order-free" @click="showOrderModal = true">Jetzt bestellen →</button>
    </div>

    <!-- Stats -->
    <div class="partner-stats">
      <div class="pstat">
        <strong>{{ user.referrals?.length ?? 0 }}</strong>
        <span>Empfehlungen gesamt</span>
      </div>
      <div class="pstat">
        <strong>{{ successfulReferrals }}</strong>
        <span>Davon erfolgreich</span>
      </div>
      <div class="pstat gold">
        <strong>{{ free_packages_earned }}</strong>
        <span>Gratis-Pakete verdient</span>
      </div>
      <div class="pstat">
        <strong>{{ free_packages_used }}</strong>
        <span>Bereits eingelöst</span>
      </div>
    </div>

    <!-- Empfehlungslink -->
    <div class="dash-card">
      <h2>Dein Empfehlungslink</h2>
      <div class="ref-row">
        <input type="text" :value="refLink" readonly class="ref-input" id="refLinkInput" />
        <button class="btn-copy" @click="copyLink">{{ copied ? '✓ Kopiert' : 'Kopieren' }}</button>
      </div>
      
      <div class="share-actions">
        <a :href="`https://wa.me/?text=Entdecke%20Trustbridge!%20Melde%20dich%20hier%20an:%20${encodeURIComponent(refLink)}`" target="_blank" class="share-btn whatsapp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          WhatsApp
        </a>
        <a :href="`https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=Entdecke%20Trustbridge!`" target="_blank" class="share-btn telegram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          Telegram
        </a>
        <a :href="`mailto:?subject=Trustbridge%20Einladung&body=Hey,%20schau%20dir%20mal%20Trustbridge%20an!%20Hier%20ist%20mein%20Link:%20${encodeURIComponent(refLink)}`" class="share-btn mail">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          E-Mail
        </a>
      </div>
      
      <p class="ref-tip">Teile diesen Link per WhatsApp, Telegram oder E-Mail. Für jeden Freund, der sich anmeldet und ein Abo abschließt, erhältst du automatisch ein Gratis-Paket.</p>
    </div>

    <!-- Geworbene Freunde -->
    <div class="dash-card">
      <h2>Geworbene Freunde</h2>
      <div v-if="user.referrals?.length > 0">
        <div class="ref-row-table header"><span>Name</span><span>Dabei seit</span><span>Abo aktiv</span><span>Status</span></div>
        <div class="ref-row-table" v-for="ref in user.referrals" :key="ref.id">
          <span>{{ ref.name }}</span>
          <span>{{ new Date(ref.created_at).toLocaleDateString('de') }}</span>
          <span>{{ ref.subscriptions?.length > 0 ? 'Ja' : 'Nein' }}</span>
          <span>
            <span class="status-badge" :class="ref.subscriptions?.length > 0 ? 'active' : 'pending'">
              {{ ref.subscriptions?.length > 0 ? '✓ Prämie erhalten' : 'Noch kein Abo' }}
            </span>
          </span>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>Noch keine geworbenen Freunde. Teile deinen Link!</p>
      </div>
    </div>

    <!-- Bestellmodal -->
    <div class="modal-overlay" v-if="showOrderModal" @click.self="showOrderModal = false">
      <div class="modal">
        <h3>🎁 Gratis-Paket bestellen</h3>
        <p>Du hast <strong>{{ availablePackages }}</strong> Gratis-Paket{{ availablePackages > 1 ? 'e' : '' }} verfügbar.</p>
        <p class="modal-note">Das Paket wird aus deiner Standard-Kategorie zusammengestellt. Inhalt ist zufällig, Warenwert garantiert.</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showOrderModal = false">Abbrechen</button>
          <button class="btn-gold" @click="orderFree" :disabled="ordering">
            {{ ordering ? 'Wird bestellt...' : 'Gratis-Paket anfordern' }}
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import DashboardLayout from '../../Layouts/DashboardLayout.vue';

const props = defineProps({ user: Object, commissions: Array, free_packages_earned: Number, free_packages_used: Number });
const copied = ref(false);
const showOrderModal = ref(false);
const ordering = ref(false);
const baseUrl = window.location.origin;
const refLink = computed(() => `${baseUrl}/register?ref=${props.user.id}`);
const availablePackages = computed(() => Math.max(0, (props.free_packages_earned ?? 0) - (props.free_packages_used ?? 0)));
const successfulReferrals = computed(() => props.user.referrals?.filter(r => r.subscriptions?.length > 0).length ?? 0);

const copyLink = () => { navigator.clipboard.writeText(refLink.value); copied.value = true; setTimeout(() => copied.value = false, 2000); };
const orderFree = () => {
  ordering.value = true;
  useForm({}).post('/dashboard/partner/free-package', { onSuccess: () => { showOrderModal.value = false; ordering.value = false; }, onError: () => { ordering.value = false; } });
};
</script>
<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.free-pkg-banner { background: linear-gradient(135deg, #2D1B54, #4a238a); border-radius: 20px; padding: 1.75rem 2rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem; border: 1px solid rgba(212,175,55,0.3); gap: 1rem; flex-wrap: wrap; }
.banner-left { display: flex; align-items: center; gap: 1.25rem; }
.banner-icon { font-size: 2.5rem; }
.banner-left strong { display: block; color: #D4AF37; font-size: 1.1rem; margin-bottom: 0.25rem; }
.banner-left p { color: rgba(255,255,255,0.75); font-size: 0.9rem; margin: 0; }
.btn-order-free { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 50px; padding: 0.85rem 2rem; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.95rem; transition: all 0.3s; white-space: nowrap; }
.btn-order-free:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(212,175,55,0.4); }
.partner-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 1.75rem; }
.pstat { background: white; border-radius: 16px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 15px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.pstat.gold { border-color: rgba(212,175,55,0.4); background: linear-gradient(135deg, #fefdf5, #fff8e7); }
.pstat strong { display: block; font-size: 2rem; font-weight: 900; color: #2D1B54; font-family: 'Century Gothic', system-ui, sans-serif; margin-bottom: 0.25rem; }
.pstat.gold strong { color: #D4AF37; }
.pstat span { color: #6b5b95; font-size: 0.82rem; }
.dash-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; }
.dash-card h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.1rem; margin-bottom: 1.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.ref-row { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
.ref-input { flex: 1; padding: 0.75rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.85rem; color: #4a3870; background: #f8f6ff; font-family: monospace; }
.btn-copy { background: #2D1B54; color: white; border: none; border-radius: 10px; padding: 0 1.25rem; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.85rem; transition: background 0.2s; white-space: nowrap; }
.btn-copy:hover { background: #4a238a; }
.share-actions { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
.share-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.25rem; border-radius: 10px; font-weight: bold; font-size: 0.85rem; color: white; text-decoration: none; transition: all 0.2s; }
.share-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.share-btn.whatsapp { background: #25D366; }
.share-btn.telegram { background: #0088cc; }
.share-btn.mail { background: #6b5b95; }
.ref-tip { color: #6b5b95; font-size: 0.85rem; line-height: 1.6; margin: 0; }
.ref-row-table { display: grid; grid-template-columns: 1.5fr 1.2fr 1fr 1.5fr; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(45,27,84,0.06); font-size: 0.88rem; color: #4a3870; }
.ref-row-table.header { font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #6b5b95; background: #f8f6ff; padding: 0.6rem 1rem; border-radius: 8px; border-bottom: none; margin-bottom: 0.25rem; }
.ref-row-table:last-child { border-bottom: none; }
.status-badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.status-badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.status-badge.pending { background: rgba(245,158,11,0.12); color: #F59E0B; }
.empty-state { text-align: center; padding: 2rem; color: #6b5b95; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: white; border-radius: 20px; padding: 2rem; max-width: 420px; width: 100%; box-shadow: 0 25px 60px rgba(0,0,0,0.25); }
.modal h3 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.2rem; margin-bottom: 1rem; background: none; -webkit-text-fill-color: #2D1B54; }
.modal p { color: #6b5b95; font-size: 0.92rem; margin-bottom: 0.75rem; }
.modal-note { background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2); border-radius: 8px; padding: 0.75rem; color: #4a3870 !important; font-size: 0.85rem !important; }
.modal-actions { display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem; }
.btn-cancel { background: #f0ecfa; color: #2D1B54; border: none; border-radius: 50px; padding: 0.7rem 1.5rem; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-gold { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 50px; padding: 0.7rem 1.5rem; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-gold:disabled { opacity: 0.7; }
@media (max-width: 768px) { .partner-stats { grid-template-columns: 1fr 1fr; } }
</style>
