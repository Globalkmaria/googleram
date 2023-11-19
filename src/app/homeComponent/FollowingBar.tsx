"use client";

import useSWR from "swr";

import { DetailUser } from "@/model/user";
import Loader from "../component/PropagateLoader";
import FollowingCarousel from "./FollowingCarousel";

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>(`/api/followings`);

  if (error) return <div>Error loading followers</div>;

  const followings = data?.followings;

  return (
    <section className="shadow-md p-4 rounded-md relative z-0 box-border h-[100px] md:h-[126px]">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : !followings?.length ? (
        <div className="flex justify-center items-center h-full">{`You don't have followings`}</div>
      ) : (
        <FollowingCarousel followings={followings} />
      )}
    </section>
  );
}
