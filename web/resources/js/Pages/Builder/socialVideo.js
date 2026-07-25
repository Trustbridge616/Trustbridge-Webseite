// ═══════════════════════════════════════════════════════════════════════════
// Trustbridge Social — Bild-zu-Video-Rendering (Reels / TikTok)
//
// Rendert einen statischen Post als ruhiges Bewegtbild über Canvas +
// MediaRecorder. Trustbridge-Stil: langsam, hochwertig, keine Hektik.
//
// Container: MP4 (H.264) wenn der Browser MediaRecorder-MP4 unterstützt
// (Safari, neuere Chrome-Versionen), sonst WebM (VP9). Der tatsächliche
// Container wird zurückgegeben — die UI zeigt ihn ehrlich an.
// ═══════════════════════════════════════════════════════════════════════════

export const VIDEO_MOTIONS = {
  statisch:   { label: 'Statisch' },
  'zoom-in':  { label: 'Sanfter Zoom-in' },
  'zoom-out': { label: 'Sanfter Zoom-out' },
  drift:      { label: 'Vertikaler Drift' },
  parallax:   { label: 'Leichter Parallax' },
  fade:       { label: 'Texte einblenden' },
  staffel:    { label: '✨ Gestaffelt aufpoppen' },
}

export const VIDEO_DURATIONS = [5, 7, 10, 15]

function pickMime() {
  if (typeof MediaRecorder === 'undefined') return null
  const candidates = [
    { mime: 'video/mp4;codecs=avc1.640028,mp4a.40.2', ext: 'mp4' },
    { mime: 'video/mp4;codecs=avc1', ext: 'mp4' },
    { mime: 'video/mp4', ext: 'mp4' },
    { mime: 'video/webm;codecs=vp9', ext: 'webm' },
    { mime: 'video/webm', ext: 'webm' },
  ]
  for (const c of candidates) if (MediaRecorder.isTypeSupported(c.mime)) return c
  return null
}

/** ease in/out für ruhige Bewegungen */
const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

/**
 * renderFrame(ctx, {zoom, driftY, textAlpha}) zeichnet einen kompletten Frame.
 * Rückgabe: { blob, ext, mime } — oder wirft bei fehlender Browser-Unterstützung.
 */
export async function renderSocialVideo({ width, height, durationSec, motion, renderFrame, fps = 30, onProgress }) {
  const picked = pickMime()
  if (!picked) throw new Error('Dieser Browser unterstützt keinen Video-Export (MediaRecorder fehlt).')

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const stream = canvas.captureStream(fps)
  const recorder = new MediaRecorder(stream, { mimeType: picked.mime, videoBitsPerSecond: 12_000_000 })
  const chunks = []
  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data) }

  const totalFrames = Math.round(durationSec * fps)
  const done = new Promise((resolve) => { recorder.onstop = resolve })
  recorder.start()

  for (let f = 0; f <= totalFrames; f++) {
    const t = f / totalFrames
    const e = ease(t)
    let zoom = 1, driftY = 0, textAlpha = 1
    switch (motion) {
      case 'zoom-in':  zoom = 1 + 0.07 * e; break
      case 'zoom-out': zoom = 1.07 - 0.07 * e; break
      case 'drift':    zoom = 1.05; driftY = (e - 0.5) * height * 0.035; break
      case 'parallax': zoom = 1.05; driftY = Math.sin(t * Math.PI) * height * 0.02; break
      case 'fade':     textAlpha = Math.min(1, t * 2.2); break
      case 'staffel':  zoom = 1 + 0.05 * e; break // Ebenen-Timing macht der Aufrufer
      default: break
    }
    renderFrame(ctx, { t, zoom, driftY, textAlpha })
    if (onProgress && f % fps === 0) onProgress(Math.round(t * 100))
    // reale Frame-Taktung, damit captureStream die Frames mitnimmt
    await new Promise((r) => setTimeout(r, 1000 / fps))
  }

  recorder.stop()
  await done
  return { blob: new Blob(chunks, { type: picked.mime }), ext: picked.ext, mime: picked.mime }
}
