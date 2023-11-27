"use client";

import { useState, useEffect } from "react";
import { X, Users } from "lucide-react";
import Image from "next/image";

export default function ChatDetails({
  activeTicket,
  openTicketDetails,
  setOpenTicketDetails,
}) {
  const [chatRoom, setChatRoom] = useState({});
  const [chatMembers, setChatMembers] = useState([]);

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
      setChatRoom(data.data);
    };

    if (activeTicket !== null) getChatRoom();
  }, [activeTicket]);

  if (activeTicket === null) return <></>;

  return (
    <>
      <div
        className={`flex h-screen flex-col bg-[#FFFFFF] px-12 py-10 ${
          openTicketDetails ? "w-96" : "hidden"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-[#000000]">
            Chat Details
          </span>
        </div>
        <div className="mt-10 flex flex-col">
          <span className="flex items-center gap-2 text-sm font-medium text-[#ABABAD]">
            <Users color="#ABABAD" size={20} />
            Members
            <span className="rounded-sm bg-[#EAFAFE] px-3 text-xs text-[#75A9BC]">
              {chatMembers.length}
            </span>
          </span>
          <div className="mt-5 flex flex-col gap-4">
            {chatMembers.map((member) => (
              <div
                key={member._id}
                className="flex items-center gap-3 text-sm font-medium text-[#000000]"
              >
                {member.avatar === null ? (
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]">
                      <p className="text-sm font-bold text-[#ABABAD]">
                        {member.firstName.charAt(0) + member.lastName.charAt(0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={member.avatar}
                    alt="Picture of the author"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  {member.firstName} {member.lastName}
                  {member.role === "admin" ? (
                    <span className="text-xs text-[#ABABAD]">
                      Administrator
                    </span>
                  ) : member.role === "tm" ? (
                    <span className="text-xs text-[#ABABAD]">
                      Ticket Manager
                    </span>
                  ) : member.role === "freelancer" ? (
                    <span className="text-xs text-[#ABABAD]">
                      {member.work}
                    </span>
                  ) : (
                    <span className="text-xs text-[#ABABAD]">Client</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
