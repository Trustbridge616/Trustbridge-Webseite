// Trustbridge Kampagnen — strukturierte Post-Serien: Parser, Hintergrund-Mapping,
// Caption-Aufbau und Posting-Fahrplan. Prinzip aus der Creator-Recherche:
// EIN Gedanke pro Post, Hook auf dem Bild, Tiefe (Aussage + Frage) in der Caption.

// ── Signature-Serie 01: „Denköffner" — 10 Posts, Stand 27.07.2026 ──
export const SIGNATURE_KAMPAGNE = `### 1 · Perfekt ist nicht echt
HOOK: Nicht alles, was perfekt wirkt, ist echt.
AUSSAGE:
Man kann alles skripten.
Alles glätten.
Alles korrekt wirken lassen.

Doch oft fehlt genau dort das Herz.
FRAGE: Wie viel von dem, was du zeigst, bist wirklich du?
HINTERGRUND: Wald / Nebel / Minimal dunkel

### 2 · Du musst nicht alles wissen, um zu beginnen
HOOK: Du musst noch nicht wissen, wie alles aussehen wird.
AUSSAGE:
Manchmal reicht eine Vision.
Der Rest entsteht Schritt für Schritt.
FRAGE: Was würdest du beginnen, wenn du nicht erst den ganzen Weg kennen müsstest?
HINTERGRUND: Berge / Weg / Sonnenaufgang

### 3 · Theorie verändert noch kein Leben
HOOK: 100 Bücher zu lesen heißt noch nicht, dass du lebst, was du weißt.
AUSSAGE:
Theorie kann dir vieles erklären.
Doch Veränderung beginnt erst, wenn du es im Alltag anwendest.
FRAGE: Was weißt du längst — lebst es aber noch nicht?
HINTERGRUND: Schwarz / Gold / Minimal

### 4 · Manchmal muss man loslassen, um zu wachsen
HOOK: Manchmal musst du loslassen, um zu wachsen.
AUSSAGE:
Nicht alles, woran du festhältst, gibt dir Halt.
Manches hält dich nur davon ab, weiterzugehen.
FRAGE: Woran hältst du noch fest, obwohl es dich längst klein hält?
HINTERGRUND: Herbst / Blätter / Wald / Wind

### 5 · Probleme sind nicht das Ende
HOOK: Probleme sind nicht immer das Ende.
AUSSAGE:
Manchmal sind sie nur die Tür
zum nächsten größeren Ganzen.
FRAGE: Was wäre, wenn dein Problem gerade nicht gegen dich arbeitet — sondern für dich?
HINTERGRUND: Tür-Metapher / Waldweg / Licht am Ende

### 6 · Was würdest du erschaffen?
HOOK: Wenn alle Blockaden weg wären — was würdest du wirklich erschaffen?
AUSSAGE:
Nicht wie.
Nicht wann.
Nicht ob.

Sondern was.
FRAGE: Was möchtest du wirklich?
HINTERGRUND: weiter Blick / Himmel / Berglandschaft

### 7 · Die Reise ist das Ziel
HOOK: Vielleicht ist die Reise wirklich das Ziel.
AUSSAGE:
Nicht weil der Weg immer leicht ist.
Sondern weil du dich auf ihm selbst erkennst.
FRAGE: Was zeigt dir dein aktueller Weg gerade über dich selbst?
HINTERGRUND: Waldweg / Pfad / Sonnenuntergang

### 8 · Vertrauen beginnt nicht mit Sicherheit
HOOK: Vertrauen beginnt nicht, wenn alles klar ist.
AUSSAGE:
Vertrauen beginnt,
wenn du trotzdem den ersten Schritt gehst.
FRAGE: Welchen Schritt würdest du gehen, wenn du dir selbst mehr vertrauen würdest?
HINTERGRUND: Treppe / Weg / Bergpfad / Licht

### 9 · Du brauchst nicht mehr Maske. Du brauchst mehr du.
HOOK: Die Welt braucht nicht noch mehr perfekte Masken.
AUSSAGE:
Sie braucht mehr echte Menschen,
die sich trauen, sie selbst zu sein.
FRAGE: Wo spielst du noch eine Rolle, obwohl du längst du selbst sein willst?
HINTERGRUND: Schwarz / Mystisch / Portrait mit Schatten

### 10 · Der Traum wird oft von alten Geschichten blockiert
HOOK: Nicht dein Traum ist das Problem.
AUSSAGE:
Oft sind es die alten Geschichten,
die dir erzählen, warum du ihn nicht leben kannst.
FRAGE: Welche Geschichte hält dich noch von deinem Traum fern?
HINTERGRUND: dunkler Wald / Lichtstrahl / Brücke`

// ── Parser: ### trennt Posts, Schlüsselzeilen HOOK/AUSSAGE/FRAGE/HINTERGRUND,
//    mehrzeilige Felder laufen bis zum nächsten Schlüssel oder ### ──
export function parseKampagne(text) {
  const posts = []
  let cur = null
  let field = null
  for (const raw of String(text).replace(/\r/g, '').split('\n')) {
    const line = raw.trimEnd()
    const mTitle = line.match(/^###\s*(?:\d+\s*[·.:)\-]\s*)?(.+)$/)
    if (mTitle) {
      cur = { titel: mTitle[1].trim(), hook: '', aussage: '', frage: '', hintergrund: '' }
      posts.push(cur)
      field = null
      continue
    }
    if (!cur) continue
    const mKey = line.match(/^(HOOK|AUSSAGE|FRAGE|HINTERGRUND):\s*(.*)$/i)
    if (mKey) {
      field = mKey[1].toLowerCase()
      cur[field] = mKey[2]
      continue
    }
    if (field) cur[field] += (cur[field] ? '\n' : '') + line
  }
  return posts
    .map((p) => ({
      titel: p.titel.trim(),
      hook: p.hook.trim(),
      aussage: p.aussage.trim(),
      frage: p.frage.trim(),
      hintergrund: p.hintergrund.trim(),
    }))
    .filter((p) => p.hook)
}

// ── Hintergrund-Wunsch → vorhandenes Bild + Design-Anpassungen ──
// Reihenfolge = Priorität; `index` variiert bei mehreren Kandidaten (Wald 1/2),
// damit eine Serie nicht 5× dasselbe Foto trägt.
const BG_REGELN = [
  { re: /nebel/i, kandidaten: ['Nebel'] },
  { re: /wald|blätter|herbst/i, kandidaten: ['Wald 1', 'Wald 2'] },
  { re: /berg|himmel|blick/i, kandidaten: ['Berge'] },
  { re: /bach|fluss|wasser/i, kandidaten: ['Bach'] },
  { re: /sonn|licht|treppe/i, kandidaten: ['Sonnenuntergang'] },
  { re: /weg|pfad|straße|tür|brücke/i, kandidaten: ['Wald 2', 'Wald 1'] },
]

export function mapHintergrund(hint = '', backgrounds = [], index = 0) {
  const namen = backgrounds.map((b) => b.name)
  const out = { bgMode: 'schwarz', bgName: '', tweaks: {} }
  for (const r of BG_REGELN) {
    if (!r.re.test(hint)) continue
    const passend = r.kandidaten.filter((n) => namen.includes(n))
    if (passend.length) {
      out.bgMode = 'image'
      out.bgName = passend[index % passend.length]
      break
    }
  }
  // Kein Stichwort erkannt und auch nicht bewusst „Schwarz/Minimal" → erstes Bild
  if (out.bgMode === 'schwarz' && !/schwarz|minimal/i.test(hint) && namen.length) {
    out.bgMode = 'image'
    out.bgName = namen[0]
  }
  if (/gold/i.test(hint)) Object.assign(out.tweaks, { textColor: 'gold', accent: 'gold' })
  if (/mystisch/i.test(hint)) Object.assign(out.tweaks, { filter: 'mystisch', accent: 'violett' })
  if (/dunkel|schatten/i.test(hint)) Object.assign(out.tweaks, { darken: 75 })
  return out
}

// ── Caption: Hook → Aussage → Reflexionsfrage → klarer Folge-Grund ──
export function kampagnenCaption(post, followText = '@ben.trustbridge') {
  return [
    post.hook,
    post.aussage,
    post.frage,
    `➤ Folge ${followText} für Gedanken, die dich näher zu dir selbst bringen.`,
  ]
    .filter(Boolean)
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}

// ── Posting-Fahrplan (liegt als posting-plan.md im ZIP) ──
export function postingPlan(posts, { serie = '', followText = '@ben.trustbridge' } = {}) {
  const zeilen = posts.map((p, i) => `| Tag ${i * 2 + 1} | ${i + 1}. ${p.titel} | ${p.hook.split('\n')[0]} |`)
  return [
    `# Trustbridge Kampagnen-Fahrplan — ${posts.length} Posts${serie ? ` · Serie „${serie}"` : ''}`,
    '',
    '## Prinzipien (Creator-DNA)',
    '1. **Ein Gedanke pro Post** — deshalb einzelne Posts statt einem Sammel-Beitrag.',
    `2. **Wiederholbare Serie** — gleiche Überschrift, gleiches Layout-System. Der Nutzer erkennt das Format, bevor er den Accountnamen liest.`,
    '3. **Hook auf dem Bild, Tiefe in der Caption** — das Bild stoppt den Scroll, die Caption trägt Aussage + Reflexionsfrage.',
    `4. **Klarer Folge-Grund** — jede Caption endet mit: „Folge ${followText} für Gedanken, die dich näher zu dir selbst bringen."`,
    '5. **Plattformgerecht, markentreu** — 4:5 in den Feed, 9:16 am selben Tag als Story (Reflexionsfrage als Frage-Sticker), 1:1 als Reserve.',
    '',
    '## Veröffentlichungs-Rhythmus (Vorschlag: alle 2 Tage, immer gleiche Uhrzeit)',
    '| Wann | Post | Hook |',
    '|---|---|---|',
    ...zeilen,
    '',
    '- Nie zwei Posts am selben Tag — jeder Gedanke bekommt seinen Raum.',
    '- Story am Posttag: 9:16-Version + Frage-Sticker mit der Reflexionsfrage → Antworten sind Rohstoff für neue Posts.',
    '',
    '## Messen (48 h nach jedem Post in post.json eintragen)',
    '- Speicherungen und Teilungen zählen mehr als Likes.',
    '- Profilbesuche und neue Follower pro Post.',
    '- Kommentare mit echter inhaltlicher Reaktion.',
    '',
    '## Gewinner wiederholen',
    'Nach der Serie: die 2–3 stärksten Hooks als Varianten neu testen (A/B-Tab im Builder, ',
    'Instagram Trial Reels zeigt Tests zuerst Nicht-Followern).',
    '',
    '## Automatisch posten?',
    'Direktes Auto-Posting braucht die Meta Graph API (Instagram-Business-Konto + Meta-App + OAuth) —',
    'im Backend vorbereitet (`/api/social/connections`), aber noch nicht verbunden.',
    'Schnellster Weg heute: **Meta Business Suite** (business.facebook.com) → „Beitrag planen" →',
    'Bild hochladen + Inhalt aus caption.txt einfügen. Alle Posts sind so in ~15 Minuten terminiert.',
  ].join('\n')
}
