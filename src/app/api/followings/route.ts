import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getUsersByKeyword } from "@/service/users";
import { getUserByUsername } from "@/service/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  const username = session?.user.username ?? "";

  const request = username.length ? getUserByUsername : getUsersByKeyword;
  const data = await request(username);
  const formattedData = username.length
    ? data
    : {
        followings: data,
      };
  return Response.json(formattedData);
}
