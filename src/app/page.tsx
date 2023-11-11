import FollowingBar from "./homeComponent/FollowingBar";
import PostList from "./homeComponent/PostList";
import SideBar from "./homeComponent/SideBar";

export default function Home() {
  return (
    <div className="flex justify-between p-6">
      <div className="">
        <FollowingBar />
        <PostList />
      </div>
      <SideBar />
    </div>
  );
}
