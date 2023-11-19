import { SimpleUser, AuthUser } from "@/model/user";
import { memo } from "react";

export type AvatarProps = {
  withRing?: boolean;
  size?: "small" | "medium";
  user: SimpleUser;
};

function Avatar({ withRing = false, size = "medium", user }: AvatarProps) {
  if (!user?.image) {
    return <></>;
  }

  return (
    <div className={getContainerStyle({ withRing, size })}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={getImageStyle({ size })}
        src={user?.image ?? undefined}
        alt={`user avatar`}
        title={user?.username || ""}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default memo(Avatar);

const getContainerStyle = ({
  size,
  withRing,
}: Pick<AvatarProps, "size" | "withRing">) => {
  const base = "rounded-full flex justify-center items-center";
  const sizeStyle =
    size === "small"
      ? "h-[28px] w-[28px] min-w-[28px] min-h-[28px] md:h-[40px] md:w-[40px] md:min-w-[40px] md:min-h-[40px]"
      : "h-[48px] w-[48px] min-w-[48px] min-h-[48px] md:h-[70px] md:w-[70px] md:min-w-[70px] md:min-h-[70px]";
  const ringStyle = withRing ? "bg-google-gradient" : "";

  return `${base} ${sizeStyle} ${ringStyle}`;
};

const getImageStyle = ({ size }: Pick<AvatarProps, "size">) => {
  const base = "rounded-full bg-white object-cover";
  const sizeStyle =
    size === "small"
      ? "h-[26px] w-[26px] p-[1px] md:h-[36px] md:w-[36px] md:p-[2px]"
      : "h-[44px] w-[44px] p-[3px] md:h-[66px] md:w-[66px] md:p-[3px]";

  return `${base} ${sizeStyle}`;
};
