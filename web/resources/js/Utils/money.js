// Geld nur als Integer-Cents. Division durch 100 ausschließlich für die
// Anzeige (Intl.NumberFormat) — nie für Berechnungen.

const eurFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

export function formatCents(cents) {
  return eurFormatter.format((Number(cents) || 0) / 100)
}

/**
 * "6.000,00", "6000", "6000.00" oder "6000,5" → Integer-Cents (600000 …).
 * String-Parsing ohne Float-Arithmetik. Gibt null bei unlesbarer Eingabe.
 */
export function parseToCents(input) {
  let value = String(input ?? '').trim().replace(/[€\s ]/g, '')
  if (!value) return null

  if (value.includes(',')) {
    // deutsches Format: Punkt = Tausendertrenner
    value = value.replace(/\./g, '').replace(',', '.')
  }

  const match = value.match(/^(-?)(\d+)(?:\.(\d{1,2}))?$/)
  if (!match) return null

  const sign = match[1] === '-' ? -1 : 1
  const whole = parseInt(match[2], 10)
  const fraction = parseInt((match[3] ?? '').padEnd(2, '0') || '0', 10)

  return sign * (whole * 100 + fraction)
}

/**
 * Menge "1", "0,5", "1.25" → Milli-Integer (1000, 500, 1250).
 */
export function parseQuantityToMilli(input) {
  const value = String(input ?? '').trim().replace(',', '.')
  const match = value.match(/^(\d+)(?:\.(\d{1,3}))?$/)
  if (!match) return null

  const whole = parseInt(match[1], 10)
  const fraction = parseInt((match[2] ?? '').padEnd(3, '0') || '0', 10)

  return whole * 1000 + fraction
}

export function formatQuantity(quantityMilli) {
  const milli = Number(quantityMilli) || 0
  const whole = Math.trunc(milli / 1000)
  const fraction = milli % 1000
  if (fraction === 0) return String(whole)
  return `${whole},${String(fraction).padStart(3, '0').replace(/0+$/, '')}`
}

/** Positionssumme wie im Backend: half-up auf ganze Cents, Integer-Arithmetik. */
export function lineTotalCents(unitPriceCents, quantityMilli) {
  const price = Number(unitPriceCents) || 0
  const qty = Number(quantityMilli) || 0
  return Math.floor((price * qty + 500) / 1000)
}
