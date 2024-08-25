import { RoomData } from "@liveblocks/node";

declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};
declare type AddDocumentBtnProps = {
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
  metadata: RoomMetadata;
  createdAt: string;
};

declare type userInfo = {
  info: { avatar: string; name: string; color: string };
};

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

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type CollaborativeRoomProps = {
  id: string;
  room: RoomData;
  users: User[];
  currentUserType: UserType;
};
declare type EditorProps = {
  id: string;
  currentUserType: UserType;
};

declare type CollabAvatarProps = {
  id: string;
  avatar: string;
  name: string;
  color: string;
};

declare type ThreadWrapperProps = { thread: ThreadData<BaseMetadata> };

declare type DeleteModalProps = { roomId: string };

declare type ShareDocumentDialogProps = {
  roomId: string;
  collaborators: User[];
  creatorId: string;
  currentUserType: UserType;
};

declare type AccessType = ["room:write"] | ["room:read", "room:presence:write"];

declare type RoomAccesses = Record<string, AccessType>;

declare type UserType = "creator" | "editor" | "viewer";

declare type ShareDocumentParams = {
  roomId: string;
  email: string;
  userType: UserType;
  updatedBy: User;
};

declare type UserTypeSelectorParams = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
};

declare type CollaboratorProps = {
  roomId: string;
  email: string;
  creatorId: string;
  collaborator: User;
  user: User;
};
