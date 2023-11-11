import { User } from "@/model/user";

export type AvatarProps = {
  withRing?: boolean;
  size?: "small" | "medium";
  user: User;
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
        title={user?.name || ""}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Avatar;

const getContainerStyle = ({
  size,
  withRing,
}: Pick<AvatarProps, "size" | "withRing">) => {
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

const getImageStyle = ({ size }: Pick<AvatarProps, "size">) => {
  const base = "rounded-full bg-white";
  const sizeStyle =
    size === "small"
      ? "h-[36px] w-[36px] p-[2px]"
      : "h-[66px] w-[66px] p-[3px]";

  return `${base} ${sizeStyle}`;
};
