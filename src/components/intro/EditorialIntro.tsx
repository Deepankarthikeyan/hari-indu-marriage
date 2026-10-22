import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import './EditorialIntro.css'

type Props = { onComplete: () => void }

export default function EditorialIntro({ onComplete }: Props) {
  const reduceMotion = useReducedMotion()
  const [exiting, setExiting] = useState(false)
  const date = formatCeremonyDateDisplay()
  const { bride, groom } = weddingConfig.couple
  const heroImg = weddingConfig.hero.imageSrc?.trim()

  const finish = useCallback(() => {
    if (exiting) return
    setExiting(true)
    window.setTimeout(onComplete, reduceMotion ? 0 : 650)
  }, [exiting, onComplete, reduceMotion])

  useEffect(() => {
    if (reduceMotion) onComplete()
  }, [reduceMotion, onComplete])

  useEffect(() => {
    if (reduceMotion) return
    const t = window.setTimeout(() => finish(), 4200)
    return () => clearTimeout(t)
  }, [reduceMotion, finish])

  if (reduceMotion) return null

  return (
    <motion.div
      className={`editorial-intro ${exiting ? 'is-exiting' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-label="Wedding invitation opening"
    >
      {heroImg ? (
        <div className="intro-photo" style={{ backgroundImage: `url(${heroImg})` }} aria-hidden />
      ) : (
        <div className="intro-photo intro-photo-placeholder" aria-hidden />
      )}
      <div className="intro-veil" aria-hidden />

      <button type="button" className="intro-skip" onClick={finish}>
        {weddingConfig.intro.skipLabel}
      </button>

      <div className="intro-copy">
        <motion.p
          className="intro-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {weddingConfig.hero.subtitleEn}
        </motion.p>

        <motion.h1
          className="intro-names"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}>
            {bride.nameEn.split(' ').slice(-1)[0] ?? bride.nameEn}
          </motion.span>
          <motion.span className="intro-amp" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            &
          </motion.span>
          <motion.span variants={{ hidden: { y: '110%' }, visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}>
            {groom.nameEn.split(' ').slice(-1)[0] ?? groom.nameEn}
          </motion.span>
        </motion.h1>

        <motion.p
          className="intro-date"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {date.en}
        </motion.p>

        <motion.button
          type="button"
          className="intro-enter"
          onClick={finish}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Enter
        </motion.button>
      </div>
    </motion.div>
  )
}
