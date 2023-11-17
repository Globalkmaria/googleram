import { SimplePost } from "@/model/posts";
import { urlFor } from "@/utils/urlFor";

export function formatPost(post: SimplePost) {
  return {
    ...post,
    likes: post.likes ?? [],
    photo: urlFor(post.photo).url() || "",
    bookmarked: post.bookmarked ?? false,
  };
}

export function mapPosts(posts: SimplePost[]) {
  return posts.map(formatPost);
}
