<template>
  <!--
    Ersetzt exakt das bisherige <img src="/trustbridge-hero-portal-center.png">.

    Die Komponente bringt bewusst KEIN eigenes Layout mit: sie uebernimmt die
    Klassen von aussen (`panther panther-center`), damit Groesse, Position,
    Maske, Drop-Shadow und die float-3d-center-Animation aus Welcome.vue
    unveraendert weitergelten.

    Zwei Lagen:
      1. Videoschleife – Ringlicht, Nebel, Funken, Treppenlicht, Wurzelwerk.
      2. Der unveraenderte Emblem-Ausschnitt aus dem Original darueber, damit
         Panther, Elster, Mond und TRUST/BRIDGE nie verzerren koennen.

    Bei reduzierter Bewegung oder abgeschaltetem Video traegt die
    Standbildebene das komplette Motiv.
  -->
  <div ref="rootEl" class="tb-loop">
    <video
      v-if="showVideo"
      ref="videoEl"
      class="tb-loop-layer"
      :poster="poster"
      muted
      loop
      playsinline
      preload="metadata"
      tabindex="-1"
      aria-hidden="true"
      @loadeddata="onLoaded"
    >
      <source :src="src.webm" type="video/webm" />
      <source :src="src.mp4" type="video/mp4" />
    </video>

    <!-- Standbild: sichtbar bis das Video laeuft und im Standbildmodus -->
    <picture v-show="!showVideo || !ready">
      <source type="image/avif" :srcset="`${base}/portal-master-768.avif 768w, ${base}/portal-master-1024.avif 1024w`" sizes="(max-width: 768px) 90vw, 700px" />
      <source type="image/webp" :srcset="`${base}/portal-master-768.webp 768w, ${base}/portal-master-1024.webp 1024w`" sizes="(max-width: 768px) 90vw, 700px" />
      <img
        class="tb-loop-layer"
        :src="`${base}/portal-master-1024.png`"
        width="1024"
        height="1536"
        :alt="alt"
        decoding="async"
        fetchpriority="high"
      />
    </picture>

    <!-- Scharfe Emblem-Ebene, deckungsgleich auf der Videogeometrie.
         Traegt die originale goldene Wortmarke TRUST/BRIDGE - sie ist Teil
         des Logos und bleibt unveraendert. Weil diese Ebene deckend ist,
         liegt die Typografie immer gestochen scharf ueber der Videoebene. -->
    <img
      v-if="showVideo"
      class="tb-loop-emblem"
      :src="`${base}/portal-emblem-crop.webp`"
      width="548"
      height="548"
      :alt="alt"
      decoding="async"
      fetchpriority="high"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
  /** false => reiner Standbildmodus, es wird kein Video geladen */
  enableVideo: { type: Boolean, default: true },
});

const base = '/assets/trustbridge/hero/portal';
const poster = '/assets/trustbridge/hero/posters/portal-poster.webp';

const alt =
  'Trustbridge Portal: ein goldener Ring aus Wurzeln und Zweigen umschliesst einen '
  + 'violetten Innenring mit schwarzem Panther, Elster, Mond und dem Schriftzug '
  + 'TRUST BRIDGE; darunter fuehrt eine Steintreppe ins Licht.';

const rootEl = ref(null);
const videoEl = ref(null);
const ready = ref(false);

const reduced = ref(false);
const narrow = ref(false);
const inView = ref(true);
const pageVisible = ref(true);

const showVideo = computed(() => props.enableVideo && !reduced.value);
const src = computed(() =>
  narrow.value
    ? { webm: `${base}/portal-loop-mobile.webm`, mp4: `${base}/portal-loop-mobile.mp4` }
    : { webm: `${base}/portal-loop-desktop.webm`, mp4: `${base}/portal-loop-desktop.mp4` },
);

/** Bewegung nur, wenn sichtbar, im Vordergrund und erwuenscht. */
const animate = computed(() => showVideo.value && inView.value && pageVisible.value);

function syncPlayback() {
  const el = videoEl.value;
  if (!el) return;
  if (animate.value) {
    el.play().catch(() => {
      // Autoplay abgelehnt: das Poster bleibt stehen, der Hero bleibt nutzbar.
    });
  } else {
    el.pause();
  }
}

function onLoaded() {
  ready.value = true;
  syncPlayback();
}

let mqReduced = null;
let mqNarrow = null;
let observer = null;
const onVisibility = () => { pageVisible.value = document.visibilityState === 'visible'; };
const syncReduced = () => { reduced.value = mqReduced.matches; };
const syncNarrow = () => { narrow.value = mqNarrow.matches; };

onMounted(() => {
  mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  mqNarrow = window.matchMedia('(max-width: 768px)');
  syncReduced();
  syncNarrow();
  mqReduced.addEventListener('change', syncReduced);
  mqNarrow.addEventListener('change', syncNarrow);

  onVisibility();
  document.addEventListener('visibilitychange', onVisibility);

  if (typeof IntersectionObserver !== 'undefined' && rootEl.value) {
    observer = new IntersectionObserver(
      ([e]) => { inView.value = e.isIntersecting; },
      { rootMargin: '150px', threshold: 0 },
    );
    observer.observe(rootEl.value);
  }

  syncPlayback();
});

onUnmounted(() => {
  mqReduced?.removeEventListener('change', syncReduced);
  mqNarrow?.removeEventListener('change', syncNarrow);
  document.removeEventListener('visibilitychange', onVisibility);
  observer?.disconnect();
});

watch(animate, syncPlayback, { flush: 'post' });
</script>

<style scoped>
/* Nur Innenleben – Groesse und Position kommen von aussen. */
.tb-loop {
  /* Originalseitenverhaeltnis des Motivs (1024 x 1536) */
  aspect-ratio: 1024 / 1536;
}

.tb-loop-layer {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/*
  Lage des Emblem-Ausschnitts im Motiv, gemessen am Original:
  Mittelpunkt des violetten Innenrings (511,5 / 730,5), Radius 274.
*/
.tb-loop-emblem {
  position: absolute;
  left: 23.242%;
  top: 29.753%;
  width: 53.516%;
  height: auto;
  pointer-events: none;
}
</style>
