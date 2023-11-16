"use client";

import { useState } from "react";

import Loader from "@/app/component/PropagateLoader";
import useFollow from "@/hooks/useFollow";
import { DetailUser, SimpleUser } from "@/model/user";

type Props = {
  user: DetailUser;
  loggedInUser?: DetailUser;
};

export default function FollowButton({ user, loggedInUser }: Props) {
  const { username } = user;
  const setFollow = useFollow();
  const [isFetching, setIsFetching] = useState(false);

  const showButton = loggedInUser && loggedInUser.username !== username;
  if (!showButton) return <></>;

  const following = !!(
    loggedInUser &&
    loggedInUser.followings.find((item) => item.username === user.username)
  );

  const onClick = async () => {
    if (!loggedInUser) return;

    const userInfo: SimpleUser = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      image: loggedInUser.image,
    };

    const followingUserInfo: SimpleUser = {
      id: user.id,
      username: user.username,
      image: user.image,
    };

    setIsFetching(true);
    await setFollow({
      userInfo,
      followed: !following,
      followingUserInfo,
    });
    setIsFetching(false);
  };

  const ButtonText = following ? "Unfollow" : "Follow";

  return (
    <div className="relative">
      {isFetching && (
        <div
          className="absolute  z-20 inset-0 
      flex justify-center items-center"
        >
          <Loader />
        </div>
      )}
      <Button
        onClick={onClick}
        text={ButtonText}
        isRed={following}
        disabled={isFetching}
      />
    </div>
  );
}

type ButtonProps = {
  onClick: () => void;
  text: string;
  isRed?: boolean;
  disabled?: boolean;
};

function Button({
  onClick,
  text,
  disabled = false,
  isRed = false,
}: ButtonProps) {
  const colorClassName = isRed ? "bg-red-500" : "bg-blue-500";
  const disabledClassName = disabled ? "opacity-50 cursor-default" : "";
  return (
    <button
      className={`text-sm text-white font-semibold
      rounded-md px-4 py-1 ${colorClassName} ${disabledClassName}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
