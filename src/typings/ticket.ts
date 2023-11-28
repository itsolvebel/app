import { User, UserRole } from '@/typings/user'
import { Category } from '@/typings/category'

export type Ticket = {
  id: string
  user: User
  users: TicketUser[]
  title: string
  description: string
  status: TicketStatus
  categories: Category[]
  deadline: Date | null
  budget: Number | null
  created_at: string
}

export type NewTicket = {
  title: string
  description: string
  categories: Category[]
  deadline: Date | null
  budget: Number | null
}

export type TicketUser = {
  id: string
  user: User
  role: UserRole
}

export enum TicketStatus {
  Closed,
  Completed,
  InProgress,
  Open,
}
