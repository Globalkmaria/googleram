"use client";

import { DetailUser } from "@/model/user";
import { useSession } from "next-auth/react";

type Props = {
  user: DetailUser;
};

export default function FollowButton({ user }: Props) {
  const { data: session } = useSession();

  const isUser = session?.user.username === user.username;
  const isFollowing =
    !isUser &&
    user.followers.find((user) => user.username === session?.user.username);

  return (
    <>
      {isUser ? null : isFollowing ? (
        <button className={`${FollowBtnBaseClassName} bg-blue-500`}>
          Follow
        </button>
      ) : (
        <button className={`${FollowBtnBaseClassName} bg-red-500 `}>
          Unfollow
        </button>
      )}
    </>
  );
}

const FollowBtnBaseClassName = `ml-4 text-sm text-white font-semibold
rounded-md px-4 py-1`;
