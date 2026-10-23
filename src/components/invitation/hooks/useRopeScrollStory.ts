import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** GSAP scrub-linked rope progress (0 → 1) across the full scroll journey */
export function useRopeScrollStory(active: boolean, onProgress: (value: number) => void) {
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useLayoutEffect(() => {
    if (!active) {
      onProgressRef.current(0)
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const proxy = { value: 0 }

    const syncReduced = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = max > 0 ? window.scrollY / max : 0
      onProgressRef.current(Math.min(1, Math.max(0, y)))
    }

    if (reduced) {
      syncReduced()
      window.addEventListener('scroll', syncReduced, { passive: true })
      return () => window.removeEventListener('scroll', syncReduced)
    }

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
        onUpdate: () => onProgressRef.current(proxy.value),
      })
    })

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [active])
}

/** Pull intensity peaks mid-scroll for rope-tug storytelling */
export function ropePullIntensity(progress: number, united: boolean): number {
  if (united) return 0
  return Math.sin(Math.min(1, Math.max(0, progress)) * Math.PI) * 0.92
}
