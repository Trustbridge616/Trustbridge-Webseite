#!/usr/bin/env bash
# Trustbridge Hero – Portalvideo aufbereiten.
#
# Quelle ist die unveraenderte Higgsfield-Ausgabe unter
# public/assets/trustbridge/hero/archive/. Diese Datei wird nur gelesen.
#
# Schritte:
#   1. Die schwarzen 9:16-Balken wegschneiden, zurueck auf das
#      Originalseitenverhaeltnis 2:3 (1024x1536).
#   2. Tonspur vollstaendig entfernen (-an).
#   3. Desktop- und Mobile-Fassung als WebM (VP9) und MP4 (H.264).
#   4. Posterbild aus dem ersten Frame.
#
# Aufruf:  bash scripts/build-hero-video.sh [variante]
set -euo pipefail

VAR="${1:-A}"
SRC="public/assets/trustbridge/hero/archive/portal-var-${VAR}.mp4"
OUT="public/assets/trustbridge/hero/portal"
POSTER="public/assets/trustbridge/hero/posters"

FFBIN="$(ls -d "$HOME"/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg*/*/bin 2>/dev/null | head -1 || true)"
[ -n "$FFBIN" ] && export PATH="$FFBIN:$PATH"

# Die Referenz wurde von 1024x1536 auf 1024x1820 gepolstert (142 px oben/unten)
# und als 1080x1920 gerendert. 142 * 1080/1024 = 150.
CROP="crop=1080:1620:0:150"

mkdir -p "$OUT" "$POSTER"

echo "Quelle: $SRC"

# --- Desktop: 720x1080 ---
ffmpeg -y -v error -i "$SRC" -an -vf "${CROP},scale=720:1080:flags=lanczos" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p "$OUT/portal-loop-desktop.webm"

ffmpeg -y -v error -i "$SRC" -an -vf "${CROP},scale=720:1080:flags=lanczos" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -pix_fmt yuv420p \
  -movflags +faststart "$OUT/portal-loop-desktop.mp4"

# --- Mobile: 480x720 ---
ffmpeg -y -v error -i "$SRC" -an -vf "${CROP},scale=480:720:flags=lanczos" \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  -pix_fmt yuv420p "$OUT/portal-loop-mobile.webm"

ffmpeg -y -v error -i "$SRC" -an -vf "${CROP},scale=480:720:flags=lanczos" \
  -c:v libx264 -crf 29 -preset slow -profile:v high -pix_fmt yuv420p \
  -movflags +faststart "$OUT/portal-loop-mobile.mp4"

# --- Poster: erster Frame, entspricht dem Originalmotiv ---
ffmpeg -y -v error -i "$SRC" -vf "${CROP},scale=720:1080:flags=lanczos" \
  -frames:v 1 "$POSTER/portal-poster.png"
node -e "
const sharp=require('sharp');
sharp('$POSTER/portal-poster.png').webp({quality:82,effort:6}).toFile('$POSTER/portal-poster.webp')
  .then(()=>require('fs').unlinkSync('$POSTER/portal-poster.png'));"

echo
echo "Ergebnis:"
for f in "$OUT"/portal-loop-*.webm "$OUT"/portal-loop-*.mp4 "$POSTER"/portal-poster.webp; do
  printf '  %-62s %6.2f MB\n' "${f#public/}" "$(du -b "$f" | cut -f1 | awk '{print $1/1048576}')"
done
