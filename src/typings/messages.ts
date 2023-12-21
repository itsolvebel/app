import { User } from '@/typings/user'

export type TicketMessage = {
  id: string
  user: User
  ticket_id: string
  content: string
  created_at: Date
  updated_at: Date
}

export type NewTicketMessage = {
  id: string
  user: User
  chat_room_id: string
  content: string
  created_at: Date
  updated_at: Date
}
