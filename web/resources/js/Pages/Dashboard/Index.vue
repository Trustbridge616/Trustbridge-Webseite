<template>
  <DashboardLayout>
    <div class="dash-header">
      <div>
        <div class="user-meta">
          <span class="royale-badge" v-if="user.subscriptions?.some(s => s.status === 'active')">Royale Member 👑</span>
          <span class="level-badge">Level {{ Math.floor((orders?.length || 0) / 3) + 1 }}</span>
        </div>
        <h1>Willkommen, {{ user.name }} 👋</h1>
        <p>Dein persönlicher Trustbridge Bereich</p>
      </div>
      <Link href="/prizes" class="btn-upgrade">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
        Paket wählen
      </Link>
    </div>

    <!-- News Banner -->
    <div class="news-banner">
      <div class="news-icon">🚀</div>
      <div class="news-content">
        <strong>Neu: Das Royale Bonus-System ist live!</strong>
        <span>Lade deine Freunde ein und erhalte sofort ein Gratis-Paket, sobald sie ein Abo abschließen. Keine Wartezeit mehr!</span>
      </div>
      <Link href="/dashboard/partner" class="news-btn">Details ansehen</Link>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="s in stats" :key="s.label">
        <div class="stat-icon" :class="s.color" v-html="s.icon"></div>
        <div class="stat-info"><span>{{ s.label }}</span><strong>{{ s.value }}</strong></div>
      </div>
    </div>

    <div class="main-grid">
      <div class="dash-card">
        <div class="card-header"><h2>Meine Abos</h2><Link href="/prizes" class="card-link">+ Neues Abo</Link></div>
        <div v-if="user.subscriptions?.length > 0">
          <div class="sub-item-card" v-for="sub in user.subscriptions" :key="sub.id">
            <div class="sub-card-top">
              <div class="sub-badge" :class="sub.status">{{ sub.status === 'active' ? 'Aktiv' : sub.status }}</div>
              <div class="sub-tier">👑 {{ sub.name || 'Royale Paket' }}</div>
            </div>
            
            <div class="sub-details">
              <div class="detail">
                <span class="label">Gewählte Kategorie:</span>
                <select 
                  :value="sub.category_id" 
                  @change="changeCategory(sub, $event.target.value)"
                  class="cat-selector"
                  :disabled="processing"
                >
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div class="detail">
                <span class="label">Nächste Lieferung:</span>
                <strong>{{ sub.next_billing_date ? new Date(sub.next_billing_date).toLocaleDateString('de') : 'Wird berechnet...' }}</strong>
              </div>
            </div>

            <div class="sub-actions">
              <Link href="/stripe/portal" class="btn-manage-sub">Abonnement verwalten</Link>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>Noch kein aktives Abo.</p>
          <Link href="/prizes" class="btn-sm">Paket wählen →</Link>
        </div>
      </div>

      <div class="dash-card">
        <div class="card-header"><h2>Partnerprogramm</h2><Link href="/partner" class="card-link">Details</Link></div>
        <p class="ref-desc">Für jede erfolgreiche Empfehlung erhältst du ein <strong>Gratis-Paket</strong>.</p>
        <label>Dein persönlicher Link:</label>
        <div class="ref-input-row">
          <input type="text" :value="`${baseUrl}/register?ref=${user.id}`" readonly class="ref-input" />
          <button class="btn-copy" @click="copyLink">{{ copied ? '✓ Kopiert' : 'Kopieren' }}</button>
        </div>

        <div class="share-actions-mini">
          <a :href="`https://wa.me/?text=Entdecke%20Trustbridge!%20Melde%20dich%20hier%20an:%20${baseUrl}/register?ref=${user.id}`" target="_blank" class="share-btn whatsapp" title="Per WhatsApp teilen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </a>
          <a :href="`https://t.me/share/url?url=${baseUrl}/register?ref=${user.id}&text=Entdecke%20Trustbridge!`" target="_blank" class="share-btn telegram" title="Per Telegram teilen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </a>
        </div>
        <div class="ref-stats">
          <div class="ref-stat"><strong>{{ user.referrals?.length ?? 0 }}</strong><span>Empfehlungen</span></div>
          <div class="ref-stat"><strong>{{ user.credit_balance ?? 0 }} €</strong><span>Guthaben</span></div>
        </div>
        
        <div class="ref-history" v-if="user.referrals?.length > 0">
          <h4>Deine Empfehlungen</h4>
          <div class="ref-list">
            <div class="ref-item" v-for="ref in user.referrals" :key="ref.id">
              <span class="ref-name">{{ ref.name }}</span>
              <span class="ref-status" :class="{ active: ref.subscriptions_count > 0 }">
                {{ ref.subscriptions_count > 0 ? 'Aktiv ✓' : 'Registriert' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <BoxCalendar />
    </div>

    <div class="dash-card">
      <div class="card-header"><h2>Letzte Bestellungen</h2></div>
      <div v-if="orders?.length > 0">
        <div class="order-list">
          <div class="order-card" v-for="o in (orders || []).slice(0,5)" :key="o.id">
            <div class="order-card-head">
              <span class="order-date">{{ new Date(o.created_at).toLocaleDateString('de') }}</span>
              <span class="order-amount">{{ o.amount }} €</span>
              <span class="order-id">#{{ o.id }}</span>
            </div>
            
            <div class="status-tracker">
              <div class="step" :class="{ active: ['paid', 'shipped', 'delivered'].includes(o.status) }">
                <div class="dot"></div>
                <span>Bezahlt</span>
              </div>
              <div class="line" :class="{ active: ['shipped', 'delivered'].includes(o.status) }"></div>
              <div class="step" :class="{ active: ['shipped', 'delivered'].includes(o.status) }">
                <div class="dot"></div>
                <span>Versendet</span>
              </div>
              <div class="line" :class="{ active: o.status === 'delivered' }"></div>
              <div class="step" :class="{ active: o.status === 'delivered' }">
                <div class="dot"></div>
                <span>Geliefert</span>
              </div>
            </div>

            <div class="order-card-foot" v-if="o.tracking_id">
              <span class="tracking-label">Tracking:</span>
              <code class="tracking-code">{{ o.tracking_id }}</code>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state"><p>Noch keine Bestellungen.</p></div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import DashboardLayout from '../../Layouts/DashboardLayout.vue';
import BoxCalendar from '../../Components/BoxCalendar.vue';

const props = defineProps({ 
  user: Object, 
  orders: Array, 
  invoices: Array,
  categories: Array 
});

const copied = ref(false);
const processing = ref(false);
const baseUrl = window.location.origin;

const copyLink = () => { 
  navigator.clipboard.writeText(`${baseUrl}/register?ref=${props.user.id}`); 
  copied.value = true; 
  setTimeout(() => copied.value = false, 2000); 
};

const changeCategory = (sub, catId) => {
  processing.value = true;
  useForm({ category_id: catId }).patch(route('subscriptions.updateCategory', sub.id), {
    preserveScroll: true,
    onFinish: () => processing.value = false
  });
};

const stats = computed(() => [
  { label: 'Aktive Abos', value: props.user.subscriptions?.filter(s => s.status === 'active').length ?? 0, color: 'green', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
  { label: 'Pakete erhalten', value: props.orders?.length ?? 0, color: 'gold', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>' },
  { label: 'Geworbene Freunde', value: props.user.referrals?.length ?? 0, color: 'purple', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  { label: 'Guthaben', value: (props.user.credit_balance ?? 0) + ' €', color: 'gold', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
]);
</script>

<style scoped>
.dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
.dash-header h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.8rem; margin-bottom: 0.25rem; background: none; -webkit-text-fill-color: #2D1B54; }
.dash-header p { color: #6b5b95; font-size: 0.95rem; margin: 0; }
.user-meta { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
.royale-badge { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(212,175,55,0.3); }
.level-badge { background: #2D1B54; color: white; padding: 0.25rem 0.75rem; border-radius: 50px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.btn-upgrade { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 0.8rem 1.75rem; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 0.9rem; transition: all 0.3s; box-shadow: 0 6px 20px rgba(212,175,55,0.3); }
.btn-upgrade:hover { transform: translateY(-2px); }

.news-banner { display: flex; align-items: center; gap: 1.25rem; background: linear-gradient(to right, #2D1B54, #4a238a); padding: 1.25rem 1.75rem; border-radius: 16px; margin-bottom: 2rem; color: white; box-shadow: 0 8px 25px rgba(45,27,84,0.15); position: relative; overflow: hidden; }
.news-banner::after { content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 150px; background: linear-gradient(135deg, transparent, rgba(212,175,55,0.1)); pointer-events: none; }
.news-icon { font-size: 2.5rem; }
.news-content { flex: 1; display: flex; flex-direction: column; gap: 0.25rem; }
.news-content strong { font-size: 1.05rem; font-family: 'Century Gothic', system-ui, sans-serif; color: #D4AF37; }
.news-content span { font-size: 0.88rem; color: rgba(255,255,255,0.85); line-height: 1.4; }
.news-btn { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 0.6rem 1.25rem; border-radius: 50px; text-decoration: none; font-size: 0.85rem; font-weight: bold; transition: all 0.2s; white-space: nowrap; }
.news-btn:hover { background: white; color: #2D1B54; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 1.75rem; }
.stat-card { background: white; border-radius: 16px; padding: 1.5rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 15px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); }
.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-icon.green { background: rgba(76,175,80,0.12); color: #4CAF50; }
.stat-icon.gold { background: rgba(212,175,55,0.12); color: #D4AF37; }
.stat-icon.purple { background: rgba(45,27,84,0.1); color: #2D1B54; }
.stat-info { display: flex; flex-direction: column; gap: 2px; }
.stat-info span { color: #6b5b95; font-size: 0.82rem; }
.stat-info strong { color: #2D1B54; font-size: 1.4rem; font-weight: 900; font-family: 'Century Gothic', system-ui, sans-serif; }
.main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
.dash-card { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: 0 4px 20px rgba(45,27,84,0.07); border: 1px solid rgba(212,175,55,0.1); margin-bottom: 1.5rem; }
.dash-card:last-child { margin-bottom: 0; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.card-header h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.1rem; margin: 0; background: none; -webkit-text-fill-color: #2D1B54; }
.card-link { color: #D4AF37; font-size: 0.88rem; font-weight: bold; text-decoration: none; }
.sub-item-card { background: #f8f6ff; border-radius: 16px; padding: 1.5rem; border: 1px solid rgba(45,27,84,0.06); margin-bottom: 1rem; }
.sub-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
.sub-badge { padding: 0.3rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.sub-badge.active { background: rgba(76,175,80,0.1); color: #4CAF50; }
.sub-tier { font-weight: bold; color: #2D1B54; font-size: 0.95rem; }
.sub-details { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.detail { display: flex; flex-direction: column; gap: 4px; }
.detail .label { font-size: 0.75rem; color: #6b5b95; font-weight: 600; }
.detail strong { font-size: 0.95rem; color: #2D1B54; }
.cat-selector { padding: 0.5rem; border-radius: 8px; border: 1px solid rgba(45,27,84,0.15); font-size: 0.88rem; color: #2D1B54; background: white; font-family: inherit; font-weight: 600; }
.sub-actions { border-top: 1px solid rgba(45,27,84,0.05); padding-top: 1rem; }
.btn-manage-sub { font-size: 0.82rem; color: #D4AF37; text-decoration: none; font-weight: bold; }
.btn-manage-sub:hover { text-decoration: underline; }
.empty-state { text-align: center; padding: 2rem; color: #6b5b95; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.btn-sm { background: #2D1B54; color: white; padding: 0.6rem 1.5rem; border-radius: 50px; text-decoration: none; font-size: 0.88rem; font-weight: bold; }
.ref-desc { color: #6b5b95; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.6; }
.ref-desc strong { color: #D4AF37; }
label { font-size: 0.8rem; font-weight: bold; color: #2D1B54; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem; }
.ref-input-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.ref-input { flex: 1; padding: 0.7rem 1rem; border: 2px solid rgba(45,27,84,0.12); border-radius: 10px; font-size: 0.82rem; color: #4a3870; background: #f8f6ff; font-family: monospace; min-width: 0; }
.btn-copy { background: #2D1B54; color: white; border: none; border-radius: 10px; padding: 0 1.1rem; font-weight: bold; font-size: 0.85rem; cursor: pointer; font-family: inherit; white-space: nowrap; transition: background 0.2s; }
.btn-copy:hover { background: #4a238a; }
.share-actions-mini { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.share-btn { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 10px; color: white; text-decoration: none; transition: all 0.2s; }
.share-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
.share-btn.whatsapp { background: #25D366; }
.share-btn.telegram { background: #0088cc; }
.ref-stats { display: flex; gap: 2rem; }
.ref-stat { display: flex; flex-direction: column; gap: 2px; }
.ref-stat strong { color: #2D1B54; font-size: 1.3rem; font-weight: 900; }
.ref-stat span { color: #6b5b95; font-size: 0.8rem; }
.ref-history { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px dashed rgba(45,27,84,0.1); }
.ref-history h4 { font-size: 0.85rem; color: #2D1B54; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; }
.ref-list { display: flex; flex-direction: column; gap: 0.5rem; }
.ref-item { display: flex; justify-content: space-between; align-items: center; background: #fdfbff; padding: 0.6rem 0.8rem; border-radius: 10px; border: 1px solid rgba(45,27,84,0.04); }
.ref-name { font-size: 0.88rem; color: #4a3870; font-weight: 500; }
.ref-status { font-size: 0.7rem; font-weight: 800; color: #9b8abe; text-transform: uppercase; }
.ref-status.active { color: #4CAF50; }
.order-list { display: flex; flex-direction: column; gap: 1rem; }
.order-card { background: #fdfbff; border: 1px solid rgba(45,27,84,0.06); border-radius: 16px; padding: 1.25rem; }
.order-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.order-date { font-weight: bold; color: #2D1B54; font-size: 0.9rem; }
.order-amount { color: #D4AF37; font-weight: 800; font-size: 1rem; }
.order-id { font-size: 0.75rem; color: #9b8abe; font-family: monospace; }
.status-tracker { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding: 0 1rem; }
.step { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; }
.step span { font-size: 0.7rem; font-weight: 700; color: #9b8abe; text-transform: uppercase; letter-spacing: 0.5px; }
.step.active span { color: #2D1B54; }
.step .dot { width: 12px; height: 12px; border-radius: 50%; background: #e0d9f0; border: 2px solid white; box-shadow: 0 0 0 1px #e0d9f0; transition: all 0.3s; }
.step.active .dot { background: #4CAF50; box-shadow: 0 0 10px rgba(76,175,80,0.4); }
.line { height: 2px; background: #e0d9f0; flex: 2; margin-top: -18px; transition: all 0.3s; }
.line.active { background: #4CAF50; }
.order-card-foot { border-top: 1px dashed rgba(45,27,84,0.1); padding-top: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.tracking-label { font-size: 0.8rem; color: #6b5b95; }
.tracking-code { background: #f0ecfa; padding: 0.2rem 0.6rem; border-radius: 6px; color: #2D1B54; font-weight: bold; font-size: 0.82rem; }
@media (max-width: 1100px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 800px) { .main-grid { grid-template-columns: 1fr; } }
</style>
