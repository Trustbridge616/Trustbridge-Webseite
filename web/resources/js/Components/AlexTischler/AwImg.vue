<template>
  <div class="aw-img" :style="{ aspectRatio: ratio }">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      @error="failed = true"
    />
    <!-- Eleganter Platzhalter, solange kein Originalbild vorliegt -->
    <div v-else class="aw-img-ph" role="img" :aria-label="alt">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" width="46" height="46">
        <path d="M6.5 6.5h.01M4 16l4.5-4.5a1.5 1.5 0 0 1 2.1 0L16 17M14 15l1.5-1.5a1.5 1.5 0 0 1 2.1 0L20 16M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"/>
      </svg>
      <span v-if="label">{{ label }}</span>
    </div>
    <div class="aw-img-sheen" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  label: { type: String, default: '' },
  ratio: { type: String, default: '4 / 5' },
  eager: { type: Boolean, default: false },
});

const failed = ref(false);
</script>

<style scoped>
.aw-img {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(160deg, rgba(124,58,237,0.18), rgba(15,23,42,0.9) 55%, rgba(142,245,210,0.08));
}
.aw-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.aw-img-ph {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  color: rgba(217,207,232,0.55);
  text-align: center;
  padding: 1rem;
}
.aw-img-ph span {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.aw-img-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(11,17,21,0.55) 100%);
  pointer-events: none;
}
</style>
