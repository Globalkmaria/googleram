import User from "./User";

type Props = {
  params: {
    username: string;
  };
};

export default function UserPage({ params: { username } }: Props) {
  return (
    <section className="w-full">
      <User username={username} />
    </section>
  );
}
