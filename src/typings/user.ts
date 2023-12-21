import { Category } from '@/typings/category'

export type User = {
  id: string
  username: string
  first_name: string
  last_name: string
  email: string
  description: string | null
  avatar_url: string | null
  roles: UserRole[]
  categories: Category[]
}

export const userRoles = ['Admin', 'Freelancer', 'User', 'Tm', 'SalesRep'] as const
export type UserRole = typeof userRoles[number]
