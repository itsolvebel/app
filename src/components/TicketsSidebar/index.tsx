import { useEffect, useState } from 'react'
import { Ticket } from '@/typings/ticket'
import { fetcher } from '@/lib/fetcher'
import { TicketLoading } from '@components/TicketsSidebar/TicketLoading'
import { Ticket as TicketComponent } from '@components/TicketsSidebar/Ticket'
import { NewTicketDialog } from '@components/TicketsSidebar/NewTicketDialog'

type ChatSidebarProps = {
  activeTicket: Ticket | null,
  setActiveTicket: (ticket: Ticket) => void,
  newTicketTitle: string | null
}

export function TicketSidebar({ activeTicket, setActiveTicket, newTicketTitle }: ChatSidebarProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loadingTickets, setLoadingTickets] = useState(true)
  useEffect(() => {
    const getTickets = async () => {
      await updateTickets()
      setLoadingTickets(false)
    }
    getTickets()
  }, [])

  async function updateTickets() {
    const res = await fetcher.get('/tickets')
    setTickets(res.data)
  }

  if (loadingTickets)
    return (
      <div
        className='relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300'>
        <div className='flex w-full flex-col items-center'>
          <h1 className='text-3xl font-bold text-[#5A8ED1]'>Tickets</h1>
          <div className='mt-8 flex w-full flex-col gap-4'>
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
          </div>
        </div>
      </div>
    )
  return (
    <div
      className='relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300'>
      <div className='flex w-full flex-col items-center'>
        <h1 className='text-3xl font-bold text-[#5A8ED1]'>Tickets</h1>
        <div className='mt-8 flex w-full flex-col gap-4'>
          <span className='text-center text-sm text-[#ABABAD]'>
            {tickets.length > 0
              ? 'Active Tickets'
              : 'You don\'t have any active tickets'}
          </span>
          <div className='overflow-y-scroll h-[calc(100vh-300px)] w-full flex flex-col gap-4 pb-8'>
          {tickets.filter(ticket => ticket.status === 'Open').map((ticket) => {
              return (
                <TicketComponent
                  key={ticket.id}
                  ticket={ticket}
                  activeTicket={activeTicket}
                  setActiveTicket={setActiveTicket}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 flex w-full flex-col bg-[#5A8ED1] p-5'>
        <h1 className='text-center font-bold text-white'>
          Want to start a new project?
        </h1>
        <span className='text-center text-sm text-[#FFFFFF87]'>
          You can have up to 5 parallel project running at once!
        </span>
        <NewTicketDialog updateTickets={updateTickets} title={newTicketTitle}>
          <button className='mt-4 rounded-xl bg-[#F2F2F2] py-2 font-bold text-[#5A8ED1]'>
            New ticket
          </button>
        </NewTicketDialog>
      </div>
    </div>
  )
}
