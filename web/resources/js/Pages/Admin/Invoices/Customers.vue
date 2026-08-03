<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Kunden</h1>
        <p class="subtitle">Rechnungsempfänger für das Invoice Center</p>
      </div>
      <div class="head-actions">
        <Link href="/admin/rechnungen" class="btn-secondary">← Rechnungen</Link>
        <button class="btn-gold-solid" @click="openCreate">+ Neuer Kunde</button>
      </div>
    </div>

    <div v-if="$page.props.flash?.success" class="flash flash-success">{{ $page.props.flash.success }}</div>
    <div v-if="$page.props.flash?.error" class="flash flash-error">{{ $page.props.flash.error }}</div>

    <div class="admin-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Kundennr.</th>
            <th>Firma</th>
            <th>Ansprechpartner</th>
            <th>Land</th>
            <th>USt-IdNr.</th>
            <th>Zahlungsziel</th>
            <th>Rechnungen</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in customers" :key="c.id">
            <td><strong>{{ c.customer_number }}</strong></td>
            <td>
              <div>{{ c.legal_name }}</div>
              <div class="cell-sub">{{ c.email }}</div>
            </td>
            <td>{{ c.contact_name ?? '—' }}</td>
            <td>{{ c.country }}</td>
            <td>
              <template v-if="c.vat_id">{{ c.vat_id }}</template>
              <span v-else class="warn-badge" title="Ausstellen erfordert eine ausdrückliche Bestätigung der unternehmerischen Nutzung (beim Ausstellen der Rechnung).">ohne USt-IdNr.</span>
            </td>
            <td>{{ c.default_payment_terms_days }} Tage</td>
            <td>{{ c.invoices_count }}</td>
            <td class="row-actions">
              <button class="btn-mini" @click="openEdit(c)">Bearbeiten</button>
              <button
                v-if="c.invoices_count === 0"
                class="btn-mini danger"
                @click="destroy(c)"
              >Löschen</button>
            </td>
          </tr>
          <tr v-if="customers.length === 0">
            <td colspan="8" class="empty">Noch keine Kunden. Lege den ersten Kunden an.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal: Kunde anlegen / bearbeiten -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ editing ? `Kunde ${editing.customer_number} bearbeiten` : 'Neuer Kunde' }}</h2>

        <div class="form-grid">
          <label class="field span-2">
            <span>Firmenname (legal name) *</span>
            <input v-model="form.legal_name" type="text" />
            <em v-if="form.errors.legal_name">{{ form.errors.legal_name }}</em>
          </label>
          <label class="field">
            <span>Ansprechpartner</span>
            <input v-model="form.contact_name" type="text" />
          </label>
          <label class="field">
            <span>E-Mail *</span>
            <input v-model="form.email" type="email" />
            <em v-if="form.errors.email">{{ form.errors.email }}</em>
          </label>
          <label class="field span-2">
            <span>Straße und Hausnummer *</span>
            <input v-model="form.address_line1" type="text" />
            <em v-if="form.errors.address_line1">{{ form.errors.address_line1 }}</em>
          </label>
          <label class="field span-2">
            <span>Adresszusatz</span>
            <input v-model="form.address_line2" type="text" />
          </label>
          <label class="field">
            <span>PLZ</span>
            <input v-model="form.zip" type="text" />
          </label>
          <label class="field">
            <span>Stadt *</span>
            <input v-model="form.city" type="text" />
            <em v-if="form.errors.city">{{ form.errors.city }}</em>
          </label>
          <label class="field">
            <span>Land (ISO-2, z.B. DE) *</span>
            <input v-model="form.country" type="text" maxlength="2" style="text-transform: uppercase;" />
            <em v-if="form.errors.country">{{ form.errors.country }}</em>
          </label>
          <label class="field">
            <span>USt-IdNr.</span>
            <input v-model="form.vat_id" type="text" placeholder="DE123456789" />
            <em v-if="form.errors.vat_id">{{ form.errors.vat_id }}</em>
          </label>
          <label class="field">
            <span>Zahlungsziel (Tage) *</span>
            <input v-model.number="form.default_payment_terms_days" type="number" min="0" max="365" />
          </label>
          <label class="field checkbox span-2">
            <input v-model="form.is_business" type="checkbox" />
            <span>Geschäftskunde (B2B) — Voraussetzung für Reverse Charge</span>
          </label>

          <div v-if="form.is_business && !form.vat_id" class="span-2 confirm-box">
            <div class="confirm-warning">
              Ohne USt-IdNr. kann eine Rechnung erst ausgestellt werden, wenn beim
              Ausstellen die unternehmerische Nutzung ausdrücklich bestätigt wird
              (mit Nachweisreferenz, wird im Audit-Log gespeichert).
            </div>
          </div>
          <label class="field span-2">
            <span>Notizen (intern)</span>
            <textarea v-model="form.notes" rows="3"></textarea>
          </label>
        </div>

        <div class="modal-actions">
          <button class="btn-secondary" @click="closeModal">Abbrechen</button>
          <button class="btn-gold-solid" :disabled="form.processing" @click="submit">
            {{ editing ? 'Speichern' : 'Anlegen' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Link, useForm, router } from '@inertiajs/vue3'
import AdminLayout from '../../../Layouts/AdminLayout.vue'

defineProps({
  customers: Array,
})

const showModal = ref(false)
const editing = ref(null)

const form = useForm({
  legal_name: '',
  contact_name: '',
  email: '',
  address_line1: '',
  address_line2: '',
  zip: '',
  city: '',
  country: 'DE',
  vat_id: '',
  is_business: true,
  default_payment_terms_days: 7,
  notes: '',
})

function openCreate() {
  editing.value = null
  form.reset()
  form.clearErrors()
  showModal.value = true
}

function openEdit(customer) {
  editing.value = customer
  form.clearErrors()
  Object.assign(form, {
    legal_name: customer.legal_name,
    contact_name: customer.contact_name ?? '',
    email: customer.email,
    address_line1: customer.address_line1,
    address_line2: customer.address_line2 ?? '',
    zip: customer.zip ?? '',
    city: customer.city,
    country: customer.country,
    vat_id: customer.vat_id ?? '',
    is_business: !!customer.is_business,
    default_payment_terms_days: customer.default_payment_terms_days,
    notes: customer.notes ?? '',
  })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function submit() {
  const options = { preserveScroll: true, onSuccess: () => closeModal() }
  if (editing.value) {
    form.put(`/admin/rechnungen/kunden/${editing.value.id}`, options)
  } else {
    form.post('/admin/rechnungen/kunden', options)
  }
}

function destroy(customer) {
  if (confirm(`Kunde ${customer.customer_number} (${customer.legal_name}) wirklich löschen?`)) {
    router.delete(`/admin/rechnungen/kunden/${customer.id}`, { preserveScroll: true })
  }
}
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', sans-serif; color: #2D1B54; font-size: 1.75rem; background: none; -webkit-text-fill-color: #2D1B54; margin: 0; }
.subtitle { color: #6b5b95; font-size: 0.85rem; margin: 0.25rem 0 0; }
.head-actions { display: flex; gap: 0.75rem; }

.btn-gold-solid { padding: 0.7rem 1.4rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-gold-solid:disabled { opacity: 0.6; cursor: wait; }
.btn-secondary { padding: 0.7rem 1.4rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-secondary:hover { border-color: #D4AF37; color: #2D1B54; }

.flash { padding: 0.85rem 1.25rem; border-radius: 12px; margin-bottom: 1.25rem; font-size: 0.9rem; }
.flash-success { background: rgba(16,185,129,0.12); color: #047857; border: 1px solid rgba(16,185,129,0.25); }
.flash-error { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1px solid rgba(239,68,68,0.25); }

.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; text-align: left; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; font-size: 0.88rem; }
.cell-sub { font-size: 0.75rem; color: #8a8aa0; }
.empty { text-align: center; color: #8a8aa0; padding: 2.5rem 0 !important; }

.row-actions { display: flex; gap: 0.4rem; justify-content: flex-end; }
.btn-mini { padding: 0.35rem 0.75rem; border-radius: 8px; border: 1.5px solid rgba(45,27,84,0.15); background: white; color: #2D1B54; font-size: 0.75rem; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-mini:hover { border-color: #D4AF37; }
.btn-mini.danger { color: #b91c1c; }
.btn-mini.danger:hover { border-color: #b91c1c; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
.modal { background: white; border-radius: 24px; padding: 2rem; width: 640px; max-width: 95vw; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.15); }
.modal h2 { color: #2D1B54; font-size: 1.15rem; margin: 0 0 1.25rem; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem 1rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field.span-2 { grid-column: span 2; }
.field span { font-size: 0.75rem; font-weight: bold; color: #6b5b95; }
.field input[type="text"], .field input[type="email"], .field input[type="number"], .field textarea { padding: 0.6rem 0.85rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-family: inherit; font-size: 0.88rem; color: #2D1B54; }
.field input:focus, .field textarea:focus { outline: none; border-color: #D4AF37; }
.field em { color: #b91c1c; font-size: 0.75rem; font-style: normal; }
.field.checkbox { flex-direction: row; align-items: center; gap: 0.6rem; }
.field.checkbox span { font-size: 0.85rem; font-weight: normal; color: #4a3870; }

.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }

.confirm-box { background: rgba(217,119,6,0.08); border: 1.5px solid rgba(217,119,6,0.35); border-radius: 12px; padding: 0.9rem 1rem; }
.confirm-box .field.checkbox span { font-size: 0.82rem; color: #92400e; }
.confirm-warning { color: #92400e; font-size: 0.85rem; font-weight: bold; }
.confirm-meta { font-weight: normal; color: #b45309; }
.warn-badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(217,119,6,0.12); color: #92400e; font-size: 0.72rem; font-weight: bold; white-space: nowrap; }
</style>
