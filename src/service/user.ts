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
        followings[]->{username, image, "id":_id},
        followers[]->{username, image, "id":_id},
        "bookmarks": bookmarks[] -> _id,
        "posts":count(*[_type == "post" && author->username == $username])
      }`,
      {
        username,
      },
      {
        cache: "no-store",
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

export async function patchBookmark({
  userId,
  postId,
  bookmarked,
}: {
  userId: string;
  postId: string;
  bookmarked: boolean;
}) {
  return fetch(`/api/users/${userId}/bookmark`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookmarked, postId }),
  });
}

export async function follow({
  myId,
  targetId,
}: {
  myId: string;
  targetId: string;
}) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user.setIfMissing({ followings: [] }).append("followings", [
        {
          _ref: targetId,
          _type: "reference",
        },
      ])
    )
    .patch(targetId, (user) =>
      user.setIfMissing({ followers: [] }).append("followers", [
        {
          _ref: myId,
          _type: "reference",
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow({
  myId,
  targetId,
}: {
  myId: string;
  targetId: string;
}) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`followings[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit();
}

export async function patchFollow({
  userId,
  followingId,
  followed,
}: {
  userId: string;
  followingId: string;
  followed: boolean;
}) {
  return fetch(`/api/users/${userId}/follow`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followed, followingId }),
  });
}

export async function getUserFollowings(userId: string) {
  return client.fetch(
    `*[_type == "user" && _id == $userId][0]{
      "followings":followings[]->_id}
    `,
    { userId }
  );
}
