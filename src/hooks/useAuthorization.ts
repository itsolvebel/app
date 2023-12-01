import { useMemo } from 'react'
import { User, UserRole } from '@/typings/user'
import { useFetch } from '@/hooks/useRequest'

type Response = {
  message: string
  data: {
    user: User
  }
}

// export const useUserRoles = () => {
//   const { data, loading, error } = useFetch<Response>('/user/roles')
//
//   if (error) {
//     console.error(error)
//   }
//
//   const roles = useMemo(() => {
//     return data?.data.user.roles || []
//   }, [data])
//
//   const isUser = useMemo(
//     () => roles.includes(UserRole.User),
//     [roles],
//   )
//
//   const isFreelancer = useMemo(
//     () => roles.includes(UserRole.Freelancer),
//     [roles],
//   )
//
//   const isTicketManager = useMemo(
//     () => roles.includes(UserRole.Tm),
//     [roles],
//   )
//
//   const isAdmin = useMemo(
//     () => roles.includes(UserRole.Admin),
//     [roles],
//   )
//
//   return { loading, roles, isUser, isFreelancer, isTicketManager, isAdmin }
// }
