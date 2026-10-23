import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Lightbox.css'

type Props = {
  src: string | null
  alt: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function Lightbox({ src, alt, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          <motion.button type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
            ×
          </motion.button>
          {onPrev && (
            <button type="button" className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous">
              ‹
            </button>
          )}
          {onNext && (
            <button type="button" className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next">
              ›
            </button>
          )}
          <motion.img
            src={src}
            alt={alt}
            className="lightbox-image"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
