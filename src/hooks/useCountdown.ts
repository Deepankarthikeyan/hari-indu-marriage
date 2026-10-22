import { useEffect, useState } from 'react'
import { getCeremonyStartDate } from '../utils/datetime'

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
  totalMs: number
}

export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => compute(target))

  useEffect(() => {
    const tick = () => setParts(compute(target))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return parts
}

function compute(target: Date): CountdownParts {
  const totalMs = target.getTime() - Date.now()
  const isPast = totalMs <= 0
  const diff = Math.max(0, totalMs)
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast,
    totalMs,
  }
}

export function useCeremonyCountdown() {
  return useCountdown(getCeremonyStartDate())
}
