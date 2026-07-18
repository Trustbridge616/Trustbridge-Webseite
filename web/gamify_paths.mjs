import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Add <div class="path-aura"></div> into the path cards
content = content.replace(
    /<div class="path-border-glow"><\/div>/g,
    '<div class="path-border-glow"></div>\n              <div class="path-aura"></div>'
);

// 2. Add path-aura CSS and increase active scale/glows
content = content.replace(
    /\.path-border-glow {/g,
    `.path-aura {
  position: absolute; inset: -2px; border-radius: 26px;
  background: linear-gradient(45deg, #7c3aed, #F0CF5A, #6366f1, #7c3aed);
  background-size: 300% 300%; opacity: 0; filter: blur(10px);
  transition: opacity 0.4s ease; z-index: -1;
}
.path-abo .path-aura {
  background: linear-gradient(45deg, #7c3aed, #8EF5D2, #6366f1, #7c3aed);
  background-size: 300% 300%;
}
.path-card:hover .path-aura { opacity: 0.5; animation: auraSpin 3s linear infinite; }
.path-card.active .path-aura { opacity: 0.8; animation: auraSpin 3s linear infinite; }

.path-border-glow {`
);

content = content.replace(
    /\.path-single\.active \{ transform: translateY\(-8px\) scale\(1\.02\); \}/g,
    '.path-single.active { transform: translateY(-12px) scale(1.08); z-index: 10; }'
);
content = content.replace(
    /\.path-abo\.active \{ transform: translateY\(-8px\) scale\(1\.02\); z-index: 10; \}/g,
    '.path-abo.active { transform: translateY(-12px) scale(1.08); z-index: 10; }'
);

// Boost box-shadows on active paths to match crystal cards
content = content.replace(
    /box-shadow: inset 0 0 30px rgba\(240,207,90,0\.2\), 0 0 40px rgba\(240,207,90,0\.3\);/g,
    'box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(240,207,90,0.3), 0 0 50px rgba(240,207,90,0.4);'
);
content = content.replace(
    /box-shadow: inset 0 0 40px rgba\(142,245,210,0\.3\), 0 0 70px rgba\(142,245,210,0\.5\);/g,
    'box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(142,245,210,0.3), 0 0 70px rgba(142,245,210,0.5);'
);

// Make the background darker when active to simulate the cc-glass active state
content = content.replace(
    /background: rgba\(40, 20, 60, 0\.8\); border-color: rgba\(240,207,90,0\.5\);/g,
    'background: rgba(40, 25, 60, 0.95); border-color: rgba(240,207,90,0.8);'
);
content = content.replace(
    /background: rgba\(20, 45, 55, 0\.95\); border-color: rgba\(142,245,210,0\.7\);/g,
    'background: rgba(20, 35, 45, 0.95); border-color: rgba(142,245,210,0.8);'
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Path Gamification updated.');
