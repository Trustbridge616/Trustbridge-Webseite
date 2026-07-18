<template>
  <section class="section-upload-steps">
    <div class="upload-header text-center mb-5">
      <h2>So entstehen echte Kundenbilder</h2>
      <p>Bilder und Reviews können nicht frei von jedem hochgeladen werden. Jeder Beitrag wird einer echten Bestellung zugeordnet und vor Veröffentlichung geprüft.</p>
    </div>
    
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-num">01</div>
        <h3>TrustBox erhalten</h3>
        <p>Du erhältst deine Box mit zugeordneter TrustBox-ID.</p>
      </div>
      <div class="step-card">
        <div class="step-num">02</div>
        <h3>Im Kundenbereich einreichen</h3>
        <p>Logge dich ein, öffne deine Bestellung und lade ein Bild deiner erhaltenen Ware hoch.</p>
      </div>
      <div class="step-card">
        <div class="step-num">03</div>
        <h3>Review schreiben</h3>
        <p>Bewerte deine Box und teile deine Erfahrung mit der Community.</p>
      </div>
      <div class="step-card">
        <div class="step-num">04</div>
        <h3>Prüfung & Freigabe</h3>
        <p>Wir prüfen Bild, Bestellung, TrustBox-ID und Datenschutz, bevor der Beitrag veröffentlicht wird.</p>
      </div>
      <div class="step-card step-card-reward">
        <div class="step-num gold">05</div>
        <h3 class="gold-text">5 € Guthaben erhalten</h3>
        <p>Nach Freigabe und finalem Bestellstatus erhältst du 5 € Guthaben.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-upload-steps { margin-bottom: 4rem; }
.text-center { text-align: center; }
.mb-5 { margin-bottom: 3rem; }
h2 { font-family: 'Century Gothic', sans-serif; color: #FFF; font-size: 2.2rem; margin-bottom: 1.2rem; }
p { color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 1rem; font-size: 1.05rem; }

.steps-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
.step-card { background: rgba(45, 20, 80, 0.4); border: 1px solid rgba(142,245,210,0.1); border-radius: 16px; padding: 1.5rem; text-align: center; position: relative; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
.step-card-reward { background: linear-gradient(135deg, rgba(45, 20, 80, 0.6), rgba(20, 10, 40, 0.8)); border-color: rgba(212,175,55,0.3); box-shadow: 0 0 30px rgba(212,175,55,0.1); }
.step-num { width: 36px; height: 36px; background: rgba(142,245,210,0.1); color: #8EF5D2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-family: 'Century Gothic', sans-serif; margin: 0 auto 1rem; border: 1px solid rgba(142,245,210,0.3); }
.step-num.gold { background: rgba(212,175,55,0.1); color: #D4AF37; border-color: rgba(212,175,55,0.4); }
.step-card h3 { font-size: 1.05rem; color: #FFF; margin-bottom: 0.8rem; }
.step-card .gold-text { color: #D4AF37; }
.step-card p { font-size: 0.85rem; color: rgba(255,255,255,0.6); line-height: 1.4; margin: 0; }

@media (max-width: 1100px) {
  .steps-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .steps-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .steps-grid { grid-template-columns: 1fr; }
}
</style>
