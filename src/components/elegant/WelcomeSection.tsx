import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'

export default function WelcomeSection() {
  const { hero, invitation, experience } = weddingConfig

  return (
    <section id="welcome" className="e-welcome">
      <div className="e-container e-welcome__grid">
        <motion.div
          className="e-welcome__visual"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img src={experience.stageBannerSrc} alt={hero.imageAlt} />
        </motion.div>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="e-chapter-label">Chapter I</p>
          <h2 className="e-title">{invitation.titleEn}</h2>
          <p className="e-welcome__ta tamil">{invitation.titleTa}</p>
          <hr className="e-rule" />
          <p className="e-subtitle">{invitation.lineEn}</p>
          <p className="e-subtitle tamil" style={{ marginTop: '0.75rem' }}>{invitation.lineTa}</p>
          <p style={{ marginTop: '1.5rem', color: 'var(--e-sage)', fontStyle: 'italic' }}>{hero.blessingEn}</p>
        </motion.div>
      </div>
    </section>
  )
}
