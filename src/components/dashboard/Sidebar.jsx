"use client";

import { useAuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  Settings,
  LayoutGrid,
 // CalendarDays,
  Ticket,
 // File,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const { auth, logout } = useAuthContext();
  const route = usePathname();

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: LayoutGrid,
      href: "/dashboard",
      whoAccess: ["Admin", "Tm"],
    },
    {
      name: "Users",
      icon: Users,
      href: "/dashboard/users",
      whoAccess: ["Admin"],
    },
    {
      name: "Chat",
      icon: MessageCircle,
      href: "/dashboard/chat",
      whoAccess: ["Admin", "Tm", "Freelancer"],
    },
    /*{
      WILL COME LATER
      name: "Calendar",
      icon: CalendarDays,
      href: "/dashboard/calendar",
      whoAccess: ["Admin", "Tm", "Freelancer"],
    },*/
    {
      name: "Tickets",
      icon: Ticket,
      href: "/dashboard/tickets",
      whoAccess: ["User", "Admin", "Tm", "Freelancer"],
    },
    /*{
      WILL COME LATER
      name: "Files",
      icon: File,
      href: "/dashboard/files",
      whoAccess: ["Admin"],
    },*/
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      whoAccess: ["User", "Admin", "Tm", "Freelancer"],
    },
  ];

  if (auth.loading) return null;

  return (
    <div
      className={` flex h-screen flex-col items-center justify-between py-12 transition-all duration-300 ${
        hovered ? "w-96 px-2" : " w-32"
      }`}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/assets/notxt.png"
          alt="Logo"
          width={30}
          height={30}
          className="mb-16"
        />
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => {
            if (item.whoAccess.some((r) => auth.roles.includes(r)))
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex w-full items-center gap-2 rounded-xl p-2.5  ${
                    item.href === route ? "bg-[#5A8ED1]" : ""
                  } ${hovered ? "min-w-[10rem]" : ""}`}
                >
                  <item.icon
                    size={20}
                    color={item.href === route ? "#ffffff" : "#ABABAD"}
                  />
                  {hovered && (
                    <p
                      className={`text-center font-medium text-${
                        item.href === route ? "white" : "#ABABAD"
                      }`}
                    >
                      {item.name}
                    </p>
                  )}
                </Link>
              );
          })}
        </div>
      </div>
      <div className="flex w-full items-center justify-center">
        {auth.avatar !== null ? (
          <div className="">
            <Image
              src={auth.avatar}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        ) : (
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F1FF]">
              <p className="text-sm font-bold text-[#ABABAD]">
                {auth.first_name.charAt(0).toUpperCase() +
                  auth.last_name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        )}
        {hovered && (
          <div className="ml-4 flex flex-col">
            <span className="font-bold">
              {auth.first_name + " " + auth.last_name}
            </span>
            <span
              className="cursor-pointer text-sm font-medium"
              onClick={logout}
            >
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
