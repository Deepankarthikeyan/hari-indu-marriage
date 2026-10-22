import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import { downloadWeddingIcs } from '../../utils/calendar'
import { shareInvitation } from '../../utils/share'
import SectionShell from '../wedding/SectionShell'
import { GoldRule, SilkCorners } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './InvitationSection.css'

export default function InvitationSection() {
  const { invitation, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()
  const maps = ceremony.mapsUrl?.trim()

  return (
    <SectionShell id="invitation" variant="parchment" className="invite-parchment">
      <motion.div className="invite-paper" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <SilkCorners />
        <p className="invite-crown tamil">{invitation.titleTa}</p>
        <h2 className="invite-crown-en">{invitation.titleEn}</h2>
        <GoldRule wide />

        <p className="invite-line tamil">{invitation.lineTa}</p>
        <p className="invite-line">{invitation.lineEn}</p>

        <div className="invite-names-grand">
          <p className="tamil invite-n">{couple.bride.nameTa}</p>
          <p className="invite-n-en">{couple.bride.nameEn}</p>
          <p className="invite-with tamil">இவர்களுடன்</p>
          <p className="tamil invite-n">{couple.groom.nameTa}</p>
          <p className="invite-n-en groom">{couple.groom.nameEn}</p>
        </div>

        <dl className="invite-details">
          <div><dt className="tamil">மணநாள்</dt><dd>{date.en}</dd><dd className="sub tamil">{date.ta}</dd></div>
          <div><dt className="tamil">முகூர்த்தம்</dt><dd className="tamil">{time.ta}</dd><dd className="sub">{time.en}</dd></div>
          <div><dt className="tamil">இடம்</dt><dd>{ceremony.venueName}</dd><dd className="sub">{ceremony.address}</dd></div>
        </dl>

        <p className="invite-close tamil">{invitation.closingTa}</p>
        <p className="invite-close">{invitation.closingEn}</p>

        <div className="invite-actions">
          <button type="button" className="btn-primary" onClick={downloadWeddingIcs}>Add to Calendar</button>
          {maps && <a className="btn-outline" href={maps} target="_blank" rel="noopener noreferrer">Directions</a>}
          <button type="button" className="btn-outline" onClick={() => shareInvitation(`${couple.bride.nameEn} & ${couple.groom.nameEn}`, invitation.lineEn)}>Share</button>
        </div>
      </motion.div>
    </SectionShell>
  )
}
