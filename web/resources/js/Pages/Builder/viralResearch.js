// ═══════════════════════════════════════════════════════════════════════════
// Trustbridge — Viral-Recherche-Links
//
// Baut aus Spruch, Hashtags und Kategorien zielgenaue Deep-Links zu den
// Trend-/Such-Seiten der Plattformen. Ehrlich: Ohne Plattform-APIs gibt es
// keine „Viral-Rangliste" — aber Hashtag-/Suchseiten zeigen die reichweiten-
// stärksten Inhalte zum Thema zuerst (YouTube sogar explizit nach Aufrufen
// sortiert). Ein Klick → neuer Tab → sofort sehen, was zum Thema läuft.
// ═══════════════════════════════════════════════════════════════════════════

const STOPWORDS = new Set([
  'der', 'die', 'das', 'und', 'ist', 'sie', 'dir', 'dich', 'dein', 'deine', 'nicht',
  'ein', 'eine', 'einem', 'einen', 'mit', 'von', 'sich', 'den', 'dem', 'des', 'auf',
  'für', 'aus', 'hat', 'was', 'wer', 'wie', 'man', 'uns', 'wir', 'ich', 'du', 'es',
  'im', 'in', 'an', 'am', 'zu', 'so', 'nur', 'noch', 'wenn', 'dann', 'aber', 'oder',
  'auch', 'sehr', 'kann', 'mehr', 'als', 'bei', 'bis', 'vor', 'nach', 'über',
  'selten', 'immer', 'diese', 'dieser', 'dieses', 'darüber', 'erzählt', 'hier',
])

/** Bedeutungstragende Wörter aus dem Spruch (Kategorien zuerst) */
export function extractKeywords(text, kategorien = [], max = 3) {
  const words = String(text || '').toLowerCase()
    .replace(/[^a-zäöüß\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w))
  const freq = new Map()
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1)
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w)
  const kats = kategorien.map((k) => String(k).toLowerCase())
  return [...new Set([...kats, ...top])].slice(0, max)
}

function cleanTags(hashtags, max = 3) {
  return (hashtags || [])
    .map((h) => String(h).replace(/^#/, '').trim())
    .filter(Boolean)
    .slice(0, max)
}

/**
 * Liefert Plattform-Gruppen mit klickbaren Recherche-Links.
 * input: { text, hashtags: string[]|string, kategorien: string[] }
 */
export function buildViralLinks({ text = '', hashtags = [], kategorien = [] }) {
  const tagList = Array.isArray(hashtags) ? hashtags : String(hashtags).split(/\s+/)
  const tags = cleanTags(tagList)
  const kws = extractKeywords(text, kategorien)
  const q = encodeURIComponent(kws.join(' ') || 'mindset motivation')
  const enc = encodeURIComponent

  return [
    {
      platform: 'Instagram', icon: '📸',
      links: [
        ...tags.map((t) => ({ label: `#${t}`, url: `https://www.instagram.com/explore/tags/${enc(t)}/` })),
        ...(kws[0] ? [{ label: `Suche „${kws[0]}"`, url: `https://www.instagram.com/explore/search/keyword/?q=${enc(kws[0])}` }] : []),
        { label: 'Google: virale Reels', url: `https://www.google.com/search?q=${q}+viral+reel+site:instagram.com` },
      ],
    },
    {
      platform: 'TikTok', icon: '🎵',
      links: [
        ...tags.map((t) => ({ label: `#${t}`, url: `https://www.tiktok.com/tag/${enc(t)}` })),
        { label: `Suche „${kws.join(' ') || 'mindset'}"`, url: `https://www.tiktok.com/search?q=${q}` },
        { label: 'Google: virale TikToks', url: `https://www.google.com/search?q=${q}+viral+site:tiktok.com` },
      ],
    },
    {
      platform: 'Facebook', icon: '📘',
      links: [
        { label: `Beiträge zu „${kws[0] || 'Mindset'}"`, url: `https://www.facebook.com/search/posts/?q=${q}` },
        { label: 'Reels-Suche', url: `https://www.facebook.com/search/videos/?q=${q}` },
      ],
    },
    {
      platform: 'YouTube Shorts', icon: '▶️',
      links: [
        // sp=CAMSAhAB = nach Aufrufen sortiert — das Viralste zuerst
        { label: 'Shorts nach Aufrufen', url: `https://www.youtube.com/results?search_query=${q}+%23shorts&sp=CAMSAhAB` },
        { label: 'Aktuelle Shorts', url: `https://www.youtube.com/results?search_query=${q}+%23shorts&sp=CAISAhAB` },
      ],
    },
    {
      platform: 'X (Twitter)', icon: '𝕏',
      links: [
        // f=top = die reichweitenstärksten Posts zuerst
        { label: `Top-Posts zu „${kws[0] || 'Mindset'}"`, url: `https://x.com/search?q=${q}&f=top` },
        ...tags.slice(0, 2).map((t) => ({ label: `#${t}`, url: `https://x.com/hashtag/${enc(t)}?f=top` })),
        { label: 'Neueste Posts', url: `https://x.com/search?q=${q}&f=live` },
      ],
    },
    {
      platform: 'Pinterest', icon: '📌',
      links: [
        { label: `Pins zu „${kws[0] || 'Mindset'}"`, url: `https://www.pinterest.de/search/pins/?q=${q}` },
      ],
    },
    {
      platform: 'Google & Trends', icon: '🔎',
      links: [
        { label: 'Google Trends (DE)', url: `https://trends.google.de/trends/explore?geo=DE&q=${q}` },
        { label: 'Google-Suche „viral"', url: `https://www.google.com/search?q=${q}+viral+spruch` },
      ],
    },
  ]
}
