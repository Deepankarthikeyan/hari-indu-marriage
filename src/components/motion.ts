import type { Transition, Variants } from 'framer-motion'

export const ease: Transition['ease'] = [0.22, 1, 0.36, 1]

export const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
}

export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1.1, ease } },
}

export const stagger = (delay = 0.08): Transition => ({ duration: 0.8, ease, delay })
