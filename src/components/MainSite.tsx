import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import AmbientPetals from './experience/AmbientPetals'
import CurtainHero from './experience/CurtainHero'
import WxStorySection from './wx/WxStorySection'
import WxEventsSection from './wx/WxEventsSection'
import WxFamilySection from './wx/WxFamilySection'
import WxVenueSection from './wx/WxVenueSection'
import WxBlessingsSection from './wx/WxBlessingsSection'
import AudioToggle from './ui/AudioToggle'
import { useIntroSeen } from '../hooks/useIntroSeen'
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
    <div className="site site-wx">
      <AmbientPetals />
      <div className="sound-toggle sound-toggle--wedding wx-sound-slot">
        <AudioToggle />
      </div>

      <main id="wedding-main" className="wedding-main">
        <CurtainHero siteEntered={entered} onEnterSite={markSeen} />
        <WxStorySection />
        <WxEventsSection />
        <WxFamilySection />
        <WxVenueSection />
        <WxBlessingsSection />
      </main>

      <footer className="wx-footer">
        <p className="wx-footer__floral" aria-hidden>
          🪷 ✦ 🪷 ✦ 🪷
        </p>
        <p>{footer.thanksEn}</p>
        <p className="wx-footer__names tamil">
          {couple.groom.nameEn} <span>&</span> {couple.bride.nameEn}
        </p>
        <p className="wx-footer__copy">© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
