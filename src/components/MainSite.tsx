import { useEffect, useState } from 'react'
import AudioToggle from './ui/AudioToggle'
import HeroSection from './sections/HeroSection'
import InvitationSection from './sections/InvitationSection'
import StorySection from './sections/StorySection'
import CountdownSection from './sections/CountdownSection'
import EventsSection from './sections/EventsSection'
import VenueSection from './sections/VenueSection'
import GallerySection from './sections/GallerySection'
import BlessingsSection from './sections/BlessingsSection'
import RsvpSection from './sections/RsvpSection'
import SiteFooter from './sections/SiteFooter'
import './MainSite.css'

const NAV = [
  { href: '#invitation', label: 'Invitation' },
  { href: '#story', label: 'Couple' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#events', label: 'Events' },
  { href: '#venue', label: 'Venue' },
  { href: '#gallery', label: 'Gallery' },
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
    <div className="site">
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#top" className="site-logo tamil">திருமண அழைப்பிதழ்</a>
        <nav aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <AudioToggle />
      </header>

      <main>
        <HeroSection />
        <InvitationSection />
        <StorySection />
        <CountdownSection />
        <EventsSection />
        <VenueSection />
        <GallerySection />
        <BlessingsSection />
        <RsvpSection />
      </main>

      <SiteFooter />
    </div>
  )
}
