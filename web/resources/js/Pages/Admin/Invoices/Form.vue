<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>{{ invoice ? `Entwurf #${invoice.id} bearbeiten` : 'Neue Rechnung' }}</h1>
        <p class="subtitle">Entwurf — die Rechnungsnummer wird erst beim Ausstellen vergeben</p>
      </div>
      <div class="head-actions">
        <Link :href="invoice ? `/admin/rechnungen/${invoice.id}` : '/admin/rechnungen'" class="btn-secondary">Abbrechen</Link>
        <button class="btn-gold-solid" :disabled="form.processing" @click="submit">Entwurf speichern</button>
      </div>
    </div>

    <div v-if="Object.keys(form.errors).length" class="flash flash-error">
      Bitte Eingaben prüfen: {{ Object.values(form.errors)[0] }}
    </div>

    <div class="split">
      <!-- Formular -->
      <div class="form-col">
        <div class="admin-card">
          <h3>Kunde &amp; Rahmendaten</h3>

          <div class="form-grid">
            <label class="field span-2">
              <span>Kunde *</span>
              <select v-model="form.customer_id">
                <option :value="null" disabled>— Kunde wählen —</option>
                <option v-for="c in customers" :key="c.id" :value="c.id">
                  {{ c.customer_number }} — {{ c.legal_name }}
                </option>
              </select>
              <em v-if="form.errors.customer_id">{{ form.errors.customer_id }}</em>
            </label>

            <div class="field span-2 hint" v-if="selectedCustomer && !reverseChargeReady">
              ⚠ Für Reverse Charge fehlen bei diesem Kunden:
              {{ missingReverseChargeFields.join(', ') }} — Ausstellen ist erst danach möglich.
            </div>

            <div class="field span-2 hint-amber" v-if="selectedCustomer && vatIdMissing">
              ⚠ Kunde ohne USt-IdNr. — Ausstellen ist nur mit ausdrücklicher Bestätigung
              der unternehmerischen Nutzung möglich (Bestätigungsdialog beim Ausstellen,
              wird im Audit-Log dokumentiert).
            </div>

            <label class="field">
              <span>Leistungszeitraum (Monat)</span>
              <input v-model="serviceMonth" type="month" />
            </label>
            <label class="field">
              <span>Zahlungsziel (Tage) *</span>
              <input v-model.number="form.payment_terms_days" type="number" min="0" max="365" />
            </label>
            <label class="field">
              <span>Sprache</span>
              <select v-model="form.language">
                <option value="both">Zweisprachig (EN + DE)</option>
                <option value="de">Deutsch</option>
                <option value="en">Englisch</option>
              </select>
            </label>
            <label class="field">
              <span>Steuerprofil</span>
              <select v-model="form.tax_profile">
                <option value="reverse_charge_german_b2b">Reverse Charge (DE, B2B)</option>
              </select>
            </label>
            <label class="field span-2">
              <span>Interne Notizen (erscheinen nicht auf der Rechnung)</span>
              <textarea v-model="form.notes" rows="2"></textarea>
            </label>
          </div>
        </div>

        <div class="admin-card">
          <div class="card-head">
            <h3>Positionen</h3>
            <button class="btn-mini" @click="addItem">+ Position</button>
          </div>

          <div v-for="(item, i) in items" :key="i" class="item-editor">
            <div class="item-head">
              <strong>Position {{ i + 1 }}</strong>
              <button v-if="items.length > 1" class="btn-mini danger" @click="removeItem(i)">Entfernen</button>
            </div>
            <div class="form-grid">
              <label class="field span-2">
                <span>Titel (EN) *</span>
                <input v-model="item.title_en" type="text" />
              </label>
              <label class="field span-2">
                <span>Titel (DE)</span>
                <input v-model="item.title_de" type="text" />
              </label>
              <label class="field span-2">
                <span>Beschreibung (EN)</span>
                <textarea v-model="item.description_en" rows="2"></textarea>
              </label>
              <label class="field span-2">
                <span>Beschreibung (DE)</span>
                <textarea v-model="item.description_de" rows="2"></textarea>
              </label>
              <label class="field">
                <span>Menge *</span>
                <input v-model="item.quantity_input" type="text" inputmode="decimal" />
              </label>
              <label class="field">
                <span>Einheit</span>
                <select v-model="item.unit">
                  <option value="month">Monat / month</option>
                  <option value="hour">Stunde / hour</option>
                  <option value="day">Tag / day</option>
                  <option value="flat">Pauschale / flat</option>
                  <option value="piece">Stück / piece</option>
                </select>
              </label>
              <label class="field">
                <span>Einzelpreis (EUR) *</span>
                <input v-model="item.price_input" type="text" inputmode="decimal" placeholder="6.000,00" />
              </label>
              <div class="field">
                <span>Positionssumme</span>
                <div class="line-total">{{ formatCents(itemTotal(item)) }}</div>
              </div>
            </div>
          </div>

          <div class="totals-row">
            <span>Gesamtbetrag</span>
            <strong>{{ formatCents(grandTotal) }}</strong>
          </div>
        </div>
      </div>

      <!-- Live-Vorschau (HTML-Nachbau des PDF-Layouts; das echte PDF rendert der Server) -->
      <div class="preview-col">
        <div class="preview-sheet">
          <div class="pv-header">
            <div>
              <img src="/brand/trustbridge-logo.png" alt="Trustbridge" class="pv-logo" />
              <div class="pv-sender">
                <div class="pv-sender-name">Trustbridge</div>
                <div class="pv-sender-legal">T_B International Holdings Limited</div>
                <div>UNIT 915, 9/F., CONCORDIA PLAZA</div>
                <div>1 SCIENCE MUSEUM ROAD</div>
                <div>TSIM SHA TSUI, KOWLOON</div>
                <div>HONG KONG SAR</div>
                <div class="pv-sender-meta">
                  <div>Hong Kong BRN / Company No.: 76661325</div>
                  <div>info@trustbridge.de</div>
                  <div>www.trustbridge.de</div>
                </div>
              </div>
            </div>
            <div class="pv-title-wrap">
              <div class="pv-title">{{ titleLabel }}</div>
              <div class="pv-accent"></div>
            </div>
          </div>

          <div class="pv-parties">
            <div class="pv-buyer">
              <div class="pv-label">{{ lang('Billed to', 'Rechnungsempfänger') }}</div>
              <template v-if="selectedCustomer">
                <div class="pv-strong">{{ selectedCustomer.legal_name }}</div>
                <div v-if="selectedCustomer.contact_name">{{ selectedCustomer.contact_name }}</div>
                <div>{{ selectedCustomer.address_line1 }}</div>
                <div v-if="selectedCustomer.address_line2">{{ selectedCustomer.address_line2 }}</div>
                <div>{{ [selectedCustomer.zip, selectedCustomer.city].filter(Boolean).join(' ') }}</div>
                <div>{{ selectedCustomer.country }}</div>
                <div v-if="selectedCustomer.vat_id" class="pv-vat">{{ lang('VAT ID', 'USt-IdNr.') }}: {{ selectedCustomer.vat_id }}</div>
              </template>
              <div v-else class="pv-placeholder">— Kunde wählen —</div>
            </div>
            <div class="pv-meta">
              <div class="pv-label">{{ lang('Invoice details', 'Rechnungsdaten') }}</div>
              <table>
                <tr><td>{{ lang('Invoice no.', 'Rechnungsnr.') }}</td><td>TBI-{{ year }}-XXXX</td></tr>
                <tr><td>{{ lang('Invoice date', 'Datum') }}</td><td>{{ lang('on issue', 'bei Ausstellung') }}</td></tr>
                <tr><td>{{ lang('Terms', 'Zahlungsziel') }}</td><td>{{ form.payment_terms_days }} {{ lang('days', 'Tage') }}</td></tr>
                <tr v-if="serviceMonth"><td>{{ lang('Service period', 'Leistungszeitraum') }}</td><td>{{ serviceMonthLabel }}</td></tr>
              </table>
            </div>
          </div>

          <table class="pv-items">
            <thead>
              <tr>
                <th>Pos.</th>
                <th>{{ lang('Description', 'Leistung') }}</th>
                <th class="num">{{ lang('Qty', 'Menge') }}</th>
                <th class="num">{{ lang('Unit price', 'Einzelpreis') }}</th>
                <th class="num">{{ lang('Amount', 'Betrag') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in items" :key="i">
                <td>{{ i + 1 }}</td>
                <td>
                  <div v-if="showEn" class="pv-strong">{{ item.title_en }}</div>
                  <div v-if="showDe && item.title_de" :class="showEn ? 'pv-title-de' : 'pv-strong'">{{ item.title_de }}</div>
                  <div v-if="showEn && item.description_en" class="pv-desc">{{ item.description_en }}</div>
                  <div v-if="showDe && item.description_de" class="pv-desc">{{ item.description_de }}</div>
                </td>
                <td class="num">{{ item.quantity_input }}</td>
                <td class="num">{{ formatCents(parseToCents(item.price_input) ?? 0) }}</td>
                <td class="num">{{ formatCents(itemTotal(item)) }}</td>
              </tr>
            </tbody>
          </table>

          <div class="pv-totals">
            <div class="pv-total-row"><span>{{ lang('Subtotal', 'Zwischensumme') }}</span><span>{{ formatCents(grandTotal) }}</span></div>
            <div class="pv-total-row grand"><span>{{ lang('Total due', 'Gesamtbetrag') }}</span><span>{{ formatCents(grandTotal) }}</span></div>
            <div class="pv-gold-tick"></div>
          </div>

          <div class="pv-tax-note">
            <div><strong>Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.</strong></div>
            <div>Reverse charge – VAT payable by the recipient in accordance with Article 196 of Council Directive 2006/112/EC.</div>
          </div>

          <div class="pv-payment">
            <div class="pv-payment-title">{{ lang('Payment details', 'Zahlungsdaten') }}</div>
            <table>
              <tr><td>Beneficiary</td><td>T_B International Holdings Limited</td></tr>
              <tr><td>IBAN</td><td>DE52 2022 0800 0058 5233 11</td></tr>
              <tr><td>SWIFT/BIC</td><td>SXPYDEHH</td></tr>
              <tr><td>Bank</td><td>Banking Circle S.A., Germany</td></tr>
              <tr><td>{{ lang('Reference', 'Verwendungszweck') }}</td><td><strong>{{ lang('invoice number', 'Rechnungsnummer') }}</strong></td></tr>
            </table>
          </div>

          <div class="pv-footer">
            <div class="pv-claim-band">
              <div class="pv-claim-row"><span class="pv-mint">TRUST&nbsp;</span><span class="pv-gold">YOURSELF &amp;</span></div>
              <div class="pv-claim-row"><span class="pv-gold">BRIDGE&nbsp;</span><span class="pv-mint">YOUR GAP</span></div>
            </div>
            <div><strong>Trustbridge</strong> — a brand/project of T_B International Holdings Limited</div>
            <div>Hong Kong BRN / Company No.: 76661325</div>
            <div>www.trustbridge.de · info@trustbridge.de</div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminLayout from '../../../Layouts/AdminLayout.vue'
import { formatCents, parseToCents, parseQuantityToMilli, formatQuantity, lineTotalCents } from '../../../Utils/money.js'

const props = defineProps({
  invoice: Object, // null bei "neu"
  customers: Array,
  defaults: Object,
})

const year = new Date().getFullYear()

function newItemFromDefaults() {
  const d = props.defaults.item
  return {
    title_en: d.title_en,
    title_de: d.title_de,
    description_en: d.description_en,
    description_de: d.description_de,
    quantity_input: '1',
    unit: d.unit,
    price_input: formatCents(d.unit_price_cents).replace(/\s?€/, ''),
  }
}

function itemFromExisting(item) {
  return {
    title_en: item.title_en,
    title_de: item.title_de ?? '',
    description_en: item.description_en ?? '',
    description_de: item.description_de ?? '',
    quantity_input: formatQuantity(item.quantity_milli),
    unit: item.unit,
    price_input: formatCents(item.unit_price_cents).replace(/\s?€/, ''),
  }
}

const items = reactive(
  props.invoice?.items?.length
    ? props.invoice.items.map(itemFromExisting)
    : [newItemFromDefaults()]
)

const serviceMonth = ref(
  props.invoice?.service_period_start
    ? String(props.invoice.service_period_start).slice(0, 7)
    : new Date().toISOString().slice(0, 7)
)

const form = useForm({
  customer_id: props.invoice?.customer_id ?? null,
  tax_profile: props.invoice?.tax_profile ?? props.defaults.tax_profile,
  currency: props.invoice?.currency ?? props.defaults.currency,
  language: props.invoice?.language ?? props.defaults.language,
  payment_terms_days: props.invoice?.payment_terms_days ?? props.defaults.payment_terms_days,
  service_period_start: null,
  service_period_end: null,
  notes: props.invoice?.notes ?? '',
  items: [],
})

const selectedCustomer = computed(() =>
  props.customers.find((c) => c.id === form.customer_id) ?? null
)

const requiredForReverseCharge = ['legal_name', 'address_line1', 'city', 'country', 'email']
const fieldLabels = {
  legal_name: 'Firmenname', address_line1: 'Adresse', city: 'Stadt',
  country: 'Land', vat_id: 'USt-IdNr.', email: 'E-Mail', is_business: 'Geschäftskunde',
}

// USt-IdNr. fehlt → Ausstellen nur über den Bestätigungsdialog möglich
const vatIdMissing = computed(() => {
  const c = selectedCustomer.value
  return !!c && !c.vat_id
})

const missingReverseChargeFields = computed(() => {
  const c = selectedCustomer.value
  if (!c) return []
  const missing = requiredForReverseCharge.filter((f) => !c[f])
  if (!c.is_business) missing.unshift('is_business')
  return missing.map((f) => fieldLabels[f] ?? f)
})

const reverseChargeReady = computed(() => missingReverseChargeFields.value.length === 0)

const showEn = computed(() => ['en', 'both'].includes(form.language))
const showDe = computed(() => ['de', 'both'].includes(form.language))

function lang(en, de) {
  if (showEn.value && showDe.value) return `${en} / ${de}`
  return showEn.value ? en : de
}

const titleLabel = computed(() => lang('INVOICE', 'RECHNUNG'))

// Präziser Datumsbereich statt Monatsname: 01.07.2026–31.07.2026
const serviceMonthLabel = computed(() => {
  if (!serviceMonth.value) return ''
  const [y, m] = serviceMonth.value.split('-')
  const last = String(lastDayOfMonth(y, m)).padStart(2, '0')
  return `01.${m}.${y}–${last}.${m}.${y}`
})

function itemTotal(item) {
  const cents = parseToCents(item.price_input)
  const milli = parseQuantityToMilli(item.quantity_input)
  if (cents === null || milli === null) return 0
  return lineTotalCents(cents, milli)
}

const grandTotal = computed(() => items.reduce((sum, item) => sum + itemTotal(item), 0))

function addItem() {
  items.push({
    title_en: '', title_de: '', description_en: '', description_de: '',
    quantity_input: '1', unit: 'flat', price_input: '',
  })
}

function removeItem(i) {
  items.splice(i, 1)
}

function lastDayOfMonth(y, m) {
  return new Date(Number(y), Number(m), 0).getDate()
}

function submit() {
  if (serviceMonth.value) {
    const [y, m] = serviceMonth.value.split('-')
    form.service_period_start = `${y}-${m}-01`
    form.service_period_end = `${y}-${m}-${String(lastDayOfMonth(y, m)).padStart(2, '0')}`
  } else {
    form.service_period_start = null
    form.service_period_end = null
  }

  form.items = items.map((item) => ({
    title_en: item.title_en,
    title_de: item.title_de || null,
    description_en: item.description_en || null,
    description_de: item.description_de || null,
    quantity_milli: parseQuantityToMilli(item.quantity_input) ?? 0,
    unit: item.unit,
    unit_price_cents: parseToCents(item.price_input) ?? -1,
  }))

  if (props.invoice) {
    form.put(`/admin/rechnungen/${props.invoice.id}`)
  } else {
    form.post('/admin/rechnungen')
  }
}
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', sans-serif; color: #2D1B54; font-size: 1.75rem; background: none; -webkit-text-fill-color: #2D1B54; margin: 0; }
.subtitle { color: #6b5b95; font-size: 0.85rem; margin: 0.25rem 0 0; }
.head-actions { display: flex; gap: 0.75rem; }

.btn-gold-solid { padding: 0.7rem 1.4rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; font-size: 0.88rem; cursor: pointer; font-family: inherit; }
.btn-gold-solid:disabled { opacity: 0.6; cursor: wait; }
.btn-secondary { padding: 0.7rem 1.4rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-secondary:hover { border-color: #D4AF37; color: #2D1B54; }

.flash { padding: 0.85rem 1.25rem; border-radius: 12px; margin-bottom: 1.25rem; font-size: 0.9rem; }
.flash-error { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1px solid rgba(239,68,68,0.25); }

.split { display: grid; grid-template-columns: minmax(380px, 1fr) minmax(420px, 1.1fr); gap: 1.5rem; align-items: start; }
@media (max-width: 1200px) { .split { grid-template-columns: 1fr; } }

.form-col { display: flex; flex-direction: column; gap: 1.5rem; }
.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.admin-card h3 { color: #2D1B54; font-size: 1rem; margin: 0 0 1.1rem; }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.1rem; }
.card-head h3 { margin: 0; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem 1rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field.span-2 { grid-column: span 2; }
.field span { font-size: 0.75rem; font-weight: bold; color: #6b5b95; }
.field input, .field select, .field textarea { padding: 0.6rem 0.85rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; font-family: inherit; font-size: 0.88rem; color: #2D1B54; background: white; }
.field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: #D4AF37; }
.field em { color: #b91c1c; font-size: 0.75rem; font-style: normal; }
.field.hint { background: rgba(239,68,68,0.07); border-radius: 10px; padding: 0.7rem 0.9rem; font-size: 0.8rem; color: #b91c1c; }
.field.hint-amber { background: rgba(217,119,6,0.08); border: 1.5px solid rgba(217,119,6,0.35); border-radius: 10px; padding: 0.7rem 0.9rem; font-size: 0.8rem; color: #92400e; font-weight: bold; }
.line-total { padding: 0.6rem 0.85rem; background: #f8f6ff; border-radius: 10px; font-weight: bold; color: #2D1B54; font-size: 0.88rem; }

.item-editor { border: 1.5px solid rgba(45,27,84,0.1); border-radius: 14px; padding: 1.1rem; margin-bottom: 1rem; }
.item-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.9rem; color: #2D1B54; }

.btn-mini { padding: 0.35rem 0.75rem; border-radius: 8px; border: 1.5px solid rgba(45,27,84,0.15); background: white; color: #2D1B54; font-size: 0.75rem; font-weight: bold; cursor: pointer; font-family: inherit; }
.btn-mini:hover { border-color: #D4AF37; }
.btn-mini.danger { color: #b91c1c; }
.btn-mini.danger:hover { border-color: #b91c1c; }

.totals-row { display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 0.25rem 0; border-top: 2px solid #2D1B54; color: #2D1B54; font-size: 1.05rem; }

/* ---------- Vorschau ---------- */
.preview-col { position: sticky; top: 1.5rem; }
.preview-sheet { background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(45,27,84,0.14); padding: 3rem 2.6rem 2rem; aspect-ratio: 210 / 297; overflow-y: auto; font-size: 0.72rem; color: #1a1a2e; line-height: 1.5; }
.pv-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
.pv-logo { height: 72px; object-fit: contain; border-radius: 12px; }
.pv-sender { margin-top: 0.5rem; font-size: 0.66rem; color: #3d3d55; line-height: 1.55; }
.pv-sender-name { font-size: 0.85rem; font-weight: bold; color: #1a1a2e; }
.pv-sender-legal { font-weight: bold; margin-bottom: 0.2rem; }
.pv-sender-meta { margin-top: 0.3rem; }
.pv-title-wrap { text-align: right; }
.pv-title { font-size: 1.15rem; font-weight: bold; letter-spacing: 2.5px; }
.pv-accent { border-bottom: 2.5px solid #8EF5D2; width: 110px; margin-left: auto; margin-top: 5px; }
.pv-label { font-size: 0.56rem; letter-spacing: 1.2px; text-transform: uppercase; color: #8a8aa0; margin-bottom: 0.35rem; }
.pv-parties { display: flex; justify-content: space-between; gap: 1.5rem; margin-bottom: 1.8rem; }
.pv-strong { font-weight: bold; }
.pv-vat { margin-top: 0.35rem; }
.pv-placeholder { color: #b8b8c8; }
.pv-meta table td { padding: 0.08rem 0; }
.pv-meta table td:first-child { color: #8a8aa0; padding-right: 0.9rem; white-space: nowrap; }
.pv-items { width: 100%; border-collapse: collapse; margin-bottom: 0.6rem; }
.pv-items th { font-size: 0.55rem; letter-spacing: 1px; text-transform: uppercase; text-align: left; color: #55556d; padding: 0 0.4rem 0.4rem 0; border-bottom: 2px solid #8EF5D2; }
.pv-items th.num, .pv-items td.num { text-align: right; }
.pv-items td { padding: 0.7rem 0.4rem 0.7rem 0; border-bottom: 0.75px solid #e4e4ee; vertical-align: top; }
.pv-title-de { font-weight: bold; color: #55556d; }
.pv-desc { font-size: 0.62rem; color: #6b6b82; margin-top: 0.2rem; }
.pv-totals { width: 55%; margin-left: auto; margin-top: 0.5rem; }
.pv-total-row { display: flex; justify-content: space-between; padding: 0.2rem 0; }
.pv-total-row.grand { border-top: 2px solid #1a1a2e; font-weight: bold; font-size: 0.95rem; padding-top: 0.45rem; margin-top: 0.3rem; }
.pv-gold-tick { border-bottom: 2px solid #F0CF5A; width: 34px; margin-left: auto; margin-top: 0.4rem; }
.pv-tax-note { margin-top: 1.4rem; padding: 0.7rem 0.9rem; background: #f6fdfa; border-left: 3px solid #8EF5D2; font-size: 0.62rem; color: #3d3d55; }
.pv-payment { margin-top: 1.6rem; }
.pv-payment-title { font-size: 0.56rem; letter-spacing: 1.2px; text-transform: uppercase; color: #55556d; border-bottom: 1.5px solid #8EF5D2; padding-bottom: 0.3rem; margin-bottom: 0.5rem; width: 55%; }
.pv-payment table td { padding: 0.08rem 0; }
.pv-payment table td:first-child { color: #8a8aa0; padding-right: 1.1rem; white-space: nowrap; }
.pv-footer { margin-top: 2rem; text-align: center; font-size: 0.55rem; color: #8a8aa0; line-height: 1.6; }
.pv-claim-band { display: inline-block; background: #1a0a36; border-radius: 6px; padding: 0.35rem 0.9rem; margin-bottom: 0.35rem; line-height: 1.45; }
.pv-claim-row { font-size: 0.6rem; font-weight: bold; letter-spacing: 2.5px; }
.pv-mint { color: #8EF5D2; }
.pv-gold { color: #F0CF5A; }
</style>
