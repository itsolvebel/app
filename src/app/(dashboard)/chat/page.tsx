'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChatRoom } from '@/typings/chat_room'
import { Result } from '@/typings/result'
import { ChatMessage, Message, TicketMessage } from '@/typings/messages'
import { fetcher } from '@/lib/fetcher'
import { Sidebar } from '@components/dashboard/Sidebar'
import { ChatSidebar } from '@components/ChatSidebar'
import { Chat } from '@components/Chat/Chat'
import { ChatDetails } from '@components/Chat/ChatDetails'
import { User } from '@/typings/user'
import { UserAvatarReplacement } from '@components/UserAvatarReplacement'
import Image from 'next/image'
import { TicketUser } from '@/typings/ticket'


export default function ChatPage() {
  const [activeChatRoom, setRoom] = useState<ChatRoom | null>(null)
  const [openChatRoomDetails, setDetails] = useState(false)
  const searchParams = useSearchParams()
  const newTicket = searchParams.get('new')

  useEffect(() => {
    setDetails(localStorage.getItem('chatDetails') === 'true')
  }, [])

  function setActiveChatRoom(chatRoom: ChatRoom) {
    fetcher.get(`chat_rooms/${chatRoom.id}`)
      .then((res: Result<ChatRoom>) => {
        setRoom(res.data)
      })
  }

  function setOpenChatRoomDetails(open: boolean) {
    localStorage.setItem('chatDetails', open.toString())
    setDetails(open)
  }

  async function sendMessage(content: string): Promise<Result<Message>> {
    if (!activeChatRoom) return Promise.reject('No active chat')
    return fetcher.post(`chat_rooms/${activeChatRoom.id}/messages`, { content })
      .then((res: Result<TicketMessage>) => {
        let message: Message = {
          message: res.data,
          status: 'Ok',
        }

        return {
          success: true,
          status: 200, // todo fix
          message: res.message,
          data: message,
        }
      }).catch((err: Result<Message>) => {
        return err
      })
  }

  async function loadMessages(offset: number): Promise<Result<Message[]>> {
    if (!activeChatRoom) return Promise.reject('No active chat')
    return fetcher.get(`chat_rooms/${activeChatRoom.id}/messages?offset=${offset}`)
      .then((res: Result<ChatMessage[]>) => {
        let messages: Message[] = []
        res.data.forEach((message) => {
          messages.push({
            message: message,
            status: 'Ok',
          })
        })
        return {
          success: true,
          status: 200, // todo fix
          message: res.message,
          data: messages,
        }
      }).catch((err: Result<Message[]>) => {
        return err
      })
  }

  async function addMember(user: User): Promise<Result<void>> {
    if (!activeChatRoom) return Promise.reject('No active chat')
    return fetcher.post(`chat_rooms/${activeChatRoom.id}/users`, {
      user_id: user.id,
    })
      .then((res: Result<void>) => {
        return res
      }).catch((err: Result<void>) => {
        return err
      })
  }

  async function removeMember(user: User): Promise<Result<void>> {
    if (!activeChatRoom) return Promise.reject('No active chat')
    return fetcher.delete(`chat_rooms/${activeChatRoom.id}/users`, {
      user_id: user.id,
    })
      .then((res: Result<void>) => {
        return res
      }).catch((err: Result<void>) => {
        return err
      })
  }

  function formatUser(user: TicketUser | User): ReactNode {
    if (!('username' in user)) return
    return (
      <>
        <div
          key={user.id}
          className='flex items-center gap-3 text-sm font-medium text-[#000000]'
        >
          {user.avatar_url === null ? (
            <UserAvatarReplacement user={user} />
          ) : (
            <Image
              src={user.avatar_url}
              alt='Picture of the author'
              width={35}
              height={35}
              className='rounded-full'
            />
          )}
          <div className='flex flex-col'>
            {user.first_name} {user.last_name}
            <span className={'text-xs text-[#ABABAD]'}>{user.roles}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex h-screen'>
        <Sidebar />
        <ChatSidebar
          activeChatRoom={activeChatRoom}
          setActiveChatRoom={setActiveChatRoom}
          newChatRoomTitle={newTicket}
        />
        <Chat
          activeChat={activeChatRoom}
          sendMessage={sendMessage}
          loadMessages={loadMessages}
          openDetails={openChatRoomDetails}
          setOpenDetails={setOpenChatRoomDetails}
          chatType={'ChatRoom'}
        />
        <ChatDetails
          activeChat={activeChatRoom}
          openDetails={openChatRoomDetails}
          addMember={addMember}
          formatUser={formatUser}
          removeMember={removeMember}
          chatType={'ChatRoom'}
        />
      </div>
    </>
  )
}
