import { getPost } from "@/service/posts";

type Params = {
  params: { postId: string };
};

export async function GET(request: Request, { params: { postId } }: Params) {
  const data = await getPost(postId);
  return Response.json(data);
}
