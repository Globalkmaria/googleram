import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

import ToggleButton from "../component/ToggleButton";
import useBookmarkPost from "@/hooks/useBookmarkPost";
import { memo, useCallback } from "react";

type Props = {
  postId: string;
  userId?: string;
  bookmarked: boolean;
};

function BookmarkBtn({ postId, userId, bookmarked }: Props) {
  const { setBookmark } = useBookmarkPost();

  const handleBookmark = useCallback(async () => {
    if (!userId) {
      alert("You must be logged in to bookmark a post");
      return;
    }

    setBookmark({
      userId,
      newBookmarked: !bookmarked,
      postId,
    });
  }, [setBookmark, userId, postId, bookmarked]);

  return (
    <ToggleButton
      on={bookmarked}
      toggle={handleBookmark}
      OnIcon={RiBookmarkFill}
      OffIcon={RiBookmarkLine}
    />
  );
}

export default memo(BookmarkBtn);
