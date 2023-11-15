"use client";

export const dynamic = "force-dynamic";

import { AuthUser } from "@/model/user";
import { postLike } from "@/service/post";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSWRConfig } from "swr";
import ToggleButton from "../component/ToggleButton";

type Props = {
  postId: string;
  likes: string[];
  user?: AuthUser;
};

export default function LikeBtn({ postId, likes, user }: Props) {
  const [liked, setLiked] = useState(likes.includes(user?.username || ""));

  const { mutate } = useSWRConfig();

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }

    setLiked(!liked);
    try {
      await postLike({ liked: !liked, postId });
      mutate(`/api/posts/${postId}`);
      mutate(`/api/posts`);
    } catch (err) {
      setLiked(liked);
      console.log(err);
    }
  };

  useEffect(() => {
    setLiked(likes.includes(user?.username || ""));
  }, [likes, user]);

  return (
    <ToggleButton
      on={liked}
      toggle={handleLike}
      OnIcon={AiFillHeart}
      OffIcon={AiOutlineHeart}
    />
  );
}
