const fs = require('fs');
let content = fs.readFileSync('web/resources/js/Pages/Partner.vue', 'utf-8');

// The new testimonials section closes with </section> followed immediately by old garbage
// The real INFO BANNER section starts with: <section class="info-banner-section"
// We need to find everything between the FIRST </section> after the testimonials block
// and the LAST occurrence of INFO BANNER section tag

const testiSectionClose = '      </section>\n';

// Find where the testimonials section ends (look for the dots section before it)
const dotsDivEnd = content.indexOf('</div>\n        </div>\n      </section>');
if (dotsDivEnd === -1) {
    console.log('Could not find dots section end');
    process.exit(1);
}

const testiEnd = dotsDivEnd + '</div>\n        </div>\n      </section>'.length;
console.log('Testimonials section ends at char:', testiEnd);

// Find the real INFO BANNER section tag
const infoBannerTag = '      <!-- INFO BANNER -->\n      <section class="info-banner-section"';
const infoBannerPos = content.indexOf(infoBannerTag, testiEnd);
if (infoBannerPos === -1) {
    console.log('Could not find INFO BANNER section');
    process.exit(1);
}
console.log('INFO BANNER found at char:', infoBannerPos);

// Cut out the garbage between testiEnd and infoBannerPos
const before = content.substring(0, testiEnd);
const after = content.substring(infoBannerPos);
const cleaned = before + '\n\n' + after;
fs.writeFileSync('web/resources/js/Pages/Partner.vue', cleaned, 'utf-8');
console.log('SUCCESS - removed', content.length - cleaned.length, 'chars of garbage');
