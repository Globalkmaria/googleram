import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

import { FullPost, SimplePost } from "@/model/posts";
import { patchLike } from "@/service/post";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";

type SetLike = {
  postId: string;
  username: string;
  liked: boolean;
};

export default function useLikePost() {
  const { mutate } = useSWRConfig();

  const setLike = useCallback(
    async ({ postId, username, liked }: SetLike) => {
      try {
        updateLikes(username, liked, postId, mutate);
        await patchLike({ liked: liked, postId });
      } catch (err) {
        updateLikes(username, liked, postId, mutate);
        console.log(err);
      }
    },
    [mutate]
  );

  return { setLike };
}

const updateLikes = (
  username: string,
  newLiked: boolean,
  postId: string,
  mutate: ScopedMutator
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPost(current, newLiked, username),
  });
  mutate(`/api/posts`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) =>
      setNewPosts(current, newLiked, username, postId),
  });
};

const getNewLikes = (likes: string[], username: string, newLiked: boolean) =>
  newLiked
    ? [...likes, username]
    : likes.filter((likedUser) => likedUser !== username);

const setNewPost = (
  current: undefined | FullPost | SimplePost,
  newLiked: boolean,
  username: string
) =>
  current === undefined
    ? undefined
    : {
        ...current,
        likes: getNewLikes(current.likes, username, newLiked),
        liked: newLiked,
      };

const setNewPosts = (
  current: undefined | SimplePost[],
  newLiked: boolean,
  username: string,
  postId: string
) =>
  current === undefined
    ? undefined
    : current.map((post: SimplePost) =>
        post.id === postId ? setNewPost(post, newLiked, username) : post
      );
