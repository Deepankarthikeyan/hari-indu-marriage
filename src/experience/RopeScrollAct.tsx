import { useReducedMotion } from 'framer-motion'
import BrideIllustration from './characters/BrideIllustration'
import GroomIllustration from './characters/GroomIllustration'
import RopeBetween from './characters/RopeBetween'
import { useStoryScroll } from './hooks/useStoryScroll'
import StoryChapterPanels from './StoryChapterPanels'
import StoryScrollSections from './StoryScrollSections'
import GraspHandsLove from './scenes/GraspHandsLove'
import LovePetalsLayer from './scenes/LovePetalsLayer'
import WeddingHallInterior from './scenes/WeddingHallInterior'

type Props = { introComplete: boolean }

export default function RopeScrollAct({ introComplete }: Props) {
  const reduce = useReducedMotion()
  const scroll = useStoryScroll({ enabled: introComplete && !reduce, pinEndVh: 480 })

  if (reduce || !introComplete) {
    return <StoryScrollSections staticMode />
  }

  const { trackRef, stageRef, progress, charProgress, groomX, brideX, united, activeChapter } = scroll

  return (
    <>
      <div ref={trackRef} className="ws-pin-track" aria-label="Wedding story scroll journey">
        <div ref={stageRef} className="ws-rope-stage">
          <WeddingHallInterior className="ws-rope-stage__hall" reveal={0.35 + charProgress * 0.65} />
          <LovePetalsLayer active />

          <div className="ws-char-layer">
            <div className="ws-char-wrap ws-char-wrap--groom" style={{ left: `${groomX}%` }}>
              <GroomIllustration pull={charProgress} united={united} />
            </div>
            <div className="ws-char-wrap ws-char-wrap--bride" style={{ left: `${brideX}%` }}>
              <BrideIllustration pull={charProgress} united={united} />
            </div>
            <RopeBetween progress={charProgress} united={united} className="ws-rope-between" />
            <GraspHandsLove active={united} intensity={charProgress} />
          </div>

          <div className="ws-stage-center">
            <StoryChapterPanels chapter={activeChapter} progress={progress} />
          </div>

          <p className="ws-scroll-hint" aria-hidden>Scroll to follow the celebration</p>
        </div>
      </div>

      <StoryScrollSections progress={progress} />
    </>
  )
}
