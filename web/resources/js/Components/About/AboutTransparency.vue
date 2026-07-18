<template>
  <section class="about-section-dark">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag gold">Unsere Waren</span>
        <h2>Unsere Waren & unsere Transparenz</h2>
      </div>
      <div class="source-grid">
        <div class="source-item" v-for="s in sources" :key="s">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          <span>{{ s }}</span>
        </div>
      </div>
      <div class="honesty-box">
        <h3>Ehrlich bleiben bei Retouren und Rückläufern</h3>
        <p>Die Ware kommt von bekannten, geprüften und langjährigen Partnern. Sie wird größtenteils geprüft, sortiert und so zusammengestellt, dass sie für unsere Kunden sinnvoll nutzbar ist.</p>
        <p>Natürlich muss man bei Retouren und Rückläufern ehrlich bleiben:</p>
        <div class="honesty-list">
          <div class="honesty-item" v-for="h in honestyItems" :key="h">
            <span class="honesty-dot"></span>
            <span>{{ h }}</span>
          </div>
        </div>
      </div>
      <div class="transparency-statement">
        <p>Wir möchten nicht so tun, als wäre jede Box eine Luxusbox voller perfekter Markenware. Wir möchten ehrlich zeigen, wo der Mehrwert entsteht: durch <strong>Menge, Einkaufsvorteile, gute Sortierung, faire Paketpreise</strong> und direkte Weitergabe an unsere Kunden.</p>
        <p class="usage-note">Du kaufst deine Box als Privatkunde. Was du mit den Artikeln machst, bleibt dir überlassen: selbst nutzen, verschenken oder privat weiterverkaufen.</p>
      </div>

      <div class="selfq-box">
        <h3>Warum wir nicht einfach alles selbst verkaufen</h3>
        <p class="selfq-question">Wenn die Ware so gut ist, warum verkauft ihr sie nicht selbst einzeln teurer?</p>
        <p>Die Antwort ist einfach: Weil Einzelverkauf Zeit, Personal, Lagerung, Sortierung, Produktbilder, Onlineanzeigen, Kundenservice, Versandaufwand und Rückfragen bedeutet.</p>
        <p>Natürlich könnte man einzelne Artikel teurer verkaufen. Aber dann würde das ganze System langsamer, teurer und aufwendiger werden.</p>
        <div class="selfq-highlight">
          <p>Wir möchten Waren <strong>schnell und fair</strong> weitergeben. Unser Modell lebt vom Durchreichen.</p>
        </div>
        <div class="win-win">
          <div class="win-item">
            <span class="win-icon">🎁</span>
            <span>Du bekommst Ware mit echtem Mehrwert.</span>
          </div>
          <div class="win-item">
            <span class="win-icon">📊</span>
            <span>Wir erhalten planbaren Warenabsatz durch unsere Abos.</span>
          </div>
          <div class="win-item">
            <span class="win-icon">💪</span>
            <span>Gemeinsam können wir größere Mengen einkaufen und bessere Konditionen erreichen.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sources = [
  'Retouren', 'Rückläufer', 'Restposten', 'Insolvenzen',
  'Neuware', 'Überschüssige Lagerbestände', 'Sonderposten aus geprüften Quellen'
];
const honestyItems = [
  'Eine Verpackung kann beschädigt sein.',
  'Ein Artikel kann leichte Gebrauchsspuren haben.',
  'Ein Set kann in Einzelfällen nicht vollständig sein.',
  'Manche Ware ist einfacher, manche hochwertiger.',
  'Manche Produkte sind perfekt für den Eigengebrauch, andere eher für Flohmarkt oder Weiterverkauf.',
];
</script>

<style scoped>
.about-section-dark { padding: 5rem 2rem; background: linear-gradient(135deg, #1a0a36, #2D1B54); }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header h2 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 2.2rem; background: none; -webkit-text-fill-color: white;
}
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;
}
.section-tag.gold { background: rgba(212,175,55,0.2); }
.source-grid {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 3rem;
}
.source-item {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.05); padding: 0.6rem 1.2rem;
  border-radius: 50px; border: 1px solid rgba(212,175,55,0.2);
  color: rgba(255,255,255,0.85); font-size: 0.95rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.honesty-box {
  background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2.5rem;
  border: 1px solid rgba(255,255,255,0.08); margin-bottom: 3rem;
}
.honesty-box h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #D4AF37; font-size: 1.3rem; margin-bottom: 1.5rem;
}
.honesty-box > p {
  color: rgba(255,255,255,0.75); font-size: 1rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.honesty-list { display: flex; flex-direction: column; gap: 0.8rem; }
.honesty-item {
  display: flex; align-items: center; gap: 0.8rem;
  color: rgba(255,255,255,0.7); font-size: 0.95rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.honesty-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(212,175,55,0.6); flex-shrink: 0;
}
.transparency-statement {
  background: rgba(212,175,55,0.08); border-radius: 20px; padding: 2.5rem;
  border: 1px solid rgba(212,175,55,0.2); margin-bottom: 3rem; text-align: center;
}
.transparency-statement p {
  color: rgba(255,255,255,0.8); font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.transparency-statement strong { color: #D4AF37; }
.usage-note { font-style: italic; margin-bottom: 0 !important; }
.selfq-box {
  background: rgba(255,255,255,0.03); border-radius: 20px; padding: 3rem;
  border: 1px solid rgba(255,255,255,0.06);
}
.selfq-box h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 1.4rem; margin-bottom: 1.5rem;
}
.selfq-question {
  color: rgba(255,255,255,0.6); font-style: italic; font-size: 1.05rem;
  margin-bottom: 1.5rem !important; border-left: 3px solid rgba(212,175,55,0.4);
  padding-left: 1rem; font-family: 'Century Gothic', system-ui, sans-serif;
}
.selfq-box > p {
  color: rgba(255,255,255,0.75); font-size: 1rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.selfq-highlight {
  background: rgba(212,175,55,0.1); border-radius: 12px; padding: 1.2rem 1.5rem;
  margin: 1.5rem 0; border-left: 3px solid #D4AF37;
}
.selfq-highlight p {
  color: rgba(255,255,255,0.85); font-size: 1.05rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.selfq-highlight strong { color: #D4AF37; }
.win-win { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
.win-item {
  display: flex; align-items: center; gap: 1rem;
  background: rgba(255,255,255,0.04); padding: 1rem 1.5rem;
  border-radius: 12px; color: rgba(255,255,255,0.85); font-size: 0.95rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.win-icon { font-size: 1.5rem; }
@media (max-width: 768px) {
  .source-grid { flex-direction: column; align-items: center; }
}
</style>
