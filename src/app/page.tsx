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
    <section className="flex justify-between p-6">
      <div>
        <FollowingBar />
        <PostList />
      </div>
      <SideBar />
    </section>
  );
}
