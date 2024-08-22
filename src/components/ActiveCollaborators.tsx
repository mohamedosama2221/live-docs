import CollabAvatar from "@/common/CollabAvatar";
import { useOthers } from "@liveblocks/react/suspense";
import { createPortal } from "react-dom";

const ActiveCollaborators = async () => {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);

  const JSX = (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <CollabAvatar
          id={id}
          avatar={avatar}
          name={name}
          color={color}
          key={`collab_${id}`}
        />
      ))}
    </ul>
  );
  return (
    <>
      {createPortal(
        JSX,
        document.getElementById("collaborators-wrapper") as HTMLElement
      )}
    </>
  );
};

export default ActiveCollaborators;
