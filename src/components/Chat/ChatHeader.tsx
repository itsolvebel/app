import { Sidebar } from 'lucide-react'

type ChatHeaderProps = {
  title: string,
  openDetails: boolean,
  setOpenDetails: (openDetails: boolean) => void;
}

export function ChatHeader(
  {
    title,
    openDetails,
    setOpenDetails,
  }: ChatHeaderProps) {
  return (
    <div>
      <div className='flex items-center justify-between rounded-3xl bg-[#E7F1FF] px-12 py-8'>
        <div className='flex items-center'>
          <div className='ml-3 flex flex-col'>
            <p className='text-2xl font-bold text-gray-800'>
              {title}
            </p>
          </div>
        </div>
        <div className='flex items-center'>
          <div
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
              openDetails ? 'bg-[#5A8ED1]' : 'bg-transparent'
            }`}
            onClick={() => setOpenDetails(!openDetails)}
          >
            <Sidebar
              size={24}
              color={openDetails ? '#FFFFFF' : '#ABABAD'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
