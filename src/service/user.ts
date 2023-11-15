import { DetailUser } from "@/model/user";
import { client } from "./sanity";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    followings: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == $username][0]{
        ...,
        "id": _id,
        followings[]->{username, image},
        followers[]->{username, image},
        "bookmarks": bookmarks[] -> _id,
        "posts":count(*[_type == "post" && author->username == $username])
      }`,
      {
        username,
      }
    )
    .then(
      (user: DetailUser) =>
        user && {
          ...user,
          followers: user.followers ?? [],
          followings: user.followings ?? [],
        }
    );
}

export async function getUserBookmarks(userId: string) {
  return client.fetch(
    `*[_type == "user" && _id == $userId][0]{
      "bookmarks":bookmarks[]->_id}
    `,
    { userId }
  );
}

export async function addBookmark({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function putBookmark({
  userId,
  postId,
  bookmarked,
}: {
  userId: string;
  postId: string;
  bookmarked: boolean;
}) {
  return fetch(`/api/users/${userId}/bookmark`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookmarked, postId }),
  });
}
