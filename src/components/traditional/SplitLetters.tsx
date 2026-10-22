import { motion, useReducedMotion } from 'framer-motion'

export function SplitLetters({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const chars = text.split('')

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="si-hero__char"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === ' ' ? '\u00a0' : ch}
        </motion.span>
      ))}
    </span>
  )
}
