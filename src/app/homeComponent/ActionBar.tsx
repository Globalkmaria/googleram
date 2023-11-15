"use client";

import { DetailUser } from "@/model/user";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";
import useSWR from "swr";

type Props = {
  likes: string[];
  postId: string;
};

export default function ActionBar({ likes, postId }: Props) {
  const { data: user } = useSWR<DetailUser>(`/api/me`);

  return (
    <>
      <div className="flex justify-between text-lg pb-2">
        <LikeBtn likes={likes} user={user} postId={postId} />
        <BookmarkBtn user={user} postId={postId} />
      </div>
      <span className="block font-semibold text-sm">{likes.length} likes</span>
    </>
  );
}
