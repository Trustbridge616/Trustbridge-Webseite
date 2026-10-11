<template>
  <!-- Die Crystal-Card aus /prizes (Zahlungsart-/Boxen-Auswahl), 1:1 als
       wiederverwendbare Kachel. Markup und CSS sind unverändert aus
       Pages/Prizes.vue übernommen; neu ist nur .cc-title (ein Satz statt
       Preis) mit derselben Farb- und Glow-Logik wie .cc-price. -->
  <div
    class="crystal-card"
    :class="{ active, 'abo-active': active }"
    role="button"
    tabindex="0"
    :aria-pressed="active"
    @click="$emit('select')"
    @keydown.enter.prevent="$emit('select')"
    @keydown.space.prevent="$emit('select')"
  >
    <div class="cc-glass"></div>
    <div class="cc-refraction"></div>
    <div class="cc-aura"></div>
    <div class="cc-active-glow"></div>

    <div class="cc-badge cc-badge-popular" v-if="badge">{{ badge }}</div>

    <div class="cc-box-stage">
      <div class="cc-stage-ring"></div>
      <div class="cc-box-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="iconMarkup"></svg>
      </div>
    </div>

    <div class="cc-body">
      <span class="cc-name">{{ label }}</span>
      <span class="cc-title">{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  title: { type: String, default: '' },
  icon: { type: String, default: 'compass' },
  active: { type: Boolean, default: false },
  badge: { type: String, default: '' },
});
defineEmits(['select']);

/* Linien-Icons (Feather-Pfade, 24er-Raster) — gleiche Strichstärke wie
   das Zahnrad der Boxen-Auswahl. Statische Markup-Strings, kein Nutzertext. */
const ICONS = {
  'check':           '<polyline points="20 6 9 17 4 12"/>',
  'x':               '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'check-circle':    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'x-circle':        '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  'help-circle':     '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  'pause-circle':    '<circle cx="12" cy="12" r="10"/><line x1="10" y1="15" x2="10" y2="9"/><line x1="14" y1="15" x2="14" y2="9"/>',
  'message-circle':  '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  'shuffle':         '<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>',
  'compass':         '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  'briefcase':       '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'home':            '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'heart':           '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  'users':           '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'user':            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'activity':        '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  'target':          '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'shield':          '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  'zap':             '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'sliders':         '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  'lock':            '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'clock':           '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'flag':            '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>',
  'eye':             '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  'volume-x':        '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>',
  'more-horizontal': '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  'smile':           '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  'corner-up-right': '<polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
  'feather':         '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/>',
  'repeat':          '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
};

const iconMarkup = computed(() => ICONS[props.icon] || ICONS.compass);
</script>

<style scoped>
/* ══════════════════════════════════════
   CRYSTAL CARD — unverändert aus Pages/Prizes.vue
   ══════════════════════════════════════ */
.crystal-card {
  position: relative; border-radius: 20px; padding: 4rem 1.5rem 3rem;
  text-align: center; cursor: pointer; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d; min-height: 380px;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.crystal-card:hover { transform: translateY(-15px) scale(1.08); z-index: 10; }
.crystal-card.active { transform: translateY(-30px) scale(1.22); z-index: 20; }
.crystal-card:focus-visible { outline: none; }

.cc-glass {
  position: absolute; inset: 0; background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 20px; border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.3); border-left: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02);
  transition: all 0.5s ease; overflow: hidden;
}
.cc-refraction {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 100%);
  border-radius: 20px; pointer-events: none; opacity: 0.5; transition: opacity 0.4s ease;
}
.cc-aura {
  position: absolute; inset: -2px; border-radius: 22px;
  background: linear-gradient(45deg, #7c3aed, #F0CF5A, #6366f1, #7c3aed);
  background-size: 300% 300%; opacity: 0; filter: blur(8px);
  transition: opacity 0.4s ease; z-index: -1;
}
.crystal-card:hover .cc-aura,
.crystal-card:focus-visible .cc-aura { opacity: 0.7; animation: auraSpin 3s linear infinite; }
@keyframes auraSpin { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* Active Glows (Single vs Abo) */
.cc-active-glow {
  position: absolute; inset: -8px; border-radius: 26px;
  background: linear-gradient(to bottom, #F0CF5A, rgba(240,207,90,0.3));
  opacity: 0; filter: blur(20px); transition: all 0.6s ease; z-index: -2;
}
.cc-body { text-align: center; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.2rem; position: relative; z-index: 2; }
.cc-name { color: #D9CFE8; font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.cc-price { color: #F7F1FF; font-size: 2.8rem; font-weight: 800; text-shadow: 0 0 20px rgba(240,207,90,0.4); margin-bottom: 0.2rem; transition: all 0.4s ease; }
.crystal-card.active .cc-price { color: #F0CF5A; }
.crystal-card.abo-active .cc-price { color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.5); }

.crystal-card.active .cc-active-glow { opacity: 0.95; box-shadow: 0 30px 60px rgba(240,207,90,0.4); }
.crystal-card.active .cc-glass {
  border-color: rgba(240,207,90,0.9); background: rgba(40, 25, 60, 0.85);
  box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 20px 40px rgba(240,207,90,0.2), inset 0 0 50px rgba(240,207,90,0.3);
}

/* ABO MODE OVERRIDES FOR BOX */
.crystal-card.abo-active .cc-active-glow {
  background: linear-gradient(to bottom, #8EF5D2, rgba(142,245,210,0.2));
  box-shadow: 0 30px 60px rgba(142,245,210,0.3);
}
.crystal-card.abo-active .cc-glass {
  border-color: rgba(142,245,210,0.9); background: rgba(20, 35, 45, 0.85);
  box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 20px 40px rgba(142,245,210,0.2), inset 0 0 50px rgba(142,245,210,0.2);
}

/* Card Content */
.cc-body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 0.5rem; }
.cc-name { color: rgba(255,255,255,0.6); font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: color 0.4s ease; }
.crystal-card.active .cc-name { color: #F0CF5A; }
.crystal-card.abo-active .cc-name { color: #8EF5D2; }

.cc-price { color: #F7F1FF; font-size: 2.2rem; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.5); transition: all 0.4s ease; }
.crystal-card.active .cc-price { font-size: 3.4rem; text-shadow: 0 0 25px rgba(240,207,90,0.6); }
.crystal-card.abo-active .cc-price { text-shadow: 0 0 25px rgba(142,245,210,0.6); }

/* Finder: ein Satz statt Preis — gleiche Farb-/Glow-Logik wie .cc-price */
.cc-title { color: #F7F1FF; font-size: 1.2rem; font-weight: 700; line-height: 1.4; text-shadow: 0 2px 10px rgba(0,0,0,0.5); transition: all 0.4s ease; }
.crystal-card.active .cc-title { color: #F0CF5A; text-shadow: 0 0 25px rgba(240,207,90,0.6); }
.crystal-card.abo-active .cc-title { color: #8EF5D2; text-shadow: 0 0 25px rgba(142,245,210,0.6); }

/* Box Stage */
.cc-box-stage {
  position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;
  transition: transform 0.5s ease; z-index: 3;
}
.crystal-card:hover .cc-box-stage { transform: translateX(-50%) translateY(-10px); }
.crystal-card.active .cc-box-stage { transform: translateX(-50%) translateY(-20px) scale(1.15); }
.cc-stage-ring {
  position: absolute; bottom: 15px; width: 80px; height: 20px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(124,58,237,0.8) 0%, transparent 70%);
  filter: blur(4px); opacity: 0.5; transition: all 0.5s ease;
}
.crystal-card.active .cc-stage-ring {
  background: radial-gradient(ellipse, rgba(240,207,90,0.9) 0%, transparent 70%);
  filter: blur(6px); opacity: 1; box-shadow: 0 0 20px rgba(240,207,90,0.6);
}
.crystal-card.abo-active .cc-stage-ring {
  background: radial-gradient(ellipse, rgba(142,245,210,0.9) 0%, transparent 70%);
  box-shadow: 0 0 25px rgba(142,245,210,0.5);
}
/* Das Icon war in /prizes per Inline-Style immer mint — hier als Regel. */
.cc-box-icon { display: flex; align-items: center; justify-content: center; color: #8EF5D2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); transition: color 0.4s ease; }
.crystal-card.active .cc-box-icon { filter: drop-shadow(0 10px 15px rgba(240,207,90,0.4)); }
.crystal-card.abo-active .cc-box-icon { filter: drop-shadow(0 10px 15px rgba(142,245,210,0.4)); }

/* Badges */
.cc-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  padding: 4px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  z-index: 4; white-space: nowrap;
}
.cc-badge-popular { background: #7c3aed; color: #fff; box-shadow: 0 0 15px rgba(124,58,237,0.5); }

/* Responsive — die Crystal-Card-Anteile der /prizes-Breakpoints */
@media (max-width: 1024px) {
  .crystal-card { min-height: 240px; padding: 1.5rem 0.5rem; }
}
@media (max-width: 768px) {
  .crystal-card { transform: none !important; margin-bottom: 0.5rem; }
  .crystal-card:hover { transform: none !important; }
  .crystal-card.active { transform: scale(1.02) !important; border-color: rgba(240,207,90,0.8); }
  .crystal-card.abo-active { border-color: rgba(142,245,210,0.8); }
}
</style>
