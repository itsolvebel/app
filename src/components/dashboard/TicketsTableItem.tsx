import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { Ticket, TicketStatus } from '@/typings/ticket'
import { formatDateTime } from '@/utils/date_utils'

export default function TicketsTableItem({ ticket }: { ticket: Ticket }) {

  const statusColors: Record<TicketStatus, string> = {
    Closed: 'text-red-400 bg-red-400/30',
    Completed: 'text-green-400 bg-green-400/30',
    InProgress: 'text-yellow-400 bg-yellow-400/30',
    Open: 'text-blue-400 bg-blue-400/30',
  }

  return (
    <tr>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 '>
        {ticket.id}
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 '>
        {ticket.title}
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700'>
        <span
          className={`${statusColors[ticket.status]} rounded-xl py-1 px-3`}
        >
          {ticket.status}
        </span>
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 '>
        {ticket.status != 'Open' ? (
          <div className='flex items-center'>
            {ticket.user.avatar_url !== null ? (
              <div className=''>
                <Image
                  src={ticket.user.avatar_url}
                  alt='Avatar'
                  width={30}
                  height={30}
                  className='rounded-full'
                />
              </div>
            ) : (
              <div>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#E7F1FF]'>
                  <p className='text-xs font-bold text-[#ABABAD]'>
                    {ticket.user.first_name.charAt(0).toUpperCase() +
                      ticket.user.last_name.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>
            )}
            <span className='ml-2'>
              {ticket.user.first_name} {ticket.user.last_name}
            </span>
          </div>
        ) : (
          'Not claimed'
        )}
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 '>
        {formatDateTime(ticket.created_at)}
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 '>
        {ticket.deadline ? ticket.deadline.toString().split('T')[0] : 'None'}
      </th>
      <th
        className='whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700'>
        <MoreHorizontal
          size={30}
          color='#ABABAD'
          className='rounded-lg p-1 duration-150 hover:bg-[#00000010] hover:duration-150'
        />
      </th>
    </tr>
  )
}
