import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import { reveal } from '../motion'
import './DivineBlessingsSection.css'

export default function DivineBlessingsSection() {
  const m = weddingConfig.murugan

  return (
    <section className="divine-blessings" id="divine">
      <motion.div className="divine-grid" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="divine-art">
          <VelMotif size="sm" className="divine-vel-top" glow />
          <MuruganVisual variant="hero" />
        </div>
        <div className="divine-copy">
          <p className="section-eyebrow tamil">{m.blessingTitleTa}</p>
          <h2>{m.blessingTitleEn}</h2>
          <p className="divine-text tamil">{m.blessingTa}</p>
          <p className="divine-text">{m.blessingEn}</p>
        </div>
      </motion.div>
    </section>
  )
}
