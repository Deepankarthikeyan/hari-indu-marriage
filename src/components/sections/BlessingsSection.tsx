import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import { reveal } from '../motion'
import './BlessingsSection.css'

export default function BlessingsSection() {
  const { blessings } = weddingConfig

  return (
    <section className="blessings-trad" id="blessings">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">குடும்ப ஆசிகள்</p>
        <h2>Family Blessings</h2>
      </motion.header>

      <div className="blessings-grid">
        <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="tamil">{blessings.brideFamilyTa}</p>
          <p>{blessings.brideFamilyEn}</p>
          <footer>— Bride&apos;s family</footer>
        </motion.blockquote>
        <motion.blockquote variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.08 }}>
          <p className="tamil">{blessings.groomFamilyTa}</p>
          <p>{blessings.groomFamilyEn}</p>
          <footer>— Groom&apos;s family</footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
