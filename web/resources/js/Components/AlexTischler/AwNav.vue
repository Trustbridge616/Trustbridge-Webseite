<template>
  <header class="aw-nav" :class="{ scrolled }">
    <div class="aw-nav-inner">
      <a href="#top" class="aw-logo" @click.prevent="scrollTo('top')">
        <span class="aw-logo-mark">AT</span>
        <span class="aw-logo-text">ALEX<strong>TISCHLER</strong><em>COACHING</em></span>
      </a>

      <nav class="aw-links" aria-label="Hauptnavigation">
        <a v-for="l in links" :key="l.id" :href="'#' + l.id" @click.prevent="scrollTo(l.id)">{{ l.label }}</a>
      </nav>

      <div class="aw-nav-actions">
        <Link class="aw-btn-gold" href="/alextischler.de/login">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-3.9 3.6-7 8-7s8 3.1 8 7"/>
          </svg>
          Kunden-Login
        </Link>
        <button class="aw-btn-cta" @click="scrollTo('analyse')">Gratis-Analyse (2 Min.)</button>
        <button
          class="aw-burger"
          :class="{ open: menuOpen }"
          @click="menuOpen = !menuOpen"
          :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'"
          :aria-expanded="menuOpen"
          aria-controls="aw-mobile-menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <transition name="aw-menu">
      <div v-if="menuOpen" id="aw-mobile-menu" class="aw-mobile-menu">
        <a v-for="l in links" :key="l.id" :href="'#' + l.id" @click.prevent="scrollTo(l.id)">{{ l.label }}</a>
        <Link class="aw-btn-gold wide" href="/alextischler.de/login">Kunden-Login</Link>
        <button class="aw-btn-cta wide" @click="scrollTo('analyse')">Gratis-Analyse (2 Min.)</button>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Link } from '@inertiajs/vue3';

const links = [
  { id: 'coaching', label: 'Coaching' },
  { id: 'erfolge', label: 'Erfolge' },
  { id: 'coach', label: 'Über mich' },
  { id: 'ablauf', label: 'Ablauf' },
  { id: 'analyse', label: 'Kostenlose Analyse' },
  { id: 'faq', label: 'FAQ' },
];

const scrolled = ref(false);
const menuOpen = ref(false);

const onScroll = () => { scrolled.value = window.scrollY > 24; };

const scrollTo = (id) => {
  menuOpen.value = false;
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.aw-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 90;
  font-family: 'Century Gothic', system-ui, sans-serif;
  transition: all 0.4s ease;
}
.aw-nav-inner {
  max-width: 1280px;
  margin: 0.8rem auto 0;
  padding: 0.7rem 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  border-radius: 20px;
  background: rgba(30, 20, 50, 0.55);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  transition: all 0.4s ease;
}
.aw-nav.scrolled .aw-nav-inner {
  background: rgba(20, 12, 38, 0.85);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 18px 45px rgba(0,0,0,0.55);
}

.aw-logo { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
.aw-logo-mark {
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  font-weight: 800; font-size: 1.05rem; color: #0F172A;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  box-shadow: 0 0 22px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5);
}
.aw-logo-text {
  display: flex; flex-direction: column; line-height: 1.05;
  color: #F8FAFC; font-size: 0.95rem; letter-spacing: 2.5px;
}
.aw-logo-text strong { color: #8EF5D2; }
.aw-logo-text em {
  font-style: normal; font-size: 0.55rem; letter-spacing: 4.5px;
  color: #D9CFE8; opacity: 0.75; margin-top: 2px;
}

.aw-links { display: flex; align-items: center; gap: 1.8rem; }
.aw-links a {
  color: #D9CFE8; text-decoration: none; font-size: 0.92rem; font-weight: 600;
  letter-spacing: 0.5px; transition: all 0.3s ease; position: relative;
}
.aw-links a::after {
  content: ''; position: absolute; left: 0; bottom: -6px; width: 0; height: 2px;
  background: linear-gradient(90deg, #8EF5D2, transparent); transition: width 0.3s ease;
  border-radius: 2px;
}
.aw-links a:hover { color: #F8FAFC; text-shadow: 0 0 12px rgba(142,245,210,0.5); }
.aw-links a:hover::after { width: 100%; }

.aw-nav-actions { display: flex; align-items: center; gap: 0.8rem; }

.aw-btn-gold {
  display: inline-flex; align-items: center; gap: 0.5rem;
  text-decoration: none;
  padding: 0.62rem 1.2rem; border-radius: 12px; border: 1px solid rgba(244,208,104,0.55);
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  color: #1a1205; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.5px;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 8px 22px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.55);
  transition: all 0.3s ease;
}
.aw-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.55); }

.aw-btn-cta {
  padding: 0.62rem 1.3rem; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #7C3AED, #4F46E5);
  color: #F8FAFC; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.5px;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 8px 22px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
.aw-btn-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(124,58,237,0.55), inset 0 1px 0 rgba(255,255,255,0.25); }

.aw-burger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 6px;
}
.aw-burger span {
  width: 24px; height: 2px; background: #F8FAFC; border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.aw-burger.open span:nth-child(2) { opacity: 0; }
.aw-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.aw-mobile-menu {
  margin: 0.5rem 1rem 0;
  border-radius: 18px;
  background: rgba(20, 12, 38, 0.96);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  padding: 1.2rem;
  display: flex; flex-direction: column; gap: 0.4rem;
}
.aw-mobile-menu a {
  color: #F8FAFC; text-decoration: none; font-weight: 700; font-size: 1.05rem;
  padding: 0.8rem 0.6rem; border-radius: 10px; transition: background 0.25s ease;
}
.aw-mobile-menu a:hover { background: rgba(142,245,210,0.08); color: #8EF5D2; }
.aw-btn-gold.wide, .aw-btn-cta.wide { justify-content: center; text-align: center; padding: 0.95rem; margin-top: 0.4rem; font-size: 0.95rem; }

.aw-menu-enter-active, .aw-menu-leave-active { transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-menu-enter-from, .aw-menu-leave-to { opacity: 0; transform: translateY(-14px); }

@media (max-width: 1080px) {
  .aw-links { display: none; }
  .aw-btn-cta:not(.wide) { display: none; }
  .aw-burger { display: flex; }
  .aw-btn-gold:not(.wide) { padding: 0.55rem 0.9rem; font-size: 0.78rem; }
}
@media (min-width: 1081px) {
  .aw-mobile-menu { display: none; }
}
</style>
