import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'

export default function VenueElegantSection() {
  const { ceremony, venue } = weddingConfig
  const maps = ceremony.mapsUrl?.trim()

  return (
    <section id="venue" className="e-venue">
      <div className="e-container">
        <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="e-chapter-label">Chapter V</p>
          <h2 className="e-title">Venue</h2>
          <p className="e-subtitle" style={{ color: 'rgba(246,242,234,0.75)' }}>{venue.subtitleEn}</p>
        </motion.header>
        <motion.div className="e-venue__card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', margin: '0 0 0.5rem', color: 'var(--e-champagne)' }}>
            {venue.journeyTitleEn}
          </h3>
          <p style={{ opacity: 0.85 }}>{venue.routeEn}</p>
          <ul className="e-venue__landmarks">
            {venue.landmarks.map((l) => <li key={l}>{l}</li>)}
          </ul>
          <hr className="e-rule" />
          <p style={{ fontSize: '1.15rem' }}>{ceremony.venueName}</p>
          <p style={{ opacity: 0.75, marginTop: '0.35rem' }}>{ceremony.address}</p>
          <p className="tamil" style={{ marginTop: '1rem', opacity: 0.8 }}>{venue.mapCaptionTa}</p>
          {maps && (
            <a href={maps} className="e-btn e-btn--solid" style={{ marginTop: '1.5rem' }} target="_blank" rel="noopener noreferrer">
              Open map
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
