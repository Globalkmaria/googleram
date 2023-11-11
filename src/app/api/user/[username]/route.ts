import { getUserByUsername } from "@/service/user";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const res = await getUserByUsername(params.username);
  return Response.json(res);
}
