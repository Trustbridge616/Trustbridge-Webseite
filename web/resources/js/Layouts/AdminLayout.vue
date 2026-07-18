<template>
  <div class="admin-root">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <Link href="/">
          <img src="/trustbridge-portal-nobg.png" alt="Trustbridge" style="height:48px;object-fit:contain;" />
        </Link>
        <span class="admin-badge">ADMIN</span>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-group-label">Verwaltung</div>
        <Link href="/admin" class="sidebar-link" :class="{ active: page.url === '/admin' }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </Link>
        <Link href="/admin/users" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/users') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Nutzer
        </Link>
        <Link href="/admin/orders" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/orders') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
          Bestellungen
        </Link>
        <Link href="/admin/subscriptions" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/subscriptions') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Abonnements
        </Link>
        <Link href="/admin/mlm" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/mlm') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
          MLM / Referral
        </Link>
        <Link href="/admin/plans" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/plans') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Pläne & Pakete
        </Link>
        <Link href="/admin/categories" class="sidebar-link" :class="{ active: page.url.startsWith('/admin/categories') }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke-width="3"/></svg>
          Kategorien
        </Link>
        <div class="nav-group-label">System</div>
        <Link href="/dashboard" class="sidebar-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Kunden-Dashboard
        </Link>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-user">
          <div class="user-avatar">{{ userInitials }}</div>
          <div class="user-info">
            <strong>{{ $page.props.auth?.user?.name }}</strong>
            <span class="admin-tag">Administrator</span>
          </div>
        </div>
        <Link href="/logout" method="post" as="button" class="sidebar-logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Abmelden
        </Link>
      </div>
    </aside>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
const page = usePage();
const userInitials = computed(() => {
  const name = page.props.auth?.user?.name || '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});
</script>

<style scoped>
.admin-root { display: flex; min-height: 100vh; background: #0f0720; font-family: 'Century Gothic', system-ui, sans-serif; }
.sidebar { width: 240px; flex-shrink: 0; background: #0f0720; border-right: 1px solid rgba(212,175,55,0.15); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 50; }
.sidebar-logo { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; gap: 0.75rem; }
.sidebar-logo img { height: 36px; object-fit: contain; }
.admin-badge { background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-size: 0.65rem; font-weight: 900; padding: 0.15rem 0.5rem; border-radius: 4px; letter-spacing: 1px; }
.sidebar-nav { flex: 1; padding: 1.25rem 0.75rem; display: flex; flex-direction: column; gap: 0.15rem; overflow-y: auto; }
.nav-group-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.25); padding: 0.75rem 0.75rem 0.4rem; margin-top: 0.5rem; }
.sidebar-link { display: flex; align-items: center; gap: 0.65rem; padding: 0.7rem 0.9rem; border-radius: 10px; color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.88rem; transition: all 0.2s; }
.sidebar-link:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }
.sidebar-link.active { background: rgba(212,175,55,0.12); color: #D4AF37; border: 1px solid rgba(212,175,55,0.2); }
.sidebar-bottom { padding: 1rem 0.75rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 0.75rem; }
.sidebar-user { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 10px; background: rgba(255,255,255,0.04); }
.user-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; font-weight: 900; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.user-info { display: flex; flex-direction: column; }
.user-info strong { color: rgba(255,255,255,0.9); font-size: 0.82rem; }
.admin-tag { color: #D4AF37; font-size: 0.7rem; }
.sidebar-logout { display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.6rem 0.9rem; background: none; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: rgba(255,255,255,0.4); font-size: 0.82rem; font-family: inherit; cursor: pointer; transition: all 0.2s; text-decoration: none; }
.sidebar-logout:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #f87171; }
.admin-main { flex: 1; margin-left: 240px; padding: 2.5rem; min-height: 100vh; background: #f0ecfa; }
@media (max-width: 768px) { .sidebar { width: 200px; } .admin-main { margin-left: 200px; padding: 1.5rem; } }
</style>
