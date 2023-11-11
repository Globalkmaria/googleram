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

export async function getUser(username: string) {
  return client.fetch(`*[_type == "user" && username == $username][0]`, {
    username,
  });
}

export async function getFollowings(username: string) {
  return client.fetch(
    `*[_type == "user" && username == $username][0]{followings[]->{
      username, image
    }}`,
    {
      username,
    }
  );
}
