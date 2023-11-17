"use client";

import { DetailUser } from "@/model/user";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";
import useSWR from "swr";

type Props = {
  liked: boolean;
  bookmarked: boolean;
  postId: string;
  likes: string[];
};

export default function ActionBar({ liked, bookmarked, postId, likes }: Props) {
  const { data: user } = useSWR<DetailUser>(`/api/me`);
  return (
    <>
      <div className="flex justify-between text-lg pb-2">
        <LikeBtn liked={liked} username={user?.username} postId={postId} />
        <BookmarkBtn
          bookmarked={bookmarked}
          userId={user?.id}
          postId={postId}
        />
      </div>
      <span className="block font-semibold text-sm">{likes.length} likes</span>
    </>
  );
}
