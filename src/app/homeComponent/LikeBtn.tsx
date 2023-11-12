"use client";

import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function LikeBtn() {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <>
      {liked ? (
        <AiFillHeart onClick={handleLike} />
      ) : (
        <AiOutlineHeart onClick={handleLike} />
      )}
    </>
  );
}
