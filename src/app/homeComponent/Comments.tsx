import { Comment } from "@/model/posts";
import Avatar from "../component/Avatar/Avatar";

type Props = {
  comments: Comment[];
};

export default function Comments({ comments }: Props) {
  return (
    <ul className="min-h-[100%]">
      {comments.map((comment) => (
        <li key={comment.id} className="flex items-start">
          <div className="flex items-center">
            <Avatar
              user={{
                username: comment.username,
                image: comment.image,
              }}
              size="small"
            />
            <span className="font-semibold mr-2">{comment.username}</span>
          </div>
          <p className="break-words">{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
}
