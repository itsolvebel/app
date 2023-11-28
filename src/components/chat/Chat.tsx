"use client";

import {useEffect, useState} from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatTextArea from "./ChatTextArea";
import {useAuthContext} from "../../contexts/AuthContext";

import Image from "next/image";
import { Ticket } from '@/typings/ticket'
import { TicketMessage } from '@/typings/messages'

type ChatProps = {
  activeTicket: String | null;
  openTicketDetails: boolean;
  setOpenTicketDetails: (open: boolean) => void;
}

export default function Chat({
                               activeTicket,
                               openTicketDetails,
                               setOpenTicketDetails,
                             }: ChatProps) {
  const [ticket, setTicket] = useState<Ticket | null>();
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const getChatRoom = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTicket(data.data);
    };
    if (activeTicket !== null) getChatRoom();
  }, [activeTicket]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}/messages`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setMessages(data.data);
      setLoadingMessages(false);
    };
    if (activeTicket !== null) getMessages();
  }, [activeTicket]);

  useEffect((prev) => {
      if (activeTicket === null) return;
      if (prev === activeTicket) return;

      setTicket(null);
      setMessages([]);
      setLoadingMessages(true);
    },
    [activeTicket]
  );

  function sendMessage(content: string) {
    setMessages((messages) => [
      ...messages,
      {
        id: 0,
        content,
        sent: false,
        error: false,
        user: {
          id: auth.id,
          first_name: auth.first_name,
          last_name: auth.last_name,
          avatar_url: auth.avatar_url || null,
        },
      },
    ]);

    const cancelMessage = () => {
      const newMessages = [...messages];
      newMessages[newMessages.length] = {
        id: 0,
        content,
        sent: undefined,
        error: true,
        user: {
          id: auth.id,
          first_name: auth.first_name,
          last_name: auth.last_name,
          avatar_url: auth.avatar_url || null,
        },
      };

      setMessages(newMessages);
    };

    try {
      fetch(
        `http://localhost:3001/api/v1/tickets/${activeTicket}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({content}),
        }
      ).then((res) => {
        if (res.status !== 201) {
          cancelMessage();
        }
      });
    } catch (e) {
      cancelMessage();
    }
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001/ws");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      console.log(data);
      if (data.user.id === auth.id) {
        const newMessages = [...messages];
        newMessages[newMessages.length] = {
          id: data.id,
          content: data.content,
          sent: true,
          error: false,
          user: {
            id: auth.id,
            first_name: auth.first_name,
            last_name: auth.last_name,
            avatar_url: auth.avatar_url || null,
          },
        };

        setMessages(newMessages);
        return;
      }

      setMessages((messages) => [
        ...messages,
        {
          id: 0,
          content: data.content,
          sent: true,
          error: false,
          user: {
            id: data.user.id,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            avatar_url: data.user.avatar_url || null,
          },
        },
      ]);
    };
    return () => {
      socket.close();
    }
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
          title={ticket.title}
          service={ticket.status}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatBody
          messages={messages}
          loadingMessages={loadingMessages}
          userId={auth.id}
        />
        <ChatTextArea sendMessage={sendMessage}/>
      </div>
    </>
  );
}
