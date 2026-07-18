<template>
  <section class="about-section-dark">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag gold">Unser Team</span>
        <h2>Wer wir sind</h2>
      </div>
      <div class="team-grid">
        <div class="team-card">
          <div class="team-icon">🤝</div>
          <h3>Erfahrene Warenpartner</h3>
          <p>Hinter Trustbridge stehen Menschen, die Chancen erkennen, Verbindungen schaffen und bestehende Märkte neu denken möchten. Unser Partner ist seit vielen Jahren im Handel, Großhandel und Einkauf aktiv und verfügt über Erfahrung mit Restposten, Retouren, Insolvenzwaren, Palettenware und größeren Warenmengen.</p>
        </div>
        <div class="team-card">
          <div class="team-icon">💻</div>
          <h3>Digitales System</h3>
          <p>Dazu kommt unser digitales System: Webseite, Abo-Struktur, Community, Kundenzugang und die Idee, diese Waren nicht nur an einzelne Zwischenhändler weiterzugeben, sondern direkt dorthin zu bringen, wo sie gebraucht werden: zu den Menschen nach Hause.</p>
        </div>
        <div class="team-card highlight-card">
          <div class="team-icon">🧵</div>
          <h3>Die richtige Verbindung</h3>
          <p>Manchmal braucht es nur den richtigen Faden und die passende Stecknadel. Auf der einen Seite gibt es Waren, die bewegt werden müssen. Auf der anderen Seite gibt es Menschen, die gute Produkte zu fairen Preisen suchen — zum Selbstnutzen, Verschenken oder privaten Weiterverkaufen.</p>
          <div class="team-badge">Trustbridge bringt diese beiden Seiten zusammen.</div>
        </div>
      </div>
      <div class="pioneer-banner">
        <p>Wir sehen uns als <strong>innovative Pioniere</strong>, die vorhandene Strukturen nicht einfach hinnehmen, sondern verbessern möchten. Nicht komplizierter. Nicht teurer. Sondern <strong>direkter, fairer und mit mehr Mehrwert</strong> für alle Beteiligten.</p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
.about-section-dark {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #1a0a36, #2D1B54);
}
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header h2 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 2.2rem; margin-bottom: 0.75rem;
  background: none; -webkit-text-fill-color: white;
}
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;
}
.section-tag.gold { background: rgba(212,175,55,0.2); }
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
.team-card {
  background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2.5rem 2rem;
  border: 1px solid rgba(212,175,55,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.team-card:hover { transform: translateY(-6px); box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
.highlight-card { border-color: rgba(212,175,55,0.4); background: rgba(212,175,55,0.08); }
.team-icon { font-size: 2rem; margin-bottom: 1rem; }
.team-card h3 {
  color: #D4AF37; font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 1.2rem; margin-bottom: 1rem;
}
.team-card p {
  color: rgba(255,255,255,0.75); font-size: 0.95rem; line-height: 1.8;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.team-badge {
  margin-top: 1.5rem; padding: 0.8rem 1.2rem; background: rgba(212,175,55,0.15);
  border-radius: 12px; color: #D4AF37; font-weight: bold;
  font-family: 'Century Gothic', system-ui, sans-serif; font-size: 0.95rem;
  border-left: 3px solid #D4AF37;
}
.pioneer-banner {
  background: rgba(255,255,255,0.05); border-radius: 20px; padding: 2.5rem;
  text-align: center; border: 1px solid rgba(212,175,55,0.2);
}
.pioneer-banner p {
  color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.8; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.pioneer-banner strong { color: #D4AF37; }
@media (max-width: 900px) { .team-grid { grid-template-columns: 1fr; } }
</style>
