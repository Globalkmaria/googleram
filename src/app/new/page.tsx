import { Metadata } from "next";
import { getServerSession } from "next-auth";

import PostForm from "./components/PostForm";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <PostForm user={session?.user} />;
}

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};
