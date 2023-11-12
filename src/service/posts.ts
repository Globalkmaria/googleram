import { SimplePost } from "@/model/posts";
import { client } from "./sanity";
import { urlFor } from "@/utils/urlFor";

export async function getFollowingPosts(username: string) {
  return client
    .fetch(
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
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        photo: urlFor(post.photo).url() || "",
      }))
    );
}
