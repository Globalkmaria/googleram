import { ReactNode } from "react";

import RouteIcon from "./route/RouteIcon";
import WithList from "./WithList";
import HomeFillIcon from "./Icons/HomeFillIcon";
import HomeIcon from "./Icons/HomeIcon";
import SearchIcon from "./Icons/SearchIcon";
import SearchFillIcon from "./Icons/SearchFillIcon";
import NewIcon from "./Icons/NewIcon";
import NewFillIcon from "./Icons/NewFillIcon";

export type Route = {
  path: string;
  title: string;
};

const menuData: RouteIcon[] = [
  {
    path: "/",
    defaultIcon: HomeIcon,
    filledIcon: HomeFillIcon,
    title: "Home",
  },
  {
    path: "/search",
    defaultIcon: SearchIcon,
    filledIcon: SearchFillIcon,
    title: "Search",
  },
  {
    path: "/new",
    defaultIcon: NewIcon,
    filledIcon: NewFillIcon,
    title: "New",
  },
];

export const menu = menuData.map((route) => RouteIcon(route));
