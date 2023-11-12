"use client";

import { useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";

export default function BookmarkBtn() {
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <>
      {bookmarked ? (
        <RiBookmarkFill onClick={handleBookmark} />
      ) : (
        <RiBookmarkLine onClick={handleBookmark} />
      )}
    </>
  );
}