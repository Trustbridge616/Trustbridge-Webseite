<template>
  <AdminLayout>
    <div class="page-head">
      <div><h1>Nutzerverwaltung</h1><p>Alle registrierten Nutzer verwalten</p></div>
      <div class="head-actions">
        <input v-model="search" class="search-input" placeholder="Suchen..." />
      </div>
    </div>

    <div class="admin-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>E-Mail</th><th>Admin</th><th>Abos</th><th>Guthaben</th><th>Registriert</th><th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="muted">{{ user.id }}</td>
            <td><strong>{{ user.name }}</strong></td>
            <td>{{ user.email }}</td>
            <td>
              <span class="badge" :class="user.is_admin ? 'admin' : 'user'">
                {{ user.is_admin ? 'Admin' : 'Nutzer' }}
              </span>
            </td>
            <td>{{ user.subscriptions_count ?? 0 }}</td>
            <td>{{ user.credit_balance ?? 0 }} €</td>
            <td class="muted">{{ new Date(user.created_at).toLocaleDateString('de') }}</td>
            <td>
              <div class="action-row">
                <button class="action-btn bonus" @click="openBonus(user)" title="Bonus / Guthaben aufladen">🎁</button>
                <button class="action-btn edit" @click="openEdit(user)">Bearbeiten</button>
                <button class="action-btn danger" @click="confirmDelete(user)">Löschen</button>
              </div>
            </td>
          </tr>
          <tr v-if="!filteredUsers.length"><td colspan="8" class="empty">Keine Nutzer gefunden.</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div class="modal-overlay" v-if="editUser" @click.self="editUser = null">
      <!-- ... existing edit modal content ... -->
      <div class="modal">
        <div class="modal-header">
          <h3>Nutzer bearbeiten</h3>
          <p>{{ editUser.name }} ({{ editUser.email }})</p>
        </div>
        
        <form @submit.prevent="saveUser">
          
          <div class="modal-section">
            <h4 class="form-subhead">Konto-Details</h4>
            <div class="form-row">
              <div class="form-group"><label>Name</label><input v-model="editForm.name" required /></div>
              <div class="form-group"><label>E-Mail</label><input type="email" v-model="editForm.email" required /></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>Guthaben (€)</label><input type="number" step="0.01" v-model="editForm.credit_balance" /></div>
            </div>
            <div class="form-check">
              <input type="checkbox" id="is_admin" v-model="editForm.is_admin" />
              <label for="is_admin">Administrator-Rechte erteilen</label>
            </div>
          </div>

          <div class="modal-section">
            <h4 class="form-subhead">Versandadresse</h4>
            <div class="form-row">
              <div class="form-group span-2"><label>Straße</label><input v-model="editForm.street" placeholder="Musterstraße" /></div>
              <div class="form-group"><label>Hausnr.</label><input v-model="editForm.house_number" placeholder="12a" /></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>PLZ</label><input v-model="editForm.zip" placeholder="12345" /></div>
              <div class="form-group"><label>Stadt</label><input v-model="editForm.city" placeholder="Musterstadt" /></div>
              <div class="form-group"><label>Land</label><input v-model="editForm.country" /></div>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="editUser = null">Abbrechen</button>
            <button type="submit" class="btn-save">Speichern</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bonus Modal -->
    <div class="modal-overlay" v-if="bonusUser" @click.self="bonusUser = null">
      <div class="modal small-modal">
        <div class="modal-header">
          <h3>🎁 Bonus / Guthaben zuweisen</h3>
          <p>Für Nutzer: {{ bonusUser.name }}</p>
        </div>
        
        <form @submit.prevent="saveBonus">
          <div class="form-group">
            <label>Betrag in Euro (€)</label>
            <input type="number" step="1" v-model="bonusForm.amount" required min="1" placeholder="z.B. 20" />
            <small class="muted-text">Dieser Betrag wird als Stripe-Guthaben gebucht und für die nächste Box verrechnet.</small>
          </div>
          
          <div class="form-group">
            <label>Notiz / Grund (optional)</label>
            <input type="text" v-model="bonusForm.note" placeholder="z.B. Erstattung für Verspätung" />
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="bonusUser = null">Abbrechen</button>
            <button type="submit" class="btn-save" :disabled="bonusForm.processing">
              {{ bonusForm.processing ? 'Wird gebucht...' : 'Bonus aufladen' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

const props = defineProps({ users: Array });
const search = ref('');
const editUser = ref(null);
const bonusUser = ref(null);

const editForm = reactive({ 
  name: '', 
  email: '', 
  credit_balance: 0, 
  is_admin: false,
  street: '',
  house_number: '',
  zip: '',
  city: '',
  country: 'Deutschland'
});

const bonusForm = useForm({
  amount: 10,
  note: ''
});

const filteredUsers = computed(() =>
  (props.users || []).filter(u =>
    u.name.toLowerCase().includes(search.value.toLowerCase()) ||
    u.email.toLowerCase().includes(search.value.toLowerCase())
  )
);

const openEdit = (user) => {
  editUser.value = user;
  editForm.name = user.name;
  editForm.email = user.email;
  editForm.credit_balance = user.credit_balance ?? 0;
  editForm.is_admin = user.is_admin ?? false;
  editForm.street = user.street || '';
  editForm.house_number = user.house_number || '';
  editForm.zip = user.zip || '';
  editForm.city = user.city || '';
  editForm.country = user.country || 'Deutschland';
};

const saveUser = () => {
  useForm(editForm).put(`/admin/users/${editUser.value.id}`, {
    onSuccess: () => { editUser.value = null; }
  });
};

const openBonus = (user) => {
  bonusUser.value = user;
  bonusForm.amount = 10;
  bonusForm.note = '';
  bonusForm.clearErrors();
};

const saveBonus = () => {
  bonusForm.post(`/admin/users/${bonusUser.value.id}/bonus`, {
    onSuccess: () => { bonusUser.value = null; }
  });
};

const confirmDelete = (user) => {
  if (confirm(`Nutzer "${user.name}" wirklich löschen?`)) {
    useForm({}).delete(`/admin/users/${user.id}`);
  }
};
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.75rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.page-head p { color: #6b5b95; font-size: 0.92rem; margin: 0; }
.search-input { padding: 0.7rem 1.1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-size: 0.9rem; background: white; color: #2D1B54; min-width: 240px; font-family: inherit; }
.search-input:focus { outline: none; border-color: #D4AF37; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.data-table th { text-align: left; padding: 0.6rem 0.9rem; font-size: 0.75rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; white-space: nowrap; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: rgba(248,246,255,0.5); }
.muted { color: #9b8abe !important; font-size: 0.82rem; }
.badge { padding: 0.2rem 0.65rem; border-radius: 50px; font-size: 0.75rem; font-weight: bold; }
.badge.admin { background: rgba(212,175,55,0.15); color: #D4AF37; }
.badge.user { background: rgba(45,27,84,0.08); color: #6b5b95; }
.action-row { display: flex; gap: 0.5rem; }
.action-btn { padding: 0.35rem 0.85rem; border-radius: 8px; font-size: 0.78rem; font-weight: bold; font-family: inherit; cursor: pointer; border: none; transition: all 0.2s; }
.action-btn.edit { background: rgba(45,27,84,0.08); color: #2D1B54; }
.action-btn.edit:hover { background: rgba(45,27,84,0.15); }
.action-btn.danger { background: rgba(239,68,68,0.1); color: #EF4444; }
.action-btn.danger:hover { background: rgba(239,68,68,0.2); }
.action-btn.bonus { background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05)); border: 1px solid rgba(212,175,55,0.3); font-size: 0.9rem; padding: 0.25rem 0.6rem; }
.action-btn.bonus:hover { background: rgba(212,175,55,0.2); transform: scale(1.05); }
.empty { color: #6b5b95; text-align: center; padding: 2rem; font-style: italic; }
.modal-overlay { position: fixed; inset: 0; background: rgba(26,10,54,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal { background: white; border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 550px; box-shadow: 0 25px 60px rgba(0,0,0,0.3); overflow-y: auto; max-height: 90vh; }
.modal.small-modal { max-width: 450px; }
.modal-header { margin-bottom: 2rem; border-bottom: 1px solid rgba(45,27,84,0.05); padding-bottom: 1rem; }
.modal-header h3 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.35rem; margin: 0 0 0.25rem 0; background: none; -webkit-text-fill-color: #2D1B54; }
.modal-header p { color: #6b5b95; font-size: 0.9rem; margin: 0; }
.modal-section { margin-bottom: 2rem; background: #faf9ff; padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(45,27,84,0.04); }
.form-group { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
.form-group label { font-size: 0.78rem; font-weight: 800; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; }
.form-group input { padding: 0.8rem 1rem; border: 2px solid rgba(45,27,84,0.08); border-radius: 10px; font-size: 0.92rem; font-family: inherit; color: #2D1B54; background: white; transition: all 0.2s; box-sizing: border-box; width: 100%; }
.form-group input:focus { outline: none; border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.1); }
.form-subhead { font-size: 0.8rem; font-weight: 900; color: #2D1B54; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem; }
.form-subhead::before { content: ''; display: inline-block; width: 6px; height: 18px; background: #D4AF37; border-radius: 4px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 0.5rem; }
.form-row:has(.span-2) { grid-template-columns: 2fr 1fr; }
.form-check { display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; color: #4a3870; font-size: 0.92rem; padding: 0.75rem; background: rgba(212,175,55,0.05); border-radius: 8px; border: 1px solid rgba(212,175,55,0.1); }
.form-check input { accent-color: #D4AF37; width: 18px; height: 18px; cursor: pointer; }
.form-check label { cursor: pointer; font-weight: 600; }
.modal-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem; }
.btn-cancel { padding: 0.8rem 1.75rem; background: #f0ecfa; color: #2D1B54; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; font-family: inherit; font-size: 0.95rem; transition: background 0.2s; }
.btn-cancel:hover { background: #e0d9f0; }
.btn-save { padding: 0.8rem 1.75rem; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; border: none; border-radius: 50px; font-weight: 900; cursor: pointer; font-family: inherit; font-size: 0.95rem; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 15px rgba(212,175,55,0.2); }
.btn-save:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,175,55,0.3); }
.btn-save:disabled { opacity: 0.7; cursor: not-allowed; }
.muted-text { color: #9b8abe; font-size: 0.75rem; display: block; margin-top: 0.35rem; line-height: 1.3; }
</style>
