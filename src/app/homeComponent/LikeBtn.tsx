import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { AuthUser } from "@/model/user";
import useLikePost from "@/hooks/useLikePost";
import ToggleButton from "../component/ToggleButton";

type Props = {
  postId: string;
  likes: string[];
  user?: AuthUser;
};

export default function LikeBtn({ postId, likes, user }: Props) {
  const liked = likes.includes(user?.username || "");
  const { setLike } = useLikePost();

  const handleLike = () => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }

    setLike({
      user,
      liked: !liked,
      postId,
      likes,
    });
  };

  return (
    <ToggleButton
      on={liked}
      toggle={handleLike}
      OnIcon={AiFillHeart}
      OffIcon={AiOutlineHeart}
    />
  );
}
