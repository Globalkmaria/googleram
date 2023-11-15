import { getPost } from "@/service/posts";

export const dynamic = "force-dynamic";

type Params = {
  params: { postId: string };
};

export async function GET(request: Request, { params: { postId } }: Params) {
  const data = await getPost(postId);
  return Response.json(data);
}
