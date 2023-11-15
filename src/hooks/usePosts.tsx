import { AuthUser } from "@/model/user";
import { postLike } from "@/service/post";
import { useSWRConfig } from "swr";

type SetLike = {
  postId: string;
  user?: AuthUser;
  liked: boolean;
};

export default function usePosts() {
  const { mutate } = useSWRConfig();

  const setLike = async ({ postId, user, liked }: SetLike) => {
    if (!user) {
      alert("You must be logged in to like a post");
      return;
    }

    try {
      await postLike({ liked: liked, postId });
      mutate(`/api/posts/${postId}`);
      mutate(`/api/posts`);
    } catch (err) {
      console.log(err);
    }
  };
  return { setLike };
}
