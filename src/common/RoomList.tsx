import { getActiveUsersInDocument } from "@/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomList = ({ id, metadata, createdAt }: RoomListProps) => {
  return (
    <li key={id} className="document-list-item">
      <Link
        href={`/documents/${id}`}
        className="flex flex-1 items-center gap-4"
      >
        <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
          <Image
            src="/assets/icons/doc.svg"
            alt="file"
            width={40}
            height={40}
          />
        </div>
        <div className="space-y-1">
          <p className="line-clamp-1 text-lg">{metadata.title}</p>
          <p className="text-sm font-light text-blue-100">
            Created about {dateConverter(createdAt)}
          </p>
        </div>
        <div className="flex flex-row gap-0 ml-auto pr-5">
          {getActiveUsersInDocument(id).then((el) =>
            el?.data?.map((user: userInfo, i: number) => (
              <span
                key={`item_${i}`}
                className="rounded-full overflow-hidden h-10 w-10 border-[3px] -mr-4 shadow-[0px_0px_9px_0px_#4a5568] border-white"
              >
                <Image
                  src={user.info.avatar}
                  width={40}
                  height={40}
                  alt={user.info.name}
                />
              </span>
            ))
          )}
        </div>
      </Link>
    </li>
  );
};

export default RoomList;
