import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import TraditionalEntrance from '../decor/TraditionalEntrance'
import { FallingPetals } from '../decor/FallingPetals'
import { reveal } from '../motion'
import './HeroSection.css'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const { hero, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()
  const hasImage = Boolean(hero.imageSrc?.trim())

  return (
    <section className="hero-trad" id="top">
      <div className="hero-trad-bg">
        {hasImage ? (
          <img src={hero.imageSrc} alt={hero.imageAlt} className="hero-trad-photo" />
        ) : (
          <div className="hero-trad-photo hero-trad-photo-fallback" />
        )}
        <div className="hero-trad-scrim" />
        <TraditionalEntrance variant="full" />
        {!reduceMotion && <FallingPetals count={14} />}
      </div>

      <div className="hero-trad-content">
        <motion.p className="hero-trad-bless tamil" {...motionProps(reduceMotion, 0.1)}>
          {hero.blessingTa}
        </motion.p>
        <motion.p className="hero-trad-bless-en" {...motionProps(reduceMotion, 0.15)}>
          {hero.blessingEn}
        </motion.p>

        <motion.h1 className="hero-trad-names" {...motionProps(reduceMotion, 0.25)}>
          <span className="tamil">{couple.bride.nameTa}</span>
          <span className="hero-trad-amp">&</span>
          <span className="tamil">{couple.groom.nameTa}</span>
        </motion.h1>
        <motion.p className="hero-trad-names-en" {...motionProps(reduceMotion, 0.35)}>
          {couple.bride.nameEn} & {couple.groom.nameEn}
        </motion.p>

        <motion.p className="hero-trad-invite tamil" {...motionProps(reduceMotion, 0.45)}>
          {hero.subtitleTa}
        </motion.p>
        <motion.p className="hero-trad-invite-en" {...motionProps(reduceMotion, 0.5)}>
          {hero.subtitleEn}
        </motion.p>

        <motion.div className="hero-trad-meta" {...motionProps(reduceMotion, 0.55)}>
          <p>{date.en}</p>
          <p className="tamil">{date.ta}</p>
          <p>{time.en}</p>
          <p className="hero-trad-venue">{ceremony.venueName}</p>
        </motion.div>

        <motion.a href="#invitation" className="btn-primary hero-trad-cta" {...motionProps(reduceMotion, 0.65)}>
          View Wedding Invitation
        </motion.a>
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
