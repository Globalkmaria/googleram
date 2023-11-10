import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  Component: () => ReactNode;
  href: string;
};

function WithLink({ Component, href }: Props) {
  const NewComponent = (
    <Link href={href}>
      <Component />
    </Link>
  );
  return NewComponent;
}

export default WithLink;
