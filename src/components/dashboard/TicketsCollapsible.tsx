'use client'

import { useState } from 'react'
import TicketsTableHead from './TicketsTableHead'
import TicketsTableItem from './TicketsTableItem'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleTrigger, Content } from '@radix-ui/react-collapsible'
import { Ticket } from '@/typings/ticket'

type Props = {
  tickets: Ticket[]
}

export default function TicketsCollapsible({ tickets }: Props) {
  const [open, setOpen] = useState(false)

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
        <Content>
          <table className='w-full border-collapse items-center bg-transparent'>
            <TicketsTableHead />

            <tbody>
            {tickets.map((ticket) => (
              <TicketsTableItem key={ticket.id} ticket={ticket} />
            ))}
            </tbody>
          </table>
        </Content>
      </Collapsible>
    </div>
  )
}
