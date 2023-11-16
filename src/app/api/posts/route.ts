import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";
import { createPost, getFollowingPosts } from "@/service/posts";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }
  const data = await getFollowingPosts(user.username);
  return Response.json(data);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await request.formData();
  const text = form.get("text")?.toString();
  const file = form.get("file") as Blob;

  if (!text || !file) {
    return new Response("Missing text or file", { status: 400 });
  }

  const result = await createPost(user.id, text, file);

  return Response.json(result);
}
