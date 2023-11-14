import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "./SignIn";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Googlram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

async function SignInPage({ searchParams: { callbackUrl } }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />;
}

export default SignInPage;
