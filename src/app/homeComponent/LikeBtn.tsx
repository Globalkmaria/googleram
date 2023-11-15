"use client";

import { AuthUser } from "@/model/user";
import { postLike } from "@/service/post";
import { MouseEvent } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSWRConfig } from "swr";

type Props = {
  postId: string;
  likes: string[];
  user?: AuthUser;
};

export default function LikeBtn({ postId, likes, user }: Props) {
  const { mutate } = useSWRConfig();
  const liked = !!likes.find((username) => username === user?.username);

  console.log(likes, user, liked);

  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }

    mutate(
      ["/api/posts", `/api/posts/${postId}`],
      postLike({ liked: !liked, postId })
    );
  };

  return (
    <button type={"button"} onClick={handleLike}>
      {liked ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}
