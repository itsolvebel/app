import { User } from '@/typings/user'

export type Message = {
  message: TicketMessage | ChatMessage
  status: MessageStatus
}

export type TicketMessage = {
  id: string
  user: User
  ticket_id: string
  content: string
  created_at: Date
  updated_at: Date
}

export type ChatMessage = {
  id: string
  user: User
  chat_room_id: string
  content: string
  created_at: Date
  updated_at: Date
}

export const messageStatus = ['Loading', 'Ok', 'Error'] as const
export type MessageStatus = typeof messageStatus[number]
