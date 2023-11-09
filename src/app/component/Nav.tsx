"use client";

import Link from "next/link";

import SignIn from "./SignIn";
import { menu } from "./menu";

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
          <SignIn />
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
