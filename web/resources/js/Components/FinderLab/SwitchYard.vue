<template>
  <!-- Das Stellwerk (Blueprint 5.1, A7): fünf Weichen hintereinander. Jede
       Entscheidung „Erwartung" rückt die gefahrene Spur ein Gleis vom eigenen
       Gleis (gold, gestrichelt) weg, „Impuls" wieder zurück. Der Nutzer erzeugt
       die Strecke selbst — niemand erklärt sie ihm vorab. -->
  <div class="sy">
    <div class="sy-scene" aria-live="polite">
      <span class="sy-scene-kicker">Situation {{ Math.min(switches.length + 1, max) }} von {{ max }}</span>
      <p class="sy-scene-text">{{ done ? 'Fünf Weichen. Schau dir die Strecke an.' : scenes[switches.length] }}</p>
    </div>

    <svg class="sy-svg" viewBox="0 0 760 262" aria-hidden="true">
      <defs>
        <filter id="syGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      <!-- Dein Gleis -->
      <line x1="0" :y1="laneY(0)" x2="760" :y2="laneY(0)" class="sy-own" :class="{ bright: altShown }" />
      <text x="8" :y="laneY(0) + 24" class="sy-text sy-text-own">Dein Gleis</text>

      <!-- Leere Gleislagen -->
      <line v-for="k in 5" :key="'lane' + k" x1="0" :y1="laneY(k)" x2="760" :y2="laneY(k)" class="sy-lane" />

      <!-- Gefahrene Spur -->
      <polyline :points="pathPoints" class="sy-path" />

      <!-- Weichen -->
      <g v-for="(x, i) in switchX" :key="'sw' + i" class="sy-switch" :class="switchClass(i)">
        <circle :cx="x" :cy="laneY(laneBefore(i))" r="7" class="sy-switch-dot" />
        <g class="sy-lever" :style="{ transform: `rotate(${leverAngle(i)}deg)`, transformOrigin: `${x}px 248px` }">
          <line :x1="x" y1="248" :x2="x" y2="226" />
          <circle :cx="x" cy="224" r="5" />
        </g>
        <circle v-if="i === switches.length && !done" :cx="x" :cy="laneY(laneBefore(i))" r="14" class="sy-current" />
      </g>

      <!-- Laterne am letzten Hebel (Kompromiss) -->
      <circle v-if="lantern && switches.length" :cx="switchX[switches.length - 1] + 14" cy="222" r="5" class="sy-lantern" />

      <!-- Lichter -->
      <circle :cx="light.x" :cy="light.y" r="13" class="sy-light-halo" filter="url(#syGlow)" />
      <circle :cx="light.x" :cy="light.y" r="6" class="sy-light" />
      <g v-if="altShown">
        <circle cx="748" :cy="laneY(0)" r="13" class="sy-light-halo alt" filter="url(#syGlow)" />
        <circle cx="748" :cy="laneY(0)" r="6" class="sy-light alt" />
        <text x="700" :y="laneY(0) - 14" class="sy-text sy-text-own">bei Impuls</text>
      </g>
    </svg>

    <div class="sy-meta">
      <!-- Neutrale Zählung statt Abstands-Score: Erwartung ist keine Wertachse -->
      <span class="sy-distance"><strong>{{ nExpectation }}×</strong> Erwartung · <strong>{{ nImpulse }}×</strong> Impuls</span>
      <button type="button" class="sy-alt" v-if="switches.length >= min" @click="$emit('alt')">
        {{ altShown ? 'Dein Gleis ausblenden' : 'Dein Gleis zeigen' }}
      </button>
    </div>

    <!-- Aktionen (jede Wahl hängt eine Weiche an), daher Buttons in einer Gruppe, keine Radios -->
    <div class="sy-controls" role="group" :aria-label="`Weiche ${switches.length + 1} von ${max} stellen`" v-if="!done" @keydown="onKey">
      <button type="button" class="sy-radio sy-radio-own" :aria-label="`Weiche ${switches.length + 1} auf Impuls stellen: ${impulseLabel}`" @click="$emit('set', 'impulse')">
        <span class="sy-radio-kicker">Impuls</span><span class="sy-radio-text">{{ impulseLabel }}</span>
      </button>
      <button type="button" class="sy-radio" :aria-label="`Weiche ${switches.length + 1} auf Erwartung stellen: ${expectationLabel}`" @click="$emit('set', 'expectation')">
        <span class="sy-radio-kicker">Erwartung</span><span class="sy-radio-text">{{ expectationLabel }}</span>
      </button>
    </div>

    <details class="sy-text-eq">
      <summary>Als Text</summary>
      <ol>
        <li v-for="(sw, i) in switches" :key="'t' + i">{{ scenes[i] }} — gestellt auf: {{ sw === 'impulse' ? 'Impuls' : 'Erwartung' }}</li>
      </ol>
      <p v-if="!switches.length">Noch keine Weiche gestellt.</p>
    </details>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  scenes: { type: Array, required: true },
  switches: { type: Array, required: true },          // 'impulse' | 'expectation'
  impulseLabel: { type: String, default: 'Mein Impuls' },
  expectationLabel: { type: String, default: 'Die Erwartung' },
  altShown: { type: Boolean, default: false },
  lantern: { type: Boolean, default: false },
  max: { type: Number, default: 5 },
  min: { type: Number, default: 3 },
});
const emit = defineEmits(['set', 'alt']);

const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const DIAG = 46;
const laneY = (k) => 196 - 32 * k;
const switchX = computed(() => Array.from({ length: props.max }, (_, i) => 80 + i * 130));
const done = computed(() => props.switches.length >= props.max);

const lanes = computed(() => {
  const out = [0];
  for (const sw of props.switches) {
    const prev = out[out.length - 1];
    out.push(sw === 'expectation' ? Math.min(prev + 1, 5) : Math.max(prev - 1, 0));
  }
  return out;
});
const laneBefore = (i) => lanes.value[Math.min(i, lanes.value.length - 1)];
const distance = computed(() => lanes.value[lanes.value.length - 1]);
const nExpectation = computed(() => props.switches.filter((s) => s === 'expectation').length);
const nImpulse = computed(() => props.switches.filter((s) => s === 'impulse').length);

const points = computed(() => {
  const pts = [{ x: 0, y: laneY(0) }];
  props.switches.forEach((sw, i) => {
    const x = switchX.value[i];
    pts.push({ x, y: laneY(lanes.value[i]) });
    pts.push({ x: x + DIAG, y: laneY(lanes.value[i + 1]) });
  });
  const endX = done.value ? 760 : switchX.value[props.switches.length];
  pts.push({ x: endX, y: laneY(lanes.value[lanes.value.length - 1]) });
  return pts;
});
const pathPoints = computed(() => points.value.map((p) => `${p.x},${p.y}`).join(' '));

const light = ref({ x: 0, y: laneY(0) });
let raf = null;
function animateTo(pts, duration) {
  if (raf) cancelAnimationFrame(raf);
  if (reduced || pts.length < 2) { light.value = { ...pts[pts.length - 1] }; return; }
  const segs = []; let total = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); segs.push({ a: pts[i - 1], b: pts[i], d, acc: total }); total += d; }
  const t0 = performance.now(); const ease = (x) => 1 - Math.pow(1 - x, 3);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration); const dist = ease(p) * total;
    const sg = segs.find((g) => dist <= g.acc + g.d) || segs[segs.length - 1];
    const k = sg.d ? (dist - sg.acc) / sg.d : 1;
    light.value = { x: sg.a.x + (sg.b.x - sg.a.x) * k, y: sg.a.y + (sg.b.y - sg.a.y) * k };
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}
watch(() => props.switches.length, (n, old) => {
  const pts = points.value;
  if (n > (old || 0)) animateTo(pts.slice(-3), 900);
  else light.value = { ...pts[pts.length - 1] };
});
onMounted(() => { const pts = points.value; light.value = { ...pts[pts.length - 1] }; });
onBeforeUnmount(() => { if (raf) cancelAnimationFrame(raf); });

const switchClass = (i) => ({ set: i < props.switches.length, current: i === props.switches.length && !done.value, impulse: props.switches[i] === 'impulse', expectation: props.switches[i] === 'expectation' });
const leverAngle = (i) => (props.switches[i] === 'impulse' ? -30 : props.switches[i] === 'expectation' ? 30 : 0);

function onKey(e) {
  if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); emit('set', 'impulse'); }
  if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); emit('set', 'expectation'); }
}
</script>

<style scoped>
.sy { width: 100%; max-width: 860px; margin: 0 auto; font-family: 'Century Gothic', system-ui, sans-serif; }
.sy-scene {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px;
  padding: 1rem 1.4rem; margin-bottom: 0.75rem; text-align: left;
}
.sy-scene-kicker { display: block; font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: #8EF5D2; font-weight: 700; margin-bottom: 0.3rem; }
.sy-scene-text { margin: 0; color: #F7F1FF; font-size: 1.15rem; font-weight: 700; line-height: 1.4; }

.sy-svg { width: 100%; height: auto; display: block; overflow: visible; }
.sy-own { stroke: rgba(240,207,90,0.55); stroke-width: 3; stroke-dasharray: 10 8; transition: all 0.4s ease; }
.sy-own.bright { stroke: #F0CF5A; stroke-dasharray: none; filter: drop-shadow(0 0 8px rgba(240,207,90,0.6)); }
.sy-lane { stroke: rgba(255,255,255,0.07); stroke-width: 2; }
.sy-path { fill: none; stroke: rgba(255,255,255,0.75); stroke-width: 4; stroke-linejoin: round; stroke-linecap: round; filter: drop-shadow(0 0 6px rgba(255,255,255,0.25)); }
.sy-switch-dot { fill: rgba(255,255,255,0.25); }
.sy-switch.set .sy-switch-dot { fill: #F7F1FF; }
.sy-current { fill: none; stroke: #8EF5D2; stroke-width: 2; }
@media (prefers-reduced-motion: no-preference) {
  .sy-current { animation: syPulse 1.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  @keyframes syPulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
}
.sy-lever { transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1); }
.sy-lever line { stroke: rgba(217,207,232,0.5); stroke-width: 4; stroke-linecap: round; }
.sy-lever circle { fill: rgba(255,255,255,0.25); }
.sy-switch.impulse .sy-lever circle { fill: #F0CF5A; filter: drop-shadow(0 0 6px rgba(240,207,90,0.7)); }
.sy-switch.expectation .sy-lever circle { fill: #F7F1FF; }
.sy-switch.set .sy-lever line { stroke: #D9CFE8; }
.sy-lantern { fill: #F0CF5A; filter: drop-shadow(0 0 10px rgba(240,207,90,0.9)); }
.sy-light { fill: #F7F1FF; }
.sy-light-halo { fill: rgba(240,207,90,0.7); }
.sy-light.alt { fill: #F0CF5A; }
.sy-light-halo.alt { fill: rgba(240,207,90,0.45); }
.sy-text { fill: rgba(255,255,255,0.6); font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }
.sy-text-own { fill: #F0CF5A; }

.sy-meta { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin: 0.25rem 0 0.75rem; }
.sy-distance { color: #D9CFE8; font-size: 0.95rem; }
.sy-distance strong { color: #F0CF5A; }
.sy-alt { background: transparent; border: 1px solid rgba(240,207,90,0.4); color: #F0CF5A; border-radius: 8px; padding: 0.55rem 1rem; font-family: inherit; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease; }
.sy-alt:hover { background: rgba(240,207,90,0.1); }
.sy-alt:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 2px; }

.sy-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.sy-radio {
  display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; text-align: left;
  padding: 1rem 1.2rem; border-radius: 16px; cursor: pointer; min-height: 72px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15); color: #F7F1FF; font-family: inherit; transition: all 0.3s ease;
}
.sy-radio:hover { background: rgba(255,255,255,0.09); border-color: rgba(142,245,210,0.5); }
.sy-radio-own:hover { border-color: rgba(240,207,90,0.6); }
.sy-radio:focus-visible { outline: 2px solid #8EF5D2; outline-offset: 3px; }
.sy-radio-kicker { font-size: 0.72rem; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.55); font-weight: 700; }
.sy-radio-own .sy-radio-kicker { color: #F0CF5A; }
.sy-radio-text { font-size: 1.05rem; font-weight: 700; line-height: 1.3; }

.sy-text-eq { margin-top: 1rem; color: #D9CFE8; font-size: 0.9rem; text-align: left; }
.sy-text-eq summary { cursor: pointer; color: rgba(255,255,255,0.6); }
.sy-text-eq ol { margin: 0.5rem 0 0; padding-left: 1.2rem; }
@media (prefers-reduced-motion: reduce) { .sy-lever { transition: none; } }
@media (max-width: 480px) {
  .sy-text { font-size: 15px; }
  .sy-controls { gap: 0.6rem; }
  .sy-scene-text { font-size: 1.02rem; }
}
</style>
