import { motion, useReducedMotion } from 'framer-motion'

export type BridgeKind = 'petals' | 'rangoli' | 'hearts' | 'bells' | 'silk' | 'sparkles'

const ICON: Record<BridgeKind, string> = {
  petals: '🌸',
  rangoli: '✦',
  hearts: '♥',
  bells: '🔔',
  silk: '🪷',
  sparkles: '✨',
}

export default function TransitionBridge({ kind }: { kind: BridgeKind }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div className="si-bridge is-visible" aria-hidden>
        <div className="si-bridge__line" />
        <span className="si-bridge__icon">{ICON[kind]}</span>
      </div>
    )
  }

  return (
    <motion.div
      className="si-bridge"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="si-bridge__line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="si-bridge__icon"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
      >
        {ICON[kind]}
      </motion.span>
    </motion.div>
  )
}
