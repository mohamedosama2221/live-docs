"use client";

import { createDocument } from "@/actions/room.actions";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtn) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    const metaData = {
      userId,
      email,
    };
    try {
      const doc = await createDocument(metaData);
      if (doc) {
        router.push(`/documents/${doc.id}`);
      }
    } catch (error) {
      console.log("🚀 ~ addDocumentHandler ~ error:", error);
    }
  };

  return (
    <Button
      type="submit"
      onClick={addDocumentHandler}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};

export default AddDocumentBtn;
