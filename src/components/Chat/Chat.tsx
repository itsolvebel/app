import { useEffect, useState } from 'react'

import Image from 'next/image'
import { ChatMessage, Message, TicketMessage } from '@/typings/messages'
import { User } from '@/typings/user'
import { getMe } from '@/lib/auth'
import { config } from '@/config'
import { ChatHeader } from '@components/Chat/ChatHeader'
import { ChatBody } from '@components/Chat/ChatBody'
import { ChatTextArea } from '@components/Chat/ChatTextArea'
import { toMessage } from '@/utils/message_helper'
import { Result } from '@/typings/result'
import { Ticket } from '@/typings/ticket'
import { ChatRoom } from '@/typings/chat_room'

type ChatProps = {
  loadMessages: (offset: number) => Promise<Result<Message[]>>,
  sendMessage: (content: string) => Promise<Result<Message>>,
  openDetails: boolean,
  activeChat: Ticket | ChatRoom | null,
  setOpenDetails: (openDetails: boolean) => void,
  chatType: 'Ticket' | 'ChatRoom',
}

export function Chat(
  {
    activeChat,
    openDetails,
    setOpenDetails,
    sendMessage,
    loadMessages,
    chatType,
  }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [me, setMe] = useState<User>()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const getUser = async () => {
      const user = await getMe()
      setMe(user)
    }
    getUser()
  }, [])

  useEffect(() => {
    const socket = new WebSocket(config.WEBSOCKET_URL)

    socket.onopen = () => {
      setSocket(socket)
    }

    socket.onmessage = (e) => {
      const message: TicketMessage | ChatMessage = JSON.parse(e.data)

      if (message.user.id === me?.id) return
      setMessages((messages) => [
        ...messages,
        toMessage(message),
      ])
    }

    return () => {
      socket.close()
    }
  }, [me])

  useEffect(() => {
    loadMessages(offset).then((res) => {
      setMessages(res.data)
      setLoadingMessages(false)
    })
  }, [loadMessages, offset])

  useEffect(() => {
    if (!activeChat || !socket) return

    socket.send(
      JSON.stringify({
          channel: activeChat.id,
        },
      ))

  }, [activeChat, socket])

  function send(content: string) {
    if (!me || !socket || !activeChat) return

    sendMessage(content).then((res) => {
      if (!res.success) return
      setMessages((messages) => [...messages, res.data])
    })
  }

  function isTicket(): boolean {
    return chatType === 'Ticket'
  }

  function getTitle(): string {
    if (!activeChat) return ''
    if (isTicket()) return (activeChat as Ticket).title
    return (activeChat as ChatRoom).name
  }

  if (activeChat === null)
    return (
      <div className='flex h-screen w-full flex-col'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-12 bg-[#E7F1FF]'>
          <Image
            src='/assets/notxtGray.png'
            width={200}
            height={200}
            className='opacity-5'
            alt='logo'
          />
          <h1 className='text-2xl font-bold text-gray-700'>
            {isTicket() ? 'Select a ticket to start chatting' : 'Select a chat to start chatting'}
          </h1>
        </div>
      </div>
    )

  return (
    <>
      <div className='flex h-screen w-full flex-col bg-[#E7F1FF]'>
        <ChatHeader
          title={getTitle()}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
        <ChatBody
          messages={messages}
          loadingMessages={loadingMessages}
          userId={me?.id || ''}
        />
        <ChatTextArea sendMessage={send} />
      </div>
    </>
  )
}
