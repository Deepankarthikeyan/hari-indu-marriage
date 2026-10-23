import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type StoryChapterId =
  | 'blessings'
  | 'couple'
  | 'traditions'
  | 'events'
  | 'venue'
  | 'finale'

/** Chapters revealed during the pinned rope scroll (ends before gallery / RSVP) */
export const CHAPTER_BREAKS: { id: StoryChapterId; start: number; end: number }[] = [
  { id: 'blessings', start: 0, end: 0.16 },
  { id: 'couple', start: 0.16, end: 0.32 },
  { id: 'traditions', start: 0.32, end: 0.48 },
  { id: 'events', start: 0.48, end: 0.64 },
  { id: 'venue', start: 0.64, end: 0.8 },
  { id: 'finale', start: 0.8, end: 1 },
]

const CHAR_TRAVEL_END = 0.82

export function chapterAtProgress(p: number): StoryChapterId {
  const t = Math.min(1, Math.max(0, p))
  return CHAPTER_BREAKS.find((c) => t >= c.start && t < c.end)?.id ?? 'finale'
}

export function localChapterProgress(p: number, id: StoryChapterId): number {
  const ch = CHAPTER_BREAKS.find((c) => c.id === id)
  if (!ch) return 0
  const span = ch.end - ch.start
  if (span <= 0) return 1
  return Math.min(1, Math.max(0, (p - ch.start) / span))
}

type Options = {
  enabled: boolean
  pinEndVh?: number
}

export function useStoryScroll({ enabled, pinEndVh = 420 }: Options) {
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (!enabled) return
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: () => `+=${pinEndVh}vh`,
        pin: stage,
        pinSpacing: true,
        scrub: 0.55,
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      })
    }, track)

    return () => ctx.revert()
  }, [enabled, pinEndVh])

  const charProgress = Math.min(1, progress / CHAR_TRAVEL_END)
  const groomX = 2 + charProgress * 34
  const brideX = 98 - charProgress * 34
  const united = progress >= 0.9

  return {
    trackRef,
    stageRef,
    progress,
    charProgress,
    groomX,
    brideX,
    united,
    activeChapter: chapterAtProgress(progress),
  }
}
