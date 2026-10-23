import { useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import './AudioToggle.css'

type Props = {
  className?: string
}

export default function AudioToggle({ className = '' }: Props) {
  const { src, label } = weddingConfig.audio
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!src) return
    const el = new Audio(src)
    el.loop = true
    el.volume = 0.35
    audioRef.current = el
    return () => {
      el.pause()
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    const el = audioRef.current
    if (!el || !enabled) return
    el.muted = muted
    void el.play().catch(() => {
      /* autoplay policy */
    })
  }, [enabled, muted])

  if (!src) return null

  const toggle = async () => {
    if (!enabled) {
      setEnabled(true)
      setMuted(false)
      return
    }
    setMuted((m) => !m)
  }

  return (
    <button
      type="button"
      className={`audio-toggle ${className}`}
      onClick={toggle}
      aria-pressed={enabled && !muted}
      aria-label={enabled ? (muted ? 'Unmute wedding music' : 'Mute wedding music') : `Enable ${label}`}
    >
      <span className="audio-toggle-icon" aria-hidden>
        {enabled && !muted ? '🔊' : '🔇'}
      </span>
      <span className="audio-toggle-text">
        {enabled ? (muted ? 'Unmute' : 'Mute') : label}
      </span>
    </button>
  )
}
