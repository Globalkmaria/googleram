import { FullPost, SimplePost } from "@/model/posts";
import { AuthUser } from "@/model/user";
import { postLike } from "@/service/post";
import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

type SetLike = {
  postId: string;
  user?: AuthUser;
  liked: boolean;
  likes: string[];
};

export default function usePosts() {
  const { mutate } = useSWRConfig();

  const setLike = async ({ postId, user, liked, likes }: SetLike) => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }

    try {
      const newLikes: string[] = getNewLikes(likes, user, liked);
      updateLikes(newLikes, postId, mutate);
      await postLike({ liked: liked, postId });
    } catch (err) {
      updateLikes(likes, postId, mutate);
      console.log(err);
    }
  };
  return { setLike };
}

const baseOption = {
  revalidate: false,
  populateCache: false,
};

const updateLikes = (
  likes: string[],
  postId: string,
  mutate: ScopedMutator
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...baseOption,
    optimisticData: (current) => setNewPost(current, likes),
  });
  mutate(`/api/posts`, undefined, {
    ...baseOption,
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
