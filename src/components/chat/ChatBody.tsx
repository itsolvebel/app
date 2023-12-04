"use client";

import { useEffect, useRef, RefObject } from "react";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import ChatBodyLoader from "./ChatBodyLoader";
import { TicketMessage } from "@/typings/messages";
import { TicketMsgHelperType, TicketMsgStatus } from "@components/chat/Chat";

type Props = {
  messageHelpers: TicketMsgHelperType[]
  loadingMessages: boolean
  userId: string
}


export default function ChatBody({ messageHelpers, loadingMessages, userId }: Props) {
  const scrollRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [messageHelpers]);

  if (loadingMessages) return <ChatBodyLoader />;
  return (
    <div className="flex h-full w-full items-end overflow-hidden">
      <div
        className="h-full w-full overflow-x-hidden overflow-y-scroll"
        ref={scrollRef}
      >
        <div className="flex min-h-[100%] flex-col justify-end">
          <div className="flex flex-col gap-4 px-12 py-4">
            {messageHelpers.map((messageHelper, i) => {
              if (messageHelper.ticket.user.id === userId) {
                return (
                  <SenderMessage
                    key={messageHelper.ticket.id}
                    user={messageHelper.ticket.user}
                    content={messageHelper.ticket.content}
                    messageHelper={messageHelper}
                  />
                );
              } else {
                return (
                  <ReceiverMessage
                    key={i}
                    user={messageHelper.ticket.user}
                    content={messageHelper.ticket.content}
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
