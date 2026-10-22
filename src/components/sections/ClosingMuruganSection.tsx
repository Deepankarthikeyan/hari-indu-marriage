import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import MuruganVisual from '../art/MuruganVisual'
import VelMotif from '../art/VelMotif'
import SectionShell from '../wedding/SectionShell'
import { KolamDivider } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './ClosingMuruganSection.css'

export default function ClosingMuruganSection() {
  const { murugan, footer, couple } = weddingConfig

  return (
    <SectionShell id="closing" variant="peacock" className="closing-murugan">
      <motion.div className="closing-inner" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <VelMotif size="md" glow className="closing-vel" />
        <MuruganVisual variant="closing" />
        <KolamDivider />
        <p className="tamil closing-bless">{murugan.closingTa}</p>
        <p className="closing-bless">{murugan.closingEn}</p>
        <p className="closing-couple tamil">{couple.bride.nameTa} · {couple.groom.nameTa}</p>
        <p className="closing-couple-en">{couple.bride.nameEn} & {couple.groom.nameEn}</p>
        <p className="tamil closing-thanks">{footer.thanksTa}</p>
        <p className="closing-thanks">{footer.thanksEn}</p>
      </motion.div>
    </SectionShell>
  )
}
