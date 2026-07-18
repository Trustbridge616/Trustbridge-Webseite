<template>
  <AppLayout>
    <SeoHead
      title="Pakete & Abo – Trustbridge"
      description="Wähle dein Paket. Starte einmalig und sichere dir Vorabzugang zu besonderen Angeboten."
      keywords="Trustbridge Pakete, Abo, Portal"
      canonical="https://trustbridge.de/prizes"
    />

    <!-- GLOBAL BG -->
    <div class="page-base-bg"></div>

    <!-- ═══════ FLOWING WATER BG ═══════ -->
    <div class="water-bg" aria-hidden="true">
      <div class="water-layer water-img"></div>
      <div class="water-overlay"></div>
    </div>

    <!-- HERO -->
    <div class="page-hero">
      <div class="hero-glow g1"></div>
      <div class="hero-glow g2"></div>
      <div class="hero-inner">
        <span class="hero-tag">TRUSTBRIDGE</span>
        <h1>Deine Auswahl treffen</h1>
        <p class="hero-sub">Der Weg zu deinem Einkaufsvorteil.</p>
      </div>
    </div>

    <div class="flow-wrap">
      <!-- Panther Guide -->
      <img src="/panther-mitte-nobg.png" class="guide-panther" alt="TrustBox Panther" aria-hidden="true" />

      <!-- THE PREMIUM ORDER STAGE (Permanently Abo-Mode for colors) -->
      <div class="premium-order-stage stage-abo-mode">
        <div class="stage-ambient-glow abo"></div>

        <div class="system-intro-panel">
          <div class="intro-text-side">
            <h3>Wir wachsen miteinander</h3>
            <p>Du bekommst Ware mit echtem Einkaufsvorteil. Wir können größer einkaufen. Dadurch entstehen bessere Deals. Davon profitierst du wieder.</p>
          </div>
          <div class="intro-img-side">
            <img src="/panther-muenze-legacy-nobg.png" class="panther-coin-img" alt="Legacy Panther Münze">
          </div>
        </div>

        <!-- STEP 1: PAYMENT SELECTION (Using original plateau/crystal-card) -->
        <div class="stage-section step-1-boxes">
          <div class="step-head">
            <span class="step-badge badge-abo">1</span>
            <h2>Wähle deine Zahlungsart</h2>
          </div>

          <div class="plateau-container">
            <div class="plateau-base">
              <div class="plateau-grid-lines grid-abo"></div>
              <div class="plateau-core-glow core-abo"></div>
            </div>

            <!-- PAYMENT GRID -->
            <div class="level-grid" style="grid-template-columns: repeat(3, 1fr); gap: 2rem; justify-content: center;">
              <div
                v-for="pm in paymentMethods" :key="pm.id"
                class="crystal-card"
                :class="{ active: activePayment === pm.id, 'abo-active': activePayment === pm.id }"
                @click="selectPayment(pm.id)"
              >
                <div class="cc-glass"></div>
                <div class="cc-refraction"></div>
                <div class="cc-aura"></div>
                <div class="cc-active-glow"></div>

                <div class="cc-badge cc-badge-popular" v-if="pm.id === 'crypto'">Beste Wahl</div>

                <div class="cc-box-stage">
                  <div class="cc-stage-ring"></div>
                  <div class="cc-box-icon" style="font-size: 2.5rem; color: #8EF5D2; display:flex; align-items:center; justify-content:center;">
                    {{ pm.icon }}
                  </div>
                </div>

                <div class="cc-body">
                  <span class="cc-name" style="margin-bottom:0.5rem;">{{ pm.name }}</span>
                  <span class="cc-price" style="font-size:2rem;">{{ formatPrice(pm.price) }} €</span>
                </div>
              </div>
            </div>

            <!-- Preview Panel (Static Info) -->
            <div class="dynamic-preview-panel activation-pulse" style="margin-top: 3rem;">
              <div class="preview-img-wrapper">
                <div class="preview-shard-glow"></div>
                <img src="/box_3_example.png" class="preview-img" alt="Preview Box" />
              </div>
              <div class="preview-info">
                <span class="preview-badge">BOX INHALT</span>
                <h4>Was wir anbieten ist IMMER Die Gleiche Box</h4>
                <p class="preview-value">Warenwert 240 - 250 € (Amazonpreise)</p>
                <p class="preview-disclaimer">Die Ware ist mindestens immer Original.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Connection Line -->
        <div class="flow-connector">
          <div class="connector-line line-abo"></div>
          <div class="connector-dot dot-abo"></div>
        </div>

        <!-- STEP 2: QUANTITY SELECTION -->
        <div class="stage-section step-2-quantity">
          <div class="step-head">
            <span class="step-badge badge-abo">2</span>
            <h2>Wieviele Boxen möchtest du bestellen?</h2>
          </div>

          <div class="plateau-container" style="padding-top: 50px;">
            <div class="plateau-base">
              <div class="plateau-grid-lines grid-abo"></div>
              <div class="plateau-core-glow core-abo"></div>
            </div>

            <!-- Side-by-side Layout -->
            <div style="display: flex; gap: 3rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
              
              <!-- Cards -->
              <div class="level-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem; flex: 2; min-width: 350px;">
                <div
                  v-for="qty in 5" :key="'qty-'+qty"
                  class="crystal-card"
                  :class="{ active: activeQuantity === qty, 'abo-active': activeQuantity === qty }"
                  @click="selectQuantity(qty)"
                >
                  <div class="cc-glass"></div>
                  <div class="cc-refraction"></div>
                  <div class="cc-aura"></div>
                  <div class="cc-active-glow"></div>

                  <div class="cc-box-stage">
                    <div class="cc-stage-ring"></div>
                    <div class="cc-box-icon" style="display:flex; align-items:center; justify-content:center; color: #8EF5D2;">
                      <!-- Real Gear SVG -->
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
                      </svg>
                    </div>
                  </div>

                  <div class="cc-body">
                    <span class="cc-price" style="font-size: 3rem;">{{ qty }}</span>
                    <span class="cc-name">{{ qty === 1 ? 'Box' : 'Boxen' }}</span>
                  </div>
                </div>
              </div>

              <!-- Profit Calculation Box (Right Side) -->
              <div style="flex: 1; min-width: 300px; background: rgba(20, 10, 40, 0.8); border: 1px solid rgba(142,245,210,0.5); border-radius: 20px; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; align-items: center; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <h3 style="color: #F7F1FF; margin-top: 0; font-size: 1.4rem; text-align: center; text-transform: uppercase;">Deine Kalkulation</h3>
                
                <div style="text-align: center; width: 100%;">
                  <h4 style="color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase;">Gesamtpreis</h4>
                  <div style="font-size: 2.2rem; color: #F7F1FF; font-weight: 800;">{{ formatPrice(totalPrice) }} €</div>
                </div>
                
                <div style="height: 1px; width: 100%; background: rgba(142,245,210,0.2);"></div>
                
                <div style="text-align: center; width: 100%;">
                  <h4 style="color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase;">Kalkulierter Warenwert</h4>
                  <div style="font-size: 2.2rem; color: #8EF5D2; font-weight: 800; text-shadow: 0 0 15px rgba(142,245,210,0.4);">~ {{ formatPrice(totalValue) }} €</div>
                </div>
                
                <div style="height: 1px; width: 100%; background: rgba(142,245,210,0.2);"></div>
                
                <div style="text-align: center; padding: 1.5rem 1rem; background: rgba(240,207,90,0.1); border-radius: 15px; border: 1px dashed rgba(240,207,90,0.4); width: 100%;">
                  <h4 style="color: #F0CF5A; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase; font-weight: 900;">Möglicher Gewinn</h4>
                  <div style="font-size: 2.8rem; color: #F0CF5A; font-weight: 900; text-shadow: 0 0 20px rgba(240,207,90,0.6);">+ {{ formatPrice(totalProfit) }} €</div>
                </div>
              </div>

            </div> <!-- End Flex Container -->
          </div>
        </div>

        <!-- PRO TIPP -->
        <div style="margin-top: 3rem; position: relative; background: linear-gradient(135deg, rgba(142,245,210,0.1), rgba(30,20,50,0.8)); border: 1px solid rgba(142,245,210,0.3); border-radius: 20px; padding: 2.5rem; display: flex; gap: 2rem; align-items: flex-start; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
          <div style="position: absolute; top: -50%; left: -10%; width: 50%; height: 200%; background: radial-gradient(ellipse, rgba(142,245,210,0.15) 0%, transparent 70%); pointer-events: none; transform: rotate(30deg);"></div>
          <div style="font-size: 3.5rem; line-height: 1; filter: drop-shadow(0 0 15px rgba(240,207,90,0.5));">💡</div>
          <div style="position: relative; z-index: 2; font-family: 'Century Gothic', system-ui, sans-serif;">
            <h3 style="color: #F0CF5A; font-size: 1.5rem; font-weight: 800; margin: 0 0 1rem; letter-spacing: 2px;">PRO TIPP</h3>
            <p style="color: #F7F1FF; font-size: 1.15rem; line-height: 1.6; margin: 0 0 1.5rem;">
              Bestelle die Ware privat und verkaufe sie so privat weiter. So werden keine Steuern fällig, wenn man sie in erster Linie für sich selbst gekauft hat quasi.
            </p>
            <div style="height: 1px; background: linear-gradient(90deg, rgba(142,245,210,0.4), transparent); margin-bottom: 1.5rem;"></div>
            <p style="color: #D9CFE8; font-size: 1.1rem; line-height: 1.6; margin: 0;">
              <strong style="color: #8EF5D2; font-size: 1.25rem;">Verdiene Geld mit Markenwaren.</strong><br>
              Das ist unser Slogan – oder nutze sie selbst und spare bare Münze: Einkaufen zu Preisen wie ein Großhändler.
            </p>
          </div>
        </div>

        <!-- Connection Line -->
        <div class="flow-connector">
          <div class="connector-line line-abo"></div>
          <div class="connector-dot dot-abo"></div>
        </div>

        <!-- STEP 3: CHECKOUT CTA -->
        <div class="stage-section step-3-checkout">
          <div class="step-head">
            <span class="step-badge badge-abo">3</span>
            <h2>Deine Auswahl</h2>
          </div>

          <div class="epic-ck-wrapper checkout-pulse-active-abo">
            
            <div class="panther-reward abo">
              <img src="/panther-muenze-legacy-nobg.png" class="pr-img pr-abo" alt="Panther Legacy" />
              <div class="pr-message">
                <span>Deine TrustBox ist bereit.</span>
              </div>
            </div>

            <div class="epic-ck-glow"></div>
            <div class="epic-ck-card">
              <div class="epic-ck-top">
                <div class="epic-ck-selection">
                  <span class="epic-ck-box-label">{{ activeQuantity }}x TrustBox ({{ activePaymentData.name }})</span>
                  <span class="epic-ck-price">{{ formatPrice(totalPrice) }} €</span>
                </div>
                <div class="epic-ck-type-pill abo">
                  Einmalig Bestellen
                </div>
              </div>

              <div class="epic-ck-info ck-info-abo">
                Einmalige Bestellung · Keine Bindung · Echte Markenware
              </div>

              <button class="epic-cta-btn abo" @click="checkout">
                <span class="cta-glare"></span>
                <span class="cta-text">JETZT BESTELLEN</span>
              </button>
            </div>
          </div>
        </div>

      </div> <!-- /premium-order-stage -->
    </div>
    
    <!-- ═══════ VIDEO VISION SECTION ═══════ -->
    <div class="vision-video-section">
      <div class="vision-wrap">
        <div class="vision-text">
          <span class="vision-tag">DIE VISION HINTER TRUSTBRIDGE</span>
          <h2>So entsteht dein Einkaufsvorteil</h2>
          <p>
            Wir bündeln unsere Einkaufskraft und kaufen größere Warenposten zu exzellenten Konditionen ein. 
            Diesen Preisvorteil geben wir direkt an dich weiter. Ein Win-Win-System, bei dem du von echter Handelsware profitierst.
          </p>
        </div>
        <div class="vision-player-col">
          <div class="video-stage">
            <div class="video-container">
              <iframe 
                src="https://www.youtube.com/embed/tDx1DHk0QD8" 
                title="Trustbridge Vision" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen>
              </iframe>
            </div>
            <div class="video-glow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════ WRITER SECTION ═══════ -->
    <WriterSection />

  </AppLayout>

  <!-- Panther Feedback Toast -->
  <transition name="toast-slide">
    <div class="panther-toast stage-abo-mode" v-if="pantherVisible">
      <div class="panther-speech-bubble">
        {{ pantherMessage }}
      </div>
      <img src="/panther-mitte-nobg.png" class="toast-panther-img" alt="Panther Guide" />
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import WriterSection from '../Components/Writer/WriterSection.vue';

const paymentMethods = [
  { id: 'bank', name: 'Banküberweisung', price: 116.50, icon: '🏦' },
  { id: 'crypto', name: 'Cryptocurrency', price: 111.00, icon: '₿' },
  { id: 'paypal', name: 'PayPal', price: 119.99, icon: 'P' }
];

const activePayment = ref('crypto');
const activeQuantity = ref(1);

const pantherMessage = ref('');
const pantherVisible = ref(false);
let pantherTimeout = null;

const activePaymentData = computed(() => paymentMethods.find(p => p.id === activePayment.value));

const baseValue = 245;

const totalPrice = computed(() => activePaymentData.value.price * activeQuantity.value);
const totalValue = computed(() => baseValue * activeQuantity.value);
const totalProfit = computed(() => totalValue.value - totalPrice.value);

const formatPrice = (val) => {
  return Number(val).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const triggerFeedback = (message) => {
  pantherMessage.value = message;
  pantherVisible.value = true;
  if(pantherTimeout) clearTimeout(pantherTimeout);
  pantherTimeout = setTimeout(() => {
    pantherVisible.value = false;
  }, 4000);
};

const selectPayment = (id) => {
  if (activePayment.value !== id) {
    activePayment.value = id;
    triggerFeedback('Gute Wahl für die Zahlung!');
  }
};

const selectQuantity = (qty) => {
  if (activeQuantity.value !== qty) {
    activeQuantity.value = qty;
    triggerFeedback(qty > 1 ? 'Mehr Boxen, mehr Profit!' : 'Einkaufsvorteil gesichert.');
  }
};

const checkout = () => {
  router.post(route('stripe.checkout'), { 
    quantity: activeQuantity.value, 
    paymentMethod: activePayment.value 
  });
};

onMounted(() => {
  document.body.classList.add('legacy-mode-active');
});

onUnmounted(() => {
  document.body.classList.remove('legacy-mode-active');
});
</script>

<style scoped>
* { box-sizing: border-box; }
body { font-family: 'Century Gothic', system-ui, sans-serif; }

/* ══════════════════════════════════════
   HERO
   ══════════════════════════════════════ */
.page-hero {
  position: relative;
  background: transparent;
  padding: 10rem 2rem 3rem;
  text-align: center;
  overflow: hidden;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.hero-glow {
  position: absolute; border-radius: 50%; filter: blur(140px); pointer-events: none;
  animation: heroFloat 8s ease-in-out infinite;
}
.g1 { top: -30%; left: 10%; width: 600px; height: 600px; background: rgba(124,58,237,0.3); opacity: 0.5; }
.g2 { bottom: -25%; right: 5%; width: 500px; height: 500px; background: rgba(240,207,90,0.15); opacity: 0.4; animation-delay: -4s; }
@keyframes heroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.06); }
}
.hero-inner { position: relative; z-index: 1; max-width: 750px; margin: 0 auto; }
.hero-tag {
  display: inline-block; font-size: 0.8rem; font-weight: 700;
  letter-spacing: 4px; color: #F0CF5A; margin-bottom: 1.25rem;
  text-shadow: 0 0 25px rgba(240,207,90,0.6);
}
.page-hero h1 {
  color: #F7F1FF; font-size: 3.8rem; font-weight: 800;
  margin: 0 0 1rem; font-family: 'Century Gothic', system-ui, sans-serif;
  line-height: 1.1;
  text-shadow: 0 0 50px rgba(124,58,237,0.25);
}
.hero-sub {
  color: #D9CFE8; font-size: 1.2rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
  letter-spacing: 0.5px;
}

/* ══════════════════════════════════════
   FLOW WRAPPER & BACKGROUNDS
   ══════════════════════════════════════ */
.flow-wrap {
  background: transparent;
  font-family: 'Century Gothic', system-ui, sans-serif;
  position: relative;
  padding: 2rem 2rem 6rem;
}

.page-base-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: #160a2c; z-index: -1;
}

.water-bg {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none; z-index: 0; overflow: hidden;
}
.water-layer.water-img {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: url('/flowing_water_bg.png');
  background-size: 1500px; background-repeat: repeat;
  opacity: 0.05; mix-blend-mode: screen;
  animation: waterFlowReal 80s linear infinite; filter: contrast(1) brightness(0.8);
}
.water-overlay {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at top center, rgba(124,58,237,0.05) 0%, rgba(12,3,26,0.9) 100%);
}
@keyframes waterFlowReal {
  0% { background-position: 0 0; }
  100% { background-position: 1500px 1500px; }
}

.guide-panther {
  position: absolute; left: -10%; top: 10%; height: 900px;
  opacity: 0.05; pointer-events: none; z-index: 0;
  mix-blend-mode: screen; filter: drop-shadow(0 0 40px rgba(124,58,237,0.5));
  animation: pantherBreathLeft 10s ease-in-out infinite;
}
@keyframes pantherBreathLeft {
  0%, 100% { transform: scaleX(-1) translateY(0); opacity: 0.05; }
  50% { transform: scaleX(-1) translateY(-20px); opacity: 0.05; }
}

/* ══════════════════════════════════════
   THE PREMIUM STAGE (UNIFIED CONTAINER)
   ══════════════════════════════════════ */
.premium-order-stage {
  position: relative; z-index: 5;
  background: rgba(30, 20, 50, 0.65);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.25);
  border-radius: 40px; max-width: 1400px; margin: 0 auto;
  padding: 4rem;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 80px rgba(124,58,237,0.1);
  display: flex; flex-direction: column; gap: 1.5rem;
  transition: all 0.6s ease;
}

/* Abo Mode Global Shift */
.premium-order-stage.stage-abo-mode {
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 100px rgba(142,245,210,0.08);
  border-top: 1px solid rgba(142,245,210,0.2);
}
.stage-ambient-glow {
  position: absolute; inset: 0; border-radius: 40px; pointer-events: none;
  background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05), transparent 60%);
  opacity: 0; transition: opacity 0.6s ease;
}
.stage-ambient-glow.abo { opacity: 1; }

/* ══════════════════════════════════════
   FEEDBACK TOAST & INTRO PANEL
   ══════════════════════════════════════ */
.system-intro-panel {
  text-align: left;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  padding: 1.5rem 2.5rem;
  max-width: 800px;
  margin: 0 auto 1rem;
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}
.intro-text-side { flex: 1; }
.intro-img-side {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.panther-coin-img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(240,207,90,0.3));
  transition: all 0.4s ease;
}
.stage-abo-mode .panther-coin-img {
  filter: drop-shadow(0 0 20px rgba(142,245,210,0.3));
}
.system-intro-panel h3 { color: #F0CF5A; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 0.5rem; transition: color 0.5s ease; }
.stage-abo-mode .system-intro-panel h3 { color: #8EF5D2; }
.system-intro-panel p { color: #F7F1FF; margin: 0; font-size: 1.05rem; line-height: 1.5; }

@media (max-width: 768px) {
  .faq-more-link { display: flex; flex-direction: column; gap: 15px; }
  .faq-more-link a { margin-left: 0 !important; width: 100%; text-align: center; }
  .system-intro-panel {
    flex-direction: column-reverse;
    text-align: center;
    padding: 1.5rem;
    gap: 1rem;
  }
  .intro-img-side {
    width: 100px;
    height: 100px;
  }
}

.panther-toast {
  position: fixed; bottom: 30px; right: 30px; z-index: 100;
  display: flex; align-items: flex-end; gap: 1rem; pointer-events: none;
}
.panther-speech-bubble {
  background: rgba(20, 10, 40, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(240,207,90,0.4);
  padding: 1rem 1.5rem; border-radius: 20px; border-bottom-right-radius: 4px;
  color: #F7F1FF; font-size: 1.1rem; font-weight: 700;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4);
  margin-bottom: 20px; transition: all 0.4s ease;
}
.stage-abo-mode .panther-speech-bubble {
  border-color: rgba(142,245,210,0.5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(142,245,210,0.3);
}
.toast-panther-img {
  width: 140px; filter: drop-shadow(0 0 20px rgba(124,58,237,0.5)); transition: all 0.4s ease;
}
.stage-abo-mode .toast-panther-img {
  filter: drop-shadow(0 0 20px rgba(142,245,210,0.4));
}
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(50px) translateX(20px); }

/* Step Headers inside Stage */
.step-head {
  display: flex; align-items: center; justify-content: center; gap: 1rem;
  margin-bottom: 2rem; position: relative; z-index: 2;
}
.step-badge {
  width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
  border-radius: 50%; font-size: 1.4rem; font-weight: 800; transition: all 0.4s ease;
}
.badge-single {
  background: linear-gradient(135deg, rgba(240,207,90,0.2), transparent);
  border: 1px solid rgba(240,207,90,0.4); color: #F0CF5A;
  box-shadow: 0 0 20px rgba(240,207,90,0.2); text-shadow: 0 0 10px rgba(240,207,90,0.5);
}
.badge-abo {
  background: linear-gradient(135deg, rgba(142,245,210,0.2), transparent);
  border: 1px solid rgba(142,245,210,0.5); color: #8EF5D2;
  box-shadow: 0 0 25px rgba(142,245,210,0.3); text-shadow: 0 0 15px rgba(142,245,210,0.6);
}
.step-head h2 { color: #F7F1FF; font-size: 2.4rem; font-weight: 700; margin: 0; letter-spacing: 1px; }

/* Flow Connector Lines */
.flow-connector {
  display: flex; flex-direction: column; align-items: center; margin: -1rem 0; opacity: 0.7;
}
.connector-line { width: 2px; height: 40px; transition: all 0.4s ease; }
.line-single { background: linear-gradient(to bottom, rgba(240,207,90,0.8), transparent); }
.line-abo { background: linear-gradient(to bottom, rgba(142,245,210,0.8), transparent); }
.connector-dot { width: 8px; height: 8px; border-radius: 50%; transition: all 0.4s ease; }
.dot-single { background: #F0CF5A; box-shadow: 0 0 15px #F0CF5A; }
.dot-abo { background: #8EF5D2; box-shadow: 0 0 15px #8EF5D2; }

/* ══════════════════════════════════════
   STEP 1: 3D PLATEAU & CRYSTAL CARDS
   ══════════════════════════════════════ */
.plateau-container { position: relative; padding: 100px 0 60px; perspective: 1500px; }
.plateau-base {
  position: absolute; bottom: 5%; left: 2%; right: 2%; height: 250px;
  transform: rotateX(65deg) translateZ(-80px); transform-style: preserve-3d;
  pointer-events: none; z-index: 0;
}
.plateau-grid-lines {
  position: absolute; inset: -20%; opacity: 0.5; transition: all 0.6s ease;
  background-image: 
    linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 70% 70% at center, black 10%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 70% at center, black 10%, transparent 70%);
}
.plateau-grid-lines.grid-abo {
  background-image: 
    linear-gradient(rgba(142,245,210,0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(142,245,210,0.2) 1px, transparent 1px);
}

.plateau-core-glow {
  position: absolute; inset: 0; border-radius: 50%; transition: all 0.6s ease;
  background: radial-gradient(ellipse at center, rgba(99,102,241,0.5) 0%, rgba(124,58,237,0.2) 40%, transparent 70%);
  box-shadow: 0 0 150px rgba(124,58,237,0.8);
  animation: plateauPulse 6s ease-in-out infinite;
}
.plateau-core-glow.core-abo {
  background: radial-gradient(ellipse at center, rgba(142,245,210,0.3) 0%, rgba(99,102,241,0.2) 40%, transparent 70%);
  box-shadow: 0 0 150px rgba(142,245,210,0.4);
}
@keyframes plateauPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* Crystal Grid */
.level-grid {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; align-items: end;
}

/* Crystal Card Base */
.crystal-card {
  position: relative; border-radius: 20px; padding: 4rem 1.5rem 3rem;
  text-align: center; cursor: pointer; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d; min-height: 380px;
  display: flex; flex-direction: column; justify-content: flex-end;
}
.crystal-card:hover { transform: translateY(-15px) scale(1.08); z-index: 10; }
.crystal-card.active { transform: translateY(-30px) scale(1.22); z-index: 20; }

.cc-glass {
  position: absolute; inset: 0; background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 20px; border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.3); border-left: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.02);
  transition: all 0.5s ease; overflow: hidden;
}
.cc-refraction {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 100%);
  border-radius: 20px; pointer-events: none; opacity: 0.5; transition: opacity 0.4s ease;
}
.cc-aura {
  position: absolute; inset: -2px; border-radius: 22px;
  background: linear-gradient(45deg, #7c3aed, #F0CF5A, #6366f1, #7c3aed);
  background-size: 300% 300%; opacity: 0; filter: blur(8px);
  transition: opacity 0.4s ease; z-index: -1;
}
.crystal-card:hover .cc-aura { opacity: 0.7; animation: auraSpin 3s linear infinite; }
@keyframes auraSpin { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* Active Glows (Single vs Abo) */
.cc-active-glow {
  position: absolute; inset: -8px; border-radius: 26px;
  background: linear-gradient(to bottom, #F0CF5A, rgba(240,207,90,0.3));
  opacity: 0; filter: blur(20px); transition: all 0.6s ease; z-index: -2;
}
.cc-body { text-align: center; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.2rem; position: relative; z-index: 2; }
.cc-name { color: #D9CFE8; font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.cc-price { color: #F7F1FF; font-size: 2.8rem; font-weight: 800; text-shadow: 0 0 20px rgba(240,207,90,0.4); margin-bottom: 0.2rem; transition: all 0.4s ease; }
.cc-packs { color: rgba(255,255,255,0.5); font-size: 0.9rem; }
.crystal-card.active .cc-price { color: #F0CF5A; }
.crystal-card.abo-active .cc-price { color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.5); }

/* Warenwert-Anzeige */
.cc-value-box {
  margin: 0.5rem 0;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  height: 0;
  overflow: hidden;
}
.crystal-card:hover .cc-value-box {
  opacity: 0.6;
  transform: translateY(0);
  height: auto;
  padding: 0.3rem;
}
.crystal-card.active .cc-value-box {
  opacity: 1;
  transform: translateY(0);
  height: auto;
  padding: 0.6rem;
  background: rgba(240,207,90,0.08);
  border: 1px solid rgba(240,207,90,0.2);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(240,207,90,0.15);
}
.crystal-card.abo-active .cc-value-box {
  background: rgba(142,245,210,0.08);
  border-color: rgba(142,245,210,0.3);
  box-shadow: 0 0 15px rgba(142,245,210,0.2);
}
.uvp-text strong { color: #FFF; font-weight: 600; margin-right: 5px; }
.cc-val-amount {
  display: block;
  font-size: 1.15rem;
  font-weight: 800;
  color: #F0CF5A;
  text-shadow: 0 0 15px rgba(240,207,90,0.4);
  margin-bottom: 0.2rem;
}
.crystal-card.abo-active .cc-val-amount {
  color: #8EF5D2;
  text-shadow: 0 0 15px rgba(142,245,210,0.4);
}
.cc-val-label {
  display: block;
  font-size: 0.75rem;
  color: #C4B8D8;
  line-height: 1.2;
}

.level-disclaimer {
  text-align: center;
  color: #C4B8D8;
  font-size: 0.85rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 2;
}

.crystal-card.active .cc-active-glow { opacity: 0.95; box-shadow: 0 30px 60px rgba(240,207,90,0.4); }
.crystal-card.active .cc-glass {
  border-color: rgba(240,207,90,0.9); background: rgba(40, 25, 60, 0.85);
  box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 20px 40px rgba(240,207,90,0.2), inset 0 0 50px rgba(240,207,90,0.3);
}

/* ABO MODE OVERRIDES FOR BOX */
.crystal-card.abo-active .cc-active-glow {
  background: linear-gradient(to bottom, #8EF5D2, rgba(142,245,210,0.2));
  box-shadow: 0 30px 60px rgba(142,245,210,0.3);
}
.crystal-card.abo-active .cc-glass {
  border-color: rgba(142,245,210,0.9); background: rgba(20, 35, 45, 0.85);
  box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 20px 40px rgba(142,245,210,0.2), inset 0 0 50px rgba(142,245,210,0.2);
}

/* Card Content */
.cc-body { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 0.5rem; }
.cc-name { color: rgba(255,255,255,0.6); font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; transition: color 0.4s ease; }
.crystal-card.active .cc-name { color: #F0CF5A; }
.crystal-card.abo-active .cc-name { color: #8EF5D2; }

.cc-price { color: #F7F1FF; font-size: 2.2rem; font-weight: 800; text-shadow: 0 2px 10px rgba(0,0,0,0.5); transition: all 0.4s ease; }
.crystal-card.active .cc-price { font-size: 3.4rem; text-shadow: 0 0 25px rgba(240,207,90,0.6); }
.crystal-card.abo-active .cc-price { text-shadow: 0 0 25px rgba(142,245,210,0.6); }
.cc-packs { color: #C4B8D8; font-size: 0.9rem; }

/* Box Stage */
.cc-box-stage {
  position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
  width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;
  transition: transform 0.5s ease; z-index: 3;
}
.crystal-card:hover .cc-box-stage { transform: translateX(-50%) translateY(-10px); }
.crystal-card.active .cc-box-stage { transform: translateX(-50%) translateY(-20px) scale(1.15); }
.cc-stage-ring {
  position: absolute; bottom: 15px; width: 80px; height: 20px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(124,58,237,0.8) 0%, transparent 70%);
  filter: blur(4px); opacity: 0.5; transition: all 0.5s ease;
}
.crystal-card.active .cc-stage-ring {
  background: radial-gradient(ellipse, rgba(240,207,90,0.9) 0%, transparent 70%);
  filter: blur(6px); opacity: 1; box-shadow: 0 0 20px rgba(240,207,90,0.6);
}
.crystal-card.abo-active .cc-stage-ring {
  background: radial-gradient(ellipse, rgba(142,245,210,0.9) 0%, transparent 70%);
  box-shadow: 0 0 25px rgba(142,245,210,0.5);
}
.cc-box-icon { color: rgba(255,255,255,0.8); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5)); transition: color 0.4s ease; }
.crystal-card.active .cc-box-icon { color: #F7F1FF; filter: drop-shadow(0 10px 15px rgba(240,207,90,0.4)); }
.crystal-card.abo-active .cc-box-icon { filter: drop-shadow(0 10px 15px rgba(142,245,210,0.4)); }

/* Badges & Power-Ups */
.cc-badge {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  padding: 4px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
  z-index: 4; white-space: nowrap;
}
.cc-badge-popular { background: #7c3aed; color: #fff; box-shadow: 0 0 15px rgba(124,58,237,0.5); }
.cc-badge-royal { background: #F0CF5A; color: #000; box-shadow: 0 0 15px rgba(240,207,90,0.5); }

/* FLOATING POWER UP (Abo Mode) */


@keyframes powerFloat {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); box-shadow: 0 15px 25px rgba(0,0,0,0.5), 0 0 40px rgba(142,245,210,0.6); }
}
.power-up-enter-active, .power-up-leave-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.power-up-enter-from, .power-up-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.5); }

/* ══════════════════════════════════════
   STEP 2: KAUFART (ENERGY PATHS)
   ══════════════════════════════════════ */
.path-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
  max-width: 1000px; margin: 0 auto; position: relative; z-index: 2;
}
.path-card {
  position: relative; padding: 3rem 2.5rem; border-radius: 24px; cursor: pointer; text-align: left;
  display: flex; gap: 1.5rem; align-items: center; transition: all 0.4s ease; overflow: hidden;
}
.path-bg {
  position: absolute; inset: 0; background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border-radius: 24px; border: 1px solid rgba(255,255,255,0.15);
  z-index: 0; transition: all 0.4s ease;
}
.path-aura {
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

.path-border-glow {
  position: absolute; inset: 0; border-radius: 24px; opacity: 0; transition: opacity 0.4s ease; z-index: 1; pointer-events: none;
}

/* Path Single (Gold/Violet) */
.path-single:hover { transform: translateY(-5px); }
.path-single.active { transform: translateY(-12px) scale(1.08); z-index: 10; }
.path-single.active .path-bg { background: rgba(40, 25, 60, 0.95); border-color: rgba(240,207,90,0.8); }
.path-single.active .path-aura {
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

.path-border-glow { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(240,207,90,0.3), 0 0 50px rgba(240,207,90,0.4); opacity: 1; }
.path-single.active .path-icon { color: #F0CF5A; filter: drop-shadow(0 0 15px rgba(240,207,90,0.5)); }

/* Path Abo (Mint/White) */
.path-abo:hover { transform: translateY(-5px); }
.path-abo.active { transform: translateY(-12px) scale(1.08); z-index: 10; }
.path-abo.active .path-bg { background: rgba(20, 35, 45, 0.95); border-color: rgba(142,245,210,0.8); }
.path-abo.active .path-aura {
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

.path-border-glow { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(142,245,210,0.3), 0 0 70px rgba(142,245,210,0.5); opacity: 1; }
.path-abo.active .path-icon { color: #8EF5D2; filter: drop-shadow(0 0 20px rgba(142,245,210,0.7)); }

.path-icon {
  position: relative; z-index: 2; width: 72px; height: 72px; border-radius: 50%;
  background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.4); transition: all 0.4s ease;
}
.path-content { position: relative; z-index: 2; flex: 1; }
.path-content h3 { color: #F7F1FF; font-size: 1.8rem; margin: 0 0 0.5rem; font-weight: 700; transition: color 0.3s ease; }
.path-content p { color: #D9CFE8; margin: 0; font-size: 1.05rem; transition: color 0.3s ease; }
.path-abo.active .path-content h3 { color: #8EF5D2; text-shadow: 0 0 10px rgba(142,245,210,0.3); }

.path-check { position: relative; z-index: 2; color: rgba(255,255,255,0.1); transition: color 0.4s ease; }
.path-single.active .path-check { color: #F0CF5A; }
.path-abo.active .path-check { color: #8EF5D2; }

.path-premium-label {
  position: absolute; top: 1.2rem; right: 1.5rem; z-index: 2;
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;
  color: #8EF5D2; opacity: 0.6; padding: 4px 12px; border-radius: 20px;
  border: 1px solid rgba(142,245,210,0.2);
}
.path-abo.active .path-premium-label { opacity: 1; background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.5); text-shadow: 0 0 10px rgba(142,245,210,0.5); animation: premiumBadgeSweep 8s ease-in-out infinite 1s; }


/* ══════════════════════════════════════
   DYNAMIC BENEFITS PANEL
   ══════════════════════════════════════ */
.abo-benefits-panel {
  max-width: 1000px; margin: 1.5rem auto 0; position: relative;
  background: linear-gradient(180deg, rgba(15, 30, 40, 0.8), rgba(15, 20, 30, 0.6));
  border: 1px solid rgba(142,245,210,0.3); border-top: none;
  border-bottom-left-radius: 24px; border-bottom-right-radius: 24px;
  padding: 2.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  overflow: hidden;
}
.abp-glow {
  position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
  width: 60%; height: 100px; background: radial-gradient(ellipse, rgba(142,245,210,0.2) 0%, transparent 70%);
  filter: blur(20px); pointer-events: none;
}
.abp-content { position: relative; z-index: 2; }
.abp-header {
  text-align: center; color: #8EF5D2; font-size: 1.1rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 2rem; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
}
.abp-pulse { width: 8px; height: 8px; background: #8EF5D2; border-radius: 50%; box-shadow: 0 0 10px #8EF5D2; animation: abpPulse 2s infinite; }
@keyframes abpPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }

.abp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.abp-item {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 16px;
  padding: 1.5rem; display: flex; align-items: center; gap: 1rem; transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}
.abp-item:hover { background: rgba(142,245,210,0.05); border-color: rgba(142,245,210,0.3); transform: translateY(-3px); }
.abp-icon { font-size: 1.8rem; filter: drop-shadow(0 0 10px rgba(142,245,210,0.4)); }
.abp-text { display: flex; flex-direction: column; gap: 0.25rem; }
.abp-text strong { color: #F7F1FF; font-size: 1.1rem; }
.abp-text span { color: #C4B8D8; font-size: 0.9rem; }

.microcopy-info { text-align: center; margin-top: 1.5rem; font-size: 1rem; color: rgba(255,255,255,0.5); font-weight: 500; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.fade-slide-enter-from { opacity: 0; transform: translateY(-20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

/* ══════════════════════════════════════
   STEP 3: EPIC CHECKOUT CTA
   ══════════════════════════════════════ */
.epic-ck-wrapper { max-width: 700px; margin: 0 auto; position: relative; }
.epic-ck-glow {
  position: absolute; inset: -20px; border-radius: 40px;
  background: radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%);
  filter: blur(30px); opacity: 0.5; transition: all 0.6s ease;
}
.epic-ck-wrapper.abo .epic-ck-glow { background: radial-gradient(ellipse, rgba(142,245,210,0.3) 0%, transparent 70%); }

.epic-ck-card {
  position: relative; background: rgba(40, 25, 60, 0.8);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-radius: 30px; padding: 4rem;
  border: 1px solid rgba(255,255,255,0.15); border-top: 1px solid rgba(255,255,255,0.3);
  text-align: center; box-shadow: 0 40px 80px rgba(0,0,0,0.6); transition: all 0.5s ease;
}
.epic-ck-wrapper.abo .epic-ck-card { border-color: rgba(142,245,210,0.3); background: rgba(15, 25, 30, 0.9); }

/* Animation when redirected from modal */
.epic-ck-wrapper.checkout-pulse-active-single .epic-ck-card {
  animation: finalPulseSingle 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.epic-ck-wrapper.checkout-pulse-active-abo .epic-ck-card {
  animation: finalPulseAbo 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes finalPulseSingle {
  0% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(255,255,255,0.15); }
  30% { transform: scale(1.02); box-shadow: 0 0 60px rgba(240,207,90,0.5), inset 0 0 40px rgba(240,207,90,0.1); border-color: rgba(240,207,90,0.8); }
  100% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(255,255,255,0.15); }
}
@keyframes finalPulseAbo {
  0% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(142,245,210,0.3); }
  30% { transform: scale(1.02); box-shadow: 0 0 60px rgba(142,245,210,0.5), inset 0 0 40px rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.8); }
  100% { transform: scale(1); box-shadow: 0 40px 80px rgba(0,0,0,0.6); border-color: rgba(142,245,210,0.3); }
}

.epic-ck-top {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem; margin-bottom: 1.5rem;
}
.epic-ck-selection { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; }
.epic-ck-box-label { color: #C4B8D8; font-size: 1.2rem; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
.epic-ck-price { color: #F7F1FF; font-size: 3.2rem; font-weight: 800; transition: color 0.4s ease; }
.epic-ck-wrapper.abo .epic-ck-price { color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.4); }

.epic-ck-type-pill { padding: 10px 28px; border-radius: 30px; font-weight: 700; font-size: 1.2rem; transition: all 0.4s ease; }
.epic-ck-type-pill.single { background: rgba(240,207,90,0.15); color: #F0CF5A; border: 1px solid rgba(240,207,90,0.3); }
.epic-ck-type-pill.abo { background: rgba(142,245,210,0.2); color: #8EF5D2; border: 1px solid rgba(142,245,210,0.5); box-shadow: 0 0 20px rgba(142,245,210,0.3); }

.epic-ck-info { color: #D9CFE8; font-size: 1.2rem; margin-bottom: 2.5rem; transition: color 0.4s ease; }
.ck-info-abo { color: #8EF5D2; opacity: 0.9; }

.epic-cta-btn {
  position: relative; width: 100%; padding: 1.8rem; border-radius: 20px; border: none;
  font-family: 'Century Gothic', system-ui, sans-serif; font-size: 1.5rem; font-weight: 800; letter-spacing: 1px;
  cursor: pointer; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.epic-cta-btn:hover { transform: translateY(-3px) scale(1.02); }
.epic-cta-btn:active { transform: translateY(1px); }

.cta-text { position: relative; z-index: 2; }
.cta-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg); animation: btnGlare 4s infinite; z-index: 1;
}
@keyframes btnGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }

.epic-cta-btn.single { background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 15px 30px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); animation: epicSinglePulse 8s ease-in-out infinite; }
.epic-cta-btn.single:hover { box-shadow: 0 20px 40px rgba(240,207,90,0.6), inset 0 2px 0 rgba(255,255,255,0.4); }

.epic-cta-btn.abo { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); animation: epicAboPulse 8s ease-in-out infinite 1.5s; }
.epic-cta-btn.abo:hover { box-shadow: 0 20px 40px rgba(142,245,210,0.6), inset 0 2px 0 rgba(255,255,255,0.5); }

/* Pulse animation triggered from modal */
.epic-ck-wrapper.checkout-pulse-active-single .epic-cta-btn {
  animation: btnPulseSingle 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
.epic-ck-wrapper.checkout-pulse-active-abo .epic-cta-btn {
  animation: btnPulseAbo 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes btnPulseSingle {
  0% { transform: scale(1); filter: brightness(1); }
  30% { transform: scale(1.05); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
}
@keyframes btnPulseAbo {
  0% { transform: scale(1); filter: brightness(1); }
  30% { transform: scale(1.05); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
}


/* ══════════════════════════════════════
   FAQ SECTION
   ══════════════════════════════════════ */
.faq-section { background: transparent; padding: 5rem 2rem 8rem; font-family: 'Century Gothic', system-ui, sans-serif; position: relative; z-index: 2; }
.faq-wrap { max-width: 1140px; margin: 0 auto; }
.faq-header { text-align: center; margin-bottom: 4rem; }
.faq-tag { display: inline-block; font-size: 0.85rem; font-weight: 700; letter-spacing: 3px; color: #F0CF5A; margin-bottom: 1rem; }
.faq-title { color: #F7F1FF; font-size: 2.8rem; font-weight: 800; margin: 0 0 1rem; }
.faq-subtitle { color: #D9CFE8; font-size: 1.2rem; margin: 0; }
.faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
.faq-item { 
  background: rgba(26, 15, 46, 0.5); 
  border: 1px solid rgba(255,255,255,0.06); 
  border-radius: 16px; margin-bottom: 1rem; overflow: hidden; 
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); 
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  position: relative;
}
.faq-item:hover { background: rgba(35, 20, 60, 0.6); border-color: rgba(255,255,255,0.15); box-shadow: 0 8px 25px rgba(0,0,0,0.4); }
.faq-item::before {
  content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 10%, rgba(142,245,210,0.08) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.5s ease; pointer-events: none;
}
.faq-item.open::before { opacity: 1; }
.faq-item.open { 
  background: rgba(90, 60, 130, 0.65); 
  border-color: rgba(142, 245, 210, 0.5); 
  box-shadow: 0 25px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(142, 245, 210, 0.1), 0 0 20px rgba(142, 245, 210, 0.15); 
  transform: translateY(-4px);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  z-index: 5;
}
.faq-q { width: 100%; padding: 1.8rem 2rem; background: none; border: none; color: #F7F1FF; font-size: 1.25rem; font-weight: 800; text-align: left; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; transition: color 0.4s ease, text-shadow 0.4s ease; }
.faq-item.open .faq-q { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
.faq-chev { color: rgba(255,255,255,0.4); transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.5s ease; }
.faq-item.open .faq-chev { transform: rotate(180deg); color: #8EF5D2; filter: drop-shadow(0 0 8px rgba(142,245,210,0.5)); }
.faq-a-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.faq-item.open .faq-a-wrap { grid-template-rows: 1fr; }
.faq-a { overflow: hidden; }
.faq-a p {
  padding: 0.5rem 2rem 2.5rem; margin: 0; color: #FFFFFF;
  line-height: 1.8; font-size: 1.15rem; opacity: 0; transform: translateY(15px); transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: 0s; font-weight: 500; text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}
.faq-item.open .faq-a p { opacity: 1; transform: translateY(0); transition-delay: 0.15s; }

.faq-more-link {
  text-align: center;
  margin-top: 3rem;
}
.btn-outline {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(240,207,90,0.4);
  border-radius: 8px;
  color: #F0CF5A;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}
.btn-outline:hover {
  background: rgba(240,207,90,0.1);
  box-shadow: 0 0 20px rgba(240,207,90,0.2);
}

@media (max-width: 992px) {
  .faq-grid { grid-template-columns: 1fr; }
}
/* ══════════════════════════════════════
   MOBILE RESPONSIVENESS
   ══════════════════════════════════════ */
@media (max-width: 1024px) {
  .premium-order-stage { padding: 3rem 2rem; border-radius: 30px; }
  .level-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  .plateau-container { padding: 90px 0 20px; perspective: none; }
  .plateau-base { display: none; }
  .crystal-card { min-height: 240px; padding: 1.5rem 0.5rem; }
  .path-grid { grid-template-columns: 1fr; }
  .abp-grid { grid-template-columns: 1fr; gap: 1rem; }
  .faq-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .faq-more-link { display: flex; flex-direction: column; gap: 15px; }
  .faq-more-link a { margin-left: 0 !important; width: 100%; text-align: center; }
  .panther-toast { right: 10px; bottom: 10px; }
  .toast-panther-img { width: 100px; }
  .panther-speech-bubble { font-size: 1rem; padding: 0.8rem 1.2rem; }
  .system-intro-panel { padding: 1.5rem; }
  .page-hero { padding: 8rem 1rem 3rem; }
  .page-hero h1 { font-size: 2.5rem; }
  .premium-order-stage { padding: 2rem 1rem; border-radius: 20px; gap: 2rem; }
  .guide-panther { opacity: 0.04; right: -20%; height: 600px; }
  .level-grid { grid-template-columns: 1fr; gap: 1.5rem; }
  .crystal-card { transform: none !important; margin-bottom: 0.5rem; }
  .crystal-card:hover { transform: none !important; }
  .crystal-card.active { transform: scale(1.02) !important; border-color: rgba(240,207,90,0.8); }
  .crystal-card.abo-active { border-color: rgba(142,245,210,0.8); }
  .epic-ck-card { padding: 2rem 1.5rem; }
  .epic-ck-price { font-size: 2.2rem; }
  .epic-ck-top { flex-direction: column; gap: 1rem; }
  .path-card { flex-direction: column; text-align: center; gap: 1rem; }
  .path-premium-label { top: auto; bottom: 1rem; right: auto; }
}
.btn-primary {
  display: inline-block; padding: 1rem 2.5rem; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 1.1rem;
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 10px 20px rgba(240,207,90,0.3); transition: all 0.3s ease; border: none; cursor: pointer; text-align: center; animation: epicSinglePulse 8s ease-in-out infinite 2s;
}
.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }


/* ══════════════════════════════════════
   SUBTLE ATTENTION ANIMATIONS (8s cycle)
   ══════════════════════════════════════ */
@media (prefers-reduced-motion: no-preference) {
  @keyframes pathAboSweep {
    0%, 88%, 100% { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(142,245,210,0.3), 0 0 70px rgba(142,245,210,0.5); }
    94% { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 60px rgba(142,245,210,0.5), 0 0 100px rgba(142,245,210,0.8); }
  }

  @keyframes pathTextPulse {
    0%, 88%, 100% { color: #D9CFE8; text-shadow: none; }
    94% { color: #FFFFFF; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
  }

  @keyframes premiumBadgeSweep {
    0%, 88%, 100% { background: rgba(142,245,210,0.15); box-shadow: none; border-color: rgba(142,245,210,0.5); }
    94% { background: rgba(142,245,210,0.25); box-shadow: 0 0 15px rgba(142,245,210,0.4); border-color: rgba(142,245,210,0.8); }
  }

  @keyframes epicSinglePulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(240,207,90,0.7), inset 0 2px 0 rgba(255,255,255,0.6); transform: scale(1.015); }
  }

  @keyframes epicAboPulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(142,245,210,0.7), inset 0 2px 0 rgba(255,255,255,0.7); transform: scale(1.015); }
  }
}


.power-up-badge {
  position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
  background: rgba(15, 30, 40, 0.95);
  border: 1px solid rgba(142,245,210,0.6);
  padding: 10px 20px; border-radius: 20px;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5), 0 0 30px rgba(142,245,210,0.4);
  z-index: 25; width: 100%; max-width: 340px; text-align: center;
  animation: powerFloat 3s ease-in-out infinite;
}
.pu-main { display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; position: relative; }
.pu-icon { font-size: 1.2rem; filter: drop-shadow(0 0 5px #8EF5D2); }
.pu-text { color: #8EF5D2; font-weight: 800; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; }

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
  .multiplier-badges { gap: 6px; }
  .mb-item { padding: 4px 10px; font-size: 0.75rem; }
}


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

.btn-primary:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.5); transform: translateY(-3px); }

/* ══════════════════════════════════════
   VISION VIDEO SECTION
   ══════════════════════════════════════ */
.vision-video-section {
  position: relative;
  z-index: 5;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.vision-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  background: rgba(30, 20, 50, 0.4);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 40px;
  padding: 4rem;
  box-shadow: 0 30px 60px rgba(0,0,0,0.6);
  transition: all 0.6s ease;
}
body.legacy-mode-active .vision-wrap {
  background: rgba(10, 30, 35, 0.5);
  border-color: rgba(142,245,210,0.2);
}
.vision-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.vision-tag {
  font-size: 0.85rem; font-weight: 700; letter-spacing: 3px; color: #F0CF5A;
  transition: color 0.6s ease;
}
body.legacy-mode-active .vision-tag { color: #8EF5D2; }
.vision-text h2 { color: #F7F1FF; font-size: 2.4rem; font-weight: 700; margin: 0; line-height: 1.2; }
.vision-text p { color: #D9CFE8; font-size: 1.1rem; line-height: 1.6; margin: 0; text-align: left; }
.live-content-teaser {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px;
  text-align: left;
}
.teaser-badge {
  display: inline-block; padding: 0.3rem 0.8rem; background: rgba(255,255,255,0.1);
  border-radius: 8px; font-size: 0.8rem; font-weight: 600; color: #FFF; margin-bottom: 0.8rem;
}
.live-content-teaser h4 { color: #FFF; font-size: 1.1rem; margin: 0 0 0.5rem; }
.live-content-teaser p { font-size: 0.95rem; color: rgba(255,255,255,0.6); margin: 0;}

.vision-player-col { position: relative; }
.video-stage {
  position: relative; border-radius: 20px; padding: 6px;
  background: linear-gradient(135deg, rgba(240,207,90,0.3), rgba(124,58,237,0.3));
  transition: all 0.6s ease;
}
body.legacy-mode-active .video-stage {
  background: linear-gradient(135deg, rgba(142,245,210,0.4), rgba(30,100,150,0.3));
}
.video-container {
  position: relative; width: 100%; padding-bottom: 56.25%; border-radius: 14px; overflow: hidden; background: #000;
}
.video-container iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}
.video-glow {
  position: absolute; inset: -20px; background: rgba(240,207,90,0.15); filter: blur(30px); z-index: -1;
  transition: all 0.6s ease;
}
body.legacy-mode-active .video-glow { background: rgba(142,245,210,0.15); }

@media (max-width: 992px) {
  .vision-wrap { grid-template-columns: 1fr; padding: 2rem; gap: 2rem; }
}

/* --- Preview Connection Line --- */
.preview-connection-line {
  width: 2px;
  height: 40px;
  margin: 0 auto;
  background: linear-gradient(to bottom, rgba(240,207,90,0.5), transparent);
  animation: dropGlow 0.6s ease-out forwards;
}
body.legacy-mode-active .preview-connection-line {
  background: linear-gradient(to bottom, rgba(142,245,210,0.5), transparent);
}
@keyframes dropGlow {
  0% { height: 0; opacity: 0; }
  100% { height: 40px; opacity: 1; }
}

/* Dynamic Preview Panel */
.dynamic-preview-panel {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(30,20,50,0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240,207,90,0.3);
  border-radius: 24px;
  padding: 1.5rem 2.5rem;
  max-width: 850px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(240,207,90,0.05);
}
body.legacy-mode-active .dynamic-preview-panel {
  background: rgba(10,30,35,0.6);
  border-color: rgba(142,245,210,0.3);
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(142,245,210,0.05);
}

.activation-pulse {
  animation: panelActivateSingle 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
body.legacy-mode-active .activation-pulse {
  animation: panelActivateAbo 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes panelActivateSingle {
  0% { transform: translateY(10px); box-shadow: 0 0 0 rgba(240,207,90,0); }
  30% { transform: translateY(-5px); box-shadow: 0 0 60px rgba(240,207,90,0.4); border-color: rgba(240,207,90,0.8); }
  100% { transform: translateY(0); box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(240,207,90,0.05); border-color: rgba(240,207,90,0.3); }
}
@keyframes panelActivateAbo {
  0% { transform: translateY(10px); box-shadow: 0 0 0 rgba(142,245,210,0); }
  30% { transform: translateY(-5px); box-shadow: 0 0 60px rgba(142,245,210,0.4); border-color: rgba(142,245,210,0.8); }
  100% { transform: translateY(0); box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(142,245,210,0.05); border-color: rgba(142,245,210,0.3); }
}

.preview-img-wrapper {
  position: relative;
  cursor: zoom-in;
  flex-shrink: 0;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
}
.preview-shard-glow {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.1) 60%, transparent 100%);
  z-index: 2; pointer-events: none; opacity: 0; transition: opacity 0.4s ease;
}
.preview-img-wrapper::after {
  content: ''; position: absolute; inset: -2px; border-radius: 18px;
  background: linear-gradient(45deg, #F0CF5A, transparent, #F0CF5A);
  z-index: 1; opacity: 0; transition: opacity 0.4s ease; pointer-events: none; mix-blend-mode: overlay;
}
body.legacy-mode-active .preview-img-wrapper::after {
  background: linear-gradient(45deg, #8EF5D2, transparent, #8EF5D2);
}
.preview-img-wrapper:hover {
  transform: translateY(-8px) scale(1.08);
  box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(240,207,90,0.4);
  border-color: rgba(240,207,90,0.8);
  z-index: 10;
}
body.legacy-mode-active .preview-img-wrapper:hover {
  box-shadow: 0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(142,245,210,0.4);
  border-color: rgba(142,245,210,0.8);
}
.preview-img-wrapper:hover .preview-shard-glow,
.preview-img-wrapper:hover::after { opacity: 1; }

.preview-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.preview-img-wrapper:hover .preview-img {
  transform: scale(1.1);
}

.preview-zoom-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #FFF;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 3;
}
.preview-zoom-overlay span {
  font-size: 0.9rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0,0,0,0.8);
}
.preview-img-wrapper:hover .preview-zoom-overlay { opacity: 1; }

.preview-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
.preview-badge {
  font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; color: #F0CF5A; margin-bottom: 0.4rem;
}
body.legacy-mode-active .preview-badge { color: #8EF5D2; }
.preview-info h4 {
  font-size: 1.4rem; font-weight: 700; color: #FFF; margin: 0 0 0.4rem; text-shadow: 0 0 10px rgba(255,255,255,0.2);
}
.preview-value {
  font-size: 1.15rem; font-weight: 600; color: #F0CF5A; margin: 0 0 0.4rem;
}
body.legacy-mode-active .preview-value { color: #8EF5D2; }
.preview-disclaimer {
  font-size: 0.85rem; color: rgba(255,255,255,0.5); margin: 0; line-height: 1.4;
}

@media (max-width: 768px) {
  .dynamic-preview-panel { flex-direction: column; text-align: center; gap: 1rem; padding: 1.5rem; }
  .preview-info { align-items: center; text-align: center; }
}

/* ══════════════════════════════════════
   CONVERSION MODAL OVERLAY (PRIZES)
   ══════════════════════════════════════ */
.conversion-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(10, 5, 20, 0.95);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.conversion-modal-content {
  position: relative;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(30,20,50,0.9), rgba(15,10,25,0.95));
  border: 1px solid rgba(212,175,55,0.2);
  border-radius: 24px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.8), inset 0 0 40px rgba(212,175,55,0.05);
  display: flex;
  flex-direction: column;
}
.modal-close {
  position: absolute;
  top: 20px; right: 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  width: 44px; height: 44px;
  border-radius: 50%;
  font-size: 1.8rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10001;
}
.modal-close:hover {
  background: rgba(212,175,55,0.2);
  color: #D4AF37;
  transform: scale(1.1) rotate(90deg);
}
.modal-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  min-height: 500px;
}
.modal-img-col {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.modal-large-img {
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0.9;
}
.modal-img-col::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 100px;
  background: linear-gradient(to left, rgba(30,20,50,0.9), transparent);
}
.modal-text-col {
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal-badge {
  display: inline-block; font-size: 0.75rem; font-weight: 800; letter-spacing: 2px;
  color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.2);
  padding: 0.3rem 0.8rem; border-radius: 8px; margin-bottom: 1.5rem; width: fit-content;
}
.modal-title {
  color: #F7F1FF; font-size: 2.2rem; font-weight: 800; margin: 0 0 0.5rem;
  text-shadow: 0 0 20px rgba(240,207,90,0.3);
}
.modal-subline { color: #D4AF37; font-size: 1.1rem; font-weight: 600; margin: 0 0 2rem; }
.modal-value-box {
  background: rgba(240,207,90,0.05);
  border: 1px solid rgba(240,207,90,0.2);
  border-radius: 12px; padding: 1rem 1.5rem; margin-bottom: 1.5rem;
}
.val-amount { display: block; font-size: 1.4rem; font-weight: 800; color: #F0CF5A; }
.val-label { display: block; font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 0.2rem; }
.modal-disclaimer {
  font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.5; margin-bottom: 2.5rem;
}
.modal-actions {
  display: flex; flex-direction: column; gap: 1rem;
}
.modal-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 1rem; border-radius: 12px; transition: all 0.3s ease; cursor: pointer;
  text-align: center; border: 1px solid transparent; width: 100%;
}
.btn-single {
  background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(180,138,27,0.1));
  border-color: rgba(212,175,55,0.4);
}
.btn-single:hover {
  background: linear-gradient(135deg, rgba(212,175,55,0.3), rgba(180,138,27,0.2));
  transform: translateY(-2px); box-shadow: 0 10px 20px rgba(212,175,55,0.2);
}
.btn-single .btn-text { color: #F0CF5A; font-weight: 800; font-size: 1.1rem; }
.btn-single .btn-subtext { color: rgba(240,207,90,0.6); font-size: 0.8rem; margin-top: 0.2rem; }

.btn-abo {
  background: linear-gradient(135deg, rgba(142,245,210,0.15), rgba(30,100,150,0.2));
  border-color: rgba(142,245,210,0.4);
}
.btn-abo:hover {
  background: linear-gradient(135deg, rgba(142,245,210,0.25), rgba(30,100,150,0.3));
  transform: translateY(-2px); box-shadow: 0 10px 20px rgba(142,245,210,0.2);
}
.btn-abo .btn-text { color: #8EF5D2; font-weight: 800; font-size: 1.1rem; }
.btn-abo .btn-subtext { color: rgba(142,245,210,0.6); font-size: 0.8rem; margin-top: 0.2rem; }

@media (max-width: 900px) {
  .modal-grid { grid-template-columns: 1fr; grid-template-rows: auto auto; }
  .modal-img-col::after {
    top: auto; right: 0; bottom: 0; left: 0; width: 100%; height: 100px;
    background: linear-gradient(to top, rgba(30,20,50,0.9), transparent);
  }
  .modal-large-img { max-height: 40vh; }
  .modal-text-col { padding: 2rem 1.5rem; }
  .modal-title { font-size: 1.8rem; }
}

/* UVP Explainer */
.uvp-explainer-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  max-width: 800px;
  margin: 1.5rem auto 0;
  text-align: left;
}
.uvp-icon { color: rgba(255,255,255,0.5); flex-shrink: 0; }
.uvp-text { color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.4; }
.uvp-text strong { color: #FFF; font-weight: 600; margin-right: 5px; }

</style>

<style>
/* ══════════════════════════════════════
   GLOBAL LEGACY MODE OVERRIDES (Footer, Hero, FAQ)
   ══════════════════════════════════════ */
body.legacy-mode-active .site-footer {
  border-top-color: rgba(142,245,210,0.2) !important;
  background: #0a1115 !important;
  transition: all 0.6s ease;
}
body.legacy-mode-active .footer-crown svg {
  fill: #8EF5D2 !important;
  filter: drop-shadow(0 0 60px rgba(142,245,210,0.25)) !important;
  transition: all 0.6s ease;
}
body.legacy-mode-active .footer-nav h4,
body.legacy-mode-active .footer-tagline {
  color: #8EF5D2 !important;
  transition: color 0.6s ease;
}
body.legacy-mode-active .footer-nav ul a:hover {
  color: #8EF5D2 !important;
}
body.legacy-mode-active .footer-nav ul a::after {
  background: linear-gradient(90deg, #8EF5D2, #5CE1C6, #8EF5D2) !important;
}
body.legacy-mode-active .social-icon:hover {
  background: rgba(142,245,210,0.15) !important;
  color: #8EF5D2 !important;
  border-color: #8EF5D2 !important;
}

/* Page Background Overrides */
body.legacy-mode-active .page-base-bg {
  background: #0b1115 !important;
  transition: background 0.6s ease;
}
body.legacy-mode-active .water-overlay {
  background: radial-gradient(ellipse at top center, rgba(142,245,210,0.05) 0%, rgba(5,15,20,0.9) 100%) !important;
  transition: all 0.6s ease;
}

/* Hero Overrides */
body.legacy-mode-active .hero-tag {
  color: #8EF5D2 !important; text-shadow: 0 0 25px rgba(142,245,210,0.6) !important;
}
body.legacy-mode-active .g2 { background: rgba(142,245,210,0.15) !important; }

/* FAQ Overrides */
body.legacy-mode-active .faq-tag { color: #8EF5D2 !important; }
body.legacy-mode-active .btn-outline { border-color: rgba(142,245,210,0.4) !important; color: #8EF5D2 !important; }
body.legacy-mode-active .btn-outline:hover { background: rgba(142,245,210,0.1) !important; box-shadow: 0 0 20px rgba(142,245,210,0.2) !important; }
body.legacy-mode-active .btn-primary { background: linear-gradient(135deg, #8EF5D2, #5CE1C6) !important; color: #000 !important; box-shadow: 0 10px 20px rgba(142,245,210,0.3) !important; }
body.legacy-mode-active .btn-primary:hover { box-shadow: 0 15px 30px rgba(142,245,210,0.5) !important; }
body.legacy-mode-active .faq-item.open { 
  background: rgba(15, 30, 45, 0.8) !important;
  border-color: rgba(142,245,210,0.5) !important; 
  box-shadow: 0 25px 50px rgba(0,0,0,0.7), inset 0 0 40px rgba(142,245,210,0.1), 0 0 20px rgba(142,245,210,0.15) !important; 
}
body.legacy-mode-active .faq-item.open .faq-chev { color: #8EF5D2 !important; filter: drop-shadow(0 0 8px rgba(142,245,210,0.5)) !important; }
</style>