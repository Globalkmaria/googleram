"use client";

import Link from "next/link";

import SignBtn from "./SignBtn";
import { menu } from "./menu";
import AvatarLink from "./Avatar/AvatarLink";
import { useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center px-6">
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
