import puppeteer from 'puppeteer-core'
import fs from 'node:fs'

const exePaths = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]
const exe = exePaths.find((p) => fs.existsSync(p))
const outDir = process.argv[2]
const browser = await puppeteer.launch({ executablePath: exe, headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1680, height: 1100 })
await page.goto('http://127.0.0.1:8001/builder/instagram', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 2500))
const btns = await page.$$('.ce-tabs button')
for (const b of btns) {
  const t = await b.evaluate((el) => el.textContent.trim())
  if (t.includes('Viral')) { await b.click(); break }
}
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: `${outDir}/builder-viral.png` })
console.log('✓ builder-viral')
await browser.close()
