const fs = require('fs');
const content = fs.readFileSync('C:/Users/tisch/OneDrive/Desktop/Trustbox_Partner_Landingpage.html', 'utf8');

const start = content.indexOf('<!-- MAGENTA BANNER -->');
const end = content.indexOf('<!-- TARIFF CARDS -->');

if (start !== -1 && end !== -1) {
   let html = content.substring(start, end);
   
   // Fix common encoding issues
   html = html.replace(/ðŸ“¦/g, '📦');
   html = html.replace(/â‚¬/g, '€');
   html = html.replace(/âœ“/g, '✓');
   html = html.replace(/QualitÃ¤t/g, 'Qualität');
   html = html.replace(/VerfÃ¼gbarkeit/g, 'Verfügbarkeit');
   html = html.replace(/hÃ¤ngt/g, 'hängt');

   let target = fs.readFileSync('web/resources/js/Pages/Partner.vue', 'utf8');
   const insertPoint = target.indexOf('<section id="tariffs" class="tariffs-section">');
   
   target = target.substring(0, insertPoint) + html + '\n      ' + target.substring(insertPoint);

   fs.writeFileSync('web/resources/js/Pages/Partner.vue', target, 'utf8');
   console.log('Restored magenta banner and proof slider into Partner.vue');
} else {
   console.log('Not found');
}
