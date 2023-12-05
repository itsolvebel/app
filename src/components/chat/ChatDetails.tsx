"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Plus, Users, X } from "lucide-react";
import Image from "next/image";
import { Ticket } from "@/typings/ticket";
import { User, UserRole } from "@/typings/user";
import { fetcher } from "@/lib/fetcher";
import { getMe, getUserRoles } from "@/lib/auth";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import * as Popover from "@radix-ui/react-popover";

type ChatDetailsProps = {
  activeTicket: Ticket | null,
  openTicketDetails: boolean,
}

type ChatDetailsUser = {
  role: string,
  user: User
}
export default function ChatDetails({
                                      activeTicket,
                                      openTicketDetails,
                                    }: ChatDetailsProps) {
  const [chatRoom, setChatRoom] = useState({});
  const [chatMembers, setChatMembers] = useState<User[]>([]);
  const [chatDetailUsers, setChatDetailUsers] = useState<ChatDetailsUser[]>([]);
  const [canManage, setCanManage] = useState(false);
  useEffect(() => {
    const getChatRoom = async (ticket: Ticket) => {

      const { isAdmin, isTm } = await getUserRoles();
      setCanManage(isAdmin || isTm);
      const res = await fetcher.get(`/tickets/${ticket.id}`);
      const detailUsers = res.data.users;
      detailUsers.unshift({
        user: res.data.user,
        role: "Client",
      });
      const users = detailUsers.map((dUser: ChatDetailsUser) => dUser.user);
      users.unshift(res.data.user);
      setChatMembers(detailUsers);
      setChatDetailUsers(detailUsers);
      setChatRoom(res.data);
    };

    if (activeTicket) getChatRoom(activeTicket);
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
        {canManage && (<div>
          <AddUserPopover chatUsers={chatDetailUsers} />
        </div>)}

        <div className="flex flex-col">
          <span className="flex items-center gap-2 text-sm font-medium text-[#ABABAD]">
            <Users color="#ABABAD" size={20} />
            Members
            <span className="rounded-sm bg-[#EAFAFE] px-3 text-xs text-[#75A9BC]">
              {chatDetailUsers?.length || 0}
            </span>
          </span>
          <div className="mt-5 flex flex-col gap-4">
            {chatDetailUsers && chatDetailUsers.map((member) => {
              return (
                <div
                  key={member.user.id}
                  className="flex items-center gap-3 text-sm font-medium text-[#000000]"
                >
                  {member.user.avatar_url === null ? (
                    <UserAvatarReplacement user={member.user} />
                  ) : (
                    <Image
                      src={member.user.avatar_url}
                      alt="Picture of the author"
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    {member.user.first_name} {member.user.last_name}
                    <span className={"text-xs text-[#ABABAD]"}>
                      {member.role}
                    </span>
                    {/*{member.user.roles.includes(UserRole.Admin) ? (*/}
                    {/*  <span className="text-xs text-[#ABABAD]">*/}
                    {/*  Administrator*/}
                    {/*</span>*/}
                    {/*) : member.user.roles.includes(UserRole.Tm) ? (*/}
                    {/*  <span className="text-xs text-[#ABABAD]">*/}
                    {/*  Ticket Manager*/}
                    {/*</span>*/}
                    {/*) : member.user.roles.includes(UserRole.Freelancer) ? (*/}
                    {/*  <span className="text-xs text-[#ABABAD]">*/}
                    {/*  {member.user.categories.toString() /*Not sure what needed to happen here, it previously was member.work*!/*/}
                    {/*</span>*/}
                    {/*) : (*/}
                    {/*  <span className="text-xs text-[#ABABAD]">Client</span>*/}
                    {/*)}*/}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function UserAvatarReplacement({ user }: { user: User }) {
  return (<div>
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]">
      <p className="text-sm font-bold text-[#ABABAD]">
        {user.first_name.charAt(0) + user.last_name.charAt(0)}
      </p>
    </div>
  </div>);
}

function AddUserPopover({ chatUsers }: { chatUsers: ChatDetailsUser[] }) {

  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function fetchUsers() {
    fetcher.get("/users").then(res => {
      const data: User[] = res.data;
      const usersWithoutExisting = data.filter(user => (
        !chatUsers.some(chatUser => chatUser.user.id === user.id)
      ));
      setUsers(usersWithoutExisting);
    });
  }

  function handlePopoverOpen() {
    fetchUsers();
  }

  function userOptionTemplate(option: User) {
    return (<div className={"flex items-center gap-3"}>
      {option.avatar_url ?
        <img alt={option.first_name + " " + option.last_name} src={option.avatar_url || undefined} />
        : <UserAvatarReplacement user={option} />}
      <div className={"flex flex-col"}>
        <span>{option.first_name + " " + option.last_name}</span>
        <span className={"text-xs text-[#ABABAD]"}>{option.roles.toString()}</span>
      </div>
    </div>);
  }


  function selectedOptionTemplate(option: User, props: DropdownProps): ReactNode {
    if (option) {
      return (<div className={"flex items-center gap-3"}>
        {option.avatar_url ?
          <img alt={option.first_name + " " + option.last_name} src={option.avatar_url || undefined} />
          : <UserAvatarReplacement user={option} />}
        <div className={"flex flex-col"}>
          <span>{option.first_name + " " + option.last_name}</span>
          <span className={"text-xs text-[#ABABAD]"}>{option.roles.toString()}</span>
        </div>
      </div>);
    }
    return <span>{props.placeholder}</span>;

  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          onClick={handlePopoverOpen}
          className={"my-4 rounded-xl bg-[#F2F2F2] p-2 w-full font-bold text-[#5A8ED1] border-2 border-[#5A8ED1] flex justify-start"}>
          <Plus className={"mr-2"}></Plus>
          Add user
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[350px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="flex flex-grow-0 items-start justify-end flex-col gap-2.5 ">
            <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">Select a user</p>
            <Dropdown
              placeholder="Select a user"
              value={selectedUser} onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="first_naem"
              filter
              valueTemplate={selectedOptionTemplate} itemTemplate={userOptionTemplate}
              className="w-full md:w-14rem border-2" />
            <button
              className={
                "grow-0 mt-2 ml-auto rounded-xl p-2 px-8 font-bold flex justify-start " + (selectedUser ? "text-[#fff] bg-[#5A8ED1]" : "bg-[#F2F2F2] text-[#5A8ED1]")
              }
            >
              Add
            </button>
          </div>
          <Popover.Close
            className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
            aria-label="Close"
          >
            <X />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>

  );

}
