import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyTimeDisplay } from '../../utils/datetime'
import { downloadWeddingIcs } from '../../utils/calendar'
import { shareInvitation } from '../../utils/share'
import { reveal } from '../motion'
import './InviteStrip.css'

export default function InviteStrip() {
  const { invitation, ceremony, couple } = weddingConfig
  const time = formatCeremonyTimeDisplay()
  const maps = ceremony.mapsUrl?.trim()

  const onShare = async () => {
    const ok = await shareInvitation(
      `${couple.bride.nameEn} & ${couple.groom.nameEn}`,
      invitation.lineEn,
    )
    if (ok && !navigator.share) {
      // copied
    }
  }

  return (
    <section className="invite-strip" id="invitation">
      <div className="invite-inner">
        <motion.div className="invite-text" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="invite-line tamil">{invitation.lineTa}</p>
          <p className="invite-line">{invitation.lineEn}</p>
          <p className="invite-venue">
            <span className="invite-label">Muhurtham</span>
            {time.en}
            <span className="invite-venue-name">{ceremony.venueName}</span>
          </p>
          <p className="invite-close tamil">{invitation.closingTa}</p>
          <p className="invite-close">{invitation.closingEn}</p>
        </motion.div>

        <motion.div
          className="invite-actions"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <button type="button" className="btn-ghost" onClick={downloadWeddingIcs}>Add to Calendar</button>
          {maps && (
            <a className="btn-ghost" href={maps} target="_blank" rel="noopener noreferrer">Directions</a>
          )}
          <button type="button" className="btn-ghost" onClick={onShare}>Share Invitation</button>
        </motion.div>
      </div>
      <div className="kolam-line" aria-hidden />
    </section>
  )
}
