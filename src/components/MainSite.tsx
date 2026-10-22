import { useEffect, useState } from 'react'
import AudioToggle from './ui/AudioToggle'
import HeroSection from './sections/HeroSection'
import InviteStrip from './sections/InviteStrip'
import StorySection from './sections/StorySection'
import CountdownSection from './sections/CountdownSection'
import EventsSection from './sections/EventsSection'
import GallerySection from './sections/GallerySection'
import ClosingSection from './sections/ClosingSection'
import './MainSite.css'

const NAV = [
  { href: '#story', label: 'Story' },
  { href: '#countdown', label: 'Countdown' },
  { href: '#events', label: 'Events' },
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
        <a href="#top" className="site-logo">H &amp; I</a>
        <nav aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <AudioToggle />
      </header>

      <main>
        <HeroSection />
        <InviteStrip />
        <StorySection />
        <CountdownSection />
        <EventsSection />
        <GallerySection />
        <ClosingSection />
      </main>

      <footer className="site-foot">
        <p>© {new Date().getFullYear()} — With love</p>
      </footer>
    </div>
  )
}
