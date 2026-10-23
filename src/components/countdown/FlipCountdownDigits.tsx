import { useEffect, useRef } from 'react'

type Unit = { label: string; value: number }

type Props = {
  units: Unit[]
}

function FlipCell({ label, value }: Unit) {
  const text = String(value).padStart(2, '0')
  const prev = useRef(text)

  useEffect(() => {
    prev.current = text
  }, [text])

  const flipped = prev.current !== text

  return (
    <div className="flip-unit">
      <div className={`flip-digit${flipped ? ' is-flipping' : ''}`} key={text}>
        <span className="flip-digit__top">{text}</span>
        <span className="flip-digit__shadow" aria-hidden />
      </div>
      <span className="flip-unit__label">{label}</span>
    </div>
  )
}

export default function FlipCountdownDigits({ units }: Props) {
  return (
    <div className="flip-countdown" role="timer" aria-live="polite">
      {units.map((u) => (
        <FlipCell key={u.label} {...u} />
      ))}
    </div>
  )
}
