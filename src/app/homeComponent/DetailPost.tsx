"use client";

import Image from "next/image";
import useSWR from "swr";

import { FullPost } from "@/model/posts";
import { parseDate } from "@/utils/parseDate";
import Avatar from "../component/Avatar/Avatar";
import Loader from "../component/PropagateLoader";
import Comments from "./Comments";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";

type Props = {
  postId: string;
};

export default function DetailPost({ postId }: Props) {
  const { data: post, isLoading } = useSWR<FullPost>(`/api/posts/${postId}`);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[500px]">
        <Loader />
      </div>
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
        <div className="grow p-2 overflow-auto">
          <Comments comments={post.comments} />
        </div>
        <div className="p-2">
          <ActionBar
            liked={post.liked}
            likes={post.likes}
            bookmarked={post.bookmarked}
            postId={postId}
          />
          <span className="block text-xs text-gray-400 uppercase">
            {parseDate(post.createdAt)}
          </span>
        </div>

        <CommentForm postId={postId} commentLength={post.comments.length} />
      </div>
    </section>
  );
}
