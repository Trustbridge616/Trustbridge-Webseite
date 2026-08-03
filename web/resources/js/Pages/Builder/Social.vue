<template>
  <Head>
    <title>Social Media Studio | Trustbridge</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  </Head>

  <div class="sm-page">
    <div class="sm-container">
      <header class="sm-header">
        <span class="sm-tag">Trustbridge Social Media Studio</span>
        <h1 class="sm-title">Ein Inhalt. Alle Plattformen.</h1>
        <p class="sm-sub">Master-Content → Instagram · TikTok · Facebook — mit Safe-Areas, Auto-Layout, Validierung &amp; Export</p>
        <a href="/builder/instagram" class="sm-back-link">🖼 Zurück zum Grundfoto-Builder</a>
        <a href="/builder/instagram?tab=kampagne" class="sm-back-link sm-kampagne-link">📦 Kampagne: 10 Posts auf einen Klick generieren</a>
      </header>

      <!-- Hauptnavigation -->
      <nav class="sm-nav">
        <button v-for="(label, key) in NAV" :key="key" :class="{ active: nav === key }" @click="nav = key">{{ label }}</button>
      </nav>

      <!-- ═══════ MASTER ═══════ -->
      <div v-show="nav === 'master'" class="sm-master">
        <div class="sm-master-left">
        <section class="sm-panel">
          <h2 class="sm-panel-title">Master-Inhalt <span class="sm-hint">(einzige Textquelle — alle Plattformen aktualisieren sich automatisch)</span></h2>

          <div class="sm-toggle" style="margin-bottom:1rem">
            <button :class="{ active: doc.mode === 'strukturiert' }" @click="doc.mode = 'strukturiert'">Strukturierter Modus</button>
            <button :class="{ active: doc.mode === 'frei' }" @click="doc.mode = 'frei'">Freier Textmodus</button>
          </div>

          <template v-if="doc.mode === 'strukturiert'">
            <label class="sm-label">Hook</label>
            <input v-model="doc.content.hook" class="sm-input" placeholder="Diese Einsicht hat mein Leben verändert." />
            <label class="sm-label">Hauptaussage <span class="sm-hint">(Absätze erlaubt — Leerzeilen strukturieren, positionieren aber nicht)</span></label>
            <textarea v-model="doc.content.statement" class="sm-input" rows="4"></textarea>
            <label class="sm-label">Reflexionsfrage</label>
            <input v-model="doc.content.question" class="sm-input" />
            <label class="sm-label">CTA</label>
            <input v-model="doc.content.cta" class="sm-input" placeholder="↓ Lies die Caption" />
          </template>
          <template v-else>
            <label class="sm-label">Freitext <span class="sm-hint">(führende Leerzeilen werden automatisch entfernt — Position steuert das Layout)</span></label>
            <textarea v-model="doc.content.freeText" class="sm-input" rows="8"></textarea>
            <p v-if="freeTextHadTricks" class="sm-warn">⚠ Führende Leerzeilen/Spaces wurden erkannt und werden ignoriert.</p>
          </template>

          <div class="sm-grid2" style="margin-top:1rem">
            <div>
              <label class="sm-label">Caption
                <span class="sm-hint" :class="{ 'sm-over-limit': captionChars > 2200 }">
                  {{ captionChars }} / 2200 Zeichen (inkl. Hashtags{{ captionChars > 2200 ? ' — zu lang, wird abgeschnitten!' : '' }})
                </span>
              </label>
              <textarea v-model="doc.content.caption" class="sm-input" rows="5"></textarea>
              <div class="sm-toggle" style="margin-top:0.4rem">
                <button :disabled="kiBusy" @click="generateCaptionKi">✨ Caption mit KI</button>
                <button @click="generateCaptionLocal">Ohne KI</button>
                <button @click="copyCaption">{{ captionCopied ? 'Kopiert ✓' : '📋 Caption + Hashtags kopieren' }}</button>
              </div>
              <p v-if="kiError" class="sm-warn">{{ kiError }}</p>
            </div>
            <div>
              <label class="sm-label">Hashtags</label>
              <textarea v-model="hashtagsText" class="sm-input" rows="2"></textarea>
              <label class="sm-label">Alt-Text <span class="sm-hint">(Barrierefreiheit)</span></label>
              <textarea v-model="doc.content.altText" class="sm-input" rows="2"></textarea>
            </div>
          </div>
        </section>

        <section class="sm-panel">
          <h2 class="sm-panel-title">Typografie &amp; Farben <span class="sm-hint">(Hauptaussage bleibt die Nr. 1 — die Engine wacht darüber)</span></h2>

          <label class="sm-label">Stil-Preset</label>
          <div class="sm-toggle">
            <button v-for="(p, key) in TYPO_PRESETS" :key="key" :class="{ active: doc.typography.preset === key }" @click="applyTypo(key)">{{ p.label }}</button>
          </div>

          <div class="sm-grid2" style="margin-top:0.8rem">
            <div>
              <label class="sm-label">Farbmodus</label>
              <div class="sm-toggle">
                <button :class="{ active: doc.typography.mode === 'marke' }" @click="doc.typography.mode = 'marke'">Markenmodus</button>
                <button :class="{ active: doc.typography.mode === 'frei' }" @click="doc.typography.mode = 'frei'">Freier Modus</button>
              </div>
              <p v-if="doc.typography.mode === 'frei'" class="sm-warn">⚠ Abweichungen von der Markenpalette werden markiert.</p>
            </div>
            <div>
              <label class="sm-label">Farbharmonie</label>
              <span class="sm-status" :class="colorStatus.cls">{{ colorStatus.label }}</span>
              <button class="sm-btn ghost" @click="applyBrandColorsNow">Trustbridge-Farben automatisch anwenden</button>
            </div>
          </div>

          <div v-if="hierarchyIssues.length" class="sm-hierarchy-warn">
            <p v-for="(h, i) in hierarchyIssues" :key="i">⚠ {{ h.message }}</p>
            <button class="sm-btn gold" @click="fixHierarchy">Hierarchie optimieren</button>
          </div>

          <div v-for="f in TYPO_FIELDS" :key="f" class="sm-field">
            <div class="sm-field-head">
              <strong>{{ FIELD_LABELS[f] }}</strong>
              <span class="sm-hint">{{ Math.round(fieldSize(f) * 100) }} %<template v-if="doc.typography.fields[f].size == null"> (Standard)</template></span>
              <button class="sm-reset" title="Auf Plattform-Standard zurücksetzen" @click="resetField(f)">↺</button>
            </div>
            <input type="range" :min="FIELD_SIZE_RANGES[f].min * 100" :max="FIELD_SIZE_RANGES[f].max * 100" step="1"
              :value="Math.round(fieldSize(f) * 100)" @input="doc.typography.fields[f].size = +$event.target.value / 100"
              @dblclick="resetField(f)" class="sm-range" />
            <div class="sm-field-row">
              <template v-if="doc.typography.mode === 'marke'">
                <button v-for="(c, key) in BRAND_COLORS" :key="key" class="sm-color-dot" :class="{ active: doc.typography.fields[f].color === key }"
                  :style="{ background: c.hex }" :title="c.label" @click="doc.typography.fields[f].color = key"></button>
              </template>
              <template v-else>
                <input type="color" :value="freeColor(f)" @input="doc.typography.fields[f].colorFree = $event.target.value" class="sm-color-free" />
              </template>
              <label class="sm-hint" style="margin-left:auto">Abstand danach {{ doc.typography.fields[f].gapAfter ?? GAP_DEFAULTS[f] }}</label>
              <input type="range" min="0" max="120" step="4" :value="doc.typography.fields[f].gapAfter ?? GAP_DEFAULTS[f]"
                @input="doc.typography.fields[f].gapAfter = +$event.target.value" class="sm-range slim" />
            </div>
            <div v-if="typoAdvanced" class="sm-field-adv">
              <div>
                <label class="sm-hint">Abstand davor {{ doc.typography.fields[f].gapBefore ?? 0 }}</label>
                <input type="range" min="0" max="120" step="4" :value="doc.typography.fields[f].gapBefore ?? 0" @input="doc.typography.fields[f].gapBefore = +$event.target.value" class="sm-range" />
              </div>
              <div>
                <label class="sm-hint">Zeilenhöhe {{ (doc.typography.fields[f].lineHeight ?? design.lineHeight).toFixed(2) }}</label>
                <input type="range" min="1.1" max="1.7" step="0.02" :value="doc.typography.fields[f].lineHeight ?? design.lineHeight" @input="doc.typography.fields[f].lineHeight = +$event.target.value" class="sm-range" />
              </div>
              <div>
                <label class="sm-hint">Max. Breite {{ Math.round((doc.typography.fields[f].maxWidth ?? 1) * 100) }} %</label>
                <input type="range" min="60" max="100" step="2" :value="(doc.typography.fields[f].maxWidth ?? 1) * 100" @input="doc.typography.fields[f].maxWidth = +$event.target.value / 100" class="sm-range" />
              </div>
            </div>
          </div>
          <button class="sm-btn ghost" @click="typoAdvanced = !typoAdvanced">{{ typoAdvanced ? 'Erweitert ausblenden' : 'Erweitert' }}</button>
          <p class="sm-hint" style="margin-top:0.5rem">Größen sind Prozent der Plattform-Basisgröße — Standards je Format hinterlegt (Anzeige-Referenz: {{ PLATFORM_PRESETS[activePreset].label }}).</p>
        </section>
        </div>

        <div class="sm-master-right">
        <section class="sm-panel sm-master-preview">
          <h2 class="sm-panel-title">Live-Vorschau <span class="sm-hint">(genau so sieht der Export aus)</span></h2>
          <div class="sm-toggle sm-preview-formats">
            <button v-for="pid in PRESET_IDS" :key="pid" :class="{ active: activePreset === pid }" @click="activePreset = pid">
              {{ SHORT_LABELS[pid] }}
            </button>
          </div>
          <div class="sm-canvas-wrap sm-master-canvas" :style="{ aspectRatio: activeDims.width + ' / ' + activeDims.height }">
            <canvas ref="masterCanvas" :width="activeDims.width" :height="activeDims.height"></canvas>
          </div>
          <div v-if="currentValidation" class="sm-preview-score">
            <span class="sm-status" :class="scoreClass(currentValidation.score)">
              {{ currentValidation.score }} / 100 · {{ currentValidation.verdict }}
            </span>
            <span class="sm-hint">{{ activeDims.width }} × {{ activeDims.height }} px</span>
          </div>
        </section>

        <section class="sm-panel">
          <h2 class="sm-panel-title">Marke &amp; Design</h2>
          <label class="sm-label">Hintergrund</label>
          <div class="sm-bg-grid">
            <button v-for="bg in backgrounds" :key="bg.src" class="sm-bg-thumb" :class="{ active: bgName === bg.name }" @click="bgName = bg.name">
              <img :src="bg.src" :alt="bg.name" loading="lazy" /><span>{{ bg.name }}</span>
            </button>
          </div>
          <div class="sm-grid2">
            <div>
              <label class="sm-label">Bausteine</label>
              <div class="sm-toggle">
                <button :class="{ active: doc.brand.logoShow }" @click="doc.brand.logoShow = !doc.brand.logoShow">Logo</button>
                <button :class="{ active: doc.brand.portraitShow }" @click="doc.brand.portraitShow = !doc.brand.portraitShow">Portrait</button>
                <button :class="{ active: doc.brand.bridgeShow }" @click="doc.brand.bridgeShow = !doc.brand.bridgeShow">Brücken-Satz</button>
                <button :class="{ active: doc.brand.identityShow }" @click="doc.brand.identityShow = !doc.brand.identityShow">Trust Yourself</button>
              </div>
            </div>
            <div>
              <label class="sm-label">Filter</label>
              <div class="sm-toggle">
                <button v-for="(f, key) in FILTERS" :key="key" :class="{ active: design.filter === key }" @click="design.filter = key">{{ f.label }}</button>
              </div>
            </div>
          </div>
          <label class="sm-label">Abdunklung unten <span class="sm-hint">{{ design.darken }} %</span></label>
          <input type="range" v-model.number="design.darken" min="0" max="100" step="5" class="sm-range" />
          <label class="sm-label">Textgröße <span class="sm-hint">{{ Math.round(design.sizeAdjust * 100) }} %</span></label>
          <input type="range" v-model.number="design.sizeAdjust" min="0.7" max="1.3" step="0.05" class="sm-range" />
        </section>
        </div>
      </div>

      <!-- ═══════ PLATTFORM-EDITOR (Instagram / TikTok / Facebook) ═══════ -->
      <div v-show="['instagram', 'tiktok', 'facebook'].includes(nav)" class="sm-editor">
        <aside class="sm-editor-left">
          <section class="sm-panel">
            <h2 class="sm-panel-title">Format</h2>
            <div class="sm-preset-list">
              <button v-for="pid in platformPresets" :key="pid" :class="{ active: activePreset === pid }" @click="activePreset = pid">
                <strong>{{ PLATFORM_PRESETS[pid].placement }}</strong>
                <span>{{ PLATFORM_PRESETS[pid].canvas.width }} × {{ PLATFORM_PRESETS[pid].canvas.height }} · {{ PLATFORM_PRESETS[pid].canvas.aspectRatio }}</span>
              </button>
            </div>

            <h2 class="sm-panel-title" style="margin-top:1.2rem">Layout-Feinschliff <span class="sm-hint">(nur dieses Format)</span></h2>
            <label class="sm-label">Textgröße <span class="sm-hint">{{ Math.round(currentOverride.sizeAdjust * 100) }} %</span></label>
            <input type="range" :value="currentOverride.sizeAdjust" @input="setOverride('sizeAdjust', +$event.target.value)" min="0.7" max="1.3" step="0.05" class="sm-range" />
            <label class="sm-label">Zeilenabstand <span class="sm-hint">{{ currentOverride.lineHeight.toFixed(2) }}</span></label>
            <input type="range" :value="currentOverride.lineHeight" @input="setOverride('lineHeight', +$event.target.value)" min="1.1" max="1.6" step="0.02" class="sm-range" />
            <button class="sm-btn ghost" @click="resetOverride">Zurücksetzen</button>
          </section>
        </aside>

        <div class="sm-editor-center">
          <div class="sm-canvas-wrap" :style="{ aspectRatio: activeDims.width + ' / ' + activeDims.height }">
            <canvas ref="editorCanvas" :width="activeDims.width" :height="activeDims.height"></canvas>
          </div>
        </div>

        <aside class="sm-editor-right">
          <section class="sm-panel">
            <h2 class="sm-panel-title">Vorschau-Ebenen</h2>
            <div class="sm-toggle col">
              <button :class="{ active: overlays.safeAreas }" @click="overlays.safeAreas = !overlays.safeAreas">Safe Areas anzeigen</button>
              <button :class="{ active: overlays.platformUi }" @click="overlays.platformUi = !overlays.platformUi">Plattform-UI anzeigen</button>
              <button :class="{ active: overlays.critical }" @click="overlays.critical = !overlays.critical">Kritische Inhalte hervorheben</button>
              <button v-if="PLATFORM_PRESETS[activePreset].gridPreview" :class="{ active: overlays.cropPreview }" @click="overlays.cropPreview = !overlays.cropPreview">Crop-Vorschau anzeigen</button>
              <button :class="{ active: overlays.warnings }" @click="overlays.warnings = !overlays.warnings">Warnungen anzeigen</button>
            </div>
            <p class="sm-hint" style="margin-top:0.6rem">
              Safe-Area-Quelle: <strong>{{ SAFE_SOURCE_LABEL[PLATFORM_PRESETS[activePreset].safeArea.source] }}</strong>
            </p>
          </section>

          <section class="sm-panel" v-if="currentValidation">
            <h2 class="sm-panel-title">Validierung</h2>
            <div class="sm-score" :class="scoreClass(currentValidation.score)">
              <strong>{{ currentValidation.score }}</strong><span>/ 100 — {{ currentValidation.verdict }}</span>
            </div>
            <ul v-if="overlays.warnings && currentValidation.issues.length" class="sm-issues">
              <li v-for="(i, idx) in currentValidation.issues" :key="idx" :class="i.severity">{{ i.message }}</li>
            </ul>
            <p v-else-if="!currentValidation.issues.length" class="sm-hint">Keine Auffälligkeiten. ✓</p>
          </section>

          <section class="sm-panel">
            <h2 class="sm-panel-title">Export</h2>
            <div class="sm-toggle" style="margin-bottom:0.6rem">
              <button v-for="fmt in PLATFORM_PRESETS[activePreset].export.imageFormats" :key="fmt" :class="{ active: imageFormat === fmt }" @click="imageFormat = fmt">{{ fmt.toUpperCase() }}</button>
            </div>
            <button class="sm-btn mint" @click="exportCurrentImage">Dieses Format exportieren</button>
            <template v-if="PLATFORM_PRESETS[activePreset].export.videoFormats">
              <label class="sm-label" style="margin-top:0.8rem">Video <span class="sm-hint">({{ videoBusy ? videoProgress + ' %' : 'ruhige Bewegung' }})</span></label>
              <div class="sm-toggle">
                <button v-for="(m, key) in VIDEO_MOTIONS" :key="key" :class="{ active: videoMotion === key }" @click="videoMotion = key">{{ m.label }}</button>
              </div>
              <div class="sm-toggle" style="margin-top:0.4rem">
                <button v-for="d in VIDEO_DURATIONS" :key="d" :class="{ active: videoDuration === d }" @click="videoDuration = d">{{ d }} s</button>
              </div>
              <button class="sm-btn gold" :disabled="videoBusy" style="margin-top:0.6rem" @click="exportCurrentVideo">
                {{ videoBusy ? 'Rendere Video…' : 'Als Video exportieren' }}
              </button>
              <p v-if="videoNote" class="sm-hint">{{ videoNote }}</p>
            </template>
          </section>
        </aside>
      </div>

      <!-- ═══════ ALLE PLATTFORMEN ═══════ -->
      <div v-show="nav === 'alle'" class="sm-all">
        <div class="sm-all-head">
          <button class="sm-btn mint" @click="refreshAll">Alle Vorschauen aktualisieren</button>
          <button class="sm-btn gold" :disabled="zipBusy" @click="exportPostPaket">{{ zipBusy ? 'Erzeuge Paket…' : 'Post-Paket herunterladen (ZIP)' }}</button>
        </div>
        <div class="sm-cards">
          <div v-for="pid in PRESET_IDS" :key="pid" class="sm-card">
            <div class="sm-card-canvas" :style="{ aspectRatio: PLATFORM_PRESETS[pid].canvas.width + ' / ' + PLATFORM_PRESETS[pid].canvas.height }">
              <canvas :ref="(el) => setCardCanvas(pid, el)" :width="PLATFORM_PRESETS[pid].canvas.width" :height="PLATFORM_PRESETS[pid].canvas.height"></canvas>
            </div>
            <div class="sm-card-meta">
              <strong>{{ PLATFORM_PRESETS[pid].label }}</strong>
              <span>{{ PLATFORM_PRESETS[pid].canvas.width }} × {{ PLATFORM_PRESETS[pid].canvas.height }}</span>
              <span v-if="validations[pid]" class="sm-status" :class="scoreClass(validations[pid].score)">
                {{ validations[pid].score }} · {{ validations[pid].verdict }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════ PUBLISHING ═══════ -->
      <div v-show="nav === 'publishing'" class="sm-publishing">
        <section class="sm-panel">
          <h2 class="sm-panel-title">Manueller Export <span class="sm-hint">(solange keine Konten verbunden sind: herunterladen und selbst posten)</span></h2>
          <div class="sm-toggle" style="margin-bottom:0.6rem">
            <button v-for="pid in PRESET_IDS" :key="pid" :class="{ active: activePreset === pid }" @click="activePreset = pid">{{ SHORT_LABELS[pid] }}</button>
          </div>
          <button class="sm-btn mint" @click="exportCurrentImage">Bild „{{ SHORT_LABELS[activePreset] }}" herunterladen</button>
          <button class="sm-btn gold" :disabled="zipBusy" style="margin-top:0.6rem" @click="exportPostPaket">{{ zipBusy ? 'Erzeuge Paket…' : 'Komplettes Post-Paket (ZIP, alle Plattformen)' }}</button>
          <button class="sm-btn ghost" @click="copyCaption">{{ captionCopied ? 'Kopiert ✓' : '📋 Caption + Hashtags kopieren' }}</button>
          <p class="sm-hint" style="margin-top:0.6rem">
            Workflow: Bild herunterladen → Caption kopieren → in der Instagram-/TikTok-App einfügen.
            Im ZIP liegt die Caption zusätzlich als <code>master/caption.txt</code> + <code>hashtags.txt</code>.
          </p>
        </section>

        <section class="sm-panel">
          <h2 class="sm-panel-title">Dokument</h2>
          <p class="sm-hint">Master-Inhalt serverseitig speichern (Grundlage für spätere Veröffentlichung &amp; Planung).</p>
          <div class="sm-toggle" style="margin-top:0.6rem">
            <button @click="saveDocument">{{ savedId ? 'Aktualisieren' : 'Speichern' }}</button>
            <span v-if="savedId" class="sm-hint">Gespeichert als {{ savedId }} · {{ savedAt }}</span>
          </div>
          <p v-if="saveError" class="sm-warn">{{ saveError }}</p>
        </section>
        <section class="sm-panel">
          <h2 class="sm-panel-title">Verbindungen</h2>
          <div v-for="c in connections" :key="c.platform" class="sm-connection">
            <strong>{{ c.label }}</strong>
            <span class="sm-status warn">{{ c.status === 'not_connected' ? 'Noch nicht verbunden' : c.status }}</span>
            <p class="sm-hint">{{ c.note }}</p>
          </div>
          <p class="sm-hint" style="margin-top:0.8rem">
            Es wird nichts automatisch veröffentlicht. Veröffentlichung erfordert verbundene Konten und eine explizite Bestätigung pro Post.
            Benötigte Umgebungsvariablen sind in <code>.env.example</code> dokumentiert.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
import { Head } from '@inertiajs/vue3'
import JSZip from 'jszip'
import { FILTERS, loadImage, canvasToBlob, heuristicCaption } from './builderEngine'
import {
  PLATFORM_PRESETS, PRESET_IDS, PLATFORMS,
  createSocialDocument, contentAsPlainText, sanitizeSocialText, hasLeadingWhitespaceTricks,
  TYPO_FIELDS, FIELD_LABELS, FIELD_SIZE_RANGES, BRAND_COLORS, TYPO_PRESETS,
  applyTypoPreset, applyBrandColors, checkHierarchy, optimizeHierarchy,
} from './socialPresets'
import { renderSocial } from './socialEngine'
import { renderSocialVideo, VIDEO_MOTIONS, VIDEO_DURATIONS } from './socialVideo'

const props = defineProps({ tab: { type: String, default: 'master' } })

const LOGO_SRC = '/Trustbridge Portal.png'
const FOTO_SRC = '/facesonne2.jpeg'
const AUTOSAVE_KEY = 'trustbridge-social-doc'

const NAV = { master: 'Master', instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', alle: 'Alle Plattformen', publishing: 'Publishing' }
const SAFE_SOURCE_LABEL = {
  'official-overlay': 'Offizielle Overlay-Datei',
  'official-percentage-guidance': 'Offizielle Prozent-Guidance',
  'conservative-builder-default': 'Konservativer Builder-Default',
}

// ── State ──
const nav = ref(Object.keys(NAV).includes(props.tab) ? props.tab : 'master')
// Bei Direktaufruf von /social/tiktok etc. gleich das passende Preset wählen
const initialPreset = PLATFORMS[nav.value] ? PLATFORMS[nav.value].presets[0] : 'instagram-feed-portrait'
const doc = reactive(createSocialDocument())
const design = reactive({ filter: 'keiner', darken: 60, sizeAdjust: 1, lineHeight: 1.28 })
const overlays = reactive({ safeAreas: true, platformUi: false, critical: false, cropPreview: false, warnings: true })
const activePreset = ref(initialPreset)
const imageFormat = ref('png')
const backgrounds = ref([])
const bgName = ref('')
const bgCache = new Map()
let logoImg = null
let fotoImg = null

const validations = reactive({})
const editorCanvas = ref(null)
const masterCanvas = ref(null)
const SHORT_LABELS = {
  'instagram-feed-portrait': 'IG Feed', 'instagram-reel': 'IG Reel', 'instagram-story': 'IG Story', 'instagram-cover': 'IG Cover',
  'tiktok-video': 'TT Video', 'tiktok-photo': 'TT Photo', 'tiktok-cover': 'TT Cover',
  'facebook-feed-portrait': 'FB Feed', 'facebook-reel': 'FB Reel', 'facebook-story': 'FB Story',
}
const cardCanvases = {}
const setCardCanvas = (pid, el) => { if (el) cardCanvases[pid] = el }

const kiBusy = ref(false)
const kiError = ref('')
const videoMotion = ref('zoom-in')
const videoDuration = ref(7)
const videoBusy = ref(false)
const videoProgress = ref(0)
const videoNote = ref('')
const videoBlobs = reactive({})
const zipBusy = ref(false)
const savedId = ref(null)
const savedAt = ref('')
const saveError = ref('')
const connections = ref([
  { platform: 'instagram', label: 'Instagram', status: 'not_connected', note: 'Meta Business + Instagram Graph API (META_APP_ID, META_APP_SECRET).' },
  { platform: 'facebook', label: 'Facebook', status: 'not_connected', note: 'Meta Graph API — gleiche App wie Instagram, eigene Page-Berechtigung.' },
  { platform: 'tiktok', label: 'TikTok', status: 'not_connected', note: 'TikTok Content Posting API (TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET) + App-Audit.' },
])

const hashtagsText = computed({
  get: () => (doc.content.hashtags || []).join(' '),
  set: (v) => { doc.content.hashtags = v.split(/\s+/).filter(Boolean) },
})
// Instagram/TikTok/FB zählen Caption inkl. Hashtags — Limit 2200 Zeichen
const captionChars = computed(() => `${doc.content.caption || ''}\n\n${hashtagsText.value}`.trim().length)
const captionCopied = ref(false)
async function copyCaption() {
  try {
    await navigator.clipboard.writeText(`${doc.content.caption}\n\n${hashtagsText.value}`.trim())
    captionCopied.value = true
    setTimeout(() => (captionCopied.value = false), 1600)
  } catch { /* Zwischenablage nicht verfügbar */ }
}
const freeTextHadTricks = computed(() => hasLeadingWhitespaceTricks(doc.content.freeText))
const platformPresets = computed(() => PLATFORMS[nav.value] ? PLATFORMS[nav.value].presets : [])
const activeDims = computed(() => PLATFORM_PRESETS[activePreset.value].canvas)
const currentValidation = computed(() => validations[activePreset.value] || null)
const currentOverride = computed(() => ({
  sizeAdjust: doc.layoutOverrides[activePreset.value]?.sizeAdjust ?? design.sizeAdjust,
  lineHeight: doc.layoutOverrides[activePreset.value]?.lineHeight ?? design.lineHeight,
}))

function setOverride(key, value) {
  if (!doc.layoutOverrides[activePreset.value]) doc.layoutOverrides[activePreset.value] = {}
  doc.layoutOverrides[activePreset.value][key] = value
}
function resetOverride() { delete doc.layoutOverrides[activePreset.value] }

// ── Typografie-System ──
const typoAdvanced = ref(false)
const GAP_DEFAULTS = { hook: 44, statement: 40, question: 44, cta: 0 }
const refPreset = computed(() => PLATFORM_PRESETS[activePreset.value])
const fieldSize = (f) => doc.typography.fields[f].size ?? (refPreset.value.layout.typo?.[f] ?? 1)
const freeColor = (f) => doc.typography.fields[f].colorFree || (BRAND_COLORS[doc.typography.fields[f].color] || BRAND_COLORS.primary).hex
function resetField(f) { doc.typography.fields[f].size = null }
const hierarchyIssues = computed(() => checkHierarchy(doc, refPreset.value))
function fixHierarchy() { optimizeHierarchy(doc, refPreset.value) }
function applyTypo(key) { applyTypoPreset(doc, key) }
function applyBrandColorsNow() { applyBrandColors(doc) }
const colorStatus = computed(() => {
  const codes = (currentValidation.value?.issues || []).map((i) => i.code)
  if (codes.includes('farbe-dominanz')) return { label: 'Zu viele dominante Farben', cls: 'bad' }
  if (codes.includes('farbe-akzent')) return { label: 'Akzent zu häufig verwendet', cls: 'warn' }
  if (codes.includes('farbe-off-palette') || codes.includes('farbe-gold')) return { label: 'Abweichung von der Markenpalette', cls: 'warn' }
  if (codes.includes('farbe-kontrast')) return { label: 'Kontrasthilfe aktiv', cls: 'good' }
  return { label: 'Markenkonform', cls: 'ok' }
})

function scoreClass(score) {
  return score >= 90 ? 'ok' : score >= 75 ? 'good' : score >= 50 ? 'warn' : 'bad'
}

// ── Assets ──
async function loadBackgrounds() {
  try { backgrounds.value = await (await fetch('/builder/backgrounds')).json() } catch { backgrounds.value = [] }
  if (!bgName.value && backgrounds.value.length) bgName.value = backgrounds.value[0].name
}
async function getBg() {
  const bg = backgrounds.value.find((b) => b.name === bgName.value) || backgrounds.value[0]
  if (!bg) return { img: null, focus: 0.5 }
  if (!bgCache.has(bg.src)) bgCache.set(bg.src, await loadImage(bg.src))
  return { img: bgCache.get(bg.src), focus: bg.focus ?? 0.5 }
}

// ── Rendering ──
function renderOptions(presetId, withOverlays, bg) {
  const preset = PLATFORM_PRESETS[presetId]
  return {
    preset, doc,
    bgImage: bg.img, bgFocus: bg.focus,
    logoImg, fotoImg,
    brand: doc.brand,
    design,
    overrides: doc.layoutOverrides[presetId] || {},
    overlays: withOverlays ? overlays : {},
  }
}

let queued = false
async function renderEditor() {
  if (queued) return
  queued = true
  await Promise.resolve()
  queued = false
  const bg = await getBg()
  const canvas = editorCanvas.value
  if (canvas && PLATFORMS[nav.value]) {
    const { validation } = renderSocial(canvas.getContext('2d'), renderOptions(activePreset.value, true, bg))
    validations[activePreset.value] = validation
  } else if (masterCanvas.value) {
    // Master-Tab: Live-Vorschau ohne Overlays — genau das Export-Bild
    const { validation } = renderSocial(masterCanvas.value.getContext('2d'), renderOptions(activePreset.value, false, bg))
    validations[activePreset.value] = validation
  } else {
    // Fallback (z. B. Publishing-Tab): offscreen validieren
    const preset = PLATFORM_PRESETS[activePreset.value]
    const off = document.createElement('canvas')
    off.width = preset.canvas.width
    off.height = preset.canvas.height
    const { validation } = renderSocial(off.getContext('2d'), renderOptions(activePreset.value, false, bg))
    validations[activePreset.value] = validation
  }
}

async function refreshAll() {
  const bg = await getBg()
  await nextTick()
  for (const pid of PRESET_IDS) {
    const el = cardCanvases[pid]
    if (!el) continue
    const { validation } = renderSocial(el.getContext('2d'), renderOptions(pid, false, bg))
    validations[pid] = validation
  }
}

async function renderExportCanvas(presetId) {
  const preset = PLATFORM_PRESETS[presetId]
  const off = document.createElement('canvas')
  off.width = preset.canvas.width
  off.height = preset.canvas.height
  const bg = await getBg()
  const { validation } = renderSocial(off.getContext('2d'), renderOptions(presetId, false, bg))
  return { canvas: off, validation }
}

watch([doc, design, bgName], () => {
  renderEditor()
  if (nav.value === 'alle') refreshAll()
  try { localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ doc, design, bgName: bgName.value })) } catch { /* voll */ }
}, { deep: true })
watch([activePreset, overlays], renderEditor, { deep: true })
watch(nav, (n) => {
  if (PLATFORMS[n]) {
    if (!PLATFORMS[n].presets.includes(activePreset.value)) activePreset.value = PLATFORMS[n].presets[0]
    nextTick(renderEditor)
  }
  if (n === 'alle') nextTick(refreshAll)
})

onMounted(async () => {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTOSAVE_KEY) || 'null')
    if (saved) {
      Object.assign(doc.content, saved.doc.content || {})
      Object.assign(doc.brand, saved.doc.brand || {})
      Object.assign(doc.layoutOverrides, saved.doc.layoutOverrides || {})
      doc.mode = saved.doc.mode || 'strukturiert'
      Object.assign(design, saved.design || {})
      if (saved.bgName) bgName.value = saved.bgName
      // Typografie mergen (ältere Speicherstände haben sie noch nicht)
      if (saved.doc.typography) {
        doc.typography.mode = saved.doc.typography.mode || 'marke'
        doc.typography.preset = saved.doc.typography.preset || 'signature'
        for (const k of TYPO_FIELDS) Object.assign(doc.typography.fields[k], saved.doc.typography.fields?.[k] || {})
      }
      // Altbestand: „Vertiefung" in die Hauptaussage überführen
      if (doc.content.vertiefung) {
        doc.content.statement = [doc.content.statement, doc.content.vertiefung].filter(Boolean).join('\n\n')
        doc.content.vertiefung = ''
      }
    }
  } catch { /* Autosave defekt — Standardinhalt */ }
  await Promise.all([loadBackgrounds(), document.fonts.ready])
  logoImg = await loadImage(LOGO_SRC)
  fotoImg = await loadImage(FOTO_SRC)
  if (!doc.content.caption) generateCaptionLocal()
  renderEditor()
  refreshAll()
})

// ── Caption ──
function generateCaptionLocal() {
  const r = heuristicCaption(contentAsPlainText(doc))
  doc.content.caption = r.caption
  doc.content.hashtags = r.hashtags
}
function csrfHeaders() {
  const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return { 'Content-Type': 'application/json', Accept: 'application/json', ...(m ? { 'X-XSRF-TOKEN': decodeURIComponent(m[1]) } : {}) }
}
async function generateCaptionKi() {
  kiBusy.value = true
  kiError.value = ''
  try {
    const res = await fetch('/builder/ai', { method: 'POST', headers: csrfHeaders(), body: JSON.stringify({ action: 'caption', text: contentAsPlainText(doc) }) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || `Fehler ${res.status}`)
    const c = data.caption
    let text = `${c.hook}\n\n${c.zeilen.join('\n')}\n\n${c.cta}`
    if (!/folge/i.test(text)) text += `\n\n➤ Folge ${doc.content.followCta} für mehr.`
    doc.content.caption = text
    doc.content.hashtags = c.hashtags
  } catch (e) { kiError.value = e.message } finally { kiBusy.value = false }
}

// ── Export ──
const mimeFor = (fmt) => fmt === 'png' ? 'image/png' : fmt === 'jpeg' ? 'image/jpeg' : 'image/webp'
function slug() {
  return sanitizeSocialText(doc.content.statement || doc.content.freeText || 'post')
    .toLowerCase().replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }[c]))
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'post'
}
function download(blob, name) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 5000)
}

async function exportCurrentImage() {
  const preset = PLATFORM_PRESETS[activePreset.value]
  const { canvas } = await renderExportCanvas(activePreset.value)
  const blob = await canvasToBlob(canvas, mimeFor(imageFormat.value), 0.92)
  download(blob, `trustbridge-${preset.id}-${preset.canvas.width}x${preset.canvas.height}.${imageFormat.value}`)
}

// Rendert eine einzelne Ebene (Layout identisch, Rest transparent)
async function renderLayerCanvas(presetId, layerFilter) {
  const preset = PLATFORM_PRESETS[presetId]
  const off = document.createElement('canvas')
  off.width = preset.canvas.width
  off.height = preset.canvas.height
  const bg = await getBg()
  const opts = renderOptions(presetId, false, bg)
  opts.layerFilter = layerFilter
  renderSocial(off.getContext('2d'), opts)
  return off
}

async function exportCurrentVideo() {
  const presetId = activePreset.value
  const preset = PLATFORM_PRESETS[presetId]
  videoBusy.value = true
  videoProgress.value = 0
  videoNote.value = ''
  try {
    const { width, height } = preset.canvas
    const { canvas: card } = await renderExportCanvas(presetId)
    const bgOnly = await renderLayerCanvas(presetId, { roles: [], brand: false })

    let renderFrame
    if (videoMotion.value === 'staffel') {
      // ── Gestaffelt aufpoppen: Zeilen erscheinen nacheinander, CTA poppt ──
      const layers = [
        { c: await renderLayerCanvas(presetId, { bg: false, roles: ['hook'], brand: false }), start: 0.4, dur: 0.7 },
        { c: await renderLayerCanvas(presetId, { bg: false, roles: ['statement'], brand: false }), start: 1.1, dur: 0.8 },
        { c: await renderLayerCanvas(presetId, { bg: false, roles: ['question'], brand: false }), start: 2.0, dur: 0.7 },
        { c: await renderLayerCanvas(presetId, { bg: false, roles: ['cta'], brand: false }), start: 2.8, dur: 0.5, pop: true },
        { c: await renderLayerCanvas(presetId, { bg: false, roles: [], brand: true }), start: 3.3, dur: 0.8 },
      ]
      const dur = videoDuration.value
      renderFrame = (ctx, { t, zoom }) => {
        ctx.clearRect(0, 0, width, height)
        const w = width * zoom, h = height * zoom
        ctx.drawImage(bgOnly, (width - w) / 2, (height - h) / 2, w, h)
        const tSec = t * dur
        for (const L of layers) {
          const p = Math.min(1, Math.max(0, (tSec - L.start) / L.dur))
          if (p <= 0) continue
          const e = 1 - Math.pow(1 - p, 3) // easeOutCubic — ruhig, kein Zappeln
          ctx.save()
          ctx.globalAlpha = e
          if (L.pop) {
            const s = 1 + 0.14 * (1 - e) // kleiner Pop von 114 % auf 100 %
            ctx.translate(width / 2, height / 2)
            ctx.scale(s, s)
            ctx.translate(-width / 2, -height / 2)
          }
          ctx.drawImage(L.c, 0, (1 - e) * height * 0.015)
          ctx.restore()
        }
      }
    } else {
      renderFrame = (ctx, { zoom, driftY, textAlpha }) => {
        ctx.clearRect(0, 0, width, height)
        const w = width * zoom, h = height * zoom
        const dx = (width - w) / 2, dy = (height - h) / 2 + driftY
        if (textAlpha < 1) {
          ctx.drawImage(bgOnly, dx, dy, w, h)
          ctx.globalAlpha = textAlpha
          ctx.drawImage(card, dx, dy, w, h)
          ctx.globalAlpha = 1
        } else {
          ctx.drawImage(card, dx, dy, w, h)
        }
      }
    }

    const result = await renderSocialVideo({
      width, height,
      durationSec: videoDuration.value,
      motion: videoMotion.value,
      fps: 30,
      onProgress: (p) => { videoProgress.value = p },
      renderFrame,
    })
    videoBlobs[presetId] = result
    videoNote.value = result.ext === 'mp4'
      ? 'MP4 (H.264) exportiert.'
      : 'Hinweis: Dieser Browser liefert WebM statt MP4 — für MP4 in Chrome/Safari exportieren oder extern konvertieren.'
    download(result.blob, `trustbridge-${preset.id}-${width}x${height}.${result.ext}`)
  } catch (e) {
    videoNote.value = e.message
  } finally { videoBusy.value = false }
}

// Post-Paket: komplette Ordnerstruktur laut Spezifikation
async function exportPostPaket() {
  zipBusy.value = true
  try {
    const zip = new JSZip()
    const root = zip.folder(`trustbridge-post-${slug()}`)
    const allValidations = {}

    root.folder('master').file('content.json', JSON.stringify({ ...doc, exportState: { ...doc.exportState, lastRenderedAt: new Date().toISOString(), status: 'ready' } }, null, 2))
    root.folder('master').file('caption.txt', doc.content.caption || '')
    root.folder('master').file('hashtags.txt', (doc.content.hashtags || []).join(' '))

    const fileForPreset = {
      'instagram-feed-portrait': ['instagram', 'feed-1080x1350.png', 'image/png'],
      'instagram-cover': ['instagram', 'reel-cover-1080x1920.jpg', 'image/jpeg'],
      'instagram-story': ['instagram', 'story-1080x1920.png', 'image/png'],
      'instagram-reel': ['instagram', 'reel-still-1080x1920.jpg', 'image/jpeg'],
      'tiktok-cover': ['tiktok', 'cover-1080x1920.jpg', 'image/jpeg'],
      'tiktok-photo': ['tiktok', 'photo-1080x1920.png', 'image/png'],
      'tiktok-video': ['tiktok', 'video-still-1080x1920.png', 'image/png'],
      'facebook-feed-portrait': ['facebook', 'feed-1080x1350.png', 'image/png'],
      'facebook-story': ['facebook', 'story-1080x1920.png', 'image/png'],
      'facebook-reel': ['facebook', 'reel-still-1080x1920.jpg', 'image/jpeg'],
    }
    const manifest = []
    for (const pid of PRESET_IDS) {
      const [folder, name, mime] = fileForPreset[pid]
      const { canvas, validation } = await renderExportCanvas(pid)
      allValidations[pid] = validation
      const blob = await canvasToBlob(canvas, mime, 0.92)
      root.folder(folder).file(name, blob)
      manifest.push({ preset: pid, file: `${folder}/${name}`, ...PLATFORM_PRESETS[pid].canvas, score: validation.score })
      // gerenderte Videos aus dieser Sitzung mitliefern
      const vid = videoBlobs[pid]
      if (vid) {
        const vName = pid.includes('tiktok') ? `video-1080x1920.${vid.ext}` : `reel-1080x1920.${vid.ext}`
        root.folder(folder).file(vName, vid.blob)
        manifest.push({ preset: pid, file: `${folder}/${vName}`, type: 'video' })
      }
    }

    const meta = root.folder('metadata')
    meta.file('post.json', JSON.stringify({ erstellt: new Date().toISOString(), doc, design, background: bgName.value }, null, 2))
    meta.file('validation.json', JSON.stringify(allValidations, null, 2))
    meta.file('manifest.json', JSON.stringify(manifest, null, 2))

    download(await zip.generateAsync({ type: 'blob' }), `trustbridge-post-${slug()}.zip`)
  } finally { zipBusy.value = false }
}

// ── Publishing (serverseitige Dokumente, ehrliche Stubs) ──
async function saveDocument() {
  saveError.value = ''
  try {
    const payload = { doc, design, background: bgName.value }
    const url = savedId.value ? `/api/social/documents/${savedId.value}` : '/api/social/documents'
    const res = await fetch(url, { method: savedId.value ? 'PATCH' : 'POST', headers: csrfHeaders(), body: JSON.stringify(payload) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.message || `Fehler ${res.status}`)
    savedId.value = data.id
    savedAt.value = new Date().toLocaleTimeString('de-DE')
  } catch (e) { saveError.value = e.message }
}
</script>

<style scoped>
.sm-page, .sm-page :deep(*) { box-sizing: border-box; }
.sm-page {
  min-height: 100vh; overflow-x: hidden;
  background: radial-gradient(ellipse at 50% -10%, #1a1033 0%, #0b0618 45%, #050310 100%);
  padding: 3rem 2rem 6rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #F7F1FF;
}
.sm-container { max-width: 1560px; margin: 0 auto; }
.sm-header { text-align: center; margin-bottom: 1.6rem; }
.sm-tag { display: inline-block; font-size: 0.8rem; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: #8EF5D2; margin-bottom: 0.8rem; text-shadow: 0 0 20px rgba(142,245,210,0.5); }
.sm-title { font-size: 2.2rem; font-weight: 800; margin: 0 0 0.4rem; color: #F7F1FF; -webkit-text-fill-color: #F7F1FF; text-shadow: 0 0 40px rgba(124,58,237,0.35); }
.sm-sub { color: #D9CFE8; margin: 0; }
.sm-back-link {
  display: inline-block; margin-top: 0.8rem; padding: 0.45rem 1rem; border-radius: 50px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2);
  color: #D9CFE8; font-size: 0.82rem; font-weight: 700; text-decoration: none;
  transition: all 0.25s ease;
}
.sm-back-link:hover { border-color: rgba(142,245,210,0.55); color: #8EF5D2; transform: translateY(-2px); }
.sm-kampagne-link {
  margin-left: 0.6rem;
  background: rgba(240,207,90,0.14); border-color: rgba(240,207,90,0.55); color: #F0CF5A;
}
.sm-kampagne-link:hover { border-color: rgba(240,207,90,0.9); color: #F0CF5A; box-shadow: 0 0 14px rgba(240,207,90,0.25); }

.sm-nav { display: flex; gap: 0.4rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.6rem; background: rgba(30,20,50,0.6); border: 1px solid rgba(142,245,210,0.22); border-radius: 16px; padding: 0.5rem; backdrop-filter: blur(12px); }
.sm-nav button { flex: 1; min-width: 110px; padding: 0.6rem 0.8rem; border-radius: 10px; cursor: pointer; background: transparent; border: 1px solid transparent; color: #D9CFE8; font-family: inherit; font-size: 0.9rem; font-weight: 700; transition: all 0.2s ease; }
.sm-nav button:hover { background: rgba(255,255,255,0.06); }
.sm-nav button.active { background: rgba(142,245,210,0.14); border-color: rgba(142,245,210,0.5); color: #8EF5D2; }

.sm-panel { background: rgba(30,20,50,0.6); border: 1px solid rgba(142,245,210,0.22); border-radius: 20px; padding: 1.15rem 1.25rem; backdrop-filter: blur(12px); margin-bottom: 1rem; }
.sm-panel-title { font-size: 1.02rem; font-weight: 800; margin: 0 0 0.9rem; color: #F7F1FF; -webkit-text-fill-color: #F7F1FF; }
.sm-label { display: block; font-weight: 700; font-size: 0.86rem; margin: 0.55rem 0 0.32rem; }
.sm-hint { font-weight: 400; font-size: 0.76rem; color: rgba(217,207,232,0.65); }
.sm-warn { color: #ffcf8a; font-size: 0.82rem; margin: 0.4rem 0 0; }
.sm-over-limit { color: #ff9d9d !important; font-weight: 700; }
.sm-input { width: 100%; resize: vertical; background: rgba(10,8,22,0.7); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: #FFF; font-family: inherit; font-size: 0.95rem; line-height: 1.55; padding: 0.65rem 0.85rem; transition: border-color 0.3s ease; }
.sm-input:focus { outline: none; border-color: rgba(142,245,210,0.6); }
.sm-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem; }
.sm-range { width: 100%; accent-color: #8EF5D2; }

.sm-toggle { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.sm-toggle.col { flex-direction: column; }
.sm-toggle button { padding: 0.45rem 0.85rem; border-radius: 50px; cursor: pointer; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #D9CFE8; font-family: inherit; font-size: 0.8rem; font-weight: 600; transition: all 0.25s ease; text-align: left; }
.sm-toggle button.active { background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.6); color: #8EF5D2; box-shadow: 0 0 12px rgba(142,245,210,0.2); }
.sm-toggle button:disabled { opacity: 0.4; cursor: wait; }

.sm-btn { padding: 0.6rem 1.2rem; border-radius: 50px; cursor: pointer; border: none; font-family: inherit; font-size: 0.88rem; font-weight: 800; transition: transform 0.25s ease, box-shadow 0.25s ease; width: 100%; }
.sm-btn:hover:not(:disabled) { transform: translateY(-2px); }
.sm-btn:disabled { opacity: 0.4; cursor: wait; }
.sm-btn.mint { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 8px 18px rgba(142,245,210,0.3); }
.sm-btn.gold { background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 8px 18px rgba(240,207,90,0.3); }
.sm-btn.ghost { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2); color: #D9CFE8; margin-top: 0.6rem; }

.sm-master { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 1rem; align-items: start; }
.sm-master-left, .sm-master-right { min-width: 0; }
.sm-master-preview { position: sticky; top: 1rem; z-index: 2; }
.sm-preview-formats { margin-bottom: 0.7rem; }
.sm-preview-formats button { padding: 0.35rem 0.7rem; font-size: 0.74rem; }
.sm-master-canvas { max-height: 72vh; }
.sm-preview-score { display: flex; justify-content: space-between; align-items: baseline; margin-top: 0.6rem; gap: 0.6rem; flex-wrap: wrap; }

.sm-bg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 0.5rem; margin-bottom: 0.6rem; }
.sm-bg-thumb { position: relative; border-radius: 12px; overflow: hidden; cursor: pointer; border: 2px solid rgba(255,255,255,0.12); background: rgba(10,8,22,0.7); padding: 0; aspect-ratio: 4/5; display: flex; flex-direction: column; justify-content: flex-end; }
.sm-bg-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sm-bg-thumb span { position: relative; z-index: 2; font-size: 0.64rem; font-weight: 700; color: #fff; padding: 0.25rem 0.2rem; text-align: center; background: linear-gradient(transparent, rgba(0,0,0,0.85)); }
.sm-bg-thumb.active { border-color: #8EF5D2; box-shadow: 0 0 14px rgba(142,245,210,0.35); }

.sm-editor { display: grid; grid-template-columns: 280px 1fr 320px; gap: 1rem; align-items: start; }
.sm-editor-center { position: sticky; top: 1rem; }
.sm-canvas-wrap { max-height: calc(100vh - 3rem); margin: 0 auto; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
.sm-canvas-wrap canvas { width: 100%; height: 100%; display: block; }

.sm-preset-list { display: flex; flex-direction: column; gap: 0.4rem; }
.sm-preset-list button { text-align: left; padding: 0.6rem 0.85rem; border-radius: 12px; cursor: pointer; background: rgba(10,8,22,0.7); border: 1px solid rgba(255,255,255,0.12); color: #F7F1FF; font-family: inherit; transition: border-color 0.25s ease; display: flex; flex-direction: column; gap: 0.15rem; }
.sm-preset-list button span { font-size: 0.72rem; color: rgba(217,207,232,0.65); }
.sm-preset-list button.active { border-color: rgba(142,245,210,0.6); box-shadow: 0 0 12px rgba(142,245,210,0.2); }

.sm-score { display: flex; align-items: baseline; gap: 0.5rem; padding: 0.6rem 0.9rem; border-radius: 12px; margin-bottom: 0.6rem; }
.sm-score strong { font-size: 1.6rem; }
.sm-score.ok { background: rgba(142,245,210,0.12); color: #8EF5D2; }
.sm-score.good { background: rgba(240,207,90,0.12); color: #F0CF5A; }
.sm-score.warn { background: rgba(255,160,80,0.12); color: #ffb27a; }
.sm-score.bad { background: rgba(229,57,53,0.15); color: #ff9d9d; }
.sm-issues { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
.sm-issues li { font-size: 0.8rem; padding: 0.45rem 0.7rem; border-radius: 8px; }
.sm-issues li.error { background: rgba(229,57,53,0.15); color: #ff9d9d; }
.sm-issues li.warning { background: rgba(255,160,80,0.12); color: #ffcf8a; }
.sm-issues li.info { background: rgba(255,255,255,0.06); color: #D9CFE8; }

.sm-all-head { display: flex; gap: 0.8rem; margin-bottom: 1rem; flex-wrap: wrap; }
.sm-all-head .sm-btn { width: auto; }
.sm-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.sm-card { background: rgba(30,20,50,0.6); border: 1px solid rgba(142,245,210,0.22); border-radius: 16px; overflow: hidden; }
.sm-card-canvas { width: 100%; }
.sm-card-canvas canvas { width: 100%; height: 100%; display: block; }
.sm-card-meta { padding: 0.7rem 0.9rem; display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.82rem; }
.sm-card-meta span { color: rgba(217,207,232,0.65); font-size: 0.74rem; }
.sm-status { font-weight: 700; }
.sm-status.ok { color: #8EF5D2; }
.sm-status.good { color: #F0CF5A; }
.sm-status.warn { color: #ffb27a; }
.sm-status.bad { color: #ff9d9d; }

/* Typografie-Panel */
.sm-field { border-top: 1px solid rgba(255,255,255,0.08); padding: 0.7rem 0 0.5rem; margin-top: 0.6rem; }
.sm-field-head { display: flex; align-items: baseline; gap: 0.6rem; }
.sm-field-head strong { font-size: 0.88rem; }
.sm-reset { margin-left: auto; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2); color: #D9CFE8; transition: all 0.2s ease; }
.sm-reset:hover { border-color: rgba(142,245,210,0.6); color: #8EF5D2; }
.sm-field-row { display: flex; align-items: center; gap: 0.45rem; margin-top: 0.3rem; }
.sm-color-dot { width: 26px; height: 26px; border-radius: 50%; cursor: pointer; border: 2px solid rgba(255,255,255,0.25); padding: 0; transition: all 0.2s ease; }
.sm-color-dot.active { border-color: #8EF5D2; box-shadow: 0 0 10px rgba(142,245,210,0.5); transform: scale(1.12); }
.sm-color-free { width: 44px; height: 30px; border: 1px solid rgba(255,255,255,0.25); border-radius: 8px; background: transparent; cursor: pointer; padding: 0; }
.sm-range.slim { width: 120px; }
.sm-field-adv { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 0.8rem; margin-top: 0.4rem; }
.sm-hierarchy-warn { background: rgba(240,207,90,0.1); border: 1px solid rgba(240,207,90,0.4); border-radius: 12px; padding: 0.7rem 0.9rem; margin-top: 0.8rem; }
.sm-hierarchy-warn p { margin: 0 0 0.5rem; font-size: 0.84rem; color: #F0CF5A; }
.sm-hierarchy-warn .sm-btn { width: auto; padding: 0.45rem 1rem; }

.sm-publishing { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: start; }
.sm-connection { padding: 0.7rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 0.2rem; }
.sm-connection:last-of-type { border-bottom: none; }

@media (max-width: 1280px) {
  .sm-editor { grid-template-columns: 1fr 1.4fr; }
  .sm-editor-right { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
}
@media (max-width: 900px) {
  .sm-page { padding: 2rem 0.9rem 4rem; }
  .sm-master, .sm-publishing { grid-template-columns: 1fr; }
  .sm-master-right { order: -1; }
  .sm-master-preview { position: static; }
  .sm-editor { grid-template-columns: 1fr; }
  .sm-editor-center { position: static; order: -1; }
  .sm-title { font-size: 1.4rem; }
  .sm-grid2 { grid-template-columns: 1fr; }
}
</style>
