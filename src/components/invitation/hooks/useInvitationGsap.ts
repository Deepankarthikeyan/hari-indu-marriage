import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useInvitationGsap(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.ci-reveal, .ci-line, .ci-tradition-card', { opacity: 1, y: 0, clearProps: 'all' })
        return
      }

      gsap.utils.toArray<HTMLElement>('.ci-reveal').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 55%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('.ci-section__title').forEach((title) => {
        gsap.from(title, {
          letterSpacing: '0.2em',
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: title, start: 'top 85%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.ci-line').forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          y: 18,
          duration: 0.75,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: line, start: 'top 90%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.ci-tradition-card').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -36 : 36,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.ci-timeline__grow').forEach((line) => {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: { trigger: line, start: 'top 75%', end: 'bottom 40%', scrub: 0.6 },
        })
      })

      gsap.utils.toArray<HTMLElement>('.ci-parallax').forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0.2)
        gsap.to(layer, {
          y: () => depth * 80,
          ease: 'none',
          scrollTrigger: {
            trigger: layer.closest('.ci-section') ?? layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [active])

  useLayoutEffect(() => {
    if (!active) return
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [active])
}
