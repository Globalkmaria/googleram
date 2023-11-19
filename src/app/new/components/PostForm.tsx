"use client";

import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import FilesIcon from "@/app/component/Icons/FilesIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/model/user";
import Avatar from "@/app/component/Avatar/Avatar";
import Loader from "@/app/component/PropagateLoader";

type Props = {
  user?: AuthUser;
};

export default function PostForm({ user }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

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

  const handleSubmit = (e: FormEvent) => {
    if (!user) {
      alert("You must be logged in to post");
      return;
    }

    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value || "");

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => {
        setError(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="w-full flex flex-col items-center mt-6">
      {loading && (
        <div
          className="absolute inset-0 z-20 text-center 
        bg-sky-500/20 pt-[30%]"
        >
          <Loader />
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 text-red-600 text-center
         p-4 mb-4 rounded font-bold"
        >
          {error}
        </div>
      )}
      {user && (
        <div className="flex gap-2 items-center">
          <Avatar size="small" user={user} withRing />
          <span className=" font-bold">{user.username}</span>
        </div>
      )}
      <form
        className="flex flex-col w-full mt-2 max-w-[500px]"
        onSubmit={handleSubmit}
      >
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
          ref={textRef}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className={`bg-blue-500 text-white font-semibold py-2 rounded mt-2 ${
            !file ? " opacity-60" : "opacity-100"
          }`}
          disabled={!file}
        >
          Publish
        </button>
      </form>
    </section>
  );
}
