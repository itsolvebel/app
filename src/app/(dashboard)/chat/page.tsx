'use client'

import { useState } from 'react'
import DashboardSidebar from '@components/dashboard/Sidebar'
import { useSearchParams } from 'next/navigation'
import ChatSidebar from '@components/ChatSidebar'
import { ChatRoom } from '@/typings/chat_room'

export default function ChatPage() {
  const [activeChatRoom, setActiveChatRoom] = useState<ChatRoom | null>(null)
  const [openChatRoomDetails, setOpenChatRoomDetails] = useState(false)
  const searchParams = useSearchParams()
  const newTicket = searchParams.get('new')

  return (
    <>
      <div className='flex h-screen'>
        <DashboardSidebar />
        <ChatSidebar
          activeChatRoom={activeChatRoom}
          setActiveChatRoom={setActiveChatRoom}
          newChatRoomTitle={newTicket}
        />
        {/*<Chat*/}
        {/*  activeTicket={activeChatRoom}*/}
        {/*  openTicketDetails={openChatRoomDetails}*/}
        {/*  setOpenTicketDetails={setOpenChatRoomDetails}*/}
        {/*/>*/}
        {/*<ChatDetails*/}
        {/*  activeTicket={activeChatRoom}*/}
        {/*  openTicketDetails={openChatRoomDetails}*/}
        {/*/>*/}
      </div>
    </>
  )
}
