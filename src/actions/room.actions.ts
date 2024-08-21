"use server";

import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { liveblocks } from "@/lib/liveblocks";
import { parseStringify } from "@/lib/utils";

//Create Room
export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};

//Get Rooms
export const getDocuments = async (email: string) => {
  const roomId = nanoid();

  try {
    const room = await liveblocks.getRooms({ userId: email });

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};

//Get a single Room
export const getDocument = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("You do not have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error happened while getting a room: ${error}`);
  }
};

//Get Active Users In room
export const getActiveUsersInDocument = async (id: string) => {
  try {
    const activeUsers = await liveblocks.getActiveUsers(id);
    return parseStringify(activeUsers);
  } catch (error) {
    console.log(`Error happened while creating a room: ${error}`);
  }
};
