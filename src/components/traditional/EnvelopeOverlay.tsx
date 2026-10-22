import { weddingConfig } from '../../config/wedding'
import KolamSvg from './KolamSvg'

type Props = {
  guestName: string
  closing: boolean
  onOpen: () => void
}

export default function EnvelopeOverlay({ guestName, closing, onOpen }: Props) {
  const { couple, traditional } = weddingConfig
  const groomFirst = couple.groom.nameEn.split(' ').pop() ?? couple.groom.nameEn
  const brideFirst = couple.bride.nameEn.split(' ').pop() ?? couple.bride.nameEn

  return (
    <div className={`si-envelope-overlay${closing ? ' is-closing' : ''}`} role="dialog" aria-label="Wedding invitation envelope">
      <div className="si-ec__flash" aria-hidden />
      <KolamSvg />
      <div className="si-ec__mandalas" aria-hidden>
        <img className="si-ec__mandala si-ec__mandala--top-right" src="/assets/south-indian/mandala-gold.webp" alt="" />
        <img className="si-ec__mandala si-ec__mandala--bottom-left" src="/assets/south-indian/mandala-gold.webp" alt="" />
        <img className="si-ec__mandala si-ec__mandala--bottom-right" src="/assets/south-indian/mandala-gold.webp" alt="" />
      </div>

      <div className="si-ec__garland">
        <img className="si-ec__garland-img" src="/assets/south-indian/garland-header.png" alt="" />
      </div>

      <div className="si-envelope-scene">
        <div className="si-ec__ganesha">
          <img className="si-ec__ganesha-img" src="/assets/south-indian/ganesha.png" alt="Lord Ganesha" />
          <p className="si-ec__blessing">{traditional.ganeshaya}</p>
        </div>
        <div className="si-ec__divider">
          <img className="si-ec__divider-img" src="/assets/south-indian/gold-divider.svg" alt="" />
        </div>
        <div className="si-ec__text">
          <p className="si-envelope__label">{traditional.envelopeLabel}</p>
          <p className="si-envelope__names si-envelope__names--stacked">
            <span className="si-envelope__names-line">{groomFirst}</span>
            <span className="si-envelope__names-and--own-line">&</span>
            <span className="si-envelope__names-line">{brideFirst}</span>
          </p>
          {guestName && (
            <p className="si-hero__guest-greeting" style={{ marginTop: '0.75rem' }}>
              Dear {guestName},
            </p>
          )}
        </div>
        <button type="button" className="si-envelope__cta" onClick={onOpen}>
          {traditional.openCta}
        </button>
      </div>

      <div className="si-ec__gopuram-footer" aria-hidden>
        <img className="si-ec__gopuram-img" src="/assets/south-indian/gopuram-silhouette.png" alt="" />
      </div>
    </div>
  )
}
