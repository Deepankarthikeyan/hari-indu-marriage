import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import SectionShell from '../wedding/SectionShell'
import { KolamDivider } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './RsvpSection.css'

type Status = 'idle' | 'sent' | 'error'

export default function RsvpSection() {
  const { rsvp, contact, couple } = weddingConfig
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const body = [
      `RSVP — ${couple.bride.nameEn} & ${couple.groom.nameEn}`,
      `Name: ${String(fd.get('name') ?? '').trim()}`,
      `Phone: ${String(fd.get('phone') ?? '').trim()}`,
      `Guests: ${String(fd.get('guests') ?? '').trim()}`,
      fd.get('message') ? `Message: ${String(fd.get('message')).trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const email = rsvp.email?.trim()
    const wa = contact.whatsappNumber?.trim()

    if (email) {
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Wedding RSVP')}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(`${contact.whatsappMessage}\n\n${body}`)}`, '_blank', 'noopener,noreferrer')
      setStatus('sent')
      return
    }
    void navigator.clipboard.writeText(body).then(() => setStatus('sent'), () => setStatus('error'))
  }

  return (
    <SectionShell id="rsvp" variant="peacock" className="rsvp-trad">
      <motion.div className="rsvp-panel" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-title-ta tamil">உங்கள் வருகை</p>
        <h2 className="section-title">RSVP</h2>
        <KolamDivider />
        <p className="rsvp-note">{rsvp.deadlineNote}</p>

        {status === 'sent' ? (
          <p className="rsvp-success" role="status">Thank you — please complete sending from your email or messages app.</p>
        ) : (
          <form className="rsvp-form" onSubmit={onSubmit}>
            <label>Full name<input name="name" required autoComplete="name" /></label>
            <label>Phone<input name="phone" type="tel" required autoComplete="tel" /></label>
            <label>Guests<input name="guests" type="number" min={1} max={20} defaultValue={1} required /></label>
            <label>Message<textarea name="message" rows={3} /></label>
            {status === 'error' && <p className="rsvp-error">Configure RSVP email or WhatsApp in config.</p>}
            <button type="submit" className="btn-primary">Confirm Attendance</button>
          </form>
        )}
      </motion.div>
    </SectionShell>
  )
}
