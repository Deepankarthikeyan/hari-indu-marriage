import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'

export default function NarrativeSection() {
  const { story, traditions } = weddingConfig

  return (
    <section id="story" className="e-bento">
      <div className="e-container">
        <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="e-chapter-label">Chapter II · {story.titleEn}</p>
          <h2 className="e-title">{story.subtitleEn}</h2>
        </motion.header>
        <div className="e-bento__grid" style={{ marginTop: '2rem' }}>
          <motion.article className="e-bento__card e-bento__story" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {story.paragraphsEn.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            <p className="e-bento__sig">{story.signatureEn}</p>
          </motion.article>
          <motion.blockquote className="e-bento__card e-bento__quote" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="tamil" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{traditions.titleTa}</p>
            <p>{traditions.introEn}</p>
          </motion.blockquote>
          <motion.div className="e-bento__card e-bento__traditions" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="e-chapter-label" style={{ marginBottom: '0.5rem' }}>{traditions.titleEn}</p>
            <div className="e-tradition-chips">
              {traditions.items.map((item) => (
                <span key={item.en} title={item.ta}>{item.en}</span>
              ))}
            </div>
          </motion.div>
          <motion.figure className="e-bento__card e-bento__image e-bento__image-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <img src="/assets/invitation.jpg" alt="Wedding invitation keepsake" loading="lazy" />
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
