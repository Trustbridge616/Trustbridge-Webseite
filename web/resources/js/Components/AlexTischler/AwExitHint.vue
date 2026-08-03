<template>
  <transition name="aw-exit">
    <div v-if="visible" class="aw-exit-backdrop" @click.self="dismiss">
      <div class="aw-exit-card" role="dialog" aria-modal="true" aria-labelledby="aw-exit-title">
        <button class="aw-exit-close" @click="dismiss" aria-label="Hinweis schließen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <span class="aw-exit-tag">BEVOR DU GEHST</span>
        <h3 id="aw-exit-title">Nimm eine Sache mit: Es lag nie an deiner Disziplin.</h3>
        <p>
          Kein Countdown, kein „letzte Chance" — das Gespräch ist morgen genauso kostenlos
          wie heute. Aber wenn du eh schon hier bist: Die Analyse dauert 2 Minuten und
          du weißt danach, wo du wirklich stehst.
        </p>
        <button class="aw-exit-cta" @click="goToQuiz">Gut — die 2 Minuten nehme ich mir</button>
        <button class="aw-exit-dismiss" @click="dismiss">Vielleicht später</button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const visible = ref(false);
const KEY = 'aw-exit-hint-shown';

const onMouseOut = (e) => {
  // Nur Desktop, nur beim Verlassen über den oberen Rand, nur einmal pro Sitzung
  if (e.clientY > 10 || e.relatedTarget) return;
  if (window.innerWidth < 900) return;
  if (sessionStorage.getItem(KEY)) return;
  sessionStorage.setItem(KEY, '1');
  visible.value = true;
};

const onKeydown = (e) => {
  if (e.key === 'Escape' && visible.value) dismiss();
};

const dismiss = () => { visible.value = false; };

const goToQuiz = () => {
  visible.value = false;
  document.getElementById('analyse')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

onMounted(() => {
  document.addEventListener('mouseout', onMouseOut);
  document.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('mouseout', onMouseOut);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.aw-exit-backdrop {
  position: fixed; inset: 0; z-index: 120;
  display: flex; align-items: center; justify-content: center;
  background: rgba(11, 17, 21, 0.75);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  padding: 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-exit-card {
  position: relative;
  max-width: 480px;
  background: rgba(30, 20, 50, 0.95);
  border: 1px solid rgba(142,245,210,0.35);
  border-top: 1px solid rgba(255,255,255,0.3);
  border-radius: 26px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 45px 100px rgba(0,0,0,0.8), 0 0 60px rgba(142,245,210,0.12);
}
.aw-exit-close {
  position: absolute; top: 1rem; right: 1rem;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 50%; border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.05); color: #D9CFE8;
  cursor: pointer; transition: all 0.3s ease;
}
.aw-exit-close:hover { color: #F8FAFC; border-color: rgba(255,255,255,0.35); }
.aw-exit-tag {
  display: inline-block;
  font-size: 0.72rem; font-weight: 800; letter-spacing: 3.5px;
  color: #8EF5D2; text-shadow: 0 0 18px rgba(142,245,210,0.6);
  margin-bottom: 0.9rem;
}
.aw-exit-card h3 { color: #F8FAFC; font-size: 1.45rem; font-weight: 800; margin: 0 0 0.9rem; line-height: 1.3; }
.aw-exit-card p { color: #D9CFE8; font-size: 0.98rem; line-height: 1.65; margin: 0 0 1.6rem; }
.aw-exit-cta {
  display: block; width: 100%;
  padding: 1.05rem; border-radius: 15px; border: none;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 1.05rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(142,245,210,0.35), inset 0 2px 0 rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.aw-exit-cta:hover { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(142,245,210,0.5), inset 0 2px 0 rgba(255,255,255,0.5); }
.aw-exit-dismiss {
  margin-top: 0.9rem;
  background: none; border: none;
  color: rgba(217,207,232,0.65); font-family: inherit; font-size: 0.88rem;
  cursor: pointer; text-decoration: underline; text-underline-offset: 3px;
  transition: color 0.3s ease;
}
.aw-exit-dismiss:hover { color: #F8FAFC; }

.aw-exit-enter-active, .aw-exit-leave-active { transition: opacity 0.35s ease; }
.aw-exit-enter-active .aw-exit-card, .aw-exit-leave-active .aw-exit-card { transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-exit-enter-from, .aw-exit-leave-to { opacity: 0; }
.aw-exit-enter-from .aw-exit-card, .aw-exit-leave-to .aw-exit-card { transform: translateY(24px) scale(0.97); }
</style>
