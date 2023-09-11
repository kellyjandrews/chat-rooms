'use client'

import { useEffect, useState } from 'react'
import '@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css'
import useLocalStorage from '../_hooks/useLocalStorage'
import useRedirect from '../_hooks/useRedirect'
// import useUIToolKit from '../_hooks/useUIToolKit'

import PreviewWrapper from '../_components/preview'
import ChatRoomWrapper from '../_components/chatRoom'

export default function ChatRoom() {
  const [chatRoom, saveChatRoom] = useLocalStorage('chatRoom', null)
  useRedirect(chatRoom)
  const [roomState, setRoomState] = useState('loading')

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (typeof window !== 'undefined') {
      if (roomState === 'loading') {
        const loadLibrary = async () => {
          return await import('@zoom/videosdk-ui-toolkit').default
        }
        const UIToolkit = loadLibrary()
        setRoomState('preview')
      }

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
            setRoomState('loading')
            saveChatRoom(null)
          })
        }

        initUIToolKit(chatRoom)
      }
    }
  }, [roomState, chatRoom, saveChatRoom])

  if (roomState === 'loading') return <h1>Loading</h1>
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
