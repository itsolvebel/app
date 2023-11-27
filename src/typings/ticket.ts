import { User, UserRole } from '@/typings/user'
import { Category } from '@/typings/category'

export type Ticket = {
  id: String
  user: String
  users: TicketUser[]
  title: String
  description: String
  status: TicketStatus
  categories: Category[]
  deadline: Date | null
  budget: Number | null
  created_at: String
}

export type NewTicket = {
  title: String
  description: String
  categories: Category[]
  deadline: Date | null
  budget: Number | null
}

export type TicketUser = {
  id: String
  user: User
  role: UserRole
}

export enum TicketStatus {
  Closed,
  Completed,
  InProgress,
  Open,
}
