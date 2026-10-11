#!/usr/bin/env node
/*
  Trustbridge Astro — Berechnungsschicht (Phase 0/1)
  ---------------------------------------------------
  Radix, Häuser (Placidus + Whole Sign), Aspekte, Transite, Mondphase und
  mittlerer Mondknoten aus echten Ephemeriden (astronomy-engine, MIT).
  Nie aus dem Sprachmodell. Ausgabe nach resources/finder/schemas/astro-facts.schema.json.

  CLI:  node astro/chart.mjs '{"birth_date":"1879-03-14","birth_time":"11:30","place":{"name":"Ulm","lat":48.4,"lon":9.9833,"tz":"LMT"}}'
        node astro/chart.mjs < input.json
  Modul: import { computeAstroFacts } from './chart.mjs'

  Eingabe: { birth_date "YYYY-MM-DD", birth_time "HH:MM"|null, place {name, lat, lon, tz},
             house_system? "placidus"|"whole_sign", transit_datetime? ISO, orbs? }
  tz: IANA-Zone (z. B. "Europe/Berlin") oder "LMT" = Ortszeit nach Länge (historische Daten
  vor Einführung der Zonenzeit, 4 Minuten je Längengrad).
*/
import * as A from 'astronomy-engine';
import { pathToFileURL } from 'node:url';
import { readFileSync } from 'node:fs';

export const ENGINE = { name: 'trustbridge-astro', version: '0.1.0', library: 'astronomy-engine@2.1.19' };

const SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const PLANETS = [
  ['sun', A.Body.Sun], ['moon', A.Body.Moon], ['mercury', A.Body.Mercury], ['venus', A.Body.Venus], ['mars', A.Body.Mars],
  ['jupiter', A.Body.Jupiter], ['saturn', A.Body.Saturn], ['uranus', A.Body.Uranus], ['neptune', A.Body.Neptune], ['pluto', A.Body.Pluto],
];
const ASPECTS = [['conjunction', 0], ['opposition', 180], ['trine', 120], ['square', 90], ['sextile', 60]];
export const DEFAULT_ORBS = { conjunction: 8, opposition: 8, trine: 7, square: 7, sextile: 5, transit: 3 };

const norm = (d) => ((d % 360) + 360) % 360;
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const round = (x, n = 4) => Number(x.toFixed(n));
/* kleinster Winkelabstand, vorzeichenbehaftet in (-180, 180] */
const delta = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d; };

/* ── Positionen ─────────────────────────────────────────────── */

export function position(lon) {
  lon = norm(lon);
  const signIndex = Math.floor(lon / 30);
  const inSign = lon - signIndex * 30;
  let degree = Math.floor(inSign);
  let minute = Math.round((inSign - degree) * 60);
  if (minute === 60) { minute = 0; degree += 1; }
  if (degree === 30) { degree = 29; minute = 59; }
  return { lon: round(lon), sign: SIGNS[signIndex], degree, minute };
}

/* Wahre (scheinbare) geozentrische ekliptikale Länge des Datums */
export function eclipticOf(body, time) {
  if (body === A.Body.Moon) {
    const m = A.EclipticGeoMoon(time);
    return { lon: norm(m.lon), lat: m.lat };
  }
  const e = A.Ecliptic(A.GeoVector(body, time, true));
  return { lon: norm(e.elon), lat: e.elat };
}

function planetAt(id, body, time) {
  const p = eclipticOf(body, time);
  const before = eclipticOf(body, time.AddDays(-0.5)).lon;
  const after = eclipticOf(body, time.AddDays(0.5)).lon;
  const speed = delta(after, before);
  return { id, ...position(p.lon), lat: round(p.lat), speed: round(speed), retrograde: speed < 0 };
}

/* ── Zeit und Ort ───────────────────────────────────────────── */

function tzOffsetMinutes(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p = {};
  for (const part of dtf.formatToParts(date)) if (part.type !== 'literal') p[part.type] = Number(part.value);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return Math.round((asUtc - date.getTime()) / 60000);
}

/* Wandzeit am Ort → UTC. Bei IANA-Zonen iterativ (Sommerzeit, historische Versätze). */
export function localToUtc({ date, time, tz, lon }) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = (time ?? '12:00').split(':').map(Number);
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  if (tz === 'LMT') {
    const offset = lon * 4; // 4 Minuten je Längengrad
    return { utc: new Date(wall - offset * 60000), offset: round(offset, 2) };
  }
  let offset = 0;
  for (let i = 0; i < 4; i++) {
    const next = tzOffsetMinutes(new Date(wall - offset * 60000), tz);
    if (next === offset) break;
    offset = next;
  }
  return { utc: new Date(wall - offset * 60000), offset };
}

/* ── Winkel und Häuser ──────────────────────────────────────── */

/* RAMC = Rektaszension des MC = lokale scheinbare Sternzeit in Grad */
export function ramcOf(time, lon) {
  return norm((A.SiderealTime(time) + lon / 15) * 15);
}

export function angles(ramc, lat, eps) {
  const R = rad(ramc), F = rad(lat), E = rad(eps);
  const mc = norm(deg(Math.atan2(Math.sin(R), Math.cos(R) * Math.cos(E))));
  const asc = norm(deg(Math.atan2(Math.cos(R), -(Math.sin(R) * Math.cos(E) + Math.tan(F) * Math.sin(E)))));
  return { asc, mc, dsc: norm(asc + 180), ic: norm(mc + 180) };
}

/* Placidus: Spitzen 11/12 (über dem Horizont) und 2/3 (darunter) als
   Drittel der Halbbögen, iterativ gelöst; die übrigen sind Gegenpunkte.
   Jenseits der Polarkreise nicht definiert → null. */
export function placidusCusps(ramc, lat, eps) {
  if (Math.abs(lat) >= 90 - eps) return null;
  const F = rad(lat), E = rad(eps);
  const raToLon = (ra) => norm(deg(Math.atan2(Math.sin(rad(ra)), Math.cos(rad(ra)) * Math.cos(E))));
  const solve = (offset, factor, above) => {
    let ra = norm(ramc + offset);
    for (let i = 0; i < 200; i++) {
      const x = Math.max(-1, Math.min(1, Math.sin(rad(ra)) * Math.tan(E) * Math.tan(F)));
      const next = above
        ? norm(ramc + factor * deg(Math.acos(-x)))
        : norm(ramc + 180 - factor * deg(Math.acos(x)));
      const done = Math.abs(delta(next, ra)) < 1e-8;
      ra = next;
      if (done) break;
    }
    return raToLon(ra);
  };
  const c11 = solve(30, 1 / 3, true);
  const c12 = solve(60, 2 / 3, true);
  const c2 = solve(120, 2 / 3, false);
  const c3 = solve(150, 1 / 3, false);
  const { asc, mc } = angles(ramc, lat, eps);
  return [asc, c2, c3, norm(mc + 180), norm(c11 + 180), norm(c12 + 180), norm(asc + 180), norm(c2 + 180), norm(c3 + 180), mc, c11, c12];
}

export function wholeSignCusps(asc) {
  const start = Math.floor(norm(asc) / 30) * 30;
  return Array.from({ length: 12 }, (_, i) => norm(start + i * 30));
}

export function houseOf(lon, cusps) {
  if (!cusps) return null;
  for (let i = 0; i < 12; i++) {
    const a = cusps[i], b = cusps[(i + 1) % 12];
    if (norm(lon - a) < norm(b - a)) return i + 1;
  }
  return 12;
}

/* ── Aspekte, Mondphase, Knoten, Zyklen ─────────────────────── */

export function aspectsBetween(points, orbs, pairs) {
  const out = [];
  for (const [a, b] of pairs) {
    const d = Math.abs(delta(points[a], points[b]));
    let best = null;
    for (const [type, angle] of ASPECTS) {
      const orb = Math.abs(d - angle);
      if (orb <= (orbs[type] ?? 0) && (!best || orb < best.orb)) best = { a, b, type, orb: round(orb, 2) };
    }
    if (best) out.push(best);
  }
  return out;
}

const PHASE_NAMES = ['neumond', 'zunehmende_sichel', 'erstes_viertel', 'zunehmender_mond', 'vollmond', 'abnehmender_mond', 'letztes_viertel', 'abnehmende_sichel'];
export function moonPhase(time) {
  const angle = norm(A.MoonPhase(time));
  const name = PHASE_NAMES[Math.floor(norm(angle + 22.5) / 45)];
  return { angle: round(angle, 2), name };
}

/* Mittlerer aufsteigender Mondknoten (Meeus, Astronomical Algorithms Kap. 47) */
export function meanNode(time) {
  const T = time.tt / 36525;
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T * T * T) / 467441 - (T * T * T * T) / 60616000);
}

/* ── Hauptfunktion ──────────────────────────────────────────── */

export function computeAstroFacts(input) {
  const errors = [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input?.birth_date ?? '')) errors.push('birth_date fehlt oder ist nicht YYYY-MM-DD');
  if (input?.birth_time != null && !/^\d{2}:\d{2}$/.test(input.birth_time)) errors.push('birth_time muss HH:MM sein');
  const place = input?.place ?? {};
  if (typeof place.lat !== 'number' || typeof place.lon !== 'number' || !place.tz) errors.push('place.lat, place.lon und place.tz sind erforderlich');
  if (errors.length) throw new Error(errors.join('; '));

  const orbs = { ...DEFAULT_ORBS, ...(input.orbs ?? {}) };
  const houseSystem = input.house_system === 'whole_sign' ? 'whole_sign' : 'placidus';
  const timeKnown = input.birth_time != null;
  const notes = [];

  const { utc, offset } = localToUtc({ date: input.birth_date, time: input.birth_time, tz: place.tz, lon: place.lon });
  const time = A.MakeTime(utc);
  const eps = A.e_tilt(time).tobl;

  // Radix-Planeten
  const planets = PLANETS.map(([id, body]) => planetAt(id, body, time));

  // Winkel und Häuser nur mit bekannter Geburtszeit
  let ramc = null, ang = null, placidus = null, wholeSign = null;
  if (timeKnown) {
    ramc = ramcOf(time, place.lon);
    ang = angles(ramc, place.lat, eps);
    placidus = placidusCusps(ramc, place.lat, eps);
    wholeSign = wholeSignCusps(ang.asc);
    if (!placidus) notes.push('Placidus ist jenseits der Polarkreise nicht definiert; nur Whole Sign verfügbar.');
  } else {
    notes.push('Geburtszeit unbekannt: Berechnung für 12:00 Ortszeit. Aszendent, MC und Häuser entfallen; die Mondposition kann um bis zu ±7° abweichen.');
  }
  for (const p of planets) p.house = { placidus: houseOf(p.lon, placidus), whole_sign: houseOf(p.lon, wholeSign) };

  const nodeLon = meanNode(time);
  const natalPoints = Object.fromEntries(planets.map((p) => [p.id, p.lon]));
  natalPoints.north_node = nodeLon;
  if (ang) { natalPoints.asc = ang.asc; natalPoints.mc = ang.mc; }

  const planetIds = planets.map((p) => p.id);
  const natalPairs = [];
  for (let i = 0; i < planetIds.length; i++) for (let j = i + 1; j < planetIds.length; j++) natalPairs.push([planetIds[i], planetIds[j]]);
  if (ang) for (const id of planetIds) { natalPairs.push([id, 'asc']); natalPairs.push([id, 'mc']); }

  // Transite
  const transitDate = input.transit_datetime ? new Date(input.transit_datetime) : new Date();
  const tTime = A.MakeTime(transitDate);
  const transitPlanets = PLANETS.map(([id, body]) => planetAt(id, body, tTime));
  for (const p of transitPlanets) p.house = { placidus: houseOf(p.lon, placidus), whole_sign: houseOf(p.lon, wholeSign) };
  const transitPoints = Object.fromEntries(transitPlanets.map((p) => [p.id, p.lon]));
  transitPoints.north_node = meanNode(tTime);

  const toNatal = [];
  for (const t of Object.keys(transitPoints)) {
    for (const n of Object.keys(natalPoints)) {
      const d = Math.abs(delta(transitPoints[t], natalPoints[n]));
      for (const [type, angle] of ASPECTS) {
        const orb = Math.abs(d - angle);
        if (orb <= orbs.transit) toNatal.push({ transit: t, natal: n, type, orb: round(orb, 2) });
      }
    }
  }

  const cycleDefs = [
    ['saturn_return', 'saturn', 'saturn', 0, 'Saturn kehrt an seine Radix-Position zurück (ca. alle 29,5 Jahre).'],
    ['jupiter_return', 'jupiter', 'jupiter', 0, 'Jupiter kehrt an seine Radix-Position zurück (ca. alle 12 Jahre).'],
    ['uranus_opposition', 'uranus', 'uranus', 180, 'Uranus steht seiner Radix-Position gegenüber (ca. im 40.–42. Lebensjahr).'],
    ['nodal_return', 'north_node', 'north_node', 0, 'Der mittlere Mondknoten kehrt an seine Radix-Position zurück (ca. alle 18,6 Jahre).'],
  ];
  const cycles = cycleDefs.map(([id, t, n, angle, description]) => {
    const orb = Math.abs(Math.abs(delta(transitPoints[t], natalPoints[n])) - angle);
    return { id, active: orb <= orbs.transit, description, orb: round(orb, 2) };
  });

  const ageYears = (transitDate.getTime() - utc.getTime()) / (365.25 * 86400000);

  return {
    engine: { ...ENGINE, computed_at: new Date().toISOString() },
    input: {
      birth_date: input.birth_date,
      birth_time: timeKnown ? input.birth_time : null,
      time_known: timeKnown,
      place: { name: place.name ?? '', lat: place.lat, lon: place.lon, tz: place.tz, utc_offset_minutes: offset },
      utc_datetime: utc.toISOString(),
      house_system_requested: houseSystem,
    },
    chart: {
      julian_day: round(time.ut + 2451545.0, 6),
      obliquity: round(eps, 6),
      ramc: ramc == null ? null : round(ramc),
      angles: ang ? { asc: position(ang.asc), mc: position(ang.mc), dsc: position(ang.dsc), ic: position(ang.ic) } : null,
      planets,
      houses: {
        placidus: placidus ? placidus.map(position) : null,
        whole_sign: wholeSign ? wholeSign.map(position) : null,
      },
      aspects: aspectsBetween(natalPoints, orbs, natalPairs),
      points: { north_node: position(nodeLon), south_node: position(nodeLon + 180) },
      moon_phase: moonPhase(time),
    },
    transits: {
      datetime: transitDate.toISOString(),
      positions: transitPlanets,
      to_natal: toNatal,
      moon_phase: moonPhase(tTime),
      cycles,
      age_years: round(ageYears, 2),
    },
    notes,
  };
}

/* ── CLI ────────────────────────────────────────────────────── */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const raw = process.argv[2] ?? readFileSync(0, 'utf8');
  try {
    const facts = computeAstroFacts(JSON.parse(raw));
    process.stdout.write(JSON.stringify(facts, null, 2));
  } catch (e) {
    process.stderr.write(JSON.stringify({ error: e.message }) + '\n');
    process.exit(1);
  }
}
