'use client'

import { useState } from 'react'
import useLocalStorage from './_hooks/useLocalStorage'
import PageWrapper from './_components/wrapper'
import Input from './_components/input'
import Button from './_components/button'

export default function Home() {
  const [chatRoom, saveChatRoom] = useLocalStorage('chatRoom', null)
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [passcode, setPasscode] = useState('')

  const handle_form = async (event) => {
    event.preventDefault()
    // pass information to local storage
    saveChatRoom({ user, name, passcode, host })
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
