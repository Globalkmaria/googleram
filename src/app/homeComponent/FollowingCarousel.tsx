import Link from "next/link";

import { SimpleUser } from "@/model/user";
import Carousel from "../component/Carousel";
import Avatar from "../component/Avatar/Avatar";

type Props = {
  followings: SimpleUser[];
};

export default function FollowingCarousel({ followings }: Props) {
  return (
    <Carousel>
      {followings.map((user) => (
        <Link
          href={`/user/${user.username}`}
          className="flex flex-col items-center w-20"
          key={user.username}
        >
          <Avatar user={user} withRing />
          <p
            className="text-sm text-ellipsis overflow-hidden 
          w-full text-center"
          >
            {user.username}
          </p>
        </Link>
      ))}
    </Carousel>
  );
}
