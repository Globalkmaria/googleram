import { client } from "./sanity";

export async function getFollowingPosts(username: string) {
  return client.fetch(
    `*[_type == "post" 
    && author._ref in 
    *[_type == "user" 
      && username == $username][0].followings[]._ref]
        {
    "updatedAt":_updatedAt,
            photo,
              "likes": count(likes),
    comments[]{"id":_key,"user": author->{
            username
    }, comment},
          "id": _id,
          "user":author->{username, image}
        }`,
    {
      username,
    }
  );
}
