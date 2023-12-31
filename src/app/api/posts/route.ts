import { getServerSession } from "next-auth";

import { createPost, getFollowingPosts } from "@/service/posts";
import { withSessionUser } from "@/utils/session";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const username = session?.user.username ?? "";

  const data = await getFollowingPosts(username);
  return Response.json(data);
}

export async function POST(request: Request) {
  return withSessionUser(async (user) => {
    const form = await request.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Missing text or file", { status: 400 });
    }

    const result = await createPost(user.id, text, file);

    return Response.json(result);
  });
}
