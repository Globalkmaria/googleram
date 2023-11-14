import { Categories, SimplePost } from "@/model/posts";
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
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == $id][0]
  {
  "likes":likes[]->username,
    "user":author->{
    username, image
    },
    photo,
    "comments" :comments[]{
      "username": author->username,
    "image": author->image,
    comment,
    "id":_key,
    }
  }
  `,
      { id }
    )
    .then((post) => ({
      ...post,
      photo: urlFor(post.photo).url() || "",
    }));
}

export async function getUserPostsByCategory(
  username: string,
  category: Categories
) {
  switch (category) {
    case "saved":
      return client
        .fetch(
          `*[_type == "post" && _id in 
    *[_type == "user" 
      && username == $username][0].bookmarks[]->id]|order(_createdAt desc)
        {
          photo,
          "id": _id,
          "user":author->{username, image},
          "createdAt": _createdAt
        }`,
          {
            username,
          }
        )
        .then(mapPosts);
    case "liked":
      return client
        .fetch(
          `*[_type == "post" && $username in likes[]-> username]
          |order(_createdAt desc)
        {
          photo,
          "id": _id,
          "user":author->{username, image},
          "createdAt": _createdAt
        }`,
          {
            username,
          }
        )
        .then(mapPosts);

    default:
      return client
        .fetch(
          `*[_type == "post" && author->username == $username]
          |order(_createdAt desc)
        {
          photo,
          "id": _id,
          "user":author->{username, image},
          "createdAt": _createdAt
        }`,
          {
            username,
          }
        )
        .then(mapPosts);
  }
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    photo: urlFor(post.photo).url() || "",
  }));
}
