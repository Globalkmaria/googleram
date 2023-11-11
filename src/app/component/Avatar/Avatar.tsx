"use client";

import { useSession } from "next-auth/react";

export type AvatarProps = {
  withRing?: boolean;
  size?: "small" | "medium";
};

function Avatar({ withRing = false, size = "medium" }: AvatarProps) {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div className={getContainerStyle({ withRing, size })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={getImageStyle({ size })}
        src={session.user?.image ?? undefined}
        alt={`user avatar`}
        title={session.user?.name || ""}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Avatar;

const getContainerStyle = ({ size, withRing }: AvatarProps) => {
  const base = "rounded-full flex justify-center items-center";
  const sizeStyle =
    size === "small"
      ? "h-[40px] w-[40px] min-w-[40px] min-h-[40px]"
      : "h-[70px] w-[70px] min-w-[70px] min-h-[70px]";
  const ringStyle = withRing
    ? "bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-500"
    : "";

  return `${base} ${sizeStyle} ${ringStyle}`;
};

const getImageStyle = ({ size }: AvatarProps) => {
  const base = "rounded-full bg-white";
  const sizeStyle =
    size === "small"
      ? "h-[36px] w-[36px] p-[0.1rem]"
      : "h-[64px] w-[64px] p-[0.2rem]";

  return `${base} ${sizeStyle}`;
};
