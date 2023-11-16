import { getPostLikedUsernames, likePost, unlikePost } from "@/service/post";
import { withSessionUser } from "@/utils/session";

type Params = {
  params: { postId: string };
};

export async function PATCH(request: Request, { params: { postId } }: Params) {
  return withSessionUser(async (user) => {
    const { liked } = await request.json();
    if (liked === undefined)
      return new Response("Bad Request", { status: 400 });

    const req = liked ? likePost : unlikePost;

    try {
      if (liked) {
        const likedUsers = await getPostLikedUsernames(postId);
        if (likedUsers.likes.includes(user.username)) {
          return Response.json({ message: "Already liked" });
        }
      }
      const response = await req({ userId: user.id, postId });
      return Response.json(response);
    } catch (e) {
      console.log("Error", e);
      return new Response(JSON.stringify(e), { status: 500 });
    }
  });
}
