import { getUserByUsername } from "@/service/user";
import User from "./User";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <User user={user} />
    </section>
  );
}
