"use client";

import Avatar from "@/app/component/Avatar/Avatar";
import { DetailUser } from "@/model/user";
import FollowButton from "./FollowButton";
import useSWR from "swr";
import Loader from "@/app/component/PropagateLoader";
import { ReactNode } from "react";

type Props = {
  username: string;
};

export default function Profile({ username }: Props) {
  const { data: user, isLoading: userInfoLoading } = useSWR<DetailUser>(
    `/api/users/${username}`
  );
  const { data: loggedInUser, isLoading } = useSWR<DetailUser>("/api/me");

  if (isLoading || userInfoLoading)
    return (
      <div>
        <div className="flex justify-center items-center m-4 h-[96px]">
          <Loader />
        </div>
      </div>
    );
  if (!user) return <div>Cannot find user</div>;

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
          <FollowButton user={user} loggedInUser={loggedInUser} />
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

function Container({ children }: { children: ReactNode }) {
  return (
    <div
      className="my-[40px] flex-col md:flex-row
flex items-center gap-8 w-[400px] "
    >
      {children}
    </div>
  );
}
