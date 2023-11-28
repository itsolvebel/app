'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, MessageCircle, Settings, Ticket, Users } from 'lucide-react'
import { useLogout } from '@/hooks/useAuthentication'
import { useUserRoles } from '@/hooks/useAuthorization'
import { User, UserRole } from '@/typings/user'
import { useFetch } from '@/hooks/useRequest'

type SidebarItem = {
  name: string
  icon: any
  href: string
  whoAccess: UserRole[]
}

export default function Sidebar() {
  const [hovered, setHovered] = useState(false)
  const { loading, roles } = useUserRoles()
  const { data } = useFetch<User>('/auth/me')
  const { logout } = useLogout()
  const route = usePathname()

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: LayoutGrid,
      href: '/dashboard',
      whoAccess: [UserRole.Admin, UserRole.Tm],
    },
    {
      name: 'Users',
      icon: Users,
      href: '/dashboard/users',
      whoAccess: [UserRole.Admin],
    },
    {
      name: 'Chat',
      icon: MessageCircle,
      href: '/dashboard/chat',
      whoAccess: [UserRole.Admin, UserRole.Tm, UserRole.Freelancer],
    },
    /*{
      WILL COME LATER
      name: "Calendar",
      icon: CalendarDays,
      href: "/dashboard/calendar",
      whoAccess: ["Admin", "Tm", "Freelancer"],
    },*/
    {
      name: 'Tickets',
      icon: Ticket,
      href: '/dashboard/tickets',
      whoAccess: [UserRole.User, UserRole.Admin, UserRole.Tm, UserRole.Freelancer],
    },
    /*{
      WILL COME LATER
      name: "Files",
      icon: File,
      href: "/dashboard/files",
      whoAccess: ["Admin"],
    },*/
    {
      name: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      whoAccess: [UserRole.User, UserRole.Admin, UserRole.Tm, UserRole.Freelancer],
    },
  ]

  if (loading) return null
  if (!data) return null

  return (
    <div
      className={` flex h-screen flex-col items-center justify-between py-12 transition-all duration-300 ${
        hovered ? 'w-96 px-2' : ' w-32'
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className='flex flex-col items-center'>
        <Image
          src='/assets/notxt.png'
          alt='Logo'
          width={30}
          height={30}
          className='mb-16'
        />
        <div className='flex flex-col gap-4'>
          {sidebarItems.map((item, index) => {
            if (item.whoAccess.some((r) => roles.includes(r)))
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex w-full items-center gap-2 rounded-xl p-2.5  ${
                    item.href === route ? 'bg-[#5A8ED1]' : ''
                  } ${hovered ? 'min-w-[10rem]' : ''}`}
                >
                  <item.icon
                    size={20}
                    color={item.href === route ? '#ffffff' : '#ABABAD'}
                  />
                  {hovered && (
                    <p
                      className={`text-center font-medium text-${
                        item.href === route ? 'white' : '#ABABAD'
                      }`}
                    >
                      {item.name}
                    </p>
                  )}
                </Link>
              )
          })}
        </div>
      </div>
      <div className='flex w-full items-center justify-center'>
        {data.avatar_url !== null ? (
          <div className=''>
            <Image
              src={data.avatar_url}
              alt='Avatar'
              width={40}
              height={40}
              className='rounded-full'
            />
          </div>
        ) : (
          <div>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]'>
              <p className='text-sm font-bold text-[#ABABAD]'>
                {data.first_name.charAt(0).toUpperCase() +
                  data.last_name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        )}
        {hovered && (
          <div className='ml-4 flex flex-col'>
            <span className='font-bold'>
              {data.first_name + ' ' + data.last_name}
            </span>
            <span
              className='cursor-pointer text-sm font-medium'
              onClick={logout}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
