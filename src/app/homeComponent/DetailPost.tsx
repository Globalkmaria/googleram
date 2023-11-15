"use client";

import { FullPost } from "@/model/posts";
import Image from "next/image";
import Avatar from "../component/Avatar/Avatar";
import Comments from "./Comments";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import useSWR from "swr";
import Loader from "../component/PropagateLoader";
import { parseDate } from "@/utils/parseDate";
import { useSession } from "next-auth/react";

type Props = {
  postId: string;
};

export default function DetailPost({ postId }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const { data: post, isLoading } = useSWR<FullPost>(`/api/posts/${postId}`);

  if (isLoading)
    return (
      <section className="flex h-[500px]">
        <Loader />
      </section>
    );
  if (!post) return <div>No Post</div>;

  return (
    <section className="flex h-[500px]">
      <div className="flex-3/5 basis-3/5 relative">
        <Image
          src={post.photo}
          alt={`${post.user.username} post image`}
          fill
          sizes="650px"
          priority
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-2/5 basis-2/5 bg-white">
        <div className="flex items-center gap-2 p-2 border border-b-gray-200">
          <Avatar withRing size="small" user={post.user} />
          <span className="block font-semibold">{post.user.username}</span>
        </div>
        <div className="grow p-2">
          <Comments comments={post.comments} />
        </div>
        <div className="p-2">
          <ActionBar user={user} likes={post.likes} postId={postId} />
          <span className="block text-xs text-gray-400 uppercase pt-2">
            {parseDate(post.createdAt)}
          </span>
        </div>

        <CommentForm />
      </div>
    </section>
  );
}
