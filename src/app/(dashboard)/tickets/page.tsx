"use client";

import { useState } from "react";
import Loading from "@components/Loading";
import DashboardSidebar from "@components/dashboard/Sidebar";
import TicketsSidebar from "@components/chat/TicketsSidebar";
import Chat from "@components/chat/Chat";
import ChatDetails from "@components/chat/ChatDetails";
import { Ticket } from "@/typings/ticket";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [openTicketDetails, setOpenTicketDetails] = useState(false);
  const searchParams = useSearchParams();
  const newTicket = searchParams.get("new");

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <TicketsSidebar
          activeTicket={activeTicket}
          setActiveTicket={setActiveTicket}
          newTicketTitle={newTicket}
        />
        <Chat
          activeTicket={activeTicket}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatDetails
          activeTicket={activeTicket}
          openTicketDetails={openTicketDetails}
        />
      </div>
    </>
  );
}
