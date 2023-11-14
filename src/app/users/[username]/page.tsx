import { getUserByUsername } from "@/service/user";
import User from "./User";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string) => getUserByUsername(username));

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <User user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: {
  params: {
    username: string;
  };
}): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) | Googleram Photos`,
    description: `${user?.name}'s all Googleram posts`,
  };
}
