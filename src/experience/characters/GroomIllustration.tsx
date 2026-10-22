type Props = {
  pull: number
  united?: boolean
  className?: string
}

/** Traditional South Indian groom — layered SVG for scroll-driven poses */
export default function GroomIllustration({ pull, united = false, className = '' }: Props) {
  const armPull = united ? 8 : 12 + pull * 22
  const lean = united ? 4 : pull * 6
  const handX = united ? 78 : 72 + pull * 8

  return (
    <svg
      className={`ws-char ws-char--groom ${className}`}
      viewBox="0 0 140 300"
      role="img"
      aria-label="Groom in traditional wedding veshti"
    >
      <defs>
        <linearGradient id="groom-skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8b896" />
          <stop offset="100%" stopColor="#c9956e" />
        </linearGradient>
        <linearGradient id="groom-veshti" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="50%" stopColor="#e8c878" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
        <linearGradient id="groom-angav" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b1a1a" />
          <stop offset="100%" stopColor="#5c0f14" />
        </linearGradient>
      </defs>
      <g transform={`translate(${lean}, 0)`}>
        <ellipse cx="70" cy="278" rx="42" ry="8" fill="rgba(42,32,24,0.12)" />
        <path d="M38 155 L28 295 L112 295 L102 155 Z" fill="url(#groom-veshti)" />
        <path d="M55 155 L70 120 L85 155 Z" fill="url(#groom-angav)" opacity="0.95" />
        <path d="M42 155 Q70 175 98 155" fill="none" stroke="#b8860b" strokeWidth="2" />
        <rect x="62" y="108" width="16" height="52" rx="4" fill="url(#groom-angav)" />
        <circle cx="70" cy="72" r="28" fill="url(#groom-skin)" />
        <path d="M48 58 Q70 38 92 58 Q88 48 70 44 Q52 48 48 58" fill="#2a2018" />
        <ellipse cx="70" cy="78" rx="3" ry="2" fill="#5c4030" />
        <path d="M58 68 Q70 74 82 68" fill="none" stroke="#5c4030" strokeWidth="1.5" />
        <g transform={`rotate(${-armPull}, 52, 118)`}>
          <path d="M52 118 L28 108 L24 100" fill="none" stroke="url(#groom-skin)" strokeWidth="10" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${armPull * 0.3}, ${handX}, 115)`}>
          <path d={`M${handX - 8} 115 L${handX + 18} 108 L${handX + 22} 118`} fill="none" stroke="url(#groom-skin)" strokeWidth="9" strokeLinecap="round" />
          <circle cx={handX + 24} cy={112} r="5" fill="url(#groom-skin)" className="ws-char__hand" data-hand="groom" />
        </g>
        {united && (
          <path d="M88 112 Q95 108 102 112" fill="none" stroke="#d4a843" strokeWidth="2" opacity="0.8" />
        )}
      </g>
    </svg>
  )
}
