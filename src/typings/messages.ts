import { User } from '@/typings/user';

export type TicketMessage = {
  id: String
  user: User
  ticket_id: String
  content: String
  created_at: Date
  updated_at: Date
}

export type NewTicketMessage = {
  content: String
}
