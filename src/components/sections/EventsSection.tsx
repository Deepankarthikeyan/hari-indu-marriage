import { motion } from 'framer-motion'
import { weddingConfig, type WeddingEvent } from '../../config/wedding'
import { fadeUp } from '../motion'
import './EventsSection.css'

const motifIcon: Record<WeddingEvent['motif'], string> = {
  muhurtham: '🪔',
  reception: '🎉',
  mehendi: '🌿',
  general: '🪷',
}

function EventRow({ event, index }: { event: WeddingEvent; index: number }) {
  const hasMaps = Boolean(event.mapsUrl?.trim())

  return (
    <motion.article
      className="event-row"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="event-motif" aria-hidden>{motifIcon[event.motif]}</div>
      <div className="event-body">
        <h3 className="tamil">{event.nameTa}</h3>
        <p className="event-name-en">{event.nameEn}</p>
        <ul className="event-details">
          <li>
            <span className="detail-key">Date</span>
            <span>{event.date}</span>
          </li>
          <li>
            <span className="detail-key">Time</span>
            <span>
              {event.timeStart}
              {event.timeEnd ? ` – ${event.timeEnd}` : ''}
            </span>
          </li>
          <li>
            <span className="detail-key">Venue</span>
            <span>{event.venueName}</span>
          </li>
          <li>
            <span className="detail-key">Address</span>
            <span>{event.address}</span>
          </li>
        </ul>
        {hasMaps && (
          <a className="event-directions" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
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
    <section className="events-section" id="events">
      <motion.header
        className="section-head"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="tamil">விழா நிகழ்ச்சிகள்</h2>
        <p>Wedding Events</p>
      </motion.header>

      <div className="events-list">
        {events.map((event, i) => (
          <EventRow key={event.id} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}
