import { useMemo } from 'react'

type Props = { active: boolean }

export default function LoveAmbience({ active }: Props) {
  const items = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.7) % 100}%`,
      delay: (i * 0.55) % 14,
      duration: 16 + (i % 7),
      kind: i % 3 === 0 ? 'heart' : 'petal',
    }))
  }, [])

  if (!active) return null

  return (
    <div className="si-love-layer" aria-hidden>
      {items.map((item) =>
        item.kind === 'heart' ? (
          <span
            key={item.id}
            className="si-love-heart"
            style={{
              left: item.left,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            ♥
          </span>
        ) : (
          <span
            key={item.id}
            className="si-love-petal"
            style={{
              left: item.left,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          />
        ),
      )}
    </div>
  )
}
