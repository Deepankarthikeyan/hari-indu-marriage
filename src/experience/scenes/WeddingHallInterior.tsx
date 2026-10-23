import type { CSSProperties } from 'react'

type Props = {
  className?: string
  /** 0–1 hall “awakens” after doors open */
  reveal?: number
}

/** Decorated South Indian wedding hall — mandapam, garlands, lamps, offerings */
export default function WeddingHallInterior({ className = '', reveal = 1 }: Props) {
  const r = Math.min(1, Math.max(0, reveal))

  return (
    <div className={`wh-hall ${className}`} style={{ '--wh-reveal': String(r) } as CSSProperties}>
      <div className="wh-hall__warmth" aria-hidden />
      <img className="wh-hall__mandala" src="/assets/south-indian/mandala-gold.webp" alt="" aria-hidden />
      <img className="wh-hall__toran" src="/assets/south-indian/garland-header.png" alt="" aria-hidden />
      <div className="wh-hall__mandapam">
        <img src="/assets/wedding-stage-banner.jpg" alt="" aria-hidden loading="eager" />
        <div className="wh-hall__mandapam-glow" aria-hidden />
      </div>
      <img
        className="wh-hall__prop wh-hall__prop--lamp wh-hall__prop--l1 wh-hall__float"
        src="/assets/south-indian/kalash-pot.png"
        alt=""
        aria-hidden
      />
      <img
        className="wh-hall__prop wh-hall__prop--lamp wh-hall__prop--l2 wh-hall__float wh-hall__float--delay"
        src="/assets/south-indian/lotus.png"
        alt=""
        aria-hidden
      />
      <img className="wh-hall__elephant wh-hall__elephant--l" src="/assets/south-indian/twin-elephants-clean.png" alt="" aria-hidden />
      <img className="wh-hall__leaf wh-hall__leaf--l" src="/assets/south-indian/banana-leaf-left.webp" alt="" aria-hidden />
      <img className="wh-hall__leaf wh-hall__leaf--r" src="/assets/south-indian/banana-leaf-right.webp" alt="" aria-hidden />
      <div className="wh-hall__floor-kolam" aria-hidden />
      <div className="wh-hall__petal-layer" aria-hidden />
    </div>
  )
}
