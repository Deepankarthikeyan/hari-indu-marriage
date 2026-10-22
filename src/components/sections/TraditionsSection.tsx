import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import TraditionalEntrance from '../decor/TraditionalEntrance'
import { GoldRule } from '../wedding/Ornaments'
import SectionShell from '../wedding/SectionShell'
import { reveal } from '../motion'
import './TraditionsSection.css'

export default function TraditionsSection() {
  const t = weddingConfig.traditions

  return (
    <SectionShell id="traditions" variant="maroon" className="traditions-section">
      <div className="traditions-visual" aria-hidden>
        <TraditionalEntrance variant="compact" />
      </div>
      <motion.div className="traditions-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">{t.titleTa}</p>
        <h2 className="section-title">{t.titleEn}</h2>
        <GoldRule wide />
        <p className="traditions-intro tamil">{t.introTa}</p>
        <p className="traditions-intro">{t.introEn}</p>
        <ul className="traditions-list">
          {t.items.map((item, i) => (
            <motion.li
              key={item.en}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="tamil">{item.ta}</span>
              <span>{item.en}</span>
            </motion.li>
          ))}
        </ul>
        <div className="traditions-melam" aria-hidden>
          <span>நாதஸ்வரம்</span>
          <span className="traditions-dot">·</span>
          <span>தவில்</span>
        </div>
      </motion.div>
    </SectionShell>
  )
}
