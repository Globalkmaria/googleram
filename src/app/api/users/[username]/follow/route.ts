import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  addFollower,
  addFollowing,
  getUserFollowings,
  removeFollower,
  removeFollowing,
} from "@/service/user";
import { getServerSession } from "next-auth";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return new Response("Authentication failed", { status: 401 });

  const { followed, followingId } = await request.json();

  try {
    if (followed) {
      const data = await getUserFollowings(user.id);
      if (data.followings.includes(followingId)) {
        return Response.json({ message: "Already following" });
      }

      await addFollowing({
        userId: user.id,
        followingId,
      });

      try {
        await addFollower({
          userId: followingId,
          followerId: user.id,
        });
      } catch (err) {
        await removeFollowing({
          userId: user.id,
          followingId,
        });
        console.log("Error", err);
        return new Response(JSON.stringify(err), { status: 500 });
      }
    } else {
      await removeFollowing({
        userId: user.id,
        followingId,
      });

      try {
        await removeFollower({
          userId: followingId,
          followerId: user.id,
        });
      } catch (err) {
        await addFollowing({
          userId: user.id,
          followingId,
        });
        console.log("Error", err);
        return new Response(JSON.stringify(err), { status: 500 });
      }
    }

    return Response.json({
      message: followed ? "Followed" : "Unfollowed",
    });
  } catch (err) {
    console.log("Error", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
