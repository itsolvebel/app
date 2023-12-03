import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatTextArea from "./ChatTextArea";

import Image from "next/image";
import { Ticket, TicketStatus } from "@/typings/ticket";
import { TicketMessage } from "@/typings/messages";
import { User } from "@/typings/user";
import { getMe } from "@/lib/auth";
import { config } from "@/config";
import { fetcher } from "@/lib/fetcher";

type ChatProps = {
  activeTicket: Ticket | null;
  openTicketDetails: boolean;
  setOpenTicketDetails: (open: boolean) => void;
}

export default function Chat({
                               activeTicket,
                               openTicketDetails,
                               setOpenTicketDetails,
                             }: ChatProps) {
  const [ticket, setTicket] = useState<Ticket>();
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [me, setMe] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const user = await getMe();
      setMe(user);
    };
    const getChatRoom = async (ticketId: string) => {
      const data = await fetcher.get(`/tickets/${ticketId}`);
      setTicket(data.data);
    };
    if (activeTicket) getChatRoom(activeTicket.id);
    getMe();
  }, [activeTicket]);

  useEffect(() => {
    const getMessages = async (id: string) => {
      const data = await fetcher.get(`tickets/${id}/messages`);
      setMessages(data.data);
      setLoadingMessages(false);
    };
    if (activeTicket !== null) getMessages(activeTicket.id);
  }, [activeTicket]);

  useEffect(() => {
      if (activeTicket === null) return;

      setTicket(undefined);
      setMessages([]);
      setLoadingMessages(true);
    },
    [activeTicket],
  );

  function sendMessage(content: string) {
    if (!ticket) return;
    if (!me) return;
    setMessages((messages) => [
      ...messages,
      {
        id: "0",
        ticket_id: ticket.id,
        content: content,
        user: me,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const cancelMessage = () => {
      if (!me) return;

      const newMessages = [...messages];
      newMessages[newMessages.length] = {
        id: "0",
        content,
        user: me,
        ticket_id: ticket.id,
        created_at: new Date(),
        updated_at: new Date(),
      };

      setMessages(newMessages);
    };

    try {
      if (activeTicket) {
        fetcher.post(`tickets/${activeTicket.id}/messages`, content).then((res) => {
          if (res.status !== 201) {
            cancelMessage();
          }
        });
      }

    } catch (e) {
      cancelMessage();
    }
  }

  useEffect(() => {
    const socket = new WebSocket(config.WEBSOCKET_URL);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      console.log(data);
      if (me && data.user.id === me.id) {
        const newMessages = [...messages];
        newMessages[newMessages.length] = {
          id: data.id,
          content: data.content,
          user: me,
          ticket_id: ticket?.id || "",
          created_at: new Date(),
          updated_at: new Date(),
        };

        setMessages(newMessages);
        return;
      }

      setMessages((messages) => [
        ...messages,
        {
          id: "0",
          content: data.content,
          user: data.user.id,
          ticket_id: ticket?.id || "",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]);
    };
    return () => {
      socket.close();
    };
  }, [activeTicket]);

  if (activeTicket === null)
    return (
      <div className="flex h-screen w-full flex-col">
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 bg-[#E7F1FF]">
          <Image
            src="/assets/notxtGray.png"
            width={200}
            height={200}
            className="opacity-5"
            alt="logo"
          />
          <h1 className="text-2xl font-bold text-gray-700">
            Select a ticket to start chatting
          </h1>
        </div>
      </div>
    );

  return (
    <>
      <div className="flex h-screen w-full flex-col rounded-3xl bg-[#E7F1FF]">
        <ChatHeader
          title={ticket?.title || ""}
          status={ticket?.status || TicketStatus.Closed}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatBody
          messages={messages}
          loadingMessages={loadingMessages}
          userId={me?.id || ""}
        />
        <ChatTextArea sendMessage={sendMessage} />
      </div>
    </>
  );
}
