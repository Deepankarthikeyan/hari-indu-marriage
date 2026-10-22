/** Stylized South Indian temple gopuram silhouette */
export default function TempleGopuram({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M100 8 L108 28 L92 28 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M100 24 L118 52 L82 52 Z"
        fill="currentColor"
      />
      <path
        d="M100 48 L128 88 L72 88 Z"
        fill="currentColor"
      />
      <path
        d="M100 84 L138 140 L62 140 Z"
        fill="currentColor"
      />
      <rect x="55" y="140" width="90" height="120" fill="currentColor" />
      <rect x="70" y="200" width="24" height="60" fill="var(--cream, #f8f0d4)" opacity="0.35" />
      <rect x="106" y="200" width="24" height="60" fill="var(--cream, #f8f0d4)" opacity="0.35" />
      <path
        d="M40 260 H160 V272 H40 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="100" cy="18" r="4" fill="var(--gold, #c9a227)" />
    </svg>
  )
}
