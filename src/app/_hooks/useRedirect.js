'use client'

import { redirect, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useRedirect(localStorage) {
  const [firstLoadDone, setFirstLoadDone] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  console.log(localStorage)
  console.log(pathname)
  useEffect(() => {
    if (!firstLoadDone) setFirstLoadDone(true)
    if (pathname === '/chat-room' && localStorage === null) {
      router.replace('/')
    }

    if (pathname === '/' && localStorage !== null) {
      router.replace('/chat-room')
    }

    router.refresh()
  }, [firstLoadDone, localStorage, pathname, router])

  return
}
