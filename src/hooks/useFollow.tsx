import { DetailUser, SimpleUser } from "@/model/user";
import { patchFollow } from "@/service/user";
import { MUTATION_BASE_OPTION } from "@/utils/mutationBaseOptions";
import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { ScopedMutator } from "swr/_internal";

type SetFollow = {
  userInfo: SimpleUser;
  followed: boolean;
  followingUserInfo: SimpleUser;
};

export default function useFollow() {
  const { mutate } = useSWRConfig();
  const setFollow = useCallback(
    async ({ userInfo, followed, followingUserInfo }: SetFollow) => {
      try {
        updateFollow(userInfo, followingUserInfo, followed, mutate);
        await patchFollow({
          userId: userInfo.id,
          followed,
          followingId: followingUserInfo.id,
        });
        mutate(`/api/me`);
      } catch (error) {
        rollbackFollow(userInfo, followingUserInfo, followed, mutate);
        console.log(error);
      }
    },
    [mutate]
  );

  return setFollow;
}

const updateFollow = (
  userInfo: SimpleUser,
  followingUserInfo: SimpleUser,
  followed: boolean,
  mutate: ScopedMutator
) => {
  mutate(`/api/me`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) =>
      setNewFollowing(current, followingUserInfo, followed),
  });
  mutate(`/api/users/${userInfo.username}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) =>
      setNewFollowing(current, followingUserInfo, followed),
  });
  mutate(`/api/users/${followingUserInfo.username}`, undefined, {
    ...MUTATION_BASE_OPTION,
    optimisticData: (current) => setNewFollowers(current, userInfo, followed),
  });
};

const rollbackFollow = (
  userInfo: SimpleUser,
  followingUserInfo: SimpleUser,
  followed: boolean,
  mutate: ScopedMutator
) => updateFollow(userInfo, followingUserInfo, !followed, mutate);

const setNewFollowing = (
  current: undefined | DetailUser,
  userInfo: SimpleUser,
  followed: boolean
) => updateFollowings(current, userInfo, followed ? "add" : "remove");

const setNewFollowers = (
  current: undefined | DetailUser,
  followingUserInfo: SimpleUser,
  followed: boolean
) => updateFollowers(current, followingUserInfo, followed ? "add" : "remove");

const updateFollowings = (
  current: undefined | DetailUser,
  userInfo: SimpleUser,
  type: "add" | "remove"
) =>
  current === undefined
    ? undefined
    : {
        ...current,
        followings:
          type === "add"
            ? [...current.followings, userInfo]
            : current.followings.filter((user) => user.id !== userInfo.id),
      };

const updateFollowers = (
  current: undefined | DetailUser,
  userInfo: SimpleUser,
  type: "add" | "remove"
) =>
  current === undefined
    ? undefined
    : {
        ...current,
        followers:
          type === "add"
            ? [...current.followers, userInfo]
            : current.followers.filter((user) => user.id !== userInfo.id),
      };
