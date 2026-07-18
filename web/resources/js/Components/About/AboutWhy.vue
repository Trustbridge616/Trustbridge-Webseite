<template>
  <section class="about-section">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag">Unsere Mission</span>
        <h2>Warum es Trustbridge gibt</h2>
      </div>
      <div class="why-content">
        <p>Viele Menschen möchten sich etwas dazuverdienen, ihre Haushaltskasse entlasten oder einfach günstiger an gute Ware kommen.</p>
        <p>Hausfrauen, Studenten, Arbeitslose, Familien, Schnäppchenjäger, Flohmarkt-Fans oder Menschen, die gerne über Vinted, Kleinanzeigen, Facebook Marketplace oder auf dem Trödel verkaufen — sie alle haben oft dasselbe Problem:</p>
      </div>
      <div class="problem-highlight">
        <h3>Gute Ware günstig einzukaufen ist schwer.</h3>
      </div>
      <div class="problem-grid">
        <div class="problem-card" v-for="p in problems" :key="p.icon">
          <span class="problem-icon">{{ p.icon }}</span>
          <p>{{ p.text }}</p>
        </div>
      </div>
      <div class="solution-box">
        <h3>Genau hier setzt Trustbridge an.</h3>
        <p>Wir kaufen größere Warenmengen ein und stellen daraus monatliche Boxen zusammen. So bekommst du Zugang zu Waren, ohne selbst Paletten kaufen, transportieren, sortieren oder lagern zu müssen.</p>
        <div class="solution-highlight">
          <strong>Wir teilen den Vorteil des Großeinkaufs mit dir.</strong>
        </div>
        <p>Denn natürlich könnten viele Artikel einzeln verkauft werden. Das würde aber Mitarbeiter, Zeit, Lagerfläche, Aufwand, Onlineanzeigen, Kundenkontakt und Einzelversand bedeuten. Genau diese Arbeit sparen wir uns bewusst — und geben den Vorteil über unsere Boxen weiter.</p>
      </div>
      <div class="simple-model">
        <div class="model-item">
          <div class="model-icon">📦</div>
          <p>Wir sorgen für Einkauf, Sortierung und Versand.</p>
        </div>
        <div class="model-arrow">→</div>
        <div class="model-item">
          <div class="model-icon">🎁</div>
          <p>Du bekommst Ware mit echtem Mehrwert.</p>
        </div>
      </div>
      <p class="tagline">Vom Lager direkt zum Endverbraucher.</p>
    </div>
  </section>
</template>

<script setup>
const problems = [
  { icon: '💸', text: 'Einzelne Produkte sind oft zu teuer.' },
  { icon: '📦', text: 'Ganze Paletten sind zu groß, zu riskant oder zu unübersichtlich.' },
  { icon: '🔒', text: 'Viele Restpostenangebote sind für normale Privatkunden gar nicht zugänglich.' },
];
</script>

<style scoped>
.about-section { padding: 5rem 2rem; background: #f8f6ff; }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 2rem; }
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;
}
.section-header h2 {
  font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54;
  font-size: 2.2rem; background: none; -webkit-text-fill-color: #2D1B54;
}
.why-content {
  max-width: 900px; margin: 0 auto 2rem; text-align: center;
}
.why-content p {
  color: #4a3870; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.problem-highlight {
  text-align: center; margin-bottom: 2.5rem;
}
.problem-highlight h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #2D1B54; font-size: 1.6rem;
  background: linear-gradient(135deg, #2D1B54, #D4AF37);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
.problem-card {
  background: white; border-radius: 16px; padding: 2rem; text-align: center;
  box-shadow: 0 8px 30px rgba(45,27,84,0.07);
  border: 1px solid rgba(212,175,55,0.12);
  transition: transform 0.3s ease;
}
.problem-card:hover { transform: translateY(-6px); }
.problem-icon { font-size: 2rem; display: block; margin-bottom: 1rem; }
.problem-card p {
  color: #4a3870; font-size: 1rem; line-height: 1.6; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.solution-box {
  background: white; border-radius: 20px; padding: 3rem;
  border: 1px solid rgba(212,175,55,0.2);
  box-shadow: 0 10px 40px rgba(45,27,84,0.08); margin-bottom: 3rem;
}
.solution-box h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #2D1B54; font-size: 1.4rem; margin-bottom: 1.5rem;
}
.solution-box p {
  color: #4a3870; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.solution-highlight {
  background: rgba(212,175,55,0.1); padding: 1rem 1.5rem;
  border-radius: 12px; border-left: 3px solid #D4AF37;
  margin: 1.5rem 0;
}
.solution-highlight strong {
  color: #2D1B54; font-size: 1.1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.simple-model {
  display: flex; align-items: center; justify-content: center; gap: 2rem;
  margin-bottom: 2rem;
}
.model-item {
  background: white; border-radius: 16px; padding: 2rem 2.5rem;
  text-align: center; border: 1px solid rgba(212,175,55,0.15);
  box-shadow: 0 8px 25px rgba(45,27,84,0.06);
  flex: 1; max-width: 350px;
}
.model-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
.model-item p {
  color: #2D1B54; font-weight: 600; font-size: 1rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.model-arrow {
  font-size: 2rem; color: #D4AF37; font-weight: bold;
}
.tagline {
  text-align: center; font-family: 'Century Gothic', system-ui, sans-serif;
  color: #D4AF37; font-size: 1.2rem; font-weight: bold;
}
@media (max-width: 900px) {
  .problem-grid { grid-template-columns: 1fr; }
  .simple-model { flex-direction: column; }
  .model-arrow { transform: rotate(90deg); }
}
</style>
