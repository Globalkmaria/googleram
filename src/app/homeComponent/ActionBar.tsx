import { DetailUser } from "@/model/user";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";

type Props = {
  likes: string[];
  postId: string;
  user?: DetailUser;
};

export default function ActionBar({ likes, postId, user }: Props) {
  return (
    <>
      <div className="flex justify-between text-lg pb-2">
        <LikeBtn likes={likes} user={user} postId={postId} />
        <BookmarkBtn user={user} postId={postId} />
      </div>
      <span className="block font-semibold text-sm">{likes.length} likes</span>
    </>
  );
}
