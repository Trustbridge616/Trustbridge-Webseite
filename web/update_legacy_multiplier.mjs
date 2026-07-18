import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// Add computed property for dynamic explanation text
const scriptAddition = `const activeLevelData = computed(() => levels.find(l => l.id === activeLevel.value));

const getLevelExplainer = (levelId) => {
  if (levelId === 1) return "Mit Level 1 sammelst du Legacy-Punkte im einfachen Faktor.";
  if (levelId === 2) return "Mit Level 2 sammelst du doppelte Legacy-Punkte für spätere Vorteile.";
  if (levelId === 3) return "Mit Level 3 sammelst du dreifach Legacy-Punkte für spätere Vorteile, Deals und Vorabzugang.";
  if (levelId === 4) return "Mit Level 4 sammelst du vierfach Legacy-Punkte und kommst schneller in stärkere Vorteilsebenen.";
  if (levelId === 5) return "Mit Level 5 sammelst du fünffach Legacy-Punkte und sicherst dir den stärksten Punkteaufbau.";
  return "";
};
`;

content = content.replace(
    /const activeLevelData = computed\(\(\) => levels\.find\(l => l\.id === activeLevel\.value\)\);/g,
    scriptAddition
);

// Update power-up-badge in crystal-card
const oldPowerUpBadge = `<transition name="power-up">
                  <div class="power-up-badge" v-if="isAboMode && activeLevel === lvl.id">
                    <span class="pu-icon">⚡</span>
                    <span class="pu-text">Faktor x{{ lvl.id }}</span>
                  </div>
                </transition>`;

const newPowerUpBadge = `<transition name="power-up">
                  <div class="power-up-badge" v-if="isAboMode && activeLevel === lvl.id">
                    <div class="pu-main">
                      <span class="pu-icon">⚡</span>
                      <span class="pu-text">Punkte-Multiplikator x{{ lvl.id }} aktiv</span>
                      <div class="tooltip-wrapper">
                        <svg class="info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        <div class="tooltip-content">
                          Der Multiplikator bestimmt, wie stark deine Legacy-Punkte durch dein gewähltes Box-Level gezählt werden. Je höher dein Level im Abo, desto schneller baust du Punkte für spätere Vorteile, Deals und Vorabzugänge auf.
                        </div>
                      </div>
                    </div>
                    <div class="pu-explainer">{{ getLevelExplainer(lvl.id) }}</div>
                  </div>
                </transition>`;

content = content.replace(oldPowerUpBadge, newPowerUpBadge);

// Update dynamic benefits panel (abp-item)
const oldAbpItem = `<div class="abp-item">
                    <div class="abp-icon">🎯</div>
                    <div class="abp-text">
                      <strong>Punkte-Faktor x{{ activeLevel }}</strong>
                      <span>Legacy-Punkte sammeln</span>
                    </div>
                  </div>`;

const newAbpItem = `<div class="abp-item">
                    <div class="abp-icon">🎯</div>
                    <div class="abp-text">
                      <strong>Punkte-Multiplikator x{{ activeLevel }}</strong>
                      <span>Mehr Punkte mit deinem Level</span>
                    </div>
                  </div>`;

content = content.replace(oldAbpItem, newAbpItem);

// Update epic checkout info text
content = content.replace(
    /<div class="epic-ck-info ck-info-abo" v-else>\s*Legacy-Abo · Punkte-Faktor \{\{ activeLevel \}\} · bis zu 48h Deal-Vorabzugang\s*<\/div>/g,
    `<div class="epic-ck-info ck-info-abo" v-else>
                Legacy-Abo · Punkte-Multiplikator x{{ activeLevel }} · bis zu 48h Deal-Vorabzugang
              </div>`
);

// Add the badge row in the benefits panel
const badgeRow = `<div class="multiplier-badges">
                  <div class="mb-item" :class="{ active: activeLevel === 1 }">Level 1 x1</div>
                  <div class="mb-item" :class="{ active: activeLevel === 2 }">Level 2 x2</div>
                  <div class="mb-item" :class="{ active: activeLevel === 3 }">Level 3 x3</div>
                  <div class="mb-item" :class="{ active: activeLevel === 4 }">Level 4 x4</div>
                  <div class="mb-item" :class="{ active: activeLevel === 5 }">Level 5 x5</div>
                </div>`;

// Insert the badgeRow after the abp-grid
content = content.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*<div class="microcopy-info" v-else>/g,
    `</div>
                  ${badgeRow}
                </div>
              </div>
            <div class="microcopy-info" v-else>`
);

// Add necessary styles
const newStyles = `
.power-up-badge {
  position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
  background: rgba(15, 30, 40, 0.95);
  border: 1px solid rgba(142,245,210,0.6);
  padding: 10px 20px; border-radius: 20px;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 30px rgba(142,245,210,0.4);
  z-index: 25; width: 90%; max-width: 320px; text-align: center;
  animation: powerFloat 3s ease-in-out infinite;
}
.pu-main { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; position: relative; }
.pu-icon { font-size: 1.2rem; filter: drop-shadow(0 0 5px #8EF5D2); }
.pu-text { color: #8EF5D2; font-weight: 800; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; }
.pu-explainer { font-size: 0.8rem; color: #D9CFE8; line-height: 1.3; margin-top: 4px; font-weight: 500; }

.tooltip-wrapper { position: relative; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.info-icon { color: rgba(142,245,210,0.6); transition: color 0.3s ease; }
.tooltip-wrapper:hover .info-icon { color: #8EF5D2; }
.tooltip-content {
  position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%);
  background: rgba(20, 10, 40, 0.95); border: 1px solid rgba(142,245,210,0.4);
  color: #fff; font-size: 0.8rem; padding: 12px; border-radius: 12px; width: 250px;
  opacity: 0; pointer-events: none; transition: all 0.3s ease; box-shadow: 0 10px 25px rgba(0,0,0,0.6); z-index: 100;
  text-transform: none; letter-spacing: normal; font-weight: 400;
}
.tooltip-wrapper:hover .tooltip-content { opacity: 1; transform: translateX(-50%) translateY(-5px); }

.multiplier-badges {
  display: flex; justify-content: center; gap: 10px; margin-top: 2rem; flex-wrap: wrap;
}
.mb-item {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.5); font-size: 0.85rem; font-weight: 700;
  padding: 6px 14px; border-radius: 20px; transition: all 0.3s ease;
}
.mb-item.active {
  background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.6);
  color: #8EF5D2; box-shadow: 0 0 15px rgba(142,245,210,0.3); text-shadow: 0 0 8px rgba(142,245,210,0.5);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .power-up-badge { top: -60px; padding: 8px 12px; }
  .pu-text { font-size: 0.8rem; }
  .pu-explainer { font-size: 0.75rem; }
  .multiplier-badges { gap: 6px; }
  .mb-item { padding: 4px 10px; font-size: 0.75rem; }
}
`;

// Remove the old power-up-badge and pu-* styles
content = content.replace(/\.power-up-badge \{[\s\S]*?\}\s*\.pu-icon \{[\s\S]*?\}\s*\.pu-text \{[\s\S]*?\}/g, '');

content = content.replace(/<\/style>/, newStyles + '\n</style>');

// Also update the keyframes animation to shift translateY for the powerFloat since we moved it higher
content = content.replace(
    /@keyframes powerFloat \{\s*0%, 100% \{ transform: translateX\(-50%\) translateY\(0\); \}\s*50% \{ transform: translateX\(-50%\) translateY\(-12px\);/g,
    `@keyframes powerFloat {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px);`
);

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Legacy points multiplier refactored.');
