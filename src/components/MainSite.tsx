import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import AudioToggle from './ui/AudioToggle'
import { useIntroSeen } from '../hooks/useIntroSeen'
import AmbientMotes from './elegant/AmbientMotes'
import ChapterNav from './elegant/ChapterNav'
import ElegantGate from './elegant/ElegantGate'
import WelcomeSection from './elegant/WelcomeSection'
import NarrativeSection from './elegant/NarrativeSection'
import CeremonySection from './elegant/CeremonySection'
import FamiliesSection from './elegant/FamiliesSection'
import VenueElegantSection from './elegant/VenueElegantSection'
import FinaleSection from './elegant/FinaleSection'
import { weddingConfig } from '../config/wedding'
import './MainSite.css'

export default function MainSite() {
  const reduceMotion = useReducedMotion()
  const { entered, markSeen } = useIntroSeen()
  const { couple, footer } = weddingConfig

  useEffect(() => {
    if (reduceMotion && !entered) markSeen()
  }, [reduceMotion, entered, markSeen])

  return (
    <div className="site site-elegant">
      <AmbientMotes />
      <div className="e-audio-slot">
        <AudioToggle />
      </div>
      <ChapterNav visible={entered} />

      <main id="wedding-main" className="wedding-main">
        <ElegantGate siteEntered={entered} onEnterSite={markSeen} />
        <div className="e-main-content">
          <WelcomeSection />
          <NarrativeSection />
          <CeremonySection />
          <FamiliesSection />
          <VenueElegantSection />
          <FinaleSection />
        </div>
      </main>

      <footer className="e-footer">
        <strong className="tamil">{couple.groom.nameTa} · {couple.bride.nameTa}</strong>
        <p>{footer.thanksEn}</p>
        <p className="tamil">{footer.thanksTa}</p>
      </footer>
    </div>
  )
}
