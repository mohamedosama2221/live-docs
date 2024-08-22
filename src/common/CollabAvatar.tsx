import { CollabAvatarProps } from "@/types";
import Image from "next/image";
import React from "react";

const CollabAvatar = ({ id, avatar, name, color }: CollabAvatarProps) => {
  return (
    <li key={id}>
      <Image
        src={avatar}
        alt={name}
        width={100}
        height={100}
        className="inline-block size-8 rounded-full ring-2 ring-dark-100"
        style={{ border: `3px solid ${color}` }}
      />
    </li>
  );
};

export default CollabAvatar;
