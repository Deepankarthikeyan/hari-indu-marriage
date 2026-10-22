import { useReducedMotion } from 'framer-motion'
import BrideIllustration from './characters/BrideIllustration'
import GroomIllustration from './characters/GroomIllustration'
import RopeBetween from './characters/RopeBetween'
import { useStoryScroll } from './hooks/useStoryScroll'
import StoryChapterPanels from './StoryChapterPanels'
import StoryScrollSections from './StoryScrollSections'

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
          <div className="ws-stage-bg" aria-hidden>
            <img className="ws-stage-bg__gopuram" src="/assets/south-indian/gopuram-silhouette.png" alt="" />
            <img className="ws-stage-bg__banana ws-stage-bg__banana--l" src="/assets/south-indian/banana-leaf-left.webp" alt="" />
            <img className="ws-stage-bg__banana ws-stage-bg__banana--r" src="/assets/south-indian/banana-leaf-right.webp" alt="" />
            <img className="ws-stage-bg__toran" src="/assets/south-indian/garland-header.png" alt="" />
          </div>

          <div className="ws-char-layer">
            <div className="ws-char-wrap ws-char-wrap--groom" style={{ left: `${groomX}%` }}>
              <GroomIllustration pull={charProgress} united={united} />
            </div>
            <div className="ws-char-wrap ws-char-wrap--bride" style={{ left: `${brideX}%` }}>
              <BrideIllustration pull={charProgress} united={united} />
            </div>
            <RopeBetween progress={charProgress} united={united} className="ws-rope-between" />
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
