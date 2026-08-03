<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>
          {{ invoice.invoice_number ?? `Entwurf #${invoice.id}` }}
          <span class="badge" :class="`badge-${invoice.display_status}`">{{ statusLabel(invoice.display_status) }}</span>
        </h1>
        <p class="subtitle">{{ invoice.customer?.legal_name }} · {{ invoice.customer?.customer_number }}</p>
      </div>
      <div class="head-actions">
        <Link href="/admin/rechnungen" class="btn-secondary">← Übersicht</Link>
      </div>
    </div>

    <div v-if="$page.props.flash?.success" class="flash flash-success">{{ $page.props.flash.success }}</div>
    <div v-if="$page.props.flash?.error" class="flash flash-error">{{ $page.props.flash.error }}</div>
    <div v-if="Object.keys(errors).length" class="flash flash-error">
      <div v-for="(msg, key) in errors" :key="key">{{ msg }}</div>
    </div>

    <div v-if="confirmedWithoutVatId" class="flash flash-amber">
      ⚠ Ausgestellt ohne USt-IdNr. — die unternehmerische Nutzung wurde beim
      Ausstellen ausdrücklich bestätigt (Nachweis im Verlauf / Audit-Log).
    </div>

    <!-- Aktionen -->
    <div class="admin-card actions-card">
      <template v-if="invoice.is_editable">
        <Link :href="`/admin/rechnungen/${invoice.id}/bearbeiten`" class="btn-secondary">Bearbeiten</Link>
        <a :href="`/admin/rechnungen/${invoice.id}/entwurf-pdf`" class="btn-secondary">Entwurfs-PDF</a>
        <button v-if="customerHasVatId" class="btn-gold-solid" @click="issueInvoice">Rechnung ausstellen</button>
        <button v-else class="btn-gold-solid" @click="showIssueConfirmModal = true">
          Unternehmerische Nutzung ohne USt-IdNr. bestätigen und ausstellen
        </button>
        <button class="btn-danger-outline" @click="deleteDraft">Entwurf löschen</button>
      </template>
      <template v-else>
        <a :href="`/admin/rechnungen/${invoice.id}/pdf`" class="btn-gold-solid">PDF herunterladen</a>
        <button v-if="invoice.status === 'issued'" class="btn-secondary" @click="markSent">Als versendet markieren</button>
        <button v-if="['issued', 'sent'].includes(invoice.status)" class="btn-secondary" @click="showPaidModal = true">Als bezahlt markieren</button>
        <button v-if="['issued', 'sent'].includes(invoice.status)" class="btn-danger-outline" @click="showCancelModal = true">Stornieren</button>
      </template>
      <button class="btn-secondary" @click="duplicate">Duplizieren</button>
    </div>

    <div class="grid">
      <!-- Rechnungsdaten -->
      <div class="admin-card">
        <h3>Rechnungsdaten {{ snapshot ? '(eingefroren aus Snapshot)' : '(Entwurf, live)' }}</h3>
        <table class="kv">
          <tr><td>Status</td><td><span class="badge" :class="`badge-${invoice.display_status}`">{{ statusLabel(invoice.display_status) }}</span></td></tr>
          <tr><td>Rechnungsnummer</td><td>{{ invoice.invoice_number ?? '— wird beim Ausstellen vergeben —' }}</td></tr>
          <tr><td>Rechnungsdatum</td><td>{{ formatDate(view.issue_date) }}</td></tr>
          <tr><td>Fällig am</td><td>{{ formatDate(view.due_date) }}</td></tr>
          <tr><td>Zahlungsziel</td><td>{{ view.payment_terms_days }} Tage</td></tr>
          <tr><td>Leistungszeitraum</td><td>{{ periodLabel }}</td></tr>
          <tr><td>Sprache</td><td>{{ languageLabel }}</td></tr>
          <tr><td>Steuerprofil</td><td>{{ invoice.tax_profile }}</td></tr>
          <tr v-if="invoice.cancellation_reason"><td>Stornogrund</td><td>{{ invoice.cancellation_reason }}</td></tr>
          <tr v-if="invoice.notes"><td>Interne Notizen</td><td>{{ invoice.notes }}</td></tr>
        </table>
      </div>

      <!-- Empfänger -->
      <div class="admin-card">
        <h3>Empfänger</h3>
        <table class="kv">
          <tr><td>Firma</td><td>{{ buyer.legal_name }}</td></tr>
          <tr v-if="buyer.contact_name"><td>Ansprechpartner</td><td>{{ buyer.contact_name }}</td></tr>
          <tr><td>Adresse</td><td>{{ buyer.address_line1 }}<template v-if="buyer.address_line2">, {{ buyer.address_line2 }}</template>, {{ [buyer.zip, buyer.city].filter(Boolean).join(' ') }}, {{ buyer.country }}</td></tr>
          <tr><td>E-Mail</td><td>{{ buyer.email }}</td></tr>
          <tr>
            <td>USt-IdNr.</td>
            <td>
              <template v-if="buyer.vat_id">{{ buyer.vat_id }}</template>
              <span v-else-if="confirmedWithoutVatId" class="warn-inline">⚠ ohne USt-IdNr. bestätigt</span>
              <template v-else>—</template>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Positionen -->
    <div class="admin-card">
      <h3>Positionen</h3>
      <table class="data-table">
        <thead>
          <tr><th>Pos.</th><th>Leistung</th><th class="num">Menge</th><th class="num">Einzelpreis</th><th class="num">Betrag</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in viewItems" :key="item.position">
            <td>{{ item.position }}</td>
            <td>
              <div><strong>{{ item.title_en }}</strong></div>
              <div v-if="item.title_de" class="cell-sub-strong">{{ item.title_de }}</div>
              <div v-if="item.description_en" class="cell-sub">{{ item.description_en }}</div>
              <div v-if="item.description_de" class="cell-sub">{{ item.description_de }}</div>
            </td>
            <td class="num">{{ formatQuantity(item.quantity_milli) }} {{ unitLabel(item.unit) }}</td>
            <td class="num">{{ formatCents(item.unit_price_cents) }}</td>
            <td class="num"><strong>{{ formatCents(item.line_total_cents) }}</strong></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="num total-label">Gesamtbetrag</td>
            <td class="num total-value">{{ formatCents(viewTotal) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="tax-note">
        <div><strong>{{ taxNoteDe }}</strong></div>
        <div>{{ taxNoteEn }}</div>
      </div>
    </div>

    <div class="grid">
      <!-- Zahlungen -->
      <div class="admin-card">
        <h3>Zahlungen</h3>
        <table v-if="invoice.payments?.length" class="data-table">
          <thead><tr><th>Datum</th><th class="num">Betrag</th><th>Referenz</th><th>Methode</th></tr></thead>
          <tbody>
            <tr v-for="p in invoice.payments" :key="p.id">
              <td>{{ formatDate(p.paid_on) }}</td>
              <td class="num">{{ formatCents(p.amount_cents) }}</td>
              <td>{{ p.external_reference ?? '—' }}</td>
              <td>{{ p.method }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else class="empty-note">Noch keine Zahlungen erfasst.</p>
      </div>

      <!-- Verlauf -->
      <div class="admin-card">
        <h3>Verlauf</h3>
        <ul class="timeline">
          <li v-for="event in invoice.events" :key="event.id">
            <span class="tl-dot" :class="`tl-${event.type}`"></span>
            <div>
              <strong>{{ eventLabel(event.type) }}</strong>
              <span v-if="event.user" class="tl-user">· {{ event.user.name }}</span>
              <div class="tl-time">{{ formatDateTime(event.created_at) }}</div>
              <div v-if="event.payload?.reason" class="tl-payload">Grund: {{ event.payload.reason }}</div>
              <div v-if="event.payload?.external_reference" class="tl-payload">Referenz: {{ event.payload.external_reference }}</div>
              <div v-if="event.payload?.evidence_reference" class="tl-payload">Nachweis: {{ event.payload.evidence_reference }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal: bezahlt -->
    <div v-if="showPaidModal" class="modal-overlay" @click.self="showPaidModal = false">
      <div class="modal">
        <h2>Als bezahlt markieren</h2>
        <div class="form-grid">
          <label class="field">
            <span>Zahlungsdatum *</span>
            <input v-model="paidForm.paid_on" type="date" />
          </label>
          <label class="field">
            <span>Betrag (EUR)</span>
            <input :value="formatCents(invoice.total_cents)" type="text" disabled />
          </label>
          <label class="field span-2">
            <span>Externe Transaktionsreferenz *</span>
            <input v-model="paidForm.external_reference" type="text" placeholder="z.B. Airwallex-Transaktions-ID / Bankreferenz" />
          </label>
          <label class="field span-2">
            <span>Notiz</span>
            <input v-model="paidForm.note" type="text" />
          </label>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showPaidModal = false">Abbrechen</button>
          <button class="btn-gold-solid" :disabled="paidForm.processing" @click="submitPaid">Zahlung erfassen</button>
        </div>
      </div>
    </div>

    <!-- Modal: Ausstellen ohne USt-IdNr. bestätigen -->
    <div v-if="showIssueConfirmModal" class="modal-overlay" @click.self="showIssueConfirmModal = false">
      <div class="modal">
        <h2>Ausstellen ohne USt-IdNr.</h2>
        <p class="modal-note">
          Dieser Kunde hat keine USt-IdNr. Das Ausstellen ist nur mit der folgenden
          ausdrücklichen Bestätigung möglich. Sie wird mit Datum, Admin, Kunde,
          Rechnung und Nachweisreferenz im Audit-Log gespeichert —
          <strong>auf der Rechnung erscheint davon nichts</strong>, dort steht nur der
          normale Reverse-Charge-Hinweis.
        </p>
        <label class="field confirm-check">
          <input v-model="issueForm.business_use_confirmed" type="checkbox" />
          <span>
            „Der Kunde hat schriftlich bestätigt, dass er die Leistung ausschließlich
            für seine selbstständige unternehmerische Tätigkeit und nicht für private
            Zwecke bezieht.“
          </span>
        </label>
        <label class="field" style="margin-top: 0.9rem;">
          <span>Nachweisreferenz * (z.B. „E-Mail vom 28.07.2026“, Vertrag, Dateiname)</span>
          <input v-model="issueForm.evidence_reference" type="text" />
          <em v-if="issueForm.errors.evidence_reference">{{ issueForm.errors.evidence_reference }}</em>
        </label>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showIssueConfirmModal = false">Abbrechen</button>
          <button
            class="btn-gold-solid"
            :disabled="!issueForm.business_use_confirmed || !issueForm.evidence_reference || issueForm.processing"
            @click="submitConfirmedIssue"
          >Bestätigen und ausstellen</button>
        </div>
      </div>
    </div>

    <!-- Modal: stornieren -->
    <div v-if="showCancelModal" class="modal-overlay" @click.self="showCancelModal = false">
      <div class="modal">
        <h2>Rechnung stornieren</h2>
        <p class="modal-note">Die Rechnungsnummer {{ invoice.invoice_number }} bleibt vergeben und wird nie wiederverwendet.</p>
        <label class="field">
          <span>Stornogrund *</span>
          <textarea v-model="cancelForm.cancellation_reason" rows="3"></textarea>
        </label>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showCancelModal = false">Abbrechen</button>
          <button class="btn-danger-solid" :disabled="cancelForm.processing" @click="submitCancel">Stornieren</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Link, router, useForm, usePage } from '@inertiajs/vue3'
import AdminLayout from '../../../Layouts/AdminLayout.vue'
import { formatCents, formatQuantity } from '../../../Utils/money.js'

const props = defineProps({
  invoice: Object,
  snapshot: Object, // null bei Entwürfen
  taxProfiles: Array,
})

const errors = computed(() => usePage().props.errors ?? {})

// Ausgestellte Rechnungen zeigen die eingefrorenen Snapshot-Daten,
// Entwürfe die Live-Daten.
const view = computed(() => props.snapshot?.invoice ?? {
  issue_date: props.invoice.issue_date,
  due_date: props.invoice.due_date,
  payment_terms_days: props.invoice.payment_terms_days,
  service_period: {
    start: props.invoice.service_period_start,
    end: props.invoice.service_period_end,
  },
})

const buyer = computed(() => props.snapshot?.buyer ?? props.invoice.customer ?? {})

// Steuerhinweis immer zweisprachig; ausgestellte Rechnungen aus dem Snapshot
const taxNoteDe = computed(() =>
  props.snapshot?.tax?.notice_de ?? 'Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.'
)
const taxNoteEn = computed(() =>
  props.snapshot?.tax?.notice_en ?? 'Reverse charge – VAT payable by the recipient in accordance with Article 196 of Council Directive 2006/112/EC.'
)

const customerHasVatId = computed(() => !!props.invoice.customer?.vat_id)

// Ausgestellte Rechnung ohne USt-IdNr. → Bestätigung wurde beim Ausstellen
// erteilt (Details im Verlauf/Audit-Log)
const confirmedWithoutVatId = computed(() =>
  !!props.snapshot && !!props.snapshot.buyer?.business_confirmed_without_vat_id
)
const viewItems = computed(() => props.snapshot?.items ?? props.invoice.items ?? [])
const viewTotal = computed(() => props.snapshot?.invoice?.total_cents ?? props.invoice.total_cents)

// Präziser Datumsbereich: 01.07.2026–31.07.2026
const periodLabel = computed(() => {
  const p = props.snapshot?.invoice?.service_period ?? view.value.service_period
  if (!p?.start) return '—'
  return `${formatDate(p.start)}–${formatDate(p.end)}`
})

const languageLabel = computed(() => ({
  both: 'Zweisprachig (EN + DE)', de: 'Deutsch', en: 'Englisch',
}[props.invoice.language] ?? props.invoice.language))

const showPaidModal = ref(false)
const showCancelModal = ref(false)
const showIssueConfirmModal = ref(false)

const issueForm = useForm({
  business_use_confirmed: false,
  evidence_reference: '',
})

function submitConfirmedIssue() {
  issueForm.post(`/admin/rechnungen/${props.invoice.id}/ausstellen`, {
    preserveScroll: true,
    onSuccess: () => (showIssueConfirmModal.value = false),
  })
}

const paidForm = useForm({
  paid_on: new Date().toISOString().slice(0, 10),
  external_reference: '',
  note: '',
})

const cancelForm = useForm({
  cancellation_reason: '',
})

function issueInvoice() {
  if (confirm('Rechnung jetzt ausstellen? Danach ist sie nicht mehr bearbeitbar und erhält die nächste fortlaufende Nummer.')) {
    router.post(`/admin/rechnungen/${props.invoice.id}/ausstellen`, {}, { preserveScroll: true })
  }
}

function markSent() {
  router.post(`/admin/rechnungen/${props.invoice.id}/versendet`, {}, { preserveScroll: true })
}

function submitPaid() {
  paidForm.post(`/admin/rechnungen/${props.invoice.id}/bezahlt`, {
    preserveScroll: true,
    onSuccess: () => (showPaidModal.value = false),
  })
}

function submitCancel() {
  cancelForm.post(`/admin/rechnungen/${props.invoice.id}/stornieren`, {
    preserveScroll: true,
    onSuccess: () => (showCancelModal.value = false),
  })
}

function duplicate() {
  router.post(`/admin/rechnungen/${props.invoice.id}/duplizieren`)
}

function deleteDraft() {
  if (confirm('Diesen Entwurf endgültig löschen?')) {
    router.delete(`/admin/rechnungen/${props.invoice.id}`)
  }
}

const statusLabels = {
  draft: 'Entwurf', issued: 'Ausgestellt', sent: 'Versendet',
  paid: 'Bezahlt', overdue: 'Überfällig', cancelled: 'Storniert',
}
const statusLabel = (s) => statusLabels[s] ?? s

const eventLabels = {
  created: 'Erstellt', updated: 'Bearbeitet', issued: 'Ausgestellt',
  sent: 'Als versendet markiert', paid: 'Als bezahlt markiert',
  cancelled: 'Storniert', duplicated: 'Dupliziert',
  pdf_downloaded: 'PDF heruntergeladen', payment_recorded: 'Zahlung erfasst',
  business_use_confirmed: 'Unternehmerische Nutzung ohne USt-IdNr. bestätigt',
}
const eventLabel = (t) => eventLabels[t] ?? t

const unitLabels = { month: 'Monat', hour: 'Std.', day: 'Tag', flat: 'pauschal', piece: 'Stk.' }
const unitLabel = (u) => unitLabels[u] ?? u

function formatDate(date) {
  if (!date) return '—'
  const [y, m, d] = String(date).slice(0, 10).split('-')
  return `${d}.${m}.${y}`
}

function formatDateTime(datetime) {
  if (!datetime) return ''
  const d = new Date(datetime)
  return d.toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', sans-serif; color: #2D1B54; font-size: 1.6rem; background: none; -webkit-text-fill-color: #2D1B54; margin: 0; display: flex; align-items: center; gap: 0.75rem; }
.subtitle { color: #6b5b95; font-size: 0.85rem; margin: 0.25rem 0 0; }
.head-actions { display: flex; gap: 0.75rem; }

.btn-gold-solid { padding: 0.7rem 1.4rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; display: inline-block; }
.btn-gold-solid:disabled { opacity: 0.6; cursor: wait; }
.btn-secondary { padding: 0.7rem 1.4rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-secondary:hover { border-color: #D4AF37; color: #2D1B54; }
.btn-danger-outline { padding: 0.7rem 1.4rem; border-radius: 10px; border: 2px solid rgba(239,68,68,0.3); background: white; color: #b91c1c; font-weight: bold; font-size: 0.88rem; cursor: pointer; font-family: inherit; }
.btn-danger-outline:hover { border-color: #b91c1c; }
.btn-danger-solid { padding: 0.7rem 1.4rem; border-radius: 10px; border: none; background: #b91c1c; color: white; font-weight: bold; font-size: 0.88rem; cursor: pointer; font-family: inherit; }

.flash { padding: 0.85rem 1.25rem; border-radius: 12px; margin-bottom: 1.25rem; font-size: 0.9rem; }
.flash-success { background: rgba(16,185,129,0.12); color: #047857; border: 1px solid rgba(16,185,129,0.25); }
.flash-error { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1px solid rgba(239,68,68,0.25); }
.flash-amber { background: rgba(217,119,6,0.08); color: #92400e; border: 1.5px solid rgba(217,119,6,0.35); font-weight: bold; }
.warn-inline { color: #92400e; font-weight: bold; font-size: 0.82rem; }

.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; }
.admin-card h3 { color: #2D1B54; font-size: 1rem; margin: 0 0 1.1rem; }
.actions-card { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 1000px) { .grid { grid-template-columns: 1fr; } }
.grid .admin-card { margin-bottom: 1.5rem; }

.kv { width: 100%; border-collapse: collapse; }
.kv td { padding: 0.45rem 0; font-size: 0.88rem; color: #4a3870; border-bottom: 1px solid rgba(45,27,84,0.05); vertical-align: top; }
.kv td:first-child { color: #8a8aa0; width: 40%; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; text-align: left; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; font-size: 0.88rem; vertical-align: top; }
.data-table .num { text-align: right; }
.cell-sub { font-size: 0.78rem; color: #8a8aa0; margin-top: 0.15rem; }
.cell-sub-strong { font-size: 0.85rem; color: #55556d; font-weight: bold; }
.total-label { color: #6b5b95; font-weight: bold; padding-top: 1rem !important; }
.total-value { font-size: 1.1rem; font-weight: bold; color: #2D1B54; border-top: 2px solid #2D1B54; padding-top: 1rem !important; }

.tax-note { margin-top: 1.25rem; padding: 0.8rem 1rem; background: #f6fdfa; border-left: 3px solid #8EF5D2; font-size: 0.8rem; color: #3d3d55; border-radius: 0 10px 10px 0; }
.empty-note { color: #8a8aa0; font-size: 0.88rem; }

.badge { display: inline-block; padding: 0.25rem 0.7rem; border-radius: 999px; font-size: 0.72rem; font-weight: bold; letter-spacing: 0.5px; }
.badge-draft { background: rgba(107,91,149,0.12); color: #6b5b95; }
.badge-issued { background: rgba(59,130,246,0.12); color: #1d4ed8; }
.badge-sent { background: rgba(139,92,246,0.12); color: #6d28d9; }
.badge-paid { background: rgba(16,185,129,0.12); color: #047857; }
.badge-overdue { background: rgba(239,68,68,0.12); color: #b91c1c; }
.badge-cancelled { background: rgba(107,114,128,0.12); color: #4b5563; }

.timeline { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }
.timeline li { display: flex; gap: 0.75rem; font-size: 0.85rem; color: #4a3870; }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: #b8b8c8; margin-top: 0.35rem; flex-shrink: 0; }
.tl-issued { background: #1d4ed8; }
.tl-paid, .tl-payment_recorded { background: #047857; }
.tl-cancelled { background: #b91c1c; }
.tl-created, .tl-updated { background: #D4AF37; }
.tl-user { color: #8a8aa0; }
.tl-time { font-size: 0.75rem; color: #8a8aa0; }
.tl-payload { font-size: 0.78rem; color: #6b5b95; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
.modal { background: white; border-radius: 24px; padding: 2rem; width: 560px; max-width: 95vw; box-shadow: 0 25px 60px rgba(0,0,0,0.15); }
.modal h2 { color: #2D1B54; font-size: 1.15rem; margin: 0 0 1.25rem; }
.modal-note { font-size: 0.85rem; color: #6b5b95; margin: -0.5rem 0 1rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem 1rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field.span-2 { grid-column: span 2; }
.field span { font-size: 0.75rem; font-weight: bold; color: #6b5b95; }
.field input, .field textarea { padding: 0.6rem 0.85rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-family: inherit; font-size: 0.88rem; color: #2D1B54; }
.field input:disabled { background: #f8f6ff; color: #8a8aa0; }
.field input:focus, .field textarea:focus { outline: none; border-color: #D4AF37; }
.modal-actions { display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem; }
.confirm-check { flex-direction: row !important; align-items: flex-start; gap: 0.6rem; background: rgba(217,119,6,0.08); border: 1.5px solid rgba(217,119,6,0.35); border-radius: 10px; padding: 0.8rem 0.9rem; }
.confirm-check input { margin-top: 0.2rem; }
.confirm-check span { font-size: 0.85rem !important; font-weight: normal !important; color: #92400e !important; }
</style>
