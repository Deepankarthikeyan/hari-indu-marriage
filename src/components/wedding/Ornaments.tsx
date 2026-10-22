import './Ornaments.css'

export function KolamDivider({ className = '' }: { className?: string }) {
  return <div className={`orn-kolam-divider ${className}`} aria-hidden />
}

export function GoldRule({ wide }: { wide?: boolean }) {
  return <div className={`orn-gold-rule ${wide ? 'orn-gold-wide' : ''}`} aria-hidden />
}

export function TempleSeparator() {
  return (
    <div className="orn-temple-sep" aria-hidden>
      <span className="orn-vel-mini" />
      <span className="orn-sep-line" />
      <span className="orn-vel-mini" />
    </div>
  )
}

export function SilkCorners() {
  return (
    <>
      <span className="orn-silk-corner orn-sc-tl" aria-hidden />
      <span className="orn-silk-corner orn-sc-tr" aria-hidden />
      <span className="orn-silk-corner orn-sc-bl" aria-hidden />
      <span className="orn-silk-corner orn-sc-br" aria-hidden />
    </>
  )
}
