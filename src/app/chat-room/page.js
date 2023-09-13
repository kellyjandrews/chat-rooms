'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'
import useLocalStorage from '../_hooks/useLocalStorage'
import useRedirect from '../_hooks/useRedirect'
import useUIToolKit from '../_hooks/useUIToolKit'

import PreviewWrapper from '../_components/preview'
import ChatRoomWrapper from '../_components/chatRoom'

export default function ChatRoomPage() {
  const [chatRoom, saveChatRoom] = useLocalStorage('chatRoom', null)
  const router = useRouter()
  useRedirect(chatRoom, router)
  useUIToolKit()
  const [roomState, setRoomState] = useState('preview')

  useEffect(() => {
    if (roomState === 'joined') {
      const initUIToolKit = (room) => {
        let UIToolKitConfig = {
          videoSDKJWT: room.signature,
          sessionName: room.name,
          userName: room.user,
          sessionPasscode: room.passcode,
          features: ['video', 'audio', 'settings', 'users', 'chat'],
        }
        window.ZoomUIToolKit.init(UIToolKitConfig)
        window.ZoomUIToolKit.join()
        window.ZoomUIToolKit.subscribe('uitoolkit-destroy', () => {
          setRoomState('preview')
          saveChatRoom(null)
        })
      }
      initUIToolKit(chatRoom)
    }
  }, [roomState, chatRoom, saveChatRoom])

  if (roomState === 'preview') {
    return (
      <PreviewWrapper>
        <app-previewkit />
        <button onClick={() => setRoomState('joined')}>Continue</button>
      </PreviewWrapper>
    )
  }
  if (roomState === 'joined') {
    return (
      <ChatRoomWrapper>
        <div id="UIToolkit">
          <app-uitoolkit />
        </div>
      </ChatRoomWrapper>
    )
  }
}
