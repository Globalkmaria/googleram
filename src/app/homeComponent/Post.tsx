import Image from "next/image";

import { SimplePost } from "@/model/posts";
import BookmarkBtn from "./BookmarkBtn";
import LikeBtn from "./LikeBtn";
import { AddComment } from "./AddComment";
import Avatar from "../component/Avatar/Avatar";
import { parseDate } from "@/utils/parseDate";

type Props = {
  post: SimplePost;
};

export default function Post({ post }: Props) {
  return (
    <article className="shadow-md rounded-sm ">
      <div className="flex items-center gap-2 p-2">
        <Avatar withRing size="small" user={post.user} />
        <span className="block font-semibold">{post.user.username}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <Image
        src={post.photo}
        alt={`post image`}
        width={600}
        height={800}
        referrerPolicy="no-referrer"
        className=" object-cover"
      />
      <div className="p-2">
        <div className="flex justify-between text-lg pb-2">
          <LikeBtn />
          <BookmarkBtn />
        </div>
        <span className="block font-semibold text-sm">
          {post.likes.length} likes
        </span>
        <div>
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span>{post.text}</span>
        </div>
        <span className="block text-sm text-gray-400">
          {parseDate(post.createdAt)}
        </span>
      </div>
      <AddComment />
    </article>
  );
}
