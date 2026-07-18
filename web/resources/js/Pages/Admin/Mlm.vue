<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>MLM / Partnerprogramm</h1><p>Empfehlungen verwalten, Testprovisionen buchen, Gratis-Pakete überwachen</p></div>
    </div>

    <!-- Stats -->
    <div class="stats-grid">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="stat-top"><span class="stat-label">{{ s.label }}</span><div class="stat-icon" :class="s.color" v-html="s.icon"></div></div>
        <div class="stat-value">{{ s.value }}</div>
      </div>
    </div>

    <!-- Einstellungen -->
    <div class="admin-card settings-card">
      <div class="card-head">
        <h2>⚙️ MLM-Einstellungen</h2>
        <button class="btn-save" @click="saveSettings" :disabled="savingSettings">
          {{ savingSettings ? 'Speichert...' : '✓ Speichern' }}
        </button>
      </div>
      <div class="settings-grid">
        <div class="form-group" v-for="setting in editableSettings" :key="setting.key">
          <label>{{ setting.label }}</label>
          <div class="toggle-wrapper" v-if="setting.type === 'boolean'">
            <button type="button" class="toggle" :class="{ on: setting.value == 1 }" @click="setting.value = setting.value == 1 ? 0 : 1">
              {{ setting.value == 1 ? 'AKTIV' : 'INAKTIV' }}
            </button>
          </div>
          <select v-else-if="setting.type === 'string' && setting.key === 'commission_payout_type'" v-model="setting.value">
            <option value="free_package">Gratis-Paket</option>
            <option value="credit">Guthaben (€)</option>
          </select>
          <div class="input-addon" v-else>
            <input :type="setting.type === 'integer' ? 'number' : 'text'" v-model="setting.value" />
            <span class="addon" v-if="setting.key.includes('percent')">%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Test-Provision buchen -->
    <div class="admin-card test-card">
      <h2>🧪 Testprovision buchen</h2>
      <p class="test-desc">Buche eine Testprovision für einen Nutzer, um den Gratis-Paket-Flow im Kunden-Dashboard zu testen.</p>
      <form class="test-form" @submit.prevent="bookTestProvision">
        <div class="form-group">
          <label>Nutzer auswählen</label>
          <select v-model="testForm.user_id" required>
            <option value="">— Nutzer wählen —</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ u.name }} ({{ u.email }})</option>
          </select>
        </div>
        <div class="form-group">
          <label>Anzahl Gratis-Pakete</label>
          <input type="number" v-model="testForm.amount" min="1" max="10" />
        </div>
        <div class="form-group">
          <label>Notiz (optional)</label>
          <input type="text" v-model="testForm.note" placeholder="z. B. Testprovision vom Admin" />
        </div>
        <button type="submit" class="btn-book" :disabled="booking">
          {{ booking ? 'Wird gebucht...' : '✓ Provision einbuchen' }}
        </button>
        <div class="success-msg" v-if="booked">✅ Provision erfolgreich eingebucht!</div>
      </form>
    </div>

    <!-- Empfehlungsübersicht -->
    <div class="admin-card">
      <div class="card-head">
        <h2>Alle Empfehlungen</h2>
        <input v-model="search" class="search-input" placeholder="Nutzer suchen..." />
      </div>
      <table class="data-table">
        <thead><tr><th>Sponsor</th><th>Geworbener</th><th>Datum</th><th>Abo aktiv</th><th>Provisionen</th><th>Aktionen</th></tr></thead>
        <tbody>
          <tr v-for="ref in filteredRefs" :key="ref.id">
            <td><strong>{{ ref.sponsor?.name ?? '—' }}</strong><br/><small class="muted">{{ ref.sponsor?.email }}</small></td>
            <td>{{ ref.name }}<br/><small class="muted">{{ ref.email }}</small></td>
            <td class="muted">{{ new Date(ref.created_at).toLocaleDateString('de') }}</td>
            <td><span class="badge" :class="ref.subscriptions?.length > 0 ? 'active' : 'pending'">{{ ref.subscriptions?.length > 0 ? 'Ja' : 'Nein' }}</span></td>
            <td>{{ ref.sponsor_id ? commissionCount(ref.sponsor_id) : '—' }}</td>
            <td>
              <button class="action-btn edit" @click="quickBook(ref.sponsor_id)" v-if="ref.sponsor_id">
                +1 Provision
              </button>
            </td>
          </tr>
          <tr v-if="!filteredRefs.length"><td colspan="6" class="empty">Keine Empfehlungen gefunden.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Provisionshistorie -->
    <div class="admin-card">
      <h2>Provisionshistorie</h2>
      <table class="data-table">
        <thead><tr><th>Nutzer</th><th>Typ</th><th>Betrag</th><th>Notiz</th><th>Datum</th></tr></thead>
        <tbody>
          <tr v-for="c in commissions" :key="c.id">
            <td>{{ c.user?.name ?? '—' }}</td>
            <td><span class="badge gold">{{ c.type === 'free_package' ? '🎁 Gratis-Paket' : c.type }}</span></td>
            <td>{{ c.amount ?? '1 Paket' }}</td>
            <td class="muted">{{ c.note ?? '—' }}</td>
            <td class="muted">{{ new Date(c.created_at).toLocaleDateString('de') }}</td>
          </tr>
          <tr v-if="!commissions?.length"><td colspan="5" class="empty">Keine Provisionen vorhanden.</td></tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ users: Array, referrals: Array, commissions: Array, settings: Array });

const search = ref('');
const booking = ref(false);
const booked = ref(false);
const savingSettings = ref(false);
const testForm = reactive({ user_id: '', amount: 1, note: 'Testprovision vom Admin' });

const editableSettings = ref(JSON.parse(JSON.stringify(props.settings || [])));

const stats = computed(() => [
  { label: 'Empfehlungen gesamt', value: props.referrals?.length ?? 0, color: 'blue', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { label: 'Erfolgreiche Empfehlungen', value: props.referrals?.filter(r => r.subscriptions?.length > 0).length ?? 0, color: 'green', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' },
  { label: 'Provisionen gesamt', value: props.commissions?.length ?? 0, color: 'gold', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>' },
  { label: 'Gratis-Pakete eingelöst', value: props.commissions?.filter(c => c.type === 'free_package').length ?? 0, color: 'purple', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>' },
]);

const filteredRefs = computed(() =>
  (props.referrals || []).filter(r =>
    r.name?.toLowerCase().includes(search.value.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.value.toLowerCase()) ||
    r.sponsor?.name?.toLowerCase().includes(search.value.toLowerCase())
  )
);

const commissionCount = (userId) => props.commissions?.filter(c => c.user_id === userId).length ?? 0;

const bookTestProvision = () => {
  booking.value = true;
  useForm(testForm).post('/admin/mlm/provision', {
    onSuccess: () => { booking.value = false; booked.value = true; setTimeout(() => booked.value = false, 3000); },
    onError: () => { booking.value = false; },
  });
};

const quickBook = (userId) => {
  useForm({ user_id: userId, amount: 1, note: 'Schnell-Provision via Admin' }).post('/admin/mlm/provision');
};

const saveSettings = () => {
  savingSettings.value = true;
  useForm({ settings: editableSettings.value }).post('/admin/mlm/settings', {
    onSuccess: () => savingSettings.value = false,
    onError: () => savingSettings.value = false,
  });
};
</script>

<style scoped>
.page-head { margin-bottom: 2rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; margin: 0; font-size: 0.92rem; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 1.75rem; }
.stat-card { background: white; border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 15px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.stat-label { font-size: 0.78rem; color: #6b5b95; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.stat-icon.blue { background: rgba(59,130,246,0.12); color: #3B82F6; }
.stat-icon.green { background: rgba(76,175,80,0.12); color: #4CAF50; }
.stat-icon.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }
.stat-icon.purple { background: rgba(45,27,84,0.1); color: #2D1B54; }
.stat-value { font-size: 2rem; font-weight: 900; color: #2D1B54; font-family: 'Century Gothic', system-ui, sans-serif; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; overflow-x: auto; }
.admin-card h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.1rem; margin-bottom: 0.5rem; background: none; -webkit-text-fill-color: #2D1B54; }
.test-card { border-color: rgba(212,175,55,0.35); background: linear-gradient(135deg, #fefdf5, white); }
.test-desc { color: #6b5b95; font-size: 0.9rem; margin-bottom: 1.5rem; }
.test-form { display: grid; grid-template-columns: 2fr 1fr 2fr auto; gap: 1rem; align-items: end; }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.form-group label { font-size: 0.78rem; font-weight: 700; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; }
.form-group select, .form-group input { padding: 0.75rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.9rem; font-family: inherit; color: #2D1B54; background: #f8f6ff; }
.form-group select:focus, .form-group input:focus { outline: none; border-color: #D4AF37; }
.btn-book { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 10px; padding: 0.75rem 1.5rem; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.9rem; transition: all 0.2s; white-space: nowrap; height: fit-content; }
.btn-book:hover:not(:disabled) { transform: translateY(-1px); }
.btn-book:disabled { opacity: 0.7; }
.success-msg { color: #4CAF50; font-weight: bold; font-size: 0.9rem; align-self: center; }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.card-head h2 { margin-bottom: 0; }
.btn-save { padding: 0.6rem 1.2rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.85rem; }
.settings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; }
.toggle { width: 100%; padding: 0.75rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: #f0ecfa; color: #9b8abe; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.85rem; transition: all 0.2s; }
.toggle.on { background: #4CAF50; border-color: #4CAF50; color: white; }
.input-addon { display: flex; align-items: center; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; background: #f8f6ff; overflow: hidden; }
.input-addon input { border: none; padding: 0.75rem 1rem; flex: 1; background: transparent; width: 100%; font-family: inherit; color: #2D1B54; font-size: 0.9rem; }
.input-addon input:focus { outline: none; }
.input-addon .addon { padding: 0.75rem 1rem; background: rgba(45,27,84,0.05); color: #6b5b95; font-weight: bold; border-left: 2px solid rgba(45,27,84,0.12); }
.search-input { padding: 0.6rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.88rem; background: #f8f6ff; color: #2D1B54; min-width: 200px; font-family: inherit; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.data-table th { text-align: left; padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.muted { color: #9b8abe !important; font-size: 0.82rem; }
.badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.badge.active { background: rgba(76,175,80,0.12); color: #4CAF50; }
.badge.pending { background: rgba(245,158,11,0.12); color: #F59E0B; }
.badge.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }
.action-btn { padding: 0.3rem 0.8rem; border-radius: 8px; font-size: 0.78rem; font-weight: bold; font-family: inherit; cursor: pointer; border: none; }
.action-btn.edit { background: rgba(212,175,55,0.12); color: #D4AF37; }
.action-btn.edit:hover { background: rgba(212,175,55,0.25); }
.empty { text-align: center; color: #6b5b95; padding: 2rem; font-style: italic; }
@media (max-width: 900px) { .test-form { grid-template-columns: 1fr 1fr; } .stats-grid { grid-template-columns: 1fr 1fr; } }
</style>
