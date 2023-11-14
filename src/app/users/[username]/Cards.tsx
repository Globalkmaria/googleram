import { SimplePost } from "@/model/posts";
import Image from "next/image";
import Link from "next/link";

type Props = {
  posts: SimplePost[];
};

export default function Cards({ posts }: Props) {
  if (!posts.length)
    return (
      <div className="w-full text-center font-bold text-gray-400">No posts</div>
    );
  return (
    <ul
      className=" w-full grid auto-cols-auto grid-cols-3 
    gap-4"
    >
      {posts.map((post) => (
        <li key={post.id} className="relative aspect-square">
          <Link href={`/posts/${post.id}`}>
            <Image
              src={post.photo}
              alt={`${post.user} post`}
              fill
              sizes="650px"
              className="object-cover"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
