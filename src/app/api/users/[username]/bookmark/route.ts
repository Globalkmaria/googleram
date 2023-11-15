import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { addBookmark, getUserBookmarks, removeBookmark } from "@/service/user";
import { getServerSession } from "next-auth";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return new Response("Authentication failed", { status: 401 });

  const { bookmarked, postId } = await request.json();

  try {
    if (bookmarked) {
      const data = await getUserBookmarks(user.id);

      if (data.bookmarks.includes(postId)) {
        return Response.json({ message: "Already bookmarked" });
      }
    }
    const req = bookmarked ? addBookmark : removeBookmark;
    const response = await req({ userId: user.id, postId });
    return Response.json(response);
  } catch (err) {
    console.log("Error", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
