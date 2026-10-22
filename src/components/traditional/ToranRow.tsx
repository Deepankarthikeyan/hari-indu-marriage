type Variant = 'hero' | 'footer'

const PATTERN = [1, 2, 1, 2, 1, 2, 1, 2] as const

export default function ToranRow({ variant }: { variant: Variant }) {
  const base = variant === 'hero' ? 'si-hero__toran' : 'si-footer__toran'
  const el = variant === 'hero' ? 'si-hero__toran-element' : 'si-footer__toran-element'

  return (
    <div className={base} aria-hidden>
      {PATTERN.map((type, i) => (
        <img
          key={i}
          className={`${el} ${el}--${i}`}
          src={`/assets/south-indian/toran-type-${type}.png`}
          alt=""
        />
      ))}
    </div>
  )
}
