<template>
  <section class="section-early-cta">
    <div class="early-cta-card glass-panel text-center">
      <h2>So sieht echter Warenfluss aus.</h2>
      <p>Bereit für deine eigene Box?</p>
      <div class="mt-4">
        <Link href="/prizes" class="btn-primary royal-cta">Jetzt starten</Link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<style scoped>
.section-early-cta { margin-bottom: 6rem; }
.early-cta-card { background: rgba(45, 20, 80, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(142,245,210,0.15); border-top: 1px solid rgba(142,245,210,0.3); border-radius: 24px; padding: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(142,245,210,0.02); }
.text-center { text-align: center; }
h2 { font-family: 'Century Gothic', sans-serif; color: #FFF; font-size: 2rem; margin-bottom: 0.5rem; }
p { color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-bottom: 0; }
.mt-4 { margin-top: 2rem; }
.btn-primary { display: inline-block; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #1a0b36; padding: 15px 35px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(142,245,210,0.3); transition: all 0.3s; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(142,245,210,0.5); }
</style>
