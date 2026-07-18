<template>
  <AppLayout>
    <SeoHead
      title="Häufige Fragen (FAQ) – Trustbridge"
      description="Alles rund um Trustbridge, Pakete, Abo und Bestellung."
      keywords="Trustbridge FAQ, Häufige Fragen, Abo"
      canonical="https://trustbridge.de/faq"
    />

    <!-- GLOBAL BG -->
    <div class="page-base-bg"></div>
    <div class="water-bg" aria-hidden="true">
      <div class="water-layer water-img"></div>
      <div class="water-overlay"></div>
    </div>
    
    <img src="/panther-mitte-nobg.png" class="guide-panther" alt="TrustBox Panther" aria-hidden="true" />

    <!-- HERO -->
    <div class="page-hero">
      <div class="hero-glow g1"></div>
      <div class="hero-glow g2"></div>
      <div class="hero-inner">
        <span class="hero-tag">WISSEN & VERTRAUEN</span>
        <h1>Häufige Fragen</h1>
        <p class="hero-sub">Alles rund um TrustBox, Warenwert, Legacy-Abo, Punkte, Vorabzugang und Bestellung.</p>
      </div>
    </div>

    <!-- FAQ SECTION -->
    <div class="faq-section">
      <div class="faq-wrap">
        <div class="faq-header">
          <h2 class="faq-title">Häufige Fragen zu TrustBox & Legacy-Abo</h2>
        </div>
        
        <div class="faq-grid">
          <div class="faq-col">
            <div class="faq-item" v-for="(faq, i) in faqs.slice(0, 9)" :key="i" :class="{ open: openFaq === i }">
              <button class="faq-q" @click="toggleFaq(i)">
                <span>{{ faq.q }}</span>
                <svg class="faq-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-a-wrap"><div class="faq-a"><p v-html="faq.a"></p></div></div>
            </div>
          </div>
          <div class="faq-col">
            <div class="faq-item" v-for="(faq, i) in faqs.slice(9)" :key="i+9" :class="{ open: openFaq === (i+9) }">
              <button class="faq-q" @click="toggleFaq(i+9)">
                <span>{{ faq.q }}</span>
                <svg class="faq-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div class="faq-a-wrap"><div class="faq-a"><p v-html="faq.a"></p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';

const openFaq = ref(null);
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i; };

const faqs = [
  { q: '1. Was ist eine TrustBox?', a: 'Eine TrustBox ist eine Warenbox, bei der du – egal welches Level du wählst – einen echten Einkaufsvorteil erhältst.<br><br>Kaufst du zum Beispiel eine Box für 111 €, ist unser Ziel, dir Ware mit deutlich höherem kalkulierten Warenwert zusammenzustellen. Wir achten durch geschickten Einkauf, große Mengen und starke Einkaufskonditionen darauf, einen enormen Vorteil zu erzeugen.<br><br>Diesen Einkaufsvorteil geben wir über die TrustBoxen an dich weiter.' },
  { q: '2. Warum bekomme ich diesen Einkaufsvorteil?', a: 'Den Einkaufsvorteil bekommst du, weil wir gebündelt einkaufen.<br><br>Das heißt: Wir beziehen größere Warenmengen, Sonderposten, Restposten, Retouren oder andere günstige Posten und teilen diesen Vorteil auf kleinere Boxen auf.<br><br>So entsteht ein echtes Win-Win-System:<br>Wir verdienen unter dem Strich gut, können Verpackung, Logistik und Arbeitsplätze aufbauen – und du bekommst Ware zu einem starken Preis.<br><br>Es geht um miteinander wachsen statt immer nur gegeneinander kämpfen.' },
  { q: '3. Ist der Inhalt jeder Box gleich?', a: 'Nein. Jede TrustBox ist anders.<br><br>Die Produktart ist nicht fest garantiert, weil unsere Ware aus wechselnden Quellen stammen kann: Insolvenzen, Restposten, Retouren, Sonderposten, Neuware, Ladenhüter oder andere günstige Einkaufsmöglichkeiten.<br><br>Genau dadurch entsteht der Preisvorteil.<br><br>Der Inhalt kann also wechseln – der Anspruch bleibt gleich:<br>Keine Schrottbox, sondern Ware mit echtem Einkaufsvorteil.' },
  { q: '4. Was bedeutet „keine Schrottboxen“?', a: '„Keine Schrottboxen“ bedeutet: Wir kaufen nicht irgendeinen Müll ein, nur damit eine Box voll oder schwer aussieht.<br><br>Wir kaufen Ware ein, bei der echter Spielraum entsteht.<br><br>Trustbridge funktioniert nur, wenn deine Box für dich Sinn macht.<br><br>Wir gewinnen nur, wenn du auch gewinnst. Vergiss das nie.' },
  { q: '5. Was ist der Unterschied zwischen den Leveln?', a: 'Die Level unterscheiden sich in der Regel nicht durch bessere oder schlechtere Produkte.<br><br>Der Unterschied liegt vor allem im Umfang, im Mix-Spielraum und – wenn du im Legacy-Abo bist – im höheren Punktefaktor.<br><br>Wir geben immer etwas zurück, je stärker das System unterstützt wird.' },
  { q: '6. Was bringen mir Legacy-Punkte?', a: 'Legacy-Punkte sind Vorteilspunkte für Legacy-Abo-Kunden.<br><br>Mit ihnen sollen später zusätzliche Vorteile freigeschaltet werden können, zum Beispiel:<br><br>• Rabatte<br>• Schnäppchen-Deals<br>• Sonderaktionen<br>• ausgewählte Paletten-Angebote<br>• frühere Zugänge zu besonderen Warenaktionen<br>• exklusive Angebote für treue Kunden<br><br>Die konkreten Einlösemöglichkeiten richten sich nach Warenbestand, Verfügbarkeit und laufenden Aktionen.' },
  { q: '7. Was ist der Unterschied zwischen Einmalkauf und Legacy-Abo?', a: 'Beim Einmalkauf erhältst du deine TrustBox einmalig ohne monatliche Bindung.<br><br>Im Legacy-Abo erhältst du regelmäßig deine TrustBox, sammelst Legacy-Punkte mit Level-Multiplikator und bekommst bis zu 48 Stunden früher Zugriff auf ausgewählte Deals.<br><br>Diese Angebote erhalten Legacy-Abo-Kunden vor allen anderen.' },
  { q: '8. Was sind Legacy-Punkte?', a: 'Legacy-Punkte sind Vorteilspunkte für Abo-Kunden.<br><br>Je höher dein gewähltes Level im Legacy-Abo, desto stärker ist dein Punkte-Faktor:<br><br>Level 1 = Faktor 1<br>Level 2 = Faktor 2<br>Level 3 = Faktor 3<br>Level 4 = Faktor 4<br>Level 5 = Faktor 5<br><br>Je höher dein Level, desto stärker unterstützt du das System – und desto stärker soll dein Vorteil im Legacy-System ausfallen.' },
  { q: '9. Was bedeutet 48h Vorabzugang?', a: 'Wenn besondere Deals verfügbar sind, können Legacy-Abo-Kunden bis zu 48 Stunden früher informiert werden.<br><br>Unsere Warenposten sind nicht endlos verfügbar. Wenn weg, dann weg.<br><br>Der Vorabzugang gibt dir die Chance, früher zu reagieren und dir besondere Angebote zu sichern.' },
  { q: '10. Gibt es immer Paletten-Deals?', a: 'Nein. Paletten-Deals, Sonderposten und Schnäppchen-Angebote richten sich nach Warenbestand, Verfügbarkeit und laufenden Aktionen.<br><br>Es geht nicht darum, künstlich irgendetwas zu versprechen.<br>Es geht darum, echte Vorteile weiterzugeben, wenn starke Ware verfügbar ist.' },
  { q: '11. Kann ich die Ware weiterverkaufen?', a: 'Ja. Du kannst die Ware behalten, nutzen, verschenken oder privat weitergeben.<br><br>Viele Artikel können auf Plattformen wie Kleinanzeigen, Vinted oder ähnlichen Marktplätzen angeboten werden.<br><br>Unser Anspruch ist klar:<br>Ware mit echtem Mehrwert statt Zufallsbox.' },
  { q: '12. Ist die Ware neu?', a: 'Die Ware kann aus Neuware, Retouren, Restposten, Sonderposten, Ladenhütern oder Insolvenzwaren stammen.<br><br>Entscheidend ist für uns:<br>Die Ware muss Sinn machen und echten Einkaufsvorteil bringen.' },
  { q: '13. Kann ich mir eine Kategorie aussuchen?', a: 'Zum Start sind die TrustBoxen bewusst flexibel aufgebaut, damit wir den besten Einkaufsvorteil aus dem vorhandenen Warenbestand ziehen können.<br><br>Der wichtigste Punkt ist, dass die Box am Ende Sinn macht.' },
  { q: '14. Wann wird meine TrustBox verschickt?', a: 'Nach deiner Bestellung wird deine TrustBox zusammengestellt und für den Versand vorbereitet.<br><br>Du bekommst nach Versand eine Info mit den relevanten Versanddetails.' },
  { q: '15. Was passiert, wenn wirklich etwas nicht passt?', a: 'Wenn es ein echtes Problem mit deiner Box gibt, melde dich bei uns.<br><br>Wir wollen kein System bauen, bei dem du am Ende alleine dastehst.<br><br>Denn auch hier gilt:<br>Wir gewinnen nur, wenn du auch gewinnst.' },
  { q: '16. Kann ich mein Abo kündigen?', a: 'Das Legacy-Abo soll transparent und monatlich kündbar sein.<br><br>Alle Details zur Laufzeit, Kündigung und Abrechnung werden im Bestellprozess klar angezeigt.' },
  { q: '17. Warum sollte ich bei Trustbridge bestellen?', a: 'Weil wir nicht versuchen, dir irgendeine Zufallsbox zu verkaufen.<br><br>Wir kaufen gebündelt ein, nutzen starke Einkaufskonditionen und geben diesen Vorteil weiter.<br><br>Trustbridge ist kein Gegeneinander.<br>Es ist ein System, das größer wird, wenn beide Seiten gewinnen.' }
];
</script>

<style scoped>
* { box-sizing: border-box; }
body { font-family: 'Century Gothic', system-ui, sans-serif; }

/* ══════════════════════════════════════
   GLOBAL BACKGROUNDS
   ══════════════════════════════════════ */
.page-base-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: #0c031a; z-index: -1;
}

.water-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.water-layer.water-img {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('/flowing_water_bg.png');
  background-size: 1500px; background-repeat: repeat;
  opacity: 0.08; mix-blend-mode: screen;
  animation: waterFlowReal 80s linear infinite; filter: contrast(1) brightness(0.8);
}
.water-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at top center, rgba(124,58,237,0.05) 0%, rgba(12,3,26,0.9) 100%);
}
@keyframes waterFlowReal {
  0% { background-position: 0 0; }
  100% { background-position: 1500px 1500px; }
}

.guide-panther {
  position: fixed; right: -5%; top: 15%; height: 900px;
  opacity: 0.03; pointer-events: none; z-index: 0;
  mix-blend-mode: screen; filter: drop-shadow(0 0 40px rgba(124,58,237,0.5));
  animation: pantherBreath 10s ease-in-out infinite;
}
@keyframes pantherBreath {
  0%, 100% { transform: translateY(0); opacity: 0.03; }
  50% { transform: translateY(-20px); opacity: 0.06; }
}

/* ══════════════════════════════════════
   HERO
   ══════════════════════════════════════ */
.page-hero {
  position: relative;
  background: transparent;
  padding: 10rem 2rem 3rem;
  text-align: center;
  overflow: hidden;
  font-family: 'Century Gothic', system-ui, sans-serif;
  z-index: 1;
}
.hero-glow {
  position: absolute; border-radius: 50%; filter: blur(140px); pointer-events: none;
  animation: heroFloat 8s ease-in-out infinite; z-index: 0;
}
.g1 { top: -30%; left: 10%; width: 600px; height: 600px; background: rgba(124,58,237,0.3); opacity: 0.5; }
.g2 { bottom: -25%; right: 5%; width: 500px; height: 500px; background: rgba(212,175,55,0.15); opacity: 0.4; animation-delay: -4s; }
@keyframes heroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.06); }
}
.hero-inner { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
.hero-tag {
  display: inline-block; font-size: 0.8rem; font-weight: 700;
  letter-spacing: 4px; color: #D4AF37; margin-bottom: 1.25rem;
  text-shadow: 0 0 25px rgba(212,175,55,0.6);
}
.page-hero h1 {
  color: #fff; font-size: 3.8rem; font-weight: 800;
  margin: 0 0 1rem; font-family: 'Century Gothic', system-ui, sans-serif;
  line-height: 1.1;
  text-shadow: 0 0 50px rgba(124,58,237,0.25);
}
.hero-sub {
  color: rgba(255,255,255,0.5); font-size: 1.2rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
  letter-spacing: 0.5px;
}

/* ══════════════════════════════════════
   FAQ SECTION
   ══════════════════════════════════════ */
.faq-section { background: transparent; padding: 5rem 2rem 8rem; font-family: 'Century Gothic', system-ui, sans-serif; position: relative; z-index: 2; }
.faq-wrap { max-width: 1140px; margin: 0 auto; }
.faq-header { text-align: center; margin-bottom: 4rem; }
.faq-title { color: #fff; font-size: 2.5rem; font-weight: 700; margin: 0; }

.faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
.faq-col { display: flex; flex-direction: column; gap: 1rem; }
.faq-item {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px; overflow: hidden; transition: all 0.3s ease;
}
.faq-item:hover { background: rgba(255,255,255,0.05); border-color: rgba(212,175,55,0.3); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.faq-item.open { border-color: rgba(212,175,55,0.5); background: rgba(20,10,35,0.6); }

.faq-q {
  width: 100%; text-align: left; background: none; border: none;
  padding: 1.5rem; color: #fff; font-size: 1.1rem; font-weight: 600;
  cursor: pointer; display: flex; justify-content: space-between; align-items: center;
  font-family: 'Century Gothic', system-ui, sans-serif; transition: all 0.3s ease;
}
.faq-item.open .faq-q { color: #D4AF37; }
.faq-chev { color: rgba(255,255,255,0.4); transition: transform 0.4s ease; }
.faq-item.open .faq-chev { transform: rotate(180deg); color: #D4AF37; }

.faq-a-wrap {
  display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s ease;
}
.faq-item.open .faq-a-wrap { grid-template-rows: 1fr; }
.faq-a { overflow: hidden; }
.faq-a p {
  padding: 0 1.5rem 1.5rem; margin: 0; color: rgba(255,255,255,0.6);
  line-height: 1.6; font-size: 1rem;
}

@media (max-width: 992px) {
  .faq-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .page-hero { padding: 8rem 1rem 3rem; }
  .page-hero h1 { font-size: 2.5rem; }
}
</style>
