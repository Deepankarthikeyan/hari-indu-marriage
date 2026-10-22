import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'
import './RsvpSection.css'

type Status = 'idle' | 'sent' | 'error'

export default function RsvpSection() {
  const { rsvp, contact, couple } = weddingConfig
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const guests = String(fd.get('guests') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()

    const body = [
      `RSVP — ${couple.bride.nameEn} & ${couple.groom.nameEn}`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Guests: ${guests}`,
      message ? `Message: ${message}` : '',
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
      const text = `${contact.whatsappMessage}\n\n${body}`
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
      setStatus('sent')
      return
    }

    void navigator.clipboard.writeText(body).then(
      () => setStatus('sent'),
      () => setStatus('error'),
    )
  }

  return (
    <section className="rsvp-trad" id="rsvp">
      <motion.div className="rsvp-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">உங்கள் வருகை</p>
        <h2>RSVP</h2>
        <p className="rsvp-note">{rsvp.deadlineNote}</p>

        {status === 'sent' ? (
          <p className="rsvp-success" role="status">
            Thank you! Your response has been prepared — please send it from your email or messages app.
          </p>
        ) : (
          <form className="rsvp-form" onSubmit={onSubmit}>
            <label>
              Full name
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Phone
              <input name="phone" type="tel" required autoComplete="tel" />
            </label>
            <label>
              Number of guests
              <input name="guests" type="number" min={1} max={20} defaultValue={1} required />
            </label>
            <label>
              Message (optional)
              <textarea name="message" rows={3} />
            </label>
            {status === 'error' && (
              <p className="rsvp-error">Could not copy — please configure RSVP email or WhatsApp in config.</p>
            )}
            <button type="submit" className="btn-primary">Confirm Attendance</button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
