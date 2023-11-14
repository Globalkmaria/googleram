import { SummaryUser } from "@/model/user";
import Avatar from "../component/Avatar/Avatar";
import Link from "next/link";

type Props = {
  user: SummaryUser;
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
        <p className="text-gray-400">
          {user.counts?.followers || 0} followers {user.counts?.followings || 0}
          {` followings`}
        </p>
      </div>
    </Link>
  );
}
