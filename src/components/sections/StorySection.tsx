import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import SectionShell from '../wedding/SectionShell'
import { GoldRule } from '../wedding/Ornaments'
import { reveal } from '../motion'
import './StorySection.css'

function AlbumFrame({
  person,
  role,
  align,
}: {
  person: (typeof weddingConfig.couple)['bride']
  role: 'bride' | 'groom'
  align: 'left' | 'right'
}) {
  const hasPhoto = Boolean(person.photoSrc?.trim())

  return (
    <motion.article
      className={`album-frame album-${align} album-${role}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="album-silk-frame">
        <div className="album-role">{role === 'bride' ? 'மணமகள்' : 'மணமகன்'}</div>
        {hasPhoto ? (
          <img src={person.photoSrc} alt={person.nameEn} className="album-photo" />
        ) : (
          <div className="album-photo album-placeholder">
            <span className="tamil">{role === 'bride' ? 'பட்டு சேலை' : 'வேஷ்டி & அங்கவஸ்திரம்'}</span>
            <span>Add photo in config</span>
          </div>
        )}
      </div>
      <h3 className="tamil album-name">{person.nameTa}</h3>
      <p className="album-name-en">{person.nameEn}</p>
      {person.subtitle && <p className="album-sub">{person.subtitle}</p>}
      {person.story && <p className="album-story">{person.story}</p>}
      {person.parents && <p className="album-parents">{person.parents}</p>}
    </motion.article>
  )
}

export default function StorySection() {
  const { couple } = weddingConfig

  return (
    <SectionShell id="story" variant="silk" className="story-album">
      <motion.header className="story-head" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">மணமக்கள்</p>
        <h2 className="section-title">Meet the Couple</h2>
        <GoldRule wide />
      </motion.header>

      <div className="story-album-grid">
        <AlbumFrame person={couple.bride} role="bride" align="left" />
        <AlbumFrame person={couple.groom} role="groom" align="right" />
      </div>
    </SectionShell>
  )
}
