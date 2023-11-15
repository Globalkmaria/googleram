import { client } from "./sanity";

type UpdatePostLike = {
  userId: string;
  postId: string;
  liked: boolean;
};

export async function updatePostLike({
  userId,
  postId,
  liked,
}: UpdatePostLike) {
  if (liked) {
    return client
      .patch(postId)
      .insert("after", "likes[-1]", [
        {
          _type: "reference",
          _ref: userId,
        },
      ])
      .commit({ autoGenerateArrayKeys: true });
  }

  return client
    .patch(postId)
    .unset([`likes[_key == ${userId}]`])
    .commit();
}

export async function postLike({
  postId,
  liked,
}: Omit<UpdatePostLike, "userId">) {
  return fetch(`/api/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ liked }),
  });
}
