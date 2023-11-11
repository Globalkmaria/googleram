import { getFollowings, getUser } from "@/service/user";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");

  if (keyword === "followings") {
    const data = await getFollowings(params.username);
    return Response.json(data);
  }

  const res = await getUser(params.username);
  return Response.json(res);
}
