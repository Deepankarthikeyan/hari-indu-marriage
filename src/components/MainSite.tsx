import { useEffect, useState } from 'react'
import AudioToggle from './ui/AudioToggle'
import VelMotif from './art/VelMotif'
import { TempleSeparator } from './wedding/Ornaments'
import { FallingPetals } from './decor/FallingPetals'
import HeroSection from './sections/HeroSection'
import DivineBlessingsSection from './sections/DivineBlessingsSection'
import InvitationSection from './sections/InvitationSection'
import StorySection from './sections/StorySection'
import TraditionsSection from './sections/TraditionsSection'
import CountdownSection from './sections/CountdownSection'
import EventsSection from './sections/EventsSection'
import VenueSection from './sections/VenueSection'
import GallerySection from './sections/GallerySection'
import BlessingsSection from './sections/BlessingsSection'
import RsvpSection from './sections/RsvpSection'
import ClosingMuruganSection from './sections/ClosingMuruganSection'
import SiteFooter from './sections/SiteFooter'
import './MainSite.css'

const NAV = [
  { href: '#top', label: 'Home' },
  { href: '#divine', label: 'அருள்' },
  { href: '#invitation', label: 'அழைப்பு' },
  { href: '#story', label: 'மணமக்கள்' },
  { href: '#traditions', label: 'மரபு' },
  { href: '#events', label: 'நிகழ்ச்சி' },
  { href: '#venue', label: 'இடம்' },
  { href: '#rsvp', label: 'RSVP' },
]

export default function MainSite() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site site-murugan site-hindu-wedding">
      <FallingPetals count={12} />
      <header className={`site-nav site-nav-temple ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="site-logo">
          <VelMotif size="sm" />
          <span className="tamil">ஹரிஹரன் · இந்துமதி</span>
        </a>
        <nav aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <AudioToggle />
      </header>

      <main>
        <HeroSection />
        <TempleSeparator />
        <DivineBlessingsSection />
        <InvitationSection />
        <StorySection />
        <TraditionsSection />
        <CountdownSection />
        <EventsSection />
        <VenueSection />
        <GallerySection />
        <BlessingsSection />
        <RsvpSection />
        <ClosingMuruganSection />
      </main>

      <SiteFooter />
    </div>
  )
}
