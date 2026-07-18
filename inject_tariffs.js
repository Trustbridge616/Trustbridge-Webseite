const fs = require('fs');
let html = fs.readFileSync('restored_tariffs.html', 'utf8');

// Fix common encoding issues
html = html.replace(/ðŸ“¦/g, '📦');
html = html.replace(/â‚¬/g, '€');
html = html.replace(/âœ“/g, '✓');
html = html.replace(/QualitÃ¤t/g, 'Qualität');
html = html.replace(/wÃ¤hlen/g, 'wählen');
html = html.replace(/GrÃ¶ÃŸter/g, 'Größter');
html = html.replace(/stÃ¤rkste/g, 'stärkste');
html = html.replace(/regelmÃ¤ÃŸige/g, 'regelmäßige');
html = html.replace(/VerkÃ¤ufer/g, 'Verkäufer');
html = html.replace(/ðŸ“ˆ/g, '📈');
html = html.replace(/ðŸ’Ž/g, '💎');
html = html.replace(/220â€“250/g, '220–250');
html = html.replace(/690â€“750/g, '690–750');
html = html.replace(/2\.200â€“2\.400/g, '2.200–2.400');
html = html.replace(/grÃ¶ÃŸerer/g, 'größerer');

let target = fs.readFileSync('web/resources/js/Pages/Partner.vue', 'utf8');
const insertPoint = target.indexOf('<!-- INFO BANNER -->');
target = target.substring(0, insertPoint) + '\n' + html + '\n\n      ' + target.substring(insertPoint);

fs.writeFileSync('web/resources/js/Pages/Partner.vue', target, 'utf8');
console.log('Restored tariffs into Partner.vue');
