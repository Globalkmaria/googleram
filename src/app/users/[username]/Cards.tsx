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
      className="w-full grid auto-cols-auto grid-cols-3 
    gap-y-6 justify-items-center"
    >
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <Image
              width={250}
              height={250}
              src={post.photo}
              alt={`${post.user} post`}
              className="object-cover w-[250px] h-[250px] object-center"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
