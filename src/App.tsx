import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import MuruganIntro from './components/intro/MuruganIntro'
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
          <MuruganIntro key="intro" onComplete={markSeen} />
        ) : (
          <motion.div
            key="main"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
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
