<template>
  <!-- app-shell traegt den Seitenuebergang: Inertia remountet bei
       jedem Routenwechsel das komplette Layout, was bisher als harter
       Pop ankam. Die Huelle blendet sich beim Mount weich ein und
       dimmt waehrend laufender Navigation leicht ab.
       Bewusst NUR Opacity: ein Transform hier wuerde zum Containing
       Block fuer die fixierte Navbar und risse sie aus dem Viewport. -->
  <div class="app-shell" :class="{ 'app-shell--loading': isNavigating }">
    <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled, 'navbar-dark': true, 'navbar-home': isHome }">
      <div class="container nav-container">
        <!-- Logo -->
        <Link href="/" class="logo-wrapper">
          <img
            src="/trustbridge-logo-header@2x.png"
            srcset="/trustbridge-logo-header@1x.png 1x, /trustbridge-logo-header@2x.png 2x, /trustbridge-logo-header@3x.png 3x"
            alt="Trustbridge"
            class="logo-img trustbridge-logo-img"
          />
        </Link>

        <!-- Hamburger Menu Button -->
        <button class="mobile-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Menu">
          <div class="hamburger" :class="{ 'open': isMenuOpen }">
            <span></span><span></span><span></span>
          </div>
        </button>

        <!-- Nav Links -->
        <div class="nav-links" :class="{ 'mobile-open': isMenuOpen }">
          <Link href="/" :class="{ 'active-link': isActive('/') }" @click="isMenuOpen = false">Home</Link>
          <Link href="/prizes" :class="{ 'active-link': isActive('/prizes') }" @click="isMenuOpen = false">Boxen & Abo</Link>
          <Link href="/unsere-ware" :class="{ 'active-link': isActive('/unsere-ware') }" @click="isMenuOpen = false">Unsere Ware</Link>
          <Link href="/how-it-works" :class="{ 'active-link': isActive('/how-it-works') }" @click="isMenuOpen = false">Wie es funktioniert</Link>
          <Link href="/partner" :class="{ 'active-link': isActive('/partner') }" class="nav-partner-link" @click="isMenuOpen = false">Partner</Link>
          <a href="/prizes#writer" :class="{ 'active-link': isActive('/writer') }" @click="isMenuOpen = false">Writer</a>
          <Link href="/faq" :class="{ 'active-link': isActive('/faq') }" @click="isMenuOpen = false">FAQ</Link>

          <!-- Mobile Only Actions -->
          <div class="mobile-actions">
            <template v-if="!$page.props.auth?.user">
              <Link href="/login" class="btn-login" @click="isMenuOpen = false">Login</Link>
              <Link href="/register" class="btn-register" @click="isMenuOpen = false">Registrieren</Link>
            </template>
            <template v-else>
              <Link href="/dashboard" class="nav-auth-link" @click="isMenuOpen = false">Dashboard</Link>
              <Link href="/logout" method="post" as="button" class="nav-auth-btn" @click="isMenuOpen = false">Logout</Link>
            </template>
          </div>
        </div>

        <!-- Desktop Actions -->
        <div class="nav-actions desktop-only">
          <Link href="/login" v-if="!$page.props.auth?.user" class="btn-login">
            <svg class="login-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Login
          </Link>
          <template v-else>
            <Link href="/dashboard" class="nav-auth-link">Dashboard</Link>
            <Link href="/logout" method="post" as="button" class="nav-auth-btn">Logout</Link>
          </template>

          <Link href="/register" v-if="!$page.props.auth?.user" class="btn-register">
            <svg class="crown-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="#D4AF37"/>
            </svg>
            Registrieren
          </Link>
        </div>
      </div>
    </nav>
    <main class="page-wrapper">
      <slot />
    </main>

    <CookieBanner />
    <SiteFooter v-if="!$page.url.startsWith('/admin')" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Link, usePage, router } from '@inertiajs/vue3';
import CookieBanner from '../Components/CookieBanner.vue';
import SiteFooter from '../Components/SiteFooter.vue';

const page = usePage();
const isScrolled = ref(false);
const isMenuOpen = ref(false);
const isHome = computed(() => page.url === '/');

/* Seitenuebergang: waehrend eine Navigation laeuft, dimmt die alte
   Seite leicht ab; die neue blendet sich beim Mount ein (CSS unten).
   Die Listener gehoeren dieser Instanz und werden beim Unmount
   abgeraeumt - Inertia tauscht das Layout bei jedem Wechsel mit. */
const isNavigating = ref(false);
let offNavStart = null;
let offNavFinish = null;
const isActive = (path) => {
  if (path === '/') return page.url === '/';
  return page.url.startsWith(path);
};

/*
  Die Navbar liegt fixiert ueber dem Inhalt. Sobald gescrollt wird,
  laeuft Text unter ihr durch und sie braucht einen eigenen Grund -
  sonst ueberlagern sich Menuepunkte und Seiteninhalt unleserlich.

  Sie schaltet deshalb wieder frueh zu (10 px). Was fehlte, war nicht
  der Zeitpunkt, sondern die Farbe: der fast deckende weisse Grund
  passt auf hellen Unterseiten, verschluckt auf dem dunklen Hero der
  Startseite aber die Headline. Dort traegt die Navbar jetzt einen
  dunklen, leicht durchscheinenden Grund - siehe .navbar-home.
*/
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  offNavStart = router.on('start', () => { isNavigating.value = true; });
  offNavFinish = router.on('finish', () => { isNavigating.value = false; });

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal, .anim-card');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view', 'visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  offNavStart?.();
  offNavFinish?.();
});
</script>

<style scoped>
/* ===== Seitenuebergang =====
   Einblenden beim Mount, leichtes Dimmen waehrend der Navigation.
   Opacity unter 1 erzeugt zwar einen Stacking-Context, aber keinen
   Containing Block - die fixierte Navbar bleibt am Viewport. */
.app-shell {
  animation: app-shell-in 0.35s ease both;
}

@keyframes app-shell-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Die 0.1s Verzoegerung verhindert Flackern bei schnellen lokalen
   Antworten: was unter 100 ms laedt, dimmt gar nicht erst. */
.app-shell--loading {
  opacity: 0.6;
  transition: opacity 0.25s ease 0.1s;
}

@media (prefers-reduced-motion: reduce) {
  .app-shell { animation: none; }
  .app-shell--loading { opacity: 1; transition: none; }
}

/* Navbar Base */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 90px;
  background: transparent;
  z-index: 100;
  display: flex;
  align-items: center;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Century Gothic', sans-serif;

  /* ─── Logo-Größe: hier anpassen ──────────────────── */
  /* Seitenverhältnis 2:3 → --logo-width ≈ --logo-height × 0.667 */
  /* Beispiele zum Testen: 60/40 | 90/60 | 120/80 | 150/100      */
  --logo-height: 200px;
  --logo-width:  134px;
  /* ──────────────────────────────────────────────────── */
}

/* Scrolled State: weißer Hintergrund */
.navbar-scrolled {
  background: rgba(255, 255, 255, 0.97);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* Startseite: der dunkle Hero laeuft unter der Navbar durch.
   Ein weisser Balken wuerde die Headline "Trust Yourself & Bridge
   your Gap" verschlucken, gar kein Balken laesst Menuepunkte und
   Headline ineinanderlaufen. Beides loest ein dunkler, leicht
   durchscheinender Grund: die Navbar bleibt als eigene Ebene lesbar,
   der Hero scheint gedaempft hindurch. */
.navbar-home.navbar-scrolled {
  background: rgba(16, 8, 34, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(212, 175, 55, 0.18);
}

/* Auf dem dunklen Grund bleiben Links und Konto-Aktionen hell.
   .navbar-dark ist bewusst mitgeschrieben, obwohl es immer gesetzt
   ist: .navbar-dark.navbar-scrolled .nav-links a faerbt weiter unten
   dunkelviolett und haette bei gleicher Spezifitaet als spaetere
   Regel gewonnen. Die vierte Klasse entscheidet das hier. */
.navbar-home.navbar-dark.navbar-scrolled .nav-links a,
.navbar-home.navbar-dark.navbar-scrolled .nav-auth-link,
.navbar-home.navbar-dark.navbar-scrolled .nav-auth-btn {
  color: rgba(255, 255, 255, 0.92);
}
.navbar-home.navbar-dark.navbar-scrolled .nav-links a:hover,
.navbar-home.navbar-dark.navbar-scrolled .nav-auth-link:hover {
  color: #D4AF37;
}

/* Gleiches Problem beim Menue-Icon: es faellt gescrollt auf
   dunkelviolett zurueck und waere auf dem dunklen Grund unsichtbar. */
.navbar-home.navbar-dark.navbar-scrolled .hamburger span {
  background-color: white;
}

/* Auf Unterseiten (dunkler Hero): Links immer weiß */
.navbar-dark .nav-links a {
  color: rgba(255, 255, 255, 0.9);
}
.navbar-dark .nav-links a:hover {
  color: #D4AF37;
}
/* Wenn gescrollt: wieder dunkel */
.navbar-dark.navbar-scrolled .nav-links a {
  color: #1E0B3B;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.desktop-only {
  display: flex;
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1001;
}

.hamburger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #1E0B3B;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.navbar-dark:not(.navbar-scrolled) .hamburger span {
  background-color: white;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-actions {
  display: none;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-toggle {
    display: block;
  }

  /* Das Menue in der Sprache der Szene: dunkler, durchscheinender
     Grund statt weisser Vollbildflaeche - dieselbe Korrektur wie beim
     Cookie-Banner. Ueber der dunklen Portalwelt war die weisse Wand
     der haerteste Bruch der ganzen Mobilansicht. */
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background: rgba(16, 8, 34, 0.96);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    gap: 1rem;
    transition: right 0.4s cubic-bezier(0.77,0.2,0.05,1.0);
    z-index: 1000;
    box-shadow: -10px 0 30px rgba(0,0,0,0.4);
  }

  .nav-links.mobile-open {
    right: 0;
  }

  .nav-links a {
    font-size: 1.5rem;
    color: #F8FAFC !important;
    /* Choreografie: die Punkte treten nacheinander ein, sobald das
       Menue steht - nicht als fertiger Block. */
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.35s ease, transform 0.35s ease, color 0.3s ease;
  }

  .nav-links a:hover,
  .nav-links a.active-link {
    color: #F4D068 !important;
  }

  .nav-links.mobile-open a {
    opacity: 1;
    transform: none;
  }

  .nav-links.mobile-open a:nth-child(1) { transition-delay: 0.08s; }
  .nav-links.mobile-open a:nth-child(2) { transition-delay: 0.13s; }
  .nav-links.mobile-open a:nth-child(3) { transition-delay: 0.18s; }
  .nav-links.mobile-open a:nth-child(4) { transition-delay: 0.23s; }
  .nav-links.mobile-open a:nth-child(5) { transition-delay: 0.28s; }
  .nav-links.mobile-open a:nth-child(6) { transition-delay: 0.33s; }
  .nav-links.mobile-open a:nth-child(7) { transition-delay: 0.38s; }

  .nav-links .mobile-actions {
    opacity: 0;
    transition: opacity 0.4s ease 0.45s;
  }

  .nav-links.mobile-open .mobile-actions {
    opacity: 1;
  }

  /* Das X liegt ueber dem dunklen Menue - es muss hell sein,
     unabhaengig davon, wie die Navbar dahinter gerade aussieht. */
  .hamburger.open span {
    background-color: #F8FAFC;
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-links a {
      opacity: 1;
      transform: none;
      transition-delay: 0s !important;
    }
    .nav-links .mobile-actions { opacity: 1; }
  }

  .mobile-actions {
    display: flex;
  }
}

/* ─── Logo-Größe: hier anpassen ─── */
/* Seitenverhältnis 2:3 → width ≈ height × 0.667 */
/* Beispiele zum Testen: 60/40  |  90/60  |  120/80  |  150/100 */

/* Logo */
.logo-wrapper {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  flex-shrink: 0;
  padding-top: 30px;
}

.logo-img {
  object-fit: contain;
  transition: transform 0.3s ease;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

.trustbridge-logo-img {
  height: var(--logo-height);
  width: var(--logo-width);
  filter: saturate(1.4) contrast(1.15) brightness(1.05);
  transform: scale(1);
  transition: transform 0.3s ease;
}

.logo-wrapper:hover .trustbridge-logo-img {
  filter: saturate(1.4) contrast(1.15) brightness(1.05);
  transform: scale(1.04);
}
  
  /* Links */
.nav-links {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.nav-links a {
  color: #1E0B3B;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  padding-bottom: 0.3rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #D4AF37;
}

.active-link {
  position: relative;
}
.active-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0) 100%);
  background-size: 200%;
  border-radius: 2px;
  animation: shimmer 3s ease infinite;
}

/* Nav links hover underline */
.nav-links a:not(.active-link) {
  position: relative;
}
.nav-links a:not(.active-link)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #D4AF37, #F4D068, #D4AF37);
  background-size: 200%;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.32s cubic-bezier(.22,.68,0,1.2);
}
.nav-links a:hover::after {
  transform: scaleX(1);
  animation: shimmer 2.5s ease infinite;
}

/* Right side actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Premium Gold Login Button */
.btn-login {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #F4D068 0%, #D4AF37 50%, #AA8222 100%);
  color: #1E0B3B; /* Tief-Lila für krassen Kontrast */
  padding: 0.6rem 1.8rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.95rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4), inset 0 2px 2px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-login::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  animation: shine 6s infinite;
}

@keyframes shine {
  0% { left: -100%; }
  20% { left: 200%; }
  100% { left: 200%; }
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6), inset 0 2px 2px rgba(255, 255, 255, 0.6);
  color: #000;
}

.login-icon {
  width: 18px;
  height: 18px;
  color: inherit;
}

/* Register Button */
.btn-register {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #3E1E74, #2A1054);
  color: white;
  padding: 0.6rem 1.8rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.95rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 0 0 1px #D4AF37;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* Gleicher Shine-Effekt wie beim Login-Button */
.btn-register::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  animation: shine 4s infinite;
  animation-delay: 2s; /* Versetzt zum Login-Button */
}

.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3), 0 0 0 2px #D4AF37;
}

.crown-icon {
  width: 18px;
  height: 18px;
}

/* Override existing page wrapper offset */
.page-wrapper {
  padding-top: 0;
  padding-bottom: 0;
}

.nav-auth-link {
  color: inherit; text-decoration: none; font-weight: bold; transition: color 0.2s;
}
.nav-auth-btn {
  background: none; border: none; font-weight: bold; cursor: pointer;
  font-family: inherit; font-size: inherit; color: inherit; transition: color 0.2s;
}
.nav-auth-link:hover, .nav-auth-btn:hover { color: #D4AF37; }

/* Ensure auth links are white when navbar is dark */
.navbar-dark:not(.navbar-scrolled) .nav-auth-link,
.navbar-dark:not(.navbar-scrolled) .nav-auth-btn {
  color: rgba(255, 255, 255, 0.9);
}
.navbar-dark:not(.navbar-scrolled) .nav-auth-link:hover,
.navbar-dark:not(.navbar-scrolled) .nav-auth-btn:hover {
  color: #D4AF37;
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 8px 25px rgba(212,175,55,0.35); }
  50%       { box-shadow: 0 14px 45px rgba(212,175,55,0.65), 0 0 35px rgba(212,175,55,0.2); }
}
@keyframes shine {
  0%   { left: -100%; }
  50%  { left: 150%; }
  100% { left: 150%; }
}

.btn-login {
  background: linear-gradient(270deg, #F4D068, #D4AF37, #c9941a, #F4D068) !important;
  background-size: 300% 300% !important;
  animation: gradientShift 5s ease infinite !important;
}
.btn-login:hover {
  animation: gradientShift 1.8s ease infinite, glowPulse 1.8s ease infinite !important;
  transform: translateY(-2px) scale(1.02) !important;
}
.btn-register {
  background: linear-gradient(270deg, #2D1B54, #4a238a, #2D1B54) !important;
  background-size: 200% 200% !important;
  animation: gradientShift 6s ease infinite !important;
  border: 1.5px solid rgba(212,175,55,0.5) !important;
}
.btn-register:hover {
  animation: gradientShift 2s ease infinite !important;
  transform: translateY(-2px) scale(1.02) !important;
  box-shadow: 0 8px 25px rgba(45,27,84,0.5), 0 0 0 2px #D4AF37 !important;
}
</style>
