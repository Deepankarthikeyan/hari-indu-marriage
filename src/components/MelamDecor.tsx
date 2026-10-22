import { motion } from 'framer-motion'

/** Animated nadaswaram & thavil motif for melam feel */
export default function MelamDecor() {
  const beat = {
    scale: [1, 1.08, 1],
    transition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' as const },
  }

  return (
    <div className="melam-decor" aria-hidden>
      <motion.div className="melam-instrument nadaswaram" animate={beat} transition={{ ...beat.transition, delay: 0 }}>
        <svg viewBox="0 0 48 120" fill="none">
          <ellipse cx="24" cy="100" rx="14" ry="8" fill="currentColor" opacity="0.5" />
          <rect x="20" y="12" width="8" height="88" rx="3" fill="currentColor" />
          <circle cx="24" cy="10" r="6" fill="var(--gold)" />
          <path d="M14 40 Q8 50 14 60" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M34 55 Q40 65 34 75" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>
      <motion.div className="melam-instrument thavil" animate={beat} transition={{ ...beat.transition, delay: 0.22 }}>
        <svg viewBox="0 0 80 80" fill="none">
          <ellipse cx="40" cy="40" rx="36" ry="28" fill="currentColor" opacity="0.35" />
          <ellipse cx="40" cy="40" rx="28" ry="20" fill="currentColor" />
          <ellipse cx="40" cy="40" rx="8" ry="6" fill="var(--gold)" opacity="0.8" />
        </svg>
      </motion.div>
      <motion.div className="melam-instrument nadaswaram mirror" animate={beat} transition={{ ...beat.transition, delay: 0.11 }}>
        <svg viewBox="0 0 48 120" fill="none" style={{ transform: 'scaleX(-1)' }}>
          <ellipse cx="24" cy="100" rx="14" ry="8" fill="currentColor" opacity="0.5" />
          <rect x="20" y="12" width="8" height="88" rx="3" fill="currentColor" />
          <circle cx="24" cy="10" r="6" fill="var(--gold)" />
        </svg>
      </motion.div>
    </div>
  )
}
