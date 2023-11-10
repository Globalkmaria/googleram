import { useSession } from "next-auth/react";
import WithLink from "./WithLink";
import Avatar from "./Avatar";

function AvatarLink() {
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  const href = `/user/${session.user?.username || ""}`;
  return WithLink({ Component: Avatar, href });
}

export default AvatarLink;
