import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Update miniFaqs Array
const newFaqs = `const miniFaqs = [
  { q: '1. Was bekomme ich in einer TrustBox?', a: 'Du bekommst wechselnde Ware aus Sonderposten, Restposten, Retouren, Neuware, Ladenhütern, Fashion, Schuhen, Haushalt, Saisonware oder ähnlichen Warenchancen. Die genaue Mischung hängt vom Warenbestand ab. Wichtig ist: Wir stellen keine sinnlose Zufallsbox zusammen, sondern Ware mit echtem Einkaufsvorteil.' },
  { q: '2. Warum bekomme ich diesen Einkaufsvorteil?', a: 'Weil wir gebündelt einkaufen. Wir kaufen größere Mengen, Pakete oder Paletten zu besseren Konditionen ein und teilen diesen Vorteil auf kleinere TrustBoxen auf. So bekommst du Zugang zu Preisen und Warenchancen, die man als Einzelperson normalerweise nicht bekommt.' },
  { q: '3. Ist jede Box gleich?', a: 'Nein. Jede TrustBox ist anders, weil wir mit wechselnden Warenposten arbeiten. Genau dadurch entstehen die starken Einkaufsvorteile. Du wählst dein Level – wir stellen die Box nach Bestand, Mix und Mehrwert zusammen.' },
  { q: '4. Was bedeutet „keine Schrottboxen“?', a: 'Ganz einfach: Wir kaufen nicht irgendeinen Müll ein, nur damit eine Box voll aussieht. Wir achten darauf, Ware einzukaufen, mit der man auch wirklich etwas anfangen kann – nutzen, verschenken oder privat weitergeben. Wenn wir Schrott liefern würden, kommst du nicht wieder. Und dann funktioniert unser System nicht. Wir gewinnen nur, wenn du auch gewinnst.' },
  { q: '5. Was bedeutet kalkulierter Warenwert?', a: 'Der kalkulierte Warenwert ist ein orientierender Vergleichswert der enthaltenen Ware. Er zeigt dir, welchen ungefähren Warenwert wir auf Basis von Marktpreisen, Bestand, Mix und Verfügbarkeit einplanen. Die Werte sind keine feste Verkaufsgarantie, sondern zeigen dir den geplanten Einkaufsvorteil.' },
  { q: '6. Was bringt das Legacy-Abo?', a: 'Im Legacy-Abo erhältst du regelmäßig deine TrustBox, sammelst Legacy-Punkte mit Level-Multiplikator und bekommst bis zu 48h früher Zugriff auf besondere Deals. Du unterstützt den Aufbau des Systems – und bekommst dafür Vorteile, Vorabzugang und bessere Deal-Chancen zurück.' },
  { q: '7. Kann ich die Ware weitergeben?', a: 'Ja. Du kannst die Ware behalten, nutzen, verschenken oder privat weitergeben. Unsere Boxen sind genau darauf ausgelegt: Du sollst echten Spielraum haben. Denn je besser deine Box für dich funktioniert, desto eher kommst du wieder – und genau dadurch wächst das System.' },
  { q: '8. Kann ich mein Abo kündigen?', a: 'Ja. Das Legacy-Abo soll transparent und monatlich kündbar sein, sofern im Bestellprozess keine andere Laufzeit ausdrücklich ausgewählt wird. Alle Details werden vor Abschluss klar angezeigt.' }
];`;

content = content.replace(
  /const miniFaqs = \[\s*\{ q: '1\. Was ist in einer TrustBox\?',[\s\S]*?\];/g,
  newFaqs
);

// 2. Update Template header
content = content.replace(
  /<div class="faq-header">\s*<span class="faq-tag">WISSEN<\/span>\s*<h2 class="faq-title">Kurze Fragen vor deiner Bestellung<\/h2>\s*<\/div>/g,
  `<div class="faq-header">
          <h2 class="faq-title">Kurze Fragen, bevor du startest</h2>
          <p class="faq-subtitle">Alles, was du wissen musst, bevor du deine TrustBox sicherst.</p>
        </div>`
);

// 3. Update loops to slice(0, 4) and slice(4)
content = content.replace(/slice\(0, 3\)/g, 'slice(0, 4)');
content = content.replace(/slice\(3\)/g, 'slice(4)');
content = content.replace(/openFaq === \(i\+3\)/g, 'openFaq === (i+4)');
content = content.replace(/toggleFaq\(i\+3\)/g, 'toggleFaq(i+4)');
content = content.replace(/:key="i\+3"/g, ':key="i+4"');

// 4. Update the Bottom CTA
const newFaqMoreLink = `<div class="faq-more-link">
          <Link href="/faq" class="btn-outline">Alle Fragen ausführlich ansehen</Link>
          <a href="#" @click.prevent="scrollToTop" class="btn-primary" style="margin-left: 15px;">Jetzt TrustBox sichern</a>
        </div>`;
content = content.replace(
  /<div class="faq-more-link">\s*<Link href="\/faq" class="btn-outline">Alle häufigen Fragen ansehen<\/Link>\s*<\/div>/g,
  newFaqMoreLink
);

// Add scrollToTop function
content = content.replace(
  /const checkout = \(\) => {/g,
  `const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const checkout = () => {`
);

// 5. Update FAQ Styling
content = content.replace(
  /\.faq-title { color: #fff; font-size: 2\.5rem; font-weight: 800; margin: 0; }/g,
  `.faq-title { color: #F7F1FF; font-size: 2.8rem; font-weight: 800; margin: 0 0 1rem; }
.faq-subtitle { color: #D9CFE8; font-size: 1.2rem; margin: 0; }`
);

content = content.replace(
  /\.faq-item { background: rgba\(255,255,255,0\.03\); border: 1px solid rgba\(255,255,255,0\.05\); border-radius: 16px; margin-bottom: 1rem; overflow: hidden; transition: all 0\.3s ease; }/g,
  `.faq-item { 
  background: rgba(42, 25, 68, 0.4); 
  border: 1px solid rgba(255,255,255,0.08); 
  border-radius: 16px; margin-bottom: 1rem; overflow: hidden; transition: all 0.4s ease; 
  backdrop-filter: blur(10px);
}`
);

content = content.replace(
  /\.faq-item\.open { background: rgba\(20,10,40,0\.8\); border-color: rgba\(124,58,237,0\.3\); box-shadow: 0 10px 30px rgba\(0,0,0,0\.3\); }/g,
  `.faq-item.open { 
  background: rgba(52, 31, 86, 0.85); 
  border-color: rgba(240,207,90,0.5); 
  box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(240,207,90,0.1); 
}`
);

content = content.replace(
  /\.faq-a p {[\s\S]*?}/g,
  `.faq-a p {
  padding: 0 1.5rem 1.5rem; margin: 0; color: #D9CFE8;
  line-height: 1.6; font-size: 1.05rem;
}`
);

content = content.replace(
  /\.faq-q { width: 100%; padding: 1\.5rem; background: none; border: none; color: #fff; font-size: 1\.1rem; font-weight: 600; text-align: left; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; }/g,
  `.faq-q { width: 100%; padding: 1.5rem; background: none; border: none; color: #F7F1FF; font-size: 1.15rem; font-weight: 700; text-align: left; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; }`
);

content = content.replace(
  /\.btn-primary \{/g,
  `.btn-primary {
  display: inline-block; padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 10px 20px rgba(240,207,90,0.3); transition: all 0.3s ease; border: none; cursor: pointer;
}
.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }`
);

// Since .btn-primary is used but might not be defined in scoped CSS of Prizes.vue, let's just make sure it exists
if (!content.includes('.btn-primary {')) {
  content += `\n.btn-primary {
  display: inline-block; padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 10px 20px rgba(240,207,90,0.3); transition: all 0.3s ease; border: none; cursor: pointer;
}
.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }`;
}

// Ensure the buttons look good on mobile
content = content.replace(
  /@media \(max-width: 768px\) {/g,
  `@media (max-width: 768px) {
  .faq-more-link { display: flex; flex-direction: column; gap: 15px; }
  .faq-more-link a { margin-left: 0 !important; width: 100%; text-align: center; }`
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('FAQ updated.');
