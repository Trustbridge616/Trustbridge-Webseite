<template>
  <section class="about-section-dark">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag gold">Unser Versprechen</span>
        <h2>Unser Versprechen an dich</h2>
      </div>
      <div class="promise-content">
        <p>Wir möchten keine einmaligen Kunden, die nach der ersten Box enttäuscht gehen. Wir möchten zufriedene Menschen, die sich jeden Monat auf ihre neue Box freuen.</p>
        <p>Denn unser Modell funktioniert nur langfristig, wenn du wiederkommst.</p>
      </div>
      <div class="promise-reasons">
        <div class="reason" v-for="r in reasons" :key="r">
          <span class="reason-dot"></span>
          <span>{{ r }}</span>
        </div>
      </div>
      <div class="promise-box">
        <h3>Deshalb ist unser Versprechen klar:</h3>
        <p class="promise-main">Wir möchten dir Ware liefern, die Freude macht, nutzbar ist und echten Mehrwert bietet.</p>
        <p>Nicht jede Box wird für jeden Menschen perfekt sein. Das ist bei gemischter Ware, Retouren und Restposten ganz normal. Aber jede Box soll fair zusammengestellt sein und dir die Möglichkeit geben, daraus etwas zu machen.</p>
        <div class="usage-options">
          <span class="usage" v-for="u in usages" :key="u">{{ u }}</span>
        </div>
      </div>
      <div class="vision-box">
        <p>Wir möchten in einer Welt, in der ständig Waren übrig bleiben, zurückgehen oder falsch verteilt werden, einen besseren Weg schaffen.</p>
        <div class="vision-items">
          <span>Weniger Verschwendung.</span>
          <span>Mehr Bewegung.</span>
          <span>Mehr Chancen.</span>
          <span>Mehr Nutzen für alle.</span>
        </div>
      </div>

      <!-- Final CTA / Kern der Botschaft -->
      <div class="core-message">
        <div class="core-icon">🌱</div>
        <h3>Der Kern unserer Botschaft</h3>
        <p class="core-main"><strong>Gute Ware soll nicht unnötig teuer, kompliziert oder unerreichbar sein.</strong></p>
        <p>Wir sparen Zwischenwege, bündeln Nachfrage und geben Einkaufsvorteile weiter. Du bekommst dadurch monatlich neue Ware direkt nach Hause — mit garantiert mindestens doppeltem ursprünglichem Warenwert zu deinem Paketpreis.</p>
        <div class="core-quote">
          <p><em>Wir gießen gemeinsam die Blumen, damit etwas wachsen kann.</em></p>
        </div>
        <div class="core-benefits">
          <span v-for="b in benefits" :key="b">{{ b }}</span>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <h2>Trustbridge</h2>
        <p class="cta-sub">Deine monatliche Warenbox zum Entdecken, Nutzen und Weiterverkaufen.</p>
        <div class="cta-buttons">
          <Link href="/prizes" class="cta-btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
            Pakete entdecken
          </Link>
          <Link href="/how-it-works" class="cta-btn-outline">Wie es funktioniert →</Link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

const reasons = [
  'Wenn du unzufrieden bist, findet kein Wachstum statt.',
  'Wenn du keinen Mehrwert siehst, bestellst du nicht weiter.',
  'Wenn die Ware schlecht ist, verliert das ganze System seinen Sinn.',
];
const usages = ['Selbst nutzen.', 'Verschenken.', 'Tauschen.', 'Oder privat weiterverkaufen.'];
const benefits = [
  'Du bekommst Zugang zu Ware.',
  'Wir bekommen planbaren Absatz.',
  'Die Community wächst.',
  'Der Einkauf wird stärker.',
  'Die Qualität kann steigen.',
  'Alle profitieren, die ehrlich mitmachen.',
];
</script>

<style scoped>
.about-section-dark { padding: 5rem 2rem; background: linear-gradient(135deg, #1a0a36, #2D1B54); }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 2rem; }
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
.promise-content {
  text-align: center; max-width: 800px; margin: 0 auto 2rem;
}
.promise-content p {
  color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.promise-reasons {
  display: flex; flex-direction: column; gap: 0.8rem;
  max-width: 600px; margin: 0 auto 3rem;
}
.reason {
  display: flex; align-items: center; gap: 0.8rem;
  color: rgba(255,255,255,0.7); font-size: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.reason-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: rgba(212,175,55,0.5); flex-shrink: 0;
}
.promise-box {
  background: rgba(212,175,55,0.08); border-radius: 20px; padding: 3rem;
  border: 1px solid rgba(212,175,55,0.2); margin-bottom: 3rem; text-align: center;
}
.promise-box h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #D4AF37; font-size: 1.3rem; margin-bottom: 1.5rem;
}
.promise-main {
  color: white !important; font-size: 1.15rem !important; font-weight: bold;
}
.promise-box p {
  color: rgba(255,255,255,0.75); font-size: 1rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.usage-options {
  display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;
}
.usage {
  background: rgba(255,255,255,0.05); padding: 0.5rem 1.2rem;
  border-radius: 50px; border: 1px solid rgba(212,175,55,0.2);
  color: #D4AF37; font-weight: bold; font-size: 0.95rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.vision-box {
  text-align: center; margin-bottom: 4rem;
}
.vision-box > p {
  color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.8; margin-bottom: 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.vision-items {
  display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;
}
.vision-items span {
  color: #D4AF37; font-weight: bold; font-size: 1.1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.core-message {
  background: linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.03));
  border-radius: 24px; padding: 3.5rem; border: 1px solid rgba(212,175,55,0.25);
  text-align: center; margin-bottom: 4rem;
}
.core-icon { font-size: 3rem; margin-bottom: 1rem; }
.core-message h3 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: white; font-size: 1.6rem; margin-bottom: 1.5rem;
}
.core-main {
  font-size: 1.2rem !important; margin-bottom: 1.5rem !important;
}
.core-main strong { color: #D4AF37; }
.core-message p {
  color: rgba(255,255,255,0.8); font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.core-quote {
  background: rgba(255,255,255,0.05); border-radius: 16px; padding: 1.5rem;
  margin: 2rem auto; max-width: 500px; border: 1px solid rgba(212,175,55,0.15);
}
.core-quote p {
  color: #D4AF37; font-size: 1.1rem; margin: 0;
}
.core-benefits {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8rem; margin-top: 2rem;
}
.core-benefits span {
  background: rgba(255,255,255,0.06); padding: 0.5rem 1.2rem;
  border-radius: 50px; border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.85); font-size: 0.9rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cta-section { text-align: center; padding-top: 2rem; }
.cta-section h2 {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 2.5rem; margin-bottom: 1rem;
  background: linear-gradient(to right, #D4AF37, #f7e08a, #D4AF37);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cta-sub {
  color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-bottom: 2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cta-buttons { display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; }
.cta-btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, #D4AF37, #c9a02e);
  color: #1a0a36; padding: 1rem 2.5rem; border-radius: 50px;
  font-weight: bold; font-size: 1.1rem; text-decoration: none;
  box-shadow: 0 10px 30px rgba(212,175,55,0.3);
  transition: all 0.3s ease;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 40px rgba(212,175,55,0.4); }
.cta-btn-outline {
  display: inline-flex; align-items: center; gap: 10px;
  background: transparent; color: white; padding: 1rem 2.5rem;
  border-radius: 50px; font-weight: bold; font-size: 1.1rem;
  text-decoration: none; border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cta-btn-outline:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.5); }
@media (max-width: 768px) {
  .vision-items { flex-direction: column; gap: 0.5rem; }
  .cta-section h2 { font-size: 1.8rem; }
}
</style>
