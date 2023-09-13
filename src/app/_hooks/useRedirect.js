'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useRedirect(localStorage, router) {
  const [firstLoadDone, setFirstLoadDone] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setFirstLoadDone(true)
  }, [])

  useEffect(() => {
    let path
    if (!firstLoadDone) {
      return
    }

    if (pathname === '/chat-room' && localStorage === null) {
      path = '/'
      router.replace(path)
    }

    if (pathname === `/` && localStorage?.signature) {
      path = '/chat-room'
      router.push(path)
    }
  }, [firstLoadDone, localStorage, pathname, router])
}
