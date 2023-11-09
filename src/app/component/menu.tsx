import { ReactNode } from "react";

import RouteIcon from "./route/RouteIcon";
import SignIn from "./route/SignIn";
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

type MenuComponent = {
  title: string;
  Component: () => ReactNode;
};

const menuData: (RouteIcon | MenuComponent)[] = [
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
  {
    title: "Sign in",
    Component: SignIn,
  },
];

const Menu = menuData.map((route) =>
  "Component" in route ? route.Component : RouteIcon(route)
);

export const MenuList = WithList(Menu);
