import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPostLikedUsernames, likePost, unlikePost } from "@/service/post";
import { getServerSession } from "next-auth";

type Params = {
  params: { postId: string };
};

export async function PUT(request: Request, { params: { postId } }: Params) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { liked } = await request.json();

  if (!user) return new Response("Authentication failed", { status: 401 });

  if (liked === undefined) return new Response("Bad Request", { status: 400 });

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
}
