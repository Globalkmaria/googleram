import { addComment } from "@/service/post";
import { withSessionUser } from "@/utils/session";

type Params = {
  params: { postId: string };
};

export async function POST(request: Request, { params }: Params) {
  return withSessionUser(async (user) => {
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
  });
}
