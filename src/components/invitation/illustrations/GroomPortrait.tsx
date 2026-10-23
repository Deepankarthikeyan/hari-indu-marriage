type Props = { className?: string }

export default function GroomPortrait({ className = '' }: Props) {
  return (
    <svg className={`ci-portrait ci-portrait--groom ${className}`} viewBox="0 0 160 280" role="img" aria-label="Groom in traditional veshti">
      <ellipse cx="80" cy="268" rx="48" ry="7" fill="rgba(60,30,20,0.1)" />
      <path d="M40 155 L32 275 L128 275 L120 155 Z" fill="#e8c878" />
      <path d="M58 155 L80 118 L102 155 Z" fill="#6b1020" />
      <rect x="68" y="105" width="24" height="55" rx="3" fill="#6b1020" />
      <circle cx="80" cy="68" r="28" fill="#e8b896" />
      <ellipse cx="80" cy="52" rx="32" ry="14" fill="#5c4030" />
      <ellipse cx="80" cy="48" rx="22" ry="10" fill="#8b6914" />
      <path d="M62 78 Q80 84 98 78" fill="none" stroke="#5c4030" strokeWidth="1.5" />
    </svg>
  )
}
