<template>
  <section class="trustbox-slider-section" id="packages">
    <div class="particles-canvas-wrapper">
      <canvas ref="particleCanvas" class="particle-canvas"></canvas>
    </div>

    <!-- Mystischer Hintergrund analog zum Hero-Bereich -->
    <div class="mystic-background">
      <div class="spotlight spotlight-left"></div>
      <div class="spotlight spotlight-center"></div>
      <div class="spotlight spotlight-right"></div>
      
      <div class="panthers-container slider-panthers">
        <div class="ambient-glow glow-left"></div>
        <div class="ambient-glow glow-right"></div>

        <div class="blurry-ring-wrapper wrapper-left">
          <div class="blurry-ring ring-left outer"></div>
          <div class="blurry-ring ring-left inner"></div>
        </div>
        <div class="blurry-ring-wrapper wrapper-right">
          <div class="blurry-ring ring-right outer"></div>
          <div class="blurry-ring ring-right inner"></div>
        </div>

        <img src="/panther-links-nobg.png" class="panther panther-left" alt="Panther Links" />
        <img src="/panther-rechts-nobg.png" class="panther panther-right" alt="Panther Rechts" />
      </div>
    </div>

    <div class="home-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" ref="containerRef">
      <!-- Section Header -->
      <div class="slider-header">
        <span class="steps-section-badge">Unsere Boxen</span>
        <h2 class="steps-section-title">Finde deine passende TrustBox</h2>
        <p class="steps-section-subtitle">Wähle dein Box-Level. Je höher dein Level, desto mehr Ware, mehr Möglichkeiten und stärkerer Legacy-Start.</p>
      </div>

      <div class="slider-layout">
        
        <!-- Left Column: Visual Presentation -->
        <div class="slider-visual" :style="{ '--mx': mouseX, '--my': mouseY }">
          <div class="visual-glow" :class="[`glow-level-${activeSlide}`]"></div>
          
          <div class="box-presentation" :class="{ 'locked': activeData.locked }">
            <!-- Reale Beispielbilder-Darstellung anstatt abstrakter Platzhalter -->
            <div v-if="!activeData.locked" class="box-example-preview">
              <transition name="fade-slide" mode="out-in">
                <img 
                  :key="activeData.level" 
                  :src="`/box_${activeData.level}_example.png`" 
                  :alt="`Beispiel Box Level ${activeData.level}`" 
                  class="example-box-img" 
                  style="cursor: pointer;"
                  @click="lightboxOpen = true"
                />
              </transition>
              <div class="example-disclaimer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span>Beispiel-Inhalt – Inhalt variiert nach Bestand & Verfügbarkeit</span>
              </div>
            </div>

            <!-- Coming Soon Darstellung -->
            <div v-else class="locked-presentation">
              <svg class="lock-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div class="mystery-fog"></div>
            </div>
          </div>
        </div>

        <!-- Right Column: Level Selection & Content -->
        <div class="slider-content-wrapper">
          
          <!-- Stepper / Level Selector -->
          <div class="level-stepper-container">
            <button class="nav-arrow prev-arrow" @click="prevSlide" :disabled="activeSlide === 0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <div class="level-stepper" ref="stepperRef">
              <div 
                v-for="(slide, index) in slides" 
                :key="index"
                class="step-item"
                :class="{ 'active': activeSlide === index, 'locked': slide.locked }"
                @click="goToSlide(index)"
              >
                <div class="step-indicator">
                  <span v-if="!slide.locked">{{ slide.level }}</span>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <span class="step-label">{{ slide.shortLabel || `Level ${slide.level}` }}</span>
              </div>
            </div>

            <button class="nav-arrow next-arrow" @click="nextSlide" :disabled="activeSlide === slides.length - 1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          <!-- Active Content Display -->
          <div class="active-content-card" :class="[`card-level-${activeData.level}`, { 'card-locked': activeData.locked }]">
            <transition name="fade-slide" mode="out-in">
              <div :key="activeSlide" class="content-inner">
                <div class="card-header">
                  <span class="level-badge">{{ activeData.badge }}</span>
                  <h3 class="level-title">{{ activeData.title }}</h3>
                  <div class="level-price" v-if="activeData.price">{{ activeData.price }}</div>
                </div>

                <p class="level-desc">{{ activeData.desc }}</p>

                <div class="level-features" v-if="activeData.features">
                  <div class="feature-item" v-for="(feat, i) in activeData.features" :key="i">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{{ feat }}</span>
                  </div>
                </div>

                <div class="cta-group" v-if="!activeData.locked">
                  <div class="cta-buttons">
                    <Link :href="`/prizes?level=${activeData.level}&type=single`" @mouseenter="showStamp('single', activeData.level)" class="level-cta primary-cta">
                      Einmalig bestellen
                    </Link>
                    <Link :href="`/prizes?level=${activeData.level}&type=abo`" @mouseenter="showStamp('abo', activeData.level)" class="level-cta abo-cta">
                      Legacy-Abo starten
                    </Link>
                  </div>
                  
                  <!-- Legacy-Infos ausgelagert -->
                </div>
                <div v-else class="level-cta locked-cta">
                  {{ activeData.button }}
                </div>
              </div>
            </transition>
          </div>

        </div>
      </div>

      </div>

      <!-- Panther Feedback Toast -->
    <transition name="toast-slide">
      <div class="panther-toast" v-if="pantherVisible">
        <div class="panther-speech-bubble">
          {{ pantherMessage }}
        </div>
        <img src="/panther-mitte-nobg.png" class="toast-panther-img" alt="Panther Guide" />
      </div>
    </transition>

    <!-- Conversion Modal -->
    <transition name="fade">
      <div v-if="lightboxOpen" class="conversion-modal-overlay" @click="lightboxOpen = false">
        <div class="conversion-modal-content" @click.stop>
          <button class="modal-close" @click="lightboxOpen = false">×</button>
          
          <div class="modal-grid">
            <div class="modal-img-col">
              <img :src="`/box_${activeData.level}_example.png`" class="modal-large-img" :alt="`Beispiel Box Level ${activeData.level}`" />
            </div>
            <div class="modal-text-col">
              <span class="modal-badge">BEISPIEL-INHALT</span>
              <h3 class="modal-title">Beispielbox Level {{ activeData.level }}</h3>
              <p class="modal-subline">So könnte deine TrustBox ungefähr aussehen.</p>
              
              <div class="modal-value-box">
                <span class="val-amount">ca. {{ activeData.value }} €</span>
                <span class="val-label">kalkulierter Warenwert</span>
              </div>
              
              <p class="modal-disclaimer">
                Diese Beispielbox zeigt eine mögliche Zusammenstellung. Die genaue Ware variiert je nach Bestand, Mix und Verfügbarkeit.
              </p>
              
              <div class="modal-actions">
                <Link :href="`/prizes?level=${activeData.level}&type=single`" class="modal-btn btn-single">
                  <span class="btn-text">Einmalig bestellen</span>
                  <span class="btn-subtext">Ohne Bindung starten</span>
                </Link>
                <Link :href="`/prizes?level=${activeData.level}&type=abo`" class="modal-btn btn-abo">
                  <span class="btn-text">Legacy-Abo starten</span>
                  <span class="btn-subtext">Punkte & Vorabzugang sichern</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { router, Link } from '@inertiajs/vue3';

const props = defineProps({
  initialLevel: { type: Number, default: 3 }
});

const pantherMessage = ref('');
const pantherVisible = ref(false);
const lightboxOpen = ref(false);
let pantherTimeout = null;

const showStamp = (type, level) => {
  let messages = [];
  if (type === 'single') {
     messages = ['Gute Wahl. Sauberer Einstieg.', 'Schnapp dir deine Box.', 'Dein Warenpaket wartet.'];
  } else if (type === 'abo') {
     messages = ['Smart. Deal-Vorsprung sichern.', 'Sichere dir Legacy-Vorteile.', `Gute Idee! Punkte-Faktor x${level} nutzen.`];
  }
  
  if(messages.length > 0) {
    pantherMessage.value = messages[Math.floor(Math.random() * messages.length)];
    pantherVisible.value = true;
    
    if(pantherTimeout) clearTimeout(pantherTimeout);
    pantherTimeout = setTimeout(() => {
      pantherVisible.value = false;
    }, 3000);
  }
};

const slides = [
  {
    level: 1,
    title: 'TrustBox Level 1',
    price: '111 €',
    value: '220–330',
    badge: 'Legacy inklusive',
    desc: 'Der einfache Einstieg in Trustbridge. Ideal, um dein erstes Paket zu testen und Teil der Startphase zu werden.',
    features: ['1 Warenpaket', 'Garantierter kalkulierter Mehrwert', 'Legacy-Status inklusive', 'Ideal zum Kennenlernen'],
    button: 'Level 1 sichern',
    locked: false,
  },
  {
    level: 2,
    title: 'TrustBox Level 2',
    price: '222 €',
    value: '440–660',
    badge: 'Mehr Ware',
    desc: 'Mehr Warenumfang, mehr Möglichkeiten und ein stärkerer Start als mit einer einzelnen Box.',
    features: ['2 Warenpakete', 'Mehr Ware zum Nutzen oder Weitergeben', 'Legacy-Status inklusive', 'Stärkerer Gesamtvorteil'],
    button: 'Level 2 sichern',
    locked: false,
  },
  {
    level: 3,
    title: 'TrustBox Level 3',
    price: '333 €',
    value: '660–990',
    badge: 'Beliebt',
    desc: 'Die beliebte Mitte: mehr Umfang, mehr Chancen und ein besonders starker Einstieg in die TrustBox-Welt.',
    features: ['3 Warenpakete', 'Beliebte Auswahl', 'Mehr Möglichkeiten', 'Legacy-Status inklusive'],
    button: 'Level 3 sichern',
    locked: false,
  },
  {
    level: 4,
    title: 'TrustBox Level 4',
    price: '444 €',
    value: '880–1.320',
    badge: 'Power-Level',
    desc: 'Für alle, die direkt größer starten möchten. Mehr Pakete, mehr Warenumfang und ein stärkeres Legacy-Gefühl.',
    features: ['4 Warenpakete', 'Priorisierte Zusammenstellung nach Verfügbarkeit', 'Mehr Warenumfang', 'Legacy Plus Vorteil'],
    button: 'Level 4 sichern',
    locked: false,
  },
  {
    level: 5,
    title: 'TrustBox Level 5',
    price: '555 €',
    value: '1.100–1.650',
    badge: 'Maximaler Startvorteil',
    desc: 'Der stärkste Start in Trustbridge. Maximale Menge, stärkster Legacy-Start und besonderer Surprise-Faktor.',
    features: ['5 Warenpakete', 'Maximaler Warenumfang', 'Extra Surprise Bonus', 'Stärkster Legacy-Start'],
    button: 'Level 5 sichern',
    locked: false,
  },
  {
    shortLabel: 'Saison',
    title: 'Saisonboxen',
    badge: 'Coming Soon',
    desc: 'Sommerware, Winterware, Herbstware oder Frühjahrsware – passend zur Saison und nach Verfügbarkeit.',
    button: 'Bald verfügbar',
    locked: true,
  },
  {
    shortLabel: 'Mystery',
    title: 'Mysteryboxen',
    badge: 'Coming Soon',
    desc: 'Erlebe den puren Nervenkitzel: Völlig unberechenbare Warenmischungen mit besonderem Jackpot-Potenzial.',
    button: 'Bald verfügbar',
    locked: true,
  },
  {
    shortLabel: 'Paletten',
    title: 'Palettenware',
    badge: 'Coming Soon',
    desc: 'Größere Warenmengen, Saisonpaletten und Sonderposten für Kunden, die mehr bewegen möchten.',
    button: 'Bald verfügbar',
    locked: true,
  },
  {
    shortLabel: 'Drops',
    title: 'Special Drops',
    badge: 'Coming Soon',
    desc: 'Limitierte Sonderboxen, besondere Warenaktionen und exklusive TrustBox-Angebote.',
    button: 'Bald verfügbar',
    locked: true,
  }
];

const activeSlide = ref(2);
const stepperRef = ref(null);
const containerRef = ref(null);
const particleCanvas = ref(null);

const activeData = computed(() => slides[activeSlide.value]);

const goToSlide = (index) => {
  activeSlide.value = index;
  scrollToActive();
};

const nextSlide = () => {
  if (activeSlide.value < slides.length - 1) {
    activeSlide.value++;
    scrollToActive();
  }
};

const prevSlide = () => {
  if (activeSlide.value > 0) {
    activeSlide.value--;
    scrollToActive();
  }
};

const scrollToActive = () => {
  if (!stepperRef.value) return;
  const container = stepperRef.value;
  const activeEl = container.children[activeSlide.value];
  if (activeEl) {
    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    const scrollPaddingRight = 80;

    if (elRect.left < containerRect.left) {
      container.scrollBy({ left: elRect.left - containerRect.left - 20, behavior: 'smooth' });
    } else if (elRect.right + scrollPaddingRight > containerRect.right) {
      container.scrollBy({ left: elRect.right + scrollPaddingRight - containerRect.right, behavior: 'smooth' });
    }
  }
};

const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e) => {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  mouseX.value = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouseY.value = ((e.clientY - rect.top) / rect.height) * 2 - 1;
};

const handleMouseLeave = () => {
  mouseX.value = 0;
  mouseY.value = 0;
};

let particles = [];
let animationFrame;
let ctx;
let cw, ch;
let targetX = -100;
let targetY = -100;
let currentX = -100;
let currentY = -100;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.color = `rgba(212, 175, 55, `;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.life + ')';
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
  }
}

const updateCanvasSize = () => {
  if (!particleCanvas.value) return;
  const rect = particleCanvas.value.parentElement.getBoundingClientRect();
  cw = rect.width;
  ch = rect.height;
  particleCanvas.value.width = cw;
  particleCanvas.value.height = ch;
};

const trackMouseForCanvas = (e) => {
  if (!particleCanvas.value) return;
  const rect = particleCanvas.value.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
};

const animateParticles = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, cw, ch);

  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  if (targetX > 0 && targetY > 0 && targetX < cw && targetY < ch) {
    if (Math.random() > 0.4) {
      particles.push(new Particle(currentX, currentY));
    }
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  animationFrame = requestAnimationFrame(animateParticles);
};

onMounted(() => {
  if (particleCanvas.value) {
    ctx = particleCanvas.value.getContext('2d');
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const wrapper = particleCanvas.value.parentElement;
    wrapper.addEventListener('mousemove', trackMouseForCanvas);
    wrapper.addEventListener('mouseleave', () => { targetX = -100; targetY = -100; });
    
    animateParticles();
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCanvasSize);
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.trustbox-slider-section {
  position: relative;
  background: linear-gradient(180deg, rgba(240, 236, 250, 0) 0%, rgba(30, 11, 59, 0.3) 10%, rgba(30, 11, 59, 0.8) 25%, #1e0b3b 60%, #120524 100%);
  padding: 120px 0 150px 0;
  overflow: hidden;
  color: #fff;
  font-family: "Century Gothic", sans-serif;
  margin-top: -80px;
}

.trustbox-slider-section::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 120vw; height: 800px;
  background: radial-gradient(ellipse at center, rgba(100, 50, 200, 0.15) 0%, transparent 70%);
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;
}

.trustbox-slider-section::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 L110 96 L10 96 Z' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='67' r='29' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='67' r='57' fill='none' stroke='rgba(255,255,255,0.02)' stroke-width='0.5'/%3E%3Ccircle cx='60' cy='10' r='2' fill='rgba(212,175,55,0.2)'/%3E%3Ccircle cx='110' cy='96' r='2' fill='rgba(212,175,55,0.2)'/%3E%3Ccircle cx='10' cy='96' r='2' fill='rgba(212,175,55,0.2)'/%3E%3C/svg%3E");
  background-size: 240px 240px;
  background-position: center;
  opacity: 0.6;
  z-index: 0;
  pointer-events: none;
}

.particles-canvas-wrapper {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 10;
}
.particle-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.home-container {
  position: relative;
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 20;
}

.slider-header {
  text-align: center;
  margin-bottom: 60px;
}
.steps-section-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.1);
  color: #D4AF37;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 15px;
  border: 1px solid rgba(212, 175, 55, 0.3);
}
.steps-section-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 3.8rem;
  margin: 0 0 15px 0;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -1px;
  
  background: linear-gradient(to right, #D4AF37, #FFF3B0, #D4AF37, #B48A1B, #D4AF37);
  background-size: 300% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  animation: title-shine 8s linear infinite;
  filter: drop-shadow(0 4px 10px rgba(212, 175, 55, 0.3));
}

@keyframes title-shine {
  to { background-position: 200% center; }
}

.steps-section-subtitle {
  color: #c4b5fd;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.slider-layout {
  display: flex;
  gap: 60px;
  align-items: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 20;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.slider-visual {
  flex: 1;
  position: relative;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
  transform: perspective(1000px) rotateX(calc(var(--my) * -5deg)) rotateY(calc(var(--mx) * 5deg));
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  transform-style: preserve-3d;
}

.visual-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  transition: all 0.8s ease;
  opacity: 0.5;
}

.glow-level-0 { background: rgba(139, 92, 246, 0.5); width: 40%; height: 40%; }
.glow-level-1 { background: rgba(167, 139, 250, 0.6); width: 50%; height: 50%; }
.glow-level-2 { background: rgba(212, 175, 55, 0.5); width: 60%; height: 60%; }
.glow-level-3 { background: rgba(236, 72, 153, 0.6); width: 70%; height: 70%; }
.glow-level-4 { background: radial-gradient(circle, rgba(212, 175, 55, 0.8), rgba(236, 72, 153, 0.4)); width: 80%; height: 80%; opacity: 0.8; }

.box-presentation {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(30px);
}

.locked-presentation {
  text-align: center;
  color: rgba(255,255,255,0.4);
  position: relative;
}
.lock-icon {
  margin-bottom: 20px;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
}
.mystery-fog {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 200px; height: 200px;
  background: radial-gradient(circle, rgba(255,255,255,0.05), transparent);
  filter: blur(20px);
  animation: fog-pulse 4s infinite alternate;
}
@keyframes fog-pulse {
  from { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  to { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
}

.box-example-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
}

.example-box-img {
  width: 90%;
  max-width: 360px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.15);
  border: 1px solid rgba(212,175,55,0.3);
  object-fit: cover;
  transition: transform 0.3s ease;
}
.example-box-img:hover {
  transform: scale(1.05);
  box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.3);
}

.example-disclaimer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  text-align: center;
  background: rgba(0,0,0,0.4);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
  max-width: 90%;
  backdrop-filter: blur(10px);
}

.slider-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 600px;
}

.level-stepper-container {
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 10px;
  border-radius: 16px;
}

.nav-arrow {
  background: rgba(255,255,255,0.05);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.nav-arrow:hover:not(:disabled) {
  background: rgba(212, 175, 55, 0.2);
  color: #D4AF37;
}
.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.level-stepper {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 15px 10px;
}
.level-stepper::-webkit-scrollbar {
  display: none;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s ease;
  min-width: 70px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.step-item:hover {
  opacity: 1;
  transform: translateY(-3px);
}
.step-item.active {
  opacity: 1;
  transform: translateY(-8px);
}
.step-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  border: 2px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
  transition: all 0.3s ease;
  position: relative;
}
.step-indicator::before {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: linear-gradient(45deg, #7c3aed, #F0CF5A, #6366f1, #7c3aed);
  background-size: 300% 300%;
  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.4s ease;
  z-index: -1;
}
.step-item:hover .step-indicator::before {
  opacity: 0.5;
  animation: auraSpinSlider 3s linear infinite;
}
.step-item.active .step-indicator::before {
  opacity: 0.9;
  animation: auraSpinSlider 3s linear infinite;
}
@keyframes auraSpinSlider {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.step-item.active .step-indicator {
  background: rgba(240, 207, 90, 0.15);
  border-color: #F0CF5A;
  color: #F0CF5A;
  box-shadow: 0 0 25px rgba(240, 207, 90, 0.5);
  transform: scale(1.2);
}
.step-item.locked .step-indicator {
  border-color: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.4);
}
.step-label {
  font-size: 0.8rem;
  white-space: nowrap;
  color: #a78bfa;
}
.step-item.active .step-label {
  color: #D4AF37;
  font-weight: bold;
}

.active-content-card {
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  min-height: 480px;
  height: auto;
  box-sizing: border-box;
}

.active-content-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, #D4AF37, transparent);
  opacity: 0;
  transition: opacity 0.5s;
}
.card-level-5::before { opacity: 1; }

.card-locked {
  background: rgba(0,0,0,0.3);
  border-color: rgba(255,255,255,0.03);
}

.content-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  margin-bottom: 20px;
}
.level-badge {
  display: inline-block;
  background: linear-gradient(135deg, #D4AF37 0%, #C99A22 100%);
  color: #0b021d;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(212,175,55,0.2);
}
.card-locked .level-badge {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  box-shadow: none;
}
.level-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 5px 0;
  color: white;
}

.panther-toast {
  position: fixed; bottom: 30px; right: 30px; z-index: 9999;
  display: flex; align-items: flex-end; gap: 1rem; pointer-events: none;
}
.panther-speech-bubble {
  background: rgba(20, 10, 40, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(240,207,90,0.4);
  padding: 1rem 1.5rem; border-radius: 20px; border-bottom-right-radius: 4px;
  color: #F7F1FF; font-size: 1.1rem; font-weight: 700;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(124,58,237,0.4);
  margin-bottom: 20px;
}
.toast-panther-img {
  width: 140px; filter: drop-shadow(0 0 20px rgba(124,58,237,0.5));
}
.toast-slide-enter-active, .toast-slide-leave-active { transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateY(50px) translateX(20px); }

/* ══════════════════════════════════════
   CONVERSION MODAL OVERLAY
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
  padding: 1rem; border-radius: 12px; text-decoration: none; transition: all 0.3s ease;
  text-align: center; border: 1px solid transparent;
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

.level-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #D4AF37;
}

.level-desc {
  font-size: 1.05rem;
  color: #c4b5fd;
  line-height: 1.6;
  margin-bottom: 25px;
}

.level-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
  flex: 1;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #e2e8f0;
}

.cta-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
}

.cta-buttons {
  display: flex;
  gap: 15px;
  width: 100%;
}

.level-cta {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-weight: 800;
  padding: 16px 20px;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-family: 'Century Gothic', system-ui, sans-serif;
}

.primary-cta {
  background: linear-gradient(135deg, #D4AF37 0%, #C99A22 100%);
  color: #1a1a1a;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}
.primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(236, 72, 153, 0.4); /* Magenta glow */
  background: linear-gradient(135deg, #e3c153 0%, #ec4899 100%); /* Magenta CTA-Energie */
  color: #fff;
}

.abo-cta {
  background: linear-gradient(135deg, #e6fcf5 0%, #bbf7d0 100%);
  color: #064e3b;
  box-shadow: 0 10px 20px rgba(167, 243, 208, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.abo-cta::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.abo-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(110, 231, 183, 0.4), inset 0 2px 10px rgba(255, 255, 255, 1);
}
.abo-cta:hover::after {
  opacity: 1;
}

.cta-microcopy {
  font-size: 0.85rem;
  color: #c4b5fd;
  line-height: 1.4;
  margin-top: 4px;
}

/* Accordion */
.legacy-info-accordion {
  margin-top: 5px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
}

.legacy-accordion-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: transparent;
  border: none;
  color: #D4AF37;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background 0.3s;
}
.legacy-accordion-trigger:hover {
  background: rgba(255,255,255,0.05);
}
.legacy-accordion-trigger .chevron {
  transition: transform 0.3s;
}
.legacy-accordion-trigger.is-open .chevron {
  transform: rotate(180deg);
}

.legacy-accordion-content {
  padding: 0 15px 15px 15px;
  font-size: 0.85rem;
  color: #e2e8f0;
  line-height: 1.5;
}
.legacy-accordion-content ul {
  margin: 0;
  padding-left: 20px;
}
.legacy-accordion-content li {
  margin-bottom: 6px;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 300px;
  opacity: 1;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
}

.cta-subtitle {
  display: none;
}

.legacy-link {
  display: none;
}

.locked-cta {
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.4);
  box-shadow: none;
  cursor: not-allowed;
  align-self: flex-start;
}
.locked-cta:hover {
  transform: none;
  box-shadow: none;
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}


/* --- Footer: Panther & Aufbau --- */
.slider-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 20px;
}

.aufbau-card, .legacy-badge-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: background 0.3s ease;
}
.aufbau-card:hover, .legacy-badge-card:hover {
  background: rgba(255,255,255,0.05);
}

.aufbau-icon {
  background: rgba(212, 175, 55, 0.1);
  padding: 15px;
  border-radius: 16px;
  flex-shrink: 0;
}
.legacy-panther-small {
  width: 70px;
  height: auto;
  flex-shrink: 0;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.5));
}

.aufbau-text strong, .legacy-text strong {
  display: block;
  font-size: 1.1rem;
  color: #D4AF37;
  margin-bottom: 8px;
}
.aufbau-text p, .legacy-text p {
  margin: 0;
  font-size: 0.95rem;
  color: #a78bfa;
  line-height: 1.5;
}


/* --- Responsive --- */
@media (max-width: 992px) {
  .slider-layout {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  .slider-content-wrapper {
    display: contents; /* Erlaubt die Umordnung der Kinder im Flex-Container des Layouts */
  }
  .level-stepper-container {
    order: 1; /* Stepper ganz nach oben */
    width: 100%;
    margin-bottom: 0;
  }
  .slider-visual {
    order: 2; /* Bild in die Mitte */
    width: 100%;
    height: 320px;
  }
  .active-content-card {
    order: 3; /* Preis und Button unten */
    width: 100%;
    height: auto;
    min-height: 420px;
  }
  .slider-footer {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .trustbox-slider-section {
    padding: 80px 0 100px 0;
    margin-top: -40px;
  }
  .steps-section-title {
    font-size: 2.2rem;
  }
  .steps-section-subtitle {
    font-size: 1rem;
  }
  .active-content-card {
    padding: 25px;
    height: auto;
    min-height: 400px;
  }
  .level-title {
    font-size: 1.8rem;
  }
  .level-price {
    font-size: 1.5rem;
  }
  .level-desc {
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
  .feature-item {
    font-size: 0.9rem;
  }
  /* Swipeable Stepper */
  .level-stepper {
    scroll-snap-type: x mandatory;
    padding-bottom: 10px;
    justify-content: flex-start; /* Erlaubt seitliches Scrollen statt Quetschen */
  }
  .step-item {
    scroll-snap-align: center;
    min-width: 80px; /* Breite erzwingen damit es scrollt */
  }
  /* Abstract Box Skalierung für kleine Bildschirme */
  .box-stack {
    transform: scale(0.85);
  }
  /* Mobile Glow reduzieren für Übersichtlichkeit */
  .visual-glow {
    opacity: 0.3 !important;
  }
  .cta-buttons {
    flex-direction: column;
    gap: 10px;
  }
  .level-cta {
    width: 100%;
  }
  .cta-subtitle {
    display: none;
  }
  .legacy-link {
    display: none;
  }
}

/* =========================================
   MYSTICAL BACKGROUND ELEMENTS (HERO-STYLE)
   ========================================= */
.mystic-background {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 1; /* Unterhalb des Contents */
  overflow: hidden;
}

/* SPOTLIGHTS */
.spotlight {
  position: absolute;
  top: 0;
  width: 350px;
  height: 100%;
  pointer-events: none;
  opacity: 0.25;
  mix-blend-mode: screen;
  animation: spotlight-pulse 8s ease-in-out infinite;
}
.spotlight-left {
  left: 5%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(212,175,55,0.4) 0%, transparent 30%);
  animation-delay: 0s;
}
.spotlight-center {
  left: 50%; transform: translateX(-50%);
  background: conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0.5) 0%, transparent 30%);
  animation-delay: -3s;
}
.spotlight-right {
  right: 5%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(139,92,246,0.4) 0%, transparent 30%);
  animation-delay: -5s;
}
@keyframes spotlight-pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}

/* PANTHERS & RINGS CONTAINER */
.slider-panthers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

/* Ambient Glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;
}
.glow-left {
  left: -5%; bottom: 10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%);
  animation: pulse-glow-side 10s infinite alternate-reverse;
}
.glow-right {
  right: -5%; top: 10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(167,139,250,0.5), transparent 70%);
  animation: pulse-glow-side 14s infinite alternate;
}
@keyframes pulse-glow-side {
  0% { transform: scale(0.9); opacity: 0.3; }
  100% { transform: scale(1.1); opacity: 0.6; }
}

/* Blurry Rings */
.blurry-ring-wrapper {
  position: absolute;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper-left {
  left: -2%; top: 20%;
  width: 45vh; height: 45vh;
}
.wrapper-right {
  right: -2%; bottom: 20%;
  width: 45vh; height: 45vh;
}
.blurry-ring {
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}
.ring-left.outer {
  width: 100%; height: 100%;
  border: 10px dashed rgba(167, 139, 250, 0.3);
  filter: blur(10px);
  animation: spin-ring-outer 12s linear infinite reverse;
}
.ring-left.inner {
  width: 80%; height: 80%;
  border: 6px dotted rgba(212, 175, 55, 0.3);
  filter: blur(5px);
  animation: spin-ring-inner 9s linear infinite;
}
.ring-right.outer {
  width: 100%; height: 100%;
  border: 10px solid rgba(255, 255, 255, 0.2);
  filter: blur(10px);
  animation: spin-ring-outer 14s linear infinite;
}
.ring-right.inner {
  width: 70%; height: 70%;
  border: 6px dashed rgba(167, 139, 250, 0.2);
  filter: blur(5px);
  animation: spin-ring-inner 11s linear infinite reverse;
}

@keyframes spin-ring-outer {
  0% { transform: rotate(0deg) scale(0.95); opacity: 0.5; }
  50% { transform: rotate(180deg) scale(1.05); opacity: 0.8; }
  100% { transform: rotate(360deg) scale(0.95); opacity: 0.5; }
}
@keyframes spin-ring-inner {
  0% { transform: rotate(360deg) scale(1); opacity: 0.7; }
  50% { transform: rotate(180deg) scale(0.9); opacity: 0.4; }
  100% { transform: rotate(0deg) scale(1); opacity: 0.7; }
}

/* Panthers */
.panther {
  position: absolute;
  object-fit: contain;
  transition: transform 0.5s ease;
  z-index: 2;
  opacity: 0.6; /* Leicht transparent, damit sie elegant im Hintergrund wirken */
}
.panther-left {
  height: 55%;
  left: -8%;
  bottom: 10%;
  animation: float-3d-left 9s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
}
.panther-right {
  height: 55%;
  right: -8%;
  top: 10%;
  animation: float-3d-right 10s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.6));
}
@keyframes float-3d-left {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(-5deg) translateY(-15px) scale(1.02); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}
@keyframes float-3d-right {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(5deg) translateY(-15px) scale(1.02); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}

/* Hide background elements on smaller screens */
@media (max-width: 1300px) {
  .panther-left { left: -15%; }
  .panther-right { right: -15%; }
}
@media (max-width: 1024px) {
  .panther-left, .panther-right, .blurry-ring-wrapper { display: none; }
}

</style>
