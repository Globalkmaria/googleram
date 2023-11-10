import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function Avatar() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div
      className="block text-2xl bg-gradient-to-tr from-amber-400  
    via-rose-500  to-fuchsia-500 px-1 py-1 rounded-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full w-full h-full"
        src={session.user?.image ?? undefined}
        alt={`user avatar`}
        title={session.user?.name || ""}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Avatar;
