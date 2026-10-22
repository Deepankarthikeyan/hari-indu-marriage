import { motion, AnimatePresence } from 'framer-motion'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import { reveal } from '../motion'
import './CountdownSection.css'

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="cd-unit">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          className="cd-num"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="cd-label">{label}</span>
    </div>
  )
}

export default function CountdownSection() {
  const cd = useCeremonyCountdown()
  const date = formatCeremonyDateDisplay()

  return (
    <section className="countdown-editorial" id="countdown">
      <motion.div className="cd-wrap" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="cd-eyebrow">Until we say I do</p>
        <h2 className="cd-date">{date.en}</h2>
        <p className="cd-date-ta tamil">{date.ta}</p>

        {cd.isPast ? (
          <p className="cd-celebrate">
            <span className="tamil">இன்று நம் திருமண நாள்</span>
            <span>Today we celebrate with joy and gratitude.</span>
          </p>
        ) : (
          <div className="cd-row">
            <Unit value={cd.days} label="Days" />
            <span className="cd-sep" aria-hidden>:</span>
            <Unit value={cd.hours} label="Hours" />
            <span className="cd-sep" aria-hidden>:</span>
            <Unit value={cd.minutes} label="Minutes" />
            <span className="cd-sep" aria-hidden>:</span>
            <Unit value={cd.seconds} label="Seconds" />
          </div>
        )}
      </motion.div>
    </section>
  )
}
