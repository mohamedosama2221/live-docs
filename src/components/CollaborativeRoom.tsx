"use client";
import React from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { Editor } from "./editor/Editor";
import Loader from "@/common/Loader";
const CollaborativeRoom = ({ id }: { id: string }) => {
  return (
    <div>
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={<Loader />}>
          <Editor />
        </ClientSideSuspense>
      </RoomProvider>
    </div>
  );
};

export default CollaborativeRoom;
