<template>
  <section class="about-section">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag">Warenkategorien</span>
        <h2>Unsere Warenkategorien</h2>
        <p class="section-sub">Damit du besser entscheiden kannst, welche Box zu dir passt, bieten wir verschiedene Warenkategorien an.</p>
      </div>
      <div class="cat-grid">
        <!-- Premium -->
        <div class="cat-card cat-premium">
          <div class="cat-badge">👑 Premium</div>
          <h3>Premiumware</h3>
          <p class="cat-desc">Für Kunden, die mehr Wert auf Qualität, bessere Einschätzbarkeit und leichter verkaufbare Artikel legen.</p>
          <div class="cat-features">
            <div class="cat-feat" v-for="f in premiumFeatures" :key="f">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ f }}</span>
            </div>
          </div>
          <p class="cat-note">Premiumware kostet im Einkauf auch für uns mehr. Dafür ist sie meist einfacher einzuschätzen, leichter zu nutzen und oft schneller weiterzugeben.</p>
          <p class="cat-ideal"><strong>Ideal für:</strong> Menschen, die weniger sortieren möchten und mehr Wert auf Qualität statt reine Menge legen.</p>
          <Link href="/prizes" class="cat-link">Premiumware-Pakete ansehen →</Link>
        </div>
        <!-- Mystery -->
        <div class="cat-card cat-mystery">
          <div class="cat-badge">🎲 Mystery</div>
          <h3>Mysteryboxen & Retourenboxen</h3>
          <p class="cat-desc">Günstiger und spannender, bringen aber auch mehr Überraschung mit sich.</p>
          <div class="cat-features">
            <div class="cat-feat" v-for="f in mysteryFeatures" :key="f">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{{ f }}</span>
            </div>
          </div>
          <p class="cat-note">Diese Boxen sind oft erheblich günstiger und können viel Potenzial bieten. Gleichzeitig können sie aber auch mehr Arbeit bedeuten.</p>
          <p class="cat-ideal"><strong>Ideal für:</strong> Alle, die Spaß am Suchen, Sortieren, Entdecken und Weitergeben haben.</p>
          <Link href="/prizes" class="cat-link mystery-link">Mysterybox-Pakete ansehen →</Link>
        </div>
      </div>

      <div class="difference-box">
        <h3>Der Unterschied ist wichtig</h3>
        <div class="diff-grid">
          <div class="diff-item">
            <strong>Premiumware</strong>
            <p>Mehr Fokus auf Qualität, Marken, bestätigte Ware und bessere Einschätzbarkeit.</p>
          </div>
          <div class="diff-vs">VS</div>
          <div class="diff-item">
            <strong>Mysterybox</strong>
            <p>Mehr Überraschung, oft günstigerer Einstieg, mehr Menge und mehr Eigenaufwand.</p>
          </div>
        </div>
        <p class="diff-note">Beides kann sich lohnen — es hängt davon ab, welcher Typ du bist.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

const premiumFeatures = [
  'Geprüfte Ware', 'Bestätigter Warenwert', 'Höherwertige Produkte',
  'Markenartikel', 'Gefragte Einzelstücke', 'Bessere Verkaufbarkeit', 'Weniger Überraschungsrisiko'
];
const mysteryFeatures = [
  'No-Name-Produkte', 'Einfache Alltagsware', 'Gemischte Retouren',
  'Haushalts- & Deko-Artikel', 'Gartenartikel', 'Überraschungsartikel',
  'Ware mit beschädigter Verpackung', 'Artikel mit mehr Sortieraufwand'
];
</script>

<style scoped>
.about-section { padding: 5rem 2rem; background: #f8f6ff; }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 3rem; }
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
.section-sub {
  color: #6b5b95; font-size: 1.05rem; max-width: 700px; margin: 0.5rem auto 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 3rem; }
.cat-card {
  background: white; border-radius: 24px; padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(45,27,84,0.08);
  border: 2px solid transparent; transition: transform 0.3s ease;
}
.cat-card:hover { transform: translateY(-6px); }
.cat-premium { border-color: rgba(212,175,55,0.3); }
.cat-mystery { border-color: rgba(167,139,250,0.3); }
.cat-badge {
  display: inline-block; padding: 0.3rem 1rem; border-radius: 50px;
  font-size: 0.82rem; font-weight: bold; margin-bottom: 1rem;
}
.cat-premium .cat-badge { background: rgba(212,175,55,0.12); color: #D4AF37; }
.cat-mystery .cat-badge { background: rgba(167,139,250,0.12); color: #7c3aed; }
.cat-card h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #2D1B54; font-size: 1.4rem; margin-bottom: 1rem;
}
.cat-desc {
  color: #4a3870; font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-features { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.5rem; }
.cat-feat {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: #f8f6ff; padding: 0.4rem 0.8rem; border-radius: 8px;
  font-size: 0.85rem; color: #4a3870;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-note {
  color: #6b5b95; font-size: 0.92rem; line-height: 1.7; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-ideal {
  color: #4a3870; font-size: 0.95rem; margin-bottom: 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-ideal strong { color: #2D1B54; }
.cat-link {
  display: inline-block; color: #D4AF37; font-weight: bold;
  text-decoration: none; border-bottom: 2px solid rgba(212,175,55,0.4);
  padding-bottom: 2px; transition: all 0.2s ease;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cat-link:hover { border-color: #D4AF37; }
.mystery-link { color: #7c3aed; border-color: rgba(124,58,237,0.3); }
.mystery-link:hover { border-color: #7c3aed; }
.difference-box {
  background: white; border-radius: 20px; padding: 3rem;
  border: 1px solid rgba(212,175,55,0.15);
  box-shadow: 0 8px 30px rgba(45,27,84,0.06);
}
.difference-box h3 {
  text-align: center; font-family: 'Century Gothic', system-ui, sans-serif;
  color: #2D1B54; font-size: 1.4rem; margin-bottom: 2rem;
}
.diff-grid { display: flex; align-items: center; gap: 2rem; justify-content: center; margin-bottom: 1.5rem; }
.diff-item {
  flex: 1; max-width: 400px; text-align: center;
  padding: 1.5rem; background: #f8f6ff; border-radius: 16px;
}
.diff-item strong {
  color: #2D1B54; font-size: 1.1rem; display: block; margin-bottom: 0.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.diff-item p {
  color: #6b5b95; font-size: 0.95rem; line-height: 1.6; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.diff-vs {
  font-size: 1.5rem; font-weight: 900; color: #D4AF37;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.diff-note {
  text-align: center; color: #4a3870; font-size: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
@media (max-width: 900px) {
  .cat-grid { grid-template-columns: 1fr; }
  .diff-grid { flex-direction: column; }
  .diff-vs { transform: rotate(90deg); }
}
</style>
