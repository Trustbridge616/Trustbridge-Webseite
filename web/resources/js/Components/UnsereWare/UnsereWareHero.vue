<template>
  <div class="page-hero">
    <div class="container hero-container">
      <span class="page-label">TRANSPARENZ & VERTRAUEN</span>
      <h1 class="hero-headline">Echte Ware. Echte Kundenbilder.<br>Verifizierte Reviews.</h1>
      <p class="hero-sub">Hier zeigen wir ausgewählte TrustBoxen, Kundenbilder und verifizierte Reviews aus dem laufenden Warenfluss.</p>
      <p class="hero-desc">Jede veröffentlichte Box kann mit einer eindeutigen TrustBox-ID verbunden werden. So wird sichtbar, welche Ware verschickt wurde und welche Reviews wirklich zu einer verifizierten Bestellung gehören.</p>
      <div class="hero-highlight-pill">Vertrauen ist gut. Transparenz ist besser.</div>
    </div>
  </div>
</template>

<style scoped>
.page-hero { position: relative; padding: 10rem 2rem 5rem; text-align: center; }
.hero-container { max-width: 800px; margin: 0 auto; position: relative; z-index: 2; }
.page-label { display: inline-block; background: rgba(212,175,55,0.1); color: #D4AF37; border: 1px solid rgba(212,175,55,0.3); padding: 0.4rem 1.2rem; border-radius: 50px; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; box-shadow: 0 0 20px rgba(212,175,55,0.1); }
.hero-headline { font-family: 'Century Gothic', system-ui, sans-serif; font-size: 3.5rem; color: white; margin-bottom: 1.5rem; line-height: 1.1; text-shadow: 0 0 30px rgba(142,245,210,0.15); }
.hero-sub { color: #8EF5D2; font-size: 1.2rem; margin-bottom: 1.5rem; font-weight: bold; line-height: 1.5; }
.hero-desc { color: rgba(255,255,255,0.6); font-size: 1.05rem; margin-bottom: 2.5rem; line-height: 1.6; }
.hero-highlight-pill { display: inline-block; padding: 12px 24px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); color: #FFF; font-weight: bold; font-family: 'Century Gothic', sans-serif; letter-spacing: 1px; backdrop-filter: blur(10px); }

@media (max-width: 900px) {
  .hero-headline { font-size: 2.8rem; }
}

@media (max-width: 600px) {
  .hero-headline { font-size: 2.2rem; }
  .page-hero { padding: 8rem 1rem 4rem; }
}
</style>
