// ═══════════════════════════════════════════════════════════════════════════
// Trustbridge Social — Auto-Layout- und Render-Engine
//
// Rendert ein SocialContentDocument in jedes Plattform-Preset.
// Grundprinzip: Zonen statt Whitespace. Die Position jedes Elements kommt
// ausschließlich aus Preset-Safe-Areas und berechneten Abständen — nie aus
// Leerzeilen im Text.
//
// Drei Kompositionen (preset.layout.kind):
//   'feed'   — 4:5: Textblock zentriert, Footer-Reihe Logo · Claim · Portrait
//   'reel'   — 9:16 (IG/FB): zentriert in der Kernzone, Markenreihe darüber
//   'tiktok' — 9:16 eigenständig: linksbündig, rechte UI-Spalte frei,
//              Marken kompakt und ~20 % kleiner
// ═══════════════════════════════════════════════════════════════════════════

import { FILTERS, fontString, roundRect, drawImageCover, drawBackground } from './builderEngine'
import { contentSections, validateForPreset, cropRect, resolveFieldTypo, TYPO_FIELDS, FIELD_LABELS, BRAND_COLORS } from './socialPresets'

// ── Typografie-Rollen: Schriftschnitt-Defaults; Größen kommen aus dem
// Typo-System (Preset-Basisgröße × Feld-Prozent, siehe socialPresets) ──
const BASE_SIZE = 76 // Hauptaussage bei 100 % (Basisbreite 1080)
// Hauptaussage im Boulevard-Stil wie /builder/instagram: fette Sans, maximal
// lesbar. Serif/Elegant bleiben über die Typo-Presets (Emotional/Poetisch) wählbar.
const ROLE_STYLE = {
  hook:      { font: 'sans', weight: '700', spacing: 3, upper: true,  gapAfter: 44 },
  statement: { font: 'sans', weight: '800', spacing: 0, upper: false, gapAfter: 40 },
  question:  { font: 'elegant', weight: '600', spacing: 0, upper: false, gapAfter: 44 },
  cta:       { font: 'serif', weight: '600', spacing: 1, upper: false, gapAfter: 0 },
}

const MIN_SCALE = 0.55 // Mindestschriftgröße = 55 % der Idealgröße — nie darunter
const ACCENT_HEXES = [BRAND_COLORS.turquoise.hex, BRAND_COLORS.gold.hex].map((c) => c.toLowerCase())

// ── Text-Fitting: messen → wrappen → skalieren, nie unsichtbar abschneiden ──

function wrapLine(ctx, text, maxW) {
  if (ctx.measureText(text).width <= maxW) return [text]
  const words = text.split(' ')
  const out = []
  let cur = ''
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w
    if (ctx.measureText(test).width <= maxW || !cur) cur = test
    else { out.push(cur); cur = w }
  }
  if (cur) out.push(cur)
  return out
}

function measureSections(ctx, sections, typo, maxW, globalLineHeight, scale) {
  const blocks = []
  let total = 0
  for (const s of sections) {
    const st = ROLE_STYLE[s.role] || ROLE_STYLE.statement
    const t = typo[s.role] || {}
    const size = Math.max(20, Math.round(BASE_SIZE * (t.size ?? 1) * scale))
    const font = t.font || st.font
    const weight = t.weight || st.weight
    ctx.font = fontString(font, size, weight)
    ctx.letterSpacing = `${st.spacing}px`
    const fieldMaxW = maxW * (t.maxWidth ?? 1)
    const lines = []
    for (const raw of s.text.split('\n')) {
      const line = st.upper ? raw.toUpperCase() : raw
      if (!line.trim()) { if (lines.length) lines.push('') ; continue }
      for (const l of wrapLine(ctx, line, fieldMaxW)) lines.push(l)
    }
    while (lines.length && lines[lines.length - 1] === '') lines.pop()
    ctx.letterSpacing = '0px'
    const lineH = Math.round(size * (t.lineHeight ?? globalLineHeight))
    const paraH = Math.round(size * 0.5) // Leerzeile innerhalb des Feldes = halber Absatz
    let h = 0
    for (const l of lines) h += l === '' ? paraH : lineH
    const gapBefore = Math.round((t.gapBefore ?? 0) * scale)
    const gapAfter = Math.round((t.gapAfter ?? st.gapAfter) * scale)
    blocks.push({ role: s.role, style: st, typo: t, font, weight, size, lines, lineH, paraH, h, gapBefore, gapAfter })
    total += gapBefore + h + gapAfter
  }
  if (blocks.length) total -= blocks[blocks.length - 1].gapAfter
  return { blocks, total }
}

/**
 * Passt die Sektionen in einen Bereich ein.
 * typo = { role: resolveFieldTypo(...) } — Feldgrößen/-farben/-abstände.
 * Rückgabe: { blocks, total, scale, fits, minFontReached }
 */
export function fitSections(ctx, sections, typo, maxW, maxH, globalLineHeight = 1.28, sizeAdjust = 1) {
  let last = null
  for (let scale = sizeAdjust; scale >= MIN_SCALE * sizeAdjust - 1e-9; scale -= 0.05) {
    last = { ...measureSections(ctx, sections, typo, maxW, globalLineHeight, scale), scale }
    if (last.total <= maxH) return { ...last, fits: true, minFontReached: scale < sizeAdjust - 1e-9 && scale <= MIN_SCALE * sizeAdjust + 0.051 }
  }
  return { ...last, fits: false, minFontReached: true }
}

// Durchschnittliche Helligkeit + Unruhe eines Bereichs (für Kontrastautomatik)
function sampleRegion(ctx, r, W, H) {
  const x = Math.max(0, Math.floor(r.x))
  const y = Math.max(0, Math.floor(r.y))
  const w = Math.min(W - x, Math.ceil(r.w))
  const h = Math.min(H - y, Math.ceil(r.h))
  if (w < 4 || h < 4) return { avg: 0, sd: 0 }
  try {
    const data = ctx.getImageData(x, y, w, h).data
    let sum = 0, sum2 = 0, n = 0
    for (let i = 0; i < data.length; i += 64) { // grob abtasten reicht
      const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
      sum += l; sum2 += l * l; n++
    }
    const avg = sum / n
    return { avg, sd: Math.sqrt(Math.max(0, sum2 / n - avg * avg)) }
  } catch { return { avg: 0, sd: 0 } } // z. B. getaintete Canvas
}

function drawBlocks(ctx, fitted, x, startY, align, W, H, rolesFilter) {
  let y = startY
  const placed = []
  const contrastAssist = []
  for (const b of fitted.blocks) {
    y += b.gapBefore
    // Ebenen-Filter: Layout normal durchlaufen, aber nur gewählte Rollen zeichnen
    if (rolesFilter && !rolesFilter.includes(b.role)) { y += b.h + b.gapAfter; continue }
    ctx.save()
    ctx.font = fontString(b.font, b.size, b.weight)
    ctx.letterSpacing = `${b.style.spacing}px`
    ctx.textAlign = align
    ctx.textBaseline = 'alphabetic'
    let widest = 0
    for (const line of b.lines) if (line) widest = Math.max(widest, ctx.measureText(line).width)
    const bx = align === 'center' ? x - widest / 2 : x
    const rect = { x: Math.round(bx), y: Math.round(y), w: Math.round(widest), h: b.h }

    // ── Kontrastautomatik: heller/unruhiger Hintergrund → dezente lokale
    // Verdunklung (weich ausgeblendet) + stärkerer Schatten. Kein Kasten. ──
    const { avg, sd } = sampleRegion(ctx, { x: rect.x - 20, y: rect.y - 10, w: rect.w + 40, h: rect.h + 30 }, W, H)
    const needsAssist = avg > 0.52 || (avg > 0.34 && sd > 0.24)
    if (needsAssist && rect.w > 10) {
      ctx.save()
      ctx.filter = 'blur(30px)'
      const alpha = Math.min(0.5, 0.24 + Math.max(0, avg - 0.4) * 0.7)
      ctx.fillStyle = `rgba(6,4,16,${alpha.toFixed(2)})`
      roundRect(ctx, rect.x - 44, rect.y - 34, rect.w + 88, rect.h + 68, 48)
      ctx.fill()
      ctx.restore()
      contrastAssist.push(FIELD_LABELS[b.role] || b.role)
    }

    const color = (b.typo && b.typo.colorHex) || '#FFFFFF'
    const isAccent = ACCENT_HEXES.includes(color.toLowerCase())
    ctx.fillStyle = color
    for (const line of b.lines) {
      if (line === '') { y += b.paraH; continue }
      y += b.lineH
      ctx.shadowColor = needsAssist ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.75)'
      ctx.shadowBlur = needsAssist ? 18 : 14
      ctx.shadowOffsetY = 2
      ctx.fillText(line, x, y)
      if (isAccent) {
        ctx.shadowColor = color.toLowerCase() === ACCENT_HEXES[0] ? 'rgba(142,245,210,0.5)' : 'rgba(240,207,90,0.45)'
        ctx.shadowBlur = 20
        ctx.shadowOffsetY = 0
        ctx.fillText(line, x, y)
      }
    }
    ctx.restore()
    placed.push({ name: FIELD_LABELS[b.role] || b.role, critical: true, rect })
    y += b.gapAfter
  }
  return { placed, contrastAssist }
}

// ── Markenreihe: Logo · Claim (2-zeilig) · Portrait ──

function drawBrandRow(ctx, o, band) {
  // band: {x, y, w, h} — die Reihe wird darin vertikal zentriert
  const placed = []
  const scale = o.preset.layout.brandScale
  const logoH = Math.round(band.h * 0.94)
  const midY = band.y + band.h / 2

  if (o.brand.logoShow && o.logoImg) {
    const w = Math.round(logoH * (o.logoImg.width / o.logoImg.height))
    const x = band.x
    const y = Math.round(midY - logoH / 2)
    ctx.drawImage(o.logoImg, x, y, w, logoH)
    placed.push({ name: 'Logo', critical: true, rect: { x, y, w, h: logoH } })
  }

  if (o.brand.portraitShow && o.fotoImg) {
    const d = Math.round(logoH * 0.8) // 10 % kleiner als früher, s. Feed-Vorgabe
    const x = band.x + band.w - d
    const y = Math.round(midY - d / 2)
    const r = d / 2
    ctx.save()
    ctx.shadowColor = 'rgba(0,0,0,0.55)'
    ctx.shadowBlur = 24
    ctx.beginPath(); ctx.arc(x + r, y + r, r, 0, Math.PI * 2); ctx.fillStyle = '#0b0618'; ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.beginPath(); ctx.arc(x + r, y + r, r, 0, Math.PI * 2); ctx.clip()
    const s = Math.min(o.fotoImg.width, o.fotoImg.height)
    ctx.drawImage(o.fotoImg, (o.fotoImg.width - s) / 2, (o.fotoImg.height - s) * 0.25, s, s, x, y, d, d)
    ctx.restore()
    ctx.save()
    ctx.beginPath(); ctx.arc(x + r, y + r, r - 1.5, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(240,207,90,0.85)'; ctx.lineWidth = Math.max(2, 3 * scale)
    ctx.shadowColor = 'rgba(240,207,90,0.35)'; ctx.shadowBlur = 12; ctx.stroke()
    ctx.restore()
    placed.push({ name: 'Portrait', critical: true, rect: { x, y, w: d, h: d } })
  }

  if (o.brand.identityShow) {
    // MARKEN-SPRUCH-REGEL: zweizeilig, TRUST=Türkis YOURSELF&=Gold / BRIDGE=Gold YOUR GAP=Türkis
    const size = Math.round(26 * scale * (band.h / 240 + 0.55))
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
    const lineGap = size * 1.4
    const cx = band.x + band.w / 2
    let widest = 0
    rows.forEach((row, i) => {
      const total = row.reduce((w, s) => w + ctx.measureText(s.t).width, 0)
      widest = Math.max(widest, total)
      const y = midY + lineGap / 2 - (rows.length - 1 - i) * lineGap + size * 0.1
      let x = cx - total / 2
      for (const s of row) {
        ctx.fillStyle = s.c.fill
        ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 2
        ctx.fillText(s.t, x, y)
        ctx.shadowColor = s.c.glow; ctx.shadowBlur = 18; ctx.shadowOffsetY = 0
        ctx.fillText(s.t, x, y)
        x += ctx.measureText(s.t).width
      }
    })
    ctx.restore()
    placed.push({ name: 'Identity-Statement', critical: true, rect: { x: Math.round(cx - widest / 2), y: Math.round(midY - lineGap), w: Math.round(widest), h: Math.round(lineGap * 2) } })
  }
  return placed
}

function drawBridgeStatement(ctx, o, centerX, baselineY, maxW, scale) {
  if (!o.brand.bridgeShow || !o.brand.bridgeStatement) return null
  const size = Math.round(30 * scale)
  ctx.save()
  ctx.textAlign = 'center'
  ctx.font = fontString('sans', size, '700')
  ctx.letterSpacing = '4px'
  const text = o.brand.bridgeStatement.toUpperCase()
  const lines = wrapLine(ctx, text, maxW)
  let y = baselineY - (lines.length - 1) * size * 1.35
  let widest = 0
  for (const line of lines) {
    widest = Math.max(widest, ctx.measureText(line).width)
    ctx.fillStyle = '#6FF7DA'
    ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 2
    ctx.fillText(line, centerX, y)
    ctx.shadowColor = 'rgba(111,247,218,0.8)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 0
    ctx.fillText(line, centerX, y)
    y += size * 1.35
  }
  ctx.restore()
  const h = lines.length * size * 1.35
  return { name: 'Bridge-Statement', critical: true, rect: { x: Math.round(centerX - widest / 2), y: Math.round(baselineY - h), w: Math.round(widest), h: Math.round(h) } }
}

// ═══════════════════════════════════════════════════════════════════════════
// Hauptfunktion
// ═══════════════════════════════════════════════════════════════════════════

/**
 * o = {
 *   preset, doc, bgImage, bgFocus, logoImg, fotoImg,
 *   design: { filter, darken, lineHeight, sizeAdjust },
 *   overlays: { safeAreas, platformUi, critical, cropPreview } — nur Editor
 * }
 * Rückgabe: fit-Ergebnis + Validierung
 */
export function renderSocial(ctx, o) {
  const { preset } = o
  const { width: W, height: H } = preset.canvas
  const sa = preset.safeArea
  const kind = preset.layout.kind
  const ov = o.overrides || {}
  const design = o.design || {}
  const sizeAdjust = ov.sizeAdjust ?? design.sizeAdjust ?? 1
  const lineHeight = ov.lineHeight ?? design.lineHeight ?? 1.28

  // layerFilter: für Video-Ebenen — { bg: false, roles: ['hook'], brand: false }
  // rendert nur bestimmte Ebenen (Layout bleibt identisch, Rest transparent)
  const lf = o.layerFilter || null

  // 1. Hintergrund (voll dekorativ, darf die ganze Fläche füllen)
  if (!lf || lf.bg !== false) {
    drawBackground(ctx, {
      W, H,
      bgMode: o.bgImage ? 'image' : 'verlauf',
      bgImage: o.bgImage, bgFocus: o.bgFocus ?? 0.5,
      filter: design.filter || 'keiner',
      darken: design.darken ?? 60,
      variant: 'frei',
    })
  } else {
    ctx.clearRect(0, 0, W, H)
  }

  const placedRects = []
  const brand = o.doc.brand
  const sections = contentSections(o.doc)

  // 2. Zonen bestimmen
  const zone = sa.recommended
  const brandScale = preset.layout.brandScale
  const brandRowH = Math.round((kind === 'feed' ? 240 : 190) * brandScale)
  const bridgeGap = Math.round(36 * brandScale)
  const bridgeH = brand.bridgeShow ? Math.round(48 * brandScale) : 0
  const brandBlockH = (brand.logoShow || brand.portraitShow || brand.identityShow) ? brandRowH : 0
  const footerH = brandBlockH + bridgeH + bridgeGap

  // Textzone = empfohlene Zone minus Footer
  const textPad = kind === 'tiktok' ? 20 : 40
  const textZone = {
    x: zone.x + textPad,
    y: zone.y + textPad,
    w: zone.w - textPad * 2,
    h: zone.h - footerH - textPad * 2 - 24,
  }

  // 3. Text einpassen und zeichnen — Feldgrößen/-farben aus dem Typo-System
  const typo = {}
  for (const key of TYPO_FIELDS) typo[key] = resolveFieldTypo(o.doc, preset, key)
  const align = preset.layout.textAlign === 'left' ? 'left' : 'center'
  const anchorX = align === 'left' ? textZone.x : W / 2
  const unit = W / 1080
  const fitted = sections.length
    ? fitSections(ctx, sections, typo, textZone.w * (align === 'left' ? 0.98 : 1), textZone.h, lineHeight, sizeAdjust * unit)
    : { blocks: [], total: 0, scale: 1, fits: true, minFontReached: false }

  // Vertikal: Feed/Reel mittig in der Textzone, TikTok oben beginnend
  let startY = kind === 'tiktok'
    ? textZone.y
    : textZone.y + Math.max(0, (textZone.h - fitted.total) / 2)
  // nie oberhalb der Zone starten, Überlauf läuft sichtbar nach unten
  startY = Math.max(startY, textZone.y)
  const drawn = drawBlocks(ctx, fitted, anchorX, startY, align, W, H, lf && lf.roles ? lf.roles : null)
  placedRects.push(...drawn.placed)

  // 4. Footer: Bridge-Statement + Markenreihe, unten in der empfohlenen Zone
  const showBrandLayer = !lf || lf.brand !== false
  const bandY = zone.y + zone.h - brandBlockH
  const band = { x: zone.x + textPad, y: bandY, w: zone.w - textPad * 2, h: brandBlockH }
  if (showBrandLayer && brand.bridgeShow && bridgeH) {
    // zentriert auf die Safe-Zone, nicht auf den Canvas (wichtig bei TikTok:
    // die empfohlene Zone sitzt links der Interaktionsleiste)
    const zoneCenterX = zone.x + zone.w / 2
    const r = drawBridgeStatement(ctx, o, zoneCenterX, bandY - bridgeGap, zone.w - textPad * 2, brandScale * unit)
    if (r) placedRects.push(r)
  }
  if (showBrandLayer && brandBlockH) placedRects.push(...drawBrandRow(ctx, o, band))

  // 5. Editor-Overlays (niemals im Export — Aufrufer steuert das über o.overlays)
  const overlays = o.overlays || {}
  if (overlays.platformUi) drawPlatformUi(ctx, preset)
  if (overlays.safeAreas) drawSafeAreas(ctx, preset)
  if (overlays.cropPreview && preset.gridPreview) drawCropPreview(ctx, preset)
  if (overlays.critical) highlightCritical(ctx, placedRects, sa)

  // 6. Validierung
  const fitResult = { fits: fitted.fits, scale: fitted.scale, minFontReached: fitted.minFontReached, placedRects, contrastAssist: drawn.contrastAssist }
  const validation = validateForPreset(o.doc, preset, fitResult)
  return { fit: fitResult, validation }
}

// ═══════════════════════════════════════════════════════════════════════════
// Editor-Overlays
// ═══════════════════════════════════════════════════════════════════════════

function drawSafeAreas(ctx, preset) {
  const sa = preset.safeArea
  ctx.save()
  // UI-Ausschlusszonen: rote transparente Flächen
  ctx.fillStyle = 'rgba(229,57,53,0.14)'
  for (const ex of sa.platformUiExclusions) ctx.fillRect(ex.zone.x, ex.zone.y, ex.zone.w, ex.zone.h)
  // empfohlener Bereich: gelbe Linie
  ctx.strokeStyle = 'rgba(240,207,90,0.9)'
  ctx.lineWidth = 3
  ctx.setLineDash([18, 12])
  ctx.strokeRect(sa.recommended.x, sa.recommended.y, sa.recommended.w, sa.recommended.h)
  // Kernzone: türkise Linie
  ctx.strokeStyle = 'rgba(142,245,210,0.9)'
  ctx.setLineDash([6, 8])
  ctx.strokeRect(sa.critical.x, sa.critical.y, sa.critical.w, sa.critical.h)
  ctx.setLineDash([])
  ctx.font = '700 24px "Montserrat", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(240,207,90,0.95)'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 6
  ctx.fillText('EMPFOHLEN', sa.recommended.x + 12, sa.recommended.y + 32)
  // Kernzonen-Label unten, damit sich die Beschriftungen nie überlappen
  ctx.fillStyle = 'rgba(142,245,210,0.95)'
  ctx.fillText('KERNZONE', sa.critical.x + 12, sa.critical.y + sa.critical.h - 14)
  ctx.restore()
}

function drawCropPreview(ctx, preset) {
  const { width: W, height: H } = preset.canvas
  const r = cropRect(W, H, preset.gridPreview.aspectRatio)
  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'
  ctx.lineWidth = 3
  ctx.setLineDash([14, 10])
  ctx.strokeRect(r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3)
  ctx.setLineDash([])
  ctx.font = '700 24px "Montserrat", sans-serif'
  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.shadowColor = 'rgba(0,0,0,0.9)'
  ctx.shadowBlur = 6
  ctx.fillText(`CROP ${preset.gridPreview.aspectRatio}`, r.x + r.w - 12, r.y + 32)
  ctx.restore()
}

function highlightCritical(ctx, placedRects, sa) {
  ctx.save()
  for (const el of placedRects) {
    if (!el.critical) continue
    const inside = el.rect.x >= sa.recommended.x && el.rect.y >= sa.recommended.y &&
      el.rect.x + el.rect.w <= sa.recommended.x + sa.recommended.w &&
      el.rect.y + el.rect.h <= sa.recommended.y + sa.recommended.h
    ctx.strokeStyle = inside ? 'rgba(142,245,210,0.7)' : 'rgba(229,57,53,0.95)'
    ctx.lineWidth = inside ? 2 : 4
    ctx.strokeRect(el.rect.x - 6, el.rect.y - 6, el.rect.w + 12, el.rect.h + 12)
  }
  ctx.restore()
}

// Simulierte Plattform-UI — nur Vorschau, wird nie exportiert
function drawPlatformUi(ctx, preset) {
  const { width: W, height: H } = preset.canvas
  ctx.save()
  ctx.globalAlpha = 0.9
  if (preset.platform === 'tiktok') {
    // rechte Interaktionsleiste
    const x = W - 96
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    for (let i = 0; i < 4; i++) {
      const y = 700 + i * 170
      ctx.beginPath(); ctx.arc(x, y, 44, 0, Math.PI * 2); ctx.fill()
    }
    // Profil-Kreis oben in der Leiste
    ctx.beginPath(); ctx.arc(x, 560, 50, 0, Math.PI * 2)
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.stroke()
    // Caption-Zone
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.font = '700 34px "Montserrat", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('@ben.trustbridge', 48, H - 420)
    ctx.font = '400 30px "Montserrat", sans-serif'
    ctx.fillText('Caption erscheint hier … mehr', 48, H - 368)
    ctx.fillText('♫  Originalton – Trustbridge', 48, H - 310)
    // untere Navigation
    ctx.fillStyle = 'rgba(0,0,0,0.85)'
    ctx.fillRect(0, H - 120, W, 120)
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '600 28px "Montserrat", sans-serif'
    ctx.textAlign = 'center'
    const items = ['Home', 'Freunde', '+', 'Posteingang', 'Profil']
    items.forEach((t, i) => ctx.fillText(t, W * (0.1 + i * 0.2), H - 50))
    // obere Zone
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '700 34px "Montserrat", sans-serif'
    ctx.fillText('Folge ich   |   Für dich', W / 2, 110)
  } else if (preset.canvas.aspectRatio === '9:16') {
    // Instagram/Facebook Reel/Story-UI
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.font = '700 34px "Montserrat", sans-serif'
    ctx.textAlign = 'left'
    ctx.beginPath(); ctx.arc(84, 96, 40, 0, Math.PI * 2)
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.stroke()
    ctx.fillText('ben.trustbridge', 144, 108)
    const x = W - 84
    for (let i = 0; i < 3; i++) {
      const y = H - 640 + i * 160
      ctx.beginPath(); ctx.arc(x, y, 40, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill()
    }
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.font = '400 30px "Montserrat", sans-serif'
    ctx.fillText('Caption erscheint hier … mehr', 48, H - 260)
    roundRect(ctx, 40, H - 200, W - 240, 88, 44)
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 3; ctx.stroke()
    ctx.font = '400 32px "Montserrat", sans-serif'
    ctx.fillText('Nachricht senden …', 72, H - 144)
  }
  ctx.restore()
}
