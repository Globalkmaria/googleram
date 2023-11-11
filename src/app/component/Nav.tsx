"use client";

import Link from "next/link";

import SignBtn from "./SignBtn";
import { menu } from "./menu";
import AvatarLink from "./Avatar/AvatarLink";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  return (
    <nav
      className="flex justify-between p-8 w-full
      bg-white"
    >
      <Link href="/" className="text-4xl font-bold ">
        Googlram
      </Link>

      <div>
        <ul className="flex gap-5 items-center">
          {menu.map((Item, idx) => (
            <li key={idx}>
              <Item />
            </li>
          ))}
          {session && (
            <li className="w-12">
              <AvatarLink withRing size="small" />
            </li>
          )}
          <li>
            <SignBtn />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
