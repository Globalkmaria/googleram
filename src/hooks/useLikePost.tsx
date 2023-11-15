import { FullPost, SimplePost } from "@/model/posts";
import { AuthUser } from "@/model/user";
import { patchLike } from "@/service/post";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";
import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

type SetLike = {
  postId: string;
  user: AuthUser;
  liked: boolean;
  likes: string[];
};

export default function useLikePost() {
  const { mutate } = useSWRConfig();

  const setLike = useCallback(
    async ({ postId, user, liked, likes }: SetLike) => {
      try {
        const newLikes: string[] = getNewLikes(likes, user, liked);
        updateLikes(newLikes, postId, mutate);
        await patchLike({ liked: liked, postId });
      } catch (err) {
        updateLikes(likes, postId, mutate);
        console.log(err);
      }
    },
    [mutate]
  );

  return { setLike };
}

const updateLikes = (
  likes: string[],
  postId: string,
  mutate: ScopedMutator
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPost(current, likes),
  });
  mutate(`/api/posts`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPosts(current, likes, postId),
  });
};

const getNewLikes = (likes: string[], user: AuthUser, liked: boolean) =>
  liked
    ? [...likes, user.username]
    : likes.filter((username) => username !== user.username);

const setNewPost = (current: undefined | FullPost, newLikes: string[]) =>
  current === undefined
    ? undefined
    : {
        ...current,
        likes: newLikes,
      };

const setNewPosts = (
  current: undefined | SimplePost[],
  newLikes: string[],
  postId: string
) =>
  current === undefined
    ? undefined
    : current.map((post: SimplePost) =>
        post.id === postId
          ? {
              ...post,
              likes: newLikes,
            }
          : post
      );