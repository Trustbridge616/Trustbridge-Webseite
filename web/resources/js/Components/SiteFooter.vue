<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <img
          src="/trustbridge-logo-footer@2x.png"
          srcset="/trustbridge-logo-footer@1x.png 1x, /trustbridge-logo-footer@2x.png 2x, /trustbridge-logo-footer@3x.png 3x"
          alt="Trustbridge"
          class="footer-logo"
        />
        <p class="footer-tagline">Trustbridge – Dein Portal für Coaching & mehr.</p>
        <div class="footer-socials">
          <a href="#" aria-label="Instagram" class="social-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" aria-label="TikTok" class="social-icon">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9a8.28 8.28 0 0 0 4.84 1.54V7.1a4.85 4.85 0 0 1-1.07-.41Z"/></svg>
          </a>
        </div>
      </div>

      <!-- Navigation -->
      <div class="footer-nav">
        <h4>Navigation</h4>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/prizes">Boxen & Abo</Link></li>
          <li><Link href="/about">Über uns</Link></li>
          <li><Link href="/how-it-works">Wie es funktioniert</Link></li>
          <li><Link href="/partner">Partnerprogramm</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
        </ul>
      </div>

      <!-- Konto -->
      <div class="footer-nav">
        <h4>Konto</h4>
        <ul>
          <li><Link href="/register">Registrieren</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/dashboard" v-if="$page.props.auth?.user">Dashboard</Link></li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="footer-nav">
        <h4>Rechtliches</h4>
        <ul>
          <li><Link href="/impressum">Impressum</Link></li>
          <li><Link href="/datenschutz">Datenschutz</Link></li>
          <li><Link href="/agb">AGB</Link></li>
          <li><Link href="/widerruf">Widerrufsbelehrung</Link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} Trustbridge. Alle Rechte vorbehalten.</p>
    </div>

    <!-- Crown Watermark -->
    <div class="footer-crown" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="#D4AF37" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/>
      </svg>
    </div>
  </footer>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<style scoped>
.site-footer {
  background: #0b021d; /* Deep Royal Purple */
  color: rgba(255,255,255,0.8);
  padding: 4rem 2rem 2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  border-top: 1px solid rgba(212, 175, 55, 0.2); /* Gold line */
  position: relative;
  overflow: hidden;
}

/* ===== CROWN WATERMARK ===== */
.footer-crown {
  position: absolute;
  right: -2%;
  bottom: -8%;
  width: 420px;
  height: 420px;
  opacity: 0.045;
  pointer-events: none;
  user-select: none;
  animation: crownFloat 8s ease-in-out infinite;
}
.footer-crown svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 60px rgba(212,175,55,0.4));
}

@keyframes crownFloat {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50%       { transform: translateY(-14px) rotate(0deg); }
}

.footer-inner {
  max-width: 1340px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.footer-logo {
  height: 110px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  filter: saturate(1.4) contrast(1.15) brightness(1.05) drop-shadow(0 2px 12px rgba(212, 175, 55, 0.4));
}

.footer-tagline {
  font-size: 1rem;
  color: #D4AF37;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.footer-socials {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(212,175,55,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: rgba(212,175,55,0.2);
  color: #D4AF37;
  border-color: #D4AF37;
  transform: translateY(-2px);
}

.social-icon svg {
  width: 18px; height: 18px;
}

.footer-nav h4 {
  color: #D4AF37;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 1.2rem;
}

.footer-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-nav ul a {
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  position: relative;
  display: inline-block;
}

.footer-nav ul a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: linear-gradient(90deg, #D4AF37, #F4D068, #D4AF37);
  background-size: 200%;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.32s cubic-bezier(.22,.68,0,1.2);
}

.footer-nav ul a:hover {
  color: #D4AF37;
}

.footer-nav ul a:hover::after {
  transform: scaleX(1);
  animation: shimmerLocal 2s ease infinite;
}

@keyframes shimmerLocal {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}

.footer-bottom {
  max-width: 1340px;
  margin: 2rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  margin: 0;
}

.footer-disclaimer {
  font-size: 0.75rem !important;
  color: rgba(255,255,255,0.25) !important;
}

@media (max-width: 900px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
