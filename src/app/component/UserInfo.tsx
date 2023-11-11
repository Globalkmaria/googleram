"use client";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div>
      <span className="font-bold block break-all">
        {session.user?.username}
      </span>
      <span className="text-gray-500 block break-all">
        {session.user?.name}
      </span>
    </div>
  );
}
