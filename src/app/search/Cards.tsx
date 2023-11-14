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
    <ul className="p-4 w-full flex flex-col gap-2">
      {users.length === 0 && (
        <p className="text-center text-gray-400">No user found</p>
      )}
      {users.map((user) => (
        <li key={user.username}>
          <Card user={user} />
        </li>
      ))}
    </ul>
  );
}
