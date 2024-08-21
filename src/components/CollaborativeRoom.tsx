"use client";
import React from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { Editor } from "./editor/Editor";
import Loader from "@/common/Loader";
import ActiveCollaborators from "./ActiveCollaborators";
const CollaborativeRoom = ({ id }: { id: string }) => {
  return (
    <div>
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<Loader />}>
          <ActiveCollaborators />
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default CollaborativeRoom;
