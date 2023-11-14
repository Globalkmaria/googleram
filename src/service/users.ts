import { SearchUser } from "@/model/user";
import { client } from "./sanity";

export async function getUsersByKeyword(keyword: string) {
  return client
    .fetch(
      `*[_type == "user" && 
    (username match "*${keyword}*" || name match "*${keyword}*")]
    {
        username, name, image,email,
            "followers": count(followers),
            "followings": count(followings)
    }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        followings: user.followings ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}
