import { client } from "./sanity";

type UpdatePostLike = {
  userId: string;
  postId: string;
};

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

export async function postLike({
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
