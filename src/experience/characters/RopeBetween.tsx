type Props = {
  progress: number
  united?: boolean
  className?: string
}

/** Decorative wedding rope with scroll-driven sag and tension */
export default function RopeBetween({ progress, united = false, className = '' }: Props) {
  if (united) return null

  const t = Math.min(1, Math.max(0, progress))
  const leftX = 8 + t * 32
  const rightX = 92 - t * 32
  const sag = 18 - t * 10
  const midY = 42 + sag
  const cx = 50
  const tension = 1 - t * 0.35

  return (
    <svg className={`ws-rope-svg ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="rope-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="50%" stopColor="#e8d4a0" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
      </defs>
      <path
        d={`M ${leftX} 38 Q ${cx} ${midY * tension + 38} ${rightX} 38`}
        fill="none"
        stroke="url(#rope-grad)"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M ${leftX} 40 Q ${cx} ${midY * tension + 40} ${rightX} 40`}
        fill="none"
        stroke="#8b6914"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {[0.2, 0.4, 0.5, 0.6, 0.8].map((p) => {
        const x = leftX + (rightX - leftX) * p
        const y = 38 + Math.sin(p * Math.PI) * sag * tension * 0.3
        return <circle key={p} cx={x} cy={y} r="0.9" fill="#d4a843" />
      })}
    </svg>
  )
}
