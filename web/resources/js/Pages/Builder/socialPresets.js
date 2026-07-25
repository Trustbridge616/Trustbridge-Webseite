// ═══════════════════════════════════════════════════════════════════════════
// Trustbridge Social — zentrale Plattform-Presets
//
// EINZIGE Quelle für Canvas-Maße, Safe-Areas, UI-Ausschlusszonen, Crop-
// Vorschauen und Export-Formate. Keine dieser Zahlen darf in Komponenten
// oder der Render-Engine erneut hart codiert werden.
//
// Diese Datei ist bewusst frei von Browser-APIs (kein Canvas, kein DOM),
// damit sie in Node-Tests direkt importierbar ist.
//
// safeAreaSource dokumentiert die Herkunft der Werte je Preset:
//   'official-overlay'                — offizielle Overlay-Datei der Plattform
//   'official-percentage-guidance'   — offizielle Prozentangaben (z. B. Meta:
//                                      oben 14 % / unten 35 % für Reels)
//   'conservative-builder-default'   — bewusst konservative Builder-Annahme
// ═══════════════════════════════════════════════════════════════════════════

/** Rechteck-Helfer: {x, y, w, h} */
const rect = (x, y, w, h) => ({ x, y, w, h })

// ── Gemeinsame Geometrien (einmal definiert, von Presets referenziert) ──

// Meta-Guidance für 1080×1920 (Reels/Stories): oben 14 %, unten 35 %, seitlich 6 %
const META_V_TOP = Math.round(1920 * 0.14)      // 269
const META_V_BOTTOM = Math.round(1920 * 0.35)   // 672
const META_V_SIDE = Math.round(1080 * 0.06)     // 65

const metaVerticalSafe = {
  source: 'official-percentage-guidance',
  // empfohlener Bereich (Plattform-UI-orientiert)
  recommended: rect(META_V_SIDE, META_V_TOP, 1080 - 2 * META_V_SIDE, 1920 - META_V_TOP - META_V_BOTTOM),
  // Trustbridge-Kernzone: noch konservativer (Hook, Botschaft, Logo, Portrait)
  critical: rect(108, 340, 1080 - 216, 1920 - 340 - 760),
  platformUiExclusions: [
    { zone: rect(0, 0, 1080, META_V_TOP), label: 'Statuszeile / Kamera' },
    { zone: rect(0, 1920 - META_V_BOTTOM, 1080, META_V_BOTTOM), label: 'Caption / Aktionen / Navigation' },
    { zone: rect(0, META_V_TOP, META_V_SIDE, 1920 - META_V_TOP - META_V_BOTTOM), label: 'Rand links' },
    { zone: rect(1080 - META_V_SIDE, META_V_TOP, META_V_SIDE, 1920 - META_V_TOP - META_V_BOTTOM), label: 'Rand rechts' },
  ],
}

// TikTok 1080×1920 — konservative Builder-Defaults (siehe Aufgabenstellung)
const tiktokSafe = {
  source: 'conservative-builder-default',
  recommended: rect(90, 220, 730, 1050),
  critical: rect(110, 300, 640, 880),
  platformUiExclusions: [
    { zone: rect(0, 0, 1080, 180), label: 'Obere Navigation / Status' },
    { zone: rect(820, 430, 260, 1050), label: 'Rechte Interaktionsleiste' },
    { zone: rect(0, 1420, 1080, 500), label: 'Caption / Audio / Account' },
    { zone: rect(0, 1800, 1080, 120), label: 'Untere Navigation' },
  ],
}

// Instagram/Facebook Feed 4:5 — Trustbridge-Standardränder
// plus 1:1-Crop-Wissen (Anzeigen-Manager) und 3:4-Profilgrid
const feedSafe = {
  source: 'conservative-builder-default',
  recommended: rect(35, 135, 1080 - 70, 1350 - 270),   // 1:1-Anzeigen-Crop + Grid-Seiten
  critical: rect(72, 135, 1080 - 144, 1350 - 270),      // Trustbridge-Kernzone (min. 72/96 gefordert)
  platformUiExclusions: [
    { zone: rect(0, 0, 1080, 135), label: '1:1-Crop oben (Anzeigen)' },
    { zone: rect(0, 1350 - 135, 1080, 135), label: '1:1-Crop unten (Anzeigen)' },
    { zone: rect(0, 0, 34, 1350), label: '3:4-Profilgrid links' },
    { zone: rect(1080 - 34, 0, 34, 1350), label: '3:4-Profilgrid rechts' },
  ],
}

// ── Plattformabhängige Typo-Standards (Prozent der Preset-Basisgröße) ──
// Die Hauptaussage ist die Referenz (100 %); alle anderen Felder sind relativ.
const TYPO_FEED = { hook: 0.85, statement: 1, question: 0.85, cta: 0.55 }
const TYPO_REEL = { hook: 0.9, statement: 1, question: 0.8, cta: 0.55 }
const TYPO_STORY = { hook: 0.9, statement: 1, question: 0.8, cta: 0.6 }
const TYPO_TIKTOK = { hook: 0.95, statement: 1, question: 0.8, cta: 0.55 }

// ── Layout-Grundtypen der Auto-Layout-Engine ──
//  'feed'     → 4:5-Komposition: Textblock + Footer-Reihe (Logo · Claim · Portrait)
//  'reel'     → 9:16 zentriert, Kernzone Mitte, kompakte Markenreihe darüber
//  'tiktok'   → 9:16 linksbündig, rechte UI-Spalte frei, Marken kompakt & klein

export const PLATFORM_PRESETS = {
  'instagram-feed-portrait': {
    id: 'instagram-feed-portrait',
    platform: 'instagram',
    placement: 'Feed',
    label: 'Instagram Feed 4:5',
    canvas: { width: 1080, height: 1350, aspectRatio: '4:5' },
    safeArea: feedSafe,
    gridPreview: { aspectRatio: '3:4', cropPosition: 'center' },
    export: { imageFormats: ['png', 'jpeg', 'webp'], defaultImageFormat: 'png' },
    layout: { kind: 'feed', textAlign: 'center', brandScale: 1, typo: TYPO_FEED },
  },
  'instagram-reel': {
    id: 'instagram-reel',
    platform: 'instagram',
    placement: 'Reel',
    label: 'Instagram Reel 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: metaVerticalSafe,
    gridPreview: { aspectRatio: '1:1', cropPosition: 'center' },
    export: { imageFormats: ['png', 'jpeg'], videoFormats: ['mp4', 'webm'], defaultImageFormat: 'jpeg', defaultVideoFormat: 'mp4' },
    layout: { kind: 'reel', textAlign: 'center', brandScale: 0.85, typo: TYPO_REEL },
  },
  'instagram-story': {
    id: 'instagram-story',
    platform: 'instagram',
    placement: 'Story',
    label: 'Instagram Story 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: metaVerticalSafe,
    export: { imageFormats: ['png', 'jpeg'], videoFormats: ['mp4', 'webm'], defaultImageFormat: 'png' },
    layout: { kind: 'reel', textAlign: 'center', brandScale: 0.85, typo: TYPO_STORY },
  },
  'instagram-cover': {
    id: 'instagram-cover',
    platform: 'instagram',
    placement: 'Reel-Cover',
    label: 'Instagram Reel-Cover',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: metaVerticalSafe,
    gridPreview: { aspectRatio: '1:1', cropPosition: 'center' },
    export: { imageFormats: ['jpeg', 'png'], defaultImageFormat: 'jpeg' },
    layout: { kind: 'reel', textAlign: 'center', brandScale: 0.85, coverMode: true, typo: TYPO_REEL },
  },
  'tiktok-video': {
    id: 'tiktok-video',
    platform: 'tiktok',
    placement: 'Video',
    label: 'TikTok Video 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: tiktokSafe,
    export: { imageFormats: ['png', 'jpeg'], videoFormats: ['mp4', 'webm'], defaultVideoFormat: 'mp4' },
    layout: { kind: 'tiktok', textAlign: 'left', brandScale: 0.72, typo: TYPO_TIKTOK },
  },
  'tiktok-photo': {
    id: 'tiktok-photo',
    platform: 'tiktok',
    placement: 'Photo',
    label: 'TikTok Photo 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: tiktokSafe,
    export: { imageFormats: ['png', 'jpeg'], defaultImageFormat: 'png' },
    layout: { kind: 'tiktok', textAlign: 'left', brandScale: 0.72, typo: TYPO_TIKTOK },
  },
  'tiktok-cover': {
    id: 'tiktok-cover',
    platform: 'tiktok',
    placement: 'Cover',
    label: 'TikTok Cover',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: tiktokSafe,
    gridPreview: { aspectRatio: '3:4', cropPosition: 'center' },
    export: { imageFormats: ['jpeg', 'png'], defaultImageFormat: 'jpeg' },
    layout: { kind: 'tiktok', textAlign: 'left', brandScale: 0.72, coverMode: true, typo: TYPO_TIKTOK },
  },
  'facebook-feed-portrait': {
    id: 'facebook-feed-portrait',
    platform: 'facebook',
    placement: 'Feed',
    label: 'Facebook Feed 4:5',
    canvas: { width: 1080, height: 1350, aspectRatio: '4:5' },
    safeArea: feedSafe,
    export: { imageFormats: ['png', 'jpeg', 'webp'], defaultImageFormat: 'png' },
    layout: { kind: 'feed', textAlign: 'center', brandScale: 1, typo: TYPO_FEED },
  },
  'facebook-reel': {
    id: 'facebook-reel',
    platform: 'facebook',
    placement: 'Reel',
    label: 'Facebook Reel 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: metaVerticalSafe,
    export: { imageFormats: ['png', 'jpeg'], videoFormats: ['mp4', 'webm'], defaultVideoFormat: 'mp4' },
    layout: { kind: 'reel', textAlign: 'center', brandScale: 0.85, typo: TYPO_REEL },
  },
  'facebook-story': {
    id: 'facebook-story',
    platform: 'facebook',
    placement: 'Story',
    label: 'Facebook Story 9:16',
    canvas: { width: 1080, height: 1920, aspectRatio: '9:16' },
    safeArea: metaVerticalSafe,
    export: { imageFormats: ['png', 'jpeg'], defaultImageFormat: 'png' },
    layout: { kind: 'reel', textAlign: 'center', brandScale: 0.85, typo: TYPO_STORY },
  },
}

export const PRESET_IDS = Object.keys(PLATFORM_PRESETS)

export const PLATFORMS = {
  instagram: { label: 'Instagram', presets: PRESET_IDS.filter((id) => PLATFORM_PRESETS[id].platform === 'instagram') },
  tiktok:    { label: 'TikTok',    presets: PRESET_IDS.filter((id) => PLATFORM_PRESETS[id].platform === 'tiktok') },
  facebook:  { label: 'Facebook',  presets: PRESET_IDS.filter((id) => PLATFORM_PRESETS[id].platform === 'facebook') },
}

// ═══════════════════════════════════════════════════════════════════════════
// Text-Sanitization — kein Positionieren über Leerzeilen/Spaces mehr
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Normalisiert Nutzereingaben:
 *  - CRLF → LF
 *  - führende Leerzeilen entfernen (trimStart)
 *  - Leerzeichen/Tabs am Zeilenanfang entfernen
 *  - 3+ zusammenhängende Leerzeilen auf maximal 2 reduzieren
 *  - Leerraum am Ende entfernen
 * Absatzstruktur (einzelne/doppelte Leerzeilen) bleibt erhalten.
 */
export function sanitizeSocialText(input) {
  if (input == null) return ''
  return String(input)
    .replace(/\r\n?/g, '\n')
    .replace(/^[ \t]+/gm, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .replace(/\s+$/, '')
}

/** true, wenn der Rohtext mit Leerzeilen/Leerzeichen positioniert wurde */
export function hasLeadingWhitespaceTricks(input) {
  if (input == null) return false
  const s = String(input).replace(/\r\n?/g, '\n')
  return /^\s*\n/.test(s) || /\n{3,}/.test(s)
}

// ═══════════════════════════════════════════════════════════════════════════
// Typografie-System — getrennte Felder, kuratierte Farben, klare Hierarchie
// ═══════════════════════════════════════════════════════════════════════════

export const TYPO_FIELDS = ['hook', 'statement', 'question', 'cta']

export const FIELD_LABELS = { hook: 'Hook', statement: 'Hauptaussage', question: 'Reflexionsfrage', cta: 'CTA' }

// Regler-Bereiche (Prozent der Preset-Basisgröße; Hauptaussage = Referenz)
export const FIELD_SIZE_RANGES = {
  hook:      { min: 0.6, max: 1.1 },
  statement: { min: 0.8, max: 1.2 },
  question:  { min: 0.6, max: 1.05 },
  cta:       { min: 0.4, max: 0.8 },
}

// Kuratierte Trustbridge-Farbtoken — die einzigen Farben im Markenmodus
export const BRAND_COLORS = {
  primary:   { label: 'Weiß',            hex: '#FFFFFF' },
  secondary: { label: 'Gedämpftes Weiß', hex: '#E6E1F0' },
  turquoise: { label: 'Türkis',          hex: '#8EF5D2' },
  gold:      { label: 'Gold',            hex: '#F0CF5A' },
}

export function createTypography() {
  const field = (color) => ({
    size: null,        // null = Plattform-Standard des aktiven Presets
    color,             // Token im Markenmodus
    colorFree: null,   // Hex im freien Modus
    font: null, weight: null,
    gapBefore: null, gapAfter: null, lineHeight: null, maxWidth: null,
  })
  return {
    mode: 'marke', // 'marke' | 'frei'
    preset: 'signature',
    fields: { hook: field('primary'), statement: field('primary'), question: field('primary'), cta: field('turquoise') },
  }
}

/** Effektive Typo eines Feldes: Nutzer-Override → sonst Plattform-Standard */
export function resolveFieldTypo(doc, preset, key) {
  const t = doc.typography?.fields?.[key] || {}
  const defaults = preset.layout.typo || {}
  const size = t.size ?? defaults[key] ?? 1
  const colorToken = t.color || 'primary'
  const colorHex = doc.typography?.mode === 'frei' && t.colorFree
    ? t.colorFree
    : (BRAND_COLORS[colorToken] || BRAND_COLORS.primary).hex
  return {
    size, colorToken, colorHex,
    font: t.font, weight: t.weight,
    gapBefore: t.gapBefore, gapAfter: t.gapAfter,
    lineHeight: t.lineHeight, maxWidth: t.maxWidth,
  }
}

/** Hierarchie-Prüfung: die Hauptaussage muss dominieren */
export function checkHierarchy(doc, preset) {
  const eff = {}
  for (const k of TYPO_FIELDS) eff[k] = resolveFieldTypo(doc, preset, k).size
  const issues = []
  if (eff.hook >= eff.statement) issues.push({ field: 'hook', message: 'Die Hook ist aktuell dominanter als deine Hauptbotschaft.' })
  if (eff.question >= eff.statement) issues.push({ field: 'question', message: 'Die Reflexionsfrage ist aktuell dominanter als deine Hauptbotschaft.' })
  if (eff.cta >= eff.statement * 0.85) issues.push({ field: 'cta', message: 'Der CTA ist im Verhältnis zur Hauptbotschaft zu groß.' })
  return issues
}

/** Setzt verletzende Felder auf Plattform-Standards zurück (nicht blockierend) */
export function optimizeHierarchy(doc, preset) {
  for (const i of checkHierarchy(doc, preset)) doc.typography.fields[i.field].size = null
  if (checkHierarchy(doc, preset).length) doc.typography.fields.statement.size = null
}

/** „Trustbridge-Farben automatisch anwenden" */
export function applyBrandColors(doc) {
  doc.typography.mode = 'marke'
  doc.typography.fields.hook.color = 'primary'
  doc.typography.fields.statement.color = 'primary'
  doc.typography.fields.question.color = 'primary'
  doc.typography.fields.cta.color = 'turquoise'
  for (const k of TYPO_FIELDS) doc.typography.fields[k].colorFree = null
}

// Schnell wählbare Typografie-Presets (Fonts aus builderEngine.FONTS)
export const TYPO_PRESETS = {
  klar:      { label: 'Klar',      fields: { hook: { font: 'sans', weight: '700', color: 'primary' },   statement: { font: 'sans', weight: '800', color: 'primary' },    question: { font: 'sans', weight: '600', color: 'primary' },      cta: { font: 'sans', weight: '600', color: 'secondary' } } },
  emotional: { label: 'Emotional', fields: { hook: { font: 'sans', weight: '700', color: 'primary' },   statement: { font: 'serif', weight: '600', color: 'primary' },   question: { font: 'elegant', weight: '500', color: 'primary' },   cta: { font: 'serif', weight: '600', color: 'turquoise' } } },
  poetisch:  { label: 'Poetisch',  fields: { hook: { font: 'elegant', weight: '500', color: 'secondary' }, statement: { font: 'elegant', weight: '500', color: 'primary' }, question: { font: 'elegant', weight: '500', color: 'primary' }, cta: { font: 'serif', weight: '500', color: 'secondary' } } },
  direkt:    { label: 'Direkt',    fields: { hook: { font: 'sans', weight: '800', color: 'primary' },   statement: { font: 'bold', weight: '700', color: 'primary' },    question: { font: 'sans', weight: '700', color: 'primary' },      cta: { font: 'sans', weight: '700', color: 'turquoise' } } },
  minimal:   { label: 'Minimal',   fields: { hook: { font: 'sans', weight: '400', color: 'secondary' }, statement: { font: 'sans', weight: '600', color: 'primary' },    question: { font: 'sans', weight: '400', color: 'secondary' },    cta: { font: 'sans', weight: '400', color: 'secondary' } } },
  signature: { label: 'Trustbridge Signature', fields: { hook: { font: 'sans', weight: '700', color: 'primary' }, statement: { font: 'sans', weight: '800', color: 'primary' }, question: { font: 'elegant', weight: '600', color: 'primary' }, cta: { font: 'serif', weight: '500', color: 'turquoise' } } },
}

export function applyTypoPreset(doc, key) {
  const p = TYPO_PRESETS[key]
  if (!p) return
  doc.typography.preset = key
  for (const f of TYPO_FIELDS) Object.assign(doc.typography.fields[f], p.fields[f], { colorFree: null })
}

// ═══════════════════════════════════════════════════════════════════════════
// Master-Content-Modell — eine inhaltliche Quelle für alle Plattformen
// ═══════════════════════════════════════════════════════════════════════════

export function createSocialDocument() {
  return {
    id: `doc-${Math.random().toString(36).slice(2, 10)}`,
    version: 1,
    mode: 'strukturiert', // 'strukturiert' | 'frei'
    content: {
      hook: 'Diese Einsicht hat mein Leben verändert.',
      statement: 'Die größte Grenze ist selten der Weg.\n\nSie ist die Geschichte, die dir deine Angst darüber erzählt.',
      vertiefung: '', // Altbestand — wird beim Laden in die Hauptaussage migriert
      question: 'Wer hat dir diese Geschichte erzählt?',
      cta: '↓ Lies die Caption',
      freeText: '',
      caption: '',
      hashtags: [],
      altText: '',
      followCta: '@ben.trustbridge',
    },
    brand: {
      bridgeStatement: 'Jeder Gedanke kann eine neue Brücke sein.',
      identityStatement: 'Trust Yourself & Bridge your Gap.',
      logoShow: true,
      portraitShow: true,
      bridgeShow: true,
      identityShow: true,
    },
    // Plattform-Overrides: nur Layoutwerte, nie eigene Textkopien
    layoutOverrides: {},
    typography: createTypography(),
    exportState: { lastRenderedAt: null, status: 'draft' },
  }
}

/**
 * Baut aus dem strukturierten Master die Textsektionen für die Engine.
 * Reihenfolge und Rollen sind fix — Abstände berechnet die Layout-Engine.
 */
export function contentSections(doc) {
  const c = doc.content
  if (doc.mode === 'frei') {
    const text = sanitizeSocialText(c.freeText)
    return text ? [{ role: 'statement', text }] : []
  }
  const out = []
  if (c.hook) out.push({ role: 'hook', text: sanitizeSocialText(c.hook) })
  // Hauptaussage darf Absätze enthalten; Alt-Feld „vertiefung" wird angehängt
  const statement = [c.statement, c.vertiefung].map(sanitizeSocialText).filter(Boolean).join('\n\n')
  if (statement) out.push({ role: 'statement', text: statement })
  if (c.question) out.push({ role: 'question', text: sanitizeSocialText(c.question) })
  if (c.cta) out.push({ role: 'cta', text: sanitizeSocialText(c.cta) })
  return out.filter((s) => s.text)
}

/** Kompletter Text (für Captions, Archiv, KI) */
export function contentAsPlainText(doc) {
  return contentSections(doc).map((s) => s.text).join('\n\n')
}

// ═══════════════════════════════════════════════════════════════════════════
// Geometrie-Helfer (pur, Node-testbar)
// ═══════════════════════════════════════════════════════════════════════════

export function rectContains(outer, inner) {
  return inner.x >= outer.x && inner.y >= outer.y &&
    inner.x + inner.w <= outer.x + outer.w &&
    inner.y + inner.h <= outer.y + outer.h
}

export function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}

/** Crop-Rechteck für eine Vorschau (z. B. 3:4-Grid aus 4:5-Canvas), zentriert */
export function cropRect(canvasW, canvasH, aspectRatio) {
  const [aw, ah] = aspectRatio.split(':').map(Number)
  const target = aw / ah
  let w = canvasW
  let h = Math.round(w / target)
  if (h > canvasH) { h = canvasH; w = Math.round(h * target) }
  return rect(Math.round((canvasW - w) / 2), Math.round((canvasH - h) / 2), w, h)
}

// ═══════════════════════════════════════════════════════════════════════════
// Validierung — fachlich nachvollziehbarer Score, keine Marketingzahl
// ═══════════════════════════════════════════════════════════════════════════

const SEVERITY_PENALTY = { error: 25, warning: 8, info: 2 }

/**
 * Bewertet ein Rendering-Ergebnis (fit) plus Dokument gegen ein Preset.
 * `fit` kommt aus der Engine: { fits, scale, minFontReached, placedRects }
 * placedRects: benannte Rechtecke der platzierten Elemente.
 */
export function validateForPreset(doc, preset, fit) {
  const issues = []
  const add = (severity, code, message) => issues.push({ severity, code, message })
  const sa = preset.safeArea

  if (doc.mode === 'frei' && hasLeadingWhitespaceTricks(doc.content.freeText)) {
    add('warning', 'whitespace-tricks', 'Führende Leerzeilen werden ignoriert — Position wird vom Layout gesteuert.')
  }
  if (!doc.content.caption || !doc.content.caption.trim()) {
    add('warning', 'caption-missing', 'Caption fehlt — für Veröffentlichung empfohlen.')
  } else {
    // Instagram/TikTok/Facebook: 2200 Zeichen inkl. Hashtags
    const capLen = `${doc.content.caption}\n\n${(doc.content.hashtags || []).join(' ')}`.trim().length
    if (capLen > 2200) add('warning', 'caption-lang', `Caption + Hashtags: ${capLen} Zeichen — Plattform-Limit ist 2200, der Rest wird abgeschnitten.`)
    if ((doc.content.hashtags || []).length > 30) add('warning', 'hashtags-viele', 'Mehr als 30 Hashtags — Instagram ignoriert den Beitrag sonst ggf. in der Suche.')
  }
  if (!doc.content.altText || !doc.content.altText.trim()) {
    add('info', 'alt-missing', 'Alt-Text fehlt (Barrierefreiheit & Reichweite).')
  }
  if (!doc.brand.logoShow) add('info', 'logo-off', 'Logo ist ausgeblendet.')
  if (!doc.brand.portraitShow) add('info', 'portrait-off', 'Portrait ist ausgeblendet.')
  if (!doc.brand.identityShow) add('info', 'identity-off', 'Identity-Statement ist ausgeblendet.')

  // Typografische Hierarchie (warnt, blockiert nicht)
  if (doc.typography) {
    for (const h of checkHierarchy(doc, preset)) add('warning', 'hierarchie', h.message)

    // Farbharmonie
    const eff = {}
    for (const k of TYPO_FIELDS) eff[k] = resolveFieldTypo(doc, preset, k)
    if (doc.typography.mode !== 'frei' && eff.statement.colorToken === 'gold') {
      add('warning', 'farbe-gold', 'Gold ist für kleine Markenakzente reserviert — nicht für die Hauptaussage.')
    }
    const mainColors = new Set([eff.hook.colorHex, eff.statement.colorHex, eff.question.colorHex].map((c) => c.toLowerCase()))
    if (mainColors.size > 2) {
      add('warning', 'farbe-dominanz', 'Zu viele dominante Textfarben im Hauptmotiv — maximal zwei verwenden.')
    }
    const accentHexes = [BRAND_COLORS.turquoise.hex, BRAND_COLORS.gold.hex].map((c) => c.toLowerCase())
    const accentCount = TYPO_FIELDS.filter((k) => accentHexes.includes(eff[k].colorHex.toLowerCase())).length
    if (accentCount > 2) {
      add('warning', 'farbe-akzent', 'Akzentfarben werden zu häufig verwendet — gezielter einsetzen.')
    }
    if (doc.typography.mode === 'frei') {
      const brandHexes = Object.values(BRAND_COLORS).map((c) => c.hex.toLowerCase())
      const off = TYPO_FIELDS.filter((k) => {
        const f = doc.typography.fields[k]
        return f.colorFree && !brandHexes.includes(String(f.colorFree).toLowerCase())
      })
      if (off.length) add('info', 'farbe-off-palette', `Außerhalb der Trustbridge-Palette: ${off.map((k) => FIELD_LABELS[k]).join(', ')}.`)
    }
  }

  if (fit) {
    if (!fit.fits) add('error', 'text-overflow', 'Text passt nicht in die Safe-Area — kürzen oder Layoutvariante wechseln. Es wird nichts unsichtbar abgeschnitten.')
    if (fit.minFontReached) add('warning', 'min-font', 'Mindestschriftgröße erreicht — Text ist evtl. schwer lesbar.')
    for (const name of fit.contrastAssist || []) {
      add('info', 'farbe-kontrast', `Heller/unruhiger Hintergrund hinter „${name}" — Kontrasthilfe wurde automatisch aktiviert.`)
    }
    for (const el of fit.placedRects || []) {
      if (el.critical && !rectContains(sa.recommended, el.rect)) {
        add('error', 'outside-safe', `„${el.name}" kann durch die Plattformoberfläche verdeckt oder beschnitten werden.`)
      }
      for (const ex of sa.platformUiExclusions) {
        if (el.critical && rectsOverlap(el.rect, ex.zone)) {
          add('warning', 'ui-overlap', `„${el.name}" überlappt: ${ex.label}.`)
        }
      }
    }
  }

  let score = 100
  for (const i of issues) score -= SEVERITY_PENALTY[i.severity] || 0
  score = Math.max(0, Math.min(100, score))

  const verdict = score >= 90 ? 'Veröffentlichungsbereit'
    : score >= 75 ? 'Gut, kleine Optimierungen möglich'
    : score >= 50 ? 'Überarbeitung empfohlen'
    : 'Nicht sicher veröffentlichbar'

  return { presetId: preset.id, valid: !issues.some((i) => i.severity === 'error'), score, verdict, issues }
}
