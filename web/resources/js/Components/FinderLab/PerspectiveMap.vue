<template>
  <!-- Die Karte von oben (Blueprint 5.3): „Du bist hier", das bisherige Gleis,
       neue Stationen als Lichter. Der Nutzer zieht nichts — er schaut und wählt. -->
  <div class="pm">
    <svg class="pm-svg" viewBox="0 0 420 240" aria-hidden="true">
      <defs><filter id="pmGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter></defs>
      <path d="M0 205 H112" class="pm-old" />
      <line v-for="st in placed" :key="'l' + st.id" x1="112" y1="205" :x2="st.x" :y2="st.y" class="pm-link" :class="{ on: picked === st.id }" />
      <g v-for="st in placed" :key="st.id" class="pm-station" :class="{ on: picked === st.id }" @click="$emit('pick', st.id)">
        <circle :cx="st.x" :cy="st.y" r="14" class="pm-halo" filter="url(#pmGlow)" />
        <circle :cx="st.x" :cy="st.y" r="7" class="pm-dot" />
        <text :x="st.x" :y="st.y - 16" text-anchor="middle" class="pm-text">{{ st.label }}</text>
      </g>
      <circle cx="112" cy="205" r="16" class="pm-here-halo" filter="url(#pmGlow)" />
      <circle cx="112" cy="205" r="7" class="pm-here" />
      <text x="112" y="232" text-anchor="middle" class="pm-text pm-text-own">Du bist hier</text>
    </svg>
    <p class="pm-caption" aria-live="polite">{{ caption }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  stations: { type: Array, required: true },   // [{ id, label }]
  picked: { type: String, default: null },
  caption: { type: String, default: '' },
});
defineEmits(['pick']);
const SPOTS = [{ x: 250, y: 70 }, { x: 345, y: 118 }, { x: 300, y: 190 }, { x: 205, y: 135 }, { x: 380, y: 48 }, { x: 160, y: 80 }];
const placed = computed(() => props.stations.slice(0, 6).map((s, i) => ({ ...s, ...SPOTS[i] })));
</script>

<style scoped>
.pm { width: 100%; max-width: 640px; margin: 0 auto; font-family: 'Century Gothic', system-ui, sans-serif; text-align: center; }
.pm-svg { width: 100%; height: auto; display: block; overflow: visible; }
.pm-old { fill: none; stroke: rgba(255,255,255,0.35); stroke-width: 4; stroke-linecap: round; }
.pm-link { stroke: rgba(240,207,90,0.18); stroke-width: 2; stroke-dasharray: 5 7; transition: stroke 0.4s ease; }
.pm-link.on { stroke: rgba(240,207,90,0.8); }
.pm-station { cursor: pointer; }
.pm-halo { fill: rgba(142,245,210,0.25); transition: fill 0.4s ease; }
.pm-dot { fill: #8EF5D2; }
.pm-station.on .pm-halo { fill: rgba(240,207,90,0.6); }
.pm-station.on .pm-dot { fill: #F0CF5A; }
.pm-text { fill: rgba(255,255,255,0.8); font-size: 12px; font-weight: 700; }
.pm-text-own { fill: #F0CF5A; }
.pm-here-halo { fill: rgba(240,207,90,0.6); }
.pm-here { fill: #F7F1FF; }
@media (prefers-reduced-motion: no-preference) {
  .pm-halo { animation: pmBreath 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  @keyframes pmBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.25); } }
}
.pm-caption { color: #F7F1FF; font-size: 1.02rem; line-height: 1.5; min-height: 1.5em; margin: 0.6rem 0 0; }
@media (max-width: 480px) { .pm-text { font-size: 14px; } }
</style>
