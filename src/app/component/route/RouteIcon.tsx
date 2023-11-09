import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { Route } from "../menu";

type RouteIcon = Route & {
  path: string;
  defaultIcon: IconType;
  filledIcon: IconType;
  title: string;
};

function RouteIcon({ path, title, defaultIcon, filledIcon }: RouteIcon) {
  const Component = () => {
    const pathname = usePathname();
    const Icon = pathname === path ? filledIcon : defaultIcon;

    return (
      <Link href={path} title={title} className="text-4xl">
        <Icon />
      </Link>
    );
  };
  return Component;
}

export default RouteIcon;
