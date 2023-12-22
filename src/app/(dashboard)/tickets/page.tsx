'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { Ticket, TicketUser } from '@/typings/ticket'
import { useSearchParams } from 'next/navigation'
import { Result } from '@/typings/result'
import { Message, TicketMessage } from '@/typings/messages'
import { fetcher } from '@/lib/fetcher'
import Image from 'next/image'
import { UserAvatarReplacement } from '@components/UserAvatarReplacement'
import { Sidebar } from '@components/dashboard/Sidebar'
import { TicketSidebar } from '@components/TicketsSidebar'
import { Chat } from '@components/Chat/Chat'
import { ChatDetails } from '@components/Chat/ChatDetails'
import { User, UserRole } from '@/typings/user'

export default function TicketPage() {
  const [activeTicket, setTicket] = useState<Ticket | null>(null)
  const [openTicketDetails, setDetails] = useState(false)
  const searchParams = useSearchParams()
  const newTicket = searchParams.get('new')

  useEffect(() => {
    setDetails(localStorage.getItem('chatDetails') === 'true')
  }, [])

  function setActiveTicket(ticket: Ticket) {
    fetcher.get(`tickets/${ticket.id}`)
      .then((res: Result<Ticket>) => {
          setTicket(res.data)
        },
      )
  }

  function setOpenTicketDetails(open: boolean) {
    localStorage.setItem('chatDetails', open.toString())
    setDetails(open)
  }

  async function sendMessage(content: string): Promise<Result<Message>> {
    if (!activeTicket) return Promise.reject('No active ticket')
    return fetcher.post(`tickets/${activeTicket.id}/messages`, { content })
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
    if (!activeTicket) return Promise.reject('No active ticket')
    return fetcher.get(`tickets/${activeTicket.id}/messages?offset=${offset}`)
      .then((res: Result<TicketMessage[]>) => {
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

  async function addMember(user: User, role: UserRole = 'User'): Promise<Result<void>> {
    if (!activeTicket) return Promise.reject('No active ticket')
    return fetcher.post(`tickets/${activeTicket.id}/users`,
      {
        user_id: user.id,
        role: role,
      })
      .then((res: Result<void>) => {
        return {
          success: true,
          status: 200, // todo fix
          message: res.message,
          data: res.data,
        }
      }).catch((err: Result<void>) => {
        return err
      })
  }

  async function removeMember(user: User): Promise<Result<void>> {
    if (!activeTicket) return Promise.reject('No active ticket')
    return fetcher.delete(`tickets/${activeTicket.id}/users`,
      {
        user_id: user.id,
      })
      .then((res: Result<void>) => {
        return {
          success: true,
          status: 200, // todo fix
          message: res.message,
          data: res.data,
        }
      }).catch((err: Result<void>) => {
        return err
      })
  }

  function formatUser(user: TicketUser | User): ReactNode {
    if (!('user' in user)) return
    const member = (user as TicketUser).user
    return (
      <>
        <div
          key={member.id}
          className='flex items-center gap-3 text-sm font-medium text-[#000000]'
        >
          {member.avatar_url === null ? (
            <UserAvatarReplacement user={member} />
          ) : (
            <Image
              src={member.avatar_url}
              alt='Picture of the author'
              width={35}
              height={35}
              className='rounded-full'
            />
          )}
          <div className='flex flex-col'>
            {member.first_name} {member.last_name}
            <span className={'text-xs text-[#ABABAD]'}>{user.role}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex h-screen'>
        <Sidebar />
        <TicketSidebar
          activeTicket={activeTicket}
          setActiveTicket={setActiveTicket}
          newTicketTitle={newTicket}
        />
        <Chat
          activeChat={activeTicket}
          sendMessage={sendMessage}
          loadMessages={loadMessages}
          openDetails={openTicketDetails}
          setOpenDetails={setOpenTicketDetails}
          chatType={'Ticket'}
        />
        <ChatDetails
          activeChat={activeTicket}
          openDetails={openTicketDetails}
          addMember={addMember}
          formatUser={formatUser}
          removeMember={removeMember}
        />
      </div>
    </>
  )
}
