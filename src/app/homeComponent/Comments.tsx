import { Comment } from "@/model/posts";

type Props = {
  comments: Comment[];
};

export default function Comments({ comments }: Props) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <span className="font-semibold mr-2">{comment.user.username}</span>
          <span>{comment.comment}</span>
        </div>
      ))}
    </div>
  );
}
