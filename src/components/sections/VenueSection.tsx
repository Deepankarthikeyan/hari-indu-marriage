import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'
import './VenueSection.css'

export default function VenueSection() {
  const { ceremony } = weddingConfig
  const maps = ceremony.mapsUrl?.trim()
  const hasImage = Boolean(ceremony.imageSrc?.trim())

  return (
    <section className="venue-trad" id="venue">
      <motion.div className="venue-trad-grid" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="venue-trad-visual">
          {hasImage ? (
            <img src={ceremony.imageSrc} alt={ceremony.venueName} loading="lazy" />
          ) : (
            <div className="venue-placeholder">
              <span className="tamil">திருமண இடம்</span>
              <span>Add venue photo in config</span>
            </div>
          )}
        </div>
        <div className="venue-trad-copy">
          <p className="section-eyebrow">Wedding Venue</p>
          <h2 className="tamil">இடம்</h2>
          <h3>{ceremony.venueName}</h3>
          <p className="venue-address">{ceremony.address}</p>
          {maps ? (
            <a className="btn-primary" href={maps} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          ) : (
            <p className="venue-hint">Add <code>ceremony.mapsUrl</code> in config for directions.</p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
