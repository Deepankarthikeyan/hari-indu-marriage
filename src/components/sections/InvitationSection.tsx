import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import { downloadWeddingIcs } from '../../utils/calendar'
import { shareInvitation } from '../../utils/share'
import { reveal } from '../motion'
import './InvitationSection.css'

export default function InvitationSection() {
  const { invitation, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()
  const maps = ceremony.mapsUrl?.trim()

  return (
    <section className="invite-trad" id="invitation">
      <motion.div className="invite-trad-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">{invitation.titleTa}</p>
        <h2>{invitation.titleEn}</h2>
        <div className="invite-trad-rule" aria-hidden />

        <p className="invite-trad-line tamil">{invitation.lineTa}</p>
        <p className="invite-trad-line">{invitation.lineEn}</p>

        <div className="invite-trad-couple">
          <div>
            <p className="tamil invite-name">{couple.bride.nameTa}</p>
            <p className="invite-name-en">{couple.bride.nameEn}</p>
          </div>
          <span className="invite-with tamil">இவர்களுடன்</span>
          <div>
            <p className="tamil invite-name">{couple.groom.nameTa}</p>
            <p className="invite-name-en">{couple.groom.nameEn}</p>
          </div>
        </div>

        <dl className="invite-trad-details">
          <div>
            <dt className="tamil">மணநாள்</dt>
            <dd>{date.en}</dd>
            <dd className="tamil sub">{date.ta}</dd>
          </div>
          <div>
            <dt className="tamil">முகூர்த்த நேரம்</dt>
            <dd className="tamil">{time.ta}</dd>
            <dd className="sub">{time.en}</dd>
          </div>
          <div>
            <dt className="tamil">இடம்</dt>
            <dd>{ceremony.venueName}</dd>
            <dd className="sub">{ceremony.address}</dd>
          </div>
        </dl>

        <p className="invite-trad-close tamil">{invitation.closingTa}</p>
        <p className="invite-trad-close">{invitation.closingEn}</p>

        <div className="invite-trad-actions">
          <button type="button" className="btn-primary" onClick={downloadWeddingIcs}>Add to Calendar</button>
          {maps && (
            <a className="btn-outline" href={maps} target="_blank" rel="noopener noreferrer">Get Directions</a>
          )}
          <button
            type="button"
            className="btn-outline"
            onClick={() => shareInvitation(`${couple.bride.nameEn} & ${couple.groom.nameEn}`, invitation.lineEn)}
          >
            Share Invitation
          </button>
        </div>
      </motion.div>
    </section>
  )
}
