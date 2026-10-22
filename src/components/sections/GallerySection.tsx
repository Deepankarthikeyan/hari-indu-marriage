import { useState } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import Lightbox from '../ui/Lightbox'
import SectionShell from '../wedding/SectionShell'
import { reveal } from '../motion'
import './GallerySection.css'

export default function GallerySection() {
  const images = weddingConfig.gallery.images
  const [index, setIndex] = useState<number | null>(null)

  if (!images.length) return null

  const current = index !== null ? images[index] : null

  return (
    <SectionShell id="gallery" variant="gallery" className="gallery-wedding">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-title-ta tamil">நினைவுகள்</p>
        <h2 className="section-title">Wedding Gallery</h2>
      </motion.header>

      <div className="gallery-mosaic">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            className={`gallery-cell gallery-cell-${(i % 3) + 1}`}
            onClick={() => setIndex(i)}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        src={current?.src ?? null}
        alt={current?.alt ?? ''}
        onClose={() => setIndex(null)}
        onPrev={index !== null && index > 0 ? () => setIndex((i) => (i !== null ? i - 1 : null)) : undefined}
        onNext={
          index !== null && index < images.length - 1
            ? () => setIndex((i) => (i !== null ? i + 1 : null))
            : undefined
        }
      />
    </SectionShell>
  )
}
