import { weddingConfig, type WeddingEvent } from '../config/wedding'
import { getCeremonyEndDate, getCeremonyStartDate, getEventEndDate, getEventStartDate } from './datetime'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toIcsUtc(date: Date): string {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

export function downloadWeddingIcs(): void {
  const { ceremony, couple } = weddingConfig
  const start = getCeremonyStartDate()
  const end = getCeremonyEndDate()

  const summary = `Wedding — ${couple.bride.nameEn} & ${couple.groom.nameEn}`
  const location = [ceremony.venueName, ceremony.address].filter(Boolean).join(', ')
  const description = weddingConfig.invitation.closingEn

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//hari-indu-marriage//EN',
    'BEGIN:VEVENT',
    `UID:${ceremony.date}-wedding@hari-indu-marriage`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${summary.replace(/\n/g, ' ')}`,
    `DESCRIPTION:${description.replace(/\n/g, ' ')}`,
    `LOCATION:${location.replace(/\n/g, ' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'wedding-invitation.ics'
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadIcsForEvent(event: WeddingEvent): void {
  const { couple } = weddingConfig
  const start = getEventStartDate(event)
  const end = getEventEndDate(event)
  const summary = `${event.nameEn} — ${couple.bride.nameEn} & ${couple.groom.nameEn}`
  const location = [event.venueName, event.address].filter(Boolean).join(', ')

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//hari-indu-marriage//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}-${event.date}@hari-indu-marriage`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${summary.replace(/\n/g, ' ')}`,
    `LOCATION:${location.replace(/\n/g, ' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.id}-wedding.ics`
  a.click()
  URL.revokeObjectURL(url)
}
