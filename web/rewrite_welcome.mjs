import fs from "fs";

const file = "c:/Users/tisch/OneDrive/Desktop/TrustboxRoyale/web/resources/js/Pages/Welcome.vue";
let content = fs.readFileSync(file, "utf8");

const startHTML = `<div class="container hero-content">`;
const endHTML = `</script>`;

const newHTML = `      <div class="container hero-content">
        <!-- TrustBox Royale Logo / Title -->
        <div class="hero-title-wrapper">
          <div class="crown-wrapper">
            <svg class="title-crown" viewBox="0 6 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="#D4AF37"/>
            </svg>
          </div>
          <div class="brand-name">TrustBox Royale</div>
          <h1 class="hero-title">Bereit, beizutreten?</h1>
          <p class="hero-subtitle">Wähle deine TrustBox und nutze gebündelte Einkaufsvorteile.</p>
        </div>

        <!-- 3 Premium Hero Shards -->
        <div class="hero-shards-grid">
          <!-- Shard 1 -->
          <Link href="/prizes" class="hero-shard shard-gold">
            <div class="shard-glow"></div>
            <div class="shard-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="currentColor"/>
              </svg>
            </div>
            <div class="shard-content">
              <h3>Box auswählen</h3>
              <p>Wähle dein Level und starte direkt.</p>
            </div>
          </Link>

          <!-- Shard 2 -->
          <button @click="isVideoOpen = true" class="hero-shard shard-purple">
            <div class="shard-glow"></div>
            <div class="shard-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="shard-content">
              <h3>Erklärvideo ansehen</h3>
              <p>Sieh in wenigen Minuten, warum das System funktioniert.</p>
            </div>
          </button>

          <!-- Shard 3 -->
          <button @click="isHowItWorksOpen = true" class="hero-shard shard-mint">
            <div class="shard-glow"></div>
            <div class="shard-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div class="shard-content">
              <h3>So funktioniert's</h3>
              <p>Gebündelter Einkauf. Faire Boxen. Echter Spielraum.</p>
            </div>
          </button>
        </div>

        <!-- Compact Guarantee -->
        <div class="hero-guarantee-bar">
          <div class="guarantee-glow"></div>
          <svg class="guarantee-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span class="guarantee-text">Keine Schrottboxen &middot; kalkulierter Mehrwert &middot; faire Zusammenstellung</span>
          <Link href="/how-it-works" class="guarantee-link">Mehr erfahren &rarr;</Link>
        </div>
      </div>
    </div>

    <!-- ===== Modals ===== -->
    <!-- Video Modal -->
    <transition name="fade">
      <div v-if="isVideoOpen" class="hero-modal-overlay" @click="isVideoOpen = false">
        <div class="hero-modal-content video-modal" @click.stop>
          <button class="modal-close-btn" @click="isVideoOpen = false">×</button>
          <div class="video-container">
            <iframe 
              src="https://www.youtube.com/embed/tDx1DHk0QD8" 
              title="TrustBox Royale Video" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="modal-actions-center">
            <Link href="/prizes" class="btn-primary modal-cta">Box auswählen</Link>
          </div>
        </div>
      </div>
    </transition>

    <!-- How It Works Modal -->
    <transition name="fade">
      <div v-if="isHowItWorksOpen" class="hero-modal-overlay" @click="isHowItWorksOpen = false">
        <div class="hero-modal-content info-modal" @click.stop>
          <button class="modal-close-btn" @click="isHowItWorksOpen = false">×</button>
          <h2 class="modal-title">So funktioniert's</h2>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-num">1</div>
              <h4>Wir kaufen gebündelt ein</h4>
            </div>
            <div class="step-card">
              <div class="step-num">2</div>
              <h4>Wir stellen faire TrustBoxen zusammen</h4>
            </div>
            <div class="step-card">
              <div class="step-num">3</div>
              <h4>Du bekommst Ware mit Einkaufsvorteil</h4>
            </div>
          </div>
          <div class="modal-actions-center">
            <Link href="/prizes" class="btn-primary modal-cta">Box auswählen</Link>
          </div>
        </div>
      </div>
    </transition>

  </div>
  </AppLayout>
</template>

<script setup>
import { router, Link } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import Merkaba3D from '../Components/Merkaba3D.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const isVideoOpen = ref(false);
const isHowItWorksOpen = ref(false);
`;

const startIndex = content.indexOf(startHTML);
const endIndex = content.indexOf(endHTML) + endHTML.length;

let replaced = content.substring(0, startIndex) + newHTML + content.substring(endIndex);
fs.writeFileSync(file, replaced, "utf8");
console.log("Replaced HTML in Welcome.vue");
