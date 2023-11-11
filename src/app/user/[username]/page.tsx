import Avatar from "@/app/component/Avatar/Avatar";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params: { username } }: Props) {
  return (
    <div className="flex flex-col items-center m-10">
      {/* <div className="w-40 mb-4">
        <Avatar user={session.user} withRing />
      </div>
      <h2 className="font-semibold text-lg">{session?.user?.username}</h2>
      <h2 className="font-semibold text-lg">{session?.user?.email}</h2> */}
      <h2 className="font-semibold text-lg">{username}</h2>
    </div>
  );
}
