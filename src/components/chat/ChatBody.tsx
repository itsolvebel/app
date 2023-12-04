"use client";

import { useEffect, useRef, RefObject } from "react";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import ChatBodyLoader from "./ChatBodyLoader";
import { TicketMessage } from "@/typings/messages";

type Props = {
  messages: TicketMessage[]
  loadingMessages: boolean
  userId: string
}

export default function ChatBody({ messages, loadingMessages, userId }: Props) {
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [messages]);

  if (loadingMessages) return <ChatBodyLoader />;
  return (
    <div className="flex h-full w-full items-end overflow-hidden">
      <div
        className="h-full w-full overflow-x-hidden overflow-y-scroll"
        ref={scrollRef}
      >
        <div className="flex min-h-[100%] flex-col justify-end">
          <div className="flex flex-col gap-4 px-12 py-4">
            {messages.map((message, i) => {
              if (message.user.id === userId) {
                return (
                  <SenderMessage
                    key={i}
                    user={message.user}
                    content={message.content}
                    sent={null}
                    error={null}
                  />
                );
              } else {
                return (
                  <ReceiverMessage
                    key={i}
                    user={message.user}
                    content={message.content}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
