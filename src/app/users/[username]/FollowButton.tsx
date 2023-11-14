"use client";

import { DetailUser } from "@/model/user";
import { useSession } from "next-auth/react";
import useSWR from "swr";

type Props = {
  user: DetailUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<DetailUser>("/api/me");

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.followings.find((item) => item.username === username);

  return (
    <>
      {showButton && !following ? (
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

const FollowBtnBaseClassName = `text-sm text-white font-semibold
rounded-md px-4 py-1`;
