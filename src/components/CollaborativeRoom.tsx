"use client";
import React from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { Editor } from "./editor/Editor";
import Loader from "@/common/Loader";
import ActiveCollaborators from "./ActiveCollaborators";
import DocumentTitle from "./DocumentTitle";
import { CollaborativeRoomProps } from "@/types";
const CollaborativeRoom = ({
  id,
  room,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const { metadata } = room;
  return (
    <div>
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<Loader />}>
          <DocumentTitle metadata={metadata} roomId={id} />
          <ActiveCollaborators />
          <Editor id={id} currentUserType={currentUserType} />
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default CollaborativeRoom;
