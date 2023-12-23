'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { Ticket, TicketUser } from '@/typings/ticket'
import { User, UserRole } from '@/typings/user'
import { getUserRoles } from '@/lib/auth'
import { ChatRoom } from '@/typings/chat_room'
import { AddUserPopover } from '@components/Chat/AddUserPopover'
import { Result } from '@/typings/result'

type ChatDetailsProps = {
  activeChat: Ticket | ChatRoom | null,
  openDetails: boolean,
  addMember: (user: User, role?: UserRole) => Promise<Result<void>>,
  removeMember: (user: User) => Promise<Result<void>>,
  formatUser: (user: User | TicketUser) => ReactNode,

  chatType: 'Ticket' | 'ChatRoom',
}

export function ChatDetails(
  {
    activeChat,
    openDetails,
    addMember,
    formatUser,
    chatType
  }: ChatDetailsProps) {
  const [canManage, setCanManage] = useState(false)

  useEffect(() => {
    const fetchRoles = async () => {
      const { isAdmin, isTm } = await getUserRoles()
      setCanManage(isAdmin || isTm)
    }

    fetchRoles()
  }, [])

  function isTicket(): boolean {
    return chatType === 'Ticket'
  }

  if (activeChat === null) return <></>
  return (
    <>
      <div
        className={`flex h-screen flex-col bg-[#FFFFFF] px-12 py-10 ${
          openDetails ? 'w-96' : 'hidden'
        }`}
      >
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium text-[#000000]'>
            {isTicket() ? 'Ticket Details' : 'Chat Details'}
          </span>
        </div>
        {canManage && (
          <AddUserPopover chat={activeChat} addMember={addMember} />
        )}
        {canManage && isTicket() && (
          <div>
          {/*  todo add set status */}
          </div>
        )}
        <div className='flex flex-col'>
          <span className='flex items-center gap-2 text-sm font-medium text-[#ABABAD]'>
            <Users color='#ABABAD' size={20} />
            Members
            <span className='rounded-sm bg-[#EAFAFE] px-3 text-xs text-[#75A9BC]'>
              {activeChat.users.length + (isTicket() ? 1 : 0)}
            </span>
          </span>
          <div className='mt-5 flex flex-col gap-4'>
            {activeChat.users && activeChat.users.map((member) => {
              return formatUser(member)
            })}
            {isTicket() ? formatUser((activeChat as Ticket).user) : ''}
          </div>
        </div>
      </div>
    </>
  )
}

