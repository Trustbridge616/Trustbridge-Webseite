const fs = require('fs');
const content = fs.readFileSync('C:/Users/tisch/OneDrive/Desktop/Trustbox_Partner_Landingpage.html', 'utf8');

const start = content.indexOf('<section id="tariffs"');
const end = content.indexOf('</section>', start);

if (start !== -1) {
   fs.writeFileSync('restored_tariffs.html', content.substring(start, end + 10), 'utf8');
   console.log('Saved to restored_tariffs.html. Length:', (end + 10 - start));
} else {
   console.log('Not found');
}
