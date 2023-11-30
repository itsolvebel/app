"use client";

import Image from "next/image";
import {User} from "@/typings/user";

type ReceiverMessageProps = {
    user: User,
    content: String
}

export default function ReceiverMessage({ user, content }: ReceiverMessageProps) {
  return (
    <div className="flex">
      <div>
        {user.avatar_url === null ? (
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFFFF]">
              <p className="text-sm font-bold text-[#ABABAD]">
                {user.first_name.charAt(0).toUpperCase() +
                  user.last_name.charAt(0).toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={user.avatar_url}
            alt="Recever's message avatar"
            width={40}
            height={40}
            className="min-h-[40px] min-w-[40px] rounded-full"
          />
        )}
      </div>
      <div className="ml-4">
        <div className="flex max-w-[30rem] flex-col rounded-r-xl rounded-bl-xl bg-[#FFFFFF] px-4 py-3">
          <span className="text-sm">{content}</span>
        </div>
      </div>
    </div>
  );
}
