import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Background slightly lighter
content = content.replace(
    /background: #160B26; z-index: -1;/g,
    'background: #20123D; z-index: -1;'
);

// 2. Overlay slightly lighter and warmer
content = content.replace(
    /background: radial-gradient\(ellipse at top center, rgba\(124,58,237,0\.05\) 0%, rgba\(22,11,38,0\.9\) 100%\);/g,
    'background: radial-gradient(ellipse at top center, rgba(124,58,237,0.08) 0%, rgba(32,18,61,0.85) 100%);'
);

// 3. Stage card brighter
content = content.replace(
    /background: rgba\(42, 25, 68, 0\.72\);/g,
    'background: rgba(52, 31, 86, 0.72);'
);

// 4. Speech bubble brighter
content = content.replace(
    /background: rgba\(42, 25, 68, 0\.95\);/g,
    'background: rgba(52, 31, 86, 0.95);'
);

// 5. Subtext brighter (AFA2C5 -> C4B8D8)
content = content.replace(/#AFA2C5/g, '#C4B8D8');

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Colors bumped by 10-20%');
