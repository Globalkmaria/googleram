"use client";

import useSWR from "swr";
import { PropagateLoader } from "react-spinners";

import FollowingCarousel from "./FollowingCarousel";
import { DetailUser } from "@/model/user";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>(`/api/me`);

  if (error) return <div>Error loading followers</div>;

  const followings = data?.followings && [
    ...data.followings,
    ...data.followings,
    ...data.followings,
  ];

  return (
    <section className="shadow-md p-4 rounded-md min-h-[126px] relative z-0">
      {isLoading ? (
        <div className="flex justify-center items-center h-[94px]">
          <PropagateLoader color="#d946ef" />
        </div>
      ) : !followings?.length ? (
        <p>{`You don't have followings`}</p>
      ) : (
        <FollowingCarousel followings={followings} />
      )}
    </section>
  );
}
