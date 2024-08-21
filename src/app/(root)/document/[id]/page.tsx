import CollaborativeRoom from "@/components/CollaborativeRoom";
import React from "react";

const Document = (props: { params: { id: string } }) => {
  const id = props.params.id;
  return (
    <div>
      <CollaborativeRoom id={id} />
    </div>
  );
};

export default Document;
