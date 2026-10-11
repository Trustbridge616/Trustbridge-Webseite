// Trustbridge Astro — Prüfung gegen unabhängige Referenzwerte.
// Aufruf: npm run astro:verify
//
// Referenzen:
//  (1) Albert Einstein, 14.03.1879 11:30 LMT, Ulm (48°24'N 9°59'E) — veröffentlichte
//      Radix-Positionen und Placidus-Häuser (astrotheme.com, Abruf 12.10.2026).
//  (2) Scheinbare Sonnenlänge zur Epoche J2000.0 nach Meeus (Astronomical Algorithms):
//      L0 280.4665°, Mittelpunktsgleichung −0.0825°, Aberration −0.0057° → ≈ 280.378°.
//  (3) Totale Sonnenfinsternis 08.04.2024, größte Finsternis 18:17 UTC: Sonne und Mond
//      in Konjunktion bei ≈ 19°24' Widder (NASA Eclipse Web Site / Astronomical Almanac).
//  (4) Frühlingsäquinoktium 2026: 20.03.2026 14:46 UTC (Astronomical Almanac).
import * as A from 'astronomy-engine';
import { computeAstroFacts, eclipticOf } from './chart.mjs';

const results = [];
const angDiff = (a, b) => { const d = ((a - b) % 360 + 540) % 360 - 180; return Math.abs(d); };
const check = (name, actual, expected, tol, unit = '°') => {
  const diff = typeof actual === 'number' ? angDiff(actual, expected) : (actual === expected ? 0 : 1);
  const ok = diff <= tol;
  results.push(ok);
  const fmt = (v) => (typeof v === 'number' ? v.toFixed(3) : String(v));
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${name.padEnd(34)} ist ${fmt(actual).padStart(9)}  soll ${fmt(expected).padStart(9)}  Δ ${typeof actual === 'number' ? diff.toFixed(3) + unit : ''} (Toleranz ${tol}${unit})`);
};
const dms = (sign, d, m) => ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].indexOf(sign) * 30 + d + m / 60;

/* (1) Einstein */
console.log('\n[1] Albert Einstein — 14.03.1879 11:30 LMT Ulm, Referenz astrotheme.com (Placidus)');
const f = computeAstroFacts({
  birth_date: '1879-03-14', birth_time: '11:30',
  place: { name: 'Ulm', lat: 48.4, lon: 9.9833, tz: 'LMT' },
  house_system: 'placidus', transit_datetime: '2026-10-12T12:00:00Z',
});
const ref = {
  sun: ['pisces', 23, 30, 10], moon: ['sagittarius', 14, 32, 6], mercury: ['aries', 3, 9, 10], venus: ['aries', 16, 59, 10],
  mars: ['capricorn', 26, 55, 7], jupiter: ['aquarius', 27, 29, 9], saturn: ['aries', 4, 11, 10], uranus: ['virgo', 1, 17, 3],
  neptune: ['taurus', 7, 52, 11], pluto: ['taurus', 24, 44, 11],
};
for (const p of f.chart.planets) {
  const [sign, d, m, house] = ref[p.id];
  check(`${p.id} Länge`, p.lon, dms(sign, d, m), p.id === 'moon' ? 0.25 : 0.1);
  check(`${p.id} Placidus-Haus`, p.house.placidus, house, 0, '');
}
check('Aszendent', f.chart.angles.asc.lon, dms('cancer', 11, 38), 0.5);
check('MC', f.chart.angles.mc.lon, dms('pisces', 12, 50), 0.5);
check('Whole-Sign Haus 1 = 0° Krebs', f.chart.houses.whole_sign[0].lon, 90, 0.0001);
const cusps = f.chart.houses.placidus.map((c) => c.lon);
let ordered = true;
for (let i = 0; i < 12; i++) if (angDiff(cusps[(i + 1) % 12], cusps[i]) > 180 || ((cusps[(i + 1) % 12] - cusps[i] + 360) % 360) > 180) ordered = false;
check('Placidus-Spitzen fortlaufend', ordered ? 'ja' : 'nein', 'ja', 0, '');
console.log('    Placidus-Spitzen: ' + f.chart.houses.placidus.map((c, i) => `${i + 1}:${c.sign.slice(0, 3)} ${c.degree}°${String(c.minute).padStart(2, '0')}'`).join('  '));
console.log(`    UTC-Zeit: ${f.input.utc_datetime} (Versatz ${f.input.place.utc_offset_minutes} min)`);

/* (2) J2000 Sonne */
console.log('\n[2] Scheinbare Sonnenlänge J2000.0 (Meeus)');
check('Sonne J2000', eclipticOf(A.Body.Sun, A.MakeTime(new Date('2000-01-01T12:00:00Z'))).lon, 280.378, 0.02);

/* (3) Sonnenfinsternis 2024 */
console.log('\n[3] Totale Sonnenfinsternis 08.04.2024 18:17 UTC');
const te = A.MakeTime(new Date('2024-04-08T18:17:00Z'));
const sunE = eclipticOf(A.Body.Sun, te).lon, moonE = eclipticOf(A.Body.Moon, te).lon;
check('Sonne', sunE, dms('aries', 19, 24), 0.1);
check('Mond − Sonne (Konjunktion)', angDiff(moonE, sunE), 0, 0.3);

/* (4) Äquinoktium 2026 */
console.log('\n[4] Frühlingsäquinoktium 2026 (Astronomical Almanac: 20.03.2026 14:46 UTC)');
const eq = A.SearchSunLongitude(0, A.MakeTime(new Date('2026-03-15T00:00:00Z')), 10);
const eqMinutes = (eq.date.getTime() - Date.UTC(2026, 2, 20, 14, 46)) / 60000;
console.log(`    berechnet: ${eq.date.toISOString()}`);
check('Zeitpunkt (Minuten Abweichung)', Math.abs(eqMinutes), 0, 10, ' min');

const failed = results.filter((r) => !r).length;
console.log(`\n${results.length - failed}/${results.length} Prüfungen bestanden${failed ? ` — ${failed} FEHLGESCHLAGEN` : ''}`);
process.exit(failed ? 1 : 0);
