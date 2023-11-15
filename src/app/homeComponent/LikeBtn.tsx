"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { AuthUser } from "@/model/user";
import usePosts from "@/hooks/usePosts";
import ToggleButton from "../component/ToggleButton";

type Props = {
  postId: string;
  likes: string[];
  user?: AuthUser;
};

export default function LikeBtn({ postId, likes, user }: Props) {
  const [liked, setLiked] = useState(likes.includes(user?.username || ""));

  const { setLike } = usePosts();

  const handleLike = async () => {
    setLiked(!liked);
    try {
      setLike({
        user,
        liked: !liked,
        postId,
        likes,
      });
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
