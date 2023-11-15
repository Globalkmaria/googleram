import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updatePostLike } from "@/service/post";
import { getServerSession } from "next-auth";

type Params = {
  params: { postId: string };
};

export async function POST(request: Request, { params: { postId } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { liked } = await request.json();

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const result = await updatePostLike({ userId: user.id, postId, liked });

  return Response.json({ message: "success" });
}
