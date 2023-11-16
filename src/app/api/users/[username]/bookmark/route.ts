import { addBookmark, getUserBookmarks, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/utils/session";

export async function PATCH(request: Request) {
  return withSessionUser(async (user) => {
    const { bookmarked, postId } = await request.json();

    if (!postId || bookmarked == null) {
      return new Response("Bad Request", { status: 400 });
    }

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
  });
}
