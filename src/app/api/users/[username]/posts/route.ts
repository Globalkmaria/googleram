import { Categories } from "@/model/posts";
import { getUserPostsByCategory } from "@/service/posts";

export async function GET(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Categories;
  const result = await getUserPostsByCategory(username, category);
  return Response.json(result);
}
