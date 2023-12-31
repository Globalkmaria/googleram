import { getServerSession } from "next-auth";

import Avatar from "../component/Avatar/Avatar";
import UserInfo from "../component/UserInfo";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SideBar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full">
      {session?.user && (
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[70px] w-[70px] min-w-[70px] min-h-[70px]">
            <Avatar user={session.user} />
          </div>
          <div className="text-xl">
            <UserInfo user={session.user} />
          </div>
        </div>
      )}
      <div className=" text-gray-500 mb-6 text-md">
        {SIDE_MAP.map((item, i) => (
          <span key={i}>
            {i ? <span> · </span> : ""}
            {item}
          </span>
        ))}
      </div>
      <div className="font-semibold text-gray-500 text-xs">
        @Copyright Googlram from Dino.M
      </div>
    </div>
  );
}

const SIDE_MAP = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Locations",
  "Language",
];
