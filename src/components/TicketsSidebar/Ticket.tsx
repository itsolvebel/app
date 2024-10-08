import { Ticket } from '@/typings/ticket'

type TicketProps = {
  ticket: Ticket,
  activeTicket: Ticket | null,
  setActiveTicket: (ticket: Ticket) => void
}

export function Ticket({ ticket, activeTicket, setActiveTicket }: TicketProps) {
  return (
    <div
      className={`flex h-24 w-full cursor-pointer flex-col justify-between rounded-xl px-8 py-6 transition-all duration-300 ${
        activeTicket && activeTicket.id === ticket.id
          ? 'bg-[#5A8ED1] text-white'
          : 'bg-[#F2F2F2] text-[#5A8ED1]'
      }`}
      onClick={() => {
        setActiveTicket(ticket)
      }}
    >
      <h1>{ticket.title}</h1>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-2'>
          <div className='h-2 w-2 rounded-full bg-green-500/75' />
          <span className='text-xs'>{ticket.status}</span>
        </div>
        <span className='text-xs opacity-50'>
          {/*{ticket.updated_at !== undefined ? formatDate(ticket.updated_at) : ""} TODO*/}
        </span>
      </div>
    </div>
  )
}
