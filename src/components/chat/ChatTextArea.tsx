import React, {ChangeEvent, useCallback, useState} from "react";
import { Paperclip } from "lucide-react";

import Image from "next/image";
import {sendMessage} from "next/dist/client/dev/error-overlay/websocket";

type ChatTextAreaProps= {
  sendMessage: (content: string) => void;
}

export default function ChatTextArea({ sendMessage }: ChatTextAreaProps) {
  const [rows, setRows] = useState(1);
  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    setRows(event.target.value.split("\n").length);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (message.trim() !== "") {
        sendMessage(message);
        setMessage("");
        setRows(1);
      }
    }
  };

  return (
    <div className="flex h-auto max-h-48 min-h-[6rem] w-full rounded-3xl">
      <div className="flex h-full w-full items-center justify-between p-6">
        <div className="flex h-full h-min w-full items-center justify-between rounded-xl bg-white px-4 py-2">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center">
            <Paperclip size={20} />
          </div>
          {/* {!locked ? (
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center">
              <Paperclip size={20} />
            </div>
          ) : (
            ""
          )} */}
          <textarea
            rows={rows}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            // disabled={locked}
            className="ml-4 h-auto w-full resize-none break-words bg-white outline-none"
            // placeholder={locked ? "Locked chat" : "Type a message"}
            placeholder="Type a message"
            style={{ maxHeight: "80px" }}
            ></textarea>
        </div>
      </div>
    </div>
  );
}
