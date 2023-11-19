"use client";

import useSWR from "swr";

import { SimplePost } from "@/model/posts";
import Loader from "../component/PropagateLoader";
import Post from "./Post";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  if (error) return <div>{error.message}</div>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100px]">
        <Loader />
      </div>
    );

  if (!posts?.length)
    return (
      <div className="flex justify-center items-center h-[100px]">No posts</div>
    );

  return (
    <section>
      <ul className="flex flex-col gap-12 mt-6 md:mt-10">
        {posts?.map((post, idx) => (
          <li key={post.id}>
            <Post key={post.id} post={post} priority={idx < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
