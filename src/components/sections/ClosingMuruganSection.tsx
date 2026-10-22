import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import { reveal } from '../motion'
import './ClosingMuruganSection.css'

export default function ClosingMuruganSection() {
  const { murugan, footer } = weddingConfig

  return (
    <section className="closing-murugan" id="closing">
      <motion.div className="closing-murugan-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <VelMotif size="md" glow className="closing-vel" />
        <MuruganVisual variant="closing" />
        <p className="tamil closing-bless">{murugan.closingTa}</p>
        <p className="closing-bless">{murugan.closingEn}</p>
        <p className="tamil closing-thanks">{footer.thanksTa}</p>
        <p className="closing-thanks">{footer.thanksEn}</p>
      </motion.div>
    </section>
  )
}
