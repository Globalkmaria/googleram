import { SearchUser } from "@/model/user";
import Avatar from "../component/Avatar/Avatar";
import Link from "next/link";

type Props = {
  user: SearchUser;
};

export default function Card({ user }: Props) {
  return (
    <Link
      href={`/users/${user.username}`}
      className=" flex w-full border border-gray-200 p-4"
    >
      <Avatar size="medium" user={user} />
      <div className="flex-1 ml-2">
        <p className=" font-semibold">{user.name}</p>
        <p className=" text-gray-400">{user.username}</p>
        <div className="flex gap-1">
          <span className="text-gray-400">
            {user.followers}
            {` followers`}
          </span>
          <span className="text-gray-400">
            {user.followings}
            {` followings`}
          </span>
        </div>
      </div>
    </Link>
  );
}
