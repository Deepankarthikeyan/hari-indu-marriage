import { useEffect, useState } from 'react'
import { weddingConfig } from '../../config/wedding'
import { useIntroSeen } from '../../hooks/useIntroSeen'
import AmbientPetals from '../experience/AmbientPetals'
import GallerySection from '../sections/GallerySection'
import AudioToggle from '../ui/AudioToggle'
import WxBlessingsSection from '../wx/WxBlessingsSection'
import WxEventsSection from '../wx/WxEventsSection'
import WxFamilySection from '../wx/WxFamilySection'
import WxStorySection from '../wx/WxStorySection'
import WxVenueSection from '../wx/WxVenueSection'
import MandapPalaceHero from './MandapPalaceHero'
import WxFooter from './WxFooter'

const NAV = [
  { href: '#hero', label: 'Home' },
  { href: '#story', label: 'Our Story' },
  { href: '#events', label: 'Events' },
  { href: '#family', label: 'Family' },
  { href: '#venue', label: 'Venue' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#rsvp', label: 'Countdown' },
]

export default function MarriageWebSite() {
  const { entered, markSeen } = useIntroSeen()
  const [scrolled, setScrolled] = useState(false)
  const { couple } = weddingConfig

  useEffect(() => {
    document.body.classList.add('palace-site')
    return () => document.body.classList.remove('palace-site')
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="marriage-web-site palace-theme">
      <AmbientPetals />
      <header className={`header header--wedding header--palace${scrolled ? ' scrolled' : ''}${entered ? '' : ' is-hidden-nav'}`}>
        <div className="header__inner container">
          <a href="#hero" className="nav__logo script">{couple.groom.nameEn.charAt(0)} & {couple.bride.nameEn.charAt(0)}</a>
          <button type="button" className="nav__toggle" aria-label="Menu">
            <span /><span /><span />
          </button>
          <nav className="nav__menu" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>
          <AudioToggle className="sound-toggle sound-toggle--wedding" />
        </div>
      </header>

      <MandapPalaceHero siteEntered={entered} onEnterSite={markSeen} />

      <main className="wedding-main">
        <WxStorySection />
        <WxEventsSection />
        <WxFamilySection />
        <WxVenueSection />
        <div className="palace-gallery-wrap">
          <GallerySection />
        </div>
        <WxBlessingsSection />
      </main>

      <WxFooter />
    </div>
  )
}
