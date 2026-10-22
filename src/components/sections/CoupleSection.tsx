import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { fadeUp } from '../motion'
import './CoupleSection.css'

function PersonFrame({
  person,
  role,
  delay,
}: {
  person: (typeof weddingConfig.couple)['bride']
  role: 'bride' | 'groom'
  delay: number
}) {
  const hasPhoto = Boolean(person.photoSrc?.trim())

  return (
    <motion.article
      className={`person-frame person-${role}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay }}
    >
      <div className="frame-border">
        <div className="frame-floral frame-floral-tl" aria-hidden />
        <div className="frame-floral frame-floral-br" aria-hidden />
        {hasPhoto ? (
          <img src={person.photoSrc} alt={`${person.nameEn} portrait`} className="person-photo" />
        ) : (
          <div className="person-placeholder" aria-label={`Photo placeholder for ${person.nameEn}`}>
            <span className="placeholder-lotus" aria-hidden>🪷</span>
            <span className="placeholder-hint">Add photo in config</span>
          </div>
        )}
      </div>
      <h3 className="person-ta tamil">{person.nameTa}</h3>
      <p className="person-en">{person.nameEn}</p>
      {person.subtitle && <p className="person-sub">{person.subtitle}</p>}
      {person.parents && <p className="person-parents">{person.parents}</p>}
    </motion.article>
  )
}

export default function CoupleSection() {
  const { couple } = weddingConfig

  return (
    <section className="couple-section" id="couple">
      <motion.header
        className="section-head"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="tamil">மணமக்கள்</h2>
        <p>The Bride &amp; Groom</p>
      </motion.header>

      <div className="couple-layout">
        <PersonFrame person={couple.bride} role="bride" delay={0.05} />
        <motion.div
          className="couple-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="couple-kolam-ring" aria-hidden />
          <p className="tamil couple-union">தாலி கட்டும் திருமணம்</p>
        </motion.div>
        <PersonFrame person={couple.groom} role="groom" delay={0.1} />
      </div>
    </section>
  )
}
