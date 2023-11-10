"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import InstarBtn from "@/app/component/InstarBtn";

const googleSignIn = () => signIn("google");

function SignInPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
    return;
  }

  return (
    <div className="min-w-[100vw] flex justify-center mt-40">
      <InstarBtn onClick={googleSignIn} title={"Sign in with Google"} />
    </div>
  );
}

export default SignInPage;
