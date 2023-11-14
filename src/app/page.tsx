import { getServerSession } from "next-auth";

import FollowingBar from "./homeComponent/FollowingBar";
import PostList from "./homeComponent/PostList";
import SideBar from "./homeComponent/SideBar";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signIn");
  }

  return (
    <section className="flex flex-col md:flex-row">
      <div className="min-w-0 basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="ml-12 basis-1/4">
        <SideBar />
      </div>
    </section>
  );
}
