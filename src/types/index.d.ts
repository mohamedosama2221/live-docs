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

declare type userInfo = { info: { avatar: string; name: string } };
