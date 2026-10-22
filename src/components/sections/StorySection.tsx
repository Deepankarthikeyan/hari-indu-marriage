import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal, stagger } from '../motion'
import './StorySection.css'

function StoryBlock({
  person,
  role,
  align,
}: {
  person: (typeof weddingConfig.couple)['bride']
  role: 'bride' | 'groom'
  align: 'left' | 'right'
}) {
  const hasPhoto = Boolean(person.photoSrc?.trim())

  return (
    <article className={`story-block story-${align}`}>
      <motion.div
        className="story-visual"
        initial={{ opacity: 0, x: align === 'left' ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {hasPhoto ? (
          <img src={person.photoSrc} alt={person.nameEn} className="story-photo" />
        ) : (
          <div className="story-photo story-photo-empty" aria-hidden>
            <span className="story-placeholder-label">Portrait</span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="story-copy"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={stagger(0.08)}
      >
        <p className="story-role">{role === 'bride' ? 'The Bride' : 'The Groom'}</p>
        <h2 className="story-name tamil">{person.nameTa}</h2>
        <h3 className="story-name-en">{person.nameEn}</h3>
        {person.subtitle && <p className="story-sub">{person.subtitle}</p>}
        {person.story && <p className="story-bio">{person.story}</p>}
        {person.parents && <p className="story-parents">{person.parents}</p>}
      </motion.div>
    </article>
  )
}

export default function StorySection() {
  const { couple } = weddingConfig

  return (
    <section className="story-section" id="story">
      <motion.header className="story-head" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2>Our Story</h2>
        <p className="tamil">மணமக்கள்</p>
      </motion.header>

      <StoryBlock person={couple.bride} role="bride" align="left" />
      <StoryBlock person={couple.groom} role="groom" align="right" />
    </section>
  )
}
