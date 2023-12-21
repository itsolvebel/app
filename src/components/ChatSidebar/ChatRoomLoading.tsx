export default function ChatRoomLoading() {
  return (
    <div className='flex h-24 w-full cursor-pointer flex-col justify-between rounded-xl bg-[#F2F2F2] px-8 py-6'>
      <div className='w-22 h-3 animate-pulse rounded-full bg-gray-200' />
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <div className='h-1 w-14 animate-pulse rounded-full bg-gray-200' />
        </div>
        <div className='h-2 w-8 animate-pulse rounded-full bg-gray-200' />
      </div>
    </div>
  )
}
