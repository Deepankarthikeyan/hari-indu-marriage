import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import SectionShell from '../wedding/SectionShell'
import { SilkCorners } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './VenueSection.css'

export default function VenueSection() {
  const { ceremony } = weddingConfig
  const maps = ceremony.mapsUrl?.trim()
  const hasImage = Boolean(ceremony.imageSrc?.trim())

  return (
    <SectionShell id="venue" variant="parchment" className="venue-invite">
      <motion.div className="venue-scroll" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SilkCorners />
        <p className="section-eyebrow">Venue</p>
        <h2 className="section-title tamil">திருமண இடம்</h2>
        <div className="venue-layout">
          <div className="venue-img-wrap">
            {hasImage ? (
              <img src={ceremony.imageSrc} alt={ceremony.venueName} loading="lazy" />
            ) : (
              <div className="venue-img-placeholder">Venue photograph</div>
            )}
          </div>
          <div className="venue-details">
            <h3>{ceremony.venueName}</h3>
            <p>{ceremony.address}</p>
            {maps ? (
              <a className="btn-primary" href={maps} target="_blank" rel="noopener noreferrer">Get Directions</a>
            ) : (
              <p className="venue-hint">Add <code>ceremony.mapsUrl</code> in config.</p>
            )}
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
