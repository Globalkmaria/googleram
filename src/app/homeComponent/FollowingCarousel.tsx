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
          className="flex flex-col items-center"
          key={user.username}
        >
          <Avatar user={user} withRing />
          <span>{user.username}</span>
        </Link>
      ))}
    </Carousel>
  );
}
