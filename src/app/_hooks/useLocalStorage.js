import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue)
  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === 'undefined') {
        return initialValue
      }
      try {
        const item = secureLocalStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.error(error)
        return initialValue
      }
    }

    setStoredValue(fromLocal)
    setFirstLoadDone(true)
  }, [initialValue, key])

  useEffect(() => {
    if (!firstLoadDone) {
      return
    }

    try {
      if (typeof window !== 'undefined') {
        secureLocalStorage.setItem(key, JSON.stringify(storedValue))
      }
    } catch (error) {
      console.log(error)
    }
  }, [storedValue, firstLoadDone, key])
  console.log(storedValue)
  return [storedValue, setStoredValue]
}
