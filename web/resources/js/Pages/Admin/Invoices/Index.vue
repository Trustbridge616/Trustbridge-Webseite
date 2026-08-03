<template>
  <AdminLayout>
    <div class="page-head">
      <div>
        <h1>Rechnungen</h1>
        <p class="subtitle">Invoice Center — T_B International Holdings Limited</p>
      </div>
      <div class="head-actions">
        <Link href="/admin/rechnungen/kunden" class="btn-secondary">Kunden</Link>
        <Link href="/admin/rechnungen/neu" class="btn-gold-solid">+ Neue Rechnung</Link>
      </div>
    </div>

    <div v-if="$page.props.flash?.success" class="flash flash-success">{{ $page.props.flash.success }}</div>
    <div v-if="$page.props.flash?.error" class="flash flash-error">{{ $page.props.flash.error }}</div>

    <!-- Statuskacheln -->
    <div class="stats-grid">
      <button class="stat-card" :class="{ selected: filters.status === 'draft' }" @click="toggleStatus('draft')">
        <span class="stat-value">{{ stats.draft }}</span>
        <span class="stat-label">Entwürfe</span>
      </button>
      <button class="stat-card" :class="{ selected: filters.status === 'open' }" @click="toggleStatus('open')">
        <span class="stat-value">{{ stats.open }}</span>
        <span class="stat-label">Offen</span>
      </button>
      <button class="stat-card" :class="{ selected: filters.status === 'paid' }" @click="toggleStatus('paid')">
        <span class="stat-value">{{ stats.paid }}</span>
        <span class="stat-label">Bezahlt</span>
      </button>
      <button class="stat-card warn" :class="{ selected: filters.status === 'overdue' }" @click="toggleStatus('overdue')">
        <span class="stat-value">{{ stats.overdue }}</span>
        <span class="stat-label">Überfällig</span>
      </button>
      <button class="stat-card muted" :class="{ selected: filters.status === 'cancelled' }" @click="toggleStatus('cancelled')">
        <span class="stat-value">{{ stats.cancelled }}</span>
        <span class="stat-label">Storniert</span>
      </button>
      <div class="stat-card gold">
        <span class="stat-value">{{ formatCents(stats.open_total_cents) }}</span>
        <span class="stat-label">Summe offen</span>
      </div>
    </div>

    <!-- Suche + Filter -->
    <div class="admin-card">
      <div class="filter-row">
        <input
          v-model="filters.search"
          type="search"
          class="search-input"
          placeholder="Suche: Rechnungsnummer oder Kunde …"
          @keyup.enter="applyFilters"
        />
        <select v-model="filters.status" class="filter-select" @change="applyFilters">
          <option value="">Alle Status</option>
          <option value="draft">Entwurf</option>
          <option value="issued">Ausgestellt</option>
          <option value="sent">Versendet</option>
          <option value="paid">Bezahlt</option>
          <option value="overdue">Überfällig</option>
          <option value="cancelled">Storniert</option>
        </select>
        <input v-model="filters.from" type="date" class="filter-select" @change="applyFilters" title="Von" />
        <input v-model="filters.to" type="date" class="filter-select" @change="applyFilters" title="Bis" />
        <button class="btn-secondary" @click="resetFilters">Zurücksetzen</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Nummer</th>
            <th>Kunde</th>
            <th>Status</th>
            <th>Datum</th>
            <th>Fällig</th>
            <th class="num">Betrag</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inv in invoices.data" :key="inv.id">
            <td>
              <Link :href="`/admin/rechnungen/${inv.id}`" class="row-link">
                <strong>{{ inv.invoice_number ?? `Entwurf #${inv.id}` }}</strong>
              </Link>
            </td>
            <td>
              <div>{{ inv.customer?.legal_name ?? '—' }}</div>
              <div class="cell-sub">{{ inv.customer?.customer_number }}</div>
            </td>
            <td><span class="badge" :class="`badge-${inv.display_status}`">{{ statusLabel(inv.display_status) }}</span></td>
            <td>{{ inv.issue_date ? formatDate(inv.issue_date) : formatDate(inv.created_at) }}</td>
            <td>{{ inv.due_date ? formatDate(inv.due_date) : '—' }}</td>
            <td class="num"><strong>{{ formatCents(inv.total_cents) }}</strong></td>
            <td class="row-actions">
              <Link :href="`/admin/rechnungen/${inv.id}`" class="btn-mini">Öffnen</Link>
              <a v-if="!['draft'].includes(inv.status)" :href="`/admin/rechnungen/${inv.id}/pdf`" class="btn-mini">PDF</a>
            </td>
          </tr>
          <tr v-if="invoices.data.length === 0">
            <td colspan="7" class="empty">Keine Rechnungen gefunden.</td>
          </tr>
        </tbody>
      </table>

      <div v-if="invoices.links && invoices.links.length > 3" class="pagination">
        <template v-for="(link, i) in invoices.links" :key="i">
          <Link
            v-if="link.url"
            :href="link.url"
            class="page-link"
            :class="{ active: link.active }"
            v-html="link.label"
          />
          <span v-else class="page-link disabled" v-html="link.label" />
        </template>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminLayout from '../../../Layouts/AdminLayout.vue'
import { formatCents } from '../../../Utils/money.js'

const props = defineProps({
  invoices: Object,
  stats: Object,
  filters: Object,
})

const filters = reactive({
  search: props.filters?.search ?? '',
  status: props.filters?.status ?? '',
  from: props.filters?.from ?? '',
  to: props.filters?.to ?? '',
})

function applyFilters() {
  router.get('/admin/rechnungen', cleanFilters(), { preserveState: true, preserveScroll: true })
}

function toggleStatus(status) {
  filters.status = filters.status === status ? '' : status
  applyFilters()
}

function resetFilters() {
  filters.search = ''
  filters.status = ''
  filters.from = ''
  filters.to = ''
  applyFilters()
}

function cleanFilters() {
  return Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '' && v !== null))
}

const labels = {
  draft: 'Entwurf',
  issued: 'Ausgestellt',
  sent: 'Versendet',
  paid: 'Bezahlt',
  overdue: 'Überfällig',
  cancelled: 'Storniert',
}

function statusLabel(status) {
  return labels[status] ?? status
}

function formatDate(date) {
  if (!date) return '—'
  const [y, m, d] = String(date).slice(0, 10).split('-')
  return `${d}.${m}.${y}`
}
</script>

<style scoped>
.page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.page-head h1 { font-family: 'Century Gothic', sans-serif; color: #2D1B54; font-size: 1.75rem; background: none; -webkit-text-fill-color: #2D1B54; margin: 0; }
.subtitle { color: #6b5b95; font-size: 0.85rem; margin: 0.25rem 0 0; }
.head-actions { display: flex; gap: 0.75rem; }

.btn-gold-solid { padding: 0.7rem 1.4rem; border-radius: 10px; border: none; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-secondary { padding: 0.7rem 1.4rem; border-radius: 10px; border: 2px solid rgba(45,27,84,0.15); background: white; color: #6b5b95; font-weight: bold; font-size: 0.88rem; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-secondary:hover { border-color: #D4AF37; color: #2D1B54; }

.flash { padding: 0.85rem 1.25rem; border-radius: 12px; margin-bottom: 1.25rem; font-size: 0.9rem; }
.flash-success { background: rgba(16,185,129,0.12); color: #047857; border: 1px solid rgba(16,185,129,0.25); }
.flash-error { background: rgba(239,68,68,0.10); color: #b91c1c; border: 1px solid rgba(239,68,68,0.25); }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1.5rem; }
.stat-card { background: white; border-radius: 16px; padding: 1.1rem 1.25rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); display: flex; flex-direction: column; gap: 0.2rem; cursor: pointer; text-align: left; font-family: inherit; transition: all 0.15s; }
.stat-card:hover { border-color: rgba(212,175,55,0.4); }
.stat-card.selected { border-color: #D4AF37; box-shadow: 0 4px 20px rgba(212,175,55,0.25); }
.stat-card.gold { cursor: default; background: linear-gradient(135deg, #fdf8e7, #faf3d9); border-color: rgba(212,175,55,0.35); }
.stat-card.warn .stat-value { color: #b91c1c; }
.stat-card.muted .stat-value { color: #8a8aa0; }
.stat-value { font-size: 1.35rem; font-weight: bold; color: #2D1B54; }
.stat-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.8px; color: #6b5b95; }

.admin-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }

.filter-row { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
.search-input { flex: 1; min-width: 220px; padding: 0.65rem 1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; background: white; color: #2D1B54; font-family: inherit; font-size: 0.88rem; }
.search-input:focus { outline: none; border-color: #D4AF37; }
.filter-select { padding: 0.65rem 1rem; border: 2px solid rgba(45,27,84,0.15); border-radius: 10px; background: white; color: #2D1B54; font-family: inherit; font-size: 0.88rem; }
.filter-select:focus { outline: none; border-color: #D4AF37; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th { padding: 0.6rem 0.9rem; font-size: 0.73rem; font-weight: 700; color: #6b5b95; text-transform: uppercase; letter-spacing: 0.5px; background: #f8f6ff; text-align: left; }
.data-table td { padding: 0.85rem 0.9rem; border-bottom: 1px solid rgba(45,27,84,0.06); color: #4a3870; font-size: 0.88rem; }
.data-table .num { text-align: right; }
.cell-sub { font-size: 0.75rem; color: #8a8aa0; }
.row-link { color: #2D1B54; text-decoration: none; }
.row-link:hover { color: #AA8222; }
.empty { text-align: center; color: #8a8aa0; padding: 2.5rem 0 !important; }

.badge { display: inline-block; padding: 0.25rem 0.7rem; border-radius: 999px; font-size: 0.72rem; font-weight: bold; letter-spacing: 0.5px; }
.badge-draft { background: rgba(107,91,149,0.12); color: #6b5b95; }
.badge-issued { background: rgba(59,130,246,0.12); color: #1d4ed8; }
.badge-sent { background: rgba(139,92,246,0.12); color: #6d28d9; }
.badge-paid { background: rgba(16,185,129,0.12); color: #047857; }
.badge-overdue { background: rgba(239,68,68,0.12); color: #b91c1c; }
.badge-cancelled { background: rgba(107,114,128,0.12); color: #4b5563; }

.row-actions { display: flex; gap: 0.4rem; justify-content: flex-end; }
.btn-mini { padding: 0.35rem 0.75rem; border-radius: 8px; border: 1.5px solid rgba(45,27,84,0.15); background: white; color: #2D1B54; font-size: 0.75rem; font-weight: bold; text-decoration: none; cursor: pointer; font-family: inherit; }
.btn-mini:hover { border-color: #D4AF37; }

.pagination { display: flex; gap: 0.35rem; margin-top: 1.25rem; flex-wrap: wrap; }
.page-link { padding: 0.45rem 0.8rem; border-radius: 8px; border: 1.5px solid rgba(45,27,84,0.12); color: #4a3870; text-decoration: none; font-size: 0.8rem; }
.page-link.active { background: #2D1B54; color: white; border-color: #2D1B54; }
.page-link.disabled { color: #b8b8c8; }
</style>
