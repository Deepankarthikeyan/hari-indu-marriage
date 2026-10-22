import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'

function PersonCard({ role, person }: { role: 'groom' | 'bride'; person: (typeof weddingConfig.couple)['groom'] }) {
  const hasPhoto = Boolean(person.photoSrc?.trim())
  return (
    <motion.article className="e-person" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <p className="e-person__role">{role === 'groom' ? 'Groom' : 'Bride'}</p>
      <div className="e-person__avatar">
        {hasPhoto ? <img src={person.photoSrc} alt={person.nameEn} /> : person.nameEn.charAt(0)}
      </div>
      <h3>{person.nameEn}</h3>
      <p className="tamil" style={{ color: 'var(--e-sage)', marginTop: '0.25rem' }}>{person.nameTa}</p>
      {person.subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--e-ink-soft)' }}>{person.subtitle}</p>}
      {person.parents && <p style={{ fontSize: '0.85rem', marginTop: '0.75rem', color: 'var(--e-ink-soft)' }}>{person.parents}</p>}
    </motion.article>
  )
}

export default function FamiliesSection() {
  const { couple } = weddingConfig

  return (
    <section id="families" className="e-families">
      <div className="e-container">
        <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center' }}>
          <p className="e-chapter-label">Chapter IV</p>
          <h2 className="e-title">Our Families</h2>
          <p className="e-subtitle" style={{ marginInline: 'auto' }}>With love and blessings of those who raised us</p>
        </motion.header>
        <div className="e-families__row" style={{ marginTop: '2.5rem' }}>
          <PersonCard role="groom" person={couple.groom} />
          <div className="e-families__divider" aria-hidden>&</div>
          <PersonCard role="bride" person={couple.bride} />
        </div>
      </div>
    </section>
  )
}
