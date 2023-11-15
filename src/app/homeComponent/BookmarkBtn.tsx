"use client";

import { useState } from "react";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import ToggleButton from "../component/ToggleButton";

export default function BookmarkBtn() {
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
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
