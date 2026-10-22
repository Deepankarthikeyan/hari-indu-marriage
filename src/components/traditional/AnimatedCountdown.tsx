import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCeremonyCountdown } from '../../hooks/useCountdown'

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  const reduce = useReducedMotion()

  return (
    <div className="si-countdown__unit">
      {reduce ? (
        <span className="si-countdown__number">{text}</span>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={text}
            className="si-countdown__number"
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ duration: 0.35 }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      )}
      <span className="si-countdown__label">{label}</span>
    </div>
  )
}

export default function AnimatedCountdown() {
  const cd = useCeremonyCountdown()

  if (cd.isPast) {
    return <p className="si-countdown__subheading tamil">இன்று நம் திருமண நாள் — மங்களம்!</p>
  }

  return (
    <>
      <Unit value={cd.days} label="Days" />
      <motion.span className="si-countdown__sep" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
        :
      </motion.span>
      <Unit value={cd.hours} label="Hours" />
      <motion.span className="si-countdown__sep" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
        :
      </motion.span>
      <Unit value={cd.minutes} label="Minutes" />
      <motion.span className="si-countdown__sep" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
        :
      </motion.span>
      <Unit value={cd.seconds} label="Seconds" />
    </>
  )
}
