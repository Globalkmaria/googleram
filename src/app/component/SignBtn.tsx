"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import InstarBtn from "./InstarBtn";

const onSignOut = () => signOut();
const onSignIn = () => signIn(undefined, { redirect: false });

export default function SignBtn() {
  const { data: session } = useSession();

  if (session) {
    return <InstarBtn onClick={onSignOut} title={"Sign out"} />;
  }

  return <InstarBtn onClick={onSignIn} title={"Sign in"} />;
}
