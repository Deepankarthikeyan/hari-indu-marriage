import type { ReactNode } from 'react'

type Props = {
  /** 0 closed, 1 fully open */
  openProgress: number
  children?: ReactNode
}

/** South Indian temple entrance — stone arch, gopuram, carved wooden doors */
export default function TempleGateScene({ openProgress, children }: Props) {
  const p = Math.min(1, Math.max(0, openProgress))
  const leftAngle = -p * 94
  const rightAngle = p * 94

  return (
    <div className="tg-scene">
      <div className="tg-scene__sky" aria-hidden />
      <img className="tg-scene__gopuram" src="/assets/south-indian/gopuram-silhouette.png" alt="" aria-hidden />
      <img className="tg-scene__leaf tg-scene__leaf--l" src="/assets/south-indian/banana-leaf-left.webp" alt="" aria-hidden />
      <img className="tg-scene__leaf tg-scene__leaf--r" src="/assets/south-indian/banana-leaf-right.webp" alt="" aria-hidden />

      <div className="tg-scene__frame">
        <div className="tg-scene__stone tg-scene__stone--l" aria-hidden />
        <div className="tg-scene__stone tg-scene__stone--r" aria-hidden />
        <img className="tg-scene__toran" src="/assets/south-indian/garland-header.png" alt="" aria-hidden />

        <div className="tg-scene__sanctum">
          <div className="tg-scene__light" style={{ opacity: 0.35 + p * 0.55 }} aria-hidden />
          {children}
        </div>

        <div className="tg-scene__doors" style={{ perspective: '1400px' }}>
          <div
            className="tg-door tg-door--left"
            style={{
              transform: `rotateY(${leftAngle}deg)`,
              transformOrigin: 'left center',
            }}
          >
            <DoorFace side="left" />
          </div>
          <div
            className="tg-door tg-door--right"
            style={{
              transform: `rotateY(${rightAngle}deg)`,
              transformOrigin: 'right center',
            }}
          >
            <DoorFace side="right" />
          </div>
        </div>

        <div className="tg-scene__threshold" aria-hidden />
      </div>
    </div>
  )
}

function DoorFace({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`tg-door-face tg-door-face--${side}`}>
      <div className="tg-door-face__plank tg-door-face__plank--1" />
      <div className="tg-door-face__plank tg-door-face__plank--2" />
      <div className="tg-door-face__plank tg-door-face__plank--3" />
      <div className="tg-door-face__carving">
        <img src="/assets/south-indian/ganesha.png" alt="" aria-hidden />
      </div>
      <div className="tg-door-face__stud-row" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => <span key={i} />)}
      </div>
      <div className="tg-door-face__handle" aria-hidden />
    </div>
  )
}
