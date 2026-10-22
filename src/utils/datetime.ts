import { weddingConfig } from '../config/wedding'

/** Wall-clock ceremony start in the configured IANA timezone. */
export function getCeremonyStartDate(): Date {
  const { date, timeStart, timezone } = weddingConfig.ceremony
  const offset = getUtcOffsetForZone(timezone, `${date}T12:00:00`)
  return new Date(`${date}T${timeStart}:00${offset}`)
}

export function getCeremonyEndDate(): Date {
  const { date, timeEnd, timezone } = weddingConfig.ceremony
  const offset = getUtcOffsetForZone(timezone, `${date}T12:00:00`)
  return new Date(`${date}T${timeEnd}:00${offset}`)
}

function getUtcOffsetForZone(timeZone: string, isoProbe: string): string {
  const date = new Date(isoProbe)
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  }).formatToParts(date)
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+0'
  const m = tz.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/)
  if (!m) return 'Z'
  const sign = m[1]
  const hh = m[2].padStart(2, '0')
  const mm = (m[3] ?? '00').padStart(2, '0')
  return `${sign}${hh}:${mm}`
}

export function formatCeremonyDateDisplay(): { en: string; ta: string } {
  const start = getCeremonyStartDate()
  const { timezone } = weddingConfig.ceremony
  const en = new Intl.DateTimeFormat('en-IN', {
    timeZone: timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(start)

  const ta = new Intl.DateTimeFormat('ta-IN', {
    timeZone: timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(start)

  return { en, ta }
}

export function formatCeremonyTimeDisplay(): { en: string; ta: string } {
  const { timeStart, timeEnd, timezone } = weddingConfig.ceremony
  const to12 = (t: string) => {
    const d = new Date(`${weddingConfig.ceremony.date}T${t}:00${getUtcOffsetForZone(timezone, `${weddingConfig.ceremony.date}T12:00:00`)}`)
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d)
  }
  const en = `Between ${to12(timeStart)} and ${to12(timeEnd)}`
  const ta = `காலை ${timeStart.replace(':', '.')} மணிக்குமேல் ${timeEnd.replace(':', '.')} மணிக்குள்`
  return { en, ta }
}
