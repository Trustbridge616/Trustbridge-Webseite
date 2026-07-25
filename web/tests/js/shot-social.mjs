import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const exePaths = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const exe = exePaths.find((p) => fs.existsSync(p))
if (!exe) { console.error('Kein Chrome/Edge gefunden'); process.exit(1) }

const outDir = process.argv[2]
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new', args: ['--force-device-scale-factor=1'] })
const page = await browser.newPage()
await page.setViewport({ width: 1680, height: 1100 })

const shots = [
  ['master', 'social-master'],
  ['instagram', 'social-instagram-feed'],
  ['tiktok', 'social-tiktok'],
  ['facebook', 'social-facebook'],
  ['alle', 'social-alle'],
]
for (const [tab, name] of shots) {
  await page.goto(`http://127.0.0.1:8001/social/${tab}`, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 2500))
  await page.screenshot({ path: `${outDir}/${name}.png` })
  console.log(`✓ ${name}`)
}

// TikTok mit Plattform-UI-Overlay: Button klicken
await page.goto('http://127.0.0.1:8001/social/tiktok', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 2000))
const btns = await page.$$('button')
for (const b of btns) {
  const t = await b.evaluate((el) => el.textContent.trim())
  if (t === 'Plattform-UI anzeigen') { await b.click(); break }
}
await new Promise((r) => setTimeout(r, 1200))
await page.screenshot({ path: `${outDir}/social-tiktok-ui.png` })
console.log('✓ social-tiktok-ui')

await browser.close()
