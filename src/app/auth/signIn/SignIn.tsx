"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";

import InstarBtn from "@/app/component/InstarBtn";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

function SignIn({ providers, callbackUrl }: Props) {
  return (
    <section className="flex justify-center mt-[30%]">
      {Object.values(providers).map((provider) => (
        <InstarBtn
          key={provider.name}
          onClick={() => signIn(provider.id, { callbackUrl })}
          title={`Sign in with ${provider.name}`}
          size="large"
        />
      ))}
    </section>
  );
}

export default SignIn;
