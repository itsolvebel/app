import { useEffect, useState } from 'react'
import NewChatRoomDialog from './NewChatRoomDialog'
import ChatRoomLoading from './ChatRoomLoading'
import ChatRoom from './ChatRoom'
import { fetcher } from '@/lib/fetcher'
import { ChatRoom as ChatRoomType } from '@/typings/chat_room'
import { getUserRoles } from '@/lib/auth'

type ChatSidebarProps = {
  activeChatRoom: ChatRoomType | null,
  setActiveChatRoom: (ticket: ChatRoomType) => void,
  newChatRoomTitle: string | null
}

export default function ChatSidebar({ activeChatRoom, setActiveChatRoom, newChatRoomTitle }: ChatSidebarProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([])
  const [loadingChatRooms, setLoadingChatRooms] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const getChatRooms = async () => {
      await updateChatRooms()
      setLoadingChatRooms(false)
    }

    const setRoles = async () => {
      const { isAdmin } = await getUserRoles()
      setIsAdmin(isAdmin)
    }

    setRoles()
    getChatRooms()
  }, [])

  async function updateChatRooms() {
    const res = await fetcher.get('/chat_rooms')
    setChatRooms(res.data)
  }

  if (loadingChatRooms)
    return (
      <div
        className='relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300'>
        <div className='flex w-full flex-col items-center'>
          <h1 className='text-3xl font-bold text-[#5A8ED1]'>Chat</h1>
          <div className='mt-8 flex w-full flex-col gap-4'>
            {
              [1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <ChatRoomLoading key={i} />
              ))
            }
          </div>
        </div>
      </div>
    )
  return (
    <div
      className='relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300'>
      <div className='flex w-full flex-col items-center'>
        <h1 className='text-3xl font-bold text-[#5A8ED1]'>Chat</h1>
        <div className='mt-8 flex w-full flex-col gap-4'>
          <span className='text-center text-sm text-[#ABABAD]'>
            {chatRooms.length > 0
              ? 'Active Chat Groups'
              : 'You don\'t have any active Chat groups'}
          </span>
          {chatRooms.map((chatRoom) => {
            return (
              <ChatRoom
                key={chatRoom.id}
                chatRoom={chatRoom}
                activeChatRoom={activeChatRoom}
                setActiveChatRoom={setActiveChatRoom}
              />
            )
          })}
        </div>
      </div>
      {isAdmin && (<div className='absolute bottom-0 flex w-full flex-col bg-[#5A8ED1] p-5'>
        <NewChatRoomDialog updateChats={updateChatRooms} title={newChatRoomTitle}>
          <button className='mt-4 rounded-xl bg-[#F2F2F2] py-2 font-bold text-[#5A8ED1]'>
            New Chat Room
          </button>
        </NewChatRoomDialog>
      </div>)}
    </div>
  )
}
