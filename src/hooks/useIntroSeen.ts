import { useCallback, useState } from 'react'
import { weddingConfig } from '../config/wedding'

const KEY = weddingConfig.intro.sessionKey

export function useIntroSeen() {
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode */
    }
    setEntered(true)
  }, [])

  return { entered, markSeen }
}
