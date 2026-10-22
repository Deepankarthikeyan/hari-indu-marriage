import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import AudioToggle from '../ui/AudioToggle'
import './LoveDoorIntro.css'

type Phase = 'closed' | 'opening' | 'revealed' | 'exit'

type Props = { onComplete: () => void }

const PETAL_COUNT = 18

export default function LoveDoorIntro({ onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('closed')
  const date = formatCeremonyDateDisplay()
  const { bride, groom } = weddingConfig.couple
  const heroImg = weddingConfig.hero.imageSrc?.trim()

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 8) % 94}%`,
        delay: (i % 7) * 0.35,
        duration: 4.5 + (i % 5) * 0.8,
        size: 8 + (i % 4) * 3,
        hue: i % 3 === 0 ? '#f4d03f' : i % 3 === 1 ? '#f8f0d4' : '#e8a598',
      })),
    [],
  )

  const finish = useCallback(() => {
    setPhase('exit')
    window.setTimeout(onComplete, reduceMotion ? 0 : 900)
  }, [onComplete, reduceMotion])

  const openDoors = useCallback(() => {
    if (phase !== 'closed') return
    setPhase('opening')
    window.setTimeout(() => setPhase('revealed'), 2200)
    window.setTimeout(() => finish(), reduceMotion ? 400 : 3800)
  }, [phase, finish, reduceMotion])

  useEffect(() => {
    if (reduceMotion) onComplete()
  }, [reduceMotion, onComplete])

  if (reduceMotion) return null

  const doorsOpen = phase === 'opening' || phase === 'revealed' || phase === 'exit'

  return (
    <motion.div
      className={`love-door-intro ${phase}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1, scale: phase === 'exit' ? 1.04 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label="Wedding invitation — open the doors"
    >
      <div className="ldi-backdrop">
        {heroImg ? (
          <div className="ldi-hero-bg" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
        ) : (
          <div className="ldi-hero-bg ldi-hero-fallback" aria-hidden />
        )}
        <div className="ldi-golden-mist" aria-hidden />
        <div className={`ldi-kolam ${doorsOpen ? 'is-visible' : ''}`} aria-hidden />
      </div>

      <div className="ldi-petals" aria-hidden>
        {petals.map((p) => (
          <span
            key={p.id}
            className={`ldi-petal ${doorsOpen ? 'is-swirl' : ''}`}
            style={{
              left: p.left,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.size,
              height: p.size * 1.2,
              background: p.hue,
            }}
          />
        ))}
      </div>

      <div className="ldi-melam" aria-hidden>
        <motion.span
          animate={doorsOpen ? { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] } : { opacity: 0.35 }}
          transition={{ duration: 0.55, repeat: doorsOpen ? Infinity : 0 }}
        />
        <motion.span
          animate={doorsOpen ? { scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] } : { opacity: 0.3 }}
          transition={{ duration: 0.55, repeat: doorsOpen ? Infinity : 0, delay: 0.18 }}
        />
        <motion.span
          animate={doorsOpen ? { scale: [1, 1.12, 1], opacity: [0.4, 0.75, 0.4] } : { opacity: 0.35 }}
          transition={{ duration: 0.55, repeat: doorsOpen ? Infinity : 0, delay: 0.09 }}
        />
      </div>

      <div className="ldi-garland" aria-hidden />
      <div className="ldi-lamps" aria-hidden>
        <span className="ldi-lamp" />
        <span className="ldi-lamp" />
      </div>

      <button type="button" className="ldi-skip" onClick={finish}>
        {weddingConfig.intro.skipLabel}
      </button>
      <div className="ldi-audio">
        <AudioToggle />
      </div>

      <div className="ldi-sanctuary">
        <AnimatePresence>
          {doorsOpen && (
            <motion.div
              className="ldi-reveal"
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="ldi-blessing tamil">{weddingConfig.intro.blessingTa}</p>
              <div className="ldi-heart-thali" aria-hidden>
                <span className="ldi-heart">♥</span>
                <span className="ldi-thali-line" />
              </div>
              <h1 className="ldi-names tamil">
                {bride.nameTa}
                <span className="ldi-amp">&</span>
                {groom.nameTa}
              </h1>
              <p className="ldi-names-en">{bride.nameEn} & {groom.nameEn}</p>
              <p className="ldi-reveal-line tamil">{weddingConfig.intro.revealTa}</p>
              <p className="ldi-reveal-line">{weddingConfig.intro.revealEn}</p>
              <p className="ldi-date">{date.en}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={`ldi-doors ${doorsOpen ? 'is-open' : ''}`}>
        <motion.div
          className="ldi-door ldi-door-left"
          animate={doorsOpen ? { rotateY: -88, x: '-6%' } : { rotateY: 0, x: 0 }}
          transition={{ duration: 2.1, ease: [0.65, 0, 0.25, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <DoorPanel side="left" />
        </motion.div>
        <motion.div
          className="ldi-door ldi-door-right"
          animate={doorsOpen ? { rotateY: 88, x: '6%' } : { rotateY: 0, x: 0 }}
          transition={{ duration: 2.1, ease: [0.65, 0, 0.25, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <DoorPanel side="right" />
        </motion.div>
      </div>

      {phase === 'closed' && (
        <motion.button
          type="button"
          className="ldi-cta"
          onClick={openDoors}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="ldi-cta-glow" aria-hidden />
          <span className="tamil">{weddingConfig.intro.ctaTa}</span>
          <span className="ldi-cta-en">{weddingConfig.intro.ctaEn}</span>
        </motion.button>
      )}
    </motion.div>
  )
}

function DoorPanel({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`ldi-panel ldi-panel-${side}`}>
      <div className="ldi-wood" />
      <div className="ldi-carving" />
      <div className="ldi-brass" />
      <div className="ldi-panel-kolam" aria-hidden />
    </div>
  )
}
