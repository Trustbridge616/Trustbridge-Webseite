const fs = require('fs');

let content = fs.readFileSync('web/resources/js/Pages/Partner.vue', 'utf8');

// The markers
const m1 = '<!-- TESTIMONIALS SECTION -->';
const m2 = '<!-- MAGENTA BANNER -->';
const m3 = '<section id="tariffs" class="tariffs-section">';
const m4 = '<!-- INFO BANNER -->';

// Find indices
const i1 = content.indexOf(m1);
const i2 = content.indexOf(m2);
const i3 = content.indexOf(m3);
const i4 = content.indexOf(m4);

if (i1 !== -1 && i2 !== -1 && i3 !== -1 && i4 !== -1) {
    // Extract sections
    // Testimonials goes from i1 to i2
    const testimonials = content.substring(i1, i2);
    // Product + Tariffs goes from i2 to i4
    const productAndTariffs = content.substring(i2, i4);
    
    // Everything before Testimonials
    const before = content.substring(0, i1);
    // Everything after INFO BANNER
    const after = content.substring(i4);
    
    // New Order: before -> productAndTariffs -> testimonials -> after
    const newContent = before + productAndTariffs + testimonials + after;
    
    fs.writeFileSync('web/resources/js/Pages/Partner.vue', newContent, 'utf8');
    console.log('Successfully reordered sections!');
} else {
    console.log('Could not find all markers', {i1, i2, i3, i4});
}
