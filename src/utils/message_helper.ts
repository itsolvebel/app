import { ChatMessage, Message, TicketMessage } from '@/typings/messages'

export function toMessage(message: TicketMessage | ChatMessage): Message {
  return {
    message,
    status: 'Ok',
  }
}

export function generateMessageId(): string {
  const time = Math.floor(Date.now()).toString()
  const randomInt = Math.floor(Math.random() * 100)
  return time + randomInt.toString()
}
