import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// Panther intro image larger
content = content.replace(
    /width: 120px;\s*height: 120px;/g,
    'width: 150px;\n  height: 150px;'
);

// Intro panel text slightly brighter
content = content.replace(
    /\.system-intro-panel p { color: #D9CFE8;/g,
    '.system-intro-panel p { color: #F7F1FF;'
);

// Hero sub brighter
content = content.replace(
    /\.hero-sub {[\s\S]*?color: #C4B8D8;/g,
    (match) => match.replace('color: #C4B8D8;', 'color: #D9CFE8;')
);

// Crystal cards larger and more pronounced
content = content.replace(
    /min-height: 320px;/g,
    'min-height: 350px;'
);
content = content.replace(
    /transform: translateY\(-12px\) scale\(1\.04\);/g,
    'transform: translateY(-12px) scale(1.06);'
);
content = content.replace(
    /transform: translateY\(-25px\) scale\(1\.12\);/g,
    'transform: translateY(-25px) scale(1.15);'
);

// Water background global but more subtle
content = content.replace(
    /opacity: 0\.08;/g,
    'opacity: 0.05;'
);
// In case I changed it before:
content = content.replace(
    /opacity: 0\.06;/g,
    'opacity: 0.05;'
);

// Legacy badge float higher
content = content.replace(
    /transform: translateX\(-50%\) translateY\(-8px\);/g,
    'transform: translateX(-50%) translateY(-12px);'
);

// Legacy Abo active path card softer glow
content = content.replace(
    /background: rgba\(15, 35, 45, 0\.9\);/g,
    'background: rgba(20, 45, 55, 0.95);'
);

// Update micro-confirmations to be a bit more explicit
content = content.replace(
    /messages = \['Starke Wahl\.', 'Mehr Spielraum gewählt\.', 'Einkaufsvorteil aktiviert\.', 'Guter Move\.'\];/g,
    'messages = [\'Starke Wahl.\', \'Mehr Spielraum gewählt.\', \'Einkaufsvorteil gesichert.\', \'Sehr gute Entscheidung.\'];'
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Refinements applied.');
