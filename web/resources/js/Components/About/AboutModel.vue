<template>
  <section class="about-section-dark">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag gold">Das Modell</span>
        <h2>Wie unser Modell funktioniert</h2>
        <p class="section-sub">Unser Modell funktioniert bewusst einfach. Du wählst dein monatliches Paket und entscheidest, welche Richtung besser zu dir passt:</p>
      </div>
      <div class="direction-grid">
        <div class="direction-card" v-for="d in directions" :key="d.title">
          <div class="dir-icon">{{ d.icon }}</div>
          <h3>{{ d.title }}</h3>
          <p>{{ d.text }}</p>
        </div>
      </div>
      <div class="advantages-box">
        <h3>Je mehr Menschen mitmachen, desto stärker wird unser Einkauf.</h3>
        <div class="adv-grid">
          <div class="adv-item" v-for="a in advantages" :key="a">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{{ a }}</span>
          </div>
        </div>
      </div>
      <div class="guarantee-banner">
        <div class="guarantee-icon">🏆</div>
        <p>Unsere Boxen enthalten <strong>garantiert mindestens den doppelten ursprünglichen Warenwert</strong> im Verhältnis zu deinem Paketpreis. Je nach Produktkategorie kann der Vorteil unterschiedlich ausfallen.</p>
      </div>
      <div class="transparency-note">
        <p>Premiumware wie Markenschuhe, Markenartikel oder besonders gefragte Produkte ist im Einkauf oft auch für uns teurer, lässt sich dafür aber meist leichter nutzen oder weiterverkaufen.</p>
        <p>Günstigere Grundprodukte oder Mysteryboxen können dafür mehr Menge bieten, sind aber manchmal schwerer einzeln zu verkaufen oder benötigen mehr Zeit beim Sortieren, Prüfen und Einstellen.</p>
        <p>Genau deshalb setzen wir auf Transparenz: Nicht jede Box ist gleich. Nicht jede Kategorie ist gleich. Und nicht jede Ware hat denselben Markt.</p>
        <div class="no-scrap">
          <strong>Aber unser oberstes Gebot bleibt: Keine Schrottboxen.</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const directions = [
  { icon: '🛒', title: 'Online-Verkauf', text: 'Für kleinere, gut versendbare Artikel, zum Beispiel für Vinted, Kleinanzeigen, eBay oder Facebook Marketplace.' },
  { icon: '🏪', title: 'Flohmarkt & Trödel', text: 'Für größere, gemischte oder sichtbare Ware, die sich gut lokal, auf Märkten oder im direkten Verkauf anbieten lässt.' },
  { icon: '🎲', title: 'Gemischt', text: 'Für alle, die sich überraschen lassen möchten und eine Mischung aus verschiedenen Warenarten bevorzugen.' },
];

const advantages = [
  'Wir können durch größere Mengen bessere Konditionen erhalten.',
  'Wir können Waren schneller bewegen.',
  'Wir können den Aufwand pro Artikel gering halten.',
  'Wir können dir Ware anbieten, die deutlich unter dem ursprünglichen Warenwert liegt.',
];
</script>

<style scoped>
.about-section-dark { padding: 5rem 2rem; background: linear-gradient(135deg, #1a0a36, #2D1B54); }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header h2 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 2.2rem; margin-bottom: 0.75rem;
  background: none; -webkit-text-fill-color: white;
}
.section-sub {
  color: rgba(255,255,255,0.7); font-size: 1.05rem; max-width: 700px;
  margin: 0 auto; font-family: 'Century Gothic', system-ui, sans-serif;
}
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;
}
.section-tag.gold { background: rgba(212,175,55,0.2); }
.direction-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
.direction-card {
  background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2.5rem 2rem;
  border: 1px solid rgba(212,175,55,0.15); text-align: center;
  transition: transform 0.3s ease;
}
.direction-card:hover { transform: translateY(-6px); }
.dir-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.direction-card h3 {
  color: #D4AF37; font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1.2rem; margin-bottom: 1rem;
}
.direction-card p {
  color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.7; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.advantages-box {
  background: rgba(212,175,55,0.08); border-radius: 20px; padding: 3rem;
  border: 1px solid rgba(212,175,55,0.25); margin-bottom: 3rem;
}
.advantages-box h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 1.3rem; margin-bottom: 2rem; text-align: center;
}
.adv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.adv-item {
  display: flex; align-items: center; gap: 0.8rem;
  color: rgba(255,255,255,0.85); font-size: 0.95rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.guarantee-banner {
  display: flex; align-items: center; gap: 2rem;
  background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05));
  border-radius: 20px; padding: 2.5rem; margin-bottom: 3rem;
  border: 1px solid rgba(212,175,55,0.3);
}
.guarantee-icon { font-size: 3rem; flex-shrink: 0; }
.guarantee-banner p {
  color: rgba(255,255,255,0.85); font-size: 1.05rem; line-height: 1.8; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.guarantee-banner strong { color: #D4AF37; }
.transparency-note {
  background: rgba(255,255,255,0.03); border-radius: 20px; padding: 2.5rem;
  border: 1px solid rgba(255,255,255,0.08);
}
.transparency-note p {
  color: rgba(255,255,255,0.7); font-size: 1rem; line-height: 1.8;
  margin-bottom: 1rem; font-family: 'Century Gothic', system-ui, sans-serif;
}
.no-scrap {
  margin-top: 1.5rem; padding: 1rem 1.5rem;
  background: rgba(212,175,55,0.12); border-radius: 12px;
  border-left: 3px solid #D4AF37; text-align: center;
}
.no-scrap strong {
  color: #D4AF37; font-size: 1.15rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
@media (max-width: 900px) {
  .direction-grid { grid-template-columns: 1fr; }
  .adv-grid { grid-template-columns: 1fr; }
  .guarantee-banner { flex-direction: column; text-align: center; }
}
</style>
