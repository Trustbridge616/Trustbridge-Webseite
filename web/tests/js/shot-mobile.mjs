import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>fs.existsSync(p))
const b = await puppeteer.launch({ executablePath: exe, headless: 'new' })
const p = await b.newPage()
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
await p.goto('http://127.0.0.1:8001/', { waitUntil: 'networkidle0', timeout: 40000 })
await new Promise(r=>setTimeout(r,3000))
const el = await p.$('.mobile-portals')
console.log(el ? 'mobile-portals im DOM ✓' : 'FEHLER: mobile-portals fehlt')
if (el) { await el.evaluate(e=>e.scrollIntoView({block:'center'})); await new Promise(r=>setTimeout(r,1500)) }
await p.screenshot({ path: process.argv[2] })
await b.close()
