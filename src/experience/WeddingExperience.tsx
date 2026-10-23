import { useEffect } from 'react'
import { useIntroSeen } from '../hooks/useIntroSeen'
import AudioToggle from '../components/ui/AudioToggle'
import RopeScrollAct from './RopeScrollAct'
import StoryNavigation from './StoryNavigation'
import WeddingOpening from './WeddingOpening'

export default function WeddingExperience() {
  const { entered, markSeen } = useIntroSeen()

  useEffect(() => {
    document.body.style.overflow = entered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [entered])

  return (
    <div className="ws-root" id="si-story-top">
      {!entered && <WeddingOpening onEnter={markSeen} />}
      <StoryNavigation visible={entered} />
      <main className={entered ? 'ws-main' : 'ws-main ws-main--hidden'}>
        <RopeScrollAct introComplete={entered} />
      </main>
      {entered && (
        <div className="ws-floating-audio">
          <AudioToggle />
        </div>
      )}
    </div>
  )
}
