<template>
  <div class="dual-panels mt-4 mb-6">
    <section class="glass-panel-dark">
      <h2 class="h2-small">Transparenz ohne private Daten</h2>
      <p>Öffentlich sichtbar sind nur Informationen zur Box selbst: TrustBox-ID, Box-Level, Warenmix, Versandmonat, grobe Region, freigegebene Bilder und Reviews. Namen, Adressen, Trackingnummern, Rechnungen und private Bestelldaten bleiben geschützt.</p>
    </section>

    <section class="glass-panel-dark">
      <h2 class="h2-small">Von der Community für die Community</h2>
      <p>Jede veröffentlichte Box hilft neuen Kunden, Trustbridge besser zu verstehen. Echte Bilder, echte Reviews und echte Warenbeispiele machen den Warenfluss transparenter.</p>
    </section>
  </div>
</template>

<style scoped>
.dual-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; position: relative; z-index: 2; margin-bottom: 4rem; }
.glass-panel-dark { background: rgba(20, 10, 40, 0.6); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; }
.h2-small { font-family: 'Century Gothic', sans-serif; color: #FFF; font-size: 1.6rem; margin-bottom: 1rem; }
p { color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1rem; }
.disclaimer-text { font-size: 0.85rem; color: rgba(255,255,255,0.4); font-style: italic; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem; margin-top: 1rem; }
.community-highlight { color: #8EF5D2; font-weight: bold; font-style: italic; margin-top: 1.5rem; font-size: 1.1rem; }

@media (max-width: 900px) {
  .dual-panels { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>
