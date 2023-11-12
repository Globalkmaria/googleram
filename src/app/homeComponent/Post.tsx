import Image from "next/image";

import { SimplePost } from "@/model/posts";
import CommentForm from "./CommentForm";
import Avatar from "../component/Avatar/Avatar";
import ActionBar from "./ActionBar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function Post({ post, priority = false }: Props) {
  return (
    <article className="shadow-md rounded-md  border-gray-200 border">
      <div className="flex items-center gap-2 p-2">
        <Avatar withRing size="small" user={post.user} />
        <span className="block font-semibold">{post.user.username}</span>
      </div>
      <Image
        src={post.photo}
        alt={`post image`}
        priority={priority}
        width={500}
        height={500}
        className="w-full object-cover aspect-square"
      />
      <ActionBar
        likes={post.likes}
        username={post.user.username}
        text={post.text}
        createdAt={post.createdAt}
      />
      <CommentForm />
    </article>
  );
}
