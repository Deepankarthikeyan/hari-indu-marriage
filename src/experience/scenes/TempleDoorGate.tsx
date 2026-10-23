import { motion, useReducedMotion } from 'framer-motion'
import WeddingHallInterior from './WeddingHallInterior'

type Props = {
  open: boolean
  openAmount: number
}

/** Ornate temple doors that swing open to reveal the wedding hall */
export default function TempleDoorGate({ open, openAmount }: Props) {
  const reduce = useReducedMotion()
  const angle = reduce ? (open ? 88 : 0) : openAmount * 88

  return (
    <div className="temple-gate" aria-hidden>
      <div className="temple-gate__gopuram">
        <img src="/assets/south-indian/gopuram-silhouette.png" alt="" />
      </div>
      <div className="temple-gate__arch">
        <div className="temple-gate__hall">
          <WeddingHallInterior reveal={openAmount} />
        </div>
        <div className="temple-gate__doors">
          <motion.div
            className="temple-gate__door temple-gate__door--left"
            style={{ transformOrigin: 'left center' }}
            animate={{ rotateY: -angle }}
            transition={{ duration: reduce ? 0.3 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <DoorPanel side="left" />
          </motion.div>
          <motion.div
            className="temple-gate__door temple-gate__door--right"
            style={{ transformOrigin: 'right center' }}
            animate={{ rotateY: angle }}
            transition={{ duration: reduce ? 0.3 : 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <DoorPanel side="right" />
          </motion.div>
        </div>
        <div className="temple-gate__threshold" />
      </div>
    </div>
  )
}

function DoorPanel({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`temple-gate__panel temple-gate__panel--${side}`}>
      <div className="temple-gate__carving temple-gate__carving--top" />
      <div className="temple-gate__carving temple-gate__carving--mid">
        <svg viewBox="0 0 80 120" className="temple-gate__deity-silhouette">
          <path
            d="M40 8 L48 28 L68 32 L52 48 L56 68 L40 58 L24 68 L28 48 L12 32 L32 28 Z"
            fill="rgba(212,168,67,0.35)"
          />
          <ellipse cx="40" cy="78" rx="22" ry="28" fill="rgba(139,26,26,0.2)" />
        </svg>
      </div>
      <div className="temple-gate__carving temple-gate__carving--border" />
      <div className="temple-gate__handle" />
    </div>
  )
}
