import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'
import './ClosingSection.css'

export default function ClosingSection() {
  const { closing, contact } = weddingConfig
  const wa = contact.whatsappNumber?.trim()
  const waUrl = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(contact.whatsappMessage)}` : ''

  return (
    <section className="closing-editorial" id="rsvp">
      <motion.div className="closing-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="closing-ta tamil">{closing.messageTa}</p>
        <p className="closing-en">{closing.messageEn}</p>
        <p className="closing-sign tamil">{closing.signoffTa}</p>
        <p className="closing-sign-en">{closing.signoffEn}</p>
        {waUrl && (
          <a className="btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            RSVP on WhatsApp
          </a>
        )}
      </motion.div>
    </section>
  )
}
