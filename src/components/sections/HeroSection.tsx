import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import { FallingPetals } from '../decor/FallingPetals'
import { reveal } from '../motion'
import './HeroSection.css'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const { hero, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  return (
    <section className="hero-murugan" id="top">
      <div className="hero-murugan-bg" aria-hidden>
        {!reduceMotion && <FallingPetals count={12} />}
      </div>

      <div className="hero-murugan-grid">
        <motion.div className="hero-murugan-visual" {...motionProps(reduceMotion, 0.1)}>
          <VelMotif size="sm" glow className="hero-vel-accent" />
          <MuruganVisual variant="hero" />
        </motion.div>

        <div className="hero-murugan-copy">
          <motion.p className="hero-bless tamil" {...motionProps(reduceMotion, 0.15)}>
            {hero.blessingTa}
          </motion.p>
          <motion.p className="hero-bless-en" {...motionProps(reduceMotion, 0.2)}>
            {hero.blessingEn}
          </motion.p>

          <motion.h1 className="hero-names" {...motionProps(reduceMotion, 0.3)}>
            <span className="tamil">{couple.bride.nameTa}</span>
            <span className="hero-amp">&</span>
            <span className="tamil">{couple.groom.nameTa}</span>
          </motion.h1>
          <motion.p className="hero-names-en" {...motionProps(reduceMotion, 0.35)}>
            {couple.bride.nameEn} & {couple.groom.nameEn}
          </motion.p>

          <motion.p className="hero-invite tamil" {...motionProps(reduceMotion, 0.45)}>
            {hero.subtitleTa}
          </motion.p>

          <motion.div className="hero-meta" {...motionProps(reduceMotion, 0.5)}>
            <p>{date.en}</p>
            <p className="tamil">{date.ta}</p>
            <p>{time.en}</p>
            <p className="hero-venue">{ceremony.venueName}</p>
          </motion.div>

          <motion.a href="#invitation" className="btn-primary" {...motionProps(reduceMotion, 0.6)}>
            {hero.ctaEn}
          </motion.a>
        </div>
      </div>
    </section>
  )
}

function motionProps(reduce: boolean | null, delay: number) {
  if (reduce) return {}
  return {
    variants: reveal,
    initial: 'hidden' as const,
    animate: 'visible' as const,
    transition: { delay },
  }
}
