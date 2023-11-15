import { DetailUser } from "@/model/user";
import { putBookmark } from "@/service/user";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";
import { useCallback } from "react";
import { useSWRConfig } from "swr";

type SetBookmark = {
  postId: string;
  user?: DetailUser;
  bookmarked: boolean;
};

export default function useBookmarkPost() {
  const { mutate } = useSWRConfig();

  const setBookmark = useCallback(
    async ({ postId, user, bookmarked }: SetBookmark) => {
      if (!user?.id) {
        alert("You must be logged in to bookmark a post");
        return;
      }

      try {
        const newBookmarks = getNewBookmarks(
          bookmarked,
          postId,
          user.bookmarks
        );
        mutate(`/api/me`, undefined, {
          ...MUTATION_BASE_OPTION,
          optimisticData: (current) => ({
            ...current,
            bookmarks: newBookmarks,
          }),
        });
        await putBookmark({
          postId,
          bookmarked,
          userId: user.id,
        });
      } catch (error) {
        console.log(error);
        mutate(`/api/me`, undefined, {
          ...MUTATION_BASE_OPTION,
          optimisticData: (current) => ({
            ...current,
            bookmarks: user.bookmarks,
          }),
        });
        throw new Error("Error bookmarking post");
      }
    },
    [mutate]
  );

  return setBookmark;
}

const getNewBookmarks = (
  bookmarked: boolean,
  postId: string,
  bookmarks: string[]
) =>
  bookmarked
    ? [...bookmarks, postId]
    : bookmarks.filter((postId) => postId !== postId);
