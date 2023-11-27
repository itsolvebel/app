"use client";

import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loading from "@components/Loading";
import DashboardSidebar from "@components/dashboard/Sidebar";
import TicketsSidebar from "@components/chat/TicketsSidebar";
import Chat from "@components/chat/Chat";
import ChatDetails from "@components/chat/ChatDetails";

export default function ChatPage() {
  const [activeTicket, setActiveTicket] = useState(null);
  const [openTicketDetails, setOpenTicketDetails] = useState(false);
  const { auth, logout } = useAuthContext();

  if (auth.loading) return <Loading />;

  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar />
        <TicketsSidebar
          activeTicket={activeTicket}
          setActiveTicket={setActiveTicket}
        />
        <Chat
          activeTicket={activeTicket}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
        <ChatDetails
          activeTicket={activeTicket}
          openTicketDetails={openTicketDetails}
          setOpenTicketDetails={setOpenTicketDetails}
        />
      </div>
    </>
  );
}
