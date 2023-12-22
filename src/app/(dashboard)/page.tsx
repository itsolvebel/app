'use client'
import { ShieldCheck, Ticket as TicketIcon, Users } from 'lucide-react'
import { User } from '@/typings/user'
import { TicketsCollapsible } from '@components/dashboard/TicketsCollapsible'
import { getMe } from '@/lib/auth'
import { useEffect, useState } from 'react'
import { FetchingError } from '@/lib/errors'
import { DefaultLoading } from '@components/DefaultLoading'
import { Sidebar } from '@components/dashboard/Sidebar'
import { Chart } from '@components/dashboard/Chart'
import { Ticket } from '@/typings/ticket'
import { fetcher } from '@/lib/fetcher'


function getGreeting() {
  const hour = new Date().getHours()

  const greetings = [
    'Good morning',
    'Good afternoon',
    'Good evening',
    'Good night',
  ]

  if (hour >= 5 && hour < 12) return greetings[0]
  if (hour >= 12 && hour < 18) return greetings[1]
  if (hour >= 18 && hour < 22) return greetings[2]
  if (hour >= 22 || hour < 5) return greetings[3]
}

export default function Dashboard() {
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)
  const [tickets, setTickets] = useState<Ticket[]>([])

  const charts = [
    {
      title: 'Total tickets',
      value: tickets.length,
      color: '#276eff',
      icon: TicketIcon,
    },
    {
      title: 'Completed tickets',
      value: tickets.filter((ticket) => ticket.status === 'Completed').length,
      color: '#01c156', icon: ShieldCheck,
    },
    {
      title: 'Total Users',
      value: 2,
      color: '#ffd727',
      icon: Users,
    },
  ]
  const greeting = getGreeting()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getMe()
        setUser(user)
        setIsLoading(false)
      } catch (err) {
        if (err instanceof FetchingError) {
          console.error(err.body)
        }
      }
    }

    const getTickets = async () => {
      const res = await fetcher.get('/tickets')
      setTickets(res.data)
    }

    getTickets()
    fetchData()
  }, [])
  if (isLoading) return <DefaultLoading />

  return (
    <>
      <div className='flex h-screen'>
        <Sidebar />
        <div className='w-full'>
          <div className='px-24 py-16'>
            <h1 className='text-3xl font-bold'>
              {greeting}, {user?.first_name}!
            </h1>
          </div>
          <div>
            <div className='flex justify-center gap-8 px-24 py-16 flex-wrap'>
              {charts.map((chart, index) => (
                <Chart
                  key={index}
                  title={chart.title}
                  value={chart.value}
                  color={chart.color}
                  Icon={chart.icon}
                />
              ))}
            </div>
            <TicketsCollapsible tickets={tickets} />
          </div>
        </div>
      </div>
    </>
  )
}
