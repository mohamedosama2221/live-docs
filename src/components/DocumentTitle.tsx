"use client";
import { updateDocument } from "@/actions/room.actions";
import GenericInput from "@/common/input";
import { DocumentTitleProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const DocumentTitle = ({ metadata, roomId }: DocumentTitleProps) => {
  const [loading, setloading] = useState(false);
  const [editing, setediting] = useState(false);
  const [title, settitle] = useState(metadata.title);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editTitleHandler = () => {
    setediting(true);
  };

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setloading(true);

      try {
        if (title !== metadata.title) {
          const updatedDocument = await updateDocument(roomId, title);

          if (updatedDocument) {
            setediting(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setloading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setediting(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loading, title]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const JSX = (
    <div ref={containerRef}>
      {!loading && editing ? (
        <GenericInput
          title={title}
          ref={inputRef}
          settitle={settitle}
          updateTitleHandler={updateTitleHandler}
        />
      ) : (
        <div className="flex flex-row gap-2">
          <span>{title}</span>
          {!loading ? (
            <Image
              className="cursor-pointer"
              onClick={editTitleHandler}
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          ) : (
            <p className="text-xs">saving...</p>
          )}
        </div>
      )}
    </div>
  );
  return (
    <>
      {createPortal(
        JSX,
        document.getElementById("title-wrapper") as HTMLElement
      )}
    </>
  );
};

export default DocumentTitle;
