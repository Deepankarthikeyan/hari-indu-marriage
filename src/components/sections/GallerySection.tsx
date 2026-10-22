import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import Lightbox from '../ui/Lightbox'
import { reveal } from '../motion'
import './GallerySection.css'

export default function GallerySection() {
  const images = weddingConfig.gallery.images
  const [index, setIndex] = useState<number | null>(null)

  const open = (i: number) => setIndex(i)
  const close = useCallback(() => setIndex(null), [])

  if (!images.length) return null

  const current = index !== null ? images[index] : null

  return (
    <section className="gallery-editorial" id="gallery">
      <motion.header variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="section-eyebrow tamil">நினைவுகள்</p>
        <h2>Photo Gallery</h2>
      </motion.header>

      <div className="gallery-masonry">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            className={`gallery-item gallery-item-${(i % 3) + 1}`}
            onClick={() => open(i)}
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
        onClose={close}
        onPrev={index !== null && index > 0 ? () => setIndex((i) => (i !== null ? i - 1 : null)) : undefined}
        onNext={
          index !== null && index < images.length - 1
            ? () => setIndex((i) => (i !== null ? i + 1 : null))
            : undefined
        }
      />
    </section>
  )
}
