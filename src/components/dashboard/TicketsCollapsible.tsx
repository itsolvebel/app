'use client'

import { useEffect, useState } from 'react'
import TicketsTableHead from './TicketsTableHead'
import TicketsTableItem from './TicketsTableItem'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { Ticket } from '@/typings/ticket'

export default function TicketsCollapsible() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // const getChatsRooms = async () => {
    //   const token = localStorage.getItem("token");
    //   const res = await fetch("http://localhost:3001/api/me/chatrooms", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": token,
    //     },
    //   });
    //   const data = await res.json();
    //   data.data = data.data.filter((chatRoom) => chatRoom.type === "ticket");
    //   setTickets(data.data);
    // };
    // getChatsRooms();
  }, [])

  return (
    <div className='mx-24 flex flex-col overflow-y-scroll rounded-xl border border-[#00000010]'>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className='flex justify-between px-8 py-4'>
          <div>
            <h1 className='text-xl font-bold'>Tickets</h1>
            <span className='text-gray-500'>
              Manage the tickets of clients.
            </span>
          </div>
          <CollapsibleTrigger className='flex items-center gap-2 rounded-xl bg-[#01A0C4] px-4 py-2'>
            {open ? (
              <ChevronUp size={25} color='#FFFFFF' />
            ) : (
              <ChevronDown size={25} color='#FFFFFF' />
            )}
            <span className='font-medium text-[#FFFFFF]'>
              {open ? 'Hide tickets' : 'Show tickets'}
            </span>
          </CollapsibleTrigger>
        </div>
        <Collapsible.Content>
          <table className='w-full border-collapse items-center bg-transparent '>
            <TicketsTableHead />

            <tbody>
            {tickets.map((ticket) => (
              <TicketsTableItem key={ticket.id} ticket={ticket} />
            ))}
            </tbody>
          </table>
        </Collapsible.Content>
      </Collapsible>
    </div>
  )
}
