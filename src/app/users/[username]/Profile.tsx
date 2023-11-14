import Avatar from "@/app/component/Avatar/Avatar";
import { DetailUser } from "@/model/user";
import FollowButton from "./FollowButton";

type Props = {
  user: DetailUser;
};

export default function Profile({ user }: Props) {
  const info = [
    { title: "posts", count: user.posts },
    { title: "followers", count: user.followers.length },
    { title: "followings", count: user.followings.length },
  ];

  return (
    <div
      className="my-[40px] flex-col md:flex-row
    flex items-center gap-8 w-[400px] "
    >
      <Avatar user={user} withRing />
      <div className="flex-1 flex flex-col items-center gap-y-2">
        <div className="flex flex-col md:flex-row items-center gap-y-2 gap-x-4">
          <h2>{user?.username}</h2>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-3">
          {info.map((data) => (
            <li className="flex gap-1" key={data.title}>
              <span className="font-semibold">{data.count}</span>
              <span>{data.title}</span>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold text-lg">{user.name}</h2>
      </div>
    </div>
  );
}
