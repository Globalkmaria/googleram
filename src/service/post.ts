import { client } from "./sanity";

type UpdatePostLike = {
  userId: string;
  postId: string;
};

export async function getPostLikedUsernames(postId: string) {
  return client.fetch(
    `*[_type == "post" && _id == $postId][0]{
      "likes":likes[]->username}
    `,
    { postId }
  );
}

export async function likePost({ userId, postId }: UpdatePostLike) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function unlikePost({ userId, postId }: UpdatePostLike) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}

export async function putLike({
  postId,
  liked,
}: {
  postId: string;
  liked: boolean;
}) {
  return fetch(`/api/posts/${postId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liked }),
  });
}

export async function addComment({
  postId,
  comment,
  userId,
}: {
  postId: string;
  comment: string;
  userId: string;
}) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        _type: "comment",
        comment,
        author: {
          _type: "reference",
          _ref: userId,
        },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function postComment({
  postId,
  comment,
}: {
  postId: string;
  comment: string;
}) {
  return fetch(`/api/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
}
