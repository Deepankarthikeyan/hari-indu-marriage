import { useMemo } from 'react'
import './FallingPetals.css'

export function FallingPetals({ count = 12 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 13 + 5) % 95}%`,
        delay: (i % 6) * 0.6,
        dur: 5 + (i % 4),
        color: ['#f8e8c8', '#f4a460', '#fff5e6', '#e8a598'][i % 4],
      })),
    [count],
  )

  return (
    <div className="falling-petals" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="falling-petal"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            background: p.color,
          }}
        />
      ))}
    </div>
  )
}
