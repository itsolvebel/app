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

export enum UserRole {
  Admin,
  Freelancer,
  User,
  Tm,
  SalesRep,
}
export function getAllUserRoles(): UserRole[] {
  return Object.keys(UserRole).map(key => parseInt(key) as UserRole);
}
