"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Avatar from "@/app/component/Avatar/Avatar";

function UserPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/auth/signIn");
    return;
  }

  return (
    <div className="flex flex-col items-center m-10">
      <div className="w-40 mb-4">
        <Avatar />
      </div>
      <h2 className="font-semibold text-lg">{session?.user?.username}</h2>
      <h2 className="font-semibold text-lg">{session?.user?.email}</h2>
    </div>
  );
}

export default UserPage;
