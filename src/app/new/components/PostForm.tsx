"use client";

import { ChangeEvent, DragEvent, useState } from "react";
import FilesIcon from "@/app/component/Icons/FilesIcon";
import Image from "next/image";

export default function PostForm() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (!files) return;

    setFile(files[0]);
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (!files) return;

    setFile(files[0]);
  };

  return (
    <form className="flex flex-col w-full mt-2 max-w-[500px]">
      <input
        type="file"
        name="image"
        id="image"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        className={`w-full h-60 flex flex-col items-center justify-center 
        ${!file && "border-2 border-sky-200 border-dashed"}`}
        htmlFor="image"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragging && (
          <div
            className=" absolute inset-0 z-10 bg-sky-500/20 
          pointer-events-none"
          ></div>
        )}
        {!file && (
          <div className="fle flex-col items-center pointer-events-none">
            <FilesIcon />
            <p>Drag and Drop your image here or click</p>
          </div>
        )}
        {file && (
          <div className="relative w-full  aspect-square">
            <Image
              src={URL.createObjectURL(file)}
              alt="preview"
              fill
              sizes="650px"
              className="object-cover"
            />
          </div>
        )}
      </label>

      <textarea
        className=" resize-none p-2 outline-none text-lg 
         border border-neutral-300 mt-2"
        placeholder="Write a comment..."
        rows={10}
        id="comment"
        name="comment"
        maxLength={150}
        required
      />
      <button
        type="button"
        className=" bg-blue-500 text-white font-semibold py-2 rounded mt-2"
      >
        Publish
      </button>
    </form>
  );
}
