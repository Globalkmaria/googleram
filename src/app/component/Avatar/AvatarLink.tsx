import { useSession } from "next-auth/react";
import WithLink from "../WithLink";
import Avatar, { AvatarProps } from "./Avatar";

function AvatarLink(props: AvatarProps) {
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  const href = `/users/${session.user?.username || ""}`;
  const Link = WithLink({ Component: Avatar, href });
  return <Link {...props} />;
}

export default AvatarLink;
