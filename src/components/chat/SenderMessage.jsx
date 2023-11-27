"use client";

import { useState } from "react";
import Image from "next/image";

export default function ReceiverMessage({ user, content, sent, error }) {
  return (
    <div className="flex w-full flex-row-reverse">
      <div>
        {user.avatar_url === null ? (
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFFFFF]">
              <p className="text-sm font-bold text-[#ABABAD]">
                {user.first_name.charAt(0).toUpperCase() +
                  user.last_name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={user.avatar_url}
            alt="Sender's avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>
      <div className="mr-4">
        <div className="flex max-w-[30rem] flex-col rounded-l-xl rounded-br-xl bg-[#5A8ED1] px-4 py-3">
          <span
            className={`break-words text-sm ${
              sent !== undefined ? "text-white/50" : "text-white"
            } ${error !== undefined ? "text-[#ff0000]/50" : "text-white"}`}
          >
            {content}
          </span>
        </div>
      </div>
    </div>
  );
}
