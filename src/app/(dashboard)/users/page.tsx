'use client'

import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '@components/dashboard/Sidebar'
import { UserTable } from '@components/Users/UsersTable'
import { fetcher } from '@/lib/fetcher'


export default function UserDashboard() {
  const [users, setUsers] = useState([])

  const abortControllerRef = useRef<AbortController>()

  useEffect(() => {
    abortControllerRef.current = new AbortController()
    fetchUsers()

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])
  const fetchUsers = () => {
    const token = localStorage.getItem('token')

    fetcher.get('/users', {
      signal: abortControllerRef.current?.signal,
    }).then((res) => {
      setUsers(res.data)
    }).catch(err => {
      if (!abortControllerRef.current?.signal.aborted) {
        console.log(err)
      }
    })

    return () => {
      abortControllerRef.current?.abort()
    }
  }

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <UserTable users={users} fetchUsers={fetchUsers} />
    </div>
  )
}
