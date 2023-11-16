import { NextResponse } from "next/server";

import { getUserByUsername } from "@/service/user";
import { withSessionUser } from "@/utils/session";

export async function GET(request: Request) {
  return withSessionUser(async (user) => {
    const data = await getUserByUsername(user.username);
    return NextResponse.json(data);
  });
}
