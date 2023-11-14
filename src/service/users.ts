import { client } from "./sanity";

export async function getUsersByKeyword(keyword: string) {
  return client.fetch(
    `*[_type == "user" && 
    (username match "*${keyword}*" || name match "*${keyword}*")]
    {
        username, name, image,email,
        "counts": *[_type == "user" && references(^._id)][0]{
            "followers": count(followers),
            "followings": count(followings)
        }
    }`
  );
}
