import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  Component: (props: any) => ReactNode;
  href: string;
};

function WithLink({ Component, href }: Props) {
  const LinkComponent = (props: any) => (
    <Link href={href}>
      <Component {...props} />
    </Link>
  );
  return LinkComponent;
}

export default WithLink;
