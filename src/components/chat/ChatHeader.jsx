"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "lucide-react";

import Image from "next/image";

export default function ChatHeader({
  title,
  status,
  openTicketDetails,
  setOpenTicketDetails,
}) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-3xl bg-[#E7F1FF] px-12 py-8">
        <div className="flex items-center">
          <div className="ml-3 flex flex-col">
            <p className="text-2xl font-bold text-gray-800">
              {/* {title} */}
              Ticket title
            </p>
            <p className="text-xs font-normal text-gray-500">
              {/* {status} */}
              Status
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
              openTicketDetails ? "bg-[#5A8ED1]" : "bg-transparent"
            }`}
            onClick={() => setOpenTicketDetails(!openTicketDetails)}
          >
            <Sidebar
              size={24}
              color={openTicketDetails ? "#FFFFFF" : "#ABABAD"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
