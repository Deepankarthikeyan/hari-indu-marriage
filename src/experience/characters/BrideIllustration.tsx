type Props = {
  pull: number
  united?: boolean
  className?: string
}

/** Traditional South Indian bride — Kanjeevaram saree, jasmine */
export default function BrideIllustration({ pull, united = false, className = '' }: Props) {
  const armPull = united ? -8 : -(12 + pull * 22)
  const lean = united ? -4 : -pull * 6
  const handX = united ? 62 : 68 - pull * 8

  return (
    <svg
      className={`ws-char ws-char--bride ${className}`}
      viewBox="0 0 140 300"
      role="img"
      aria-label="Bride in traditional Kanjeevaram saree"
    >
      <defs>
        <linearGradient id="bride-skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0c9a8" />
          <stop offset="100%" stopColor="#d4a574" />
        </linearGradient>
        <linearGradient id="bride-saree" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9e1a3a" />
          <stop offset="40%" stopColor="#c41e3a" />
          <stop offset="100%" stopColor="#6b1028" />
        </linearGradient>
        <linearGradient id="bride-blouse" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a4a6e" />
          <stop offset="100%" stopColor="#0d2d45" />
        </linearGradient>
      </defs>
      <g transform={`translate(${lean}, 0)`}>
        <ellipse cx="70" cy="278" rx="44" ry="8" fill="rgba(42,32,24,0.12)" />
        <path d="M32 140 Q20 220 24 295 L116 295 Q120 220 108 140 Z" fill="url(#bride-saree)" />
        <path d="M32 140 L108 140 L98 165 L42 165 Z" fill="url(#bride-blouse)" />
        <path d="M42 165 L70 200 L98 165" fill="url(#bride-saree)" opacity="0.9" />
        <path d="M70 200 L70 295" stroke="#d4a843" strokeWidth="3" fill="none" />
        <circle cx="70" cy="68" r="26" fill="url(#bride-skin)" />
        <path d="M44 52 Q70 32 96 52 Q90 42 70 38 Q50 42 44 52" fill="#1a1410" />
        <circle cx="52" cy="48" r="4" fill="#fff8e8" opacity="0.9" />
        <circle cx="88" cy="48" r="4" fill="#fff8e8" opacity="0.9" />
        <circle cx="70" cy="58" r="3" fill="#c9956e" opacity="0.5" />
        <path d="M58 62 Q70 68 82 62" fill="none" stroke="#8b4513" strokeWidth="1.2" />
        <circle cx="70" cy="78" r="14" fill="none" stroke="#d4a843" strokeWidth="2" />
        <circle cx="70" cy="78" r="10" fill="none" stroke="#e8c878" strokeWidth="1" />
        <g transform={`rotate(${-armPull}, 88, 125)`}>
          <path d="M88 125 L112 115 L118 108" fill="none" stroke="url(#bride-skin)" strokeWidth="9" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${armPull * 0.25}, ${handX}, 118)`}>
          <path d={`M${handX + 8} 118 L${handX - 18} 110 L${handX - 22} 120`} fill="none" stroke="url(#bride-skin)" strokeWidth="8" strokeLinecap="round" />
          <circle cx={handX - 24} cy={114} r="5" fill="url(#bride-skin)" className="ws-char__hand" data-hand="bride" />
        </g>
        {united && (
          <path d="M52 112 Q45 108 38 112" fill="none" stroke="#d4a843" strokeWidth="2" opacity="0.8" />
        )}
      </g>
    </svg>
  )
}
