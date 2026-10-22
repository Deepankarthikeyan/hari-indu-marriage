import { useState } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '../../config/wedding'
import Lightbox from '../ui/Lightbox'
import { fadeUp } from '../motion'
import './GallerySection.css'

export default function GallerySection() {
  const images = weddingConfig.gallery.images
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  if (!images.length) return null

  return (
    <section className="gallery-section" id="gallery">
      <motion.header
        className="section-head"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="tamil">நினைவுகள்</h2>
        <p>Gallery</p>
      </motion.header>

      <div className="gallery-grid">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            className="gallery-thumb"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setLightbox({ src: img.src, alt: img.alt })}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <Lightbox src={lightbox?.src ?? null} alt={lightbox?.alt ?? ''} onClose={() => setLightbox(null)} />
    </section>
  )
}
