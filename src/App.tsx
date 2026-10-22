import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import LoveDoorIntro from './components/intro/LoveDoorIntro'
import MainSite from './components/MainSite'
import { useIntroSeen } from './hooks/useIntroSeen'

export default function App() {
  const reduceMotion = useReducedMotion()
  const { entered, markSeen } = useIntroSeen()

  useEffect(() => {
    if (reduceMotion && !entered) markSeen()
  }, [reduceMotion, entered, markSeen])

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {!entered ? (
          <LoveDoorIntro key="intro" onComplete={markSeen} />
        ) : (
          <motion.div
            key="main"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="main-wrap"
          >
            <MainSite />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
