import { SummaryUser } from "@/model/user";
import Card from "./Card";
import Loader from "../component/PropagateLoader";

type Props = {
  users: SummaryUser[];
  isLoading: boolean;
};

export default function Cards({ users, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="h-[100px] flex  items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <ul className="p-4 w-full">
      {users?.map((user) => (
        <li key={user.username}>
          <Card user={user} />
        </li>
      ))}
    </ul>
  );
}
