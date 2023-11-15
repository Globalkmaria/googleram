import { SimplePost } from "@/model/posts";
import { urlFor } from "@/utils/urlFor";

export function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    photo: urlFor(post.photo).url() || "",
  }));
}
