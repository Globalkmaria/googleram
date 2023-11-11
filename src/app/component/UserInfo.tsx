import { User } from "@/model/user";

type Props = {
  user: User;
};

export default async function UserInfo({ user }: Props) {
  return (
    <div>
      <span className="font-bold block break-all">{user?.username}</span>
      <span className="text-gray-500 block break-all">{user?.name}</span>
    </div>
  );
}
