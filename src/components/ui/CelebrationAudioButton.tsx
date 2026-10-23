import { useEffect, useRef, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import './AudioToggle.css'

type Props = {
  className?: string
}

/** Optional kettimelam / nadaswaram — never autoplays */
export default function CelebrationAudioButton({ className = '' }: Props) {
  const { celebrationSrc, celebrationLabel } = weddingConfig.audio
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!celebrationSrc) return
    const el = new Audio(celebrationSrc)
    el.loop = true
    el.volume = 0.45
    audioRef.current = el
    return () => {
      el.pause()
      audioRef.current = null
    }
  }, [celebrationSrc])

  if (!celebrationSrc) {
    return (
      <p className="wx-audio-placeholder">
        Add a licensed melam track in <code>weddingConfig.audio.celebrationSrc</code>
      </p>
    )
  }

  const toggle = async () => {
    const el = audioRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
      return
    }
    try {
      await el.play()
      setPlaying(true)
    } catch {
      /* user gesture required */
    }
  }

  return (
    <button
      type="button"
      className={`audio-toggle audio-toggle--celebration ${className}`}
      onClick={toggle}
      aria-pressed={playing}
    >
      <span className="audio-toggle-icon" aria-hidden>{playing ? '⏸' : '🥁'}</span>
      <span className="audio-toggle-text">{playing ? 'Pause celebration' : celebrationLabel}</span>
    </button>
  )
}
