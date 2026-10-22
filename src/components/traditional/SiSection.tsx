import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { BridgeKind } from './TransitionBridge'
import TransitionBridge from './TransitionBridge'

type Props = {
  id: string
  sectionClass: string
  transition: BridgeKind
  showBridge?: boolean
  children: ReactNode
}

const sectionVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function SiGoldLine() {
  return <div className="si-gold-line" />
}

export function SiHeading({ children, className }: { children: ReactNode; className: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <h2 className={`${className} si-heading-love`}>{children}</h2>

  return (
    <motion.h2
      className={`${className} si-heading-love`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  )
}

export default function SiSection({ id, sectionClass, transition, showBridge = true, children }: Props) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <>
        {showBridge && <TransitionBridge kind={transition} />}
        <section id={id} className={`si-section si-section--creative ${sectionClass} si-t-${transition}`}>
          <div className="si-section__veil" aria-hidden />
          {children}
        </section>
      </>
    )
  }

  return (
    <>
      {showBridge && <TransitionBridge kind={transition} />}
      <motion.section
        id={id}
        className={`si-section si-section--creative ${sectionClass} si-t-${transition}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        <div className="si-section__veil" aria-hidden />
        {children}
      </motion.section>
    </>
  )
}

export function SiReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
