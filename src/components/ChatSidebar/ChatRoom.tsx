import { ChatRoom as ChatRoomType } from '@/typings/chat_room'

type TicketProps = {
  chatRoom: ChatRoomType,
  activeChatRoom: ChatRoomType | null,
  setActiveChatRoom: (room: ChatRoomType) => void
}

export function ChatRoom({ chatRoom, activeChatRoom, setActiveChatRoom }: TicketProps) {
  return (
    <div
      className={`flex h-24 w-full cursor-pointer flex-col justify-between rounded-xl px-8 py-6 transition-all duration-300 ${
        activeChatRoom && activeChatRoom.id === chatRoom.id
          ? 'bg-[#5A8ED1] text-white'
          : 'bg-[#F2F2F2] text-[#5A8ED1]'
      }`}
      onClick={() => {
        setActiveChatRoom(chatRoom)
      }}
    >
      <h1>{chatRoom.name}</h1>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <span className='text-xs'>{chatRoom.description}</span>
        </div>
        <span className='text-xs opacity-50'>
          {/*{ticket.updated_at !== undefined ? formatDate(ticket.updated_at) : ""} TODO*/}
        </span>
      </div>
    </div>
  )
}
