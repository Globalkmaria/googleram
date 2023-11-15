"use client";

import { useEffect, useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import ToggleButton from "../component/ToggleButton";
import { DetailUser } from "@/model/user";
import useBookmarkPost from "@/hooks/useBookmarkPost";

type Props = {
  postId: string;
  user?: DetailUser;
};

export default function BookmarkBtn({ postId, user }: Props) {
  const [bookmarked, setBookmarked] = useState(
    user?.bookmarks.includes(postId) || false
  );
  const setBookmark = useBookmarkPost();

  const handleBookmark = async () => {
    const preValue = bookmarked;
    setBookmarked(!preValue);

    try {
      await setBookmark({
        user,
        bookmarked: !bookmarked,
        postId,
      });
    } catch (err) {
      setBookmarked(preValue);
      console.log(err);
    }
  };

  useEffect(() => {
    setBookmarked(user?.bookmarks.includes(postId) || false);
  }, [user?.bookmarks, postId]);

  return (
    <ToggleButton
      on={bookmarked}
      toggle={handleBookmark}
      OnIcon={RiBookmarkFill}
      OffIcon={RiBookmarkLine}
    />
  );
}
