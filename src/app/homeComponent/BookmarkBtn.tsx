import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

import ToggleButton from "../component/ToggleButton";
import { DetailUser } from "@/model/user";
import useBookmarkPost from "@/hooks/useBookmarkPost";

type Props = {
  postId: string;
  user?: DetailUser;
};

export default function BookmarkBtn({ postId, user }: Props) {
  const bookmarked = user?.bookmarks.includes(postId) || false;
  const setBookmark = useBookmarkPost();

  const handleBookmark = async () => {
    if (!user) {
      alert("You must be logged in to bookmark a post");
      return;
    }

    setBookmark({
      user,
      bookmarked: !bookmarked,
      postId,
    });
  };

  return (
    <ToggleButton
      on={bookmarked}
      toggle={handleBookmark}
      OnIcon={RiBookmarkFill}
      OffIcon={RiBookmarkLine}
    />
  );
}
