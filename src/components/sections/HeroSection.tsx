import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import TraditionalEntrance from '../decor/TraditionalEntrance'
import { FallingPetals } from '../decor/FallingPetals'
import SectionShell from '../wedding/SectionShell'
import { reveal } from '../motion'
import './HeroSection.css'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const { hero, couple, ceremony } = weddingConfig
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  return (
    <SectionShell id="top" variant="mandap" className="hero-mandap">
      <TraditionalEntrance variant="full" />
      {!reduceMotion && <FallingPetals count={16} />}

      <div className="hero-mandap-grid">
        <motion.div className="hero-mandap-visual" {...motionProps(reduceMotion, 0.1)}>
          <MuruganVisual variant="hero" />
        </motion.div>

        <div className="hero-mandap-copy">
          <VelMotif size="sm" glow className="hero-vel" />
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
          <motion.p className="hero-invite-en" {...motionProps(reduceMotion, 0.48)}>
            {hero.subtitleEn}
          </motion.p>

          <motion.div className="hero-meta" {...motionProps(reduceMotion, 0.55)}>
            <p>{date.en}</p>
            <p className="tamil">{date.ta}</p>
            <p>{time.en}</p>
            <p className="hero-venue">{ceremony.venueName}</p>
          </motion.div>

          <motion.a href="#invitation" className="btn-primary hero-cta" {...motionProps(reduceMotion, 0.65)}>
            {hero.ctaEn}
          </motion.a>
        </div>
      </div>
    </SectionShell>
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
