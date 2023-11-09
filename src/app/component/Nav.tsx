"use client";

import Link from "next/link";

import { MenuList } from "./menu";

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
        <MenuList className="flex gap-5 items-center" />
      </div>
    </nav>
  );
}

export default Nav;
