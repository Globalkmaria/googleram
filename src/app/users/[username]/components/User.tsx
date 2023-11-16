import { DetailUser } from "@/model/user";
import Profile from "./Profile";
import Content from "./Content";

type Props = {
  user: DetailUser;
};

export default function User({ user }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <Profile username={user.username} />
      <Content username={user.username} />
    </div>
  );
}
