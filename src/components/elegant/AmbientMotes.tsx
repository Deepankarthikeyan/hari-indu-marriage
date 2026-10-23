import { useMemo } from 'react'

export default function AmbientMotes() {
  const motes = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 4.1) % 100}%`,
        delay: (i * 0.45) % 10,
        duration: 12 + (i % 8),
        size: 2 + (i % 3),
      })),
    [],
  )

  return (
    <div className="e-motes" aria-hidden>
      {motes.map((m) => (
        <span
          key={m.id}
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
