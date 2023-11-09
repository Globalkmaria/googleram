"use client";

import Link from "next/link";
import { Routes } from "./routes";

function Nav() {
  return (
    <div className="z-10 flex justify-between p-8 fixed top-0 w-full border-slate-200 border-b-2 bg-white">
      <Link href="/" className="text-4xl font-bold ">
        Googlram
      </Link>

      <div className="flex gap-5 items-center">
        {Routes.map((Route, index) => (
          <Route key={index} />
        ))}
        <Link
          href="/signup"
          className="text-2xl bg-gradient-to-r from-yellow-400 from-10% via-orange-500 via-30% to-pink-500 px-1 py-1 rounded-md"
        >
          <div className="p-2 bg-white rounded">Sign in</div>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
