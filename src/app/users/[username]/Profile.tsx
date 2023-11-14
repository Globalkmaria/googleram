"use client";

import Avatar from "@/app/component/Avatar/Avatar";
import { DetailUser } from "@/model/user";
import { useSession } from "next-auth/react";

type Props = {
  user: DetailUser;
};

export default function Profile({ user }: Props) {
  const { data: session } = useSession();

  const isUser = session?.user.username === user.username;
  const isFollowing =
    !isUser &&
    user.followers.find((user) => user.username === session?.user.username);

  console.log(isFollowing, user.followers, session?.user.username);
  return (
    <div className="my-[40px] flex items-center gap-8 w-[400px] ">
      <Avatar user={user} withRing />
      <div className="flex-1">
        <div className="flex">
          <h2 className="">{user?.username}</h2>
          {isUser ? null : isFollowing ? (
            <button className={`${FollowBtnBaseClassName} bg-blue-500`}>
              Follow
            </button>
          ) : (
            <button className={`${FollowBtnBaseClassName} bg-red-500 `}>
              Unfollow
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <TotalNumberOfSubject count={user.posts} title="posts" />
          <TotalNumberOfSubject
            count={user.followers.length}
            title="followers"
          />
          <TotalNumberOfSubject
            count={user.followings.length}
            title="followings"
          />
        </div>
        <h2 className="font-semibold text-lg">{user.name}</h2>
      </div>
    </div>
  );
}

const FollowBtnBaseClassName = `ml-4 text-sm text-white font-semibold
rounded-md px-4 py-1`;

function TotalNumberOfSubject({
  count,
  title,
}: {
  count: number;
  title: string;
}) {
  return (
    <span className="flex gap-1">
      <span className="font-semibold">{count}</span>
      <span>{title}</span>
    </span>
  );
}
