<template>
  <section class="about-section">
    <div class="about-container">
      <div class="intro-grid">
        <div class="intro-text">
          <span class="section-tag">Unsere Idee</span>
          <h2>Trustbridge ist entstanden aus einer einfachen Idee</h2>
          <p class="highlight-text">Warum sollen gute Waren erst durch viele Zwischenhändler gehen, teurer werden und am Ende beim Endkunden wieder viel zu teuer landen?</p>
          <p>Wir möchten Waren direkter mit den Menschen zusammenführen. Ohne unnötige Wege. Ohne künstlich aufgeblasene Preise. Ohne kompliziertes System.</p>
          <p>Unsere Boxen enthalten je nach Verfügbarkeit Neuware, Retouren, Rückläufer, Restposten, Insolvenzwaren oder überschüssige Lagerbestände. Viele dieser Waren sind bereits vorhanden, liegen in Lagern, kommen aus großen Einkaufsstrukturen oder wurden von Unternehmen in Mengen eingekauft.</p>
        </div>
        <div class="intro-card">
          <div class="card-inner">
            <div class="card-icon">🎯</div>
            <h3>Unser Ziel</h3>
            <p>Aus vorhandener Ware wieder echten Mehrwert schaffen.</p>
            <div class="card-list">
              <div class="card-item"><span class="gold-dot"></span>Für dich.</div>
              <div class="card-item"><span class="gold-dot"></span>Für unsere Community.</div>
              <div class="card-item"><span class="gold-dot"></span>Für ein faires System.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.about-section { padding: 5rem 2rem; background: #f8f6ff; }
.about-container { max-width: 1340px; margin: 0 auto; }
.intro-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; }
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem;
}
.intro-text h2 {
  font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54;
  font-size: 2rem; margin-bottom: 1.5rem; line-height: 1.3;
  background: none; -webkit-text-fill-color: #2D1B54;
}
.intro-text p {
  color: #4a3870; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.highlight-text {
  font-style: italic; color: #6b5b95 !important;
  border-left: 3px solid #D4AF37; padding-left: 1.2rem;
  font-size: 1.1rem !important;
}
.intro-card {
  background: linear-gradient(135deg, #2D1B54, #4a238a);
  border-radius: 24px; padding: 3px;
  box-shadow: 0 20px 60px rgba(45,27,84,0.3);
}
.card-inner {
  background: linear-gradient(135deg, #2D1B54, #3a2268);
  border-radius: 22px; padding: 2.5rem;
  border: 1px solid rgba(212,175,55,0.2);
}
.card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.card-inner h3 {
  color: white; font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1.5rem; margin-bottom: 1rem;
}
.card-inner > p { color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 1.5rem; font-family: 'Century Gothic', system-ui, sans-serif; }
.card-list { display: flex; flex-direction: column; gap: 0.8rem; }
.card-item {
  display: flex; align-items: center; gap: 0.8rem;
  color: #D4AF37; font-weight: bold; font-size: 1.05rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.gold-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #D4AF37; flex-shrink: 0;
}
@media (max-width: 900px) {
  .intro-grid { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
