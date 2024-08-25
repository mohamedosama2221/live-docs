import { getActiveUsersInDocument } from "@/actions/room.actions";
import { dateConverter } from "@/lib/utils";
import { RoomListProps, userInfo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CollabAvatar from "./CollabAvatar";
import { DeleteModal } from "@/components/DeleteModal";

const RoomList = ({ id, metadata, createdAt }: RoomListProps) => {
  return (
    <li key={id} className="document-list-item relative overflow-hidden">
      <div className="h-full w-full absolute inset-0 z-0">
        <Image
          src="/assets/images/doc.webp"
          alt="bg"
          fill={true}
          objectFit="fit"
          priority={true}
          loading="eager"
        />
      </div>
      <Link
        href={`/documents/${id}`}
        className="flex flex-1 items-center gap-4 relative z-10"
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
        <div className="flex -space-x-2 overflow-hidden ml-auto pr-5">
          {getActiveUsersInDocument(id).then((el) =>
            el?.data?.map((user: userInfo, i: number) => (
              <CollabAvatar
                id={id}
                avatar={user.info.avatar}
                name={user.info.name}
                color={user.info.color}
                key={`collab_doc_${id}_${i}`}
              />
            ))
          )}
        </div>
      </Link>
      <div className="z-10 relative">
        <DeleteModal roomId={id} />
      </div>
    </li>
  );
};

export default RoomList;
