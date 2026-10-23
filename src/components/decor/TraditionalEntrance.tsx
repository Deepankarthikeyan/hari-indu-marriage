import './TraditionalEntrance.css'

type Props = {
  variant?: 'full' | 'compact'
  className?: string
}

/** Banana trees, thoranam, lamps, kolam, fruit offering — CSS/SVG decor */
export default function TraditionalEntrance({ variant = 'full', className = '' }: Props) {
  return (
    <div className={`trad-entrance trad-${variant} ${className}`} aria-hidden>
      <div className="trad-thoranam" />
      <div className="trad-banana trad-banana-left">
        <div className="trad-trunk" />
        <div className="trad-leaves" />
        <div className="trad-banana-bunch" />
      </div>
      <div className="trad-banana trad-banana-right">
        <div className="trad-trunk" />
        <div className="trad-leaves" />
        <div className="trad-banana-bunch" />
      </div>
      <div className="trad-lamps">
        <span className="trad-vilakku" />
        <span className="trad-kalash" />
        <span className="trad-vilakku" />
      </div>
      <div className="trad-kolam-floor" />
      {variant === 'full' && (
        <div className="trad-fruits">
          <span>🥥</span><span>🍌</span><span>🍋</span><span>🍎</span>
        </div>
      )}
      <div className="trad-mandap-drape" />
    </div>
  )
}
