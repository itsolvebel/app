import { useEffect, useState } from 'react'

import Image from 'next/image'
import { Ticket } from '@/typings/ticket'
import { TicketMessage } from '@/typings/messages'
import { User } from '@/typings/user'
import { getMe } from '@/lib/auth'
import { config } from '@/config'
import { fetcher } from '@/lib/fetcher'
import ChatHeader from '@components/Chat/ChatHeader'
import ChatBody from '@components/Chat/ChatBody'
import ChatTextArea from '@components/Chat/ChatTextArea'

type ChatProps = {
  activeTicket: Ticket | null;
  openTicketDetails: boolean;
  setOpenTicketDetails: (open: boolean) => void;
}

export enum TicketMsgStatus {
  LOADING,
  OK,
  ERROR
}

export type TicketMsgHelperType = {
  ticket: TicketMessage,
  status: TicketMsgStatus
}

function toTicketMessageHelper(ticketMessage: TicketMessage, status = TicketMsgStatus.OK) {
  return {
    ticket: ticketMessage,
    status: status,
  }
}

const generateRandomId = () => {
  const time = Math.floor(Date.now()).toString()
  const randomInt = Math.floor(Math.random() * 100)
  return time + randomInt.toString()
}
export default function Chat({
                               activeTicket,
                               openTicketDetails,
                               setOpenTicketDetails,
                             }: ChatProps) {
  const [ticket, setTicket] = useState<Ticket>()
  const [messages, setMessages] = useState<TicketMsgHelperType[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [me, setMe] = useState<User>()
  useEffect(() => {

    if (activeTicket === null) return

    const getUser = async () => {
      const user = await getMe()
      setMe(user)
    }
    const getChatRoom = async (ticketId: string) => {
      const data = await fetcher.get(`/tickets/${ticketId}`)
      setTicket(data.data)
    }
    if (activeTicket) getChatRoom(activeTicket.id)
    getUser()
  }, [activeTicket])


  useEffect(() => {
    const getMessages = async (id: string) => {
      const data = await fetcher.get(`tickets/${id}/messages`)
      setMessages(data.data.map((msg: TicketMessage) => toTicketMessageHelper(msg)))
      setLoadingMessages(false)
    }
    if (activeTicket !== null) getMessages(activeTicket.id)
  }, [activeTicket])

  function sendMessage(content: string) {
    if (!ticket) return
    if (!me) return


    const randomId = generateRandomId()
    const newTicketMessage: TicketMsgHelperType = {
      ticket: {
        id: randomId,
        ticket_id: ticket.id,
        content: content,
        user: me,
        created_at: new Date(),
        updated_at: new Date(),
      },
      status: TicketMsgStatus.LOADING,
    }
    setMessages((messages) => {
      return [...messages, newTicketMessage]
    })

    const cancelMessage = () => {
      if (!me) return

      // const newMessages = [...messages]; TODO
      // newMessages[newMessages.length] = {
      //   id: "0",
      //   content,
      //   user: me,
      //   ticket_id: ticket.id,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      // };

      // setMessages(newMessages);
    }

    try {
      if (activeTicket) {
        fetcher.post(`tickets/${activeTicket.id}/messages`, { content }).then((res) => {
          setMessages((messages) => {
            const index = messages.findIndex((message) => {
              return message.ticket.id === randomId
            })
            if (index === -1) {
              return messages
            }
            return messages.filter((_, idx) => idx !== index)
          })
        }).catch(err => {
          setMessages((messages) => {
            return messages.map((message) =>
              message.ticket.id === randomId ? {
                ...message,
                status: TicketMsgStatus.ERROR,
              } : message,
            )
          })
        })
      }


    } catch (e) {
      cancelMessage()
    }
  }

  useEffect(() => {
    const socket = new WebSocket(config.WEBSOCKET_URL)

    socket.onmessage = (e) => {

      const data = JSON.parse(e.data)
      // if (me && data.user.id === me.id) {
      //   const newMessages = [...messages];
      //   const newTicketMessage = {
      //     ticket: {
      //
      //     }
      //   }
      //   newMessages[newMessages.length] = {
      //     id: data.id,
      //     content: data.content,
      //     user: me,
      //     ticket_id: ticket?.id || "",
      //     created_at: new Date(),
      //     updated_at: new Date(),
      //   };
      //
      //   setMessages(newMessages);
      //   return;
      // }

      const newTicketMessage: TicketMessage = {
        id: data.id,
        content: data.content,
        user: data.user,
        ticket_id: ticket?.id || '',
        created_at: new Date(),
        updated_at: new Date(),
      }

      setMessages((messages) => [
        ...messages,
        {
          key: newTicketMessage.id,
          ticket: newTicketMessage,
          status: TicketMsgStatus.OK,
        },
      ])
    }
    return () => {
      socket.close()
    }
  }, [activeTicket])

  if (activeTicket === null)
    return (
      <div className='flex h-screen w-full flex-col'>
        <div className='flex h-full w-full flex-col items-center justify-center gap-12 bg-[#E7F1FF]'>
          <Image
            src='/assets/notxtGray.png'
            width={200}
            height={200}
            className='opacity-5'
            alt='logo'
          />
          <h1 className='text-2xl font-bold text-gray-700'>
            Select a ticket to start chatting
          </h1>
        </div>
      </div>
    )

  return (
    <>
      <div className='flex h-screen w-full flex-col rounded-3xl bg-[#E7F1FF]'>
        <ChatHeader
          title={ticket?.title || ''}
          status={ticket?.status || 'Closed'}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatBody
          messageHelpers={messages}
          loadingMessages={loadingMessages}
          userId={me?.id || ''}
        />
        <ChatTextArea sendMessage={sendMessage} />
      </div>
    </>
  )
}
