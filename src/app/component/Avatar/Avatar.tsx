"use client";

import { useSession } from "next-auth/react";

type Props = {
  withRing?: boolean;
};

function Avatar({ withRing = true }: Props) {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  const bgClass = withRing ? RING_CLASS : "";

  return (
    <div
      className={`block bg-gradient-to-tr from-amber-400  
    via-rose-500  to-fuchsia-500 rounded-full ${bgClass} h-full w-full
    `}
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

const RING_CLASS = "p-1";
