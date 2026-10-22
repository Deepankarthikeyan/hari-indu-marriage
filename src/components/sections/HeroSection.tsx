import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import { reveal } from '../motion'
import './HeroSection.css'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const { hero, couple } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const hasImage = Boolean(hero.imageSrc?.trim())

  return (
    <section className="hero" id="top" aria-label="Welcome">
      <div className={`hero-visual ${hasImage ? 'has-photo' : 'is-placeholder'}`}>
        {hasImage ? (
          <img src={hero.imageSrc} alt={hero.imageAlt} className="hero-img" fetchPriority="high" />
        ) : (
          <div className="hero-img hero-img-fallback" role="img" aria-label="Hero photograph placeholder" />
        )}
        <div className="hero-scrim" aria-hidden />
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: reduceMotion ? 0 : 0.15 }}
        >
          <span>{hero.subtitleEn}</span>
          <span className="tamil hero-eyebrow-ta">{hero.subtitleTa}</span>
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-name">{couple.bride.nameEn}</span>
          <span className="hero-amp">&</span>
          <span className="hero-name">{couple.groom.nameEn}</span>
        </motion.h1>

        <motion.p
          className="hero-date tamil"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
        >
          {date.ta}
        </motion.p>
        <motion.p className="hero-date-en" variants={reveal} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          {date.en}
        </motion.p>

        <motion.a
          href="#story"
          className="hero-scroll"
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          aria-label="Scroll to story"
        >
          <span>Scroll</span>
          <span className="hero-scroll-line" aria-hidden />
        </motion.a>
      </div>
    </section>
  )
}
