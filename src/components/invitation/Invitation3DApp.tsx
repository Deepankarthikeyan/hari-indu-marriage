import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { weddingConfig } from '../../config/wedding'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import WeddingSceneCanvas from '../three/WeddingSceneCanvas'
import InviteHeroOverlay from './InviteHeroOverlay'
import InvitationSections from './InvitationSections'
import { useInvitationGsap } from './hooks/useInvitationGsap'
import RopeBandCanvas from '../three/rope/RopeBandCanvas'

const NAV = [
  { href: '#invitation', label: 'Invitation' },
  { href: '#story', label: 'Story' },
  { href: '#events', label: 'Events' },
  { href: '#couple', label: 'Couple' },
  { href: '#traditions', label: 'Traditions' },
  { href: '#family', label: 'Family' },
  { href: '#venue', label: 'Venue' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#finale', label: 'Finale' },
]

export default function Invitation3DApp() {
  const { entered, markSeen } = useIntroSeen()
  const [gateProgress, setGateProgress] = useState(entered ? 1 : 0)
  const [gateOpening, setGateOpening] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [ropeProgress, setRopeProgress] = useState(0)
  const progressRef = useRef({ value: entered ? 1 : 0 })
  const { couple } = weddingConfig

  useInvitationGsap(entered)

  const gateOpen = gateProgress >= 0.98

  const finishUnlock = useCallback(() => {
    markSeen()
    document.body.classList.remove('ci-locked')
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [markSeen])

  const openGate = useCallback(() => {
    if (gateOpening || gateOpen) return
    setGateOpening(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setGateProgress(1)
      progressRef.current.value = 1
      setGateOpening(false)
      finishUnlock()
      return
    }
    progressRef.current.value = 0
    gsap.to(progressRef.current, {
      value: 1,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate: () => setGateProgress(progressRef.current.value),
      onComplete: () => {
        setGateOpening(false)
        finishUnlock()
      },
    })
  }, [gateOpen, gateOpening, finishUnlock])

  const skip = useCallback(() => {
    setGateProgress(1)
    progressRef.current.value = 1
    finishUnlock()
  }, [finishUnlock])

  useEffect(() => {
    document.body.classList.toggle('ci-locked', !entered)
    return () => document.body.classList.remove('ci-locked')
  }, [entered])

  useEffect(() => {
    if (entered) {
      setGateProgress(1)
      progressRef.current.value = 1
    }
  }, [entered])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      if (!entered) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = max > 0 ? window.scrollY / max : 0
      const p = Math.min(1, Math.max(0, (y - 0.04) / 0.88))
      setRopeProgress(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [entered])

  return (
    <div className="invite-3d-site">
      <WeddingSceneCanvas gateOpenProgress={gateProgress} siteEntered={entered} />

      <div className="invite-3d-ui">
        <header className={`ci-nav${scrolled ? ' is-scrolled' : ''}${entered ? '' : ' is-hidden'}`}>
          <a href="#invitation" className="ci-nav__brand script">{couple.groom.nameEn.charAt(0)} & {couple.bride.nameEn.charAt(0)}</a>
          <button type="button" className="ci-nav__toggle" aria-expanded={navOpen} onClick={() => setNavOpen((o) => !o)}>
            Menu
          </button>
          <nav className={`ci-nav__links${navOpen ? ' is-open' : ''}`}>
            {NAV.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setNavOpen(false)}>{l.label}</a>
            ))}
          </nav>
        </header>

        <InviteHeroOverlay
          gateOpen={gateOpen}
          gateOpening={gateOpening}
          siteEntered={entered}
          onOpenGate={openGate}
          onSkip={skip}
        />

        <main className={`ci-main invite-3d-main${entered ? ' is-visible' : ''}`}>
          <InvitationSections />
        </main>

        <RopeBandCanvas ropeProgress={ropeProgress} visible={entered} />

        <button type="button" className="ci-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
      </div>
    </div>
  )
}
