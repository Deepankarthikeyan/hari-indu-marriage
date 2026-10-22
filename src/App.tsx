import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import TempleDoorIntro from './components/intro/TempleDoorIntro'
import MainSite from './components/MainSite'
import { useIntroSeen } from './hooks/useIntroSeen'

export default function App() {
  const reduceMotion = useReducedMotion()
  const { entered, markSeen } = useIntroSeen()

  useEffect(() => {
    if (reduceMotion && !entered) {
      markSeen()
    }
  }, [reduceMotion, entered, markSeen])

  const showIntro = !entered

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <TempleDoorIntro key="intro" onComplete={markSeen} />
        ) : (
          <motion.div
            key="main"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="main-wrap"
          >
            <MainSite />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
