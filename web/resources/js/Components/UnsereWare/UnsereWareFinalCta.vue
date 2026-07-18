<template>
  <section class="section-final-cta">
    <h2>Bereit für dein eigenes Paket?</h2>
    <p>Wähle dein Level und sichere dir deine eigene Warenbox mit kalkuliertem Einkaufsvorteil.</p>
    <div class="cta-buttons">
      <Link href="/prizes" class="btn-primary royal-cta-large">Jetzt starten</Link>
      <Link href="/how-it-works" class="btn-secondary royal-cta-outline">So funktioniert Trustbridge</Link>
    </div>
  </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<style scoped>
.section-final-cta { text-align: center; background: linear-gradient(135deg, rgba(45,20,80,0.8), rgba(20,10,40,0.9)); border: 1px solid rgba(212,175,55,0.2); border-radius: 24px; padding: 6rem 2rem; position: relative; overflow: hidden; margin-bottom: 4rem; }
.section-final-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(212,175,55,0.1), transparent 60%); pointer-events: none; }
.section-final-cta h2 { font-family: 'Century Gothic', sans-serif; font-size: 2.5rem; color: #FFF; margin-bottom: 1rem; }
.section-final-cta p { font-size: 1.2rem; margin-bottom: 2.5rem; color: rgba(255,255,255,0.7); }
.cta-buttons { display: flex; justify-content: center; gap: 1rem; position: relative; z-index: 2; flex-wrap: wrap; }
.royal-cta-large { display: inline-block; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #1a0b36; padding: 18px 45px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-size: 1.1rem; box-shadow: 0 10px 25px rgba(142,245,210,0.4); transition: all 0.3s; }
.royal-cta-large:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(142,245,210,0.5); }
.royal-cta-outline { display: inline-flex; align-items: center; background: transparent; color: #FFF; border: 2px solid rgba(255,255,255,0.2); padding: 0 35px; height: 58px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s; }
.royal-cta-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.4); }

@media (max-width: 600px) {
  .section-final-cta h2 { font-size: 2rem; }
  .cta-buttons { flex-direction: column; width: 100%; }
  .royal-cta-outline { justify-content: center; }
}
</style>
