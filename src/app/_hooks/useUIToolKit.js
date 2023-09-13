import { useEffect } from 'react'

export default function useUIToolKit() {
  const loadUIKit = async () =>
    (await import('@zoom/videosdk-ui-toolkit')).default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadUIKit()
    }
  }, [])
}
