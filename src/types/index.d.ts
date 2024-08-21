import { RoomData } from "@liveblocks/node";

declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};
declare type AddDocumentBtn = {
  userId: string;
  email: string;
};

declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"];

declare type RoomAccesses = Record<string, AccessType>;

declare type UserType = "creator" | "editor" | "viewer";

declare type RoomMetadata = {
  creatorId: string;
  email: string;
  title: string;
};

declare type CreateDocumentParams = {
  userId: string;
  email: string;
};
declare type RoomListProps = {
  id: string;
  metadata: any;
  createdAt: string;
};
declare type CollaborativeRoomProps = {
  id: string;
  room: RoomData;
};

declare type userInfo = { info: { avatar: string; name: string } };

declare type GenericInputProps = {
  title: string;
  ref: ForwardedRef<HTMLInputElement>;
  settitle: (value: string) => void;
  updateTitleHandler: (event: KeyboardEvent<HTMLInputElement>) => void;
};

declare type DocumentTitleProps = {
  metadata: RoomMetadata;
  roomId: string;
};
