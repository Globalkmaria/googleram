import { memo, useCallback } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useLikePost from "@/hooks/useLikePost";
import ToggleButton from "../component/ToggleButton";

type Props = {
  postId: string;
  liked: boolean;
  username?: string;
};

function LikeBtn({ postId, liked, username }: Props) {
  const { setLike } = useLikePost();
  const handleLike = useCallback(() => {
    if (!username) {
      alert("You must be logged in to like a post");
      return;
    }

    setLike({
      username,
      liked: !liked,
      postId,
    });
  }, [username, liked, postId, setLike]);

  return (
    <ToggleButton
      on={liked}
      toggle={handleLike}
      OnIcon={AiFillHeart}
      OffIcon={AiOutlineHeart}
    />
  );
}

export default memo(LikeBtn);
