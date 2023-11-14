"use client";

import { ReactNode } from "react";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

import Profile from "./Profile";
import Content from "./Content";
import { DetailUser } from "@/model/user";

type Props = {
  username: string;
};

export default function User({ username }: Props) {
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<DetailUser>(`/api/users/${username}`);

  if (error) {
    return <UserPageWrapper>Error</UserPageWrapper>;
  }

  if (isLoading) {
    return (
      <UserPageWrapper>
        <PropagateLoader color="#d946ef" />
      </UserPageWrapper>
    );
  }

  if (!user) {
    return <UserPageWrapper>User not found</UserPageWrapper>;
  }

  return (
    <UserPageWrapper>
      <Profile user={user} />
      <Content username={user.username} />
    </UserPageWrapper>
  );
}

function UserPageWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full flex flex-col items-center">{children}</div>;
}
