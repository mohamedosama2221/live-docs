// @ts-nocheck
import { getDocument } from "@/actions/room.actions";
import { getClerkUsers } from "@/actions/user.action";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { User } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import { RoomData } from "@liveblocks/node";
import { redirect } from "next/navigation";
import React from "react";

const Document = async (props: { params: { id: string } }) => {
  const id = props.params.id;

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/signin");

  const room: RoomData = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes("room:write")
      ? "editor"
      : "viewer",
  }));

  const currentUserType = room.usersAccesses[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";
  return (
    <div>
      <CollaborativeRoom
        id={id}
        room={room}
        users={usersData}
        currentUserType={currentUserType}
      />
    </div>
  );
};

export default Document;
