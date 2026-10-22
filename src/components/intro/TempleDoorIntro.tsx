import { useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import AudioToggle from '../ui/AudioToggle'
import './TempleDoorIntro.css'

type Props = {
  onComplete: () => void
}

export default function TempleDoorIntro({ onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle')

  const finish = useCallback(() => {
    onComplete()
  }, [onComplete])

  useEffect(() => {
    if (reduceMotion) finish()
  }, [reduceMotion, finish])

  const openDoors = useCallback(() => {
    if (phase !== 'idle') return
    if (reduceMotion) {
      finish()
      return
    }
    setPhase('opening')
    window.setTimeout(() => {
      setPhase('done')
      window.setTimeout(finish, 700)
    }, 2000)
  }, [phase, reduceMotion, finish])

  const skip = useCallback(() => {
    finish()
  }, [finish])

  if (reduceMotion) {
    return null
  }

  return (
    <motion.div
      className="temple-intro"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Wedding invitation opening"
    >
      <div className="intro-pillars intro-pillar-left" aria-hidden />
      <div className="intro-pillars intro-pillar-right" aria-hidden />

      <div className="intro-garland intro-garland-top" aria-hidden />
      <div className="intro-lamps" aria-hidden>
        <span className="vilakku" />
        <span className="vilakku" />
      </div>

      <button type="button" className="intro-skip" onClick={skip}>
        {weddingConfig.intro.skipLabel}
      </button>

      <div className="intro-audio-wrap">
        <AudioToggle />
      </div>

      <div className="intro-stage">
        <div className={`intro-glow ${phase !== 'idle' ? 'bright' : ''}`} aria-hidden />

        <motion.div
          className="intro-preview"
          initial={{ opacity: 0.35, scale: 0.92 }}
          animate={{
            opacity: phase === 'idle' ? 0.45 : 1,
            scale: phase === 'idle' ? 0.92 : 1,
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="intro-kolam" aria-hidden />
          <p className="intro-preview-ta tamil">{weddingConfig.invitation.titleTa}</p>
          <p className="intro-preview-names">
            {weddingConfig.couple.bride.nameEn}
            <span className="intro-amp">&</span>
            {weddingConfig.couple.groom.nameEn}
          </p>
          <p className="intro-preview-blessing">{weddingConfig.invitation.blessingEn}</p>
        </motion.div>

        <div className={`intro-doors ${phase === 'opening' || phase === 'done' ? 'is-open' : ''}`}>
          <div className="intro-door intro-door-left">
            <DoorFace side="left" />
          </div>
          <div className="intro-door intro-door-right">
            <DoorFace side="right" />
          </div>
        </div>
      </div>

      {phase === 'idle' && (
        <motion.button
          type="button"
          className="intro-cta"
          onClick={openDoors}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="tamil">{weddingConfig.intro.ctaTa}</span>
          <span className="intro-cta-en">{weddingConfig.intro.ctaEn}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

function DoorFace({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`door-face door-face-${side}`}>
      <div className="door-wood" />
      <div className="door-carving" />
      <div className="door-brass-handle" />
      <div className="door-gold-trim" />
    </div>
  )
}
