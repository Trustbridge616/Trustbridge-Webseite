<template>
  <!-- Die Weiche (Blueprint 5.1): ein Gleis, zwei Richtungen — oben der eigene
       Impuls (gold, gestrichelt), unten die Erwartung. Der Hebel ist Dekoration,
       die Radiogroup darunter ist die barrierefreie Bedienung. -->
  <div class="rs" :class="{ 'rs-reduced': reduced }">
    <svg class="rs-svg" viewBox="0 0 440 210" aria-hidden="true">
      <defs>
        <filter id="rsGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      <!-- Gleise -->
      <path d="M0 105 H120" class="rs-track" />
      <path d="M120 105 C170 105 190 45 240 45 H440" class="rs-track rs-own" :class="{ chosen: modelValue === 'impulse' }" @click="set('impulse')" />
      <path d="M120 105 C170 105 190 165 240 165 H440" class="rs-track rs-exp" :class="{ chosen: modelValue === 'expectation' }" @click="set('expectation')" />
      <!-- Weichenzungen -->
      <path d="M118 105 L136 97" class="rs-blade" :class="{ on: modelValue === 'impulse' }" />
      <path d="M118 105 L136 113" class="rs-blade" :class="{ on: modelValue === 'expectation' }" />

      <!-- Hebel -->
      <g class="rs-lever-base"><rect x="56" y="156" width="28" height="8" rx="3" /></g>
      <g class="rs-lever" :style="{ transform: `rotate(${angle}deg)` }">
        <line x1="70" y1="158" x2="70" y2="122" />
        <circle cx="70" cy="120" r="7" />
      </g>

      <!-- Laterne (Kompromiss: bewusst gestellt) -->
      <g class="rs-lantern" :class="{ on: lantern }">
        <line x1="150" y1="78" x2="150" y2="92" />
        <circle cx="150" cy="72" r="6" />
      </g>

      <!-- Zug-Licht -->
      <circle :cx="light.x" :cy="light.y" r="12" class="rs-light-halo" filter="url(#rsGlow)" />
      <circle :cx="light.x" :cy="light.y" r="6" class="rs-light" />

      <!-- Beschriftung -->
      <text x="250" y="30" class="rs-label rs-label-own">Dein Impuls · {{ impulseLabel }}</text>
      <text x="250" y="192" class="rs-label">Die Erwartung · {{ expectationLabel }}</text>
    </svg>

    <div class="rs-controls" role="radiogroup" aria-label="Weiche stellen" @keydown="onKey">
      <button
        type="button" role="radio" :aria-checked="modelValue === 'impulse'"
        :tabindex="modelValue === 'expectation' ? -1 : 0"
        class="rs-radio rs-radio-own" :class="{ on: modelValue === 'impulse' }" @click="set('impulse')"
      >
        <span class="rs-radio-kicker">Impuls</span>
        <span class="rs-radio-text">{{ impulseLabel }}</span>
      </button>
      <button
        type="button" role="radio" :aria-checked="modelValue === 'expectation'"
        :tabindex="modelValue === 'impulse' ? -1 : 0"
        class="rs-radio" :class="{ on: modelValue === 'expectation' }" @click="set('expectation')"
      >
        <span class="rs-radio-kicker">Erwartung</span>
        <span class="rs-radio-text">{{ expectationLabel }}</span>
      </button>
    </div>
    <p class="sr-only" aria-live="polite">{{ liveText }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: null },       // 'impulse' | 'expectation' | 'mid' | null
  impulseLabel: { type: String, default: 'Dein Impuls' },
  expectationLabel: { type: String, default: 'Die Erwartung' },
  lantern: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const angle = computed(() => (props.modelValue === 'impulse' ? -32 : props.modelValue === 'expectation' ? 32 : 0));

/* Kubische Bezier abtasten, damit das Licht der Kurve folgt. */
function bezier(p0, p1, p2, p3, n = 10) {
  const pts = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n, u = 1 - t;
    pts.push({
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    });
  }
  return pts;
}
const START = { x: 14, y: 105 };
const ROUTES = {
  mid: [START, { x: 104, y: 105 }],
  impulse: [START, { x: 120, y: 105 }, ...bezier({ x: 120, y: 105 }, { x: 170, y: 105 }, { x: 190, y: 45 }, { x: 240, y: 45 }), { x: 410, y: 45 }],
  expectation: [START, { x: 120, y: 105 }, ...bezier({ x: 120, y: 105 }, { x: 170, y: 105 }, { x: 190, y: 165 }, { x: 240, y: 165 }), { x: 410, y: 165 }],
};

const light = ref({ ...START });
let raf = null;

function animateAlong(points, duration) {
  if (raf) cancelAnimationFrame(raf);
  const segs = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
    segs.push({ a: points[i - 1], b: points[i], d, acc: total });
    total += d;
  }
  if (reduced || duration <= 0) { light.value = { ...points[points.length - 1] }; return; }
  const t0 = performance.now();
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    const dist = ease(p) * total;
    const sg = segs.find((g) => dist <= g.acc + g.d) || segs[segs.length - 1];
    const k = sg.d ? (dist - sg.acc) / sg.d : 1;
    light.value = { x: sg.a.x + (sg.b.x - sg.a.x) * k, y: sg.a.y + (sg.b.y - sg.a.y) * k };
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function run(value) {
  const route = ROUTES[value] || [START];
  animateAlong(route, value === 'mid' ? 500 : 1150);
}

watch(() => props.modelValue, (v) => { if (v) run(v); else light.value = { ...START }; });
onMounted(() => { if (props.modelValue) { light.value = { ...ROUTES[props.modelValue]?.slice(-1)[0] || START }; } });
onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf); });

function set(v) {
  if (props.disabled) return;
  if (props.modelValue === v) return;
  emit('update:modelValue', v);
}
function onKey(e) {
  if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); set('impulse'); }
  if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); set('expectation'); }
}

const liveText = computed(() => {
  if (props.modelValue === 'impulse') return `Weiche steht auf deinem Impuls: ${props.impulseLabel}.`;
  if (props.modelValue === 'expectation') return `Weiche steht auf der Erwartung: ${props.expectationLabel}.`;
  if (props.modelValue === 'mid') return 'Weiche noch nicht gestellt – der Zug wartet.';
  return 'Weiche noch nicht gestellt.';
});
</script>

<style scoped>
.rs { width: 100%; max-width: 760px; margin: 0 auto; font-family: 'Century Gothic', system-ui, sans-serif; }
.rs-svg { width: 100%; height: auto; display: block; overflow: visible; }

.rs-track { fill: none; stroke: rgba(255,255,255,0.28); stroke-width: 4; stroke-linecap: round; cursor: pointer; transition: stroke 0.4s ease; }
.rs-track.rs-own { stroke: rgba(240,207,90,0.55); stroke-dasharray: 10 8; }
.rs-track.chosen { stroke: #8EF5D2; stroke-dasharray: none; filter: drop-shadow(0 0 8px rgba(142,245,210,0.5)); }
.rs-track.rs-own.chosen { stroke: #F0CF5A; filter: drop-shadow(0 0 10px rgba(240,207,90,0.6)); }
.rs-blade { stroke: rgba(255,255,255,0.15); stroke-width: 4; stroke-linecap: round; transition: stroke 0.3s ease; }
.rs-blade.on { stroke: #F7F1FF; }

.rs-lever-base rect { fill: rgba(255,255,255,0.15); }
.rs-lever { transform-box: fill-box; transform-origin: 50% 100%; transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1); }
.rs-lever line { stroke: #D9CFE8; stroke-width: 5; stroke-linecap: round; }
.rs-lever circle { fill: #F0CF5A; filter: drop-shadow(0 0 8px rgba(240,207,90,0.6)); }

.rs-lantern line { stroke: rgba(255,255,255,0.25); stroke-width: 2; }
.rs-lantern circle { fill: rgba(255,255,255,0.1); stroke: rgba(255,255,255,0.3); stroke-width: 1.5; transition: all 0.5s ease; }
.rs-lantern.on circle { fill: #F0CF5A; stroke: #F0CF5A; filter: drop-shadow(0 0 12px rgba(240,207,90,0.9)); }

.rs-light { fill: #F7F1FF; }
.rs-light-halo { fill: rgba(240,207,90,0.7); }
.rs-label { fill: rgba(255,255,255,0.7); font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
.rs-label-own { fill: #F0CF5A; }

.rs-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.5rem; }
.rs-radio {
  display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; text-align: left;
  padding: 1rem 1.2rem; border-radius: 16px; cursor: pointer; min-height: 72px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #F7F1FF;
  font-family: inherit; transition: all 0.3s ease;
}
.rs-radio:hover { background: rgba(255,255,255,0.09); }
.rs-radio:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 3px; }
.rs-radio.on { border-color: rgba(142,245,210,0.9); background: rgba(20,35,45,0.85); box-shadow: 0 0 25px rgba(142,245,210,0.25); }
.rs-radio-own.on { border-color: rgba(240,207,90,0.9); box-shadow: 0 0 25px rgba(240,207,90,0.3); }
.rs-radio-kicker { font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.55); font-weight: 700; }
.rs-radio.on .rs-radio-kicker { color: #8EF5D2; }
.rs-radio-own.on .rs-radio-kicker { color: #F0CF5A; }
.rs-radio-text { font-size: 1.05rem; font-weight: 700; line-height: 1.3; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

@media (prefers-reduced-motion: reduce) {
  .rs-lever { transition: none; }
  .rs-track { transition: none; }
}
@media (max-width: 480px) {
  .rs-label { font-size: 15px; }
  .rs-controls { gap: 0.6rem; }
  .rs-radio { padding: 0.8rem 0.9rem; }
}
</style>
