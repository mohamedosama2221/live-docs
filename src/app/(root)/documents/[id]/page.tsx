import { getDocument } from "@/actions/room.actions";
import CollaborativeRoom from "@/components/CollaborativeRoom";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = async (props: { params: { id: string } }) => {
  const id = props.params.id;

  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/signin");

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect("/");

  return (
    <div>
      <CollaborativeRoom id={id} />
    </div>
  );
};

export default Document;
