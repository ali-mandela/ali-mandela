import { NextResponse } from "next/server";
import { getVisitorCount } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const visitors = await getVisitorCount();
    return NextResponse.json(
      { visitors },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
    );
  } catch (err) {
    console.error("[analytics] failed to count visitors", err);
    return NextResponse.json({ visitors: null });
  }
}
