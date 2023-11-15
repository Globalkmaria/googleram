import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

import { Comment, FullPost, SimplePost } from "@/model/posts";
import { AuthUser } from "@/model/user";
import { postComment } from "@/service/post";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";

type SetComment = {
  comment: string;
  postId: string;
  user: AuthUser;
  preCommentLength: number;
};

export default function useComment() {
  const { mutate } = useSWRConfig();

  const setComment = async ({
    comment,
    postId,
    user,
    preCommentLength,
  }: SetComment) => {
    const newComment: Comment = {
      comment,
      username: user.username,
      image: user.image || "",
      id: new Date().toISOString(),
    };

    try {
      updateComments(newComment, postId, mutate);
      await postComment({ comment, postId });
      return {
        isSuccess: true,
      };
    } catch (err) {
      rollbackComments(postId, mutate, preCommentLength);
      console.log(err);
      return {
        isSuccess: false,
      };
    }
  };

  return setComment;
}

const updateComments = (
  comment: Comment,
  postId: string,
  mutate: ScopedMutator
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPost(current, comment),
  });
  mutate(`/api/posts`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewPosts(current, postId),
  });
};

const rollbackComments = (
  postId: string,
  mutate: ScopedMutator,
  preCommentLength: number
) => {
  mutate(`/api/posts/${postId}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => rollbackPost(current, preCommentLength),
  });
  mutate(`/api/posts`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) =>
      rollbackPosts(current, postId, preCommentLength),
  });
};

const setNewPost = (current: undefined | FullPost, comment: Comment) =>
  current === undefined
    ? undefined
    : {
        ...current,
        comments: [...current.comments, comment],
      };

const setNewPosts = (current: undefined | SimplePost[], postId: string) =>
  current === undefined
    ? undefined
    : current.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post
      );

const rollbackPost = (
  current: undefined | FullPost,
  preCommentLength: number
) =>
  current === undefined
    ? undefined
    : {
        ...current,
        comments: current.comments.slice(0, preCommentLength),
      };

const rollbackPosts = (
  current: undefined | SimplePost[],
  postId: string,
  preCommentLength: number
) =>
  current === undefined
    ? undefined
    : current.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: preCommentLength,
            }
          : post
      );
