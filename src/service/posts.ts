import { Categories } from "@/model/posts";
import { client } from "./sanity";
import { formatPost, mapPosts } from "./utils";

export async function getFollowingPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == $username ||
      author._ref in 
     *[_type == "user" 
       && username == $username][0].followings[]._ref]|order(_createdAt desc)
         {
           "updatedAt":_updatedAt,
           photo,
           "likes": likes[]->username,
           "liked": $username in likes[]->username,
           "comments": count(comments),
           "text": comments[0].comment,
           "id": _id,
           "user":author->{username, image},
           "createdAt": _createdAt,
           "bookmarked": _id in 
            *[_type == "user" && username == $username][0].bookmarks[]->_id
         }
 `,
      {
        username,
      }
    )
    .then(mapPosts);
}

export async function getPost(id: string, username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]
  {
  "likes":likes[]->username,
  "liked": "${username}" in likes[]->username,
    "user":author->{
    username, image
    },
    photo,
    "comments" :comments[]{
      "username": author->username,
    "image": author->image,
    comment,
    "id":_key,
    },
    "bookmarked": _id in 
    *[_type == "user" && username == "${username}"][0].bookmarks[]->_id
  }
  `,
      undefined,
      {
        cache: "no-cache",
      }
    )
    .then(formatPost);
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
      && username == $username][0].bookmarks[]->_id]|order(_createdAt desc)
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

export async function createPost(userId: string, text: string, file: Blob) {
  return client.assets.upload("image", file).then((image) => {
    return client.create(
      {
        _type: "post",
        author: { _ref: userId },
        photo: {
          asset: {
            _type: "reference",
            _ref: image._id,
          },
        },
        comments: [
          {
            comment: text,
            author: {
              _type: "reference",
              _ref: userId,
            },
          },
        ],
        likes: [],
      },
      {
        autoGenerateArrayKeys: true,
      }
    );
  });
}
