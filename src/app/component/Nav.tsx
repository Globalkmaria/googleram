"use client";

import Link from "next/link";

import SignBtn from "./SignBtn";
import { menu } from "./menu";
import AvatarLink from "./Avatar/AvatarLink";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center px-2 md:px-6 py-2">
      <Link href="/" className=" text-xl md:text-4xl font-bold">
        Googlram
      </Link>

      <div>
        <ul className="flex gap-1 md:gap-5 items-center">
          {menu.map((Item, idx) => (
            <li className="text-sm md:text-md" key={idx}>
              <Item />
            </li>
          ))}
          {session && (
            <li>
              <AvatarLink withRing size="small" user={session.user} />
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
