import { follow, getUserFollowings, unFollow } from "@/service/user";
import { withSessionUser } from "@/utils/session";

export async function PATCH(request: Request) {
  return withSessionUser(async (user) => {
    const { followed, followingId } = await request.json();
    if (!followingId) return new Response("Bad Request", { status: 400 });

    try {
      if (followed) {
        const data = await getUserFollowings(user.id);
        if (data.followings.includes(followingId)) {
          return Response.json({ message: "Already following" });
        }

        await follow({
          myId: user.id,
          targetId: followingId,
        });
      } else {
        await unFollow({
          myId: user.id,
          targetId: followingId,
        });
      }

      return Response.json({
        message: followed ? "Followed" : "Unfollowed",
      });
    } catch (err) {
      console.log("Error", err);
      return new Response(JSON.stringify(err), { status: 500 });
    }
  });
}
