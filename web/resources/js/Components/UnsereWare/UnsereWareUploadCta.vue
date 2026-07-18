<template>
  <section class="section-upload-cta">
    <div class="upload-cta-inner glass-panel-premium">
      <div class="upload-cta-content">
        <h2>Du hast deine TrustBox erhalten?</h2>
        <p>Nach Zustellung kann der Uploadbereich im Kundenkonto freigeschaltet werden. Dort kannst du ein Bild deiner erhaltenen Ware hochladen und eine Bewertung schreiben.</p>
        <p class="mt-2 bonus-text">Nach Prüfung, Freigabe und final abgeschlossenem Bestellstatus erhältst du <span class="gold-text">5 € Guthaben</span> für deine nächste Bestellung.</p>
        <div class="upload-cta-actions mt-4">
          <Link href="/login" class="btn-primary royal-cta">Bild & Review einreichen</Link>
          <span class="placeholder-hint">(Uploadbereich wird vorbereitet)</span>
        </div>
      </div>
      <div class="upload-cta-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(142,245,210,0.3)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<style scoped>
.section-upload-cta { margin-bottom: 6rem; }
.glass-panel-premium { background: linear-gradient(135deg, rgba(45, 20, 80, 0.6) 0%, rgba(20, 10, 40, 0.8) 100%); backdrop-filter: blur(30px); border: 1px solid rgba(212,175,55,0.2); border-radius: 24px; padding: 4rem; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; }
.upload-cta-inner { display: flex; align-items: center; justify-content: space-between; border-color: rgba(142,245,210,0.2); margin-bottom: 0; position: relative; }
.upload-cta-inner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(142,245,210,0.05), transparent 70%); pointer-events: none; }
.upload-cta-content { width: 70%; position: relative; z-index: 2; }
.upload-cta-content h2 { font-family: 'Century Gothic', sans-serif; font-size: 2rem; margin-bottom: 1rem; color: #FFF; }
.upload-cta-content p { font-size: 1.1rem; color: #C4B8D8; margin-bottom: 0; line-height: 1.6; }
.bonus-text { font-size: 0.95rem !important; font-style: italic; opacity: 0.8; }
.gold-text { color: #D4AF37; font-weight: bold; }
.upload-cta-actions { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-top: 2rem; }
.btn-primary { display: inline-block; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #1a0b36; padding: 15px 35px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(142,245,210,0.3); transition: all 0.3s; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(142,245,210,0.5); }
.placeholder-hint { color: rgba(255,255,255,0.4); font-style: italic; font-size: 0.9rem; }
.upload-cta-icon { position: relative; z-index: 2; }

@media (max-width: 900px) {
  .upload-cta-inner { flex-direction: column; text-align: center; padding: 2.5rem; gap: 2rem; }
  .upload-cta-content { width: 100%; }
  .upload-cta-actions { justify-content: center; }
  .upload-cta-icon { order: -1; }
}
</style>
