import { useEffect, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import CurtainHero from './CurtainHero'
import InvitationSections from './InvitationSections'
import { useInvitationGsap } from './hooks/useInvitationGsap'

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

export default function CurtainInvitationSite() {
  const { entered, markSeen } = useIntroSeen()
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { couple } = weddingConfig

  useInvitationGsap(entered)

  useEffect(() => {
    document.body.classList.toggle('ci-locked', !entered)
    return () => document.body.classList.remove('ci-locked')
  }, [entered])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onUnlock = () => {
    markSeen()
    document.body.classList.remove('ci-locked')
    window.setTimeout(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }), 400)
  }

  return (
    <div className="ci-site">
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

      <CurtainHero unlocked={entered} onUnlock={onUnlock} />

      <main className={`ci-main${entered ? ' is-visible' : ''}`}>
        <InvitationSections />
      </main>

      <button type="button" className="ci-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>
    </div>
  )
}
