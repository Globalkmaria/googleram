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

export async function addFollowing({
  userId,
  followingId,
}: {
  userId: string;
  followingId: string;
}) {
  return client
    .patch(userId)
    .setIfMissing({ followings: [] })
    .append("followings", [
      {
        _ref: followingId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeFollowing({
  userId,
  followingId,
}: {
  userId: string;
  followingId: string;
}) {
  return client
    .patch(userId)
    .unset([`followings[_ref=="${followingId}"]`])
    .commit();
}

export async function addFollower({
  userId,
  followerId,
}: {
  userId: string;
  followerId: string;
}) {
  return client
    .patch(userId)
    .setIfMissing({ followers: [] })
    .append("followers", [
      {
        _ref: followerId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeFollower({
  userId,
  followerId,
}: {
  userId: string;
  followerId: string;
}) {
  return client
    .patch(userId)
    .unset([`followers[_ref=="${followerId}"]`])
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
