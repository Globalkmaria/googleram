import { client } from "./sanity";

export async function getFollowingPosts(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == $username ||
     author._ref in 
    *[_type == "user" 
      && username == $username][0].followings[]._ref]|order(_created_at desc)
        {
          "updatedAt":_updatedAt,
          photo,
          "likes": likes[]->username,
          "comments": count(comments),
          "text": comments[0].comment,
          "id": _id,
          "user":author->{username, image},
          "createdAt": _createdAt
        }`,
    {
      username,
    }
  );
}
