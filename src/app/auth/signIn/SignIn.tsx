"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";

import InstarBtn from "@/app/component/InstarBtn";

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

function SignIn({ providers }: Props) {
  return (
    <section className="min-w-[100vw] flex justify-center mt-[30%]">
      {Object.values(providers).map((provider) => (
        <InstarBtn
          key={provider.name}
          onClick={() => signIn(provider.id)}
          title={`Sign in with ${provider.name}`}
          size="large"
        />
      ))}
    </section>
  );
}

export default SignIn;
