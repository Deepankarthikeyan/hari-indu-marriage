import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../config/wedding'
import VelMotif from '../components/art/VelMotif'
import { FallingPetals } from '../components/decor/FallingPetals'
import TraditionalEntrance from '../components/decor/TraditionalEntrance'
import AudioToggle from '../components/ui/AudioToggle'
import BrideIllustration from './characters/BrideIllustration'
import GroomIllustration from './characters/GroomIllustration'

type Props = {
  onEnter: () => void
}

export default function WeddingOpening({ onEnter }: Props) {
  const reduce = useReducedMotion()
  const { couple, intro, hero } = weddingConfig
  const [phase, setPhase] = useState<'vel' | 'welcome' | 'exit'>('vel')

  const enter = useCallback(() => {
    setPhase('exit')
    window.setTimeout(onEnter, reduce ? 0 : 700)
  }, [onEnter, reduce])

  useEffect(() => {
    if (reduce) onEnter()
  }, [reduce, onEnter])

  useEffect(() => {
    if (phase !== 'vel') return
    const t = window.setTimeout(() => setPhase('welcome'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  if (reduce) return null

  return (
    <motion.div
      className="ws-opening"
      role="dialog"
      aria-label="Wedding welcome"
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.65 }}
    >
      <div className="ws-opening__sky" aria-hidden />
      <TraditionalEntrance variant="full" className="ws-opening__entrance" />
      <FallingPetals count={14} />

      <div className="ws-opening__chars" aria-hidden>
        <div className="ws-opening__char ws-opening__char--groom">
          <GroomIllustration pull={0} />
        </div>
        <div className="ws-opening__char ws-opening__char--bride">
          <BrideIllustration pull={0} />
        </div>
      </div>

      <button type="button" className="ws-opening__skip" onClick={enter}>{intro.skipLabel}</button>
      <div className="ws-opening__audio"><AudioToggle className="ws-audio" /></div>

      <div className="ws-opening__content">
        <AnimatePresence mode="wait">
          {phase === 'vel' && (
            <motion.div key="vel" className="ws-opening__vel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <VelMotif size="lg" glow />
              <p className="tamil ws-opening__vel-text">வேல் முருகா</p>
            </motion.div>
          )}
          {phase === 'welcome' && (
            <motion.div
              key="welcome"
              className="ws-opening__welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="ws-opening__blessing">{hero.blessingEn}</p>
              <p className="ws-opening__blessing-ta tamil">{hero.blessingTa}</p>
              <h1 className="ws-opening__names script">
                {couple.groom.nameEn}
                <span className="ws-opening__amp">&</span>
                {couple.bride.nameEn}
              </h1>
              <button type="button" className="ws-btn ws-btn--gold ws-opening__cta" onClick={enter}>
                {intro.ctaEn}
              </button>
              <p className="ws-opening__cta-ta tamil">{intro.ctaTa}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
