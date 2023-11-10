"use client";

import Link from "next/link";

import SignBtn from "./SignBtn";
import { menu } from "./menu";
import AvatarLink from "./AvatarLink";

function Nav() {
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
          <li className="w-12">
            <AvatarLink />
          </li>
          <li>
            <SignBtn />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
