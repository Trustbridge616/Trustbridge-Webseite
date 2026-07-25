<template>
  <Head>
    <title>Content Engine | Trustbridge</title>
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
  </Head>

  <div class="ce-page">
    <div class="ce-container">
      <header class="ce-header">
        <span class="ce-tag">Trustbridge Content Engine</span>
        <h1 class="ce-title">Instagram – Grundfoto Builder</h1>
        <p class="ce-sub">Text rein, fertiger Post raus — Bild, Caption, Hashtags, Serien &amp; Batch</p>
        <a href="/social" class="ce-studio-link">🌐 Multi-Plattform-Studio öffnen (TikTok, Reels, Stories, Facebook)</a>
      </header>

      <!-- ══════════ SERIEN ══════════ -->
      <div class="ce-serien">
        <button
          v-for="(s, key) in SERIEN" :key="key"
          class="ce-serie" :class="{ active: aktiveSerie === key }"
          @click="applySerie(key)"
        >{{ s.label }}</button>
      </div>

      <div class="ce-layout">
        <!-- ══════════ LINKE SPALTE: MODULE ══════════ -->
        <div class="ce-panels">

          <!-- Modul-Tabs: alles ohne Scrollen erreichbar -->
          <nav class="ce-tabs">
            <button v-for="(label, key) in TABS" :key="key" :class="{ active: aktivTab === key }" @click="aktivTab = key">{{ label }}</button>
          </nav>

          <!-- 1 · CONTENT -->
          <section class="ce-panel" v-show="aktivTab === 'content'">
            <h2 class="ce-panel-title"><span class="ce-num">1</span> Content</h2>
            <label class="ce-label">Spruch <span class="ce-hint">(Zeilenumbrüche werden exakt übernommen)</span></label>
            <textarea v-model="content.spruch" class="ce-input" rows="5" placeholder="Die größte Grenze ist selten der Weg.&#10;Sie ist die Geschichte, die dir deine Angst darüber erzählt."></textarea>

            <div class="ce-ki-row">
              <button v-for="(m, key) in KI_MODES" :key="key" class="ce-ki-btn" :disabled="kiBusy" @click="improve(key)">
                ✨ {{ m }}
              </button>
              <button v-if="spruchUndo !== null" class="ce-ki-btn undo" @click="undoImprove">↩ Rückgängig</button>
            </div>
            <p v-if="kiBusy" class="ce-status">KI arbeitet…</p>
            <p v-if="kiError" class="ce-error">{{ kiError }}</p>

            <div class="ce-grid2">
              <div>
                <label class="ce-label">Überschrift <span class="ce-hint">(optional)</span></label>
                <input v-model="content.ueberschrift" class="ce-input" placeholder="z. B. IMPULS" />
              </div>
              <div>
                <label class="ce-label">Untertitel <span class="ce-hint">(optional)</span></label>
                <input v-model="content.untertitel" class="ce-input" placeholder="z. B. Ein Gedanke für heute" />
              </div>
              <div>
                <label class="ce-label">Autor <span class="ce-hint">(optional)</span></label>
                <input v-model="content.autor" class="ce-input" placeholder="z. B. Trustbridge" />
              </div>
              <div>
                <label class="ce-label">CTA <span class="ce-hint">(leer = ohne)</span></label>
                <input v-model="content.cta" class="ce-input" placeholder="Jeder Gedanke kann eine neue Brücke sein." />
                <div class="ce-toggle" style="margin-top:0.45rem">
                  <button v-for="(c, key) in CTA_COLORS" :key="key" :class="{ active: design.ctaColor === key }" @click="design.ctaColor = key">
                    <span class="dot" :style="{ background: c.fill, boxShadow: c.glow ? '0 0 8px ' + c.fill : 'none' }"></span>{{ c.label }}
                  </button>
                </div>
              </div>
            </div>

            <label class="ce-label" style="margin-top:1rem">Kategorien <span class="ce-hint">(für Archiv &amp; spätere Auswertung)</span></label>
            <div class="ce-chips">
              <button v-for="k in KATEGORIEN" :key="k" class="ce-chip" :class="{ active: kategorien.includes(k) }" @click="toggleKategorie(k)">{{ k }}</button>
            </div>
          </section>

          <!-- 2 · DESIGN -->
          <section class="ce-panel" v-show="aktivTab === 'design'">
            <h2 class="ce-panel-title"><span class="ce-num">2</span> Design</h2>

            <label class="ce-label">Hintergrund <span class="ce-hint">(eigene Bilder einfach in /public/assets/trustbridge/builder/backgrounds legen)</span></label>
            <div class="ce-bg-grid">
              <button v-for="bg in backgrounds" :key="bg.src" class="ce-bg-thumb" :class="{ active: design.bgMode === 'image' && design.bgName === bg.name }" @click="selectBg(bg)">
                <img :src="bg.src" :alt="bg.name" loading="lazy" />
                <span>{{ bg.name }}</span>
              </button>
              <button class="ce-bg-thumb solid" :class="{ active: design.bgMode === 'schwarz' }" @click="design.bgMode = 'schwarz'">
                <span class="swatch schwarz"></span><span>Schwarz</span>
              </button>
              <button class="ce-bg-thumb solid" :class="{ active: design.bgMode === 'verlauf' }" @click="design.bgMode = 'verlauf'">
                <span class="swatch verlauf"></span><span>Farbverlauf</span>
              </button>
            </div>

            <div class="ce-grid2">
              <div>
                <label class="ce-label">Stil</label>
                <div class="ce-toggle">
                  <button :class="{ active: design.variant === 'frei' }" @click="design.variant = 'frei'">Frei</button>
                  <button :class="{ active: design.variant === 'shard' }" @click="design.variant = 'shard'">Shard-Karte</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Shard-Akzent</label>
                <div class="ce-toggle">
                  <button v-for="(a, key) in ACCENTS" :key="key" :class="{ active: design.accent === key }" @click="design.accent = key">{{ a.label }}</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Textfarbe</label>
                <div class="ce-toggle">
                  <button v-for="(c, key) in TEXT_COLORS" :key="key" :class="{ active: design.textColor === key }" @click="design.textColor = key">
                    <span class="dot" :style="{ background: c.value }"></span>{{ c.label }}
                  </button>
                </div>
              </div>
              <div>
                <label class="ce-label">Schrift</label>
                <div class="ce-toggle">
                  <button v-for="(f, key) in FONTS" :key="key" :class="{ active: design.font === key }" @click="design.font = key">{{ f.label }}</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Ausrichtung</label>
                <div class="ce-toggle">
                  <button :class="{ active: design.layoutH === 'zentriert' }" @click="design.layoutH = 'zentriert'">Zentriert</button>
                  <button :class="{ active: design.layoutH === 'links' }" @click="design.layoutH = 'links'">Links</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Position</label>
                <div class="ce-toggle">
                  <button :class="{ active: design.layoutV === 'oben' }" @click="design.layoutV = 'oben'">Oben</button>
                  <button :class="{ active: design.layoutV === 'mitte' }" @click="design.layoutV = 'mitte'">Mitte</button>
                  <button :class="{ active: design.layoutV === 'unten' }" @click="design.layoutV = 'unten'">Unten</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Filter</label>
                <div class="ce-toggle">
                  <button v-for="(f, key) in FILTERS" :key="key" :class="{ active: design.filter === key }" @click="design.filter = key">{{ f.label }}</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Text-Optionen</label>
                <div class="ce-toggle">
                  <button :class="{ active: design.glow }" @click="design.glow = !design.glow">Schatten</button>
                  <button :class="{ active: design.upper }" @click="design.upper = !design.upper">GROSS</button>
                  <button :class="{ active: design.letterSpread }" @click="design.letterSpread = !design.letterSpread">Weit</button>
                  <button :class="{ active: design.divider }" @click="design.divider = !design.divider"><span class="dot" style="background:#E53935"></span>Rote Linie</button>
                  <button :class="{ active: design.ctaKlein }" @click="design.ctaKlein = !design.ctaKlein" title="CTA 15 % kleiner — Hauptbotschaft dominiert stärker">CTA klein</button>
                </div>
              </div>
            </div>

            <div class="ce-sliders">
              <label class="ce-label">Abdunklung unten <span class="ce-hint">{{ design.darken }} %</span></label>
              <input type="range" v-model.number="design.darken" min="0" max="100" step="5" />
              <label class="ce-label">Textgröße <span class="ce-hint">{{ Math.round(design.sizeAdjust * 100) }} % (100 % ≈ 80 px Headline)</span></label>
              <input type="range" v-model.number="design.sizeAdjust" min="0.7" max="1.4" step="0.05" />
              <label class="ce-label">Zeilenabstand <span class="ce-hint">{{ design.lineHeight.toFixed(2) }}</span></label>
              <input type="range" v-model.number="design.lineHeight" min="1.0" max="1.8" step="0.05" />
            </div>
          </section>

          <!-- 3 · BRANDING -->
          <section class="ce-panel" v-show="aktivTab === 'branding'">
            <h2 class="ce-panel-title"><span class="ce-num">3</span> Branding</h2>
            <div class="ce-grid2">
              <div>
                <label class="ce-label">Logo</label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.logoShow }" @click="branding.logoShow = true">An</button>
                  <button :class="{ active: !branding.logoShow }" @click="branding.logoShow = false">Aus</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Größe</label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.logoSize === 'klein' }" @click="branding.logoSize = 'klein'">Klein</button>
                  <button :class="{ active: branding.logoSize === 'mittel' }" @click="branding.logoSize = 'mittel'">Mittel</button>
                  <button :class="{ active: branding.logoSize === 'gross' }" @click="branding.logoSize = 'gross'">Groß</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Position</label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.logoPos === 'unten-links' }" @click="branding.logoPos = 'unten-links'">Unten links</button>
                  <button :class="{ active: branding.logoPos === 'unten-mitte' }" @click="branding.logoPos = 'unten-mitte'">Unten Mitte</button>
                  <button :class="{ active: branding.logoPos === 'unten-rechts' }" @click="branding.logoPos = 'unten-rechts'">Unten rechts</button>
                  <button :class="{ active: branding.logoPos === 'oben-mitte' }" @click="branding.logoPos = 'oben-mitte'">Oben Mitte</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Deckkraft</label>
                <div class="ce-toggle">
                  <button v-for="op in [20, 40, 100]" :key="op" :class="{ active: branding.logoOpacity === op }" @click="branding.logoOpacity = op">{{ op }} %</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Mein Foto <span class="ce-hint">(unten rechts, rund mit Goldring)</span></label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.fotoShow }" @click="branding.fotoShow = true">An</button>
                  <button :class="{ active: !branding.fotoShow }" @click="branding.fotoShow = false">Aus</button>
                </div>
              </div>
              <div>
                <label class="ce-label">„Trust Yourself"-Zeile <span class="ce-hint">(Identität, immer gleich)</span></label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.identShow }" @click="branding.identShow = true">An</button>
                  <button :class="{ active: !branding.identShow }" @click="branding.identShow = false">Aus</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Follow-Button</label>
                <div class="ce-toggle">
                  <button :class="{ active: branding.followShow }" @click="branding.followShow = true">An</button>
                  <button :class="{ active: !branding.followShow }" @click="branding.followShow = false">Aus</button>
                </div>
              </div>
              <div v-if="branding.followShow">
                <label class="ce-label">Follow-Text</label>
                <input v-model="branding.followText" class="ce-input" placeholder="@ben.trustbridge" />
              </div>
              <div>
                <label class="ce-label">QR-Code <span class="ce-hint">(für Story &amp; Print)</span></label>
                <div class="ce-toggle" v-if="qrAvailable">
                  <button :class="{ active: branding.qrShow }" @click="branding.qrShow = true">An</button>
                  <button :class="{ active: !branding.qrShow }" @click="branding.qrShow = false">Aus</button>
                </div>
                <p v-else class="ce-hint">QR-Bild als <strong>qr-instagram.png</strong> in /public/assets/trustbridge/builder legen, dann erscheint hier der Schalter.</p>
              </div>
            </div>
          </section>

          <!-- 5 · CAPTION -->
          <section class="ce-panel" v-show="aktivTab === 'caption'">
            <h2 class="ce-panel-title"><span class="ce-num">4</span> Caption &amp; Hashtags</h2>
            <div class="ce-row-between">
              <button class="ce-btn gold" :disabled="kiBusy" @click="generateCaptionKi">✨ Caption mit KI erzeugen</button>
              <button class="ce-btn ghost" @click="generateCaptionLocal">Ohne KI (sofort)</button>
            </div>
            <label class="ce-label" style="margin-top:1rem">Caption <span class="ce-hint">(frei editierbar)</span></label>
            <textarea v-model="caption" class="ce-input" rows="6"></textarea>
            <label class="ce-label">Kommentar-Anreiz <span class="ce-hint">(konkrete Frage senkt die Antwort-Hürde — ein Klick hängt sie an)</span></label>
            <div class="ce-chips">
              <button v-for="p in KOMMENTAR_ANREIZE" :key="p" class="ce-chip" @click="addKommentarAnreiz(p)">{{ p }}</button>
            </div>
            <label class="ce-label" style="margin-top:0.8rem">Hashtags</label>
            <textarea v-model="hashtags" class="ce-input" rows="2"></textarea>
            <button class="ce-btn ghost" @click="copyCaption">{{ copied ? 'Kopiert ✓' : 'Caption + Hashtags kopieren' }}</button>
          </section>

          <!-- 7 · ARCHIV -->
          <section class="ce-panel" v-show="aktivTab === 'archiv'">
            <h2 class="ce-panel-title"><span class="ce-num">5</span> Archiv</h2>
            <div class="ce-row-between">
              <button class="ce-btn mint" @click="saveToArchiv">Aktuellen Post speichern</button>
              <input v-model="archivSuche" class="ce-input slim" placeholder="Suchen (Text oder Kategorie)…" />
            </div>
            <ul class="ce-archiv" v-if="gefiltertesArchiv.length">
              <li v-for="eintrag in gefiltertesArchiv" :key="eintrag.id">
                <button class="ce-archiv-load" @click="loadFromArchiv(eintrag)">
                  <span class="ce-archiv-text">{{ eintrag.content.spruch.split('\n')[0] }}</span>
                  <span class="ce-archiv-meta">{{ eintrag.datum }} · {{ eintrag.kategorien.join(', ') || 'ohne Kategorie' }}</span>
                </button>
                <button class="ce-archiv-del" @click="deleteFromArchiv(eintrag.id)" title="Löschen">✕</button>
              </li>
            </ul>
            <p v-else class="ce-hint">Noch keine gespeicherten Posts{{ archivSuche ? ' für diese Suche' : '' }}.</p>
          </section>

          <!-- 10 · A/B-TEST -->
          <section class="ce-panel" v-show="aktivTab === 'abtest'">
            <h2 class="ce-panel-title"><span class="ce-num">🧪</span> A/B-Varianten-Test</h2>
            <p class="ce-hint" style="margin-bottom:0.8rem">
              Jeder Beitrag ist eine Hypothese: Der aktuelle Spruch ist die <strong>Kernaussage</strong>.
              Hier erzeugst du daraus mit einem Klick mehrere Varianten (verschiedene Hooks × Layouts)
              als ZIP — im gewählten Format oben rechts (<strong>9:16 = Test-Reels</strong>).
              Veröffentliche die Varianten zeitversetzt und trage die Zahlen ins mitgelieferte
              <code>test-log.json</code> ein — so lernst du, worauf deine Community wirklich reagiert.
            </p>

            <label class="ce-label">Hook-Varianten <span class="ce-hint">(eine pro Zeile, max. 4 — jede wird eine eigene Version)</span></label>
            <textarea v-model="abHooks" class="ce-input" rows="4"></textarea>

            <label class="ce-label" style="margin-top:0.8rem">Layout-Varianten</label>
            <div class="ce-chips">
              <button v-for="(v, key) in AB_VARIANTS" :key="key" class="ce-chip" :class="{ active: abSelected.includes(key) }" @click="toggleAbVariant(key)">{{ v.label }}</button>
            </div>

            <div class="ce-row-between" style="margin-top:1rem">
              <button class="ce-btn gold" :disabled="abBusy || !abCount" @click="runAbTest">
                {{ abBusy ? `Rendere ${abProgress}…` : `${abCount} Varianten erzeugen (ZIP)` }}
              </button>
              <span class="ce-hint">{{ abHookList.length }} Hooks × {{ abSelected.length }} Layouts · Format {{ format }}</span>
            </div>
            <p class="ce-hint" style="margin-top:0.6rem">
              Bei „Weniger Text" wandert die Kernaussage automatisch an den Anfang der Caption —
              auf dem Bild bleiben nur Hook + „↓ Lies die Caption".
            </p>
          </section>

          <!-- 9 · VIRAL-RECHERCHE -->
          <section class="ce-panel" v-show="aktivTab === 'viral'">
            <h2 class="ce-panel-title"><span class="ce-num">🔥</span> Viral-Recherche</h2>
            <p class="ce-hint" style="margin-bottom:0.9rem">
              Links werden live aus deinem Spruch, den Hashtags und Kategorien gebaut. Ein Klick öffnet die
              Hashtag-/Trend-Seite der Plattform im neuen Tab — dort siehst du sofort, was zu deinem Thema
              gerade läuft (YouTube sogar nach Aufrufen sortiert). Eine echte „Viral-Rangliste" geben die
              Plattformen ohne API nicht her — das hier ist der schnellste ehrliche Weg dorthin.
            </p>
            <div class="ce-viral-grid">
              <div v-for="group in viralLinks" :key="group.platform" class="ce-viral-card">
                <strong>{{ group.icon }} {{ group.platform }}</strong>
                <a v-for="link in group.links" :key="link.url" :href="link.url" target="_blank" rel="noopener" class="ce-viral-link">
                  {{ link.label }} ↗
                </a>
              </div>
            </div>
          </section>

          <!-- 8 · BATCH -->
          <section class="ce-panel" v-show="aktivTab === 'batch'">
            <h2 class="ce-panel-title"><span class="ce-num">6</span> 🚀 Batch-Produktion</h2>
            <label class="ce-label">Mehrere Sprüche <span class="ce-hint">(je Karte durch eine Zeile mit --- trennen)</span></label>
            <textarea v-model="batchText" class="ce-input" rows="6" placeholder="Erster Spruch Zeile 1&#10;Erster Spruch Zeile 2&#10;---&#10;Zweiter Spruch…"></textarea>
            <div class="ce-row-between">
              <button class="ce-btn gold" :disabled="batchBusy" @click="runBatch">
                {{ batchBusy ? `Rendere ${batchProgress}…` : `${batchCount} Posts generieren (ZIP)` }}
              </button>
              <span class="ce-hint">Jeder Post: post.png + caption.txt + hashtags.txt + post.json</span>
            </div>
          </section>
        </div>

        <!-- ══════════ RECHTE SPALTE: VORSCHAU + EXPORT ══════════ -->
        <div class="ce-preview-col">
          <section class="ce-panel ce-sticky">
            <h2 class="ce-panel-title"><span class="ce-num">↓</span> Vorschau &amp; Export</h2>
            <div class="ce-grid2">
              <div>
                <label class="ce-label">Format</label>
                <div class="ce-toggle">
                  <button v-for="(f, key) in FORMATS" :key="key" :class="{ active: format === key }" @click="format = key">{{ key }}</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Dateityp</label>
                <div class="ce-toggle">
                  <button v-for="t in ['png', 'jpeg', 'webp']" :key="t" :class="{ active: fileType === t }" @click="fileType = t">{{ t.toUpperCase() }}</button>
                </div>
              </div>
              <div>
                <label class="ce-label">Safe-Zone <span class="ce-hint">(nur Vorschau, nie im Export)</span></label>
                <div class="ce-toggle">
                  <button :class="{ active: safeZone }" @click="safeZone = true">An</button>
                  <button :class="{ active: !safeZone }" @click="safeZone = false">Aus</button>
                </div>
              </div>
            </div>

            <canvas ref="canvasEl" class="ce-canvas" :width="dims.w" :height="dims.h"></canvas>
            <p v-if="safeZone && format !== '1:1'" class="ce-hint center">
              Gestrichelter Rahmen = überall sicher sichtbar. Rote Ränder können abgeschnitten werden:
              beim 4:5-Format durch den 1:1-Crop im Anzeigen-Manager (oben/unten je 135 px) und das
              3:4-Profilgrid (seitlich), bei 9:16 durch die Story-Bedienelemente.
            </p>

            <div class="ce-export-row">
              <button class="ce-btn mint" :disabled="!ready" @click="downloadImage">Bild herunterladen</button>
              <button class="ce-btn gold" :disabled="!ready" @click="downloadPaket">Post-Paket (ZIP)</button>
            </div>
            <p class="ce-hint center">{{ dims.w }} × {{ dims.h }} px · {{ fileType.toUpperCase() }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { Head } from '@inertiajs/vue3'
import JSZip from 'jszip'
import {
  FORMATS, TEXT_COLORS, ACCENTS, FONTS, FILTERS, KATEGORIEN, SERIEN, CTA_COLORS,
  drawCard, heuristicCaption, suggestHashtags, loadImage, canvasToBlob,
} from './builderEngine'
import { buildViralLinks } from './viralResearch'

// LOGO-REGEL: immer das Original-Portal-Logo, unverändert (siehe .agents/rules/style_and_notes.md)
const LOGO_SRC = '/Trustbridge Portal.png'
// Autoren-Foto (Ben) — landet als runder Ausschnitt unten rechts im Bild
// (25.07.2026: von IMG_4977 auf das Sonnenuntergang-Selfie gewechselt)
const FOTO_SRC = '/facesonne2.jpeg'
const QR_SRC = '/assets/trustbridge/builder/qr-instagram.png'
const ARCHIV_KEY = 'trustbridge-content-archiv'

const TABS = {
  content: '✍️ Content',
  design: '🎨 Design',
  branding: '🐆 Branding',
  caption: '💬 Caption',
  archiv: '🗂 Archiv',
  batch: '🚀 Batch',
  abtest: '🧪 A/B-Test',
  viral: '🔥 Viral',
}

const KI_MODES = {
  verbessern: 'Verbessern',
  emotionaler: 'Emotionaler',
  kuerzer: 'Kürzer',
  spiritueller: 'Spiritueller',
  trustbridge: 'Trustbridge-Stil',
}
const KI_MODE_API = { verbessern: 'verbessern', emotionaler: 'emotionaler', kuerzer: 'kuerzer', spiritueller: 'spiritueller', trustbridge: 'trustbridge' }

// ── State ──
const content = reactive({
  spruch: 'Die größte Grenze ist selten der Weg.\nSie ist die Geschichte, die dir deine Angst darüber erzählt.\n\nWer hat dir diese Geschichte erzählt?',
  ueberschrift: '',
  // Immer vorausgefüllt — steht damit standardmäßig in jedem Post im Bild
  untertitel: '↓ Lies die Caption',
  autor: '',
  cta: 'Jeder Gedanke kann eine neue Brücke sein.',
})

const design = reactive({
  variant: 'frei', bgMode: 'image', bgName: 'Wald 1',
  textColor: 'weiss', font: 'sans', accent: 'mint', filter: 'keiner',
  layoutH: 'zentriert', layoutV: 'unten',
  glow: true, upper: false, letterSpread: false, divider: false,
  darken: 60, sizeAdjust: 1, lineHeight: 1.1, ctaColor: 'tuerkis',
  ctaKlein: false,
})

const branding = reactive({
  // 'unten-links' = Reihen-Layout: Logo links · Claim mittig · Foto rechts
  logoShow: true, logoSize: 'mittel', logoPos: 'unten-links', logoOpacity: 100,
  followShow: false, followText: '@ben.trustbridge', qrShow: false,
  identShow: true,
  // Foto standardmäßig immer drin — die Serien-Presets fassen es nicht an
  fotoShow: true,
})
const qrAvailable = ref(false)
let qrImg = null

const aktivTab = ref('content')
const format = ref('4:5')
const fileType = ref('png')
const safeZone = ref(true)
const kategorien = ref([])
const caption = ref('')
const hashtags = ref('')
const copied = ref(false)
const aktiveSerie = ref('wald')
const ready = ref(false)

const kiBusy = ref(false)
const kiError = ref('')
const spruchUndo = ref(null)

const backgrounds = ref([])
const bgCache = new Map()
let logoImg = null
let fotoImg = null

const archiv = ref([])
const archivSuche = ref('')

const batchText = ref('')
const batchBusy = ref(false)
const batchProgress = ref('')

// ── A/B-Test ──
const AB_VARIANTS = {
  komplett: { label: 'Komplett (aktuelles Layout)' },
  minimal: { label: 'Weniger Text (Rest → Caption)' },
  nurLogo: { label: 'Nur Logo (ohne Portrait)' },
  nurPortrait: { label: 'Nur Portrait (ohne Logo)' },
  ctaKlein: { label: 'CTA 15 % kleiner' },
}
const abHooks = ref([
  'Diese Einsicht hat mein Leben verändert.',
  'Die meisten Menschen scheitern an derselben Illusion.',
  'Die größte Lüge erzählt dir oft deine eigene Angst.',
].join('\n'))
const abSelected = ref(['komplett', 'minimal'])
const abBusy = ref(false)
const abProgress = ref('')
const abHookList = computed(() => abHooks.value.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 4))
const abCount = computed(() => abHookList.value.length * abSelected.value.length)
function toggleAbVariant(key) {
  const i = abSelected.value.indexOf(key)
  if (i >= 0) abSelected.value.splice(i, 1)
  else abSelected.value.push(key)
}

const KOMMENTAR_ANREIZE = [
  'Schreib nur ein Wort: Welcher Schritt hält dich gerade zurück?',
  'Welchen ersten Schritt schiebst du schon viel zu lange vor dir her?',
  'Welche Geschichte erzählt dir deine Angst am häufigsten?',
]
function addKommentarAnreiz(text) {
  caption.value = `${caption.value.trim()}\n\n${text}`
}

const canvasEl = ref(null)

const dims = computed(() => FORMATS[format.value])
const batchCount = computed(() => batchText.value.split(/\n---\n?/).map((s) => s.trim()).filter(Boolean).length || 0)

// Viral-Recherche: Links live aus Spruch + Hashtags + Kategorien
const viralLinks = computed(() => buildViralLinks({
  text: content.spruch,
  hashtags: hashtags.value,
  kategorien: kategorien.value,
}))

const gefiltertesArchiv = computed(() => {
  const q = archivSuche.value.trim().toLowerCase()
  const list = [...archiv.value].reverse()
  if (!q) return list
  return list.filter((e) =>
    e.content.spruch.toLowerCase().includes(q) ||
    e.kategorien.some((k) => k.toLowerCase().includes(q)) ||
    (e.caption || '').toLowerCase().includes(q)
  )
})

// ── Assets & Init ──
async function loadFonts() {
  const loads = [
    '500 64px "Cormorant Garamond"', '600 64px "Cormorant Garamond"', 'italic 500 64px "Cormorant Garamond"',
    '400 64px "Montserrat"', '600 64px "Montserrat"', '700 64px "Montserrat"', '800 64px "Montserrat"',
    '700 64px "Playfair Display"',
  ]
  try { await Promise.all(loads.map((f) => document.fonts.load(f))) } catch (e) { /* Fallback-Fonts */ }
}

async function loadBackgrounds() {
  try {
    const res = await fetch('/builder/backgrounds')
    backgrounds.value = await res.json()
  } catch (e) {
    backgrounds.value = []
  }
}

async function getBgImage() {
  if (design.bgMode !== 'image') return null
  const bg = backgrounds.value.find((b) => b.name === design.bgName) || backgrounds.value[0]
  if (!bg) return null
  if (!bgCache.has(bg.src)) bgCache.set(bg.src, await loadImage(bg.src))
  return bgCache.get(bg.src)
}

function selectBg(bg) {
  design.bgMode = 'image'
  design.bgName = bg.name
}

// Vertikaler Fokus des aktiven Hintergrunds (aus dem Dateinamen, s. Route)
function currentBgFocus() {
  if (design.bgMode !== 'image') return 0.5
  const bg = backgrounds.value.find((b) => b.name === design.bgName) || backgrounds.value[0]
  return bg && typeof bg.focus === 'number' ? bg.focus : 0.5
}

// ── Rendering ──
// showSafe nur für die Vorschau — Export und Batch rendern immer ohne Overlay
function renderOptions(w, h, bgImage, contentOverride, showSafe = false) {
  return {
    safeZone: showSafe,
    W: w, H: h, bgImage, bgFocus: currentBgFocus(),
    bgMode: design.bgMode, filter: design.filter, darken: design.darken,
    variant: design.variant, accent: design.accent, textColor: design.textColor,
    font: design.font, layoutH: design.layoutH, layoutV: design.layoutV,
    glow: design.glow, upper: design.upper, letterSpread: design.letterSpread, divider: design.divider,
    ctaColor: design.ctaColor,
    ctaScale: design.ctaKlein ? 0.85 : 1,
    sizeAdjust: design.sizeAdjust, lineHeight: design.lineHeight,
    content: contentOverride || { ...content },
    logoImg, logoShow: branding.logoShow, logoSize: branding.logoSize,
    logoPos: branding.logoPos, logoOpacity: branding.logoOpacity,
    followShow: branding.followShow, followText: branding.followText,
    qrShow: branding.qrShow, qrImg, identShow: branding.identShow,
    fotoImg, fotoShow: branding.fotoShow,
  }
}

let renderQueued = false
async function render() {
  if (renderQueued) return
  renderQueued = true
  await Promise.resolve()
  renderQueued = false
  const canvas = canvasEl.value
  if (!canvas) return
  const bgImage = await getBgImage()
  drawCard(canvas.getContext('2d'), renderOptions(dims.value.w, dims.value.h, bgImage, null, safeZone.value))
}

// Export-Rendering: identisch, aber ohne Safe-Zone-Overlay
async function renderExport() {
  const canvas = canvasEl.value
  if (!canvas) return
  const bgImage = await getBgImage()
  drawCard(canvas.getContext('2d'), renderOptions(dims.value.w, dims.value.h, bgImage))
}

watch([content, design, branding, format, safeZone], render, { deep: true })
watch([content, design, branding], () => { aktiveSerie.value = '' }, { deep: true })

onMounted(async () => {
  await Promise.all([loadFonts(), loadBackgrounds()])
  logoImg = await loadImage(LOGO_SRC)
  fotoImg = await loadImage(FOTO_SRC)
  qrImg = await loadImage(QR_SRC)
  qrAvailable.value = !!qrImg
  try { archiv.value = JSON.parse(localStorage.getItem(ARCHIV_KEY) || '[]') } catch (e) { archiv.value = [] }
  generateCaptionLocal()
  ready.value = true
  render()
})

// ── Serien ──
function applySerie(key) {
  const s = SERIEN[key]
  Object.assign(design, s.design)
  Object.assign(branding, s.branding)
  // Hintergrund-Name nur übernehmen, wenn er existiert
  if (s.design.bgMode === 'image' && !backgrounds.value.some((b) => b.name === s.design.bgName)) {
    design.bgName = backgrounds.value[0]?.name || ''
  }
  requestAnimationFrame(() => { aktiveSerie.value = key })
}

// ── Kategorien ──
function toggleKategorie(k) {
  const i = kategorien.value.indexOf(k)
  if (i >= 0) kategorien.value.splice(i, 1)
  else kategorien.value.push(k)
}

// ── KI ──
function csrfHeaders() {
  const m = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(m ? { 'X-XSRF-TOKEN': decodeURIComponent(m[1]) } : {}),
  }
}

async function callAi(payload) {
  const res = await fetch('/builder/ai', {
    method: 'POST',
    headers: csrfHeaders(),
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Fehler ${res.status}`)
  return data
}

async function improve(mode) {
  if (!content.spruch.trim()) return
  kiBusy.value = true
  kiError.value = ''
  try {
    const data = await callAi({ action: 'improve', text: content.spruch, mode: KI_MODE_API[mode] })
    spruchUndo.value = content.spruch
    content.spruch = data.text
  } catch (e) {
    kiError.value = e.message
  } finally {
    kiBusy.value = false
  }
}

function undoImprove() {
  if (spruchUndo.value !== null) {
    content.spruch = spruchUndo.value
    spruchUndo.value = null
  }
}

async function generateCaptionKi() {
  if (!content.spruch.trim()) return
  kiBusy.value = true
  kiError.value = ''
  try {
    const data = await callAi({ action: 'caption', text: content.spruch })
    const c = data.caption
    let text = `${c.hook}\n\n${c.zeilen.join('\n')}\n\n${c.cta}`
    // Die Folge-Zeile steht IMMER in der Caption — auch wenn die KI sie weglässt
    if (!/folge/i.test(text)) text += `\n\n➤ Folge ${branding.followText || '@ben.trustbridge'} für mehr.`
    caption.value = text
    hashtags.value = c.hashtags.join(' ')
  } catch (e) {
    kiError.value = e.message
  } finally {
    kiBusy.value = false
  }
}

function generateCaptionLocal() {
  const r = heuristicCaption(content.spruch)
  caption.value = r.caption
  hashtags.value = r.hashtags.join(' ')
}

async function copyCaption() {
  try {
    await navigator.clipboard.writeText(`${caption.value}\n\n${hashtags.value}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch (e) { /* Zwischenablage nicht verfügbar */ }
}

// ── Export ──
function stamp() {
  const d = new Date()
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`
}

function mime() {
  return fileType.value === 'png' ? 'image/png' : fileType.value === 'jpeg' ? 'image/jpeg' : 'image/webp'
}

function triggerDownload(blob, name) {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 5000)
}

async function downloadImage() {
  await renderExport()
  const blob = await canvasToBlob(canvasEl.value, mime(), 0.92)
  triggerDownload(blob, `trustbridge-post-${stamp()}.${fileType.value}`)
  render()
}

function postJson(extra = {}) {
  return JSON.stringify({
    erstellt: new Date().toISOString(),
    content: { ...content },
    design: { ...design },
    branding: { ...branding },
    format: format.value,
    kategorien: [...kategorien.value],
    caption: caption.value,
    hashtags: hashtags.value.split(/\s+/).filter(Boolean),
    analytics: { likes: null, kommentare: null, gespeichert: null, geteilt: null, aufrufe: null },
    ...extra,
  }, null, 2)
}

async function downloadPaket() {
  await renderExport()
  const zip = new JSZip()
  const blob = await canvasToBlob(canvasEl.value, mime(), 0.92)
  zip.file(`post.${fileType.value}`, blob)
  zip.file('caption.txt', caption.value)
  zip.file('hashtags.txt', hashtags.value)
  zip.file('post.json', postJson())
  const out = await zip.generateAsync({ type: 'blob' })
  triggerDownload(out, `trustbridge-post-${stamp()}.zip`)
  saveToArchiv()
  render()
}

// ── Batch ──
async function runBatch() {
  const sprueche = batchText.value.split(/\n---\n?/).map((s) => s.trim()).filter(Boolean)
  if (!sprueche.length) return
  batchBusy.value = true
  try {
    const zip = new JSZip()
    const bgImage = await getBgImage()
    const off = document.createElement('canvas')
    off.width = dims.value.w
    off.height = dims.value.h
    const ctx = off.getContext('2d')

    for (let i = 0; i < sprueche.length; i++) {
      batchProgress.value = `${i + 1}/${sprueche.length}`
      const spruch = sprueche[i]
      drawCard(ctx, renderOptions(dims.value.w, dims.value.h, bgImage, { ...content, spruch }))
      const blob = await canvasToBlob(off, mime(), 0.92)
      const cap = heuristicCaption(spruch)
      const folder = zip.folder(`post-${String(i + 1).padStart(3, '0')}`)
      folder.file(`post.${fileType.value}`, blob)
      folder.file('caption.txt', cap.caption)
      folder.file('hashtags.txt', cap.hashtags.join(' '))
      folder.file('post.json', JSON.stringify({
        erstellt: new Date().toISOString(),
        content: { ...content, spruch },
        design: { ...design }, branding: { ...branding },
        format: format.value, kategorien: [...kategorien.value],
        caption: cap.caption, hashtags: cap.hashtags,
        analytics: { likes: null, kommentare: null, gespeichert: null, geteilt: null, aufrufe: null },
      }, null, 2))
    }

    const out = await zip.generateAsync({ type: 'blob' })
    triggerDownload(out, `trustbridge-batch-${stamp()}-${sprueche.length}-posts.zip`)
  } finally {
    batchBusy.value = false
    batchProgress.value = ''
    render()
  }
}

// ── A/B-Test: Hooks × Layout-Varianten als ZIP ──
async function runAbTest() {
  if (!abCount.value) return
  abBusy.value = true
  try {
    const zip = new JSZip()
    const root = zip.folder(`trustbridge-abtest-${stamp()}`)
    const bgImage = await getBgImage()
    const off = document.createElement('canvas')
    off.width = dims.value.w
    off.height = dims.value.h
    const ctx = off.getContext('2d')
    const kern = content.spruch.trim()
    const testLog = []
    let n = 0

    for (const hook of abHookList.value) {
      for (const vKey of abSelected.value) {
        n++
        abProgress.value = `${n}/${abCount.value}`
        const opts = renderOptions(dims.value.w, dims.value.h, bgImage, { ...content })
        // Layout-Variante anwenden
        if (vKey === 'minimal') {
          opts.content = { ...content, spruch: hook, cta: '' }
        } else {
          opts.content = { ...content, spruch: `${hook}\n\n${kern}` }
        }
        if (vKey === 'nurLogo') opts.fotoShow = false
        if (vKey === 'nurPortrait') opts.logoShow = false
        if (vKey === 'ctaKlein') opts.ctaScale = 0.85
        drawCard(ctx, opts)
        const blob = await canvasToBlob(off, mime(), 0.92)

        const slug = `v${String(n).padStart(2, '0')}-${vKey}`
        const folder = root.folder(slug)
        folder.file(`post.${fileType.value}`, blob)
        // Bei „Weniger Text" gehört die Kernaussage an den Caption-Anfang
        const cap = vKey === 'minimal' ? `${kern}\n\n${caption.value}` : caption.value
        folder.file('caption.txt', `${cap}\n\n${hashtags.value}`)
        folder.file('meta.json', JSON.stringify({ hook, variante: AB_VARIANTS[vKey].label, format: format.value, erzeugt: new Date().toISOString() }, null, 2))
        testLog.push({
          datei: `${slug}/post.${fileType.value}`, hook, variante: AB_VARIANTS[vKey].label,
          veroeffentlicht: null, reichweite: null, likes: null, kommentare: null,
          gespeichert: null, geteilt: null, profilbesuche: null, follows: null,
        })
      }
    }

    root.file('test-log.json', JSON.stringify(testLog, null, 2))
    root.file('hypothesen.md', [
      '# Trustbridge A/B-Test',
      '',
      `Kernaussage: ${kern.split('\n')[0]}`,
      `Format: ${format.value} · ${dims.value.w}×${dims.value.h}`,
      '',
      '## Vorgehen',
      '1. Varianten zeitversetzt veröffentlichen (gleiche Uhrzeit, verschiedene Tage — nie zwei am selben Tag).',
      '2. Nach 48 h die Zahlen aus Instagram-Insights in test-log.json eintragen.',
      '3. Gewinner-Merkmale (Hook-Typ, Textmenge, Branding) in künftige Posts übernehmen.',
      '',
      '## Was jede Variante testet',
      '- Komplett: die bisherige Struktur als Referenz (Baseline).',
      '- Weniger Text: Scroll-Stopp-These — weniger Text auf dem Bild, Tiefe in der Caption.',
      '- Nur Logo / Nur Portrait: was zieht mehr — Marke oder Gesicht?',
      '- CTA klein: dominiert die Hauptbotschaft stärker, ohne den Caption-Hinweis zu verlieren.',
    ].join('\n'))

    const out = await zip.generateAsync({ type: 'blob' })
    triggerDownload(out, `trustbridge-abtest-${stamp()}-${abCount.value}-varianten.zip`)
  } finally {
    abBusy.value = false
    abProgress.value = ''
    render()
  }
}

// ── Archiv (localStorage) ──
function saveToArchiv() {
  const eintrag = {
    id: Date.now(),
    datum: new Date().toLocaleDateString('de-DE'),
    content: { ...content },
    design: { ...design },
    branding: { ...branding },
    format: format.value,
    kategorien: [...kategorien.value],
    caption: caption.value,
    hashtags: hashtags.value,
  }
  archiv.value.push(eintrag)
  localStorage.setItem(ARCHIV_KEY, JSON.stringify(archiv.value))
}

function loadFromArchiv(eintrag) {
  Object.assign(content, eintrag.content)
  Object.assign(design, eintrag.design)
  Object.assign(branding, eintrag.branding)
  format.value = eintrag.format
  kategorien.value = [...eintrag.kategorien]
  caption.value = eintrag.caption
  hashtags.value = eintrag.hashtags
}

function deleteFromArchiv(id) {
  archiv.value = archiv.value.filter((e) => e.id !== id)
  localStorage.setItem(ARCHIV_KEY, JSON.stringify(archiv.value))
}
</script>

<style scoped>
.ce-page, .ce-page :deep(*), .ce-page :deep(*)::before, .ce-page :deep(*)::after { box-sizing: border-box; }

.ce-page {
  min-height: 100vh;
  overflow-x: hidden;
  background: radial-gradient(ellipse at 50% -10%, #1a1033 0%, #0b0618 45%, #050310 100%);
  padding: 3.5rem 2rem 6rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  color: #F7F1FF;
}
.ce-container { max-width: 1340px; margin: 0 auto; }

.ce-header { text-align: center; margin-bottom: 2rem; }
.ce-studio-link {
  display: inline-block; margin-top: 0.8rem; padding: 0.5rem 1.1rem; border-radius: 50px;
  background: rgba(124,58,237,0.2); border: 1px solid rgba(167,139,250,0.45);
  color: #d8c9f8; font-size: 0.85rem; font-weight: 700; text-decoration: none;
  transition: all 0.25s ease;
}
.ce-studio-link:hover { background: rgba(124,58,237,0.4); transform: translateY(-2px); }

/* Viral-Recherche */
.ce-viral-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.8rem; }
.ce-viral-card {
  background: rgba(10,8,22,0.7); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px; padding: 0.8rem 0.95rem;
  display: flex; flex-direction: column; gap: 0.45rem;
}
.ce-viral-card strong { font-size: 0.92rem; margin-bottom: 0.15rem; }
.ce-viral-link {
  display: block; padding: 0.45rem 0.75rem; border-radius: 10px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
  color: #D9CFE8; font-size: 0.8rem; font-weight: 600; text-decoration: none;
  transition: all 0.2s ease; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.ce-viral-link:hover { border-color: rgba(142,245,210,0.55); color: #8EF5D2; }
.ce-tag {
  display: inline-block; font-size: 0.8rem; font-weight: 700; letter-spacing: 4px;
  text-transform: uppercase; color: #8EF5D2; margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(142,245,210,0.5);
}
.ce-title { font-size: 2.4rem; font-weight: 800; margin: 0 0 0.5rem; text-shadow: 0 0 40px rgba(124,58,237,0.35); }
.ce-sub { color: #D9CFE8; margin: 0; }

/* Serien */
.ce-serien { display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
.ce-serie {
  padding: 0.6rem 1.3rem; border-radius: 50px; cursor: pointer;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15);
  color: #D9CFE8; font-family: inherit; font-size: 0.9rem; font-weight: 700;
  transition: all 0.25s ease;
}
.ce-serie:hover { transform: translateY(-2px); border-color: rgba(240,207,90,0.5); }
.ce-serie.active {
  background: rgba(240,207,90,0.15); border-color: rgba(240,207,90,0.7);
  color: #F0CF5A; box-shadow: 0 0 18px rgba(240,207,90,0.25);
}

.ce-layout { display: grid; grid-template-columns: minmax(340px, 1fr) minmax(340px, 480px); gap: 2rem; align-items: start; }
.ce-panels { display: flex; flex-direction: column; gap: 1rem; min-width: 0; }

/* Modul-Tabs */
.ce-tabs {
  display: flex; gap: 0.4rem; flex-wrap: wrap;
  background: rgba(30,20,50,0.6); border: 1px solid rgba(142,245,210,0.22);
  border-radius: 16px; padding: 0.5rem; backdrop-filter: blur(12px);
}
.ce-tabs button {
  flex: 1; min-width: 90px;
  padding: 0.55rem 0.6rem; border-radius: 10px; cursor: pointer;
  background: transparent; border: 1px solid transparent;
  color: #D9CFE8; font-family: inherit; font-size: 0.85rem; font-weight: 700;
  transition: all 0.2s ease; white-space: nowrap;
}
.ce-tabs button:hover { background: rgba(255,255,255,0.06); }
.ce-tabs button.active {
  background: rgba(142,245,210,0.14); border-color: rgba(142,245,210,0.5);
  color: #8EF5D2;
}
.ce-preview-col { min-width: 0; }
.ce-sticky { position: sticky; top: 1.5rem; }

.ce-panel {
  background: rgba(30,20,50,0.6);
  border: 1px solid rgba(142,245,210,0.22);
  border-radius: 20px; padding: 1.15rem 1.25rem;
  backdrop-filter: blur(12px);
}
.ce-panel-title {
  font-size: 1.05rem; font-weight: 800; margin: 0 0 1.1rem;
  display: flex; align-items: center; gap: 0.6rem;
  color: #F7F1FF; /* globales h2 ist dunkel — hier hell erzwingen */
  -webkit-text-fill-color: #F7F1FF;
}
.ce-num {
  width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
  background: rgba(124,58,237,0.35); border: 1px solid rgba(167,139,250,0.5);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.85rem; color: #d8c9f8;
}

.ce-label { display: block; font-weight: 700; font-size: 0.86rem; margin: 0.55rem 0 0.32rem; }
.ce-hint { font-weight: 400; font-size: 0.76rem; color: rgba(217,207,232,0.65); }
.ce-hint.center { display: block; text-align: center; margin-top: 0.5rem; }

.ce-input {
  width: 100%; resize: vertical;
  background: rgba(10,8,22,0.7);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 10px;
  color: #FFF; font-family: inherit; font-size: 0.95rem; line-height: 1.55;
  padding: 0.7rem 0.9rem;
  transition: border-color 0.3s ease;
}
.ce-input:focus { outline: none; border-color: rgba(142,245,210,0.6); }
.ce-input.slim { width: auto; flex: 1; margin-left: 0.8rem; padding: 0.5rem 0.8rem; }

.ce-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 1rem; }

.ce-toggle { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.ce-toggle button {
  padding: 0.42rem 0.85rem; border-radius: 50px; cursor: pointer;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);
  color: #D9CFE8; font-family: inherit; font-size: 0.8rem; font-weight: 600;
  transition: all 0.25s ease; display: inline-flex; align-items: center; gap: 0.35rem;
}
.ce-toggle button.active {
  background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.6);
  color: #8EF5D2; box-shadow: 0 0 12px rgba(142,245,210,0.2);
}
.ce-toggle .dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.4); }

/* Hintergrund-Kacheln */
.ce-bg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); gap: 0.5rem; margin-bottom: 0.5rem; }
.ce-bg-thumb {
  position: relative; border-radius: 12px; overflow: hidden; cursor: pointer;
  border: 2px solid rgba(255,255,255,0.12); background: rgba(10,8,22,0.7);
  padding: 0; aspect-ratio: 4/5; transition: all 0.25s ease;
  display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
}
.ce-bg-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.ce-bg-thumb span {
  position: relative; z-index: 2; width: 100%; text-align: center;
  font-size: 0.68rem; font-weight: 700; color: #fff; padding: 0.3rem 0.2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.85));
  font-family: inherit;
}
.ce-bg-thumb.active { border-color: #8EF5D2; box-shadow: 0 0 14px rgba(142,245,210,0.35); }
.ce-bg-thumb.solid .swatch { position: absolute; inset: 0; }
.swatch.schwarz { background: #060608; }
.swatch.verlauf { background: linear-gradient(135deg, #1a1033, #0e1b2e, #040308); }

/* Slider */
.ce-sliders { margin-top: 0.8rem; }
.ce-sliders input[type='range'] { width: 100%; accent-color: #8EF5D2; }

/* Buttons */
.ce-btn {
  padding: 0.6rem 1.2rem; border-radius: 50px; cursor: pointer; border: none;
  font-family: inherit; font-size: 0.88rem; font-weight: 800;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.ce-btn:hover:not(:disabled) { transform: translateY(-2px); }
.ce-btn:disabled { opacity: 0.4; cursor: wait; }
.ce-btn.mint { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 8px 18px rgba(142,245,210,0.3); }
.ce-btn.gold { background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 8px 18px rgba(240,207,90,0.3); }
.ce-btn.ghost {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.2); color: #D9CFE8;
  margin-top: 0.6rem;
}

.ce-row-between { display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; }

/* KI-Buttons */
.ce-ki-row { display: flex; gap: 0.4rem; flex-wrap: wrap; margin: 0.6rem 0 0.2rem; }
.ce-ki-btn {
  padding: 0.42rem 0.9rem; border-radius: 50px; cursor: pointer;
  background: rgba(124,58,237,0.2); border: 1px solid rgba(167,139,250,0.45);
  color: #d8c9f8; font-family: inherit; font-size: 0.8rem; font-weight: 700;
  transition: all 0.25s ease;
}
.ce-ki-btn:hover:not(:disabled) { background: rgba(124,58,237,0.4); transform: translateY(-2px); }
.ce-ki-btn:disabled { opacity: 0.4; cursor: wait; }
.ce-ki-btn.undo { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); color: #fff; }
.ce-status { color: #8EF5D2; font-size: 0.85rem; margin: 0.4rem 0 0; }
.ce-error { color: #ff9d9d; font-size: 0.85rem; margin: 0.4rem 0 0; }

/* Kategorien */
.ce-chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.ce-chip {
  padding: 0.35rem 0.85rem; border-radius: 50px; cursor: pointer;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15);
  color: #D9CFE8; font-family: inherit; font-size: 0.78rem; font-weight: 600;
  transition: all 0.25s ease;
}
.ce-chip.active {
  background: rgba(240,207,90,0.15); border-color: rgba(240,207,90,0.6);
  color: #F0CF5A;
}

/* Archiv */
.ce-archiv { list-style: none; margin: 1rem 0 0; padding: 0; display: flex; flex-direction: column; gap: 0.45rem; max-height: 300px; overflow-y: auto; }
.ce-archiv li { display: flex; gap: 0.4rem; align-items: stretch; }
.ce-archiv-load {
  flex: 1; text-align: left; cursor: pointer; padding: 0.55rem 0.85rem;
  background: rgba(10,8,22,0.7); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; color: #F7F1FF; font-family: inherit;
  transition: border-color 0.25s ease; min-width: 0;
}
.ce-archiv-load:hover { border-color: rgba(142,245,210,0.5); }
.ce-archiv-text { display: block; font-size: 0.85rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ce-archiv-meta { display: block; font-size: 0.72rem; color: rgba(217,207,232,0.6); margin-top: 0.15rem; }
.ce-archiv-del {
  width: 34px; border-radius: 10px; cursor: pointer;
  background: rgba(255,80,80,0.12); border: 1px solid rgba(255,120,120,0.3);
  color: #ff9d9d; font-family: inherit; transition: all 0.25s ease;
}
.ce-archiv-del:hover { background: rgba(255,80,80,0.3); }

/* Vorschau */
.ce-canvas {
  width: 100%; height: auto; display: block; margin-top: 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 25px 60px rgba(0,0,0,0.6);
}
.ce-export-row { display: flex; gap: 0.8rem; margin-top: 1rem; justify-content: center; flex-wrap: wrap; }

@media (max-width: 1080px) {
  .ce-page { padding: 2.5rem 1rem 4rem; }
  .ce-layout { grid-template-columns: 1fr; }
  .ce-sticky { position: static; }
  .ce-title { font-size: 1.5rem; overflow-wrap: break-word; }
  .ce-grid2 { grid-template-columns: 1fr; }
}
</style>
