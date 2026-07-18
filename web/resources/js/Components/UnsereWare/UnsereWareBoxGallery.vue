<template>
  <section class="section-live-flow">
    <div class="live-flow-header">
      <h2>Live Warenfluss & versandte Sendungen</h2>
      <p class="live-flow-sub">Wir dokumentieren ausgewählte Versandboxen mit Bildern, Warenmix und ID – damit du siehst, was wirklich verpackt und verschickt wird.</p>
      <p class="live-flow-desc">Trustbridge arbeitet mit wechselnden Warenposten. Je nach Bestand können darunter Sonderposten, Restposten, Saisonware, Großhandelsware oder Retourenware sein.</p>
    </div>

    <!-- Filter -->
    <div class="filter-strip">
      <button v-for="filter in filters" :key="filter" @click="activeFilter = filter" :class="['filter-pill', { active: activeFilter === filter, 'gold-pill': filter === 'Level 5 Royal' }]">
        {{ filter }}
      </button>
    </div>

    <!-- Galerie Slider Area -->
    <div class="gallery-wrapper">
      
      <!-- Featured Box (Top) -->
      <div v-if="featuredBox" class="featured-box-card shard-card" @click="openBoxModal(featuredBox)">
        <div class="featured-image-col">
          <template v-if="featuredBox.imageUrl">
            <img :src="featuredBox.imageUrl" :alt="featuredBox.id" class="featured-img" />
          </template>
          <template v-else>
            <div class="img-placeholder">
              <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>Packfoto folgt</span>
            </div>
          </template>
          <div class="card-badges-top">
            <span v-for="b in featuredBox.badges" :key="b" :class="['badge', getBadgeClass(b)]">{{ b }}</span>
          </div>
        </div>
        <div class="featured-info-col">
          <div class="featured-header">
            <span class="box-id-large">{{ featuredBox.id }}</span>
            <span class="box-level-badge" :class="getLevelClass(featuredBox.level)">{{ featuredBox.level }}</span>
          </div>
          <div class="featured-mix">{{ featuredBox.mix.join(' · ') }}</div>
          
          <div class="featured-stats">
            <div class="stat-item">
              <span class="stat-label">Versand</span>
              <span class="stat-value">{{ featuredBox.shippedAt }} &middot; {{ featuredBox.region }}</span>
            </div>
            <div class="stat-item" v-if="featuredBox.estimatedValue">
              <span class="stat-label">Kalk. Wert</span>
              <span class="stat-value gold-text">{{ featuredBox.estimatedValue }}</span>
            </div>
          </div>
          
          <div class="featured-footer">
            <div v-if="featuredBox.hasReview" class="review-hint">
              <span class="stars">★★★★★</span> Review vorhanden
            </div>
            <div class="btn-outline-small">Details ansehen &rarr;</div>
          </div>
        </div>
      </div>

      <!-- Horizontal Slider -->
      <div class="slider-container" v-if="gridBoxes.length > 0">
        <!-- Native horizontal scroll container -->
        <div class="live-flow-slider" ref="sliderRef" @scroll="handleScroll">
          <div class="tbx-card shard-card" v-for="box in gridBoxes" :key="box.id" @click="openBoxModal(box)">
            <div class="tbx-image-wrapper">
              <template v-if="box.imageUrl">
                <img :src="box.imageUrl" :alt="box.id" class="tbx-image" />
              </template>
              <template v-else>
                <div class="img-placeholder">
                  <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  <span>Packfoto folgt</span>
                </div>
              </template>
              <div class="card-badges-top-small">
                <span v-for="b in box.badges" :key="b" :class="['badge-small', getBadgeClass(b)]">{{ b }}</span>
              </div>
            </div>
            <div class="tbx-content">
              <div class="tbx-header">
                <span class="tbx-id">{{ box.id }}</span>
                <span class="tbx-level" :class="getLevelClass(box.level)">{{ box.level }}</span>
              </div>
              <div class="tbx-mix">{{ box.mix.join(' · ') }}</div>
              
              <div class="tbx-meta">
                <div>{{ box.shippedAt }} &middot; {{ box.region }}</div>
                <div v-if="box.estimatedValue" class="gold-text">{{ box.estimatedValue }}</div>
              </div>
              
              <div class="tbx-footer">
                <div v-if="box.hasReview" class="review-hint-small">
                  <span class="stars">★★★★★</span> Review
                </div>
                <div class="btn-outline-micro">Details &rarr;</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Controls -->
        <button class="slider-btn prev-btn" @click="scrollSlider(-1)" :disabled="scrollProgress <= 0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="slider-btn next-btn" @click="scrollSlider(1)" :disabled="scrollProgress >= 100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      
      <div v-if="filteredBoxes.length === 0" class="no-results">
        Keine Boxen für diesen Filter gefunden.
      </div>
    </div>

    <!-- DETAILMODAL -->
    <transition name="fade">
      <div v-if="isBoxDetailModalOpen" class="live-modal-overlay premium-overlay" @click="closeBoxModal">
        <div class="live-modal-content royal-screen-frame" @click.stop>
          <button class="modal-close-btn royal-close" @click="closeBoxModal">×</button>
          
          <div v-if="selectedBox" class="modal-inner">
            <div class="royal-screen-header">
              <h2 class="royal-screen-title">Sendung {{ selectedBox.id }}</h2>
              <p class="royal-screen-subtitle">Echte Versandbox &middot; {{ selectedBox.level }} &middot; dokumentierter Warenmix</p>
            </div>
            
            <div class="modal-body-split">
              <div class="modal-image-col">
                <div class="royal-screen-display">
                  <div class="royal-screen-glow"></div>
                  <div class="image-container">
                    <template v-if="selectedBox.imageUrl">
                      <img :src="selectedBox.imageUrl" :alt="selectedBox.id" />
                    </template>
                    <template v-else>
                      <div class="img-placeholder-large">
                        <svg class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        <span>Packfoto folgt in Kürze</span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="modal-image-disclaimer">
                  Diese Box wurde gepackt, dokumentiert und dem Versand zugeordnet.<br>
                  Die gezeigten Bilder dienen der transparenten Darstellung des tatsächlichen Warenflusses.<br>
                  <strong>Private Kundendaten werden nicht öffentlich angezeigt.</strong>
                </div>
              </div>
              
              <div class="modal-info-col">
                <div class="info-glass-panel">
                  <h3>Versanddetails</h3>
                  <ul>
                    <li><span>Warenmix:</span> <strong>{{ selectedBox.mix.join(' · ') }}</strong></li>
                    <li><span>Box-Level:</span> <strong>{{ selectedBox.level }}</strong></li>
                    <li><span>Versandmonat:</span> <strong>{{ selectedBox.shippedAt }}</strong></li>
                    <li><span>Grobe Region:</span> <strong>{{ selectedBox.region }}</strong></li>
                    <li v-if="selectedBox.estimatedValue"><span>Kalk. Warenwert:</span> <strong class="gold-text">{{ selectedBox.estimatedValue }}</strong></li>
                  </ul>
                  <p class="disclaimer-text">Die genaue Zusammenstellung variiert je nach Bestand, Level und Verfügbarkeit.</p>
                </div>

                <div v-if="selectedBox.hasReview && selectedBox.review" class="review-glass-panel">
                  <div class="review-header">
                    <h3>Review zur Box</h3>
                    <span class="badge badge-verified-small">★ Verifizierte Bestellung</span>
                  </div>
                  <div class="review-stars-wrap">
                    <span class="review-stars">★★★★★</span>
                  </div>
                  <p class="review-text">"{{ selectedBox.review.text }}"</p>
                  <span class="review-date">{{ selectedBox.review.date }}</span>
                </div>
              </div>
            </div>

            <div class="royal-screen-footer">
              <Link href="/prizes" class="btn-primary royal-cta">Eigene TrustBox sichern</Link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';

// Filter Logic
const filters = ['Alle', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5 Royal', 'Mit Review', 'Kundenfoto', 'Packvideo'];
const activeFilter = ref('Alle');

const shippingBoxes = [
  {
    id: "TBX-2026-000004",
    level: "Level 3",
    mix: ["Schuhe", "Fashion", "Haushalt"],
    shippedAt: "Mai 2026",
    region: "Deutschland Süd",
    estimatedValue: "ca. 820 €",
    badges: ["Kundenfoto", "Geprüft & freigegeben", "Verifizierte Bestellung"],
    hasReview: true,
    hasPackVideo: false,
    hasCustomerPhoto: true,
    imageUrl: "/images/box_1_example.png",
    status: "veröffentlicht",
    review: { text: "Wahnsinn, die Schuhe allein sind schon den Box-Preis wert! Super fair.", date: "12.05.2026" }
  },
  {
    id: "TBX-2026-000019",
    level: "Level 2",
    mix: ["Mischware", "Elektronik"],
    shippedAt: "Mai 2026",
    region: "Deutschland West",
    estimatedValue: "ca. 340 €",
    badges: ["Packfoto", "Echte Versandbox"],
    hasReview: false,
    hasPackVideo: false,
    hasCustomerPhoto: false,
    imageUrl: "/images/box_2_example.png",
    status: "veröffentlicht",
    review: null
  },
  {
    id: "TBX-2026-000042",
    level: "Level 5 Royal",
    mix: ["Premium", "Fashion", "Technik"],
    shippedAt: "Juni 2026",
    region: "Österreich",
    estimatedValue: "ca. 3.100 €",
    badges: ["Kundenfoto", "Verifizierte Bestellung"],
    hasReview: true,
    hasPackVideo: true,
    hasCustomerPhoto: true,
    imageUrl: "/images/box_4_example.png",
    status: "veröffentlicht",
    review: { text: "Ein echtes Erlebnis, unglaublich hochwertig verpackt.", date: "02.06.2026" }
  },
  {
    id: "TBX-2026-000055",
    level: "Level 4",
    mix: ["Technik", "Haushalt"],
    shippedAt: "Juni 2026",
    region: "Deutschland Nord",
    estimatedValue: "ca. 1.250 €",
    badges: ["Packfoto", "Echte Versandbox"],
    hasReview: false,
    hasPackVideo: false,
    hasCustomerPhoto: false,
    imageUrl: null,
    status: "veröffentlicht",
    review: null
  },
  {
    id: "TBX-2026-000088",
    level: "Level 1",
    mix: ["Haushalt", "Mischware"],
    shippedAt: "Juli 2026",
    region: "Deutschland Ost",
    estimatedValue: "ca. 120 €",
    badges: ["Packfoto", "Echte Versandbox"],
    hasReview: false,
    hasPackVideo: false,
    hasCustomerPhoto: false,
    imageUrl: "/images/box_1_example.png",
    status: "veröffentlicht",
    review: null
  }
];

const getBadgeClass = (badge) => {
  if (badge === 'Kundenfoto' || badge === 'Geprüft & freigegeben') return 'badge-approved';
  if (badge === 'Verifizierte Bestellung') return 'badge-verified';
  if (badge === 'Packvideo vorhanden' || badge === 'Packvideo') return 'badge-video';
  return 'badge-real';
};

const getLevelClass = (level) => {
  if (level === 'Level 5 Royal') return 'level-gold';
  return 'level-mint';
};

const filteredBoxes = computed(() => {
  return shippingBoxes.filter(box => {
    if (activeFilter.value === 'Alle') return true;
    if (activeFilter.value === 'Mit Review') return box.hasReview;
    if (activeFilter.value === 'Kundenfoto') return box.hasCustomerPhoto;
    if (activeFilter.value === 'Packvideo') return box.hasPackVideo;
    return box.level === activeFilter.value;
  });
});

const featuredBox = computed(() => {
  return filteredBoxes.value.length > 0 ? filteredBoxes.value[0] : null;
});

const gridBoxes = computed(() => {
  return filteredBoxes.value.slice(1);
});

// Slider Logic
const sliderRef = ref(null);
const scrollProgress = ref(0);

const handleScroll = () => {
  if (!sliderRef.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value;
  if (scrollWidth <= clientWidth) {
    scrollProgress.value = 100;
  } else {
    scrollProgress.value = (scrollLeft / (scrollWidth - clientWidth)) * 100;
  }
};

const scrollSlider = (direction) => {
  if (!sliderRef.value) return;
  const cardWidth = 340 + 24; // approx card width + gap
  sliderRef.value.scrollBy({
    left: cardWidth * direction,
    behavior: 'smooth'
  });
};

// Modal Logic
const isBoxDetailModalOpen = ref(false);
const selectedBox = ref(null);

const openBoxModal = (box) => {
  selectedBox.value = box;
  isBoxDetailModalOpen.value = true;
};

const closeBoxModal = () => {
  isBoxDetailModalOpen.value = false;
  selectedBox.value = null;
};
</script>

<style scoped>
/* ===================================================
   LIVE WARENFLUSS & GALERIE
   =================================================== */
.section-live-flow { margin-bottom: 5rem; }
.live-flow-header { text-align: center; max-width: 800px; margin: 0 auto 3rem; }
h2 { font-family: 'Century Gothic', sans-serif; font-size: 2.2rem; margin-bottom: 1.2rem; background: linear-gradient(to right, #fff, #94A3B8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 30px rgba(142,245,210,0.15); }
.live-flow-sub { color: #D4AF37; font-size: 1.15rem; font-weight: bold; margin-bottom: 1rem; line-height: 1.5; }
.live-flow-desc { color: rgba(255,255,255,0.6); font-size: 1.05rem; line-height: 1.6; }

/* Filter */
.filter-strip { display: flex; gap: 0.8rem; justify-content: center; margin-bottom: 3rem; overflow-x: auto; padding-bottom: 1rem; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
.filter-pill { scroll-snap-align: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #C4B8D8; padding: 8px 20px; border-radius: 50px; font-weight: bold; font-size: 0.9rem; cursor: pointer; transition: all 0.3s; white-space: nowrap; backdrop-filter: blur(10px); }
.filter-pill:hover { background: rgba(255,255,255,0.1); color: #FFF; }
.filter-pill.active { background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.5); color: #8EF5D2; box-shadow: 0 0 15px rgba(142,245,210,0.1); }
.filter-pill.gold-pill.active { background: rgba(212,175,55,0.15); border-color: rgba(212,175,55,0.5); color: #D4AF37; box-shadow: 0 0 15px rgba(212,175,55,0.1); }

/* Badges */
.badge { font-size: 0.7rem; font-weight: bold; padding: 5px 10px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 5px; backdrop-filter: blur(5px); }
.badge-small { font-size: 0.6rem; font-weight: bold; padding: 4px 8px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 5px; }
.badge-real { background: rgba(255,255,255,0.9); color: #000; }
.badge-verified { background: rgba(212,175,55,0.9); color: #0a0515; }
.badge-video { background: rgba(200,200,255,0.9); color: #0a0515; }
.badge-approved { background: rgba(142,245,210,0.9); color: #0a0515; }

.level-mint { color: #8EF5D2; font-weight: bold; }
.level-gold { color: #D4AF37; font-weight: bold; }

/* Image Placeholders - Royal Purple Gradient */
.img-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #3A1C71, #D76D77, #FFAF7B); background-size: 200% 200%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.8); gap: 10px; position: relative; animation: gradientShift 5s ease infinite; }
.img-placeholder::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(142,245,210,0.1), transparent 60%); }
.img-placeholder-large { height: 350px; background: linear-gradient(135deg, #3A1C71, #D76D77); background-size: 200% 200%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.8); gap: 15px; border-radius: 12px; font-size: 1.2rem; animation: gradientShift 5s ease infinite; }
.placeholder-icon { width: 48px; height: 48px; stroke-width: 1.5; opacity: 0.8; }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* Shard Card Global Styles */
.shard-card { background: linear-gradient(135deg, rgba(45, 20, 80, 0.7), rgba(20, 10, 40, 0.9)); backdrop-filter: blur(25px); border: 1px solid rgba(142,245,210,0.15); border-top: 1px solid rgba(142,245,210,0.3); border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(142,245,210,0.02); transition: all 0.3s; position: relative; }
.shard-card::before { content: ''; position: absolute; inset: -2px; border-radius: 26px; background: linear-gradient(45deg, rgba(142,245,210,0.5), transparent 40%, transparent 60%, rgba(212,175,55,0.4)); z-index: -1; filter: blur(12px); opacity: 0; transition: opacity 0.4s ease; pointer-events: none; }
.shard-card:hover { transform: translateY(-5px); border-color: rgba(142,245,210,0.4); box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
.shard-card:hover::before { opacity: 1; }

/* Featured Box */
.featured-box-card { display: flex; overflow: hidden; margin-bottom: 2.5rem; cursor: pointer; }
.featured-image-col { width: 55%; position: relative; background: #000; overflow: hidden; min-height: 350px; }
.featured-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: transform 0.6s ease; }
.featured-box-card:hover .featured-img { transform: scale(1.05); opacity: 1; }
.card-badges-top { position: absolute; top: 15px; left: 15px; display: flex; flex-wrap: wrap; gap: 8px; z-index: 10; max-width: 90%; }
.card-badges-top-small { position: absolute; top: 10px; left: 10px; display: flex; flex-wrap: wrap; gap: 5px; z-index: 10; max-width: 90%; }
.featured-info-col { width: 45%; padding: 3rem 2.5rem; display: flex; flex-direction: column; justify-content: center; }
.featured-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.box-id-large { font-family: 'Century Gothic', sans-serif; font-size: 1.8rem; font-weight: bold; color: #FFF; }
.box-level-badge { font-size: 1rem; border: 1px solid rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; background: rgba(0,0,0,0.2); }
.featured-mix { color: #C4B8D8; font-size: 1.1rem; margin-bottom: 2rem; }
.featured-stats { display: flex; gap: 2rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px dashed rgba(255,255,255,0.1); }
.stat-item { display: flex; flex-direction: column; gap: 5px; }
.stat-label { color: rgba(255,255,255,0.4); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
.stat-value { color: #FFF; font-weight: bold; font-size: 1.1rem; }
.gold-text { color: #D4AF37; }
.featured-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.review-hint { color: #8EF5D2; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
.stars { color: #D4AF37; letter-spacing: 2px; }
.btn-outline-small { padding: 8px 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; color: #FFF; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; transition: 0.3s; }
.featured-box-card:hover .btn-outline-small { background: rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.4); color: #8EF5D2; }
.btn-outline-micro { padding: 6px 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; color: #FFF; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; transition: 0.3s; }
.tbx-card:hover .btn-outline-micro { background: rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.4); color: #8EF5D2; }

/* Horizontal Slider */
.slider-container { position: relative; width: 100%; }
.live-flow-slider { display: flex; gap: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0 3rem; -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
.live-flow-slider::-webkit-scrollbar { display: none; } /* Hide scrollbar for a cleaner look */
.tbx-card { flex: 0 0 340px; scroll-snap-align: start; overflow: hidden; cursor: pointer; display: flex; flex-direction: column; }
.tbx-image-wrapper { position: relative; height: 200px; background: #000; overflow: hidden; }
.tbx-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: 0.5s; }
.tbx-card:hover .tbx-image { transform: scale(1.05); opacity: 1; }
.tbx-content { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; }
.tbx-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.tbx-id { font-family: 'Century Gothic', sans-serif; font-weight: bold; color: #FFF; font-size: 1.2rem; }
.tbx-level { font-size: 0.85rem; border: 1px solid rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 12px; background: rgba(0,0,0,0.2); }
.tbx-mix { color: #C4B8D8; font-size: 0.95rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.tbx-meta { display: flex; flex-direction: column; gap: 5px; color: #C4B8D8; font-size: 0.85rem; margin-bottom: 1.5rem; }
.tbx-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.review-hint-small { color: #8EF5D2; font-size: 0.8rem; display: flex; align-items: center; gap: 5px; }

/* Slider Controls */
.slider-btn { position: absolute; top: 40%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(20, 10, 40, 0.8); border: 1px solid rgba(142,245,210,0.3); color: #FFF; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(10px); z-index: 10; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
.slider-btn:hover:not(:disabled) { background: rgba(142,245,210,0.2); color: #8EF5D2; border-color: #8EF5D2; }
.slider-btn:disabled { opacity: 0; pointer-events: none; }
.prev-btn { left: -22px; }
.next-btn { right: -22px; }

.no-results { text-align: center; color: rgba(255,255,255,0.4); padding: 4rem; background: rgba(255,255,255,0.02); border-radius: 20px; font-style: italic; }

/* Modal */
.live-modal-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 20px; }
.live-modal-overlay.premium-overlay { background: rgba(5, 2, 10, 0.92); backdrop-filter: blur(35px); }
.live-modal-content.royal-screen-frame { background: linear-gradient(135deg, rgba(45, 20, 80, 0.9) 0%, rgba(20, 10, 40, 0.95) 100%); backdrop-filter: blur(40px); border: 1px solid rgba(142, 245, 210, 0.15); border-top: 1px solid rgba(142, 245, 210, 0.35); border-bottom: 1px solid rgba(212, 175, 55, 0.2); border-radius: 36px; padding: 40px; max-width: 1000px; width: 100%; position: relative; box-shadow: 0 50px 120px rgba(0,0,0,0.95), 0 0 80px rgba(142,245,210,0.08), inset 0 0 60px rgba(212,175,55,0.05); max-height: 95vh; overflow-y: auto; }
.royal-close { position: absolute; top: 25px; right: 25px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #C4B8D8; width: 44px; height: 44px; border-radius: 50%; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; z-index: 20; }
.royal-close:hover { background: rgba(142,245,210,0.15); color: #8EF5D2; border-color: rgba(142,245,210,0.4); transform: scale(1.1); }
.royal-screen-header { text-align: center; margin-bottom: 30px; }
.royal-screen-title { font-family: 'Century Gothic', sans-serif; font-size: 2.2rem; color: #FFF; margin: 0 0 5px 0; text-shadow: 0 0 20px rgba(142,245,210,0.2); }
.royal-screen-subtitle { color: #D4AF37; font-size: 1rem; margin: 0; text-transform: uppercase; letter-spacing: 1.5px; }
.modal-body-split { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.royal-screen-display { position: relative; border-radius: 20px; padding: 8px; background: linear-gradient(180deg, rgba(20, 10, 35, 0.8) 0%, rgba(5, 2, 10, 0.9) 100%); box-shadow: inset 0 0 30px rgba(0,0,0,0.9), 0 15px 40px rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.1); }
.royal-screen-glow { position: absolute; inset: -3px; border-radius: 22px; background: linear-gradient(45deg, rgba(142,245,210,0.3), transparent 40%, transparent 60%, rgba(212,175,55,0.25)); z-index: 0; pointer-events: none; filter: blur(10px); }
.image-container { position: relative; border-radius: 12px; overflow: hidden; z-index: 2; height: 350px; background: #000; }
.image-container img { width: 100%; height: 100%; object-fit: contain; }
.modal-image-disclaimer { margin-top: 1.5rem; font-size: 0.85rem; color: rgba(255,255,255,0.4); line-height: 1.6; font-style: italic; text-align: center; }
.modal-image-disclaimer strong { color: #8EF5D2; font-weight: normal; }
.info-glass-panel, .review-glass-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
.info-glass-panel h3, .review-header h3 { color: #FFF; margin-bottom: 1rem; font-size: 1.2rem; margin-top: 0; }
.info-glass-panel ul { list-style: none; padding: 0; margin: 0; color: #C4B8D8; display: flex; flex-direction: column; gap: 0.8rem; }
.info-glass-panel ul span { display: inline-block; width: 140px; }
.info-glass-panel ul strong { color: #FFF; }
.info-glass-panel ul .gold-text { color: #D4AF37; }
.review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.review-stars-wrap { margin-bottom: 1rem; }
.review-stars { color: #D4AF37; font-size: 1.2rem; }
.review-text { color: #FFF; font-style: italic; margin-bottom: 1rem; font-size: 1rem; line-height: 1.6; }
.review-date { font-size: 0.8rem; color: #8EF5D2; display: block; text-align: right; }
.royal-screen-footer { margin-top: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px; }
.btn-primary { display: inline-block; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #1a0b36; padding: 15px 35px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(142,245,210,0.3); transition: all 0.3s; }
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(142,245,210,0.5); }
.disclaimer-text { font-size: 0.85rem; color: rgba(255,255,255,0.4); font-style: italic; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem; margin-top: 1rem; }

@media (max-width: 1100px) {
  .live-flow-slider { gap: 1rem; }
}

@media (max-width: 900px) {
  .featured-box-card { flex-direction: column; }
  .featured-image-col { width: 100%; min-height: 250px; }
  .featured-info-col { width: 100%; padding: 2rem; }
  .modal-body-split { grid-template-columns: 1fr; }
  .filter-strip { justify-content: flex-start; }
}

@media (max-width: 600px) {
  /* Mobile Swipe Slider */
  .tbx-card { flex: 0 0 90%; }
  .live-flow-slider { padding: 1rem 5% 2rem; scroll-padding-left: 5%; gap: 1rem; }
  .slider-btn { display: none; } /* Hide buttons on mobile where swipe is natural */
  
  .featured-header { flex-direction: column; align-items: flex-start; gap: 10px; }
  .featured-stats { flex-direction: column; gap: 10px; border-bottom: none; padding-bottom: 0; margin-bottom: 1rem; }
  .featured-footer { flex-direction: column; gap: 15px; align-items: stretch; text-align: center; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
