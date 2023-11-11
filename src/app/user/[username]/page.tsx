import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Avatar from "@/app/component/Avatar/Avatar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signIn");
  }

  return (
    <div className="flex flex-col items-center m-10">
      <div className="w-40 mb-4">
        <Avatar withRing />
      </div>
      <h2 className="font-semibold text-lg">{session?.user?.username}</h2>
      <h2 className="font-semibold text-lg">{session?.user?.email}</h2>
    </div>
  );
}
