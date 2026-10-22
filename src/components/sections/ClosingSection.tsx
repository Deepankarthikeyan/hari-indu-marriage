import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { fadeUp } from '../motion'
import './ClosingSection.css'

export default function ClosingSection() {
  const { closing, contact } = weddingConfig
  const wa = contact.whatsappNumber?.trim()
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(contact.whatsappMessage)}`
    : ''

  return (
    <section className="closing-section" id="blessings">
      <motion.div
        className="closing-card"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="closing-lamps" aria-hidden>
          <span>🪔</span>
          <span>🪔</span>
        </div>
        <p className="closing-ta tamil">{closing.messageTa}</p>
        <p className="closing-en">{closing.messageEn}</p>
        <p className="closing-signoff tamil">{closing.signoffTa}</p>
        <p className="closing-signoff-en">{closing.signoffEn}</p>

        {waUrl && (
          <a className="whatsapp-rsvp" href={waUrl} target="_blank" rel="noopener noreferrer">
            RSVP on WhatsApp
          </a>
        )}
      </motion.div>
    </section>
  )
}
