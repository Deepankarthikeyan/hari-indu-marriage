import { useMemo } from 'react'

/** Soft floating petals — love ambience without emoji */
export default function LovePetalsLayer({ active }: { active: boolean }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 6.3) % 100}%`,
        delay: (i * 0.7) % 12,
        duration: 14 + (i % 5),
        size: 8 + (i % 4),
      })),
    [],
  )

  if (!active) return null

  return (
    <div className="wh-petals" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="wh-petals__one"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
