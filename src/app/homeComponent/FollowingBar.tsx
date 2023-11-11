"use client";

import Link from "next/link";

import { User } from "@/model/user";
import Avatar from "../component/Avatar/Avatar";
import Carousel from "../component/Carousel";

export default function FollowingBar() {
  return (
    <div className="shadow-md p-4 rounded-md">
      <Carousel>
        {MOCK_USERS.map((user) => (
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
    </div>
  );
}

const MOCK_USER: User = {
  name: "user",
  username: "user",
  image: "https://i.pravatar.cc/300",
  email: "admin@example.com",
};

const MOCK_USERS = Array(10).fill(MOCK_USER);
