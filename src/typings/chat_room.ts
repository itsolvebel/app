import { User } from '@/typings/user'

export type NewChatRoom = {
  name: string
  description: string
}

export type ChatRoom = {
  id: string
  name: string
  description: string
  users: User[]
  created_at: Date
  updated_at: Date
}
