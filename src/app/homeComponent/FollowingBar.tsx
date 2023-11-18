"use client";

import useSWR from "swr";

import { DetailUser } from "@/model/user";
import Loader from "../component/PropagateLoader";
import FollowingCarousel from "./FollowingCarousel";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>(`/api/me`);

  if (error) return <div>Error loading followers</div>;

  const followings = data?.followings;

  return (
    <section className="shadow-md p-4 rounded-md min-h-[126px] relative z-0">
      {isLoading ? (
        <div className="flex justify-center items-center h-[94px]">
          <Loader />
        </div>
      ) : !followings?.length ? (
        <p>{`You don't have followings`}</p>
      ) : (
        <FollowingCarousel followings={followings} />
      )}
    </section>
  );
}
