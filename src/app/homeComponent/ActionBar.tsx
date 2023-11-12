import { parseDate } from "@/utils/parseDate";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";

type Props = {
  likes: string[];
  username: string;
  text: string;
  createdAt: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  return (
    <div className="p-2">
      <div className="flex justify-between text-lg pb-2">
        <LikeBtn />
        <BookmarkBtn />
      </div>
      <span className="block font-semibold text-sm">{likes.length} likes</span>
      <div>
        <span className="font-semibold mr-2">{username}</span>
        <span>{text}</span>
      </div>
      <span className="block text-xs text-gray-400 uppercase">
        {parseDate(createdAt)}
      </span>
    </div>
  );
}
