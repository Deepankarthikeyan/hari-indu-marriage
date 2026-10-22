import './VelMotif.css'

type Props = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

export default function VelMotif({ className = '', size = 'md', glow = false }: Props) {
  return (
    <svg
      className={`vel-motif vel-${size} ${glow ? 'vel-glow' : ''} ${className}`}
      viewBox="0 0 48 120"
      aria-hidden="true"
    >
      <path
        d="M24 4 L30 44 H18 L24 4 Z"
        fill="currentColor"
      />
      <path
        d="M24 44 L38 116 L24 108 L10 116 Z"
        fill="currentColor"
        opacity="0.92"
      />
      <circle cx="24" cy="8" r="3" fill="var(--gold)" />
    </svg>
  )
}
