import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const exePaths = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const exe = exePaths.find((p) => fs.existsSync(p))
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--autoplay-policy=no-user-gesture-required'] })
const page = await browser.newPage()
await page.setViewport({ width: 1680, height: 1100 })
await page.goto('http://127.0.0.1:8001/social/instagram', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 2500))

const clickByText = async (text, selector = 'button') => {
  const els = await page.$$(selector)
  for (const el of els) {
    const t = await el.evaluate((e) => e.textContent.trim())
    if (t.includes(text)) { await el.click(); return true }
  }
  return false
}

await clickByText('Reel', '.sm-preset-list button')
await new Promise((r) => setTimeout(r, 800))
await clickByText('Gestaffelt aufpoppen')
await clickByText('5 s')
await clickByText('Als Video exportieren')
console.log('Export gestartet, warte auf Ergebnis…')

const deadline = Date.now() + 45000
let note = ''
while (Date.now() < deadline) {
  await new Promise((r) => setTimeout(r, 1000))
  note = await page.evaluate(() => {
    const hints = [...document.querySelectorAll('.sm-hint')]
    const n = hints.find((h) => /exportiert|WebM|unterstützt|Fehler/i.test(h.textContent))
    return n ? n.textContent.trim() : ''
  })
  if (note) break
}
console.log(note ? `Ergebnis: ${note}` : 'TIMEOUT: kein Ergebnis-Hinweis erschienen')
await browser.close()
process.exitCode = note ? 0 : 1
