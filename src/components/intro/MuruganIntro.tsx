import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import { FallingPetals } from '../decor/FallingPetals'
import TraditionalEntrance from '../decor/TraditionalEntrance'
import AudioToggle from '../ui/AudioToggle'
import './MuruganIntro.css'

type Phase = 'vel' | 'opening' | 'revealed' | 'exit'
type Props = { onComplete: () => void }

export default function MuruganIntro({ onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('vel')
  const date = formatCeremonyDateDisplay()
  const { couple, intro } = weddingConfig

  const finish = useCallback(() => {
    setPhase('exit')
    window.setTimeout(onComplete, reduceMotion ? 0 : 850)
  }, [onComplete, reduceMotion])

  const beginOpen = useCallback(() => {
    if (phase !== 'vel') return
    setPhase('opening')
    window.setTimeout(() => setPhase('revealed'), 2400)
  }, [phase])

  useEffect(() => {
    if (reduceMotion) onComplete()
  }, [reduceMotion, onComplete])

  if (reduceMotion) return null

  const panelsOpen = phase === 'opening' || phase === 'revealed' || phase === 'exit'

  return (
    <motion.div
      className={`murugan-intro murugan-phase-${phase}`}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.85 }}
      role="dialog"
      aria-label="Murugan wedding invitation opening"
    >
      <div className="mi-sunrise" aria-hidden />
      <div className="mi-gopuram mi-gopuram-left" aria-hidden />
      <div className="mi-gopuram mi-gopuram-right" aria-hidden />
      {!panelsOpen && <FallingPetals count={10} />}
      {panelsOpen && <TraditionalEntrance variant="compact" className="mi-entrance-decor" />}

      <button type="button" className="mi-skip" onClick={finish}>{intro.skipLabel}</button>
      <div className="mi-audio"><AudioToggle /></div>

      <div className="mi-stage">
        <AnimatePresence>
          {phase === 'vel' && (
            <motion.div
              className="mi-vel-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="vel"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <VelMotif size="lg" glow />
              </motion.div>
              <motion.p
                className="mi-vel-caption tamil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                வேல் முருகா
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`mi-reveal-layer ${panelsOpen ? 'is-visible' : ''}`}>
          <div className="mi-golden-rays" aria-hidden />
          <MuruganVisual variant="intro" />
          <AnimatePresence>
            {phase === 'revealed' && (
              <motion.div
                className="mi-invite-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="tamil mi-title-ta">{intro.revealTa}</p>
                <p className="mi-title-en">{intro.revealEn}</p>
                <p className="mi-couple tamil">{couple.bride.nameTa} & {couple.groom.nameTa}</p>
                <p className="mi-date">{date.en}</p>
                <button type="button" className="mi-enter" onClick={finish}>
                  {weddingConfig.hero.ctaEn}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mi-panels">
          <motion.div
            className="mi-panel mi-panel-left"
            animate={panelsOpen ? { x: '-102%' } : { x: 0 }}
            transition={{ duration: 2.2, ease: [0.65, 0, 0.25, 1] }}
          >
            <div className="mi-carving" />
          </motion.div>
          <motion.div
            className="mi-panel mi-panel-right"
            animate={panelsOpen ? { x: '102%' } : { x: 0 }}
            transition={{ duration: 2.2, ease: [0.65, 0, 0.25, 1] }}
          >
            <div className="mi-carving" />
          </motion.div>
        </div>
      </div>

      {phase === 'vel' && (
        <motion.button
          type="button"
          className="mi-cta"
          onClick={beginOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="tamil">{intro.ctaTa}</span>
          <span>{intro.ctaEn}</span>
        </motion.button>
      )}
    </motion.div>
  )
}
