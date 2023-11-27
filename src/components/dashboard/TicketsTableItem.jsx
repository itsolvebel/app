import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

export default function TicketsTableItem({ ticket }) {
  return (
    <tr>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 ">
        #{ticket.id}
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 ">
        {ticket.title}
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700">
        <span
          className={`rounded-xl py-1 px-3 ${
            ticket.locked
              ? "bg-green-500/20 text-green-700"
              : "bg-red-500/20 text-red-700"
          }`}
        >
          {ticket.locked ? "Open" : "Closed"}
        </span>
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 ">
        {ticket.claimedBy ? (
          <div className="flex items-center">
            <Image
              src={ticket.claimedBy.avatar}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="ml-2">
              {ticket.claimedBy.firstName} {ticket.claimedBy.lastName}
            </span>
          </div>
        ) : (
          "Not claimed"
        )}
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 ">
        {ticket.createdAt.split("T")[0]}
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700 ">
        {ticket.deadline ? ticket.deadline.split("T")[0] : "None"}
      </th>
      <th className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-8 text-left align-middle text-xs text-gray-700">
        <MoreHorizontal
          size={30}
          color="#ABABAD"
          className="rounded-lg p-1 duration-150 hover:bg-[#00000010] hover:duration-150"
        />
      </th>
    </tr>
  );
}
