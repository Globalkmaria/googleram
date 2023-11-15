"use client";

import useSWR from "swr";
import { PropagateLoader } from "react-spinners";

import { SimplePost } from "@/model/posts";
import Post from "./Post";
import { DetailUser } from "@/model/user";

export default function PostList() {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR<DetailUser>(`/api/me`);
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");

  if (error || userError)
    return <div>{error.message || userError.message}</div>;
  if (isLoading || userLoading)
    return (
      <div className="flex justify-center items-center h-[100px]">
        <PropagateLoader color="#d946ef" />
      </div>
    );

  return (
    <section>
      <ul className="flex flex-col gap-12 mt-16">
        {posts?.map((post, idx) => (
          <li key={post.id}>
            <Post key={post.id} post={post} priority={idx < 2} user={user} />
          </li>
        ))}
      </ul>
    </section>
  );
}
