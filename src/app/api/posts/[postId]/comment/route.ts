import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { addComment } from "@/service/post";
import { getServerSession } from "next-auth";

type Params = {
  params: { postId: string };
};

export async function POST(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return new Response("Authentication failed", { status: 401 });

  const { comment } = await request.json();
  if (!comment) return new Response("Bad Request", { status: 400 });

  try {
    const response = await addComment({
      postId: params.postId,
      comment,
      userId: user.id,
    });
    return Response.json(response);
  } catch (e) {
    console.log("Error", e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
