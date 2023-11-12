"use client";

import useSWR from "swr";
import { PropagateLoader } from "react-spinners";

import { Post as PostModel } from "@/model/posts";
import Post from "./Post";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<PostModel[]>("/api/posts");

  if (error) return <div>{error.message}</div>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100px]">
        <PropagateLoader color="#d946ef" />
      </div>
    );

  return (
    <section className="flex flex-col gap-12 mt-16">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}
