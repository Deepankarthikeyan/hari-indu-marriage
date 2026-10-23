import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { weddingConfig } from '../../config/wedding'
import { formatCeremonyDateDisplay, formatCeremonyTimeDisplay } from '../../utils/datetime'
import AudioToggle from '../ui/AudioToggle'
import Chandelier from './decor/Chandelier'
import TempleGateScene from './decor/TempleGateScene'
import BridePortrait from './illustrations/BridePortrait'
import GroomPortrait from './illustrations/GroomPortrait'

type Props = {
  unlocked: boolean
  onUnlock: () => void
}

export default function CurtainHero({ unlocked, onUnlock }: Props) {
  const { couple, intro, hero, traditional, palace } = weddingConfig
  const [gateProgress, setGateProgress] = useState(unlocked ? 1 : 0)
  const [gateOpening, setGateOpening] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const progressRef = useRef({ value: unlocked ? 1 : 0 })
  const date = formatCeremonyDateDisplay()
  const time = formatCeremonyTimeDisplay()

  const openTempleGate = () => {
    if (gateOpening || gateProgress >= 1) return
    setGateOpening(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setGateProgress(1)
      progressRef.current.value = 1
      setGateOpening(false)
      window.setTimeout(onUnlock, 200)
      return
    }
    progressRef.current.value = 0
    gsap.to(progressRef.current, {
      value: 1,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => setGateProgress(progressRef.current.value),
      onComplete: () => {
        setGateOpening(false)
        revealInvitationContent()
        window.setTimeout(onUnlock, 600)
      },
    })
  }

  const revealInvitationContent = () => {
    const root = rootRef.current
    if (!root) return
    gsap.fromTo(
      root.querySelector('.ci-hero__invitation'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    )
    gsap.from(root.querySelector('.ci-chandelier'), { scale: 0.7, opacity: 0, duration: 1, delay: 0.2 })
  }

  useLayoutEffect(() => {
    if (unlocked) {
      setGateProgress(1)
      progressRef.current.value = 1
    }
  }, [unlocked])

  useLayoutEffect(() => {
    if (unlocked || gateProgress < 1) return
    revealInvitationContent()
  }, [unlocked, gateProgress])

  return (
    <section
      id="invitation"
      ref={rootRef}
      className={`ci-hero ci-hero--temple${gateProgress >= 1 ? ' is-gate-open' : ''}${unlocked ? ' is-unlocked' : ''}`}
    >
      <div className="ci-hero__paper" aria-hidden />

      <div className="ci-hero__gate-layer">
        <TempleGateScene openProgress={gateProgress}>
          <div className="ci-hero__invitation ci-hero__invitation--behind-gate">
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
              </div>
              <div className="ci-hero__portrait ci-hero__portrait--bride">
                <BridePortrait />
              </div>
            </div>
          </div>
        </TempleGateScene>

        {!unlocked && gateProgress < 0.02 && !gateOpening && (
          <div className="tg-open-ui">
            <p className="tg-open-ui__blessing tamil">{hero.blessingTa}</p>
            <p className="tg-open-ui__blessing">{hero.blessingEn}</p>
            <button
              type="button"
              className="tg-open-ui__btn ci-btn ci-btn--gold"
              onClick={openTempleGate}
              disabled={gateOpening}
            >
              {gateOpening ? 'Opening…' : palace.doorCtaEn}
            </button>
          </div>
        )}
      </div>

      <div className="ci-hero__petals" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
      </div>

      <div className="ci-hero__tools">
        <button
          type="button"
          className="ci-hero__skip"
          onClick={() => {
            setGateProgress(1)
            progressRef.current.value = 1
            onUnlock()
          }}
        >
          {intro.skipLabel}
        </button>
        <AudioToggle className="ci-audio" />
      </div>

      {unlocked && <p className="ci-hero__scroll">Scroll to explore our celebration ↓</p>}
    </section>
  )
}
