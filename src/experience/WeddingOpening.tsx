import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../config/wedding'
import MuruganVisual from '../components/art/MuruganVisual'
import VelMotif from '../components/art/VelMotif'
import AudioToggle from '../components/ui/AudioToggle'
import BrideIllustration from './characters/BrideIllustration'
import GroomIllustration from './characters/GroomIllustration'
import LovePetalsLayer from './scenes/LovePetalsLayer'
import TempleDoorGate from './scenes/TempleDoorGate'

type Props = {
  onEnter: () => void
}

type Phase = 'blessing' | 'doors' | 'hall' | 'exit'

export default function WeddingOpening({ onEnter }: Props) {
  const reduce = useReducedMotion()
  const { couple, intro, hero } = weddingConfig
  const [phase, setPhase] = useState<Phase>('blessing')
  const [doorOpen, setDoorOpen] = useState(0)
  const [openingDoors, setOpeningDoors] = useState(false)

  const enter = useCallback(() => {
    setPhase('exit')
    window.setTimeout(onEnter, reduce ? 0 : 900)
  }, [onEnter, reduce])

  const openDoors = useCallback(() => {
    if (openingDoors || doorOpen >= 1) return
    setOpeningDoors(true)
    if (reduce) {
      setDoorOpen(1)
      setPhase('hall')
      setOpeningDoors(false)
      return
    }
    let start: number | null = null
    const duration = 1500
    const tick = (now: number) => {
      if (start === null) start = now
      const p = Math.min(1, (now - start) / duration)
      setDoorOpen(p)
      if (p < 1) requestAnimationFrame(tick)
      else {
        setOpeningDoors(false)
        setPhase('hall')
      }
    }
    requestAnimationFrame(tick)
  }, [doorOpen, openingDoors, reduce])

  useEffect(() => {
    if (reduce) onEnter()
  }, [reduce, onEnter])

  useEffect(() => {
    if (phase !== 'blessing') return
    const t = window.setTimeout(() => setPhase('doors'), reduce ? 0 : 2800)
    return () => clearTimeout(t)
  }, [phase, reduce])

  if (reduce) return null

  const doorsVisible = phase === 'doors' || phase === 'hall' || doorOpen > 0

  return (
    <motion.div
      className="ws-opening ws-opening--temple"
      role="dialog"
      aria-label="Temple wedding welcome"
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.75 }}
    >
      <LovePetalsLayer active />
      <TempleDoorGate open={doorsVisible} openAmount={doorOpen} />

      <div className="ws-opening__vel-top">
        <VelMotif size="md" glow />
      </div>

      <button type="button" className="ws-opening__skip" onClick={enter}>{intro.skipLabel}</button>
      <div className="ws-opening__audio"><AudioToggle className="ws-audio" /></div>

      <AnimatePresence mode="wait">
        {phase === 'blessing' && (
          <motion.div
            key="blessing"
            className="ws-opening__overlay ws-opening__overlay--blessing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MuruganVisual variant="intro" className="ws-opening__murugan" />
            <p className="ws-opening__blessing">{hero.blessingEn}</p>
            <p className="ws-opening__blessing-ta tamil">{hero.blessingTa}</p>
          </motion.div>
        )}

        {(phase === 'doors' || phase === 'hall') && (
          <motion.div
            key="hall-ui"
            className="ws-opening__overlay ws-opening__overlay--hall"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {phase === 'hall' && (
              <motion.div
                className="ws-opening__hall-avatars"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                aria-hidden
              >
                <GroomIllustration pull={0} />
                <BrideIllustration pull={0} />
              </motion.div>
            )}
            <h1 className="ws-opening__names script">
              {couple.groom.nameEn}
              <span className="ws-opening__amp">&</span>
              {couple.bride.nameEn}
            </h1>
            {phase === 'doors' && doorOpen < 1 && (
              <button
                type="button"
                className="ws-btn ws-btn--gold ws-opening__cta"
                onClick={openDoors}
                disabled={openingDoors}
              >
                {openingDoors ? 'Opening temple doors…' : 'Open temple doors'}
              </button>
            )}
            {phase === 'hall' && (
              <>
                <p className="ws-opening__hall-line">Welcome to our wedding hall</p>
                <button type="button" className="ws-btn ws-btn--gold ws-opening__cta" onClick={enter}>
                  Enter celebration
                </button>
                <p className="ws-opening__cta-ta tamil">{intro.ctaTa}</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
