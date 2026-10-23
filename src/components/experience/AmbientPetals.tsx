import { useMemo } from 'react'
import { weddingConfig } from '../../config/wedding'

const COLORS = ['#FFD6E5', '#FFB6C8', '#FFF0F5', '#E8437A', '#F5E0A8']

export default function AmbientPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3) % 100}%`,
      size: 6 + (i % 5) * 2,
      delay: (i * 0.7) % 12,
      duration: 14 + (i % 6) * 2,
      color: COLORS[i % COLORS.length],
    }))
  }, [])

  if (!weddingConfig.experience.ambientPetals) return null

  return (
    <div className="ambient-petals" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="ambient-petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
