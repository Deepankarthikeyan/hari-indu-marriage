import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EntryPage from './components/EntryPage'
import MainSite from './components/MainSite'

export default function App() {
  const [entered, setEntered] = useState(false)

  const handleEnter = useCallback(() => {
    setEntered(true)
  }, [])

  return (
    <div className="app-root">
      <AnimatePresence mode="wait">
        {!entered ? (
          <EntryPage key="entry" onEnter={handleEnter} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="main-wrap"
          >
            <MainSite />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
