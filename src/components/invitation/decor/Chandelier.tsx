export default function Chandelier({ className = '' }: { className?: string }) {
  return (
    <svg className={`ci-chandelier ${className}`} viewBox="0 0 200 120" aria-hidden>
      <defs>
        <linearGradient id="ci-chandelier-gold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5e6b8" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7b2e" />
        </linearGradient>
      </defs>
      <line x1="100" y1="0" x2="100" y2="22" stroke="url(#ci-chandelier-gold)" strokeWidth="2" />
      <ellipse cx="100" cy="26" rx="28" ry="8" fill="url(#ci-chandelier-gold)" />
      {[70, 85, 100, 115, 130].map((x, i) => (
        <g key={x}>
          <line x1="100" y1="30" x2={x} y2={52 + i * 2} stroke="#c9a227" strokeWidth="1.2" />
          <circle cx={x} cy={58 + i * 2} r="5" fill="#ffe8a8" opacity="0.95" />
          <circle cx={x} cy={58 + i * 2} r="2" fill="#fff8e0" />
        </g>
      ))}
      <path d="M72 68 Q100 78 128 68 L124 88 Q100 96 76 88 Z" fill="url(#ci-chandelier-gold)" opacity="0.85" />
    </svg>
  )
}
