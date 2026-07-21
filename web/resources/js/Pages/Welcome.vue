<template>
  <AppLayout>
    <SeoHead
      title="Trustbridge – Die Brücke zu dir selbst"
      description="Trustbridge – Die Brücke zu dir selbst."
      keywords="Trustbridge, Portal, Coaching"
      canonical="https://trustbridge.de/"
      :jsonLd="homeLd"
    />
    <div class="welcome-page">
      <!-- Preview Merkaba entfernt, jetzt im Hero-Hintergrund -->

    <!-- ===== DER AUFSTIEG =====
         Die Szene braucht einen EIGENEN Scrollbereich. Gemessen auf
         dieser Seite treten die Kacheln schon bei scrollY 350 (Desktop)
         beziehungsweise 72 (Mobile) in den Viewport - eine fixierte
         Szene lag damit zwangslaeufig ueber fremdem Inhalt, und ein
         Aufstieg, der laenger dauert, war ueberhaupt nicht darstellbar.

         Deshalb .climb-track: eine Bahn mit eigener Hoehe, in der
         .climb-stage klebt (position: sticky). Solange man durch die
         Bahn scrollt, steht die Szene still im Bild und wandelt sich.
         Danach gibt sie den Fluss frei und die Headline uebernimmt -
         ohne Ueberlappung, weil der Inhalt erst hinter der Bahn folgt.

         Das Portal steht mit in der Bahn: man steigt darauf zu,
         waehrend es sich klaert. Die Treppe wird nicht neu gebaut -
         sie ist im Portalmotiv bereits gemalt.

         Gesteuert wird alles ueber eine Zahl: --climb (0..1) auf dem
         <html>-Element. Kein JS pro Ebene, kein Rerender pro Frame.
         0 = am Fuss: Nebel steht, Licht kuehl.
         1 = oben: Nebel gesunken, Licht warm, Portal klar. -->
    <div class="hero-section animate-fade-in" id="hero">
      <div class="climb-track" ref="trackEl">
        <div class="climb-stage">
      <!-- ===== 3D STAGE SCENE ===== -->
      
      <!-- Echte 3D SVG Merkaba (Dezent im Hintergrund).
           Auf Telefonen (unter 769px) steht sie per CSS auf Opacity
           0.07 - praktisch unsichtbar, aber ihre Animationsschleife
           rechnete voll mit. Dort wird sie gar nicht erst gemountet;
           Tablets und Desktop bleiben unveraendert. -->
      <div class="merkaba-3d-container" v-if="showMerkaba">
        <Merkaba3D :speed="0.003" :lineWidth="1.2" tetraAColor="#ffffff" tetraBColor="#D4AF37" />
      </div>
      <!-- Floating particle stars -->
      <div class="particles">
        <span class="particle" style="--x:10%;--y:20%;--d:3s;--s:0.5"></span>
        <span class="particle" style="--x:25%;--y:60%;--d:4s;--s:0.8"></span>
        <span class="particle" style="--x:40%;--y:10%;--d:2.5s;--s:0.4"></span>
        <span class="particle" style="--x:55%;--y:75%;--d:5s;--s:0.6"></span>
        <span class="particle" style="--x:70%;--y:30%;--d:3.5s;--s:0.9"></span>
        <span class="particle" style="--x:85%;--y:55%;--d:2s;--s:0.5"></span>
        <span class="particle" style="--x:15%;--y:80%;--d:6s;--s:0.7"></span>
        <span class="particle" style="--x:90%;--y:15%;--d:4.5s;--s:0.3"></span>
        <span class="particle" style="--x:60%;--y:40%;--d:3s;--s:0.6"></span>
        <span class="particle" style="--x:33%;--y:90%;--d:5.5s;--s:0.8"></span>
      </div>

      <!-- Spotlight beams from top -->
      <div class="spotlight spotlight-left"></div>
      <div class="spotlight spotlight-center"></div>
      <div class="spotlight spotlight-right"></div>

      <!-- 3D Stage floor reflection -->
      <div class="stage-floor"></div>

      <!-- Panthers Layer (Absolute Positioning) -->
      <div class="panthers-container">
        <!-- Ambient Glowing Blurs -->
        <div class="ambient-glow glow-center"></div>
        <div class="ambient-glow glow-left"></div>
        <div class="ambient-glow glow-right"></div>

        <!-- Dynamische, weichgezeichnete Ringe (Verschwommen) im Hintergrund -->
        <div class="blurry-ring-wrapper wrapper-center">
          <div class="blurry-ring ring-center outer"></div>
          <div class="blurry-ring ring-center inner"></div>
        </div>
        <div class="blurry-ring-wrapper wrapper-left">
          <div class="blurry-ring ring-left outer"></div>
          <div class="blurry-ring ring-left inner"></div>
        </div>
        <div class="blurry-ring-wrapper wrapper-right">
          <div class="blurry-ring ring-right outer"></div>
          <div class="blurry-ring ring-right inner"></div>
        </div>

        <!-- v-if statt nur CSS: unterhalb 1025px blendet das Stylesheet
             die Portale aus, aber ein <img> im DOM laedt trotzdem.
             Vor der Optimierung waren das 10 MB unsichtbarer Download
             auf jedem Handy. Die 2048er-Originale bleiben als letzter
             Fallback; AVIF/WebP (1024px, ~80/119 kB) tragen die Last. -->
        <button v-if="isWideView" type="button" @click="isVideoOpen = true" class="portal-circle portal-circle-left" aria-label="Portal: Begleite mich beim Erklärvideo">
          <picture>
            <source type="image/avif" srcset="/trustbridge-hero-portal-left-1024.avif" />
            <source type="image/webp" srcset="/trustbridge-hero-portal-left-1024.webp" />
            <img src="/trustbridge-hero-portal-left.png" width="1024" height="1024" decoding="async" alt="Portal: Begleite mich" />
          </picture>
        </button>
        <PortalLoop class="panther panther-center" />
        <button v-if="isWideView" type="button" @click="isHowItWorksOpen = true" class="portal-circle portal-circle-right" aria-label="Portal: Informationen – So funktioniert's">
          <picture>
            <source type="image/avif" srcset="/trustbridge-hero-portal-right-1024.avif" />
            <source type="image/webp" srcset="/trustbridge-hero-portal-right-1024.webp" />
            <img src="/trustbridge-hero-portal-right.png" width="1024" height="1024" decoding="async" alt="Portal: Informationen" />
          </picture>
        </button>

        <!-- ===== Kreuz-Bildunterschriften =====
             Woertlich gelesen stehen links "Trust your Gap" und rechts
             "Bridge yourself" - beides ergibt fuer sich wenig Sinn. Ueber
             Kreuz gelesen loest es sich auf:
               Trust (links)  -> yourself (rechts)
               Bridge (rechts) -> your Gap (links)
             Zwei Faeden zeichnen genau diese beiden Leselinien nach und
             kreuzen sich unter dem Portal. Der Kreuzungspunkt liegt
             bewusst unterhalb des Emblems, damit die Wortmarke frei bleibt.

             Die Faeden spannen exakt von Portalmitte zu Portalmitte
             (left/right: 20vh = halbe Portalbreite), deshalb treffen die
             Pfadenden immer die Wortmitten - unabhaengig vom Viewport. -->
        <div class="tb-cross">
          <p class="tb-cross-sr">
            Die beiden Bildunterschriften sind ueber Kreuz zu lesen:
            Trust Yourself &ndash; Bridge your Gap.
          </p>

          <svg class="tb-threads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <!-- A: Trust (links oben) -> yourself (rechts unten) -->
            <path class="tb-thread tb-thread--a" pathLength="100" d="M 0 84 Q 50 34 100 96" />
            <!-- B: Bridge (rechts oben) -> your Gap (links unten) -->
            <path class="tb-thread tb-thread--b" pathLength="100" d="M 100 84 Q 50 34 0 96" />
            <!-- Wanderndes Glanzlicht auf denselben Bahnen -->
            <path class="tb-glint tb-glint--a" pathLength="100" d="M 0 84 Q 50 34 100 96" />
            <path class="tb-glint tb-glint--b" pathLength="100" d="M 100 84 Q 50 34 0 96" />
          </svg>

          <div class="tb-caption tb-caption--left" aria-hidden="true">
            <span class="tb-word tb-lead tb-key--trust">Trust</span>
            <span class="tb-word tb-tail tb-key--gap">your Gap</span>
          </div>
          <div class="tb-caption tb-caption--right" aria-hidden="true">
            <span class="tb-word tb-lead tb-key--bridge">Bridge</span>
            <span class="tb-word tb-tail tb-key--yourself">yourself</span>
          </div>
        </div>

        <!-- Der Schleier vor dem Portal. Er sitzt bewusst INNERHALB des
             .panthers-container und nicht in der fixierten Szene: so
             scrollt er mit dem Portal mit und bleibt deckungsgleich,
             waehrend er sich lichtet. Das Logo wird dadurch klarer,
             ohne dass pro Frame ein Filter neu berechnet wird. -->
        <div class="climb-portal-haze" aria-hidden="true"></div>

        <!-- Shadow/reflection below each panther -->
        <div class="panther-shadow shadow-left"></div>
        <div class="panther-shadow shadow-center"></div>
        <div class="panther-shadow shadow-right"></div>
      </div>

    <div class="climb-scene" aria-hidden="true">
      <div class="climb-layer climb-cool"></div>
      <div class="climb-layer climb-warmth"></div>
      <div class="climb-layer climb-sky"></div>
      <div class="climb-layer climb-leaves"></div>
      <div class="climb-layer climb-fog"></div>

      <!-- Die Angst. Kein Wesen, kein Gegner: eine ruhige, warme
           Praesenz am Fuss der Treppe. Sie wird leiser, je weiter man
           steigt - aber sie verschwindet nie ganz. -->
      <div class="climb-presence" :class="{ 'is-acknowledged': isLookingBack }"></div>
    </div>

    <!-- Text und Bedienung des Aufstiegs. Eigene Ebene, weil die Szene
         darueber aria-hidden ist - das Zitat soll vorgelesen werden.

         Die Wortlisten treten mit den Scroll-Beats auf (GSAP, links
         Beat 1, rechts Beat 2 - gestaffelt ueber stagger). --i
         staffelt sie seitlich zur Treppendiagonale. -->
    <div class="climb-ui">
      <ul class="climb-words climb-words--left" aria-hidden="true">
        <li style="--i:0"><i class="climb-tread"></i><span>Angst</span></li>
        <li style="--i:1"><i class="climb-tread"></i><span>Zweifel</span></li>
        <li style="--i:2"><i class="climb-tread"></i><span>Aufschieben</span></li>
        <li style="--i:3"><i class="climb-tread"></i><span>Meinung anderer</span></li>
        <li style="--i:4"><i class="climb-tread"></i><span>Komfort</span></li>
      </ul>

      <!-- Feste Paare zur linken Liste, Position fuer Position:
           Angst->Vertrauen, Zweifel->Klarheit, Aufschieben->Handlung,
           Meinung anderer->Eigenverantwortung, Komfort->Wachstum.
           Beide Listen sind 5 hoch - die Paare stehen auf gleicher
           Zeilenhoehe, die Verwandlung ist ablesbar. -->
      <ul class="climb-words climb-words--right" aria-hidden="true">
        <li style="--i:4"><i class="climb-tread"></i><span>Vertrauen</span></li>
        <li style="--i:3"><i class="climb-tread"></i><span>Klarheit</span></li>
        <li style="--i:2"><i class="climb-tread"></i><span>Handlung</span></li>
        <li style="--i:1"><i class="climb-tread"></i><span>Eigenverantwortung</span></li>
        <li style="--i:0"><i class="climb-tread"></i><span>Wachstum</span></li>
      </ul>

      <!-- Steht, solange man unten steht, und tritt beim Steigen zurueck. -->
      <p class="climb-line climb-line--foot">
        Die gr&ouml;&szlig;te Grenze ist selten der Weg.<br />
        Sie ist die Angst davor, ihn zu gehen.
      </p>

      <!-- Der Rueckblick: freiwillig, leise, im Treppenbereich unter der
           Praesenz - man wendet sich ihr zu, dankt und geht weiter. -->
      <div class="climb-lookback" v-if="showLookBack && !isVideoOpen && !isHowItWorksOpen">
        <transition name="fade">
          <p v-if="isLookingBack" class="climb-line climb-line--thanks">
            Danke deiner Angst.<br />
            Und entscheide trotzdem: du selbst.
          </p>
        </transition>
        <button
          type="button"
          class="climb-lookback-btn"
          :aria-expanded="isLookingBack"
          @click="isLookingBack = !isLookingBack"
        >
          {{ isLookingBack ? 'Weitergehen' : 'Zurückblicken' }}
        </button>
      </div>
    </div>
        </div>
      </div>

            <div class="container hero-content">
        <!-- Trustbridge Logo / Title -->
        <div class="hero-title-wrapper" style="position: relative; z-index: 10;">
          <div class="crown-wrapper">
            <svg class="title-crown" viewBox="0 6 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="#D4AF37"/>
            </svg>
          </div>
          <!-- Die Wortmarke steht bereits als goldener Schriftzug im Portal.
               Hier bleibt sie nur noch fuer Screenreader und Suchmaschinen
               im Dokument, ist aber nicht mehr sichtbar. -->
          <div class="brand-name brand-name--sr">Trustbridge</div>
          <!-- Das & traegt als einziger Akzent die Schreibschrift -
               ein warmer Rest im kuehlen Wordmark-Look, und zugleich
               die kleine Bruecke zwischen den beiden Zeilen. -->
          <h1 class="tresor-text">
            <span class="tresor-mint">Trust</span> <span class="tresor-gold">Yourself <span class="tresor-amp">&amp;</span></span><br/>
            <span class="tresor-gold">Bridge</span> <span class="tresor-mint">your Gap</span>
          </h1>
          <div class="poetic-quote-wrapper">
            <p class="hero-poetic-quote">
              Probleme sind Boten neuer Wege.<br/>
              Sie lehren uns den Weg zum Wandel.<br/>
              Die Natur erinnert uns: Was nicht wächst, verwelkt.
            </p>
          </div>

          <!-- Die Schwelle. Oben endet der Aufstieg ("Danke deiner
               Angst"), direkt darunter begann bisher die Kasse
               ("Gebuendelter Einkauf") - ein Tonbruch. Diese zwei
               Zeilen uebersetzen, warum der Weg in etwas Greifbares
               muendet, bevor die Kacheln sprechen. Der Goldfaden
               darueber fuehrt die Linie des Portals nach unten fort. -->
          <div class="climb-threshold">
            <p class="climb-threshold-line">
              Vertrauen beginnt mit einem ersten Schritt.<br />
              Nicht die Treppe hält dich auf.<br />
              Sondern die Geschichte, die dir deine Angst über sie erzählt.
            </p>
          </div>

             <!-- Drei Standpunkte: wo der Besucher gerade steht.
               Die Kacheln behalten Optik und bisheriges Verhalten -
               die Ziel-Verlinkung folgt, wenn die Unterseiten stehen. -->
          <h2 class="shards-heading">Wo stehst du gerade?</h2>
          <div class="hero-shards-grid">
            <!-- Shard 1 (LEFT): Erklärvideo -->
            <button @click="isVideoOpen = true" class="hero-shard shard-left shard-purple">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div class="shard-content">
                <h3>Orientierung</h3>
                <p>Ich weiß nicht, wohin.</p>
              </div>
            </button>
  
            <!-- Shard 2 (CENTER MAIN): Box auswählen -->
            <Link href="/prizes" class="hero-shard shard-center shard-mint-main">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z" fill="currentColor"/>
                </svg>
              </div>
              <div class="shard-content">
                <h3>Veränderung</h3>
                <p>Ich weiß, wohin – aber ich traue mich noch nicht.</p>
              </div>
            </Link>
  
            <!-- Shard 3 (RIGHT): So funktioniert's -->
            <button @click="isHowItWorksOpen = true" class="hero-shard shard-right shard-gold-purple">
              <div class="shard-glass"></div>
              <div class="shard-refraction"></div>
              <div class="shard-aura"></div>
              <div class="shard-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div class="shard-content">
                <h3>Persönliche Begleitung</h3>
                <p>Ich möchte meinen Weg nicht allein gehen.</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Compact Guarantee -->
        <div class="hero-guarantee-bar">
          <div class="guarantee-glow"></div>
          <svg class="guarantee-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span class="guarantee-text">Wenn du nicht weißt, wohin — genau dort stand ich auch, als dieser Weg begann.</span>
          <Link href="/how-it-works" class="guarantee-link">Mehr erfahren &rarr;</Link>
        </div>
      </div>
    </div>

    <!-- Uebergabe an den Footer: ein Band, das das Seitenlila in das
         Tiefviolett des Footers ueberfuehrt, mit einem Rest Goldlicht
         am unteren Rand. Die Deckkraft steuert das Scroll-Modul
         (homeLowerSections) - hier steht der volle Endzustand, damit
         das Band auch ohne JS und bei reduzierter Bewegung traegt. -->
    <div class="footer-transition" aria-hidden="true"></div>

    <!-- ===== Modals ===== -->
    <!-- Video Modal -->
      <transition name="fade">
        <div v-if="isVideoOpen" class="hero-modal-overlay premium-overlay" @click="isVideoOpen = false">
          <div class="hero-modal-content video-modal royal-screen-frame" @click.stop>
            <button class="modal-close-btn royal-close" @click="isVideoOpen = false">×</button>
            
            <div class="royal-screen-header">
              <h2 class="royal-screen-title">Die Vision hinter Trustbridge</h2>
              <p class="royal-screen-subtitle">In wenigen Minuten erklärt</p>
            </div>
            
            <div class="royal-screen-display">
              <div class="royal-screen-glow"></div>
              <div class="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/tDx1DHk0QD8" 
                  title="Trustbridge Vision" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
            
            <div class="royal-screen-footer">
              <Link href="/prizes" class="btn-primary royal-cta">Box auswählen</Link>
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
import PortalLoop from '../Components/Hero/PortalLoop.vue';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHomeLowerSections } from '../animations/homeLowerSections';

gsap.registerPlugin(ScrollTrigger);

/* Nur im Dev-Modus: GSAP fuer die manuelle Verifikation in der
   Browser-Konsole erreichbar machen. Als ES-Modul gebuendelt liegt
   es sonst in keinem globalen Namensraum - window.gsap === undefined
   heisst also nicht, dass GSAP fehlt. */
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

const isVideoOpen = ref(false);
const isHowItWorksOpen = ref(false);

/* Strukturierte Daten fuer Suchmaschinen. Das Template band homeLd
   seit jeher - definiert war es nie, was bei jedem Laden eine
   Vue-Warnung ausloeste und das JSON-LD still verschluckte. */
const homeLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Trustbridge',
  url: 'https://trustbridge.de/',
  description: 'Trustbridge – Die Brücke zu dir selbst.',
  inLanguage: 'de',
};

/* ===================================================================
   DER AUFSTIEG - Scrollfortschritt als CSS-Variable
   -------------------------------------------------------------------
   Der Fortschritt liegt bewusst NICHT in einem reaktiven ref: ein ref,
   der 60-mal pro Sekunde schreibt, wuerde die ganze Seite genauso oft
   neu rendern. Stattdessen landet der Wert direkt als CSS-Variable
   --climb auf der Hero-Sektion, und das Stylesheet erledigt den Rest.

   Reaktiv ist nur, was sich selten aendert: ob der Rueckblick-Moment
   schon angeboten wird. Der schaltet genau einmal um.
   =================================================================== */
const showLookBack = ref(false);
const isLookingBack = ref(false);

const trackEl = ref(null);
/* Fenster, in dem sich der Rueckblick anbietet: weit genug oben, dass
   die Geste etwas bedeutet, und oben angekommen wieder vorbei - wer
   das Portal erreicht hat, schaut nicht mehr zurueck. */
const LOOKBACK_FROM = 0.22;
const LOOKBACK_UNTIL = 0.75;

/* ===================================================================
   DIE DREI BEATS - Scroll-Auftritt der Seiten-Sets ueber GSAP
   -------------------------------------------------------------------
   Beat 0 (t=0): nur Portal und Eroeffnungszeile.
   Beat 1: das linke Set laeuft von links ein (Medaillon-Button, Ringe,
           Glow, Caption, Wortliste mit gestaffelten Stufen).
   Beat 2: das rechte Set spiegelbildlich, dazu die Kreuz-Faeden.

   Die Beats liegen als gestauchte Sub-Timelines auf der bestehenden
   Master-Timeline (scrub) - gleiche Zeitachse wie Nebel, Licht und
   Portal-Klaerung, dieselbe Pin-Strecke (.climb-track haelt die
   Buehne per position: sticky). Ein zweiter, GSAP-gepinnter Trigger
   auf der Hero haette mit dem Sticky kollidiert und die Kacheln
   unterhalb mit eingefroren.

   Justieren:
     BEATS.at/span     Anteile der Bahn (0..1): wann und wie lang.
     BEAT_DIST         Einlaufweg in px (breit/schmal).
     WORD_STAGGER      Versatz der Wortstufen (relative Einheit).
     Die inneren Dauern in buildSideBeat sind relative Einheiten und
     werden auf span gestaucht - ihr Verhaeltnis bleibt erhalten.
   =================================================================== */
const BEATS = {
  left:  { at: 0.08, span: 0.30 },
  right: { at: 0.50, span: 0.30 },
};
const BEAT_EASE = 'power3.out';
const BEAT_DIST = { wide: 60, narrow: 28 };
const WORD_STAGGER = 0.08;
const PORTAL_PARALLAX = { y: -14, scale: 1.025 };

let masterTl = null;
let heroMM = null;

function buildSideBeat(side, dist) {
  const q = (s) => document.querySelector(s);
  const dir = side === 'left' ? -1 : 1;
  const sub = gsap.timeline({ defaults: { ease: BEAT_EASE } });

  /* autoAlpha (opacity + visibility) nimmt die unsichtbaren
     <button>-Portale zugleich aus Tab-Reihenfolge und A11y-Baum. */
  const medallion = [q(`.wrapper-${side}`), q(`.portal-circle-${side}`)].filter(Boolean);
  if (medallion.length) {
    sub.fromTo(medallion,
      { autoAlpha: 0, x: dir * dist, scale: 0.9 },
      { autoAlpha: 1, x: 0, scale: 1, duration: 0.9 }, 0);
  }

  /* Der Glow pulsiert per CSS-Keyframes auf opacity - eine Inline-
     Opacity wuerde von der Animation ueberstimmt. filter: opacity()
     umgeht das und laesst blur und Puls unangetastet. */
  const glow = q(`.glow-${side}`);
  if (glow) {
    sub.fromTo(glow,
      { filter: 'blur(80px) opacity(0)' },
      { filter: 'blur(80px) opacity(1)', duration: 0.9, ease: 'none' }, 0.05);
  }

  const shadow = q(`.shadow-${side}`);
  if (shadow) sub.fromTo(shadow, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.1);

  /* Erst Bild, dann Wort: Caption und Liste setzen kurz nach dem
     Medaillon ein. */
  const caption = q(`.tb-caption--${side}`);
  if (caption) {
    sub.fromTo(caption,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.6 }, 0.35);
  }

  /* y bleibt das einzige getweente Transform-Glied der Stufen - die
     Treppendiagonale (translate3d ueber --i) liegt im x-Anteil und
     wird von GSAP unangetastet uebernommen. */
  const list = q(`.climb-words--${side}`);
  if (list) {
    sub.fromTo(list,
      { autoAlpha: 0, x: dir * 24 },
      { autoAlpha: 1, x: 0, duration: 0.5 }, 0.3);
    const words = list.querySelectorAll('li');
    if (words.length) {
      sub.fromTo(words,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: WORD_STAGGER }, 0.4);
    }
  }

  /* Die Kreuz-Faeden verbinden beide Captions - sie gehoeren erst ins
     Bild, wenn mit dem rechten Set beide Seiten stehen. */
  if (side === 'right') {
    const threads = q('.tb-threads');
    if (threads) sub.fromTo(threads, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0.5);
  }

  return sub;
}

/* matchMedia-Aufbau der Beats. Wird beim Wechsel der isWideView-
   Grenze (1025px, v-if der Portal-Buttons) neu aufgerufen, damit
   frisch gemountete Buttons mit eingefangen werden - revert() raeumt
   dabei alle vorher gesetzten Inline-Styles ab. */
function setupBeats() {
  heroMM?.revert();
  heroMM = gsap.matchMedia();
  heroMM.add({
    wide:   '(min-width: 1025px) and (prefers-reduced-motion: no-preference)',
    tablet: '(min-width: 769px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)',
    narrow: '(max-width: 768px) and (prefers-reduced-motion: no-preference)',
    still:  '(prefers-reduced-motion: reduce)',
  }, (ctx) => {
    /* Reduzierte Bewegung: keine Beats. Das Basis-CSS zeigt alle
       Elemente im symmetrischen Endzustand, der Hero steht ruhig. */
    if (ctx.conditions.still || !masterTl) return;

    const dist = ctx.conditions.narrow ? BEAT_DIST.narrow : BEAT_DIST.wide;
    masterTl.add(buildSideBeat('left', dist).duration(BEATS.left.span), BEATS.left.at);
    masterTl.add(buildSideBeat('right', dist).duration(BEATS.right.span), BEATS.right.at);

    /* Unterhalb 1025px teilen sich beide Listen dasselbe Band in der
       Bildmitte - die linke macht der rechten Platz, sobald Beat 2
       ansetzt: Abloesung statt Ueberlagerung. */
    if (ctx.conditions.tablet || ctx.conditions.narrow) {
      const leftList = document.querySelector('.climb-words--left');
      if (leftList) {
        masterTl.to(leftList,
          { autoAlpha: 0, y: -12, ease: 'power2.inOut', duration: 0.1 },
          BEATS.right.at - 0.02);
      }
    }

    /* Mikro-Parallaxe: das Portal bewegt sich minimal anders als die
       einlaufenden Seiten - raeumliche Tiefe statt flacher Flaeche.
       Nur der statische wrapper-center; panther-center und Glows
       tragen eigene CSS-Transform-Animationen. */
    masterTl.fromTo('.wrapper-center',
      { y: 0, scale: 1 },
      { y: PORTAL_PARALLAX.y, scale: PORTAL_PARALLAX.scale, ease: 'power2.inOut', duration: 1 }, 0);
  });
}

/* ===================================================================
   CHOREOGRAFIE UEBER GSAP SCROLLTRIGGER
   -------------------------------------------------------------------
   Die Architektur bleibt: das Stylesheet liest vier Variablen vom
   <html>-Element, kein Vue-Rerender pro Frame. Getauscht ist nur der
   Treiber - statt handgebauter Glaettung (exponentielle Annaeherung
   plus eigene Easing-Funktion) fuehrt jetzt eine ScrollTrigger-
   Timeline mit scrub. Das entfernt ~90 Zeilen Eigenbau, macht die
   Kurven deklarativ und gibt den Rahmen fuer die kommenden Seiten
   vor, die dieselbe Sprache sprechen sollen.

     --climb     Rohfortschritt (fuer Schwellen wie den Rueckblick)
     --climb-1   Nebel, kuehles Licht, Zitat  - reagieren zuerst
     --climb-2   Waerme, Natur, Wortstufen
     --climb-3   Logo-Klaerung und Praesenz   - kommen zuletzt an

   scrub: 1.1 uebernimmt die zeitliche Glaettung (der Wert laeuft dem
   Finger nachgiebig hinterher, Mausrad-Rastungen verschleifen).
   Bei reduzierter Bewegung wird scrub: true daraus - die Werte folgen
   dann exakt der Scrollposition, ohne nachlaufende Eigenbewegung.
   Die Lichtwechsel selbst bleiben: sie sind der Inhalt, nicht Dekor.
   =================================================================== */
const climbState = { c: 0, c1: 0, c2: 0, c3: 0 };
let gsapCtx = null;
let magnetDelegate = null;
let lowerSectionsCleanup = null;

/* Breiter Viewport: steuert, ob die Seitenportale ueberhaupt im DOM
   stehen. Gleicher Breakpoint wie im Stylesheet (1024px). Nach einem
   Flip haengt der Portal-Button neu im DOM - die Beats werden nach
   dem Rerender neu aufgebaut, damit er mitspielt. */
const isWideView = ref(true);
let mqWide = null;
const syncWide = () => {
  if (isWideView.value === mqWide.matches) return;
  isWideView.value = mqWide.matches;
  nextTick(setupBeats);
};

/* Merkaba-Grenze liegt bei 769px (dort schaltet das Stylesheet auf
   Opacity 0.07) - bewusst getrennt von isWideView (1025px), damit
   Tablets die Merkaba behalten. */
const showMerkaba = ref(true);
let mqMerkaba = null;
const syncMerkaba = () => { showMerkaba.value = mqMerkaba.matches; };

function writeClimb() {
  /* Auf <html>, nicht auf der Hero-Sektion: die Szene muss denselben
     Wert lesen koennen wie das Portal. */
  const root = document.documentElement.style;
  root.setProperty('--climb', climbState.c.toFixed(4));
  root.setProperty('--climb-1', climbState.c1.toFixed(4));
  root.setProperty('--climb-2', climbState.c2.toFixed(4));
  root.setProperty('--climb-3', climbState.c3.toFixed(4));

  const offer = climbState.c > LOOKBACK_FROM && climbState.c < LOOKBACK_UNTIL;
  if (showLookBack.value !== offer) {
    showLookBack.value = offer;
    /* Verlaesst man das Fenster, klappt auch die Zeile wieder zu. */
    if (!offer) isLookingBack.value = false;
  }
}

onMounted(() => {
  mqWide = window.matchMedia('(min-width: 1025px)');
  syncWide();
  mqWide.addEventListener('change', syncWide);

  mqMerkaba = window.matchMedia('(min-width: 769px)');
  syncMerkaba();
  mqMerkaba.addEventListener('change', syncMerkaba);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trackEl.value,
        /* Exakt die Strecke, auf der die Buehne klebt: von Bahnanfang
           bis Bahnende. Deckungsgleich mit position: sticky. */
        start: 'top top',
        end: 'bottom bottom',
        scrub: reduced ? true : 1.1,
        /* invalidateOnRefresh: die Bahnhoehe steht in vh - nach einem
           Resize misst ScrollTrigger neu, sonst laege das Timeline-
           Ende neben dem Sticky-Ende. */
        invalidateOnRefresh: true,
      },
      defaults: { duration: 1, ease: 'none' },
      onUpdate: writeClimb,
    });

    /* Der Rohwert laeuft linear ueber die volle Strecke - Schwellen
       (Rueckblick, Uebergabe an die Headline) brauchen die unverzerrte
       Position. */
    tl.to(climbState, { c: 1 }, 0);

    /* Die drei Gruppen starten versetzt und laufen durch dieselbe
       Kurve. 0.86 Dauer + 0.14 max. Versatz = 1: auch die letzte
       Gruppe kommt exakt am Bahnende bei 1 an. */
    tl.to(climbState, { c1: 1, duration: 0.86, ease: 'power2.inOut' }, 0);
    tl.to(climbState, { c2: 1, duration: 0.86, ease: 'power2.inOut' }, 0.07);
    tl.to(climbState, { c3: 1, duration: 0.86, ease: 'power2.inOut' }, 0.14);

    /* Die Beat-Sub-Timelines docken von aussen an (setupBeats). */
    masterTl = tl;

  });

  /* Die drei Beats der Seiten-Sets - nach der Master-Timeline, weil
     sie sich auf deren Zeitachse setzen. */
  setupBeats();

  /* Alles unterhalb des Aufstiegs (Schwelle, Kacheln, Garantie-Zeile,
     Footer-Uebergang und Footer-Spalten) lebt als eigenes Buendel in
     animations/homeLowerSections.js - inklusive der reduced-motion-
     Weiche. Der Footer wird bewusst von dort angesteuert statt in
     SiteFooter.vue: die Komponente ist geteilt, die Unterseiten sind
     handdesignt und bleiben unangetastet. */
  lowerSectionsCleanup = initHomeLowerSections();

  /* Erster Zustand sofort, auch mitten auf der Seite (Reload mit
     erhaltener Scrollposition): ScrollTrigger setzt die Timeline beim
     Anlegen auf die aktuelle Position, hier nur noch rausschreiben. */
  writeClimb();

  /* --- Magnetische Knoepfe ---
     Nur auf Zielen, deren Hover transform-frei ist (Rueckblick,
     Garantie-Link) - auf den Kacheln wuerde ein Inline-Transform den
     bestehenden CSS-Lift ueberschreiben. Delegation statt direkter
     Bindung, weil der Rueckblick-Knopf erst mitten im Aufstieg in den
     DOM kommt. Nur fuer echte Zeiger (hover+fine), nie bei
     reduzierter Bewegung. */
  if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const MAGNET = '.climb-lookback-btn, .guarantee-link';
    const PULL = 5;

    const onMove = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: ((e.clientX - r.left) / r.width - 0.5) * 2 * PULL,
        y: ((e.clientY - r.top) / r.height - 0.5) * 2 * PULL,
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const onLeave = (e) => {
      gsap.to(e.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.55)' });
    };

    magnetDelegate = (e) => {
      const el = e.target.closest?.(MAGNET);
      if (el && !el.dataset.magnet) {
        el.dataset.magnet = '1';
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
      }
    };
    document.addEventListener('pointerover', magnetDelegate, { passive: true });
  }
});

onUnmounted(() => {
  /* revert() raeumt Timeline UND ScrollTrigger ab - noetig, weil
     Inertia nur die Seite tauscht und ein verwaister Trigger sonst
     auf der naechsten Seite weiterfeuerte. */
  /* Beats zuerst: ihr revert() loest die Sub-Timelines samt Inline-
     Styles aus der Master-Timeline, bevor der Kontext faellt. */
  heroMM?.revert();
  heroMM = null;
  masterTl = null;
  gsapCtx?.revert();
  lowerSectionsCleanup?.();
  lowerSectionsCleanup = null;
  mqWide?.removeEventListener('change', syncWide);
  mqMerkaba?.removeEventListener('change', syncMerkaba);
  if (magnetDelegate) {
    document.removeEventListener('pointerover', magnetDelegate);
    magnetDelegate = null;
  }
  /* Das <html> bleibt bei Inertia stehen - ohne das hier truege jede
     Folgeseite den letzten Stand mit sich. */
  const root = document.documentElement.style;
  ['--climb', '--climb-1', '--climb-2', '--climb-3'].forEach((n) => root.removeProperty(n));
});
</script>

<style scoped>
/* Playfair-Import entfernt: die Schrift wurde nirgends verwendet,
   der externe Abruf blockierte das erste Rendern um ~2s (mobil). */

/* ===== PAGE WRAPPER WITH CONTINUOUS GRADIENT ===== */
.welcome-page {
  background: linear-gradient(-45deg, #4a2685, #29155c, #1a0b36, #37176b); /* Brighter Royal Purple */
  background-size: 400% 400%;
  animation: bg-shift 20s ease infinite;
  /* clip statt hidden: hidden macht dieses Element zum Scroll-Container,
     und daran wuerde .climb-stage kleben statt am Viewport - der
     Aufstieg fand dann gar nicht statt. clip schneidet identisch ab. */
  overflow-x: clip;
  max-width: 100vw;
  color: #1e0b3b;
}

.merkaba-3d-container {
  position: absolute;
  top: 35%; /* Mittig auf den Panther zentriert */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 90vh;
  max-width: 1400px;
  max-height: 1400px;
  z-index: 0;
  pointer-events: none;
  /* Licht-Hierarchie: das Portal ist die eine dominante Quelle der
     Szene, alles andere traegt zu, statt zu konkurrieren. Die Merkaba
     war mit 0.18 hell genug, um mit dem Ring zu ringen. */
  opacity: 0.10;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Maskierung: In der Mitte beim Panther leicht schwächer, nach außen hin sehr soft auslaufend */
  mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%);
}

.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  /* Bahn oben, Text darunter - vorher zentrierte die Sektion ein
     einziges Kind. */
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 60px;
  /* clip statt hidden - siehe .welcome-page: hidden haette die
     klebende Buehne ausgehebelt. */
  overflow: clip;
  background: transparent;
  /* 3D Bühne: Perspektive für alle Kinder */
  perspective: 1200px;
  perspective-origin: 50% 40%;
}

/* ===================================================================
   DER AUFSTIEG
   -------------------------------------------------------------------
   Szene und Bedienung liegen FIXIERT im Viewport. Der vorige Versuch
   hatte sie in .hero-section gelegt - die ist mehrere Bildschirme
   hoch, also scrollten Nebel, Licht und Wortlisten beim ersten Wisch
   nach oben aus dem Bild. Rechnerisch lief der Aufstieg, zu sehen war
   davon nichts.

   Gesteuert wird alles ueber vier Werte auf dem <html>-Element, die
   das Skript pro Frame schreibt. Ueberall steht ein Vorgabewert im
   var(), damit die Szene auch vor dem ersten Frame stimmt.

     --climb     geglaetteter Rohwert, fuer Schwellen und Uebergabe
     --climb-1   Nebel, kuehles Licht, Zitat  - reagieren zuerst
     --climb-2   Waerme, Natur, Wortstufen
     --climb-3   Logo-Klaerung und Praesenz   - kommen zuletzt an

   Die drei Gruppen sind gegeneinander versetzt und laufen durch eine
   Easing-Kurve. Dadurch schaltet die Szene nicht auf einen Schlag um,
   sondern in einer Reihenfolge: der Nebel weicht, dann wird es warm,
   zuletzt klaert sich das Portal.

   Bewegt werden ausschliesslich opacity und transform - beides laeuft
   auf dem Compositor und kostet kein Layout.
   =================================================================== */
/* Die Bahn gibt dem Aufstieg seinen eigenen Scrollweg. Ihre Hoehe
   minus einer Bildschirmhoehe ist die Strecke, ueber die die Buehne
   klebt - also genau die Laenge des Aufstiegs. */
.climb-track {
  position: relative;
  width: 100%;
  height: 175vh;
}

.climb-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: clip;
}

.climb-scene,
.climb-ui {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Ueber dem Portal (.panthers-container: 1), unter der Navbar. */
  z-index: 3;
  /* Oben angekommen uebergibt die Szene an die Headline und raeumt
     das Feld - sonst laege sie ueber Kacheln und Text darunter.
     Der Ausklang beginnt erst bei 0.92: die letzte Stufe "Wachstum"
     ist ab 0.83 voll da und braucht ihren Moment, bevor abgeblendet
     wird. Frueher gesetzt, ging genau das Zielwort unter. */
  opacity: calc(1 - max(0, var(--climb, 0) - 0.92) * 12.5);
}

.climb-ui { z-index: 4; }

.climb-layer {
  position: absolute;
  inset: 0;
}

/* Kuehles Bodenlicht am Fuss der Treppe - weicht beim Steigen. */
.climb-cool {
  background: radial-gradient(
    ellipse 120% 62% at 50% 100%,
    rgba(74, 92, 190, 0.38) 0%,
    rgba(45, 27, 84, 0.20) 42%,
    transparent 74%
  );
  mix-blend-mode: screen;
  opacity: calc(1 - var(--climb-1, 0) * 0.85);
}

/* Warmes Licht von oben - nimmt mit jeder Stufe zu. */
.climb-warmth {
  background: radial-gradient(
    ellipse 96% 60% at 50% 12%,
    rgba(240, 207, 90, 0.32) 0%,
    rgba(201, 162, 39, 0.14) 40%,
    transparent 72%
  );
  mix-blend-mode: screen;
  opacity: var(--climb-2, 0);
}

/* Oben oeffnet sich der Blick: der Himmel wird hoeher und heller. */
.climb-sky {
  bottom: auto;
  height: 58vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 244, 214, 0.22) 0%,
    rgba(255, 244, 214, 0.08) 38%,
    transparent 78%
  );
  mix-blend-mode: screen;
  opacity: var(--climb-2, 0);
  transform: translate3d(0, calc((1 - var(--climb-2, 0)) * -7vh), 0);
}

/* Die Natur wird lebendiger: weiches Blattwerk waechst aus den unteren
   Ecken herein und wiegt sich leicht. Bewusst als Lichtform, nicht als
   gezeichnetes Blatt - eine Illustration wuerde neben dem gemalten
   Portalmotiv wie ein Fremdkoerper stehen. */
.climb-leaves {
  background:
    radial-gradient(ellipse 34% 30% at 2% 104%, rgba(142, 245, 210, 0.30) 0%, transparent 68%),
    radial-gradient(ellipse 30% 26% at 98% 106%, rgba(142, 245, 210, 0.26) 0%, transparent 68%),
    radial-gradient(ellipse 22% 18% at 14% 100%, rgba(120, 210, 180, 0.22) 0%, transparent 70%),
    radial-gradient(ellipse 20% 16% at 88% 100%, rgba(120, 210, 180, 0.20) 0%, transparent 70%);
  filter: blur(6px);
  mix-blend-mode: screen;
  opacity: calc(var(--climb-2, 0) * 1.25 - 0.12);
  animation: leaves-sway 13s ease-in-out infinite;
  transform-origin: 50% 100%;
}

@keyframes leaves-sway {
  0%, 100% { transform: scale(1) skewX(0deg); }
  50%      { transform: scale(1.04) skewX(1.1deg); }
}

/* Der Nebel. Steht dicht am Fuss der Treppe und sinkt beim Steigen
   zurueck nach unten, statt einfach zu verschwinden. */
.climb-fog {
  background: linear-gradient(
    to top,
    rgba(198, 188, 234, 0.55) 0%,
    rgba(150, 132, 200, 0.32) 17%,
    rgba(120, 104, 170, 0.13) 32%,
    transparent 50%
  );
  opacity: calc(1 - var(--climb-1, 0) * 0.95);
  transform: translate3d(0, calc(var(--climb-1, 0) * 16vh), 0);
  will-change: opacity, transform;
}

/* --- Die Angst ---
   Bewusst keine Gestalt, nichts Dunkles: zwei weiche, warme Lichtfelder,
   die zusammen als stehende Praesenz lesbar sind. Sie steht am Fuss der
   Treppe und wird leiser, je weiter man steigt - aber ihre Deckkraft
   endet bei 0.35, nicht bei 0. Eine Angst, die verschwindet, waere ein
   besiegter Gegner; genau das soll sie nicht sein. */
.climb-presence {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  bottom: 1.5vh;
  width: clamp(100px, 11vw, 170px);
  height: clamp(90px, 12vh, 150px);
  background:
    radial-gradient(ellipse 42% 25% at 50% 15%, rgba(255, 238, 198, 0.36) 0%, transparent 70%),
    radial-gradient(ellipse 56% 48% at 50% 65%, rgba(214, 196, 240, 0.28) 0%, transparent 74%);
  filter: blur(16px);
  opacity: calc(0.9 - var(--climb-3, 0) * 0.55);
  animation: presence-breathe 9s ease-in-out infinite;
  will-change: opacity, transform;
}

@keyframes presence-breathe {
  0%, 100% { transform: scale(1) translateY(0); }
  50%      { transform: scale(1.045) translateY(-5px); }
}

/* Die Zuwendung beim Zurueckblicken: eigener Schein mit eigener Blende,
   getrennt von der scrollgesteuerten Deckkraft - sonst wuerde die
   Ueberblendung am Scrollwert kleben und nachziehen. */
.climb-presence::after {
  content: '';
  position: absolute;
  inset: -12%;
  background: radial-gradient(ellipse 50% 42% at 50% 50%, rgba(255, 232, 176, 0.5) 0%, transparent 72%);
  opacity: 0;
  transition: opacity 1.2s ease;
}

.climb-presence.is-acknowledged::after { opacity: 1; }

/* Der Schleier vor dem Portal: lichtet sich, das Logo wird klarer.
   Liegt im .panthers-container, damit er mit dem Portal mitscrollt. */
.climb-portal-haze {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64vh;
  height: 64vh;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(150, 132, 200, 0.36) 0%,
    rgba(120, 104, 170, 0.20) 52%,
    transparent 74%
  );
  filter: blur(24px);
  opacity: calc(1 - var(--climb-3, 0) * 1.15);
  z-index: 4;
  pointer-events: none;
  /* Eigenleben ueber die separate scale-Eigenschaft, nicht ueber
     transform - das traegt bereits die Zentrierung. Der Schleier
     atmet dadurch traege wie Nebel, statt als starre Scheibe zu
     stehen, und laeuft komplett auf dem Compositor. */
  animation: haze-drift 14s ease-in-out infinite;
}

@keyframes haze-drift {
  0%, 100% { scale: 1; }
  50%      { scale: 1.06 1.03; }
}

/* --- Die Wortgruppen als Stufen ---
   Der Auftritt gehoert den Scroll-Beats (GSAP): die linke Liste
   kommt mit Beat 1, die rechte mit Beat 2, die Stufen jeweils
   gestaffelt. --i staffelt sie raeumlich zur Treppendiagonale. */
.climb-words {
  position: absolute;
  /* Nicht auf halber Hoehe: dort beginnen die seitlichen
     Panther-Portale, und die Woerter lagen unlesbar auf den Bildern.
     Oberhalb davon steht freier Grund. */
  top: 34%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1.6vh, 1.3rem);
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: clamp(0.75rem, 1.05vw, 0.98rem);
  letter-spacing: 0.14em;
  line-height: 1;
}

.climb-words li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
}

/* Die Stufe selbst: eine kurze Trittkante neben dem Wort. */
.climb-tread {
  display: block;
  width: clamp(1rem, 2.2vw, 2rem);
  height: 1px;
  background: currentColor;
  /* currentColor traegt den Schein: die Kante leuchtet damit
     automatisch im Ton ihrer Seite, ohne zweite Farbdefinition. */
  box-shadow: 0 0 8px currentColor, 0 0 20px currentColor;
  opacity: 0.7;
  flex: none;
}

/* --- Leise Ueberzeilen ---
   Der Rahmen fuer die Wortpaare: links das, was festhaelt, rechts
   das, was frei wird. Bewusst kein 'Angst -> Vertrauen' - die Paare
   sollen entdeckt werden (gleiche Hoehe, gleicher Rhythmus). Die
   Ueberzeilen reiten auf dem Beat-Fade ihrer Liste (GSAP tweent das
   <ul>, das ::before faehrt mit). */
.climb-words::before {
  display: block;
  font-size: 0.82em;
  letter-spacing: 0.18em;
  line-height: 1.4;
  opacity: 0.85;
  pointer-events: none;
}

.climb-words--left::before {
  content: 'Das, was dich festhält.';
  color: rgba(79, 227, 212, 0.62);
  text-shadow: 0 2px 8px rgba(4, 2, 10, 0.9);
  align-self: flex-start;
}

.climb-words--right::before {
  content: 'Das, was in dir frei wird.';
  color: rgba(240, 207, 90, 0.66);
  text-shadow: 0 2px 8px rgba(4, 2, 10, 0.9);
  align-self: flex-end;
}

/* Links: bleibt zurueck. Die Stufen verlieren sich nach unten aussen. */
.climb-words--left {
  left: 3.2vw;
  color: #4FE3D4;
  /* Fuenf Lagen mit einer Aufgabe je Lage: die beiden dunklen zuerst
     setzen die Kante gegen den Hintergrund und halten die Lesbarkeit,
     die drei tuerkisen darueber staffeln den Hof von eng nach weit.
     Ohne die dunklen Lagen frisst der Hof die Buchstabenkontur auf. */
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.95),
    0 2px 8px rgba(4, 2, 10, 0.95),
    0 0 12px rgba(79, 227, 212, 0.85),
    0 0 30px rgba(45, 212, 191, 0.55),
    0 0 64px rgba(45, 212, 191, 0.3);
}

/* Die Stufen selbst gehoeren den Beats: GSAP staffelt die <li> beim
   Einlaufen (autoAlpha + y). Das Stylesheet traegt nur die ruhende
   Treppendiagonale ueber --i - GSAP tweent ausschliesslich y und
   uebernimmt den x-Anteil unangetastet. Keine transition hier:
   sie wuerde gegen die gescrubbten Inline-Werte arbeiten. */
.climb-words--left li {
  transform: translate3d(calc(var(--i) * -0.5rem), 0, 0);
}

/* Rechts: tritt hervor. Die Stufen steigen nach oben aussen. */
.climb-words--right {
  right: 3.2vw;
  /* Der Kern bleibt hell. Die Buchstaben selbst zu vertiefen haette
     den Kontrast gegen den dunklen Grund gekostet - vertieft wird
     stattdessen der Hof nach aussen, von hellem Gold ueber Messing
     bis Bernstein. Das liest sich satter, ohne Lesbarkeit zu opfern. */
  color: #FFD873;
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.95),
    0 2px 8px rgba(4, 2, 10, 0.95),
    0 0 12px rgba(255, 216, 115, 0.9),
    0 0 32px rgba(212, 175, 55, 0.6),
    0 0 70px rgba(180, 116, 20, 0.42);
}

/* Lichtsplitter an den goldenen Stufen. Aufgebaut wie die bestehenden
   .particle im Hero - weisser Kern, goldener Abfall, weicher Schein -
   damit sie zum Funkeln der Ringlogos gehoeren und nicht daneben.
   Sie sitzen am Wortende, wo sie keine Buchstaben ueberdecken. */
.climb-words--right span {
  position: relative;
}

.climb-words--right span::before,
.climb-words--right span::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(240, 207, 90, 0.55) 45%, transparent 70%);
  box-shadow: 0 0 6px rgba(240, 207, 90, 0.9);
  pointer-events: none;
  animation: shard-twinkle 4.6s ease-in-out infinite;
}

.climb-words--right span::before {
  width: 4px; height: 4px;
  top: -6px; right: -10px;
}

.climb-words--right span::after {
  width: 3px; height: 3px;
  bottom: -4px; right: 14%;
  animation-delay: -2.3s;
}

/* Versetzte Takte, damit die Splitter nicht im Gleichschritt blinken. */
.climb-words--right li:nth-child(1) span::before { animation-delay: -0.4s; }
.climb-words--right li:nth-child(2) span::before { animation-delay: -1.7s; }
.climb-words--right li:nth-child(3) span::before { animation-delay: -3.0s; }
.climb-words--right li:nth-child(4) span::before { animation-delay: -2.2s; }
.climb-words--right li:nth-child(5) span::before { animation-delay: -1.1s; }
.climb-words--right li:nth-child(2) span::after  { animation-delay: -0.9s; }
.climb-words--right li:nth-child(4) span::after  { animation-delay: -3.4s; }
.climb-words--right li:nth-child(5) span::after  { animation-delay: -2.7s; }

@keyframes shard-twinkle {
  0%, 100% { opacity: 0.25; transform: scale(0.8); }
  50%      { opacity: 1;    transform: scale(1.15); }
}

.climb-words--right li {
  flex-direction: row-reverse;
  transform: translate3d(calc(var(--i) * 0.5rem), 0, 0);
}

/* --- Die Zeilen des Aufstiegs --- */
.climb-line {
  margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
  text-align: center;
  line-height: 1.75;
  text-shadow: 0 2px 12px rgba(4, 2, 10, 0.95);
}

/* Die Eroeffnungszeile steht OBEN, im leeren Band zwischen Navbar und
   Portalring. Unten war sie unlesbar: dort liegt der Ring mit der
   Wortmarke, und darunter stehen bereits die Kreuz-Bildunterschriften.
   Der eigene dunkle Grund bleibt - ueber dem gemalten Motiv reicht ein
   Textschatten fuer den Kontrast nicht. */
.climb-line--foot {
  position: absolute;
  left: 50%;
  top: 13vh;
  width: min(88vw, 600px);
  padding: 1rem 2rem;
  border-radius: 999px;
  background: radial-gradient(
    ellipse at center,
    rgba(6, 3, 14, 0.86) 0%,
    rgba(6, 3, 14, 0.62) 48%,
    rgba(6, 3, 14, 0) 78%
  );
  font-size: clamp(0.95rem, 1.45vw, 1.18rem);
  color: #F2F6FF;
  /* Der Ausgangs-Anker der drei Beats: bleibt den ganzen Aufstieg
     ueber praesent und geht erst mit dem Ausklang der climb-ui
     (Deckkraft-Calc ab 0.92) - nur der leichte Auftrieb bleibt. */
  transform: translate3d(-50%, calc(var(--climb-1, 0) * -3vh), 0);
}

/* --- Der Rueckblick ---
   Sitzt im Treppenbereich unter der Praesenz, nicht ueber fremdem
   Inhalt: man wendet sich ihr zu, dankt und geht weiter. */
.climb-lookback {
  position: absolute;
  left: 2.5vw;
  bottom: 3vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.9rem;
}

.climb-lookback-btn {
  pointer-events: auto;
  background: rgba(20, 10, 40, 0.62);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 175, 55, 0.38);
  border-radius: 999px;
  padding: 0.55rem 1.5rem;
  color: rgba(240, 207, 90, 0.92);
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: color 0.4s ease, border-color 0.4s ease, background 0.4s ease;
}

.climb-lookback-btn:hover,
.climb-lookback-btn:focus-visible {
  color: #FFE9A3;
  border-color: rgba(212, 175, 55, 0.75);
  background: rgba(30, 16, 55, 0.78);
}

.climb-line--thanks {
  max-width: min(88vw, 440px);
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  background: radial-gradient(
    ellipse at center,
    rgba(6, 3, 14, 0.84) 0%,
    rgba(6, 3, 14, 0.55) 50%,
    rgba(6, 3, 14, 0) 80%
  );
  font-size: clamp(0.92rem, 1.35vw, 1.08rem);
  color: #FFE9A3;
  text-shadow: 0 2px 12px rgba(4, 2, 10, 0.95), 0 0 28px rgba(201, 162, 39, 0.4);
}

/* ===== Schmale Viewports =====
   Seitliche Spalten haben hier keinen Platz. Die Stufen ruecken
   deshalb in zwei uebereinanderliegende Baender in die Bildmitte -
   sichtbar bleiben sie, das war der Punkt. */
@media (max-width: 1024px) {
  .climb-words {
    left: 50%;
    right: auto;
    top: auto;
    transform: translateX(-50%);
    align-items: center;
    font-size: 0.82rem;
    gap: 0.6rem;
  }

  /* Beide Baender in die obere Haelfte: die untere gehoert auf
     schmalen Geraeten dem Cookie-Banner, das dort ueber die volle
     Breite liegt. Unten waeren die Stufen beim ersten Besuch - also
     genau bei Zulauf aus Social Media - schlicht verdeckt. */
  .climb-words--left,
  .climb-words--right { top: 22vh; }

  /* Ohne die seitliche Staffelung, die nur im Spaltenlayout als
     Treppe lesbar ist. */
  .climb-words--left li,
  .climb-words--right li {
    transform: none;
  }

  .climb-words::before { align-self: center; }

  .climb-line--foot {
    top: 12vh;
    width: min(92vw, 420px);
    padding: 0.85rem 1.4rem;
    font-size: 0.95rem;
  }

  .climb-presence {
    bottom: auto;
    top: 72vh;
    width: 84px;
    height: 96px;
  }

  /* Der Rueckblick entfaellt hier. Er saesse zwangslaeufig hinter dem
     Cookie-Banner und waere nicht bedienbar; ein Knopf, der sich mit
     einem Banner um dieselbe Flaeche streitet, ist schlechter als
     keiner. Die Botschaft tragen auf Mobile Zitat und Praesenz. */
  .climb-lookback { display: none; }

}

@media (prefers-reduced-motion: reduce) {
  /* Die Lichtwechsel bleiben - sie sind der Inhalt. Was entfaellt,
     ist die scrollgekoppelte Verschiebung und das Eigenleben. Die
     Beats entfallen komplett (siehe setupBeats): alle Seiten-Sets
     stehen statisch im Endzustand. */
  .climb-fog,
  .climb-sky,
  .climb-words--left li,
  .climb-words--right li {
    transform: none;
  }

  .climb-line--foot { transform: translateX(-50%); }

  .climb-presence,
  .climb-leaves,
  .climb-portal-haze { animation: none; }

  .climb-words--right span::before,
  .climb-words--right span::after {
    animation: none;
    opacity: 0.7;
  }
}

/* Reduzierte Bewegung auf schmalen Viewports: beide Listen teilen
   sich dasselbe Band - statisch steht nur die rechte, der Endzustand
   der Abloesung. */
@media (max-width: 1024px) and (prefers-reduced-motion: reduce) {
  .climb-words--left { display: none; }
}

/* ===== SPOTLIGHT BEAMS ===== */
.spotlight {
  position: absolute;
  top: 0;
  width: 350px;
  height: 100%;
  pointer-events: none;
  /* Leiser als frueher (0.35): drei Lichtkegel von oben sind Buehne,
     nicht Hauptdarsteller. */
  opacity: 0.16;
  mix-blend-mode: screen;
  animation: spotlight-pulse 8s ease-in-out infinite;
}
.spotlight-left {
  left: 15%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(212,175,55,0.7) 0%, transparent 30%);
  animation-delay: 0s;
}
.spotlight-center {
  left: 50%; transform: translateX(-50%);
  background: conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0.8) 0%, transparent 30%);
  animation-delay: -3s;
}
.spotlight-right {
  right: 15%;
  background: conic-gradient(from 180deg at 50% 0%, rgba(139,92,246,0.7) 0%, transparent 30%);
  animation-delay: -5s;
}
@keyframes spotlight-pulse {
  0%, 100% { opacity: 0.10; }
  50% { opacity: 0.22; }
}

/* ===== 3D STAGE FLOOR ===== */
.stage-floor {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 30%;
  background: linear-gradient(to top,
    rgba(20,0,60,0.6) 0%,
    rgba(60,30,120,0.2) 50%,
    transparent 100%
  );
  transform: perspective(600px) rotateX(10deg);
  transform-origin: bottom center;
  pointer-events: none;
  z-index: 0;
}

/* ===== FLOATING PARTICLES ===== */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.particle {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: calc(4px * var(--s));
  height: calc(4px * var(--s));
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,175,55,0.9), rgba(255,255,255,0.4));
  animation: float-particle var(--d) ease-in-out infinite alternate;
  box-shadow: 0 0 6px rgba(212,175,55,0.6);
}
@keyframes float-particle {
  from { transform: translateY(0px) scale(1); opacity: 0.6; }
  to   { transform: translateY(-25px) scale(1.4); opacity: 1; }
}


@keyframes bg-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.panthers-container {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  height: 80vh;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: visible; /* Wichtig für die 3D Effekte */
}

/* Glassy Licht-Reflexion (Sweeping Sheen), der über die Panther gleitet */
.panthers-container::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  /* Halbiert (0.3 -> 0.15): der Sheen soll streifen, nicht blitzen. */
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  animation: glassy-sweep 10s infinite;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: overlay;
}

@keyframes glassy-sweep {
  0% { left: -150%; }
  15% { left: 200%; }
  100% { left: 200%; }
}

/* Magische Nebel-Hintergründe (Blur) */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  /* Von 0.8 auf 0.55: die Nebelhoefe stuetzen das Portal, sie sind
     nicht selbst die Lichtquelle. */
  opacity: 0.55;
}

.glow-center {
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 70vh; height: 70vh;
  background: radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%);
  animation: pulse-glow 12s infinite alternate;
}

.glow-left {
  left: 5%; bottom: -10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(230,210,255,0.6), transparent 70%);
  animation: pulse-glow 10s infinite alternate-reverse;
}

.glow-right {
  right: 5%; bottom: -10%;
  width: 50vh; height: 50vh;
  background: radial-gradient(circle, rgba(230,210,255,0.6), transparent 70%);
  animation: pulse-glow 14s infinite alternate;
}

@keyframes pulse-glow {
  0% { transform: scale(0.9) translate(-50%, -50%); opacity: 0.35; }
  100% { transform: scale(1.05) translate(-50%, -50%); opacity: 0.55; }
}

.glow-left, .glow-right {
  transform: translate(0, 0); /* override center translation */
}

@keyframes pulse-glow-side {
  0% { transform: scale(0.9); opacity: 0.35; }
  100% { transform: scale(1.05); opacity: 0.55; }
}
.glow-left { animation-name: pulse-glow-side; }
.glow-right { animation-name: pulse-glow-side; }

/* Weichgezeichnete, verschwommene Ringe (mehrere pro Figur) */
.blurry-ring-wrapper {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper-center {
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 95vh; height: 95vh; /* Mitgewachsen mit dem Panther */
}

.wrapper-left {
  left: 0%; bottom: 5%;
  width: 40vh; height: 40vh; /* Verkleinert */
}

.wrapper-right {
  right: 0%; bottom: 5%;
  width: 40vh; height: 40vh; /* Verkleinert */
}

.blurry-ring {
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}

/* Keyframes für fließende Rotation und sanftes Pulsieren */
@keyframes spin-ring-outer {
  0% { transform: rotate(0deg) scale(0.95); opacity: 0.6; }
  50% { transform: rotate(180deg) scale(1.05); opacity: 0.9; }
  100% { transform: rotate(360deg) scale(0.95); opacity: 0.6; }
}

@keyframes spin-ring-inner {
  0% { transform: rotate(360deg) scale(1); opacity: 0.8; }
  50% { transform: rotate(180deg) scale(0.9); opacity: 0.5; }
  100% { transform: rotate(0deg) scale(1); opacity: 0.8; }
}

/* Center Panther Ringe */
.ring-center.outer {
  width: 100%; height: 100%;
  border: 15px dashed rgba(212, 175, 55, 0.4); /* Gold */
  filter: blur(12px);
  animation: spin-ring-outer 15s linear infinite;
}
.ring-center.inner {
  width: 75%; height: 75%;
  border: 8px solid rgba(45, 27, 84, 0.5); /* Lila */
  filter: blur(6px);
  animation: spin-ring-inner 10s linear infinite;
}

/* Linker Panther Ringe */
.ring-left.outer {
  width: 100%; height: 100%;
  border: 10px dashed rgba(45, 27, 84, 0.4);
  filter: blur(10px);
  animation: spin-ring-outer 12s linear infinite reverse;
}
.ring-left.inner {
  width: 80%; height: 80%;
  border: 6px dotted rgba(212, 175, 55, 0.4);
  filter: blur(5px);
  animation: spin-ring-inner 9s linear infinite;
}

/* Rechter Panther Ringe */
.ring-right.outer {
  width: 100%; height: 100%;
  border: 10px solid rgba(255, 255, 255, 0.5);
  filter: blur(10px);
  animation: spin-ring-outer 14s linear infinite;
}
.ring-right.inner {
  width: 70%; height: 70%;
  border: 6px dashed rgba(45, 27, 84, 0.3);
  filter: blur(5px);
  animation: spin-ring-inner 11s linear infinite reverse;
}

.panther {
  position: absolute;
  bottom: 0;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.panther-center {
  height: 100%;
  z-index: 3;
  animation: float-3d-center 8s ease-in-out infinite;
  filter: drop-shadow(0 30px 50px rgba(0,0,0,0.5)) drop-shadow(0 0 60px rgba(212,175,55,0.25));
  /* Freistellung in zwei Lagen, damit kein Rechteckrand stehen bleibt.
     Der Container ist 2:3, deshalb ergibt eine Ellipse mit rx = 1,5 x ry
     einen exakten Kreis.

     Lage 1: Kreis um den Portalring (Mittelpunkt 50,7 % / 45,1 %,
             Ringradius 35 % der Breite) - deckend bis 41 %, ausgeblendet
             zum Containerrand hin.
     Lage 2: die Steintreppe darunter, weich nach aussen auslaufend.
     Mehrere Maskenlagen werden per Vorgabe vereinigt. */
  mask-image:
    radial-gradient(ellipse 50% 33.33% at 50.7% 45.1%, #000 0%, #000 82%, transparent 100%),
    radial-gradient(ellipse 26% 17% at 50% 81%, #000 0%, rgba(0,0,0,0.92) 34%, transparent 100%);
  -webkit-mask-image:
    radial-gradient(ellipse 50% 33.33% at 50.7% 45.1%, #000 0%, #000 82%, transparent 100%),
    radial-gradient(ellipse 26% 17% at 50% 81%, #000 0%, rgba(0,0,0,0.92) 34%, transparent 100%);
}

@keyframes float-3d-center {
  0%   { transform: perspective(1200px) rotateY(0deg) rotateX(2deg) translateY(0px) scale(1); }
  /* Schneller, snappiger Punch bei 25% */
  22%  { transform: perspective(1200px) rotateY(2deg) rotateX(0deg) translateY(-5px) scale(1); }
  25%  { transform: perspective(1200px) rotateY(4deg) rotateX(-4deg) translateY(-20px) scale(1.15); }
  30%  { transform: perspective(1200px) rotateY(3deg) rotateX(-2deg) translateY(-14px) scale(1.06); }
  35%  { transform: perspective(1200px) rotateY(4deg) rotateX(-2deg) translateY(-16px) scale(1.1); }
  60%  { transform: perspective(1200px) rotateY(2deg) rotateX(0deg) translateY(-4px) scale(1); }
  100% { transform: perspective(1200px) rotateY(0deg) rotateX(2deg) translateY(0px) scale(1); }
}

.panther-left {
  height: 42%;
  left: 4%;
  z-index: 2;
  animation: float-3d-left 9s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}

@keyframes float-3d-left {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(-5deg) translateY(-12px) scale(1.03); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}

.panther-right {
  height: 42%;
  right: 4%;
  z-index: 2;
  animation: float-3d-right 10s ease-in-out infinite;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.25));
}

@keyframes float-3d-right {
  0% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
  50% { transform: perspective(1200px) rotateY(5deg) translateY(-12px) scale(1.03); }
  100% { transform: perspective(1200px) rotateY(0deg) translateY(0px) scale(1); }
}

@media (max-width: 1024px) {
  .panther-left, .panther-right, .ambient-glow, .portal-circle-left, .portal-circle-right {
    display: none;
  }
}

/* Portal-Kreise links/rechts: klickbare Navigations-Portale mit generierten Portal-Motiven */
.portal-circle {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 8px;
}

/* Das <picture> soll im Flex-Layout unsichtbar sein - das img bleibt
   direktes Flex-Kind wie zuvor, alle Masse gelten unveraendert. */
.portal-circle picture { display: contents; }

.portal-circle img {
  width: 78%;
  height: 78%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.35), 0 15px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.4s ease, box-shadow 0.4s ease, filter 0.4s ease;
}

.portal-circle:hover img,
.portal-circle:focus-visible img {
  transform: scale(1.06);
  box-shadow: 0 0 60px rgba(212, 175, 55, 0.6), 0 20px 40px rgba(0, 0, 0, 0.45);
  filter: brightness(1.08);
}

.portal-circle-left {
  left: 0%; bottom: 5%;
  width: 40vh; height: 40vh;
}

.portal-circle-right {
  right: 0%; bottom: 5%;
  width: 40vh; height: 40vh;
}

/* ===================================================================
   KREUZ-BILDUNTERSCHRIFTEN
   -------------------------------------------------------------------
   Geometrie haengt an denselben Massen wie .portal-circle-*:
   Portalbreite 40vh, aussen buendig, bottom 5% von 80vh = 4vh.
   Die halbe Portalbreite (20vh) ist damit die Portalmitte - Faeden und
   Bildunterschriften rechnen beide damit und bleiben deckungsgleich.

   Das sichtbare Bild endet 8,4vh ueber der Containerkante
   (4vh + (40vh - 31,2vh) / 2), die Beschriftung beginnt bei 5vh.
   =================================================================== */
.tb-cross {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* kein z-index: die Kinder sollen sich im Stacking-Kontext des
     .panthers-container einordnen, damit die Faeden hinter dem
     Emblem (z-index 3) liegen koennen. */
}

/* Die Kreuzung erschliesst sich Screenreadern nicht - deshalb die
   aufgeloeste Botschaft im Textfluss. */
.tb-cross-sr {
  position: absolute;
  width: 1px; height: 1px;
  margin: -1px; padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

/* --- Die beiden Leselinien --- */
.tb-threads {
  position: absolute;
  /* Exakt von Portalmitte zu Portalmitte */
  left: 20vh;
  right: 20vh;
  bottom: 0;
  height: 26vh;
  z-index: 2;              /* hinter dem Emblem (.panther-center: 3) */
  overflow: visible;
  pointer-events: none;
  /* Nur aufhellen, nie abdunkeln: die Faeden koennen Treppe und Ring
     queren, ohne als Balken darueber zu liegen. */
  mix-blend-mode: screen;
}

.tb-thread {
  fill: none;
  stroke: #F0CF5A;
  stroke-width: 1.15;
  stroke-linecap: round;
  opacity: 0.28;
  /* Der viewBox wird stark verzerrt (preserveAspectRatio="none");
     ohne das bliebe die Linie nicht gleichmaessig duenn. */
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 4px rgba(201, 162, 39, 0.55));
  transition: opacity 0.6s ease, stroke-width 0.6s ease;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: tb-thread-draw 2.6s ease-out 0.9s forwards;
}

@keyframes tb-thread-draw {
  to { stroke-dashoffset: 0; }
}

/* Wanderndes Glanzlicht - ein kurzes Segment laeuft die Bahn entlang. */
.tb-glint {
  fill: none;
  stroke: #FFF3C4;
  stroke-width: 1.5;
  stroke-linecap: round;
  opacity: 0.5;
  vector-effect: non-scaling-stroke;
  filter: drop-shadow(0 0 6px rgba(240, 207, 90, 0.9));
  stroke-dasharray: 5 95;
  animation: tb-glint-travel 11s linear 3.4s infinite;
}

.tb-glint--b { animation-delay: 8.9s; }

@keyframes tb-glint-travel {
  0%   { stroke-dashoffset: 100; opacity: 0; }
  8%   { opacity: 0.5; }
  45%  { opacity: 0.5; }
  55%  { stroke-dashoffset: 0; opacity: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

/* --- Die Wortpaare --- */
.tb-caption {
  position: absolute;
  bottom: 0.4vh;
  width: 40vh;             /* deckungsgleich mit .portal-circle-* */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1vh;
  z-index: 4;              /* vor Schatten und Ringen */
  text-align: center;
  pointer-events: none;
  /* Kein Lade-Fade mehr: den Auftritt fuehren die Scroll-Beats
     (GSAP, autoAlpha). Sichtbar als Basiszustand traegt zugleich
     den Reduced-Motion-Fall. */
}

.tb-caption--left  { left: 0; }
.tb-caption--right { right: 0; }

.tb-word {
  display: block;
  line-height: 1;
  font-family: 'Century Gothic', system-ui, sans-serif;
  transition: color 0.5s ease, text-shadow 0.5s ease, opacity 0.5s ease;
}

/* Das tragende Wort - Versalien und Sperrung greifen die goldene
   Wortmarke TRUST BRIDGE im Emblem auf. */
.tb-lead {
  font-size: clamp(1.05rem, 2.15vh, 1.6rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  text-indent: 0.22em;     /* gleicht die Sperrung am rechten Rand aus */
  color: #F0CF5A;
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.9),
    0 2px 8px rgba(4, 2, 10, 0.95),
    0 0 22px rgba(201, 162, 39, 0.55);
}

/* Das leichtere Wort - Kleinschreibung, zurueckgenommen, minimal zur
   Mitte geneigt, damit es auf der Bahn seines Fadens liegt. */
.tb-tail {
  font-size: clamp(0.72rem, 1.35vh, 1rem);
  font-weight: 400;
  letter-spacing: 0.08em;
  color: rgba(142, 245, 210, 0.72);
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.9),
    0 2px 8px rgba(4, 2, 10, 0.9);
}

.tb-caption--left  .tb-tail { transform: rotate(-2.6deg); }
.tb-caption--right .tb-tail { transform: rotate(2.6deg); }

/* --- Hover: das zusammengehoerige Kreuzpaar leuchtet gemeinsam auf ---
   Ueber :has() am Container, damit links und rechts ohne JS reagieren. */
.panthers-container:has(.portal-circle-left:hover) .tb-key--trust,
.panthers-container:has(.portal-circle-left:focus-visible) .tb-key--trust,
.panthers-container:has(.portal-circle-right:hover) .tb-key--bridge,
.panthers-container:has(.portal-circle-right:focus-visible) .tb-key--bridge {
  color: #FFE9A3;
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.9),
    0 2px 8px rgba(4, 2, 10, 0.95),
    0 0 26px rgba(240, 207, 90, 0.95),
    0 0 60px rgba(201, 162, 39, 0.55);
}

.panthers-container:has(.portal-circle-left:hover) .tb-key--yourself,
.panthers-container:has(.portal-circle-left:focus-visible) .tb-key--yourself,
.panthers-container:has(.portal-circle-right:hover) .tb-key--gap,
.panthers-container:has(.portal-circle-right:focus-visible) .tb-key--gap {
  color: rgba(190, 252, 230, 0.95);
  text-shadow:
    0 1px 0 rgba(4, 2, 10, 0.9),
    0 2px 8px rgba(4, 2, 10, 0.9),
    0 0 22px rgba(142, 245, 210, 0.6);
}

/* Der zugehoerige Faden zieht mit an. */
.panthers-container:has(.portal-circle-left:hover) .tb-thread--a,
.panthers-container:has(.portal-circle-left:focus-visible) .tb-thread--a,
.panthers-container:has(.portal-circle-right:hover) .tb-thread--b,
.panthers-container:has(.portal-circle-right:focus-visible) .tb-thread--b {
  opacity: 0.7;
  stroke-width: 1.4;
}

@media (prefers-reduced-motion: reduce) {
  .tb-thread {
    animation: none;
    stroke-dashoffset: 0;
  }
  .tb-glint { display: none; }
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
  width: 100%;
  max-width: 1340px;
  /* Frueher 80vh, um dem absolut liegenden Portal auszuweichen. Das
     Portal steht jetzt in .climb-track, die ihren Platz im Fluss
     selbst beansprucht - ein zusaetzlicher Abstand wuerde hier nur
     ein leeres Loch hinter dem Aufstieg aufreissen. */
  margin-top: 0;
}

.hero-title-wrapper {
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.title-crown {
  width: 50px;
  height: 40px;
}

.crown-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 10px; /* Deutlich mehr Abstand zur Schrift unten */
}

.crown-wrapper::before,
.crown-wrapper::after {
  content: "";
  display: block;
  width: 150px;
  height: 2px;
}

.crown-wrapper::before {
  background: linear-gradient(90deg, transparent, #cda434);
}

.crown-wrapper::after {
  background: linear-gradient(90deg, #cda434, transparent);
}

.hero-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 4.5rem;
  margin: 0 auto 0.5rem;
  max-width: 900px;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  
  /* Animierter Gradient */
  background: linear-gradient(to right, #ffffff, #e3cbf7, #f7d25e, #e3cbf7, #ffffff);
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
  background-size: 300% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* 3D Float & Shine Animation */
  animation: title-shine 8s linear infinite, title-float 6s ease-in-out infinite;
}

@keyframes title-shine {
  to { background-position: 200% center; }
}

@keyframes title-float {
  0% { transform: perspective(1000px) rotateX(5deg) translateY(0px); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
  50% { transform: perspective(1000px) rotateX(-5deg) translateY(-8px); filter: drop-shadow(0 20px 15px rgba(0,0,0,0.3)); }
  100% { transform: perspective(1000px) rotateX(5deg) translateY(0px); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
}

  .brand-name {
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: 6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 15px;
    color: #8EF5D2; /* Glowing Mint / Legacy Mint */
    margin-top: 2.2rem;
    margin-bottom: 0rem;
    text-shadow: 0 0 45px rgba(142,245,210,1), 0 0 80px rgba(142,245,210,0.6), 0 0 150px rgba(142,245,210,0.4);
    position: relative;
    display: inline-block;
  }
  
  /* Optisch ausgeblendet, im Dokument erhalten: die sichtbare Wortmarke
     ist der goldene Schriftzug im Portal darueber. */
  .brand-name--sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  .brand-name::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 160%; height: 200%;
    background: radial-gradient(ellipse, rgba(142,245,210,0.15) 0%, transparent 60%);
    z-index: -1;
    pointer-events: none;
    filter: blur(25px);
  }

  /* Tresor-Look: feine Serife, Versalien, starke Sperrung - kuehl-
     luxurioes statt romantisch. Die Schreibschrift lebt nur noch im
     &-Akzent weiter (.tresor-amp). text-indent gleicht die Sperrung
     am Zeilenende aus, sonst saesse der zentrierte Text leicht links. */
  .tresor-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.1rem;
    line-height: 1.45;
    text-transform: uppercase;
    letter-spacing: 0.30em;
    text-indent: 0.30em;
    text-align: center;
    margin-top: 3.2rem; /* ersetzt den Abstand der ausgeblendeten Wortmarke */
    margin-bottom: 30px;
    text-shadow: 0 5px 20px rgba(0,0,0,0.8);
    font-weight: 500;
  }

  .tresor-amp {
    font-family: 'Great Vibes', cursive;
    font-size: 1.45em;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    vertical-align: -0.12em;
  }
  
  /* Ebene 1 – Legacy Mint, Glow-Aufbau wie bei .brand-name */
  /* Lokale Abdunklung hinter der Tagline.
     Ohne sie liegt an einer Stelle ein Lichtkegel direkt hinter der Zeile;
     Gold erreicht dort nur 2,64:1 und verfehlt die 3:1 fuer Grosstext.
     Weicher Radialverlauf, kein sichtbarer Kasten. */
  .tresor-text {
    position: relative;
    isolation: isolate;
    /* Hebt den globalen h1-Verlauf aus app.css auf. */
    background: none;
    -webkit-background-clip: border-box;
    background-clip: border-box;
  }

  .tresor-text::before {
    content: '';
    position: absolute;
    /* Sehr weit ueber den Text hinaus und flach auslaufend: wirkt als
       Tiefe im Raum, nicht als Kasten. Der frueher sichtbare Balken kam
       von einem zu engen Radius mit zu hoher Deckkraft. */
    inset: -120% -45%;
    background: radial-gradient(
      ellipse at center,
      rgba(6, 3, 14, 0.5) 0%,
      rgba(6, 3, 14, 0.34) 30%,
      rgba(6, 3, 14, 0.16) 52%,
      transparent 72%
    );
    z-index: -1;
    pointer-events: none;
  }

  /* Der volle Bloom aus der Schreibschrift-Zeit, fuer die Serife
     nachgezogen: die duennen Striche emittieren weniger Flaeche,
     deshalb eine dichte innere Lage (18px) unter den weiten Hoefen. */
  .tresor-mint {
    color: #8EF5D2;
    -webkit-text-fill-color: #8EF5D2;
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.9),
      0 3px 10px rgba(4, 2, 10, 0.95),
      0 0 18px rgba(142, 245, 210, 0.95),
      0 0 45px rgba(142, 245, 210, 0.85),
      0 0 90px rgba(142, 245, 210, 0.55),
      0 0 165px rgba(142, 245, 210, 0.35);
  }

  .tresor-gold {
    /* Buchstaben im hellen Gold aus der Palette (.guarantee-link).
       #C9A227 erreichte gefuellt nur 2,54:1 auf 390 px und verfehlte die
       3:1 fuer Grosstext; #F0CF5A liegt bei 4,02:1. Der tiefere Ton
       bleibt als Glow dahinter erhalten. */
    color: #F0CF5A;
    -webkit-text-fill-color: #F0CF5A;
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.9),
      0 3px 10px rgba(4, 2, 10, 0.95),
      0 0 16px rgba(240, 207, 90, 0.95),
      0 0 35px rgba(201, 162, 39, 1),
      0 0 70px rgba(201, 162, 39, 0.65),
      0 0 135px rgba(201, 162, 39, 0.42);
  }
  
  .tresor-silver {
    color: #E2E8F0;
  }
  
  /* Die Frage ueber den drei Standpunkten. Bewusst kein Gradient und
     kein grosser Auftritt - eine ruhige, direkte Frage in der
     Systemschrift, die zur Selbstverortung einlaedt. */
  .shards-heading {
    margin: 0 0 1.8rem;
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: clamp(1.2rem, 1.8vw, 1.55rem);
    font-weight: 600;
    letter-spacing: 0.12em;
    color: rgba(248, 250, 252, 0.94);
    background: none;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    -webkit-text-fill-color: rgba(248, 250, 252, 0.94);
    text-shadow: 0 2px 12px rgba(4, 2, 10, 0.9), 0 0 30px rgba(212, 175, 55, 0.25);
  }

  /* --- Die Schwelle zwischen Aufstieg und Angebot --- */
  .climb-threshold {
    margin: 0.5rem auto 3rem;
    text-align: center;
  }

  /* Der Faden: eine duenne Goldlinie, die von oben kommend im Text
     endet - die Fortsetzung der Portallinie in den Handel. */
  .climb-threshold::before {
    content: '';
    display: block;
    width: 1px;
    height: 52px;
    margin: 0 auto 1.3rem;
    background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.75));
  }

  .climb-threshold-line {
    margin: 0;
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: clamp(0.98rem, 1.3vw, 1.15rem);
    line-height: 1.85;
    letter-spacing: 0.04em;
    color: rgba(248, 250, 252, 0.88);
    text-shadow: 0 2px 10px rgba(4, 2, 10, 0.9);
  }

  .poetic-quote-wrapper {
    position: relative;
    display: inline-block;
    padding: 25px 50px;
    margin-top: 10px;
    margin-bottom: 50px;
    /* Kein Rahmen und keine Flaeche: der Spruch soll frei im Raum stehen.
       Die beiden feinen Goldstriche darueber und darunter bleiben als
       Ornament erhalten. */
    z-index: 10;
  }
  
  .poetic-quote-wrapper::before, .poetic-quote-wrapper::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 2px;
    background: #C9A227;
    box-shadow: 0 0 15px rgba(201, 162, 39, 0.9);
  }
  
  .poetic-quote-wrapper::before { top: -1px; }
  .poetic-quote-wrapper::after { bottom: -1px; }

  .hero-poetic-quote {
    font-family: 'Century Gothic', system-ui, sans-serif;
    font-size: 1.3rem;
    font-style: italic;
    color: #FFFFFF;
    font-weight: 600;
    line-height: 1.9;
    text-align: center;
    margin: 0;
    letter-spacing: 0.6px;
    /* Freistehend mit Tiefe: erst zwei enge dunkle Lagen fuer die
       plastische Kante, darueber ein weiches weisses Leuchten und
       aussen ein Hauch Mint aus der Markenpalette. */
    text-shadow:
      0 1px 0 rgba(4, 2, 10, 0.95),
      0 2px 3px rgba(4, 2, 10, 0.9),
      0 4px 16px rgba(4, 2, 10, 0.95),
      0 0 18px rgba(255, 255, 255, 0.45),
      0 0 38px rgba(255, 255, 255, 0.22),
      0 0 70px rgba(142, 245, 210, 0.28);
  }
  
  .hero-subtitle {
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 15px;
    margin-bottom: 55px;
    text-align: center;
    text-shadow: 0 4px 15px rgba(0,0,0,0.8);
  }

  .hero-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-bottom: 1.5rem;
    z-index: 10;
  }
  
  /* --- 3 Premium Shards --- */
  .hero-shards-grid {
    display: flex;
    gap: 30px;
    margin-top: 30px;
    max-width: 1200px;
    width: 100%;
    align-items: stretch;
  }
  @media (max-width: 900px) {
    .hero-shards-grid { 
      flex-direction: column; 
      align-items: center; 
      gap: 25px; 
    }
  }
  
  .hero-shard {
    flex: 1;
    position: relative; border-radius: 24px; padding: 2.5rem 1.8rem;
    /* Der Lift folgt der Hand des Heros: kurz und entschieden
       (power2.out als Bezier), kein langes Nachfedern. Bewusst als
       CSS-Hover statt GSAP - ein Inline-Transform wuerde sich mit
       den Eintritts-Reveals in die Quere kommen. */
    text-align: center; cursor: pointer; transition: transform 0.3s cubic-bezier(0.5, 1, 0.89, 1);
    transform-style: preserve-3d; min-width: 300px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-decoration: none; color: #fff;
    /* Reset button styles */
    background: transparent; border: none; outline: none; appearance: none;
  }

  /* --- Goldschimmer-Rahmen ---
     Die Kacheln nehmen das Licht der Ringe aus dem Hero auf: eine
     1px-Kante, auf der ein warmes Gold mit einem Hauch Petrol
     entlanglaeuft. Die Maske stanzt die Flaeche aus, uebrig bleibt
     nur der Rahmen - Glas und Verlaeufe darunter bleiben unberuehrt.
     Versetzte Takte wie beim Sheen, damit die drei nicht blinken. */
  .hero-shard::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(115deg,
      rgba(212, 175, 55, 0) 0%,
      rgba(212, 175, 55, 0.85) 22%,
      rgba(255, 232, 160, 0.95) 32%,
      rgba(79, 227, 212, 0.45) 52%,
      rgba(212, 175, 55, 0) 68%,
      rgba(212, 175, 55, 0.6) 86%,
      rgba(212, 175, 55, 0) 100%);
    background-size: 220% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: shard-rim-shimmer 7s ease-in-out infinite;
    opacity: 0.75;
    pointer-events: none;
    z-index: 3;
  }
  .shard-left::after   { animation-delay: 0s; }
  .shard-center::after { animation-delay: -2.3s; opacity: 0.95; }
  .shard-right::after  { animation-delay: -4.6s; }

  @keyframes shard-rim-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (max-width: 900px) {
    .hero-shard { min-width: 100%; max-width: 400px; padding: 2.5rem 2rem; }
    .shard-center { order: -1; } /* On mobile, Center (Box auswählen) goes first! */
  }

  .hero-shard:hover { transform: translateY(-6px); z-index: 10; }
  .hero-shard:active { transform: translateY(-2px) scale(0.99); transition: transform 0.1s ease; }

  /* Shard Center (Box auswählen) is slightly larger and more prominent */
  .shard-center {
    transform: scale(1.06);
    z-index: 5;
  }
  .shard-center:hover {
    transform: translateY(-6px) scale(1.06);
  }
  .shard-center:active {
    transform: translateY(-2px) scale(1.04);
  }

  /* Der Schatten waechst mit dem Lift - die Kachel hebt vom Grund ab,
     statt zu springen. */
  .hero-shard:hover .shard-glass {
    box-shadow:
      0 40px 70px rgba(0, 0, 0, 0.7),
      0 0 30px rgba(212, 175, 55, 0.14),
      inset 0 0 45px rgba(255, 255, 255, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
  .shard-center:hover .shard-glass {
    box-shadow:
      0 50px 90px rgba(0, 0, 0, 0.85),
      0 0 36px rgba(212, 175, 55, 0.2),
      inset 0 0 50px rgba(142, 245, 210, 0.3),
      inset 0 2px 15px rgba(212, 175, 55, 0.55);
  }
  
  /* Base Glass */
  .shard-glass {
    position: absolute; inset: 0; 
    backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
    border-radius: 24px; border: 1px solid rgba(255,255,255,0.15);
    border-top: 1px solid rgba(255,255,255,0.3); border-left: 1px solid rgba(255,255,255,0.25);
    box-shadow:
      0 30px 60px rgba(0,0,0,0.6),
      inset 0 0 45px rgba(255,255,255,0.1),
      inset 0 1px 0 rgba(255,255,255,0.45);
    transition: all 0.5s ease; overflow: hidden;
  }
  
  /* Glass Colors */
  .shard-left .shard-glass {
    /* Royal Violet & Gold Note */
    background: linear-gradient(135deg, rgba(60, 30, 90, 0.48) 0%, rgba(212, 175, 55, 0.12) 100%);
    border-top-color: rgba(212, 175, 55, 0.6);
    border-left-color: rgba(139, 92, 246, 0.45);
  }
  .shard-center .shard-glass {
    /* Rich Legacy Mint & Strong Gold Edge */
    background: linear-gradient(135deg, rgba(142, 245, 210, 0.45) 0%, rgba(212, 175, 55, 0.25) 100%);
    box-shadow: 0 40px 80px rgba(0,0,0,0.85), inset 0 0 50px rgba(142,245,210,0.25), inset 0 2px 15px rgba(212,175,55,0.5);
    border-top-color: rgba(212, 175, 55, 0.8);
    border-left-color: rgba(142, 245, 210, 0.7);
  }
  .shard-right .shard-glass {
    /* Royal Violet & Gold Note */
    background: linear-gradient(135deg, rgba(60, 30, 90, 0.48) 0%, rgba(212, 175, 55, 0.12) 100%);
    border-top-color: rgba(212, 175, 55, 0.6);
    border-left-color: rgba(139, 92, 246, 0.45);
  }
  
  /* Hover Glass Colors */
  .shard-left:hover .shard-glass { background: linear-gradient(135deg, rgba(60, 30, 90, 0.5) 0%, rgba(212, 175, 55, 0.15) 100%); }
  .shard-center:hover .shard-glass { background: linear-gradient(135deg, rgba(142, 245, 210, 0.55) 0%, rgba(212, 175, 55, 0.35) 100%); }
  .shard-right:hover .shard-glass { background: linear-gradient(135deg, rgba(60, 30, 90, 0.5) 0%, rgba(212, 175, 55, 0.15) 100%); }
  
  .shard-refraction {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 40%, rgba(255,255,255,0.12) 60%, transparent 100%);
    border-radius: 24px; pointer-events: none; opacity: 0.9; transition: opacity 0.4s ease;
    overflow: hidden;
  }

  /* Wandernder Lichtschein ueber dem Glas – nimmt den Sweep der Portale auf */
  .shard-refraction::after {
    content: '';
    position: absolute;
    top: 0; left: -60%;
    width: 45%; height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-22deg);
    animation: shard-sheen 7s ease-in-out infinite;
    pointer-events: none;
  }
  .shard-left  .shard-refraction::after { animation-delay: 0s; }
  .shard-center .shard-refraction::after { animation-delay: -2.3s; }
  .shard-right .shard-refraction::after { animation-delay: -4.6s; }

  @keyframes shard-sheen {
    0%        { left: -60%; }
    35%, 100% { left: 160%; }
  }
  
  .shard-aura {
    position: absolute; inset: -4px; border-radius: 28px;
    background-size: 300% 300%;
    /* Im Ruhezustand bereits sichtbar, damit das Glas auch ohne Hover lebt */
    opacity: 0.42; filter: blur(18px);
    animation: auraSpin 9s linear infinite;
    transition: opacity 0.4s ease, filter 0.4s ease; z-index: -1;
  }

  @keyframes auraSpin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Auras */
  .shard-left .shard-aura { background: linear-gradient(45deg, #3c1e5a, #D4AF37, #5c3b8a, #3c1e5a); }
  .shard-center .shard-aura { background: linear-gradient(45deg, #8EF5D2, #D4AF37, #5CE1C6, #8EF5D2); }
  .shard-right .shard-aura { background: linear-gradient(45deg, #D4AF37, #3c1e5a, #8b5cf6, #D4AF37); }
  
  .hero-shard:hover .shard-aura { opacity: 0.95; filter: blur(22px); animation-duration: 3s; }
  .shard-center .shard-aura { opacity: 0.6; }
  .shard-center:hover .shard-aura { opacity: 1; }
  
  .shard-icon {
    margin-bottom: 25px;
    position: relative;
    z-index: 2;
    transition: transform 0.4s ease;
    color: rgba(255,255,255,0.9); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.6));
  }
  .shard-icon svg { width: 42px; height: 42px; }
  .shard-center .shard-icon svg { 
    width: 54px; height: 54px; 
    color: #8EF5D2; 
    filter: drop-shadow(0 0 15px rgba(212,175,55,0.6)); /* Subtle Gold Note */
  }
  
  /* Beim Hover pulst nur das Licht um das Icon - keine Skalierung,
     keine Rotation: die Zeichnung der Shards bleibt, wie sie ist.
     Der Puls liegt auf .shard-icon (filter), das Schweben des Moduls
     auf dem SVG (transform) - beides kommt sich nicht in die Quere. */
  .hero-shard:hover .shard-icon {
    color: #FFFFFF;
    animation: shard-icon-glow-pulse 1.8s ease-in-out infinite;
  }
  .shard-center:hover .shard-icon {
    color: #FFF;
    animation-name: shard-icon-glow-pulse-mint;
  }

  @keyframes shard-icon-glow-pulse {
    0%, 100% { filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 6px rgba(212, 175, 55, 0.35)); }
    50%      { filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 14px rgba(212, 175, 55, 0.75)); }
  }
  @keyframes shard-icon-glow-pulse-mint {
    0%, 100% { filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 8px rgba(142, 245, 210, 0.4)); }
    50%      { filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 18px rgba(142, 245, 210, 0.85)); }
  }
  
  .shard-content {
    position: relative;
    z-index: 2;
  }
  
  .shard-content h3 {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 12px;
    font-family: "Century Gothic", system-ui, sans-serif;
    text-shadow: 0 4px 15px rgba(0,0,0,0.6);
    color: #FFFFFF;
    transition: color 0.4s ease, text-shadow 0.4s ease;
    letter-spacing: 0.5px;
  }
  .shard-center .shard-content h3 {
    font-size: 2rem;
    font-weight: 900;
    color: #8EF5D2;
    text-shadow: 0 0 25px rgba(142,245,210,0.6), 0 2px 10px rgba(0,0,0,0.8);
  }
  
  .hero-shard:hover .shard-content h3 {
    text-shadow: 0 0 20px rgba(255,255,255,0.5);
  }
  .shard-center:hover .shard-content h3 {
    color: #FFFFFF;
    text-shadow: 0 0 35px rgba(142,245,210,0.9);
  }
  
  .shard-content p {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.85);
    margin: 0;
    line-height: 1.5;
    transition: color 0.4s ease;
    font-weight: 500;
  }
  .shard-center .shard-content p {
    font-size: 1.15rem;
    color: rgba(255,255,255,0.95);
  }
  .hero-shard:hover .shard-content p {
    color: #FFFFFF;
  }

/* --- Compact Guarantee Bar --- */
.hero-guarantee-bar {
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.08); /* Brighter */
  backdrop-filter: blur(15px);
  border: 1px solid rgba(212,175,55,0.4);
  border-radius: 50px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(212,175,55,0.15);
}
.guarantee-icon {
  flex-shrink: 0;
  width: 24px; height: 24px;
}
.guarantee-text {
  color: #FFFFFF;
  font-size: 1.05rem;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.guarantee-link {
  color: #F0CF5A;
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
  margin-left: 15px;
  transition: all 0.3s;
}
.guarantee-link:hover { color: #FFF; text-shadow: 0 0 10px rgba(240,207,90,0.8); }

@media (max-width: 768px) {
  .hero-guarantee-bar { flex-direction: column; text-align: center; border-radius: 20px; padding: 20px; }
  .guarantee-link { margin-left: 0; margin-top: 8px; }
}

/* --- Uebergabe an den Footer ---
   Das Band uebersetzt das wandernde Seitenlila in das Tiefviolett des
   Footers (#0b021d) und laesst unten einen Rest Goldlicht stehen -
   dieselbe Lichtsprache wie die Warmlicht-Ebene des Aufstiegs. Hier
   steht der volle Endzustand; das Scroll-Modul blendet ihn nur ein. */
.footer-transition {
  height: clamp(140px, 24vh, 240px);
  background:
    radial-gradient(ellipse 62% 85% at 50% 100%, rgba(212, 175, 55, 0.07) 0%, transparent 62%),
    linear-gradient(to bottom, rgba(11, 2, 29, 0) 0%, rgba(11, 2, 29, 0.55) 55%, #0b021d 100%);
  pointer-events: none;
}

/* --- Reduzierte Bewegung ---
   Die GSAP-Seite regelt das Modul selbst (homeLowerSections steigt
   komplett aus). Hier stehen die CSS-Gegenstuecke: der Goldschimmer
   wird zur ruhigen Goldkante, der Glow-Puls zum stehenden Glow. */
@media (prefers-reduced-motion: reduce) {
  .hero-shard::after {
    animation: none;
    background: linear-gradient(115deg, rgba(212, 175, 55, 0.55), rgba(79, 227, 212, 0.3), rgba(212, 175, 55, 0.55));
    background-size: 100% 100%;
  }
  .hero-shard:hover .shard-icon,
  .shard-center:hover .shard-icon {
    animation: none;
    filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.55));
  }
  /* Kein Lift: die Kacheln antworten nur noch ueber Licht und Farbe. */
  .hero-shard:hover, .hero-shard:active { transform: none; }
  .shard-center:hover, .shard-center:active { transform: scale(1.06); }
}

/* --- Modals --- */
.hero-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(5, 2, 10, 0.85);
  backdrop-filter: blur(25px);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.hero-modal-overlay.premium-overlay {
  background: rgba(5, 2, 10, 0.92);
  backdrop-filter: blur(35px);
}

.hero-modal-content {
  background: rgba(45, 20, 80, 0.85); /* Brighter purple glass */
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.2);
  border-top: 1px solid rgba(255,255,255,0.4);
  border-radius: 30px;
  position: relative;
  max-width: 800px; width: 100%;
  padding: 50px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(255,255,255,0.1);
}

/* --- Premium Video Modal (Royal Screen Frame) --- */
.video-modal.royal-screen-frame {
  background: linear-gradient(135deg, rgba(45, 20, 80, 0.9) 0%, rgba(20, 10, 40, 0.95) 100%);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(142, 245, 210, 0.15);
  border-top: 1px solid rgba(142, 245, 210, 0.35);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 36px;
  padding: 40px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 50px 120px rgba(0,0,0,0.95), 0 0 80px rgba(142,245,210,0.08), inset 0 0 60px rgba(212,175,55,0.05);
}

.royal-close {
  top: 25px; right: 25px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #C4B8D8;
  z-index: 20;
}
.royal-close:hover {
  background: rgba(142,245,210,0.15);
  color: #8EF5D2;
  border-color: rgba(142,245,210,0.4);
}

.royal-screen-header {
  text-align: center;
  margin-bottom: 25px;
  width: 100%;
}
.royal-screen-title {
  font-family: 'Century Gothic', system-ui, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 8px 0;
  text-shadow: 0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(142,245,210,0.2);
}
.royal-screen-subtitle {
  font-size: 1.1rem;
  color: #D4AF37; /* Gold */
  margin: 0;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.royal-screen-display {
  position: relative;
  width: 100%;
  border-radius: 20px;
  padding: 10px; /* Inner bezel */
  background: linear-gradient(180deg, rgba(20, 10, 35, 0.8) 0%, rgba(5, 2, 10, 0.9) 100%);
  box-shadow: inset 0 0 30px rgba(0,0,0,0.9), 0 15px 40px rgba(0,0,0,0.7);
  border: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.royal-screen-glow {
  position: absolute;
  inset: -3px;
  border-radius: 22px;
  background: linear-gradient(45deg, rgba(142,245,210,0.3), transparent 40%, transparent 60%, rgba(212,175,55,0.25));
  z-index: 0;
  pointer-events: none;
  filter: blur(10px);
}

.video-container {
  position: relative; 
  width: 100%; 
  padding-bottom: 56.25%; 
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 0 40px rgba(0,0,0,0.9);
}
.video-container iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}

.royal-screen-footer {
  margin-top: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.royal-cta {
  background: linear-gradient(135deg, #8EF5D2 0%, #5CE1C6 100%);
  color: #1a0b36 !important;
  font-size: 1.3rem;
  font-weight: 800;
  padding: 18px 50px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(142,245,210,0.4), inset 0 2px 5px rgba(255,255,255,0.6);
  transition: all 0.3s ease;
  border: 2px solid rgba(212,175,55,0.5); /* Gold touch */
  text-decoration: none;
}
.royal-cta:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 40px rgba(142,245,210,0.6), 0 0 30px rgba(212,175,55,0.4), inset 0 2px 10px rgba(255,255,255,0.8);
}

@media (max-width: 768px) {
  .video-modal.royal-screen-frame {
    padding: 25px 15px;
    border-radius: 24px;
  }
  .royal-screen-title { font-size: 1.6rem; }
  .royal-screen-subtitle { font-size: 0.9rem; }
  .royal-screen-display { padding: 6px; border-radius: 16px; }
  .video-container { border-radius: 10px; }
  .royal-cta { font-size: 1.1rem; padding: 15px 30px; }
  .royal-close { top: 15px; right: 15px; width: 36px; height: 36px; font-size: 1.5rem; }
}

.modal-close-btn {
  position: absolute; top: 20px; right: 20px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
  color: white; font-size: 1.8rem; cursor: pointer; width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: all 0.3s;
  z-index: 20;
}
.modal-close-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }

.info-modal { text-align: center; color: white; }
.modal-title { font-family: "Century Gothic", sans-serif; font-size: 2.6rem; color: #FFF; margin-bottom: 40px; text-shadow: 0 0 20px rgba(255,255,255,0.3); }
.steps-grid { display: flex; flex-direction: column; gap: 25px; margin-bottom: 50px; }
.step-card { 
  background: rgba(255,255,255,0.08); 
  padding: 25px; 
  border-radius: 20px; 
  display: flex; align-items: center; gap: 25px; 
  border: 1px solid rgba(142,245,210,0.3); 
  box-shadow: inset 0 0 20px rgba(142,245,210,0.05);
}
.step-num { 
  width: 50px; height: 50px; 
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6); 
  color: #000; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; 
  font-weight: 900; font-size: 1.5rem; flex-shrink: 0; 
  box-shadow: 0 0 20px rgba(142,245,210,0.4);
}
.step-card h4 { margin: 0; font-size: 1.4rem; text-align: left; font-weight: 700; color: #FFF; }

.modal-actions-center {
  padding: 20px; text-align: center;
}
.modal-cta { 
  padding: 18px 50px; 
  font-size: 1.3rem; 
  font-weight: 800;
  border-radius: 40px; 
  box-shadow: 0 10px 30px rgba(212,175,55,0.4);
}
.modal-cta:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(212,175,55,0.6);
}

/* ===================================================================
   MOBILE: Portal und Text entzerren
   -------------------------------------------------------------------
   Auf Desktop liegt .panthers-container absolut hinter dem Text und ist
   ueber height: 80vh dimensioniert. Auf schmalen Geraeten fuehrt das zu
   zwei Problemen: die Grafik wird 124vw breit (gemessen bei 390 px) und
   der Text liegt mit -213 px Abstand direkt auf Ring und Treppe.

   Unterhalb 1024 px wird daraus ein einfacher vertikaler Stapel:
   Portal oben, Text darunter, mit echtem Abstand.
   =================================================================== */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: clamp(96px, 18vw, 140px);
  }

  /* Die Bahn ist auf schmalen Geraeten kuerzer: der Aufstieg soll sich
     nicht wie eine Wegstrecke ohne Ende anfuehlen. */
  .climb-track { height: 160vh; }

  /* Das Portal bleibt jetzt absolut in der Buehne. Frueher wurde es
     hier in den Fluss geholt, damit der Text darunter Platz bekam -
     diesen Platz schafft nun die Bahn selbst. Es zurueckzuholen wuerde
     die klebende Buehne aushebeln. */
  .panthers-container {
    top: 6%;
    height: 74vh;
    width: 100%;
  }

  /* Groesse ueber die Breite steuern statt ueber 80vh. */
  /* Kein transform zur Zentrierung: die Breite kommt aus dem
     flex-zentrierten Container, und transform gehoert hier der
     float-3d-center-Animation. */
  .tb-loop.panther-center {
    height: auto;
    width: min(74vw, 44vh);
  }

  /* Die Ringe haengen an 95vh und blieben sonst unveraendert gross. */
  .wrapper-center { width: 96vw; height: 96vw; }

  .hero-content { margin-top: 0; }

  /* Die Seitenportale bleiben ausgeblendet - bewusste Entscheidung,
     siehe Components/Hero/README.md.
     Die Regel weiter oben in diesem Stylesheet greift nicht, weil
     .portal-circle danach display: flex setzt und bei gleicher
     Spezifitaet gewinnt. Deshalb hier erneut, an wirksamer Stelle. */
  .portal-circle-left,
  .portal-circle-right { display: none; }

  /* Ohne die Seitenportale gibt es nichts zu beschriften und keine
     Strecke, die sich kreuzen koennte. Die aufgeloeste Botschaft steht
     ohnehin als Headline direkt darunter. */
  .tb-cross { display: none; }
}

@media (max-width: 768px) {
  .hero-title-wrapper { margin-top: 0; }

  /* Die Begriffe der Merkaba landen im gestapelten Mobil-Layout direkt
     hinter der Tagline und stoeren die Lesbarkeit. Deutlich zuruecknehmen. */
  .merkaba-3d-container { opacity: 0.07; }

  /* Mindestens 40 px Luft zur Portalgrafik darueber. */
  /* Versalien + Sperrung laufen deutlich breiter als die fruehere
     Schreibschrift - kleinere Groessen und engere Sperrung, damit
     beide Zeilen ohne Umbruch stehen. */
  .tresor-text {
    margin-top: 2.6rem;
    margin-bottom: 0;
    font-size: clamp(1.35rem, 5.4vw, 1.9rem);
    letter-spacing: 0.22em;
    text-indent: 0.22em;
  }

  /* Klare Trennung der drei Bloecke: Tagline - Trennlinie - Zitat. */
  .poetic-quote-wrapper {
    margin-top: 2.25rem;
    margin-bottom: 2.5rem;
    padding: 20px 16px;
  }

  .hero-poetic-quote { font-size: 1.02rem; letter-spacing: 0.3px; }

  /* Die Zierlinien neben der Krone sind fest 150 px breit. */
  .crown-wrapper::before,
  .crown-wrapper::after { width: 22vw; }
}

@media (max-width: 600px) {
  .tresor-text {
    margin-top: 2.1rem;
    font-size: clamp(1.15rem, 5.8vw, 1.5rem);
  }

  .poetic-quote-wrapper {
    margin-top: 1.8rem;
    margin-bottom: 2rem;
    padding: 18px 8px;
  }

  .hero-poetic-quote { font-size: 0.95rem; line-height: 1.72; }
}
</style>