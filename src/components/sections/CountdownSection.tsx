import { motion, AnimatePresence } from 'framer-motion'
import { useCeremonyCountdown } from '../../hooks/useCountdown'
import { formatCeremonyDateDisplay } from '../../utils/datetime'
import SectionShell from '../wedding/SectionShell'
import { KolamDivider } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './CountdownSection.css'

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="orn-count-unit">
      <AnimatePresence mode="popLayout">
        <motion.span key={text} className="orn-count-num" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
          {text}
        </motion.span>
      </AnimatePresence>
      <span className="orn-count-label">{label}</span>
    </div>
  )
}

export default function CountdownSection() {
  const cd = useCeremonyCountdown()
  const date = formatCeremonyDateDisplay()

  return (
    <SectionShell id="countdown" variant="ivory" className="countdown-ornate">
      <motion.div className="countdown-ring" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">மண நேரம்</p>
        <h2 className="section-title">{date.en}</h2>
        <p className="countdown-ta tamil">{date.ta}</p>
        <KolamDivider />

        {cd.isPast ? (
          <p className="countdown-celebrate tamil">இன்று நம் திருமண நாள் — மங்களம்!</p>
        ) : (
          <div className="countdown-units">
            <Unit value={cd.days} label="Days" />
            <Unit value={cd.hours} label="Hours" />
            <Unit value={cd.minutes} label="Minutes" />
            <Unit value={cd.seconds} label="Seconds" />
          </div>
        )}
      </motion.div>
    </SectionShell>
  )
}
