// Trustbridge Social — Unit-Tests (Node, ohne Test-Framework)
// Ausführen: npm run test:social
import assert from 'node:assert/strict'
import {
  PLATFORM_PRESETS, PRESET_IDS,
  sanitizeSocialText, hasLeadingWhitespaceTricks,
  createSocialDocument, contentSections, contentAsPlainText,
  rectContains, rectsOverlap, cropRect, validateForPreset,
  TYPO_FIELDS, FIELD_SIZE_RANGES, BRAND_COLORS, TYPO_PRESETS,
  resolveFieldTypo, checkHierarchy, optimizeHierarchy, applyBrandColors, applyTypoPreset,
} from '../../resources/js/Pages/Builder/socialPresets.js'

let passed = 0
const test = (name, fn) => {
  try { fn(); passed++; console.log(`  ✓ ${name}`) }
  catch (e) { console.error(`  ✗ ${name}\n    ${e.message}`); process.exitCode = 1 }
}

console.log('sanitizeSocialText')
test('entfernt führende Leerzeilen', () => {
  assert.equal(sanitizeSocialText('\n\n\nHallo'), 'Hallo')
})
test('entfernt Leerzeichen am Zeilenanfang', () => {
  assert.equal(sanitizeSocialText('   Hallo\n   Welt'), 'Hallo\nWelt')
})
test('reduziert 3+ Leerzeilen auf 2', () => {
  assert.equal(sanitizeSocialText('A\n\n\n\n\nB'), 'A\n\nB')
})
test('erhält normale Absatzstruktur', () => {
  assert.equal(sanitizeSocialText('A\n\nB\nC'), 'A\n\nB\nC')
})
test('vereinheitlicht CRLF', () => {
  assert.equal(sanitizeSocialText('A\r\nB\rC'), 'A\nB\nC')
})
test('langer deutscher Text bleibt inhaltlich unverändert', () => {
  const t = 'Die größte Grenze ist selten der Weg.\n\nSie ist die Geschichte, die dir deine Angst darüber erzählt.'
  assert.equal(sanitizeSocialText(t), t)
})
test('erkennt Whitespace-Tricks', () => {
  assert.equal(hasLeadingWhitespaceTricks('\n\nText'), true)
  assert.equal(hasLeadingWhitespaceTricks('Text\n\n\n\nMehr'), true)
  assert.equal(hasLeadingWhitespaceTricks('Text\n\nMehr'), false)
})

console.log('Plattform-Presets')
test('alle 10 Pflicht-Presets vorhanden', () => {
  for (const id of ['instagram-feed-portrait', 'instagram-reel', 'instagram-story', 'instagram-cover',
    'tiktok-video', 'tiktok-photo', 'tiktok-cover',
    'facebook-feed-portrait', 'facebook-reel', 'facebook-story']) {
    assert.ok(PLATFORM_PRESETS[id], `${id} fehlt`)
  }
})
test('Canvas-Maße korrekt (4:5 und 9:16)', () => {
  assert.deepEqual([PLATFORM_PRESETS['instagram-feed-portrait'].canvas.width, PLATFORM_PRESETS['instagram-feed-portrait'].canvas.height], [1080, 1350])
  assert.deepEqual([PLATFORM_PRESETS['facebook-feed-portrait'].canvas.width, PLATFORM_PRESETS['facebook-feed-portrait'].canvas.height], [1080, 1350])
  for (const id of ['instagram-reel', 'instagram-story', 'tiktok-video', 'tiktok-photo', 'tiktok-cover', 'facebook-reel', 'facebook-story']) {
    assert.deepEqual([PLATFORM_PRESETS[id].canvas.width, PLATFORM_PRESETS[id].canvas.height], [1080, 1920], id)
  }
})
test('jedes Preset dokumentiert seine Safe-Area-Quelle', () => {
  const valid = ['official-overlay', 'official-percentage-guidance', 'conservative-builder-default']
  for (const id of PRESET_IDS) assert.ok(valid.includes(PLATFORM_PRESETS[id].safeArea.source), id)
})
test('Safe-Areas liegen innerhalb des Canvas, Kernzone innerhalb der Empfehlung', () => {
  for (const id of PRESET_IDS) {
    const p = PLATFORM_PRESETS[id]
    const full = { x: 0, y: 0, w: p.canvas.width, h: p.canvas.height }
    assert.ok(rectContains(full, p.safeArea.recommended), `${id}: recommended außerhalb`)
    assert.ok(rectContains(full, p.safeArea.critical), `${id}: critical außerhalb`)
    assert.ok(rectContains(p.safeArea.recommended, p.safeArea.critical), `${id}: critical nicht in recommended`)
  }
})
test('Meta-9:16-Guidance: 14 % oben, 35 % unten, 6 % seitlich', () => {
  const r = PLATFORM_PRESETS['instagram-reel'].safeArea.recommended
  assert.equal(r.y, 269)
  assert.equal(1920 - (r.y + r.h), 672)
  assert.equal(r.x, 65)
})
test('TikTok-Kernzone entspricht konservativem Default', () => {
  const r = PLATFORM_PRESETS['tiktok-video'].safeArea.recommended
  assert.deepEqual(r, { x: 90, y: 220, w: 730, h: 1050 })
})
test('TikTok: rechte Interaktionsleiste ausgeschlossen', () => {
  const zones = PLATFORM_PRESETS['tiktok-video'].safeArea.platformUiExclusions
  assert.ok(zones.some((z) => z.zone.x === 820 && z.zone.w === 260))
  assert.ok(zones.some((z) => z.zone.y === 1420 && z.zone.h === 500))
})

console.log('Geometrie')
test('rectsOverlap erkennt Überlappung und Nicht-Überlappung', () => {
  assert.equal(rectsOverlap({ x: 0, y: 0, w: 10, h: 10 }, { x: 5, y: 5, w: 10, h: 10 }), true)
  assert.equal(rectsOverlap({ x: 0, y: 0, w: 10, h: 10 }, { x: 20, y: 20, w: 5, h: 5 }), false)
})
test('cropRect: 3:4-Grid aus 4:5 schneidet seitlich', () => {
  const r = cropRect(1080, 1350, '3:4')
  assert.equal(r.h, 1350)
  assert.equal(r.w, Math.round(1350 * 3 / 4))
  assert.ok(r.x > 0)
})
test('cropRect: 1:1 aus 9:16 schneidet oben/unten', () => {
  const r = cropRect(1080, 1920, '1:1')
  assert.deepEqual([r.w, r.h], [1080, 1080])
  assert.equal(r.y, 420)
})

console.log('Master-Content')
test('strukturierter Modus liefert Sektionen in fester Reihenfolge', () => {
  const doc = createSocialDocument()
  const roles = contentSections(doc).map((s) => s.role)
  assert.deepEqual(roles, ['hook', 'statement', 'question', 'cta'])
})
test('Altbestand: „vertiefung" wird in die Hauptaussage gemergt', () => {
  const doc = createSocialDocument()
  doc.content.statement = 'Satz eins.'
  doc.content.vertiefung = 'Satz zwei.'
  const s = contentSections(doc).find((x) => x.role === 'statement')
  assert.equal(s.text, 'Satz eins.\n\nSatz zwei.')
})
test('freier Modus liefert eine sanitisierte Sektion', () => {
  const doc = createSocialDocument()
  doc.mode = 'frei'
  doc.content.freeText = '\n\n\n  Hallo Welt'
  const s = contentSections(doc)
  assert.equal(s.length, 1)
  assert.equal(s[0].text, 'Hallo Welt')
})
test('leere Felder erzeugen keine Sektionen (fehlende Hook ok)', () => {
  const doc = createSocialDocument()
  doc.content.hook = ''
  doc.content.question = ''
  const roles = contentSections(doc).map((s) => s.role)
  assert.deepEqual(roles, ['statement', 'cta'])
})
test('contentAsPlainText fügt mit Doppel-Zeilenumbruch zusammen', () => {
  const doc = createSocialDocument()
  assert.ok(contentAsPlainText(doc).includes('.\n\n'))
})

console.log('Validierung')
const doc = createSocialDocument()
doc.content.caption = 'Eine Caption'
doc.content.altText = 'Alt'
const preset = PLATFORM_PRESETS['instagram-feed-portrait']
const insideRect = { x: 200, y: 300, w: 400, h: 200 }
const outsideRect = { x: 0, y: 0, w: 400, h: 200 }

test('sauberes Ergebnis → Score 100, veröffentlichungsbereit', () => {
  const fit = { fits: true, scale: 1, minFontReached: false, placedRects: [{ name: 'Hauptaussage', critical: true, rect: insideRect }] }
  const v = validateForPreset(doc, preset, fit)
  assert.equal(v.score, 100)
  assert.equal(v.valid, true)
  assert.equal(v.verdict, 'Veröffentlichungsbereit')
})
test('Element außerhalb Safe-Area → Fehler + nicht valide', () => {
  const fit = { fits: true, scale: 1, minFontReached: false, placedRects: [{ name: 'Logo', critical: true, rect: outsideRect }] }
  const v = validateForPreset(doc, preset, fit)
  assert.equal(v.valid, false)
  assert.ok(v.issues.some((i) => i.code === 'outside-safe'))
})
test('Text-Überlauf → Fehler, kein unsichtbares Abschneiden', () => {
  const fit = { fits: false, scale: 0.55, minFontReached: true, placedRects: [] }
  const v = validateForPreset(doc, preset, fit)
  assert.ok(v.issues.some((i) => i.code === 'text-overflow'))
  assert.ok(v.issues.some((i) => i.code === 'min-font'))
})
test('fehlende Caption → Warnung, Score sinkt', () => {
  const d2 = createSocialDocument()
  d2.content.caption = ''
  const v = validateForPreset(d2, preset, { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(v.issues.some((i) => i.code === 'caption-missing'))
  assert.ok(v.score < 100)
})
test('fehlendes Portrait/Logo → nur Info, weiterhin valide', () => {
  const d3 = createSocialDocument()
  d3.content.caption = 'c'
  d3.brand.portraitShow = false
  d3.brand.logoShow = false
  const v = validateForPreset(d3, preset, { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.equal(v.valid, true)
  assert.ok(v.issues.some((i) => i.code === 'portrait-off'))
  assert.ok(v.issues.some((i) => i.code === 'logo-off'))
})
test('Whitespace-Tricks im freien Modus → Warnung', () => {
  const d4 = createSocialDocument()
  d4.mode = 'frei'
  d4.content.freeText = '\n\n\nText'
  d4.content.caption = 'c'
  const v = validateForPreset(d4, preset, { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(v.issues.some((i) => i.code === 'whitespace-tricks'))
})

console.log('Typografie-System')
test('jedes Preset hat plattformabhängige Typo-Standards für alle Felder', () => {
  for (const id of PRESET_IDS) {
    const t = PLATFORM_PRESETS[id].layout.typo
    assert.ok(t, `${id}: typo fehlt`)
    for (const f of TYPO_FIELDS) assert.equal(typeof t[f], 'number', `${id}.${f}`)
    assert.equal(t.statement, 1, `${id}: Hauptaussage muss 100 % sein`)
  }
})
test('Plattform-Standards: Feed 85/100/85/55, TikTok 95/100/80/55, Story-CTA 60', () => {
  assert.deepEqual(PLATFORM_PRESETS['instagram-feed-portrait'].layout.typo, { hook: 0.85, statement: 1, question: 0.85, cta: 0.55 })
  assert.deepEqual(PLATFORM_PRESETS['tiktok-video'].layout.typo, { hook: 0.95, statement: 1, question: 0.8, cta: 0.55 })
  assert.equal(PLATFORM_PRESETS['instagram-story'].layout.typo.cta, 0.6)
})
test('resolveFieldTypo: Plattform-Standard als Fallback, Override gewinnt', () => {
  const d = createSocialDocument()
  const p = PLATFORM_PRESETS['instagram-feed-portrait']
  assert.equal(resolveFieldTypo(d, p, 'hook').size, 0.85)
  d.typography.fields.hook.size = 1.05
  assert.equal(resolveFieldTypo(d, p, 'hook').size, 1.05)
})
test('resolveFieldTypo: Farbtoken im Markenmodus, Hex im freien Modus', () => {
  const d = createSocialDocument()
  const p = PLATFORM_PRESETS['instagram-feed-portrait']
  assert.equal(resolveFieldTypo(d, p, 'cta').colorHex, BRAND_COLORS.turquoise.hex)
  d.typography.mode = 'frei'
  d.typography.fields.cta.colorFree = '#123456'
  assert.equal(resolveFieldTypo(d, p, 'cta').colorHex, '#123456')
})
test('Standardwerte verletzen die Hierarchie nie', () => {
  const d = createSocialDocument()
  for (const id of PRESET_IDS) assert.equal(checkHierarchy(d, PLATFORM_PRESETS[id]).length, 0, id)
})
test('Hook dominanter als Hauptaussage → Warnung mit gefordertem Text', () => {
  const d = createSocialDocument()
  d.typography.fields.hook.size = 1.1
  d.typography.fields.statement.size = 0.8
  const issues = checkHierarchy(d, PLATFORM_PRESETS['instagram-feed-portrait'])
  assert.ok(issues.some((i) => i.message === 'Die Hook ist aktuell dominanter als deine Hauptbotschaft.'))
})
test('optimizeHierarchy stellt die Dominanz der Hauptaussage wieder her', () => {
  const d = createSocialDocument()
  d.typography.fields.hook.size = 1.1
  d.typography.fields.statement.size = 0.8
  optimizeHierarchy(d, PLATFORM_PRESETS['instagram-feed-portrait'])
  assert.equal(checkHierarchy(d, PLATFORM_PRESETS['instagram-feed-portrait']).length, 0)
})
test('Regler-Bereiche entsprechen der Vorgabe', () => {
  assert.deepEqual(FIELD_SIZE_RANGES.hook, { min: 0.6, max: 1.1 })
  assert.deepEqual(FIELD_SIZE_RANGES.statement, { min: 0.8, max: 1.2 })
  assert.deepEqual(FIELD_SIZE_RANGES.question, { min: 0.6, max: 1.05 })
  assert.deepEqual(FIELD_SIZE_RANGES.cta, { min: 0.4, max: 0.8 })
})
test('applyBrandColors setzt die Trustbridge-Standardfarben', () => {
  const d = createSocialDocument()
  d.typography.mode = 'frei'
  d.typography.fields.statement.color = 'gold'
  applyBrandColors(d)
  assert.equal(d.typography.mode, 'marke')
  assert.equal(d.typography.fields.statement.color, 'primary')
  assert.equal(d.typography.fields.cta.color, 'turquoise')
})
test('alle 6 Typo-Presets definieren alle 4 Felder', () => {
  for (const key of ['klar', 'emotional', 'poetisch', 'direkt', 'minimal', 'signature']) {
    assert.ok(TYPO_PRESETS[key], key)
    for (const f of TYPO_FIELDS) assert.ok(TYPO_PRESETS[key].fields[f], `${key}.${f}`)
  }
})
test('Trustbridge Signature: CTA türkis, Rest weiß', () => {
  const d = createSocialDocument()
  applyTypoPreset(d, 'signature')
  assert.equal(d.typography.fields.hook.color, 'primary')
  assert.equal(d.typography.fields.statement.color, 'primary')
  assert.equal(d.typography.fields.question.color, 'primary')
  assert.equal(d.typography.fields.cta.color, 'turquoise')
})

console.log('Farbharmonie-Validierung')
test('Gold als Hauptaussage → Warnung', () => {
  const d = createSocialDocument()
  d.content.caption = 'c'; d.content.altText = 'a'
  d.typography.fields.statement.color = 'gold'
  const v = validateForPreset(d, PLATFORM_PRESETS['instagram-feed-portrait'], { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(v.issues.some((i) => i.code === 'farbe-gold'))
})
test('drei dominante Farben im Hauptmotiv → Warnung', () => {
  const d = createSocialDocument()
  d.content.caption = 'c'; d.content.altText = 'a'
  d.typography.fields.hook.color = 'turquoise'
  d.typography.fields.question.color = 'gold'
  const v = validateForPreset(d, PLATFORM_PRESETS['instagram-feed-portrait'], { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(v.issues.some((i) => i.code === 'farbe-dominanz'))
})
test('Off-Palette-Farbe im freien Modus wird gemeldet', () => {
  const d = createSocialDocument()
  d.content.caption = 'c'; d.content.altText = 'a'
  d.typography.mode = 'frei'
  d.typography.fields.hook.colorFree = '#ff0000'
  const v = validateForPreset(d, PLATFORM_PRESETS['instagram-feed-portrait'], { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(v.issues.some((i) => i.code === 'farbe-off-palette'))
})
test('Kontrasthilfe wird als Info gemeldet', () => {
  const d = createSocialDocument()
  d.content.caption = 'c'; d.content.altText = 'a'
  const v = validateForPreset(d, PLATFORM_PRESETS['instagram-feed-portrait'], { fits: true, scale: 1, minFontReached: false, placedRects: [], contrastAssist: ['Hauptaussage'] })
  assert.ok(v.issues.some((i) => i.code === 'farbe-kontrast'))
})
test('Standard-Dokument bleibt markenkonform (keine Farb-/Hierarchie-Warnungen)', () => {
  const d = createSocialDocument()
  d.content.caption = 'c'; d.content.altText = 'a'
  const v = validateForPreset(d, PLATFORM_PRESETS['instagram-feed-portrait'], { fits: true, scale: 1, minFontReached: false, placedRects: [] })
  assert.ok(!v.issues.some((i) => i.code.startsWith('farbe') || i.code === 'hierarchie'))
  assert.equal(v.score, 100)
})

console.log(`\n${passed} Tests bestanden${process.exitCode ? ' — FEHLER siehe oben' : ''}`)
