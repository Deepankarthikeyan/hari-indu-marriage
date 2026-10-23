import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  active: boolean
  intensity?: number
}

/** Clasped hands with golden glow — love grasp moment (no emoji icons) */
export default function GraspHandsLove({ active, intensity = 1 }: Props) {
  const reduce = useReducedMotion()
  if (!active) return null

  const t = Math.min(1, Math.max(0, intensity))

  return (
    <motion.div
      className="wh-grasp"
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: t, scale: 0.92 + t * 0.08 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      <motion.div
        className="wh-grasp__glow"
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg className="wh-grasp__svg" viewBox="0 0 200 100" role="img" aria-label="Hands joined in blessing">
        <defs>
          <linearGradient id="grasp-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9a227" />
            <stop offset="50%" stopColor="#f5e6b8" />
            <stop offset="100%" stopColor="#c9a227" />
          </linearGradient>
        </defs>
        <motion.path
          d="M28 58 C38 42, 52 38, 68 48 C78 54, 88 52, 98 48"
          fill="none"
          stroke="url(#grasp-gold)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <path d="M22 62 Q18 50 28 44 L36 52 Z" fill="#e8b896" />
        <path d="M178 62 Q182 50 172 44 L164 52 Z" fill="#f0c9a8" />
        <ellipse cx="100" cy="52" rx="14" ry="10" fill="rgba(255,232,200,0.9)" stroke="#d4a843" strokeWidth="1.5" />
        <circle cx="92" cy="50" r="2" fill="#c9a227" opacity="0.6" />
        <circle cx="108" cy="50" r="2" fill="#c9a227" opacity="0.6" />
      </svg>
      <div className="wh-grasp__petals">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className="wh-grasp__petal" style={{ '--i': i } as CSSProperties} />
        ))}
      </div>
    </motion.div>
  )
}
