"use client";

import { useState, useEffect } from "react";
import NewTicketDialog from "./NewTicketDialog";
import { useAuthContext } from "../../../contexts/AuthContext";
import Ticket from "./Ticket";
import TicketLoading from "./TicketLoading";

export default function ChatSidebar({ activeTicket, setActiveTicket }) {
  const { auth, logout } = useAuthContext();
  const [chatsRooms, setChatsRooms] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/api/v1/tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setChatsRooms(data.data);
      setLoadingTickets(false);
    };
    getTickets();
  }, []);

  async function updateTickets() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3001/api/v1/tickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setChatsRooms(data.data);
  }

  if (loadingTickets)
    return (
      <div className="relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-3xl font-bold text-[#5A8ED1]">Tickets</h1>
          <div className="mt-8 flex w-full flex-col gap-4">
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
            <TicketLoading />
          </div>
        </div>
      </div>
    );

  return (
    <div className="relative flex h-screen min-w-[352px] flex-col items-center justify-between bg-[#FFFFFF] px-6 py-12 transition-all duration-300">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-3xl font-bold text-[#5A8ED1]">Tickets</h1>
        <div className="mt-8 flex w-full flex-col gap-4">
          <span className="text-center text-sm text-[#ABABAD]">
            {chatsRooms.length > 0
              ? "Active Tickets"
              : "You don't have any active tickets"}
          </span>
          {chatsRooms.map((ticket) => {
            if (ticket.status === "Open") {
              return (
                <Ticket
                  key={ticket.id}
                  ticket={ticket}
                  activeTicket={activeTicket}
                  setActiveTicket={setActiveTicket}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full flex-col bg-[#5A8ED1] p-5">
        <h1 className="text-center font-bold text-white">
          Want to start a new project?
        </h1>
        <span className="text-center text-sm text-[#FFFFFF87]">
          You can have up to 5 parallel project running at once!
        </span>
        <NewTicketDialog updateTickets={updateTickets}>
          <button className="mt-4 rounded-xl bg-[#F2F2F2] py-2 font-bold text-[#5A8ED1]">
            New ticket
          </button>
        </NewTicketDialog>
      </div>
    </div>
  );
}
