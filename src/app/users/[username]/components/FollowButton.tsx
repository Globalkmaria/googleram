import useFollow from "@/hooks/useFollow";

import { DetailUser, SimpleUser } from "@/model/user";

type Props = {
  user: DetailUser;
  loggedInUser?: DetailUser;
};

export default function FollowButton({ user, loggedInUser }: Props) {
  const { username } = user;
  const setFollow = useFollow();

  const showButton = loggedInUser && loggedInUser.username !== username;
  if (!showButton) return <></>;

  const following =
    loggedInUser &&
    loggedInUser.followings.find((item) => item.username === user.username);

  const onClick = () => {
    if (!loggedInUser) return;

    const userInfo: SimpleUser = {
      id: loggedInUser.id,
      username: loggedInUser.username,
      image: user.image,
    };

    const followingUserInfo: SimpleUser = {
      id: user.id,
      username: user.username,
      image: user.image,
    };

    setFollow({
      userInfo,
      followed: !following,
      followingUserInfo,
    });
  };

  return (
    <>
      {!following ? (
        <button
          className={`${FollowBtnBaseClassName} bg-blue-500`}
          type="button"
          onClick={onClick}
        >
          Follow
        </button>
      ) : (
        <button
          className={`${FollowBtnBaseClassName} bg-red-500 `}
          type="button"
          onClick={onClick}
        >
          Unfollow
        </button>
      )}
    </>
  );
}

const FollowBtnBaseClassName = `text-sm text-white font-semibold
rounded-md px-4 py-1`;
