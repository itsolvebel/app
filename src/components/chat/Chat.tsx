import { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatTextArea from './ChatTextArea'

import Image from 'next/image'
import { Ticket, TicketStatus } from '@/typings/ticket'
import { TicketMessage } from '@/typings/messages'
import { User } from '@/typings/user'
import { getMe } from '@/lib/auth'

type ChatProps = {
  activeTicket: Ticket | null;
  openTicketDetails: boolean;
  setOpenTicketDetails: (open: boolean) => void;
}

export default function Chat({
                               activeTicket,
                               openTicketDetails,
                               setOpenTicketDetails,
                             }: ChatProps) {
  const [ticket, setTicket] = useState<Ticket>()
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [me, setMe] = useState<User>()
  useEffect(() => {
    const getUser = async () => {
      const user = await getMe()
      setMe(user)
    }
    const getChatRoom = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data = await res.json()
      setTicket(data.data)
    }
    if (activeTicket !== null) getChatRoom()
  }, [activeTicket])

  useEffect(() => {
    const getMessages = async () => {
      const res = await fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}/messages`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await res.json()
      setMessages(data.data)
      setLoadingMessages(false)
    }
    if (activeTicket !== null) getMessages()
  }, [activeTicket])

  useEffect(() => {
      if (activeTicket === null) return

      setTicket(undefined)
      setMessages([])
      setLoadingMessages(true)
    },
    [activeTicket],
  )

  function sendMessage(content: string) {
    if (!ticket) return
    if (!me) return
    setMessages((messages) => [
      ...messages,
      {
        id: '0',
        ticket_id: ticket.id,
        content: content,
        user: me,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])

    const cancelMessage = () => {
      if (!me) return

      const newMessages = [...messages]
      newMessages[newMessages.length] = {
        id: '0',
        content,
        user: me,
        ticket_id: ticket.id,
        created_at: new Date(),
        updated_at: new Date(),
      }

      setMessages(newMessages)
    }

    try {
      fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        },
      ).then((res) => {
        if (res.status !== 201) {
          cancelMessage()
        }
      })
    } catch (e) {
      cancelMessage()
    }
  }

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001/ws')

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data)

      console.log(data)
      if (me && data.user.id === me.id) {
        const newMessages = [...messages]
        newMessages[newMessages.length] = {
          id: data.id,
          content: data.content,
          user: me,
          ticket_id: ticket?.id || '',
          created_at: new Date(),
          updated_at: new Date(),
        }

        setMessages(newMessages)
        return
      }

      setMessages((messages) => [
        ...messages,
        {
          id: '0',
          content: data.content,
          user: data.user.id,
          ticket_id: ticket?.id || '',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
    }
    return () => {
      socket.close()
    }
  }, [activeTicket])

  if (activeTicket === null)
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
            Select a ticket to start chatting
          </h1>
        </div>
      </div>
    )

  return (
    <>
      <div className='flex h-screen w-full flex-col rounded-3xl bg-[#E7F1FF]'>
        <ChatHeader
          title={ticket?.title || ''}
          status={ticket?.status || TicketStatus.Closed}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatBody
          messages={messages}
          loadingMessages={loadingMessages}
          userId={me?.id || ''}
        />
        <ChatTextArea sendMessage={sendMessage} />
      </div>
    </>
  )
}
