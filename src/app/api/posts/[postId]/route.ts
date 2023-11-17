import { getServerSession } from "next-auth";
import { getPost } from "@/service/posts";

import { authOptions } from "../../auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

type Params = {
  params: { postId: string };
};

export async function GET(request: Request, { params: { postId } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const data = await getPost(postId, user?.username || "");
  return Response.json(data);
}
