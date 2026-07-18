import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Make the crystal cards themselves larger
content = content.replace(
    /\.crystal-card \{\s*position: relative; border-radius: 20px; padding: 3\.5rem 1\.5rem 2\.5rem;\s*text-align: center; cursor: pointer; transition: all 0\.5s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\);\s*transform-style: preserve-3d; min-height: 350px;\s*display: flex; flex-direction: column; justify-content: flex-end;\s*\}/g,
    `.crystal-card {
  position: relative; border-radius: 20px; padding: 4rem 1.5rem 3rem;
  text-align: center; cursor: pointer; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d; min-height: 380px;
  display: flex; flex-direction: column; justify-content: flex-end;
}`
);

// 2. Increase active scaling from 1.15 to 1.25 for a more dramatic, larger active shard
content = content.replace(
    /\.crystal-card\.active \{ transform: translateY\(-25px\) scale\(1\.15\); z-index: 20; \}/g,
    `.crystal-card.active { transform: translateY(-30px) scale(1.22); z-index: 20; }`
);

content = content.replace(
    /\.crystal-card:hover \{ transform: translateY\(-12px\) scale\(1\.06\); z-index: 10; \}/g,
    `.crystal-card:hover { transform: translateY(-15px) scale(1.08); z-index: 10; }`
);

// 3. Make the text inside the crystal card larger
content = content.replace(
    /\.cc-price \{ color: #F7F1FF; font-size: 2\.5rem; font-weight: 800; text-shadow: 0 0 20px rgba\(240,207,90,0\.4\); margin-bottom: 0\.2rem; transition: all 0\.4s ease; \}/g,
    `.cc-price { color: #F7F1FF; font-size: 2.8rem; font-weight: 800; text-shadow: 0 0 20px rgba(240,207,90,0.4); margin-bottom: 0.2rem; transition: all 0.4s ease; }`
);

// Price when active
content = content.replace(
    /\.crystal-card\.active \.cc-price \{ font-size: 3rem; text-shadow: 0 0 25px rgba\(240,207,90,0\.6\); \}/g,
    `.crystal-card.active .cc-price { font-size: 3.4rem; text-shadow: 0 0 25px rgba(240,207,90,0.6); }`
);

// 4. Adjust the power up badge width so it doesn't look disproportional
content = content.replace(
    /z-index: 25; width: 90%; max-width: 320px; text-align: center;/g,
    `z-index: 25; width: 100%; max-width: 340px; text-align: center;`
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Crystal Cards (Shards) enlarged.');
