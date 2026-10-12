// Finder Lab: Klick-Durchlauf der Reise A bis zur Finder Card, Screenshots,
// Mobil-Check, Reduced-Motion, Tastatur, Rückbau-Hinweis.
// Aufruf: node tests/js/shot-finder-lab.mjs <ausgabeordner>
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const out = process.argv[2] || '.'
fs.mkdirSync(out, { recursive: true })
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => fs.existsSync(p))
const b = await puppeteer.launch({ executablePath: exe, headless: true })
const p = await b.newPage()
const errors = []
p.on('pageerror', e => errors.push('pageerror: ' + e.message))
p.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
const sleep = ms => new Promise(r => setTimeout(r, ms))
const base = 'http://127.0.0.1:8001'
const results = {}

const screenId = () => p.$eval('[data-lab-screen]', el => el.dataset.labScreen)
const warnings = []
// Element in die Viewport-Mitte scrollen (der fixe Seitenkopf würde sonst Klicks am oberen Rand abfangen), dann echter Mausklick.
const click = async (sel) => {
  await p.$eval(sel, el => el.scrollIntoView({ block: 'center', inline: 'nearest' }))
  await sleep(150)
  await p.click(sel)
}
// Kachelklick; wenn die Kachel danach nicht aktiv ist, Diagnose + JS-Klick als Fallback.
const clickOpt = async (id) => {
  const sel = `[data-opt="${id}"]`
  await click(sel); await sleep(350)
  const pressed = await p.$eval(sel, el => el.getAttribute('aria-pressed'))
  if (pressed !== 'true') {
    const diag = await p.$eval(sel, el => { const r = el.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { y: Math.round(r.y), h: Math.round(r.height), top: top?.className || top?.tagName } })
    warnings.push(`Mausklick auf ${id} (Screen ${await screenId()}) wirkungslos â€” darüber lag: ${diag.top} (y=${diag.y}, h=${diag.h}); JS-Klick als Fallback`)
    await p.$eval(sel, el => el.click()); await sleep(300)
  }
}
const next = async () => {
  const disabled = await p.$eval('[data-lab-next]', e => e.disabled)
  if (disabled) throw new Error('Weiter deaktiviert auf Screen ' + await screenId())
  await click('[data-lab-next]')
  await sleep(1400)
}
const shot = (name) => p.screenshot({ path: path.join(out, name + '.png'), fullPage: true })

// 1) Desktop-Durchlauf
await p.setViewport({ width: 1440, height: 900 })
await p.goto(base + '/finder-lab', { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(900)
await p.evaluate(() => { try { localStorage.clear(); localStorage.setItem('cookie_consent', 'declined') } catch {} })
await p.reload({ waitUntil: 'networkidle0' }); await sleep(900); await click('.lab-age input'); await sleep(150)
results.start = { screen: await screenId(), cards: (await p.$$('[data-opt]')).length, notice: !!(await p.$('.lab-notice')) }
const t0 = Date.now()
await shot('lab-A0-1440')

await clickOpt('koeln'); await next()                 // A0 → A2 (Bereich aus Szene, A1 übersprungen)
results.afterA0 = { screen: await screenId() }
await clickOpt('nein'); await next()                  // A2 → A3
results.A3 = { screen: await screenId(), radios: (await p.$$('.rs-radio')).length }
await click('.rs-radio:not(.rs-radio-own)'); await sleep(1500)    // Erwartung (Köln)
await shot('lab-A3-weiche')
await next()                                          // A3 → A4
await clickOpt('mitgemacht'); await next()            // A4 → A5
results.A5 = { screen: await screenId(), sub: await p.$eval('.lab-sub', el => el.textContent.trim()).catch(() => null) }
const tInsight = Date.now() - t0
await shot('lab-A5-abweichung')
await clickOpt('stimmt'); await next()                // A5 → A6
await clickOpt('enttaeuschen'); await next()          // A6 → A7
results.A7 = { screen: await screenId(), scene: await p.$eval('.sy-scene-text', el => el.textContent.trim()) }
for (const v of ['expectation', 'expectation', 'impulse', 'expectation', 'expectation']) {
  await click(v === 'impulse' ? '.sy-radio-own' : '.sy-radio:not(.sy-radio-own)'); await sleep(1100)
}
results.A7.distance = await p.$eval('.sy-distance strong', el => el.textContent.trim())
results.A7.explain = await p.$eval('.lab-explain .pro-tip-sub strong', el => el.textContent.trim()).catch(() => null)
await click('.sy-alt'); await sleep(400)
await shot('lab-A7-stellwerk')
await clickOpt('oefter'); await next()                // A7 → A7b
await clickOpt('zurueckgehalten'); await next()       // A7b → A8
results.A8 = { screen: await screenId(), cycle: !!(await p.$('.pc-svg')), map: !!(await p.$('.pm-svg')) }
await click('.pc-chip-exit').catch(() => {}); await sleep(300)
await shot('lab-A8-kreislauf')
await clickOpt('andere'); await next()                // A8 → A9
await clickOpt('bedenkzeit'); await sleep(300)
results.A9 = { screen: await screenId(), wenn: await p.$eval('.lab-ifthen input', el => el.value) }
await next()                                          // A9 → A10a
results.A10a = { screen: await screenId(), statements: (await p.$$('[data-stmt]')).length }
await shot('lab-A10a-trifft-es')
await click('[data-stmt="own"]'); await sleep(300)
await next()                                          // A10a → (simulierte KI) → A10b
await sleep(1200)
results.card = await p.evaluate(() => ({
  screen: document.querySelector('[data-lab-screen]')?.dataset.labScreen,
  headline: document.querySelector('.epic-ck-headline')?.textContent.trim(),
  rows: [...document.querySelectorAll('.fc-row .fc-label')].map(e => e.textContent.trim()),
  glyph: !!document.querySelector('.fc-glyph'),
  lights: document.querySelectorAll('.lab-path li.done').length,
}))
results.timing = { msToDeviation: tInsight, msTotal: Date.now() - t0 }
await shot('lab-A10b-card')

// Technik-Spalte
await click('.lab-dev-toggle'); await sleep(300)
results.dev = await p.evaluate(() => ({ cols: document.querySelectorAll('.lab-dev-col').length, calls: document.querySelector('.lab-devbar-note')?.textContent.trim() }))
await shot('lab-technik')

// 2) Pfad „Bewusster Kompromiss" + „Kein Spielraum" (verkürzt, nur Screen-Reihenfolge)
try {
await click('.lab-dev-actions .btn-outline'); await sleep(900)   // Neu starten
await clickOpt('aufgabe'); await next(); await clickOpt('zeit'); await next()
await click('.rs-radio:not(.rs-radio-own)'); await sleep(1300); await next()
await clickOpt('halb'); await next(); await clickOpt('stimmt'); await next()
await clickOpt('abgewogen'); await next()
for (let i = 0; i < 3; i++) { await click('.sy-radio:not(.sy-radio-own)'); await sleep(1000) }
await clickOpt('einmalig'); await next()
await clickOpt('kompromiss'); await next()
results.compromise = { afterA7b: await screenId(), firstBridge: await p.$eval('[data-opt]', el => el.dataset.opt) }
await click('.lab-dev-actions .btn-outline'); await sleep(900)
await clickOpt('sonntag'); await next(); await clickOpt('grenze'); await next()
await click('.rs-radio:not(.rs-radio-own)'); await sleep(1300); await next()
await clickOpt('mitgemacht'); await next(); await clickOpt('stimmt'); await next()
await clickOpt('kein-spielraum'); await next()
results.external = { afterA6: await screenId() }
// Pfad „Schon gestellt" (keine Wahl) direkt aus A3 → Gleislage → Card ohne Reparaturaufgabe
await click('.lab-dev-actions .btn-outline'); await sleep(900)
await clickOpt('koeln'); await next(); await clickOpt('nein'); await next()
await clickOpt('vorgegeben'); await next()
results.fixed = { afterA3: await screenId() }
await clickOpt('keiner'); await next(); await sleep(600)
results.fixed.card = await p.$eval('.epic-ck-headline', el => el.textContent.trim()).catch(() => null)
results.fixed.bridge = await p.$eval('.fc-row.bruecke .fc-text', el => el.textContent.trim()).catch(() => null)
results.fixed.abweichung = await p.$eval('.fc-row.abweichung .fc-text', el => el.textContent.trim()).catch(() => null)

// 3) Krisen-Demo über Freitext
await click('.lab-dev-actions .btn-outline'); await sleep(900)
await clickOpt('eigene'); await sleep(200)
await click('.lab-freetext summary'); await sleep(200); await click('.lab-consent input'); await sleep(100)
await p.type('.finder-textarea', 'Ich will einfach nicht mehr leben.')
await next()
results.safety = { screen: await screenId(), contacts: (await p.$$('.lab-safety-contacts li')).length }
await shot('lab-safety')
} catch (e) { results.pathsError = e.message; await shot('lab-paths-error') }

// 4) Mobil 390
try {
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await p.goto(base + '/finder-lab', { waitUntil: 'networkidle0', timeout: 60000 }); await sleep(900)
await p.evaluate(() => { try { localStorage.clear(); localStorage.setItem('cookie_consent', 'declined') } catch {} })
await p.reload({ waitUntil: 'networkidle0' }); await sleep(900); await click('.lab-age input'); await sleep(150)
results.mobile = await p.evaluate(() => {
  const stage = document.querySelector('.lab-stage')
  const firstCard = document.querySelector('[data-opt]')
  const r = firstCard.getBoundingClientRect()
  const cols = getComputedStyle(firstCard.parentElement).gridTemplateColumns.split(' ').length
  return { overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, stageOverflow: stage.scrollWidth > stage.clientWidth, cardW: Math.round(r.width), cardH: Math.round(r.height), cols, firstCardTop: Math.round(r.top) }
})
await shot('lab-mobile-A0')
await clickOpt('koeln'); await next(); await clickOpt('nein'); await next()
await shot('lab-mobile-A3')
await click('.rs-radio:not(.rs-radio-own)'); await sleep(1300); await next(); await clickOpt('mitgemacht'); await next(); await clickOpt('stimmt'); await next(); await clickOpt('enttaeuschen'); await next()
await shot('lab-mobile-A7')
results.mobileYard = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, radioH: Math.round(document.querySelector('.sy-radio').getBoundingClientRect().height) }))
} catch (e) { results.mobileError = e.message; await shot('lab-mobile-error') }

// 5) Reduced Motion + Tastatur
try {
await p.setViewport({ width: 1440, height: 900 })
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await p.goto(base + '/finder-lab', { waitUntil: 'networkidle0', timeout: 60000 }); await sleep(600)
await p.evaluate(() => { try { localStorage.clear(); localStorage.setItem('cookie_consent', 'declined') } catch {} })
await p.reload({ waitUntil: 'networkidle0' }); await sleep(600); await click('.lab-age input'); await sleep(150)
// Tab bis zur ersten Kachel, Enter wählt
let pressed = null
for (let i = 0; i < 40; i++) {
  await p.keyboard.press('Tab')
  const isCard = await p.evaluate(() => document.activeElement?.classList.contains('crystal-card'))
  if (isCard) { await p.keyboard.press('Enter'); await sleep(200); pressed = await p.evaluate(() => document.activeElement?.getAttribute('aria-pressed')); break }
}
results.keyboard = { pressedAfterEnter: pressed }
await next(); await clickOpt('nein'); await next()
await p.focus('.rs-radio'); await p.keyboard.press('ArrowRight'); await sleep(400)
results.reducedMotion = { switchViaArrow: await p.$eval('.rs-radio:not(.rs-radio-own)', el => el.getAttribute('aria-checked')) }
} catch (e) { results.a11yError = e.message; await shot('lab-a11y-error') }

console.log(JSON.stringify(results, null, 2))
console.log(warnings.length ? 'WARNUNGEN:\n' + warnings.join('\n') : 'keine Klick-Warnungen')
console.log(errors.length ? 'JS-FEHLER:\n' + errors.join('\n') : 'keine JS-Fehler')
await b.close()
