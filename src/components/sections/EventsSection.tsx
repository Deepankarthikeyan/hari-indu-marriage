import { motion } from 'framer-motion'
import { weddingConfig, type WeddingEvent } from '../../config/wedding'
import { reveal, stagger } from '../motion'
import './EventsSection.css'

function EventItem({ event, index }: { event: WeddingEvent; index: number }) {
  const maps = event.mapsUrl?.trim()

  return (
    <motion.article
      className="timeline-item"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={stagger(index * 0.06)}
    >
      <div className="timeline-marker" aria-hidden>
        <span className="timeline-dot" />
      </div>
      <div className="timeline-body">
        <time className="timeline-date" dateTime={event.date}>
          {event.date} · {event.timeStart}
          {event.timeEnd ? ` – ${event.timeEnd}` : ''}
        </time>
        <h3 className="timeline-title tamil">{event.nameTa}</h3>
        <p className="timeline-title-en">{event.nameEn}</p>
        <p className="timeline-venue">{event.venueName}</p>
        <p className="timeline-address">{event.address}</p>
        {maps && (
          <a className="timeline-link" href={maps} target="_blank" rel="noopener noreferrer">
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
    <section className="events-editorial" id="events">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">விழா நிகழ்ச்சிகள்</p>
        <h2>Wedding Events</h2>
      </motion.header>

      <div className="timeline">
        {events.map((event, i) => (
          <EventItem key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}
