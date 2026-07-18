/**
 * Trustbridge Hero – Asset-Derivate.
 *
 * Erzeugt ausschliesslich NEUE Dateien unter public/assets/trustbridge/hero/.
 * Originale werden gelesen, niemals ueberschrieben.
 *
 * Aufruf:  node scripts/build-hero-assets.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { statSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/assets/trustbridge/hero');

const SOURCES = {
    // Verbindliches finales Branding (Original, 1024x1536)
    portal: path.join(ROOT, 'public/branding/Trustbridge Portal.png'),
    // 3D-Panther Referenz (Original, 2000x2000, transparent)
    panther: path.join(ROOT, 'public/branding/panther-mitte-nobg.png'),
};

/** Das Original ist 1024 breit -> nicht hochskalieren. */
const PORTAL_WIDTHS = [1024, 768, 512];
const PANTHER_WIDTHS = [900, 600];

const report = [];

async function emit(src, dir, base, widths, { avifQ = 62, webpQ = 82, alpha = false }) {
    await mkdir(path.join(OUT, dir), { recursive: true });
    for (const w of widths) {
        const pipeline = () => sharp(src).resize({ width: w, withoutEnlargement: true, kernel: 'lanczos3' });

        const avif = path.join(OUT, dir, `${base}-${w}.avif`);
        await pipeline().avif({ quality: avifQ, effort: 6 }).toFile(avif);

        const webp = path.join(OUT, dir, `${base}-${w}.webp`);
        await pipeline().webp({ quality: webpQ, effort: 6 }).toFile(webp);

        const png = path.join(OUT, dir, `${base}-${w}.png`);
        await pipeline().png({ compressionLevel: 9, palette: !alpha }).toFile(png);

        for (const f of [avif, webp, png]) {
            report.push([path.relative(ROOT, f), (statSync(f).size / 1024).toFixed(1) + ' KB']);
        }
    }
}

/** Winziges, unscharfes Standbild als sofort sichtbarer Platzhalter. */
async function emitPoster(src, name) {
    await mkdir(path.join(OUT, 'posters'), { recursive: true });
    const out = path.join(OUT, 'posters', `${name}.webp`);
    await sharp(src).resize({ width: 32 }).blur(1.4).webp({ quality: 60 }).toFile(out);
    report.push([path.relative(ROOT, out), (statSync(out).size / 1024).toFixed(1) + ' KB']);
}

/** Statischer Fallback fuer prefers-reduced-motion: exakt das Original. */
async function emitFallback() {
    await mkdir(path.join(OUT, 'fallbacks'), { recursive: true });
    const out = path.join(OUT, 'fallbacks', 'portal-static-1024.webp');
    await sharp(SOURCES.portal).webp({ quality: 88, effort: 6 }).toFile(out);
    report.push([path.relative(ROOT, out), (statSync(out).size / 1024).toFixed(1) + ' KB']);
}

await emit(SOURCES.portal, 'portal', 'portal-master', PORTAL_WIDTHS, { avifQ: 64, webpQ: 86 });
await emit(SOURCES.panther, 'panther', 'panther-guardian', PANTHER_WIDTHS, { avifQ: 60, webpQ: 84, alpha: true });
await emitPoster(SOURCES.portal, 'portal-lqip');
await emitFallback();

console.log('Erzeugte Dateien:');
for (const [f, s] of report) console.log('  ' + f.padEnd(68) + s);
