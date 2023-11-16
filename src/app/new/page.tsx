import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import PostForm from "./components/PostForm";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    alert("You need to be signed in to add new post.");
    return redirect("/auth/signIn");
  }

  return <PostForm user={session.user} />;
}

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};
