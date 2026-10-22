import { weddingConfig } from '../config/wedding'
import AudioToggle from './ui/AudioToggle'
import InvitationHero from './sections/InvitationHero'
import CoupleSection from './sections/CoupleSection'
import CountdownSection from './sections/CountdownSection'
import EventsSection from './sections/EventsSection'
import GallerySection from './sections/GallerySection'
import ClosingSection from './sections/ClosingSection'
import './MainSite.css'

export default function MainSite() {
  return (
    <div className="main-site">
      <header className="site-header">
        <p className="header-brand tamil">{weddingConfig.invitation.titleTa}</p>
        <nav className="site-nav" aria-label="Invitation sections">
          <a href="#invitation">Invitation</a>
          <a href="#couple">Couple</a>
          <a href="#countdown">Countdown</a>
          <a href="#events">Events</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <AudioToggle className="header-audio" />
      </header>

      <InvitationHero />
      <CoupleSection />
      <CountdownSection />
      <EventsSection />
      <GallerySection />
      <ClosingSection />

      <footer className="site-footer">
        <p className="tamil">
          {weddingConfig.couple.bride.nameTa} &amp; {weddingConfig.couple.groom.nameTa}
        </p>
      </footer>
    </div>
  )
}
