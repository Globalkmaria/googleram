import { getUsersByKeyword } from "@/service/users";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") as string;
  const res = await getUsersByKeyword(keyword);
  return Response.json(res);
}
