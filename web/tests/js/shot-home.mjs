import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>fs.existsSync(p))
const b = await puppeteer.launch({ executablePath: exe, headless: 'new' })
const p = await b.newPage()
await p.setViewport({ width: 1600, height: 1000 })
await p.goto('http://127.0.0.1:8001/', { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise(r=>setTimeout(r,2500))
const el = await p.$('.hero-shards-grid')
if (el) { await el.evaluate(e=>e.scrollIntoView({block:'center'})); await new Promise(r=>setTimeout(r,1200)) }
await p.screenshot({ path: process.argv[2] })
await b.close()
console.log('ok')
