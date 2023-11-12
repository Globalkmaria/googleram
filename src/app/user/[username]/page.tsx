"use client";

import Avatar from "@/app/component/Avatar/Avatar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";

type Props = {
  params: {
    username: string;
  };
};

export default function UserPage({ params: { username } }: Props) {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect("/auth/signIn");
  }

  const { data: user, isLoading } = useSWR(`/api/user/${username}`);
  return (
    <div className="flex flex-col items-center m-10">
      {isLoading ? (
        <PropagateLoader color="#d946ef" />
      ) : (
        <>
          <Avatar user={user} withRing />
          <h2 className="font-semibold text-lg">{user?.username}</h2>
          <h2 className="font-semibold text-lg">{user?.email}</h2>
        </>
      )}
    </div>
  );
}
