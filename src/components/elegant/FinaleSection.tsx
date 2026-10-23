import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { shareInvitation } from '../../utils/share'
import { reveal } from '../motion'

export default function FinaleSection() {
  const { invitation, couple, contact, rsvp } = weddingConfig

  const onShare = () => {
    void shareInvitation(
      `${couple.groom.nameEn} & ${couple.bride.nameEn}`,
      invitation.lineEn,
    )
  }

  const onBless = () => {
    const wa = contact.whatsappNumber?.trim()
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(contact.whatsappMessage)}`, '_blank', 'noopener,noreferrer')
      return
    }
    document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="blessings" className="e-finale">
      <div className="e-container">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="e-chapter-label">Finale</p>
          <h2 className="e-title">Your Blessings</h2>
          <p className="e-subtitle" style={{ marginInline: 'auto' }}>{invitation.closingEn}</p>
          <p className="e-subtitle tamil" style={{ marginInline: 'auto', marginTop: '0.5rem' }}>{invitation.closingTa}</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--e-bronze)' }}>{rsvp.deadlineNote}</p>
          <div className="e-finale__actions">
            <button type="button" className="e-btn e-btn--solid" onClick={onBless}>Send blessings</button>
            <button type="button" className="e-btn" onClick={onShare}>Share invitation</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
