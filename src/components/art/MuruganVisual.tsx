import { weddingConfig } from '../../config/wedding'
import './MuruganVisual.css'

type Props = {
  className?: string
  variant?: 'hero' | 'intro' | 'closing'
}

export default function MuruganVisual({ className = '', variant = 'hero' }: Props) {
  const custom = weddingConfig.murugan.imageSrc?.trim()
  const src = custom || '/assets/murugan-art.svg'
  const alt = weddingConfig.murugan.imageAlt

  return (
    <figure className={`murugan-visual murugan-${variant} ${className}`}>
      <img src={src} alt={alt} className="murugan-img" loading={variant === 'hero' ? 'eager' : 'lazy'} />
      <div className="murugan-frame" aria-hidden />
    </figure>
  )
}
