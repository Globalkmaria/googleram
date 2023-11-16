import { MdGridOn } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { IconType } from "react-icons";
import { Categories } from "@/model/posts";

type Props = {
  focused: boolean;
  type: Categories;
  onClick: (category: Categories) => void;
};

const ICONS: {
  [key in Categories]: IconType;
} = {
  posts: MdGridOn,
  saved: CiBookmark,
  liked: CiHeart,
};

export default function Category({ type, focused, onClick }: Props) {
  const Icon = ICONS[type];

  return (
    <button
      type="button"
      className={`pt-4 pb-6 flex gap-1 items-center ${
        focused ? focusedIconClassName : ""
      }`}
      onClick={() => onClick(type)}
    >
      <Icon className=" scale-150 md:scale-100" />
      <span
        className={`uppercase hidden md:inline ${
          focused ? focusedTextClassName : ""
        }`}
      >
        {type}
      </span>
    </button>
  );
}

const focusedIconClassName = "border-t-2 border-gray-400";
const focusedTextClassName = "font-semibold";
