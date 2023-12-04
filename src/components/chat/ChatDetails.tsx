"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import { Ticket } from "@/typings/ticket";
import { User, UserRole } from "@/typings/user";
import { fetcher } from "@/lib/fetcher";
import { getMe, getUserRoles } from "@/lib/auth";

type ChatDetailsProps = {
  activeTicket: Ticket | null,
  openTicketDetails: boolean,
}


export default function ChatDetails({
                                      activeTicket,
                                      openTicketDetails,
                                    }: ChatDetailsProps) {
  const [chatRoom, setChatRoom] = useState({});
  const [chatMembers, setChatMembers] = useState<User[]>([]);
  const [canManage, setCanManage] = useState(false);
  useEffect(() => {
    const getChatRoom = async (ticket: Ticket) => {

      const { isAdmin, isTm } = await getUserRoles();
      setCanManage(isAdmin || isTm);
      const res = await fetcher.get(`/tickets/${ticket.id}`);
      const me = await getMe();
      const members = res.data.users;
      members.unshift(me);
      setChatMembers(members);
      setChatRoom(res.data);
    };

    if (activeTicket) getChatRoom(activeTicket);
  }, [activeTicket]);

  if (activeTicket === null) return <></>;
  console.log(canManage);
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
          {/* The button to add a new user*/}
          <div>

          </div>
          <span className="flex items-center gap-2 text-sm font-medium text-[#ABABAD]">
            <Users color="#ABABAD" size={20} />
            Members
            <span className="rounded-sm bg-[#EAFAFE] px-3 text-xs text-[#75A9BC]">
              {chatMembers?.length || 0}
            </span>
          </span>
          <div className="mt-5 flex flex-col gap-4">
            {chatMembers && chatMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 text-sm font-medium text-[#000000]"
              >
                {member.avatar_url === null ? (
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]">
                      <p className="text-sm font-bold text-[#ABABAD]">
                        {member.first_name.charAt(0) + member.last_name.charAt(0)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={member.avatar_url}
                    alt="Picture of the author"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col">
                  {member.first_name} {member.last_name}
                  {member.roles.includes(UserRole.Admin) ? (
                    <span className="text-xs text-[#ABABAD]">
                      Administrator
                    </span>
                  ) : member.roles.includes(UserRole.Tm) ? (
                    <span className="text-xs text-[#ABABAD]">
                      Ticket Manager
                    </span>
                  ) : member.roles.includes(UserRole.Freelancer) ? (
                    <span className="text-xs text-[#ABABAD]">
                      {member.categories.toString() /*Not sure what needed to happen here, it previously was member.work*/}
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
