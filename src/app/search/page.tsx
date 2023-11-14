import UsersSearch from "./UsersSearch";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "User Search",
  description: "Search users",
};

function Page() {
  return (
    <section>
      <UsersSearch />
    </section>
  );
}

export default Page;
