import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// Colors
const OLD_GOLD_HEX = /#d4af37/gi;
const OLD_GOLD_RGBA = /212,175,55/g;
const NEW_GOLD_HEX = '#F0CF5A';
const NEW_GOLD_RGBA = '240,207,90';

const OLD_MINT_HEX = /#A0F0E1/gi;
const OLD_MINT_RGBA = /160,240,225/g;
const NEW_MINT_HEX = '#8EF5D2';
const NEW_MINT_RGBA = '142,245,210';

// Apply Colors
content = content.replace(OLD_GOLD_HEX, NEW_GOLD_HEX);
content = content.replace(OLD_GOLD_RGBA, NEW_GOLD_RGBA);
content = content.replace(OLD_MINT_HEX, NEW_MINT_HEX);
content = content.replace(OLD_MINT_RGBA, NEW_MINT_RGBA);

// Structural Replacements
content = content.replace(
    /background: #020617; z-index: -1;/g,
    'background: #160B26; z-index: -1;'
);

content = content.replace(
    /background: radial-gradient\(ellipse at top center, rgba\(100, 116, 139, 0\.05\) 0%, rgba\(2, 6, 23, 0\.95\) 100%\);/g,
    'background: radial-gradient(ellipse at top center, rgba(124,58,237,0.05) 0%, rgba(22,11,38,0.9) 100%);'
);

content = content.replace(
    /filter: drop-shadow\(0 0 40px rgba\(99, 102, 241, 0\.5\)\);/g,
    'filter: drop-shadow(0 0 40px rgba(124,58,237,0.5));'
);

content = content.replace(
    /background: rgba\(15, 23, 42, 0\.65\);/g,
    'background: rgba(42, 25, 68, 0.72);'
);

content = content.replace(
    /box-shadow: 0 40px 100px rgba\(0,0,0,0\.8\), inset 0 0 80px rgba\(99, 102, 241, 0\.1\);/g,
    'box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(124,58,237,0.1);'
);

content = content.replace(
    /background: rgba\(15, 23, 42, 0\.95\);/g,
    'background: rgba(42, 25, 68, 0.95);'
);

content = content.replace(
    /box-shadow: 0 10px 30px rgba\(0,0,0,0\.5\), 0 0 20px rgba\(99, 102, 241, 0\.4\);/g,
    'box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4);'
);

content = content.replace(
    /filter: drop-shadow\(0 0 20px rgba\(99, 102, 241, 0\.5\)\);/g,
    'filter: drop-shadow(0 0 20px rgba(124,58,237,0.5));'
);

// Text colors - we'll do selective replaces for the specific classes
content = content.replace(/\.page-hero h1 \{[\s\S]*?color: #fff;/g, (match) => match.replace('color: #fff;', 'color: #F7F1FF;'));
content = content.replace(/\.hero-sub \{[\s\S]*?color: rgba\(255,255,255,0\.5\);/g, (match) => match.replace('color: rgba(255,255,255,0.5);', 'color: #AFA2C5;'));
content = content.replace(/\.system-intro-panel p \{ color: rgba\(255,255,255,0\.6\);/g, '.system-intro-panel p { color: #D9CFE8;');
content = content.replace(/\.step-head h2 \{ color: #fff;/g, '.step-head h2 { color: #F7F1FF;');
content = content.replace(/\.cc-name \{ color: rgba\(255,255,255,0\.7\);/g, '.cc-name { color: #D9CFE8;');
content = content.replace(/\.cc-price \{ color: #fff;/g, '.cc-price { color: #F7F1FF;');
content = content.replace(/\.cc-packs \{ color: rgba\(255,255,255,0\.4\);/g, '.cc-packs { color: #AFA2C5;');
content = content.replace(/\.cc-val-label \{\s*display: block;\s*font-size: 0\.75rem;\s*color: rgba\(255,255,255,0\.7\);/g, '.cc-val-label {\n  display: block;\n  font-size: 0.75rem;\n  color: #AFA2C5;');
content = content.replace(/\.level-disclaimer \{\s*text-align: center;\s*color: rgba\(255,255,255,0\.4\);/g, '.level-disclaimer {\n  text-align: center;\n  color: #AFA2C5;');
content = content.replace(/\.path-content h3 \{ color: #fff;/g, '.path-content h3 { color: #F7F1FF;');
content = content.replace(/\.path-content p \{ color: rgba\(255,255,255,0\.5\);/g, '.path-content p { color: #D9CFE8;');
content = content.replace(/\.abp-text strong \{ color: #fff;/g, '.abp-text strong { color: #F7F1FF;');
content = content.replace(/\.abp-text span \{ color: rgba\(255,255,255,0\.5\);/g, '.abp-text span { color: #AFA2C5;');
content = content.replace(/\.epic-ck-box-label \{ color: rgba\(255,255,255,0\.5\);/g, '.epic-ck-box-label { color: #AFA2C5;');
content = content.replace(/\.epic-ck-price \{ color: #fff;/g, '.epic-ck-price { color: #F7F1FF;');
content = content.replace(/\.epic-ck-info \{ color: rgba\(255,255,255,0\.6\);/g, '.epic-ck-info { color: #D9CFE8;');
content = content.replace(/\.panther-speech-bubble \{[\s\S]*?color: #fff;/g, (match) => match.replace('color: #fff;', 'color: #F7F1FF;'));

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Colors updated.');
