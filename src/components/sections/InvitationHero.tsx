import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import { downloadWeddingIcs } from '../../utils/calendar'
import { fadeUp, scaleReveal } from '../motion'
import './InvitationHero.css'

export default function InvitationHero() {
  const { invitation, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()
  const mapsReady = Boolean(ceremony.mapsUrl?.trim())

  return (
    <section className="invitation-hero" id="invitation">
      <div className="hero-parallax-bg" aria-hidden />
      <div className="hero-toran" aria-hidden />

      <motion.div
        className="invitation-card"
        variants={scaleReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="card-ornament card-ornament-top" aria-hidden />
        <p className="card-title tamil">{invitation.titleTa}</p>
        <p className="card-blessing">{invitation.blessingEn}</p>
        <p className="card-blessing-ta tamil">{invitation.blessingTa}</p>

        <div className="card-divider" aria-hidden />

        <p className="card-invite">{invitation.inviteEn}</p>
        <p className="card-invite-ta tamil">{invitation.inviteTa}</p>

        <motion.div className="card-names" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="bride-name tamil">{couple.bride.nameTa}</p>
          <p className="name-en">{couple.bride.nameEn}</p>
          <p className="with-line tamil">இவர்களுடன்</p>
          <p className="with-line-en">with</p>
          <p className="groom-name tamil">{couple.groom.nameTa}</p>
          <p className="name-en groom">{couple.groom.nameEn}</p>
        </motion.div>

        <div className="card-divider" aria-hidden />

        <div className="card-meta">
          <div>
            <span className="meta-label tamil">மணநாள்</span>
            <p className="meta-value">{date.en}</p>
            <p className="meta-sub tamil">{date.ta}</p>
          </div>
          <div>
            <span className="meta-label tamil">முகூர்த்த நேரம்</span>
            <p className="meta-value tamil">{time.ta}</p>
            <p className="meta-sub">{time.en}</p>
          </div>
          <div>
            <span className="meta-label tamil">இடம்</span>
            <p className="meta-value">{ceremony.venueName}</p>
            <p className="meta-sub">{ceremony.address}</p>
          </div>
        </div>

        <p className="card-closing">{invitation.closingEn}</p>
        <p className="card-closing-ta tamil">{invitation.closingTa}</p>

        <div className="card-actions">
          <button type="button" className="btn-primary" onClick={downloadWeddingIcs}>
            Add to Calendar
          </button>
          {mapsReady && (
            <a className="btn-secondary" href={ceremony.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
          )}
        </div>

        <div className="card-ornament card-ornament-bottom" aria-hidden />
      </motion.div>
    </section>
  )
}
