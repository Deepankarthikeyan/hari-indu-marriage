import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay, formatEventTimeRange } from '../../utils/datetime'
import { downloadIcsForEvent } from '../../utils/calendar'
import { reveal } from '../motion'

export default function CeremonySection() {
  const cd = useCeremonyCountdown()
  const event = weddingConfig.events[0]
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  if (!event) return null

  return (
    <section id="ceremony" className="e-ceremony">
      <div className="e-container">
        <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="e-chapter-label">Chapter III</p>
          <h2 className="e-title">Sacred Ceremony</h2>
          <p className="e-subtitle tamil">{event.nameTa}</p>
        </motion.header>
        <div className="e-ceremony__layout" style={{ marginTop: '2rem' }}>
          <motion.article className="e-event-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="e-event-card__tag">Muhurtham</p>
            <h3>{event.nameEn}</h3>
            <ul className="e-event-card__meta">
              <li>{date.en}</li>
              <li>{formatEventTimeRange(event)} · {time.ta}</li>
              <li>{event.venueName}</li>
              <li>{event.address}</li>
            </ul>
            <button type="button" className="e-btn" style={{ marginTop: '1.25rem' }} onClick={() => downloadIcsForEvent(event)}>
              Add to calendar
            </button>
          </motion.article>
          <motion.div className="e-countdown-ring" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="e-chapter-label">Until we wed</p>
            {cd.isPast ? (
              <p className="e-title" style={{ fontSize: '1.5rem' }}>Today is our day</p>
            ) : (
              <div className="e-countdown-units">
                <div className="e-countdown-unit"><strong>{String(cd.days).padStart(2, '0')}</strong><span>Days</span></div>
                <div className="e-countdown-unit"><strong>{String(cd.hours).padStart(2, '0')}</strong><span>Hours</span></div>
                <div className="e-countdown-unit"><strong>{String(cd.minutes).padStart(2, '0')}</strong><span>Minutes</span></div>
                <div className="e-countdown-unit"><strong>{String(cd.seconds).padStart(2, '0')}</strong><span>Seconds</span></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
