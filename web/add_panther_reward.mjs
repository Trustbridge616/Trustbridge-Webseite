import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Insert the panther HTML into the checkout wrapper
const oldCheckoutWrapper = `<div class="epic-ck-wrapper" :class="purchaseType">
            <div class="epic-ck-glow"></div>`;

const newCheckoutWrapper = `<div class="epic-ck-wrapper" :class="purchaseType">
            
            <!-- Panther Reward Companion -->
            <transition name="panther-fade" mode="out-in">
              <div class="panther-reward" :class="purchaseType" :key="purchaseType">
                <img 
                  v-if="purchaseType === 'single'" 
                  src="/panther-muenze-ohneabo-nobg.png" 
                  class="pr-img pr-single" 
                  alt="Panther Coin"
                />
                <img 
                  v-else 
                  src="/panther-muenze-legacy-nobg.png" 
                  class="pr-img pr-abo" 
                  alt="Panther Legacy"
                />
                <div class="pr-message">
                  <span v-if="purchaseType === 'single'">Deine TrustBox ist bereit.</span>
                  <span v-else>Punkte-Multiplikator x{{ activeLevel }} freigeschaltet.</span>
                </div>
              </div>
            </transition>

            <div class="epic-ck-glow"></div>`;

content = content.replace(oldCheckoutWrapper, newCheckoutWrapper);

// 2. Insert the CSS for the Panther Reward Companion
const pantherCss = `
/* ══════════════════════════════════════
   PANTHER REWARD COMPANION
   ══════════════════════════════════════ */
.panther-reward {
  position: absolute;
  top: 50%;
  left: -220px;
  transform: translateY(-50%);
  z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}
.panther-fade-enter-active, .panther-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.panther-fade-enter-from { opacity: 0; transform: translateY(-40%); }
.panther-fade-leave-to { opacity: 0; transform: translateY(-60%); }

.pr-img {
  width: 260px;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8));
  transition: all 0.5s ease;
}
.panther-reward.single .pr-img { filter: drop-shadow(0 0 30px rgba(240,207,90,0.15)); }
.panther-reward.abo .pr-img { filter: drop-shadow(0 0 30px rgba(142,245,210,0.15)); }

.pr-message {
  margin-top: -30px;
  background: rgba(20, 15, 35, 0.85);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 8px 18px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
  position: relative;
  z-index: 2;
}
.panther-reward.single .pr-message {
  border-color: rgba(240,207,90,0.4);
  color: #F0CF5A;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 20px rgba(240,207,90,0.15);
}
.panther-reward.abo .pr-message {
  border-color: rgba(142,245,210,0.4);
  color: #8EF5D2;
  box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 20px rgba(142,245,210,0.15);
}

@media (max-width: 1200px) {
  .panther-reward { left: -160px; opacity: 0.6; }
  .pr-img { width: 220px; }
}
@media (max-width: 992px) {
  .panther-reward { 
    top: -120px; left: 50%; transform: translateX(-50%); 
    opacity: 0.4;
  }
  .pr-img { width: 180px; }
  .pr-message { margin-top: -15px; font-size: 0.75rem; }
  .panther-fade-enter-from { transform: translateX(-50%) translateY(-20px); }
  .panther-fade-leave-to { transform: translateX(-50%) translateY(-20px); }
}
@media (max-width: 768px) {
  .panther-reward { top: -140px; opacity: 0.3; }
}
`;

content = content.replace(/<\/style>/, pantherCss + '\n</style>');

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Panther Reward Companion added.');
