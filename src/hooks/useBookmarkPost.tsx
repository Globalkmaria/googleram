import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

import { FullPost, SimplePost } from "@/model/posts";
import { patchBookmark } from "@/service/user";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";

type SetBookmark = {
  postId: string;
  userId: string;
  newBookmarked: boolean;
};

export default function useBookmarkPost() {
  const { mutate } = useSWRConfig();

  const setBookmark = useCallback(
    async ({ postId, userId, newBookmarked }: SetBookmark) => {
      if (!userId) {
        alert("You must be logged in to bookmark a post");
        return;
      }

      try {
        updateBookmark(newBookmarked, postId, mutate);
        await patchBookmark({
          postId,
          bookmarked: newBookmarked,
          userId: userId,
        });
      } catch (error) {
        console.log(error);
        updateBookmark(!newBookmarked, postId, mutate);
        throw new Error("Error bookmarking post");
      }
    },
    [mutate]
  );

  return { setBookmark };
}

const updateBookmark = (
  newBookmarked: boolean,
  postId: string,
  mutate: ScopedMutator
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPost(current, newBookmarked),
  });
  mutate(`/api/posts`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPosts(current, newBookmarked, postId),
  });
};

const setNewPost = (
  current: undefined | FullPost | SimplePost,
  newBookmarked: boolean
) =>
  current === undefined
    ? undefined
    : {
        ...current,
        bookmarked: newBookmarked,
      };

const setNewPosts = (
  current: undefined | SimplePost[],
  newLiked: boolean,
  postId: string
) =>
  current === undefined
    ? undefined
    : current.map((post: SimplePost) =>
        post.id === postId ? setNewPost(post, newLiked) : post
      );
