import { format } from "timeago.js";

import { Post } from "@/model/posts";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";
import { AddComment } from "./AddComment";
import Avatar from "../component/Avatar/Avatar";
import Comments from "./Comments";
import { urlFor } from "@/utils/urlFor";

type Props = {
  post: Post;
};

export default function Post({ post }: Props) {
  return (
    <article className="shadow-md rounded-sm ">
      <div className="flex items-center gap-2 p-2">
        <Avatar withRing size="small" user={post.user} />
        <span className="block font-semibold">{post.user.username}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={urlFor(post.photo).url()}
        alt={`post image`}
        referrerPolicy="no-referrer"
        className=" object-cover"
      />
      <div className="p-2">
        <div className="flex justify-between text-lg pb-2">
          <LikeBtn />
          <BookmarkBtn />
        </div>
        <span className="block font-semibold text-sm">{post.likes} likes</span>
        <Comments comments={post.comments} />
        <span className="block text-sm text-gray-400">
          {format(post.updatedAt, "en_US")}
        </span>
      </div>
      <AddComment />
    </article>
  );
}
