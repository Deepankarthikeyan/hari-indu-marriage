import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import AudioToggle from '../ui/AudioToggle'
import Chandelier from './decor/Chandelier'
import FloralCurtains from './decor/FloralCurtains'
import BridePortrait from './illustrations/BridePortrait'
import GroomPortrait from './illustrations/GroomPortrait'

type Props = {
  unlocked: boolean
  onUnlock: () => void
}

export default function CurtainHero({ unlocked, onUnlock }: Props) {
  const { couple, intro, hero, traditional } = weddingConfig
  const [open, setOpen] = useState(unlocked)
  const rootRef = useRef<HTMLElement>(null)
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  const handleOpen = () => {
    if (open) return
    setOpen(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onUnlock()
      return
    }
    const root = rootRef.current
    if (!root) {
      onUnlock()
      return
    }
    const tl = gsap.timeline({ onComplete: onUnlock })
    tl.to(root.querySelector('.ci-curtain--left'), { xPercent: -105, duration: 1.6, ease: 'power2.inOut' }, 0)
    tl.to(root.querySelector('.ci-curtain--right'), { xPercent: 105, duration: 1.6, ease: 'power2.inOut' }, 0)
    tl.to(root.querySelector('.ci-hero__petals'), { opacity: 0.6, duration: 0.8 }, 0.3)
  }

  useLayoutEffect(() => {
    if (unlocked) setOpen(true)
  }, [unlocked])

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || unlocked) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.ci-chandelier', { scale: 0.6, opacity: 0, duration: 1.2 })
      tl.from('.ci-hero__line', { y: 24, opacity: 0, stagger: 0.12, duration: 0.85 }, '-=0.5')
      tl.from('.ci-hero__portrait', { y: 40, opacity: 0, stagger: 0.15, duration: 1 }, '-=0.4')
      tl.from('.ci-hero__cta', { scale: 0.9, opacity: 0, duration: 0.7 }, '-=0.2')
      gsap.to('.ci-hero__petals span', {
        y: '+=30',
        rotation: '+=120',
        duration: 6,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.4, from: 'random' },
        ease: 'sine.inOut',
      })
    }, rootRef)
    return () => ctx.revert()
  }, [unlocked])

  return (
    <section id="invitation" ref={rootRef} className={`ci-hero${open ? ' is-open' : ''}${unlocked ? ' is-unlocked' : ''}`}>
      <div className="ci-hero__paper" aria-hidden />
      <FloralCurtains open={open || unlocked} />
      <div className="ci-hero__petals" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>

      <div className="ci-hero__top">
        <Chandelier />
      </div>

      <div className="ci-hero__stage">
        <div className="ci-hero__portrait ci-hero__portrait--groom">
          <GroomPortrait />
        </div>
        <div className="ci-hero__card">
          <p className="ci-hero__line ci-hero__blessing">{traditional.togetherEn}</p>
          <p className="ci-hero__line ci-hero__label">{intro.revealEn}</p>
          <h1 className="ci-hero__names script">
            {couple.bride.nameEn} & {couple.groom.nameEn}
          </h1>
          <p className="ci-hero__line ci-hero__date">{date.en}</p>
          <p className="ci-hero__line ci-hero__time">Muhurtham · {time.en.replace('Between ', '')}</p>
          <p className="ci-hero__line ci-hero__venue">{weddingConfig.ceremony.venueName}</p>
          <p className="ci-hero__line tamil ci-hero__ta">{hero.blessingTa}</p>
          {!unlocked && (
            <button type="button" className="ci-hero__cta ci-btn ci-btn--gold" onClick={handleOpen}>
              {traditional.openCta}
            </button>
          )}
        </div>
        <div className="ci-hero__portrait ci-hero__portrait--bride">
          <BridePortrait />
        </div>
      </div>

      <div className="ci-hero__tools">
        <button type="button" className="ci-hero__skip" onClick={() => { setOpen(true); onUnlock() }}>
          {intro.skipLabel}
        </button>
        <AudioToggle className="ci-audio" />
      </div>

      {unlocked && <p className="ci-hero__scroll">Scroll to explore our celebration ↓</p>}
    </section>
  )
}
