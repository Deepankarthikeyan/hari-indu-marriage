import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import SectionShell from '../wedding/SectionShell'
import { GoldRule } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './BlessingsSection.css'

export default function BlessingsSection() {
  const { blessings } = weddingConfig

  return (
    <SectionShell id="family-blessings" variant="silk" className="family-bless">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">குடும்ப ஆசிகள்</p>
        <h2 className="section-title">Family Blessings</h2>
        <GoldRule wide />
      </motion.header>
      <div className="family-columns">
        <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="tamil">{blessings.brideFamilyTa}</p>
          <p>{blessings.brideFamilyEn}</p>
          <footer>Bride&apos;s family</footer>
        </motion.blockquote>
        <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.08 }}>
          <p className="tamil">{blessings.groomFamilyTa}</p>
          <p>{blessings.groomFamilyEn}</p>
          <footer>Groom&apos;s family</footer>
        </motion.blockquote>
      </div>
    </SectionShell>
  )
}
