import { useState } from 'react'
import { motion } from 'framer-motion'
import TempleGopuram from './TempleGopuram'
import MelamDecor from './MelamDecor'
import './EntryPage.css'

type Props = {
  onEnter: () => void
}

export default function EntryPage({ onEnter }: Props) {
  const [opening, setOpening] = useState(false)

  const handleClick = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => onEnter(), 2200)
  }

  return (
    <motion.div
      className="entry-page"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="entry-bg-pattern" />
      <div className="entry-temple-row">
        <TempleGopuram className="entry-gopuram left" />
        <TempleGopuram className="entry-gopuram center" />
        <TempleGopuram className="entry-gopuram right" />
      </div>

      <MelamDecor />

      <motion.div
        className={`temple-doors ${opening ? 'open' : ''}`}
        initial={{ scale: 1 }}
        animate={opening ? { scale: 1.02 } : {}}
      >
        <div className="door door-left">
          <div className="door-panel" />
          <div className="door-kolam" />
        </div>
        <div className="door-gap">
          {!opening && (
            <motion.div
              className="door-ganesha tamil"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              ॐ
              <span className="ganesha-label">ஶ்ரீ கணேசாய நம:</span>
            </motion.div>
          )}
        </div>
        <div className="door door-right">
          <div className="door-panel" />
          <div className="door-kolam" />
        </div>
      </motion.div>

      <div className="entry-content">
        <motion.p
          className="entry-sub tamil"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          திருமண அழைப்பிதழ்
        </motion.p>
        <motion.h1
          className="entry-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          Hariharan <span className="amp">&</span> Indhumathi
        </motion.h1>
        <motion.p
          className="entry-date tamil"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          13 டிசம்பர் 2026 · ஞாயிற்றுக்கிழமை
        </motion.p>

        {!opening && (
          <motion.button
            type="button"
            className="enter-btn"
            onClick={handleClick}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="enter-btn-inner">
              <span className="tamil">நுழைய கிளிக் செய்யவும்</span>
              <span className="enter-en">Click to Enter</span>
            </span>
            <motion.span
              className="enter-pulse"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}

        {opening && (
          <motion.p
            className="entry-opening tamil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            மங்கள இசை… வாழ்த்துக்கள்!
          </motion.p>
        )}
      </div>

      <div className="entry-border" />
    </motion.div>
  )
}
