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
    <section
      className="w-full flex flex-col md:flex-row p-6 
    max-w-[850px] m-auto"
    >
      <div className=" w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar />
      </div>
    </section>
  );
}
