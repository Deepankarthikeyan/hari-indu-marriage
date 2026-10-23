type Props = { className?: string }

export default function BridePortrait({ className = '' }: Props) {
  return (
    <svg className={`ci-portrait ci-portrait--bride ${className}`} viewBox="0 0 160 280" role="img" aria-label="Bride in Kanjeevaram saree">
      <defs>
        <linearGradient id="ci-bride-saree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9e1a3a" />
          <stop offset="100%" stopColor="#5c1028" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="268" rx="48" ry="7" fill="rgba(60,30,20,0.1)" />
      <path d="M35 145 Q25 230 30 275 L130 275 Q135 230 125 145 Z" fill="url(#ci-bride-saree)" />
      <path d="M45 145 L115 145 L105 175 L55 175 Z" fill="#1a3d5c" />
      <circle cx="80" cy="72" r="30" fill="#f0c9a8" />
      <path d="M52 55 Q80 32 108 55" fill="#1a1410" />
      <circle cx="62" cy="50" r="5" fill="#fff5e8" />
      <circle cx="98" cy="50" r="5" fill="#fff5e8" />
      <circle cx="80" cy="82" r="15" fill="none" stroke="#d4af37" strokeWidth="2" />
      <path d="M70 95 Q80 110 90 95" fill="none" stroke="#d4af37" strokeWidth="1.5" />
    </svg>
  )
}
