// Trustbridge Finder: Nav-Breite messen, Klick-Durchlauf bis zur Finder Card,
// Vergleichs-Screenshots /prizes vs /trustbridgefinder.
// Aufruf: node tests/js/shot-finder.mjs <ausgabeordner>
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

// 1) Nav-Breite
for (const w of [1920, 1700, 1600, 1500, 1441, 1440, 1024, 390]) {
  await p.setViewport({ width: w, height: 900 })
  await p.goto(base + '/trustbridgefinder', { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(600)
  const m = await p.evaluate(() => {
    const links = document.querySelector('.nav-links'); const act = document.querySelector('.nav-actions'); const logo = document.querySelector('.logo-wrapper'); const toggle = document.querySelector('.mobile-toggle')
    const vis = el => el && getComputedStyle(el).display !== 'none'
    const r = el => el.getBoundingClientRect()
    return {
      mobile: vis(toggle),
      linksRight: Math.round(r(links).right), actionsLeft: act && vis(act) ? Math.round(r(act).left) : null,
      logoRight: Math.round(r(logo).right), linksLeft: Math.round(r(links).left),
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      fs: getComputedStyle(links.querySelector('a')).fontSize,
    }
  })
  console.log(`nav@${w}:`, JSON.stringify(m))
}

// 2) Vergleichs-Screenshots bei 1440 (Desktop-Stufe) — ganze Seite
await p.setViewport({ width: 1440, height: 900 })
for (const [route, name] of [['/prizes', 'prizes-1440'], ['/trustbridgefinder', 'finder-1440']]) {
  await p.goto(base + route, { waitUntil: 'networkidle0', timeout: 60000 })
  await sleep(1500)
  await p.screenshot({ path: path.join(out, name + '.png'), fullPage: true })
}

// 3) Klick-Durchlauf
await p.goto(base + '/trustbridgefinder', { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(800)
let steps = 0
for (let i = 0; i < 12; i++) {
  const card = await p.$('.crystal-card')
  if (!card) break
  await card.click(); await sleep(400)
  if (i === 1) { await p.type('.finder-textarea', 'Mein Chef hat mich um ein Wochenendprojekt gebeten.'); await sleep(200) }
  if (i === 2) { await p.screenshot({ path: path.join(out, 'finder-step3.png'), fullPage: true }) }
  const btn = await p.$('.finder-nav .btn-primary')
  const disabled = await btn.evaluate(e => e.disabled)
  if (disabled) { console.log('FEHLER: Weiter deaktiviert bei Schritt', i + 1); break }
  await btn.click(); steps++
  await sleep(1300)
}
const finale = await p.evaluate(() => ({
  card: !!document.querySelector('.epic-ck-card'),
  rows: document.querySelectorAll('.fc-row').length,
  headline: document.querySelector('.epic-ck-headline')?.textContent.trim(),
  protocolGone: !document.querySelector('.finder-protocol'),
}))
console.log('durchlauf: schritte=' + steps, JSON.stringify(finale))
await p.screenshot({ path: path.join(out, 'finder-finale.png'), fullPage: true })

// 4) Mobile
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await p.goto(base + '/trustbridgefinder', { waitUntil: 'networkidle0', timeout: 60000 })
await sleep(1200)
const mob = await p.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth, sw: document.documentElement.scrollWidth }))
console.log('mobile:', JSON.stringify(mob))
await p.screenshot({ path: path.join(out, 'finder-mobile.png'), fullPage: true })

console.log(errors.length ? 'JS-FEHLER:\n' + errors.join('\n') : 'keine JS-Fehler')
await b.close()
