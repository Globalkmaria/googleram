"use client";

import useComment from "@/hooks/useComment";
import { DetailUser } from "@/model/user";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdInsertEmoticon } from "react-icons/md";
import useSWR from "swr";

type Props = {
  postId: string;
  commentLength: number;
};

export default function CommentForm({ postId, commentLength }: Props) {
  const { data: user } = useSWR<DetailUser>(`/api/me`);
  const [comment, setComment] = useState("");
  const addComment = useComment();

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }

    setComment("");
    await addComment({
      comment,
      postId,
      user,
      preCommentLength: commentLength,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <form
      className="flex border-t border-gray-200 p-2 justify-between "
      onSubmit={onSubmit}
    >
      <button type="button">
        <MdInsertEmoticon
          className=" text-3xl 
        rounded-full hover:bg-slate-200 p-1"
        />
      </button>
      <input
        value={comment}
        onChange={onChange}
        type="text"
        className="w-full mx-3 p-2 rounded-sm outline-none"
        placeholder="Add a commnet..."
      />
      <button
        type="button"
        className={`font-semibold text-blue-500 rounded p-2 hover:bg-blue-100 ${
          !comment.length ? "opacity-50 hover:bg-transparent" : ""
        }`}
        disabled={!comment.length}
        onClick={handleSubmit}
      >
        Post
      </button>
    </form>
  );
}
