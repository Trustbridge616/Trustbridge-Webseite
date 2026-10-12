<template>
  <!-- Fünf Lichter als Orientierung (kein Zähler, keine Punkte) — Blueprint 4.0 -->
  <nav class="lab-path" aria-label="Fortschritt der Reise">
    <ol>
      <li v-for="ph in phases" :key="ph.id" :class="stateOf(ph.id)">
        <span class="lp-light" aria-hidden="true"></span>
        <span class="lp-label">{{ ph.label }}</span>
        <span class="sr-only">{{ stateText(ph.id) }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  phases: { type: Array, required: true },
  current: { type: String, default: null },
  complete: { type: Boolean, default: false },
});

const idx = (id) => props.phases.findIndex((p) => p.id === id);
const stateOf = (id) => {
  if (props.complete) return 'done';
  const cur = idx(props.current);
  const me = idx(id);
  if (cur < 0) return 'open';
  return me < cur ? 'done' : me === cur ? 'active' : 'open';
};
const stateText = (id) => ({ done: 'erreicht', active: 'aktuell', open: 'noch offen' }[stateOf(id)]);
</script>

<style scoped>
.lab-path ol {
  list-style: none; margin: 0 auto 1.5rem; padding: 0;
  display: flex; justify-content: center; align-items: flex-start; gap: 0; max-width: 620px;
}
.lab-path li {
  position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.45rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.lab-path li + li::before {
  content: ''; position: absolute; top: 9px; right: 50%; width: 100%; height: 2px;
  background: rgba(255,255,255,0.12); z-index: 0;
}
.lab-path li.done + li::before,
.lab-path li.active::before { background: linear-gradient(90deg, rgba(142,245,210,0.7), rgba(142,245,210,0.25)); }
.lp-light {
  position: relative; z-index: 1; width: 20px; height: 20px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.5s ease;
}
.done .lp-light { background: rgba(142,245,210,0.55); border-color: rgba(142,245,210,0.8); box-shadow: 0 0 14px rgba(142,245,210,0.4); }
.active .lp-light {
  background: #F0CF5A; border-color: #F0CF5A;
  box-shadow: 0 0 22px rgba(240,207,90,0.75), 0 0 40px rgba(240,207,90,0.3);
}
@media (prefers-reduced-motion: no-preference) {
  .active .lp-light { animation: lpBreath 3.2s ease-in-out infinite; }
  @keyframes lpBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
}
.lp-label { font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.45); font-weight: 700; }
.done .lp-label { color: rgba(142,245,210,0.8); }
.active .lp-label { color: #F0CF5A; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 480px) {
  .lp-label { font-size: 0.6rem; letter-spacing: 1px; }
}
</style>
