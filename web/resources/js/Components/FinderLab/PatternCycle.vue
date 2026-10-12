<template>
  <!-- Der Musterkreislauf mit Ausstieg (Blueprint 5.2). Fünf Knoten im Ring,
       zwischen „Druck" und „Ja" ein Gleis nach außen: die Brücke. -->
  <div class="pc">
    <svg class="pc-svg" viewBox="0 0 340 320" aria-hidden="true">
      <defs><filter id="pcGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter></defs>
      <!-- Segmente -->
      <path v-for="(seg, i) in segments" :key="'s' + i" :d="seg" class="pc-seg" :class="{ filled: i < filled }" />
      <!-- Ausstieg -->
      <g class="pc-exit" @click="$emit('exit')">
        <line :x1="exit.a.x" :y1="exit.a.y" :x2="exit.b.x" :y2="exit.b.y" />
        <circle :cx="exit.b.x" :cy="exit.b.y" r="7" />
        <text :x="exit.b.x + 12" :y="exit.b.y + 4" class="pc-text pc-text-own">Ausstieg</text>
      </g>
      <!-- Knoten -->
      <g v-for="(n, i) in placed" :key="n.id" class="pc-node" :class="{ active: activeNode === n.id }" @click="$emit('node', n.id)">
        <circle :cx="n.x" :cy="n.y" r="24" class="pc-node-bg" />
        <text :x="n.x" :y="n.y + 4" text-anchor="middle" class="pc-text">{{ n.short }}</text>
      </g>
    </svg>

    <div class="pc-controls" role="group" aria-label="Kreislauf — Knoten anzeigen">
      <button v-for="n in nodes" :key="'b' + n.id" type="button" class="pc-chip" :class="{ on: activeNode === n.id }" :aria-pressed="activeNode === n.id" @click="$emit('node', n.id)">{{ n.label }}</button>
      <button type="button" class="pc-chip pc-chip-exit" @click="$emit('exit')">Ausstieg: {{ exitLabel }}</button>
    </div>
    <p class="pc-caption" aria-live="polite">{{ caption }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  nodes: { type: Array, required: true },   // [{ id, label, short, text }]
  filled: { type: Number, default: 0 },     // gefüllte Segmente 0..5
  exitLabel: { type: String, default: 'Bedenkzeit' },
  activeNode: { type: String, default: null },
  caption: { type: String, default: '' },
});
defineEmits(['node', 'exit']);

const C = { x: 170, y: 165 }, R = 108;
const ang = (i) => ((-90 + i * 72) * Math.PI) / 180;
const pt = (i, r = R) => ({ x: C.x + r * Math.cos(ang(i)), y: C.y + r * Math.sin(ang(i)) });
const placed = computed(() => props.nodes.map((n, i) => ({ ...n, ...pt(i) })));
const segments = computed(() => props.nodes.map((_, i) => {
  const a = pt(i), b = pt((i + 1) % props.nodes.length);
  return `M${a.x} ${a.y} A${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}));
const exit = computed(() => {
  const mid = ((-90 + 72 * 1.5) * Math.PI) / 180;
  return { a: { x: C.x + R * Math.cos(mid), y: C.y + R * Math.sin(mid) }, b: { x: C.x + (R + 44) * Math.cos(mid), y: C.y + (R + 44) * Math.sin(mid) } };
});
</script>

<style scoped>
.pc { width: 100%; max-width: 520px; margin: 0 auto; font-family: 'Century Gothic', system-ui, sans-serif; text-align: center; }
.pc-svg { width: 100%; height: auto; display: block; overflow: visible; }
.pc-seg { fill: none; stroke: rgba(255,255,255,0.18); stroke-width: 5; stroke-linecap: round; transition: stroke 0.5s ease; }
.pc-seg.filled { stroke: rgba(240,207,90,0.8); filter: drop-shadow(0 0 6px rgba(240,207,90,0.5)); }
.pc-node { cursor: pointer; }
.pc-node-bg { fill: rgba(30,20,50,0.9); stroke: rgba(255,255,255,0.3); stroke-width: 1.5; transition: all 0.3s ease; }
.pc-node:hover .pc-node-bg, .pc-node.active .pc-node-bg { stroke: #8EF5D2; filter: drop-shadow(0 0 10px rgba(142,245,210,0.5)); }
.pc-text { fill: #F7F1FF; font-size: 12px; font-weight: 700; letter-spacing: 0.3px; }
.pc-text-own { fill: #F0CF5A; }
.pc-exit { cursor: pointer; }
.pc-exit line { stroke: #F0CF5A; stroke-width: 3; stroke-dasharray: 6 6; }
.pc-exit circle { fill: #F0CF5A; filter: drop-shadow(0 0 10px rgba(240,207,90,0.9)); }
.pc-controls { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 0.5rem; }
.pc-chip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #D9CFE8; border-radius: 20px; padding: 0.5rem 0.9rem; font-family: inherit; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.3s ease; }
.pc-chip.on, .pc-chip:hover { border-color: rgba(142,245,210,0.6); color: #8EF5D2; }
.pc-chip:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 2px; }
.pc-chip-exit { border-color: rgba(240,207,90,0.5); color: #F0CF5A; }
.pc-caption { color: #F7F1FF; font-size: 1.02rem; line-height: 1.5; min-height: 1.5em; margin: 0.9rem 0 0; }
</style>
