"use client";

import Image from "next/image";
import Link from "next/link";

import { SimplePost } from "@/model/posts";
import CommentForm from "./CommentForm";
import Avatar from "../component/Avatar/Avatar";
import ActionBar from "./ActionBar";
import { parseDate } from "@/utils/parseDate";
import { DetailUser } from "@/model/user";

type Props = {
  post: SimplePost;
  priority?: boolean;
  user?: DetailUser;
};

export default function Post({ post, user, priority = false }: Props) {
  return (
    <article className="shadow-md rounded-md  border-gray-200 border">
      <div className="flex items-center gap-2 p-2">
        <Avatar withRing size="small" user={post.user} />
        <span className="block font-semibold">{post.user.username}</span>
      </div>
      <Link href={`/posts/${post.id}`}>
        <Image
          src={post.photo}
          alt={`post image`}
          priority={priority}
          width={500}
          height={500}
          className="w-full object-cover aspect-square"
        />
      </Link>
      <div className="p-2">
        <ActionBar likes={post.likes} user={user} postId={post.id} />
        <div>
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span>{post.text}</span>
        </div>
        <span className="block text-xs text-gray-400 uppercase">
          {parseDate(post.createdAt)}
        </span>
      </div>
      <CommentForm />
    </article>
  );
}
