import { revalidateTag } from "next/cache";
import { connection, type NextRequest } from "next/server";

/**
 * Force-refresh sheet data: GET /api/refresh?secret=YOUR_REFRESH_SECRET
 * (Otherwise data refreshes automatically about once a minute.)
 */
export async function GET(request: NextRequest) {
  await connection();
  const secret = process.env.REFRESH_SECRET;
  if (!secret || request.nextUrl.searchParams.get("secret") !== secret) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  revalidateTag("sheets", "max");
  return Response.json({ ok: true, refreshed: "sheets" });
}
