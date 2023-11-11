"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { PropagateLoader } from "react-spinners";

import FollowingCarousel from "./FollowingCarousel";

export default function FollowingBar() {
  const { data: session } = useSession();
  const { data, isLoading, error } = useSWR(
    `api/user/${session?.user.username}?keyword=followings`
  );

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
