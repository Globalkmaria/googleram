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
        "posts":count(*[_type == "post" && author->username ==$username])
      }`,
      {
        username,
      }
    )
    .then((user: DetailUser) => ({
      ...user,
      followers: user.followers || [],
      followings: user.followings || [],
    }));
}
