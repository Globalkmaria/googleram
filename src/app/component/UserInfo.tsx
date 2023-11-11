import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function UserInfo() {
  const session = await getServerSession(authOptions);

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
