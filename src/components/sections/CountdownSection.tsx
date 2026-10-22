import { motion, AnimatePresence } from 'framer-motion'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { fadeUp } from '../motion'
import './CountdownSection.css'

function Digit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="count-unit">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={text}
          className="count-num"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="count-label">{label}</span>
    </div>
  )
}

export default function CountdownSection() {
  const cd = useCeremonyCountdown()

  return (
    <section className="countdown-section" id="countdown">
      <motion.div
        className="countdown-inner"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="tamil">மண நேரம் எஞ்சியுள்ளது</h2>
        <p className="countdown-sub">Counting down to muhurtham</p>

        {cd.isPast ? (
          <div className="countdown-celebration">
            <p className="tamil">இன்று நம் திருமண நாள்!</p>
            <p>Today we celebrate our wedding day with joy and gratitude.</p>
          </div>
        ) : (
          <div className="countdown-grid">
            <Digit value={cd.days} label="Days" />
            <Digit value={cd.hours} label="Hours" />
            <Digit value={cd.minutes} label="Minutes" />
            <Digit value={cd.seconds} label="Seconds" />
          </div>
        )}
      </motion.div>
    </section>
  )
}
