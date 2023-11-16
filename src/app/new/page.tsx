import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Avatar from "../component/Avatar/Avatar";
import PostForm from "./components/PostForm";
import { Metadata } from "next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    alert("You need to be signed in to add new post.");
    return redirect("/auth/signIn");
  }

  return (
    <section className="w-full flex flex-col items-center mt-6">
      <div className="flex gap-2 items-center">
        <Avatar size="small" user={session.user} withRing />
        <span className=" font-bold">{session.user.username}</span>
      </div>
      <PostForm />
    </section>
  );
}

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new post",
};
