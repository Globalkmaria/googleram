import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";
import { getFollowingPosts } from "@/service/posts";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const data = await getFollowingPosts(user.username);
  return Response.json(data);
}
