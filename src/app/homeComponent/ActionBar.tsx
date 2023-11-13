import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";

type Props = {
  likes: string[];
};

export default function ActionBar({ likes }: Props) {
  return (
    <>
      <div className="flex justify-between text-lg pb-2">
        <LikeBtn />
        <BookmarkBtn />
      </div>
      <span className="block font-semibold text-sm">{likes.length} likes</span>
    </>
  );
}
