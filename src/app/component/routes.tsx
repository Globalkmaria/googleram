"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquare } from "react-icons/bs";
import { BsPlusSquareFill } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";

const routesData: RouteIcons[] = [
  {
    path: "/",
    defaultIcon: AiOutlineHome,
    filledIcon: AiFillHome,
    title: "Home",
  },
  {
    path: "/search",
    defaultIcon: RiSearchLine,
    filledIcon: RiSearchFill,
    title: "Search",
  },
  {
    path: "/post",
    defaultIcon: BsPlusSquare,
    filledIcon: BsPlusSquareFill,
    title: "Post",
  },
];

export const Routes = routesData.map((route) => RouteIcons(route));

type RouteIcons = {
  path: string;
  defaultIcon: IconType;
  filledIcon: IconType;
  title: string;
};

function RouteIcons({ path, title, defaultIcon, filledIcon }: RouteIcons) {
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
