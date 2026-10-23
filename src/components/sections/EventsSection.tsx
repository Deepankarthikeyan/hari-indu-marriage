import { motion } from 'framer-motion'
import { weddingConfig, type WeddingEvent } from '../../config/wedding'
import SectionShell from '../wedding/SectionShell'
import { reveal, stagger } from '../motion'
import './EventsSection.css'

const ritualIcon: Record<string, string> = {
  muhurtham: '🪔',
  nichayathartham: '🪷',
  reception: '🎊',
  default: '✦',
}

function EventItem({ event, index }: { event: WeddingEvent; index: number }) {
  const icon = ritualIcon[event.id] ?? ritualIcon.default
  const maps = event.mapsUrl?.trim()

  return (
    <motion.article
      className="ritual-row"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={stagger(index * 0.07)}
    >
      <div className="ritual-marker">
        <span className="ritual-icon">{icon}</span>
        <span className="ritual-line" aria-hidden />
      </div>
      <div className="ritual-body">
        <time className="ritual-time" dateTime={event.date}>
          {event.date} · {event.timeStart}
          {event.timeEnd ? ` – ${event.timeEnd}` : ''}
        </time>
        <h3 className="tamil ritual-ta">{event.nameTa}</h3>
        <p className="ritual-en">{event.nameEn}</p>
        <p className="ritual-venue">{event.venueName}</p>
        <p className="ritual-addr">{event.address}</p>
        {maps && (
          <a href={maps} target="_blank" rel="noopener noreferrer" className="ritual-map">
            Get directions
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function EventsSection() {
  const { events } = weddingConfig
  if (!events.length) return null

  return (
    <SectionShell id="events" variant="timeline" className="events-ritual">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">விழா நிகழ்ச்சிகள்</p>
        <h2 className="section-title">Wedding Celebrations</h2>
      </motion.header>
      <div className="ritual-timeline">
        {events.map((e, i) => (
          <EventItem key={e.id} event={e} index={i} />
        ))}
      </div>
    </SectionShell>
  )
}
