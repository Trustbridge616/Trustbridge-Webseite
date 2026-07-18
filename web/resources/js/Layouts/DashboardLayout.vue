<template>
  <div class="dashboard-root">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <Link href="/">
          <img src="/trustbridge-portal-nobg.png" alt="Trustbridge" style="height:48px;object-fit:contain;" />
        </Link>
      </div>

      <nav class="sidebar-nav">
        <Link href="/dashboard" class="sidebar-link" :class="{ active: isActive('/dashboard') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Übersicht
        </Link>
        <Link href="/dashboard/abo" class="sidebar-link" :class="{ active: isActive('/dashboard/abo') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Mein Abo
        </Link>
        <Link href="/dashboard/bestellungen" class="sidebar-link" :class="{ active: isActive('/dashboard/bestellungen') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/></svg>
          Bestellungen
        </Link>
        <Link href="/dashboard/rechnungen" class="sidebar-link" :class="{ active: isActive('/dashboard/rechnungen') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Rechnungen
        </Link>
        <Link href="/dashboard/partner" class="sidebar-link" :class="{ active: isActive('/dashboard/partner') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Partnerprogramm
        </Link>
        <Link href="/dashboard/profil" class="sidebar-link" :class="{ active: isActive('/dashboard/profil') }">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Mein Profil
        </Link>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-user">
          <div class="user-avatar">{{ userInitials }}</div>
          <div class="user-info">
            <strong>{{ $page.props.auth?.user?.name }}</strong>
            <span>Mitglied</span>
          </div>
        </div>
        <Link href="/logout" method="post" as="button" class="sidebar-logout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Abmelden
        </Link>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="dashboard-main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const page = usePage();
const isActive = (path) => page.url.startsWith(path) && (path !== '/dashboard' || page.url === '/dashboard');
const userInitials = computed(() => {
  const name = page.props.auth?.user?.name || '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});
</script>

<style scoped>
.dashboard-root {
  display: flex;
  min-height: 100vh;
  background: #f0ecfa;
  font-family: 'Century Gothic', system-ui, sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #1a0a36 0%, #2D1B54 100%);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0;
  height: 100vh;
  border-right: 1px solid rgba(212, 175, 55, 0.2);
  z-index: 50;
}

.sidebar-logo {
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo img {
  height: 48px;
  object-fit: contain;
}

.sidebar-nav {
  flex: 1;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.sidebar-link:hover {
  background: rgba(255,255,255,0.08);
  color: white;
}

.sidebar-link.active {
  background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1));
  color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.3);
}

.sidebar-bottom {
  padding: 1.25rem 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
}

.user-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #AA8222);
  color: #1a0a36;
  font-weight: 900;
  font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.user-info strong {
  color: white;
  font-size: 0.88rem;
  line-height: 1.2;
}

.user-info span {
  color: rgba(255,255,255,0.4);
  font-size: 0.75rem;
}

.sidebar-logout {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.7rem 1rem;
  background: none;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: rgba(255,255,255,0.5);
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.sidebar-logout:hover {
  background: rgba(239,68,68,0.15);
  border-color: rgba(239,68,68,0.4);
  color: #f87171;
}

/* Main Content */
.dashboard-main {
  flex: 1;
  margin-left: 260px;
  min-height: 100vh;
  padding: 2.5rem;
  overflow-y: auto;
}

@media (max-width: 900px) {
  .sidebar { width: 220px; }
  .dashboard-main { margin-left: 220px; padding: 1.5rem; }
}

@media (max-width: 650px) {
  .sidebar { transform: translateX(-100%); }
  .dashboard-main { margin-left: 0; }
}
</style>
