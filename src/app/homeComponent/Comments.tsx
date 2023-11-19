import { Comment } from "@/model/posts";
import Avatar from "../component/Avatar/Avatar";

type Props = {
  comments: Comment[];
};

export default function Comments({ comments }: Props) {
  return (
    <ul className="min-h-[100%] flex flex-col gap-4">
      {comments.map((comment) => (
        <li key={comment.id}>
          <div className="inline-block align-middle mr-[6px]">
            <Avatar
              user={{
                id: comment.id,
                username: comment.username,
                image: comment.image,
              }}
              size="small"
            />
          </div>
          <span className="font-semibold mr-2">{comment.username}</span>
          <span className="break-words">{comment.comment}</span>
        </li>
      ))}
    </ul>
  );
}
