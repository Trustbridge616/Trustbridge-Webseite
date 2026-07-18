import fs from 'fs';

const oldContent = fs.readFileSync('Prizes_old.vue', 'utf8');

// Extract the <style scoped> block from old content
const styleMatch = oldContent.match(/<style scoped>[\s\S]*<\/style>/);
const originalStyle = styleMatch ? styleMatch[0] : '';

const newTemplate = `<template>
  <AppLayout>
    <SeoHead
      title="Warenbox bestellen – TrustBox Royale"
      description="Wähle deine TrustBox. Starte einmalig und sichere dir Vorabzugang zu besonderen Angeboten."
      keywords="TrustBox bestellen, Überraschungsbox kaufen, Retourenware Box"
      canonical="https://trustboxroyale.de/prizes"
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
        <span class="hero-tag">TRUSTBOX ROYALE</span>
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
                :class="{ 'abo-active': activePayment === pm.id }"
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

            <div class="level-grid" style="grid-template-columns: repeat(5, 1fr);">
              <div
                v-for="qty in 5" :key="'qty-'+qty"
                class="crystal-card"
                :class="{ 'abo-active': activeQuantity === qty }"
                @click="selectQuantity(qty)"
              >
                <div class="cc-glass"></div>
                <div class="cc-refraction"></div>
                <div class="cc-aura"></div>
                <div class="cc-active-glow"></div>

                <div class="cc-box-stage">
                  <div class="cc-stage-ring"></div>
                  <div class="cc-box-icon" style="display:flex; align-items:center; justify-content:center; color: #8EF5D2;">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                </div>

                <div class="cc-body">
                  <span class="cc-price" style="font-size: 3rem;">{{ qty }}</span>
                  <span class="cc-name">{{ qty === 1 ? 'Box' : 'Boxen' }}</span>
                </div>
              </div>
            </div>

            <!-- Profit & Value Display Container -->
            <div style="margin-top: 3rem; background: rgba(20, 10, 40, 0.8); border: 1px solid rgba(142,245,210,0.5); border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; align-items: center; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
              
              <div style="display: flex; width: 100%; justify-content: space-around; flex-wrap: wrap; gap: 2rem; text-align: center;">
                <div>
                  <h4 style="color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase;">Gesamtpreis</h4>
                  <div style="font-size: 2.5rem; color: #F7F1FF; font-weight: 800;">{{ formatPrice(totalPrice) }} €</div>
                </div>
                <div>
                  <h4 style="color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase;">Kalkulierter Warenwert</h4>
                  <div style="font-size: 2.5rem; color: #8EF5D2; font-weight: 800; text-shadow: 0 0 20px rgba(142,245,210,0.4);">~ {{ formatPrice(totalValue) }} €</div>
                </div>
                <div>
                  <h4 style="color: #D9CFE8; margin: 0 0 0.5rem; font-size: 1.1rem; text-transform: uppercase;">Möglicher Gewinn</h4>
                  <div style="font-size: 2.5rem; color: #F0CF5A; font-weight: 800; text-shadow: 0 0 20px rgba(240,207,90,0.4);">+ {{ formatPrice(totalProfit) }} €</div>
                </div>
              </div>

            </div>
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
          <span class="vision-tag">DIE VISION HINTER TRUSTBOX ROYALE</span>
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
                title="TrustBox Royale Vision" 
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
`;

fs.writeFileSync('web/resources/js/Pages/Prizes.vue', newTemplate + '\n' + originalStyle);
console.log('Successfully rewrote Prizes.vue with original CSS.');
