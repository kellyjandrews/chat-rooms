'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useLocalStorage from './_hooks/useLocalStorage'
import useRedirect from './_hooks/useRedirect'
import getJwt from './_lib/getJwt'
import PageWrapper from './_components/wrapper'
import Input from './_components/input'
import Button from './_components/button'

export default function Home() {
  const [chatRoom, saveChatRoom] = useLocalStorage('chatRoom', null)
  const router = useRouter()
  useRedirect(chatRoom, router)
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [passcode, setPasscode] = useState('')

  const handle_form = async (event) => {
    event.preventDefault()
    let submitEvent = event.nativeEvent.submitter.id
    let host = 0
    if (submitEvent === 'create') {
      host = 1 // password check? //login page?
    }

    let signature = await getJwt({ user, name, passcode, host })
    // pass information to local storage
    saveChatRoom({ signature, user, name, passcode, host })
  }

  return (
    <PageWrapper>
      <h1>Video Chat Rooms</h1>
      <form className="flex flex-col" onSubmit={handle_form}>
        <Input
          type="text"
          name="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          name="passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
        <div className="flex-col">
          <Button type="submit" id="create">
            Create
          </Button>
          <Button type="submit" id="join">
            Join
          </Button>
        </div>
      </form>
    </PageWrapper>
  )
}
