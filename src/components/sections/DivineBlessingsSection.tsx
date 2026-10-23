import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import SectionShell from '../wedding/SectionShell'
import { KolamDivider } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './DivineBlessingsSection.css'

export default function DivineBlessingsSection() {
  const m = weddingConfig.murugan

  return (
    <SectionShell id="divine" variant="ivory" className="divine-section">
      <motion.div className="divine-asymmetric" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="divine-art-panel">
          <VelMotif size="md" glow className="divine-vel" />
          <MuruganVisual variant="hero" />
        </div>
        <div className="divine-text-panel">
          <p className="section-eyebrow tamil">{m.blessingTitleTa}</p>
          <h2 className="section-title">{m.blessingTitleEn}</h2>
          <KolamDivider />
          <p className="divine-text tamil">{m.blessingTa}</p>
          <p className="divine-text">{m.blessingEn}</p>
        </div>
      </motion.div>
    </SectionShell>
  )
}
