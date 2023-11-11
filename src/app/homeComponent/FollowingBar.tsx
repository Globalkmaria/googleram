"use client";

import useSWR from "swr";
import { PropagateLoader } from "react-spinners";

import FollowingCarousel from "./FollowingCarousel";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR(`/api/me`);

  if (error) return <div>Error loading followers</div>;

  return (
    <div className="shadow-md p-4 rounded-md min-h-[126px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-[94px]">
          <PropagateLoader color="#d946ef" />
        </div>
      ) : (
        <FollowingCarousel followings={data.followings} />
      )}
    </div>
  );
}
