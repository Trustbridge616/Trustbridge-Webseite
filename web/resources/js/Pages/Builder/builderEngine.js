// Trustbridge Content Engine — Canvas-Rendering, Presets und Caption-Heuristik

export const FORMATS = {
  '4:5':  { w: 1080, h: 1350, label: 'Portrait 4:5' },
  '9:16': { w: 1080, h: 1920, label: 'Story 9:16' },
  '1:1':  { w: 1080, h: 1080, label: 'Quadrat 1:1' },
}

// ── Safe-Zone: was Instagram je nach Ansicht sicher anzeigt ──
// 4:5 → der 1:1-Crop (Anzeigen-Manager, alte Grid-Ansicht) nimmt oben/unten
// je 135 px weg, das 3:4-Profilgrid seitlich je ~35 px. 9:16 → die Story-UI
// verdeckt oben (Profilname) und unten (Antworten-Leiste). 1:1 ist überall
// voll sichtbar. Wird nur in der Vorschau gezeichnet, nie im Export.
export const SAFE_ZONES = {
  '4:5':  { top: 135, bottom: 135, side: 35 },
  '9:16': { top: 250, bottom: 310, side: 60 },
  '1:1':  { top: 0, bottom: 0, side: 0 },
}

function safeZoneFor(W, H) {
  const key = Object.keys(FORMATS).find((k) => FORMATS[k].w === W && FORMATS[k].h === H)
  return SAFE_ZONES[key] || { top: 0, bottom: 0, side: 0 }
}

export const TEXT_COLORS = {
  weiss:    { label: 'Weiß',     value: '#FFFFFF' },
  gold:     { label: 'Gold',     value: '#F0CF5A' },
  mint:     { label: 'Mint',     value: '#8EF5D2' },
  hellgrau: { label: 'Hellgrau', value: '#D9D9E0' },
}

export const ACCENTS = {
  mint:    { label: 'Mint',    line: 'rgba(142,245,210,0.85)', glow: 'rgba(142,245,210,0.35)' },
  violett: { label: 'Violett', line: 'rgba(167,139,250,0.85)', glow: 'rgba(124,58,237,0.4)' },
  gold:    { label: 'Gold',    line: 'rgba(240,207,90,0.85)',  glow: 'rgba(240,207,90,0.35)' },
}

export const FONTS = {
  sans:    { label: 'Sans Bold', family: '"Montserrat", "Century Gothic", sans-serif', weight: '800', italic: false },
  serif:   { label: 'Serif',     family: '"Cormorant Garamond", Georgia, serif', weight: '600', italic: false },
  elegant: { label: 'Elegant',   family: '"Cormorant Garamond", Georgia, serif', weight: '500', italic: true },
  bold:    { label: 'Serif Bold', family: '"Playfair Display", Georgia, serif', weight: '700', italic: false },
}

export const FILTERS = {
  keiner:   { label: 'Keiner',   css: 'none' },
  kalt:     { label: 'Kalt',     css: 'saturate(1.1) hue-rotate(12deg) brightness(0.95)' },
  warm:     { label: 'Warm',     css: 'sepia(0.22) saturate(1.15) brightness(1.02)' },
  mystisch: { label: 'Mystisch', css: 'saturate(1.35) hue-rotate(-16deg) contrast(1.06)' },
  sw:       { label: 'S/W',      css: 'grayscale(1) contrast(1.08)' },
}

// Das Original-Logo ist hochkant (2:3) — Stufen entsprechend großzügiger
// (24.07.2026: zweimal auf Wunsch vergrößert — insgesamt ca. +35 %)
// (25.07.2026: erneut vergrößert, ca. +20 % je Stufe)
export const LOGO_SIZES = { klein: 0.145, mittel: 0.195, gross: 0.26 }

// CTA-Farben: je nach Hintergrund umschaltbar; Türkis und Gold leuchten
export const CTA_COLORS = {
  tuerkis: { label: 'Türkis', fill: '#6FF7DA', glow: 'rgba(111,247,218,0.8)' },
  weiss:   { label: 'Weiß',   fill: '#FFFFFF', glow: null },
  gold:    { label: 'Gold',   fill: '#FFD84D', glow: 'rgba(255,216,77,0.8)' },
}

export const KATEGORIEN = [
  'Vertrauen', 'Angst', 'Wachstum', 'Natur', 'Bewusstsein', 'Kinder',
  'Männer', 'Loslassen', 'Liebe', 'Tod', 'Veränderung',
]

// ── Serien-Presets: ein Klick stellt das komplette Design um ──
export const SERIEN = {
  wald: {
    label: 'Serie 01 · Wald',
    design: { variant: 'frei', bgName: 'Wald 1', bgMode: 'image', textColor: 'weiss', font: 'sans', accent: 'mint', filter: 'keiner', layoutH: 'zentriert', layoutV: 'unten', glow: true, upper: false, letterSpread: false, darken: 60, divider: false },
    branding: { logoShow: true, logoSize: 'mittel', logoPos: 'unten-links', logoOpacity: 100 },
  },
  shard: {
    label: 'Serie 02 · Shard',
    design: { variant: 'shard', bgName: 'Wald 2', bgMode: 'image', textColor: 'weiss', font: 'serif', accent: 'mint', filter: 'keiner', layoutH: 'zentriert', layoutV: 'mitte', glow: true, upper: false, letterSpread: false, darken: 55, divider: false },
    branding: { logoShow: true, logoSize: 'mittel', logoPos: 'unten-links', logoOpacity: 100 },
  },
  gold: {
    label: 'Serie 03 · Gold',
    design: { variant: 'shard', bgName: 'Sonnenuntergang', bgMode: 'image', textColor: 'gold', font: 'bold', accent: 'gold', filter: 'warm', layoutH: 'zentriert', layoutV: 'mitte', glow: true, upper: false, letterSpread: false, darken: 60, divider: false },
    branding: { logoShow: true, logoSize: 'gross', logoPos: 'unten-links', logoOpacity: 100 },
  },
  mystisch: {
    label: 'Serie 04 · Mystisch',
    design: { variant: 'frei', bgName: 'Nebel', bgMode: 'image', textColor: 'weiss', font: 'elegant', accent: 'violett', filter: 'mystisch', layoutH: 'zentriert', layoutV: 'mitte', glow: true, upper: false, letterSpread: true, darken: 65, divider: false },
    branding: { logoShow: true, logoSize: 'klein', logoPos: 'unten-links', logoOpacity: 40 },
  },
  minimal: {
    label: 'Serie 05 · Minimal',
    design: { variant: 'frei', bgName: '', bgMode: 'schwarz', textColor: 'hellgrau', font: 'sans', accent: 'mint', filter: 'keiner', layoutH: 'links', layoutV: 'unten', glow: false, upper: true, letterSpread: true, darken: 0, divider: false },
    branding: { logoShow: true, logoSize: 'klein', logoPos: 'unten-rechts', logoOpacity: 20 },
  },
  schlagzeile: {
    label: 'Serie 06 · Schlagzeile',
    design: { variant: 'frei', bgName: 'Wald 1', bgMode: 'image', textColor: 'weiss', font: 'sans', accent: 'gold', filter: 'keiner', layoutH: 'zentriert', layoutV: 'unten', glow: true, upper: true, letterSpread: false, darken: 65, divider: true },
    branding: { logoShow: true, logoSize: 'klein', logoPos: 'oben-mitte', logoOpacity: 100 },
  },
}

export function fontString(fontKey, size, weightOverride) {
  const f = FONTS[fontKey] || FONTS.serif
  const style = f.italic ? 'italic ' : ''
  return `${style}${weightOverride || f.weight} ${size}px ${f.family}`
}

// Zeilen exakt wie eingegeben; Schrift schrumpft zuerst, Notumbruch nur wenn nötig
function layoutText(ctx, rawText, fontKey, maxWidth, maxHeight, baseSize, lineHeight) {
  const srcLines = String(rawText).replace(/\r/g, '').split('\n')

  const measure = (size) => {
    ctx.font = fontString(fontKey, size)
    const lineH = size * lineHeight
    const paraGap = size * 0.85
    const out = []
    let height = 0
    let wrapped = false
    for (const line of srcLines) {
      if (line.trim() === '') {
        out.push({ text: '', h: paraGap })
        height += paraGap
        continue
      }
      if (ctx.measureText(line).width <= maxWidth) {
        out.push({ text: line, h: lineH })
        height += lineH
      } else {
        wrapped = true
        const words = line.split(' ')
        let cur = ''
        for (const w of words) {
          const test = cur ? cur + ' ' + w : w
          if (ctx.measureText(test).width <= maxWidth || !cur) {
            cur = test
          } else {
            out.push({ text: cur, h: lineH })
            height += lineH
            cur = w
          }
        }
        if (cur) { out.push({ text: cur, h: lineH }); height += lineH }
      }
    }
    return { lines: out, height, fits: height <= maxHeight && !wrapped }
  }

  // 1. Versuch: Sinnzeilen ohne Umbruch — aber nur bis ~72 % der Basisgröße
  //    schrumpfen. Boulevard-Prinzip: lieber groß umbrechen als klein bleiben.
  const min = Math.max(34, Math.round(baseSize * 0.72))
  for (let s = baseSize; s >= min; s -= 2) {
    const r = measure(s)
    if (r.fits) return { ...r, fontSize: s }
  }
  // 2. Groß + Umbruch: von 85 % der Basis abwärts, bis die Höhe passt
  for (let s = Math.round(baseSize * 0.85); s >= 34; s -= 2) {
    const r = measure(s)
    if (r.height <= maxHeight) return { ...r, fontSize: s }
  }
  return { ...measure(34), fontSize: 34 }
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// Cover-Einpassung wie CSS `object-fit: cover`: skaliert das Bild auf den
// Zielbereich (scale = max aus Breiten- und Höhenverhältnis), horizontal
// zentriert. focusY (0..1, Default 0.5) richtet den vertikalen Ausschnitt
// aus: 0 = Oberkante bleibt (z. B. Baumkronen), 1 = Unterkante bleibt.
// Nie verzerrt, füllt den Bereich immer vollständig.
export function drawImageCover(ctx, img, dx, dy, dw, dh, focusY = 0.5) {
  const scale = Math.max(dw / img.width, dh / img.height)
  const w = img.width * scale
  const h = img.height * scale
  ctx.drawImage(img, dx + (dw - w) / 2, dy + (dh - h) * focusY, w, h)
}

export function drawBackground(ctx, o) {
  const { W, H } = o
  ctx.clearRect(0, 0, W, H)
  ctx.save()
  // Im Shard-Stil sitzt das Bild IN der Karte (siehe drawCard) — die
  // Fläche dahinter trägt den ruhigen Marken-Verlauf statt des Fotos.
  const imageInShard = o.variant === 'shard' && o.bgMode === 'image' && o.bgImage
  if (o.bgMode === 'image' && o.bgImage && !imageInShard) {
    ctx.filter = (FILTERS[o.filter] || FILTERS.keiner).css
    drawImageCover(ctx, o.bgImage, 0, 0, W, H, o.bgFocus ?? 0.5)
    ctx.filter = 'none'
  } else if (o.bgMode === 'verlauf' || imageInShard) {
    const g = ctx.createLinearGradient(0, 0, W * 0.3, H)
    g.addColorStop(0, '#1a1033')
    g.addColorStop(0.45, '#0e1b2e')
    g.addColorStop(1, '#040308')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  } else {
    ctx.fillStyle = '#060608'
    ctx.fillRect(0, 0, W, H)
  }
  ctx.restore()

  // Abdunklung unten (Regler) + sanfte Vignette
  const darken = Math.max(0, Math.min(1, o.darken / 100))
  if (darken > 0) {
    let g = ctx.createLinearGradient(0, H * 0.4, 0, H)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, `rgba(0,0,0,${(0.95 * darken).toFixed(3)})`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
    g = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.25, W / 2, H * 0.5, H * 0.75)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, `rgba(0,0,0,${(0.35 * darken).toFixed(3)})`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }
}

// LOGO-REGEL: Das Logo wird IMMER original gezeichnet — keine Maske, kein Ring,
// keine Effekte. Nur Skalierung (Seitenverhältnis bleibt) und Position.
function drawLogo(ctx, o) {
  if (!o.logoShow || !o.logoImg) return
  const { W, H } = o
  // Ränder so, dass das Logo komplett in der Safe-Zone sitzt
  const sz = safeZoneFor(W, H)
  const bottomPad = sz.bottom ? sz.bottom + 16 : 54
  const sidePad = sz.side ? sz.side + 24 : 60
  const h = Math.round(H * (LOGO_SIZES[o.logoSize] || 0.09))
  const w = Math.round(h * (o.logoImg.width / o.logoImg.height))
  let x, y
  if (o.logoPos === 'oben-mitte') { x = (W - w) / 2; y = sz.top ? sz.top + 12 : 54 }
  else if (o.logoPos === 'unten-rechts') { x = W - w - sidePad; y = H - h - bottomPad }
  else if (o.logoPos === 'unten-links') { x = sidePad; y = H - h - bottomPad }
  else { x = (W - w) / 2; y = H - h - bottomPad }

  ctx.save()
  ctx.globalAlpha = Math.max(0.05, Math.min(1, o.logoOpacity / 100))
  ctx.drawImage(o.logoImg, x, y, w, h)
  ctx.restore()
}

// Follow-Pill im Stil eines Instagram-Buttons (optional)
function drawFollowPill(ctx, o, centerY) {
  const { W, H } = o
  const size = Math.round(H * 0.024)
  ctx.save()
  ctx.font = `600 ${size}px "Montserrat", "Century Gothic", sans-serif`
  const text = o.followText || '@ben.trustbridge'
  const textW = ctx.measureText(text).width
  const padX = size * 1.2
  const pillW = textW + padX * 2
  const pillH = size * 2.3
  const x = (W - pillW) / 2
  const y = centerY - pillH / 2

  ctx.shadowColor = 'rgba(0,0,0,0.45)'
  ctx.shadowBlur = 16
  roundRect(ctx, x, y, pillW, pillH, pillH / 2)
  ctx.fillStyle = 'rgba(255,255,255,0.94)'
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#1a0a36'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, W / 2, y + pillH / 2 + size * 0.06)
  ctx.restore()
  return pillH
}

// MARKEN-SPRUCH-REGEL (siehe .agents/rules/style_and_notes.md):
// Der Claim steht IMMER zweizeilig untereinander, mit exakt dieser Farbverteilung:
//   Zeile 1: TRUST = Türkis · YOURSELF & = Gold
//   Zeile 2: BRIDGE = Gold · YOUR GAP = Türkis
function drawIdentityLine(ctx, o, baselineY, unit) {
  const size = Math.round(24 * unit)
  const lineGap = size * 1.45
  const mint = { fill: '#8EF5D2', glow: 'rgba(142,245,210,0.75)' }
  const gold = { fill: '#F0CF5A', glow: 'rgba(240,207,90,0.75)' }
  const rows = [
    [{ t: 'TRUST ', c: mint }, { t: 'YOURSELF &', c: gold }],
    [{ t: 'BRIDGE ', c: gold }, { t: 'YOUR GAP', c: mint }],
  ]
  ctx.save()
  ctx.font = `600 ${size}px "Cormorant Garamond", Georgia, serif`
  ctx.letterSpacing = '5px'
  ctx.textAlign = 'left'
  rows.forEach((row, i) => {
    const y = baselineY - (rows.length - 1 - i) * lineGap
    const total = row.reduce((w, s) => w + ctx.measureText(s.t).width, 0)
    let x = o.W / 2 - total / 2
    for (const s of row) {
      // dunkler Schatten für Lesbarkeit, dann farbiges Leuchten
      ctx.fillStyle = s.c.fill
      ctx.shadowColor = 'rgba(0,0,0,0.8)'
      ctx.shadowBlur = 10
      ctx.shadowOffsetY = 2
      ctx.fillText(s.t, x, y)
      ctx.shadowColor = s.c.glow
      ctx.shadowBlur = 18
      ctx.shadowOffsetY = 0
      ctx.fillText(s.t, x, y)
      x += ctx.measureText(s.t).width
    }
  })
  ctx.restore()
  return lineGap + size * 1.5
}

// Autoren-Foto (Ben) — runder Ausschnitt unten rechts: Ben schaut auf dem
// Foto nach links, so zeigt der Blick ins Bild hinein. Quelle liegt in der
// Vue-Seite (FOTO_SRC). Hochkant-Selfies: Gesicht sitzt im oberen Bereich,
// deshalb der nach oben verschobene quadratische Ausschnitt.
function drawAuthorPhoto(ctx, o) {
  if (!o.fotoShow || !o.fotoImg) return
  const { W, H } = o
  const logoH = H * (LOGO_SIZES[o.logoSize] || 0.09)
  // (25.07.2026: von 0.9 auf 0.8 — 10 % kleiner, sitzt komplett in der Safe-Zone)
  const d = Math.round(logoH * 0.8)
  const sz = safeZoneFor(W, H)
  const bottomPad = sz.bottom ? sz.bottom + 16 : 54
  const sidePad = sz.side ? sz.side + 24 : 54
  const x = W - d - sidePad
  // vertikal am Logo-Band zentriert (Reihe: Logo links · Claim Mitte · Foto rechts)
  let y = H - bottomPad - Math.round((logoH + d) / 2)
  // Unten rechts kann schon etwas sitzen — dann rückt das Foto darüber
  if (o.qrShow && o.qrImg && o.logoPos !== 'unten-rechts') {
    const qrTotal = Math.round(H * 0.13 * 1.14)
    y = H - bottomPad - qrTotal - d - 24
  } else if (o.logoShow && o.logoImg && o.logoPos === 'unten-rechts') {
    y = H - bottomPad - Math.round(logoH) - d - 24
  }
  const r = d / 2

  // weicher Schatten, damit die Scheibe auf jedem Hintergrund steht
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.55)'
  ctx.shadowBlur = 24
  ctx.shadowOffsetY = 4
  ctx.beginPath()
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
  ctx.fillStyle = '#0b0618'
  ctx.fill()
  ctx.restore()

  // Foto rund beschnitten, quadratischer Ausschnitt mit Fokus oben (Gesicht)
  ctx.save()
  ctx.beginPath()
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2)
  ctx.clip()
  const s = Math.min(o.fotoImg.width, o.fotoImg.height)
  const sx = (o.fotoImg.width - s) / 2
  const sy = (o.fotoImg.height - s) * 0.25
  ctx.drawImage(o.fotoImg, sx, sy, s, s, x, y, d, d)
  ctx.restore()

  // feiner Goldring im Ton des Logos
  ctx.save()
  ctx.beginPath()
  ctx.arc(x + r, y + r, r - 1.5, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(240,207,90,0.85)'
  ctx.lineWidth = 3
  ctx.shadowColor = 'rgba(240,207,90,0.35)'
  ctx.shadowBlur = 12
  ctx.stroke()
  ctx.restore()
}

// QR-Code (optional) — auf weißer Kachel, unten in der freien Ecke
function drawQr(ctx, o) {
  if (!o.qrShow || !o.qrImg) return
  const { W, H } = o
  const sz = safeZoneFor(W, H)
  const bottomPad = sz.bottom ? sz.bottom + 16 : 48
  const sidePad = sz.side ? sz.side + 24 : 48
  const size = Math.round(H * 0.13)
  const pad = Math.round(size * 0.07)
  const total = size + pad * 2
  const x = o.logoPos === 'unten-rechts' ? sidePad : W - total - sidePad
  const y = H - total - bottomPad
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.5)'
  ctx.shadowBlur = 20
  roundRect(ctx, x, y, total, total, Math.round(size * 0.12))
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.drawImage(o.qrImg, x + pad, y + pad, size, size)
  ctx.restore()
}

// Zentrale Zeichenfunktion — rendert eine komplette Karte in den Kontext
export function drawCard(ctx, o) {
  const { W, H } = o
  drawBackground(ctx, o)

  const color = (TEXT_COLORS[o.textColor] || TEXT_COLORS.weiss).value
  const accent = ACCENTS[o.accent] || ACCENTS.mint
  const margin = 100
  const isLeft = o.layoutH === 'links'
  const anchorX = isLeft ? margin + 10 : W / 2
  const maxW = o.variant === 'shard' ? W - 2 * margin - 140 : W - 2 * margin
  const spruch = o.upper ? (o.content.spruch || '').toUpperCase() : (o.content.spruch || '')

  // Boulevard-Typografie: große, fette Headline. `unit` skaliert alle festen
  // Größen mit Format und Textgröße-Regler (100 % = Basiswerte bei 1080×1350).
  const unit = (o.sizeAdjust || 1) * (H / 1350)
  const baseSize = Math.round(80 * unit) // Headline-Basis ≈ 72–88 px

  // Feste Element-Größen (unabhängig davon, ob die Headline schrumpfen musste)
  // ctaScale: 1 = normal, 0.85 = „CTA klein" (Hauptbotschaft dominiert stärker)
  const SZ = {
    ueberschrift: Math.round(34 * unit),
    untertitel: Math.round(44 * unit),
    autor: Math.round(36 * unit),
    cta: Math.round(30 * unit * (o.ctaScale || 1)),
  }

  // ── Safe-Zone-Reserven VOR dem Textlayout: der Spruch bekommt exakt den
  // Raum dazwischen und kann nie mehr oben oder unten hinauslaufen ──
  const sz = safeZoneFor(W, H)
  const logoTop = o.logoShow && o.logoPos === 'oben-mitte'
  const logoHpx = H * (LOGO_SIZES[o.logoSize] || 0.09)
  const bottomPad = sz.bottom ? sz.bottom + 16 : 54
  // Reihen-Modus: Logo unten links · Claim mittig · Foto unten rechts
  const rowMode = o.logoShow && !logoTop && o.logoPos === 'unten-links' && o.identShow
  const bottomReserve = (o.logoShow && !logoTop ? logoHpx + bottomPad + 46 : bottomPad + 36)
    + (o.content.cta ? baseSize * 0.9 : 0)
    + (o.followShow ? H * 0.06 : 0)
    + (o.identShow && !rowMode ? 84 * unit : 0)
  const topReserve = logoTop
    ? (sz.top ? sz.top + 12 : 54) + logoHpx + 56
    : Math.max(H * 0.1, sz.top + 30)

  // Höhe der Nicht-Spruch-Teile grob vorab, damit der Spruch passend schrumpft
  let extraH = 0
  if (o.content.ueberschrift) extraH += 34 * unit + SZ.ueberschrift * 1.3
  if (o.divider) extraH += 40 * unit
  if (o.content.untertitel) extraH += 26 * unit + SZ.untertitel * 1.3
  if (o.content.autor) extraH += 22 * unit + SZ.autor * 1.3
  const slack = o.variant === 'shard' ? 200 : 80
  const maxTextH = Math.max(H * 0.22, H - topReserve - bottomReserve - extraH - slack)
  const layout = layoutText(ctx, spruch || ' ', o.font, maxW, maxTextH, baseSize, o.lineHeight || 1.1)
  const fs = layout.fontSize

  const parts = []
  if (o.content.ueberschrift) parts.push({ key: 'ueberschrift', size: SZ.ueberschrift, gapAfter: 34 * unit })
  parts.push({ key: 'spruch' })
  if (o.divider) parts.push({ key: 'divider', fixedH: 40 * unit })
  if (o.content.untertitel) parts.push({ key: 'untertitel', size: SZ.untertitel, gapBefore: 26 * unit })
  if (o.content.autor) parts.push({ key: 'autor', size: SZ.autor, gapBefore: 22 * unit })

  let blockH = 0
  for (const p of parts) {
    if (p.key === 'spruch') blockH += layout.height
    else if (p.key === 'divider') blockH += p.fixedH
    else blockH += (p.gapBefore || 0) + (p.gapAfter || 0) + p.size * 1.3
  }

  // Vertikale Position des Blocks — nie oberhalb der Safe-Zone
  let blockTop
  if (o.layoutV === 'oben') blockTop = topReserve + 30
  else if (o.layoutV === 'unten') blockTop = H - bottomReserve - blockH - 40
  else blockTop = topReserve + (H - topReserve - bottomReserve - blockH) / 2
  blockTop = Math.max(blockTop, topReserve + (o.variant === 'shard' ? 86 : 10))

  // Shard-Karte hinter dem Block
  if (o.variant === 'shard') {
    ctx.font = fontString(o.font, fs)
    let widest = 0
    for (const l of layout.lines) if (l.text) widest = Math.max(widest, ctx.measureText(l.text).width)
    if (o.content.ueberschrift) { ctx.font = fontString(o.font, Math.round(fs * 0.34)); widest = Math.max(widest, ctx.measureText(o.content.ueberschrift.toUpperCase()).width + 40) }
    const padX = 70, padY = 78
    const cardW = Math.min(W - 140, Math.max(520, widest + padX * 2))
    const cardH = blockH + padY * 2
    const cx = isLeft ? margin - 20 : (W - cardW) / 2
    const cy = blockTop - padY

    ctx.save()
    ctx.shadowColor = accent.glow
    ctx.shadowBlur = 44
    roundRect(ctx, cx, cy, cardW, cardH, 36)
    ctx.fillStyle = 'rgba(12,10,26,0.58)'
    ctx.fill()
    ctx.restore()

    // Hintergrundbild randlos IN der Karte: an die abgerundete Form
    // geklippt, Cover-Einpassung dynamisch aus der aktuellen Kartengröße
    // (jede Shard-Variante, jedes Format), Fokuspunkt wie im Vollbild.
    if (o.bgMode === 'image' && o.bgImage) {
      ctx.save()
      roundRect(ctx, cx, cy, cardW, cardH, 36)
      ctx.clip()
      ctx.filter = (FILTERS[o.filter] || FILTERS.keiner).css
      drawImageCover(ctx, o.bgImage, cx, cy, cardW, cardH, o.bgFocus ?? 0.5)
      ctx.filter = 'none'
      ctx.restore()
    }

    ctx.save()
    roundRect(ctx, cx, cy, cardW, cardH, 36)
    ctx.clip()
    const g = ctx.createLinearGradient(0, cy, 0, cy + cardH)
    g.addColorStop(0, 'rgba(46,38,80,0.42)')
    g.addColorStop(0.5, 'rgba(18,14,38,0.30)')
    g.addColorStop(1, 'rgba(6,5,16,0.55)')
    ctx.fillStyle = g
    ctx.fillRect(cx, cy, cardW, cardH)
    const hl = ctx.createLinearGradient(0, cy, 0, cy + 90)
    hl.addColorStop(0, 'rgba(255,255,255,0.10)')
    hl.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = hl
    ctx.fillRect(cx, cy, cardW, 90)
    ctx.restore()

    ctx.save()
    roundRect(ctx, cx + 1, cy + 1, cardW - 2, cardH - 2, 35)
    ctx.strokeStyle = accent.line
    ctx.lineWidth = 2
    ctx.shadowColor = accent.glow
    ctx.shadowBlur = 14
    ctx.stroke()
    ctx.restore()
  }

  // Text zeichnen — Schatten + dunkle Outline für maximale Lesbarkeit
  ctx.save()
  ctx.textAlign = isLeft ? 'left' : 'center'
  ctx.textBaseline = 'alphabetic'

  const shadowOn = () => {
    if (!o.glow) return
    ctx.shadowColor = 'rgba(0,0,0,0.85)'
    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 2
  }
  const shadowOff = () => {
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
    ctx.shadowOffsetY = 0
  }
  // Headline-Zeile: erst dunkle Kontur, dann Füllung (Outline-Effekt)
  const drawHeadlineLine = (text, x, y) => {
    if (o.glow) {
      shadowOff()
      ctx.lineJoin = 'round'
      ctx.lineWidth = Math.max(3, fs * 0.055)
      ctx.strokeStyle = 'rgba(0,0,0,0.6)'
      ctx.strokeText(text, x, y)
      shadowOn()
    }
    ctx.fillText(text, x, y)
  }

  shadowOn()
  let y = blockTop
  for (const p of parts) {
    if (p.key === 'ueberschrift') {
      ctx.font = fontString('sans', p.size, '700')
      ctx.fillStyle = accent.line
      ctx.letterSpacing = '6px'
      y += p.size * 1.3
      ctx.fillText(o.content.ueberschrift.toUpperCase(), anchorX, y)
      ctx.letterSpacing = '0px'
      y += p.gapAfter
    } else if (p.key === 'spruch') {
      ctx.font = fontString(o.font, fs)
      ctx.fillStyle = color
      if (o.letterSpread) ctx.letterSpacing = '3px'
      for (const line of layout.lines) {
        y += line.h
        if (line.text) drawHeadlineLine(line.text, anchorX, y - line.h * 0.32)
      }
      ctx.letterSpacing = '0px'
    } else if (p.key === 'divider') {
      // Rote Akzent-Trennlinie unter der Headline (Boulevard-Stil)
      const dw = 150 * unit
      const dh = 7 * unit
      const dx = isLeft ? anchorX : W / 2 - dw / 2
      y += 22 * unit
      shadowOff()
      ctx.fillStyle = '#E53935'
      ctx.fillRect(dx, y, dw, dh)
      shadowOn()
      y += p.fixedH - 22 * unit
    } else if (p.key === 'untertitel') {
      y += (p.gapBefore || 0)
      ctx.font = fontString(o.font, p.size, '600')
      ctx.fillStyle = 'rgba(255,255,255,0.88)'
      y += p.size * 1.3
      ctx.fillText(o.content.untertitel, anchorX, y)
    } else if (p.key === 'autor') {
      y += (p.gapBefore || 0)
      ctx.font = `italic 500 ${p.size}px "Cormorant Garamond", Georgia, serif`
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      y += p.size * 1.3
      ctx.fillText(`— ${o.content.autor}`, anchorX, y)
    }
  }
  ctx.restore()

  // Unterer Bereich (von unten nach oben): Identitäts-Zeile, Follow-Pill, CTA — dann Logo
  let bottomY = (o.logoShow && !logoTop)
    ? H - logoHpx - bottomPad - 30
    : H - Math.max(64, bottomPad + 10)

  if (o.identShow && rowMode) {
    // Reihe: Logo links · Claim mittig · Foto rechts — Claim vertikal am Logo zentriert
    drawIdentityLine(ctx, o, H - bottomPad - logoHpx / 2 + 17 * unit, unit)
  } else if (o.identShow) {
    const lineH = drawIdentityLine(ctx, o, bottomY, unit)
    bottomY -= lineH + 14 * unit
  }

  if (o.followShow) {
    const pillH = drawFollowPill(ctx, o, bottomY - H * 0.014)
    bottomY -= pillH + 26
  }

  if (o.content.cta) {
    const cc = CTA_COLORS[o.ctaColor] || CTA_COLORS.tuerkis
    const ctaText = o.content.cta.toUpperCase()
    ctx.save()
    ctx.textAlign = 'center'
    ctx.font = fontString('sans', SZ.cta, '700')
    ctx.letterSpacing = '4px'
    ctx.fillStyle = cc.fill
    // 1. Durchgang: dunkler Schatten für Lesbarkeit
    ctx.shadowColor = 'rgba(0,0,0,0.8)'
    ctx.shadowBlur = 12
    ctx.shadowOffsetY = 2
    ctx.fillText(ctaText, W / 2, bottomY)
    // 2. Durchgang: farbiges Leuchten (Türkis/Gold)
    if (cc.glow) {
      ctx.shadowColor = cc.glow
      ctx.shadowBlur = 24
      ctx.shadowOffsetY = 0
      ctx.fillText(ctaText, W / 2, bottomY)
    }
    ctx.restore()
  }

  drawLogo(ctx, o)
  drawQr(ctx, o)
  drawAuthorPhoto(ctx, o)
  if (o.safeZone) drawSafeZone(ctx, o)
}

// Safe-Zone-Overlay (nur Vorschau): rote Ränder = kann abgeschnitten werden,
// gestrichelter Rahmen = überall sicher sichtbar.
function drawSafeZone(ctx, o) {
  const { W, H } = o
  const key = Object.keys(FORMATS).find((k) => FORMATS[k].w === W && FORMATS[k].h === H)
  const z = SAFE_ZONES[key]
  if (!z || (!z.top && !z.bottom && !z.side)) return
  ctx.save()
  ctx.fillStyle = 'rgba(229,57,53,0.16)'
  if (z.top) ctx.fillRect(0, 0, W, z.top)
  if (z.bottom) ctx.fillRect(0, H - z.bottom, W, z.bottom)
  if (z.side) {
    ctx.fillRect(0, z.top, z.side, H - z.top - z.bottom)
    ctx.fillRect(W - z.side, z.top, z.side, H - z.top - z.bottom)
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'
  ctx.lineWidth = 3
  ctx.setLineDash([16, 12])
  ctx.strokeRect(z.side + 1.5, z.top + 1.5, W - z.side * 2 - 3, H - z.top - z.bottom - 3)
  ctx.setLineDash([])
  ctx.font = '700 26px "Montserrat", "Century Gothic", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.shadowColor = 'rgba(0,0,0,0.85)'
  ctx.shadowBlur = 8
  if (z.top) ctx.fillText('▲ kann abgeschnitten werden (Crop / Story-UI)', W / 2, z.top - 16)
  ctx.restore()
}

// ── Caption-Heuristik (ohne KI, sofort) ──
const BASE_TAGS = ['#trustbridge', '#vertrauen', '#mindset', '#wachstum']
const KEYWORD_TAGS = [
  { re: /angst|furcht/i, tags: ['#ängsteüberwinden', '#mutstattangst'] },
  { re: /vertrau/i, tags: ['#selbstvertrauen', '#urvertrauen'] },
  { re: /weg|gehst|gehen|schritt/i, tags: ['#deinweg', '#lebensweg'] },
  { re: /wachs/i, tags: ['#persönlicheswachstum'] },
  { re: /grenze/i, tags: ['#grenzenüberwinden'] },
  { re: /hindernis/i, tags: ['#hindernisseüberwinden'] },
  { re: /leben/i, tags: ['#lebensweisheit'] },
  { re: /still|ruhe|frieden/i, tags: ['#innererfrieden'] },
  { re: /loslass|lass los/i, tags: ['#loslassen'] },
  { re: /liebe/i, tags: ['#selbstliebe'] },
  { re: /mut/i, tags: ['#mut'] },
]
const FILL_TAGS = ['#persönlichkeitsentwicklung', '#innerestärke', '#achtsamkeit', '#inspiration', '#motivationdeutsch']

export function suggestHashtags(text) {
  const tags = [...BASE_TAGS]
  for (const k of KEYWORD_TAGS) {
    if (k.re.test(text)) for (const tag of k.tags) if (!tags.includes(tag)) tags.push(tag)
  }
  for (const tag of FILL_TAGS) {
    if (tags.length >= 8) break
    if (!tags.includes(tag)) tags.push(tag)
  }
  return tags.slice(0, 8)
}

export function heuristicCaption(text) {
  const t = String(text).trim()
  if (!t) return { caption: '', hashtags: [] }
  const firstLine = t.split('\n').find((l) => l.trim()) || ''
  const hook = firstLine.replace(/[.!?]\s*$/, '')
  const hashtags = suggestHashtags(t)
  const caption = `${hook} 🌙\n\nNimm diesen Gedanken mit in deinen Tag.\nSpeichere den Beitrag, wenn er dich erinnert hat.\n\n➤ Folge @ben.trustbridge für tägliche Impulse zu Vertrauen und Wachstum.`
  return { caption, hashtags }
}

export function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

export function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}
